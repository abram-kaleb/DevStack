from editor_logic import (
    write_to_file,
    open_folder_in_vscode,
    open_vscode_at_file,
    find_precise_block_range
)
import subprocess
import streamlit as st
import os
import re
import time
import pyperclip
import json
import difflib
from build_logic import create_react_vite, create_python_project
from deploy_logic import push_to_github, check_git_status
from editor_logic import open_folder_in_vscode, open_vscode_at_file, write_to_file

st.set_page_config(page_title="DevStack", page_icon="⚡", layout="centered")


def find_precise_block_range(existing_lines, clipboard_body):
    if not clipboard_body:
        return -1, -1

    first_clip_line = clipboard_body[0].strip()
    match_indices = []

    for idx, ex_line in enumerate(existing_lines):
        if first_clip_line in ex_line:
            match_indices.append(idx)

    best_start = -1
    best_end = -1
    max_matches = -1

    for start_idx in match_indices:
        current_matches = 0
        temp_idx = start_idx

        for clip_line in clipboard_body:
            if temp_idx < len(existing_lines):
                if clip_line.strip() in existing_lines[temp_idx].strip():
                    current_matches += 1
                temp_idx += 1
            else:
                break

        if current_matches > max_matches:
            max_matches = current_matches
            best_start = start_idx
            best_end = start_idx + len(clipboard_body) - 1
            if best_end >= len(existing_lines):
                best_end = len(existing_lines) - 1

    return best_start, best_end


def get_simple_compare(clip_txt, file_txt, file_ext):
    clip_lines = clip_txt.splitlines()
    file_lines = file_txt.splitlines()

    matcher = difflib.SequenceMatcher(None, clip_lines, file_lines)
    left_display = []
    right_display = []

    # Logika deteksi tag untuk file TSX/JSX/HTML
    is_markup = file_ext in ['tsx', 'jsx', 'html', 'xml']

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'equal':
            for i in range(i1, i2):
                left_display.append(f"✅ {clip_lines[i]}")
            for j in range(j1, j2):
                right_display.append(f"✅ {file_lines[j]}")

        elif tag == 'replace':
            for i in range(i1, i2):
                c_line = clip_lines[i]
                found_match = False

                # Jika file markup, coba samakan berdasarkan Tag (<Component> atau <div>)
                if is_markup:
                    clip_tags = regex.findall(r'<([\w\d.-]+)', c_line)
                    for f_line in file_lines[j1:j2]:
                        file_tags = regex.findall(r'<([\w\d.-]+)', f_line)
                        if clip_tags and file_tags and clip_tags[0] == file_tags[0]:
                            left_display.append(f"✅ {c_line}")
                            found_match = True
                            break

                if not found_match:
                    left_display.append(f"📝 {c_line}")

            for j in range(j1, j2):
                f_line = file_lines[j]
                found_match = False
                if is_markup:
                    file_tags = regex.findall(r'<([\w\d.-]+)', f_line)
                    for c_line in clip_lines[i1:i2]:
                        clip_tags = regex.findall(r'<([\w\d.-]+)', c_line)
                        if clip_tags and file_tags and clip_tags[0] == file_tags[0]:
                            right_display.append(f"✅ {f_line}")
                            found_match = True
                            break

                if not found_match:
                    right_display.append(f"📝 {f_line}")

        elif tag == 'delete':
            for i in range(i1, i2):
                left_display.append(f"➕ {clip_lines[i]}")
        elif tag == 'insert':
            for j in range(j1, j2):
                right_display.append(f"📄 {file_lines[j]}")

    return "\n".join(left_display), "\n".join(right_display)


def update_path():
    path = browse_folder()
    if path:
        st.session_state.folder_path = path
        st.session_state.path_ver += 1
    else:
        st.warning(
            "Folder picker tidak tersedia di lingkungan ini. Silakan ketik path manual.")


def clean_ansi(text):
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return ansi_escape.sub('', text)


