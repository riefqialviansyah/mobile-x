import { Text, View, Image, TouchableHighlight, FlatList } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { AuthContex } from "../helpers/authContex";
import { gql, useQuery } from "@apollo/client";

const PROFILE = gql`
  query GetUserDataById {
    getUserDataById {
      _id
      name
      username
      email
      follower {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followerDetail {
        _id
        name
        username
        email
      }
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followingDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function ProfileScreen() {
  const { setIsLogin } = React.useContext(AuthContex);
  const [tabProfile, setTabProfile] = React.useState("following");

  const { loading, error, data } = useQuery(PROFILE);

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
  console.log(data);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flex: 0.4,
          borderBottomWidth: 0.5,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignSelf: "flex-end", marginRight: 30 }}>
          <TouchableHighlight
            onPress={async () => {
              setIsLogin(false);
              const tokenBe = await SecureStore.getItemAsync("access_token");
              const usenameBe = await SecureStore.getItemAsync("username");
              await SecureStore.deleteItemAsync("access_token");
              await SecureStore.deleteItemAsync("username");
              const tokenAf = await SecureStore.getItemAsync("access_token");
              const usenameAf = await SecureStore.getItemAsync("username");
              console.log(
                { message: "before", tokenBe, usenameBe },
                { message: "after", tokenAf, usenameAf }
              );
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../assets/logout-white.png")}
            />
          </TouchableHighlight>
        </View>
        <Image
          source={require("../assets/dummy-profile.jpg")}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", marginTop: 20 }}>
            {data.getUserDataById.name}
          </Text>
          <Text style={{ color: "white", fontStyle: "italic" }}>
            {" "}
            (@{data.getUserDataById.username})
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <TouchableHighlight
            activeOpacity={0.9}
            onPress={() => {
              setTabProfile("following");
            }}
            style={{
              backgroundColor: "#1e90ff",
              borderRadius: 10,
              padding: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Following
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.9}
            onPress={() => {
              setTabProfile("follower");
            }}
            style={{
              backgroundColor: "#1e90ff",
              borderRadius: 10,
              padding: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Follower
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ padding: 10 }}>
          {tabProfile == "following" ? (
            <FlatList
              data={data.getUserDataById.followingDetail}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 60 }}
                      source={require("../assets/dummy-profile.jpg")}
                    />
                    <View>
                      <Text style={{ color: "white" }}>{item.item.name}</Text>
                      <Text style={{ color: "white", fontStyle: "italic" }}>
                        @{item.item.username}
                      </Text>
                    </View>
                    <TouchableHighlight>
                      <Text style={{ color: "white" }}>Unfollow</Text>
                    </TouchableHighlight>
                  </View>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          ) : (
            ""
          )}
          {tabProfile == "follower" ? (
            <FlatList
              data={data.getUserDataById.followerDetail}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 60 }}
                      source={require("../assets/dummy-profile.jpg")}
                    />
                    <View>
                      <Text style={{ color: "white" }}>Riefqi Alviansyah</Text>
                      <Text style={{ color: "white", fontStyle: "italic" }}>
                        @riefqialviansyah
                      </Text>
                    </View>
                    <TouchableHighlight>
                      <Text style={{ color: "white" }}>Unfollow</Text>
                    </TouchableHighlight>
                  </View>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  );
}
