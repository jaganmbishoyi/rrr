using System;
using System.Collections.Generic;

#nullable disable

namespace RRR.Models.EFModels
{
    public partial class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string ContactPerson { get; set; }
        public string Location { get; set; }
        public bool? Verified { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
