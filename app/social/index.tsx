import { useEffect, useState } from "react";
import pb from "../../constants/pocketbase";
import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import Post from "../../components/Post";

function Social() {
  const [posts, setPosts] = useState<any>();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    pb.collection("posts")
      .getList(page, 10, { expand: "insectFinding" })
      .then((res) => {
        console.log(res);
        setPosts(res.items);
        setMaxPage(res.totalPages);
      })
      .catch((err) => console.error(err));
  }, []);

  function loadMorePosts() {
    if (page >= maxPage) return;
    pb.collection("insectFindings")
      .getList(page + 1, 15)
      .then((res) => {
        setPage(page + 1);
        setPosts([...posts, ...res.items]);
      })
      .catch((err) => console.error(err));
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Social" }} />
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          console.log("rendering item ", item);
          return (
            <Link href="/" key={item.id} style={styles.postLink}>
              <Post
                user={item.user}
                title={item.title}
                message={item.message}
                imageUrl={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${item.expand.insectFinding.id}/${item.expand.insectFinding.image}?thumb=100x100`}
                insectFindingId={item.expand.insectFinding.id}
              />
            </Link>
          );
        }}
        keyExtractor={(item: any) => item.id}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
export default Social;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  postLink: {
    marginBottom: 10,
  },
});
