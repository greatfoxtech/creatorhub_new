import React, { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Type, AlignLeft, Image as ImageIcon, Video, MousePointer, Smile, Minus, Space,
  Layout, Columns, Grid3x3, Box, Layers, Star, Film, MessageSquare, ShoppingBag,
  FileText, Mail, Anchor, Users, Code
} from 'lucide-react';

// Shared droppable type - must match CanvasV2 and BuilderV2
export const DND_TYPE = "BUILDER";

const componentCategories = {
  structure: [
    { type: 'Header', icon: Anchor, label: 'Header' },
    { type: 'Footer', icon: Anchor, label: 'Footer' },
  ],
  basic: [
    { type: 'Heading', icon: Type, label: 'Heading' },
    { type: 'Text', icon: AlignLeft, label: 'Text' },
    { type: 'Image', icon: ImageIcon, label: 'Image' },
    { type: 'Video', icon: Video, label: 'Video' },
    { type: 'Button', icon: MousePointer, label: 'Button' },
    { type: 'Icon', icon: Smile, label: 'Icon' },
    { type: 'Divider', icon: Minus, label: 'Divider' },
    { type: 'Spacer', icon: Space, label: 'Spacer' },
  ],
  layout: [
    { type: 'Container', icon: Box, label: 'Container' },
    { type: 'Section', icon: Layers, label: 'Section' },
    { type: 'Columns', icon: Columns, label: 'Columns' },
    { type: 'Grid', icon: Grid3x3, label: 'Grid' },
  ],
  premium: [
    { type: 'ButtonGroup', icon: MousePointer, label: 'Button Group' },
    { type: 'Card', icon: Layout, label: 'Card' },
    { type: 'Feed', icon: MessageSquare, label: 'Feed' },
    { type: 'Stories', icon: Film, label: 'Stories' },
    { type: 'Reels', icon: Video, label: 'Reels' },
    { type: 'ProductGrid', icon: ShoppingBag, label: 'Product Grid' },
    { type: 'Form', icon: FileText, label: 'Form' },
    { type: 'Comments', icon: MessageSquare, label: 'Comments' },
  ],
  templates: [
    { type: 'HeroSection', icon: Star, label: 'Hero Section' },
    { type: 'PortfolioGrid', icon: Grid3x3, label: 'Portfolio Grid' },
    { type: 'ContactForm', icon: Mail, label: 'Contact Form' },
    { type: 'Biography', icon: Users, label: 'Biography' },
  ],
  advanced: [
    { type: 'HTML', icon: Code, label: 'HTML' },
  ],
};

const ComponentItem = ({ component, index }) => {
  const Icon = component.icon;
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Draggable draggableId={component.type} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              ...provided.draggableProps.style,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 8px',
              backgroundColor: isHovering && !snapshot.isDragging ? '#242938' : '#1A1F2E',
              border: isHovering && !snapshot.isDragging ? '1px solid #4368D9' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              cursor: 'grab',
              aspectRatio: '1',
              opacity: snapshot.isDragging ? 0.5 : 1,
              transform: isHovering && !snapshot.isDragging ? 'translateY(-2px) scale(1.02)' : 'none',
              boxShadow: isHovering && !snapshot.isDragging ? '0 4px 12px rgba(67, 104, 217, 0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Icon size={20} color="#4368D9" />
            <span style={{ fontSize: '10px', fontWeight: '500', color: '#E5E7EB', textAlign: 'center', lineHeight: '1.2' }}>{component.label}</span>
          </div>
          {snapshot.isDragging && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 8px',
              backgroundColor: '#1A1F2E',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              aspectRatio: '1',
            }}>
              <Icon size={20} color="#4368D9" />
              <span style={{ fontSize: '10px', fontWeight: '500', color: '#E5E7EB', textAlign: 'center', lineHeight: '1.2' }}>{component.label}</span>
            </div>
          )}
        </>
      )}
    </Draggable>
  );
};

