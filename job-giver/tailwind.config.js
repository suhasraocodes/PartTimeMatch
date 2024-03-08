module.exports = {
  
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: {
          50: '#F1F8FF',
          100: '#C8E1FF',
          200: '#9DBCF8',
          300: '#72A8F0',
          400: '#4C8DE1',
          500: '#2673D3', // Main primary color
          600: '#1C5AB3',
          700: '#14479D',
          800: '#0E3488',
          900: '#09266F',
        },
        secondary: {
          50: '#FDF2F8',
          100: '#FCE4F1',
          200: '#F9B8DD',
          300: '#F68CC9',
          400: '#F14CA8',
          500: '#ED1D87', // Main secondary color
          600: '#D01675',
          700: '#B31464',
          800: '#920E52',
          900: '#790A44',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F4F6F8',
          200: '#DFE3E8',
          300: '#C4CDD5',
          400: '#97A6BA',
          500: '#64748B', // Main neutral color
          600: '#475569',
          700: '#364152',
          800: '#27303D',
          900: '#1A1E25',
        },
        // Dark mode colors
        dark: {
          50: '#121212',
          100: '#1E1E1E',
          200: '#282828',
          300: '#333333',
          400: '#3D3D3D',
          500: '#484848', // Main dark mode background color
          600: '#515151',
          700: '#595959',
          800: '#626262',
          900: '#6B6B6B',
        },
        darkText: {
          50: '#FFFFFF',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080', // Main dark mode text color
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
};
