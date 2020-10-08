import React,{useState} from 'react';
import {Text,StyleSheet,View,FlatList} from 'react-native';
import Cita from './components/Cita';


const App =  () => {

  const [citas,setCitas]= useState([
    { id: "1",nombre:  "Diego",propietario : "Diego ",sintomas : "Es muy wen programador"},
    { id: "2",nombre:  "Nicolas",propietario : "Nicolas ",sintomas : "Es weo"},
    { id: "3",nombre:  "waton",propietario : "waton ",sintomas : "motoneta"},
    { id: "4",nombre:  "Emilio",propietario : "Emilio ",sintomas : "Es muy wen programador"},
  ])

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>DiFuentes - Administrador de Citas</Text>
          {/* Recorrer el state con map 
           {citas.map(cita=>(
          <View>
            <Text>{cita.nombre}</Text>  
          </View>) )}*/
          }

          <FlatList
          data={citas}
          renderItem={ ({item})=>(
            <Cita
               item={item}
            />
          )}
          keyExtractor={cita =>cita.id}
          />



      </View>
    </>
  );
};

const styles = StyleSheet.create({
    titulo :{
      textAlign:'center',
      marginTop:30,
      fontSize: 25,
      color: 'white',
      
    },
    contenedor:{
      backgroundColor: '#FFAA26',
      flex : 1
    }
})


export default App;
