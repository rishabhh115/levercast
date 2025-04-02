"use client";

import { usePosts, type SortOption, type FilterOption } from "@/contexts/PostContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoreVertical, Plus, Twitter, Linkedin, Search, SortAsc, SortDesc } from "lucide-react";
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function RecentPosts() {
  const router = useRouter();
  const { posts, deletePost, getFilteredAndSortedPosts } = usePosts();
  
  // State for filtering and sorting
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [filterOptions, setFilterOptions] = useState<FilterOption>({
    status: [],
    platforms: [],
    search: "",
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        deletePost(id);
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error("Failed to delete post. Please try again.");
      }
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

  // Get filtered and sorted posts
  const filteredPosts = getFilteredAndSortedPosts(sortOption, filterOptions);

  const toggleStatusFilter = (status: "draft" | "pending" | "published") => {
    setFilterOptions(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const togglePlatformFilter = (platform: "linkedin" | "twitter") => {
    setFilterOptions(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
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
          <Button onClick={() => router.push("/new-post")}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-9"
              value={filterOptions.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterOptions(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          {/* Sort Options */}
          <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A to Z</SelectItem>
              <SelectItem value="z-a">Z to A</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filters
                {(filterOptions.status.length > 0 || filterOptions.platforms.length > 0) && 
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {filterOptions.status.length + filterOptions.platforms.length}
                  </span>
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Status</p>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.status.includes("published")}
                  onCheckedChange={() => toggleStatusFilter("published")}
                >
                  Published
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.status.includes("draft")}
                  onCheckedChange={() => toggleStatusFilter("draft")}
                >
                  Draft
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.status.includes("pending")}
                  onCheckedChange={() => toggleStatusFilter("pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
              </div>
              <div className="border-t border-border p-2">
                <p className="text-sm font-medium mb-2">Platforms</p>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.platforms.includes("linkedin")}
                  onCheckedChange={() => togglePlatformFilter("linkedin")}
                >
                  LinkedIn
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterOptions.platforms.includes("twitter")}
                  onCheckedChange={() => togglePlatformFilter("twitter")}
                >
                  Twitter
                </DropdownMenuCheckboxItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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