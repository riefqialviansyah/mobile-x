import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createPostStyle } from "../style/styleSheet";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const POSTS = gql`
  mutation Mutation($dataPost: dataPost) {
    post(dataPost: $dataPost) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        postId
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

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const [postHandler] = useMutation(POSTS);

  const postSubmit = async () => {
    try {
      await postHandler({
        variables: {
          dataPost: {
            content,
            tags,
            imgUrl,
          },
        },
      });
      setContent("");
      setImgUrl("");
      setTags("");
      navigation.navigate("Tweet");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={createPostStyle.containerRegister}>
      <View style={createPostStyle.header}>
        <TouchableOpacity>
          <Text
            style={createPostStyle.headerExit}
            onPress={() => {
              navigation.navigate("Tweet");
            }}
          >
            X
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={postSubmit}>
          <Text style={createPostStyle.headerPosting}>Posting</Text>
        </TouchableOpacity>
      </View>
      <View style={createPostStyle.input}>
        <View style={createPostStyle.content}>
          <TextInput
            id="content"
            style={createPostStyle.inptContent}
            placeholder="Tell everyone what happen?"
            placeholderTextColor={"#a9a9a9"}
            multiline={true}
            onChangeText={setContent}
          ></TextInput>
        </View>
        <TextInput
          placeholder="Share your picture? (url image)"
          placeholderTextColor={"#a9a9a9"}
          style={createPostStyle.imgUrl}
          multiline={true}
          onChangeText={setImgUrl}
        ></TextInput>
        <TextInput
          placeholder="Give a tag?"
          placeholderTextColor={"#a9a9a9"}
          style={createPostStyle.tags}
          multiline={true}
          onChangeText={setTags}
        ></TextInput>
      </View>
    </SafeAreaView>
  );
}
