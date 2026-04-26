import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const ColorPicker = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <Label className="text-gray-300 text-sm">{label}</Label>
    <div className="flex items-center gap-2 border border-gray-700 rounded-md px-3 py-2 bg-[#1A1F2E]">
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 bg-transparent border-none cursor-pointer rounded"
      />
      <span className="text-sm text-gray-400 flex-1">{value}</span>
    </div>
  </div>
);

const NumberInput = ({ label, value, onChange, min, max, step = 1, unit = '' }) => (
  <div className="space-y-2">
    <Label className="text-gray-300 text-sm">{label}</Label>
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={value || 0}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        min={min}
        max={max}
        step={step}
        className="bg-[#1A1F2E] border-gray-700 text-white"
      />
      {unit && <span className="text-sm text-gray-400">{unit}</span>}
    </div>
  </div>
);

const TextInput = ({ label, value, onChange, placeholder = '' }) => (
  <div className="space-y-2">
    <Label className="text-gray-300 text-sm">{label}</Label>
    <Input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-[#1A1F2E] border-gray-700 text-white"
    />
  </div>
);

const TextAreaInput = ({ label, value, onChange, placeholder = '', rows = 4 }) => (
  <div className="space-y-2">
    <Label className="text-gray-300 text-sm">{label}</Label>
    <Textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-[#1A1F2E] border-gray-700 text-white"
    />
  </div>
);

const SelectInput = ({ label, value, onChange, options }) => (
  <div className="space-y-2">
    <Label className="text-gray-300 text-sm">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[#121726] border-gray-700 text-white">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const SwitchInput = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <Label className="text-gray-300 text-sm">{label}</Label>
    <Switch checked={value} onCheckedChange={onChange} />
  </div>
);

const SliderInput = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <Label className="text-gray-300 text-sm">{label}</Label>
      <span className="text-sm text-gray-400">{value}{unit}</span>
    </div>
    <Slider
      value={[value || 0]}
      onValueChange={([val]) => onChange(val)}
      min={min}
      max={max}
      step={step}
      className="w-full"
    />
  </div>
);

const ContentTab = ({ element, updateProp }) => {
  const commonComponents = (
    <>
      {element.type === 'Heading' && (
        <>
          <TextInput label="Text" value={element.props.text} onChange={(v) => updateProp('text', v)} />
          <SelectInput
            label="Heading Level"
            value={element.props.level}
            onChange={(v) => updateProp('level', v)}
            options={[
              { value: 'h1', label: 'H1 - Main Title' },
              { value: 'h2', label: 'H2 - Section' },
              { value: 'h3', label: 'H3 - Subsection' },
              { value: 'h4', label: 'H4 - Minor Heading' },
              { value: 'h5', label: 'H5' },
              { value: 'h6', label: 'H6' },
            ]}
          />
        </>
      )}

      {element.type === 'Text' && (
        <TextAreaInput label="Content" value={element.props.text} onChange={(v) => updateProp('text', v)} rows={6} />
      )}

      {element.type === 'Button' && (
        <>
          <TextInput label="Button Text" value={element.props.text} onChange={(v) => updateProp('text', v)} />
          <TextInput label="Link URL" value={element.props.href} onChange={(v) => updateProp('href', v)} placeholder="https://" />
          <SelectInput
            label="Button Size"
            value={element.props.size}
            onChange={(v) => updateProp('size', v)}
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]}
          />
          <SwitchInput label="Open in new tab" value={element.props.newTab} onChange={(v) => updateProp('newTab', v)} />
        </>
      )}

      {element.type === 'Image' && (
        <>
          <TextInput label="Image URL" value={element.props.src} onChange={(v) => updateProp('src', v)} placeholder="https://" />
          <TextInput label="Alt Text" value={element.props.alt} onChange={(v) => updateProp('alt', v)} placeholder="Describe the image" />
          <TextInput label="Link URL (optional)" value={element.props.href} onChange={(v) => updateProp('href', v)} placeholder="https://" />
          <SliderInput label="Border Radius" value={element.props.borderRadius} onChange={(v) => updateProp('borderRadius', v)} max={50} unit="px" />
        </>
      )}

      {element.type === 'Video' && (
        <>
          <TextInput label="Video URL" value={element.props.src} onChange={(v) => updateProp('src', v)} placeholder="YouTube or video URL" />
          <SwitchInput label="Autoplay" value={element.props.autoplay} onChange={(v) => updateProp('autoplay', v)} />
          <SwitchInput label="Show Controls" value={element.props.controls} onChange={(v) => updateProp('controls', v)} />
        </>
      )}

      {element.type === 'Icon' && (
        <>
          <SelectInput
            label="Icon"
            value={element.props.icon}
            onChange={(v) => updateProp('icon', v)}
            options={[
              { value: 'Star', label: 'Star' },
              { value: 'Heart', label: 'Heart' },
              { value: 'Check', label: 'Check' },
              { value: 'X', label: 'X' },
              { value: 'ArrowRight', label: 'Arrow Right' },
            ]}
          />
          <SliderInput label="Size" value={element.props.size} onChange={(v) => updateProp('size', v)} min={16} max={128} unit="px" />
        </>
      )}

      {element.type === 'Divider' && (
        <>
          <SliderInput label="Thickness" value={element.props.thickness} onChange={(v) => updateProp('thickness', v)} min={1} max={10} unit="px" />
          <SelectInput
            label="Style"
            value={element.props.style}
            onChange={(v) => updateProp('style', v)}
            options={[
              { value: 'solid', label: 'Solid' },
              { value: 'dashed', label: 'Dashed' },
              { value: 'dotted', label: 'Dotted' },
            ]}
          />
        </>
      )}

      {element.type === 'Spacer' && (
        <SliderInput label="Height" value={element.props.height} onChange={(v) => updateProp('height', v)} min={8} max={200} unit="px" />
      )}

      {(element.type === 'Form' || element.type === 'ContactForm') && (
        <>
          <TextInput label="Form Title" value={element.props.title} onChange={(v) => updateProp('title', v)} />
          <TextAreaInput label="Description" value={element.props.description} onChange={(v) => updateProp('description', v)} rows={3} />
          <TextInput label="Submit Button Text" value={element.props.submitText} onChange={(v) => updateProp('submitText', v)} />
        </>
      )}
    </>
  );

  return <div className="space-y-4">{commonComponents}</div>;
};

