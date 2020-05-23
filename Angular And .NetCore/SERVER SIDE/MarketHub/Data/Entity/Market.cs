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
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }

        public string Location { get; set; }

        public string UserId { get; set; }


        public string Catergory { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

    }
}
