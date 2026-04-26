import React, { useRef, useState, useEffect } from 'react';
import { X, Heart, Send, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export const StoryViewer = ({
  story,
  onClose,
  onNavigate,
  canGoPrev,
  canGoNext,
  formatNumber
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    startProgress();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [story]);

  const startProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (canGoNext) {
            onNavigate('next');
          } else {
            onClose();
          }
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);
  };

  const pauseProgress = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeProgress = () => {
    setIsPaused(false);
    startProgress();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative w-full h-full max-w-lg mx-auto">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-10 left-0 right-0 flex items-center justify-between p-4 z-10">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src={story.author?.avatar} />
              <AvatarFallback>{story.author?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white text-sm">{story.author?.name}</p>
              <p className="text-xs text-white/80">{story.createdAt}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Story content */}
        <div
          className="w-full h-full flex items-center justify-center"
          onMouseDown={pauseProgress}
          onMouseUp={resumeProgress}
          onTouchStart={pauseProgress}
          onTouchEnd={resumeProgress}
        >
          {story.media?.type === 'video' ? (
            <video
              src={story.media.url}
              className="max-h-full w-auto"
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={story.media?.url}
              alt="Story"
              className="max-h-full w-auto object-contain"
            />
          )}
        </div>

        {/* Navigation areas */}
        {canGoPrev && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
            onClick={() => onNavigate('prev')}
          />
        )}
        {canGoNext && (
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
            onClick={() => onNavigate('next')}
          />
        )}

        {/* Response input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Send message"
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/50"
            />
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
              <Heart className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-white/80 text-sm">
            <span>{formatNumber(story.views || 0)} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};