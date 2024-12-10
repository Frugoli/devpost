import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CardPost(props: any) {
  const [likesPost, setLikesPost] = useState<number>(props.data.likes);

  return (
    <View className="flex-1">
      <View className="elevation-lg mx-[3%] my-[8px] mt-[8px] rounded-lg bg-white p-4 shadow-md shadow-zinc-950">
        <TouchableOpacity
          activeOpacity={0.6}
          className="w-[100%] flex-row items-center pb-4"
        >
          {props.data.avatarUrl ? (
            <Image
              className="h-[40px] w-[40px] rounded-full"
              source={{ uri: props.data.avatarUrl }}
            />
          ) : (
            <Image
              className="h-[40px] w-[40px] rounded-full"
              source={require("../assets/images/avatar.png")}
            />
          )}

          <Text className="ml-4 text-xl font-bold color-zinc-700" numberOfLines={1}>
            {props.data.author}
          </Text>
        </TouchableOpacity>

        <View>
          <Text className="mb-2 color-zinc-700">{props.data.content}</Text>
        </View>

        <View className="flex-row items-baseline justify-between">
          <TouchableOpacity className="w-[45px] flex-row items-center justify-start">
            <FontAwesome name="heart-o" size={24} color="red" />
            <Text className="ml-2 color-red-600">12</Text>
          </TouchableOpacity>
        </View>

        <Text className="">há um minuto</Text>
      </View>
    </View>
  );
}
