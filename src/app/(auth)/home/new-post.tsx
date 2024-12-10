import { AuthContext } from "@/src/contexts/auth-context";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useNavigation } from "expo-router";
import { useContext, useLayoutEffect, useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPost() {
  const [postContent, setPostContent] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity className="mr-4 rounded bg-blue-600 p-2" onPress={handlePost}>
            <Text className="font-semibold text-white">Compartilhar</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, postContent]);

  const handlePost = async () => {
    if (!currentUser) {
      alert("Você pode não estar logado!");
      return;
    }

    if (!postContent) {
      alert("Preencha o campo com o assunto!");
      return;
    }

    try {
      const response = await storage()
        .ref("users")
        .child(currentUser.uid)
        .getDownloadURL();

      setAvatarUrl(response);
    } catch (error) {
      setAvatarUrl(null);
    }

    try {
      await firestore().collection("posts").add({
        create_at: new Date(),
        content: postContent,
        author: currentUser.name,
        userUid: currentUser.uid,
        likes: 0,
        avatarUrl,
      });

      setPostContent("");
    } catch (error) {
      console.log(error);
    }

    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-800">
      <TextInput
        multiline
        value={postContent}
        onChangeText={(text) => setPostContent(text)}
        placeholder="No que você está pensando?"
        autoCorrect={false}
        className="m-[10px] bg-transparent text-xl text-white"
        placeholderTextColor="#e4e4e7"
        maxLength={300}
      />
    </SafeAreaView>
  );
}
