using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Onboarding.Models
{
    public class sales
    {
        public int Id { set; get; }
        [Required]
        public DateTime Datesold { set; get; }

        [Required(ErrorMessage = "Customer is required")]
        public int Customerid { set; get; }

        [Required(ErrorMessage = "Product is required")]
        public int Productid { set; get; }

        [Required(ErrorMessage = "Store is required")]
        public int Storeid { set; get; }


        [ForeignKey("Customerid")]
        public customer Customer { set; get; }

        [ForeignKey("Productid")]
        public Product Product { set; get; }

        [ForeignKey("Storeid")]
        public store store { set; get; }
    }
}