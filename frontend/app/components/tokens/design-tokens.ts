// Design tokens: centralized styling values for consistency across the app

// Color tokens for different UI elements
export const colors = {
  postIt: 'bg-yellow-200', // Post-it note background color
  canvas: 'bg-gray-100', // Canvas background color
  button: 'bg-blue-500', // Button background color
  buttonHover: 'hover:bg-blue-600', // Button hover state
  selection: 'ring-2 ring-blue-500', // Selected post-it border
  selectionBox: 'border-blue-500', // Drag selection box border
  resizeHandle: 'bg-blue-500', // Resize handle color
};

// Size tokens for dimensions
export const sizes = {
  postItDefault: { width: 160, height: 160 }, // Default post-it size
  postItMin: { width: 80, height: 80 }, // Minimum post-it size when resizing
  resizeHandle: 'w-2 h-2', // Resize handle dimensions
  button: 'px-4 py-2', // Button padding
};

// Spacing tokens for positioning
export const spacing = {
  buttonPosition: 'top-4 left-4', // Button position on canvas
};
