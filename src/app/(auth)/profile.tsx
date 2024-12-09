import { AuthContext } from "@/src/contexts/auth-context";
import { useContext } from "react";
import { Button, Text, View } from "react-native";

export default function Profile() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>profile</Text>

      <Button title="deslogar" onPress={() => signOut()} />
    </View>
  );
}
