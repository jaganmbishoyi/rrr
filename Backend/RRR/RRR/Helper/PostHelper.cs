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

        public List<Ads> GetAllPost()
        {
            using (RRRContext con = new RRRContext())
            {
                return con.Ads.Where(a => a.ExpiryDate >= DateTime.Now).ToList();
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
    }
}
