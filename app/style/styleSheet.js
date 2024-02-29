import { StyleSheet } from "react-native";

export const styleLogin = StyleSheet.create({
  containerLogin: {
    backgroundColor: "black",
    textAlign: "center",
    height: "100%",
  },
  headerLogin: {
    alignItems: "center",
    height: 200,
  },
  logoLogin: {
    marginTop: 50,
    width: 50,
    height: 50,
  },
  contentLogin: {
    height: 150,
    width: "80%",
    alignSelf: "center",
  },
  quoteLogin: {
    color: "white",
    fontSize: 28,
    lineHeight: 45,
    fontWeight: "800",
    marginBottom: 10,
  },
  buttonLogin: {
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    padding: 5,
    width: "20%",
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "flex-end",
    margin: 40,
  },
  buttonLoginText: { fontSize: 15, fontWeight: "900" },
  formInput: {
    flex: 1,
    alignItems: "center",
    height: 200,
  },
  input: {
    height: 55,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: -5,
    color: "white",
  },
  footerLogin: {
    flex: 0.5,
  },
  registerLink: {
    color: "#deb887",
    fontWeight: "bold",
    borderRadius: 2,
  },
});

export const styleRegister = StyleSheet.create({
  containerRegister: {
    backgroundColor: "black",
    textAlign: "center",
    height: "100%",
  },
  headerRegister: {
    alignItems: "center",
    height: 180,
  },
  logoRegister: {
    marginTop: 50,
    width: 50,
    height: 50,
  },
  contentRegister: {
    height: 100,
    width: "80%",
    alignSelf: "center",
  },
  quoteRegister: {
    color: "white",
    fontSize: 28,
    lineHeight: 45,
    fontWeight: "800",
    marginBottom: 10,
  },
  formInput: {
    flex: 1,
    alignItems: "center",
    height: 200,
  },
  input: {
    height: 55,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: -5,
    color: "white",
  },
  buttonRegister: {
    alignItems: "center",
    backgroundColor: "#a9a9a9",
    padding: 5,
    width: "25%",
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 40,
  },
  buttonRegisterText: { fontSize: 15, fontWeight: "900" },
  footerRegister: {
    flex: 0.5,
  },
  loginLink: {
    color: "#deb887",
    fontWeight: "bold",
    borderRadius: 2,
  },
});
