using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarketHub._Helper
{
    public static class JwtokenOptions
    {

        public const string Issuer = "localhost";

        public const string Audience = "https://markethub.com/";

        public const string Key = "supersecret_ 556872%$#$#$%@$^&%^[][gg00gvtftf1!!@@%^^^secretkey!12345";
        public const int JwtExpireDays = 30;

        public static SecurityKey GetSecurityKey() =>
         new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
    }
}
