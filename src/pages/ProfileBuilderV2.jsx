import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Type, 
  Heading as HeadingIcon, 
  Image as ImageIcon, 
  MousePointerClick,
  ChevronLeft,
  Save,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Trash2,
  GripVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Component types available in the library
const COMPONENT_LIBRARY = [
  { type: 'Heading', icon: HeadingIcon, label: 'Heading' },
  { type: 'Text', icon: Type, label: 'Text' },
  { type: 'Image', icon: ImageIcon, label: 'Image' },
  { type: 'Button', icon: MousePointerClick, label: 'Button' },
];

// Default props for each component type
const getDefaultProps = (type) => {
  const defaults = {
    Heading: { text: 'Your Heading', level: 'h2', fontSize: 32, fontWeight: '600', color: '#ffffff' },
    Text: { text: 'Your text content goes here', fontSize: 16, fontWeight: '400', color: '#ffffff' },
    Image: { src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800', alt: 'Image', borderRadius: 8 },
    Button: { text: 'Click Me', href: '#', backgroundColor: '#4368D9', color: '#ffffff', fontSize: 16 },
  };
  return defaults[type] || {};
};

// Render a component based on its type and props
function RenderComponent({ element }) {
  const { type, props } = element;
  const style = {
    color: props.color,
    fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
    fontWeight: props.fontWeight,
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
    padding: '12px',
  };

  switch (type) {
    case 'Heading':
      const HeadingTag = props.level || 'h2';
      return <HeadingTag style={style}>{props.text}</HeadingTag>;
    case 'Text':
      return <p style={style}>{props.text}</p>;
    case 'Image':
      return <img src={props.src} alt={props.alt} style={{ ...style, width: '100%', maxWidth: '600px' }} />;
    case 'Button':
      return (
        <a href={props.href} style={{ ...style, display: 'inline-block', textDecoration: 'none', borderRadius: '6px' }}>
          {props.text}
        </a>
      );
    default:
      return <div style={style}>Unknown component</div>;
  }
}

export default function ProfileBuilderV2() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [deviceView, setDeviceView] = useState('desktop');
  const [saving, setSaving] = useState(false);

  // Check authentication - but don't unmount on failure
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.log('Not authenticated');
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  // Handle drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Adding from library to canvas
    if (source.droppableId === 'library' && destination.droppableId === 'canvas') {
      const newElement = {
        id: `element-${Date.now()}`,
        type: draggableId,
        props: getDefaultProps(draggableId),
      };
      const newPageData = [...pageData];
      newPageData.splice(destination.index, 0, newElement);
      setPageData(newPageData);
      setSelectedElement(newElement);
    }
    // Reordering within canvas
    else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      const newPageData = Array.from(pageData);
      const [removed] = newPageData.splice(source.index, 1);
      newPageData.splice(destination.index, 0, removed);
      setPageData(newPageData);
    }
  };

  // Update element properties
  const updateElementProps = (elementId, newProps) => {
    setPageData((prev) =>
      prev.map((el) => (el.id === elementId ? { ...el, props: { ...el.props, ...newProps } } : el))
    );
    setSelectedElement((prev) => (prev?.id === elementId ? { ...prev, props: { ...prev.props, ...newProps } } : prev));
  };

  // Delete element
  const deleteElement = (elementId) => {
    setPageData((prev) => prev.filter((el) => el.id !== elementId));
    setSelectedElement(null);
  };

  // Save page
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const pages = await base44.entities.Page.filter({ user_id: user.id, slug: 'home' });
      if (pages.length > 0) {
        await base44.entities.Page.update(pages[0].id, { content: pageData });
      } else {
        await base44.entities.Page.create({
          user_id: user.id,
          title: 'Home',
          slug: 'home',
          content: pageData,
          is_published: false,
        });
      }
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setTimeout(() => setSaving(false), 1000);
    }
  };

  // Calculate canvas width based on device view
  const getCanvasWidth = () => {
    switch (deviceView) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  // Show auth check message if not logged in
  if (authChecked && !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0A0D14]">
        <Card className="bg-[#121726] border-gray-800 p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">Please log in to use the Profile Builder.</p>
          <Button asChild className="bg-[#4368D9] hover:bg-[#3a59b4]">
            <Link to={createPageUrl('Auth')}>Go to Login</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Main builder UI - always render, never unmount
  return (
    <div className="flex h-screen w-full flex-col bg-[#0A0D14]">
      {/* Top Bar */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 bg-[#121726] px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
            <Link to={createPageUrl('Dashboard')}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-white">Profile Builder V2</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Device View Toggle */}
          <div className="flex items-center rounded-lg bg-black/20 p-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${deviceView === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
              onClick={() => setDeviceView('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${deviceView === 'tablet' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
              onClick={() => setDeviceView('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${deviceView === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
              onClick={() => setDeviceView('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={saving || !user}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Component Library */}
          <div className="w-64 border-r border-white/10 bg-[#121726] overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-white mb-4">COMPONENTS</h2>
              <Droppable droppableId="library" isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                    {COMPONENT_LIBRARY.map((component, index) => (
                      <Draggable key={component.type} draggableId={component.type} index={index}>
                        {(provided, snapshot) => (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-[#1A1F2E] cursor-grab active:cursor-grabbing hover:bg-[#242938] transition-colors ${
                                snapshot.isDragging ? 'opacity-50' : ''
                              }`}
                            >
                              <component.icon className="h-5 w-5 text-[#4368D9]" />
                              <span className="text-sm text-white">{component.label}</span>
                            </div>
                            {snapshot.isDragging && (
                              <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-[#1A1F2E]">
                                <component.icon className="h-5 w-5 text-[#4368D9]" />
                                <span className="text-sm text-white">{component.label}</span>
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
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 overflow-y-auto bg-[#0A0D14] p-8">
            <div className="mx-auto" style={{ width: getCanvasWidth(), maxWidth: '100%' }}>
              <Droppable droppableId="canvas">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[600px] rounded-lg bg-[#121726] p-6 ${
                      snapshot.isDraggingOver ? 'border-2 border-dashed border-[#4368D9]' : 'border border-white/10'
                    }`}
                  >
                    {pageData.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[500px] text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                          <MousePointerClick className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Your Canvas is Empty</h3>
                        <p className="text-gray-400">Drag components from the left panel to start building your page.</p>
                      </div>
                    ) : (
                      pageData.map((element, index) => (
                        <Draggable key={element.id} draggableId={element.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              onClick={() => setSelectedElement(element)}
                              className={`mb-4 p-3 rounded-lg border-2 transition-all ${
                                selectedElement?.id === element.id
                                  ? 'border-[#4368D9] bg-[#4368D9]/5'
                                  : 'border-transparent hover:border-white/20'
                              } ${snapshot.isDragging ? 'opacity-50' : ''}`}
                            >
                              <div className="flex items-start gap-2">
                                <div {...provided.dragHandleProps} className="pt-2">
                                  <GripVertical className="w-4 h-4 text-gray-500 cursor-grab active:cursor-grabbing" />
                                </div>
                                <div className="flex-1">
                                  <RenderComponent element={element} />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* Right Sidebar - Properties Panel */}
          <div className="w-80 border-l border-white/10 bg-[#121726] overflow-y-auto">
            {selectedElement ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white">PROPERTIES</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteElement(selectedElement.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#1A1F2E]">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4 pt-4">
                    {selectedElement.type === 'Heading' && (
                      <>
                        <div>
                          <Label className="text-gray-300">Text</Label>
                          <Input
                            value={selectedElement.props.text}
                            onChange={(e) => updateElementProps(selectedElement.id, { text: e.target.value })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Level</Label>
                          <select
                            value={selectedElement.props.level}
                            onChange={(e) => updateElementProps(selectedElement.id, { level: e.target.value })}
                            className="w-full mt-1 bg-[#1A1F2E] border border-gray-700 text-white rounded-md px-3 py-2"
                          >
                            <option value="h1">H1</option>
                            <option value="h2">H2</option>
                            <option value="h3">H3</option>
                            <option value="h4">H4</option>
                          </select>
                        </div>
                      </>
                    )}

                    {selectedElement.type === 'Text' && (
                      <div>
                        <Label className="text-gray-300">Text</Label>
                        <Textarea
                          value={selectedElement.props.text}
                          onChange={(e) => updateElementProps(selectedElement.id, { text: e.target.value })}
                          className="bg-[#1A1F2E] border-gray-700 text-white mt-1 min-h-[100px]"
                        />
                      </div>
                    )}

                    {selectedElement.type === 'Image' && (
                      <>
                        <div>
                          <Label className="text-gray-300">Image URL</Label>
                          <Input
                            value={selectedElement.props.src}
                            onChange={(e) => updateElementProps(selectedElement.id, { src: e.target.value })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Alt Text</Label>
                          <Input
                            value={selectedElement.props.alt}
                            onChange={(e) => updateElementProps(selectedElement.id, { alt: e.target.value })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                          />
                        </div>
                      </>
                    )}

                    {selectedElement.type === 'Button' && (
                      <>
                        <div>
                          <Label className="text-gray-300">Button Text</Label>
                          <Input
                            value={selectedElement.props.text}
                            onChange={(e) => updateElementProps(selectedElement.id, { text: e.target.value })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Link URL</Label>
                          <Input
                            value={selectedElement.props.href}
                            onChange={(e) => updateElementProps(selectedElement.id, { href: e.target.value })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                          />
                        </div>
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4 pt-4">
                    {(selectedElement.type === 'Heading' || selectedElement.type === 'Text' || selectedElement.type === 'Button') && (
                      <>
                        <div>
                          <Label className="text-gray-300">Font Size</Label>
                          <Input
                            type="number"
                            value={selectedElement.props.fontSize}
                            onChange={(e) => updateElementProps(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">Font Weight</Label>
                          <select
                            value={selectedElement.props.fontWeight}
                            onChange={(e) => updateElementProps(selectedElement.id, { fontWeight: e.target.value })}
                            className="w-full mt-1 bg-[#1A1F2E] border border-gray-700 text-white rounded-md px-3 py-2"
                          >
                            <option value="300">Light</option>
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semibold</option>
                            <option value="700">Bold</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-gray-300">Text Color</Label>
                          <Input
                            type="color"
                            value={selectedElement.props.color}
                            onChange={(e) => updateElementProps(selectedElement.id, { color: e.target.value })}
                            className="bg-[#1A1F2E] border-gray-700 text-white mt-1 h-10"
                          />
                        </div>
                      </>
                    )}

                    {selectedElement.type === 'Button' && (
                      <div>
                        <Label className="text-gray-300">Background Color</Label>
                        <Input
                          type="color"
                          value={selectedElement.props.backgroundColor}
                          onChange={(e) => updateElementProps(selectedElement.id, { backgroundColor: e.target.value })}
                          className="bg-[#1A1F2E] border-gray-700 text-white mt-1 h-10"
                        />
                      </div>
                    )}

                    {selectedElement.type === 'Image' && (
                      <div>
                        <Label className="text-gray-300">Border Radius</Label>
                        <Input
                          type="number"
                          value={selectedElement.props.borderRadius}
                          onChange={(e) => updateElementProps(selectedElement.id, { borderRadius: parseInt(e.target.value) })}
                          className="bg-[#1A1F2E] border-gray-700 text-white mt-1"
                        />
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <MousePointerClick className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">No Element Selected</h3>
                <p className="text-xs text-gray-400">Click an element in the canvas to edit its properties.</p>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}