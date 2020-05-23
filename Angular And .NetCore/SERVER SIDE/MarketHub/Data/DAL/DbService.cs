using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using  MarketHub.Data.Entity;
using MarketHub.Data;

namespace MarketHub.Data.DAL
{
    public class DbService<T> : IDbService<T> where T: class
    {
        private MarketHubDbContext Context;
        private  DbSet<T> Entity;
        public DbService( MarketHubDbContext _context) {

            this.Context = _context;

            this.Entity = _context.Set<T>();

        }


        public async Task<List<T>> GetAll() {

            return await this.Entity.ToListAsync();

        }

     

        public async Task<T> GetById(string id )
        {

            return await this.Entity.FindAsync(id);

        }


        public async Task Delete(int? id)
        {

            if (id != null)
            {
                T User = await Entity.FindAsync(id);
                if (User != null)
                {

                    Entity.Remove(User);

                }

            }
        }

        public async Task<User> FindUserEmail(string UserEmail)
        {

            return await this.Context.Users.FirstOrDefaultAsync(m => m.Email == UserEmail);


        }

        public async Task<User> FindUserPhone(string Phone)
        {

            return await this.Context.Users.FirstOrDefaultAsync(m => m.PhoneNumber == Phone);


        }

    
        public async Task<bool> Add(T model)
        {
            try
            {
                await this.Entity.AddAsync(model); return true;
            }
            catch(Exception) { return false; }

        }

        public async Task<Market> GetMarketById(int? id) {

            return await this.Context.Markets.FindAsync(id);
        
        }

        public async Task<List<Market>> GetMarketBYName(string Name)
        {

            return await this.Context.Markets.Where(m => m.Name == Name).ToListAsync();

        }
    
        public async Task< List<Market>> GetMarketByCategory(string Category)        {

            return await this.Context.Markets.Where(m => m.Catergory == Category).ToListAsync();

        }


        public async Task<List<Market>> GetMarketByLocation(string Location)
        {

            return await this.Context.Markets.Where(m => m.Location == Location).ToListAsync();

        }




    }
}
