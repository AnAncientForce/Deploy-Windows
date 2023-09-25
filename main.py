import tkinter as tk
from tkinter import scrolledtext
import time
import webbrowser
import subprocess
import os
import json

root = None
entry = None
def createRoot():
    global root
    root = tk.Tk()

def initialize():
    global current_user
    current_user = os.getlogin()

with open('data.json', 'r') as file:
    data = json.load(file)
addons = data['addons']
exes = data['exes']
utils = data['utils']
packages = data['packages']
portable_exes = data['portable_exes']
'''
DolphinEmulator.Dolphin
Cemu.Cemu
'''


def on_focus_out(event):
    root.destroy()

def center(window):
    window.update_idletasks()
    width = window.winfo_width()
    height = window.winfo_height()
    x = (window.winfo_screenwidth() // 2) - (width // 2)
    y = (window.winfo_screenheight() // 2) - (height // 2)
    window.geometry('{}x{}+{}+{}'.format(width, height, x, y))

def restart_explorer():
    try:
        os.system("taskkill /f /im explorer.exe")
        os.system("start explorer.exe")
    except Exception as e:
        print(f"Error: {e}")


def open_urls(urls):
     for url in urls:
        webbrowser.open(url, new=0)
        log(f"> {url}\n")
        time.sleep(0.3)

def ctt():
    command = [
    "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    "Start-Process",
    "powershell.exe",
    "-Verb",
    "RunAs",
    "-ArgumentList",
    "'irm https://christitus.com/win | iex'"
    ]
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")


def set_lockscreen_wallpaper():
    wallpaper_path = os.path.join(os.getcwd(), 'wallpapers', 'LockScreenWallpaper.jpg')
    os.system(f'igcmdWin10.exe setlockimage {wallpaper_path}')



def install_applications():
    for package in packages:
        log(f"> {package}\n")
        
    for package in packages:
        log(f"Installing {package}...\n")
        
        try:
            result = subprocess.run(["winget", "install", package], capture_output=True, text=True)
            if result.returncode == 0:
                print(f"{package} has been successfully installed.")
                text_box.insert(tk.END, f"{package} has been successfully installed.\n")
            else:
                error_msg = f"Failed to install {package}. Error: {result.stdout}\n{result.stderr}"
                print(error_msg)
                text_box.insert(tk.END, error_msg + "\n")
        except Exception as e:
            error_msg = f"An error occurred while installing {package}: {e}"
            print(error_msg)
            text_box.insert(tk.END, error_msg + "\n")
    log("All packages have been upgraded / installed\n")


def log(v):
    print(v)
    text_box.configure(state=tk.NORMAL)  # Allow editing the text box
    text_box.insert(tk.END, v)
    text_box.see(tk.END)  # Auto-scroll to the end
    text_box.update_idletasks()
    text_box.configure(state=tk.DISABLED)

def get_input(event=None):
    user_input = entry.get()
    entry.delete(0, tk.END)
    log(user_input)

def clear_tk_elements(root):
    root.attributes('-fullscreen', False) 
    for child in root.winfo_children():
        child.destroy()


def home():
    global root, text_box
    clear_tk_elements(root)
    button_labels = ["Install Apps", "Open addons", "Open portable apps", "CTT", "Set Lockscreen Wallpaper", "yt-dlp", "Restart Explorer"]
    commands = [install_applications, lambda: open_urls(addons), lambda: open_urls(portable_exes), ctt, set_lockscreen_wallpaper, yt_dlp, restart_explorer]

    root.title("Installer")
    root.configure(bg="#6495ED")
    root.geometry("400x600")

    buttons_frame = tk.Frame(root, bg="#6495ED")
    buttons_frame.pack(pady=10, fill=tk.X)

    for label, command in zip(button_labels, commands):
        button = tk.Button(buttons_frame, text=label, command=command)
        button.pack(pady=10, fill=tk.X)
    

    text_box = scrolledtext.ScrolledText(root, wrap=tk.WORD, height=30, width=40, state=tk.DISABLED)
    text_box.pack(pady=10, padx=10)

    center(root)
    # root.bind("<FocusOut>", on_focus_out)
    root.mainloop()



def yt_playlist():
    global entry, current_user
    user_input = entry.get()
    entry.delete(0, tk.END)
    log("Downloading playlist...")
    download_command = f'C:/Users/{current_user}/AppData/Local/Microsoft/WinGet/Packages/yt-dlp.yt-dlp_Microsoft.Winget.Source_8wekyb3d8bbwe/yt-dlp -f "bestvideo[ext=mp4]" --output "C:/Users/{current_user}/Downloads/%(playlist_title)s/%(title)s.%(ext)s" "{user_input}"'
    try:
        user_directory = f"C:/Users/{current_user}"
        os.chdir(user_directory)

        subprocess.run(download_command, shell=True, check=True)
        log("Playlist downloaded successfully!")
    except subprocess.CalledProcessError as e:
        log(f"Error downloading playlist: {e}")


def yt_dlp():
    global root, entry, text_box
    clear_tk_elements(root)
    root.title("yt-dlp")
    root.configure(bg="#6495ED")
    root.geometry("400x600")

    entry = tk.Entry(root)
    entry.pack(pady=10, fill=tk.X)
    entry.bind('<Return>', get_input)

    button_labels = ["Download Playlist (no audio, best quality)", "Return"]
    commands = [yt_playlist, home]

    buttons_frame = tk.Frame(root, bg="#6495ED")
    buttons_frame.pack(pady=10, fill=tk.X)

    for label, command in zip(button_labels, commands):
        button = tk.Button(buttons_frame, text=label, command=command)
        button.pack(pady=10, fill=tk.X)
    
    text_box = scrolledtext.ScrolledText(root, wrap=tk.WORD, height=30, width=40, state=tk.DISABLED)
    text_box.pack(pady=10, padx=10)

    center(root)
    root.mainloop()

# setup
initialize()
createRoot()
home()

