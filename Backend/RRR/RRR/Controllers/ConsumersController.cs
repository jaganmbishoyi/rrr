using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RRR.Models;
using RRR.Models.EFModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RRR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsumersController : ControllerBase
    {
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
                        validateUser.Name,
                        validateUser.Address
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
                var providers = con.Consumers.Select(a => new
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
                return Ok(providers);
            }
        }
    }
}