const StyleTab = ({ element, updateProp }) => {
  return (
    <div className="space-y-4">
      {/* Typography */}
      {['Heading', 'Text', 'Button'].includes(element.type) && (
        <>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Typography</h4>
            <ColorPicker label="Text Color" value={element.props.color} onChange={(v) => updateProp('color', v)} />
            <SelectInput
              label="Font Family"
              value={element.props.fontFamily}
              onChange={(v) => updateProp('fontFamily', v)}
              options={[
                { value: 'inherit', label: 'Default' },
                { value: 'Inter', label: 'Inter' },
                { value: 'Poppins', label: 'Poppins' },
                { value: 'Roboto', label: 'Roboto' },
                { value: 'Lato', label: 'Lato' },
                { value: 'Montserrat', label: 'Montserrat' },
              ]}
            />
            <SliderInput label="Font Size" value={element.props.fontSize} onChange={(v) => updateProp('fontSize', v)} min={12} max={72} unit="px" />
            <SelectInput
              label="Font Weight"
              value={element.props.fontWeight}
              onChange={(v) => updateProp('fontWeight', v)}
              options={[
                { value: '300', label: 'Light' },
                { value: '400', label: 'Normal' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'Semi Bold' },
                { value: '700', label: 'Bold' },
              ]}
            />
            <SelectInput
              label="Text Align"
              value={element.props.textAlign}
              onChange={(v) => updateProp('textAlign', v)}
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
                { value: 'justify', label: 'Justify' },
              ]}
            />
          </div>
        </>
      )}

      {/* Background & Border */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Background & Border</h4>
        <ColorPicker label="Background Color" value={element.props.backgroundColor} onChange={(v) => updateProp('backgroundColor', v)} />
        <ColorPicker label="Border Color" value={element.props.borderColor} onChange={(v) => updateProp('borderColor', v)} />
        <SliderInput label="Border Width" value={element.props.borderWidth} onChange={(v) => updateProp('borderWidth', v)} max={10} unit="px" />
        <SliderInput label="Border Radius" value={element.props.borderRadius} onChange={(v) => updateProp('borderRadius', v)} max={50} unit="px" />
      </div>

      {/* Spacing */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Spacing</h4>
        <SliderInput label="Padding" value={element.props.padding} onChange={(v) => updateProp('padding', v)} max={100} unit="px" />
        <SliderInput label="Margin" value={element.props.margin} onChange={(v) => updateProp('margin', v)} max={100} unit="px" />
      </div>
    </div>
  );
};

