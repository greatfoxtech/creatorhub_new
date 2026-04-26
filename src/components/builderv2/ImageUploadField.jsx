import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [uploadError, setUploadError] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(false);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange(file_url);
    } catch (error) {
      console.warn('Upload failed (using local preview):', error);
      setUploadError(true);
      // Fallback to local preview if upload fails
      const localUrl = URL.createObjectURL(file);
      onChange(localUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <Label className="text-gray-300 text-xs mb-2 block">{label}</Label>
      
      {uploadError && (
        <div className="text-[10px] text-amber-500 mb-2">
          Upload failed. Using local preview (will not persist).
        </div>
      )}
      {value && (
        <div style={{ 
          position: 'relative', 
          marginBottom: '12px', 
          backgroundColor: '#1A1F2E', 
          borderRadius: '8px', 
          padding: '8px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <img 
            src={value} 
            alt="Preview" 
            style={{ 
              width: '100%', 
              height: '120px', 
              objectFit: 'cover', 
              borderRadius: '6px' 
            }} 
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
            }}
            className="h-6 w-6 hover:bg-red-500"
          >
            <X size={12} />
          </Button>
        </div>
      )}

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full bg-[#1A1F2E] grid grid-cols-2">
          <TabsTrigger value="upload" className="text-xs">Upload</TabsTrigger>
          <TabsTrigger value="url" className="text-xs">URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-2">
          <label>
            <Button
              variant="outline"
              className="w-full bg-[#1A1F2E] border-gray-700 text-white hover:bg-[#242938] cursor-pointer"
              disabled={uploading}
              asChild
            >
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Choose Image'}
              </div>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </TabsContent>
        
        <TabsContent value="url" className="mt-2">
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="bg-[#1A1F2E] border-gray-700 text-white text-xs flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
            />
            <Button
              size="sm"
              onClick={handleUrlSubmit}
              className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-9"
            >
              <LinkIcon size={14} />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}