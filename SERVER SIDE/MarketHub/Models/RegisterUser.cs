using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarketHub.Models
{
    public class RegisterUser
    {


        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }


        [Required]
       
        public string UserName { get; set; }


        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }



        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        [Required]
        public string FullName { get; set; }
        [Required]
        public string Address { get; set; }


    }
}
