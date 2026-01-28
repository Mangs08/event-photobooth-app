import { useRef, useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ScreenContainer } from "@/components/screen-container";
import { usePhotobooth } from "@/lib/photobooth-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { generateId } from "@/lib/utils";

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { addPhoto, setMode } = usePhotobooth();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;
    setIsCapturing(true);
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        const newPhoto = {
          id: generateId(),
          uri: photo.uri,
          timestamp: Date.now(),
          width: photo.width,
          height: photo.height,
        };
        addPhoto(newPhoto);
        setMode("preview");
        router.push({ pathname: "/preview", params: { photoId: newPhoto.id } });
      }
    } finally {
      setIsCapturing(false);
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-center mb-4">Camera permission required</Text>
        <Pressable onPress={requestPermission} className="bg-white px-6 py-3 rounded-full">
          <Text className="text-black font-semibold">Grant Permission</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1 bg-black" safeArea={false}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front">
        <View className="flex-1 justify-end items-center pb-12">
          <Pressable
            onPress={handleCapture}
            disabled={isCapturing}
            className="w-20 h-20 rounded-full bg-white border-4 border-gray-300"
          />
        </View>
      </CameraView>
    </ScreenContainer>
  );
}
