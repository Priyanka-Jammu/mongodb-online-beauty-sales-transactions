# MongoDB Mini-Project: Online Beauty Sales Transactions (Atlas + Compass + VS Code Playground)

## Overview
This project demonstrates a MongoDB database design and hands-on operations for an **online beauty products platform** that supports business transactions (orders + payments).

I created and populated **4 collections**:
- `Products`
- `Customers`
- `Orders`
- `Payments`

Each collection has **10+ documents** (sample dataset exported from MongoDB Compass as CSV), and the project includes:
- CRUD examples (insertOne/Many, findOne/find, updateOne/Many, deleteOne/Many)
- 1 aggregation pipeline per collection

## Business Scenario
An online beauty store where customers browse products, place orders, and make payments.
Transactions require:
- capturing customer info
- linking orders to customers
- storing ordered products (with quantities & prices)
- recording payment details and payment status

## Collections
### Products
Stores product catalog details: brand, category, pricing, and stock for inventory and checkout.

### Customers
Stores customer profiles (name, email, phone, address) used for fulfillment and communication.

### Orders
Stores each order with customer reference, products array (product_id, quantity, price), and order status.

### Payments
Stores payment transactions per order including payment method and status.

## Files Included
- `data/` – CSV exports from MongoDB Compass (one CSV per collection)
- `schemas/schemas.docx` – JSON schema exports + detailed field descriptions and business purpose
- `playground/playground-1.mongodb.js` – MongoDB Playground code (CRUD + aggregations)

## How to Run (Quick Start)
### Option A — MongoDB Atlas + Compass
1. Create a MongoDB Atlas cluster and database: `Online_Beauty_Sales_Transcation`
2. Create collections: `Products`, `Customers`, `Orders`, `Payments`
3. Import each CSV in `data/` into its matching collection using MongoDB Compass:
   - Database → Collection → Import Data → CSV
4. Open VS Code MongoDB extension and run the Playground file:
   - `playground/playground-1.mongodb.js`

### Option B — Just Review the Code
Open `playground/playground-1.mongodb.js` to see:
- CRUD operations for all collections
- aggregation pipelines for all collections

## Example Aggregations Included
- Products: average price per category
- Customers: customer count by city parsed from address
- Orders: total order value per customer
- Payments: total paid by payment method

## Notes
- This is a learning/portfolio project focused on MongoDB fundamentals:
  schema design, CRUD, and aggregation pipelines.
