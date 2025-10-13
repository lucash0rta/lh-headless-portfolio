# Lanyard Component Setup Guide

I've successfully integrated the Lanyard component into your portfolio! Here's what's been done and what you need to do to complete the setup.

## ✅ What's Been Implemented

1. **Lanyard Component** (`src/components/lanyard/Lanyard.tsx`)
   - Full 3D physics-based lanyard with draggable ID card
   - Positioned on the top-right of your page (you can easily change to left)
   - Responsive design for different screen sizes

2. **TypeScript Support** (`src/types/global.d.ts`)
   - Type declarations for .glb, .png files
   - MeshLine types for the lanyard rope

3. **Next.js Configuration** (`next.config.ts`)
   - Webpack configured to handle .glb files

4. **Showreel Fixed**
   - Now maintains a perfect 16:9 aspect ratio
   - Responsive and looks great on all screen sizes

5. **Integration** (`src/app/page.tsx`)
   - Lanyard component loads dynamically (client-side only)
   - Ready to display once you add the asset files

## 📋 What You Need to Do

### Step 1: Get the Asset Files

You need two files in `src/components/lanyard/`:

1. **card.glb** - The 3D ID card model
2. **lanyard.png** - The lanyard band texture

#### Option A: Download from Original Repo
Download `card.glb` and `lanyard.png` from the original repository's assets folder.

#### Option B: Create Your Own (Recommended for Personalization)

**For the lanyard.png:**
1. Create a simple texture (e.g., 256x64 pixels)
2. Design your pattern (solid color, stripes, logo, etc.)
3. Save as `lanyard.png` in `src/components/lanyard/`

**For the card.glb:**
See Step 2 for creating a personalized card.

---

### Step 2: Create Your Personalized ID Card

To make the card show YOUR photo and name from Sanity:

#### Method 1: Using Blender (Full Control)

1. **Create a Basic Card in Blender:**
   ```
   - Add a plane (this is your card)
   - Scale it to card proportions (approx. 85.6mm × 53.98mm)
   - Add simple geometry for clip and clamp
   - Name your objects: "card", "clip", "clamp"
   ```

2. **Create Your Card Texture:**
   - Use any design tool (Figma, Photoshop, Canva)
   - Dimensions: 1024x1448 pixels (or similar ID card ratio)
   - Include:
     - Your photo (download from Sanity at `aboutData.photoURL`)
     - Your name (from `aboutData.name`)
     - Your title (from `aboutData.title`)
     - Any design elements you like
   - Save as PNG

3. **Apply Texture in Blender:**
   - UV unwrap your card plane
   - Create a material
   - Add your texture as the base color
   - Export as .glb (File > Export > glTF 2.0)

4. **Save:**
   - Place `card.glb` in `src/components/lanyard/`

#### Method 2: Using Online Editor (Easier)

1. **Download a template card.glb** from the original repo

2. **Create your card texture image:**
   - Make a 1024x1448px image
   - Add your photo from Sanity
   - Add your name and title
   - Export as PNG

3. **Apply texture online:**
   - Go to https://modelviewer.dev/editor/
   - Upload the card.glb
   - Replace the texture with your custom image
   - Download the modified .glb

4. **Save:**
   - Place the new `card.glb` in `src/components/lanyard/`

---

### Step 3: Automatic Sanity Data Integration (Future Enhancement)

If you want the card to automatically update from Sanity data, you'd need to:

1. **Generate the texture dynamically:**
   - Use HTML Canvas or a service like Cloudinary/Imgix
   - Composite your photo and text programmatically
   - Apply to the card in real-time

2. **Or use HTML/CSS overlay:**
   - Create a DOM overlay that sits on top of the 3D card
   - Use Sanity data directly in React
   - Style it to look like it's part of the card

This is more advanced but would allow automatic updates from Sanity.

---

### Step 4: Adjust Position (Optional)

To move the lanyard to the **left side** instead of right:

**Edit `src/components/lanyard/Lanyard.css`:**

```css
.lanyard-wrapper {
  position: fixed;
  top: 0;
  left: 2rem;  /* Changed from 'right' to 'left' */
  /* ... rest stays the same ... */
}

@media (max-width: 1024px) {
  .lanyard-wrapper {
    left: 1rem;  /* Changed from 'right' to 'left' */
  }
}

@media (max-width: 768px) {
  .lanyard-wrapper {
    left: 0.5rem;  /* Changed from 'right' to 'left' */
  }
}
```

---

### Step 5: Test Your Setup

1. **Ensure you have both files:**
   ```
   src/components/lanyard/
     ├── card.glb
     └── lanyard.png
   ```

2. **Run your dev server:**
   ```bash
   npm run dev
   ```

3. **Check your site:**
   - The lanyard should appear hanging from the top-right (or left)
   - You should be able to drag the card with your mouse
   - The showreel should be in perfect 16:9 ratio

---

## 🎨 Customization Options

### Adjust Physics

In `src/app/page.tsx`, line 78:

```tsx
<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
```

- `position`: Camera position `[x, y, z]`
- `gravity`: Gravity force `[x, y, z]` (default: `[0, -40, 0]`)

### Adjust Size/Placement

Edit `src/components/lanyard/Lanyard.css` to change:
- `width` and `height` of the wrapper
- `top`, `left`, or `right` position
- Responsive breakpoints

### Change Lanyard Color

In `src/components/lanyard/Lanyard.tsx`, find the `meshLineMaterial`:

```tsx
<meshLineMaterial
  color="white"  // Change this color
  // ...
/>
```

---

## 🚀 Quick Start Template

If you want to get started quickly, here's a simple card texture template you can create:

1. **Create a 1024x1448px image**
2. **Add a white or light background**
3. **Place your photo at the top (centered)**
4. **Add your name below (large text)**
5. **Add your title below that (smaller text)**
6. **Export as PNG**

Use this PNG in Method 2 above to create your card.glb file.

---

## 📝 Notes

- The lanyard component uses client-side rendering only (Three.js doesn't work with SSR)
- The physics simulation runs at 60 FPS for smooth interactions
- The card is draggable - users can interact with it!
- The component is fully responsive

---

## 🐛 Troubleshooting

**Card not appearing:**
- Ensure both `card.glb` and `lanyard.png` are in the correct directory
- Check browser console for errors
- Try refreshing the page

**Card texture looks wrong:**
- Verify your .glb file has the correct material setup
- Check that texture dimensions are reasonable
- Use the online editor to verify the model

**Performance issues:**
- Reduce the `resolution` in `meshLineMaterial`
- Simplify your .glb model (fewer vertices)

---

Need help? The component is fully set up and ready to go once you add the asset files!





