import mongoose from 'mongoose'//importo mongoose

export const connectDB = async ()=>{//exporto y defino la conexion a nuestra DB en Atlas
    try {
        await mongoose.connect('mongodb+srv://FranciscoHermida:71740209@cluster0.beslfjq.mongodb.net/ecommerce?retryWrites=true&w=majority')
        //await mongoose.connect('mongodb://127.0.0.1:27017/c50010')
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }
}
