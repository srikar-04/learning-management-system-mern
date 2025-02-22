import dotenv from 'dotenv';
dotenv.config()
import paypal from 'paypal-rest-sdk'

console.log(process.env.PAYPAL_CLIENT_ID, '***client Id****');
console.log( process.env.PAYPAL_SECRET_ID, '***secet Id****');

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_ID
})

/*
    PAYPAL_CLIENT_ID=Ab-IYgA_einX98IZ856gBtO7tUCSi07ZKtrd5fjpbED5z9X-G_t28jv0Ab0rMSXeSA1P_Gs60y86Fniw
    PAYPAL_SECRET_ID=EFW_NYoTZrZ2_c6TiuUDLyIFWRAEnucq2EQ6elcdQoXs5Gdpg6tpm3x0lhi_TJzLvxxZSZrd085wjoBM
*/

export default paypal