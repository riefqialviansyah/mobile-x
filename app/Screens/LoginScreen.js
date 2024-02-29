import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleLogin } from "../style/styleSheet";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Login Page
    <SafeAreaView style={styleLogin.containerLogin}>
      <View style={styleLogin.headerLogin}>
        <Image
          style={styleLogin.logoLogin}
          source={require("../assets/x-logo.png")}
        />
      </View>
      <View style={styleLogin.contentLogin}>
        <Text style={styleLogin.quoteLogin}>
          To get started, login with your email or @username
        </Text>
      </View>
      <View style={styleLogin.formInput}>
        <TextInput
          style={styleLogin.input}
          inputMode="email"
          placeholderTextColor={"white"}
          placeholder="Email or username"
          onChangeText={setEmail}
        />
        <TextInput
          style={styleLogin.input}
          placeholder="Password"
          placeholderTextColor={"white"}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styleLogin.buttonLogin} activeOpacity={0.4}>
          <View>
            <Text style={styleLogin.buttonLoginText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styleLogin.footerLogin}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 80 }}>
          Don't have account,{" "}
          <Text
            style={styleLogin.registerLink}
            onPress={() => {
              navigation.navigate("Register");
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
