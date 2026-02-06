// Set the database context
use("Online_Beauty_Sales_Transcation");

// CRUD Operations for Products Collection
// C - Create Documents
db.Products.insertOne({
  product_id: "P011",
  name: "Hair Mask",
  category: "Hair Care",
  price: 19.99,
  brand: "Herbal Essence",
  stock: 60
});

db.Products.insertMany([
  {
    product_id: "P012",
    name: "Body Lotion",
    category: "Skincare",
    price: 11.99,
    brand: "Nivea",
    stock: 80
  },
  {
    product_id: "P013",
    name: "Face Scrub",
    category: "Skincare",
    price: 14.99,
    brand: "Clean & Clear",
    stock: 100
  }
]);

// R - Read Documents
db.Products.findOne({ product_id: "P011" });
db.Products.find({ category: "Skincare" });

// U - Update Documents
db.Products.updateOne({ product_id: "P011" }, { $set: { price: 18.99 } });
db.Products.updateMany({ category: "Skincare" }, { $inc: { stock: 10 } });

// D - Delete Documents
db.Products.deleteOne({ product_id: "P013" });
db.Products.deleteMany({ category: "Hair Care" });

// CRUD Operations for Customers Collection
// C - Create Documents
db.Customers.insertOne({
  customer_id: "C011",
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Broadway St, NY",
  phone: "+1-202-555-0171"
});

db.Customers.insertMany([
  {
    customer_id: "C012",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    address: "456 Park Ave, NY",
    phone: "+1-202-555-0143"
  },
  {
    customer_id: "C013",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    address: "789 Main St, NY",
    phone: "+1-202-555-0112"
  }
]);

// R - Read Documents
db.Customers.findOne({ customer_id: "C011" });
db.Customers.find({ email: /example.com$/ });

// U - Update Documents
db.Customers.updateOne({ customer_id: "C012" }, { $set: { phone: "+1-202-555-0188" } });
db.Customers.updateMany({}, { $set: { country: "USA" } });

// D - Delete Documents
db.Customers.deleteOne({ customer_id: "C013" });
db.Customers.deleteMany({ country: "Canada" });

// CRUD Operations for Orders Collection
// C - Create Documents
db.Orders.insertOne({
  order_id: "O011",
  customer_id: "C011",
  order_date: "2024-11-01T12:30:00Z",
  products: [
    { product_id: "P011", quantity: 1, price: 18.99 },
    { product_id: "P012", quantity: 2, price: 11.99 }
  ],
  total_amount: 42.97,
  status: "pending"
});

db.Orders.insertMany([
  {
    order_id: "O012",
    customer_id: "C012",
    order_date: "2024-11-02T15:00:00Z",
    products: [
      { product_id: "P011", quantity: 2, price: 18.99 }
    ],
    total_amount: 37.98,
    status: "shipped"
  }
]);

// R - Read Documents
db.Orders.findOne({ order_id: "O011" });
db.Orders.find({ status: "pending" });

// U - Update Documents
db.Orders.updateOne({ order_id: "O012" }, { $set: { status: "delivered" } });
db.Orders.updateMany({ status: "pending" }, { $set: { status: "shipped" } });

// D - Delete Documents
db.Orders.deleteOne({ order_id: "O011" });
db.Orders.deleteMany({ status: "canceled" });

// CRUD Operations for Payments Collection
// C - Create Documents
db.Payments.insertOne({
  payment_id: "PMT011",
  order_id: "O012",
  amount: 37.98,
  payment_date: "2024-11-02T16:00:00Z",
  payment_method: "credit card",
  status: "successful"
});

db.Payments.insertMany([
  {
    payment_id: "PMT012",
    order_id: "O011",
    amount: 42.97,
    payment_date: "2024-11-01T13:00:00Z",
    payment_method: "UPI",
    status: "pending"
  }
]);

// R - Read Documents
db.Payments.findOne({ payment_id: "PMT011" });
db.Payments.find({ status: "successful" });

// U - Update Documents
db.Payments.updateOne({ payment_id: "PMT012" }, { $set: { status: "successful" } });
db.Payments.updateMany({ status: "pending" }, { $set: { status: "successful" } });

// D - Delete Documents
db.Payments.deleteOne({ payment_id: "PMT012" });
db.Payments.deleteMany({ status: "failed" });



// Aggregation

// Aggregation Pipeline for Products Collection
// Calculates the average price of products in each category
db.Products.aggregate([
    {
      $group: {
        _id: "$category",
        averagePrice: { $avg: "$price" }
      }
    },
    {
      $sort: { averagePrice: -1 }
    }
  ]);
  
  // Aggregation Pipeline for Customers Collection
  // Counts the number of customers in each city (assuming "city" is part of the address)
  db.Customers.aggregate([
    {
      $addFields: {
        city: { $arrayElemAt: [{ $split: ["$address", ", "] }, 1] }
      }
    },
    {
      $group: {
        _id: "$city",
        customerCount: { $sum: 1 }
      }
    },
    {
      $sort: { customerCount: -1 }
    }
  ]);
  
  // Aggregation Pipeline for Orders Collection
  // Calculates the total order value for each customer
  db.Orders.aggregate([
    {
      $unwind: "$products"
    },
    {
      $group: {
        _id: "$customer_id",
        totalOrderValue: { $sum: { $multiply: ["$products.price", "$products.quantity"] } }
      }
    },
    {
      $sort: { totalOrderValue: -1 }
    }
  ]);
  
  // Aggregation Pipeline for Payments Collection
  // Calculates the total amount paid via each payment method
  db.Payments.aggregate([
    {
      $group: {
        _id: "$payment_method",
        totalAmountPaid: { $sum: "$amount" }
      }
    },
    {
      $sort: { totalAmountPaid: -1 }
    }
  ]);
