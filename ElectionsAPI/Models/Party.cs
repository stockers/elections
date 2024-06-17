using System.Security.Cryptography.Xml;

namespace ElectionsAPI.Models
{
    public class Party
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
    }
}
