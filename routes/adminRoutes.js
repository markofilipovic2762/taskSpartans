import express from 'express'
const router = express.Router();

import Order from '../models/Order'
import isAdmin from '../middleware/isAdmin';


router.get('/totalMoneyEarned', isAdmin, (req, res) => {
    const totalMoney = Order.aggregate([
        {
            $group: {
                _id: null,
                totalMoneyEarned: { $sum: "$price" }
            }
        }
    ])
    res.status(201).json(totalMoney);
})

router.get('/top5ingredients', isAdmin, (req, res) => {
    const topIngredients = Order.aggregate([
        {
            $group: {
                _id: { "$ingredients": { $name: "$name" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }

    ])
    res.status(201).json(topIngredients);
})

router.get('/orders', isAdmin, (req, res) => {
    const ordersHistory = Order.find({});

    res.status(201).json(ordersHistory);
})

export default router;