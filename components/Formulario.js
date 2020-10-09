import React ,{useState} from 'react';
import {Text,StyleSheet,View,FlatList,TextInput,Button,TouchableHighlight,Alert,ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'

const Formulario = ({citas, setCitas,  guardarMostrarForm, guardarCitasStorage}) => {

    //state
    const [propiertario,guardarPropietario] = useState('');
    const [paciente,guardarPaciente] = useState('');
    const [telefono,guardarTelefono] = useState('');
    const [sintomas,guardarSintomas] = useState('');
    const [fecha,guardarFecha] = useState('');
    const [hora,guardarHora] = useState('');

    //state de calendario
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //state de Hora
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    //metodos calendario
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    //ocultar fecha
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    //guardar fecha en state
    const confirmarFecha = (date) => { 
      const opciones = {year:'numeric' ,month:'long',day:"2-digit"}
      //formatear fecha
      guardarFecha(date.toLocaleDateString('es-ES'),opciones);
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };

    //metodos Hora
     const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    //ocultar hora
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
      //guardar hora en el state
      const confirmarHora = hora => {
        const opciones = {  hour: 'numeric', minute: '2-digit', hour12: false}
      //formatear hora
        guardarHora(hora.toLocaleString('es-ES', opciones));
        hideTimePicker();
      };
  
      //crear nueva cita
      const crearNuevaCita = ()=>{
            //validacion de campos completos
            if(paciente.trim() === '' || propiertario.trim() === ''||sintomas.trim() === ''||telefono.trim() === ''||hora.trim() === ''||fecha.trim() === '' ){
                mostrarAlerta();
                return;
            }

        const cita = {paciente,propiertario,sintomas,telefono,hora,fecha}  
        cita.id = shortid.generate();
         // Agregar al state
         const citasNuevo = [...citas, cita];
         setCitas(citasNuevo);
 
         // Pasar las nuevas citas a storage
         guardarCitasStorage(JSON.stringify(citasNuevo));
 
         // Ocultar el formulario
         guardarMostrarForm(false);
 
         // Resetear el formulario
         guardarSintomas('');
         guardarPropietario('');
         guardarPaciente('');
         guardarHora('');
         guardarFecha('');
         guardarTelefono('');
      }

    //mostart alerta
    const mostrarAlerta= ()=>{
        Alert.alert(
            'Error',//titulo
            'Todos los campos son obligatorios',//cuerpo
            [{
                text:'ok'
            }]
        )
    }
    return ( 
        <ScrollView>
        <View style={styles.form}>
            <View>
                <Text style={styles.textform }>Nombre Pacientes</Text>
                <TextInput 
                    onChangeText={(texto)=>guardarPaciente(texto)} 
                    style={styles.inputText}
                />
            </View>
            <View>
                <Text style={styles.textform }>Nombre Propietario</Text>
                <TextInput
                 onChangeText={(texto)=>guardarPropietario(texto)} 
                 style={styles.inputText}
                 />
            </View>
            <View>
                <Text style={styles.textform }>Telefono</Text>
                <TextInput
                 onChangeText={(texto)=>guardarTelefono(texto)} 
                 keyboardType='numeric' 
                 style={styles.inputText}/>
            </View>
            <View>
                <Text style={styles.textform }>Fecha</Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una Fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"

                />
                <Text style={styles.textform }>{fecha.length > 0 ?'Fecha Seleccionada :':null }  {fecha}</Text>
            </View>
            <View>
                 <Text style={styles.textform }>Hora</Text>
                <Button title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una hora"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                    is24Hour
                />   
                <Text style={styles.textform }>{hora}</Text>
            </View>

            <View>
                <Text style={styles.textform }>Sintomas</Text>
                <TextInput
                  onChangeText={(texto)=>guardarSintomas(texto)}
                  style={styles.inputText}
                  multiline
                  />
            </View>
            <View>
                <TouchableHighlight 
                onPress={()=> crearNuevaCita()}
                style={styles.btnSubmit}
               
                >
                    <Text style={styles.textSubmit} >Crear Cita </Text>
                </TouchableHighlight>
            </View>
            
        </View>
        </ScrollView>
        
    );
}
 
const styles = StyleSheet.create({
    btnSubmit:{
        padding:10,
        backgroundColor:'#A34AD9',
        marginVertical:20,
        borderRadius:20,
        width:250,
        marginLeft:20,
        alignItems:'center'
        
    },
    form:{
        backgroundColor: 'orange', 
        paddingHorizontal:20,
        paddingVertical: 10,
        marginHorizontal:'5%',
        borderRadius:20
    },
    textform:{  
        fontWeight:'bold',
        fontSize:18,
        marginTop:10,
        color: 'white'
    },
    inputText:{
        fontWeight:'bold',
        fontSize: 10,
        borderColor:'white',
        borderWidth:1,
        marginTop:20,
       
    },
    textSubmit:{  
        fontWeight:'bold',
        fontSize:18,
        color: 'white'
    },

})

export default Formulario;