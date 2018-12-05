using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Onboarding.Models
{
    public class context : DbContext
    {
        public context() : base("DefaultConnection") { }
        public DbSet<customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<store> Stores { get; set; }
        public DbSet<sales> Sales { get; set; }
    }
}