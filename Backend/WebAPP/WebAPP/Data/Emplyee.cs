using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPP
{
    public class Employee
    {
        [Key]
        public string Name{ get; set; }

        public string Position { get; set; }

        public int YearsWorked { get; set; }

        public int Age{ get; set; }

        public string Email { get; set; }
    }
}