def browse_folder():
    try:
        import tkinter as tk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        path = filedialog.askdirectory(master=root)
        root.destroy()
        return path
    except Exception:
        return None


if "folder_path" not in st.session_state:
    st.session_state.folder_path = os.getcwd()

if "path_ver" not in st.session_state:
    st.session_state.path_ver = 0


def update_path():
    path = browse_folder()
    if path:
        st.session_state.folder_path = path
        st.session_state.path_ver += 1
    else:
        st.warning(
            "Folder picker tidak tersedia di lingkungan ini. Silakan ketik path manual.")


st.title("⚡ DevStack")

tab1, tab2, tab3 = st.tabs(["🏗️ Build", "🚀 Deploy", "📝 Edit"])

with tab1:
    with st.container(border=True):
        col_s, col_f = st.columns(2)
        with col_s:
            category = st.selectbox(
                "Stack", ["Front-End", "Back-End"], key="sel_cat")
        with col_f:
            if category == "Front-End":
                stack = st.selectbox(
                    "Framework", ["React + Vite", "Next.js"], key="sel_fe")
            else:
                stack = st.selectbox(
                    "Framework", ["FastAPI", "Flask", "Python Basic"], key="sel_be")

        st.markdown("**Root Directory**")
        c_path, c_btn = st.columns([4, 1])
        with c_path:
            st.session_state.folder_path = st.text_input(
                "Path Build",
                value=st.session_state.folder_path,
                label_visibility="collapsed",
                key=f"path_b_{st.session_state.path_ver}"
            )
        with c_btn:
            if st.button("📁", key="btn_b_browse"):
                update_path()
                st.rerun()

        project_name = st.text_input(
            "Project Name", placeholder="my-app", key="inp_pname")
        lang = "JavaScript"
        if "React" in stack:
            lang = st.radio(
                "Variant", ["TypeScript", "JavaScript"], horizontal=True, key="rad_lang")

        if st.button("Initialize Project", type="primary", key="btn_run_init"):
            if not project_name:
                st.error("Project name required")
            else:
                with st.status("🏗️ Building project...", expanded=True) as status:
                    console = st.empty()
                    full_output = ""
                    process = create_react_vite(st.session_state.folder_path, project_name, lang) if category == "Front-End" else create_python_project(
                        st.session_state.folder_path, project_name, stack)

                    while True:
                        line = process.stdout.readline()
                        if not line and process.poll() is not None:
                            break
                        if line:
                            full_output += line
                            console.code(full_output)

                    if process.returncode == 0:
                        status.update(label="✅ Project Created!",
                                      state="complete", expanded=False)
                    else:
                        status.update(label="❌ Build Failed", state="error")