export default function ComponentLibraryV2() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterComponents = (components) => {
    if (!searchQuery) return components;
    return components.filter(c => 
      c.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div style={{ width: '260px', flex: '0 0 260px', maxWidth: '260px', minWidth: '260px', backgroundColor: '#121726', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ padding: '6px 8px', backgroundColor: '#4368D9', borderRadius: '4px', marginBottom: '10px', textAlign: 'center' }}>
          <span style={{ fontSize: '9px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em' }}>COMPONENT PANEL HOVER ACTIVE (BuilderV2)</span>
        </div>
        <h2 style={{ fontSize: '11px', fontWeight: '600', marginBottom: '10px', color: '#9CA3AF', letterSpacing: '0.05em' }}>COMPONENTS</h2>
        <Input
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1A1F2E] border-gray-700 text-white text-xs h-8"
        />
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '10px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#ff00ff rgba(255,255,255,0.08)'
      }} className="custom-scrollbar-components">
        <style>{`
          .custom-scrollbar-components::-webkit-scrollbar {
            width: 6px !important;
          }
          .custom-scrollbar-components::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05) !important;
            border-radius: 3px;
          }
          .custom-scrollbar-components::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.15) !important;
            border-radius: 3px;
          }
          .custom-scrollbar-components::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.25) !important;
          }
        `}</style>
        <Accordion type="multiple" defaultValue={['structure', 'basic', 'layout', 'premium', 'templates']} className="space-y-1">
          <AccordionItem value="structure" className="border-none">
            <AccordionTrigger className="text-[10px] font-semibold text-gray-400 hover:text-white py-1.5 px-2">
              STRUCTURE
            </AccordionTrigger>
            <AccordionContent className="pb-1.5">
              <Droppable droppableId="library-structure" type={DND_TYPE} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {filterComponents(componentCategories.structure).map((comp, idx) => (
                      <ComponentItem key={comp.type} component={comp} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="basic" className="border-none">
            <AccordionTrigger className="text-[10px] font-semibold text-gray-400 hover:text-white py-1.5 px-2">
              BASIC
            </AccordionTrigger>
            <AccordionContent className="pb-1.5">
              <Droppable droppableId="library-basic" type={DND_TYPE} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {filterComponents(componentCategories.basic).map((comp, idx) => (
                      <ComponentItem key={comp.type} component={comp} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="layout" className="border-none">
            <AccordionTrigger className="text-[10px] font-semibold text-gray-400 hover:text-white py-1.5 px-2">
              LAYOUT
            </AccordionTrigger>
            <AccordionContent className="pb-1.5">
              <Droppable droppableId="library-layout" type={DND_TYPE} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {filterComponents(componentCategories.layout).map((comp, idx) => (
                      <ComponentItem key={comp.type} component={comp} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="premium" className="border-none">
            <AccordionTrigger className="text-[10px] font-semibold text-gray-400 hover:text-white py-1.5 px-2">
              PREMIUM
            </AccordionTrigger>
            <AccordionContent className="pb-1.5">
              <Droppable droppableId="library-premium" type={DND_TYPE} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {filterComponents(componentCategories.premium).map((comp, idx) => (
                      <ComponentItem key={comp.type} component={comp} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="templates" className="border-none">
            <AccordionTrigger className="text-[10px] font-semibold text-gray-400 hover:text-white py-1.5 px-2">
              TEMPLATES
            </AccordionTrigger>
            <AccordionContent className="pb-1.5">
              <Droppable droppableId="library-templates" type={DND_TYPE} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {filterComponents(componentCategories.templates).map((comp, idx) => (
                      <ComponentItem key={comp.type} component={comp} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="advanced" className="border-none">
            <AccordionTrigger className="text-[10px] font-semibold text-gray-400 hover:text-white py-1.5 px-2">
              ADVANCED
            </AccordionTrigger>
            <AccordionContent className="pb-1.5">
              <Droppable droppableId="library-advanced" type={DND_TYPE} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {filterComponents(componentCategories.advanced).map((comp, idx) => (
                      <ComponentItem key={comp.type} component={comp} index={idx} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}