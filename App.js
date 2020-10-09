import React,{useState,useEffect} from 'react';
import {Text,StyleSheet,View,FlatList,ScrollView,Keyboard,TouchableHighlight,Platform,TouchableWithoutFeedback} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-community/async-storage';


const App =  () => {

  //state
  const[mostrarForm,guardarMostrarForm] = useState(false);
  const [citas,setCitas]= useState([  ]);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
        try {
            const citasStorage = await AsyncStorage.getItem('citas');
            if(citasStorage) {
                setCitas(JSON.parse(citasStorage))
            }
        } catch (error) {
            console.log(error);
        }
    }
    obtenerCitasStorage();
  }, []);


  //mostrar Formulario
   const MostrarFormulario = ()=> {
      guardarMostrarForm(!mostrarForm)
   }

  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }
  // Elimina los pacientes del state
  const eliminarPaciente = id => {

    const citasFiltradas = citas.filter( cita => cita.id !== id );
    setCitas( citasFiltradas );
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  }


  // Almacenar las citas en storage
  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>DiFuentes - Administrador de Citas</Text>

        <View>
            <TouchableHighlight onPress={ () => MostrarFormulario() } style={styles.btnCita}>
                <Text style={styles.textoMostrarForm}> {mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'} </Text>
            </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          { mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario 
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'} </Text>
              <FlatList 
                  style={styles.listado}
                  data={citas}
                  renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />  }
                  keyExtractor={ cita => cita.id}
              />
            </>
          ) }
          
        
        </View>

    </View>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    titulo :{
      textAlign:'center',
      marginTop:Platform.OS === 'ios' ? 40:20 ,
      fontSize: 25,
      color: 'white',
      
    },
    contenedor:{
      backgroundColor: '#FFAA26',
      flex : 1,
      marginHorizontal:'1%',
     
      
    },
    tituloHeader:{
      textAlign:'center',
      marginTop:30,
      fontSize: 25,
      color: 'orange',
    },
    Header:{
      backgroundColor:'white',
      paddingBottom:20,
      fontWeight:'bold'
    },
    contenido:{
      flex:1,
      marginHorizontal:'2.5%',
      borderRadius:20
    
    },
    listado:{
      flex:1,
      marginHorizontal:'2.5%'
    },
    btnSubmit:{
      padding:10,
      backgroundColor:'#A34AD9',
      marginVertical:10,
      borderRadius:20,
      width:250,
      marginLeft:20,
      alignItems:'center'
    },  
    btnCita:{
      padding:10,
      backgroundColor:'#A34AD9',
      marginVertical:10,
      borderRadius:20,
      width:250,
      marginLeft:50,
      alignItems:'center'
    },
    textSubmit:{  
      fontWeight:'bold',
      fontSize:18,
      color: 'white'
  },
  textoMostrarForm: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  }


})


export default App;
