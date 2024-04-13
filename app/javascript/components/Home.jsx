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
            <p>{cart_product.quantity}. {cart_product.name}</p>
          ))}
          </ul>
      </div>
      <div>
        <h1>Total : {total}€</h1>
      </div>
    </div>
  )

    // <div>
    //   <div>
    //     <h1>Produits</h1>
    //     <ul>
    //       {exercises.map(exercise => (
    //         <button key={exercise.id} onClick={() => handleUpdateTraining(exercise.price, exercise.name)}>
    //           <li>{exercise.name} - {exercise.trainings} - {exercise.price}</li>
    //         </button>
    //       ))}
    //     </ul>
    //   </div>
    //   <div>
    //     <h1>Cash Register</h1>
    //     <ul>
    //       {trainings.map(training => (
    //         <li key={training.id}>{training.quantity}. {training.name} - {training.price}</li>
    //       ))}
    //     </ul>
    //     <div>
    //       <p>Total: {totalPrice}</p>
    //     </div>
    //   </div>
    // </div>
};

export default Home;
