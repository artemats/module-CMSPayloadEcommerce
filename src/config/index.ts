export const PRODUCT_CATEGORIES = [
  {
    label: 'Icons',
    value: 'icons' as const,
    featured: [
      {
        name: 'Flat Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/flat-icons.jpg',
      },
      {
        name: '3D Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/3d-icons.jpg',
      },
      {
        name: 'Vector Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/vector-icons.jpg',
      },
    ],
  },
  {
    label: 'Design Templates',
    value: 'design_templates' as const,
    featured: [
      {
        name: 'Website Templates',
        href: '/products?category=design_templates',
        imageSrc: '/nav/design_templates/website-templates.avif',
      },
      {
        name: 'Presentation Templates',
        href: '/products?category=design_templates',
        imageSrc: '/nav/design_templates/presentation-templates.avif',
      },
      {
        name: 'Social Media Templates',
        href: '/products?category=design_templates',
        imageSrc: '/nav/design_templates/social-media-templates.avif',
      },
    ],
  },
  {
    label: 'Illustrations',
    value: 'illustrations' as const,
    featured: [
      {
        name: 'Hand-drawn Illustrations',
        href: '/products?category=illustrations',
        imageSrc: '/nav/illustrations/hand-dawn-illustrations.avif',
      },
      {
        name: 'Vector Illustrations',
        href: '/products?category=illustrations',
        imageSrc: '/nav/illustrations/vector-illustrations.avif',
      },
      {
        name: 'Character Illustrations',
        href: '/products?category=illustrations',
        imageSrc: '/nav/illustrations/character-illustrations.avif',
      },
    ],
  },
  {
    label: 'UI Kits',
    value: 'ui_kits' as const,
    featured: [
      {
        name: 'Web UI Kits',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/ui_kits/web.webp',
      },
      {
        name: 'Mobile UI Kits',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/ui_kits/mobile.webp',
      },
      {
        name: 'Dashboard UI Kits',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/ui_kits/dashboard.webp',
      },
    ],
  },
]
