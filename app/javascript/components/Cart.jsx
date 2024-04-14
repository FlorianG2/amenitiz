import React, { useState, useEffect } from "react";
import "../../assets/stylesheets/components/Cart.css"

const Cart = () => {
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
        setCartProducts(data.cart_products)
        console.log(data.cart_products);
        setTotal(data.total)
      })
      .catch(error => {
        console.error('There was an error fetching exercises:', error);
      });
  }, []);

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
  <>
  <div className="cart-container">
    <p>{cart_products.length} item(s)</p>
    <div className="card-container">
      {cart_products.map(cart_product => (
        <div className="cart-card">
          <div id="quantity">
            <p key={cart_product.id}>{cart_product.quantity}.</p>
          </div>
          <div id="name">
            <p key={cart_product.id}>{cart_product.name}</p>
          </div>
          <div id="buttons">
            <div id="delete-cart-product" onClick={() => handleDeleteCartProduct(cart_product.id)}>Delete</div>
            {cart_product.quantity > 1 ? (
            <div onClick={() => handleRemoveQuantityCartProduct(cart_product.id)}>Remove</div>
            ) : null}
          </div>
        </div>
      ))}
      <button onClick={() => handleDeleteAllCartProduct()}>Delete</button>
    </div>
    <div className="total-container">
      <h1>Total : {total}€</h1>
    </div>
  </div>
</>
  )
};

export default Cart;
