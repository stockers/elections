namespace ElectionsAPI.Models
{
    public class PartyVotes
    {
        public string? PhotoUrl { get; set; }
        public int PartyId { get; set; }
        public string PartyName { get; set; }
        public float? Strength { get; set; }
        public float? Votes { get; set; }      
    }
}
