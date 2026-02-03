import streamlit as st
import os
import re
import time
import pyperclip
import json
from build_logic import create_react_vite, create_python_project
from deploy_logic import push_to_github, check_git_status
from editor_logic import open_folder_in_vscode, open_vscode_at_file, write_to_file

st.set_page_config(page_title="DevStack", page_icon="⚡", layout="centered")


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

with tab3:
    with st.container(border=True):
        st.markdown("**📂 Project Location**")
        c_path, c_f, c_v = st.columns([3, 0.5, 0.5])

        with c_path:
            st.session_state.folder_path = st.text_input(
                "Path", value=st.session_state.folder_path,
                label_visibility="collapsed", key=f"p_edit_{st.session_state.path_ver}"
            )
        with c_f:
            if st.button("📁", key="f_btn"):
                path = browse_folder()
                if path:
                    st.session_state.folder_path = path
                    st.session_state.path_ver += 1
                    st.rerun()
        with c_v:
            if st.button("🚀", key="v_btn"):
                if os.path.exists(st.session_state.folder_path):
                    from editor_logic import open_folder_in_vscode
                    open_folder_in_vscode(st.session_state.folder_path)

    st.divider()

    if st.button("📥 Paste & Review Clipboard", use_container_width=True, type="secondary"):
        import pyperclip
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

                for r, d, files in os.walk(st.session_state.folder_path):
                    if any(part.startswith('.') for part in r.split(os.sep)):
                        continue
                    for f in files:
                        if f.lower() == fname.lower():
                            f_found = True
                            full_p = os.path.join(r, f)
                            fname = f
                            break
                    if f_found:
                        break

                # --- BAGIAN ATAS: STATUS & TOMBOL ---
                st.info(
                    f"📍 **Target:** `{fname}` | **Status:** {'✅ Found' if f_found else '🆕 New File'}")

                col1, col2 = st.columns(2)
                with col1:
                    if st.button("✅ Apply Changes", use_container_width=True, type="primary"):
                        from editor_logic import write_to_file, open_vscode_at_file
                        body_lines = lines[1:] if len(
                            lines) > 1 else [lines[0]]
                        clean_body = "\n".join(body_lines).strip()

                        if write_to_file(full_p, clean_body):
                            st.toast(f"Success: {fname}")
                            open_vscode_at_file(full_p)
                            st.session_state.staged_content = None
                            st.rerun()
                with col2:
                    if st.button("❌ Discard", use_container_width=True):
                        st.session_state.staged_content = None
                        st.rerun()

                # --- BAGIAN BAWAH: CLIPBOARD PREVIEW ---
                st.markdown("### 📋 Clipboard Preview")
                with st.container(border=True):
                    st.code(st.session_state.staged_content)
            else:
                st.error("Nama file tidak terdeteksi di baris pertama!")
                if st.button("Clear"):
                    st.session_state.staged_content = None
                    st.rerun()
    else:
        st.caption("Klik tombol di atas untuk memproses kode.")
