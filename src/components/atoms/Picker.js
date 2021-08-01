import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ITEM_HEIGHT = 32;
const VISIBLE_ITEMS = 3;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    backgroundColor: 'red',
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
  }
});

const Item = ({ label }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const Picker = ({ items = [] }) => {
  return (
    <View style={styles.root}>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </View>
  );
};

export default Picker;
