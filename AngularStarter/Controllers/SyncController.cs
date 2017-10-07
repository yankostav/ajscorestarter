using System;
using System.Reflection;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AngularStarter.Controllers
{
    public class Sync
    {
        public string Action { get; set; }
    }

    [Route("api/[controller]")]
    public class SyncController : BaseController
    {
        public SyncController(IOptions<ApplicationConfiguration> settings) : base(settings)
        {
        }

        private static AutoResetEvent _autoEvent;

        [HttpGet("{syncAction}")]
        public bool Get(string syncAction)
        {
            try
            {
                switch (syncAction)
                {
                    case "waitForSignal":
                        WaitForSignal();
                        break;
                    case "returnFromSignal":
                        ReturnFromSignal();
                        break;
                }
                return true;
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return false;
            }
        }

        [HttpPost]
        public bool Post([FromBody] Sync sync)
        {
            try
            {
                switch (sync.Action)
                {
                    case "waitForSignal":
                        WaitForSignal();
                        break;
                    case "returnFromSignal":
                        ReturnFromSignal();
                        break;
                }
                return true;
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return false;
            }
        }

        private void WaitForSignal()
        {
            _autoEvent?.Reset();
            _autoEvent = new AutoResetEvent(false);
            _autoEvent.WaitOne();
            _autoEvent = null;
        }

        private void ReturnFromSignal()
        {
            _autoEvent?.Set();
        }


    }
}
