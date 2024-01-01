import { Text, View, StyleSheet, Image } from "react-native";
import EmptyHeartIcon from "./HeartEmptyIcon";
import AlertIcon from "./AlertIcon";

const Post = (props: {
  title: string;
  message: string;
  user: string;
  imageUrl: string;
  insectFindingId: string;
}) => {
  console.log(props.imageUrl);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Image
        style={styles.image}
        source={{ uri: props.imageUrl }}
        resizeMode="contain"
      />
      <Text style={styles.message}>{props.message} shlsejlfkjsekfjsesfesfee</Text>
      <View style={styles.interactionView}>
        <EmptyHeartIcon />
        <AlertIcon />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e2334",
    width: 350,
    alignItems: "center",
    padding: 5,
  },
  title: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 5,
  },
  message: {
    flex: 1,
    flexWrap: "wrap",
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  interactionView: {
    marginTop: 10,
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#181D29",
    width: 330,
    height: 50,
    justifyContent: "center",
  },
});

export default Post;
