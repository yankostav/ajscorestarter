using System;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularStarter.Controllers
{
    public class DevConfig
    {
        public bool Debug { get; set; } // used to indicate if debug or release mode
        public bool Testing { get; set; } // used as a switch to indicate in testing mode for development
        public int SplashTime { get; set; } // used as a timing value for how long to display the splash view
        public string VersionNumber { get; set; } // used as information of the deployed project version
        public bool OnlineStatus { get; set; } // used to indicate the online status
        public bool AppCached { get; set; } // used to indicate if the application is cached
    }


    [Route("api/[controller]")]
    public class SysInfoController : BaseController
    {
        public SysInfoController(IOptions<ApplicationConfiguration> settings) : base(settings)
        {
        }

        // GET: api/values
        [HttpGet]
        public DevConfig Get()
        {
            try
            {
                return DevConfig;
            }
            catch (Exception e)
            {
                ExceptionHandler(this.GetType().Name, GetCallerMemberName(), e);
                return null;
            }
        }
    }
}