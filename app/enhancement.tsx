import { useEffect, useState } from "react";
import { View, Text, Pressable, Image, Platform, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { usePhotobooth } from "@/lib/photobooth-context";
import { useLocalSearchParams, router } from "expo-router";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import type { PhotoboothPhoto } from "@/lib/types";

const FILTERS = [
  { id: "none", name: "Original" },
  { id: "grayscale", name: "B&W" },
  { id: "sepia", name: "Sepia" },
  { id: "vintage", name: "Vintage" },
];

export default function EnhancementScreen() {
  const { photoId } = useLocalSearchParams<{ photoId: string }>();
  const { photos, setMode, clearPhotos } = usePhotobooth();
  const [currentPhoto, setCurrentPhoto] = useState<PhotoboothPhoto | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("none");

  useEffect(() => {
    if (photoId) {
      const photo = photos.find((p) => p.id === photoId);
      setCurrentPhoto(photo || null);
    }
  }, [photoId, photos]);

  const handleSave = async () => {
    if (!currentPhoto) return;
    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(currentPhoto.uri);
      }
    }
    clearPhotos();
    setMode("idle");
    router.replace("/");
  };

  if (!currentPhoto) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <Text className="text-foreground">Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1 bg-black">
      <View className="flex-1">
        <Image source={{ uri: currentPhoto.uri }} style={{ flex: 1 }} resizeMode="contain" />
      </View>
      <ScrollView horizontal className="py-4" showsHorizontalScrollIndicator={false}>
        {FILTERS.map((filter) => (
          <Pressable
            key={filter.id}
            onPress={() => setSelectedFilter(filter.id)}
            className={`mx-2 px-4 py-2 rounded-full ${selectedFilter === filter.id ? "bg-white" : "bg-gray-700"}`}
          >
            <Text className={selectedFilter === filter.id ? "text-black" : "text-white"}>{filter.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View className="p-6">
        <Pressable onPress={handleSave} className="bg-green-500 py-4 rounded-full items-center">
          <Text className="text-white text-lg font-semibold">Save to Gallery</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
