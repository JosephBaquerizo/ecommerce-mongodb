import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    connection: String,
    client_id: String,
    email: String,
    password: String,
    tenant: String,
    transaction: Object,
    request_language: String,
    email_verified: Boolean,
    debug: Boolean,
    orders: Array
}, { collection: 'users'});
 // Si ya existe el modelo, que no me cree el Schema de nuevo
export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');