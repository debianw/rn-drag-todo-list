import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import Picker from '../atoms/Picker';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#141419",
  },
  container: {
    // backgroundColor: "orange",
    flexDirection: "row",
  },
});

const items = [
  { id: "days", label: "days" },
  { id: "weeks", label: "weeks" },
  { id: "months", label: "months" },
  { id: "years", label: "years" },
];

const PickerScreen = () => {
  const [value, setValue] = useState(0);
  const [type, setType] = useState("days");

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          <Text> Repeat </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => setValue(itemValue)}
          >
            {(new Array(100)).fill(0).map((v, idx) => idx).map((value) => (
              <Picker.Item key={value} label={String(value)} value={value} color="white" />
            ))}
          </Picker>
        </View>

        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            {items.map((item) => (
              <Picker.Item key={item.id} label={item.label} value={item.id} color="white" />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default PickerScreen;
