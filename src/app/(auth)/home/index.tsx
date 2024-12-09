import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-800">
      <TouchableOpacity
        activeOpacity={0.6}
        className="absolute bottom-[5%] right-[6%] z-[99] h-[60px] w-[60px] items-center justify-center rounded-[30px] bg-zinc-950"
        onPress={() => router.push("/home/new-post")}
      >
        <AntDesign className="pr-1" name="edit" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
