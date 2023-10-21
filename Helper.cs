using System.Collections.Generic;
using System.IO;
using System.Linq;
using AfreshLock;
using YamlDotNet.Serialization;

namespace YourNamespace
{
    public class Helper
{
	
    

    public static string filePath = @"C:\Library\Configurations\sensor.yaml";


    public static void LoadPreviouslySaved(Form1 form)
    {
            // Create a copy of the items in the CheckedListBox
            var items = form.clb_settings.Items.Cast<string>().ToList();

            // Iterate through the copied items collection
            foreach (var item in items)
            {
                if (!string.IsNullOrEmpty(item))
                {
                    bool value = YamlTrue(item);

                    // Use the null-conditional operator when calling IndexOf
                    int index = form.clb_settings.Items.IndexOf(item);
                    if (index != -1)
                    {
                        form.clb_settings.SetItemChecked(index, value);
                    }
                }
            }
        }


    public static void YamlSetValue(string valueName, bool value)
    {
        Dictionary<string, bool> data;

        if (File.Exists(filePath))
        {
            var deserializer = new DeserializerBuilder().Build();
            var yaml = File.ReadAllText(filePath);
            data = deserializer.Deserialize<Dictionary<string, bool>>(yaml);
        }
        else
        {
            data = new Dictionary<string, bool>();
        }

        data[valueName] = value;

        var serializer = new SerializerBuilder().Build();
        var newYaml = serializer.Serialize(data);

        File.WriteAllText(filePath, newYaml);
    }

    public static bool YamlTrue(string valueName)
    {
        if (File.Exists(filePath))
        {
            var deserializer = new DeserializerBuilder().Build();
            var yaml = File.ReadAllText(filePath);
            var data = deserializer.Deserialize<Dictionary<string, bool>>(yaml);

            if (data.TryGetValue(valueName, out bool value))
            {
                return value;
            }
        }

        // Return false if the YAML file doesn't exist or the value is not found
        return false;
    }
    }
}
