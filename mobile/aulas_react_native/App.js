import { ScrollView } from 'react-native';
import Aula01 from './src/components/Aula01';
import Aula02 from './src/components/Aula02';

//componente tradicional
export default function App() {
  return (
    //o componente 'View' corresponde a div, main, section, header -> do html
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <Aula01/>
      <Aula02/>
    </ScrollView>
  );
}
