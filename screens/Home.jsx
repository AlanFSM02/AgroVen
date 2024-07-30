import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {
    const navigation = useNavigation();
    const imageUrl = 'https://res.cloudinary.com/dzucqqolc/image/upload/v1720806416/Home_cvoyn6.png';

    const handleNavigateToGardens = () => {
        navigation.navigate('Gardens');
    };

    const handleNavigateToPlants = () => {
        navigation.navigate('Plants');
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ImageBackground source={{ uri: imageUrl }} style={styles.background}>
                <View style={styles.topContainer}>
                    {/* Aquí puedes poner tu imagen en la parte superior */}
                </View>
                <View style={styles.middleContainer}>
                    {/* Botón para Gardens */}
                    <TouchableOpacity style={styles.button} onPress={handleNavigateToGardens}>
                        <View style={styles.buttonContent}>
                            <Image source={{ uri: 'https://res.cloudinary.com/dzucqqolc/image/upload/v1720805399/verduras_1_wisevb.png' }} style={styles.buttonImage} />
                            <View>
                                <Text style={styles.buttonTitle}>Ir a Gardens</Text>
                                <Text style={styles.buttonSubtitle}>Explora nuestros jardines</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* Botón para Plants */}
                    <TouchableOpacity style={styles.button} onPress={handleNavigateToPlants}>
                        <View style={styles.buttonContent}>
                            <Image source={{ uri: 'https://res.cloudinary.com/dzucqqolc/image/upload/v1720805398/planta_1_dnhqg4.png' }} style={styles.buttonImage} />
                            <View>
                                <Text style={styles.buttonTitle}>Ir a Plants</Text>
                                <Text style={styles.buttonSubtitle}>Descubre nuestras plantas</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: -30, 
        paddingHorizontal: 20, 
    },
    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
        width: '90%',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonSubtitle: {
        fontSize: 14,
        color: 'gray',
    },
    buttonImage: {
        width: 100, 
        height: 130,
        resizeMode: 'contain',
        marginRight: 10, 
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default Home;
