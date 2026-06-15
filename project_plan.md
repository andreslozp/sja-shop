# St. Joan of Arc Catholic Church & School Website

## 1. Project Description
A vibrant Catholic church and school website for St. Joan of Arc in Boca Raton, Florida. The website serves as a digital hub for parishioners, providing mass schedules, event information, online donations, ministry resources, and community registration. The design features a warm green and gold color palette reflecting the church's identity.

## 2. Page Structure
- `/` - Home (main page with all church info, hero carousel, parish life, ministries, resources)
- `/shop` - Shop (future)
- `/marketplace` - Marketplace (future)
- `*` - Not Found

## 3. Core Features
- [ ] Hero carousel with auto-rotating slides and manual controls
- [ ] Sticky navigation with dropdown menus
- [ ] Parish announcements and featured events
- [ ] Pastor profile card
- [ ] Events & registration links
- [ ] Online donation buttons (PayPal, Kilby Fund)
- [ ] Mass schedule display
- [ ] Diocesan Services Appeal section
- [ ] Ministries quick links grid
- [ ] Resources section (testimonials, ministries guide, bulletin)
- [ ] Join community CTA banner
- [ ] Footer with quick links, contact info, and Google Map embed
- [ ] Language switcher
- [ ] Social media links
- [ ] Mobile responsive design

## 4. Data Model Design
No Supabase database needed for initial build. The website is primarily informational and links to external systems (PayPal, Google Maps, YouTube, Vimeo, etc.).

## 5. Backend / Third-party Integration Plan
- **Supabase**: Not needed for initial build (no user auth or data storage required)
- **Shopify**: Not connected (Shop and Marketplace pages are future features)
- **Stripe**: Not connected
- **External Links**: PayPal donations, Google Maps, YouTube, Vimeo, Diocese website

## 6. Development Phase Plan

### Phase 1: Home Page Rebuild
- Goal: Rebuild the entire homepage with all sections from the reference website
- Deliverable: Fully functional homepage with top bar, header, nav, hero carousel, parish life sections, ministries, resources, CTA, and footer
- Status: In Progress

### Phase 2: Additional Pages (Future)
- Goal: Create Shop and Marketplace pages
- Deliverable: Shop and Marketplace page layouts
- Status: Pending

### Phase 3: Multi-language Support
- Goal: Implement full English/Spanish support
- Deliverable: Complete i18n translation files
- Status: Pending

### Phase 4: Backend Integration (Future)
- Goal: Connect Supabase for event management, announcements, etc.
- Deliverable: Admin-managed content for announcements, events, bulletins
- Status: Pending