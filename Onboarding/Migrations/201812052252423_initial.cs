namespace Onboarding.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.customers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Address = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.sales",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Datesold = c.DateTime(nullable: false),
                        Customerid = c.Int(nullable: false),
                        Productid = c.Int(nullable: false),
                        Storeid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.customers", t => t.Customerid, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.Productid, cascadeDelete: true)
                .ForeignKey("dbo.stores", t => t.Storeid, cascadeDelete: true)
                .Index(t => t.Customerid)
                .Index(t => t.Productid)
                .Index(t => t.Storeid);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.stores",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Address = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.sales", "Storeid", "dbo.stores");
            DropForeignKey("dbo.sales", "Productid", "dbo.Products");
            DropForeignKey("dbo.sales", "Customerid", "dbo.customers");
            DropIndex("dbo.sales", new[] { "Storeid" });
            DropIndex("dbo.sales", new[] { "Productid" });
            DropIndex("dbo.sales", new[] { "Customerid" });
            DropTable("dbo.stores");
            DropTable("dbo.Products");
            DropTable("dbo.sales");
            DropTable("dbo.customers");
        }
    }
}
