using System;
using System.Net;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.PlatformAbstractions;

namespace AngularStarter.Controllers
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            context.Result = new ContentResult
            {
                Content = $"{exception.Message}",
                ContentType = "test/plain",
                StatusCode = (int?)HttpStatusCode.BadRequest
            };
        }
    }

    [CustomExceptionFilterAttribute]
    public class BaseController : Controller
    {
        protected string ConnectionString;
        protected DevConfig DevConfig;
        public BaseController(IOptions<ApplicationConfiguration> settings)
        {
            DevConfig = new DevConfig
            {   // default values
                SplashTime = settings.Value.SplashTime,
                Testing = true,
                #if DEBUG
                    Debug = true,
                #else
                    Debug = false,
                #endif
                VersionNumber = settings.Value.VersionNo
            };
            ConnectionString = settings.Value.ConnectionString;
        }

        protected void ExceptionHandler(string className, string methodName, Exception e)
        {
            var message = e.InnerException?.Message ?? e.Message;
            var errorMessage = "Application error: " + message + ". Error was generated from: " + className + "." + methodName;
            throw new Exception(errorMessage);
        }

        protected static string GetCallerMemberName([CallerMemberName]string name = "")
        {
            return name;
        }

        protected string GetDistFolderPath()
        {
            ApplicationEnvironment appEnvironment = new ApplicationEnvironment();
            // This works locally, but what about when it's deployed to Azure
            var tempFolderPath = appEnvironment.ApplicationBasePath.Substring(0, appEnvironment.ApplicationBasePath.LastIndexOf(appEnvironment.ApplicationName, StringComparison.Ordinal) + appEnvironment.ApplicationName.Length);
            tempFolderPath += @"\wwwroot\dist";
            return tempFolderPath;
        }
    }
}
