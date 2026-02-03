# editor_logic.py
import os
import subprocess


def open_folder_in_vscode(folder_path):
    try:
        abs_path = os.path.abspath(folder_path)
        if os.path.exists(abs_path):
            if os.name == 'nt':
                subprocess.Popen(['cmd', '/c', 'code', '.'],
                                 cwd=abs_path, shell=True)
            else:
                subprocess.Popen(['code', '.'], cwd=abs_path)
            return True
        return False
    except:
        return False


def open_vscode_at_file(file_path):
    try:
        abs_path = os.path.abspath(file_path)
        if os.name == 'nt':
            subprocess.Popen(['cmd', '/c', 'code', '-g',
                             f'"{abs_path}"'], shell=True)
        else:
            subprocess.Popen(['code', '-g', f'"{abs_path}"'], shell=True)
        return True
    except:
        return False


def write_to_file(target_path, content):
    try:
        # Memastikan folder tujuan ada (khusus untuk file baru di subfolder)
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except:
        return False
