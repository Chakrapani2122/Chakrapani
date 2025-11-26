# Chakrapani Gajji Portfolio - Static Website

This portfolio has been converted from a React/TypeScript application to a static HTML, CSS, and JavaScript website that can run locally without any build tools or server requirements.

## Files Structure

```
portfolio/
├── index.html       # Main HTML file
├── style.css        # Custom CSS styles
├── script.js        # JavaScript functionality
└── README.md        # This file
```

## How to Run

### Option 1: Direct File Opening
1. Simply double-click on `index.html` to open it in your default web browser

### Option 2: Local Server (Recommended for best performance)
If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open http://localhost:8000 in your browser.

### Option 3: Using Node.js
If you have Node.js installed:
```bash
npx serve .
```

### Option 4: Using PHP
If you have PHP installed:
```bash
php -S localhost:8000
```

## Features

- **Fully Responsive Design**: Works on all devices and screen sizes
- **Modern Animations**: CSS and JavaScript animations for smooth user experience
- **Interactive Navigation**: Smooth scrolling navigation with active section highlighting
- **Contact Form**: Functional contact form that opens email client
- **Dark Theme**: Professional dark theme with teal accents
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance Optimized**: Minimal external dependencies

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Lucide Icons**: Beautiful icon set (via CDN)
- **Google Fonts**: Inter and Outfit font families

## External Dependencies (CDN)

The website uses the following CDN resources:
- Tailwind CSS: `https://cdn.tailwindcss.com`
- Lucide Icons: `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- Google Fonts: Inter and Outfit families

## Browser Compatibility

This website is compatible with all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Colors
The color scheme can be modified in the Tailwind configuration within `index.html`:
```javascript
colors: {
    navy: {
        900: '#0B1020',
        800: '#151e32',
        700: '#232d4b',
    },
    teal: {
        400: '#00D4C8',
        500: '#00b8ad',
    },
    // ... modify as needed
}
```

### Content
To update the portfolio content, modify the data directly in the HTML file:
- Personal information in the Hero section
- Experience details in the Experience section
- Project information in the Projects section
- Skills in the Skills section

### Styling
Additional custom styles can be added to `style.css` for further customization.

## Performance Tips

1. **Images**: Add your images to the project folder and reference them locally
2. **Fonts**: Consider downloading Google Fonts locally for faster loading
3. **Icons**: You can replace Lucide icons with local SVG files if needed

## Deployment

This static website can be deployed to any web hosting service:

### GitHub Pages
1. Create a repository on GitHub
2. Upload the files
3. Enable GitHub Pages in repository settings

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be live instantly

### Vercel
1. Upload the folder to Vercel
2. Deploy with one click

### Traditional Web Hosting
Upload the files via FTP to any web hosting provider.

## Troubleshooting

### Icons not showing
- Ensure you have an internet connection (icons load from CDN)
- Check browser console for any JavaScript errors

### Styling not applied
- Make sure `style.css` is in the same folder as `index.html`
- Check that the file path is correct in the HTML

### JavaScript not working
- Ensure `script.js` is in the same folder as `index.html`
- Check browser console for any JavaScript errors
- Make sure you're accessing the site via HTTP (not file://) if using local server

## Contact

For any questions about this portfolio, contact:
- Email: cgajji@ksu.edu
- LinkedIn: https://linkedin.com/in/chakrapanigajji
- GitHub: https://github.com/Chakrapani2122

---

Built with ❤️ using HTML, CSS, and JavaScript
