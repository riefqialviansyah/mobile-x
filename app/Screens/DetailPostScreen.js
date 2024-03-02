import {
  View,
  Text,
  Image,
  TouchableHighlight,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "../style/styleSheet";
import { gql, useMutation, useQuery } from "@apollo/client";
import { formatTime } from "../helpers/formated";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const LIKE = gql`
  mutation Mutation($postId: ID) {
    like(postId: $postId) {
      message
    }
  }
`;

const GET_DETAIL_POST = gql`
  query GetDataPostById($id: ID) {
    getDataPostById(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      detailAuthor {
        _id
        name
        username
        email
      }
    }
  }
`;
const COMMENT = gql`
  mutation Mutation($content: String, $postId: String) {
    comment(content: $content, postId: $postId) {
      content
      username
      createdAt
      updatedAt
      postId
    }
  }
`;

export default function DetailPostScreen({ navigation, route }) {
  const [likeHandler] = useMutation(LIKE);
  const { postId } = route.params;
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_DETAIL_POST, {
    variables: { id: postId },
  });

  const [commentHandler] = useMutation(COMMENT);

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

  const likeSubmit = async () => {
    try {
      const result = await likeHandler({ variables: { postId } });
      await refetch();
      console.log(result.data.like.message); // masih error
    } catch (error) {
      console.log(error);
    }
  };

  const commentSubmit = async () => {
    try {
      if (newComment) {
        await commentHandler({ variables: { postId, content: newComment } });
      }
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getUsername() {
      try {
        const result = await SecureStore.getItemAsync("username");
        // console.log(result, "<<< target username");
        setUsername(result);
      } catch (error) {
        console.log(error);
      }
    }
    getUsername();
  }, []);

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
            @{data.getDataPostById.detailAuthor.username}
            {" ~ "}
            <Text style={{ color: "#a9a9a9" }}>
              {formatTime(data.getDataPostById.createdAt)}
            </Text>
          </Text>
          <Text style={{ color: "#fff8dc", fontSize: 18, marginBottom: 5 }}>
            {data.getDataPostById.content}
          </Text>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{ width: 300, height: 200, borderRadius: 20 }}
          ></Image>
          <View style={{ flexDirection: "row", padding: 10, gap: 5 }}>
            <TouchableHighlight
              onPress={() => {
                likeSubmit();
              }}
            >
              <Image
                style={{ width: 28, height: 24 }}
                source={require("../assets/like-white.png")}
              />
            </TouchableHighlight>
            <Text style={{ color: "white" }}>
              {data.getDataPostById.likes.length}
            </Text>
            <Image
              style={{ width: 28, height: 24, marginLeft: 5 }}
              source={require("../assets/comments-white.png")}
            />
            <Text style={{ color: "white" }}>
              {" "}
              {data.getDataPostById.comments.length}
            </Text>
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
            <FlatList
              data={data.getDataPostById.comments}
              renderItem={(comment) => {
                // console.log(comment);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 0.5,
                      borderColor: "#a9a9a9",
                      borderBottomWidth: 0.5,
                      paddingBottom: 5,
                      paddingTop: 5,
                      gap: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#a9a9a9",
                        fontSize: 16,
                        flex: 1,
                      }}
                    >
                      <Text style={{ color: "#fff8dc" }}>
                        @{comment.item.username}
                      </Text>{" "}
                      : {comment.item.content}
                    </Text>
                    <Text
                      style={{
                        color: "#a9a9a9",
                        alignSelf: "center",
                      }}
                    >
                      {formatTime(comment.item.createdAt)}
                    </Text>
                  </View>
                );
              }}
            />
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 0.2,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                @{username}
                {" : "}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  placeholder="Enter comment here"
                  placeholderTextColor={"#a9a9a9"}
                  multiline={true}
                  onChangeText={setNewComment}
                  style={{
                    color: "white",
                    width: 270,
                    padding: 5,
                  }}
                ></TextInput>
                <TouchableHighlight onPress={commentSubmit}>
                  <Image
                    style={{ width: 25, height: 25, marginRight: 10 }}
                    source={require("../assets/send-white.png")}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
