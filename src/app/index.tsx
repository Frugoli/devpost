import { ActivityIndicator, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center bg-zinc-800">
      <ActivityIndicator color="#fff" size="large" />
    </View>
  );
}
