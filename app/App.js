import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [input, setInput] = useState("riefqi.alviansyah1430@gmail.com");

  const inputHandler = (text) => {
    console.log(text);
  };

  return (
    <SafeAreaView>
      <View>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Image source={require("./assets/favicon.png")} />
        <TextInput
          onChangeText={inputHandler}
          placeholder="Enter email"
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
        />
        <Button
          onPress={() => {
            console.log("saya dipencer");
          }}
          title="Pencect Saya"
        />
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   coba: {
//     color: "red",
//   },
// });
