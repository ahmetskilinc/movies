import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, useRouter, useSegments } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme, PaperProvider, Surface, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import queryClient from "../lib/providers/queryClient";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <GestureHandlerRootView>
            <SafeAreaProvider>
              <QueryClientProvider client={queryClient}>
                <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                  <StatusBar style="auto" />
                  <InitialLayout />
                </ThemeProvider>
              </QueryClientProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </ClerkLoaded>
      </ClerkProvider>
    </PaperProvider>
  );
}

function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/auth-home");
    }
    SplashScreen.hideAsync();
  }, [isSignedIn]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
