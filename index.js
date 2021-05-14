import express from 'express'
const mongoose = require('mongoose');

import publicRoute from './routes/publicRoutes'
import adminRoute from './routes/adminRoutes'
import authRoute from './routes/auth'

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

app.use('/api/public', publicRoute)
app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)



const PORT = 3000
var server = app.listen(PORT, console.log(`Server running on port ${PORT}`), () => {
    console.time("serverrunning");
})

server.on('close', () => {
    console.log('Connection terminated');
    console.timeEnd("serverrunning");
});