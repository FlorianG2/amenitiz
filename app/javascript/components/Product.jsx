import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/components/Product.css"

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/index")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('There was an error fetching exercises:', error);
      });
  }, []);

  const handleCreateCartProduct = (id) => {
    const url = `/api/cart_products/create?product_id=${id}`;
    const root ="/"
    window.location.href = url;
    window.location.href = root
 }
  return(
    <div className="grid-product">
      {products.map(product => (
        <div key={product.id} onClick={() => handleCreateCartProduct(product.id)} className="product-card"
          style={{
            backgroundImage: `url(http://localhost:3000/${product.url})`,
            backgroundSize: 'contain'
            }}>
            <p className="name-product-card">{product.name}</p>
          </div>
      ))}
    </div>
  )
};

export default Product;
