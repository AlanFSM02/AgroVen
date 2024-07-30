import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Corrige aquí


function Login({ navigation }) {
    const [loginData, setLoginData] = useState({ Nombre: '', Contrasena: '' });
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://10.122.166.137:3000/api/users/login', loginData);
            setUserData(response.data); // Guardar los datos del usuario en el estado
            console.log(loginData);
            console.log(response);
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response.data);
            Alert.alert('Error', 'Credenciales incorrectas. Verifica tus datos e intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={24} color="#FFF" />
            </TouchableOpacity>
            <Image source={{ uri: 'https://res.cloudinary.com/dzucqqolc/image/upload/v1716345409/WhatsApp_Image_2024-05-21_at_8.32.54_PM-removebg-preview_vxheof.png' }} style={styles.logo} />
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.p}>¿No tiene una cuenta? Regístrese</Text>
            </TouchableOpacity>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={loginData.Nombre}
                    onChangeText={text => setLoginData({ ...loginData, Nombre: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    value={loginData.Contrasena}
                    onChangeText={text => setLoginData({ ...loginData, Contrasena: text })}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
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

export default Login;
