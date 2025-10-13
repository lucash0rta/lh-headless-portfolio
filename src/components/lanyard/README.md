# Lanyard Component Assets

## ⚠️ Important: Assets Location

The asset files should be placed in the **`public`** folder (not in this directory) for compatibility with Next.js Turbopack:

- `public/card.glb` - The 3D model for the ID card
- `public/lanyard.png` - The texture for the lanyard band

This ensures the assets work with both webpack and Turbopack builds.

## Where to Get the Assets:

You can download these files from the original repository or create your own:

### Option 1: Download from Original Repository
Visit the original repository and download the files from `src/assets/lanyard/`

### Option 2: Create Your Own

#### For card.glb:
1. Create a simple ID card model in Blender or use an online 3D editor
2. The model should include:
   - A card mesh (rectangular plane)
   - A clip mesh (the lanyard attachment)
   - A clamp mesh (the clip mechanism)
3. Export as .glb format
4. **Optional**: Customize the card texture using this online editor: https://modelviewer.dev/editor/

#### For lanyard.png:
1. Create a texture image (recommended: 256x64 pixels or similar)
2. Design your lanyard band pattern
3. The texture will be repeated along the lanyard string
4. Save as PNG format

## Customizing the Card with Your Photo and Name:

To add your photo and name from Sanity to the card texture:

1. Export your card.glb model
2. Open it in https://modelviewer.dev/editor/
3. Upload a custom texture image that includes:
   - Your photo from Sanity
   - Your name
   - Any other personal information you want to display
4. Apply the texture to the card mesh
5. Download the updated .glb file

## File Placement:

Once you have both files, place them in the **public** folder:
```
public/
  ├── card.glb       ← Place here
  ├── lanyard.png    ← Place here
  ├── file.svg
  ├── globe.svg
  └── ...
```

## Creating a Card Texture Template:

You can create a card texture in any image editor (Photoshop, Figma, Canva, etc.) with dimensions like 1024x1448 pixels (or any aspect ratio matching a typical ID card).

Include in your design:
- Your photo (you can download it from Sanity CMS)
- Your name
- Your title/role
- Any other information you want visible on the card

Then apply this texture to your .glb model using the editor linked above.

