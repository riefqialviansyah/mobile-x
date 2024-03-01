import { Button, View, Text, Image, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "../style/styleSheet";

export default function DetailPostScreen({ navigation }) {
  return (
    <SafeAreaView style={styleHome.container}>
      <View style={styleHome.content}>
        <View>
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              margin: 10,
            }}
            source={require("../assets/dummy-profile.jpg")}
          />
        </View>
        <View style={styleHome.boxContent}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            @dia
            {" ~ "}
            <Text style={{ color: "#a9a9a9" }}>1 jam</Text>
          </Text>
          <Text style={{ color: "#fff8dc", fontSize: 18, marginBottom: 5 }}>
            hallo dia untuk dia
          </Text>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{ width: 300, height: 200, borderRadius: 20 }}
          ></Image>
          <View style={{ flexDirection: "row", padding: 10, gap: 5 }}>
            <Image
              style={{ width: 28, height: 24 }}
              source={require("../assets/like-white.png")}
            />
            <Text style={{ color: "white" }}>3</Text>
            <Image
              style={{ width: 28, height: 24, marginLeft: 5 }}
              source={require("../assets/comments-white.png")}
            />
            <Text style={{ color: "white" }}>3</Text>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("Detail Post");
              }}
            >
              <Image
                style={{ width: 36, height: 26, marginLeft: 5 }}
                source={require("../assets/eye-icon.png")}
              />
            </TouchableHighlight>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 0.5,
                borderColor: "#a9a9a9",
                borderBottomWidth: 0.5,
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              <Text
                style={{
                  color: "#a9a9a9",
                  fontSize: 16,
                  flex: 1,
                }}
              >
                <Text style={{ color: "#fff8dc" }}>@dia</Text> : hari ini adala
                hari yang indah, dimana ktia bisa bercanda tawa dan bersama
              </Text>
              <Text
                style={{
                  color: "#a9a9a9",
                  alignSelf: "center",
                }}
              >
                ~ 2 hari
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
