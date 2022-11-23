import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
    const getUser = getSession(req, res);
    const user = getUser?.user;
    const stripeId = user['http://localhost:3000/stripe_customer_id'];
    
    if (user) {
        if (req.method === 'POST') {
            try {
                const session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    customer: stripeId, // si hay usuario conectado en auth0
                    payment_method_types: ['card'],
                    shipping_address_collection: {
                        allowed_countries: ['US']
                    },
                    line_items: req.body.map( (item) => {
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.name,
                                    images: [item.imageURL]
                                },
                                unit_amount: item.price * 100,
                            },
                            quantity: item.qty
                        }
                    }),
                    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/canceled?session_id={CHECKOUT_SESSION_ID}`,
                });
                res.status(200).json(session);
            } catch(error) {
                res.status(error.statusCode || 500).json(error.message);
            }
        }
    } else {
        if (req.method === 'POST') {
            try {
                const session = await stripe.checkout.sessions.create({
                    submit_type: 'pay',
                    mode: 'payment',
                    payment_method_types: ['card'],
                    shipping_address_collection: {
                        allowed_countries: ['US']
                    },
                    line_items: req.body.map( (item) => {
                        return {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: item.name,
                                    images: [item.imageURL]
                                },
                                unit_amount: item.price * 100,
                            },
                            quantity: item.qty
                        }
                    }),
                    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/canceled?session_id={CHECKOUT_SESSION_ID}`,
                });
                res.status(200).json(session);
            } catch(error) {
                res.status(error.statusCode || 500).json(error.message);
            }
        }
    }
}