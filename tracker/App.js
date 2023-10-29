import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";

import CoinItem from "./components/CoinItem";
import ThemeButton from "./components/ButtonComponents";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const lightTheme = {
    background: '#fff',
    text: '#000',
    primary: '#6200ee',
    positive: '#00cc00',
    negative: '#ff0000',
    darkMode: false,
  };

  const darkTheme = {
    background: '#000',
    text: '#fff',
    primary: '#bb86fc',
    positive: '#00cc00',
    negative: '#ff0000',
    darkMode: true,
  };

  const theme = darkMode ? darkTheme : lightTheme;

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar backgroundColor={theme.primary} />

      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>CryptoMarket</Text>
        <ThemeButton onPress={() => setDarkMode((previousState) => !previousState)} theme={theme} />
        <TextInput
          style={[styles.searchInput, {color: theme.text, borderBottomColor: theme.primary}]}
          placeholder="Buscar"
          placeholderTextColor={theme.text}
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CoinItem coin={item} theme={theme} />}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});

export default App;