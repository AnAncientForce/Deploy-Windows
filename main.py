import tkinter as tk
from tkinter import scrolledtext
import time
import webbrowser
import subprocess
import os

addons = [
    "https://librewolf.net/installation/windows/",
    "https://addons.mozilla.org/en-US/firefox/addon/canvasblocker/",
    "https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/",
    "https://addons.mozilla.org/en-US/firefox/addon/bitwarden-password-manager/",
    "https://addons.mozilla.org/en-US/firefox/addon/clearurls/",
    "https://addons.mozilla.org/en-US/firefox/addon/duckduckgo-for-firefox/"
]
exes = [
    "https://librewolf.net/installation/windows/",
    "https://obsidian.md/download"
]
utils = [
    "https://github.com/ChrisTitusTech/winutil"
]

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


def install_applications():
    packages = [
    "rocksdanister.LivelyWallpaper",
    "ArduinoSA.IDE.stable",
    "ProtonTechnologies.ProtonVPN",
    "Microsoft.VisualStudioCode",
    "Obsidian.Obsidian",
    "LibreWolf.LibreWolf",
    "Oracle.VirtualBox",
    "Microsoft.PowerToys",
    "Microsoft.WindowsTerminal",
    "eloston.ungoogled-chromium",
    "OpenJS.NodeJS"
    ]

    '''
    DolphinEmulator.Dolphin
    '''
    
    text_box.configure(state=tk.NORMAL)  # Allow editing the text box
    
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



button_labels = ["Install Apps", "Open addons", "CTT", "Restart Explorer"]
commands = [install_applications, lambda: open_urls(addons), ctt, restart_explorer]

root = tk.Tk()
root.title("Installer")
root.configure(bg="#6495ED")
root.geometry("400x400")

buttons_frame = tk.Frame(root, bg="#6495ED")
buttons_frame.pack(pady=10, fill=tk.X)

for label, command in zip(button_labels, commands):
    button = tk.Button(buttons_frame, text=label, command=command)
    button.pack(pady=10, fill=tk.X)

text_box = scrolledtext.ScrolledText(root, wrap=tk.WORD, height=30, width=40, state=tk.DISABLED)
text_box.pack(pady=10, padx=10)

center(root)
root.bind("<FocusOut>", on_focus_out)
root.mainloop()
