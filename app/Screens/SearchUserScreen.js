import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery } from "@apollo/client";

const SEARCH = gql`
  query GetUserDataByUsername($username: String) {
    getUserDataByUsername(username: $username) {
      _id
      email
      name
      username
    }
  }
`;
export default function SearchUserScreen() {
  let searchKey = "";

  const { loading, error, data, refetch } = useQuery(SEARCH, {
    variables: { username: "" },
  });

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
          onChangeText={(text) => {
            searchKey = text;
          }}
          style={{
            borderWidth: 1,
            borderColor: "white",
            padding: 10,
            width: 300,
            borderRadius: 20,
            color: "white",
          }}
        ></TextInput>
        <TouchableHighlight
          onPress={() => {
            refetch({ username: searchKey });
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/search-white.png")}
          />
        </TouchableHighlight>
      </View>
      <View>
        {true ? (
          <FlatList
            data={data.getUserDataByUsername}
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
                    <Text style={{ color: "white" }}>{item.item.name}</Text>
                    <Text style={{ color: "white", fontStyle: "italic" }}>
                      @{item.item.username}
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
            keyExtractor={(item) => item._id}
          />
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
}
