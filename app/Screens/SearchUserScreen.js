import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchUserScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignContent: "center",
        backgroundColor: "black",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Find your friend's here
      </Text>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <TextInput
          placeholder="Enter username"
          placeholderTextColor={"white"}
          style={{
            borderWidth: 1,
            borderColor: "white",
            padding: 10,
            width: 200,
            borderRadius: 20,
            color: "white",
          }}
        ></TextInput>
        <TouchableHighlight>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/search-white.png")}
          />
        </TouchableHighlight>
      </View>
      <View>
        {true ? (
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={(item) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 60 }}
                    source={require("../assets/dummy-profile.jpg")}
                  />
                  <View>
                    <Text style={{ color: "white" }}>{"item.item.name"}</Text>
                    <Text style={{ color: "white", fontStyle: "italic" }}>
                      @{"item.item.username"}
                    </Text>
                  </View>
                  <TouchableHighlight>
                    <Text style={{ color: "white", marginRight: 10 }}>
                      Follow
                    </Text>
                  </TouchableHighlight>
                </View>
              );
            }}
            keyExtractor={(item) => item}
          />
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
}
