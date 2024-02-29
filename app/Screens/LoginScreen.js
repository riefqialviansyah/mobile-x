import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleLogin } from "../style/styleSheet";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Mutation($loginData: loginData) {
    login(loginData: $loginData) {
      access_token
      username
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginHandler] = useMutation(LOGIN);

  const handleSubmit = async () => {
    try {
      if (!email || !password) throw new Error("Input data");
      const result = await loginHandler({
        variables: { loginData: { email: email, password: password } },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

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
        <TouchableOpacity
          style={styleLogin.buttonLogin}
          activeOpacity={0.4}
          onPress={handleSubmit}
        >
          <View>
            <Text style={styleLogin.buttonLoginText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styleLogin.footerLogin}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 80 }}>
          Don't have account,{" "}
          <Text style={styleLogin.registerLink}>register</Text> now.
        </Text>
      </View>
    </SafeAreaView>
  );
}
