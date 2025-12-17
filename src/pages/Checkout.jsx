import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleNextFromAddress = () => {
    if (!address || !city || !pincode) {
      setError("Please fill all address fields");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleNextFromPayment = () => {
    if (!cardName || cardNumber.length < 8) {
      setError("Please enter valid card details");
      return;
    }
    setError("");
    setStep(3);
  };
  const saveOrderToHistory = () => {
  const previousOrders =
    JSON.parse(localStorage.getItem("orders")) || [];
  const nextOrderNumber = previousOrders.length + 1;


  const newOrder = {
  id: Date.now(),
  orderNumber: nextOrderNumber, // 👈 ADD THIS

  items: cartItems,
  total: totalPrice,
  date: new Date().toLocaleString(),

  cardName,
  cardLast4: cardNumber.slice(-4),

  address,
  city,
  pincode,
};



  localStorage.setItem(
    "orders",
    JSON.stringify([newOrder, ...previousOrders,])
  );
};


const handleConfirmOrder = () => {
  saveOrderToHistory();
  dispatch(clearCart());
  setShowSuccess(true);
  setTimeout(() => {
    navigate("/products");
  }, 1800);
};


  return (
    <div className="container checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-steps">
        <div className={step >= 1 ? "active" : ""}><strong>Address</strong></div>
        <div className={step >= 2 ? "active" : ""}><strong>Payment</strong></div>
        <div className={step === 3 ? "active" : ""}><strong>Confirm</strong></div>
      </div>

      <div className="checkout-card">
        {error && <p className="error-text">{error}</p>}

        {step === 1 && (
          <>
            <h3>Shipping Address</h3>

            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <button onClick={handleNextFromAddress}>
              Continue to Payment
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Card Details</h3>

            <input
              placeholder="Name on Card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <input
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <div className="checkout-actions">
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={handleNextFromPayment}>
                Review Order
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Order Summary</h3>

            <div className="order-summary">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="summary-image"
                  />
                  <div className="summary-info">
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}
            </div>

            <h4>Total: ₹{totalPrice}</h4>

            <div className="checkout-actions">
              <button onClick={() => setStep(2)}>Back</button>
              <button
                className="confirm-btn"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal">
            <p>🎊 Order Confirmed</p>
            <p>Your purchase was successful.</p>
            <p>Check the Orders page for delivery details.</p>
          </div>
        </div>
      )}
    </div>
  );
}
