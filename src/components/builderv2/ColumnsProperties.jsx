import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RotateCcw } from 'lucide-react';
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
  return label ? <PropertyField label={label}>{content}</PropertyField> : content;
};

const SpacingInputs = ({ type, props, updateProp }) => {
  const isMargin = type === 'margin';
  const label = isMargin ? 'Margin (External)' : 'Padding (Internal)';
  const prefix = isMargin ? 'margin' : 'padding';
  
  const resetAll = () => {
    updateProp(`${prefix}Top`, 0);
    updateProp(`${prefix}Right`, 0);
    updateProp(`${prefix}Bottom`, 0);
    updateProp(`${prefix}Left`, 0);
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
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#9CA3AF',
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

export const ColumnsContentTab = ({ element, updateProp }) => {
  const columns = element.props.children || [];
  
  const updateColumnCount = (count) => {
    const currentCount = columns.length;
    if (count > currentCount) {
      const newCols = [...columns];
      for (let i = currentCount; i < count; i++) {
        newCols.push({ id: `col-${Date.now()}-${i}`, width: `${100/count}%`, children: [] });
      }
      updateProp('columnCount', count);
      updateProp('children', newCols);
    } else if (count < currentCount) {
      updateProp('columnCount', count);
      updateProp('children', columns.slice(0, count));
    }
  };

  return (
    <>
      <PropertyField label="Column Count">
        <Select 
          value={String(element.props.columnCount || 2)} 
          onValueChange={(v) => updateColumnCount(parseInt(v))}
        >
          <SelectTrigger className="bg-[#1A1F2E] border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#121726] border-gray-700 text-white">
            {[1,2,3,4,5,6].map(n => (
              <SelectItem key={n} value={String(n)}>{n} Column{n > 1 ? 's' : ''}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PropertyField>

      <NumberSlider 
        label="Gap" 
        value={element.props.gap || 16} 
        onChange={(v) => updateProp('gap', v)} 
        max={100} 
        unit="px" 
      />

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>RESPONSIVE STACKING</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
            <input
              type="checkbox"
              checked={element.props.stackOnTablet !== false}
              onChange={(e) => updateProp('stackOnTablet', e.target.checked)}
              className="accent-[#4368D9]"
            />
            Stack on Tablet
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#E5E7EB' }}>
            <input
              type="checkbox"
              checked={element.props.stackOnMobile !== false}
              onChange={(e) => updateProp('stackOnMobile', e.target.checked)}
              className="accent-[#4368D9]"
            />
            Stack on Mobile
          </label>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '16px' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>COLUMN WIDTHS</h4>
        
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {columns.map((col, idx) => (
            <div key={col.id} style={{ flex: 1, minWidth: '60px' }}>
              <Label className="text-gray-500 text-[10px] mb-1 block">Col {idx + 1}</Label>
              <Input
                value={col.width || ''}
                onChange={(e) => {
                  const newCols = [...columns];
                  newCols[idx] = { ...newCols[idx], width: e.target.value };
                  updateProp('children', newCols);
                }}
                placeholder="auto, %, px"
                className="bg-[#1A1F2E] border-gray-700 text-white h-7 text-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const ColumnsStyleTab = ({ element, updateProp }) => {
  return (
    <>
      {/* Background */}
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

      {/* Border */}
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
          max={100} 
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
        <PropertyField label="Box Shadow">
          <Input
            value={element.props.boxShadow || ''}
            onChange={(e) => updateProp('boxShadow', e.target.value)}
            placeholder="0 4px 6px rgba(0,0,0,0.1)"
            className="bg-[#1A1F2E] border-gray-700 text-white text-sm"
          />
        </PropertyField>
      </div>

      {/* Spacing */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '12px', letterSpacing: '0.05em' }}>SPACING</h4>
        <SpacingInputs type="padding" props={element.props} updateProp={updateProp} />
        <SpacingInputs type="margin" props={element.props} updateProp={updateProp} />
      </div>
    </>
  );
};