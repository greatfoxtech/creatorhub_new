import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import RenderedComponentV2 from './RenderedComponentV2';

// Minimal clean renderer — no drag handles, no selection borders
const PreviewElement = ({ element }) => {
  const isLayout = Array.isArray(element.props?.children);

  if (element.type === 'Columns') {
    const columns = element.props?.children || [];
    return (
      <div style={{ display: 'flex', gap: `${element.props?.gap || 16}px` }}>
        {columns.map((col) => (
          <div key={col.id} style={{ flex: col.width || '1' }}>
            {(col.children || []).map((child) => (
              <PreviewElement key={child.id} element={child} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (isLayout) {
    const children = element.props?.children || [];
    return (
      <div style={getContainerStyles(element)}>
        {children.map((child) => (
          <PreviewElement key={child.id} element={child} />
        ))}
      </div>
    );
  }

  return <RenderedComponentV2 element={element} onSelect={() => {}} />;
};

const getContainerStyles = (element) => {
  const props = element.props || {};
  const styles = {
    width: props.widthMode === 'full' ? '100%' : 'auto',
    maxWidth: props.widthMode === 'boxed' ? `${props.maxWidth || 1200}px` : 'none',
    margin: element.type === 'Container' ? '0 auto' : '0',
    minHeight: props.minHeight || 'auto',
    overflow: props.overflow || 'visible',
    paddingTop: `${props.paddingTop ?? (element.type === 'Section' ? 48 : 24)}px`,
    paddingRight: `${props.paddingRight ?? 24}px`,
    paddingBottom: `${props.paddingBottom ?? (element.type === 'Section' ? 48 : 24)}px`,
    paddingLeft: `${props.paddingLeft ?? 24}px`,
    opacity: props.opacity !== undefined ? props.opacity : 1,
    borderRadius: `${props.borderRadius || 0}px`,
    display: props.displayMode === 'grid' ? 'grid' : 'flex',
    flexDirection: props.flexDirection || 'column',
    gap: `${props.gap || 16}px`,
    alignItems: props.alignItems || 'stretch',
    justifyContent: props.justifyContent || 'flex-start',
  };

  if (props.backgroundMode === 'gradient') {
    const type = props.gradientType || 'linear';
    const angle = props.gradientAngle || 180;
    const c1 = props.gradientColor1 || '#ffffff';
    const c2 = props.gradientColor2 || '#000000';
    styles.background = type === 'radial'
      ? `radial-gradient(circle, ${c1}, ${c2})`
      : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
  } else if (props.backgroundMode === 'image' && props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`;
    styles.backgroundSize = props.imageSize || 'cover';
    styles.backgroundRepeat = props.imageRepeat || 'no-repeat';
    styles.backgroundPosition = props.imagePosition || 'center';
  } else {
    styles.backgroundColor = props.backgroundColor || 'transparent';
  }

  if (props.borderWidth) {
    styles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
  }

  if (props.boxShadow) styles.boxShadow = props.boxShadow;

  return styles;
};

const DEVICE_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

export default function PreviewModal({ open, onOpenChange, elements }) {
  const [deviceView, setDeviceView] = useState('desktop');

  const headerElement = elements.find(el => el.type === 'Header');
  const footerElement = elements.find(el => el.type === 'Footer');
  const bodyElements = elements.filter(el => el.type !== 'Header' && el.type !== 'Footer');

  const DeviceBtn = ({ type, Icon }) => (
    <button
      onClick={() => setDeviceView(type)}
      style={{
        padding: '6px 10px',
        backgroundColor: deviceView === type ? 'rgba(255,255,255,0.15)' : 'transparent',
        color: deviceView === type ? '#ffffff' : '#9CA3AF',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s',
      }}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 border-0 bg-transparent shadow-none"
        style={{ maxWidth: '100vw', width: '100vw', height: '100vh', maxHeight: '100vh', borderRadius: 0 }}
      >
        {/* Preview toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '52px',
          padding: '0 20px',
          backgroundColor: '#121726',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff', letterSpacing: '0.02em' }}>
            Preview Mode
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '4px' }}>
            <DeviceBtn type="desktop" Icon={Monitor} />
            <DeviceBtn type="tablet" Icon={Tablet} />
            <DeviceBtn type="mobile" Icon={Smartphone} />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-gray-300 hover:text-white hover:bg-white/10 gap-1.5"
          >
            <X size={15} />
            Exit Preview
          </Button>
        </div>

        {/* Preview content */}
        <div style={{
          marginTop: '52px',
          height: 'calc(100vh - 52px)',
          backgroundColor: '#e5e7eb',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: deviceView === 'desktop' ? 'stretch' : 'center',
          padding: deviceView !== 'desktop' ? '24px' : '0',
        }}>
          <div style={{
            width: DEVICE_WIDTHS[deviceView],
            minHeight: '100%',
            backgroundColor: '#ffffff',
            boxShadow: deviceView !== 'desktop' ? '0 8px 32px rgba(0,0,0,0.18)' : 'none',
            borderRadius: deviceView !== 'desktop' ? '12px' : '0',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Header */}
            {headerElement && <RenderedComponentV2 element={headerElement} onSelect={() => {}} />}

            {/* Body */}
            <div style={{ flex: 1 }}>
              {bodyElements.map(el => (
                <PreviewElement key={el.id} element={el} />
              ))}
              {bodyElements.length === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#9CA3AF', fontSize: '14px' }}>
                  No content to preview
                </div>
              )}
            </div>

            {/* Footer */}
            {footerElement && <RenderedComponentV2 element={footerElement} onSelect={() => {}} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}