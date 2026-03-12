# OCI-PPTX Implementation Examples

**When to load**: MANDATORY when implementing Oracle presentations from scratch with code.
**Do NOT load**: If editing existing templates (use editing.md workflow instead).

---

## Example 1: Oracle-Branded Slide with Cognitive Science

```javascript
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

// Oracle OCI/Database colors
const OCI_COLORS = {
  pine80: '4DAA87',
  pine120: '1E9773',
  pine140: '088560',
  brandYellow: 'EECC44',
  oracleRed: 'C74634',
  neutral30: 'E1E1E1',
  darkBg: '0B2540',      // Dark blue for live events
  lightBg: 'FFFFFF'       // White for documents
};

// Context-aware presentation setup
function createOraclePresentation(context = 'live-event') {
  const pptx = new PptxGenJS();

  // Set presentation metadata
  pptx.author = 'Oracle Corporation';
  pptx.company = 'Oracle';
  pptx.revision = '1';
  pptx.subject = 'Oracle Presentation';
  pptx.title = 'Oracle OCI Presentation';

  // Context-aware defaults
  const config = getContextConfig(context);
  pptx.layout = '16x9';  // Oracle standard

  return { pptx, config };
}

function getContextConfig(context) {
  switch(context) {
    case 'live-event':
      return {
        backgroundColor: OCI_COLORS.darkBg,
        textColor: 'FFFFFF',
        hyperlinkColor: OCI_COLORS.brandYellow,
        speakerNotes: true,
        showHeadshots: false  // Speaker visible on stage
      };

    case 'virtual':
      return {
        backgroundColor: null,  // Mix dark and light
        textColor: null,
        hyperlinkColor: null,
        speakerNotes: true,
        showHeadshots: true
      };

    case 'document':
      return {
        backgroundColor: OCI_COLORS.lightBg,
        textColor: '414141',
        hyperlinkColor: '2684A8',  // Sky 120
        speakerNotes: false,  // Text on slide instead
        showHeadshots: false
      };

    default:
      return getContextConfig('live-event');
  }
}

// Example: Create impact slide following cognitive science rules
function createImpactSlide(pptx, config) {
  const slide = pptx.addSlide();

  // Rule 1: Context-aware background
  if (config.backgroundColor) {
    slide.background = { color: config.backgroundColor };
  }

  // Rule 2: ONE message - "127% revenue growth"
  // Rule 3: Largest element = most important (metric, not title)

  // Large metric (72pt - LARGEST element)
  slide.addText('127%', {
    x: '25%',
    y: '35%',
    w: '50%',
    h: '20%',
    fontSize: 72,
    bold: true,
    color: OCI_COLORS.pine80,  // Pillar color
    align: 'center',
    valign: 'middle'
  });

  // Context label (20pt - smaller, less important)
  slide.addText('Revenue Growth', {
    x: '25%',
    y: '15%',
    w: '50%',
    h: '15%',
    fontSize: 20,
    bold: true,
    color: config.textColor || 'FFFFFF',
    align: 'center',
    valign: 'middle'
  });

  // Supporting detail (14pt - smallest text)
  slide.addText('Year-over-year increase', {
    x: '25%',
    y: '58%',
    w: '50%',
    h: '8%',
    fontSize: 14,
    color: config.textColor || OCI_COLORS.neutral30,
    align: 'center',
    valign: 'top'
  });

  // Visual element (cognitive science: every slide needs visual)
  slide.addShape('rect', {
    x: '30%',
    y: '70%',
    w: '40%',
    h: '1%',
    fill: { color: OCI_COLORS.pine120 },
    line: { type: 'none' }
  });

  // Oracle footer (mandatory)
  addOracleFooter(slide, config, 'Internal');

  // Object count: 1 metric + 1 label + 1 subtitle + 1 shape + 1 footer = 5 ✓
  // Word count: 6 total ✓
  // Message count: ONE (revenue growth achievement) ✓

  // Speaker notes (detailed content here, not on slide)
  slide.addNotes(
    'This slide demonstrates our exceptional 127% year-over-year revenue growth. ' +
    'Key drivers include: cloud adoption acceleration, new customer acquisitions in EMEA, ' +
    'and expanded deployments with existing enterprise customers. ' +
    'This growth significantly outpaces industry average of 23%.'
  );

  return slide;
}
```

---

## Example 2: Cognitive Load Validation

