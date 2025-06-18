import React from 'react';
import { View } from 'react-native';
import { Appbar, Button, Card, Text } from 'react-native-paper';
import tw from 'twrnc';

export default function HomeScreen({ navigation }) {
  return (
    <View style={tw`flex-1 bg-gray-800`}>
      <Appbar.Header style={tw`bg-green-800`}>
        <Appbar.Content 
          title="Armas e Equipamentos Táticos" 
          titleStyle={tw`text-gray-100 font-bold`}
        />
      </Appbar.Header>

      <Card style={tw`m-4 p-4 bg-gray-700 border border-green-600`}>
        <Card.Title 
          title="Bem-vindo, Operador!" 
          titleStyle={tw`text-green-400`}
          subtitle="Equipamento profissional para missões críticas"
          subtitleStyle={tw`text-gray-300`}
        />
        <Card.Content>
          <Text style={tw`text-gray-300 mb-4`}>
            "Precisão, confiabilidade e desempenho em qualquer cenário."
          </Text>
          <Button
            icon="pistol"
            mode="contained"
            style={tw`mt-4 bg-green-700`}
            labelStyle={tw`text-white`}
            onPress={() => navigation.navigate('Produtos')}
          >
            Ver Catálogo
          </Button>

          <Button
            icon="account-plus"
            mode="outlined"
            style={tw`mt-4 border-green-500`}
            labelStyle={tw`text-green-400`}
            onPress={() => navigation.navigate('CadastroCliente')}
          >
            Cadastrar Operador
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}