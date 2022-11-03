using RRR.Models.EFModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RRR.Models
{
    public class AdsModel: ConsumerNameWithAds
    {
        public string ProviderName { get; set; }
    }
}
