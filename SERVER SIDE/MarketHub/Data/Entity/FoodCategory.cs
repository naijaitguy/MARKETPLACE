using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarketHub.Data.Entity
{
    public class FoodCategory
    {

        [Key]
        public int FoodCatId { get; set; }

        public int CatName { get; set; }
    }
}
