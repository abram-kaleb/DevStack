import streamlit as st
import os
from build_logic import create_react_vite, create_python_project
from deploy_logic import push_to_github, check_git_status
import tkinter as tk
from tkinter import filedialog
import re

st.set_page_config(page_title="DevStack", page_icon="⚡", layout="centered")


def clean_ansi(text):
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return ansi_escape.sub('', text)


def browse_folder():
    root = tk.Tk()
    root.withdraw()
    root.attributes('-topmost', True)
    path = filedialog.askdirectory(master=root)
    root.destroy()
    return path


if "folder_path" not in st.session_state:
    st.session_state.folder_path = os.getcwd()

if "path_ver" not in st.session_state:
    st.session_state.path_ver = 0


def update_path():
    path = browse_folder()
    if path:
        st.session_state.folder_path = path
        st.session_state.path_ver += 1


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

with tab3:
    with st.container(border=True):
        st.markdown("**Quick Open VS Code**")
        st.info("Pilih folder project untuk langsung membukanya di VS Code.")

        ce_path, ce_btn = st.columns([4, 1])
        with ce_path:
            st.session_state.folder_path = st.text_input(
                "Path Edit",
                value=st.session_state.folder_path,
                label_visibility="collapsed",
                key=f"path_e_{st.session_state.path_ver}"
            )
        with ce_btn:
            if st.button("📁", key="btn_e_browse"):
                update_path()
                st.rerun()

        if st.button("🚀 Open in VS Code", type="primary", use_container_width=True):
            if os.path.exists(st.session_state.folder_path):
                import subprocess
                subprocess.Popen(f'code .', shell=True,
                                 cwd=st.session_state.folder_path)
                st.toast(
                    f"Opening {os.path.basename(st.session_state.folder_path)}...")
            else:
                st.error("Path tidak valid.")
