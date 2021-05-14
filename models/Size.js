import mongoose from 'mongoose'

const sizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Size = mongoose.model('Size', sizeSchema);

export default Size