const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://LizethArmas:lizeth22perez@cluster0.ozovmcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    dbName: 'Agriven',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a Mongo Atlas');
}).catch((error) => {
    console.error('Error al conectar a MongoDB Atlas:', error);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// esquema de plantas
const plantsSchema = new mongoose.Schema({
    Nombre: String,
    Hora_Apertura: String,
    Fecha_Cultivo: String,
    Fecha_Siembra: String,
    Fertilizar: String,
    Humedad: String,
    Temperatura: String,
    Hora_Cierre: String,
    Tipo_de_Fertilizante: String,
});


// Definir el modelo con el nombre correcto de la colección
const Plant = mongoose.model('Plant', plantsSchema);

console.log("Trayendo plantas");
app.get('/api/plants/', async (req, res) => {
    console.log("Trayendo PRE plantas");
    console.log('obteniendo plantas');
    try {
        const plants = await Plant.find();
        console.log("Plantas traídas:", plants);
        res.json(plants);
    } catch (error) {
        console.error("Error al obtener las plantas:", error);
        res.status(500).json({ error: 'Error al obtener las plantas' });
    }
});

//esquema de Gardens
const gardensSchema = new mongoose.Schema({
 Nombre:String, 
 Plantas:String,
 Valvula:String,
 Estado_Huerto:String,
 Fecha_de_cultivo:String,
 Fecha_de_siembra:String,
})
//Definir el modelo con el nombre correcto de la coleccion 
const Garden = mongoose.model('Garden', gardensSchema);

console.log("Trayendo plantas");
app.get('/api/gardens/', async (req, res) => {
    console.log("Trayendo PRE gardens");

    try {
        const gardens = await Garden.find();
        console.log("Plantas traídas:", gardens);
        res.json(gardens);
    } catch (error) {
        console.error("Error al obtener las plantas:", error);
        res.status(500).json({ error: 'Error al obtener las plantas' });
    }
});
//monitoring
// Definir el esquema para la colección "monitoring"
//Nofunciona
const monitoringSchema = new mongoose.Schema({
    Estado: String,
    Humedad: String,
    Temperatura: Number,
    CO2: String,
    Huerto: String,
    Planta: String,
    Agua_Gastada: String
});

// Definir el modelo con el nombre correcto de la colección 
//NO FUNCIONA
const Monitoring = mongoose.model('Monitoring', monitoringSchema);

console.log("Trayendo datos de monitoring");
app.get('/api/monitoring/', async (req, res) => {
    console.log("Trayendo datos de monitoring");

    try {
        const monitoring = await Monitoring.find();
        console.log("Datos de monitoring traídos:", monitoring);
        res.json(monitoring);
    } catch (error) {
        console.error("Error al obtener los datos de monitoring:", error);
        res.status(500).json({ error: 'Error al obtener los datos de monitoring' });
    }
});


// Esquema y modelo de usuarios
const userSchema = new mongoose.Schema({
    Nombre: String,
    Correo: String,
    Contrasena: String
});
const User = mongoose.model('User', userSchema);

// Ruta para registrar usuarios
app.post('/api/users/', async (req, res) => {
    try{
        const { Nombre, Correo, Contrasena } = req.body;
        const existingUser = await User.findOne({ Nombre });
        if (existingUser) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }
        const newUser = new User({ Nombre, Correo, Contrasena });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        console.log(User);
        res.status(500).send('Error en el servidor');
    }  
    });
    //login
    app.post('/api/users/login', async (req, res) => {
        try {
            const { Nombre, Contrasena } = req.body;
    
            // Buscar el usuario en la base de datos por su nombre de usuario
            const users = await User.findOne({ Nombre });
            console.log('users', users)
    console.log("verificando");
            if (!users) {
                return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
            }
    
            // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
            if (Contrasena !== users.Contrasena) {
                return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
            }
            // Envía una respuesta exitosa
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            console.log(error);
            console.log('Hola')
            res.status(500).send('Error en el servidor');
        }
    });

