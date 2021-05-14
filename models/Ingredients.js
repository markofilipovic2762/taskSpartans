import mongoose from 'mongoose'

const ingredientsSchema = mongoose.Schema({
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

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

export default Ingredients