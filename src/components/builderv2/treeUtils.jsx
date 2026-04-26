// Tree manipulation utilities for nested builder elements

export const parseDroppableId = (droppableId) => {
  if (droppableId === 'canvas') {
    return { zoneType: 'canvas', elementId: null, colId: null };
  }
  
  // Handle column special case (has 3 parts)
  if (droppableId.startsWith('column__')) {
    const parts = droppableId.split('__');
    return { zoneType: 'column', elementId: parts[1], colId: parts[2] };
  }
  
  // Generic pattern: typename__id for any nested droppable
  if (droppableId.includes('__')) {
    const [zoneType, elementId] = droppableId.split('__');
    return { zoneType, elementId, colId: null };
  }
  
  return { zoneType: 'unknown', elementId: null };
};

// Find element by ID recursively
export const findElementById = (elements, targetId) => {
  for (const el of elements) {
    if (el.id === targetId) {
      return { element: el, parent: null, path: [el.id] };
    }
    
    // Search in children
    if (el.props?.children && Array.isArray(el.props.children)) {
      const found = findElementById(el.props.children, targetId);
      if (found) {
        return { ...found, parent: el, path: [el.id, ...found.path] };
      }
    }
    
    // Search in column children
    if (el.type === 'Columns' && el.props?.children) {
      for (const col of el.props.children) {
        if (col.children) {
          const found = findElementById(col.children, targetId);
          if (found) {
            return { ...found, parent: el, path: [el.id, col.id, ...found.path] };
          }
        }
      }
    }
  }
  
  return null;
};

// Remove element by ID and return new tree + removed element
export const removeElementById = (elements, targetId) => {
  const result = [];
  let removed = null;
  
  for (const el of elements) {
    if (el.id === targetId) {
      removed = el;
      continue; // Skip this element
    }
    
    let newEl = { ...el };
    
    // Check children
    if (el.props?.children && Array.isArray(el.props.children)) {
      const childResult = removeElementById(el.props.children, targetId);
      if (childResult.removed) {
        removed = childResult.removed;
        newEl = { ...newEl, props: { ...newEl.props, children: childResult.tree } };
      }
    }
    
    // Check column children
    if (el.type === 'Columns' && el.props?.children) {
      const newCols = el.props.children.map(col => {
        if (col.children) {
          const colResult = removeElementById(col.children, targetId);
          if (colResult.removed && !removed) {
            removed = colResult.removed;
          }
          return { ...col, children: colResult.tree };
        }
        return col;
      });
      newEl = { ...newEl, props: { ...newEl.props, children: newCols } };
    }
    
    result.push(newEl);
  }
  
  return { tree: result, removed };
};

// Insert element into a specific zone at index
export const insertElementIntoZone = (elements, zone, index, element) => {
  const { zoneType, elementId, colId } = zone;
  
  // Root canvas
  if (zoneType === 'canvas') {
    const result = [...elements];
    result.splice(index, 0, element);
    return result;
  }
  
  // Nested zones
  return elements.map(el => {
    if (el.id === elementId) {
      // Special case: Columns (has nested column structure)
      if (zoneType === 'column' && el.type === 'Columns') {
        const columns = el.props?.children || [];
        const newColumns = columns.map(col => {
          if (col.id === colId) {
            const colChildren = col.children || [];
            const newColChildren = [...colChildren];
            newColChildren.splice(index, 0, element);
            return { ...col, children: newColChildren };
          }
          return col;
        });
        return { ...el, props: { ...el.props, children: newColumns } };
      }
      
      // Generic case: any element with children array
      if (Array.isArray(el.props?.children)) {
        const children = el.props.children;
        const newChildren = [...children];
        newChildren.splice(index, 0, element);
        return { ...el, props: { ...el.props, children: newChildren } };
      }
    }
    
    // Recurse into children
    if (el.props?.children && Array.isArray(el.props.children)) {
      return { ...el, props: { ...el.props, children: insertElementIntoZone(el.props.children, zone, index, element) } };
    }
    
    // Recurse into column children
    if (el.type === 'Columns' && el.props?.children) {
      const newCols = el.props.children.map(col => {
        if (col.children) {
          return { ...col, children: insertElementIntoZone(col.children, zone, index, element) };
        }
        return col;
      });
      return { ...el, props: { ...el.props, children: newCols } };
    }
    
    return el;
  });
};

// Get children from a specific zone
export const getChildrenFromZone = (elements, zone) => {
  const { zoneType, elementId, colId } = zone;
  
  if (zoneType === 'canvas') {
    return elements;
  }
  
  const container = findElementInTree(elements, elementId);
  if (!container) return [];
  
  if (zoneType === 'container' || zoneType === 'section' || zoneType === 'grid') {
    return container.props?.children || [];
  }
  
  if (zoneType === 'column' && container.type === 'Columns') {
    const col = container.props?.children?.find(c => c.id === colId);
    return col?.children || [];
  }
  
  return [];
};

// Helper to find element in tree (simple version)
const findElementInTree = (elements, targetId) => {
  for (const el of elements) {
    if (el.id === targetId) return el;
    
    if (el.props?.children) {
      const found = findElementInTree(el.props.children, targetId);
      if (found) return found;
    }
    
    if (el.type === 'Columns' && el.props?.children) {
      for (const col of el.props.children) {
        if (col.children) {
          const found = findElementInTree(col.children, targetId);
          if (found) return found;
        }
      }
    }
  }
  return null;
};