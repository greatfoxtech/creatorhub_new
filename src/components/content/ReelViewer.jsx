import React, { useRef, useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Volume2, VolumeX, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ReelViewer = ({
  reel,
  onClose,
  onNavigate,
  canGoUp,
  canGoDown,
  formatNumber,
  formatDuration
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [reel]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleVideoEnd = () => {
    if (canGoDown) {
      onNavigate('down');
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Video */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={reel.media?.url}
          className="max-h-full w-auto"
          loop={!canGoDown}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          playsInline
        />
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {canGoUp && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/3 right-4 text-white hover:bg-white/20"
            onClick={() => onNavigate('up')}
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
        )}
        {canGoDown && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-1/3 right-4 text-white hover:bg-white/20"
            onClick={() => onNavigate('down')}
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        )}

        {/* Volume control */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src={reel.author?.avatar} />
                  <AvatarFallback>{reel.author?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white">{reel.author?.name}</p>
                  <p className="text-sm text-white/80">{reel.author?.handle}</p>
                </div>
                <Button size="sm" className="ml-2 bg-white text-black hover:bg-white/90">
                  Follow
                </Button>
              </div>
              <p className="text-white mb-2">{reel.caption}</p>
              <div className="flex gap-2">
                {reel.hashtags?.map((tag) => (
                  <span key={tag} className="text-sm text-white/80">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 flex-col h-auto py-2">
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatNumber(reel.likes || 0)}</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 flex-col h-auto py-2">
                <MessageCircle className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatNumber(reel.comments || 0)}</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 flex-col h-auto py-2">
                <Share2 className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatNumber(reel.shares || 0)}</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bookmark className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <MoreHorizontal className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};