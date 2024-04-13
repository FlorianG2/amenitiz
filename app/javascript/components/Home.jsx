// import "./Home.css"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart_products, setCartProducts] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    fetch("/api/products/index")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.products);
        setProducts(data.products);
        setCartProducts(data.cart_products)
        setTotal(data.total)
      })
      .catch(error => {
        console.error('There was an error fetching exercises:', error);
      });
  }, []);

  const handleCreateCartProduct = (id) => {
     // Construct the URL with the product ID
     const url = `/api/cart_products/create?product_id=${id}`;
     const root ="/"
     // Navigate to the URL
     window.location.href = url;
     window.location.href = root
  }

  const handleDeleteAllCartProduct = () => {
    const url = `/api/cart_products/destroy_all`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    // Send a DELETE request to the URL
    fetch(url, {
        method: 'DELETE',
        headers: {
          "X-CSRF-Token": token,
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success if needed
        window.location.reload();
      })
    .catch(error => {
        // Handle error if needed
        console.error('Error:', error);
    });
 }

 const handleDeleteCartProduct = (id) => {
  const url = `/api/cart_products/${id}`;
  const token = document.querySelector('meta[name="csrf-token"]').content;

  // Send a DELETE request to the URL
  fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token,
        'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success if needed
      window.location.reload();
    })
  .catch(error => {
      // Handle error if needed
      console.error('Error:', error);
  });
}

const handleRemoveQuantityCartProduct = (id) => {
  // Construct the URL with the product ID
  const url = `/api/cart_products/${id}/update_quantity`;
  const root ="/"
  // Navigate to the URL
  window.location.href = url;
  window.location.href = root
}

  return(
    <div>
      <div>
        <h1>Produits</h1>
            {products.map(product => (
              <button key={product.id} onClick={() => handleCreateCartProduct(product.id)}>
                <p>{product.name}</p>
              </button>
            ))}
      </div>
      <div>
        <h1>Cart</h1>
          <ul>
          {cart_products.map(cart_product => (
            <p key={cart_product.id}>{cart_product.quantity}. {cart_product.name}
            <button onClick={() => handleDeleteCartProduct(cart_product.id)}>Delete</button>
            {cart_product.quantity > 1 ? (
              <button onClick={() => handleRemoveQuantityCartProduct(cart_product.id)}>Remove 1qty</button>
            ) : null}
            </p>
          ))}
          </ul>
          <button onClick={() => handleDeleteAllCartProduct()}>Delete</button>
      </div>
      <div>
        <h1>Total : {total}€</h1>
      </div>
    </div>
  )
};

export default Home;
