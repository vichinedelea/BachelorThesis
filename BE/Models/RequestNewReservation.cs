﻿namespace BEapplication.Models
{
    public class RequestNewReservation
    {
        public string? Email { get; set; }
        public int Hour { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string? Activity { get; set; }
    }
}
