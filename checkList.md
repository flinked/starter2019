# Website checklist

## Front end integration

### Meta

- [ ] Favicons: Each favicon has been created and displays correctly.
- [ ] Inline critical CSS: The inline critical CSS is correctly injected in the HEAD.
- [ ] Description: A meta description is provided, it is unique and doesn't possess more than 150 characters.
- [ ] Title: A title is used on all pages

### HTML

- [ ] Noopener: In case you are using external links with target="_blank", your link should have a rel="noopener" attribute to prevent tab nabbing.
- [ ] Link checker: There are no broken links in my page, verify that you don't have any 404 error.
- [ ] Unique ID: If IDs are used, they are unique to a page.
- [ ] H1: All pages have an H1 which is not the title of the website.
- [ ] Alternative text: All image have an alternative text "alt" which describe the image visually.
- [ ] W3C compliant: All pages need to be tested with the W3C validator to identify possible issues in the HTML code.
- [ ] Error pages: Error 404 page

### CSS

- [ ] Vendor prefixes: CSS vendor prefixes are used and are generated accordingly with your browser support compatibility.
- [ ] ESLint: No errors are flagged by ESLint (based on your configuration or standards rules).

### JS

- [ ] ESLint: No errors are flagged by ESLint (based on your configuration or standards rules).
- [ ] Clean up console log: removed before sending the page to production.

### General

- [ ] Optimization: All images are compresed to be rendered in the browser.
- [ ] Clean up comments: Unnecessary code needs to be removed before sending the page to production.
- [ ] Google PageSpeed: All your pages were tested (not only the homepage) and have a score of at least 90/100.
- [ ] Responsive web design: All pages were tested with the correct breakpoints.
- [ ] Desktop Browsers: All pages were tested on all current desktop browsers (Safari, Firefox, Chrome, Internet Explorer, EDGE...)
- [ ] sitemap.xml: A sitemap.xml exists and was submitted to Google Search Console.
- [ ] robots.txt: The robots.txt is not blocking webpages.