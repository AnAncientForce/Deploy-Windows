using Microsoft.Win32;
using System;
using System.Drawing;
using System.IO.Ports;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace AfreshLock



{
    public partial class Form2 : Form
    {
        [DllImport("user32")]
        public static extern void LockWorkStation();

        //private bool c0;
        //private bool c1;
        //private bool c2;
        //private int i;

        // char[] seq = { 'K', 'J', 'M' };

        public Form2()
        {
            InitializeComponent();
            /*
            SystemEvents.SessionSwitch += new SessionSwitchEventHandler((sender, e) => // Text is reset every time screen is unlocked or locked!
            {
                switch (e.Reason)
                {
                    case SessionSwitchReason.SessionLock:
                        lbl_msg.Text = "";
                        break;

                    case SessionSwitchReason.SessionUnlock:
                        lbl_msg.Text = "";
                        break;
                }
            });
            timer1.Enabled = true;
            */
        }

        /*
        private void gainFocus()
        {
            this.Focus();
            this.BringToFront();
            this.TopMost = true;

            Focus();
            BringToFront();
        }

        private void checkKeyCorrect()
        {
            // If all keys are correct, unlock
            if (c0 && c1 && c2)
            {
                lbl_msg.Text = "Authentication Completed"; // Completed, Successful
                lbl_msg.ForeColor = Color.LightGreen;
                var f1 = (Form1)Application.OpenForms["Form1"];
                f1.Unlock();
            }
        }
        */

        private void Form2_KeyDown(object sender, KeyEventArgs e)
        {

            if (e.KeyCode == Keys.K)
            {
                Console.Beep();
                var f1 = (Form1)Application.OpenForms["Form1"];
                f1.isLocked = false;
                // f1.Unlock();
                Close();

            }
            if (e.KeyCode == Keys.A)
            {
                LockWorkStation();
            }
            /*
            lbl_msg.Text += i.ToString() + "    ";
            lbl_msg.ForeColor = Color.White;
            i++;

            // If a correct key, return
            switch (e.KeyCode)
            {
                case Keys.R:
                    if (!c1 && !c2)
                    {
                        c0 = true;
                    }
                    return;

                case Keys.S:
                    if (c0)
                    {
                        c1 = true;
                    }
                    return;

                case Keys.C:
                    if (c1)
                    {
                        c2 = true;
                        checkKeyCorrect();
                    }
                    return;
            }

            // Reset all keys
            lbl_msg.Text = "Authentication Failed";
            lbl_msg.ForeColor = Color.Red;
            i = 0;
            c0 = false;
            c1 = false;
            c2 = false;

            LockWorkStation();

            // --------------------------------------------------------------------------------
            // var f1 = (Form1)Application.OpenForms["Form1"];
            // f1.Unlock();
            // Process.Start(@"C:\WINDOWS\system32\rundll32.exe", "user32.dll,LockWorkStation");
            */
        }

       
    }
}
