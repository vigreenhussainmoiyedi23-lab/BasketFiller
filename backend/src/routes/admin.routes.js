const express = require('express')
const adminModel = require('../models/admin.model')
const { HashPassword, comparePassword } = require('../utils/bcrypt')
const { GenerateToken } = require('../utils/jwt')
const Router = express.Router()
const { isadmin } = require('../middlewares/AdminMiddleware')
const { LoginValidator, validate } = require('../utils/express-validator')
const UserModel = require('../models/user.model')
const orderModel = require('../models/order.model')
// order revenue related routes
Router.post('/revenue/year', async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();

        const data = await orderModel.aggregate([
            // Match only orders from that year
            {
                $match: {
                    $expr: { $eq: [{ $year: "$createdAt" }, year] },
                },
            },
            // Group by month number
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalSales: {
                        $sum: {
                            $cond: [
                                { $eq: ["$paymentStatus", "paid"] },
                                "$totalAmount",
                                0
                            ]
                        }
                    },
                    totalOrders: { $sum: 1 },
                    ordersCancelled: {
                        $sum: {
                            $cond: [{ $eq: ["$orderStatus", "cancelled"] }, 1, 0]
                        }
                    },
                    ordersRefunded: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentStatus", "refunded"] }, 1, 0]
                        }
                    }
                }
            },

            // Format output
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    totalSales: 1,
                    totalOrders: 1,
                    ordersCancelled: 1,
                    ordersRefunded: 1
                },
            },
            { $sort: { month: 1 } },
        ]);

        // Fill missing months with zero
        const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
        const completeData = allMonths.map((m) => {
            const found = data.find((d) => d.month === m);
            return (
                found || {
                    month: m,
                    totalSales: 0,
                    totalOrders: 0,
                    ordersCancelled: 0,
                    ordersRefunded: 0,
                }
            );
        });

        res.status(200).json({
            success: true,
            year,
            monthlyStats: completeData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error generating monthly stats" });
    }
})
Router.post('/revenue/month', async (req, res) => {
    try {
        const { month, year } = req.body || { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
        const allDays = Array.from({
            length: parseInt(new Date(year, month + 1, 0).getDate())
        }, (_, i) => i + 1);

        const data = await orderModel.aggregate([
            // Match only orders from that year
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, parseInt(month)] },
                            { $eq: [{ $year: "$createdAt" }, parseInt(year)] }
                        ]
                    }
                },
            },
            // Group by month number
            {
                $group: {
                    _id: { day: { $dayOfMonth: "$createdAt" } },
                    totalSales: {
                        $sum: {
                            $cond: [
                                { $eq: ["$paymentStatus", "paid"] },
                                "$totalAmount",
                                0
                            ]
                        }
                    },
                    totalOrders: { $sum: 1 },
                    ordersCancelled: {
                        $sum: {
                            $cond: [{ $eq: ["$orderStatus", "cancelled"] }, 1, 0]
                        }
                    },
                    ordersRefunded: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentStatus", "refunded"] }, 1, 0]
                        }
                    }

                },
            },
            // Format output
            {
                $project: {
                    _id: 0,
                    day: "$_id.day",
                    totalSales: 1,
                    totalOrders: 1,
                    ordersCancelled: 1,
                    ordersRefunded: 1,
                },
            },
            { $sort: { day: 1 } },
        ]);
        // Fill missing months with zero

        const completeData = allDays.map((date) => {
            const found = data.find((d) => d.day === date);
            return (
                found || {
                    day: date,
                    totalSales: 0,
                    totalOrders: 0,
                    ordersCancelled: 0,
                    ordersRefunded: 0,
                }
            );
        });

        res.status(200).json({
            success: true,
            year,
            month,
            data,
            DailyStatus: completeData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error generating Daily stats", err });
    }
})

