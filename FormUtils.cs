using System;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;

namespace AfreshLock
{
    internal class FormUtils
    {
        [DllImport("user32.dll", EntryPoint = "FindWindow", SetLastError = true)]
        public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

        [DllImport("user32.dll", EntryPoint = "SendMessage", SetLastError = true)]
        public static extern IntPtr SendMessage(IntPtr hWnd, int Msg, IntPtr wParam, IntPtr lParam);

        public const int WM_COMMAND = 0x111;
        public const int MIN_ALL = 419;
        public const int MIN_ALL_UNDO = 416;

        [DllImport("user32.dll")]
        public static extern IntPtr GetForegroundWindow();

        [DllImport("user32")]
        public static extern void LockWorkStation();

        [DllImport("user32")]
        public static extern bool SetForegroundWindow(IntPtr hWnd);

        [DllImport("user32.dll")]
        public static extern int PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
        public const uint WM_SYSCOMMAND = 0x0112;
        public const uint SC_TASKLIST = 0xF130;

        [DllImport("Gdi32.dll", EntryPoint = "CreateRoundRectRgn")]
        public static extern IntPtr CreateRoundRectRgn
       (
           int nLeftRect,
           int nTopRect,
           int nRightRect,
           int nBottomRect,
           int nWidthEllipse,
           int nHeightEllipse
       );

        public static class ConfigurationHandler
        {
            public static bool HandleAutoLoadSensor(string jsonConfig, string key)
            {
                JObject config = JObject.Parse(File.ReadAllText(jsonConfig, Encoding.UTF8));
                bool autoLoadSensor = (bool)config[key];
                return autoLoadSensor;
            }
        }

        public static class Shared
        {
            public static string json_settings = Path.Combine(Application.StartupPath, "settings.json");
        }
    }
    public class CustomButton : Button
    {
        public CustomButton()
        {
            this.BackColor = SystemColors.ActiveCaption;
            this.ForeColor = Color.White;
            this.Font = new Font("Arial", 16, FontStyle.Regular);
            this.Dock = DockStyle.Fill;
        }
    }
    public class CustomLabel : Label
    {
        public CustomLabel()
        {
            this.BackColor = Color.Transparent;
            this.ForeColor = Color.White;
            this.Font = new Font("Arial", 16, FontStyle.Regular);
            this.Dock = DockStyle.Fill;
            this.TextAlign = ContentAlignment.MiddleCenter;
        }
    }
}
