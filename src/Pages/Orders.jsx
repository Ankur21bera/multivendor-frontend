import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import axios from "axios";
import toast from "react-hot-toast";
import { ShopContext } from "../Context/ShopContext";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [trackOrder, setTrackOrder] = useState(null);

  const statusSteps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  const loadOrders = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/order/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      }
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Order cancelled");
        loadOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Cancel failed");
    }
  };

  const requestReturn = async (orderId) => {
    const reason = prompt("Reason for return?");
    if (!reason) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/order/return`,
        { orderId, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Return requested");
        loadOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Return request failed");
    }
  };

  const viewInvoice = async (orderId) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/order/invoice/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, "_blank");
    } catch (error) {
      toast.error("Failed to load invoice");
    }
  };

  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        orders.map((order) =>
          order.items.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* LEFT */}
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.productId?.image?.[0]}
                  alt={item.productId?.name}
                  className="w-16 sm:w-20 object-cover"
                />

                <div>
                  <p className="sm:text-base font-medium">
                    {item.productId?.name}
                  </p>

                  <div className="flex gap-3 mt-2 text-base">
                    <p className="font-medium">
                      {currency}
                      {item.productId?.finalPrice || item.productId?.basePrice}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-2 text-sm">
                    Date:
                    <span className="text-gray-400 ml-2">
                      {new Date(order.date).toDateString()}
                    </span>
                  </p>

                  <p className="mt-1 text-sm">
                    Payment:
                    <span className="text-gray-400 ml-2">
                      {order.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Cancelled"
                        ? "bg-red-500"
                        : order.status === "Return Requested"
                        ? "bg-orange-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                  <p className="text-sm font-medium">{order.status}</p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setTrackOrder(order)}
                    className="border cursor-pointer px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
                  >
                    Track Order
                  </button>

                  {order.payment && (
                    <button
                      onClick={() => viewInvoice(order._id)}
                      className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
                    >
                      View Invoice
                    </button>
                  )}

                  {order.status === "Order Placed" && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="border border-red-500 text-red-500 px-4 py-2 text-sm rounded-sm hover:bg-red-500 hover:text-white transition"
                    >
                      Cancel
                    </button>
                  )}

                  {order.status === "Delivered" && !order.refund && (
                    <button
                      onClick={() => requestReturn(order._id)}
                      className="border border-orange-500 text-orange-500 px-4 py-2 text-sm rounded-sm hover:bg-orange-500 hover:text-white transition"
                    >
                      Return
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )
      )}
      {trackOrder && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg p-6 relative">
            {/* Close */}
            <button
              onClick={() => setTrackOrder(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">Track Order</h3>

            <div className="space-y-4">
              {trackOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white w-[90%] max-w-md rounded-lg p-6 relative">
                    <button
                      onClick={() => setTrackOrder(null)}
                      className="absolute right-4 top-3 text-xl"
                    >
                      ✕
                    </button>

                    <h2 className="text-lg font-semibold mb-5">
                      Track Your Order
                    </h2>

                    <div className="space-y-4">
                      {statusSteps.map((step, index) => {
                        const currentIndex = statusSteps.indexOf(
                          trackOrder.status
                        );
                        const active = index <= currentIndex;

                        return (
                          <div key={step} className="flex items-center gap-4">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                active ? "bg-green-600" : "bg-gray-300"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                active
                                  ? "text-green-600 font-medium"
                                  : "text-gray-500"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                      Current Status:
                      <span className="ml-2 font-semibold text-gray-800">
                        {trackOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Last updated:{" "}
              <span className="font-medium">
                {new Date(trackOrder.date).toDateString()}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
