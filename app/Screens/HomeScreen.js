import { Text, View, Image, FlatList, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "../style/styleSheet";
import { gql, useQuery } from "@apollo/client";
import { formatTime } from "../helpers/formated";
import * as SecureStore from "expo-secure-store";

// tab navigator
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContex } from "../helpers/authContex";

// import component
import CreatePostScreen from "./CreatePostScreen";

const GET_POSTS = gql`
  query Query {
    getDataPosts {
      _id
      authorId
      content
      comments {
        postId
        content
        username
        createdAt
        updatedAt
      }
      createdAt
      detailAuthor {
        email
        name
        username
        _id
      }
      imgUrl
      likes {
        username
        createdAt
        updatedAt
      }
      tags
      updatedAt
    }
  }
`;

function TweetScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);

  console.log({ loading, error, data });

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Please wait...</Text>
      </View>
    );
  }

  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <SafeAreaView style={styleHome.container}>
      <View style={styleHome.header}>
        <Image
          style={styleHome.logo}
          source={require("../assets/x-logo.png")}
        />
      </View>

      <View style={styleHome.feed}>
        <FlatList
          data={data.getDataPosts}
          renderItem={({ item }) => {
            return (
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      @{item.detailAuthor.username}
                    </Text>
                    <Text
                      style={{
                        color: "#a9a9a9",
                        fontSize: 18,
                      }}
                    >
                      ~ {formatTime(item.createdAt)}
                    </Text>
                  </View>
                  <Text
                    style={{ color: "#f0ffff", fontSize: 18, marginBottom: 5 }}
                  >
                    {item.content}
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
                    <Text style={{ color: "white" }}>{item.likes.length}</Text>
                    <Image
                      style={{ width: 28, height: 24, marginLeft: 5 }}
                      source={require("../assets/comments-white.png")}
                    />
                    <Text style={{ color: "white" }}>{item.likes.length}</Text>
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
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const { setIsLogin } = React.useContext(AuthContex);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text
        style={{ color: "white", fontSize: 32, fontWeight: "bold" }}
        onPress={async () => {
          setIsLogin(false);
          await SecureStore.deleteItemAsync("access_token");
        }}
      >
        Logout
      </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Tweet") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Create Post") {
            iconName = focused ? "add" : "add-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarBackground: () => {
          return (
            <View
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "100%",
              }}
            ></View>
          );
        },
      })}
    >
      <Tab.Screen name="Tweet" component={TweetScreen} />
      <Tab.Screen name="Create Post" component={CreatePostScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
