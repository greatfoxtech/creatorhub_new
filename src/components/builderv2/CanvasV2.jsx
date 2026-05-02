import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Copy, Plus } from 'lucide-react';
import RenderedComponentV2 from './RenderedComponentV2';
import { Button } from '@/components/ui/button';

// Shared droppable type - imported from parent to ensure consistency
// Default to "BUILDER" if not provided

// Nested droppable renderer for layout components (Container, Section, Grid)
const NestedDroppableRenderer = ({ element, renderElement, dndType }) => {
  // For Columns: special case with multiple droppables (one per column)
  if (element.type === 'Columns') {
    const columns = element.props?.children || [];
    
    return (
      <div style={{ display: 'flex', gap: `${element.props.gap || 16}px` }}>
        {columns.map((col, colIdx) => {
          const colChildren = col.children || [];
          const colDroppableId = `column__${element.id}__${col.id}`;
          
          return (
            <Droppable key={col.id} droppableId={colDroppableId} type={dndType} isDropDisabled={false}>
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      flex: col.width || '1',
                      position: 'relative',
                      minHeight: '200px',
                      padding: '16px',
                      border: snapshot.isDraggingOver ? '2px dashed #4368D9' : '2px dashed rgba(67, 104, 217, 0.2)',
                      borderRadius: '4px',
                      backgroundColor: snapshot.isDraggingOver ? 'rgba(67, 104, 217, 0.08)' : 'transparent',
                      transition: 'border 0.2s, background-color 0.2s',
                    }}
                  >
                    {colChildren.length === 0 && !snapshot.isDraggingOver ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '160px',
                        color: '#9CA3AF',
                        fontSize: '13px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Drop here
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {colChildren.map((child, idx) => renderElement(child, idx, colDroppableId))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </div>
    );
  }
  
  // For Container, Section, Grid: single droppable
  const children = element.props?.children || [];
  
  // Map element types to strict zone types expected by treeUtils
  let droppableId;
  if (element.type === 'Container') {
    droppableId = `container__${element.id}`;
  } else if (element.type === 'Section') {
    droppableId = `section__${element.id}`;
  } else if (element.type === 'Grid') {
    droppableId = `grid__${element.id}`;
  } else {
    // Fallback for any other layout elements
    droppableId = `${element.type.toLowerCase()}__${element.id}`;
  }
  
  return (
    <Droppable droppableId={droppableId} type={dndType} isDropDisabled={false}>
      {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '200px',
              pointerEvents: 'auto',
              padding: '16px',
              border: snapshot.isDraggingOver ? '2px dashed #4368D9' : '2px dashed rgba(67, 104, 217, 0.2)',
              borderRadius: '4px',
              backgroundColor: snapshot.isDraggingOver ? 'rgba(67, 104, 217, 0.08)' : 'transparent',
              transition: 'border 0.2s, background-color 0.2s',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              {children.length === 0 && !snapshot.isDraggingOver ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '160px',
                  color: '#9CA3AF',
                  fontSize: '13px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Drop components here
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {children.map((child, idx) => renderElement(child, idx, droppableId))}
                </div>
              )}
            </div>
            {provided.placeholder}
          </div>
      )}
    </Droppable>
  );
};

export default function CanvasV2({ elements, selectedElement, setSelectedElement, onDeleteElement, onDuplicateElement, canvasSettings = { padding: 24, maxWidth: 900, snapToGrid: true }, deviceView = 'desktop', dndType = "BUILDER" }) {
  const DND_TYPE = dndType;
  const [hoveredElement, setHoveredElement] = React.useState(null);

  const headerElement = elements.find(el => el.type === 'Header');
  const footerElement = elements.find(el => el.type === 'Footer');
  const bodyElements = elements.filter(el => el.type !== 'Header' && el.type !== 'Footer');

  // Recursive renderer for nested elements
  const renderElement = (element, index, parentDroppableId = 'canvas') => {
    const isSelected = selectedElement?.id === element.id;
    const isHovered = hoveredElement === element.id;
    // Any element with a children array is a layout element that needs nested droppable
    const isLayoutElement = Array.isArray(element.props?.children);

    // For layout elements (Container/Section), render with nested droppable and visual styling
    if (isLayoutElement) {
      const containerStyles = getContainerStyles(element);

      return (
        <Draggable key={element.id} draggableId={element.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              onClick={(e) => {
                if (!e.target.closest('[data-drag-handle]')) {
                  e.stopPropagation();
                  setSelectedElement(element);
                }
              }}
              onMouseEnter={() => setHoveredElement(element.id)}
              onMouseLeave={() => setHoveredElement(null)}
              style={{
                ...provided.draggableProps.style,
                position: 'relative',
                marginBottom: '8px',
                border: isSelected ? '2px solid #4368D9' : isHovered ? '2px solid rgba(67, 104, 217, 0.4)' : '2px solid transparent',
                borderRadius: '6px',
                opacity: snapshot.isDragging ? 0.5 : 1,
                transition: snapshot.isDragging ? 'none' : 'border 0.15s, box-shadow 0.15s',
                boxShadow: isSelected ? '0 0 0 3px rgba(67, 104, 217, 0.15)' : 'none',
              }}
            >
              {(isSelected || isHovered) && (
                <>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '0',
                    backgroundColor: isSelected ? '#4368D9' : 'rgba(67, 104, 217, 0.9)',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '5px 10px',
                    borderRadius: '6px 6px 0 0',
                    zIndex: 10,
                    textTransform: 'uppercase',
                  }}>
                    {element.type}
                  </div>
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '-30px',
                      right: '0',
                      display: 'flex',
                      gap: '4px',
                      zIndex: 10,
                    }}>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onDuplicateElement(element.id);
                        }}
                        className="h-7 w-7 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                      >
                        <Copy size={13} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setTimeout(() => onDeleteElement(element.id), 0);
                        }}
                        className="h-7 w-7 bg-white border border-gray-200 hover:bg-red-50 text-red-600 shadow-sm"
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  )}
                </>
              )}

              <div
                {...provided.dragHandleProps}
                data-drag-handle="true"
                style={{
                  position: 'absolute',
                  left: '-36px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: isSelected || isHovered ? 1 : 0,
                  transition: 'opacity 0.2s',
                  cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                  padding: '10px',
                  backgroundColor: isSelected ? '#4368D9' : 'rgba(67, 104, 217, 0.8)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 20,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical size={18} color="#ffffff" />
              </div>

              {/* Container/Section visual wrapper with styling */}
              <div style={{ ...containerStyles, position: 'relative' }}>
                {renderContainerVisuals(element)}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <NestedDroppableRenderer element={element} renderElement={renderElement} dndType={DND_TYPE} />
                </div>
              </div>
            </div>
          )}
        </Draggable>
      );
    }

    // Regular (non-layout) elements
    return (
      <Draggable key={element.id} draggableId={element.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={(e) => {
              if (!e.target.closest('[data-drag-handle]')) {
                e.stopPropagation();
                setSelectedElement(element);
              }
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
            style={{
              ...provided.draggableProps.style,
              position: 'relative',
              marginBottom: '8px',
              border: isSelected ? '2px solid #4368D9' : isHovered ? '2px solid rgba(67, 104, 217, 0.4)' : '2px solid transparent',
              borderRadius: '6px',
              opacity: snapshot.isDragging ? 0.5 : 1,
              transition: snapshot.isDragging ? 'none' : 'border 0.15s, box-shadow 0.15s',
              boxShadow: isSelected ? '0 0 0 3px rgba(67, 104, 217, 0.15)' : 'none',
            }}
          >
            {(isSelected || isHovered) && (
              <>
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '0',
                  backgroundColor: isSelected ? '#4368D9' : 'rgba(67, 104, 217, 0.9)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '5px 10px',
                  borderRadius: '6px 6px 0 0',
                  zIndex: 10,
                  textTransform: 'uppercase',
                }}>
                  {element.type}
                </div>
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '0',
                    display: 'flex',
                    gap: '4px',
                    zIndex: 10,
                  }}>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDuplicateElement(element.id);
                      }}
                      className="h-7 w-7 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                    >
                      <Copy size={13} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setTimeout(() => onDeleteElement(element.id), 0);
                      }}
                      className="h-7 w-7 bg-white border border-gray-200 hover:bg-red-50 text-red-600 shadow-sm"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                )}
              </>
            )}
            <div
              {...provided.dragHandleProps}
              data-drag-handle="true"
              style={{
                position: 'absolute',
                left: '-36px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: isSelected || isHovered ? 1 : 0,
                transition: 'opacity 0.2s',
                cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                padding: '10px',
                backgroundColor: isSelected ? '#4368D9' : 'rgba(67, 104, 217, 0.8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 20,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical size={18} color="#ffffff" />
            </div>
            <RenderedComponentV2 element={element} onSelect={setSelectedElement} />
          </div>
        )}
      </Draggable>
    );
  };

  // No longer needed - droppables now rendered via NestedDroppableRenderer component
  
  // Extract container visual styles
  const getContainerStyles = (element) => {
    const props = element.props || {};
    
    const styles = {
      width: props.widthMode === 'full' ? '100%' : 'auto',
      maxWidth: props.widthMode === 'boxed' ? `${props.maxWidth || 1200}px` : 'none',
      margin: element.type === 'Container' ? '0 auto' : '0',
      minHeight: props.minHeight || 'auto',
      overflow: props.overflow || 'visible',
      paddingTop: `${props.paddingTop || (element.type === 'Section' ? 48 : 24)}px`,
      paddingRight: `${props.paddingRight || 24}px`,
      paddingBottom: `${props.paddingBottom || (element.type === 'Section' ? 48 : 24)}px`,
      paddingLeft: `${props.paddingLeft || 24}px`,
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      opacity: props.opacity !== undefined ? props.opacity : 1,
    };
    
    // Background
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
    
    // Border
    if (props.borderWidth) {
      styles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
    }
    styles.borderRadius = `${props.borderRadius || 0}px`;
    
    // Effects
    if (props.boxShadow) {
      styles.boxShadow = props.boxShadow;
    }
    
    return styles;
  };
  
  // Render visual effects (overlay, etc)
  const renderContainerVisuals = (element) => {
    const props = element.props || {};
    
    if (props.backgroundMode === 'image' && props.overlayColor) {
      return (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: props.overlayColor,
          opacity: (props.overlayOpacity || 0) / 100,
          borderRadius: `${props.borderRadius || 0}px`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      );
    }
    return null;
  };

  const renderFixedElement = (element, label) => {
    if (!element) return (
      <div style={{ 
        border: '2px dashed rgba(67, 104, 217, 0.2)', 
        borderRadius: '8px', 
        padding: '24px', 
        textAlign: 'center',
        margin: '8px 0',
        backgroundColor: 'rgba(67, 104, 217, 0.02)',
        color: '#9CA3AF',
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </div>
    );

    const isSelected = selectedElement?.id === element.id;
    const isHovered = hoveredElement === element.id;

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
        onMouseEnter={() => setHoveredElement(element.id)}
        onMouseLeave={() => setHoveredElement(null)}
        style={{
          position: 'relative',
          border: isSelected ? '2px solid #4368D9' : isHovered ? '2px solid rgba(67, 104, 217, 0.4)' : '2px solid transparent',
          borderRadius: '6px',
          transition: 'all 0.15s',
          boxShadow: isSelected ? '0 0 0 3px rgba(67, 104, 217, 0.15)' : 'none',
        }}
      >
        {(isSelected || isHovered) && (
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '0',
            backgroundColor: isSelected ? '#4368D9' : 'rgba(67, 104, 217, 0.9)',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: '600',
            padding: '5px 10px',
            borderRadius: '6px 6px 0 0',
            zIndex: 10,
            textTransform: 'uppercase',
          }}>
            {element.type}
          </div>
        )}
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '0',
            display: 'flex',
            gap: '4px',
            zIndex: 10,
          }}>
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteElement(element.id);
              }}
              className="h-7 w-7 bg-white border border-gray-200 hover:bg-red-50 text-red-600 shadow-sm"
            >
              <Trash2 size={13} />
            </Button>
          </div>
        )}
        <RenderedComponentV2 element={element} onSelect={setSelectedElement} />
      </div>
    );
  };

  const getDeviceWidth = () => {
    if (deviceView === 'mobile') return '390px';
    if (deviceView === 'tablet') return '768px';
    return '100%';
  };

  const deviceWidth = getDeviceWidth();
  const isConstrainedView = deviceView !== 'desktop';

  return (
    <div 
      className="canvasViewport"
      style={{ 
        flex: 1, 
        backgroundColor: '#f0f0f0', 
        minWidth: 0, 
        minHeight: 0, 
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: deviceView === 'desktop' ? 'stretch' : 'center',
        justifyContent: 'flex-start',
        padding: isConstrainedView ? '20px' : '0'
      }}
    >
      <div 
        className="responsiveFrame"
        style={{
          width: deviceView === 'desktop' ? '100%' : deviceWidth,
          minHeight: isConstrainedView ? 'calc(100% - 40px)' : '100%',
          backgroundColor: '#ffffff',
          boxShadow: isConstrainedView ? '0 4px 24px rgba(0,0,0,0.12)' : 'none',
          borderRadius: isConstrainedView ? '12px' : '0',
          overflow: 'visible',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <div 
          className="responsiveScrollArea"
          style={{
            flex: 1,
            minHeight: '100%',
            overflow: 'visible',
            position: 'relative'
          }}
        >
          <div className="canvasRoot" style={{ 
            width: '100%', 
            minHeight: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#ffffff', 
            padding: `${canvasSettings.padding}px`, 
            boxSizing: 'border-box', 
            position: 'relative'
          }}>
            {/* Header Zone */}
            <div style={{ flexShrink: 0 }}>
              {renderFixedElement(headerElement, 'Header Area (Drag Header Here)')}
            </div>

            {/* Main Content Area */}
            <main className="canvasMain" style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <Droppable droppableId="canvas" type={DND_TYPE}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="dropZone"
                    style={{
                      flex: 1,
                      display: 'flex', 
                      flexDirection: 'column',
                      minHeight: '200px',
                      border: snapshot.isDraggingOver ? '2px dashed #4368D9' : '2px solid transparent',
                      borderRadius: '8px',
                      transition: 'border 0.2s, background-color 0.2s',
                      backgroundColor: snapshot.isDraggingOver ? 'rgba(67, 104, 217, 0.02)' : '#ffffff',
                      position: 'relative'
                    }}
                  >
                    {bodyElements.length === 0 && !snapshot.isDraggingOver ? (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        textAlign: 'center',
                        border: '2px dashed #D1D5DB',
                        borderRadius: '8px',
                        backgroundColor: '#F9FAFB',
                        padding: '40px'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          backgroundColor: '#E5E7EB',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                        }}>
                          <Plus size={30} color="#9CA3AF" />
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                          Body Content
                        </h3>
                        <p style={{ fontSize: '12px', color: '#6B7280' }}>
                          Drag sections here
                        </p>
                      </div>
                    ) : (
                      bodyElements.map((element, index) => renderElement(element, index))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </main>

            {/* Footer Zone */}
            <div style={{ flexShrink: 0, marginTop: 'auto' }}>
               {renderFixedElement(footerElement, 'Footer Area (Drag Footer Here)')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}