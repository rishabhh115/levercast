import React from 'react';
import Image from 'next/image';
import { Post } from '../types/post';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
            {post.status}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        {post.imageUrl && (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p className="text-lg font-medium">{post.rawContent}</p>
        
        <div className="mt-4 space-y-2">
          {post.platforms.map((platform) => (
            <div key={platform} className="text-sm">
              <strong className="capitalize">{platform}:</strong>
              <p className="text-muted-foreground">{post.formattedContent[platform]}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(post)}
            className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(post)}
            className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80"
          >
            Delete
          </button>
        )}
      </CardFooter>
    </Card>
  );
}; 