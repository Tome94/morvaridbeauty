# Responsive Design Plan - Morvarid Beauty

## 📱 Breakpoint Strategy

**Tailwind Default Breakpoints:**
- `sm`: 640px (small tablets, large phones)
- `md`: 768px (tablets)
- `lg`: 1024px (small laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large desktops)

**Target Devices:**
- Mobile: 320px - 640px (primary focus)
- Tablet: 641px - 1024px
- Desktop: 1025px+

---

## 🎯 Component-by-Component Plan

### 1. **Hero Section** (Priority: HIGH)
**Current State:**
- Logo: Fixed 350x250px (too large for mobile)
- Hero-main image: 85% width on mobile, 60% tablet, 50% desktop
- Tagline banner: Full banner with text + CTA on all sizes
- Logo positioned left on desktop, centered on mobile

**Desired Behavior:**
- As screen gets smaller: Logo and woman image get closer until they touch
- When they touch: Logo overlays on top of woman image
- Tagline banner: On mobile, show CTA button only (centered). On desktop, show full banner with tagline text

**Implementation Tasks:**

#### A. Logo & Woman Image Convergence
- [ ] **Woman image positioning**: Gradually move left as screen shrinks
  - Mobile (< 640px): `right-0` or `right-[2%]`, width `w-[75%]`
  - Small (640px+): `right-[3%]`, width `w-[70%]`
  - Medium (768px+): `right-[5%]`, width `w-[60%]` (current)
  - Large (1024px+): `right-[10%]`, width `w-[50%]` (current)

- [ ] **Woman image height**: Keep constant height as width changes
  - **IMPORTANT**: Hero main image height should NOT shift when screen width changes
  - Use `object-contain` to maintain aspect ratio
  - Consider using fixed height container or `h-full` with proper positioning
  - Ensure image maintains its vertical position and doesn't resize vertically
  - Only width should change responsively, height stays consistent

- [ ] **Logo positioning**: Gradually move right as screen shrinks
  - Mobile: Center horizontally, adjust padding to move right
  - Use responsive padding: `px-6 sm:px-8 md:px-6 md:pl-[20%] lg:pl-[25%]`
  - Adjust top padding: `pt-[30vh] sm:pt-[28vh] md:pt-[22vh] lg:pt-[30vh]`

- [ ] **Logo sizing**: Make responsive
  - Mobile: `w-[200px]` or `w-[180px]`
  - Small: `sm:w-[250px]`
  - Medium: `md:w-[300px]`
  - Large: `lg:w-[350px]` (current)

- [ ] **Z-index management**: Logo overlays woman on mobile
  - Mobile: `z-20` (above woman image which is `z-0`)
  - Desktop: `z-10` (normal stacking)

#### B. Tagline Banner Responsive Behavior
- [ ] **Mobile (< 768px)**: CTA button only
  - Hide tagline text: `hidden md:block` on `<p>`
  - Show CTA only: `md:hidden` wrapper
  - Center the button
  - Style: Same button style but standalone

- [ ] **Desktop (768px+)**: Full banner with tagline + CTA
  - Show both text and button: `hidden md:flex`
  - Keep current layout: flex-row with gap

#### C. Background Image
- [ ] **Scaling**: Adjust scale for different breakpoints
  - Mobile: `scale(1.1)` might be too much, test `scale(1.08)`
  - Desktop: Keep `scale(1.05)`

---

### 2. **Navbar** (Priority: MEDIUM)
**Current State:** ✅ Has mobile menu

**Tasks:**
- [ ] Test mobile menu on various screen sizes
- [ ] Ensure hamburger icon has adequate touch target (min 44x44px)
- [ ] Verify menu animation smoothness
- [ ] Check z-index doesn't conflict with hero section
- [ ] Test menu closing behavior

---

### 3. **About Section** (Priority: MEDIUM)
**Tasks:**
- [ ] Review component structure
- [ ] Text sizing: Ensure readable on mobile (min 16px)
- [ ] Image positioning and sizing
- [ ] Padding/margins: Reduce on mobile, increase on desktop
- [ ] Line heights for mobile readability

