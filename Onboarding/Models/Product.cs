using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Onboarding.Models
{
    public class Product
    {
        public int Id { set; get; }
        [Required]
        public string Name { set; get; }

        [Required]
        public double Price { set; get; }

        public ICollection<sales> Sales { set; get; }
    }
}