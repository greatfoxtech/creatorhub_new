import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Upload, Grid3x3, List, FolderPlus, Play, Video as VideoIcon } from 'lucide-react';

// Sample media from Posts, Stories, and Reels
const SAMPLE_MEDIA = [
  // Posts
  { id: 'post-1', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', type: 'image', source: 'Posts', name: 'Laptop Code' },
  { id: 'post-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', type: 'image', source: 'Posts', name: 'Mountain Sunset' },
  // Stories
  { id: 'story-1', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=1200&fit=crop', type: 'image', source: 'Stories', name: 'Golden Gate Bridge' },
  { id: 'story-2', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=1200&fit=crop', type: 'image', source: 'Stories', name: 'White Car' },
  { id: 'story-3', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1200&fit=crop', type: 'image', source: 'Stories', name: 'Tech Setup' },
  // Reels
  { id: 'reel-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop', type: 'video', source: 'Reels', name: 'Mountain Adventure' },
  { id: 'reel-2', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop', type: 'video', source: 'Reels', name: 'Bridge View' },
  { id: 'reel-3', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop', type: 'video', source: 'Reels', name: 'Coding Tutorial' },
  { id: 'reel-4', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600&fit=crop', type: 'video', source: 'Reels', name: 'Nature Walk' },
  { id: 'reel-5', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop', type: 'video', source: 'Reels', name: 'Tech Review' },
  { id: 'reel-6', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop', type: 'video', source: 'Reels', name: 'City Lights' },
  // Additional Images
  { id: 'img-1', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop', type: 'image', source: 'Posts', name: 'Code Editor' },
  { id: 'img-2', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', type: 'image', source: 'Posts', name: 'Tech Workspace' },
  { id: 'img-3', url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop', type: 'image', source: 'Posts', name: 'Purple Lights' },
  { id: 'img-4', url: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&h=600&fit=crop', type: 'image', source: 'Posts', name: 'Portrait' },
];

export default function MediaLibraryPage() {
  const [user, setUser] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        }
      } catch (error) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const { data: uploadedMedia = [] } = useQuery({
    queryKey: ['media'],
    queryFn: () => base44.entities.Media.list('-created_date', 100),
    initialData: [],
  });

  const allMedia = [...SAMPLE_MEDIA, ...uploadedMedia];

  const filteredMedia = allMedia.filter(item => {
    const matchesFilter = selectedFilter === 'All' || item.source === selectedFilter;
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Media Library</h1>
            <p className="text-gray-400">{filteredMedia.length} items</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-gray-700 text-white">
                  <FolderPlus className="w-4 h-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#121726] border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Input placeholder="Folder name" className="bg-[#1A1F2E] border-gray-700 text-white" />
                  <Button className="w-full mt-4 bg-[#4368D9] hover:bg-[#3a59b4]">Create Folder</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#4368D9] hover:bg-[#3a59b4]">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#121726] border-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center mb-4">
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Drag and drop files here</p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <input type="file" multiple className="hidden" id="file-upload" />
                    <Button variant="outline" onClick={() => document.getElementById('file-upload').click()}>
                      Browse Files
                    </Button>
                  </div>
                  <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Upload</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#121726] border-gray-800 text-white"
            />
          </div>

          <div className="flex gap-2">
            {['All', 'Posts', 'Stories', 'Reels'].map((filter) => (
              <Badge
                key={filter}
                className={`cursor-pointer px-4 py-2 ${
                  selectedFilter === filter
                    ? 'bg-[#4368D9] text-white hover:bg-[#3a59b4]'
                    : 'bg-[#121726] text-gray-400 hover:bg-gray-800'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>

          <div className="flex gap-1 bg-[#121726] rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-[#4368D9]' : ''}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#4368D9]' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Media Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedia.map((item) => (
              <MediaListItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const MediaCard = ({ item }) => (
  <Card className="relative overflow-hidden group cursor-pointer bg-[#121726] border-gray-800 hover:border-[#4368D9] transition-colors">
    <div className="relative aspect-square">
      <img
        src={item.url}
        alt={item.name}
        className="w-full h-full object-cover"
      />
      {item.type === 'video' && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
      )}
      <Badge className="absolute top-2 right-2 bg-black/60 text-white text-xs">
        {item.source}
      </Badge>
      {item.type === 'video' && (
        <Badge className="absolute top-2 left-2 bg-black/60 text-white text-xs flex items-center gap-1">
          <VideoIcon className="w-3 h-3" />
        </Badge>
      )}
    </div>
    <div className="p-2">
      <p className="text-sm text-white truncate">{item.name}</p>
      <p className="text-xs text-gray-400">{item.type}</p>
    </div>
  </Card>
);

const MediaListItem = ({ item }) => (
  <Card className="bg-[#121726] border-gray-800 hover:border-[#4368D9] transition-colors">
    <div className="flex items-center gap-4 p-4">
      <div className="relative w-16 h-16 flex-shrink-0">
        <img
          src={item.url}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
            <Play className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{item.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge className="bg-[#4368D9]/20 text-[#4368D9] text-xs">
            {item.source}
          </Badge>
          <span className="text-xs text-gray-400">{item.type}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
        More
      </Button>
    </div>
  </Card>
);