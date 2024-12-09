import { AuthContext } from "@/src/contexts/auth-context";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn } = useContext(AuthContext);

  const handleSignIn = () => {
    if (!email || !password) {
      alert("Campos obrigatórios não preenchidos.");
      return;
    }

    signIn({
      email,
      password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-zinc-800">
      <View className="mb-10 items-center">
        <Image source={require("../../assets/images/DevPost.png")} />
      </View>

      <View>
        <TextInput
          className="mx-8 mb-4 rounded bg-zinc-50 p-4 text-lg"
          placeholder="email@email.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          className="mx-8 mb-4 rounded bg-zinc-50 p-4 text-lg"
          placeholder="*********"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          className="mx-8 mb-4 rounded bg-blue-600 p-4"
          onPress={handleSignIn}
        >
          <Text className="text-center text-2xl font-bold text-white">
            Acessar
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
        <Text className="text-center text-xl italic text-white">
          Criar conta
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
