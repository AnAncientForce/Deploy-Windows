namespace AfreshLock
{
    partial class Main
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Main));
            this.label1 = new System.Windows.Forms.Label();
            this.richTextBox1 = new System.Windows.Forms.RichTextBox();
            this.panelCheckboxes = new System.Windows.Forms.FlowLayoutPanel();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.tlp_top = new System.Windows.Forms.TableLayoutPanel();
            this.btn_ctt = new System.Windows.Forms.Button();
            this.btn_set_lock_bg = new System.Windows.Forms.Button();
            this.btn_res_exp = new System.Windows.Forms.Button();
            this.flp_right = new System.Windows.Forms.FlowLayoutPanel();
            this.btn_god_mode = new System.Windows.Forms.Button();
            this.pb_min = new System.Windows.Forms.PictureBox();
            this.pb_quit = new System.Windows.Forms.PictureBox();
            this.bg = new System.Windows.Forms.PictureBox();
            this.tableLayoutPanel2.SuspendLayout();
            this.tlp_top.SuspendLayout();
            this.flp_right.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pb_min)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pb_quit)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.bg)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.label1.BackColor = System.Drawing.Color.Transparent;
            this.label1.Font = new System.Drawing.Font("Segoe Print", 19.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.White;
            this.label1.Location = new System.Drawing.Point(637, 0);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(625, 106);
            this.label1.TabIndex = 19;
            this.label1.Text = "Main Interface";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // richTextBox1
            // 
            this.richTextBox1.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.richTextBox1.Location = new System.Drawing.Point(4, 174);
            this.richTextBox1.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.richTextBox1.Name = "richTextBox1";
            this.richTextBox1.ReadOnly = true;
            this.richTextBox1.Size = new System.Drawing.Size(366, 228);
            this.richTextBox1.TabIndex = 23;
            this.richTextBox1.Text = "";
            this.richTextBox1.Enter += new System.EventHandler(this.richTextBox1_Enter);
            // 
            // panelCheckboxes
            // 
            this.panelCheckboxes.BackColor = System.Drawing.Color.Transparent;
            this.panelCheckboxes.Location = new System.Drawing.Point(4, 4);
            this.panelCheckboxes.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.panelCheckboxes.Name = "panelCheckboxes";
            this.panelCheckboxes.Size = new System.Drawing.Size(366, 162);
            this.panelCheckboxes.TabIndex = 22;
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tableLayoutPanel2.BackColor = System.Drawing.Color.Transparent;
            this.tableLayoutPanel2.ColumnCount = 3;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tableLayoutPanel2.Controls.Add(this.pb_min, 1, 0);
            this.tableLayoutPanel2.Controls.Add(this.pb_quit, 2, 0);
            this.tableLayoutPanel2.Location = new System.Drawing.Point(1412, 4);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 1;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(484, 98);
            this.tableLayoutPanel2.TabIndex = 26;
            // 
            // tlp_top
            // 
            this.tlp_top.BackColor = System.Drawing.Color.Transparent;
            this.tlp_top.ColumnCount = 3;
            this.tlp_top.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tlp_top.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tlp_top.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 33.33333F));
            this.tlp_top.Controls.Add(this.tableLayoutPanel2, 2, 0);
            this.tlp_top.Controls.Add(this.label1, 1, 0);
            this.tlp_top.Location = new System.Drawing.Point(0, 0);
            this.tlp_top.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.tlp_top.Name = "tlp_top";
            this.tlp_top.RowCount = 1;
            this.tlp_top.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tlp_top.Size = new System.Drawing.Size(1900, 106);
            this.tlp_top.TabIndex = 27;
            // 
            // btn_ctt
            // 
            this.btn_ctt.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btn_ctt.Font = new System.Drawing.Font("Microsoft Sans Serif", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_ctt.ForeColor = System.Drawing.Color.White;
            this.btn_ctt.Location = new System.Drawing.Point(4, 586);
            this.btn_ctt.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btn_ctt.Name = "btn_ctt";
            this.btn_ctt.Size = new System.Drawing.Size(366, 82);
            this.btn_ctt.TabIndex = 6;
            this.btn_ctt.Text = "CTT";
            this.btn_ctt.UseVisualStyleBackColor = false;
            this.btn_ctt.Click += new System.EventHandler(this.btn_sensor_Click);
            // 
            // btn_set_lock_bg
            // 
            this.btn_set_lock_bg.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btn_set_lock_bg.Font = new System.Drawing.Font("Microsoft Sans Serif", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_set_lock_bg.ForeColor = System.Drawing.Color.White;
            this.btn_set_lock_bg.Location = new System.Drawing.Point(4, 498);
            this.btn_set_lock_bg.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btn_set_lock_bg.Name = "btn_set_lock_bg";
            this.btn_set_lock_bg.Size = new System.Drawing.Size(366, 80);
            this.btn_set_lock_bg.TabIndex = 8;
            this.btn_set_lock_bg.Text = "Apply LOCK_BG";
            this.btn_set_lock_bg.UseVisualStyleBackColor = false;
            this.btn_set_lock_bg.Click += new System.EventHandler(this.btn_end_Click);
            // 
            // btn_res_exp
            // 
            this.btn_res_exp.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btn_res_exp.Font = new System.Drawing.Font("Microsoft Sans Serif", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_res_exp.ForeColor = System.Drawing.Color.White;
            this.btn_res_exp.Location = new System.Drawing.Point(4, 410);
            this.btn_res_exp.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.btn_res_exp.Name = "btn_res_exp";
            this.btn_res_exp.Size = new System.Drawing.Size(366, 80);
            this.btn_res_exp.TabIndex = 7;
            this.btn_res_exp.Text = "Restart Explorer";
            this.btn_res_exp.UseVisualStyleBackColor = false;
            this.btn_res_exp.Click += new System.EventHandler(this.btn_load_Click);
            // 
            // flp_right
            // 
            this.flp_right.BackColor = System.Drawing.Color.Transparent;
            this.flp_right.Controls.Add(this.panelCheckboxes);
            this.flp_right.Controls.Add(this.richTextBox1);
            this.flp_right.Controls.Add(this.btn_res_exp);
            this.flp_right.Controls.Add(this.btn_set_lock_bg);
            this.flp_right.Controls.Add(this.btn_ctt);
            this.flp_right.Controls.Add(this.btn_god_mode);
            this.flp_right.Location = new System.Drawing.Point(1378, 96);
            this.flp_right.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.flp_right.Name = "flp_right";
            this.flp_right.Size = new System.Drawing.Size(518, 1034);
            this.flp_right.TabIndex = 29;
            // 
            // btn_god_mode
            // 
            this.btn_god_mode.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.btn_god_mode.Font = new System.Drawing.Font("Microsoft Sans Serif", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_god_mode.ForeColor = System.Drawing.Color.White;
            this.btn_god_mode.Location = new System.Drawing.Point(4, 676);
            this.btn_god_mode.Margin = new System.Windows.Forms.Padding(4);
            this.btn_god_mode.Name = "btn_god_mode";
            this.btn_god_mode.Size = new System.Drawing.Size(366, 82);
            this.btn_god_mode.TabIndex = 26;
            this.btn_god_mode.Text = "God Mode";
            this.btn_god_mode.UseVisualStyleBackColor = false;
            this.btn_god_mode.Click += new System.EventHandler(this.btn_god_mode_Click);
            // 
            // pb_min
            // 
            this.pb_min.BackColor = System.Drawing.Color.Transparent;
            this.pb_min.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pb_min.Location = new System.Drawing.Point(165, 4);
            this.pb_min.Margin = new System.Windows.Forms.Padding(4);
            this.pb_min.Name = "pb_min";
            this.pb_min.Size = new System.Drawing.Size(153, 90);
            this.pb_min.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pb_min.TabIndex = 25;
            this.pb_min.TabStop = false;
            this.pb_min.Click += new System.EventHandler(this.pb_min_Click);
            // 
            // pb_quit
            // 
            this.pb_quit.BackColor = System.Drawing.Color.Transparent;
            this.pb_quit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pb_quit.Image = ((System.Drawing.Image)(resources.GetObject("pb_quit.Image")));
            this.pb_quit.Location = new System.Drawing.Point(326, 4);
            this.pb_quit.Margin = new System.Windows.Forms.Padding(4);
            this.pb_quit.Name = "pb_quit";
            this.pb_quit.Size = new System.Drawing.Size(154, 90);
            this.pb_quit.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pb_quit.TabIndex = 20;
            this.pb_quit.TabStop = false;
            this.pb_quit.Click += new System.EventHandler(this.pb_quit_Click);
            // 
            // bg
            // 
            this.bg.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.bg.BackColor = System.Drawing.Color.Transparent;
            this.bg.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.bg.Location = new System.Drawing.Point(0, 116);
            this.bg.Margin = new System.Windows.Forms.Padding(4);
            this.bg.Name = "bg";
            this.bg.Size = new System.Drawing.Size(1370, 1014);
            this.bg.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.bg.TabIndex = 28;
            this.bg.TabStop = false;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(11F, 24F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.HotTrack;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(1900, 1130);
            this.Controls.Add(this.flp_right);
            this.Controls.Add(this.tlp_top);
            this.Controls.Add(this.bg);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(4, 4, 4, 4);
            this.Name = "Main";
            this.Text = "Main";
            this.Activated += new System.EventHandler(this.Main_Activated);
            this.Deactivate += new System.EventHandler(this.Main_Deactivate);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tlp_top.ResumeLayout(false);
            this.flp_right.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pb_min)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pb_quit)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.bg)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.PictureBox pb_quit;
        private System.Windows.Forms.RichTextBox richTextBox1;
        private System.Windows.Forms.FlowLayoutPanel panelCheckboxes;
        private System.Windows.Forms.PictureBox pb_min;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.TableLayoutPanel tlp_top;
        private System.Windows.Forms.PictureBox bg;
        private System.Windows.Forms.Button btn_ctt;
        private System.Windows.Forms.Button btn_set_lock_bg;
        private System.Windows.Forms.Button btn_res_exp;
        private System.Windows.Forms.FlowLayoutPanel flp_right;
        private System.Windows.Forms.Button btn_god_mode;
    }
}