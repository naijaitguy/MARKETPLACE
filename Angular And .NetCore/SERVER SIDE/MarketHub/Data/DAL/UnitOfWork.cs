using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketHub.Data.Entity;

namespace MarketHub.Data.DAL
{
    public class UnitOfWork : IUnitOfWork
    {


        private  MarketHubDbContext db;

        private  IDbService<Market> market_repo;
        private IDbService<FoodCategory> foodcat_repo;
      //  private IDbService<FeedBack> feedback_repo;
        private IDbService<User> user_repo;

        public UnitOfWork(MarketHubDbContext taxDbContext) => this.db = taxDbContext;



        public IDbService<Market> Market_Repo  {
            get  {

                if (this.market_repo == null)
                { this.market_repo =  new DbService<Market>(db);

                    
                }

                return this.market_repo;
            }

             
         }


         public IDbService<FoodCategory> FoodCategory_Repo
        {
            get
            {

                if (this.foodcat_repo == null)
                {
                    this.foodcat_repo = new DbService<FoodCategory>(db);


                }

                return this.foodcat_repo;
            }


        }

       

        public IDbService<User> User_Repo
        {
            get
            {

                if (this.user_repo == null)
                {
                    this.user_repo = new DbService<User>(db);


                }

                return this.user_repo;
            }


        }


        public async Task SaveChanges()
        {
            await this.db.SaveChangesAsync();

        }

        protected virtual void Dispose(bool Disposing)
        {

            if (Disposing)
            {
                if (this.db != null)
                {

                    this.db.Dispose();
                    this.db = null;
                }

            }


        }
    }
}
