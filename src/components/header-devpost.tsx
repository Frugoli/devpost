import { Image, SafeAreaView, View } from "react-native";

export default function HeaderDevPost() {
  return (
    <SafeAreaView className="items-center border-b border-b-zinc-50 pb-6">
      <View className="flex-row items-center justify-center">
        <Image
          source={require("../assets/images/DevPost.png")}
          resizeMode="contain"
          className="mt-6 h-6"
        />
      </View>
    </SafeAreaView>
  );
}
