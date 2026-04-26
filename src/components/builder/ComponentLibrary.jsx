import React, { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { 
  Search, Heading, Type, Image as ImageIcon, Video, MousePointerClick, Star, Minus, 
  Replace, Layout, Box, Columns, Grid3x3, Square, Code, User, 
  MessageSquare, Clapperboard, Film, ShoppingBag, Send, Menu, Facebook
} from 'lucide-react';

const componentCategories = {
  structure: [
    { type: 'Header', icon: <Layout className="h-5 w-5" />, label: 'Header' },
    { type: 'Footer', icon: <Layout className="h-5 w-5" />, label: 'Footer' },
  ],
  basic: [
    { type: 'Heading', icon: <Heading className="h-5 w-5" />, label: 'Heading' },
    { type: 'Text', icon: <Type className="h-5 w-5" />, label: 'Text' },
    { type: 'Image', icon: <ImageIcon className="h-5 w-5" />, label: 'Image' },
    { type: 'Video', icon: <Video className="h-5 w-5" />, label: 'Video' },
    { type: 'Button', icon: <MousePointerClick className="h-5 w-5" />, label: 'Button' },
    { type: 'Icon', icon: <Star className="h-5 w-5" />, label: 'Icon' },
    { type: 'Divider', icon: <Minus className="h-5 w-5" />, label: 'Divider' },
    { type: 'Spacer', icon: <Replace className="h-5 w-5" />, label: 'Spacer' },
  ],
  premium: [
    { type: 'ButtonGroup', icon: <MousePointerClick className="h-5 w-5" />, label: 'Button Group' },
    { type: 'Card', icon: <Square className="h-5 w-5" />, label: 'Card' },
    { type: 'Feed', icon: <MessageSquare className="h-5 w-5" />, label: 'Feed' },
    { type: 'Stories', icon: <Clapperboard className="h-5 w-5" />, label: 'Stories' },
    { type: 'Reels', icon: <Film className="h-5 w-5" />, label: 'Reels' },
    { type: 'ProductGrid', icon: <ShoppingBag className="h-5 w-5" />, label: 'Product Grid' },
    { type: 'Comments', icon: <MessageSquare className="h-5 w-5" />, label: 'Comments' },
    { type: 'Form', icon: <Send className="h-5 w-5" />, label: 'Form' },
  ],
  layout: [
    { type: 'Container', icon: <Box className="h-5 w-5" />, label: 'Container' },
    { type: 'Columns', icon: <Columns className="h-5 w-5" />, label: 'Columns' },
    { type: 'Grid', icon: <Grid3x3 className="h-5 w-5" />, label: 'Grid' },
    { type: 'Section', icon: <Square className="h-5 w-5" />, label: 'Section' },
  ],
  templates: [
    { type: 'HeroSection', icon: <Layout className="h-5 w-5" />, label: 'Hero Section' },
    { type: 'PortfolioGrid', icon: <Grid3x3 className="h-5 w-5" />, label: 'Portfolio Grid' },
    { type: 'ContactForm', icon: <Send className="h-5 w-5" />, label: 'Contact Form' },
  ],
  headerElements: [
    { type: 'Logo', icon: <Star className="h-5 w-5" />, label: 'Logo' },
    { type: 'MenuLine1', icon: <Menu className="h-5 w-5" />, label: 'Menu Line 1' },
    { type: 'MenuLine2', icon: <Menu className="h-5 w-5" />, label: 'Menu Line 2' },
    { type: 'MenuLine3', icon: <Menu className="h-5 w-5" />, label: 'Menu Line 3' },
    { type: 'HeaderButton', icon: <MousePointerClick className="h-5 w-5" />, label: 'Button' },
    { type: 'HeaderSearch', icon: <Search className="h-5 w-5" />, label: 'Search' },
    { type: 'HeaderAccount', icon: <User className="h-5 w-5" />, label: 'Account' },
    { type: 'HeaderSocials', icon: <Facebook className="h-5 w-5" />, label: 'Socials' },
  ],
  advanced: [
    { type: 'HTML', icon: <Code className="h-5 w-5" />, label: 'HTML' },
    { type: 'Biography', icon: <User className="h-5 w-5" />, label: 'Biography' },
  ],
};

export default function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterComponents = (components) => {
    if (!searchQuery) return components;
    return components.filter(comp =>
      comp.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <aside className="w-72 flex-shrink-0 bg-[#121726] p-4 border-r border-white/10 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-white">Components</h3>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search components..."
          className="bg-black/20 border-white/10 pl-10 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        <Accordion type="multiple" defaultValue={['structure', 'basic', 'premium', 'layout']} className="w-full">
          <AccordionItem value="structure">
            <AccordionTrigger className="text-sm text-gray-300">STRUCTURE</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.structure)} categoryId="structure" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="basic">
            <AccordionTrigger className="text-sm text-gray-300">BASIC COMPONENTS</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.basic)} categoryId="basic" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="premium">
            <AccordionTrigger className="text-sm text-gray-300">PREMIUM COMPONENTS</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.premium)} categoryId="premium" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="layout">
            <AccordionTrigger className="text-sm text-gray-300">LAYOUT</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.layout)} categoryId="layout" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="templates">
            <AccordionTrigger className="text-sm text-gray-300">TEMPLATES</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.templates)} categoryId="templates" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="headerElements">
            <AccordionTrigger className="text-sm text-gray-300">HEADER ELEMENTS</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.headerElements)} categoryId="headerElements" />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="advanced">
            <AccordionTrigger className="text-sm text-gray-300">ADVANCED</AccordionTrigger>
            <AccordionContent>
              <ComponentGrid components={filterComponents(componentCategories.advanced)} categoryId="advanced" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}

function ComponentGrid({ components, categoryId }) {
  if (components.length === 0) return null;

  return (
    <Droppable droppableId={categoryId} isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-2 gap-2">
          {components.map((comp, index) => (
            <Draggable key={comp.type} draggableId={comp.type} index={index}>
              {(provided, snapshot) => (
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col items-center justify-center p-3 bg-[#1A1F2E] rounded-lg border border-transparent hover:border-[#4368D9] cursor-grab text-center transition-all"
                  >
                    <div className="text-gray-300">{comp.icon}</div>
                    <span className="text-xs mt-2 text-gray-300">{comp.label}</span>
                  </div>
                  {snapshot.isDragging && (
                    <div className="flex flex-col items-center justify-center p-3 bg-[#1A1F2E] rounded-lg border border-dashed border-[#4368D9] cursor-grab text-center">
                      <div className="text-gray-300">{comp.icon}</div>
                      <span className="text-xs mt-2 text-gray-300">{comp.label}</span>
                    </div>
                  )}
                </>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}