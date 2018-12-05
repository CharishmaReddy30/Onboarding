using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding.Models;

namespace Onboarding.Controllers
{
    public class SalesController : Controller
    {
        private context _context;

        public SalesController()
        {
            _context = new context();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }

        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        // GET Customers
        public JsonResult GetSales()
        {
            var salesList = _context.Sales.Select(p => new {
                Id = p.Id,
                DateSold = p.Datesold,
                CustomerName = p.Customer.Name,
                ProductName = p.Product.Name,
                StoreName = p.store.Name

            }).ToList();
            return new JsonResult { Data = salesList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Sales
        public JsonResult DeleteSales(int id)
        {
            try
            {
                var sale = _context.Sales.Where(c => c.Id == id).SingleOrDefault();
                if (sale != null)
                {
                    _context.Sales.Remove(sale);
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Deletion Falied", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult SalesCreate(sales rec)
        {
            if (ModelState.IsValid)
            {
                _context.Sales.Add(rec);
                _context.SaveChanges();
                return new JsonResult { Data = "Sucess", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            else
            {
                //Console.Write(e.Data + "Exception Occured");
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult { Data = modelErrors, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetSale(int id)
        {
                sales sale = _context.Sales.Find(id);
                return new JsonResult { Data = sale, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            
        }

        public JsonResult UpdateSale(sales sale)
        {
                if(ModelState.IsValid)
                {
                    sales UpdatedRec = _context.Sales.Find(sale.Id);
                    UpdatedRec.Customerid = sale.Customerid;
                    UpdatedRec.Productid = sale.Productid;
                    UpdatedRec.Storeid = sale.Storeid;
                    UpdatedRec.Datesold = sale.Datesold;
                _context.SaveChanges();
                }
                else
            {
                //Console.Write(e.Data + "Exception Occured");
                var modelErrors = new List<string>();
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var modelError in modelState.Errors)
                    {
                        modelErrors.Add(modelError.ErrorMessage);
                    }
                }
                return new JsonResult { Data = modelErrors, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }


            return new JsonResult { Data = "Sucess", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}