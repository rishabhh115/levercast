"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { toast } from "sonner";

type SocialConnection = {
  platform: "twitter" | "linkedin";
  connected: boolean;
  username?: string;
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isProfileHidden, setIsProfileHidden } = useProfile();
  const [connections, setConnections] = useState<SocialConnection[]>([
    { platform: "twitter", connected: false },
    { platform: "linkedin", connected: false },
  ]);

  // Avoid hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleConnect = (platform: "twitter" | "linkedin") => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.platform === platform
          ? { ...conn, connected: true, username: `demo_${platform}` }
          : conn
      )
    );
    toast.success(`Connected to ${platform}`);
  };

  const handleDisconnect = (platform: "twitter" | "linkedin") => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.platform === platform
          ? { ...conn, connected: false, username: undefined }
          : conn
      )
    );
    toast.success(`Disconnected from ${platform}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and social media connections.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how Levercast looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode.
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Connections</CardTitle>
            <CardDescription>
              Manage your connected social media accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connections.map((connection) => (
              <div
                key={connection.platform}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {connection.platform === "twitter" ? (
                    <Twitter className="h-6 w-6" />
                  ) : (
                    <Linkedin className="h-6 w-6" />
                  )}
                  <div>
                    <p className="font-medium capitalize">{connection.platform}</p>
                    {connection.connected && connection.username && (
                      <p className="text-sm text-muted-foreground">
                        Connected as @{connection.username}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  variant={connection.connected ? "outline" : "default"}
                  onClick={() =>
                    connection.connected
                      ? handleDisconnect(connection.platform)
                      : handleConnect(connection.platform)
                  }
                >
                  {connection.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Update your account preferences and notification settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about your posts.
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Export Data</p>
                <p className="text-sm text-muted-foreground">
                  Download a copy of your posts and templates.
                </p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your profile visibility and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Toggle the visibility of your profile section in the sidebar.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsProfileHidden(!isProfileHidden)}
              >
                {isProfileHidden ? "Show Profile" : "Hide Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 