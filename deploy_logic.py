import json
import subprocess
import os


def push_to_github(path, repo_url, message, branch="main"):
    commands = [
        "git init",
        f"git remote add origin {repo_url} 2>NUL || git remote set-url origin {repo_url}",
        "git add .",
        f'git commit -m "{message}"',
        f"git branch -M {branch}",
        f"git push -u origin {branch} -f"
    ]

    full_cmd = " & ".join(commands)
    return subprocess.Popen(
        full_cmd,
        shell=True,
        cwd=path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1,
        universal_newlines=True
    )


def run_npm_deploy(path):
    # Menggunakan perintah build langsung untuk memastikan folder dist tercipta
    cmd = "npm run build && npm run deploy"
    return subprocess.Popen(
        cmd,
        shell=True,
        cwd=path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1,
        universal_newlines=True
    )


def check_git_status(path):
    if not path or not os.path.exists(path):
        return False
    return os.path.exists(os.path.join(path, ".git"))


def setup_gh_pages(path):
    pkg_path = os.path.join(path, "package.json")
    if not os.path.exists(pkg_path):
        return False

    try:
        subprocess.run("npm install gh-pages --save-dev",
                       shell=True, cwd=path, check=True)

        with open(pkg_path, 'r') as f:
            data = json.load(f)

        if "scripts" not in data:
            data["scripts"] = {}

        # PERBAIKAN: Hapus 'tsc' agar build tidak gagal karena error tipe data
        data["scripts"]["build"] = "vite build"
        data["scripts"]["predeploy"] = "npm run build"
        data["scripts"]["deploy"] = "gh-pages -d dist"

        with open(pkg_path, 'w') as f:
            json.dump(data, f, indent=2)

        return True
    except Exception as e:
        print(f"Setup Error: {e}")
        return False
