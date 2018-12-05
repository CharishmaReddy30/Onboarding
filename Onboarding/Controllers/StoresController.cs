using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Onboarding.Models;

namespace Onboarding.Controllers
{
    public class StoresController : Controller
    {
        private context _context;

        public StoresController()
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
        public JsonResult GetStores()
        {
            var storeList = _context.Stores.ToList();
            return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        // DELETE Customer
        public JsonResult DeleteStore(int id)
        {
            try
            {
                var store = _context.Stores.Where(c => c.Id == id).SingleOrDefault();
                if (store != null)
                {
                    _context.Stores.Remove(store);
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
        public JsonResult CreateStore(store store)
        {
            if (ModelState.IsValid)
            {
                _context.Stores.Add(store);
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
        public JsonResult GetStore(int id)
        {
            store store = _context.Stores.Where(c => c.Id == id).SingleOrDefault();
            return new JsonResult { Data = store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //UPDATE Customer
        public JsonResult UpdateStore(store store)
        {
            if (ModelState.IsValid)
            {
                store st = _context.Stores.Where(c => c.Id == store.Id).SingleOrDefault();
                st.Name = store.Name;
                st.Address = store.Address;
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