```javascript
// Validate slide meets cognitive science rules
function validateCognitiveLoad(slide) {
  const validation = {
    passed: true,
    issues: [],
    warnings: []
  };

  // Rule 1: Object count ≤ 6
  const objectCount = countSlideObjects(slide);
  if (objectCount > 6) {
    validation.passed = false;
    validation.issues.push(
      `Object count: ${objectCount} exceeds limit of 6. ` +
      `Audience brains disengage beyond 6 objects (500% more cognitive energy).`
    );
  } else if (objectCount === 6) {
    validation.warnings.push(
      `Object count: ${objectCount} is at the limit. Consider reducing.`
    );
  }

  // Rule 2: Text word count ≤ 50
  const wordCount = countSlideWords(slide);
  if (wordCount > 50) {
    validation.passed = false;
    validation.issues.push(
      `Word count: ${wordCount} exceeds limit of 50. ` +
      `Redundancy effect: reading text while hearing speech = 0% retention. ` +
      `Move detailed text to speaker notes.`
    );
  }

  // Rule 3: Has visual element (not just text)
  const hasVisual = slideHasVisualElement(slide);
  if (!hasVisual) {
    validation.passed = false;
    validation.issues.push(
      `No visual element detected. Every slide needs image, chart, icon, or shape. ` +
      `Text-only slides are forgettable.`
    );
  }

  // Rule 4: Contrast check
  const contrastIssues = checkContrast(slide);
  if (contrastIssues.length > 0) {
    validation.passed = false;
    validation.issues.push(...contrastIssues);
  }

  return validation;
}

function countSlideObjects(slide) {
  let count = 0;

  // Don't count footer/header
  const footerPatterns = ['copyright', '©', 'confidential'];

  if (slide._rels) {
    slide._rels.forEach(rel => {
      // Count images
      if (rel.type === 'image') count++;

      // Count text boxes (excluding footer)
      if (rel.type === 'text') {
        const text = rel.text?.toLowerCase() || '';
        const isFooter = footerPatterns.some(pattern => text.includes(pattern));
        if (!isFooter) count++;
      }

      // Count shapes
      if (rel.type === 'shape') count++;

      // Count charts
      if (rel.type === 'chart') count++;
    });
  }

  return count;
}

function countSlideWords(slide) {
  let wordCount = 0;

  if (slide._rels) {
    slide._rels.forEach(rel => {
      if (rel.type === 'text' && rel.text) {
        // Exclude footer text
        const text = rel.text.toLowerCase();
        if (!text.includes('copyright') && !text.includes('©')) {
          wordCount += rel.text.trim().split(/\s+/).length;
        }
      }
    });
  }

  return wordCount;
}

function slideHasVisualElement(slide) {
  if (!slide._rels) return false;

  return slide._rels.some(rel =>
    rel.type === 'image' ||
    rel.type === 'chart' ||
    rel.type === 'shape'
  );
}

function checkContrast(slide) {
  const issues = [];
  const MIN_CONTRAST = 4.5;

  // Check background vs text combinations
  const bg = slide.background?.color;

  if (bg && slide._rels) {
    slide._rels.forEach((rel, index) => {
      if (rel.type === 'text' && rel.options?.color) {
        const ratio = calculateContrastRatio(bg, rel.options.color);
        if (ratio < MIN_CONTRAST) {
          issues.push(
            `Text element ${index + 1}: Contrast ratio ${ratio.toFixed(1)}:1 ` +
            `is below WCAG AA minimum of ${MIN_CONTRAST}:1`
          );
        }
      }
    });
  }

  return issues;
}

// Simplified contrast calculation (full implementation would use relative luminance)
function calculateContrastRatio(color1, color2) {
  // This is a simplified version. Production code should use full WCAG formula
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hex) {
  // Simplified luminance calculation
  // Production: use full sRGB conversion
  hex = hex.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

---

## Example 3: Oracle Footer Implementation

```javascript
function addOracleFooter(slide, config, confidentialityLevel = null) {
  const currentYear = new Date().getFullYear();

  // Copyright portion (left side)
  const copyrightText = `Copyright © ${currentYear}, Oracle and/or its affiliates`;

  // Confidential portion (right side - optional)
  const confidentialText = confidentialityLevel
    ? ` | Confidential: ${confidentialityLevel}`
    : '';

  const fullFooter = copyrightText + confidentialText;

  // Position: bottom-left
  slide.addText(fullFooter, {
    x: 0.3,
    y: '93%',
    w: '90%',
    h: 0.3,
    fontSize: 10,
    color: config.backgroundColor === OCI_COLORS.darkBg
      ? 'AEABA2'  // Neutral 70 for dark slides
      : '414141', // Neutral 140 for light slides
    align: 'left',
    valign: 'bottom'
  });
}

