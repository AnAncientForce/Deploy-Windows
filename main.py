import tkinter as tk
from tkinter import scrolledtext
import subprocess
import os

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
        print(f"> {package}")
        text_box.insert(tk.END, f"> {package}\n")
        text_box.see(tk.END)  # Auto-scroll to the end
        text_box.update_idletasks()
        
    for package in packages:
        print(f"Installing {package}...")
        text_box.insert(tk.END, f"Installing {package}...\n")
        text_box.see(tk.END)  # Auto-scroll to the end
        text_box.update_idletasks()
        
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
    
    print("All packages have been upgraded / installed")
    text_box.insert(tk.END, "All packages have been upgraded / installed\n")
    
    text_box.configure(state=tk.DISABLED)  # Disable editing the text box






root = tk.Tk()
root.title("Installer")
root.configure(bg="#6495ED")
root.geometry("400x400")

x_1 = tk.Button(root, text="Install Apps", command=install_applications)
x_4 = tk.Button(root, text="Restart Explorer", command=restart_explorer)

x_1.pack(pady=10, fill=tk.X)
x_4.pack(pady=10, fill=tk.X)

text_box = scrolledtext.ScrolledText(root, wrap=tk.WORD, height=30, width=40, state=tk.DISABLED)
text_box.pack(pady=10, padx=10)

center(root)
root.bind("<FocusOut>", on_focus_out)
root.mainloop()
