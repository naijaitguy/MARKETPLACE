using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketHub.Data.Entity
{
    public class Market
    {

        [Key]
        public int MarketId { get; set; }


        public string Name { get; set; }

        public string Discription { get; set; }
        public string Image { get; set; }

        public string Location { get; set; }

        public int FoodCatId { get; set; }

        [ForeignKey("FoodCatId")]
        public virtual FoodCategory FoodCategory { get; set; }

    }
}
