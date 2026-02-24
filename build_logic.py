import subprocess
import os


def create_react_vite(path, project_name, lang):
    if not os.path.isdir(path):
        path = os.path.dirname(path)

    template = "react-ts" if lang == "TypeScript" else "react"
    project_dir = os.path.join(path, project_name)

    env = os.environ.copy()
    env["NO_COLOR"] = "1"
    env["CI"] = "true"

    cmd = (
        f'echo | npx create-vite@latest {project_name} --template {template} && '
        f'cd /d "{project_dir}" && '
        f'npm install && '
        f'npm install tailwindcss @tailwindcss/vite && '
        f'echo @import "tailwindcss"; > src/index.css && '
        f'echo @import "tailwindcss"; > src/App.css && '
        f'code . && '
        f'start cmd /k "npm run dev"'
    )

    return subprocess.Popen(
        cmd,
        shell=True,
        cwd=path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        stdin=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=env
    )

    return subprocess.Popen(
        cmd,
        shell=True,
        cwd=path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        stdin=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=env
    )


def create_python_project(path, project_name, stack):
    project_path = os.path.join(path, project_name)

    commands = [
        f'if not exist "{project_path}" mkdir "{project_path}"',
        f'cd /d "{project_path}"',
        'python -m venv venv',
        'venv\\Scripts\\pip install --upgrade pip'
    ]

    run_cmd = ""
    if stack == "FastAPI":
        commands.append('venv\\Scripts\\pip install fastapi uvicorn')
        commands.append('echo from fastapi import FastAPI > main.py')
        commands.append('echo app = FastAPI() >> main.py')
        run_cmd = 'venv\\Scripts\\uvicorn main:app --reload'
    elif stack == "Flask":
        commands.append('venv\\Scripts\\pip install flask')
        commands.append('echo from flask import Flask > app.py')
        run_cmd = 'venv\\Scripts\\python app.py'

    commands.append('code .')
    if run_cmd:
        commands.append(f'start cmd /k "{run_cmd}"')

    full_cmd = " && ".join(commands)

    return subprocess.Popen(
        full_cmd,
        shell=True,
        cwd=path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
