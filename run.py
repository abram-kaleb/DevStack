import subprocess
import sys
import os


def run_streamlit():
    script_path = "main.py"

    if not os.path.exists(script_path):
        print(f"Error: {script_path} tidak ditemukan!")
        return

    try:
        subprocess.run(["streamlit", "run", script_path], check=True)
    except KeyboardInterrupt:
        print("\nStopping Streamlit...")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")


if __name__ == "__main__":
    run_streamlit()
