import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/colors";

export default function EmptyHeartIcon() {
  return (
    <MaterialCommunityIcons
      name="heart-outline"
      size={35}
      color={Colors.primary}
    />
  );
}
