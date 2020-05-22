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
    
        public async Task <ActionResult<List<Market>>> Get()
        {
            return await this.UnitOfWork.Market_Repo.GetAll();
        }
        ////
        ///

        [HttpGet]
        [Route("GetMarketByCategory/{Category}")]

        public async Task<ActionResult<List<Market>>> GetMarketByCategory(string Category)
        {

            if (Category == null) { return BadRequest(); }

            var Result =  await this.UnitOfWork.Market_Repo.GetMarketByCategory(Category);

            if (Result.Count() > 0 ) { return Ok(Result); }

            return NotFound();
        }

        /// <summary>
        /// /////////////////////
        /// </summary>
        [HttpGet]
        [Route("GetMarketByLocation/{Location}")]

        public async Task<ActionResult<List<Market>>> GetMarketByLocation(string Location)
        {
            if (Location == null) { return BadRequest(); }

           var Result = await this.UnitOfWork.Market_Repo.GetMarketByLocation(Location);


            if (Result.Count() > 0) { return Ok(Result); }

            return NotFound();
        }
        /// <returns></returns>

        //Get:

        [HttpGet]
        [Route("GetMarketByName/{MarketName}")]

        public async Task<ActionResult<List<Market>>> GetMarketByName(string MarketName)
        {
            if (MarketName == null) { return BadRequest(); }

           var Result = await this.UnitOfWork.Market_Repo.GetMarketBYName(MarketName);

            if (Result.Count() > 0) { return Ok(Result); }

            return NotFound();
        }
        // GET api/<controller>/5
        [HttpGet]
        [Route("GetMarketById/{id}")]

        public async Task<ActionResult<Market>> Get(int? id)
        {
            if (id == null) { return NotFound(new { Response = "Id Not Found " }); }

            try {

                var Result = await this.UnitOfWork.Market_Repo.GetMarketById(id);

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
        [Route("UpdateMarket/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> Put(int? id, [FromBody] MarketModel Model)
        {

            if (id == null) { return NotFound(new { Response = "Id Not Found " }); }
            if (ModelState.IsValid)
            {
                try
                {
                    Market Market = await this.UnitOfWork.Market_Repo.GetMarketById(id);

                    if (Market != null) {

                        var Result = await this.UnitOfWork.Market_Repo.GetMarketById(id);

                        Market.Catergory = Model.Catergory;
                        Market.Discription = Model.Discription;
                        Market.Location = Model.Location;
                        Market.Name = Model.Name;
                        await this.UnitOfWork.SaveChanges();
                        return Ok(Result);


                    }
                    
                }
                catch (Exception Ex)
                { return BadRequest(); }



            }
            return BadRequest();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Route("DeleteMarket/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> Delete(int? id)
        {

            if (id == null) { return BadRequest(); }

            try {

               await  this.UnitOfWork.Market_Repo.Delete(id);
                 await this.UnitOfWork.SaveChanges();
                return Ok();
            
            }
            catch (Exception Ex)
            { return BadRequest(Ex); }
        }
    }
}
