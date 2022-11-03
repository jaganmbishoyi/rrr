using RRR.Models.EFModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RRR.Helper
{
    public class PostHelper
    {
        public string CreatePost(Ads ads)
        {
            try
            {
                using (RRRContext con = new RRRContext())
                {
                    ads.CreatedDate = DateTime.Now;
                    ads.Status = "Open";
                    con.Ads.Add(ads);
                    con.SaveChanges();

                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string UpdatePost(Ads ads)
        {
            try
            {
                using (RRRContext con = new RRRContext())
                {
                    var post = con.Ads.FirstOrDefault(a => a.Id == ads.Id);

                    if (post is null)
                    {
                        return "record not found";
                    }

                    post.Name = ads.Name;
                    post.Type = ads.Type;
                    post.ExpiryDate = ads.ExpiryDate;
                    post.Location = ads.Location;
                    post.Category = ads.Category;
                    post.Address = ads.Address;
                    post.AddressType = ads.AddressType;
                    post.ContactNumber = ads.ContactNumber;
                    post.ContactName = ads.ContactName;
                    post.Status = ads.Status;
                    post.ConsumerID = ads.ConsumerID;
                    post.Notes = ads.Notes;
                    post.UpdatedDate = DateTime.Now;
                    post.ProviderId = ads.ProviderId;
                    post.publicUserId = ads.publicUserId;

                    con.SaveChanges();

                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public Ads GetPost(int id)
        {
            using (RRRContext con = new RRRContext())
            {
                return con.Ads.FirstOrDefault(a => a.Id == id);
            }
        }

        public List<ConsumerNameWithAds> GetAllPost()
        {
            using (RRRContext con = new RRRContext())
            {
                var posts = con.Ads.ToList();

                var consumerNamewithAds = new List<ConsumerNameWithAds>();

                foreach (var ads in posts)
                {
                    var post = new ConsumerNameWithAds()
                    {
                        Id = ads.Id,
                        Name = ads.Name,
                        Type = ads.Type,
                        ExpiryDate = ads.ExpiryDate,
                        Location = ads.Location,
                        Category = ads.Category,
                        Address = ads.Address,
                        AddressType = ads.AddressType,
                        ContactNumber = ads.ContactNumber,
                        ContactName = ads.ContactName,
                        Status = ads.Status,
                        ConsumerID = ads.ConsumerID,
                        Notes = ads.Notes,
                        UpdatedDate = ads.UpdatedDate,
                        publicUserId = ads.publicUserId,
                        ProviderId = ads.ProviderId,
                        Consumers = GetInterestedConsumers(ads.ConsumerID, ads.individualConsumerId)
                    };

                    consumerNamewithAds.Add(post);
                }

                return consumerNamewithAds;
            }
        }

        public bool DeletePost(int id)
        {
            using (RRRContext con = new RRRContext())
            {
                var ads = con.Ads.FirstOrDefault(a => a.Id == id);

                if (ads is null)
                {
                    return false;
                }

                con.Ads.Remove(ads);
                con.SaveChanges();

                return true;
            }
        }

        public string GetInterestedConsumersName(string consumersIds)
        {
            if (!string.IsNullOrEmpty(consumersIds))
            {
                var listOfConsumers = consumersIds.Split(',').Select(int.Parse).ToList();
                using (RRRContext con = new RRRContext())
                {
                    var consumers = con.Consumers.Where(a => listOfConsumers.Any(b => b == a.Id)).Select(a => a.Name).ToList();
                    return string.Join(",", consumers);
                }
            }

            return string.Empty;
        }

        public string GetInterestedIndividualConsumerName(string individualsIds)
        {
            if (!string.IsNullOrEmpty(individualsIds))
            {
                var listOfConsumers = individualsIds.Split(',').Select(int.Parse).ToList();
                using (RRRContext con = new RRRContext())
                {
                    var consumers = con.PublicUsers.Where(a => listOfConsumers.Any(b => b == a.Id)).Select(a => a.FirstName + " " + a.LastName).ToList();
                    return string.Join(",", consumers);
                }
            }

            return string.Empty;
        }

        public Ads InterestedToCollectItems(int id, int consumerId, bool isIndividual)
        {
            using (RRRContext con = new RRRContext())
            {
                var ads = con.Ads.FirstOrDefault(a => a.Id == id);

                if (ads is null)
                {
                    return null;
                }

                if (!isIndividual && !string.IsNullOrEmpty(ads.ConsumerID))
                {
                    var consumerIDs = ads.ConsumerID.Split(',').Select(int.Parse).ToList();
                    consumerIDs.Add(consumerId);
                    ads.ConsumerID = string.Join<int>(",", consumerIDs);
                }
                else if(isIndividual && !string.IsNullOrEmpty(ads.individualConsumerId))
                {
                    var individualIDs = ads.individualConsumerId.Split(',').Select(int.Parse).ToList();
                    individualIDs.Add(consumerId);
                    ads.individualConsumerId = string.Join<int>(",", individualIDs);
                }
                else if(!isIndividual)
                {
                    ads.ConsumerID = consumerId.ToString();
                }
                else
                {
                    ads.individualConsumerId = consumerId.ToString();
                }

                con.SaveChanges();

                return ads;
            }
        }

        public Ads NotInterestedToCollectItems(int id, int consumerId, bool isIndividual)
        {
            using (RRRContext con = new RRRContext())
            {
                var ads = con.Ads.FirstOrDefault(a => a.Id == id);

                if (ads is null || !con.Ads.Any(a => a.Id == id && a.ConsumerID.Contains(consumerId.ToString())))
                {
                    return null;
                }

                if (!isIndividual && !string.IsNullOrEmpty(ads.ConsumerID))
                {
                    var consumerIDs = ads.ConsumerID.Split(',').Select(int.Parse).ToList();
                    consumerIDs.Remove(consumerId);
                    ads.ConsumerID = string.Join<int>(",", consumerIDs);
                }
                else if(isIndividual && !string.IsNullOrEmpty(ads.individualConsumerId))
                {
                    var individualIds = ads.ConsumerID.Split(',').Select(int.Parse).ToList();
                    individualIds.Remove(consumerId);
                    ads.individualConsumerId = string.Join<int>(",", individualIds);
                }


                con.SaveChanges();

                return ads;
            }
        }

        public List<ConsumerNameWithAds> GetPostsByProviderPosted(int providerId, bool isIndividual)
        {
            using (RRRContext con = new RRRContext())
            {
                var posts = new List<Ads>();

                if(isIndividual)
                {
                    posts = con.Ads.Where(a => a.publicUserId == providerId).ToList();
                }
                else
                {
                    posts = con.Ads.Where(a => a.ProviderId == providerId).ToList();
                }

                var consumerNamewithAds = new List<ConsumerNameWithAds>();

                foreach (var ads in posts)
                {
                    var post = new ConsumerNameWithAds()
                    {
                        Id = ads.Id,
                        Name = ads.Name,
                        Type = ads.Type,
                        ExpiryDate = ads.ExpiryDate,
                        Location = ads.Location,
                        Category = ads.Category,
                        Address = ads.Address,
                        AddressType = ads.AddressType,
                        ContactNumber = ads.ContactNumber,
                        ContactName = ads.ContactName,
                        Status = ads.Status,
                        ConsumerID = ads.ConsumerID,
                        ProviderId = ads.ProviderId,
                        publicUserId = ads.publicUserId,
                        Notes = ads.Notes,
                        UpdatedDate = DateTime.Now,
                        Consumers = GetInterestedConsumers(ads.ConsumerID, ads.individualConsumerId)
                    };

                    consumerNamewithAds.Add(post);
                }

                return consumerNamewithAds;
            }
        }

        private string GetInterestedConsumers(string consumerIds, string individualIds)
        {
            var providers = GetInterestedConsumersName(consumerIds);
            var individuals = GetInterestedIndividualConsumerName(individualIds);

            return providers + (!string.IsNullOrWhiteSpace(providers) ? "," : "") + individuals;
        }

        public string UpdateItemStatusCollected(int id)
        {
            try
            {
                using (RRRContext con = new RRRContext())
                {
                    var ads = con.Ads.FirstOrDefault(a => a.Id == id);

                    if(ads is null)
                    {
                        return "record not found";
                    }

                    ads.UpdatedDate = DateTime.Now;
                    ads.Status = "Collected";
                    con.Ads.Add(ads);
                    con.SaveChanges();

                    return "success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
