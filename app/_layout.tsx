import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PhotoboothProvider } from "@/lib/photobooth-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PhotoboothProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="capture" />
          <Stack.Screen name="preview" />
          <Stack.Screen name="enhancement" />
        </Stack>
      </PhotoboothProvider>
    </SafeAreaProvider>
  );
}
