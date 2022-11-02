using System;

namespace RRR.Models.EFModels
{
    public class Ads
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public DateTime ExpiryDate { get; set; }

        public string Location { get; set; }

        public string Category { get; set; }

        public string Address { get; set; }

        public string AddressType { get; set; }

        public string ContactNumber { get; set; }

        public string ContactName { get; set; }

        public int CreatedBy { get; set; }

        public string Status { get; set; }

        public string ConsumerID { get; set; }

        public string Notes { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}
