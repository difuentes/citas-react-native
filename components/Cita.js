import React from 'react';
import {Text,StyleSheet,View,TouchableHighlight} from 'react-native';


const Cita = ({item}) => {

    return (
        <View style={style.cita}>
            <View> 
               <Text style={style.label}  >Paciente : </Text> 
               <Text style={style.text}>{item.nombre}</Text>
            </View>
            <View> 
               <Text style={style.label}>Propietario : </Text> 
               <Text style={style.text}>{item.propietario}</Text>
            </View>
            <View> 
               <Text style={style.label}> Sintomas : </ Text> 
               <Text style={style.text}> {item.sintomas} </Text>
            </View>
            <View>
                <TouchableHighlight style={style.btnEliminar}>
                    <Text style={style.textBtn}>ELIMINAR &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    
       
      );
}

const style = StyleSheet.create({
    cita:{
        backgroundColor:'#FDE4BD',
        borderBottomWidth:1,
        marginTop:5,
        paddingVertical:20,
        borderBottomColor:'#5F5B56',
        
    },
    label:{
  
        fontWeight:'bold',
        fontSize:18,
        color:'black',
        marginTop:10
    },
    text :{ 
        fontSize:18,
        color:'black'
    },
    btnEliminar:{
        padding:10,
        backgroundColor:'red',
        marginVertical:10,
        borderRadius:20,
        width:250,
        marginLeft:50,
        alignItems:'center'
        
    },
    textBtn: {
        textAlign:"center",
        color:'white',
        fontWeight:'bold',
        fontSize:15
    }
    
})

 
export default Cita;