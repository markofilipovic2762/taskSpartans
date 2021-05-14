import express from 'express'
const router = express.Router();

import Admin from "../models/Admin";
import generateToken from '../utils/generateToken';

router.post('/login', (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export default router