'use client';

import React, { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { PostService } from '@/services/post.service';
import { PostCard } from '@/components/PostCard';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // For prototype, we'll use a mock user ID
        const userPosts = await PostService.getUserPosts('mock-user-1');
        setPosts(userPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleEdit = async (post: Post) => {
    // TODO: Implement edit functionality
    console.log('Edit post:', post);
  };

  const handleDelete = async (post: Post) => {
    try {
      const success = await PostService.deletePost(post.id);
      if (success) {
        setPosts(posts.filter(p => p.id !== post.id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet. Create your first post!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
} 