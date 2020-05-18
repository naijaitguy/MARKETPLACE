using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MarketHub._Helper;
using MarketHub.Data.Entity;
using MarketHub.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MarketHub.Controllers.IdentityController
{
    [Route("api/[controller]")]
   
    [Produces("Application/json")]
  
    [ApiController]
    public class IdentityController : ControllerBase
    {

        private readonly SignInManager<User> SignManager;
        private readonly UserManager<User> UserManager;


        public IdentityController(SignInManager<User> signInManager, UserManager<User> userManager ) 
        
        {


            this.UserManager = userManager; this.SignManager = signInManager;
        }


        // GET: api/<controller>
      
        // POST api/<controller>


        [HttpPost]
        [Route("CreateAccount")]
       
        public async Task<ActionResult> Post([FromBody] RegisterUser Model )
        {


            try
            {


                if (ModelState.IsValid)
                {
                    var User = new User { Email = Model.Email, UserName = Model.UserName, PhoneNumber = Model.PhoneNumber };


                    var Result = await this.UserManager.CreateAsync(User, Model.Password);

                    if (Result.Succeeded) {

                       await this.UserManager.AddToRoleAsync(User, "Member");
                        return Ok(); } 
                    
                    else { return NotFound(new { Response = "fail to create Account " }); }



                }
                return NotFound(new { Response = "Model state Error " });
            }

            catch (Exception Ex)

            {
                return NotFound(new { Response = "fail to create Account " + Ex }) ;

            }

        }
    
            

        [HttpPost]
        
        [Route("Authenticate")]
        public async Task<ActionResult> Post([FromBody] Authentication Model)
        {

            var UserByemail = await this.UserManager.FindByEmailAsync(Model.Email);
            if (UserByemail != null)
            {

                var Role = await this.UserManager.IsInRoleAsync(UserByemail, "Member");

                if (Role == true)
                {

                    var Result = await this.SignManager.PasswordSignInAsync(UserByemail.UserName, Model.Password, Model.Remember, lockoutOnFailure: false);

                    if (Result.Succeeded)
                    {


                        var AppUser = this.UserManager.Users.SingleOrDefault(m => m.Email == Model.Email);
                        ///generaye token 
                        var Token = await this.GenerateJwtTokenAsync(UserByemail.Email, AppUser);


                        return Ok(new { AppUser.Email, AppUser.Id, Token, AppUser.UserName });

                    }

                    else { return BadRequest("failed"); }


                }

                else { return BadRequest("failed"); }
            }
            else { return BadRequest("failed"); }
        }


        [HttpGet]
        [Authorize(Roles ="Member")]
        [Route("ManageAccount")]
        public async Task<ActionResult> Get() {

          string id = ExtentionHelper.GetUserId(User);

            if (id != null) {
                var UserToUpdate = await this.UserManager.FindByIdAsync(id);

                if (UserToUpdate != null)
                {

                    return Ok(new { UserToUpdate.Address, UserToUpdate.Email, UserToUpdate.FullName, UserToUpdate.PhoneNumber, UserToUpdate.UserName });

                }
                else
                {

                    return BadRequest(new { Response = "Invalide User" });
                }


            }
            else { return BadRequest(new { Response = "Invalide User" }); }
            



        }


        [HttpPost]
        [Authorize(Roles = "Member")]
        [Route("ManageAccount")]
        public async Task<ActionResult> Post([FromBody] ManageAccount Model)
        {

            string id = ExtentionHelper.GetUserId(User);

            if (id != null)
            {
                var UserToUpdate = await this.UserManager.FindByIdAsync(id);

                if (UserToUpdate != null)
                {

                    
                    UserToUpdate.FullName = Model.FullName;
                    UserToUpdate.Address = Model.Address;
                    UserToUpdate.PhoneNumber = Model.PhoneNumber;

                  var Result = await  this.UserManager.UpdateAsync(UserToUpdate);

                    if (Result.Succeeded)
                    {

                        return Ok();
                    }
                    else { return BadRequest(new { Response = "Invalide User" }); }
                   

                }
                else
                {

                    return BadRequest(new { Response = "Invalide User" });
                }


            }
            else { return BadRequest(new { Response = "Invalide User" }); }




        }


        [HttpPost]

        [Route("AuthenticateAdmin")]
        public async Task<ActionResult> PostAuthenticateAdmin([FromBody] Authentication Model)
        {

            var UserByemail = await this.UserManager.FindByEmailAsync(Model.Email);

            if (UserByemail != null)
            {
                var Role = await this.UserManager.IsInRoleAsync(UserByemail, "Administrator");
               

                if (Role == true)
                {

                    var Result = await this.SignManager.PasswordSignInAsync(UserByemail.UserName, Model.Password, Model.Remember, lockoutOnFailure: false);

                    if (Result.Succeeded)
                    {
                        var AppUser = this.UserManager.Users.SingleOrDefault(m => m.Email == Model.Email);
                        ///generaye token 
                        var Token = await this.GenerateJwtTokenAsync(UserByemail.Email, AppUser);


                        return Ok(new { AppUser.Email, AppUser.Id, Token, AppUser.UserName });
                    }

                    else { return BadRequest("failed"); }

                }

                else { return BadRequest("forbidden"); }


            }

            else { return BadRequest("invalid User"); }

        }


        [HttpPost]
      
        [Route("FindEmail")]
        public async Task<ActionResult> PostFindEmail([FromBody] RegisterUser Model)
        {

            var User = await this.UserManager.FindByEmailAsync(Model.Email);

            if (User != null) { return Ok(User.Email); } else { return NotFound(new { Response = "Email Not Foumd " }); }

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("FindUserName")]
        public async Task<ActionResult> PostFindUserName([FromBody] RegisterUser Model)
        {

            var myUser = await this.UserManager.FindByNameAsync(Model.UserName);

            if (User != null) { return Ok(myUser.UserName); } else { return NotFound(new { Response = "Email Not Foumd " }); }

        }


        [HttpPost]
        
        [Route("FindPhone")]
        public async Task<ActionResult> PostFindPhone([FromBody] RegisterUser Model)
        {


            var User = await this.UserManager.FindByEmailAsync(Model.Email);

            if (User != null) {

                var Phone = await this.UserManager.GetPhoneNumberAsync(User);

                if (Phone != null) { return Ok(); } else { return NotFound(new { Response = "Email Not Foumd " }); }

            
            } else { return NotFound(new { Response = "Email Not Foumd " }); }

        }

      

        // create token
private async Task<object> GenerateJwtTokenAsync(string email, User user)
        {
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.Email),
          new Claim(ClaimTypes.Name, user.UserName)
    };

            var roles = await UserManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            // get options
          //  var jwtAppSettingOptions =   JwtokenOptions;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtokenOptions.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(JwtokenOptions.JwtExpireDays));

            var token = new JwtSecurityToken(
                JwtokenOptions.Issuer,
               JwtokenOptions.Issuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
