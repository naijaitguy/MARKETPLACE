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

        public Task<User> FindUserPhone(string Phone);
        public Task<User> FindUserEmail(string UserEmail);
        /*
        public Task<Market> FindTaxApplicationEmail(string UserEmail);

        public Task<Market> FindTaxApplicationTin(string Tin);
        public  Task<Market> FindTaxApplicationBVN(string Bvn);
        */
        public Task Add(T model);
    }
}
