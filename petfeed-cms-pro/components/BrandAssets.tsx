import React from 'react';

const iconClass = "w-10 h-10";

export const LogoWide = () => (
    <svg viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="40" height="40" x="5" y="5" rx="8" fill="#3A4D39" />
        <path d="M25 35L15 15H35L25 35Z" fill="#F2F0E9"/>
        <text x="60" y="35" fill="#1A1A18" fontFamily="serif" fontSize="28" fontWeight="bold" letterSpacing="0.05em">NATURE MAGIC</text>
    </svg>
);

export const LogoSquare = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="100" height="100" rx="24" fill="#3A4D39" />
        <path d="M50 75L25 25H75L50 75Z" fill="#F2F0E9"/>
    </svg>
);

// --- THIRD PARTY SERVICE ICONS ---
export const ServiceIcons = {
    // 1. Meta Business Suite (Blue Infinity)
    'l1': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#0668E1" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.92 6.5C15.22 6.5 13.52 7.21 12 8.5C10.48 7.21 8.78 6.5 7.08 6.5C3.39 6.5 1.5 9.17 1.5 12.25C1.5 15.33 3.39 18 7.08 18C9.69 18 11.23 16.27 12 15.21C12.77 16.27 14.31 18 16.92 18C20.61 18 22.5 15.33 22.5 12.25C22.5 9.17 20.61 6.5 16.92 6.5ZM7.08 15.75C5.06 15.75 3.75 14.22 3.75 12.25C3.75 10.28 5.06 8.75 7.08 8.75C8.34 8.75 9.53 9.38 10.37 10.39C9.17 13.06 7.82 15.75 7.08 15.75ZM16.92 15.75C16.18 15.75 14.83 13.06 13.63 10.39C14.47 9.38 15.66 8.75 16.92 8.75C18.94 8.75 20.25 10.28 20.25 12.25C20.25 14.22 18.94 15.75 16.92 15.75Z" fill="white"/>
            <path d="M12 12C12 12 12 12 12 12Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.92 7.5C15.35 7.5 13.85 8.1 12.53 9.14C12.36 9.27 12.18 9.41 12 9.56C11.82 9.41 11.64 9.27 11.47 9.14C10.15 8.1 8.65 7.5 7.08 7.5C3.94 7.5 2.5 9.61 2.5 12.25C2.5 14.89 3.94 17 7.08 17C8.65 17 10.15 16.4 11.47 15.36C11.64 15.23 11.82 15.09 12 14.94C12.18 15.09 12.36 15.23 12.53 15.36C13.85 16.4 15.35 17 16.92 17C20.06 17 21.5 14.89 21.5 12.25C21.5 9.61 20.06 7.5 16.92 7.5ZM7.08 16C4.49 16 3.5 14.34 3.5 12.25C3.5 10.16 4.49 8.5 7.08 8.5C8.13 8.5 9.12 8.92 9.98 9.77C9.27 12.06 8.36 14.18 7.32 15.93C7.24 15.98 7.16 16 7.08 16ZM16.92 16C16.84 16 16.76 15.98 16.68 15.93C15.64 14.18 14.73 12.06 14.02 9.77C14.88 8.92 15.87 8.5 16.92 8.5C19.51 8.5 20.5 10.16 20.5 12.25C20.5 14.34 19.51 16 16.92 16Z" fill="#0668E1"/>
        </svg>
    ),
    // 2. Apple Business Connect (Apple Logo)
    'l2': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 16.27C16.3 17.37 15.45 18.96 14.22 19C13.01 19.03 12.63 18.28 11.21 18.28C9.79 18.28 9.35 18.99 8.19 19.02C6.98 19.04 6.04 17.33 5.27 16.2C3.73 13.94 2.55 9.83 4.14 7.04C4.93 5.65 6.34 4.76 7.7 4.74C8.86 4.71 9.95 5.53 10.66 5.53C11.37 5.53 12.72 4.62 14.12 4.71C14.71 4.74 16.36 4.95 17.42 6.52C17.33 6.57 15.27 7.81 15.29 10.3C15.31 12.95 17.63 14.03 17.65 14.03C17.63 14.12 17.3 15.26 17.05 16.27ZM11.1 3.25C11.74 2.45 12.16 1.34 12.05 0.53C11.03 0.57 9.81 1.23 9.07 2.1C8.41 2.85 7.87 4.01 8.01 5.11C9.1 5.21 10.4 4.08 11.1 3.25Z"/>
        </svg>
    ),
    // 3. Apple Business Manager (Same Apple Logo)
    'l3': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#555555" xmlns="http://www.w3.org/2000/svg">
             <path d="M17.05 16.27C16.3 17.37 15.45 18.96 14.22 19C13.01 19.03 12.63 18.28 11.21 18.28C9.79 18.28 9.35 18.99 8.19 19.02C6.98 19.04 6.04 17.33 5.27 16.2C3.73 13.94 2.55 9.83 4.14 7.04C4.93 5.65 6.34 4.76 7.7 4.74C8.86 4.71 9.95 5.53 10.66 5.53C11.37 5.53 12.72 4.62 14.12 4.71C14.71 4.74 16.36 4.95 17.42 6.52C17.33 6.57 15.27 7.81 15.29 10.3C15.31 12.95 17.63 14.03 17.65 14.03C17.63 14.12 17.3 15.26 17.05 16.27ZM11.1 3.25C11.74 2.45 12.16 1.34 12.05 0.53C11.03 0.57 9.81 1.23 9.07 2.1C8.41 2.85 7.87 4.01 8.01 5.11C9.1 5.21 10.4 4.08 11.1 3.25Z"/>
        </svg>
    ),
    // 4. Manufacturer Center (Google Tag)
    'l4': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13L13 23L23 13V3H13L3 13Z" fill="#4285F4"/>
            <circle cx="17.5" cy="8.5" r="2.5" fill="white"/>
        </svg>
    ),
    // 5. Merchant Center (Blue House/Tag)
    'l5': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7H3V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7Z" fill="#4285F4"/>
            <path d="M12 2L3 7V11H21V7L12 2Z" fill="#669DF6"/>
            <rect x="7" y="12" width="10" height="2" rx="1" fill="white"/>
        </svg>
    ),
    // 6. Google Business Profile (Blue Storefront)
    'l6': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9 8.9L20.6 3.6C20.4 2.7 19.6 2 18.7 2H5.3C4.4 2 3.6 2.7 3.4 3.6L2.1 8.9C1.4 11.6 3.2 14 5.8 14.4V20C5.8 21.1 6.7 22 7.8 22H16.2C17.3 22 18.2 21.1 18.2 20V14.4C20.8 14 22.6 11.6 21.9 8.9ZM7.8 20V15H10.2V20H7.8ZM16.2 20H13.8V15H16.2V20ZM18.2 12C17.1 12 16.2 11.1 16.2 10V9H13.8V10C13.8 11.1 12.9 12 11.8 12C10.7 12 9.8 11.1 9.8 10V9H7.4V10C7.4 11.1 6.5 12 5.4 12C4.5 12 3.8 11.4 3.6 10.6L4.7 6H19.3L20.4 10.6C20.2 11.4 19.5 12 18.2 12Z" fill="#4285F4"/>
        </svg>
    ),
    // 7. Google Ads (Tri-color)
    'l7': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3 16.2L13.1 2.3C12.4 1.1 10.9 0.7 9.7 1.4L2.3 5.7C1.1 6.4 0.7 7.9 1.4 9.1L9.6 23.3C10.3 24.5 11.8 24.9 13 24.2L20.4 19.9C21.5 19.2 21.9 17.7 21.3 16.2Z" fill="#F9BC05"/>
            <path d="M12.9 24.1L20.3 19.8C21.5 19.1 21.9 17.6 21.2 16.4L13 2.3C12.3 1.1 10.8 0.7 9.6 1.4L12.9 24.1Z" fill="#34A853"/>
            <path d="M12.9 24.1L9.6 1.4C8.4 2.1 8 3.6 8.7 4.8L16.9 18.9C17.6 20.1 19.1 20.5 20.3 19.8L12.9 24.1Z" fill="#4285F4"/>
        </svg>
    ),
    // 8. GA4 Analytics (Orange Bars)
    'l8': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="10" width="5" height="11" rx="1" fill="#F9AB00"/>
            <rect x="10" y="3" width="5" height="18" rx="1" fill="#F9AB00"/>
            <rect x="17" y="13" width="5" height="8" rx="1" fill="#F9AB00"/>
        </svg>
    ),
    // 9. Search Console (Blue Gauge)
    'l9': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#4285F4" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
            <path d="M16.5 13H15.71L15.43 12.73C16.41 11.59 17 10.11 17 8.5C17 4.91 14.09 2 10.5 2C6.91 2 4 4.91 4 8.5C4 12.09 6.91 15 10.5 15C12.11 15 13.59 14.41 14.73 13.43L15 13.71V14.5L20 19.49L21.49 18L16.5 13ZM10.5 13C8.01 13 6 10.99 6 8.5C6 6.01 8.01 4 10.5 4C12.99 4 15 6.01 15 8.5C15 10.99 12.99 13 10.5 13Z" fill="white" transform="translate(2, 2) scale(0.8)"/>
        </svg>
    ),
    // 10. Google Workspace (Blue Hex)
    'l10': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#4285F4" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM18 15H6V9H18V15Z" fill="currentColor"/>
        </svg>
    ),
    // 11. WhatsApp Business (Green)
    'l11': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.373 0 0 5.373 0 12C0 14.12 0.553 16.12 1.527 17.89L0.5 23L5.75 21.96C7.45 23.03 9.61 23.75 12 23.75C18.627 23.75 24 18.377 24 11.75C24 5.123 18.627 0 12 0ZM12 18.5C10.5 18.5 9.2 18 8 17L7.5 16.5L4.5 17L5 14L4.5 13.5C3.5 12.3 3 10.9 3 9.5C3 6.5 5.5 4 8.5 4H15.5C18.5 4 21 6.5 21 9.5C21 12.5 18.5 15 15.5 15H12V18.5ZM9.5 8H12C12.8 8 13.5 8.7 13.5 9.5V12.5H12V9.5H9.5V8Z" fill="currentColor"/>
        </svg>
    ),
    // 12. Cloudflare (Orange Cloud)
    'd1': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#F38020" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4 10C18.7 6.6 15.7 4 12 4C8.7 4 5.8 6.1 4.7 9C2.1 9.4 0 11.7 0 14.5C0 17.5 2.5 20 5.5 20H19.5C21.9 20 24 17.9 24 15.5C24 12.6 21.9 10.3 19.4 10Z"/>
        </svg>
    ),
    // 13. GitHub (Black Octocat)
    'd2': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#181717" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9.025 23.129 9.025 22.81V20.573C5.687 21.298 4.984 18.966 4.984 18.966C4.438 17.579 3.653 17.211 3.653 17.211C2.563 16.467 3.736 16.482 3.736 16.482C4.941 16.567 5.575 17.719 5.575 17.719C6.646 19.555 8.385 19.025 9.068 18.718C9.176 17.942 9.488 17.412 9.832 17.112C7.168 16.809 4.368 15.779 4.368 11.178C4.368 9.868 4.835 8.796 5.602 7.957C5.477 7.653 5.068 6.425 5.72 4.779C5.72 4.779 6.728 4.456 9.022 6.01C9.98 5.744 11.008 5.611 12.031 5.61C13.054 5.611 14.082 5.744 15.042 6.01C17.334 4.456 18.34 4.779 18.34 4.779C18.994 6.425 18.586 7.653 18.461 7.957C19.23 8.796 19.694 9.868 19.694 11.178C19.694 15.792 16.89 16.805 14.218 17.102C14.654 17.478 15.044 18.22 15.044 19.356V22.81C15.044 23.134 15.26 23.506 15.869 23.386C20.565 21.796 24 17.302 24 12C24 5.373 18.627 0 12 0Z"/>
        </svg>
    ),
    // 14. Airwallex (Purple)
    'd3': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#6B46C1" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#6B46C1"/>
            <path d="M7 17L12 12L17 7M17 17L12 12L7 7" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
    ),
    // 15. PayMe (Red)
    'd4': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#E60012" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12"/>
            <path d="M8 7V17M8 7H13C15.5 7 16.5 8.5 16.5 10.5C16.5 12.5 15.5 14 13 14H8" stroke="white" strokeWidth="2.5"/>
        </svg>
    ),
    // 16. HKTVMALL (Green)
    's1': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#8DC63F" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#007A33"/>
            <path d="M5 10H19V20H5V10Z" fill="white"/>
            <path d="M7 10V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V10" stroke="white" strokeWidth="2"/>
        </svg>
    ),
    // 17. The Place (Black)
    's2': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#1A1A18" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L12 3L4 7M4 7V17L12 21L20 17V7M4 7L12 11L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    // 18. Shopify (Green Bag)
    's3': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#96BF48" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 6L18 3.5H6L3.5 6V20C3.5 21.1 4.4 22 5.5 22H18.5C19.6 22 20.5 21.1 20.5 20V6ZM12 16C9.8 16 8 14.2 8 12H16C16 14.2 14.2 16 12 16Z" fill="currentColor"/>
        </svg>
    ),
    // 19. Website (Nature Green)
    's4': () => (
        <svg className={iconClass} viewBox="0 0 24 24" fill="#3A4D39" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
};