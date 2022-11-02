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
    public class ProvidersController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] Provider provider)
        {
            using (RRRContext con = new RRRContext())
            {
                var validateUser = con.Providers.Where(s => s.ContactNumber == provider.ContactNumber).FirstOrDefault();
                if (validateUser == null)
                {
                    byte[] getBytes = Encoding.UTF8.GetBytes(provider.Password);
                    string encryptPassword = Convert.ToBase64String(getBytes);
                    provider.Password = encryptPassword;
                    con.Providers.Add(provider);
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
                var validateUser = con.Providers.Where(s => s.ContactNumber == authModel.MobileNumber).FirstOrDefault();
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
        [Route("GetProviders")]
        public IActionResult GetProviders()
        {
            using (RRRContext con = new RRRContext())
            {
                var providers = con.Providers.Select(a => new
                {
                    Id = a.Id,
                    Name = a.Name,
                    Address = a.Address,
                    ContactNumber = a.ContactNumber,
                    ContactPerson = a.ContactPerson,
                    Location = a.Location,
                    Verified = a.Verified,
                    CreatedDate = a.CreatedDate
                }).ToList();
                return Ok(providers);
            }
        }
    }
}
