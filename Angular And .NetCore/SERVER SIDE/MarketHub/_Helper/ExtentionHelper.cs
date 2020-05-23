using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MarketHub._Helper
{
    public static class ExtentionHelper
    {


        public static string GetUserId(this ClaimsPrincipal claimsPrincipal)
            => claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;


        public static string GetUserName(this ClaimsPrincipal claimsPrincipal)
           => claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;



        public static string GetUserEmail(this ClaimsPrincipal claimsPrincipal)
           => claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

    }
}
