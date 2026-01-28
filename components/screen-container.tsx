import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
  safeArea?: boolean;
}

export function ScreenContainer({
  children,
  className,
  containerClassName,
  edges = ["top", "bottom"],
  safeArea = true,
  ...props
}: ScreenContainerProps) {
  const content = (
    <View className={cn("flex-1", className)} {...props}>
      {children}
    </View>
  );

  if (safeArea) {
    return (
      <SafeAreaView
        edges={edges}
        className={cn("flex-1 bg-background", containerClassName)}
      >
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View className={cn("flex-1 bg-background", containerClassName)}>
      {content}
    </View>
  );
}
