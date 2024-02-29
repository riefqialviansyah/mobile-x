import { Text, View, Image, FlatList, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "../style/styleSheet";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { formatTime } from "../helpers/formated";

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

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_POSTS);

  console.log({ loading, error, data });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>"Loading..."</Text>
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
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    {item.detailAuthor.username}
                    {" ~ "}
                    <Text style={{ color: "#a9a9a9" }}>
                      {formatTime(item.createdAt)}
                    </Text>
                  </Text>
                  <Text
                    style={{ color: "#fff8dc", fontSize: 18, marginBottom: 5 }}
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
