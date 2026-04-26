import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Trash2, Copy, Settings, Plus, X, Upload, GripVertical, Link as LinkIcon, Eye, EyeOff, ChevronLeft, RotateCcw, Star, Heart, Check, ArrowRight, Menu, Search, User, ShoppingCart, Bell, Home, MoreHorizontal, MoreVertical, Filter, Grid, ChevronRight, ChevronUp, ChevronDown, ArrowLeft, ArrowUp, ArrowDown, ExternalLink, Link, Minus, Edit, Clipboard, Download, Share2, RefreshCw, Lock, Unlock, Play, Pause, Square, Volume2, VolumeX, Camera, Video, Music, Bookmark, MessageCircle, Mail, Phone, Tag, CreditCard, DollarSign, Info, HelpCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle, Calendar, Clock, MapPin, Globe, Flag, Zap, TrendingUp } from 'lucide-react';
import ImageUploadField from './ImageUploadField';
import BackgroundSettings from './BackgroundSettings';
import SubmenuSettings from './SubmenuSettings';

const PropertyField = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <Label className="text-gray-300 text-xs mb-2 block">{label}</Label>
    {children}
  </div>
);

const ColorInput = ({ label, value, onChange }) => (
  <PropertyField label={label}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1A1F2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '8px' }}>
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      />
      <span style={{ fontSize: '13px', color: '#9CA3AF', flex: 1 }}>{value || '#000000'}</span>
    </div>
  </PropertyField>
);

const NumberSlider = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) => {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Slider
        value={[value || 0]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={step}
        className="flex-1"
      />
      <span style={{ fontSize: '13px', color: '#9CA3AF', minWidth: '50px', textAlign: 'right' }}>
        {value || 0}{unit}
      </span>
    </div>
  );

  // If label is provided, wrap in PropertyField, otherwise return raw content
  return label ? <PropertyField label={label}>{content}</PropertyField> : content;
};

