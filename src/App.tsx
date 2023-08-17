import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";

const images = [
  {
    id: 1,
    url:
      "https://img.alicdn.com/imgextra/i4/O1CN01qreKyD1rnewEMRGoq_!!6000000005676-0-tps-900-383.jpg",
    name: "Image 1"
  },
  {
    id: 2,
    url: "https://ae01.alicdn.com/kf/S6128580459424f3e88c79d0c42a702d4r.png",
    name: "Image 2"
  }
  // 添加更多图片项...
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartCount(1);
    document.querySelector(".cart-count").classList.add("adding");
    setTimeout(() => {
      setCartCount(cartCount + 1);
      document.querySelector(".cart-count").classList.remove("adding");
    }, 500);

    const imageItem = document.querySelector(`[data-id="${item.id}"]`);
    const cart = document.querySelector(".cart");

    const imageItemRect = imageItem.getBoundingClientRect();
    const clone = imageItem.cloneNode(true);

    const cartRect = cart.getBoundingClientRect();

    clone.style.position = "absolute";
    clone.style.top = `${imageItemRect.top - cartRect.top}px`;
    clone.style.left = `${imageItemRect.left - cartRect.left}px`;

    cart.appendChild(clone);

    setTimeout(() => {
      const translateX = cartRect.left - imageItemRect.left;
      const translateY = cartRect.top - imageItemRect.top;
      clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.5)`;
      clone.style.opacity = 0;
    }, 0);

    setTimeout(() => {
      cart.removeChild(clone);
    }, 500);
  };

  const handleRemoveFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCartItems);
    setCartCount(cartCount - 1);
  };

  return (
    <div className="app">
      <div className="image-list" id="image-list">
        {images.map((image) => (
          <div key={image.id} className="image-item" data-id={image.id}>
            <img src={image.url} alt={image.name} />
            <button onClick={() => handleAddToCart(image)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <TransitionGroup className="cart-items">
          {cartItems.map((item) => (
            <CSSTransition key={item.id} timeout={200} classNames="item">
              <div className="cart-item" id={item.id}>
                <img src={item.url} alt={item.name} />
                <button onClick={() => handleRemoveFromCart(item)}>
                  Remove
                </button>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>

        <div className="cart-count">
          <CSSTransition
            in={cartCount > 0}
            timeout={200}
            classNames="count"
            unmountOnExit
          >
            <div>{cartCount}</div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}
