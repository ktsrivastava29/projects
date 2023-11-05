dummy data:

{
"_id": {
"$oid": "6458d6008a24dcf1019ba1de"
},
"name": "Wireless Earbuds",
"description": "Premium quality earbuds with noise-cancelling feature",
"price": 79.99,
"ratings": 4.5,
"images": [
{
"public_id": "earbuds_1",
"url": "https://example.com/earbuds_1.jpg"
},
{
"public_id": "earbuds_2",
"url": "https://example.com/earbuds_2.jpg"
}
],
"category": "Electronics",
"Stock": 50,
"numOfReviews": 12,
"reviews": [
{
"user": "60f162920cbdf05dc8f30e24",
"name": "John Doe",
"rating": 4.5,
"comment": "Great earbuds, comfortable to wear for long hours."
},
{
"user": "60f162920cbdf05dc8f30e25",
"name": "Jane Smith",
"rating": 4.5,
"comment": "Great earbuds, comfortable to wear for long hours."
},
{
"user": "60f162920cbdf05dc8f30e25",
"name": "Jane Smith",
"rating": 5,
"comment": "Excellent sound quality, definitely worth the price."
}
],
"user": "60f162920cbdf05dc8f30e26",
"createdAt": "2021-07-16T16:30:00.000Z"
}

`sudo systemctl start mongod`
`export NODE_OPTIONS=--openssl-legacy-provider`