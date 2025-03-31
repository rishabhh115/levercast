"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Star } from "lucide-react";

// Mock data for templates
const mockTemplates = [
  {
    id: "1",
    name: "Product Launch",
    description: "Perfect for announcing new products or features",
    prompt: "Transform this content into an engaging product launch announcement that creates excitement and highlights key benefits.",
    platforms: ["linkedin", "twitter"],
    isFavorite: true,
  },
  {
    id: "2",
    name: "Industry Insights",
    description: "Share your expertise and thought leadership",
    prompt: "Convert this content into an insightful industry analysis that positions you as a thought leader.",
    platforms: ["linkedin"],
    isFavorite: false,
  },
  {
    id: "3",
    name: "Event Promotion",
    description: "Promote upcoming events and webinars",
    prompt: "Transform this content into an engaging event announcement that drives registrations and highlights value.",
    platforms: ["linkedin", "twitter"],
    isFavorite: false,
  },
];

export default function Templates() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Content Templates</h1>
        <p className="text-muted-foreground">
          Choose a template to help format your content for different purposes and platforms.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={template.isFavorite ? "text-yellow-500" : ""}
                >
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {template.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 bg-accent rounded text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 