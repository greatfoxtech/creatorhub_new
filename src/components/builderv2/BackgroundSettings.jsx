import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUploadField from './ImageUploadField';

const ColorPicker = ({ value, onChange }) => (
  <div className="flex items-center gap-2 bg-[#1A1F2E] border border-white/10 rounded-md p-2">
    <input
      type="color"
      value={value || '#ffffff'}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent"
    />
    <input 
        type="text" 
        value={value || '#ffffff'} 
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none font-mono"
    />
  </div>
);

const NumberInput = ({ value, onChange, min, max, unit }) => (
  <div className="flex items-center gap-2">
    <Slider
      value={[value || 0]}
      onValueChange={([v]) => onChange(v)}
      min={min}
      max={max}
      step={1}
      className="flex-1"
    />
    <span className="text-xs text-gray-400 w-8 text-right">{value}{unit}</span>
  </div>
);

export default function BackgroundSettings({ 
  values = {}, 
  onChange, 
  defaultMode = 'color' 
}) {
  const mode = values.mode || defaultMode;

  const update = (key, value) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => update('mode', v)} className="w-full">
        <TabsList className="w-full bg-[#1A1F2E] border border-white/10">
          <TabsTrigger value="color" className="flex-1 text-xs">Color</TabsTrigger>
          <TabsTrigger value="gradient" className="flex-1 text-xs">Gradient</TabsTrigger>
          <TabsTrigger value="image" className="flex-1 text-xs">Image</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          {mode === 'color' && (
            <div>
              <Label className="text-xs text-gray-400 mb-2 block">Solid Color</Label>
              <ColorPicker 
                value={values.color} 
                onChange={(v) => update('color', v)} 
              />
            </div>
          )}

          {mode === 'gradient' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-400 mb-2 block">Color 1</Label>
                  <ColorPicker value={values.gradientColor1} onChange={(v) => update('gradientColor1', v)} />
                </div>
                <div>
                  <Label className="text-xs text-gray-400 mb-2 block">Color 2</Label>
                  <ColorPicker value={values.gradientColor2} onChange={(v) => update('gradientColor2', v)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label className="text-xs text-gray-400 mb-2 block">Type</Label>
                    <Select value={values.gradientType || 'linear'} onValueChange={(v) => update('gradientType', v)}>
                        <SelectTrigger className="bg-[#1A1F2E] border-white/10 h-9 text-xs">
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {values.gradientType !== 'radial' && (
                    <div>
                        <Label className="text-xs text-gray-400 mb-2 block">Angle ({values.gradientAngle || 180}°)</Label>
                        <div className="pt-2">
                            <Slider
                                value={[values.gradientAngle || 180]}
                                onValueChange={([v]) => update('gradientAngle', v)}
                                min={0}
                                max={360}
                                step={1}
                            />
                        </div>
                    </div>
                )}
              </div>
            </>
          )}

          {mode === 'image' && (
            <>
              <ImageUploadField
                label="Background Image"
                value={values.imageSrc}
                onChange={(url) => update('imageSrc', url)}
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-400 mb-2 block">Size</Label>
                  <Select value={values.imageSize || 'cover'} onValueChange={(v) => update('imageSize', v)}>
                    <SelectTrigger className="bg-[#1A1F2E] border-white/10 h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cover">Cover</SelectItem>
                      <SelectItem value="contain">Contain</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-400 mb-2 block">Repeat</Label>
                  <Select value={values.imageRepeat || 'no-repeat'} onValueChange={(v) => update('imageRepeat', v)}>
                    <SelectTrigger className="bg-[#1A1F2E] border-white/10 h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-repeat">No Repeat</SelectItem>
                      <SelectItem value="repeat">Repeat</SelectItem>
                      <SelectItem value="repeat-x">Repeat X</SelectItem>
                      <SelectItem value="repeat-y">Repeat Y</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                  <Label className="text-xs text-gray-400 mb-2 block">Position</Label>
                  <Select value={values.imagePosition || 'center'} onValueChange={(v) => update('imagePosition', v)}>
                    <SelectTrigger className="bg-[#1A1F2E] border-white/10 h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
              </div>

              <div className="pt-2 border-t border-white/10">
                <Label className="text-xs text-gray-400 mb-2 block">Overlay</Label>
                <div className="grid grid-cols-[1fr_auto] gap-2 items-center mb-2">
                   <ColorPicker value={values.overlayColor} onChange={(v) => update('overlayColor', v)} />
                </div>
                <div className="flex items-center gap-2">
                    <Label className="text-[10px] text-gray-500 w-12">Opacity</Label>
                    <Slider
                        value={[values.overlayOpacity !== undefined ? values.overlayOpacity : 0]}
                        onValueChange={([v]) => update('overlayOpacity', v)}
                        min={0}
                        max={100}
                        step={1}
                        className="flex-1"
                    />
                    <span className="text-[10px] text-gray-400 w-6 text-right">{values.overlayOpacity || 0}%</span>
                </div>
              </div>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
}