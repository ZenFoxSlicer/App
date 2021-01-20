using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPP.Data;

namespace WebAPP.Controllers
{
    [ApiController]
    [Route("people")]
    public class EmployeesController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private static readonly string[] Positions = new[]
        {
            "Director", "Manager", "Worker", "Accountant"
        };

        private static readonly string[] Names = new[]
        {
            "Ion", "Maria", "Oana", "Vasile"
        };

        private static readonly string[] LastNames = new[]
       {
            "Budu", "Andronache", "Musir", "Cojocaru"
        };

        private readonly CompanyDBContext _companyDBContext;

        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ILogger<EmployeesController> logger, CompanyDBContext companyDBContext)
        {
            _logger = logger;
            _companyDBContext = companyDBContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            try
            {
                var employee = await _companyDBContext.Employees.ToListAsync();
                return employee;
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [HttpPost]
        public async Task<OkResult> Post([FromBody] Employee model)
        {
            try
            {
                await _companyDBContext.AddAsync(model);
                await _companyDBContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [HttpDelete("{employeeName}")]
        public async Task<OkResult> Delete([FromRoute] string employeeName)
        {
            try
            {
                var entity = await _companyDBContext.Employees.Where(w => w.Name == employeeName).FirstOrDefaultAsync();
                _companyDBContext.Remove(entity);
                await _companyDBContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}
