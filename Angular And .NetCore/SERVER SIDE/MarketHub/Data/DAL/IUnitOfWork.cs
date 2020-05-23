using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketHub.Data.Entity;


namespace MarketHub.Data.DAL
{
    public interface IUnitOfWork
    {

        public IDbService<Market> Market_Repo {get; }

        public IDbService<FoodCategory> FoodCategory_Repo { get; }

        public IDbService<User> User_Repo { get; }

        public Task SaveChanges();


       

    }
}
