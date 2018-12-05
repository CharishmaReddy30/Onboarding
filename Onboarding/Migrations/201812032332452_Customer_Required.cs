namespace Onboarding.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Customer_Required : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.customers", "Name", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.customers", "Name", c => c.String());
        }
    }
}
