using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.StaticFiles;

namespace AngularStarter
{
    public class ApplicationConfiguration
    {
        public string ConnectionString { get; set; }
        public string VersionNo { get; set; }
        public int SplashTime { get; set; }
    }

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.Configure<ApplicationConfiguration>(Configuration.GetSection("ApplicationConfiguration"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDefaultFiles();

            DefaultFilesOptions defaultFilesOptions = new DefaultFilesOptions();
            defaultFilesOptions.DefaultFileNames.Clear();
#if DEBUG
            defaultFilesOptions.DefaultFileNames.Add("index-debug.html");
            // this will serve up files starting from the project root folder. Use this for development, not release.
            var projectRootPath = env.WebRootPath.Substring(0, env.WebRootPath.LastIndexOf(@"\", StringComparison.Ordinal)) + @"\";
            var provider = new PhysicalFileProvider(projectRootPath);
            var fileServerOptions = new FileServerOptions { RequestPath = "/projectroot" };
            fileServerOptions.StaticFileOptions.FileProvider = provider;
            fileServerOptions.EnableDirectoryBrowsing = true;
            app.UseFileServer(fileServerOptions);
#else
            defaultFilesOptions.DefaultFileNames.Add("index-release.html");
#endif
            app.UseDefaultFiles(defaultFilesOptions);
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
