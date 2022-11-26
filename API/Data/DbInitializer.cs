using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(BlogContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Title = "Merge sort",
                    AuthorId = 1,
                    Timestamp = DateTime.Now,
                    Text = "The Merge Sort algorithm is a sorting algorithm that is considered an example of the divide and conquer strategy. So, in this algorithm, the array is initially divided into two equal halves and then they are combined in a sorted manner. We can think of it as a recursive algorithm that continuously splits the array in half until it cannot be further divided. This means that if the array becomes empty or has only one element left, the dividing will stop, i.e. it is the base case to stop the recursion. If the array has multiple elements, we split the array into halves and recursively invoke the merge sort on each of the halves. Finally, when both the halves are sorted, the merge operation is applied. Merge operation is the process of taking two smaller sorted arrays and combining them to eventually make a larger one.",
                    Category = "dsa"
                },
                new Post
                {
                    Title = "Quick sort",
                    AuthorId = 1,
                    Timestamp = DateTime.Now,
                    Text = "Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. There are many different versions of QuickSort that pick pivot in different ways.  \n\n* Always pick the first element as a pivot. Always pick the last element as a pivot. Pick a random element as a pivot. Pick median as the pivot. \nThe key process in QuickSort is a partition(). The target of partitions is, given an array and an element x of an array as the pivot, put x at its correct position in a sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.",
                    Category = "dsa"
                },
                new Post
                {
                    Title = "Relational database",
                    AuthorId = 1,
                    Timestamp = DateTime.Now,
                    Text = "A relational database is a collection of data items with pre-defined relationships between them. These items are organized as a set of tables with columns and rows. Tables are used to hold information about the objects to be represented in the database. Each column in a table holds a certain kind of data and a field stores the actual value of an attribute. The rows in the table represent a collection of related values of one object or entity. Each row in a table could be marked with a unique identifier called a primary key, and rows among multiple tables can be made related using foreign keys. This data can be accessed in many different ways without reorganizing the database tables themselves.\n\n* SQL\nSQL or Structured Query Language is the primary interface used to communicate with Relational Databases.SQL became a standard of the American National Standards Institute(ANSI) in 1986. The standard ANSI SQL is supported by all popular relational database engines, and some of these engines also have extension to ANSI SQL to support functionality which is specific to that engine.SQL is used to add, update or delete rows of data, retrieving subsets of data for transaction processing and analytics applications, and to manage all aspects of the database.\n\n* Data Integrity\nData integrity is the overall completeness, accuracy and consistency of data.Relational databases use a set of constraints to enforce data integrity in the database. These include primary Keys, Foreign Keys, ‘Not NULL’ constraint, ‘Unique’ constraint, ‘Default’ constraint and ‘Check’ constraints.These integrity constraints help enforce business rules on data in the tables to ensure the accuracy and reliability of the data.In addition to these, most relation databases also allow custom code to be embedded in triggers that execute based on an action on the database.\n\n* Transactions\nA database transaction is one or more SQL statements that are executed as a sequence of operations that form a single logical unit of work. Transactions provide an \"all-or-nothing\" proposition, meaning that the entire transaction must complete as a single unit and be written to the database or none of the individual components of the transaction should go through. In the relation database terminology, a transaction results in a COMMIT or a ROLLBACK. Each transaction is treated in a coherent and reliable way independent of other transactions.\n\n*ACID Compliance\nAll database transactions must be ACID compliant or be Atomic, Consistent, Isolated and Durable to ensure data integrity.\nAtomicity requires that either transaction as a whole be successfully executed or if a part of the transaction fails, then the entire transaction be invalidated. Consistency mandates the data written to the database as part of the transaction must adhere to all defined rules, and restrictions including constraints, cascades, and triggers. Isolation is critical to achieving concurrency control and makes sure each transaction is independent unto itself. Durability requires that all of the changes made to the database be permanent once a transaction is successfully completed.",
                    Category = "dev"
                },
                new Post
                {
                    Title = "Creating initial migrations command",
                    AuthorId = 1,
                    Timestamp = DateTime.Now,
                    Text = "dotnet ef migrations add InitialCreate -o Data/Migrations",
                    Category = "dev"
                },
                new Post
                {
                    Title = "Basics of java spring",
                    AuthorId = 1,
                    Timestamp = DateTime.Now,
                    Text = "inversion of control, dependency injection, garbage collection",
                    Category = "dev"
                },
                new Post
                {
                    Title = "HTTP requests and REST API",
                    AuthorId = 1,
                    Timestamp = DateTime.Now,
                    Text = "elaborate the process: ",
                    Category = "dev"
                },
            };

            foreach (var post in posts)
            {
                context.Posts.Add(post);
            }


            if (context.Comments.Any()) return;

            var comments = new List<Comment>
            {
                new Comment
                {
                    PostId = 2,
                    AuthorId = 3,
                    Text = "It is really intriguing.",
                    Timestamp = DateTime.Now,
                },
                new Comment
                {
                    PostId = 1,
                    AuthorId = 2,
                    Text = "It is really surprising.",
                    Timestamp = DateTime.Now,
                },
                new Comment
                {
                    PostId = 2,
                    AuthorId = 2,
                    Text = "It is really mindblowing.",
                    Timestamp = DateTime.Now,
                },
            };

            foreach (var comment in comments)
            {
                context.Comments.Add(comment);
            }

            context.SaveChanges();
        }

    }
}
