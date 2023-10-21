using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Newtonsoft.Json.Linq;
using static AfreshLock.FormUtils;

namespace AfreshLock
{
    public partial class Settings : UserControl
    {
        private JObject config;
        public Settings()
        {
            InitializeComponent();
            SetupCheckboxes();
            Region = Region.FromHrgn(CreateRoundRectRgn(0, 0, Width, Height, 20, 20));
            string imgPath = Path.Combine(Application.StartupPath, "images/bg23.png");
            if (File.Exists(imgPath))
            {
                BackgroundImage = Image.FromFile(imgPath);
            }
        }

        private void SetupCheckboxes()
        {
            string jsonConfigPath = Shared.json_settings;
            string jsonConfig = File.ReadAllText(jsonConfigPath);
            config = JObject.Parse(jsonConfig);

            foreach (var kvp in config)
            {
                string key = kvp.Key;
                JToken value = kvp.Value;

                if (value.Type == JTokenType.Boolean)
                {
                    CheckBox checkBox = new CheckBox();
                    checkBox.Text = key;
                    checkBox.Checked = (bool)value;
                    checkBox.Name = key; // Set the name to the key for reference
                    checkBox.ForeColor = Color.White;
                    checkBox.Font = new Font(checkBox.Font.FontFamily, 12, checkBox.Font.Style);

                    checkBox.CheckedChanged += (sender, e) =>
                    {
                        bool isChecked = checkBox.Checked;
                        config[key] = isChecked;
                        File.WriteAllText(jsonConfigPath, config.ToString());
                    };

                    // Calculate and set the location for the checkbox
                    int yOffset = Controls.Count * 30 + 10;
                    checkBox.Location = new Point(10, yOffset);

                    panelCheckboxes.Controls.Add(checkBox);
                }
            }
        }

        private void Settings_Load(object sender, EventArgs e)
        {

        }

        private void btn_cancel_Click(object sender, EventArgs e)
        {
            Dispose();
        }

        private void btn_confirm_Click(object sender, EventArgs e)
        {
            Dispose();
        }
    }
}
