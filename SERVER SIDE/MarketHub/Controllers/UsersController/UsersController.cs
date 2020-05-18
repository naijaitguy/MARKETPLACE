using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MarketHub._Helper;
using MarketHub.Data.DAL;
using MarketHub.Data.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MarketHub.Controllers.UsersController
{
   


    [Produces("Application/json")]

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : Controller
    {

        private readonly IUnitOfWork UnitOfWork;

        public UsersController(IUnitOfWork unitOfWork) => this.UnitOfWork = unitOfWork; 

        // GET: api/<controller>
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("GetAllUsers")]
        public async Task< IEnumerable<User>> Get()
        {

            return await this.UnitOfWork.User_Repo.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        [Route("FindById/{id}")]
        public async Task<ActionResult<User>> FindByIdGet( string id)
        {
            // string id = this.User.GetUserId();

            if (id == null) { return BadRequest(); }
            else
            {

                var User =  await this.UnitOfWork.User_Repo.GetById(id);

                if (User != null) { return Ok(); } else { return NotFound(); }

            }

        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public void Delete(int id)
        {
        }
    }
}
