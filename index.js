import express from 'express'
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const app = express();
app.use(express.json());


try {
    const db = await mongoose.connect('mongodb://localhost:27017/PizzaPlaceSimulator', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
} catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
}



const PORT = 3000
app.listen(PORT, console.log(`Server running on port ${PORT}`))