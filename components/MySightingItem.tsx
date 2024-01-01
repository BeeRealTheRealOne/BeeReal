import { View, Text, Image, StyleSheet } from "react-native";
import { Sighting } from "../types/Sighting";
import timeToString from "../util/timeToString";

function SightingItem(props: { sighting: Sighting }) {
  if (!props.sighting) return <Text>Loading...</Text>;
  return (
    <View style={[styles.container]}>
      <Image
        style={[styles.image]}
        source={{
          uri: `${process.env.EXPO_PUBLIC_PB_URL}/api/files/insectFindings/${props.sighting.id}/${props.sighting.image}?thumb=100x100`,
        }}
      />
      <View>
        <Text>
          <Text>{props.sighting.expand.species.name}</Text>
        </Text>
        <Text>
          {props.sighting.longitude}, {props.sighting.latitude}
        </Text>
        <Text>{timeToString(props.sighting.created)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SightingItem;
