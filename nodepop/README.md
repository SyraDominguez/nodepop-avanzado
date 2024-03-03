# Nodepop

#### Welcome to NODEPOP. App to buy and sell between individuals

## Install Dependencies

```js
npm install
```

### Initialize the database

**⚠️`WARNING`⚠️**

The next command deletes the database

```sh
npm run init-db
```

## Development

To start the application the development mode you can use:

```sh
npm run dev
```

## API routes

`Products List`

```sh
GET /api/products
```

```json
{
  "results": [
    {
      "_id": "65e0a6820f64f2cceb437c3e",
      "name": "MacBook Pro",
      "venta": true,
      "price": 888,
      "foto": "macbook.jpg",
      "tags": ["work", "lifestyle"]
    }
  ]
}
```

`Single Product`

```sh
GET /api/products/<_id>
```

```json
{
  "result": {
    "_id": "65e0a6820f64f2cceb437c3e",
    "name": "MacBook Pro",
    "venta": true,
    "price": 888,
    "foto": "macbook.jpg",
    "tags": ["work", "lifestyle"]
  }
}
```

`Update Product`

```sh
PUT /api/products/<_id>
```

`Create a new Product`

```sh
POST /api/products/
```

`Delete a Product`

```sh
DELETE /api/products/<_id>
```

```json
{
    "message": "Product deleted successfully"
}
``
```

This is the list of URLs to access the code's functionalities. The API is mounted under the prefix /api/products:

`GET (Get Data):`

**List all products:**

`http://localhost:3000/api/products`
Supports filters, pagination and sorting through query parameters:

**?name=value**

```json
http://localhost:3000/api/products?name=Airpods
```

**?sale=true|false**

```json
http://localhost:3000/api/products?sale=false
```

**?tags=tag1,tag2**

```json
http://localhost:3000/api/products?tags=work&tags=motor
```

**?minPrice=50** & **?maxPrice=100**

```json
http://localhost:3000/api/products?minPrice=50&maxPrice=110
```

**?startsWithLetter=a**

```json
http://localhost:3000/api/products?startsWithLetter=M
```

**?containsString=search**

```json
http://localhost:3000/api/products?containsString=Pro
```

**?skip=5** & **?limit=10**

```json
http://localhost:3000/api/products?skip=2&limit=4
```

**?sort=price**

**Get an individual product:**

```json
http://localhost:3000/api/products?sort=price
```

`http://localhost:3000/api/products/:id` (replace :id with the ObjectId of the product)

**Get List existing tags:**

`http://localhost:3000/api/products/tags/existing`

```json
http://localhost:3000/api/products/tags/existing
```

```json
{
  "tags": ["lifestyle", "mobile", "motor", "work"]
}
```

`PUT (Update data):`

**Update a product:**`

`http://localhost:3000/api/products/:id`
(PUT method, sending the updated data in the body of the request)

`POST (Create data):`

**Create a new product:**

`http://localhost:3000/api/products `
(POST method, sending the data of the new product in the body of the request)

`DELETE (Delete data):`

**Delete a product:**
`http://localhost:3000/api/products/:id `
(DELETE method)

These URLs assume that your API is running on a local server on port 3000. If your configuration is different, adjust the URLs accordingly.
The format of the data to be sent in the POST and PUT requests must be JSON, following the structure of the Products collection in your Mongoose database.
