using Microsoft.AspNetCore.Mvc;
using RRR.Helper;
using RRR.Models;
using RRR.Models.EFModels;
using System;
using System.Linq;
using System.Text;

namespace RRR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsumersController : ControllerBase
    {
        private readonly PostHelper postHelper;

        public ConsumersController()
        {
            // Need to migrate as dependency injection
            postHelper = new PostHelper();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Consumer provider)
        {
            using (RRRContext con = new RRRContext())
            {
                var validateUser = con.Consumers.Where(s => s.ContactNo == provider.ContactNo).FirstOrDefault();
                if (validateUser == null)
                {
                    byte[] getBytes = Encoding.UTF8.GetBytes(provider.Password);
                    string encryptPassword = Convert.ToBase64String(getBytes);
                    provider.Password = encryptPassword;
                    con.Consumers.Add(provider);
                    con.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest("User validation failed");
                }
            }
        }

        [HttpPost]
        [Route("Auth")]
        public IActionResult Login([FromBody] AuthModel authModel)
        {
            using (RRRContext con = new RRRContext())
            {
                var validateUser = con.Consumers.Where(s => s.ContactNo == authModel.MobileNumber).FirstOrDefault();
                if (validateUser != null)
                {
                    byte[] data = Convert.FromBase64String(validateUser.Password);
                    string decodedString = Encoding.UTF8.GetString(data);

                    return decodedString == authModel.Password ? Ok(new
                    {
                        Id = validateUser.Id,
                        Name = validateUser.Name,
                        Address = validateUser.Address,
                        ContactNo = validateUser.ContactNo,
                        ContactPerson = validateUser.ContactPerson,
                        Location = validateUser.Location,
                        Verified = validateUser.Verified,
                        CreatedDate = validateUser.CreatedDate,
                        NumberOfPersons = validateUser.NumberOfPersons,
                        Type = validateUser.Type,
                        OtherType = validateUser.OtherType,
                        UpdatedDate = validateUser.UpdatedDate
                    }) : BadRequest();
                }
                else
                {
                    return BadRequest("User validation failed");
                }
            }
        }

        [HttpGet]
        [Route("GetConsumers")]
        public IActionResult GetConsumers()
        {
            using (RRRContext con = new RRRContext())
            {
                var consumers = con.Consumers.Select(a => new
                {
                    Id = a.Id,
                    Name = a.Name,
                    Address = a.Address,
                    ContactNo = a.ContactNo,
                    ContactPerson = a.ContactPerson,
                    Location = a.Location,
                    Verified = a.Verified,
                    CreatedDate = a.CreatedDate,
                    NumberOfPersons = a.NumberOfPersons,
                    Type = a.Type,
                    OtherType = a.OtherType,
                    UpdatedDate = a.UpdatedDate
                }).ToList();
                return Ok(consumers);
            }
        }

        [HttpPost]
        [Route("UpdateConsumer")]
        public IActionResult UpdateConsumers([FromBody] Consumer consumer)
        {
            using (RRRContext con = new RRRContext())
            {
                var consumerDetails = con.Consumers.FirstOrDefault(a => a.Id == consumer.Id);

                if (consumerDetails is null)
                {
                    return NotFound("No record found");
                }

                consumerDetails.Id = consumer.Id;
                consumerDetails.Name = consumer.Name;
                consumerDetails.Address = consumer.Address;
                consumerDetails.ContactPerson = consumer.ContactPerson;
                consumerDetails.Location = consumer.Location;
                consumerDetails.Verified = consumer.Verified;
                consumerDetails.CreatedDate = consumer.CreatedDate;
                consumerDetails.NumberOfPersons = consumer.NumberOfPersons;
                consumerDetails.Type = consumer.Type;
                consumerDetails.OtherType = consumer.OtherType;
                consumerDetails.UpdatedDate = DateTime.Now;

                con.SaveChanges();

                return Ok("updated successfully");
            }
        }

        [HttpPost]
        [Route("ConsumerInterested")]
        public IActionResult ConsumerInterested(int id, int consumerId)
        {
            var result = postHelper.InterestedToCollectItems(id, consumerId, false);
            return Ok(result);
        }

        [HttpPost]
        [Route("ConsumerNotInterested")]
        public IActionResult ConsumerNotInterested(int id, int consumerId)
        {
            var result = postHelper.NotInterestedToCollectItems(id, consumerId, false);
            return Ok(result);
        }

        [HttpPost]
        [Route("UpdateItemStatusCollected")]
        public IActionResult UpdateItemStatusCollected(int id)
        {
            var result = postHelper.UpdateItemStatusCollected(id);
            return Ok(result);
        }
    }
}