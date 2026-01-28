import { Pressable, Text, View, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { usePhotobooth } from "@/lib/photobooth-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

export default function IdleScreen() {
  const { setMode } = usePhotobooth();

  const handleTap = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setMode("capture");
    router.push("/capture");
  };

  return (
    <ScreenContainer className="flex-1 bg-black items-center justify-center">
      <Pressable
        onPress={handleTap}
        className="flex-1 w-full items-center justify-center"
      >
        <View className="items-center">
          <Text className="text-white text-4xl font-bold mb-4">
            Event Photobooth
          </Text>
          <Text className="text-white/70 text-xl">
            TAP TO START
          </Text>
        </View>
      </Pressable>
    </ScreenContainer>
  );
}
