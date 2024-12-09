import { router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView className="flex-1 justify-center bg-zinc-800">
      <View className="items-center mb-10">
        <Image source={require("../../assets/images/DevPost.png")} />
      </View>

      <View>
        <TextInput
          className="bg-zinc-50 mx-8 rounded mb-4 p-4 text-lg"
          placeholder="Digite seu email..."
        />
        <TextInput
          className="bg-zinc-50 mx-8 rounded mb-4 p-4 text-lg"
          placeholder="Digite sua senha..."
        />

        <TouchableOpacity className="bg-blue-400 mx-8 rounded mb-4 p-4">
          <Text className="text-2xl text-center text-white">Acessar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
        <Text className="text-center italic text-white text-xl">
          Criar conta
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
