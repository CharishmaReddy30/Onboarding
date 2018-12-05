using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Onboarding.Models;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    public class ProductsController : Controller
    {
        private context _context;

        public ProductsController()
        {
            _context = new context();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProducts()
        {
            var productList = _context.Products.ToList();
            return new JsonResult { Data = productList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Product
        public JsonResult DeleteProduct(int id)
        {
            try
            {
                var product = _context.Products.Where(c => c.Id == id).SingleOrDefault();
                if (product != null)
                {
                    _context.Products.Remove(product);
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

        //CREATE Product
        public JsonResult CreateProduct(Product product)
        {
            if(ModelState.IsValid)
            {
                _context.Products.Add(product);
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

        //GET Customer
        public JsonResult GetProduct(int id)
        {
            Product product = _context.Products.Where(c => c.Id == id).SingleOrDefault();
            return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //UPDATE Product
        public JsonResult UpdateProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                Product p = _context.Products.Where(c => c.Id == product.Id).SingleOrDefault();
                p.Name = product.Name;
                p.Price = product.Price;
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
    }
}