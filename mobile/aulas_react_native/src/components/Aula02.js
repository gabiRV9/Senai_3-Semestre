import { View, Text, Image , TextInput} from "react-native"
import Logo from '../assets/logo.png'
import { useState } from "react"
import { Button } from "react-native"

const Aula02 = () => {
    const [nome, setNome] = useState('')

    return(
        <View>
            <Text>--------------------------------</Text>
            <Text>Aula02 - Componentes Básicos</Text>
            <Text>Conhecendo os principais componentes do React Native</Text>
            {/* Inserindo imagem da internet */}
            <Image
                source={{ url: 'https://picsum.photos/300/200' }}
                style={{ width: 300, height: 200 }}
            />
            {/* Inserindo uma imagem diretamente do caminho do arquivo */}
            <Image 
                source={ require('../assets/logo.png' )}
                style={{ width: 300, height: 50 }}
            />
            {/* Inserindo imagem referenciando como componente */}
            <Image 
                source={Logo}
                style={{ width: 300, height: 50 }}
            />

            <TextInput
                placeholder="Digite seu nome"
                //Não preciso de arrow function () =>
                onChangeText={setNome}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Text>Seu nome é: {nome} </Text>

            <Button title="Clique aqui" 
                onPress={() => console.log(`Bem vindo ${nome}`)}
                
                />
        </View>
    )
}

export default Aula02;