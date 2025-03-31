export type SocialPlatform = 'linkedin' | 'twitter';

export type PostStatus = 'draft' | 'pending' | 'published';

export interface Post {
  id: string;
  userId: string;
  rawContent: string;
  formattedContent: {
    [key in SocialPlatform]?: string;
  };
  imageUrl?: string;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  platforms: SocialPlatform[];
  templateId?: string;
}

// Mock data structure for templates
export interface Template {
  id: string;
  name: string;
  prompt: string;
  metadata: Record<string, any>;
}

// Mock data for user
export interface User {
  id: string;
  name: string;
  email: string;
  socialIntegrations: {
    platform: SocialPlatform;
    connected: boolean;
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  }[];
}

// Mock database
export const mockDatabase = {
  posts: [] as Post[],
  templates: [] as Template[],
  users: [] as User[],
};

// Helper function to generate unique IDs (for prototype)
export const generateId = () => Math.random().toString(36).substring(2, 15); 