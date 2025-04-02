"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Post = {
  id: string;
  content: string;
  image?: string;
  previews: {
    linkedin: string;
    twitter: string;
  };
  status: "draft" | "pending" | "published";
  createdAt: string;
  updatedAt: string;
};

export type SortOption = "newest" | "oldest" | "a-z" | "z-a";
export type FilterOption = {
  status: ("draft" | "pending" | "published")[];
  platforms: ("linkedin" | "twitter")[];
  search: string;
  dateRange?: {
    from?: string;
    to?: string;
  };
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => Post | undefined;
  getFilteredAndSortedPosts: (sort: SortOption, filter: FilterOption) => Post[];
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, ...updates, updatedAt: new Date().toISOString() }
          : post
      )
    );
  };

  const deletePost = (id: string) => {
    try {
      setPosts((prev) => {
        const newPosts = prev.filter((post) => post.id !== id);
        // Immediately update localStorage to ensure sync
        localStorage.setItem("posts", JSON.stringify(newPosts));
        return newPosts;
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  };

  const getPost = (id: string) => {
    return posts.find((post) => post.id === id);
  };

  const getFilteredAndSortedPosts = (sort: SortOption, filter: FilterOption) => {
    let filteredPosts = [...posts];

    // Apply status filter
    if (filter.status.length > 0) {
      filteredPosts = filteredPosts.filter(post => filter.status.includes(post.status));
    }

    // Apply platform filter
    if (filter.platforms.length > 0) {
      filteredPosts = filteredPosts.filter(post => 
        filter.platforms.some(platform => post.previews[platform])
      );
    }

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.content.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filter
    if (filter.dateRange?.from || filter.dateRange?.to) {
      const { from, to } = filter.dateRange;
      if (from) {
        filteredPosts = filteredPosts.filter(post => 
          new Date(post.createdAt) >= new Date(from)
        );
      }
      if (to) {
        filteredPosts = filteredPosts.filter(post => 
          new Date(post.createdAt) <= new Date(to)
        );
      }
    }

    // Apply sorting
    return filteredPosts.sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "a-z":
          return a.content.localeCompare(b.content);
        case "z-a":
          return b.content.localeCompare(a.content);
        default:
          return 0;
      }
    });
  };

  return (
    <PostContext.Provider
      value={{ posts, addPost, updatePost, deletePost, getPost, getFilteredAndSortedPosts }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
} 