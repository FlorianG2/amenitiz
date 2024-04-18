import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import "../../assets/stylesheets/components/Cart.css"

const Cart = () => {
  const [cart_products, setCartProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const [items, setItems] = useState([]);
  const [total_discount, setTotalDiscount] = useState([]);
  const [subtotal, setSubtotal] = useState([]);

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
        setTotalDiscount(data.total_discount)
        setSubtotal(data.subtotal)
      })
      .catch(error => {
        console.error('There was an error fetching exercises:', error);
      });
  }, []);

  const handleDeleteAllCartProduct = () => {
    const url = `/api/cart_products/destroy_all`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

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
        window.location.reload();
      })
    .catch(error => {
        console.error('Error:', error);
    });
 }

 const handleDeleteCartProduct = (id) => {
  const url = `/api/cart_products/${id}`;
  const token = document.querySelector('meta[name="csrf-token"]').content;

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
      window.location.reload();
    })
  .catch(error => {
      console.error('Error:', error);
  });
}

const handleRemoveQuantityCartProduct = (id) => {
  const url = `/api/cart_products/${id}/update_quantity`;
  const root ="/"
  window.location.href = url;
  window.location.href = root
}

  return(
  <>
  <div className="cart-container">
    <div className="w-100">
      <div className="cart-product-details bottom-border">
        <div id="quantity">
          <p className="bold italic">Qty</p>
        </div>
        <div className="bold italic" id="name">
          <p>Article</p>
        </div>
        <div className="bold italic cursor-pointer" id="buttons">
          <p>Price</p>
        </div>
      </div>
      {cart_products.map(cart_product => (
        <div className="cart-product-card" key={cart_product.id}>
          <div className="cart-product-details">
            <div id="quantity">
              <p>{cart_product.quantity}</p>
            </div>
            <div id="name">
              <p>{cart_product.name}</p>
            </div>
            <div id="buttons">
              <p>{cart_product.price} €</p>
              <div className="cursor-pointer" id="delete-cart-product" onClick={() => handleDeleteCartProduct(cart_product.id)}><FontAwesomeIcon icon={faTrashCan} /></div>
              {cart_product.quantity > 1 ? (
                <div className="cursor-pointer" onClick={() => handleRemoveQuantityCartProduct(cart_product.id)}><FontAwesomeIcon icon={faSquareMinus} /></div>
              ) : null}
            </div>
          </div>
          <div className="cart-promotion">
            {cart_product.discount > 0 ? (
              <div>
                <p className="promotion italic">Promotion {cart_product.discount} €</p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
    <div className="total-container">
      {cart_products.length > 0 ? (
          <div onClick={() => handleDeleteAllCartProduct()}><p id="items"><FontAwesomeIcon icon={faTrashCan} />{items}</p></div>
        ) : null}
      {total_discount > 0 ? (
        <>
          <h5 id="total-promotion"> Subtotal : {subtotal}€</h5>
          <h5 id="total-promotion"> Total Promotion : {total_discount}€</h5>
        </>
      ) : null}
      <h1 id="total">Total : {total}€</h1>
    </div>
  </div>
</>
  )
};

export default Cart;