const ContentTab = ({ element, updateProp, updateElementProps, setSelectedElement }) => {
  // Hooks must be at top level - Icon search state
  const [iconSearch, setIconSearch] = React.useState('');
  const [dividerIconSearch, setDividerIconSearch] = React.useState('');

  // Auto-scroll logic when element has _focusId
  React.useEffect(() => {
    if (['Header', 'Footer'].includes(element.type) && element._focusId) {
      const section = document.getElementById(`section-${element._focusId}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add highlight effect
        const originalBorder = section.style.borderColor;
        const originalShadow = section.style.boxShadow;
        
        section.style.borderColor = '#4368D9';
        section.style.boxShadow = '0 0 0 2px rgba(67, 104, 217, 0.3)';
        section.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
           // Revert
           section.style.borderColor = originalBorder || 'rgba(255,255,255,0.1)'; // Fallback to default border color
           section.style.boxShadow = originalShadow || 'none';
           if (!originalBorder) section.style.removeProperty('border-color');
        }, 2000);
      }
    }
  }, [element._focusId, element.type]);

  if (element.type === 'Heading') {
    return (
      <>
        <PropertyField label="Text">
          <Input
            value={element.props.text || ''}
            onChange={(e) => updateProp('text', e.target.value)}
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>
        <PropertyField label="Level">
          <Select value={element.props.level || 'h2'} onValueChange={(v) => updateProp('level', v)}>
            <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121726] border-gray-700 text-white">
              <SelectItem value="h1">H1 - Main Title</SelectItem>
              <SelectItem value="h2">H2 - Section</SelectItem>
              <SelectItem value="h3">H3 - Subsection</SelectItem>
              <SelectItem value="h4">H4 - Minor</SelectItem>
              <SelectItem value="h5">H5</SelectItem>
              <SelectItem value="h6">H6</SelectItem>
            </SelectContent>
          </Select>
        </PropertyField>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LINK</h4>
          <PropertyField label="Link URL">
            <Input
              value={element.props.linkUrl || ''}
              onChange={(e) => updateProp('linkUrl', e.target.value)}
              placeholder="https://, /path, #anchor, mailto:, tel:"
              className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
            />
          </PropertyField>
          
          {element.props.linkUrl && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkNewTab || false}
                    onChange={(e) => updateProp('linkNewTab', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Open in new tab
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkNofollow || false}
                    onChange={(e) => updateProp('linkNofollow', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Nofollow
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkSponsored || false}
                    onChange={(e) => updateProp('linkSponsored', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Sponsored
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkUgc || false}
                    onChange={(e) => updateProp('linkUgc', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  UGC
                </label>
              </div>
              
              <PropertyField label="ARIA Label (Optional)">
                <Input
                  value={element.props.linkAriaLabel || ''}
                  onChange={(e) => updateProp('linkAriaLabel', e.target.value)}
                  placeholder="Descriptive label for screen readers"
                  className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                />
              </PropertyField>
            </>
          )}
        </div>
      </>
    );
  }

  if (element.type === 'Text') {
    return (
      <>
        <PropertyField label="Text Content">
          <Textarea
            value={element.props.text || ''}
            onChange={(e) => updateProp('text', e.target.value)}
            rows={6}
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LINK</h4>
          <PropertyField label="Link URL">
            <Input
              value={element.props.linkUrl || ''}
              onChange={(e) => updateProp('linkUrl', e.target.value)}
              placeholder="https://, /path, #anchor, mailto:, tel:"
              className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
            />
          </PropertyField>
          
          {element.props.linkUrl && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkNewTab || false}
                    onChange={(e) => updateProp('linkNewTab', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Open in new tab
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkNofollow || false}
                    onChange={(e) => updateProp('linkNofollow', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Nofollow
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkSponsored || false}
                    onChange={(e) => updateProp('linkSponsored', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Sponsored
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkUgc || false}
                    onChange={(e) => updateProp('linkUgc', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  UGC
                </label>
              </div>
              
              <PropertyField label="ARIA Label (Optional)">
                <Input
                  value={element.props.linkAriaLabel || ''}
                  onChange={(e) => updateProp('linkAriaLabel', e.target.value)}
                  placeholder="Descriptive label for screen readers"
                  className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                />
              </PropertyField>
            </>
          )}
        </div>
      </>
    );
  }

  if (element.type === 'Image') {
    return (
      <>
        {/* Image Source */}
        <PropertyField label="Image Source">
          <Select value={element.props.srcType || 'url'} onValueChange={(v) => updateProp('srcType', v)}>
            <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121726] border-gray-700 text-white">
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
            </SelectContent>
          </Select>
        </PropertyField>

        {element.props.srcType === 'url' ? (
          <PropertyField label="Image URL">
            <Input
              value={element.props.srcUrl || element.props.src || ''}
              onChange={(e) => updateProp('srcUrl', e.target.value)}
              placeholder="https://..."
              className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
            />
          </PropertyField>
        ) : (
          <ImageUploadField
            label="Upload Image"
            value={element.props.uploadedAssetId || ''}
            onChange={(url) => updateProp('uploadedAssetId', url)}
          />
        )}

        {/* Preview Thumbnail */}
        {(element.props.srcUrl || element.props.uploadedAssetId || element.props.src) && (
          <div style={{ marginBottom: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <img 
              src={element.props.srcType === 'url' ? (element.props.srcUrl || element.props.src) : element.props.uploadedAssetId || element.props.src} 
              alt="Preview" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        <PropertyField label="Alt Text">
          <Input
            value={element.props.altText || element.props.alt || ''}
            onChange={(e) => updateProp('altText', e.target.value)}
            placeholder="Describe the image"
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>

        <PropertyField label="Title (Optional)">
          <Input
            value={element.props.title || ''}
            onChange={(e) => updateProp('title', e.target.value)}
            placeholder="Tooltip text"
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>

        {/* Link Section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Label className="text-gray-300 text-xs font-medium">Enable Link</Label>
            <input
              type="checkbox"
              checked={element.props.linkEnabled || false}
              onChange={(e) => updateProp('linkEnabled', e.target.checked)}
              className="accent-[#4368D9]"
            />
          </div>

          {element.props.linkEnabled && (
            <>
              <PropertyField label="Link URL">
                <Input
                  value={element.props.linkUrl || ''}
                  onChange={(e) => updateProp('linkUrl', e.target.value)}
                  placeholder="https://, /path, #anchor, mailto:, tel:"
                  className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                />
              </PropertyField>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkNewTab || false}
                    onChange={(e) => updateProp('linkNewTab', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Open in new tab
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkNofollow || false}
                    onChange={(e) => updateProp('linkNofollow', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Nofollow
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
                  <input
                    type="checkbox"
                    checked={element.props.linkSponsored || false}
                    onChange={(e) => updateProp('linkSponsored', e.target.checked)}
                    className="accent-[#4368D9]"
                  />
                  Sponsored
                </label>
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  if (element.type === 'Video') {
    return (
      <>
        {/* Source Type */}
        <PropertyField label="Video Source">
          <Select value={element.props.sourceType || 'youtube'} onValueChange={(v) => updateProp('sourceType', v)}>
            <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121726] border-gray-700 text-white">
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="vimeo">Vimeo</SelectItem>
              <SelectItem value="url">Direct URL</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
            </SelectContent>
          </Select>
        </PropertyField>

        {/* Source Input */}
        {['youtube', 'vimeo'].includes(element.props.sourceType) ? (
          <PropertyField label="Video URL">
            <Input
              value={element.props.embedUrl || element.props.src || ''}
              onChange={(e) => updateProp('embedUrl', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
            />
          </PropertyField>
        ) : element.props.sourceType === 'url' ? (
          <PropertyField label="Video URL">
            <Input
              value={element.props.videoUrl || ''}
              onChange={(e) => updateProp('videoUrl', e.target.value)}
              placeholder="https://.../video.mp4"
              className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
            />
          </PropertyField>
        ) : (
          <ImageUploadField
            label="Upload Video"
            value={element.props.uploadedAssetId || ''}
            onChange={(url) => updateProp('uploadedAssetId', url)}
          />
        )}

        {/* Poster (for file videos) */}
        {!['youtube', 'vimeo'].includes(element.props.sourceType) && (
          <ImageUploadField
            label="Poster Image (Optional)"
            value={element.props.posterUrl || ''}
            onChange={(url) => updateProp('posterUrl', url)}
          />
        )}

        <PropertyField label="Title (Optional)">
          <Input
            value={element.props.title || ''}
            onChange={(e) => updateProp('title', e.target.value)}
            placeholder="Video title"
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>

        <PropertyField label="Caption (Optional)">
          <Input
            value={element.props.caption || ''}
            onChange={(e) => updateProp('caption', e.target.value)}
            placeholder="Video caption"
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>

        {/* Timing */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>TIMING</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <PropertyField label="Start (sec)">
              <Input
                type="number"
                value={element.props.startTime || 0}
                onChange={(e) => updateProp('startTime', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
            {!['youtube', 'vimeo'].includes(element.props.sourceType) && (
              <PropertyField label="End (sec)">
                <Input
                  type="number"
                  value={element.props.endTime || 0}
                  onChange={(e) => updateProp('endTime', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                />
              </PropertyField>
            )}
          </div>
        </div>

        {/* Playback Controls */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>PLAYBACK</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
              <input
                type="checkbox"
                checked={element.props.controls !== false}
                onChange={(e) => updateProp('controls', e.target.checked)}
                className="accent-[#4368D9]"
              />
              Show Controls
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
              <input
                type="checkbox"
                checked={element.props.autoplay || false}
                onChange={(e) => {
                  updateProp('autoplay', e.target.checked);
                  if (e.target.checked) updateProp('muted', true);
                }}
                className="accent-[#4368D9]"
              />
              Autoplay
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
              <input
                type="checkbox"
                checked={element.props.muted || element.props.autoplay}
                onChange={(e) => updateProp('muted', e.target.checked)}
                className="accent-[#4368D9]"
                disabled={element.props.autoplay}
              />
              Muted {element.props.autoplay && '(required for autoplay)'}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
              <input
                type="checkbox"
                checked={element.props.loop || false}
                onChange={(e) => updateProp('loop', e.target.checked)}
                className="accent-[#4368D9]"
              />
              Loop
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
              <input
                type="checkbox"
                checked={element.props.playsInline !== false}
                onChange={(e) => updateProp('playsInline', e.target.checked)}
                className="accent-[#4368D9]"
              />
              Plays Inline (mobile)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
              <input
                type="checkbox"
                checked={element.props.lazyLoad !== false}
                onChange={(e) => updateProp('lazyLoad', e.target.checked)}
                className="accent-[#4368D9]"
              />
              Lazy Load
            </label>
          </div>

          {!['youtube', 'vimeo'].includes(element.props.sourceType) && (
            <PropertyField label="Preload">
              <Select value={element.props.preload || 'metadata'} onValueChange={(v) => updateProp('preload', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="metadata">Metadata</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
          )}
        </div>
      </>
    );
  }

  if (element.type === 'Button') {
    return (
      <>
        <PropertyField label="Text">
          <Input
            value={element.props.text || ''}
            onChange={(e) => updateProp('text', e.target.value)}
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>
        <PropertyField label="Link URL">
          <Input
            value={element.props.href || ''}
            onChange={(e) => updateProp('href', e.target.value)}
            placeholder="https://..."
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LAYOUT</h4>
          
          <PropertyField label="Button Position">
            <Select value={element.props.alignment || 'left'} onValueChange={(v) => updateProp('alignment', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <Label className="text-gray-300 text-xs font-medium">Full Width</Label>
            <input
              type="checkbox"
              checked={element.props.fullWidth || false}
              onChange={(e) => updateProp('fullWidth', e.target.checked)}
              className="accent-[#4368D9]"
            />
          </div>
        </div>
      </>
    );
  }

  if (element.type === 'Tagline') {
    return (
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em' }}>TAGLINE SETTINGS</h4>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <Label className="text-gray-400 text-xs mb-1 block">Tagline Text</Label>
          <Textarea 
            value={element.props.text || ''} 
            onChange={(e) => updateProp('text', e.target.value)}
            rows={2}
            className="bg-[#121726] border-gray-700 text-white text-sm"
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <Label className="text-gray-400 text-xs mb-1 block">Font Size (px)</Label>
            <NumberSlider 
              value={element.props.fontSize || 14} 
              onChange={(v) => updateProp('fontSize', v)}
              min={10}
              max={32}
              unit="px"
            />
          </div>
          <div>
            <Label className="text-gray-400 text-xs mb-1 block">Max Width (px)</Label>
            <NumberSlider 
              value={element.props.maxWidth || 300} 
              onChange={(v) => updateProp('maxWidth', v)}
              min={100}
              max={800}
              unit="px"
            />
          </div>
        </div>

        <ColorInput label="Text Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />

        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
          <Label className="text-gray-400 text-xs mb-1 block">Spacing</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <NumberSlider 
              label="Top"
              value={element.props.marginTop || 0} 
              onChange={(v) => updateProp('marginTop', v)}
              max={50}
              unit="px"
            />
            <NumberSlider 
              label="Bottom"
              value={element.props.marginBottom || 0} 
              onChange={(v) => updateProp('marginBottom', v)}
              max={50}
              unit="px"
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <Label className="text-gray-400 text-xs mb-2 block">Row Position</Label>
          <div className="flex gap-2 mb-4">
             <Button 
               variant={element.props.layout === 'row' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('layout', 'row')}
               className={`flex-1 h-8 text-xs ${element.props.layout === 'row' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Same Row
             </Button>
             <Button 
               variant={(!element.props.layout || element.props.layout === 'column') ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('layout', 'column')}
               className={`flex-1 h-8 text-xs ${(!element.props.layout || element.props.layout === 'column') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Under Logo
             </Button>
          </div>

          <Label className="text-gray-400 text-xs mb-2 block">Alignment</Label>
          <div className="flex gap-2 mb-2">
             <Button 
               variant={element.props.alignment === 'left' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('alignment', 'left')}
               className={`flex-1 h-8 text-xs ${element.props.alignment === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Left
             </Button>
             <Button 
               variant={element.props.alignment === 'center' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('alignment', 'center')}
               className={`flex-1 h-8 text-xs ${element.props.alignment === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Center
             </Button>
             <Button 
               variant={element.props.alignment === 'right' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('alignment', 'right')}
               className={`flex-1 h-8 text-xs ${element.props.alignment === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Right
             </Button>
          </div>
          <Label className="text-gray-400 text-xs mb-2 block mt-4">Zone Position</Label>
          <div className="flex gap-2">
             <Button 
               variant={element.props.zone === 'left' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('zone', 'left')}
               className={`flex-1 h-8 text-xs ${element.props.zone === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Left
             </Button>
             <Button 
               variant={element.props.zone === 'center' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('zone', 'center')}
               className={`flex-1 h-8 text-xs ${element.props.zone === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Center
             </Button>
             <Button 
               variant={element.props.zone === 'right' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('zone', 'right')}
               className={`flex-1 h-8 text-xs ${element.props.zone === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Right
             </Button>
          </div>
        </div>
      </div>
    );
  }

  if (element.type === 'Logo') {
    return (
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em' }}>LOGO SETTINGS</h4>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Label className="text-gray-400 text-xs mb-2 block">Logo Type</Label>
          <Select value={element.props.logoType || 'text'} onValueChange={(v) => updateProp('logoType', v)}>
            <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121726] border-gray-700 text-white">
              <SelectItem value="text">Text Logo</SelectItem>
              <SelectItem value="image">Image Logo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {element.props.logoType === 'image' ? (
          <>
            <div style={{ marginBottom: '16px' }}>
              <ImageUploadField
                label="Upload Logo Image"
                value={element.props.imageSrc || ''}
                onChange={(url) => updateProp('imageSrc', url)}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <Label className="text-gray-400 text-xs mb-1 block">Width (px)</Label>
                <NumberSlider 
                  value={element.props.width || 120} 
                  onChange={(v) => updateProp('width', v)}
                  max={300}
                  unit="px"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-xs mb-1 block">Border Radius</Label>
                <NumberSlider 
                  value={element.props.borderRadius || 0} 
                  onChange={(v) => updateProp('borderRadius', v)}
                  max={50}
                  unit="px"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '12px' }}>
              <Label className="text-gray-400 text-xs mb-1 block">Logo Text</Label>
              <Input 
                value={element.props.text || ''} 
                onChange={(e) => updateProp('text', e.target.value)}
                className="bg-[#121726] border-gray-700 text-white text-sm"
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Label className="text-gray-400 text-xs mb-1 block">Font Size (px)</Label>
              <NumberSlider 
                value={element.props.fontSize || 24} 
                onChange={(v) => updateProp('fontSize', v)}
                min={12}
                max={72}
                unit="px"
              />
            </div>
            <ColorInput label="Text Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />
          </>
        )}
        
        <div style={{ marginTop: '16px' }}>
          <Label className="text-gray-400 text-xs mb-2 block">Alignment (Zone)</Label>
          <div className="flex gap-2">
             <Button 
               variant={element.props.zone === 'left' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('zone', 'left')}
               className={`flex-1 h-8 text-xs ${element.props.zone === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Left
             </Button>
             <Button 
               variant={element.props.zone === 'center' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('zone', 'center')}
               className={`flex-1 h-8 text-xs ${element.props.zone === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Center
             </Button>
             <Button 
               variant={element.props.zone === 'right' ? 'default' : 'outline'} 
               size="sm" 
               onClick={() => updateProp('zone', 'right')}
               className={`flex-1 h-8 text-xs ${element.props.zone === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
             >
               Right
             </Button>
          </div>
        </div>
      </div>
    );
  }

  if (element.type === 'Navigation') {
    const items = element.props.items || [];
    return (
      <>
        <PropertyField label="Menu Items (comma separated)">
          <Textarea
            value={items.join(', ')}
            onChange={(e) => updateProp('items', e.target.value.split(',').map(s => s.trim()))}
            rows={3}
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>
        <ColorInput label="Text Color" value={element.props.textColor} onChange={(v) => updateProp('textColor', v)} />
      </>
    );
  }

  if (element.type === 'SearchBar') {
    return (
      <PropertyField label="Placeholder">
        <Input
          value={element.props.placeholder || ''}
          onChange={(e) => updateProp('placeholder', e.target.value)}
          className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
        />
      </PropertyField>
    );
  }

  if (element.type === 'Icon') {
    // Icon map for quick lookup
    const iconComponents = {
      Star, Heart, Check, X, ArrowRight, Menu, Search, User, ShoppingCart, Bell,
      Home, MoreHorizontal, MoreVertical, Filter, Settings, Grid, ChevronLeft, ChevronRight,
      ChevronUp, ChevronDown, ArrowLeft, ArrowUp, ArrowDown, ExternalLink, LinkIcon, Plus,
      Minus, Edit, Copy, Clipboard, Trash2, Download, Upload, Share2, RefreshCw, RotateCcw,
      Lock, Unlock, Play, Pause, Square, Volume2, VolumeX, Camera, Video, Music,
      Bookmark, MessageCircle, Mail, Phone, Tag, CreditCard, DollarSign,
      Info, HelpCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle,
      Calendar, Clock, MapPin, Globe, Eye, EyeOff, Flag, Zap, TrendingUp,
      Link
    };

    // Lucide icon library organized by category
    const iconLibrary = {
      'Navigation': ['Home', 'Menu', 'MoreHorizontal', 'MoreVertical', 'Search', 'Filter', 'Settings', 'Grid', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ExternalLink', 'Link'],
      'Actions': ['Plus', 'Minus', 'X', 'Check', 'Edit', 'Copy', 'Clipboard', 'Trash2', 'Download', 'Upload', 'Share2', 'RefreshCw', 'RotateCcw', 'Lock', 'Unlock'],
      'Media': ['Play', 'Pause', 'Square', 'Volume2', 'VolumeX', 'Camera', 'Video', 'Music'],
      'Social': ['User', 'Users', 'Heart', 'Star', 'Bookmark', 'MessageCircle', 'Mail', 'Phone', 'Bell'],
      'Commerce': ['ShoppingCart', 'Tag', 'CreditCard', 'DollarSign'],
      'Status': ['Info', 'HelpCircle', 'AlertTriangle', 'AlertCircle', 'CheckCircle', 'XCircle'],
      'Other': ['Calendar', 'Clock', 'MapPin', 'Globe', 'Eye', 'EyeOff', 'Flag', 'Zap', 'TrendingUp']
    };

    const allIcons = Object.values(iconLibrary).flat();
    const filteredIcons = iconSearch ? allIcons.filter(icon => icon.toLowerCase().includes(iconSearch.toLowerCase())) : allIcons;

    return (
      <>
        <PropertyField label="Icon Source">
          <Select value={element.props.iconSource || 'library'} onValueChange={(v) => updateProp('iconSource', v)}>
            <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121726] border-gray-700 text-white">
              <SelectItem value="library">Icon Library</SelectItem>
              <SelectItem value="emoji">Emoji</SelectItem>
              <SelectItem value="svg">Custom SVG</SelectItem>
            </SelectContent>
          </Select>
        </PropertyField>

        {/* Library Mode */}
        {element.props.iconSource === 'library' && (
          <>
            <PropertyField label="Search Icons">
              <Input
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                placeholder="Search icons..."
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>

            {/* Current Selection */}
            <div style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)' }}>
              <Label className="text-gray-400 text-xs mb-2 block">Selected Icon</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#121726', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => {
                    const SelectedIcon = iconComponents[element.props.iconName || 'Star'] || Star;
                    return <SelectedIcon size={24} color={element.props.color || '#000000'} />;
                  })()}
                </div>
                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{element.props.iconName || 'Star'}</span>
              </div>
            </div>

            {/* Icon Grid */}
            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {filteredIcons.map(iconName => {
                  const IconComp = iconComponents[iconName] || Star;
                  return (
                    <button
                      key={iconName}
                      onClick={() => updateProp('iconName', iconName)}
                      style={{
                        padding: '12px',
                        backgroundColor: element.props.iconName === iconName ? '#4368D9' : '#1A1F2E',
                        border: '1px solid',
                        borderColor: element.props.iconName === iconName ? '#4368D9' : 'rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                      title={iconName}
                    >
                      <IconComp size={20} color={element.props.iconName === iconName ? '#ffffff' : '#9CA3AF'} />
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Emoji Mode */}
        {element.props.iconSource === 'emoji' && (
          <>
            <PropertyField label="Emoji">
              <Input
                value={element.props.emoji || '⭐'}
                onChange={(e) => updateProp('emoji', e.target.value)}
                placeholder="Paste emoji here"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                maxLength={4}
              />
            </PropertyField>

            {/* Preview */}
            <div style={{ marginBottom: '12px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: `${element.props.iconSize || 32}px`, lineHeight: 1 }}>
                {element.props.emoji || '⭐'}
              </div>
            </div>

            {/* Popular Emojis Quick Pick - Horizontal Carousel */}
            <div style={{ marginBottom: '16px' }}>
              <Label className="text-gray-400 text-xs mb-2 block">Popular</Label>
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  maxWidth: '100%',
                  paddingBottom: '6px',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehaviorX: 'contain',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                }}
                className="emoji-row-scroll"
              >
                <style>{`
                  .emoji-row-scroll::-webkit-scrollbar {
                    width: 10px;
                    height: 6px;
                  }
                  .emoji-row-scroll::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.06);
                    border-radius: 4px;
                  }
                  .emoji-row-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.25);
                    border-radius: 999px;
                  }
                  .emoji-row-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.35);
                  }
                `}</style>
                {['❤️', '🔥', '👍', '😂', '👀', '⭐', '🚀', '💯'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => updateProp('emoji', emoji)}
                    style={{
                      padding: '8px',
                      backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '20px',
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Library by Category */}
            <div 
              style={{ 
                maxHeight: '500px',
                minHeight: 0,
                flex: '1 1 auto',
                overflowY: 'auto',
                overflowX: 'hidden',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
              }}
              className="emoji-picker-scroll"
            >
              <style>{`
                .emoji-picker-scroll::-webkit-scrollbar {
                  width: 10px;
                  height: 10px;
                }
                .emoji-picker-scroll::-webkit-scrollbar-track {
                  background: rgba(255,255,255,0.06);
                  border-radius: 4px;
                }
                .emoji-picker-scroll::-webkit-scrollbar-thumb {
                  background: rgba(255,255,255,0.25);
                  border-radius: 999px;
                  border: 2px solid #121726;
                }
                .emoji-picker-scroll::-webkit-scrollbar-thumb:hover {
                  background: rgba(255,255,255,0.35);
                }
              `}</style>
              {/* Emotions & Reactions */}
              <div style={{ marginBottom: '16px' }}>
                <Label className="text-gray-400 text-xs mb-2 block">❤️ Emotions & Reactions</Label>
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    paddingBottom: '6px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehaviorX: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                  }}
                  className="emoji-row-scroll"
                >
                  {['❤️', '💙', '💚', '💛', '💜', '🖤', '🤍', '🤎', '😍', '😂', '🤣', '😊', '😭', '🥺', '😡', '😎', '🤔', '🔥', '💯', '👀', '🙌', '👏', '🤝'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateProp('emoji', emoji)}
                      style={{
                        padding: '8px',
                        backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engagement & Actions */}
              <div style={{ marginBottom: '16px' }}>
                <Label className="text-gray-400 text-xs mb-2 block">👍 Engagement & Actions</Label>
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    paddingBottom: '6px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehaviorX: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                  }}
                  className="emoji-row-scroll"
                >
                  {['👍', '👎', '✋', '👌', '✌️', '🤘', '👉', '👈', '👆', '👇', '🔔', '⭐', '⚡', '🚀', '🎯'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateProp('emoji', emoji)}
                      style={{
                        padding: '8px',
                        backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social & UI Symbols */}
              <div style={{ marginBottom: '16px' }}>
                <Label className="text-gray-400 text-xs mb-2 block">📱 Social & UI Symbols</Label>
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    paddingBottom: '6px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehaviorX: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                  }}
                  className="emoji-row-scroll"
                >
                  {['🔗', '🔍', '🔒', '🔓', '⚙️', '🛠️', '📌', '➕', '➖', '❌', '✔️', '❗', '❓', '⬆️', '⬇️', '⬅️', '➡️'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateProp('emoji', emoji)}
                      style={{
                        padding: '8px',
                        backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messaging & Communication */}
              <div style={{ marginBottom: '16px' }}>
                <Label className="text-gray-400 text-xs mb-2 block">💬 Messaging</Label>
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    paddingBottom: '6px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehaviorX: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                  }}
                  className="emoji-row-scroll"
                >
                  {['💬', '🗨️', '📣', '📢', '✉️', '📩', '📎', '🧷'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateProp('emoji', emoji)}
                      style={{
                        padding: '8px',
                        backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content & Creator */}
              <div style={{ marginBottom: '16px' }}>
                <Label className="text-gray-400 text-xs mb-2 block">🎉 Content & Creator</Label>
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    paddingBottom: '6px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehaviorX: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                  }}
                  className="emoji-row-scroll"
                >
                  {['🎉', '🎊', '🎁', '🎈', '🏆', '🎵', '🎶', '📸', '🎥', '🖼️', '🎨', '✍️', '✨', '💡'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateProp('emoji', emoji)}
                      style={{
                        padding: '8px',
                        backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile & Identity */}
              <div style={{ marginBottom: '16px' }}>
                <Label className="text-gray-400 text-xs mb-2 block">👤 Profile & Identity</Label>
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '6px', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    paddingBottom: '6px',
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehaviorX: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                  }}
                  className="emoji-row-scroll"
                >
                  {['👤', '👥', '🧑', '👩', '👨', '🧠'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateProp('emoji', emoji)}
                      style={{
                        padding: '8px',
                        backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        width: '44px',
                        height: '44px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Custom SVG Mode */}
        {element.props.iconSource === 'svg' && (
          <>
            <PropertyField label="SVG Markup">
              <Textarea
                value={element.props.svgMarkup || ''}
                onChange={(e) => updateProp('svgMarkup', e.target.value)}
                placeholder='<svg viewBox="0 0 24 24">...</svg>'
                rows={8}
                className="bg-[#1A1F2E] border-gray-700 text-white text-xs font-mono"
              />
            </PropertyField>
            <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
              Paste your SVG code here. Scripts will be stripped for security.
            </p>

            {/* Preview */}
            {element.props.svgMarkup && (
              <div style={{ marginTop: '12px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)', textAlign: 'center' }}>
                <div 
                  style={{ display: 'inline-flex', width: `${element.props.iconSize || 32}px`, height: `${element.props.iconSize || 32}px` }}
                  dangerouslySetInnerHTML={{ __html: element.props.svgMarkup.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') }}
                />
              </div>
            )}
          </>
        )}
      </>
    );
  }

  if (element.type === 'IconButton') {
    return (
      <PropertyField label="Icon">
        <Select value={element.props.icon || 'Menu'} onValueChange={(v) => updateProp('icon', v)}>
          <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#121726] border-gray-700 text-white">
            <SelectItem value="Menu">Menu</SelectItem>
            <SelectItem value="Search">Search</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="ShoppingCart">Shopping Cart</SelectItem>
            <SelectItem value="Bell">Bell</SelectItem>
            <SelectItem value="Star">Star</SelectItem>
            <SelectItem value="Heart">Heart</SelectItem>
          </SelectContent>
        </Select>
      </PropertyField>
    );
  }

  if (element.type === 'Spacer') {
    return (
      <>
        <PropertyField label="Space / Height">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Slider
              value={[element.props.spacePx || 32]}
              onValueChange={([val]) => updateProp('spacePx', val)}
              min={0}
              max={400}
              step={4}
              className="flex-1"
            />
            <Input
              type="number"
              value={element.props.spacePx || 32}
              onChange={(e) => updateProp('spacePx', parseInt(e.target.value) || 0)}
              className="bg-[#1A1F2E] border-gray-700 text-white text-sm w-20"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </PropertyField>

        {/* Responsive Height Overrides */}
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Label className="text-gray-300 text-xs font-medium">Responsive Heights</Label>
            <input
              type="checkbox"
              checked={element.props.responsive?.enabled || false}
              onChange={(e) => {
                const current = element.props.responsive || {};
                updateProp('responsive', { ...current, enabled: e.target.checked });
              }}
              className="accent-[#4368D9]"
            />
          </div>
          
          {element.props.responsive?.enabled && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <Label className="text-gray-400 text-[10px] mb-1 block">Desktop</Label>
                <Input
                  type="number"
                  value={element.props.responsive?.desktop || 32}
                  onChange={(e) => {
                    const current = element.props.responsive || {};
                    updateProp('responsive', { ...current, desktop: parseInt(e.target.value) || 0 });
                  }}
                  className="bg-[#121726] border-gray-700 text-white text-xs h-7"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <Label className="text-gray-400 text-[10px] mb-1 block">Tablet</Label>
                <Input
                  type="number"
                  value={element.props.responsive?.tablet || 24}
                  onChange={(e) => {
                    const current = element.props.responsive || {};
                    updateProp('responsive', { ...current, tablet: parseInt(e.target.value) || 0 });
                  }}
                  className="bg-[#121726] border-gray-700 text-white text-xs h-7"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <Label className="text-gray-400 text-[10px] mb-1 block">Mobile</Label>
                <Input
                  type="number"
                  value={element.props.responsive?.mobile || 16}
                  onChange={(e) => {
                    const current = element.props.responsive || {};
                    updateProp('responsive', { ...current, mobile: parseInt(e.target.value) || 0 });
                  }}
                  className="bg-[#121726] border-gray-700 text-white text-xs h-7"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  if (element.type === 'Divider') {
    // Icon map for Divider
    const iconComponents = {
      Star, Heart, Check, X, ArrowRight, Menu, Search, User, ShoppingCart, Bell,
      Home, MoreHorizontal, MoreVertical, Filter, Settings, Grid, ChevronLeft, ChevronRight,
      ChevronUp, ChevronDown, ArrowLeft, ArrowUp, ArrowDown, ExternalLink, LinkIcon, Plus,
      Minus, Edit, Copy, Clipboard, Trash2, Download, Upload, Share2, RefreshCw, RotateCcw,
      Lock, Unlock, Play, Pause, Square, Volume2, VolumeX, Camera, Video, Music,
      Bookmark, MessageCircle, Mail, Phone, Tag, CreditCard, DollarSign,
      Info, HelpCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle,
      Calendar, Clock, MapPin, Globe, Eye, EyeOff, Flag, Zap, TrendingUp,
      Link
    };

    const allIconNames = Object.keys(iconComponents);
    const filteredDividerIcons = dividerIconSearch 
      ? allIconNames.filter(name => name.toLowerCase().includes(dividerIconSearch.toLowerCase())) 
      : allIconNames;

    return (
      <>
        <PropertyField label="Divider Type">
          <Select value={element.props.dividerType || 'line'} onValueChange={(v) => updateProp('dividerType', v)}>
            <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#121726] border-gray-700 text-white">
              <SelectItem value="line">Line Only</SelectItem>
              <SelectItem value="text">Line + Text</SelectItem>
              <SelectItem value="icon">Line + Icon</SelectItem>
              <SelectItem value="emoji">Line + Emoji</SelectItem>
            </SelectContent>
          </Select>
        </PropertyField>

        {/* Text Content (conditional) */}
        {element.props.dividerType === 'text' && (
          <>
            <PropertyField label="Text Content">
              <Input
                value={element.props.text || ''}
                onChange={(e) => updateProp('text', e.target.value)}
                placeholder="Section Title"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>

            <PropertyField label="Text Alignment">
              <Select value={element.props.textAlign || 'center'} onValueChange={(v) => updateProp('textAlign', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
          </>
        )}

        {/* Icon Picker (conditional) */}
        {element.props.dividerType === 'icon' && (
          <>
            <PropertyField label="Search Icons">
              <Input
                value={dividerIconSearch}
                onChange={(e) => setDividerIconSearch(e.target.value)}
                placeholder="Search icons..."
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>

            <div style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)' }}>
              <Label className="text-gray-400 text-xs mb-2 block">Selected Icon</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#121726', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => {
                    const SelectedIcon = iconComponents[element.props.iconName || 'Star'] || Star;
                    return <SelectedIcon size={24} color={element.props.iconColor || '#374151'} />;
                  })()}
                </div>
                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{element.props.iconName || 'Star'}</span>
              </div>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {filteredDividerIcons.map(iconName => {
                  const IconComp = iconComponents[iconName] || Star;
                  return (
                    <button
                      key={iconName}
                      onClick={() => updateProp('iconName', iconName)}
                      style={{
                        padding: '12px',
                        backgroundColor: element.props.iconName === iconName ? '#4368D9' : '#1A1F2E',
                        border: '1px solid',
                        borderColor: element.props.iconName === iconName ? '#4368D9' : 'rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                      title={iconName}
                    >
                      <IconComp size={20} color={element.props.iconName === iconName ? '#ffffff' : '#9CA3AF'} />
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Emoji Picker (conditional) */}
        {element.props.dividerType === 'emoji' && (
          <>
            <PropertyField label="Emoji">
              <Input
                value={element.props.emoji || '⭐'}
                onChange={(e) => updateProp('emoji', e.target.value)}
                placeholder="Paste emoji here"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                maxLength={4}
              />
            </PropertyField>

            <div style={{ marginBottom: '12px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: `${element.props.iconSize || 20}px`, lineHeight: 1 }}>
                {element.props.emoji || '⭐'}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Label className="text-gray-400 text-xs mb-2 block">Popular</Label>
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  maxWidth: '100%',
                  paddingBottom: '6px',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehaviorX: 'contain',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                }}
                className="emoji-row-scroll"
              >
                {['❤️', '🔥', '👍', '😂', '👀', '⭐', '🚀', '💯'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => updateProp('emoji', emoji)}
                    style={{
                      padding: '8px',
                      backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '20px',
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div 
              style={{ 
                maxHeight: '400px',
                minHeight: 0,
                flex: '1 1 auto',
                overflowY: 'auto',
                overflowX: 'hidden',
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
              }}
              className="emoji-picker-scroll"
            >
              {['❤️ Emotions & Reactions', '👍 Engagement & Actions', '📱 Social & UI', '💬 Messaging', '🎉 Content & Creator', '👤 Profile'].map((category, idx) => {
                const categoryEmojis = [
                  ['❤️', '💙', '💚', '💛', '💜', '😍', '😂', '🤣', '😊', '😭', '🥺', '😡', '😎', '🤔', '🔥', '💯', '👀', '🙌', '👏'],
                  ['👍', '👎', '✋', '👌', '✌️', '🤘', '👉', '👈', '👆', '👇', '🔔', '⭐', '⚡', '🚀', '🎯'],
                  ['🔗', '🔍', '🔒', '🔓', '⚙️', '🛠️', '📌', '➕', '➖', '❌', '✔️', '❗', '❓', '⬆️', '⬇️', '⬅️', '➡️'],
                  ['💬', '🗨️', '📣', '📢', '✉️', '📩', '📎', '🧷'],
                  ['🎉', '🎊', '🎁', '🎈', '🏆', '🎵', '🎶', '📸', '🎥', '🖼️', '🎨', '✍️', '✨', '💡'],
                  ['👤', '👥', '🧑', '👩', '👨', '🧠']
                ][idx];

                return (
                  <div key={idx} style={{ marginBottom: '16px' }}>
                    <Label className="text-gray-400 text-xs mb-2 block">{category}</Label>
                    <div 
                      style={{ 
                        display: 'flex', 
                        gap: '6px', 
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        maxWidth: '100%',
                        paddingBottom: '6px',
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehaviorX: 'contain',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
                      }}
                      className="emoji-row-scroll"
                    >
                      {categoryEmojis.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => updateProp('emoji', emoji)}
                          style={{
                            padding: '8px',
                            backgroundColor: element.props.emoji === emoji ? '#4368D9' : '#1A1F2E',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            width: '44px',
                            height: '44px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Line Placement */}
        {element.props.dividerType !== 'line' && (
          <PropertyField label="Line Placement">
            <Select value={element.props.linePlacement || 'split'} onValueChange={(v) => updateProp('linePlacement', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="split">Split (Both Sides)</SelectItem>
                <SelectItem value="left">Left Only</SelectItem>
                <SelectItem value="right">Right Only</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
        )}
      </>
    );
  }

  if (element.type === 'Header') {
    const children = element.props.children || [];
    
    const addHeaderItem = (type) => {
      // Smart defaults for positioning
      let defaultZone = 'right';
      if (type === 'Logo' || type === 'Tagline') defaultZone = 'left';
      if (type === 'Navigation') defaultZone = 'center';

      const newItem = {
        id: `${type.toLowerCase()}-${Date.now()}`,
        type,
        zone: defaultZone,
        row: 'middle',
        ...(type === 'Logo' && { text: 'LOGO', fontSize: 24, fontWeight: 'bold', color: '#000000' }),
        ...(type === 'Tagline' && { text: 'Your Tagline', fontSize: 14, color: '#6B7280', alignment: 'left', maxWidth: 300, marginTop: 4, marginBottom: 8, layout: 'row' }),
        ...(type === 'Navigation' && { menuItems: [{ label: 'Home', link: '/' }, { label: 'About', link: '#' }], textColor: '#000000' }),
        ...(type === 'SearchBar' && { placeholder: 'Search...', backgroundColor: '#f3f4f6' }),
        ...(type === 'IconButton' && { icon: 'Menu', size: 24, color: '#000000' }),
        ...(type === 'FollowButton' && {
          label: 'Follow',
          followingLabel: 'Following',
          buttonType: 'primary',
          iconStyle: 'icon_text',
          icon: 'UserPlus',
          size: 'md',
          labelColor: '#ffffff',
          backgroundColor: '#4368D9',
          paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20,
          borderRadiusTop: 4, borderRadiusRight: 4, borderRadiusBottom: 4, borderRadiusLeft: 4,
          marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
          fontSize: 14, fontWeight: '600',
          zone: 'right', row: 'middle'
        }),
        ...(type === 'Button' && { 
        label: 'Get in Touch', 
        size: 'md', 
        href: '#',
          target: '_self',
          visibility: 'both',
          // Style defaults
          backgroundColor: '#4368D9',
          color: '#ffffff',
          borderRadiusTop: 4, borderRadiusRight: 4, borderRadiusBottom: 4, borderRadiusLeft: 4,
          paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10,
          marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
          fontSize: 14, fontWeight: '600'
        }),
        ...(type === 'Social' && {
          socialIcons: [
            { network: 'Facebook', url: '#' },
            { network: 'Instagram', url: '#' },
            { network: 'Twitter', url: '#' }
          ],
          orientation: 'horizontal',
          iconSpacing: 12,
          visibility: 'both',
          iconSize: 20,
          iconColor: '#000000',
          // Design defaults
          backgroundColor: 'transparent',
          paddingTop: 8, paddingRight: 8, paddingBottom: 8, paddingLeft: 8,
          marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
          borderRadiusTop: 50, borderRadiusRight: 50, borderRadiusBottom: 50, borderRadiusLeft: 50, // round by default
        }),
        ...(type === 'Stats' && {
          followerCount: 1234,
          followingCount: 567,
          displayMode: 'icons', // icons, label_value
          showFollowers: true,
          showFollowing: true,
          followerIcon: 'Users',
          followingIcon: 'UserPlus',
          iconSize: 16,
          iconColor: '#6B7280',
          fontSize: 13,
          fontWeight: '500',
          textColor: '#374151',
          spacing: 16, // between stats
          paddingTop: 4, paddingRight: 8, paddingBottom: 4, paddingLeft: 8,
          marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
          zone: 'right', row: 'middle'
        }),
        ...(type === 'Submenu' && {
          tabs: [
            { id: 'tab-1', label: 'Posts', type: 'social_view', value: 'posts', visibility: 'both' },
            { id: 'tab-2', label: 'Reels', type: 'social_view', value: 'reels', visibility: 'both' },
            { id: 'tab-3', label: 'Tagged', type: 'social_view', value: 'tagged', visibility: 'both' },
            { id: 'tab-4', label: 'About', type: 'social_view', value: 'about', visibility: 'both' },
          ],
          styleVariant: 'underline',
          alignment: 'center',
          backgroundColor: 'transparent',
          textColor: '#6B7280',
          activeColor: '#000000',
          sticky: false,
          mobileScroll: true,
          paddingTop: 0, paddingBottom: 0
        }),
        };
        updateProp('children', [...children, newItem]);
        };

    const removeHeaderItem = (itemId) => {
      updateProp('children', children.filter(c => c.id !== itemId));
    };

    const updateHeaderItem = (itemId, keyOrObj, value) => {
      const updated = children.map(c => {
        if (c.id === itemId) {
           if (typeof keyOrObj === 'object' && keyOrObj !== null) {
              return { ...c, ...keyOrObj };
           }
           return { ...c, [keyOrObj]: value };
        }
        return c;
      });
      updateProp('children', updated);
    };

    const applyTemplate = (template) => {
      const newChildren = template.props.children.map(child => ({
        ...child,
        id: `${child.type.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }));

      updateElementProps({
        ...template.props,
        children: newChildren
      });
    };

    const headerTemplates = [
      { id: 'basic', name: 'Basic', props: { flexDirection: 'row', brandingLayout: 'column', padding: 16, backgroundColor: '#ffffff', backgroundImage: '', children: [{ type: 'Logo', text: 'LOGO', fontSize: 24, fontWeight: 'bold', color: '#000000', zone: 'left' }, { type: 'Tagline', text: 'Your Profile Tagline', fontSize: 14, color: '#6B7280', alignment: 'left', maxWidth: 300, marginTop: 4, marginBottom: 0, zone: 'left' }, { type: 'Navigation', items: ['Home', 'About', 'Contact'], textColor: '#000000', zone: 'right' }, { type: 'IconButton', icon: 'User', size: 24, color: '#000000', zone: 'right' }] } },
      { id: 'split', name: 'Split', props: { flexDirection: 'row', brandingLayout: 'row', padding: 16, backgroundColor: '#ffffff', backgroundImage: '', children: [{ type: 'Logo', text: 'LOGO', fontSize: 24, fontWeight: 'bold', color: '#000000', zone: 'left' }, { type: 'Tagline', text: 'Creative Studio', fontSize: 14, color: '#6B7280', alignment: 'left', maxWidth: 200, marginTop: 0, marginBottom: 0, marginLeft: 12, zone: 'left' }, { type: 'Navigation', items: ['Home', 'Features', 'Pricing'], textColor: '#000000', zone: 'center' }, { type: 'SearchBar', placeholder: 'Search', width: 200, zone: 'right' }, { type: 'IconButton', icon: 'ShoppingCart', size: 24, color: '#000000', zone: 'right' }] } },
      { id: 'centered', name: 'Centered', props: { flexDirection: 'column', brandingLayout: 'column', padding: 32, backgroundColor: '#ffffff', backgroundImage: '', children: [{ type: 'Logo', text: 'LOGO', fontSize: 32, fontWeight: 'bold', color: '#000000', zone: 'center' }, { type: 'Tagline', text: 'Design • Build • Launch', fontSize: 16, color: '#6B7280', alignment: 'center', maxWidth: 500, marginTop: 12, marginBottom: 24, zone: 'center' }, { type: 'Navigation', items: ['Home', 'Shop', 'About', 'Contact'], textColor: '#000000', zone: 'center' }, { type: 'IconButton', icon: 'User', size: 24, color: '#000000', zone: 'center' }] } },
      { id: 'hero', name: 'Hero', props: { flexDirection: 'column', brandingLayout: 'column', padding: 80, backgroundColor: 'transparent', backgroundImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200', children: [{ type: 'Logo', text: 'HERO BRAND', fontSize: 48, fontWeight: 'bold', color: '#ffffff', zone: 'center' }, { type: 'Tagline', text: 'Building the future of digital experiences', fontSize: 20, color: '#e5e7eb', alignment: 'center', maxWidth: 600, marginTop: 16, marginBottom: 32, zone: 'center' }, { type: 'Navigation', items: ['Start Here', 'Our Story', 'Contact'], textColor: '#ffffff', zone: 'center' }] } }
    ];

    return (
      <>
        <PropertyField label="Header Templates">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            {headerTemplates.map(t => (
              <Button 
                key={t.id} 
                variant="outline" 
                onClick={() => applyTemplate(t)}
                className="h-auto py-2 px-3 flex flex-col gap-1 bg-[#1A1F2E] border-gray-700 hover:bg-[#242938] text-white text-xs"
              >
                <span className="font-semibold">{t.name}</span>
              </Button>
            ))}
          </div>
        </PropertyField>

        <PropertyField label="Header Elements">
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {!children.find(c => c.type === 'Logo') && (
                <Button size="sm" onClick={() => addHeaderItem('Logo')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                  <Plus size={12} className="mr-1" /> Logo
                </Button>
              )}
              {!children.find(c => c.type === 'Tagline') && (
                <Button size="sm" onClick={() => addHeaderItem('Tagline')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                  <Plus size={12} className="mr-1" /> Tagline
                </Button>
              )}
              <Button size="sm" onClick={() => addHeaderItem('Navigation')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Menu
              </Button>
              <Button size="sm" onClick={() => addHeaderItem('SearchBar')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Search
              </Button>
              <Button size="sm" onClick={() => addHeaderItem('IconButton')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Icon
              </Button>
              <Button size="sm" onClick={() => addHeaderItem('Button')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Button
              </Button>
              <Button size="sm" onClick={() => addHeaderItem('Social')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Social
              </Button>
              <Button size="sm" onClick={() => addHeaderItem('FollowButton')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Follow
              </Button>
              <Button size="sm" onClick={() => addHeaderItem('Stats')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                <Plus size={12} className="mr-1" /> Stats
              </Button>
              {!children.find(c => c.type === 'Submenu') && (
                <Button size="sm" onClick={() => addHeaderItem('Submenu')} className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-7 text-xs">
                  <Plus size={12} className="mr-1" /> Submenu
                </Button>
              )}
              </div>
              </div>
              </PropertyField>

        {/* Tagline Settings Section */}
        {children.find(c => c.type === 'Tagline') && (
          <div 
            id={`section-${children.find(c => c.type === 'Tagline').id}`}
            style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em' }}>TAGLINE SETTINGS</h4>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => removeHeaderItem(children.find(c => c.type === 'Tagline').id)}
                className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X size={14} />
              </Button>
            </div>

            {(() => {
              const taglineItem = children.find(c => c.type === 'Tagline');
              return (
                <>
                  <div style={{ marginBottom: '12px' }}>
                    <Label className="text-gray-400 text-xs mb-1 block">Tagline Text</Label>
                    <Textarea 
                      value={taglineItem.text || ''} 
                      onChange={(e) => updateHeaderItem(taglineItem.id, 'text', e.target.value)}
                      rows={2}
                      className="bg-[#121726] border-gray-700 text-white text-sm"
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <Label className="text-gray-400 text-xs mb-1 block">Font Size (px)</Label>
                      <NumberSlider 
                        value={taglineItem.fontSize || 14} 
                        onChange={(v) => updateHeaderItem(taglineItem.id, 'fontSize', v)}
                        min={10}
                        max={32}
                        unit="px"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400 text-xs mb-1 block">Max Width (px)</Label>
                      <NumberSlider 
                        value={taglineItem.maxWidth || 300} 
                        onChange={(v) => updateHeaderItem(taglineItem.id, 'maxWidth', v)}
                        min={100}
                        max={800}
                        unit="px"
                      />
                    </div>
                  </div>

                  <ColorInput label="Text Color" value={taglineItem.color} onChange={(v) => updateHeaderItem(taglineItem.id, 'color', v)} />

                  <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Label className="text-gray-400 text-xs mb-1 block">Spacing</Label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <NumberSlider 
                        label="Top"
                        value={taglineItem.marginTop || 0} 
                        onChange={(v) => updateHeaderItem(taglineItem.id, 'marginTop', v)}
                        max={50}
                        unit="px"
                      />
                      <NumberSlider 
                        label="Bottom"
                        value={taglineItem.marginBottom || 0} 
                        onChange={(v) => updateHeaderItem(taglineItem.id, 'marginBottom', v)}
                        max={50}
                        unit="px"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                  <Label className="text-gray-400 text-xs mb-2 block">Row Position</Label>
                  <div className="flex gap-2 mb-4">
                     <Button 
                       variant={taglineItem.layout === 'row' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'layout', 'row')}
                       className={`flex-1 h-8 text-xs ${taglineItem.layout === 'row' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Same Row
                     </Button>
                     <Button 
                       variant={(!taglineItem.layout || taglineItem.layout === 'column') ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'layout', 'column')}
                       className={`flex-1 h-8 text-xs ${(!taglineItem.layout || taglineItem.layout === 'column') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Under Logo
                     </Button>
                  </div>

                  <Label className="text-gray-400 text-xs mb-2 block">Vertical Zone (Row)</Label>
                  <div className="flex gap-2 mb-4">
                     <Button 
                       variant={taglineItem.row === 'top' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'row', 'top')}
                       className={`flex-1 h-8 text-xs ${taglineItem.row === 'top' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Top
                     </Button>
                     <Button 
                       variant={(!taglineItem.row || taglineItem.row === 'middle') ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'row', 'middle')}
                       className={`flex-1 h-8 text-xs ${(!taglineItem.row || taglineItem.row === 'middle') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Middle
                     </Button>
                     <Button 
                       variant={taglineItem.row === 'bottom' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'row', 'bottom')}
                       className={`flex-1 h-8 text-xs ${taglineItem.row === 'bottom' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Bottom
                     </Button>
                  </div>

                  <Label className="text-gray-400 text-xs mb-2 block">Horizontal Zone</Label>
                  <div className="flex gap-2">
                     <Button 
                       variant={taglineItem.zone === 'left' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'zone', 'left')}
                       className={`flex-1 h-8 text-xs ${taglineItem.zone === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Left
                     </Button>
                     <Button 
                       variant={taglineItem.zone === 'center' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'zone', 'center')}
                       className={`flex-1 h-8 text-xs ${taglineItem.zone === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Center
                     </Button>
                     <Button 
                       variant={taglineItem.zone === 'right' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(taglineItem.id, 'zone', 'right')}
                       className={`flex-1 h-8 text-xs ${taglineItem.zone === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Right
                     </Button>
                  </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Submenu Settings Section */}
        {children.find(c => c.type === 'Submenu') && (
          <SubmenuSettings 
            item={children.find(c => c.type === 'Submenu')} 
            updateItem={(key, value) => updateHeaderItem(children.find(c => c.type === 'Submenu').id, key, value)}
            removeItem={removeHeaderItem}
          />
        )}

        {/* Unified Logo Settings Section */}
        {children.find(c => c.type === 'Logo') && (
          <div 
            id={`section-${children.find(c => c.type === 'Logo').id}`}
            style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(67, 104, 217, 0.3)', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em' }}>LOGO SETTINGS</h4>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => removeHeaderItem(children.find(c => c.type === 'Logo').id)}
                className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X size={14} />
              </Button>
            </div>

            {(() => {
              const logoItem = children.find(c => c.type === 'Logo');
              return (
                <>
                   <div style={{ marginBottom: '16px' }}>
                    <Label className="text-gray-400 text-xs mb-2 block">Logo Type</Label>
                    <Select value={logoItem.logoType || 'text'} onValueChange={(v) => updateHeaderItem(logoItem.id, 'logoType', v)}>
                      <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121726] border-gray-700 text-white">
                        <SelectItem value="text">Text Logo</SelectItem>
                        <SelectItem value="image">Image Logo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {logoItem.logoType === 'image' ? (
                    <>
                      <div style={{ marginBottom: '16px' }}>
                        <ImageUploadField
                          label="Upload Logo Image"
                          value={logoItem.imageSrc || ''}
                          onChange={(url) => updateHeaderItem(logoItem.id, 'imageSrc', url)}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <Label className="text-gray-400 text-xs mb-1 block">Width (px)</Label>
                          <NumberSlider 
                            value={logoItem.width || 120} 
                            onChange={(v) => updateHeaderItem(logoItem.id, 'width', v)}
                            max={300}
                            unit="px"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-400 text-xs mb-1 block">Border Radius</Label>
                          <NumberSlider 
                            value={logoItem.borderRadius || 0} 
                            onChange={(v) => updateHeaderItem(logoItem.id, 'borderRadius', v)}
                            max={50}
                            unit="px"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: '12px' }}>
                        <Label className="text-gray-400 text-xs mb-1 block">Logo Text</Label>
                        <Input 
                          value={logoItem.text || ''} 
                          onChange={(e) => updateHeaderItem(logoItem.id, 'text', e.target.value)}
                          className="bg-[#121726] border-gray-700 text-white text-sm"
                        />
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <Label className="text-gray-400 text-xs mb-1 block">Font Size (px)</Label>
                        <NumberSlider 
                          value={logoItem.fontSize || 24} 
                          onChange={(v) => updateHeaderItem(logoItem.id, 'fontSize', v)}
                          min={12}
                          max={72}
                          unit="px"
                        />
                      </div>
                      <ColorInput label="Text Color" value={logoItem.color} onChange={(v) => updateHeaderItem(logoItem.id, 'color', v)} />
                    </>
                  )}

                  <div style={{ marginTop: '16px' }}>
                    <Label className="text-gray-400 text-xs mb-2 block">Vertical Zone (Row)</Label>
                    <div className="flex gap-2 mb-4">
                       <Button 
                         variant={logoItem.row === 'top' ? 'default' : 'outline'} 
                         size="sm" 
                         onClick={() => updateHeaderItem(logoItem.id, 'row', 'top')}
                         className={`flex-1 h-8 text-xs ${logoItem.row === 'top' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                       >
                         Top
                       </Button>
                       <Button 
                         variant={(!logoItem.row || logoItem.row === 'middle') ? 'default' : 'outline'} 
                         size="sm" 
                         onClick={() => updateHeaderItem(logoItem.id, 'row', 'middle')}
                         className={`flex-1 h-8 text-xs ${(!logoItem.row || logoItem.row === 'middle') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                       >
                         Middle
                       </Button>
                       <Button 
                         variant={logoItem.row === 'bottom' ? 'default' : 'outline'} 
                         size="sm" 
                         onClick={() => updateHeaderItem(logoItem.id, 'row', 'bottom')}
                         className={`flex-1 h-8 text-xs ${logoItem.row === 'bottom' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                       >
                         Bottom
                       </Button>
                    </div>

                    <Label className="text-gray-400 text-xs mb-2 block">Horizontal Zone</Label>
                    <div className="flex gap-2">
                       <Button 
                         variant={logoItem.zone === 'left' ? 'default' : 'outline'} 
                         size="sm" 
                         onClick={() => updateHeaderItem(logoItem.id, 'zone', 'left')}
                         className={`flex-1 h-8 text-xs ${logoItem.zone === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                       >
                         Left
                       </Button>
                       <Button 
                         variant={logoItem.zone === 'center' ? 'default' : 'outline'} 
                         size="sm" 
                         onClick={() => updateHeaderItem(logoItem.id, 'zone', 'center')}
                         className={`flex-1 h-8 text-xs ${logoItem.zone === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                       >
                         Center
                       </Button>
                       <Button 
                         variant={logoItem.zone === 'right' ? 'default' : 'outline'} 
                         size="sm" 
                         onClick={() => updateHeaderItem(logoItem.id, 'zone', 'right')}
                         className={`flex-1 h-8 text-xs ${logoItem.zone === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                       >
                         Right
                       </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}



        <div style={{ marginTop: '16px' }}>
          {children.filter(item => item.type !== 'Logo' && item.type !== 'Tagline' && item.type !== 'Submenu').map((item, idx) => (
            <div key={item.id} id={`section-${item.id}`} style={{
              backgroundColor: '#1A1F2E', 
              padding: '16px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              border: '1px solid rgba(67, 104, 217, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {item.type === 'SearchBar' ? 'SEARCH BAR' : item.type === 'IconButton' ? 'ICON BUTTON' : item.type === 'Navigation' ? 'NAVIGATION' : item.type === 'Button' ? 'BUTTON' : item.type === 'Social' ? 'SOCIAL ICONS' : item.type === 'FollowButton' ? 'FOLLOW BUTTON' : item.type === 'Stats' ? 'FOLLOWER STATS' : item.type} SETTINGS
                </h4>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => removeHeaderItem(item.id)}
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X size={14} />
                </Button>
              </div>

              <div style={{ fontSize: '11px', marginBottom: '12px' }}>
                <div className="mb-4">
                  <Label className="text-gray-400 text-xs mb-2 block">Vertical Zone (Row)</Label>
                  <div className="flex gap-2">
                     <Button 
                       variant={item.row === 'top' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(item.id, 'row', 'top')}
                       className={`flex-1 h-8 text-xs ${item.row === 'top' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Top
                     </Button>
                     <Button 
                       variant={(!item.row || item.row === 'middle') ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(item.id, 'row', 'middle')}
                       className={`flex-1 h-8 text-xs ${(!item.row || item.row === 'middle') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Middle
                     </Button>
                     <Button 
                       variant={item.row === 'bottom' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(item.id, 'row', 'bottom')}
                       className={`flex-1 h-8 text-xs ${item.row === 'bottom' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Bottom
                     </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-gray-400 text-xs mb-2 block">Horizontal Zone</Label>
                  <div className="flex gap-2">
                     <Button 
                       variant={item.zone === 'left' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(item.id, 'zone', 'left')}
                       className={`flex-1 h-8 text-xs ${item.zone === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Left
                     </Button>
                     <Button 
                       variant={item.zone === 'center' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(item.id, 'zone', 'center')}
                       className={`flex-1 h-8 text-xs ${item.zone === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Center
                     </Button>
                     <Button 
                       variant={item.zone === 'right' ? 'default' : 'outline'} 
                       size="sm" 
                       onClick={() => updateHeaderItem(item.id, 'zone', 'right')}
                       className={`flex-1 h-8 text-xs ${item.zone === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                     >
                       Right
                     </Button>
                  </div>
                </div>


              </div>

              {item.type === 'Logo' && (
                <>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Logo Type</Label>
                    <Select value={item.logoType || 'text'} onValueChange={(v) => updateHeaderItem(item.id, 'logoType', v)}>
                      <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121726] border-gray-700 text-white">
                        <SelectItem value="text">Text Logo</SelectItem>
                        <SelectItem value="image">Image Logo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {item.logoType === 'image' ? (
                    <div style={{ marginBottom: '8px' }}>
                      <ImageUploadField
                        label="Logo Image"
                        value={item.imageSrc || ''}
                        onChange={(url) => updateHeaderItem(item.id, 'imageSrc', url)}
                      />
                      <div style={{ marginTop: '8px' }}>
                        <Label className="text-gray-400 text-xs">Image Size (height)</Label>
                        <Input 
                          type="number" 
                          value={item.imageHeight || 40} 
                          onChange={(e) => updateHeaderItem(item.id, 'imageHeight', parseInt(e.target.value))}
                          className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ marginBottom: '8px' }}>
                        <Label className="text-gray-400 text-xs">Text</Label>
                        <Input 
                          value={item.text || ''} 
                          onChange={(e) => updateHeaderItem(item.id, 'text', e.target.value)}
                          className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                        />
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <Label className="text-gray-400 text-xs">Font Size</Label>
                        <Input 
                          type="number" 
                          value={item.fontSize || 24} 
                          onChange={(e) => updateHeaderItem(item.id, 'fontSize', parseInt(e.target.value))}
                          className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                        />
                      </div>
                    </>
                  )}
                  
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Link URL</Label>
                    <Input 
                      value={item.href || '#'} 
                      onChange={(e) => updateHeaderItem(item.id, 'href', e.target.value)}
                      placeholder="/"
                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                    />
                  </div>
                </>
              )}

              {item.type === 'Navigation' && (
                <>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <Label className="text-gray-400 text-xs">Menu Items</Label>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          const newItems = [...(item.menuItems || [{ label: 'Home', link: '/' }]), { label: 'New Item', link: '#' }];
                          updateHeaderItem(item.id, 'menuItems', newItems);
                        }}
                        className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-5 text-xs px-2"
                      >
                        <Plus size={10} className="mr-1" /> Add
                      </Button>
                    </div>

                    {/* Navigation Styles */}
                    <div className="mb-4 p-3 bg-[#121726] rounded border border-gray-800">
                       <Label className="text-gray-400 text-[10px] uppercase font-bold mb-2 block">Menu Styles</Label>
                       <div className="grid grid-cols-2 gap-2 mb-2">
                         <div>
                           <Label className="text-gray-500 text-[10px] block mb-1">Font Size</Label>
                           <NumberSlider 
                              value={item.fontSize || 14} 
                              onChange={(v) => updateHeaderItem(item.id, 'fontSize', v)}
                              min={10}
                              max={24}
                              unit="px"
                           />
                         </div>
                         <div>
                           <Label className="text-gray-500 text-[10px] block mb-1">Max Width</Label>
                           <NumberSlider 
                              value={item.maxWidth || 0} 
                              onChange={(v) => updateHeaderItem(item.id, 'maxWidth', v)}
                              min={0}
                              max={500}
                              unit="px"
                           />
                         </div>
                       </div>
                       <div className="mb-2">
                         <ColorInput label="Text Color" value={item.textColor} onChange={(v) => updateHeaderItem(item.id, 'textColor', v)} />
                       </div>
                       <div className="grid grid-cols-2 gap-2 mb-2">
                         <div>
                           <Label className="text-gray-500 text-[10px] block mb-1">Margin Top</Label>
                           <NumberSlider 
                              value={item.marginTop || 0} 
                              onChange={(v) => updateHeaderItem(item.id, 'marginTop', v)}
                              max={50}
                              unit="px"
                           />
                         </div>
                         <div>
                           <Label className="text-gray-500 text-[10px] block mb-1">Margin Bottom</Label>
                           <NumberSlider 
                              value={item.marginBottom || 0} 
                              onChange={(v) => updateHeaderItem(item.id, 'marginBottom', v)}
                              max={50}
                              unit="px"
                           />
                         </div>
                       </div>

                       <div className="mb-2">
                         <Label className="text-gray-500 text-[10px] block mb-1">Item Spacing</Label>
                         <NumberSlider 
                            value={item.itemSpacing || 24} 
                            onChange={(v) => updateHeaderItem(item.id, 'itemSpacing', v)}
                            max={100}
                            unit="px"
                         />
                       </div>

                       <div className="mt-2">
                        <Label className="text-gray-500 text-[10px] block mb-1">Content Alignment</Label>
                        <div className="flex gap-1">
                           <Button 
                             variant={item.alignment === 'flex-start' ? 'default' : 'outline'} 
                             size="sm" 
                             onClick={() => updateHeaderItem(item.id, 'alignment', 'flex-start')}
                             className={`flex-1 h-6 text-[10px] ${item.alignment === 'flex-start' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                           >
                             Left
                           </Button>
                           <Button 
                             variant={item.alignment === 'center' ? 'default' : 'outline'} 
                             size="sm" 
                             onClick={() => updateHeaderItem(item.id, 'alignment', 'center')}
                             className={`flex-1 h-6 text-[10px] ${item.alignment === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                           >
                             Center
                           </Button>
                           <Button 
                             variant={item.alignment === 'flex-end' ? 'default' : 'outline'} 
                             size="sm" 
                             onClick={() => updateHeaderItem(item.id, 'alignment', 'flex-end')}
                             className={`flex-1 h-6 text-[10px] ${item.alignment === 'flex-end' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                           >
                             Right
                           </Button>
                        </div>
                       </div>
                       </div>
                    
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {(item.menuItems || item.items?.map(i => ({ label: i, link: '#' })) || []).map((menuItem, idx) => (
                        <div key={idx} style={{ 
                          backgroundColor: '#0D0F12', 
                          padding: '8px', 
                          borderRadius: '6px', 
                          marginBottom: '6px',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '4px' }}>
                            <GripVertical size={10} color="#6B7280" />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                const newItems = (item.menuItems || []).filter((_, i) => i !== idx);
                                updateHeaderItem(item.id, 'menuItems', newItems);
                              }}
                              className="h-4 w-4 text-red-400 hover:text-red-300 ml-auto"
                            >
                              <X size={8} />
                            </Button>
                          </div>
                          <Input 
                            value={menuItem.label || ''} 
                            onChange={(e) => {
                              const val = e.target.value;
                              // Ensure we handle migration from item.items (strings) to item.menuItems (objects)
                              // If item.menuItems doesn't exist, we must create it from item.items
                              const currentItems = item.menuItems || (item.items || []).map(i => ({ label: i, link: '#' }));
                              const newItems = [...currentItems];
                              
                              if (newItems[idx]) {
                                newItems[idx] = { ...newItems[idx], label: val };
                              } else {
                                // Fallback for safety
                                newItems[idx] = { label: val, link: '#' };
                              }
                              
                              updateHeaderItem(item.id, 'menuItems', newItems);
                            }}
                            onBlur={(e) => {
                              if (e.target.value.trim() === '') {
                                // Restore placeholder if empty on blur
                                const newItems = [...(item.menuItems || [])];
                                newItems[idx] = { ...newItems[idx], label: 'Menu Item' };
                                updateHeaderItem(item.id, 'menuItems', newItems);
                              }
                            }}
                            placeholder="Label"
                            className="bg-[#1A1F2E] border-gray-700 text-white h-6 text-xs mb-2"
                          />
                          <Input 
                            value={menuItem.link || ''} 
                            onChange={(e) => {
                              const currentItems = item.menuItems || (item.items || []).map(i => ({ label: i, link: '#' }));
                              const newItems = [...currentItems];
                              if (newItems[idx]) {
                                  newItems[idx] = { ...newItems[idx], link: e.target.value };
                              }
                              updateHeaderItem(item.id, 'menuItems', newItems);
                            }}
                            placeholder="Link"
                            className="bg-[#1A1F2E] border-gray-700 text-white h-6 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {item.type === 'SearchBar' && (
                <>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Placeholder</Label>
                    <Input 
                      value={item.placeholder || ''} 
                      onChange={(e) => updateHeaderItem(item.id, 'placeholder', e.target.value)}
                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                    />
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Width (px)</Label>
                    <Input 
                      type="number" 
                      value={item.width || 200} 
                      onChange={(e) => updateHeaderItem(item.id, 'width', parseInt(e.target.value))}
                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                    />
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Border Radius</Label>
                    <Input 
                      type="number" 
                      value={item.borderRadius || 6} 
                      onChange={(e) => updateHeaderItem(item.id, 'borderRadius', parseInt(e.target.value))}
                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                    />
                  </div>
                </>
              )}

              {item.type === 'IconButton' && (
                <>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Icon</Label>
                    <Select value={item.icon || 'Menu'} onValueChange={(v) => updateHeaderItem(item.id, 'icon', v)}>
                      <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121726] border-gray-700 text-white">
                        <SelectItem value="Menu">Menu</SelectItem>
                        <SelectItem value="Search">Search</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="ShoppingCart">Cart</SelectItem>
                        <SelectItem value="Bell">Bell</SelectItem>
                        <SelectItem value="Star">Star</SelectItem>
                        <SelectItem value="Heart">Heart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Icon Size</Label>
                    <Input 
                      type="number" 
                      value={item.size || 24} 
                      onChange={(e) => updateHeaderItem(item.id, 'size', parseInt(e.target.value))}
                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                    />
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Label className="text-gray-400 text-xs">Link (Optional)</Label>
                    <Input 
                      value={item.href || ''} 
                      onChange={(e) => updateHeaderItem(item.id, 'href', e.target.value)}
                      placeholder="#"
                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                    />
                    </div>
                    </>
                    )}

                    {item.type === 'Button' && (
                    <>
                    {/* Label & Link */}
                    <div className="space-y-3 mb-4">
                    <div>
                      <Label className="text-gray-400 text-xs">Label Text</Label>
                      <Input 
                        value={item.label || ''} 
                        onChange={(e) => updateHeaderItem(item.id, 'label', e.target.value)}
                        className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-gray-400 text-xs">Secondary Label</Label>
                      <input 
                        type="checkbox" 
                        checked={item.showSecondaryLabel || false}
                        onChange={(e) => updateHeaderItem(item.id, 'showSecondaryLabel', e.target.checked)}
                        className="accent-[#4368D9]"
                      />
                    </div>
                    {item.showSecondaryLabel && (
                       <Input 
                         value={item.secondaryLabel || ''} 
                         onChange={(e) => updateHeaderItem(item.id, 'secondaryLabel', e.target.value)}
                         placeholder="Secondary Text"
                         className="bg-[#121726] border-gray-700 text-white h-7 text-xs"
                       />
                    )}

                    <div>
                      <Label className="text-gray-400 text-xs">Link URL</Label>
                      <Input 
                        value={item.href || ''} 
                        onChange={(e) => updateHeaderItem(item.id, 'href', e.target.value)}
                        placeholder="https://"
                        className="bg-[#121726] border-gray-700 text-white h-7 text-xs mt-1"
                      />
                    </div>

                    <div className="space-y-2">
                       <label className="flex items-center gap-2 text-xs text-gray-400">
                         <input type="checkbox" checked={item.openInNewTab || false} onChange={(e) => updateHeaderItem(item.id, 'openInNewTab', e.target.checked)} className="accent-[#4368D9]" />
                         Open in new tab
                       </label>
                       <label className="flex items-center gap-2 text-xs text-gray-400">
                         <input type="checkbox" checked={item.nofollow || false} onChange={(e) => updateHeaderItem(item.id, 'nofollow', e.target.checked)} className="accent-[#4368D9]" />
                         Set link to nofollow
                       </label>
                       <label className="flex items-center gap-2 text-xs text-gray-400">
                         <input type="checkbox" checked={item.sponsored || false} onChange={(e) => updateHeaderItem(item.id, 'sponsored', e.target.checked)} className="accent-[#4368D9]" />
                         Set link to sponsored
                       </label>
                    </div>

                    <div>
                       <Label className="text-gray-400 text-xs block mb-1">Size</Label>
                       <Select value={item.size || 'md'} onValueChange={(v) => {
                          const sizeStyles = {
                            sm: { fontSize: 12, paddingTop: 8, paddingBottom: 8, paddingRight: 16, paddingLeft: 16 },
                            md: { fontSize: 14, paddingTop: 10, paddingBottom: 10, paddingRight: 20, paddingLeft: 20 },
                            lg: { fontSize: 16, paddingTop: 12, paddingBottom: 12, paddingRight: 24, paddingLeft: 24 }
                          };
                          const styles = sizeStyles[v] || sizeStyles.md;
                          const updated = children.map(c => 
                            c.id === item.id ? { ...c, size: v, ...styles } : c
                          );
                          updateProp('children', updated);
                       }}>
                          <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#121726] border-gray-700 text-white">
                            <SelectItem value="sm">Small</SelectItem>
                            <SelectItem value="md">Medium</SelectItem>
                            <SelectItem value="lg">Large</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>

                    <div>
                       <Label className="text-gray-400 text-xs block mb-1">User Visibility</Label>
                       <div className="flex bg-[#121726] rounded p-1 border border-gray-700">
                         <button 
                           onClick={() => updateHeaderItem(item.id, 'visibility', 'loggedIn')}
                           className={`flex-1 text-[10px] py-1 rounded ${item.visibility === 'loggedIn' ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}
                         >
                           Logged In
                         </button>
                         <button 
                           onClick={() => updateHeaderItem(item.id, 'visibility', 'loggedOut')}
                           className={`flex-1 text-[10px] py-1 rounded ${item.visibility === 'loggedOut' ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}
                         >
                           Logged Out
                         </button>
                         <button 
                           onClick={() => updateHeaderItem(item.id, 'visibility', 'both')}
                           className={`flex-1 text-[10px] py-1 rounded ${(!item.visibility || item.visibility === 'both') ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}
                         >
                           Both
                         </button>
                       </div>
                    </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4 mt-4">
                     <Label className="text-gray-300 text-[10px] uppercase font-bold mb-3 block">Design</Label>

                     {/* Typography */}
                     <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <Label className="text-gray-500 text-[10px]">Font Size</Label>
                          <Input type="number" value={item.fontSize || 14} onChange={(e) => updateHeaderItem(item.id, 'fontSize', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs" />
                        </div>
                        <div>
                          <Label className="text-gray-500 text-[10px]">Weight</Label>
                          <Select value={item.fontWeight || '600'} onValueChange={(v) => updateHeaderItem(item.id, 'fontWeight', v)}>
                            <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-6 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#121726] border-gray-700 text-white">
                              <SelectItem value="400">Regular</SelectItem>
                              <SelectItem value="500">Medium</SelectItem>
                              <SelectItem value="600">SemiBold</SelectItem>
                              <SelectItem value="700">Bold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                     </div>

                     {/* Colors */}
                     <div className="mb-3 space-y-2">
                       <ColorInput label="Label Color" value={item.color} onChange={(v) => updateHeaderItem(item.id, 'color', v)} />
                       <ColorInput label="Button Background" value={item.backgroundColor} onChange={(v) => updateHeaderItem(item.id, 'backgroundColor', v)} />
                     </div>

                     {/* Padding */}
                     <div className="mb-3">
                       <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Padding</Label></div>
                       <div className="grid grid-cols-4 gap-1">
                         <Input placeholder="T" value={item.paddingTop || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="R" value={item.paddingRight || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="B" value={item.paddingBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="L" value={item.paddingLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                       </div>
                     </div>

                     {/* Radius */}
                     <div className="mb-3">
                       <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Border Radius</Label></div>
                       <div className="grid grid-cols-4 gap-1">
                         <Input placeholder="TL" value={item.borderRadiusTop || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="TR" value={item.borderRadiusRight || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="BR" value={item.borderRadiusBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="BL" value={item.borderRadiusLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                       </div>
                     </div>

                     {/* Margin */}
                     <div className="mb-3">
                       <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Margin</Label></div>
                       <div className="grid grid-cols-4 gap-1">
                         <Input placeholder="T" value={item.marginTop || 0} onChange={(e) => updateHeaderItem(item.id, 'marginTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="R" value={item.marginRight || 0} onChange={(e) => updateHeaderItem(item.id, 'marginRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="B" value={item.marginBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'marginBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                         <Input placeholder="L" value={item.marginLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'marginLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                       </div>
                     </div>
                    </div>
                    </>
                    )}

                                              {item.type === 'Stats' && (
                            <>
                              <div className="space-y-4 mb-4">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-gray-400 text-xs block mb-1">Followers (Mock)</Label>
                                    <Input 
                                      type="number"
                                      value={item.followerCount}
                                      onChange={(e) => updateHeaderItem(item.id, 'followerCount', parseInt(e.target.value))}
                                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-gray-400 text-xs block mb-1">Following (Mock)</Label>
                                    <Input 
                                      type="number"
                                      value={item.followingCount}
                                      onChange={(e) => updateHeaderItem(item.id, 'followingCount', parseInt(e.target.value))}
                                      className="bg-[#121726] border-gray-700 text-white h-7 text-xs"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-gray-400 text-xs block mb-1">Display Layout</Label>
                                  <Select 
                                    value={item.displayMode === 'icons' ? 'compact_icons' : (item.displayMode === 'label_value' ? 'label_above' : (item.displayMode || 'compact_icons'))} 
                                    onValueChange={(v) => updateHeaderItem(item.id, 'displayMode', v)}
                                  >
                                    <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                      <SelectItem value="compact_icons">Compact Icons</SelectItem>
                                      <SelectItem value="icon_inline">Icon + Value (Inline)</SelectItem>
                                      <SelectItem value="icon_above">Icon Above + Value</SelectItem>
                                      <SelectItem value="icon_below">Icon Below + Value</SelectItem>
                                      <SelectItem value="label_above">Label Above + Value</SelectItem>
                                      <SelectItem value="label_below">Label Below + Value</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                   <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                                     <input 
                                       type="checkbox" 
                                       checked={item.showFollowers !== false}
                                       onChange={(e) => updateHeaderItem(item.id, 'showFollowers', e.target.checked)}
                                       className="accent-[#4368D9]" 
                                     />
                                     Show Followers
                                   </label>
                                   <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                                     <input 
                                       type="checkbox" 
                                       checked={item.showFollowing !== false}
                                       onChange={(e) => updateHeaderItem(item.id, 'showFollowing', e.target.checked)}
                                       className="accent-[#4368D9]" 
                                     />
                                     Show Following
                                   </label>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-gray-400 text-xs block mb-1">Follower Icon</Label>
                                    <Select value={item.followerIcon || 'Users'} onValueChange={(v) => updateHeaderItem(item.id, 'followerIcon', v)}>
                                      <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                        <SelectItem value="Users">Users</SelectItem>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Heart">Heart</SelectItem>
                                        <SelectItem value="Star">Star</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400 text-xs block mb-1">Following Icon</Label>
                                    <Select value={item.followingIcon || 'UserPlus'} onValueChange={(v) => updateHeaderItem(item.id, 'followingIcon', v)}>
                                      <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                        <SelectItem value="UserPlus">User Plus</SelectItem>
                                        <SelectItem value="ArrowRight">Arrow</SelectItem>
                                        <SelectItem value="UserCheck">User Check</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-gray-700 pt-4 mt-4">
                                 <Label className="text-gray-300 text-[10px] uppercase font-bold mb-3 block">Design</Label>
                                 
                                 <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div>
                                      <Label className="text-gray-500 text-[10px]">Font Size</Label>
                                      <Input type="number" value={item.fontSize || 13} onChange={(e) => updateHeaderItem(item.id, 'fontSize', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs" />
                                    </div>
                                    <div>
                                      <Label className="text-gray-500 text-[10px]">Weight</Label>
                                      <Select value={item.fontWeight || '500'} onValueChange={(v) => updateHeaderItem(item.id, 'fontWeight', v)}>
                                        <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-6 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                          <SelectItem value="400">Regular</SelectItem>
                                          <SelectItem value="500">Medium</SelectItem>
                                          <SelectItem value="600">SemiBold</SelectItem>
                                          <SelectItem value="700">Bold</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                 </div>

                                 <div className="mb-3 space-y-2">
                                    <ColorInput label="Text Color" value={item.textColor} onChange={(v) => updateHeaderItem(item.id, 'textColor', v)} />
                                    <ColorInput label="Icon Color" value={item.iconColor} onChange={(v) => updateHeaderItem(item.id, 'iconColor', v)} />
                                 </div>

                                 <div className="mb-3">
                                   <div className="grid grid-cols-2 gap-2">
                                     <div>
                                        <Label className="text-gray-500 text-[10px] block mb-1">Icon Size</Label>
                                        <NumberSlider 
                                            value={item.iconSize || 16} 
                                            onChange={(v) => updateHeaderItem(item.id, 'iconSize', v)}
                                            min={12}
                                            max={32}
                                            unit="px"
                                        />
                                     </div>
                                     <div>
                                        <Label className="text-gray-500 text-[10px] block mb-1">Gap Spacing</Label>
                                        <NumberSlider 
                                            value={item.spacing || 16} 
                                            onChange={(v) => updateHeaderItem(item.id, 'spacing', v)}
                                            min={0}
                                            max={64}
                                            unit="px"
                                        />
                                     </div>
                                   </div>
                                 </div>

                                 {/* Margin */}
                                 <div className="mb-3">
                                   <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Margin</Label></div>
                                   <div className="grid grid-cols-4 gap-1">
                                     <Input placeholder="T" value={item.marginTop || 0} onChange={(e) => updateHeaderItem(item.id, 'marginTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                                     <Input placeholder="R" value={item.marginRight || 0} onChange={(e) => updateHeaderItem(item.id, 'marginRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                                     <Input placeholder="B" value={item.marginBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'marginBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                                     <Input placeholder="L" value={item.marginLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'marginLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                                   </div>
                                 </div>
                              </div>
                            </>
                          )}

                          {item.type === 'FollowButton' && (
                      <>
                        <div className="space-y-3 mb-4">
                          <div>
                            <Label className="text-gray-400 text-xs block mb-1">Button Mode</Label>
                            <Select value={item.buttonType || 'primary'} onValueChange={(v) => updateHeaderItem(item.id, 'buttonType', v)}>
                              <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                <SelectItem value="primary">Primary (Filled)</SelectItem>
                                <SelectItem value="outline">Outline</SelectItem>
                                <SelectItem value="text">Text Only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                             <div>
                               <Label className="text-gray-400 text-xs block mb-1">Follow Label</Label>
                               <Input 
                                  value={item.label || 'Follow'} 
                                  onChange={(e) => updateHeaderItem(item.id, 'label', e.target.value)}
                                  className="bg-[#121726] border-gray-700 text-white h-7 text-xs"
                               />
                             </div>
                             <div>
                               <Label className="text-gray-400 text-xs block mb-1">Following Label</Label>
                               <Input 
                                  value={item.followingLabel || 'Following'} 
                                  onChange={(e) => updateHeaderItem(item.id, 'followingLabel', e.target.value)}
                                  className="bg-[#121726] border-gray-700 text-white h-7 text-xs"
                               />
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-gray-400 text-xs block mb-1">Icon Style</Label>
                              <Select value={item.iconStyle || 'icon_text'} onValueChange={(v) => updateHeaderItem(item.id, 'iconStyle', v)}>
                                <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                  <SelectItem value="text_only">Text Only</SelectItem>
                                  <SelectItem value="icon_text">Icon + Text</SelectItem>
                                  <SelectItem value="icon_only">Icon Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-gray-400 text-xs block mb-1">Icon</Label>
                              <Select value={item.icon || 'UserPlus'} onValueChange={(v) => updateHeaderItem(item.id, 'icon', v)}>
                                <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                  <SelectItem value="UserPlus">User Plus</SelectItem>
                                  <SelectItem value="UserCheck">User Check</SelectItem>
                                  <SelectItem value="Heart">Heart</SelectItem>
                                  <SelectItem value="Star">Star</SelectItem>
                                  <SelectItem value="Bell">Bell</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-gray-800 pt-2 mt-2">
                             <Label className="text-gray-400 text-xs">Show in Builder Preview</Label>
                             <input 
                               type="checkbox" 
                               checked={item.showPreview !== false}
                               onChange={(e) => updateHeaderItem(item.id, 'showPreview', e.target.checked)}
                               className="accent-[#4368D9]"
                             />
                          </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mt-4">
                           <Label className="text-gray-300 text-[10px] uppercase font-bold mb-3 block">Design</Label>
                           
                           <div className="mb-3">
                             <Label className="text-gray-500 text-[10px] block mb-1">Size</Label>
                             <Select value={item.size || 'md'} onValueChange={(v) => {
                                const sizeStyles = {
                                  sm: { fontSize: 12, paddingTop: 8, paddingBottom: 8, paddingRight: 16, paddingLeft: 16 },
                                  md: { fontSize: 14, paddingTop: 10, paddingBottom: 10, paddingRight: 20, paddingLeft: 20 },
                                  lg: { fontSize: 16, paddingTop: 12, paddingBottom: 12, paddingRight: 24, paddingLeft: 24 }
                                };
                                const styles = sizeStyles[v] || sizeStyles.md;
                                const updated = children.map(c => 
                                  c.id === item.id ? { ...c, size: v, ...styles } : c
                                );
                                updateProp('children', updated);
                             }}>
                                <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-7 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                  <SelectItem value="sm">Small</SelectItem>
                                  <SelectItem value="md">Medium</SelectItem>
                                  <SelectItem value="lg">Large</SelectItem>
                                </SelectContent>
                              </Select>
                           </div>

                           <div className="grid grid-cols-2 gap-2 mb-3">
                              <div>
                                <Label className="text-gray-500 text-[10px]">Font Size</Label>
                                <Input type="number" value={item.fontSize || 14} onChange={(e) => updateHeaderItem(item.id, 'fontSize', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs" />
                              </div>
                              <div>
                                <Label className="text-gray-500 text-[10px]">Weight</Label>
                                <Select value={item.fontWeight || '600'} onValueChange={(v) => updateHeaderItem(item.id, 'fontWeight', v)}>
                                  <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-6 text-xs"><SelectValue /></SelectTrigger>
                                  <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                    <SelectItem value="400">Regular</SelectItem>
                                    <SelectItem value="500">Medium</SelectItem>
                                    <SelectItem value="600">SemiBold</SelectItem>
                                    <SelectItem value="700">Bold</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                           </div>

                           <div className="mb-3 space-y-2">
                             <ColorInput label="Label Color" value={item.labelColor} onChange={(v) => updateHeaderItem(item.id, 'labelColor', v)} />
                             <ColorInput label="Background Color" value={item.backgroundColor} onChange={(v) => updateHeaderItem(item.id, 'backgroundColor', v)} />
                             <ColorInput label="Border Color" value={item.borderColor} onChange={(v) => updateHeaderItem(item.id, 'borderColor', v)} />
                           </div>

                           <div className="mb-3">
                             <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Padding</Label></div>
                             <div className="grid grid-cols-4 gap-1">
                               <Input placeholder="T" value={item.paddingTop || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="R" value={item.paddingRight || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="B" value={item.paddingBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="L" value={item.paddingLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                             </div>
                           </div>

                           <div className="mb-3">
                             <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Border Radius</Label></div>
                             <div className="grid grid-cols-4 gap-1">
                               <Input placeholder="TL" value={item.borderRadiusTop || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="TR" value={item.borderRadiusRight || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="BR" value={item.borderRadiusBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="BL" value={item.borderRadiusLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                             </div>
                           </div>

                           <div className="mb-3">
                             <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Margin</Label></div>
                             <div className="grid grid-cols-4 gap-1">
                               <Input placeholder="T" value={item.marginTop || 0} onChange={(e) => updateHeaderItem(item.id, 'marginTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="R" value={item.marginRight || 0} onChange={(e) => updateHeaderItem(item.id, 'marginRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="B" value={item.marginBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'marginBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="L" value={item.marginLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'marginLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                             </div>
                           </div>
                        </div>
                      </>
                    )}

                    {item.type === 'Social' && (
                      <>
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <Label className="text-gray-400 text-xs">Social Icons</Label>
                            <Button 
                              size="sm" 
                              onClick={() => {
                                const newIcons = [...(item.socialIcons || []), { network: 'Instagram', url: '#' }];
                                updateHeaderItem(item.id, 'socialIcons', newIcons);
                              }}
                              className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-5 text-xs px-2"
                            >
                              <Plus size={10} className="mr-1" /> Add Icon
                            </Button>
                          </div>
                          
                          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                            {(item.socialIcons || []).map((icon, idx) => (
                              <div key={idx} style={{ 
                                backgroundColor: '#0D0F12', 
                                padding: '8px', 
                                borderRadius: '6px', 
                                marginBottom: '6px',
                                border: '1px solid rgba(255,255,255,0.05)'
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <Label className="text-gray-500 text-[10px]">Network</Label>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => {
                                      const newIcons = item.socialIcons.filter((_, i) => i !== idx);
                                      updateHeaderItem(item.id, 'socialIcons', newIcons);
                                    }}
                                    className="h-4 w-4 text-red-400 hover:text-red-300"
                                  >
                                    <X size={10} />
                                  </Button>
                                </div>
                                
                                <Select 
                                  value={icon.network} 
                                  onValueChange={(v) => {
                                    const newIcons = [...item.socialIcons];
                                    newIcons[idx] = { ...newIcons[idx], network: v };
                                    updateHeaderItem(item.id, 'socialIcons', newIcons);
                                  }}
                                >
                                  <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white h-7 text-xs mb-2">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                    {['Facebook', 'Instagram', 'X', 'Linkedin', 'Youtube', 'TikTok', 'Pinterest', 'Behance', 'Dribbble', 'GitHub', 'Custom'].map(net => (
                                      <SelectItem key={net} value={net}>{net}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                {icon.network === 'Custom' && (
                                   <Input 
                                     value={icon.customLabel || ''} 
                                     onChange={(e) => {
                                       const newIcons = [...item.socialIcons];
                                       newIcons[idx] = { ...newIcons[idx], customLabel: e.target.value };
                                       updateHeaderItem(item.id, 'socialIcons', newIcons);
                                     }}
                                     placeholder="Label"
                                     className="bg-[#1A1F2E] border-gray-700 text-white h-7 text-xs mb-2"
                                   />
                                )}
                                
                                <Input 
                                  value={icon.url || ''} 
                                  onChange={(e) => {
                                    const newIcons = [...item.socialIcons];
                                    newIcons[idx] = { ...newIcons[idx], url: e.target.value };
                                    updateHeaderItem(item.id, 'socialIcons', newIcons);
                                  }}
                                  placeholder="https://"
                                  className="bg-[#1A1F2E] border-gray-700 text-white h-7 text-xs"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                           <Label className="text-gray-400 text-xs mb-2 block">Layout & Placement</Label>
                           
                           <div className="mb-3">
                             <Label className="text-gray-500 text-[10px] block mb-1">Orientation</Label>
                             <div className="flex gap-2 mb-3">
                               <Button 
                                 variant={(!item.orientation || item.orientation === 'horizontal') ? 'default' : 'outline'} 
                                 size="sm" 
                                 onClick={() => updateHeaderItem(item.id, 'orientation', 'horizontal')}
                                 className={`flex-1 h-7 text-xs ${(!item.orientation || item.orientation === 'horizontal') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                               >
                                 Horizontal
                               </Button>
                               <Button 
                                 variant={item.orientation === 'vertical' ? 'default' : 'outline'} 
                                 size="sm" 
                                 onClick={() => updateHeaderItem(item.id, 'orientation', 'vertical')}
                                 className={`flex-1 h-7 text-xs ${item.orientation === 'vertical' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                               >
                                 Vertical
                               </Button>
                             </div>
                           </div>
                           
                           <div className="mb-4">
                             <Label className="text-gray-400 text-xs mb-2 block">Vertical Zone (Row)</Label>
                             <div className="flex gap-2">
                                <Button 
                                  variant={item.row === 'top' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => updateHeaderItem(item.id, 'row', 'top')}
                                  className={`flex-1 h-8 text-xs ${item.row === 'top' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                                >
                                  Top
                                </Button>
                                <Button 
                                  variant={(!item.row || item.row === 'middle') ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => updateHeaderItem(item.id, 'row', 'middle')}
                                  className={`flex-1 h-8 text-xs ${(!item.row || item.row === 'middle') ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                                >
                                  Middle
                                </Button>
                                <Button 
                                  variant={item.row === 'bottom' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => updateHeaderItem(item.id, 'row', 'bottom')}
                                  className={`flex-1 h-8 text-xs ${item.row === 'bottom' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                                >
                                  Bottom
                                </Button>
                             </div>
                           </div>

                           <div className="mb-4">
                             <Label className="text-gray-400 text-xs mb-2 block">Horizontal Zone</Label>
                             <div className="flex gap-2">
                                <Button 
                                  variant={item.zone === 'left' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => updateHeaderItem(item.id, 'zone', 'left')}
                                  className={`flex-1 h-8 text-xs ${item.zone === 'left' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                                >
                                  Left
                                </Button>
                                <Button 
                                  variant={item.zone === 'center' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => updateHeaderItem(item.id, 'zone', 'center')}
                                  className={`flex-1 h-8 text-xs ${item.zone === 'center' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                                >
                                  Center
                                </Button>
                                <Button 
                                  variant={item.zone === 'right' ? 'default' : 'outline'} 
                                  size="sm" 
                                  onClick={() => updateHeaderItem(item.id, 'zone', 'right')}
                                  className={`flex-1 h-8 text-xs ${item.zone === 'right' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                                >
                                  Right
                                </Button>
                             </div>
                           </div>

                           <div className="mb-3">
                             <Label className="text-gray-500 text-[10px] block mb-1">Icon Spacing</Label>
                             <NumberSlider 
                                value={item.iconSpacing || 12} 
                                onChange={(v) => updateHeaderItem(item.id, 'iconSpacing', v)}
                                max={50}
                                unit="px"
                             />
                           </div>
                           
                           <div className="mb-3">
                             <Label className="text-gray-500 text-[10px] block mb-1">User Visibility</Label>
                             <div className="flex bg-[#121726] rounded p-1 border border-gray-700">
                               <button onClick={() => updateHeaderItem(item.id, 'visibility', 'loggedIn')} className={`flex-1 text-[10px] py-1 rounded ${item.visibility === 'loggedIn' ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}>In</button>
                               <button onClick={() => updateHeaderItem(item.id, 'visibility', 'loggedOut')} className={`flex-1 text-[10px] py-1 rounded ${item.visibility === 'loggedOut' ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}>Out</button>
                               <button onClick={() => updateHeaderItem(item.id, 'visibility', 'both')} className={`flex-1 text-[10px] py-1 rounded ${(!item.visibility || item.visibility === 'both') ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}>Both</button>
                             </div>
                           </div>
                        </div>

                        {/* Design Section */}
                        <div className="border-t border-gray-700 pt-4 mt-4">
                           <Label className="text-gray-300 text-[10px] uppercase font-bold mb-3 block">Design</Label>
                           
                           <div className="mb-3">
                             <Label className="text-gray-500 text-[10px] block mb-1">Icon Size</Label>
                             <NumberSlider 
                                value={item.iconSize || 20} 
                                onChange={(v) => updateHeaderItem(item.id, 'iconSize', v)}
                                min={12}
                                max={48}
                                unit="px"
                             />
                           </div>

                           <div className="mb-3 space-y-2">
                             <ColorInput label="Icon Color" value={item.iconColor} onChange={(v) => updateHeaderItem(item.id, 'iconColor', v)} />
                             <ColorInput label="Background Color" value={item.backgroundColor} onChange={(v) => updateHeaderItem(item.id, 'backgroundColor', v)} />
                           </div>

                           {/* Padding */}
                           <div className="mb-3">
                             <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Padding (Inside Icon)</Label></div>
                             <div className="grid grid-cols-4 gap-1">
                               <Input placeholder="T" value={item.paddingTop || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="R" value={item.paddingRight || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="B" value={item.paddingBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="L" value={item.paddingLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'paddingLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                             </div>
                           </div>
                           
                           {/* Radius */}
                           <div className="mb-3">
                             <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Border Radius</Label></div>
                             <div className="grid grid-cols-4 gap-1">
                               <Input placeholder="TL" value={item.borderRadiusTop || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="TR" value={item.borderRadiusRight || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="BR" value={item.borderRadiusBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="BL" value={item.borderRadiusLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'borderRadiusLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                             </div>
                           </div>

                           {/* Margin */}
                           <div className="mb-3">
                             <div className="flex justify-between mb-1"><Label className="text-gray-500 text-[10px]">Margin (Group)</Label></div>
                             <div className="grid grid-cols-4 gap-1">
                               <Input placeholder="T" value={item.marginTop || 0} onChange={(e) => updateHeaderItem(item.id, 'marginTop', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="R" value={item.marginRight || 0} onChange={(e) => updateHeaderItem(item.id, 'marginRight', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="B" value={item.marginBottom || 0} onChange={(e) => updateHeaderItem(item.id, 'marginBottom', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                               <Input placeholder="L" value={item.marginLeft || 0} onChange={(e) => updateHeaderItem(item.id, 'marginLeft', parseInt(e.target.value))} className="bg-[#121726] border-gray-700 text-white h-6 text-xs px-1 text-center" />
                             </div>
                           </div>
                        </div>
                      </>
                    )}
                    </div>
                    ))}
        </div>
      </>
    );
  }

  if (element.type === 'Footer') {
    const children = element.props.children || [];
    const rows = element.props.rows || {
        top: { enabled: false, backgroundColor: 'transparent', padding: 16 },
        main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
        bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
    };

    const updateFooterItem = (itemId, keyOrObj, value) => {
      const updated = children.map(c => {
        if (c.id === itemId) {
           if (typeof keyOrObj === 'object' && keyOrObj !== null) {
              return { ...c, ...keyOrObj };
           }
           return { ...c, [keyOrObj]: value };
        }
        return c;
      });
      updateProp('children', updated);
    };

    const removeFooterItem = (itemId) => {
        updateProp('children', children.filter(c => c.id !== itemId));
    };

    const addFooterItem = (type, targetRow = 'main') => {
        const newItem = {
            id: `${type.toLowerCase()}-${Date.now()}`,
            type,
            row: targetRow,
            zone: 'center',
            ...(type === 'BrandBlock' && { logoType: 'text', text: 'BRAND', fontSize: 24, fontWeight: 'bold', color: '#ffffff', bio: 'Short bio...', bioColor: '#9CA3AF', zone: 'left' }),
            ...(type === 'FooterMenu' && { items: [{ label: 'Link 1', link: '#' }, { label: 'Link 2', link: '#' }], textColor: '#D1D5DB', layout: 'vertical' }),
            ...(type === 'Social' && { socialIcons: [{ network: 'Instagram', url: '#' }, { network: 'Twitter', url: '#' }], iconColor: '#ffffff', iconSize: 20, zone: 'right' }),
            ...(type === 'Copyright' && { text: '© 2025 Brand. All rights reserved.', textColor: '#6B7280', fontSize: 12, zone: 'left' }),
            ...(type === 'LegalLinks' && { items: [{ label: 'Privacy', link: '#' }, { label: 'Terms', link: '#' }], textColor: '#6B7280', fontSize: 12, zone: 'right' }),
            ...(type === 'Newsletter' && { title: 'Join our newsletter', placeholder: 'Your email', buttonText: 'Subscribe', zone: 'center' }),
            ...(type === 'Button' && { label: 'Get Started', href: '#', backgroundColor: '#4368D9', color: '#ffffff', zone: 'center', borderRadius: 6, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontSize: 14 }),
        };
        const newChildren = [...children, newItem];
        updateProp('children', newChildren);
        
        // Auto-select the new item
        if (setSelectedElement) {
            // We use a timeout to allow the prop update to propagate first, then focus
            setTimeout(() => {
                setSelectedElement(prev => ({ ...prev, _focusId: newItem.id }));
            }, 50);
        }
    };

    const updateRowConfig = (rowKey, key, value) => {
        const newRows = { ...rows, [rowKey]: { ...rows[rowKey], [key]: value } };
        updateProp('rows', newRows);
    };

    // --- Advanced Widgets Helpers (Bands & Areas) ---
    const widgetBands = element.props.widgetBands || [];
    // Determine active band and area
    let activeBandId = widgetBands[0]?.id;
    let activeAreaId = null;

    if (element._focusId) {
      if (element._focusId.startsWith('band-')) {
        // Could be 'band-1' or 'band-1-area-1'
        const parts = element._focusId.split('-area-');
        if (parts.length > 1) {
           activeBandId = parts[0]; // e.g. band-1
           activeAreaId = element._focusId; // e.g. band-1-area-1
        } else {
           activeBandId = element._focusId;
        }
      }
    }
    
    const activeBand = widgetBands.find(b => b.id === activeBandId) || widgetBands[0];
    // If no specific area selected, default to first in band
    const activeArea = activeAreaId 
      ? activeBand?.areas.find(a => a.id === activeAreaId) 
      : (activeBand?.areas[0] || null);

    const updateBand = (bandId, key, value) => {
        const newBands = widgetBands.map(b => 
            b.id === bandId ? { ...b, [key]: value } : b
        );
        updateProp('widgetBands', newBands);
    };

    const updateArea = (bandId, areaId, key, value) => {
        const newBands = widgetBands.map(b => {
            if (b.id !== bandId) return b;
            return {
                ...b,
                areas: b.areas.map(a => a.id === areaId ? { ...a, [key]: value } : a)
            };
        });
        updateProp('widgetBands', newBands);
    };

    const addWidgetContent = (bandId, areaId, type) => {
        const newItem = {
            id: `${type.toLowerCase()}-${Date.now()}`,
            type,
            ...(type === 'BrandBlock' && { logoType: 'text', text: 'BRAND', fontSize: 24, fontWeight: 'bold', color: '#ffffff', bio: 'Short bio...', bioColor: '#9CA3AF' }),
            ...(type === 'FooterMenu' && { items: [{ label: 'Link 1', link: '#' }, { label: 'Link 2', link: '#' }], textColor: '#D1D5DB', layout: 'vertical' }),
            ...(type === 'Social' && { socialIcons: [{ network: 'Instagram', url: '#' }, { network: 'Twitter', url: '#' }], iconColor: '#ffffff', iconSize: 20 }),
            ...(type === 'Copyright' && { text: '© 2025 Brand. All rights reserved.', textColor: '#6B7280', fontSize: 12 }),
            ...(type === 'LegalLinks' && { items: [{ label: 'Privacy', link: '#' }, { label: 'Terms', link: '#' }], textColor: '#6B7280', fontSize: 12 }),
            ...(type === 'Newsletter' && { title: 'Subscribe', placeholder: 'Your email', buttonText: 'Join' }),
            ...(type === 'Button' && { label: 'Click Me', href: '#', backgroundColor: '#4368D9', color: '#ffffff', borderRadius: 6, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontSize: 14 }),
        };

        const newBands = widgetBands.map(b => {
            if (b.id !== bandId) return b;
            return {
                ...b,
                areas: b.areas.map(a => a.id === areaId ? { ...a, children: [...(a.children || []), newItem] } : a)
            };
        });
        updateProp('widgetBands', newBands);
        
        // Auto select
        if (setSelectedElement) {
            setTimeout(() => {
                setSelectedElement(prev => ({ ...prev, _focusId: newItem.id }));
            }, 50);
        }
    };

    const updateWidgetContentItem = (bandId, areaId, itemId, key, value) => {
        const newBands = widgetBands.map(b => {
            if (b.id !== bandId) return b;
            return {
                ...b,
                areas: b.areas.map(a => {
                    if (a.id !== areaId) return a;
                    return {
                        ...a,
                        children: a.children.map(c => c.id === itemId ? { ...c, [key]: value } : c)
                    };
                })
            };
        });
        updateProp('widgetBands', newBands);
    };

    const removeWidgetContentItem = (bandId, areaId, itemId) => {
        const newBands = widgetBands.map(b => {
            if (b.id !== bandId) return b;
            return {
                ...b,
                areas: b.areas.map(a => {
                    if (a.id !== areaId) return a;
                    return {
                        ...a,
                        children: a.children.filter(c => c.id !== itemId)
                    };
                })
            };
        });
        updateProp('widgetBands', newBands);
    };

    const switchToMode = (mode) => {
        if (mode === element.props.layoutMode) return;
        if (window.confirm(`Switching to ${mode === 'simple' ? 'Simple Rows' : 'Advanced Widgets'} mode? Layouts are separate and switching changes which one is visible.`)) {
            updateProp('layoutMode', mode);
            // Initialize defaults if missing
            if (mode === 'widgets' && (!element.props.widgetBands || element.props.widgetBands.length === 0)) {
                updateProp('widgetBands', [
                    { id: 'band-1', name: 'Band 1', backgroundColor: 'transparent', padding: 24, areas: [{ id: 'band-1-area-1', name: 'Area 1', children: [] }, { id: 'band-1-area-2', name: 'Area 2', children: [] }, { id: 'band-1-area-3', name: 'Area 3', children: [] }] },
                    { id: 'band-2', name: 'Band 2', backgroundColor: 'transparent', padding: 24, areas: [{ id: 'band-2-area-1', name: 'Area 1', children: [] }, { id: 'band-2-area-2', name: 'Area 2', children: [] }, { id: 'band-2-area-3', name: 'Area 3', children: [] }] },
                    { id: 'band-3', name: 'Band 3', backgroundColor: 'transparent', padding: 24, areas: [{ id: 'band-3-area-1', name: 'Area 1', children: [] }, { id: 'band-3-area-2', name: 'Area 2', children: [] }, { id: 'band-3-area-3', name: 'Area 3', children: [] }] },
                    { id: 'band-4', name: 'Band 4', backgroundColor: 'transparent', padding: 24, areas: [{ id: 'band-4-area-1', name: 'Area 1', children: [] }, { id: 'band-4-area-2', name: 'Area 2', children: [] }, { id: 'band-4-area-3', name: 'Area 3', children: [] }] }
                ]);
            }
        }
    };

    return (
        <>
            <PropertyField label="Layout Mode">
                <div className="flex gap-2 mb-4">
                    <Button 
                        variant={element.props.layoutMode === 'simple' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => switchToMode('simple')}
                        className={`flex-1 h-7 text-xs ${element.props.layoutMode === 'simple' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                    >
                        Rows (Simple)
                    </Button>
                    <Button 
                        variant={element.props.layoutMode === 'widgets' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => switchToMode('widgets')}
                        className={`flex-1 h-7 text-xs ${element.props.layoutMode === 'widgets' ? 'bg-[#4368D9] text-white' : 'bg-transparent text-gray-400 border-gray-700'}`}
                    >
                        Widgets (Adv)
                    </Button>
                </div>
            </PropertyField>

            {element.props.layoutMode === 'widgets' ? (
                <>
                    {/* Band Selector */}
                    <div className="flex gap-1 bg-[#1A1F2E] p-1 rounded-lg mb-4 border border-gray-800 overflow-x-auto">
                        {widgetBands.map((band, idx) => (
                            <button
                                key={band.id}
                                onClick={() => {
                                    if (setSelectedElement) {
                                        setSelectedElement(prev => ({ ...prev, _focusId: band.id }));
                                    }
                                }}
                                className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                                    activeBand.id === band.id
                                    ? 'bg-[#4368D9] text-white shadow-sm' 
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                Band {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="bg-[#1A1F2E] p-4 rounded-lg border border-gray-800 mb-6 transition-all" style={{ boxShadow: '0 0 0 1px #4368D9' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{activeBand?.name} SETTINGS</h4>
                        </div>

                        {/* Band Background */}
                        <div className="bg-[#121726] p-3 rounded-lg border border-gray-800 mb-4">
                            <Label className="text-xs font-semibold text-white mb-3 block">Band Background</Label>
                            <BackgroundSettings 
                                values={{
                                    mode: activeBand?.backgroundMode || (activeBand?.backgroundImage ? 'image' : 'color'),
                                    color: activeBand?.backgroundColor,
                                    imageSrc: activeBand?.backgroundImage,
                                    gradientColor1: activeBand?.gradientColor1,
                                    gradientColor2: activeBand?.gradientColor2,
                                    gradientType: activeBand?.gradientType,
                                    gradientAngle: activeBand?.gradientAngle,
                                    imageSize: activeBand?.imageSize,
                                    imageRepeat: activeBand?.imageRepeat,
                                    imagePosition: activeBand?.imagePosition,
                                    overlayColor: activeBand?.overlayColor,
                                    overlayOpacity: activeBand?.overlayOpacity,
                                }}
                                onChange={(newValues) => {
                                    updateBand(activeBand.id, 'backgroundMode', newValues.mode);
                                    updateBand(activeBand.id, 'backgroundColor', newValues.color);
                                    updateBand(activeBand.id, 'backgroundImage', newValues.imageSrc);
                                    updateBand(activeBand.id, 'gradientColor1', newValues.gradientColor1);
                                    updateBand(activeBand.id, 'gradientColor2', newValues.gradientColor2);
                                    updateBand(activeBand.id, 'gradientType', newValues.gradientType);
                                    updateBand(activeBand.id, 'gradientAngle', newValues.gradientAngle);
                                    updateBand(activeBand.id, 'imageSize', newValues.imageSize);
                                    updateBand(activeBand.id, 'imageRepeat', newValues.imageRepeat);
                                    updateBand(activeBand.id, 'imagePosition', newValues.imagePosition);
                                    updateBand(activeBand.id, 'overlayColor', newValues.overlayColor);
                                    updateBand(activeBand.id, 'overlayOpacity', newValues.overlayOpacity);
                                }}
                            />
                            <div className="mt-2">
                                <Label className="text-[10px] text-gray-500 mb-1 block">Padding Y</Label>
                                <Input 
                                    type="number" 
                                    value={activeBand?.padding || 0} 
                                    onChange={(e) => updateBand(activeBand.id, 'padding', parseInt(e.target.value))}
                                    className="h-7 bg-[#121726] border-gray-700 text-xs"
                                />
                            </div>
                        </div>

                        {/* Widget Areas List */}
                        <Label className="text-xs text-gray-400 mb-2 block">Widget Areas (3 Columns)</Label>
                        <div className="space-y-4">
                            {activeBand?.areas.map((area, areaIdx) => (
                                <div key={area.id} className={`border border-gray-700 rounded-lg overflow-hidden ${activeArea?.id === area.id ? 'ring-1 ring-[#4368D9]' : ''}`}>
                                    <div 
                                        className="bg-[#121726] p-2 flex justify-between items-center cursor-pointer hover:bg-[#1A1F2E]"
                                        onClick={() => {
                                            if (setSelectedElement) {
                                                setSelectedElement(prev => ({ ...prev, _focusId: area.id }));
                                            }
                                        }}
                                    >
                                        <span className="text-xs font-medium text-gray-300">Area {areaIdx + 1}</span>
                                        <div className="flex gap-1">
                                            {/* Add Button */}
                                            <Button size="icon" variant="ghost" className="h-5 w-5 text-[#4368D9]" title="Add Content">
                                                <Plus size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    {/* Area Settings (only if active) */}
                                    {activeArea?.id === area.id && (
                                        <div className="p-3 bg-[#0D0F12]">
                                            <div className="mb-3">
                                                <Label className="text-[10px] text-gray-500 mb-1">Add Content</Label>
                                                <div className="grid grid-cols-3 gap-1">
                                                    {['BrandBlock', 'FooterMenu', 'Social', 'Newsletter', 'Copyright', 'LegalLinks', 'Button'].map(type => (
                                                        <Button 
                                                            key={type} 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={(e) => { e.stopPropagation(); addWidgetContent(activeBand.id, area.id, type); }}
                                                            className="h-6 text-[9px] px-1 bg-[#1A1F2E] border-gray-700 hover:text-white"
                                                        >
                                                            {type.replace('Block', '').replace('Footer', '').replace('Links', '')}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Children List */}
                                            <div className="space-y-2">
                                                {(area.children || []).map(child => (
                                                    <div key={child.id} className="bg-[#1A1F2E] p-2 rounded border border-gray-800">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{child.type}</span>
                                                            <Button size="icon" variant="ghost" onClick={() => removeWidgetContentItem(activeBand.id, area.id, child.id)} className="h-4 w-4 text-red-400"><X size={10} /></Button>
                                                        </div>
                                                        {/* Simplified inputs for child */}
                                                        {child.type === 'BrandBlock' && <Input value={child.text} onChange={(e) => updateWidgetContentItem(activeBand.id, area.id, child.id, 'text', e.target.value)} className="h-6 text-[10px] bg-[#0D0F12]" />}
                                                        {child.type === 'Button' && <Input value={child.label} onChange={(e) => updateWidgetContentItem(activeBand.id, area.id, child.id, 'label', e.target.value)} className="h-6 text-[10px] bg-[#0D0F12]" />}
                                                        {child.type === 'Newsletter' && <Input value={child.title} onChange={(e) => updateWidgetContentItem(activeBand.id, area.id, child.id, 'title', e.target.value)} className="h-6 text-[10px] bg-[#0D0F12]" />}
                                                        {(child.type === 'FooterMenu' || child.type === 'LegalLinks') && (
                                                            <div className="space-y-1">
                                                                {(child.items || []).map((link, lIdx) => (
                                                                    <Input key={lIdx} value={link.label} onChange={(e) => {
                                                                        const newItems = [...child.items];
                                                                        newItems[lIdx].label = e.target.value;
                                                                        updateWidgetContentItem(activeBand.id, area.id, child.id, 'items', newItems);
                                                                    }} className="h-6 text-[10px] bg-[#0D0F12]" />
                                                                ))}
                                                                <Button size="sm" variant="ghost" className="w-full h-4 text-[9px]" onClick={() => {
                                                                    updateWidgetContentItem(activeBand.id, area.id, child.id, 'items', [...(child.items || []), { label: 'Link', link: '#' }]);
                                                                }}>+ Add Link</Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <PropertyField label="Footer Layout">
                        <div className="space-y-3 mb-4">
                            {['top', 'main', 'bottom'].map(rowKey => (
                                <div key={rowKey} id={`section-row-${rowKey}`} className="bg-[#1A1F2E] p-3 rounded border border-gray-800 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-xs uppercase text-gray-400">{rowKey} Row</Label>
                                        <input 
                                            type="checkbox" 
                                            checked={rows[rowKey].enabled} 
                                            onChange={(e) => updateRowConfig(rowKey, 'enabled', e.target.checked)}
                                            className="accent-[#4368D9]"
                                        />
                                    </div>
                                    {rows[rowKey].enabled && (
                                        <div className="grid grid-cols-2 gap-2">
                                            <ColorInput label="Bg Color" value={rows[rowKey].backgroundColor} onChange={(v) => updateRowConfig(rowKey, 'backgroundColor', v)} />
                                            <div>
                                                <Label className="text-[10px] text-gray-500 mb-1 block">Padding</Label>
                                                <Input 
                                                    type="number" 
                                                    value={rows[rowKey].padding} 
                                                    onChange={(e) => updateRowConfig(rowKey, 'padding', parseInt(e.target.value))}
                                                    className="h-7 bg-[#121726] border-gray-700 text-xs"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </PropertyField>

                    <div className="space-y-6">
                        {['top', 'main', 'bottom'].map(rowKey => {
                            if (!rows[rowKey].enabled) return null;
                            const rowChildren = children.filter(c => c.row === rowKey);
                            
                            return (
                                <div key={rowKey} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <Label className="text-xs font-bold text-[#4368D9] uppercase tracking-wider">{rowKey} Row Content</Label>
                                    </div>
                                    
                                    {/* Add Buttons per Row */}
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        <Button size="sm" onClick={() => addFooterItem('FooterMenu', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> Menu</Button>
                                        <Button size="sm" onClick={() => addFooterItem('Social', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> Social</Button>
                                        <Button size="sm" onClick={() => addFooterItem('Newsletter', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> News</Button>
                                        <Button size="sm" onClick={() => addFooterItem('Copyright', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> Copy</Button>
                                        {rowKey === 'main' && <Button size="sm" onClick={() => addFooterItem('BrandBlock', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> Brand</Button>}
                                        <Button size="sm" onClick={() => addFooterItem('LegalLinks', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> Legal</Button>
                                        <Button size="sm" onClick={() => addFooterItem('Button', rowKey)} className="bg-[#1A1F2E] hover:bg-white/10 border border-gray-700 h-6 text-[10px]"><Plus size={10} className="mr-1"/> Button</Button>
                                    </div>

                                    {/* List Items */}
                                    <div className="space-y-3">
                                        {rowChildren.length === 0 && (
                                            <div className="text-[10px] text-gray-500 italic p-2 text-center border border-dashed border-gray-800 rounded">
                                                No elements in {rowKey} row
                                            </div>
                                        )}
                                        {rowChildren.map(item => (
                                            <div key={item.id} id={`section-${item.id}`} className="bg-[#1A1F2E] p-3 rounded-lg border border-gray-800">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{item.type}</h4>
                                                    <div className="flex gap-1">
                                                        <Button size="icon" variant="ghost" onClick={() => removeFooterItem(item.id)} className="h-5 w-5 text-gray-400 hover:text-red-400"><X size={12} /></Button>
                                                    </div>
                                                </div>

                                                <div className="mb-3 grid grid-cols-2 gap-2">
                                                    <div>
                                                        <Label className="text-[10px] text-gray-500 mb-1 block">Zone</Label>
                                                        <Select value={item.zone} onValueChange={(v) => updateFooterItem(item.id, 'zone', v)}>
                                                            <SelectTrigger className="h-6 text-[10px] bg-[#121726] border-gray-700"><SelectValue /></SelectTrigger>
                                                            <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                                                <SelectItem value="left">Left</SelectItem>
                                                                <SelectItem value="center">Center</SelectItem>
                                                                <SelectItem value="right">Right</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className="text-[10px] text-gray-500 mb-1 block">Row</Label>
                                                        <Select value={item.row} onValueChange={(v) => updateFooterItem(item.id, 'row', v)}>
                                                            <SelectTrigger className="h-6 text-[10px] bg-[#121726] border-gray-700"><SelectValue /></SelectTrigger>
                                                            <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                                                <SelectItem value="top">Top</SelectItem>
                                                                <SelectItem value="main">Main</SelectItem>
                                                                <SelectItem value="bottom">Bottom</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                {/* Specific Item Settings */}
                                                {item.type === 'BrandBlock' && (
                                                    <>
                                                        <Input value={item.text} onChange={(e) => updateFooterItem(item.id, 'text', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" placeholder="Brand Name" />
                                                        <Textarea value={item.bio} onChange={(e) => updateFooterItem(item.id, 'bio', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2" placeholder="Short bio..." rows={2} />
                                                        <ColorInput label="Text Color" value={item.color} onChange={(v) => updateFooterItem(item.id, 'color', v)} />
                                                    </>
                                                )}

                                                {(item.type === 'FooterMenu' || item.type === 'LegalLinks') && (
                                                    <>
                                                        <div className="mb-2 max-h-32 overflow-y-auto">
                                                            {(item.items || []).map((link, idx) => (
                                                                <div key={idx} className="flex gap-2 mb-2">
                                                                    <Input value={link.label} onChange={(e) => {
                                                                        const newItems = [...item.items];
                                                                        newItems[idx].label = e.target.value;
                                                                        updateFooterItem(item.id, 'items', newItems);
                                                                    }} className="h-6 text-[10px] bg-[#121726] border-gray-700" placeholder="Label" />
                                                                    <Input value={link.link} onChange={(e) => {
                                                                        const newItems = [...item.items];
                                                                        newItems[idx].link = e.target.value;
                                                                        updateFooterItem(item.id, 'items', newItems);
                                                                    }} className="h-6 text-[10px] bg-[#121726] border-gray-700" placeholder="#" />
                                                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400" onClick={() => {
                                                                        updateFooterItem(item.id, 'items', item.items.filter((_, i) => i !== idx));
                                                                    }}><X size={10} /></Button>
                                                                </div>
                                                            ))}
                                                            <Button size="sm" variant="outline" className="w-full h-5 text-[10px] border-dashed" onClick={() => {
                                                                updateFooterItem(item.id, 'items', [...(item.items || []), { label: 'New Link', link: '#' }]);
                                                            }}>+ Add Link</Button>
                                                        </div>
                                                        <ColorInput label="Link Color" value={item.textColor} onChange={(v) => updateFooterItem(item.id, 'textColor', v)} />
                                                        
                                                        {item.type === 'FooterMenu' && (
                                                            <div className="mt-2">
                                                                <Label className="text-[10px] text-gray-500 mb-1 block">Layout</Label>
                                                                <div className="flex bg-[#121726] rounded p-1 border border-gray-700">
                                                                    <button onClick={() => updateFooterItem(item.id, 'layout', 'vertical')} className={`flex-1 text-[10px] py-1 rounded ${item.layout === 'vertical' ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}>Vertical</button>
                                                                    <button onClick={() => updateFooterItem(item.id, 'layout', 'horizontal')} className={`flex-1 text-[10px] py-1 rounded ${item.layout === 'horizontal' ? 'bg-[#4368D9] text-white' : 'text-gray-400'}`}>Horizontal</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                                {item.type === 'Social' && (
                                                    <>
                                                        <Label className="text-gray-500 text-[10px] mb-1 block">Icons</Label>
                                                        <div className="mb-2 max-h-32 overflow-y-auto">
                                                            {(item.socialIcons || []).map((icon, idx) => (
                                                                <div key={idx} className="flex gap-2 mb-2">
                                                                    <Select value={icon.network} onValueChange={(v) => {
                                                                        const newIcons = [...item.socialIcons];
                                                                        newIcons[idx].network = v;
                                                                        updateFooterItem(item.id, 'socialIcons', newIcons);
                                                                    }}>
                                                                        <SelectTrigger className="h-6 text-[10px] bg-[#121726] border-gray-700 w-20"><SelectValue /></SelectTrigger>
                                                                        <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                                                            {['Facebook', 'Instagram', 'Twitter', 'Linkedin', 'Youtube'].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Input value={icon.url} onChange={(e) => {
                                                                        const newIcons = [...item.socialIcons];
                                                                        newIcons[idx].url = e.target.value;
                                                                        updateFooterItem(item.id, 'socialIcons', newIcons);
                                                                    }} className="h-6 text-[10px] bg-[#121726] border-gray-700 flex-1" placeholder="URL" />
                                                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-red-400" onClick={() => {
                                                                        updateFooterItem(item.id, 'socialIcons', item.socialIcons.filter((_, i) => i !== idx));
                                                                    }}><X size={10} /></Button>
                                                                </div>
                                                            ))}
                                                            <Button size="sm" variant="outline" className="w-full h-5 text-[10px] border-dashed" onClick={() => {
                                                                updateFooterItem(item.id, 'socialIcons', [...(item.socialIcons || []), { network: 'Instagram', url: '#' }]);
                                                            }}>+ Add Icon</Button>
                                                        </div>
                                                        <ColorInput label="Icon Color" value={item.iconColor} onChange={(v) => updateFooterItem(item.id, 'iconColor', v)} />
                                                    </>
                                                )}

                                                {item.type === 'Copyright' && (
                                                    <>
                                                        <Input value={item.text} onChange={(e) => updateFooterItem(item.id, 'text', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" />
                                                        <ColorInput label="Text Color" value={item.textColor} onChange={(v) => updateFooterItem(item.id, 'textColor', v)} />
                                                    </>
                                                )}

                                                {item.type === 'Newsletter' && (
                                                    <>
                                                        <Input value={item.title} onChange={(e) => updateFooterItem(item.id, 'title', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" placeholder="Title" />
                                                        <Input value={item.placeholder} onChange={(e) => updateFooterItem(item.id, 'placeholder', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" placeholder="Placeholder" />
                                                        <Input value={item.buttonText} onChange={(e) => updateFooterItem(item.id, 'buttonText', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" placeholder="Button Text" />
                                                    </>
                                                )}

                                                {item.type === 'Button' && (
                                                    <>
                                                        <Input value={item.label} onChange={(e) => updateFooterItem(item.id, 'label', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" placeholder="Label" />
                                                        <Input value={item.href} onChange={(e) => updateFooterItem(item.id, 'href', e.target.value)} className="bg-[#121726] border-gray-700 text-xs mb-2 h-7" placeholder="Link (https://)" />
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <ColorInput label="Text" value={item.color} onChange={(v) => updateFooterItem(item.id, 'color', v)} />
                                                            <ColorInput label="Bg" value={item.backgroundColor} onChange={(v) => updateFooterItem(item.id, 'backgroundColor', v)} />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                                            <div>
                                                                <Label className="text-[10px] text-gray-500 mb-1 block">Radius</Label>
                                                                <Input 
                                                                    type="number" 
                                                                    value={item.borderRadius || 6} 
                                                                    onChange={(e) => updateFooterItem(item.id, 'borderRadius', parseInt(e.target.value))}
                                                                    className="h-7 bg-[#121726] border-gray-700 text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-[10px] text-gray-500 mb-1 block">Font Size</Label>
                                                                <Input 
                                                                    type="number" 
                                                                    value={item.fontSize || 14} 
                                                                    onChange={(e) => updateFooterItem(item.id, 'fontSize', parseInt(e.target.value))}
                                                                    className="h-7 bg-[#121726] border-gray-700 text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Label className="text-[10px] text-gray-500 mb-1 block">Padding (X / Y)</Label>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <Input 
                                                                    placeholder="X"
                                                                    type="number"
                                                                    value={item.paddingLeft || 20} 
                                                                    onChange={(e) => {
                                                                        const val = parseInt(e.target.value);
                                                                        const newItem = { ...item, paddingLeft: val, paddingRight: val };
                                                                        const updated = children.map(c => c.id === item.id ? newItem : c);
                                                                        updateProp('children', updated);
                                                                    }}
                                                                    className="h-7 bg-[#121726] border-gray-700 text-xs"
                                                                />
                                                                <Input 
                                                                    placeholder="Y"
                                                                    type="number"
                                                                    value={item.paddingTop || 10} 
                                                                    onChange={(e) => {
                                                                        const val = parseInt(e.target.value);
                                                                        const newItem = { ...item, paddingTop: val, paddingBottom: val };
                                                                        const updated = children.map(c => c.id === item.id ? newItem : c);
                                                                        updateProp('children', updated);
                                                                    }}
                                                                    className="h-7 bg-[#121726] border-gray-700 text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <Settings className="w-12 h-12 text-gray-600 mx-auto mb-3" />
      <p style={{ fontSize: '13px', color: '#6B7280' }}>Content properties for {element.type}</p>
    </div>
  );
};

const StyleTab = ({ element, updateProp }) => {
  const [activeFooterRow, setActiveFooterRow] = React.useState('main');

  React.useEffect(() => {
    if (element.type === 'Footer' && element._focusId && element._focusId.startsWith('row-')) {
        const row = element._focusId.replace('row-', '');
        if (['top', 'main', 'bottom'].includes(row)) {
            setActiveFooterRow(row);
        }
    }
  }, [element._focusId, element.type]);

  const updateFooterRow = (key, value) => {
      const rows = element.props.rows || {
          top: { enabled: false, backgroundColor: 'transparent', padding: 16 },
          main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
          bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
      };
      const currentRow = rows[activeFooterRow] || {};
      const newRows = {
          ...rows,
          [activeFooterRow]: { ...currentRow, [key]: value }
      };
      updateProp('rows', newRows);
  };

  // TEXT: Complete isolated section (matches Heading)
  if (element.type === 'Text') {
    return (
      <>
        {/* Text Box Toggle */}
        <div style={{ marginBottom: '24px', padding: '12px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label className="text-gray-300 text-xs font-medium">Enable Text Box</Label>
            <input
              type="checkbox"
              checked={element.props.textBox || false}
              onChange={(e) => updateProp('textBox', e.target.checked)}
              className="accent-[#4368D9]"
            />
          </div>
          <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
            Enable to apply background, border, and shadow styles
          </p>
        </div>

        {/* Typography - Always Visible */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>TYPOGRAPHY</h4>
          <ColorInput label="Text Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />
          <NumberSlider 
            label="Font Size" 
            value={element.props.fontSize || 16} 
            onChange={(v) => updateProp('fontSize', v)} 
            min={12} 
            max={96} 
            unit="px" 
          />
          <PropertyField label="Font Weight">
            <Select value={element.props.fontWeight || '400'} onValueChange={(v) => updateProp('fontWeight', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="300">Light</SelectItem>
                <SelectItem value="400">Regular</SelectItem>
                <SelectItem value="500">Medium</SelectItem>
                <SelectItem value="600">SemiBold</SelectItem>
                <SelectItem value="700">Bold</SelectItem>
                <SelectItem value="800">ExtraBold</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
          <PropertyField label="Text Align">
            <Select value={element.props.textAlign || 'left'} onValueChange={(v) => updateProp('textAlign', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="justify">Justify</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
          <NumberSlider 
            label="Line Height" 
            value={element.props.lineHeight || 1.6} 
            onChange={(v) => updateProp('lineHeight', v)} 
            min={0.8} 
            max={2.5} 
            step={0.1}
          />
          <NumberSlider 
            label="Letter Spacing" 
            value={element.props.letterSpacing || 0} 
            onChange={(v) => updateProp('letterSpacing', v)} 
            min={-2} 
            max={10} 
            step={0.5}
            unit="px" 
          />
        </div>

        {/* Layout */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LAYOUT</h4>
          <PropertyField label="Block Position">
            <Select value={element.props.blockAlignment || 'left'} onValueChange={(v) => updateProp('blockAlignment', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
        </div>

        {/* Spacing - Conditional Visibility */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
          
          {element.props.textBox && (
            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} />
          )}
          
          <SpacingInputs type="margin" props={element.props} updateProp={updateProp} />
        </div>

        {/* Background - Only if Text Box Enabled */}
        {element.props.textBox && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BACKGROUND</h4>
            <BackgroundSettings 
              values={{
                mode: element.props.backgroundMode || 'color',
                color: element.props.backgroundColor,
                imageSrc: element.props.backgroundImage,
                gradientColor1: element.props.gradientColor1,
                gradientColor2: element.props.gradientColor2,
                gradientType: element.props.gradientType,
                gradientAngle: element.props.gradientAngle,
                imageSize: element.props.imageSize,
                imageRepeat: element.props.imageRepeat,
                imagePosition: element.props.imagePosition,
                overlayColor: element.props.overlayColor,
                overlayOpacity: element.props.overlayOpacity,
              }}
              onChange={(newValues) => {
                updateProp('backgroundMode', newValues.mode);
                updateProp('backgroundColor', newValues.color);
                updateProp('backgroundImage', newValues.imageSrc);
                updateProp('gradientColor1', newValues.gradientColor1);
                updateProp('gradientColor2', newValues.gradientColor2);
                updateProp('gradientType', newValues.gradientType);
                updateProp('gradientAngle', newValues.gradientAngle);
                updateProp('imageSize', newValues.imageSize);
                updateProp('imageRepeat', newValues.imageRepeat);
                updateProp('imagePosition', newValues.imagePosition);
                updateProp('overlayColor', newValues.overlayColor);
                updateProp('overlayOpacity', newValues.overlayOpacity);
              }}
            />
          </div>
        )}

        {/* Border - Only if Text Box Enabled */}
        {element.props.textBox && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BORDER</h4>
            <ColorInput label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
            <NumberSlider 
              label="Border Width" 
              value={element.props.borderWidth || 0} 
              onChange={(v) => updateProp('borderWidth', v)} 
              max={20} 
              unit="px" 
            />
            <PropertyField label="Border Style">
              <Select value={element.props.borderStyle || 'solid'} onValueChange={(v) => updateProp('borderStyle', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
            <NumberSlider 
              label="Border Radius" 
              value={element.props.borderRadius || 0} 
              onChange={(v) => updateProp('borderRadius', v)} 
              max={50} 
              unit="px" 
            />
          </div>
        )}

        {/* Effects - Only if Text Box Enabled */}
        {element.props.textBox && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
            <NumberSlider 
              label="Opacity" 
              value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
              onChange={(v) => updateProp('opacity', v / 100)} 
              max={100} 
              unit="%" 
            />
            <PropertyField label="Box Shadow">
              <Input
                value={element.props.boxShadow || ''}
                onChange={(e) => updateProp('boxShadow', e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </div>
        )}
      </>
    );
  }

  // IMAGE: Complete isolated section (matches Heading/Text)
  if (element.type === 'Image') {
    return (
      <>
        {/* Dimensions */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>DIMENSIONS</h4>
          
          <PropertyField label="Width Mode">
            <Select value={element.props.widthMode || 'auto'} onValueChange={(v) => updateProp('widthMode', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="px">Pixels</SelectItem>
                <SelectItem value="%">Percent</SelectItem>
                <SelectItem value="full">Full Width</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>

          {['px', '%'].includes(element.props.widthMode) && (
            <NumberSlider 
              label="Width" 
              value={element.props.width || 100} 
              onChange={(v) => updateProp('width', v)} 
              max={element.props.widthMode === '%' ? 100 : 2000} 
              unit={element.props.widthMode === '%' ? '%' : 'px'} 
            />
          )}

          <PropertyField label="Height Mode">
            <Select value={element.props.heightMode || 'auto'} onValueChange={(v) => updateProp('heightMode', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="px">Pixels</SelectItem>
                <SelectItem value="vh">Viewport Height</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>

          {element.props.heightMode !== 'auto' && (
            <NumberSlider 
              label="Height" 
              value={element.props.height || 100} 
              onChange={(v) => updateProp('height', v)} 
              max={element.props.heightMode === 'vh' ? 100 : 2000} 
              unit={element.props.heightMode === 'vh' ? 'vh' : 'px'} 
            />
          )}

          <PropertyField label="Object Fit">
            <Select value={element.props.objectFit || 'cover'} onValueChange={(v) => updateProp('objectFit', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="scale-down">Scale Down</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>

          <PropertyField label="Object Position">
            <Select value={element.props.objectPosition || 'center'} onValueChange={(v) => updateProp('objectPosition', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="top left">Top Left</SelectItem>
                <SelectItem value="top right">Top Right</SelectItem>
                <SelectItem value="bottom left">Bottom Left</SelectItem>
                <SelectItem value="bottom right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>

          <PropertyField label="Alignment">
            <Select value={element.props.alignment || 'left'} onValueChange={(v) => updateProp('alignment', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
        </div>

        {/* Spacing */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
          <SpacingInputs type="padding" props={element.props} updateProp={updateProp} />
          <SpacingInputs type="margin" props={element.props} updateProp={updateProp} />
        </div>

        {/* Border */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BORDER</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Label className="text-gray-300 text-xs font-medium">Enable Border</Label>
            <input
              type="checkbox"
              checked={element.props.borderEnabled || false}
              onChange={(e) => updateProp('borderEnabled', e.target.checked)}
              className="accent-[#4368D9]"
            />
          </div>

          {element.props.borderEnabled && (
            <>
              <ColorInput label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
              <NumberSlider 
                label="Border Width" 
                value={element.props.borderWidth || 0} 
                onChange={(v) => updateProp('borderWidth', v)} 
                max={20} 
                unit="px" 
              />
              <PropertyField label="Border Style">
                <Select value={element.props.borderStyle || 'solid'} onValueChange={(v) => updateProp('borderStyle', v)}>
                  <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121726] border-gray-700 text-white">
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                  </SelectContent>
                </Select>
              </PropertyField>
            </>
          )}

          <NumberSlider 
            label="Border Radius" 
            value={element.props.borderRadius || 0} 
            onChange={(v) => updateProp('borderRadius', v)} 
            max={50} 
            unit="px" 
          />
        </div>

        {/* Effects */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
          
          <NumberSlider 
            label="Opacity" 
            value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
            onChange={(v) => updateProp('opacity', v / 100)} 
            max={100} 
            unit="%" 
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Label className="text-gray-300 text-xs font-medium">Enable Shadow</Label>
            <input
              type="checkbox"
              checked={element.props.shadowEnabled || false}
              onChange={(e) => updateProp('shadowEnabled', e.target.checked)}
              className="accent-[#4368D9]"
            />
          </div>

          {element.props.shadowEnabled && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div>
                  <Label className="text-gray-500 text-[10px] mb-2 block">X Offset</Label>
                  <Input
                    type="number"
                    value={element.props.shadowX || 0}
                    onChange={(e) => updateProp('shadowX', parseInt(e.target.value) || 0)}
                    className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <Label className="text-gray-500 text-[10px] mb-2 block">Y Offset</Label>
                  <Input
                    type="number"
                    value={element.props.shadowY || 4}
                    onChange={(e) => updateProp('shadowY', parseInt(e.target.value) || 0)}
                    className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <Label className="text-gray-500 text-[10px] mb-2 block">Blur</Label>
                  <Input
                    type="number"
                    value={element.props.shadowBlur || 6}
                    onChange={(e) => updateProp('shadowBlur', parseInt(e.target.value) || 0)}
                    className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <Label className="text-gray-500 text-[10px] mb-2 block">Spread</Label>
                  <Input
                    type="number"
                    value={element.props.shadowSpread || 0}
                    onChange={(e) => updateProp('shadowSpread', parseInt(e.target.value) || 0)}
                    className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>
              <PropertyField label="Shadow Color">
                <Input
                  value={element.props.shadowColor || 'rgba(0,0,0,0.1)'}
                  onChange={(e) => updateProp('shadowColor', e.target.value)}
                  placeholder="rgba(0,0,0,0.1)"
                  className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                />
              </PropertyField>
            </>
          )}

          <ColorInput label="Background Color" value={element.props.backgroundColor} onChange={(v) => updateProp('backgroundColor', v)} />
        </div>
      </>
    );
  }

  // HEADING: Complete isolated section
  if (element.type === 'Heading') {
    return (
      <>
        {/* Heading Box Toggle */}
        <div style={{ marginBottom: '24px', padding: '12px', backgroundColor: '#1A1F2E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label className="text-gray-300 text-xs font-medium">Enable Heading Box</Label>
            <input
              type="checkbox"
              checked={element.props.headingBox || false}
              onChange={(e) => updateProp('headingBox', e.target.checked)}
              className="accent-[#4368D9]"
            />
          </div>
          <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '4px' }}>
            Enable to apply background, border, and shadow styles
          </p>
        </div>

        {/* Typography - Always Visible */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>TYPOGRAPHY</h4>
          <ColorInput label="Text Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />
          <NumberSlider 
            label="Font Size" 
            value={element.props.fontSize || 32} 
            onChange={(v) => updateProp('fontSize', v)} 
            min={12} 
            max={96} 
            unit="px" 
          />
          <PropertyField label="Font Weight">
            <Select value={element.props.fontWeight || '600'} onValueChange={(v) => updateProp('fontWeight', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="300">Light</SelectItem>
                <SelectItem value="400">Regular</SelectItem>
                <SelectItem value="500">Medium</SelectItem>
                <SelectItem value="600">SemiBold</SelectItem>
                <SelectItem value="700">Bold</SelectItem>
                <SelectItem value="800">ExtraBold</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
          <PropertyField label="Text Align">
            <Select value={element.props.textAlign || 'left'} onValueChange={(v) => updateProp('textAlign', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="justify">Justify</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
          <NumberSlider 
            label="Line Height" 
            value={element.props.lineHeight || 1.2} 
            onChange={(v) => updateProp('lineHeight', v)} 
            min={0.8} 
            max={2.5} 
            step={0.1}
          />
          <NumberSlider 
            label="Letter Spacing" 
            value={element.props.letterSpacing || 0} 
            onChange={(v) => updateProp('letterSpacing', v)} 
            min={-2} 
            max={10} 
            step={0.5}
            unit="px" 
          />
        </div>

        {/* Layout */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LAYOUT</h4>
          <PropertyField label="Block Position">
            <Select value={element.props.blockAlignment || 'left'} onValueChange={(v) => updateProp('blockAlignment', v)}>
              <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </PropertyField>
        </div>

        {/* Spacing - Conditional Visibility */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
          
          {element.props.headingBox && (
            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} />
          )}
          
          <SpacingInputs type="margin" props={element.props} updateProp={updateProp} />
        </div>

        {/* Background - Only if Heading Box Enabled */}
        {element.props.headingBox && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BACKGROUND</h4>
            <BackgroundSettings 
              values={{
                mode: element.props.backgroundMode || 'color',
                color: element.props.backgroundColor,
                imageSrc: element.props.backgroundImage,
                gradientColor1: element.props.gradientColor1,
                gradientColor2: element.props.gradientColor2,
                gradientType: element.props.gradientType,
                gradientAngle: element.props.gradientAngle,
                imageSize: element.props.imageSize,
                imageRepeat: element.props.imageRepeat,
                imagePosition: element.props.imagePosition,
                overlayColor: element.props.overlayColor,
                overlayOpacity: element.props.overlayOpacity,
              }}
              onChange={(newValues) => {
                updateProp('backgroundMode', newValues.mode);
                updateProp('backgroundColor', newValues.color);
                updateProp('backgroundImage', newValues.imageSrc);
                updateProp('gradientColor1', newValues.gradientColor1);
                updateProp('gradientColor2', newValues.gradientColor2);
                updateProp('gradientType', newValues.gradientType);
                updateProp('gradientAngle', newValues.gradientAngle);
                updateProp('imageSize', newValues.imageSize);
                updateProp('imageRepeat', newValues.imageRepeat);
                updateProp('imagePosition', newValues.imagePosition);
                updateProp('overlayColor', newValues.overlayColor);
                updateProp('overlayOpacity', newValues.overlayOpacity);
              }}
            />
          </div>
        )}

        {/* Border - Only if Heading Box Enabled */}
        {element.props.headingBox && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BORDER</h4>
            <ColorInput label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
            <NumberSlider 
              label="Border Width" 
              value={element.props.borderWidth || 0} 
              onChange={(v) => updateProp('borderWidth', v)} 
              max={20} 
              unit="px" 
            />
            <PropertyField label="Border Style">
              <Select value={element.props.borderStyle || 'solid'} onValueChange={(v) => updateProp('borderStyle', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
            <NumberSlider 
              label="Border Radius" 
              value={element.props.borderRadius || 0} 
              onChange={(v) => updateProp('borderRadius', v)} 
              max={50} 
              unit="px" 
            />
          </div>
        )}

        {/* Effects - Only if Heading Box Enabled */}
        {element.props.headingBox && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
            <NumberSlider 
              label="Opacity" 
              value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
              onChange={(v) => updateProp('opacity', v / 100)} 
              max={100} 
              unit="%" 
            />
            <PropertyField label="Box Shadow">
              <Input
                value={element.props.boxShadow || ''}
                onChange={(e) => updateProp('boxShadow', e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </div>
        )}
      </>
    );
  }

  // BUTTON ONLY: Typography + default styles
  return (
    <>
      {element.type === 'Video' && (
        <>
          {/* Aspect Ratio */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>ASPECT RATIO</h4>
            
            <PropertyField label="Aspect Mode">
              <Select value={element.props.aspectMode || '16:9'} onValueChange={(v) => updateProp('aspectMode', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                  <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>

            {element.props.aspectMode === 'custom' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <PropertyField label="Width">
                  <Input
                    type="number"
                    value={element.props.aspectW || 16}
                    onChange={(e) => updateProp('aspectW', parseInt(e.target.value) || 16)}
                    className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                  />
                </PropertyField>
                <PropertyField label="Height">
                  <Input
                    type="number"
                    value={element.props.aspectH || 9}
                    onChange={(e) => updateProp('aspectH', parseInt(e.target.value) || 9)}
                    className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                  />
                </PropertyField>
              </div>
            )}
          </div>

          {/* Dimensions */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>DIMENSIONS</h4>
            
            <PropertyField label="Width Mode">
              <Select value={element.props.widthMode || 'full'} onValueChange={(v) => updateProp('widthMode', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="px">Pixels</SelectItem>
                  <SelectItem value="%">Percent</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>

            {['px', '%'].includes(element.props.widthMode) && (
              <NumberSlider 
                label="Width" 
                value={element.props.width || 100} 
                onChange={(v) => updateProp('width', v)} 
                max={element.props.widthMode === '%' ? 100 : 2000} 
                unit={element.props.widthMode === '%' ? '%' : 'px'} 
              />
            )}

            <PropertyField label="Height Mode">
              <Select value={element.props.heightMode || 'auto'} onValueChange={(v) => updateProp('heightMode', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="auto">Auto (Aspect)</SelectItem>
                  <SelectItem value="px">Pixels</SelectItem>
                  <SelectItem value="vh">Viewport Height</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>

            {element.props.heightMode !== 'auto' && (
              <NumberSlider 
                label="Height" 
                value={element.props.height || 100} 
                onChange={(v) => updateProp('height', v)} 
                max={element.props.heightMode === 'vh' ? 100 : 2000} 
                unit={element.props.heightMode === 'vh' ? 'vh' : 'px'} 
              />
            )}

            {!['youtube', 'vimeo'].includes(element.props.sourceType) && (
              <PropertyField label="Object Fit">
                <Select value={element.props.objectFit || 'cover'} onValueChange={(v) => updateProp('objectFit', v)}>
                  <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121726] border-gray-700 text-white">
                    <SelectItem value="cover">Cover</SelectItem>
                    <SelectItem value="contain">Contain</SelectItem>
                  </SelectContent>
                </Select>
              </PropertyField>
            )}
          </div>

          {/* Spacing */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} />
            <SpacingInputs type="margin" props={element.props} updateProp={updateProp} />
          </div>

          {/* Border */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BORDER</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <Label className="text-gray-300 text-xs font-medium">Enable Border</Label>
              <input
                type="checkbox"
                checked={element.props.borderEnabled || false}
                onChange={(e) => updateProp('borderEnabled', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            {element.props.borderEnabled && (
              <>
                <ColorInput label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
                <NumberSlider 
                  label="Border Width" 
                  value={element.props.borderWidth || 0} 
                  onChange={(v) => updateProp('borderWidth', v)} 
                  max={20} 
                  unit="px" 
                />
                <PropertyField label="Border Style">
                  <Select value={element.props.borderStyle || 'solid'} onValueChange={(v) => updateProp('borderStyle', v)}>
                    <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121726] border-gray-700 text-white">
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                    </SelectContent>
                  </Select>
                </PropertyField>
              </>
            )}

            <NumberSlider 
              label="Border Radius" 
              value={element.props.borderRadius || 0} 
              onChange={(v) => updateProp('borderRadius', v)} 
              max={50} 
              unit="px" 
            />
          </div>

          {/* Effects */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
            
            <NumberSlider 
              label="Opacity" 
              value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
              onChange={(v) => updateProp('opacity', v / 100)} 
              max={100} 
              unit="%" 
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <Label className="text-gray-300 text-xs font-medium">Enable Shadow</Label>
              <input
                type="checkbox"
                checked={element.props.shadowEnabled || false}
                onChange={(e) => updateProp('shadowEnabled', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            {element.props.shadowEnabled && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <Label className="text-gray-500 text-[10px] mb-2 block">X Offset</Label>
                    <Input
                      type="number"
                      value={element.props.shadowX || 0}
                      onChange={(e) => updateProp('shadowX', parseInt(e.target.value) || 0)}
                      className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] mb-2 block">Y Offset</Label>
                    <Input
                      type="number"
                      value={element.props.shadowY || 4}
                      onChange={(e) => updateProp('shadowY', parseInt(e.target.value) || 0)}
                      className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] mb-2 block">Blur</Label>
                    <Input
                      type="number"
                      value={element.props.shadowBlur || 6}
                      onChange={(e) => updateProp('shadowBlur', parseInt(e.target.value) || 0)}
                      className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] mb-2 block">Spread</Label>
                    <Input
                      type="number"
                      value={element.props.shadowSpread || 0}
                      onChange={(e) => updateProp('shadowSpread', parseInt(e.target.value) || 0)}
                      className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
                <PropertyField label="Shadow Color">
                  <Input
                    value={element.props.shadowColor || 'rgba(0,0,0,0.1)'}
                    onChange={(e) => updateProp('shadowColor', e.target.value)}
                    placeholder="rgba(0,0,0,0.1)"
                    className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
                  />
                </PropertyField>
              </>
            )}

            <ColorInput label="Background Color" value={element.props.backgroundColor} onChange={(v) => updateProp('backgroundColor', v)} />
          </div>
        </>
      )}

      {element.type === 'Icon' && (
        <>
          {/* Dimensions */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>DIMENSIONS</h4>
            <NumberSlider 
              label="Icon Size" 
              value={element.props.iconSize || 32} 
              onChange={(v) => updateProp('iconSize', v)} 
              min={12} 
              max={128} 
              unit="px" 
            />
            {element.props.iconSource === 'library' && (
              <NumberSlider 
                label="Stroke Width" 
                value={element.props.strokeWidth || 2} 
                onChange={(v) => updateProp('strokeWidth', v)} 
                min={0.5} 
                max={4} 
                step={0.5}
                unit="px" 
              />
            )}
          </div>

          {/* Color */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>COLOR</h4>
            {element.props.iconSource === 'emoji' ? (
              <p style={{ fontSize: '11px', color: '#6B7280', fontStyle: 'italic' }}>
                Emoji color is determined by OS/browser and cannot be changed
              </p>
            ) : (
              <ColorInput label="Icon Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />
            )}
          </div>

          {/* Background */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BACKGROUND</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <Label className="text-gray-300 text-xs font-medium">Enable Background</Label>
              <input
                type="checkbox"
                checked={element.props.bgEnabled || false}
                onChange={(e) => updateProp('bgEnabled', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            {element.props.bgEnabled && (
              <>
                <ColorInput label="Background Color" value={element.props.bgColor} onChange={(v) => updateProp('bgColor', v)} />
                <NumberSlider 
                  label="Border Radius" 
                  value={element.props.borderRadius || 0} 
                  onChange={(v) => updateProp('borderRadius', v)} 
                  max={100} 
                  unit="px" 
                />
              </>
            )}

            {/* Border */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', marginBottom: '12px' }}>
              <Label className="text-gray-300 text-xs font-medium">Enable Border</Label>
              <input
                type="checkbox"
                checked={element.props.borderEnabled || false}
                onChange={(e) => updateProp('borderEnabled', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            {element.props.borderEnabled && (
              <>
                <ColorInput label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
                <NumberSlider 
                  label="Border Width" 
                  value={element.props.borderWidth || 0} 
                  onChange={(v) => updateProp('borderWidth', v)} 
                  max={10} 
                  unit="px" 
                />
                <PropertyField label="Border Style">
                  <Select value={element.props.borderStyle || 'solid'} onValueChange={(v) => updateProp('borderStyle', v)}>
                    <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121726] border-gray-700 text-white">
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                    </SelectContent>
                  </Select>
                </PropertyField>
              </>
            )}
          </div>

          {/* Spacing */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} customLabel="Padding (Internal)" />
            <SpacingInputs type="margin" props={element.props} updateProp={updateProp} customLabel="Margin (External)" />
          </div>

          {/* Alignment */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>ALIGNMENT</h4>
            <PropertyField label="Position">
              <Select value={element.props.alignment || 'left'} onValueChange={(v) => updateProp('alignment', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
          </div>

          {/* Effects */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
            <NumberSlider 
              label="Opacity" 
              value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
              onChange={(v) => updateProp('opacity', v / 100)} 
              max={100} 
              unit="%" 
            />
            <PropertyField label="Box Shadow">
              <Input
                value={element.props.boxShadow || ''}
                onChange={(e) => updateProp('boxShadow', e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </div>
        </>
      )}

      {element.type === 'Button' && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>TYPOGRAPHY</h4>
            <ColorInput label="Text Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />
            <ColorInput label="Background Color" value={element.props.backgroundColor} onChange={(v) => updateProp('backgroundColor', v)} />
            <NumberSlider 
              label="Font Size" 
              value={element.props.fontSize || 16} 
              onChange={(v) => updateProp('fontSize', v)} 
              min={12} 
              max={32} 
              unit="px" 
            />
            <PropertyField label="Font Weight">
              <Select value={element.props.fontWeight || '500'} onValueChange={(v) => updateProp('fontWeight', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="400">Regular</SelectItem>
                  <SelectItem value="500">Medium</SelectItem>
                  <SelectItem value="600">SemiBold</SelectItem>
                  <SelectItem value="700">Bold</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
          </div>


        </>
      )}

      {element.type === 'Divider' && (
        <>
          {/* Line Style */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LINE STYLE</h4>
            
            <PropertyField label="Style">
              <Select value={element.props.lineStyle || 'solid'} onValueChange={(v) => updateProp('lineStyle', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="glow">Glow (Shadow)</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>

            {element.props.lineStyle === 'gradient' ? (
              <>
                <ColorInput label="Gradient Color 1" value={element.props.gradientColor1 || '#E5E7EB'} onChange={(v) => updateProp('gradientColor1', v)} />
                <ColorInput label="Gradient Color 2" value={element.props.gradientColor2 || '#9CA3AF'} onChange={(v) => updateProp('gradientColor2', v)} />
                <NumberSlider 
                  label="Gradient Angle" 
                  value={element.props.gradientAngle || 90} 
                  onChange={(v) => updateProp('gradientAngle', v)} 
                  min={0} 
                  max={360} 
                  unit="°" 
                />
              </>
            ) : (
              <ColorInput label="Line Color" value={element.props.lineColor} onChange={(v) => updateProp('lineColor', v)} />
            )}

            <NumberSlider 
              label="Thickness" 
              value={element.props.lineThickness || 1} 
              onChange={(v) => updateProp('lineThickness', v)} 
              min={1} 
              max={20} 
              unit="px" 
            />

            <NumberSlider 
              label="Opacity" 
              value={element.props.lineOpacity !== undefined ? element.props.lineOpacity * 100 : 100} 
              onChange={(v) => updateProp('lineOpacity', v / 100)} 
              max={100} 
              unit="%" 
            />
          </div>

          {/* Line Width */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>LINE WIDTH</h4>
            
            <PropertyField label="Width">
              <Input
                value={element.props.lineWidth || '100%'}
                onChange={(e) => updateProp('lineWidth', e.target.value)}
                placeholder="100%, 500px, auto"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>

            <PropertyField label="Max Width (Optional)">
              <Input
                value={element.props.lineMaxWidth || ''}
                onChange={(e) => updateProp('lineMaxWidth', e.target.value)}
                placeholder="800px"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </div>

          {/* Spacing */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
            
            {element.props.dividerType !== 'line' && (
              <NumberSlider 
                label="Gap (Line ↔ Content)" 
                value={element.props.gap || 12} 
                onChange={(v) => updateProp('gap', v)} 
                max={50} 
                unit="px" 
              />
            )}

            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} customLabel="Padding (Internal)" />
            <SpacingInputs type="margin" props={element.props} updateProp={updateProp} customLabel="Margin (External)" />
          </div>

          {/* Alignment */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>ALIGNMENT</h4>
            <PropertyField label="Position">
              <Select value={element.props.alignment || 'center'} onValueChange={(v) => updateProp('alignment', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
          </div>

          {/* Text/Icon Styling (conditional) */}
          {element.props.dividerType !== 'line' && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>
                {element.props.dividerType === 'text' ? 'TEXT STYLE' : 'ICON STYLE'}
              </h4>
              
              <ColorInput 
                label="Color" 
                value={element.props.dividerType === 'text' ? element.props.textColor : element.props.iconColor} 
                onChange={(v) => updateProp(element.props.dividerType === 'text' ? 'textColor' : 'iconColor', v)} 
              />
              
              <NumberSlider 
                label="Size" 
                value={element.props.dividerType === 'text' ? (element.props.textSize || 14) : (element.props.iconSize || 20)} 
                onChange={(v) => updateProp(element.props.dividerType === 'text' ? 'textSize' : 'iconSize', v)} 
                min={10} 
                max={48} 
                unit="px" 
              />

              {element.props.dividerType === 'text' && (
                <PropertyField label="Font Weight">
                  <Select value={element.props.fontWeight || '500'} onValueChange={(v) => updateProp('fontWeight', v)}>
                    <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121726] border-gray-700 text-white">
                      <SelectItem value="400">Regular</SelectItem>
                      <SelectItem value="500">Medium</SelectItem>
                      <SelectItem value="600">SemiBold</SelectItem>
                      <SelectItem value="700">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </PropertyField>
              )}
            </div>
          )}
        </>
      )}

      {element.type === 'Button' && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} customLabel="Padding (Internal)" />
            <SpacingInputs type="margin" props={element.props} updateProp={updateProp} customLabel="Margin (External)" />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
            <NumberSlider 
              label="Opacity" 
              value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
              onChange={(v) => updateProp('opacity', v / 100)} 
              max={100} 
              unit="%" 
            />
            <PropertyField label="Box Shadow">
              <Input
                value={element.props.boxShadow || ''}
                onChange={(e) => updateProp('boxShadow', e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </div>
        </>
      )}

      {element.type === 'Spacer' && (
        <>
          {/* Appearance */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>APPEARANCE</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Label className="text-gray-300 text-xs font-medium">Show Guide Line (Editor Only)</Label>
              <input
                type="checkbox"
                checked={element.props.showGuide || false}
                onChange={(e) => updateProp('showGuide', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <Label className="text-gray-300 text-xs font-medium">Enable Background</Label>
              <input
                type="checkbox"
                checked={element.props.backgroundEnabled || false}
                onChange={(e) => updateProp('backgroundEnabled', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            {element.props.backgroundEnabled && (
              <div style={{ marginBottom: '16px' }}>
                <ColorInput label="Background Color" value={element.props.backgroundColor || 'transparent'} onChange={(v) => updateProp('backgroundColor', v)} />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <Label className="text-gray-300 text-xs font-medium">Enable Border</Label>
              <input
                type="checkbox"
                checked={element.props.borderEnabled || false}
                onChange={(e) => updateProp('borderEnabled', e.target.checked)}
                className="accent-[#4368D9]"
              />
            </div>

            {element.props.borderEnabled && (
              <>
                <PropertyField label="Border Width">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Slider
                      value={[element.props.borderWidth || 1]}
                      onValueChange={([val]) => updateProp('borderWidth', val)}
                      min={0}
                      max={20}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={element.props.borderWidth || 1}
                      onChange={(e) => updateProp('borderWidth', parseInt(e.target.value) || 0)}
                      className="bg-[#1A1F2E] border-gray-700 text-white text-sm w-20"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </PropertyField>
                <ColorInput label="Border Color" value={element.props.borderColor || '#E5E7EB'} onChange={(v) => updateProp('borderColor', v)} />
                <PropertyField label="Border Radius">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Slider
                      value={[element.props.borderRadius || 0]}
                      onValueChange={([val]) => updateProp('borderRadius', val)}
                      min={0}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={element.props.borderRadius || 0}
                      onChange={(e) => updateProp('borderRadius', parseInt(e.target.value) || 0)}
                      className="bg-[#1A1F2E] border-gray-700 text-white text-sm w-20"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </PropertyField>
              </>
            )}
          </div>

          {/* Spacing - Single Section Only */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
            <SpacingInputs type="padding" props={element.props} updateProp={updateProp} customLabel="Padding (Internal)" />
            <SpacingInputs type="margin" props={element.props} updateProp={updateProp} customLabel="Margin (External)" />
          </div>

          {/* Effects */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
            <NumberSlider 
              label="Opacity" 
              value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
              onChange={(v) => updateProp('opacity', v / 100)} 
              max={100} 
              unit="%" 
            />
            <PropertyField label="Box Shadow">
              <Input
                value={element.props.boxShadow || ''}
                onChange={(e) => updateProp('boxShadow', e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </div>
        </>
      )}

      {!['Button', 'Spacer'].includes(element.type) && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>DIMENSIONS</h4>
            <PropertyField label="Width">
              <Input
                value={element.props.width || ''}
                onChange={(e) => updateProp('width', e.target.value)}
                placeholder="auto, 100%, 500px"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
            <PropertyField label="Height">
              <Input
                value={element.props.height || ''}
                onChange={(e) => updateProp('height', e.target.value)}
                placeholder="auto, 100%, 300px"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
            <PropertyField label="Alignment">
              <Select value={element.props.alignment || 'left'} onValueChange={(v) => updateProp('alignment', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
            <NumberSlider 
              label="Padding" 
              value={element.props.padding || 16} 
              onChange={(v) => updateProp('padding', v)} 
              max={100} 
              unit="px" 
            />
            <NumberSlider 
              label="Margin" 
              value={element.props.margin || 0} 
              onChange={(v) => updateProp('margin', v)} 
              max={100} 
              unit="px" 
            />
          </div>
        </>
      )}

      {element.type === 'Header' && (
        <div style={{ marginBottom: '24px' }}>
           <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>HEADER BACKGROUND & STATES</h4>
           
           <div className="space-y-6">
             {/* Default State */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5">
                <Label className="text-xs font-semibold text-white mb-3 block">Default State</Label>
                <BackgroundSettings 
                  values={{
                    mode: element.props.backgroundMode || (element.props.backgroundImage ? 'image' : 'color'),
                    color: element.props.backgroundColor,
                    imageSrc: element.props.backgroundImage,
                    gradientColor1: element.props.gradientColor1,
                    gradientColor2: element.props.gradientColor2,
                    gradientType: element.props.gradientType,
                    gradientAngle: element.props.gradientAngle,
                    imageSize: element.props.imageSize,
                    imageRepeat: element.props.imageRepeat,
                    imagePosition: element.props.imagePosition,
                    overlayColor: element.props.overlayColor,
                    overlayOpacity: element.props.overlayOpacity,
                  }}
                  onChange={(newValues) => {
                    updateProp('backgroundMode', newValues.mode);
                    updateProp('backgroundColor', newValues.color);
                    updateProp('backgroundImage', newValues.imageSrc);
                    updateProp('gradientColor1', newValues.gradientColor1);
                    updateProp('gradientColor2', newValues.gradientColor2);
                    updateProp('gradientType', newValues.gradientType);
                    updateProp('gradientAngle', newValues.gradientAngle);
                    updateProp('imageSize', newValues.imageSize);
                    updateProp('imageRepeat', newValues.imageRepeat);
                    updateProp('imagePosition', newValues.imagePosition);
                    updateProp('overlayColor', newValues.overlayColor);
                    updateProp('overlayOpacity', newValues.overlayOpacity);
                  }}
                />
             </div>

             {/* Transparent State */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-3">
                   <Label className="text-xs font-semibold text-white">Transparent State</Label>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{element.props.transparentEnabled ? 'On' : 'Off'}</span>
                      <input 
                        type="checkbox" 
                        checked={element.props.transparentEnabled || false} 
                        onChange={(e) => updateProp('transparentEnabled', e.target.checked)}
                        className="accent-[#4368D9]"
                      />
                   </div>
                </div>
                
                {element.props.transparentEnabled && (
                  <BackgroundSettings 
                    values={element.props.transparentStyle || { mode: 'color', color: 'transparent' }}
                    onChange={(newValues) => updateProp('transparentStyle', newValues)}
                  />
                )}
             </div>

             {/* Sticky State */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-3">
                   <Label className="text-xs font-semibold text-white">Sticky State</Label>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{element.props.stickyEnabled ? 'On' : 'Off'}</span>
                      <input 
                        type="checkbox" 
                        checked={element.props.stickyEnabled || false} 
                        onChange={(e) => updateProp('stickyEnabled', e.target.checked)}
                        className="accent-[#4368D9]"
                      />
                   </div>
                </div>
                
                {element.props.stickyEnabled && (
                  <BackgroundSettings 
                    values={element.props.stickyStyle || { mode: 'color', color: '#ffffff' }}
                    onChange={(newValues) => updateProp('stickyStyle', newValues)}
                  />
                )}
             </div>
           </div>
        </div>
      )}

      {element.type === 'Footer' && element.props.layoutMode === 'simple' && (
        <div style={{ marginBottom: '24px' }}>
           <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>FOOTER ROW STYLE</h4>
           
           {/* Row Selector */}
           <div className="flex gap-1 bg-[#1A1F2E] p-1 rounded-lg mb-4 border border-gray-800">
              {['top', 'main', 'bottom'].map(row => {
                  const enabled = element.props.rows && element.props.rows[row] && element.props.rows[row].enabled;
                  return (
                      <button
                        key={row}
                        onClick={() => setActiveFooterRow(row)}
                        className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                            activeFooterRow === row 
                            ? 'bg-[#4368D9] text-white shadow-sm' 
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                        style={{ opacity: enabled ? 1 : 0.5 }}
                      >
                        {row.charAt(0).toUpperCase() + row.slice(1)}
                        {!enabled && <span className="block text-[9px] font-normal">(Hidden)</span>}
                      </button>
                  );
              })}
           </div>

           <div className="space-y-6">
             {/* Default State */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5">
                <Label className="text-xs font-semibold text-white mb-3 block">Default Background</Label>
                {(() => {
                    const rowProps = (element.props.rows && element.props.rows[activeFooterRow]) || {};
                    return (
                        <BackgroundSettings 
                          values={{
                            mode: rowProps.backgroundMode || (rowProps.backgroundImage ? 'image' : 'color'),
                            color: rowProps.backgroundColor,
                            imageSrc: rowProps.backgroundImage,
                            gradientColor1: rowProps.gradientColor1,
                            gradientColor2: rowProps.gradientColor2,
                            gradientType: rowProps.gradientType,
                            gradientAngle: rowProps.gradientAngle,
                            imageSize: rowProps.imageSize,
                            imageRepeat: rowProps.imageRepeat,
                            imagePosition: rowProps.imagePosition,
                            overlayColor: rowProps.overlayColor,
                            overlayOpacity: rowProps.overlayOpacity,
                          }}
                          onChange={(newValues) => {
                            // Batch updates to avoid overwriting state
                            const rows = element.props.rows || {
                                top: { enabled: false, backgroundColor: 'transparent', padding: 16 },
                                main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
                                bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
                            };
                            const currentRow = rows[activeFooterRow] || {};
                            const updatedRow = {
                                ...currentRow,
                                backgroundMode: newValues.mode,
                                backgroundColor: newValues.color,
                                backgroundImage: newValues.imageSrc,
                                gradientColor1: newValues.gradientColor1,
                                gradientColor2: newValues.gradientColor2,
                                gradientType: newValues.gradientType,
                                gradientAngle: newValues.gradientAngle,
                                imageSize: newValues.imageSize,
                                imageRepeat: newValues.imageRepeat,
                                imagePosition: newValues.imagePosition,
                                overlayColor: newValues.overlayColor,
                                overlayOpacity: newValues.overlayOpacity,
                            };
                            const newRows = { ...rows, [activeFooterRow]: updatedRow };
                            updateProp('rows', newRows);
                          }}
                        />
                    );
                })()}
             </div>

             {/* Transparent State */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-3">
                   <Label className="text-xs font-semibold text-white">Transparent State</Label>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">
                        {(element.props.rows?.[activeFooterRow]?.transparentEnabled) ? 'On' : 'Off'}
                      </span>
                      <input 
                        type="checkbox" 
                        checked={element.props.rows?.[activeFooterRow]?.transparentEnabled || false} 
                        onChange={(e) => updateFooterRow('transparentEnabled', e.target.checked)}
                        className="accent-[#4368D9]"
                      />
                   </div>
                </div>
                
                {element.props.rows?.[activeFooterRow]?.transparentEnabled && (
                  <BackgroundSettings 
                    values={element.props.rows?.[activeFooterRow]?.transparentStyle || { mode: 'color', color: 'transparent' }}
                    onChange={(newValues) => updateFooterRow('transparentStyle', newValues)}
                  />
                )}
             </div>

             {/* Sticky State */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-3">
                   <Label className="text-xs font-semibold text-white">Sticky State</Label>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">
                        {(element.props.rows?.[activeFooterRow]?.stickyEnabled) ? 'On' : 'Off'}
                      </span>
                      <input 
                        type="checkbox" 
                        checked={element.props.rows?.[activeFooterRow]?.stickyEnabled || false} 
                        onChange={(e) => updateFooterRow('stickyEnabled', e.target.checked)}
                        className="accent-[#4368D9]"
                      />
                   </div>
                </div>
                
                {element.props.rows?.[activeFooterRow]?.stickyEnabled && (
                  <BackgroundSettings 
                    values={element.props.rows?.[activeFooterRow]?.stickyStyle || { mode: 'color', color: '#ffffff' }}
                    onChange={(newValues) => updateFooterRow('stickyStyle', newValues)}
                  />
                )}
             </div>
             </div>
             </div>
             )}

             {element.type === 'Footer' && element.props.layoutMode === 'widgets' && (
                     <div style={{ marginBottom: '24px' }}>
                     <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>WIDGETS LAYOUT STYLE</h4>

             {/* Container Style */}
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5 mb-6">
             <Label className="text-xs font-semibold text-white mb-3 block">Container Background</Label>
             <BackgroundSettings 
               values={{
                 mode: element.props.widgetsStyle?.backgroundMode || 'color',
                 color: element.props.widgetsStyle?.backgroundColor || '#1f2937',
                 imageSrc: element.props.widgetsStyle?.backgroundImage,
                 gradientColor1: element.props.widgetsStyle?.gradientColor1,
                 gradientColor2: element.props.widgetsStyle?.gradientColor2,
                 gradientType: element.props.widgetsStyle?.gradientType,
                 gradientAngle: element.props.widgetsStyle?.gradientAngle,
                 imageSize: element.props.widgetsStyle?.imageSize,
                 imageRepeat: element.props.widgetsStyle?.imageRepeat,
                 imagePosition: element.props.widgetsStyle?.imagePosition,
                 overlayColor: element.props.widgetsStyle?.overlayColor,
                 overlayOpacity: element.props.widgetsStyle?.overlayOpacity,
               }}
               onChange={(newValues) => {
                 const updates = {
                   backgroundMode: newValues.mode,
                   backgroundColor: newValues.color,
                   backgroundImage: newValues.imageSrc,
                   gradientColor1: newValues.gradientColor1,
                   gradientColor2: newValues.gradientColor2,
                   gradientType: newValues.gradientType,
                   gradientAngle: newValues.gradientAngle,
                   imageSize: newValues.imageSize,
                   imageRepeat: newValues.imageRepeat,
                   imagePosition: newValues.imagePosition,
                   overlayColor: newValues.overlayColor,
                   overlayOpacity: newValues.overlayOpacity,
                 };

                 // Initialize gradient defaults if switching to gradient and values are missing
                 if (newValues.mode === 'gradient' && !element.props.widgetsStyle?.gradientColor1) {
                    updates.gradientColor1 = '#ffffff';
                    updates.gradientColor2 = '#000000';
                    updates.gradientAngle = 180;
                    updates.gradientType = 'linear';
                 }

                 const newStyle = {
                   ...element.props.widgetsStyle,
                   ...updates
                 };
                 updateProp('widgetsStyle', newStyle);
               }}
             />
             </div>

             {/* Active Widget Area Style */}
             {element._focusId && element._focusId.startsWith('area-') && (
             <div className="bg-[#1A1F2E] p-3 rounded-lg border border-white/5" style={{ borderColor: '#4368D9' }}>
               <Label className="text-xs font-semibold text-white mb-3 block">Selected Area Style</Label>
               {(() => {
                   const widgetAreas = element.props.widgetAreas || [];
                   const activeArea = widgetAreas.find(a => a.id === element._focusId);
                   if (!activeArea) return null;

                   return (
                       <div className="space-y-4">
                           <BackgroundSettings 
                               values={{
                                   mode: activeArea.backgroundMode || (activeArea.backgroundImage ? 'image' : 'color'),
                                   color: activeArea.backgroundColor,
                                   imageSrc: activeArea.backgroundImage,
                                   gradientColor1: activeArea.gradientColor1,
                                   gradientColor2: activeArea.gradientColor2,
                                   gradientType: activeArea.gradientType,
                                   gradientAngle: activeArea.gradientAngle,
                                   imageSize: activeArea.imageSize,
                                   imageRepeat: activeArea.imageRepeat,
                                   imagePosition: activeArea.imagePosition,
                                   overlayColor: activeArea.overlayColor,
                                   overlayOpacity: activeArea.overlayOpacity,
                               }}
                               onChange={(newValues) => {
                                   const newAreas = widgetAreas.map(area => {
                                       if (area.id !== activeArea.id) return area;
                                       return {
                                           ...area,
                                           backgroundMode: newValues.mode,
                                           backgroundColor: newValues.color,
                                           backgroundImage: newValues.imageSrc,
                                           gradientColor1: newValues.gradientColor1,
                                           gradientColor2: newValues.gradientColor2,
                                           gradientType: newValues.gradientType,
                                           gradientAngle: newValues.gradientAngle,
                                           imageSize: newValues.imageSize,
                                           imageRepeat: newValues.imageRepeat,
                                           imagePosition: newValues.imagePosition,
                                           overlayColor: newValues.overlayColor,
                                           overlayOpacity: newValues.overlayOpacity,
                                       };
                                   });
                                   updateProp('widgetAreas', newAreas);
                               }}
                           />

                           <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                               <div>
                                   <Label className="text-[10px] text-gray-500 mb-1 block">Padding</Label>
                                   <Input 
                                       type="number" 
                                       value={activeArea.padding || 0} 
                                       onChange={(e) => {
                                           const newAreas = widgetAreas.map(area => area.id === activeArea.id ? { ...area, padding: parseInt(e.target.value) } : area);
                                           updateProp('widgetAreas', newAreas);
                                       }}
                                       className="h-7 bg-[#121726] border-gray-700 text-xs"
                                   />
                               </div>
                               <div>
                                   <Label className="text-[10px] text-gray-500 mb-1 block">Radius</Label>
                                   <Input 
                                       type="number" 
                                       value={activeArea.borderRadius || 0} 
                                       onChange={(e) => {
                                           const newAreas = widgetAreas.map(area => area.id === activeArea.id ? { ...area, borderRadius: parseInt(e.target.value) } : area);
                                           updateProp('widgetAreas', newAreas);
                                       }}
                                       className="h-7 bg-[#121726] border-gray-700 text-xs"
                                   />
                               </div>
                           </div>
                       </div>
                   );
               })()}
             </div>
             )}
             </div>
             )}

      {!['Header', 'Footer', 'Spacer'].includes(element.type) && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BACKGROUND</h4>
          <ColorInput label="Background Color" value={element.props.backgroundColor} onChange={(v) => updateProp('backgroundColor', v)} />
          <ImageUploadField
            label="Background Image"
            value={element.props.backgroundImage || ''}
            onChange={(url) => updateProp('backgroundImage', url)}
          />
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>BORDER</h4>
        <ColorInput label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
        <NumberSlider 
          label="Border Width" 
          value={element.props.borderWidth || 0} 
          onChange={(v) => updateProp('borderWidth', v)} 
          max={20} 
          unit="px" 
        />
        <NumberSlider 
          label="Border Radius" 
          value={element.props.borderRadius || 0} 
          onChange={(v) => updateProp('borderRadius', v)} 
          max={50} 
          unit="px" 
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>EFFECTS</h4>
        <NumberSlider 
          label="Opacity" 
          value={element.props.opacity !== undefined ? element.props.opacity * 100 : 100} 
          onChange={(v) => updateProp('opacity', v / 100)} 
          max={100} 
          unit="%" 
        />
        <PropertyField label="Box Shadow">
          <Input
            value={element.props.boxShadow || ''}
            onChange={(e) => updateProp('boxShadow', e.target.value)}
            placeholder="0 4px 6px rgba(0,0,0,0.1)"
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>
      </div>
    </>
  );
};

const AdvancedTab = ({ element, updateProp, accordionValue, setAccordionValue }) => {
  const [showDesktop, setShowDesktop] = React.useState(element.props.showDesktop !== false);
  const [showTablet, setShowTablet] = React.useState(element.props.showTablet !== false);
  const [showMobile, setShowMobile] = React.useState(element.props.showMobile !== false);

  React.useEffect(() => {
    updateProp('showDesktop', showDesktop);
    updateProp('showTablet', showTablet);
    updateProp('showMobile', showMobile);
  }, [showDesktop, showTablet, showMobile]);

  return (
    <div style={{ padding: '0' }}>
      <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue} className="w-full">
        {/* Visibility Section */}
        <AccordionItem value="visibility" className="border-b border-white/10">
          <AccordionTrigger className="px-0 py-3 text-xs font-semibold text-gray-300 hover:text-white">
            VISIBILITY
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showDesktop}
                  onChange={(e) => setShowDesktop(e.target.checked)}
                  className="accent-[#4368D9]"
                />
                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>Show on Desktop</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showTablet}
                  onChange={(e) => setShowTablet(e.target.checked)}
                  className="accent-[#4368D9]"
                />
                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>Show on Tablet</span>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showMobile}
                  onChange={(e) => setShowMobile(e.target.checked)}
                  className="accent-[#4368D9]"
                />
                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>Show on Mobile</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Layout Section */}
        <AccordionItem value="layout" className="border-b border-white/10">
          <AccordionTrigger className="px-0 py-3 text-xs font-semibold text-gray-300 hover:text-white">
            LAYOUT
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-4 space-y-4">
            <PropertyField label="Width">
              <Input
                value={element.props.width || ''}
                onChange={(e) => updateProp('width', e.target.value)}
                placeholder="auto, 100%, 500px"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
            <PropertyField label="Max Width">
              <Input
                value={element.props.maxWidth || ''}
                onChange={(e) => updateProp('maxWidth', e.target.value)}
                placeholder="100%, 1200px"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
            <PropertyField label="Align Self">
              <Select value={element.props.alignSelf || 'auto'} onValueChange={(v) => updateProp('alignSelf', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="flex-start">Start</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="flex-end">End</SelectItem>
                  <SelectItem value="stretch">Stretch</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
            <PropertyField label="Order">
              <Input
                type="number"
                value={element.props.order || 0}
                onChange={(e) => updateProp('order', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </AccordionContent>
        </AccordionItem>

        {/* Position Section */}
        <AccordionItem value="position" className="border-b border-white/10">
          <AccordionTrigger className="px-0 py-3 text-xs font-semibold text-gray-300 hover:text-white">
            POSITION
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-4 space-y-4">
            <PropertyField label="Position Type">
              <Select value={element.props.position || 'relative'} onValueChange={(v) => updateProp('position', v)}>
                <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="static">Default</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="absolute">Absolute</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="sticky">Sticky</SelectItem>
                </SelectContent>
              </Select>
            </PropertyField>
            
            {element.props.position && element.props.position !== 'static' && (
              <>
                <Label className="text-gray-500 text-[10px] mb-2 block">Offsets</Label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', marginBottom: '12px' }}>
                  <div>
                    <input
                      type="number"
                      placeholder="Top"
                      value={element.props.positionTop || ''}
                      onChange={(e) => updateProp('positionTop', e.target.value)}
                      className="bg-[#1A1F2E] border border-gray-700 text-white h-7 text-xs text-center rounded w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Right"
                      value={element.props.positionRight || ''}
                      onChange={(e) => updateProp('positionRight', e.target.value)}
                      className="bg-[#1A1F2E] border border-gray-700 text-white h-7 text-xs text-center rounded w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Bottom"
                      value={element.props.positionBottom || ''}
                      onChange={(e) => updateProp('positionBottom', e.target.value)}
                      className="bg-[#1A1F2E] border border-gray-700 text-white h-7 text-xs text-center rounded w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Left"
                      value={element.props.positionLeft || ''}
                      onChange={(e) => updateProp('positionLeft', e.target.value)}
                      className="bg-[#1A1F2E] border border-gray-700 text-white h-7 text-xs text-center rounded w-full"
                    />
                  </div>
                </div>
              </>
            )}
            
            <PropertyField label="Z-Index">
              <Input
                type="number"
                value={element.props.zIndex || ''}
                onChange={(e) => updateProp('zIndex', e.target.value)}
                placeholder="auto"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </AccordionContent>
        </AccordionItem>

        {/* Motion Effects Section (Heading, Text, Image, Video, Button, Icon, Divider) - NOT Spacer */}
        {['Heading', 'Text', 'Image', 'Video', 'Button', 'Icon', 'Divider'].includes(element.type) && (
          <AccordionItem value="motion" className="border-b border-white/10">
            <AccordionTrigger className="px-0 py-3 text-xs font-semibold text-gray-300 hover:text-white">
              MOTION EFFECTS
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-4 space-y-4">
              <div className="flex items-center justify-between mb-4 p-3 bg-[#1A1F2E] rounded-lg">
                <Label className="text-xs font-medium text-gray-300">Enable Motion Effects</Label>
                <input
                  type="checkbox"
                  checked={element.props.motion?.enabled || false}
                  onChange={(e) => {
                    const currentMotion = element.props.motion || {};
                    updateProp('motion', { ...currentMotion, enabled: e.target.checked });
                  }}
                  className="accent-[#4368D9]"
                />
              </div>

              {element.props.motion?.enabled && (
                <div className="space-y-6">
                  {/* Entrance Animation */}
                  <div className="bg-[#1A1F2E] p-3 rounded-lg">
                    <Label className="text-xs font-semibold text-white mb-3 block">Entrance Animation</Label>
                    <PropertyField label="Preset">
                      <Select 
                        value={element.props.motion?.entrance?.preset || 'none'} 
                        onValueChange={(v) => {
                          const motion = element.props.motion || {};
                          updateProp('motion', { ...motion, entrance: { ...motion.entrance, preset: v } });
                        }}
                      >
                        <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121726] border-gray-700 text-white">
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="fade">Fade</SelectItem>
                          <SelectItem value="fadeUp">Fade Up</SelectItem>
                          <SelectItem value="fadeDown">Fade Down</SelectItem>
                          <SelectItem value="fadeLeft">Fade Left</SelectItem>
                          <SelectItem value="fadeRight">Fade Right</SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                          <SelectItem value="zoomUp">Zoom Up</SelectItem>
                          <SelectItem value="slideUp">Slide Up</SelectItem>
                          <SelectItem value="slideDown">Slide Down</SelectItem>
                        </SelectContent>
                      </Select>
                    </PropertyField>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px] text-gray-500 mb-1 block">Duration (ms)</Label>
                        <Input
                          type="number"
                          value={element.props.motion?.entrance?.durationMs || 400}
                          onChange={(e) => {
                            const motion = element.props.motion || {};
                            updateProp('motion', { ...motion, entrance: { ...motion.entrance, durationMs: parseInt(e.target.value) } });
                          }}
                          className="h-7 bg-[#121726] border-gray-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] text-gray-500 mb-1 block">Delay (ms)</Label>
                        <Input
                          type="number"
                          value={element.props.motion?.entrance?.delayMs || 0}
                          onChange={(e) => {
                            const motion = element.props.motion || {};
                            updateProp('motion', { ...motion, entrance: { ...motion.entrance, delayMs: parseInt(e.target.value) } });
                          }}
                          className="h-7 bg-[#121726] border-gray-700 text-xs"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                      <input
                        type="checkbox"
                        checked={element.props.motion?.entrance?.once !== false}
                        onChange={(e) => {
                          const motion = element.props.motion || {};
                          updateProp('motion', { ...motion, entrance: { ...motion.entrance, once: e.target.checked } });
                        }}
                        className="accent-[#4368D9]"
                      />
                      Animate once (don't repeat)
                    </label>
                  </div>

                  {/* Interaction Effects - Button only */}
                  {element.type === 'Button' && (
                    <div className="bg-[#1A1F2E] p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-xs font-semibold text-white">Interaction Effects</Label>
                        <input
                          type="checkbox"
                          checked={element.props.motion?.interaction?.enabled !== false}
                          onChange={(e) => {
                            const motion = element.props.motion || {};
                            updateProp('motion', { ...motion, interaction: { ...motion.interaction, enabled: e.target.checked } });
                          }}
                          className="accent-[#4368D9]"
                        />
                      </div>
                      {element.props.motion?.interaction?.enabled !== false && (
                        <>
                          <Label className="text-[10px] text-gray-500 mb-2 block uppercase">Hover</Label>
                          <NumberSlider
                            label="Scale"
                            value={element.props.motion?.hover?.scale || 1}
                            onChange={(v) => {
                              const motion = element.props.motion || {};
                              updateProp('motion', { ...motion, hover: { ...motion.hover, scale: v } });
                            }}
                            min={0.9}
                            max={1.2}
                            step={0.01}
                          />
                          <NumberSlider
                            label="Shadow (px)"
                            value={element.props.motion?.hover?.shadowIntensity || 0}
                            onChange={(v) => {
                              const motion = element.props.motion || {};
                              updateProp('motion', { ...motion, hover: { ...motion.hover, shadowIntensity: v } });
                            }}
                            min={0}
                            max={30}
                            step={1}
                            unit="px"
                          />
                          
                          <Label className="text-[10px] text-gray-500 mb-2 block uppercase mt-3">Tap</Label>
                          <NumberSlider
                            label="Scale"
                            value={element.props.motion?.tap?.scale || 0.95}
                            onChange={(v) => {
                              const motion = element.props.motion || {};
                              updateProp('motion', { ...motion, tap: { ...motion.tap, scale: v } });
                            }}
                            min={0.8}
                            max={1}
                            step={0.01}
                          />

                          <Label className="text-[10px] text-gray-500 mb-2 block uppercase mt-3">Transition</Label>
                          <NumberSlider
                            label="Duration (ms)"
                            value={element.props.motion?.transition?.durationMs || 200}
                            onChange={(v) => {
                              const motion = element.props.motion || {};
                              updateProp('motion', { ...motion, transition: { ...motion.transition, durationMs: v } });
                            }}
                            min={50}
                            max={1000}
                            step={50}
                            unit="ms"
                          />
                        </>
                      )}
                    </div>
                  )}

                  {/* Mouse Effects - Non-Button, Non-Divider elements */}
                  {!['Button', 'Divider'].includes(element.type) && (
                  <div className="bg-[#1A1F2E] p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-xs font-semibold text-white">Mouse Effects</Label>
                      <input
                        type="checkbox"
                        checked={element.props.motion?.mouse?.enabled || false}
                        onChange={(e) => {
                          const motion = element.props.motion || {};
                          updateProp('motion', { ...motion, mouse: { ...motion.mouse, enabled: e.target.checked } });
                        }}
                        className="accent-[#4368D9]"
                      />
                    </div>
                    {element.props.motion?.mouse?.enabled && (
                      <>
                        <PropertyField label="Effect Type">
                          <Select 
                            value={element.props.motion?.mouse?.type || 'none'} 
                            onValueChange={(v) => {
                              const motion = element.props.motion || {};
                              updateProp('motion', { ...motion, mouse: { ...motion.mouse, type: v } });
                            }}
                          >
                            <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#121726] border-gray-700 text-white">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="tilt">Tilt</SelectItem>
                              <SelectItem value="magnetic">Magnetic</SelectItem>
                              <SelectItem value="hoverGrow">Hover Grow</SelectItem>
                            </SelectContent>
                          </Select>
                        </PropertyField>
                        <NumberSlider
                          label="Intensity"
                          value={element.props.motion?.mouse?.intensity || 0.2}
                          onChange={(v) => {
                            const motion = element.props.motion || {};
                            updateProp('motion', { ...motion, mouse: { ...motion.mouse, intensity: v } });
                          }}
                          min={0}
                          max={1}
                          step={0.1}
                        />
                      </>
                    )}
                  </div>
                  )}

                  {/* Sticky - Non-Button, Non-Divider elements */}
                  {!['Button', 'Divider'].includes(element.type) && (
                  <div className="bg-[#1A1F2E] p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-xs font-semibold text-white">Sticky Position</Label>
                      <input
                        type="checkbox"
                        checked={element.props.motion?.sticky?.enabled || false}
                        onChange={(e) => {
                          const motion = element.props.motion || {};
                          updateProp('motion', { ...motion, sticky: { ...motion.sticky, enabled: e.target.checked } });
                        }}
                        className="accent-[#4368D9]"
                      />
                    </div>
                    {element.props.motion?.sticky?.enabled && (
                      <>
                        <PropertyField label="Mode">
                          <Select 
                            value={element.props.motion?.sticky?.mode || 'top'} 
                            onValueChange={(v) => {
                              const motion = element.props.motion || {};
                              updateProp('motion', { ...motion, sticky: { ...motion.sticky, mode: v } });
                            }}
                          >
                            <SelectTrigger className="bg-[#121726] border-gray-700 text-white h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#121726] border-gray-700 text-white">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="top">Stick to Top</SelectItem>
                            </SelectContent>
                          </Select>
                        </PropertyField>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-[10px] text-gray-500 mb-1 block">Offset (px)</Label>
                            <Input
                              type="number"
                              value={element.props.motion?.sticky?.offsetPx || 0}
                              onChange={(e) => {
                                const motion = element.props.motion || {};
                                updateProp('motion', { ...motion, sticky: { ...motion.sticky, offsetPx: parseInt(e.target.value) } });
                              }}
                              className="h-7 bg-[#121726] border-gray-700 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-[10px] text-gray-500 mb-1 block">Z-Index</Label>
                            <Input
                              type="number"
                              value={element.props.motion?.sticky?.zIndex || 10}
                              onChange={(e) => {
                                const motion = element.props.motion || {};
                                updateProp('motion', { ...motion, sticky: { ...motion.sticky, zIndex: parseInt(e.target.value) } });
                              }}
                              className="h-7 bg-[#121726] border-gray-700 text-xs"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  )}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Attributes Section */}
        <AccordionItem value="attributes" className="border-b border-white/10">
          <AccordionTrigger className="px-0 py-3 text-xs font-semibold text-gray-300 hover:text-white">
            ATTRIBUTES
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-4 space-y-4">
            <PropertyField label="Element ID">
              <Input
                value={element.props.elementId || ''}
                onChange={(e) => updateProp('elementId', e.target.value)}
                placeholder="my-element-id"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
            <PropertyField label="CSS Classes">
              <Input
                value={element.props.cssClasses || ''}
                onChange={(e) => updateProp('cssClasses', e.target.value)}
                placeholder="class1 class2"
                className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
              />
            </PropertyField>
          </AccordionContent>
        </AccordionItem>

        {/* Custom CSS Section */}
        <AccordionItem value="custom-css" className="border-b-0">
          <AccordionTrigger className="px-0 py-3 text-xs font-semibold text-gray-300 hover:text-white">
            CUSTOM CSS
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-4">
            <PropertyField label="CSS Injection">
              <Textarea
                value={element.props.customCSS || ''}
                onChange={(e) => updateProp('customCSS', e.target.value)}
                placeholder="/* Scoped to this element */&#10;color: red;&#10;font-size: 20px;"
                rows={8}
                className="bg-[#1A1F2E] border-gray-700 text-white text-xs font-mono"
              />
            </PropertyField>
            <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '8px' }}>
              Note: CSS is scoped to this element wrapper
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Spacing Reset Component
const SpacingInputs = ({ type, props, updateProp, customLabel }) => {
  const isMargin = type === 'margin';
  const defaultLabel = isMargin ? 'Margin (External Spacing)' : 'Padding (Box Container)';
  const label = customLabel || defaultLabel;
  const prefix = isMargin ? 'margin' : 'padding';
  
  const resetAll = () => {
    // We need access to updateElementProps from parent context, so we'll batch update
    const updates = {
      [`${prefix}Top`]: 0,
      [`${prefix}Right`]: 0,
      [`${prefix}Bottom`]: 0,
      [`${prefix}Left`]: 0,
    };
    Object.keys(updates).forEach(key => updateProp(key, updates[key]));
  };

  const resetSide = (side) => {
    updateProp(`${prefix}${side}`, 0);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <Label className="text-gray-500 text-[10px] block">{label}</Label>
        <button
          onClick={resetAll}
          title="Reset all to 0"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#9CA3AF',
            transition: 'color 0.2s',
            fontSize: '10px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#4368D9'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
        >
          <RotateCcw size={12} />
          <span>RESET</span>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', marginBottom: isMargin ? '0' : '12px' }}>
        {['Top', 'Right', 'Bottom', 'Left'].map((side, idx) => (
          <div key={side} style={{ position: 'relative' }}>
            <Input
              type="number"
              placeholder={['T', 'R', 'B', 'L'][idx]}
              value={props[`${prefix}${side}`] || 0}
              onChange={(e) => updateProp(`${prefix}${side}`, parseInt(e.target.value) || 0)}
              className="bg-[#1A1F2E] border-gray-700 text-white h-8 text-xs text-center pr-6"
              style={{ colorScheme: 'dark' }}
            />
            <button
              onClick={() => resetSide(side)}
              title="Reset to 0"
              style={{
                position: 'absolute',
                right: '2px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                color: '#6B7280',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#4368D9'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              <RotateCcw size={10} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default function PropertiesPanelV2({ selectedElement, updateElementProps, onDeleteElement, onDuplicateElement, onBack, setSelectedElement }) {
  const [activeTab, setActiveTab] = useState('content');
  const [accordionValue, setAccordionValue] = useState('');

  // Reset accordion when changing tabs to Advanced or when selectedElement changes
  React.useEffect(() => {
    if (activeTab === 'advanced') {
      setAccordionValue('');
    }
  }, [activeTab, selectedElement?.id]);

  if (!selectedElement) {
    return (
      <div style={{ width: '320px', flex: '0 0 320px', maxWidth: '320px', minWidth: '320px', backgroundColor: '#121726', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em' }}>PROPERTIES</h2>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
          <div>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Settings size={32} color="#4B5563" />
            </div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>No Element Selected</h3>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Click an element to edit</p>
          </div>
        </div>
      </div>
    );
  }

  const updateProp = (prop, value) => {
    updateElementProps(selectedElement.id, { [prop]: value });
  };

  return (
    <div style={{ width: '320px', flex: '0 0 320px', maxWidth: '320px', minWidth: '320px', backgroundColor: '#121726', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="h-6 w-6 -ml-1 text-gray-400 hover:text-white hover:bg-white/10"
            >
              <ChevronLeft size={16} />
            </Button>
            <h2 style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em' }}>PROPERTIES</h2>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDuplicateElement(selectedElement.id)}
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10"
            >
              <Copy size={14} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDeleteElement(selectedElement.id)}
              className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#4368D9', fontWeight: '500' }}>{selectedElement.type}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-white/10 bg-transparent p-0 h-auto flex-shrink-0">
          <TabsTrigger 
            value="content" 
            className="flex-1 rounded-none data-[state=active]:bg-[#4368D9]/20 data-[state=active]:text-[#4368D9] data-[state=active]:border-b-2 data-[state=active]:border-[#4368D9] py-3 text-xs font-medium"
          >
            Content
          </TabsTrigger>
          <TabsTrigger 
            value="style" 
            className="flex-1 rounded-none data-[state=active]:bg-[#4368D9]/20 data-[state=active]:text-[#4368D9] data-[state=active]:border-b-2 data-[state=active]:border-[#4368D9] py-3 text-xs font-medium"
          >
            Style
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="flex-1 rounded-none data-[state=active]:bg-[#4368D9]/20 data-[state=active]:text-[#4368D9] data-[state=active]:border-b-2 data-[state=active]:border-[#4368D9] py-3 text-xs font-medium"
          >
            Advanced
          </TabsTrigger>
        </TabsList>

        <div style={{ 
          flex: 1, 
          minHeight: 0, 
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          padding: '16px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.25) rgba(255,255,255,0.06)'
        }} className="custom-scrollbar-properties">
          <style>{`
            .custom-scrollbar-properties::-webkit-scrollbar {
              width: 10px !important;
              height: 10px;
            }
            .custom-scrollbar-properties::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.06) !important;
              border-radius: 4px;
            }
            .custom-scrollbar-properties::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.25) !important;
              border-radius: 999px;
              border: 2px solid #121726;
            }
            .custom-scrollbar-properties::-webkit-scrollbar-thumb:hover {
              background: rgba(255,255,255,0.35) !important;
            }
            
            /* Fix number input arrows color for dark theme */
            input[type="number"] {
              color-scheme: dark;
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              opacity: 1;
              filter: brightness(1.8) contrast(1.5);
              cursor: pointer;
            }
            input[type="number"]::-webkit-inner-spin-button:hover,
            input[type="number"]::-webkit-outer-spin-button:hover {
              filter: brightness(2.2) contrast(1.8);
            }
          `}</style>
          <TabsContent value="content" className="mt-0">
            <ContentTab 
              element={selectedElement} 
              updateProp={updateProp} 
              updateElementProps={(props) => updateElementProps(selectedElement.id, props)} 
              setSelectedElement={setSelectedElement}
            />
          </TabsContent>

          <TabsContent value="style" className="mt-0">
            <StyleTab element={selectedElement} updateProp={updateProp} />
          </TabsContent>

          <TabsContent value="advanced" className="mt-0">
            <AdvancedTab element={selectedElement} updateProp={updateProp} accordionValue={accordionValue} setAccordionValue={setAccordionValue} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}