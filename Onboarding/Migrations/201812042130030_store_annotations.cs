namespace Onboarding.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class store_annotations : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.stores", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.stores", "Address", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.stores", "Address", c => c.String());
            AlterColumn("dbo.stores", "Name", c => c.String());
        }
    }
}
