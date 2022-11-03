import conectarDB from '../../lib/connectDB';
import User from '../../models/User';

/*
    Creo que lo que se debe hacer es crear orders en general. Primero
    cuando el cliente realiza un purchase, se crea el order con los
    items en mongoDB, y lo que retorne, le agregamos el id al user
    en mongoDB (user: orders: { ids})

    En el purchase, se debe verificar si el cliente existe, si no existe
    entonces se crea. El orden seria el siguiente:

    1. Purchase (se verifica si el user existe, si no, se crea)
       Y se crea con un orders vacio (luego se llena)
    2. Se crea el order con la informacion de los items del carrito
       Hay que recordar que tienen un campo extra que es qty
    3. Con lo que se retorna de la creacion del order, obtenemos el _id
       y se lo agregamos a (user: { orders: {id}})

    O OTRA OPCION SERIA

    1. Verificar si existe el usuario, si no existe, se crea
    2. Agregar el order a el atributo orders del usuario en mongoDB
*/

export default async function handler(req, res) {
    
    await conectarDB();
    // en el req le tengo que pasar el id del user y el carrito
    const { method } = req;

    const { userId, items, totalPrice, totalQuantity } = req.body;

    switch(method) {
        case 'POST':
            try {

                const user = await User.findById(userId);

                const currentOrders = user.orders;

                const newId = currentOrders.length + 1;

                const newOrders = [...currentOrders, { id: newId, order: items, totalPrice, totalQuantity }];

                user.orders = newOrders;
                await user.save();

                return res.status(200).json({ success: true, newOrders });

            } catch(error) {
                return res.status(400).json({ success: false, error });
            }
            default:
                return res.status(500).json({ success: false, error: 'Server failure' });
    }
}