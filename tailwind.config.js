/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          900: '#07090E',
          800: '#0B0F17',
          700: '#111827',
          600: '#1F2937'
        },
        navy: {
          900: '#0C1322',
          800: '#131B2E',
          700: '#1E293B',
          600: '#334155'
        },
        cyan: {
          accent: '#06B6D4',
          glow: '#22D3EE',
          light: '#E0F2FE'
        },
        coral: {
          bad: '#F43F5E',
          warning: '#FB923C'
        },
        emerald: {
          mastered: '#10B981',
          bright: '#34D399'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float-node': 'floatNode 4s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.7)' }
        },
        floatNode: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        scanLine: {
          '0%': { top: '0%' },
          '100%': { top: '100%' }
        }
      }
    },
  },
  plugins: [],
}
