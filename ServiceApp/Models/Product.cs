using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace ServiceApp.Models
{
    public class Product { 
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [MinLength(3)]
        [StringLength(100)]
        public string Company { get; set; } 
        [Required]
        [Range(0, 100000)]
        public decimal Price { get; set; }
    }
}
