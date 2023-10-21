using GlobalHotKey;
using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Ports;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using YourNamespace;
using static AfreshLock.FormUtils;

namespace AfreshLock
{
    public partial class Form1 : Form
    {
        private readonly HotKeyManager _hotKeyManager;
        private Dictionary<string, string> processKeyMappings;
        private Dictionary<string, string> processUnlockMappings;
        public bool isLocked;
        bool IsConnected = false;
        bool SystemLocked = false;
        int maxUsages = 0;
        bool debug = false;

        public Form1()
        {
            InitializeComponent();
        }
    }
}
