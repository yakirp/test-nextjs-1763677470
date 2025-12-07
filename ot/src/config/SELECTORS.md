# News Source Selector Patterns

This document explains the CSS selector patterns used to extract content from news websites.

## Overview

Each news source in `sources.json` includes `selectors` that specify how to extract article information from the website's HTML structure. These selectors use standard CSS selector syntax compatible with Cheerio.

## Selector Fields

### Required Selectors

- **headline**: CSS selector for article titles/headlines
- **link**: CSS selector for article URLs (typically an `<a>` tag)

### Optional Selectors

- **content**: CSS selector for article body content (used in full article extraction)
- **date**: CSS selector for publication date (often a `<time>` element)

## Current Configurations

### BBC News
```json
{
  "headline": "h2.sc-8ea7699c-3, h3.gs-c-promo-heading__title",
  "link": "a.gs-c-promo-heading",
  "date": "time"
}
```
- Uses class-based selectors for styled components
- Multiple selector options (comma-separated) for flexibility
- Standard `<time>` element for dates

### Hacker News
```json
{
  "headline": ".titleline > a",
  "link": ".titleline > a",
  "date": ".age"
}
```
- Simple class-based selectors
- Direct child combinator (`>`) for precision
- Same selector for headline and link (they're the same element)

### Reuters
```json
{
  "headline": "[data-testid='Heading']",
  "link": "a[data-testid='Link']",
  "date": "time"
}
```
- Uses data attributes for stability (less likely to change)
- Attribute selectors with exact match

### The Guardian
```json
{
  "headline": ".js-headline-text",
  "link": "a.u-faux-block-link__overlay",
  "date": "time"
}
```
- BEM-style class naming
- JavaScript hook classes (`.js-*`) for headline

### TechCrunch
```json
{
  "headline": ".post-block__title__link",
  "link": ".post-block__title__link",
  "date": "time.river-byline__time"
}
```
- BEM-style naming for post blocks
- Combined element + class selector for dates

## Selector Best Practices

### 1. Prefer Stable Selectors
- **Good**: `[data-testid='article']`, `.article-title`
- **Avoid**: `div > div:nth-child(3) > p:first-child`

### 2. Use Multiple Fallbacks
- Comma-separated selectors provide fallback options
- Example: `"h2.title, h3.title, .article-title"`

### 3. Be Specific But Not Brittle
- Include enough context to be unique
- Don't rely on deep nesting or positional selectors

### 4. Test Selectors
Always test selectors in browser DevTools:
```javascript
document.querySelectorAll('.your-selector')
```

## Adding New Sources

When adding a new source to `sources.json`:

1. **Visit the website** and open DevTools
2. **Inspect article elements** to find stable patterns
3. **Test selectors** using `document.querySelectorAll()`
4. **Use multiple selectors** if the site has inconsistent markup
5. **Document any quirks** in the description field

### Example: Adding NYTimes

```json
{
  "id": "nytimes",
  "name": "The New York Times",
  "baseUrl": "https://www.nytimes.com",
  "description": "American newspaper",
  "selectors": {
    "headline": "h3.indicate-hover, h2.css-1j9dxys",
    "link": "a.css-9mylee",
    "date": "time"
  }
}
```

## Troubleshooting Selectors

### No Articles Found
- Check if selectors match current site structure
- Verify site hasn't been redesigned
- Try broader selectors or add fallbacks

### Wrong Elements Extracted
- Make selectors more specific
- Use attribute selectors for precision
- Check for duplicate classes in different contexts

### Content Extraction Issues
- Some sites use JavaScript rendering (difficult to scrape)
- Check if site has an RSS feed as alternative
- Consider using `content` selector for article pages

## Selector Maintenance

CSS selectors can break when websites are redesigned. To maintain selectors:

1. **Version sources.json** in git to track changes
2. **Test regularly** with actual HTTP requests
3. **Update selectors** when scraping fails
4. **Document changes** in git commit messages

## Future Enhancements

- Add support for XPath selectors
- Implement selector testing utility
- Add RSS feed fallback for sites with feeds
- Create web-based selector builder tool
