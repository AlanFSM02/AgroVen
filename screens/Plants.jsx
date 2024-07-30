import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Plantas() {
  const [plantas, setPlantas] = useState([]);
  const [plantaSeleccionada, setPlantaSeleccionada] = useState(null);

  useEffect(() => {
    fetchPlantas();
  }, []);

  const fetchPlantas = async () => {
    try {
      const response = await fetch('http://10.122.166.137:3000/api/plants', {
        method: 'GET',
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setPlantas(data);
      } else {
        console.error('La respuesta de la API no es un array:', data);
      }
    } catch (error) {
      console.error('Error al obtener los datos de las plantas:', error.message);
    }
  };

  const mostrarInformacionPlanta = (planta) => {
    setPlantaSeleccionada(planta);
  };

  const cerrarModal = () => {
    setPlantaSeleccionada(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Plantas</Text>
        <Image source={{ uri: 'https://res.cloudinary.com/dzucqqolc/image/upload/v1721668708/Prototipo_para_m%C3%B3vil_huerto_1_kzxsxb.png' }} style={styles.headerImage} />
        <View style={styles.plantasContainer}>
          {plantas.length > 0 ? (
            plantas.map((planta, index) => (
              <TouchableOpacity key={index} style={styles.plantaCard} onPress={() => mostrarInformacionPlanta(planta)}>
                <Text style={styles.plantaName}>{planta.Nombre}</Text>
                <Image source={{ uri: planta.img }} style={styles.plantaImage} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No se encontraron plantas</Text>
          )}
        </View>
      </ScrollView>
      <Modal visible={plantaSeleccionada !== null} onRequestClose={cerrarModal} animationType="slide">
        {plantaSeleccionada && (
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.close} onPress={cerrarModal}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{plantaSeleccionada.Nombre}</Text>
              <Image source={{ uri: plantaSeleccionada.img }} style={styles.modalImage} />
              <Text style={styles.modalText}>Hora de Apertura: {plantaSeleccionada.Hora_Apertura}</Text>
              <Text style={styles.modalText}>Fecha de Cultivo: {plantaSeleccionada.Fecha_Cultivo}</Text>
              <Text style={styles.modalText}>Fecha de Siembra: {plantaSeleccionada.Fecha_Siembra}</Text>
              <Text style={styles.modalText}>Fertilizar: {plantaSeleccionada.Fertilizar}</Text>
              <Text style={styles.modalText}>Humedad: {plantaSeleccionada.Humedad}</Text>
              <Text style={styles.modalText}>Temperatura: {plantaSeleccionada.Temperatura}</Text>
              <Text style={styles.modalText}>Hora de Cierre: {plantaSeleccionada.Hora_Cierre}</Text>
              <Text style={styles.modalText}>Tipo de Fertilizante: {plantaSeleccionada.Tipo_de_Fertilizante}</Text>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF1F5',
  },
  headerImage: {
    width: '100%',
    height: 150,  // Reducción de la altura de la imagen
    resizeMode: 'cover',
    marginBottom: 10,  // Espacio entre la imagen y las plantas
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 20,  // Margen a la izquierda
    color: '#6C8A14',
    alignSelf: 'flex-start',  // Alinear a la izquierda
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  plantasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  plantaCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  plantaImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  plantaName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Ajustar la opacidad para que sea más transparente
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: windowWidth - 40,
    maxWidth: 400,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 5,
  },
});

export default Plantas;
