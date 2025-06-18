import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, Alert, ActivityIndicator } from 'react-native';
import { Appbar, Card, Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import api from '../services/api';
import { useCart } from '../context/CartContext';

export default function ListaProdutosScreen() {
  const { addToCart } = useCart();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const res = await api.get('products?limit=100');

        // Filtro ampliado para equipamentos táticos
        const equipamentos = res.data.products.filter(prod =>
          /tactical|military|gear|armor|knife|backpack|rifle|pistol|survival|camo|helmet|vest|boots|goggles|scope|flashlight|ammo|holster|radio|uniform/i
            .test(prod.title + ' ' + prod.category)
        );

        // Mock de produtos caso a API não retorne suficientes
        const mockProdutos = [
          {
            id: 101,
            name: "Colete Tático Nível III",
            price: "899.90",
            image_link: "https://example.com/colete.jpg",
            product_type: "Proteção"
          },
          {
            id: 102,
            name: "Mochila de Assalto 40L",
            price: "349.90",
            image_link: "https://example.com/mochila.jpg",
            product_type: "Equipamento"
          },
          {
            id: 103,
            name: "Bota Tática Desert",
            price: "279.50",
            image_link: "https://example.com/bota.jpg",
            product_type: "Vestuário"
          },
          {
            id: 104,
            name: "Óculos de Visão Noturna",
            price: "1250.00",
            image_link: "https://example.com/oculos.jpg",
            product_type: "Óptica"
          },
          {
            id: 105,
            name: "Faca de Combate KA-BAR",
            price: "420.00",
            image_link: "https://example.com/faca.jpg",
            product_type: "Armamento"
          }
        ];

        const formatados = [...equipamentos, ...mockProdutos].map(prod => ({
          id: prod.id,
          name: prod.title || prod.name,
          price: prod.price.toFixed?.(2) || prod.price,
          image_link: prod.images?.[0] || prod.image_link,
          product_type: prod.category || prod.product_type,
        }));

        setProdutos(formatados.slice(0, 12)); // Limita a 12 produtos
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os equipamentos.');
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
        <ActivityIndicator size="large" color="#166534" />
        <Text style={tw`mt-4 text-green-500`}>Carregando equipamentos...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-800`}>
      <Appbar.Header style={tw`bg-green-800`}>
        <Appbar.Content 
          title="Catálogo Tático" 
          titleStyle={tw`text-gray-100 font-bold`}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={tw`p-4 pb-12`}>
        {produtos.map(prod => (
          <Card
            key={prod.id}
            style={tw`mb-6 rounded-lg shadow-md bg-gray-700 border border-green-600`}
            elevation={4}
          >
            <Card.Title
              title={prod.name}
              titleStyle={tw`text-lg font-bold text-green-400`}
              subtitle={prod.product_type}
              subtitleStyle={tw`text-sm text-gray-300`}
            />
            {prod.image_link ? (
              <Image
                source={{ uri: prod.image_link }}
                style={tw`w-full h-48 rounded-md my-2`}
                resizeMode="contain"
              />
            ) : (
              <View style={tw`w-full h-48 bg-gray-600 justify-center items-center`}>
                <Text style={tw`text-gray-400`}>Sem imagem</Text>
              </View>
            )}
            <Card.Content>
              <Text style={tw`text-xl font-semibold text-green-500`}>
                Preço: R$ {prod.price}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="cart"
                mode="contained"
                onPress={() => addToCart(prod)}
                style={tw`bg-green-700 rounded-full shadow-lg`}
                labelStyle={tw`text-white font-semibold`}
              >
                Adicionar ao Kit
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}