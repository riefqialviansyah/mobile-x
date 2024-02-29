import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleRegister } from "../style/styleSheet";
import { useState } from "react";

export default function RegisterScreen({ navigation }) {
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const registerHandler = () => {
    console.log({
      registerName,
      registerUsername,
      registerEmail,
      registerPassword,
    });
  };

  return (
    <SafeAreaView style={styleRegister.containerRegister}>
      <View style={styleRegister.headerRegister}>
        <Image
          style={styleRegister.logoRegister}
          source={require("../assets/x-logo.png")}
        />
      </View>
      <View style={styleRegister.contentRegister}>
        <Text style={styleRegister.quoteRegister}>
          See what's happening in the world right now.
        </Text>
      </View>
      <View style={styleRegister.formInput}>
        <TextInput
          style={styleRegister.input}
          inputMode="text"
          placeholder="Full name"
          placeholderTextColor={"white"}
          onChangeText={setRegisterName}
        />
        <TextInput
          style={styleRegister.input}
          inputMode="text"
          placeholder="Username"
          placeholderTextColor={"white"}
          onChangeText={setRegisterUsername}
        />
        <TextInput
          style={styleRegister.input}
          inputMode="email"
          placeholder="Valid email"
          placeholderTextColor={"white"}
          onChangeText={setRegisterEmail}
        />
        <TextInput
          style={styleRegister.input}
          placeholder="Password"
          placeholderTextColor={"white"}
          secureTextEntry={true}
          onChangeText={setRegisterPassword}
        />
        <TouchableOpacity
          onPress={registerHandler}
          style={styleRegister.buttonRegister}
          activeOpacity={0.4}
        >
          <View>
            <Text style={styleRegister.buttonRegisterText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styleRegister.footerRegister}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 100 }}>
          Already have account,{" "}
          <Text
            style={styleRegister.loginLink}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            login
          </Text>{" "}
          now.
        </Text>
      </View>
    </SafeAreaView>
  );
}