// Usage examples
function addFooterExamples(pptx, config) {
  // Public presentation (no confidential portion)
  const publicSlide = pptx.addSlide();
  addOracleFooter(publicSlide, config, null);

  // Internal presentation
  const internalSlide = pptx.addSlide();
  addOracleFooter(internalSlide, config, 'Internal');

  // Restricted presentation
  const restrictedSlide = pptx.addSlide();
  addOracleFooter(restrictedSlide, config, 'Restricted');

  // Highly restricted
  const highlyRestrictedSlide = pptx.addSlide();
  addOracleFooter(highlyRestrictedSlide, config, 'Highly Restricted');
}
```

---

## Example 4: Complete Presentation Workflow

```javascript
// Full workflow: Create Oracle presentation with cognitive science validation
async function createOraclePresentation(options) {
  const {
    context = 'live-event',
    pillar = 'OCI',
    title = 'Oracle Presentation',
    confidentialityLevel = 'Internal'
  } = options;

  // Step 1: Initialize
  const { pptx, config } = createOraclePresentation(context);

  // Step 2: Select colors for pillar
  const colors = getPillarColors(pillar);
  config.primaryColor = colors.primary;
  config.accentColor = colors.accent;

  // Step 3: Create slides
  const slides = [];

  // Cover slide
  slides.push(createBrandedCoverSlide(pptx, config));

  // Impact slide
  slides.push(createImpactSlide(pptx, config));

  // Content slides (add your content here)
  // ...

  // Step 4: Validate all slides
  const validationResults = slides.map((slide, index) => ({
    slideNumber: index + 1,
    ...validateCognitiveLoad(slide)
  }));

  // Step 5: Report validation issues
  const failedSlides = validationResults.filter(r => !r.passed);
  if (failedSlides.length > 0) {
    console.error('❌ Validation failed for slides:', failedSlides.map(s => s.slideNumber));
    failedSlides.forEach(slide => {
      console.error(`\nSlide ${slide.slideNumber} issues:`);
      slide.issues.forEach(issue => console.error(`  - ${issue}`));
    });
    throw new Error('Presentation failed cognitive load validation');
  }

  console.log('✅ All slides passed cognitive load validation');

  // Step 6: Export
  await pptx.writeFile({ fileName: `${title}.pptx` });
  console.log(`✅ Created: ${title}.pptx`);

  return pptx;
}

// Helper: Get colors for pillar
function getPillarColors(pillar) {
  const palettes = {
    'Health': { primary: '3E93B6', accent: '1EB398' },
    'OCI': { primary: '1E9773', accent: 'EECC44' },
    'ERP': { primary: '26A3B1', accent: '3FA67D' },
    'EPM': { primary: '26A3B1', accent: '3FA67D' },
    'SCM': { primary: '26A3B1', accent: 'EECC44' },
    'HCM': { primary: 'D1798C', accent: '5F9CC7' },
    'CX': { primary: '9874B8', accent: '5F9CC7' },
    'Corporate': { primary: '8A8A8A', accent: 'C74634' }
  };

  return palettes[pillar] || palettes['Corporate'];
}

// Usage
createOraclePresentation({
  context: 'live-event',
  pillar: 'OCI',
  title: 'Oracle AI World 2026 - OCI Innovations',
  confidentialityLevel: 'Internal'
}).catch(console.error);
```

---

## Anti-Patterns (Implementation)

```javascript
// ❌ DON'T: Hardcode colors
slide.addText('Title', { color: '0000FF' });  // Generic blue

// ✅ DO: Use Oracle pillar colors
slide.addText('Title', { color: OCI_COLORS.pine120 });

// ❌ DON'T: Ignore object count
for (let i = 0; i < 10; i++) {
  slide.addText(`Point ${i}`, { ... });  // 10 objects!
}

// ✅ DO: Validate and limit
const validation = validateCognitiveLoad(slide);
if (!validation.passed) {
  throw new Error('Too many objects');
}

// ❌ DON'T: Put everything on slide
slide.addText(longParagraph, { fontSize: 12 });  // 200 words

// ✅ DO: Use speaker notes
slide.addText(summary, { fontSize: 20 });  // 15 words
slide.addNotes(detailedContent);  // Full content

// ❌ DON'T: Skip accessibility
slide.addImage({ path: 'chart.png' });  // No alt text

// ✅ DO: Add alt text
slide.addImage({
  path: 'chart.png',
  altText: 'Bar chart showing 127% revenue growth year-over-year'
});
```
