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

        [HttpGet]
        [Route("GetPost/{id}")]
        public IActionResult GetPost(int id)
        {
            var result = this.postHelper.GetPost(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllPost")]
        public IActionResult GetAllPost()
        {
            var result = this.postHelper.GetAllPost();
            return Ok(result);
        }

        [HttpPost]
        [Route("DeletePost")]
        public IActionResult DeletePost(int id)
        {
            var result = this.postHelper.DeletePost(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("UpdateIndividual")]
        public IActionResult UpdateIndividual(PublicUser publicUser)
        {
            using(RRRContext con = new RRRContext())
            {
                var user = con.PublicUsers.FirstOrDefault(a => a.Id == publicUser.Id);

                if(user is null)
                {
                    return NotFound("user not found");
                }

                user.FirstName = publicUser.FirstName;
                user.LastName = publicUser.LastName;
                user.Email = publicUser.Email;
                user.Address = publicUser.Address;
                user.UpdatedDate = DateTime.Now;

                con.SaveChanges();

                return Ok();
            }
        }

        [HttpPost]
        [Route("IndividualConsumerInterested")]
        public IActionResult IndividualConsumerInterested(int id, int individualId)
        {
            var result = postHelper.InterestedToCollectItems(id, individualId, true);
            return Ok(result);
        }

        [HttpPost]
        [Route("IndividualConsumerNotInterested")]
        public IActionResult IndividualConsumerNotInterested(int id, int individualId)
        {
            var result = postHelper.NotInterestedToCollectItems(id, individualId, true);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetPostedByIndividual")]
        public IActionResult GetPostedByIndividual(int id)
        {
            var result = postHelper.GetPostsByProviderPosted(id, true);
            return Ok(result);
        }
    }
}
