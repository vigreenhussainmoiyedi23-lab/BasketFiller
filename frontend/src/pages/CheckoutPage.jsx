import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
    async function GetStateEnum() {
        try {
            const res = await axiosInstance.get("/order/stateEnum")

            setStates(res.data.
                enumValues)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetStateEnum()
    }, [])
    const [errorMessgae, setErrorMessgae] = useState("")
    const [paymentOption, setpaymentOption] = useState("COD");
    const [onlinepaymentOption, setOnlinepaymentOption] = useState("failed")
    const [states, setStates] = useState([])
    const navigate = useNavigate()
    const [details, setDetails] = useState({
        fullName: "",
        phoneNumber: "",
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

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        try {
            const orderData = {
                ...details,
                paymentOption,
                paymentStatus: paymentOption === "COD" ? "pending" : "paid",
            };
            const res = await axiosInstance.post("/order/create", orderData)
            navigate("/profile")
            setDetails({
                fullName: "",
                phoneNumber: "",
                street: "",
                city: "",
                state: "",
                zip: "",
            })
            setErrorMessgae("")
        } catch (error) {
            if (error.response.data.message) setErrorMessgae(error.response.data.message)
            else if (error.response.data.errors) setErrorMessgae(error.response.data.errors[0].msg)
            else setErrorMessgae("Something went Wrong")
        }
    };

    if (!states) { return <><h1>Loading essential Data</h1></> }
    return (
        <div className="min-h-screen bg-zinc-950 text-white flex justify-center p-6">
            <form onSubmit={handlePlaceOrder} className="w-full max-w-3xl bg-zinc-900 rounded-xl p-6 space-y-6">
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
                        type="number"
                        min="1000000000"
                        max="9999999999"
                        required
                        onChange={(e) =>
                            setDetails({ ...details, phoneNumber: e.target.value })
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
                        <select
                            value={details.state}
                            onChange={(e) => setDetails({ ...details, state: e.target.value })}
                            className="w-full p-3 bg-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select State Or Union Territory</option>
                            {states.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        placeholder="ZIP Code"
                        className="input"
                        required
                        type="number"
                        max="855126"
                        min="110001"
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
                                checked={paymentOption === "COD"}
                                onChange={() => setpaymentOption("COD")}
                            />
                            Cash on Delivery
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="ONLINE"
                                checked={paymentOption === "ONLINE"}
                                onChange={() => setpaymentOption("ONLINE")}
                            />
                            Online Payment
                        </label>
                    </div>
                </div>

                {/* Online Payment Fields */}
                {paymentOption === "ONLINE" && (
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
                {errorMessgae ? <><h1 className="text-red-600">{errorMessgae}</h1></> : ""}
                {/* Place Order */}
                <input
                    type="submit"
                    value="Place Order"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-3 rounded-lg font-semibold"
                />
            </form>

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
