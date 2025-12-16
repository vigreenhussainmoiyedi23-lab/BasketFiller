import React, { useState } from "react";

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [details, setDetails] = useState({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
    });

    const [onlinePayment, setOnlinePayment] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardHolder: "",
    });

    const handlePlaceOrder = () => {
        const orderData = {
            details,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
        };

        console.log("Order Data:", orderData);
        alert("Dummy order placed successfully!");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex justify-center p-6">
            <div className="w-full max-w-3xl bg-zinc-900 rounded-xl p-6 space-y-6">
                <h2 className="text-3xl font-semibold">Checkout</h2>

                {/* Details Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-medium">Shipping Details</h3>

                    <input
                        placeholder="Full Name"
                        className="input"
                        required

                        onChange={(e) =>
                            setDetails({ ...details, fullName: e.target.value })
                        }
                    />
                    <input
                        placeholder="Phone Number"
                        className="input"
                        required
                        onChange={(e) =>
                            setDetails({ ...details, phone: e.target.value })
                        }
                    />
                    <input
                        placeholder="Street Address"
                        className="input"
                        required

                        onChange={(e) =>
                            setDetails({ ...details, street: e.target.value })
                        }
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            placeholder="City"
                            className="input"
                            required

                            onChange={(e) =>
                                setDetails({ ...details, city: e.target.value })
                            }
                        />
                        <input
                            placeholder="State"
                            className="input"
                            required
                            onChange={(e) =>
                                setDetails({ ...details, state: e.target.value })
                            }
                        />
                    </div>
                    <input
                        placeholder="ZIP Code"
                        className="input"
                        required
                        onChange={(e) =>
                            setDetails({ ...details, zip: e.target.value })
                        }
                    />
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                    <h3 className="text-xl font-medium">Payment Method</h3>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={() => setPaymentMethod("COD")}
                            />
                            Cash on Delivery
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="ONLINE"
                                checked={paymentMethod === "ONLINE"}
                                onChange={() => setPaymentMethod("ONLINE")}
                            />
                            Online Payment
                        </label>
                    </div>
                </div>

                {/* Online Payment Fields */}
                {paymentMethod === "ONLINE" && (
                    <div className="space-y-4 bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">Online Payment Details</h3>

                        <input
                            placeholder="Card Number"
                            className="input"
                            onChange={(e) =>
                                setOnlinePayment({
                                    ...onlinePayment,
                                    cardNumber: e.target.value,
                                })
                            }
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="Expiry (MM/YY)"
                                className="input"
                                onChange={(e) =>
                                    setOnlinePayment({
                                        ...onlinePayment,
                                        expiry: e.target.value,
                                    })
                                }
                            />
                            <input
                                placeholder="CVV"
                                className="input"
                                onChange={(e) =>
                                    setOnlinePayment({
                                        ...onlinePayment,
                                        cvv: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <input
                            placeholder="Card Holder Name"
                            className="input"
                            onChange={(e) =>
                                setOnlinePayment({
                                    ...onlinePayment,
                                    cardHolder: e.target.value,
                                })
                            }
                        />

                        <p className="text-sm text-zinc-400">
                            ⚠️ This is a demo payment. No real money will be charged.
                        </p>
                    </div>
                )}

                {/* Place Order */}
                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-semibold"
                >
                    Place Order
                </button>
            </div>

            {/* Tailwind input helper */}
            <style>
                {`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            background: #18181b;
            border: 1px solid #27272a;
            outline: none;
          }
          .input:focus {
            border-color: #6366f1;
          }
        `}
            </style>
        </div>
    );
};

export default CheckoutPage;
