import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import "../../assets/stylesheets/components/Cart.css"

const Cart = () => {
  const [cart_products, setCartProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const [items, setItems] = useState([]);

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
        setTotal(data.total)
        setItems(data.number_items)
        console.log(data.number_items);
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
    <div className="card-container">
      {cart_products.map(cart_product => (
        <div className="cart-card" key={cart_product.id}>
          <div id="quantity">
            <p>{cart_product.quantity}.</p>
          </div>
          <div id="name">
            <p>{cart_product.name}</p>
          </div>
          <div id="buttons">
            <div className="button" id="delete-cart-product" onClick={() => handleDeleteCartProduct(cart_product.id)}><FontAwesomeIcon icon={faTrashCan} /></div>
            {cart_product.quantity > 1 ? (
              <div className="button" onClick={() => handleRemoveQuantityCartProduct(cart_product.id)}><FontAwesomeIcon icon={faSquareMinus} /></div>
              ) : null}
          </div>
        </div>
      ))}
      {items >= 1 ? (
        <button onClick={() => handleDeleteAllCartProduct()}>Delete All <FontAwesomeIcon icon={faTrashCan} /></button>
      ) : null}
      <p id="items">{items}</p>
    </div>
    <div className="total-container">
      <h1>Total : {total}€</h1>
    </div>
  </div>
</>
  )
};

export default Cart;
