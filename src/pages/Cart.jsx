import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQty } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty, 0);
    const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,0);

    if (cartItems.length === 0) {
    return (
    <div className="container">
    <div className="empty-cart">
    <div className="empty-cart-icon">🛒</div>
    <p><strong>Your cart is empty</strong></p>
    <p>Looks like you haven’t added anything yet.</p>
    <button className="empty-cart-btn" onClick={() => navigate("/products")}>Continue Shopping</button>
    </div>
    </div>
    );
    }

    return (
    <div className="container cart-page">
      <h2>Your Cart</h2>
      <div className="cart-layout">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item fancy">
            <img src={item.image} alt={item.name} className="cart-image" onError={(e) => {
              e.target.src = "/images/bottle.jpg"; 
              }}/>

            <div className="cart-info">
                <h4>{item.name}</h4>
                <p className="price">₹{item.price}</p>
                <div className="qty-controls fancy-qty">
                <button onClick={() => dispatch(
                        updateQty({
                        id: item.id,
                        qty: Math.max(1, item.qty - 1),
                        })
                    )
                    }
                >
                    −
                </button>

                <span>{item.qty}</span>

                <button
                    onClick={() =>
                    dispatch(
                        updateQty({
                        id: item.id,
                        qty: item.qty + 1,
                        })
                    )
                    }
                >
                    +
                </button>
                </div>
            </div>

            <button
                className="remove-btn fancy-remove"
                onClick={() =>
                dispatch(removeFromCart(item.id))
                }
            >
                ✕
            </button>
            </div>
        ))}
        </div>

        <div className="cart-summary fancy-summary">
        <h3>Order Summary</h3>
        <p className="summary-row">
        <span>Total Items</span>
        <span>{totalItems}</span>
        </p>
        <p className="total">
        <span>Total Price</span>
        <span>₹{totalPrice}</span>        </p>
          <button
            className="checkout-btn fancy-checkout"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
