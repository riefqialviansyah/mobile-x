import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import style file
import { styles } from "./style/styleSheet";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    console.log({ email, password });
  };

  return (
    // Login Page
    <SafeAreaView style={styles.containerLogin}>
      <View style={styles.headerLogin}>
        <Image
          style={styles.logoLogin}
          source={require("./assets/x-logo.png")}
        />
      </View>
      <View style={styles.contentLogin}>
        <Text style={styles.quoteLogin}>
          See what's happening in the world right now.
        </Text>
      </View>
      <View style={styles.formInput}>
        <TextInput
          style={styles.input}
          inputMode="email"
          placeholder="Enter Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={loginHandler}
          style={styles.button}
          activeOpacity={0.9}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "900" }}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ color: "white", textAlign: "center", marginTop: 100 }}>
          Don't have account,{" "}
          <Text
            style={{
              color: "#deb887",
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            register
          </Text>{" "}
          now.
        </Text>
      </View>
    </SafeAreaView>
  );
}
