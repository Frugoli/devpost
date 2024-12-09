import { router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  return (
    <SafeAreaView className="flex-1 justify-center bg-zinc-800">
      <View className="mb-10 items-center">
        <Image source={require("../../assets/images/DevPost.png")} />
      </View>

      <View>
        <TextInput
          className="mx-8 mb-4 rounded bg-zinc-50 p-4 text-lg"
          placeholder="Seu nome"
        />

        <TextInput
          className="mx-8 mb-4 rounded bg-zinc-50 p-4 text-lg"
          placeholder="email@email.com"
        />

        <TextInput
          className="mx-8 mb-4 rounded bg-zinc-50 p-4 text-lg"
          placeholder="*********"
          secureTextEntry
        />

        <TouchableOpacity className="mx-8 mb-4 rounded bg-blue-400 p-4">
          <Text className="text-center text-2xl font-bold text-white">
            Cadastrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate("/sign-in")}>
          <Text className="text-center text-xl italic text-white">
            Já tenho uma conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
