import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'ingrese el nombre por favor']
    },
    imageURL: {
        type: String,
        required: [true, 'ingrese la URL de la imagen por favor']
    }
}, { collection: 'sections'});
 // Si ya existe el modelo, que no me cree el Schema de nuevo
export default mongoose.models.Section || mongoose.model('Section', SectionSchema, 'sections');