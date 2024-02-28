import { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import style file
import { styleLogin, styleRegister } from "./style/styleSheet";

export default function App() {
  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    console.log({ email, password });
  };

  // Register
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
    // Login Page
    <SafeAreaView style={styleLogin.containerLogin}>
      <View style={styleLogin.headerLogin}>
        <Image
          style={styleLogin.logoLogin}
          source={require("./assets/x-logo.png")}
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
          onPress={loginHandler}
          style={styleLogin.buttonLogin}
          activeOpacity={0.4}
        >
          <View>
            <Text style={styleLogin.buttonLoginText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styleLogin.footerLogin}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 100 }}>
          Don't have account,{" "}
          <Text style={styleLogin.registerLink}>register</Text> now.
        </Text>
      </View>
    </SafeAreaView>

    // Register Page
    // <SafeAreaView style={styleRegister.containerRegister}>
    //   <View style={styleRegister.headerRegister}>
    //     <Image
    //       style={styleRegister.logoRegister}
    //       source={require("./assets/x-logo.png")}
    //     />
    //   </View>
    //   <View style={styleRegister.contentRegister}>
    //     <Text style={styleRegister.quoteRegister}>
    //       See what's happening in the world right now.
    //     </Text>
    //   </View>
    //   <View style={styleLogin.formInput}>
    //     <TextInput
    //       style={styleRegister.input}
    //       inputMode="text"
    //       placeholder="Full name"
    //       placeholderTextColor={"white"}
    //       onChangeText={setRegisterName}
    //     />
    //     <TextInput
    //       style={styleRegister.input}
    //       inputMode="text"
    //       placeholder="Username"
    //       placeholderTextColor={"white"}
    //       onChangeText={setRegisterUsername}
    //     />
    //     <TextInput
    //       style={styleRegister.input}
    //       inputMode="email"
    //       placeholder="Valid email"
    //       placeholderTextColor={"white"}
    //       onChangeText={setRegisterEmail}
    //     />
    //     <TextInput
    //       style={styleRegister.input}
    //       placeholder="Password"
    //       placeholderTextColor={"white"}
    //       secureTextEntry={true}
    //       onChangeText={setRegisterPassword}
    //     />
    //     <TouchableOpacity
    //       onPress={registerHandler}
    //       style={styleRegister.buttonRegister}
    //       activeOpacity={0.4}
    //     >
    //       <View>
    //         <Text style={styleRegister.buttonRegisterText}>Register</Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styleRegister.footerRegister}>
    //     <Text style={{ color: "white", textAlign: "center", marginTop: 100 }}>
    //       Already have account,{" "}
    //       <Text style={styleRegister.loginLink}>login</Text> now.
    //     </Text>
    //   </View>
    // </SafeAreaView>
  );
}
