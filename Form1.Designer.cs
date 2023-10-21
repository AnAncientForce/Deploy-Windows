namespace AfreshLock
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.richTextBox1 = new System.Windows.Forms.RichTextBox();
            this.serialPort1 = new System.IO.Ports.SerialPort(this.components);
            this.notifyIcon1 = new System.Windows.Forms.NotifyIcon(this.components);
            this.label2 = new System.Windows.Forms.Label();
            this.pb_refresh = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.lbl_operations = new System.Windows.Forms.Label();
            this.tlp_debug = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.clb_settings = new System.Windows.Forms.CheckedListBox();
            this.label1 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.pb_refresh)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // richTextBox1
            // 
            this.richTextBox1.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.richTextBox1.Location = new System.Drawing.Point(12, 147);
            this.richTextBox1.Name = "richTextBox1";
            this.richTextBox1.Size = new System.Drawing.Size(261, 282);
            this.richTextBox1.TabIndex = 0;
            this.richTextBox1.Text = "";
            // 
            // notifyIcon1
            // 
            this.notifyIcon1.Icon = ((System.Drawing.Icon)(resources.GetObject("notifyIcon1.Icon")));
            this.notifyIcon1.Text = "Flower";
            this.notifyIcon1.Visible = true;
            // 
            // label2
            // 
            this.label2.Font = new System.Drawing.Font("Segoe Print", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label2.Location = new System.Drawing.Point(12, 105);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(261, 39);
            this.label2.TabIndex = 8;
            this.label2.Text = "Console";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // pb_refresh
            // 
            this.pb_refresh.Image = ((System.Drawing.Image)(resources.GetObject("pb_refresh.Image")));
            this.pb_refresh.Location = new System.Drawing.Point(479, 12);
            this.pb_refresh.Name = "pb_refresh";
            this.pb_refresh.Size = new System.Drawing.Size(87, 79);
            this.pb_refresh.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pb_refresh.TabIndex = 9;
            this.pb_refresh.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::AfreshLock.Properties.Resources.cherry_blossom;
            this.pictureBox1.Location = new System.Drawing.Point(572, 12);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(216, 168);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pictureBox1.TabIndex = 4;
            this.pictureBox1.TabStop = false;
            // 
            // lbl_operations
            // 
            this.lbl_operations.Font = new System.Drawing.Font("Segoe Print", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lbl_operations.ForeColor = System.Drawing.SystemColors.WindowText;
            this.lbl_operations.Location = new System.Drawing.Point(286, 287);
            this.lbl_operations.Name = "lbl_operations";
            this.lbl_operations.Size = new System.Drawing.Size(200, 39);
            this.lbl_operations.TabIndex = 12;
            this.lbl_operations.Text = "Operations";
            this.lbl_operations.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // tlp_debug
            // 
            this.tlp_debug.ColumnCount = 2;
            this.tlp_debug.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tlp_debug.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tlp_debug.Location = new System.Drawing.Point(492, 329);
            this.tlp_debug.Name = "tlp_debug";
            this.tlp_debug.RowCount = 2;
            this.tlp_debug.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tlp_debug.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tlp_debug.Size = new System.Drawing.Size(200, 100);
            this.tlp_debug.TabIndex = 14;
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.ColumnCount = 2;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel2.Location = new System.Drawing.Point(286, 329);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 2;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(200, 100);
            this.tableLayoutPanel2.TabIndex = 15;
            // 
            // clb_settings
            // 
            this.clb_settings.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.clb_settings.Font = new System.Drawing.Font("Segoe Print", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.clb_settings.FormattingEnabled = true;
            this.clb_settings.Items.AddRange(new object[] {
            "Lock",
            "Process",
            "Debug"});
            this.clb_settings.Location = new System.Drawing.Point(572, 225);
            this.clb_settings.Name = "clb_settings";
            this.clb_settings.Size = new System.Drawing.Size(216, 84);
            this.clb_settings.TabIndex = 17;
            // 
            // label1
            // 
            this.label1.Font = new System.Drawing.Font("Segoe Print", 13.875F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.SystemColors.WindowText;
            this.label1.Location = new System.Drawing.Point(572, 183);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(216, 39);
            this.label1.TabIndex = 18;
            this.label1.Text = "Settings";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // Form1
            // 
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None;
            this.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.clb_settings);
            this.Controls.Add(this.tableLayoutPanel2);
            this.Controls.Add(this.tlp_debug);
            this.Controls.Add(this.lbl_operations);
            this.Controls.Add(this.pb_refresh);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.richTextBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Flower";
            ((System.ComponentModel.ISupportInitialize)(this.pb_refresh)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.RichTextBox richTextBox1;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.IO.Ports.SerialPort serialPort1;
        private System.Windows.Forms.NotifyIcon notifyIcon1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pb_refresh;
        private System.Windows.Forms.Label lbl_operations;
        private System.Windows.Forms.TableLayoutPanel tlp_debug;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        public System.Windows.Forms.CheckedListBox clb_settings;
        private System.Windows.Forms.Label label1;
    }
}

