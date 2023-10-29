import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CoinItem = ({ coin, theme }) => {
  const priceChangeColor = coin.price_change_percentage_24h > 0 ? 'green' : 'red';

  return (
    <View style={[styles.containerItem, { backgroundColor: theme.background }]}>
      <View style={styles.coinName}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View style={styles.containerNames}>
          <Text style={[styles.text, { color: theme.text }]}>{coin.name}</Text>
          <Text style={[styles.textSymbol, { color: theme.text }]}>{coin.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textPrice, { color: theme.text }]}>${coin.current_price}</Text>
        <Text style={[styles.pricePercentage, { color: priceChangeColor }]}>{coin.price_change_percentage_24h.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
  },
  text: {
    fontWeight: "bold",
  },
  textPrice: {
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    textTransform: "uppercase",
  },
});

export default CoinItem;