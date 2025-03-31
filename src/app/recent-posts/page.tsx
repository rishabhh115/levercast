"use client";

import { usePosts } from "@/contexts/PostContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoreVertical, Plus, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type FilterStatus = "all" | "draft" | "pending" | "published";

export default function RecentPosts() {
  const router = useRouter();
  const { posts, deletePost } = usePosts();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
      toast.success("Post deleted successfully");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-500";
      case "draft":
        return "bg-zinc-500/10 text-zinc-500";
      case "pending":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const filteredPosts = posts.filter(post => 
    filterStatus === "all" ? true : post.status === filterStatus
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPlatformIcons = (post: any) => {
    const icons = [];
    if (post.previews.linkedin) icons.push(<Linkedin key="linkedin" className="h-4 w-4 text-[#0077B5]" />);
    if (post.previews.twitter) icons.push(<Twitter key="twitter" className="h-4 w-4 text-[#1DA1F2]" />);
    return icons;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Recent Posts</h1>
            <p className="text-muted-foreground">
              View and manage your social media content.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={filterStatus}
              onValueChange={(value: FilterStatus) => setFilterStatus(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => router.push("/new-post")}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No posts found.</p>
            <Button
              className="mt-4"
              onClick={() => router.push("/new-post")}
            >
              Create your first post
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(post.status)}`}>
                          {post.status}
                        </span>
                        <div className="flex items-center gap-1">
                          {getPlatformIcons(post)}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-base font-medium">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/posts/${post.id}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 