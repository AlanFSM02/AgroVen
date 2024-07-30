import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'; // Corrige aquí


function Registro({ navigation }) {
    const [Nombre, setNombre] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Contrasena, setContrasena] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://10.122.166.137:3000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre,
                    Correo,
                    Contrasena,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            clearFields();

            Alert.alert('Éxito', 'Usuario registrado correctamente');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            Alert.alert('Error', 'Ocurrió un error al registrar el usuario');
        }
    };

    const clearFields = () => {
        setNombre('');
        setCorreo('');
        setContrasena('');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={24} color="#FFF" />
            </TouchableOpacity>
            <Image source={{ uri: 'https://res.cloudinary.com/dzucqqolc/image/upload/v1716345409/WhatsApp_Image_2024-05-21_at_8.32.54_PM-removebg-preview_vxheof.png' }} style={styles.logo} />
            <Text style={styles.title}>Crear cuenta</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.p}>¿Ya está registrado? Inicie sesión</Text>
            </TouchableOpacity>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={Nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    value={Correo}
                    onChangeText={setCorreo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={Contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECF1F5',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        color: '#98BD87',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#ECF1F5',
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    button: {
        backgroundColor: '#98BD87',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    p: {
        color: '#98BD87',
        textDecorationLine: 'underline',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Registro;
