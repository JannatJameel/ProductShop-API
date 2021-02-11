// app.post("/products", (req, res) => {
//   req.body.id = products[products.length - 1].id + 1;
//   products.push(req.body);
//   res.status(201).json(req.body);
// });

// app.delete("/products/:productId", (req, res) => {
//   const foundProduct = products.find(product => product.id === +req.params.productId);
//   if(foundProduct) {
//     products = products.filter(product => product !== foundProduct);
//     res.status(204).end();
//   }else{
//     res.status(404);
//     res.json({message: "Product not found"})
//   }
  
// });

// app.get("/products", (req, res) => {
//     res.json(products);
// });

// app.listen(8000, () => {
//     console.log("The application is running on localhost:8000");
// });