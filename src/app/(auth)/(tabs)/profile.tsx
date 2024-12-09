import { AuthContext } from "@/src/contexts/auth-context";
import { useContext } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 bg-zinc-800">
      <Text>profile</Text>

      <Button title="deslogar" onPress={() => signOut()} />
    </SafeAreaView>
  );
}
