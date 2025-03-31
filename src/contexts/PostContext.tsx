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

type PostContextType = {
  posts: Post[];
  addPost: (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => Post | undefined;
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
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const getPost = (id: string) => {
    return posts.find((post) => post.id === id);
  };

  return (
    <PostContext.Provider
      value={{ posts, addPost, updatePost, deletePost, getPost }}
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