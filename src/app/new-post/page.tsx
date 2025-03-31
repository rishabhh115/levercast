"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { usePosts } from "@/contexts/PostContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SocialPreview } from "@/components/SocialPreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TEMPLATES = [
  "Professional Insight",
  "Quick Tips",
  "Industry News",
] as const;

type Template = typeof TEMPLATES[number];

export default function NewPost() {
  const router = useRouter();
  const { addPost } = usePosts();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<Template | "">("");
  const [previews, setPreviews] = useState({
    linkedin: "",
    twitter: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePreviews = () => {
    if (!content) {
      toast.error("Please enter some content first");
      return;
    }

    if (!template) {
      toast.error("Please select a template first");
      return;
    }

    setPreviews({
      linkedin: content,
      twitter: content,
    });
  };

  const handleSaveAsDraft = () => {
    if (!content) {
      toast.error("Please enter some content before saving");
      return;
    }

    addPost({
      content,
      image: image || undefined,
      previews,
      status: "draft",
    });

    toast.success("Post saved as draft");
    router.push("/recent-posts");
  };

  const handlePublish = () => {
    if (!content) {
      toast.error("Please enter some content before publishing");
      return;
    }

    if (!template) {
      toast.error("Please select a template before publishing");
      return;
    }

    if (!previews.linkedin && !previews.twitter) {
      toast.error("Please generate previews before publishing");
      return;
    }

    addPost({
      content,
      image: image || undefined,
      previews,
      status: "pending", // Since we don't have actual publishing yet
    });

    toast.success("Post saved and ready for publishing");
    router.push("/recent-posts");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      
      <div className="space-y-6">
        {/* Content Creation Section */}
        <div className="space-y-4">
          <Select
            value={template}
            onValueChange={(value: string) => setTemplate(value as Template)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {TEMPLATES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Enter your content here..."
            className="min-h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2" onClick={() => document.getElementById("image-upload")?.click()}>
              <ImagePlus className="w-4 h-4" />
              Add Image
            </Button>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button onClick={generatePreviews}>Generate Previews</Button>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSaveAsDraft}>
              Save as Draft
            </Button>
            <Button onClick={handlePublish}>Publish Now</Button>
          </div>
        </div>

        {/* Image Preview Section */}
        {image && (
          <div className="relative w-full h-48 max-w-2xl mx-auto">
            <Image
              src={image}
              alt="Uploaded preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Social Media Previews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <SocialPreview
            platform="linkedin"
            content={previews.linkedin}
            image={image}
            template={template}
          />
          <SocialPreview
            platform="twitter"
            content={previews.twitter}
            image={image}
            template={template}
          />
        </div>
      </div>
    </div>
  );
} 