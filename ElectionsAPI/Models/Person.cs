namespace ElectionsAPI.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public int VotingForPartyId { get; set; }
        public float Strength { get; set; }
    }
}
