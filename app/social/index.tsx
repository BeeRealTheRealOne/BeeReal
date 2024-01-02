import { useEffect, useState } from "react";
import pb from "../../constants/pocketbase";
import { View, StyleSheet } from "react-native";
import { Link, Stack, router } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import Post from "../../components/Post";
import StyleLib from "../../constants/style";
import { Colors } from "react-native/Libraries/NewAppScreen";

function Social() {
  const [posts, setPosts] = useState<any>();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    pb.collection("posts")
      .getList(page, 10, { expand: "insectFinding.user" })
      .then((res) => {
        setPosts(res.items);
        setMaxPage(res.totalPages);
      })
      .catch((err) => console.error(err));
  }, []);

  function loadMorePosts() {
    if (page >= maxPage) return;
    pb.collection("posts")
      .getList(page + 1, 15, {expand: "insectFinding.user"})
      .then((res) => {
        setPage(page + 1);
        setPosts([...posts, ...res.items]);
      })
      .catch((err) => console.error(err));
  }
  return (
    <View style={StyleLib.page}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          style={styles.flex}
          ItemSeparatorComponent={() => <View style={styles.gap}></View>}
          renderItem={({ item }) => {
            return (
              <Post
                user={item.expand.insectFinding.expand.user.username}
                title={item.title}
                message={item.message}
                imageUrl={`${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${item.expand.insectFinding.id}/${item.expand.insectFinding.image}`}
                insectFindingId={item.expand.insectFinding.id}
                isLikedByUser={false}
              />
            );
          }}
          keyExtractor={(item: any) => item.id}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
export default Social;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  postLink: {
    marginBottom: 10,
  },
  gap: {
    height: 10,
    
  },
  flex: {
    flex: 1,
  },
});
