import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    ingredients: {
        type: Array,
        required: true
    },
    contact: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    time: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date.now()
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order