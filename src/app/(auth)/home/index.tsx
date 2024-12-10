import CardPost from "@/src/components/card-post";
import HeaderDevPost from "@/src/components/header-devpost";
import { AuthContext } from "@/src/contexts/auth-context";
import { IPosts } from "@/src/types/posts";
import AntDesign from "@expo/vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [posts, setPosts] = useState<IPosts[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const { currentUser } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getPosts = async () => {
        const snapshot = await firestore()
          .collection("posts")
          .orderBy("create_at", "desc")
          .limit(5)
          .get();

        if (isActive) {
          const posts = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setPosts(posts);
          setLoading(false);
        }
      };

      getPosts();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-800">
      <HeaderDevPost />

      {loading ? (
        <View className="flex-1 justify-center bg-zinc-200">
          <ActivityIndicator color="#121212" size="large" />
        </View>
      ) : (
        <FlatList
          className="flex-1 bg-zinc-400"
          data={posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CardPost data={item} userUid={currentUser?.uid} />}
        />
      )}

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
