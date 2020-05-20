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

        public async Task<User> FindUserEmail(string UserEmail)
        {

            return await this.Context.Users.FirstOrDefaultAsync(m => m.Email == UserEmail);


        }

        public async Task<User> FindUserPhone(string Phone)
        {

            return await this.Context.Users.FirstOrDefaultAsync(m => m.PhoneNumber == Phone);


        }

        /*
        public async Task<Market> FindTaxApplicationEmail(string UserEmail)
        {

            return await this.Context.TaxApplications.FirstOrDefaultAsync(m => m.Email == UserEmail);


        }

       


        public async Task<Market> FindTaxApplicationTin(string Tin)
        {

         //   return await this.Context.Markets.FirstOrDefaultAsync(m => m.Tin == Tin);


        }
        */

        public async Task<bool> Add(T model)
        {
            try
            {
                await this.Entity.AddAsync(model); return true;
            }
            catch(Exception) { return false; }

        }



    }
}
