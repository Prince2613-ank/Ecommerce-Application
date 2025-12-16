import { useState } from "react";

export default function Orders() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // ✅ newest order first (UI only)
  const orders = [...(JSON.parse(localStorage.getItem("orders")) || [])]
    .sort((a, b) => b.orderNumber - a.orderNumber);

  const toggleDetails = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  if (orders.length === 0) {
    return (
      <div className="container">
        <h2>Order History</h2>
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Order History</h2>

      {orders.map(order => (
        <div key={order.id} className="order-card">

          {/* 🔹 ORDER BADGE */}
          <div className="order-badge">
            Order #{order.orderNumber}
          </div>

          {/* 🔹 HEADER */}
          <div className="order-card-header">
           <h4>{order.cardName || "Customer"}</h4> 
            <h4>
              {order.cardLast4
                ? `XXXX-XXXX-XXXX-${order.cardLast4}`
                : "XXXX-XXXX-XXXX-"}
          </h4>  
          </div>

          {/* 🔹 BASIC INFO */}
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Items:</strong> {order.items.length}</p>

          {/* 🔹 TOGGLE */}
          <button
            className="view-details-btn"
            onClick={() => toggleDetails(order.id)}
          >
            {expandedOrderId === order.id ? "Hide Details" : "View Details"}
          </button>

          {/* 🔹 DETAILS */}
          {expandedOrderId === order.id && (
            <div className="order-details">

             
               Delivery Address
                <h5>
                     {order.address}, {order.city} – {order.pincode}
                </h5>
              

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item-card">
                    <img src={item.image} alt={item.name} />

                    <div className="order-item-info">
                      <h4><strong>{item.name}</strong></h4>
                      <p className="order-desc">{item.description}</p>

                      <div className="order-meta">
                        <span>⭐ {item.rating}</span>
                       <span>Qty: {item.qty}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}
