using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketHub.Data.Entity
{
    public class User:IdentityUser
    {


        public string FullName { get; set; }

        public string Address { get; set; }

    }
}
