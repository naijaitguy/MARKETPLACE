using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MarketHub._Helper;
using MarketHub.Data.DAL;
using MarketHub.Data.Entity;
using MarketHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MarketHub.Controllers.MarketController
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class MarketController : ControllerBase
    {



        private readonly IUnitOfWork UnitOfWork;

        public MarketController(IUnitOfWork unitOfWork) => this.UnitOfWork = unitOfWork;

        [HttpPost, DisableRequestSizeLimit]
        [Route("Upload")]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var Uniquefilename = Guid.NewGuid().ToString() + "_" + fileName;
                    var fullPath = Path.Combine(pathToSave, Uniquefilename);
                    var dbPath = Path.Combine(folderName, Uniquefilename);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        // GET: api/<controller>
        [HttpGet]
        [Route("GetAllMarket")]
        [Authorize(Roles = "Administrator")]
        public async Task <ActionResult<List<Market>>> Get()
        {
            return await this.UnitOfWork.Market_Repo.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("GetMarketById/{id}")]

        public async Task<ActionResult<Market>> Get(string id)
        {
            if (id == null) { return NotFound(new { Response = "Id Not Found " }); }

            try {

                var Result = await this.UnitOfWork.Market_Repo.GetById(id);

                return Ok(Result);
            }
            catch (Exception Ex)
            { return BadRequest(); }
        }

        // POST api/<controller>
        [HttpPost]
        [Route("AddMarket")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> Post([FromBody] MarketModel market)
        {
            string id = ExtentionHelper.GetUserId(User);

            if (ModelState.IsValid) {


                var Market = new Market { Name = market.Name,
                    Location = market.Location,
                    Image3 = market.Image3,
                    Discription = market.Discription,
                    Image1 = market.Image1,
                    Image2 = market.Image2,
                    Catergory = market.Catergory,
                    UserId = id

                   };

                try
                {
                    var Result = await this.UnitOfWork.Market_Repo.Add(Market);
                    await this.UnitOfWork.SaveChanges();

                    if (Result == false)

                    { return BadRequest(); }

                    else

                    {

                        return Ok();
                    }
                }
                catch ( Exception Ex) 
                
                {
                    return BadRequest();

                }

              

              

            
            
            
            }
            return BadRequest();
          
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
