import { Post, PostStatus, mockDatabase, generateId } from '../types/post';

export class PostService {
  // Create a new post
  static async createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const newPost: Post = {
      ...post,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDatabase.posts.push(newPost);
    return newPost;
  }

  // Get all posts for a user
  static async getUserPosts(userId: string): Promise<Post[]> {
    return mockDatabase.posts.filter(post => post.userId === userId);
  }

  // Get a single post by ID
  static async getPost(postId: string): Promise<Post | null> {
    const post = mockDatabase.posts.find(p => p.id === postId);
    return post || null;
  }

  // Update a post
  static async updatePost(postId: string, updates: Partial<Post>): Promise<Post | null> {
    const index = mockDatabase.posts.findIndex(p => p.id === postId);
    if (index === -1) return null;

    mockDatabase.posts[index] = {
      ...mockDatabase.posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return mockDatabase.posts[index];
  }

  // Delete a post
  static async deletePost(postId: string): Promise<boolean> {
    const index = mockDatabase.posts.findIndex(p => p.id === postId);
    if (index === -1) return false;

    mockDatabase.posts.splice(index, 1);
    return true;
  }

  // Update post status
  static async updateStatus(postId: string, status: PostStatus): Promise<Post | null> {
    return this.updatePost(postId, { status });
  }
} 