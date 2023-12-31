import { Text, View, StyleSheet} from "react-native";

const Post = (props: {
  title: string;
  message: string;
  user: string;
  imageUrl: string;
  insectFindingId: string;
}) => {
  console.log("reached");
  if (!props.imageUrl) return <Text>Loading...</Text>;
  if (!props.user) return <Text>Loading...</Text>;

  return (
    <View>
      <Text style={styles.text}>HALLO</Text>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
  },
});
export default Post;