with tab2:
    with st.container(border=True):
        st.markdown("**Deployment Target**")

        cd_path, cd_btn = st.columns([4, 1])
        with cd_path:
            st.session_state.folder_path = st.text_input(
                "Path Deploy",
                value=st.session_state.folder_path,
                label_visibility="collapsed",
                key=f"path_d_{st.session_state.path_ver}"
            )
        with cd_btn:
            if st.button("📁", key="btn_d_browse"):
                update_path()
                st.rerun()

        is_git = check_git_status(st.session_state.folder_path)
        if is_git:
            st.info("Git repository detected.")
        else:
            st.warning("No Git repository found. It will be initialized.")

        col_url, col_br = st.columns([3, 1])
        with col_url:
            repo_url = st.text_input(
                "GitHub Repo URL", placeholder="https://github.com/user/repo.git", key="inp_repo")
        with col_br:
            target_branch = st.selectbox(
                "Branch", ["main", "master", "gh-pages"], key="sel_branch")

        msg = st.text_input(
            "Commit Message", value="update project", key="inp_msg")

        col1, col2 = st.columns(2)

        with col1:
            if st.button("🚀 Push Source (Main)", type="primary", use_container_width=True):
                if repo_url:
                    with st.status(f"📦 Pushing to {target_branch}...", expanded=True) as status:
                        console = st.empty()
                        full_output = ""
                        process = push_to_github(
                            st.session_state.folder_path, repo_url, msg, target_branch)
                        while True:
                            line = process.stdout.readline()
                            if not line and process.poll() is not None:
                                break
                            if line:
                                full_output += clean_ansi(line)
                                console.code(full_output)
                        if process.returncode == 0:
                            status.update(label="✅ Source Pushed!",
                                          state="complete", expanded=False)
                        else:
                            status.update(label="❌ Push Failed", state="error")
                else:
                    st.error("Repo URL required.")

    with col2:
        import json
        pkg_path = os.path.join(st.session_state.folder_path, "package.json")
        has_deploy = False

        if os.path.exists(pkg_path):
            try:
                with open(pkg_path, 'r') as f:
                    data = json.load(f)
                    has_deploy = "deploy" in data.get("scripts", {})
            except:
                pass

        if not has_deploy:
            if st.button("🛠️ Setup GH-Pages", use_container_width=True):
                from deploy_logic import setup_gh_pages
                with st.status("🔧 Setting up...", expanded=True) as status:
                    success = setup_gh_pages(st.session_state.folder_path)
                    if success:
                        status.update(label="✅ Setup Success!",
                                      state="complete")
                        st.rerun()
                    else:
                        status.update(label="❌ Setup Failed", state="error")
        else:
            if st.button("🌐 Deploy to GH-Pages", use_container_width=True, type="primary"):
                with st.status("🛠️ Running NPM Deploy...", expanded=True) as status:
                    console = st.empty()
                    full_output = ""
                    from deploy_logic import run_npm_deploy
                    process = run_npm_deploy(st.session_state.folder_path)

                    while True:
                        line = process.stdout.readline()
                        if not line and process.poll() is not None:
                            break
                        if line:
                            full_output += clean_ansi(line)
                            console.code(full_output)

                    if process.returncode == 0:
                        status.update(label="✅ Website Live!",
                                      state="complete", expanded=False)
                        st.balloons()
                    else:
                        status.update(label="❌ Deploy Failed", state="error")
