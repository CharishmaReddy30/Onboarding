using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding.Models;

namespace Onboarding.Controllers
{
    public class CustomerController : Controller
    {
        private context _context;

        public CustomerController()
        {
            _context = new context();
        }

        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }

        public ActionResult Index()
        {
            return View();
        }

        // GET Customers
        public JsonResult GetCustomers()
        {
            var customerList = _context.Customers.ToList();
            return new JsonResult { Data = customerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Customer
        public JsonResult DeleteCustomer(int id)
        {
            try
            {
                var customer = _context.Customers.Where(c => c.Id == id).SingleOrDefault();
                if (customer != null)
                {
                    _context.Customers.Remove(customer);
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

        //CREATE customer
        public JsonResult CreateCustomers(customer cust)
        {
            if(ModelState.IsValid)
            {
                _context.Customers.Add(cust);
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
        public JsonResult GetCustomer(int id)
        {
            customer customer = _context.Customers.Where(c => c.Id == id).SingleOrDefault();
            return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //UPDATE Customer
        public JsonResult UpdateCustomer(customer customer)
        {
            if (ModelState.IsValid)
            {
                customer cus = _context.Customers.Where(c => c.Id == customer.Id).SingleOrDefault();
                cus.Name = customer.Name;
                cus.Address = customer.Address;
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