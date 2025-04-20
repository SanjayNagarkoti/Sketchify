const fillShape = (id: string | number) => {
  // Find the shape
  const shapeIndex = shapes.findIndex(shape => shape.id === id);
  
  if (shapeIndex === -1) return;
  
  // Create a copy of the shapes array
  const newShapes = [...shapes];
  
  // Get the current shape
  const shape = newShapes[shapeIndex];
  
  // Toggle the fill
  if (shape.fill === 'transparent' || !shape.fill) {
    shape.fill = color;
  } else {
    shape.fill = 'transparent';
  }
  
  // Update the shapes
  setShapes(newShapes);
}; 