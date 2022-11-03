import mongoose from 'mongoose';

/*
    Como los productos poseen el mismo modelo (name, description, imageURL, price)
    se creo una funcion que crea un Schema para MongoDB de manera dinamica de acuerdo
    a la variable ingresada desde la url del cliente (se obtiene en params por medio de
    getServerSideProps)

    Habia un problema con el return de esta funcion, el cual era que tenia lo siguiente:

    return mongoose.models.Products || mongoose.model('Products', ProductSchema, collectionName)

    Esto me crea un solo Schema (y con el || se verifica que si ya esta creado, no me cree otro
    Schema). Por lo que, si ingresaba a 'jackets' se creaba un Schema 'Product'. Ahora si ingresaba
    a 'beanies', se iba a crear un Schema 'Product', pero por el || no lo creaba y me retornaba
    el Schema ya existente el cual era el Product que tenia la informacion de 'jackets'.

    Claro, podria haber creado diferentes modelos (mismo contenido pero diferente nombre), pero
    no hubiese sido muy eficiente, sobre todo porque tratamos de reutilizar componentes.
*/

const createProductSchema = (collectionName) => {
    const ProductSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'ingrese el nombre por favor']
        },
        description: {
            type: String,
            required: [true, 'ingrese la descripción por favor']
        },
        imageURL: {
            type: String,
            required: [true, 'ingrese la URL de la imagen por favor']
        },
        price: {
            type: String,
            required: [true, 'Ingrese el precio por favor']
        },
    }, { collection: collectionName});

    const modelName = collectionName;
    const capitalizedModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    return mongoose.models[capitalizedModelName] || mongoose.model(capitalizedModelName, ProductSchema, collectionName);
}

export default createProductSchema;