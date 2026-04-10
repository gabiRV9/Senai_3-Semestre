//aqui é onde importaremos todas as bibliotecas e componentes que utilizaremos
import { StatusBar } from 'expo-status-bar';
//todo componente visual utilizado em React Native precisa ser importado
import { StyleSheet, Text, View } from 'react-native';

//componente tradicional
export default function Aula01() {
  return (
    //o componente 'View' corresponde a div, main, section, header -> do html
    <View style={estilos.container}>

      {/* o componente 'Text' corresponde ao p, h1, h2, h3 -> span do html */}
      <Text style={estilos.titulo}> Hello Word </Text>
      <Text style={{ fontWeight: 'bold' }}> Olá, esse é meu primeiro App!!! </Text>

      {/* define e estiliza a barra de status do dispositivo */}
      <StatusBar style="auto" />

      {/* Aqui vou colocar o exercício */}
      <View style={{ width: '100%' }}>
        <Text style={{ textAlign: 'left', color: 'blue' }}>Meu</Text>
        <Text style={{ textAlign: 'right', color: 'black' }}>App</Text>
        <Text style={{ textAlign: 'center', color: 'red' }}>Primeiro</Text>
      </View>
    </View>
  );
}

//para estilizarmos React Native, importamos o StyleSheet e fazemos um objeto igual a estilização do React
const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
    titulo: {
    fontSize: 30
  },

});