---

### 4. **Services Section** (Priority: MEDIUM)
**Tasks:**
- [ ] **Grid layout**:
  - Mobile: 1 column
  - Tablet: 2 columns (`md:grid-cols-2`)
  - Desktop: 3+ columns (`lg:grid-cols-3`)
  
- [ ] **Service cards**:
  - Card sizing: Responsive padding
  - Image aspect ratios: Maintain on all sizes
  - Text sizing: Responsive font sizes
  - Spacing: Adjust gaps between cards

- [ ] **Image optimization**:
  - Use Next.js Image with proper `sizes` prop
  - Consider different image sizes per breakpoint

---

### 5. **Pricing Section** (Priority: MEDIUM)
**Tasks:**
- [ ] **Layout decision**:
  - Option A: Cards (better for mobile)
  - Option B: Table with horizontal scroll on mobile
  
- [ ] **If using cards**:
  - Mobile: Stack vertically
  - Desktop: Grid layout
  
- [ ] **If using table**:
  - Mobile: Horizontal scroll wrapper
  - Desktop: Full table
  
- [ ] **Text sizing**: Price display readable on mobile
- [ ] **Button sizing**: Adequate touch targets (min 44x44px)

---

### 6. **LocationHours Section** (Priority: LOW)
**Tasks:**
- [ ] **Map embed**: Ensure responsive
  - Use responsive wrapper
  - Maintain aspect ratio
  
- [ ] **Hours table**: 
  - Mobile: Stack or scroll horizontally
  - Desktop: Full table
  
- [ ] **Contact info**: 
  - Mobile: Stack vertically
  - Desktop: Side-by-side layout

---

### 7. **Footer** (Priority: LOW)
**Tasks:**
- [ ] **Multi-column layout**:
  - Mobile: Stack all columns vertically
  - Tablet: 2 columns
  - Desktop: 3-4 columns
  
- [ ] **Link spacing**: Adequate for touch targets
- [ ] **Social icons**: Proper sizing for mobile
- [ ] **Text sizing**: Readable on all devices

---

## 🔧 Technical Implementation Details

### A. **Image Optimization**
- [ ] Use Next.js Image `sizes` prop correctly:
  ```tsx
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  ```
- [ ] Consider different image sources for mobile vs desktop
- [ ] Implement proper `srcset` for responsive images
- [ ] Lazy load images below the fold

### B. **Typography Scaling**
- [ ] Base font size: 16px minimum for mobile
- [ ] Responsive font sizes using Tailwind:
  - `text-sm` (14px) → `md:text-base` (16px) → `lg:text-lg` (18px)
- [ ] Line heights: Adjust for mobile readability (1.5-1.6)
- [ ] Letter spacing: May need adjustment on mobile

### C. **Touch Targets**
- [ ] All interactive elements: Minimum 44x44px
- [ ] Button padding: Adequate for thumb taps
- [ ] Link spacing: Prevent mis-taps (min 8px between links)
- [ ] Form inputs: Adequate size for mobile

### D. **Performance Optimization**
- [ ] Lazy load images below fold
- [ ] Reduce initial bundle size
- [ ] Optimize animations for mobile (use `transform` and `opacity`)
- [ ] Consider reducing animation complexity on mobile

