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
    public class IndividualController : ControllerBase
    {
        private readonly PostHelper postHelper;

        public IndividualController()
        {
            // Need to migrate as dependency injection
            postHelper = new PostHelper();
        }

        [HttpPost]
        [Route("IndividualRegistration")]
        public IActionResult IndividualRegistration([FromBody] PublicUser publicUserModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Mandatory fields are missing");
            }

            using (RRRContext con = new RRRContext())
            {
                byte[] getBytes = Encoding.UTF8.GetBytes(publicUserModel.Password);
                string encryptPassword = Convert.ToBase64String(getBytes);
                publicUserModel.Password = encryptPassword;
                con.PublicUsers.Add(publicUserModel);
                con.SaveChanges();
            }

            return Ok();
        }

        [HttpPost]
        [Route("Auth")]
        public IActionResult Login([FromBody] AuthModel authModel)
        {
            using (RRRContext con = new RRRContext())
            {
                var validateUser = con.PublicUsers.Where(s => s.PhoneNumber == authModel.MobileNumber).FirstOrDefault();
                if (validateUser != null)
                {
                    byte[] data = Convert.FromBase64String(validateUser.Password);
                    string decodedString = Encoding.UTF8.GetString(data);

                    return decodedString == authModel.Password ? Ok(new
                    {
                        validateUser.Id,
                        validateUser.FirstName,
                        validateUser.LastName,
                        validateUser.Email,
                        validateUser.PhoneNumber,
                        validateUser.Address
                    }) : BadRequest();
                }
                else
                {
                    return BadRequest("User validation failed");
                }
            }
        }

        [HttpPost]
        [Route("AddPost")]
        public IActionResult AddPost([FromBody] Ads ads)
        {
            var result = this.postHelper.CreatePost(ads);
            return Ok(result);
        }

        [HttpPost]
        [Route("UpdatePost")]
        public IActionResult UpdatePost([FromBody] Ads ads)
        {
            var result = this.postHelper.UpdatePost(ads);
            return Ok(result);
        }

        [HttpPost]
        [Route("GetPost/{id}")]
        public IActionResult GetPost(int id)
        {
            var result = this.postHelper.GetPost(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("GetAllPost")]
        public IActionResult GetAllPost()
        {
            var result = this.postHelper.GetAllPost();
            return Ok(result);
        }
    }
}
