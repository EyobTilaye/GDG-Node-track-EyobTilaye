# Product API Documentation

## Overview

A RESTful API for an e-commerce system that manages products, shopping carts, and orders. This API provides comprehensive functionality for building e-commerce applications with full CRUD operations for products, cart management, and order processing.

Authentication (Current & Future) Current State Authentication is not yet JWT-based userId is passed explicitly in the request body where required

## Base URL

```
http://localhost:5500
```

---

## Endpoints

### Products

#### 1. Get All Products

- **Method:** `GET`
- **Path:** `/products`
- **Description:** Retrieve a list of all products with optional filtering capabilities
- **Query Parameters:**
    - `category` (optional) - Filter products by category (e.g., "electronics")
    - `minPrice` (optional) - Filter products with price greater than or equal to this value
    - `maxPrice` (optional) - Filter products with price less than or equal to this value

**Request:**

```
GET http://localhost:5500/products?category=electronics&minPrice=15&maxPrice=60
```

**Response:**

```json
{
    "data": [
        {
            "_id": "6985397578cceb20afc73516",
            "name": "iphone",
            "price": 50,
            "description": "best phone for shotting short movies",
            "stock": 10,
            "category": "electronics",
            "imageUrl": "",
            "__v": 0
        },
        {
            "_id": "69854052dc1f7b75b73b8027",
            "name": "washing machine",
            "price": 20,
            "description": "best energy saving washing machine",
            "stock": 5,
            "category": "electronics",
            "imageUrl": "",
            "__v": 0
        }
    ]
}
```

---

#### 2. Get Product by ID

- **Method:** `GET`
- **Path:** `/products/:id`
- **Description:** Retrieve a single product by its unique identifier
- **Path Parameters:**
    - `id` (required) - The MongoDB ObjectId of the product

**Request:**

```
GET http://localhost:5500/products/6985397578cceb20afc73516
```

**Response:**

```json
{
    "data": {
        "_id": "6985397578cceb20afc73516",
        "name": "iphone",
        "price": 50,
        "description": "best phone for shotting short movies",
        "stock": 10,
        "category": "electronics",
        "imageUrl": "",
        "__v": 0
    }
}
```

---

#### 3. Add New Product

- **Method:** `POST`
- **Path:** `/products`
- **Description:** Create a new product in the system

**Request:**

```
POST http://localhost:5500/products
Content-Type: application/json

{
  "name": "laptop",
  "price": 800,
  "description": "High performance laptop",
  "stock": 15,
  "category": "electronics",
  "imageUrl": "https://example.com/laptop.jpg"
}
```

**Response:**

```json
{
    "data": {
        "_id": "698542f2d7fecdf4a2b1c345",
        "name": "laptop",
        "price": 800,
        "description": "High performance laptop",
        "stock": 15,
        "category": "electronics",
        "imageUrl": "https://example.com/laptop.jpg",
        "__v": 0
    }
}
```

---

#### 4. Update Product

- **Method:** `PUT`
- **Path:** `/products/:id`
- **Description:** Update an existing product's information
- **Path Parameters:**
    - `id` (required) - The MongoDB ObjectId of the product to update

**Request:**

```
PUT http://localhost:5500/products/6985397578cceb20afc73516
Content-Type: application/json

{
  "name": "iphone",
  "price": 45,
  "description": "best phone for shooting short movies - SALE!",
  "stock": 8,
  "category": "electronics",
  "imageUrl": ""
}
```

**Response:**

```json
{
    "data": {
        "_id": "6985397578cceb20afc73516",
        "name": "iphone",
        "price": 45,
        "description": "best phone for shooting short movies - SALE!",
        "stock": 8,
        "category": "electronics",
        "imageUrl": "",
        "__v": 0
    },
    "message": "Product successfully updated."
}
```

---

#### 5. Delete Product

- **Method:** `DELETE`
- **Path:** `/products/:id`
- **Description:** Remove a product from the system
- **Path Parameters:**
    - `id` (required) - The MongoDB ObjectId of the product to delete

**Request:**

```
DELETE http://localhost:5500/products/698542f2d7fecdf4a2b1c345
```

**Response:**

```json
{
    "message": "Product deleted successfully"
}
```

---

### Carts

#### 1. View Cart

- **Method:** `GET`
- **Path:** `/carts`
- **Description:** Retrieve the current shopping cart contents

**Request:**

```
GET http://localhost:5500/carts
```

**Response:**

```json
{
    "data": {
        "userId": "69849d16d9854a7adf2c1234",
        "items": [
            {
                "productId": "6985397578cceb20afc73516",
                "name": "iphone",
                "price": 50,
                "quantity": 2
            }
        ]
    }
}
```

---

#### 2. Add Item to Cart

- **Method:** `POST`
- **Path:** `/carts`
- **Description:** Add a product to the shopping cart

**Request:**

