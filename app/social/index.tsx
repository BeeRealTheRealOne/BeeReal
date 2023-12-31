import { useEffect, useState } from "react";
import pb from "../../constants/pocketbase";
import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import Post from "../../components/Post";

function Social() {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    pb.collection("posts")
      .getFullList(200, { expand: "insectFinding" })
      .then((res) => {
        console.log(res[0]);
        setPosts(res[0]);
      })
      .catch((err) => console.error(err));
  }, []);


return (
    <View>
      <Stack.Screen options={{ title: "Social" }} />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Link href="/" key={item.id}>
            <Post
              user={item.user}
              title={item.title}
              message={item.message}
              imageUrl={item.insectFinding.image}
              insectFindingId={item.insectFinding.id}
            />
          </Link>
        )}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
}

export default Social;
