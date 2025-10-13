# Lanyard Setup Checklist

Use this checklist to complete your Lanyard implementation:

## 📦 Asset Files

- [ ] **card.glb** - Place in `public/` folder
  - Can download from original repo
  - Or create custom using Blender
  - Or use online editor with your photo/name
  
- [ ] **lanyard.png** - Place in `public/` folder
  - Simple texture image (256x64px or similar)
  - Can be solid color, pattern, or logo
  - Will repeat along the lanyard cord

## 🎨 Personalization (Optional)

- [ ] Open `create-card-texture.html` in browser
- [ ] Download your photo from Sanity (`aboutData.photoURL`)
- [ ] Enter your name from Sanity (`aboutData.name`)
- [ ] Enter your title from Sanity (`aboutData.title`)
- [ ] Generate and download texture
- [ ] Apply texture to card.glb using https://modelviewer.dev/editor/

## 🔧 Position Adjustment (Optional)

- [ ] Decide: Left or Right side?
  - Currently set to: **Right**
  - To change to left: Edit `Lanyard.css` (line 3)

## ✅ Testing

- [ ] Run `npm run dev`
- [ ] Check lanyard appears in top corner
- [ ] Test dragging the card (should swing back)
- [ ] Verify showreel is 16:9
- [ ] Test on mobile/tablet (responsive)

## 🎯 Verification

Once assets are in place, you should see:
- ✅ Lanyard hanging from top corner
- ✅ Your photo on the card (if customized)
- ✅ Your name on the card (if customized)
- ✅ Interactive dragging physics
- ✅ Smooth animations

## 📁 Final File Structure

```
public/
├── card.glb              ← ADD THIS
├── lanyard.png           ← ADD THIS
├── file.svg
├── globe.svg
└── ...

src/components/lanyard/
├── Lanyard.tsx           ✅ Created
├── LanyardClient.tsx     ✅ Created
├── Lanyard.css           ✅ Created
├── README.md             ✅ Created
├── CHECKLIST.md          ✅ Created (this file)
└── create-card-texture.html  ✅ Created
```

## 🚀 You're Done!

When all checkboxes are complete, your lanyard will be fully functional!

---

**Quick Links:**
- Full Setup Guide: `../../../LANYARD_SETUP_GUIDE.md`
- Implementation Summary: `../../../IMPLEMENTATION_SUMMARY.md`
- Texture Generator: `create-card-texture.html`

