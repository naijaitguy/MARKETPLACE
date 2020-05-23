using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketHub.Data.Entity;

namespace MarketHub.Data.DAL
{
   public  interface IDbService<T> where T:class
    {


        public Task<List<T>> GetAll();


        public Task<T> GetById(string id);
        public Task Delete(int? id);

        public Task<List<Market>> GetMarketBYName(string Name);
        public  Task<List<Market>> GetMarketByCategory(string Category);
        public Task<List<Market>> GetMarketByLocation(string Location);
        public Task<User> FindUserPhone(string Phone);
        public Task<User> FindUserEmail(string UserEmail);

        public Task<Market> GetMarketById(int? id);
        /*
        public Task<Market> FindTaxApplicationEmail(string UserEmail);



        public Task<Market> FindTaxApplicationTin(string Tin);
        public  Task<Market> FindTaxApplicationBVN(string Bvn);
        */
        public Task<bool> Add(T model);
    }
}
