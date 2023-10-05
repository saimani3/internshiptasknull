import  express  from "express";
import {login,signup} from '../controllers/auth.js'
import { updateChanelDate,getAllChanels } from "../controllers/chanel.js";
import {sendOTP,verifyOTP} from '../controllers/auth.js';

const routes = express.Router();

routes.post('/login',login)
routes.post('/signup',signup)
routes.post('/send-otp',sendOTP)
routes.post('/verify-otp',verifyOTP)
routes.patch('/update/:id',updateChanelDate)
routes.get('/getAllChanels',getAllChanels)

export default routes;