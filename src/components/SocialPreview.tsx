"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Twitter, Linkedin } from "lucide-react";

type SocialPreviewProps = {
  platform: "twitter" | "linkedin";
  content: string;
  image?: string | null;
  template?: string;
};

export function SocialPreview({ platform, content, image, template }: SocialPreviewProps) {
  const formatContent = () => {
    if (!content) return "Preview will appear here...";

    let formattedContent = content;
    
    // Add template-specific formatting
    if (template) {
      switch (template) {
        case "Professional Insight":
          formattedContent = `🎯 Professional Insight\n\n${content}\n\n#ProfessionalDevelopment #Growth`;
          break;
        case "Quick Tips":
          formattedContent = `💡 Quick Tip\n\n${content}\n\n#QuickTips #Productivity`;
          break;
        case "Industry News":
          formattedContent = `📢 Industry Update\n\n${content}\n\n#IndustryNews #Innovation`;
          break;
      }
    }

    // Platform-specific formatting
    if (platform === "twitter") {
      return formattedContent.slice(0, 280); // Twitter character limit
    }

    return formattedContent;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        {platform === "twitter" ? (
          <Twitter className="h-5 w-5 text-blue-400" />
        ) : (
          <Linkedin className="h-5 w-5 text-blue-600" />
        )}
        <h2 className="text-xl font-semibold">
          {platform === "twitter" ? "Twitter" : "LinkedIn"} Preview
        </h2>
      </div>
      
      <div className="min-h-[100px] p-4 border rounded-lg space-y-4">
        <div className="whitespace-pre-line">{formatContent()}</div>
        
        {image && (
          <div className="relative w-full h-48 mt-4">
            <Image
              src={image}
              alt={`${platform} preview`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </Card>
  );
} 