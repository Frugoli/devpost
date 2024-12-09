import { AuthContext } from "@/src/contexts/auth-context";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert("Campos obrigatórios não preenchidos!");
      return;
    }

    signUp({
      name,
      email,
      password,
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-zinc-800">
      <View className="mb-10 items-center">
        <Image source={require("../../assets/images/DevPost.png")} />
      </View>

      <View>
        <TextInput
          className="mx-8 mb-4 rounded bg-zinc-50 p-4 text-lg"
          placeholder="Seu nome"
          value={name}
          onChangeText={(text) => setName(text)}
        />

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

        <TouchableOpacity className="mx-8 mb-4 rounded bg-blue-600 p-4" onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-2xl font-bold text-white">Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate("/sign-in")}>
          <Text className="text-center text-xl italic text-white">Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
