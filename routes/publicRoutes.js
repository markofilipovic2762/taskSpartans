import express from 'express'
const router = express.Router();

import Size from "../models/Size";

let limitOfWork = 0;

const cancelOrder = () => clearTimeout(doc);

router.post("/order", (req, res) => {
    if (limitOfWork == 15) {
        console.log("Cannot order! Maximum number of orders at the same time has been reached.")
    } else {
        const { ingredients } = req.body;

        let price = 0;
        let time = 0;

        ingredients.forEach(element => {
            price += element.price;
            time += element.time;
        });

        const sizeOfPizza = await Size.findOne({ name: req.body.size });
        price += sizeOfPizza.price;
        time += sizeOfPizza.time;

        console.log("The pizza is ordered");
        limitOfWork += 1;
        console.log(`The pizza will be ready in ${time / 1000} seconds`);

        const createdOrder = new Order({
            ingredients: req.body.ingredients,
            size: req.body.size,
            contact: req.body.contact,
            price,
            time,
            createdAt: Date.now()
        })

        const doc = setTimeout(() => {
            const order = createdOrder.save()
            limitOfWork -= 1;
            console.log("The pizza is made!")
            res.status(201).json(order)
        }, time);
    }
})

router.get("/recentOrders", (req, res) => {
    const recentOrders = Order.find({}).sort({ createdAt: -1 });
    if (recentOrders) {
        //hide a contact info
        res.status(201).send(
            recentOrders.forEach(element => {
                return {
                    ingredients: element.ingredients,
                    size: element.size,
                    price: element.price,
                    time: element.time
                }
            })
        )
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export default router
