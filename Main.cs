using System;
using System.Drawing;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Diagnostics;
using static AfreshLock.FormUtils;
using System.Linq;
using System.Collections.Generic;

namespace AfreshLock
{
    public partial class Main : Form
    {
        private JObject config;
        private Process wallpaperProcess;
        private string[] blacklisted = { "tlp_top", "flp_right" };
        private Dictionary<Control, Color> originalBorderColors = new Dictionary<Control, Color>();
        private Dictionary<Control, Color> originalColors = new Dictionary<Control, Color>();
        private Color semiTransparentBlack;
        private UserControl settingsUC;
        private static string exeDir = Application.StartupPath;

        public Main()
        {
            InitializeComponent();
            StartPosition = FormStartPosition.CenterScreen;
            FormBorderStyle = FormBorderStyle.None;
            Region = Region.FromHrgn(CreateRoundRectRgn(0, 0, Width, Height, 20, 20));
            /*
            foreach (Control control in Controls)
            {
                if (!string.IsNullOrEmpty(control.Name) && !blacklisted.Contains(control.Name))
                {
                    control.Region = Region.FromHrgn(CreateRoundRectRgn(0, 0, control.Width, control.Height, 20, 20));
                }
            }
            */
            if (!ConfigurationHandler.HandleAutoLoadSensor(Shared.json_settings, "dev"))
            {
                richTextBox1.Visible = false;
            }
            string imgPath = Path.Combine(Application.StartupPath, "images/bamboo.png");
            if (File.Exists(imgPath))
            {
                BackgroundImage = Image.FromFile(imgPath);
            }
            setImg(bg, "windows-logo.gif");
            setImg(pb_min, "expand.png");
            setImg(pb_quit, "exit.png");
            semiTransparentBlack = Color.FromArgb(128, Color.Black);
            tlp_top.BackColor = semiTransparentBlack;
            flp_right.BackColor = semiTransparentBlack;
            AttachEventHandlersToControls(this);
        }

     
        private void AttachEventHandlersToControls(Control parentControl)
        {
            List<Type> excludedTypes = new List<Type>
            {
            typeof(Button),
            typeof(FlowLayoutPanel),
            typeof(TableLayoutPanel)
            };

            foreach (Control control in parentControl.Controls)
            {
                if (control is Button || control is PictureBox)
                {
                    // Store the original color before attaching the event handlers
                    originalColors[control] = control.BackColor;

                    control.MouseEnter += Control_MouseEnter;
                    control.MouseLeave += Control_MouseLeave;
                }

                if (!excludedTypes.Contains(control.GetType()))
                {
                    control.Region = Region.FromHrgn(CreateRoundRectRgn(0, 0, control.Width, control.Height, 20, 20));
                }

                // Recursively check nested controls
                AttachEventHandlersToControls(control);
            }
        }


        private void setImg(PictureBox imgObj, string name)
        {
            string imgPath = Path.Combine(Application.StartupPath, "images/" + name);

            if (File.Exists(imgPath))
            {
                imgObj.Image = Image.FromFile(imgPath);
            }
        }

        private void log(string msg)
        {
            richTextBox1.AppendText('\n' + msg + '\n');
            richTextBox1.ScrollToCaret();
        }



        private void killProc(string proc)
        {
            var explorers = Process.GetProcessesByName(proc);
            foreach (var thisExplorer in explorers)
            {
                thisExplorer.Kill();
            }
        }



        private void Control_MouseEnter(object sender, EventArgs e)
        {
            Control control = sender as Control;

            if (control != null)
            {
                control.BackColor = semiTransparentBlack;
            }
        }
        private void Control_MouseLeave(object sender, EventArgs e)
        {
            Control control = sender as Control;

            if (control != null)
            {
                if (originalColors.ContainsKey(control))
                {
                    control.BackColor = originalColors[control];
                }
            }
        }



        private void btn_sensor_Click(object sender, EventArgs e)
        {
            /*
            Form1 f1 = Application.OpenForms.OfType<Form1>().FirstOrDefault();

            if (f1 == null)
            {
                f1 = new Form1();
                f1.Show();
            }
            else
            {
                f1.Focus();
            }
            */
            string command = "Start-Process powershell.exe -Verb RunAs -ArgumentList 'irm https://christitus.com/win | iex'";
            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = @"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe",
                    Arguments = $"-ExecutionPolicy Bypass -Command \"{command}\"",
                    UseShellExecute = true,
                    Verb = "runas" // Run as administrator
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        private void pb_quit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void btn_load_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start("powershell.exe", "Stop-Process -Name explorer -Force; Start-Process explorer");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error", $"{ex.Message}", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btn_end_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start(Path.Combine(exeDir, "igcmdWin10.exe"), $"setlockimage {Path.Combine(exeDir, "images", "LockScreenWallpaper.jpg")}");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error", $"{ex.Message}", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void pb_min_Click(object sender, EventArgs e)
        {
            WindowState = FormWindowState.Minimized;
        }

        private void Main_Activated(object sender, EventArgs e)
        {
            bg.Enabled = true;
        }

        private void Main_Deactivate(object sender, EventArgs e)
        {
            bg.Enabled = false;
        }

        private void richTextBox1_Enter(object sender, EventArgs e)
        {
            btn_ctt.Focus();
        }

        private void btn_bluetooth_Click(object sender, EventArgs e)
        {
            Process.Start(Path.Combine(Application.StartupPath, "connect.bat"));
        }


        private void btn_settings_Click(object sender, EventArgs e)
        {
            if (settingsUC != null)
            {
                settingsUC.Dispose();
            }

            settingsUC = new Settings();
            settingsUC.Location = new Point(
                (Width - settingsUC.Width) / 2,
                (Height - settingsUC.Height) / 2
            );
            Controls.Add(settingsUC);
            settingsUC.BringToFront();
        }

        private void btn_god_mode_Click(object sender, EventArgs e)
        {
            try
            {
                Process.Start("explorer.exe", "shell:::{ED7BA470-8E54-465E-825C-99712043E01C}");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error", $"{ex.Message}", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
