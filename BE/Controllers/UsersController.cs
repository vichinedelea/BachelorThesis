using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BEapplication.DBContexts;
using BEapplication.Models;
using BEapplication.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace BEapplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IUserLogic _userLogic;

        public UsersController(ApplicationContext context, IUserLogic userLogic)
        {
            _context = context;
            _userLogic = userLogic;
        }

        [HttpPost]
        [Route("/addUser")]
        [AllowAnonymous]
        [EnableCors("AllowLocalhost3000")]
        public async Task<IActionResult> AddUser(RequestNewUser newUser)
        {
            await _userLogic.AddUser(newUser);

            return Ok();
        }

        [HttpPost("/ckeckUser")]
        public async Task<ActionResult> CkeckUser(UserLoginModel userLoginModel)
        {
            var userExists = await _userLogic.CkeckUser(userLoginModel);

            if (userExists == false)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
        }
    }
}
