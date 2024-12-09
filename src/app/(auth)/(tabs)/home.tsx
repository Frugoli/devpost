import Feather from "@expo/vector-icons/Feather";
import { router, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-zinc-800">
      <TouchableOpacity
        className="absolute bottom-[5%] right-[6%] z-[99] h-[60px] w-[60px] items-center justify-center rounded-[30px] bg-zinc-950"
        onPress={() => router.navigate("/new-post")}
      >
        <Feather name="edit-2" color="#fff" size={25} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
