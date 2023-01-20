// get code outside of method into another location : extension methods
using API.Entities;
using System.Linq;

namespace API.Extensions
{
    public static class PostExtensions
    {
        public static IQueryable<Post> Sort(this IQueryable<Post> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderByDescending(x => x.Id);

            query = orderBy switch
            {
                "upvotes" => query.OrderByDescending(x => x.Upvotes),
                _ => query.OrderByDescending(x => x.Id),
            };

            return query;
        }
    }
}