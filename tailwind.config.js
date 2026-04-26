import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        `./components/**/*.{vue,js,ts}`,
        `./layouts/**/*.vue`,
        `./pages/**/*.vue`,
        `./composables/**/*.{js,ts}`,
        `./plugins/**/*.{js,ts}`,
        `./utils/**/*.{js,ts}`,
    ],
    theme: {
        extend: {
            colors: {
                ...defaultTheme.colors,
                ...{
                    // Luxurious color palette
                    groomPrimary: "#FDFCFB", // Soft Ivory
                    groomSecondary: "#1F3A5A", // Deep Navy Blue
                    groomTertiary: "#6FA7DF", // Slightly deeper sky blue
                    bridePrimary: "#FDFCFB", // Soft Ivory
                    brideSecondary: "#4A403A", // Warm Charcoal
                    brideTertiary: "#D4A5A5" // Dusty Rose
                },
            },
            fontFamily: {
                sans: [
                    ...defaultTheme.fontFamily.sans,
                    'Inter',
                    'Figtree',
                    'Proxima Nova',
                ],
                Cormorant: 'Cormorant',
                GreatVibes: 'GreatVibes',
                PlayfairDisplay: 'PlayfairDisplay',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'glow': 'glow 3s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 10px rgba(197, 168, 128, 0.2)' },
                    '100%': { boxShadow: '0 0 25px rgba(197, 168, 128, 0.6)' },
                }
            }
        },
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