### E. **Viewport & Meta Tags**
- [ ] Ensure viewport meta tag is set:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```
- [ ] Test on actual devices, not just browser dev tools
- [ ] Account for iOS safe areas (notch, home indicator)

---

## 📋 Implementation Order

### **Phase 1: Hero Section** (Most visible, highest impact)
1. Logo sizing - make responsive
2. Woman image positioning - gradual convergence
3. Logo positioning - move right as screen shrinks
4. Z-index management - logo overlays on mobile
5. Tagline banner - CTA only on mobile
6. Background image scaling - test per breakpoint

### **Phase 2: Core Content Sections**
1. About section - text and image responsiveness
2. Services section - grid layout and cards
3. Pricing section - layout decision and implementation

### **Phase 3: Supporting Sections**
1. LocationHours - map and table responsiveness
2. Footer - multi-column stacking

### **Phase 4: Polish & Testing**
1. Cross-device testing
2. Performance optimization
3. Animation refinements
4. Touch target verification
5. Accessibility checks

---

## 🧪 Testing Checklist

### **Devices to Test:**
- [ ] iPhone SE (375px) - smallest common mobile
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] iPad (768px landscape)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1920px+)

### **Orientations:**
- [ ] Portrait mobile
- [ ] Landscape mobile
- [ ] Portrait tablet
- [ ] Landscape tablet

### **Interactions:**
- [ ] Touch interactions (tap, swipe)
- [ ] Scroll behavior
- [ ] Menu interactions
- [ ] Button clicks
- [ ] Form inputs

### **Visual Checks:**
- [ ] No horizontal scrolling
- [ ] Text readable at all sizes
- [ ] Images load properly
- [ ] Animations smooth
- [ ] No layout breaks
- [ ] Colors contrast properly

---

## 🎨 Design Considerations

### **Mobile-First Approach**
- Start with mobile design, enhance for larger screens
- Use `min-width` media queries (Tailwind default)
- Progressive enhancement

### **Content Priority**
- Most important content visible without scrolling on mobile
- CTA buttons easily accessible
- Navigation always accessible (fixed navbar)

### **Visual Hierarchy**
- Maintain brand aesthetic across all sizes
- Ensure readability at all breakpoints
- Consistent spacing system
- Maintain visual balance

### **Performance**
- Optimize images for mobile (smaller file sizes)
- Minimize JavaScript on mobile
- Consider reducing animations on mobile devices

---

## 📝 Code Examples

### **Hero Logo Responsive Sizing:**
```tsx
<Image
  src="/images/Logo.png"
  alt="Morvarid Beauty Logo"
  width={350}
  height={250}
  className="w-[200px] h-auto sm:w-[250px] md:w-[300px] lg:w-[350px]"
  priority
/>
```

### **Hero Woman Image Positioning (Constant Height):**
```tsx
{/* Container maintains full height, only width changes */}
<div className="absolute right-0 sm:right-[3%] md:right-[5%] lg:right-[10%] top-0 h-full w-[75%] sm:w-[70%] md:w-[60%] lg:w-[50%]">
  <Image
    src="/images/Hero-main.png"
    alt="Morvarid Beauty - Professional Hair Styling"
    fill
    className="object-contain object-right-bottom"
    // object-contain maintains aspect ratio, height stays consistent
    // Only width of container changes, image scales proportionally
  />
</div>
```
**Note:** Using `h-full` ensures the container maintains full section height. `object-contain` with `fill` ensures the image maintains its aspect ratio and doesn't shift vertically as the container width changes.

### **Tagline Banner Mobile/Desktop:**
```tsx
{/* Mobile: CTA only */}
<div className="md:hidden">
  <Link href="#booking" className="...">
    Book Now
  </Link>
</div>

{/* Desktop: Full banner */}
<div className="hidden md:block">
  <div className="...">
    <p>Modern Cuts. Clean Style. Effortless Beauty.</p>
    <Link href="#booking">Book Now</Link>
  </div>
</div>
```

---

## ✅ Success Criteria

- [ ] Hero section adapts smoothly from desktop to mobile
- [ ] Hero main image maintains constant height as width changes (no vertical shifting)
- [ ] Logo overlays woman image on mobile as intended
- [ ] Tagline banner shows CTA only on mobile
- [ ] All sections are readable and functional on mobile
- [ ] No horizontal scrolling on any device
- [ ] All touch targets are adequate size
- [ ] Images load quickly on mobile
- [ ] Animations are smooth on all devices
- [ ] Site maintains brand aesthetic across all sizes