// products related routes
Router.get("/product/graph", async (req, res) => {
    const { year, month, date } = req.body || { year: new Date().getFullYear(), month: new Date().getMonth() + 1, date: new Date().getDate() }

    const CommonPipeline = [
        {
            $unwind: "$products"
        },
        {
            $group: {
                _id: "$products.product", // product ID
                quantityPurchased: { $sum: "$products.quantity" }
            }
        },
        // 🏆 sort descending by total quantity
        {
            $sort: { quantityPurchased: -1 }
        },
        // 🎯 keep only the top product
        {
            $limit: 1
        },
        // 🔗 lookup to fetch full product details
        {
            $lookup: {
                from: "products",              // collection name (not model name)
                localField: "_id",             // product ID from group
                foreignField: "_id",           // matching field in products collection
                as: "product"
            }
        },
        {
            $unwind: "$product"       // flatten product info
        },
        {
            $project: {
                _id: 0,
                quantityPurchased: 1,
                product: 1
            }
        }
    ];
    const { ForDay, ForMonth, ForYear } = {
        ForYear: {
            $match: {
                $expr: {
                    $eq: [{ $year: "$createdAt" }, Number(year)]
                }
            }
        },
        ForMonth: {
            $match: {
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, Number(year)] },
                        { $eq: [{ $month: "$createdAt" }, Number(month)] },
                    ],
                }
            }
        },
        ForDay: {
            $match: {
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, Number(year)] },
                        { $eq: [{ $month: "$createdAt" }, Number(month)] },
                        { $eq: [{ $dayOfMonth: "$createdAt" }, Number(date)] },
                    ],
                }
            }
        },
    }
    let [productOfTheYear] = await orderModel.aggregate([ForYear, ...CommonPipeline]) || null
    let [productOfTheMonth] = await orderModel.aggregate([ForMonth, ...CommonPipeline]) || null
    let [productOfTheDay] = await orderModel.aggregate([ForDay, ...CommonPipeline]) || null
    if (!productOfTheDay) productOfTheDay = null
    if (!productOfTheMonth) productOfTheMonth = null
    if (!productOfTheYear) productOfTheYear = null

    res.send({ productOfTheDay, productOfTheMonth, productOfTheYear })
})


// User related routes
Router.get('/all', async function GetAllUserHandler(req, res) {
    try {

        const users = await UserModel.find().populate("Orders.order").populate("CartItems.product")
        if (users?.length == 0)
            return res.status(404).json({ message: "No Users Found" })
        res.status(200).json({ message: "All Users Data", users })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
});
// Banning the user
Router.post('/user/ban/:id', async function GetAllUserHandler(req, res) {
    try {

        const user = await UserModel.findOne({ _id: req.params.id }).populate("Orders.order").populate("CartItems.product")
        if (!user)
            return res.status(404).json({ message: "No Users Found" })
        user.isBanned = true
        await user.save()
        res.status(200).json({ message: "User Banned Succesfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
});
// UnBanning the user
Router.post('/user/unban/:id', async function GetAllUserHandler(req, res) {
    try {

        const user = await UserModel.findOne({ _id: req.params.id }).populate("Orders.order").populate("CartItems.product")
        if (!user)
            return res.status(404).json({ message: "No Users Found" })
        user.isBanned = false
        await user.save()
        res.status(200).json({ message: "User Banned Succesfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
});

// auhtentication of admin
Router.post('/login', LoginValidator, validate, async (req, res) => {
    const { email, password } = req.body
    const admin = await adminModel.findOne({ email }).lean()
    if (!admin) return res.status(401).json({ message: "Incorrect Credentials" })
    const result = await comparePassword(password, admin.password)
    if (!result) return res.status(401).json({ message: "Incorrect Credentials" })
    const token = await GenerateToken(admin._id)
    res.cookie('token', token)
    res.status(200).json({ message: "Logged In succesfully", redirectTo: '/' })
})
Router.post('/update', isadmin, async (req, res) => {
    const { oldPassword, oldEmail, newEmail, newPassword } = req.body
    const admin = await adminModel.findOne({ email: oldEmail })
    if (!admin) return res.status(403).json({ message: "Incorrect Credentials" })
    const result = await comparePassword(oldPassword, admin.password)
    if (!result) return res.status(403).json({ message: "Incorrect Credentials" })
    if (!oldEmail || !oldPassword) {
        res.status(401).json({ message: "Email or Password cannot be empty" })
    }
    const hashedPassword = await HashPassword(newPassword)
    admin.email = newEmail
    admin.password = hashedPassword
    await admin.save()
    res.status(200).json({
        message: 'admin Updated Succesfully',
        redirectTo: "/"
    })
})


module.exports = Router