```
POST http://localhost:5500/carts
Content-Type: application/json

{
    "userId" : "69849d16d9854a7adf2c1234",
    "item: {
        productId": "6985397578cceb20afc73516",
        "quantity": 2
    }
}
```

**Response:**

```json
{
    "data": {
        "uerId": "69849d16d9854a7adf2c1234",
        "items": [
            {
                "productId": "6985397578cceb20afc73516",
                "quantity": 2
            }
        ]
    }
}
```

---

#### 3. Update Cart

- **Method:** `PUT`
- **Path:** `/carts`
- **Description:** Update cart items or quantities

**Request:**

```
PUT http://localhost:5500/carts
Content-Type: application/json

{
    "userId": "69849d16d9854a7adf2c1234",
    "items":{
        "productId": "6985397578cceb20afc73516",
        "quantity": 3
    }
}
```

**Response:**

```json
{
    "data": {
        "_id": "69849d16d9854a7adf2c1234",
        "items": [
            {
                "productId": "6985397578cceb20afc73516",
                "name": "iphone",
                "price": 50,
                "quantity": 3
            }
        ]
    }
}
```

---

#### 4. Remove Item from Cart

- **Method:** `DELETE`
- **Path:** `/carts/:productId`
- **Description:** Remove a specific product from the cart
- **Path Parameters:**
    - `productId` (required) - The ID of the product to remove

**Request:**

```
DELETE http://localhost:5500/carts/6985397578cceb20afc73516
```

**Response:**

```json
{
    "message": "Item removed from cart",
    "data": {
        "_id": "69849d16d9854a7adf2c1234",
        "items": []
    }
}
```

---

### Orders

#### 1. Create Order

- **Method:** `POST`
- **Path:** `/orders`
- **Description:** Create a new order from the current cart and the userId is required to identify the user

**Request:**

```
POST http://localhost:5500/orders
Content-Type: application/json

{
  "userId" : "69849d16d9854a7adf2c1234"
}
```

**Response:**

```json
{
    "message": "Order created successfully",
    "data": {
        "userId": "6985c12af03d168c84a5b678",
        "items": [
            {
                "productId": "6985397578cceb20afc73516",
                "name": "iphone",
                "price": 50,
                "quantity": 2
            }
        ],
        "total": 100,
        "customerInfo": {
            "name": "Eyob"
        },
        "orderDate": "2026-02-06T10:30:00Z"
    }
}
```

---

#### 2. Get All Orders

- **Method:** `GET`
- **Path:** `/orders`
- **Description:** Retrieve a list of all orders

**Request:**

```
GET http://localhost:5500/orders
```

**Response:**

```json
{
    "data": [
        {
            "userId": "6985c12af03d168c84a5b678",
            "items": [
                {
                    "productId": "6985397578cceb20afc73516",
                    "name": "iphone",
                    "price": 50,
                    "quantity": 2
                }
            ],
            "total": 100,
            "customerInfo": {
                "name": "Eyob"
            },
            "orderDate": "2026-02-06T10:30:00Z"
        }
    ]
}
```

---

#### 3. Get Order by ID

- **Method:** `GET`
- **Path:** `/orders/:id`
- **Description:** Retrieve a specific order by its unique identifier
- **Path Parameters:**
    - `id` (required) - The unique identifier of the order

**Request:**

```
GET http://localhost:5500/orders/6985c12af03d168c84a5b678
```

**Response:**

```json
{
    "data": {
        "_id": "6985c12af03d168c84a5b678",
        "items": [
            {
                "productId": "6985397578cceb20afc73516",
                "name": "iphone",
                "price": 50,
                "quantity": 2
            }
        ],
        "total": 100,
        "customerInfo": {
            "name": "Eyob"
        },
        "orderDate": "2026-02-06T10:30:00Z"
    }
}
```

---

## Product Object Fields

| Field         | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `_id`         | string | MongoDB ObjectId - Unique identifier |
| `name`        | string | Product name                         |
| `price`       | number | Product price                        |
| `description` | string | Product description                  |
| `stock`       | number | Available quantity in stock          |
| `category`    | string | Product category                     |
| `imageUrl`    | string | URL to product image                 |
| `__v`         | number | Version key (MongoDB)                |

---

## Query Parameters for GET /products

| Parameter  | Type   | Description                      | Example                 |
| ---------- | ------ | -------------------------------- | ----------------------- |
| `category` | string | Filter by product category       | `?category=electronics` |
| `minPrice` | number | Minimum price filter (inclusive) | `?minPrice=15`          |
| `maxPrice` | number | Maximum price filter (inclusive) | `?maxPrice=60`          |

**Combined Example:**

```
GET /products?category=electronics&minPrice=15&maxPrice=60
```

---

## Getting Started

1. Ensure the API server is running on `http://localhost:5500`
2. Use the endpoints above to interact with products, carts, and orders
3. All responses follow the standard JSON format
4. Product IDs are MongoDB ObjectIds in string format
