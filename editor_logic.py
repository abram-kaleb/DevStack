import os
import subprocess
import re


def write_to_file(file_path, content):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"Error writing file: {e}")
        return False


def open_folder_in_vscode(folder_path):
    try:
        subprocess.Popen(['code', folder_path], shell=True)
    except Exception as e:
        print(f"Error opening VSCode: {e}")


def open_vscode_at_file(file_path):
    try:
        subprocess.Popen(['code', '-g', file_path], shell=True)
    except Exception as e:
        print(f"Error opening file in VSCode: {e}")


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