# main.py
# main.py
# main.py
with tab3:
    with st.container(border=True):
        st.markdown("**📂 Project Location**")
        c_path, c_f, c_v, c_run = st.columns([2.5, 0.5, 0.5, 0.5])

        with c_path:
            st.session_state.folder_path = st.text_input(
                "Path", value=st.session_state.folder_path,
                label_visibility="collapsed", key=f"p_edit_{st.session_state.path_ver}"
            )
        with c_f:
            if st.button("📁", key="f_btn", help="Browse Folder"):
                path = browse_folder()
                if path:
                    st.session_state.folder_path = path
                    st.session_state.path_ver += 1
                    st.rerun()
        with c_v:
            if st.button("🚀", key="v_btn", help="Open in VSCode"):
                if os.path.exists(st.session_state.folder_path):
                    open_folder_in_vscode(st.session_state.folder_path)

        with c_run:
            if st.button("⚡", key="run_top_btn", help="Run Project"):
                if os.path.exists(st.session_state.folder_path):
                    files = os.listdir(st.session_state.folder_path)
                    cmd = ""

                    # Logika deteksi jenis proyek berdasarkan file di folder
                    if "package.json" in files:
                        # Cek apakah vite/next (tsx) atau react biasa
                        try:
                            with open(os.path.join(st.session_state.folder_path, "package.json"), "r") as f:
                                pkg = f.read()
                                if "vite" in pkg or "next" in pkg:
                                    cmd = "npm run dev"
                                else:
                                    cmd = "npm start"
                        except:
                            cmd = "npm start"

                    elif "app.py" in files:
                        try:
                            with open(os.path.join(st.session_state.folder_path, "app.py"), "r") as f:
                                if "import streamlit" in f.read():
                                    cmd = "streamlit run app.py"
                                else:
                                    cmd = "python app.py"
                        except:
                            cmd = "python app.py"

                    elif "main.py" in files:
                        cmd = "python main.py"
                    elif "index.js" in files:
                        cmd = "node index.js"
                    elif "index.ts" in files:
                        cmd = "ts-node index.ts"

                    if cmd:
                        subprocess.Popen(
                            ["start", "cmd", "/k", cmd], cwd=st.session_state.folder_path, shell=True)
                    else:
                        st.error(
                            "Project type not recognized (main.py, app.py, or package.json not found).")

    st.divider()

    if st.button("📥 Paste & Analyze", use_container_width=True, type="secondary"):
        raw_content = pyperclip.paste()
        if raw_content:
            st.session_state.staged_content = raw_content.replace('\r\n', '\n')
            st.rerun()

    if "staged_content" in st.session_state and st.session_state.staged_content:
        lines = st.session_state.staged_content.split('\n')
        if lines:
            first_line = lines[0].strip()
            pattern = r'([\w\d\.-]+\.(tsx|jsx|ts|js|py|html|css|json|md))'
            match = re.search(pattern, first_line, re.IGNORECASE)

            if match:
                fname = match.group(1)
                f_found = False
                full_p = os.path.join(st.session_state.folder_path, fname)
                existing_lines = []

                for r, d, files in os.walk(st.session_state.folder_path):
                    if any(part.startswith('.') for part in r.split(os.sep)):
                        continue
                    for f in files:
                        if f.lower() == fname.lower():
                            f_found = True
                            full_p = os.path.join(r, f)
                            fname = f
                            try:
                                with open(full_p, 'r', encoding='utf-8') as ef:
                                    existing_lines = ef.readlines()
                            except:
                                existing_lines = []
                            break
                    if f_found:
                        break

                content_body = lines[1:] if len(lines) > 1 else []
                new_code_str = "\n".join(content_body).strip()
                start_idx, end_idx = find_precise_block_range(
                    existing_lines, content_body)

                if start_idx != -1:
                    st.warning(
                        f"🎯 **Block Match:** Baris {start_idx+1} - {end_idx+1}")
                else:
                    st.info(
                        "ℹ️ **No Match:** Kode akan ditambahkan ke bagian akhir file.")

                st.markdown("---")
                col1, col2, col3, col4 = st.columns(4)

                with col1:
                    if st.button("🛠️ Perbaiki", use_container_width=True, type="primary", disabled=(start_idx == -1)):
                        before = existing_lines[:start_idx]
                        after = existing_lines[end_idx + 1:]
                        final_output = "".join(
                            before) + new_code_str + "\n" + "".join(after)
                        if write_to_file(full_p, final_output):
                            st.toast(f"Updated: {fname}")
                            st.session_state.staged_content = None
                            st.rerun()

                with col2:
                    if st.button("➕ Sisipkan", use_container_width=True):
                        if start_idx != -1:
                            before = existing_lines[:start_idx]
                            remainder = existing_lines[start_idx:]
                            final_output = "".join(
                                before) + new_code_str + "\n\n" + "".join(remainder)
                        else:
                            existing_full = "".join(existing_lines)
                            final_output = existing_full.rstrip() + "\n\n" + \
                                new_code_str if f_found else new_code_str

                        if write_to_file(full_p, final_output):
                            st.toast(f"Inserted: {fname}")
                            st.session_state.staged_content = None
                            st.rerun()

                with col3:
                    if st.button("📝 Full", use_container_width=True):
                        if write_to_file(full_p, new_code_str):
                            st.toast(f"Overwritten: {fname}")
                            st.session_state.staged_content = None
                            st.rerun()

                with col4:
                    if st.button("❌ Batal", use_container_width=True):
                        st.session_state.staged_content = None
                        st.rerun()

                st.markdown("---")
                cl, cr = st.columns(2)
                with cl:
                    st.caption("📋 New")
                    st.code(new_code_str, language=fname.split('.')[-1])
                with cr:
                    st.caption("📄 Original")
                    st.code("".join(existing_lines),
                            language=fname.split('.')[-1])
            else:
                st.error("Filename mismatch!")
    else:
        st.caption("Ready to analyze.")
