# Vibe Code Canvas

A Miro-like canvas application built from scratch using Next.js and TypeScript, without any pre-built canvas libraries.

## 🎯 Project Goal

Learn how to build a canvas-based application from the ground up, understanding the core concepts of:
- Canvas rendering and interactions
- Drag and drop functionality
- Multi-selection and manipulation
- State management for complex UI
- Component architecture using Atomic Design

## 🚀 Features

### Core Functionality
- **Create Post-its**: Click the "+ Post-it" button to add sticky notes to the canvas
- **Move Post-its**: Click and drag any post-it to reposition it
- **Edit Text**: Double-click a post-it to edit its content
- **Delete Post-its**: Select post-it(s) and press Backspace/Delete
- **Resize Post-its**: Drag the blue handles on edges and corners to resize
  - Edge handles: Resize in one direction (top, right, bottom, left)
  - Corner handles: Resize proportionally (diagonal)
- **Text Scaling**: Text size automatically scales with post-it size

### Selection Features
- **Single Selection**: Click a post-it to select it (blue ring appears)
- **Multi-Selection**: 
  - Drag on empty canvas to draw selection box
  - Press Ctrl+A to select all post-its
- **Deselect**: Click on empty canvas to deselect all
- **Group Move**: Drag any selected post-it to move all selected post-its together

### Keyboard Shortcuts
- `Ctrl+A`: Select all post-its
- `Backspace` or `Delete`: Delete selected post-its
- `Double-click`: Enter edit mode

## 🏗️ Architecture

### Atomic Design Pattern

```
app/
├── components/
│   ├── tokens/          # Design tokens (colors, sizes, spacing)
│   ├── atoms/           # Basic building blocks
│   │   ├── Button.tsx
│   │   └── ResizeHandle.tsx
│   ├── molecules/       # Combinations of atoms
│   │   └── PostIt.tsx
│   └── organisms/       # Complex components with business logic
│       └── Canvas.tsx
└── page.tsx            # Main entry point
```

### Component Hierarchy

1. **Tokens** (`design-tokens.ts`)
   - Centralized styling values
   - Colors, sizes, spacing constants

2. **Atoms** (Basic components)
   - `Button`: Reusable button component
   - `ResizeHandle`: Draggable resize handle

3. **Molecules** (Composite components)
   - `PostIt`: Single post-it note with text and resize handles

4. **Organisms** (Complex components)
   - `Canvas`: Main canvas managing all post-its and interactions

## 🛠️ Technical Implementation

### Key Concepts

#### 1. State Management
- `postIts`: Array of all post-it data (id, position, size, text)
- `selectedIds`: Array of selected post-it IDs
- `editingId`: ID of post-it being edited
- `dragging`: Drag operation state (IDs, start position, initial positions)
- `resizing`: Resize operation state (ID, handle, dimensions)
- `selecting`: Selection box state (start/current coordinates)

#### 2. Mouse Event Handling
- **MouseDown**: Start drag/resize/selection
- **MouseMove**: Update position/size/selection box
- **MouseUp**: Finalize operation
- **DoubleClick**: Enter edit mode

#### 3. Coordinate System
- Uses absolute positioning with `left` and `top` CSS properties
- Tracks mouse position relative to canvas
- Calculates deltas for smooth dragging and resizing

#### 4. Multi-Selection Logic
- Selection box uses min/max coordinates to find overlapping post-its
- Group drag stores initial positions of all selected items
- Applies same delta to all selected post-its

#### 5. Resize Logic
- 8 handles: 4 edges (n, s, e, w) + 4 corners (ne, se, sw, nw)
- Edge handles: Adjust width or height
- Corner handles: Adjust both dimensions
- West/North handles: Also adjust position to maintain opposite edge

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React useState/useEffect hooks

## 🎓 Learning Outcomes

### What You'll Learn
1. **Canvas Fundamentals**
   - How to handle mouse events for drag and drop
   - Coordinate system management
   - Hit detection (which element was clicked)

2. **State Management**
   - Managing complex UI state
   - Handling multiple simultaneous operations
   - Optimizing re-renders

3. **Component Architecture**
   - Atomic Design principles
   - Separation of concerns
   - Reusable component patterns

4. **User Interactions**
   - Drag and drop implementation
   - Multi-selection patterns
   - Keyboard shortcuts
   - Edit mode handling

## 🚦 Getting Started

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Code Structure

### Design Tokens
All styling values are centralized in `design-tokens.ts`:
- Colors: Post-it, canvas, buttons, selection
- Sizes: Default dimensions, minimum sizes
- Spacing: Component positioning

### Component Props Flow
```
Canvas (state management)
  ↓
PostIt (presentation + event handlers)
  ↓
ResizeHandle (atomic UI element)
```

## 🔮 Future Enhancements

Potential features to add:
- [ ] Undo/Redo functionality
- [ ] Copy/Paste post-its
- [ ] Different post-it colors
- [ ] Export canvas to JSON/Image
- [ ] Pan and zoom canvas
- [ ] Collaborative editing (WebSockets)
- [ ] Shapes (rectangles, circles, lines)
- [ ] Layers and z-index management
- [ ] Snap to grid
- [ ] Alignment guides

## 📚 Key Files to Study

1. `design-tokens.ts` - Understand design system
2. `ResizeHandle.tsx` - Learn cursor styles and positioning
3. `PostIt.tsx` - See component composition
4. `Canvas.tsx` - Study state management and event handling

## 💡 Tips for Learning

1. Start by reading the comments in each file
2. Trace the flow of a single interaction (e.g., dragging a post-it)
3. Experiment by modifying design tokens
4. Try adding a new feature (e.g., post-it colors)
5. Study how multi-selection works with the selection box

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve performance
- Refactor code
- Add tests
- Enhance documentation

---

Built with ❤️ as a learning project to understand canvas applications from scratch.
