using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class TestDBManager : DBManager
    {
        public TestDBManager(DbContextOptions<DBManager> options) : base(options)
        {
        }
    }
}
