import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { usePhotobooth } from "@/lib/photobooth-context";
import { useLocalSearchParams, router } from "expo-router";
import * as Haptics from "expo-haptics";
import type { PhotoboothPhoto } from "@/lib/types";

export default function PreviewScreen() {
  const { photoId } = useLocalSearchParams<{ photoId: string }>();
  const { photos, setMode } = usePhotobooth();
  const [currentPhoto, setCurrentPhoto] = useState<PhotoboothPhoto | null>(null);

  useEffect(() => {
    if (photoId) {
      const photo = photos.find((p) => p.id === photoId);
      setCurrentPhoto(photo || null);
    }
  }, [photoId, photos]);

  const handleRetake = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setMode("capture");
    router.back();
  };

  const handleAccept = async () => {
    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setMode("enhancement");
    router.push({
      pathname: "/enhancement",
      params: { photoId },
    });
  };

  if (!currentPhoto) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <Text className="text-foreground">Loading photo...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      className="flex-1 bg-black"
      containerClassName="bg-black"
      edges={["top", "left", "right", "bottom"]}
    >
      <View className="flex-1">
        <Image
          source={{ uri: currentPhoto.uri }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center p-6 bg-black/50">
        <Pressable
          onPress={handleRetake}
          style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.95 : 1 }] }]}
          className="bg-red-500 px-8 py-4 rounded-full"
        >
          <Text className="text-white text-lg font-semibold">Retake</Text>
        </Pressable>

        <Pressable
          onPress={handleAccept}
          style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.95 : 1 }] }]}
          className="bg-green-500 px-8 py-4 rounded-full"
        >
          <Text className="text-white text-lg font-semibold">Accept</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