const AdvancedTab = ({ element, updateProp }) => {
  return (
    <div className="space-y-4">
      <TextInput label="Custom CSS Class" value={element.props.className} onChange={(v) => updateProp('className', v)} placeholder="my-custom-class" />
      <TextInput label="Element ID" value={element.props.id} onChange={(v) => updateProp('id', v)} placeholder="my-element-id" />
      
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Visibility</h4>
        <SwitchInput label="Visible on Desktop" value={element.props.visibleDesktop !== false} onChange={(v) => updateProp('visibleDesktop', v)} />
        <SwitchInput label="Visible on Tablet" value={element.props.visibleTablet !== false} onChange={(v) => updateProp('visibleTablet', v)} />
        <SwitchInput label="Visible on Mobile" value={element.props.visibleMobile !== false} onChange={(v) => updateProp('visibleMobile', v)} />
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white">Animation</h4>
        <SelectInput
          label="Animation Type"
          value={element.props.animation}
          onChange={(v) => updateProp('animation', v)}
          options={[
            { value: 'none', label: 'None' },
            { value: 'fadeIn', label: 'Fade In' },
            { value: 'slideUp', label: 'Slide Up' },
            { value: 'slideDown', label: 'Slide Down' },
            { value: 'zoomIn', label: 'Zoom In' },
          ]}
        />
        {element.props.animation !== 'none' && (
          <SliderInput
            label="Animation Duration"
            value={element.props.animationDuration}
            onChange={(v) => updateProp('animationDuration', v)}
            min={100}
            max={2000}
            step={100}
            unit="ms"
          />
        )}
      </div>
    </div>
  );
};

export default function PropertiesPanel({ selectedElement = null, updateElementProps = () => {}, onDeleteElement = () => {} }) {
  const [activeTab, setActiveTab] = useState('content');

  if (!selectedElement) {
    return (
      <aside className="w-80 flex-shrink-0 bg-[#121726] p-4 border-l border-white/10 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-white">Properties</h3>
        <div className="text-center text-gray-400 py-10">
          <p className="text-sm">No Element Selected</p>
          <p className="text-xs mt-2">Click on an element in the canvas to edit its properties.</p>
        </div>
      </aside>
    );
  }

  const updateProp = (prop, value) => {
    updateElementProps(selectedElement.id, { [prop]: value });
  };

  return (
    <aside className="w-80 flex-shrink-0 bg-[#121726] border-l border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Properties</h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDeleteElement(selectedElement.id)}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-400">{selectedElement.type}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-white/10 bg-transparent p-0">
          <TabsTrigger value="content" className="flex-1 rounded-none data-[state=active]:bg-[#4368D9]/20 data-[state=active]:text-[#4368D9]">
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1 rounded-none data-[state=active]:bg-[#4368D9]/20 data-[state=active]:text-[#4368D9]">
            Style
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1 rounded-none data-[state=active]:bg-[#4368D9]/20 data-[state=active]:text-[#4368D9]">
            Advanced
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="content" className="mt-0">
            <ContentTab element={selectedElement} updateProp={updateProp} />
          </TabsContent>

          <TabsContent value="style" className="mt-0">
            <StyleTab element={selectedElement} updateProp={updateProp} />
          </TabsContent>

          <TabsContent value="advanced" className="mt-0">
            <AdvancedTab element={selectedElement} updateProp={updateProp} />
          </TabsContent>
        </div>
      </Tabs>
    </aside>
  );
}