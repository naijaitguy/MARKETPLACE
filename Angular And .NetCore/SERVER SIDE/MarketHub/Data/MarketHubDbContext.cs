using System;
using System.Collections.Generic;
using System.Text;
using MarketHub.Data.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MarketHub.Data
{
    public class MarketHubDbContext : IdentityDbContext<User>
    {
        public MarketHubDbContext(DbContextOptions<MarketHubDbContext> options)
            : base(options)
        {
        }


        public virtual DbSet<Market> Markets { get; set; }

        public virtual DbSet<FoodCategory>FoodCategories { get; set; }



    }
}
