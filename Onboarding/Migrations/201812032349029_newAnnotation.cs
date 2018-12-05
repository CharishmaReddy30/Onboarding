namespace Onboarding.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class newAnnotation : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.customers", "Address", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.customers", "Address", c => c.String());
        }
    }
}
