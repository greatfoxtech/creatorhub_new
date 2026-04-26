import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Plus, X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import BackgroundSettings from './BackgroundSettings';

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

export default function SubmenuSettings({ item, updateItem, removeItem }) {
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(item.tabs || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateItem('tabs', items);
  };

  const addTab = () => {
    const newTab = { 
      id: `tab-${Date.now()}`, 
      label: 'New Tab', 
      type: 'social_view', // social_view, url, anchor
      value: 'posts', // posts, reels, etc. or url
      visibility: 'both' 
    };
    updateItem('tabs', [...(item.tabs || []), newTab]);
  };

  const removeTab = (index) => {
    const newTabs = [...(item.tabs || [])];
    newTabs.splice(index, 1);
    updateItem('tabs', newTabs);
  };

  const updateTab = (index, key, value) => {
    const newTabs = [...(item.tabs || [])];
    newTabs[index] = { ...newTabs[index], [key]: value };
    updateItem('tabs', newTabs);
  };

  return (
    <div style={{
      backgroundColor: '#1A1F2E', 
      padding: '16px', 
      borderRadius: '8px', 
      marginBottom: '16px',
      border: '1px solid rgba(67, 104, 217, 0.3)',
      transition: 'all 0.3s ease'
    }} id={`section-${item.id}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em' }}>PROFILE TABS (SUBMENU)</h4>
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={() => removeItem(item.id)}
          className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
        >
          <X size={14} />
        </Button>
      </div>

      {/* Tabs Manager */}
      <div className="mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Label className="text-gray-400 text-xs">Tabs</Label>
          <Button 
            size="sm" 
            onClick={addTab}
            className="bg-[#4368D9] hover:bg-[#3a59b4] text-white h-5 text-xs px-2"
          >
            <Plus size={10} className="mr-1" /> Add Tab
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="submenu-tabs">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}
              >
                {(item.tabs || []).map((tab, idx) => (
                  <Draggable key={tab.id || idx} draggableId={tab.id || `tab-${idx}`} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: '#0D0F12', 
                          padding: '10px', 
                          borderRadius: '6px', 
                          marginBottom: '8px',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <div {...provided.dragHandleProps} className="cursor-grab text-gray-600 hover:text-gray-400">
                            <GripVertical size={12} />
                          </div>
                          <Input 
                            value={tab.label} 
                            onChange={(e) => updateTab(idx, 'label', e.target.value)}
                            className="h-7 text-xs bg-[#1A1F2E] border-gray-700 text-white flex-1"
                            placeholder="Label"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeTab(idx)}
                            className="h-6 w-6 text-red-400 hover:text-red-300"
                          >
                            <X size={12} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Select value={tab.type} onValueChange={(v) => updateTab(idx, 'type', v)}>
                            <SelectTrigger className="h-7 text-[10px] bg-[#1A1F2E] border-gray-700 text-white">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#121726] border-gray-700 text-white">
                              <SelectItem value="social_view">Social View</SelectItem>
                              <SelectItem value="url">URL</SelectItem>
                              <SelectItem value="anchor">Anchor</SelectItem>
                            </SelectContent>
                          </Select>

                          {tab.type === 'social_view' ? (
                            <Select value={tab.value} onValueChange={(v) => updateTab(idx, 'value', v)}>
                              <SelectTrigger className="h-7 text-[10px] bg-[#1A1F2E] border-gray-700 text-white">
                                <SelectValue placeholder="View" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#121726] border-gray-700 text-white">
                                <SelectItem value="posts">Posts</SelectItem>
                                <SelectItem value="reels">Reels</SelectItem>
                                <SelectItem value="tagged">Tagged</SelectItem>
                                <SelectItem value="about">About</SelectItem>
                                <SelectItem value="shop">Shop</SelectItem>
                                <SelectItem value="links">Links</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input 
                              value={tab.value || ''} 
                              onChange={(e) => updateTab(idx, 'value', e.target.value)}
                              className="h-7 text-[10px] bg-[#1A1F2E] border-gray-700 text-white"
                              placeholder={tab.type === 'url' ? 'https://...' : '#section'}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Style & Layout */}
      <div className="space-y-4 pt-4 border-t border-gray-700">
        <h5 className="text-[10px] uppercase font-bold text-gray-400">Appearance</h5>
        
        <div className="grid grid-cols-2 gap-3">
           <div>
             <Label className="text-gray-500 text-[10px] block mb-1">Style</Label>
             <Select value={item.styleVariant || 'underline'} onValueChange={(v) => updateItem('styleVariant', v)}>
                <SelectTrigger className="h-7 text-xs bg-[#121726] border-gray-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="underline">Underline</SelectItem>
                  <SelectItem value="pills">Pills</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
             </Select>
           </div>
           <div>
             <Label className="text-gray-500 text-[10px] block mb-1">Alignment</Label>
             <Select value={item.alignment || 'center'} onValueChange={(v) => updateItem('alignment', v)}>
                <SelectTrigger className="h-7 text-xs bg-[#121726] border-gray-700 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#121726] border-gray-700 text-white">
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify (Spread)</SelectItem>
                </SelectContent>
             </Select>
           </div>
        </div>

        <div className="mb-4">
          <Label className="text-gray-400 text-xs mb-2 block">Background</Label>
          <BackgroundSettings 
            values={{
              mode: item.backgroundMode || (item.backgroundColor && item.backgroundColor !== 'transparent' ? 'color' : 'color'),
              color: item.backgroundColor,
              gradientColor1: item.gradientColor1,
              gradientColor2: item.gradientColor2,
              gradientType: item.gradientType,
              gradientAngle: item.gradientAngle,
              imageSrc: item.backgroundImage,
              imageSize: item.imageSize,
              imageRepeat: item.imageRepeat,
              imagePosition: item.imagePosition,
              overlayColor: item.overlayColor,
              overlayOpacity: item.overlayOpacity,
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
                overlayOpacity: newValues.overlayOpacity
              };

              // Initialize defaults if switching to gradient and values are missing
              if (newValues.mode === 'gradient' && !item.gradientColor1) {
                  updates.gradientColor1 = '#ffffff';
                  updates.gradientColor2 = '#000000';
                  updates.gradientAngle = 180;
                  updates.gradientType = 'linear';
              }

              updateItem(updates);
            }}
          />
        </div>

        <ColorInput label="Text Color" value={item.textColor} onChange={(v) => updateItem('textColor', v)} />
        <ColorInput label="Active Color" value={item.activeColor} onChange={(v) => updateItem('activeColor', v)} />

        <div className="flex items-center justify-between pt-2">
           <Label className="text-gray-400 text-xs">Sticky Submenu</Label>
           <input 
             type="checkbox" 
             checked={item.sticky || false} 
             onChange={(e) => updateItem('sticky', e.target.checked)}
             className="accent-[#4368D9]"
           />
        </div>
        <div className="flex items-center justify-between">
           <Label className="text-gray-400 text-xs">Mobile Scroll</Label>
           <input 
             type="checkbox" 
             checked={item.mobileScroll || true} 
             onChange={(e) => updateItem('mobileScroll', e.target.checked)}
             className="accent-[#4368D9]"
           />
        </div>
      </div>
    </div>
  );
}