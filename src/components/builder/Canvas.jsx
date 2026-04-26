import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import RenderedComponent from './RenderedComponent';
import { FilePlus } from 'lucide-react';

export default function Canvas({ pageData = [], selectedElement = null, setSelectedElement = () => {}, deviceView = 'desktop', darkMode = false }) {
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <main className={`flex-1 flex justify-center p-8 overflow-auto ${darkMode ? 'bg-[#0A0D14]' : 'bg-gray-100'}`}>
      <div
        className={`shadow-2xl rounded-lg transition-all duration-300 ${darkMode ? 'bg-white' : 'bg-white'}`}
        style={{ width: deviceWidths[deviceView], minHeight: '100%' }}
      >
        <Droppable droppableId="canvas" type="canvas-reorder">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`p-4 min-h-[600px] transition-colors ${
                snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-transparent'
              }`}
            >
              {pageData.length === 0 && (
                <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg text-center p-8">
                  <FilePlus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">Your Canvas is Empty</h3>
                  <p className="text-gray-500 mt-1">Drag components from the left panel to start building your page.</p>
                </div>
              )}

              {pageData.map((element, index) => (
                <Draggable key={element.id} draggableId={element.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElement(element);
                      }}
                      className={`relative group transition-all ${
                        snapshot.isDragging ? 'opacity-50' : ''
                      } ${
                        selectedElement?.id === element.id
                          ? 'ring-2 ring-blue-500 ring-offset-2'
                          : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2'
                      }`}
                    >
                      {selectedElement?.id === element.id && (
                        <div className="absolute -top-7 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-t-md z-10 font-medium">
                          {element.type}
                        </div>
                      )}
                      <div className="group-hover:cursor-move">
                        <RenderedComponent element={element} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </main>
  );
}