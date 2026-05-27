# Oracle Color Palettes Reference

**When to load this file**: MANDATORY when selecting colors for Oracle-branded presentations.
**Do NOT load**: If using existing Oracle template with colors already applied.

---

## Color Palette System by Oracle Pillar

### Health
**Primary Colors**:
- Sky 80: `#5DA5C5` - Light, accessible primary
- Sky 100: `#3E93B6` - Standard primary
- Sky 120: `#2684A8` - Medium depth
- Sky 140: `#0F7699` - Darker accent
- Sky 160: `#006B8B` - Deepest primary

**Supporting**:
- Emerald 90: `#1EB398` - Fresh accent

**System Colors**:
- Neutral 30: `#E1E1E1` - Light gray
- Brand Dark 170: `#EECC44` - Yellow accent
- Oracle Red: `#C74634` - Alert/emphasis

**Usage**:
- Dark slides: Sky 80-100 on dark backgrounds
- Light slides: Sky 140-160 on light backgrounds
- Hyperlinks (dark): Brand Dark 170
- Hyperlinks (light): Sky 120

---

### Corporate / Cross-Product / GIU
**Primary Colors**:
- Slate 50: `#DADADA` - Light neutral
- Neutral 30: `#E1E1E1` - Light gray
- Slate 100: `#8A8A8A` - Medium gray
- Slate 150: `#545454` - Dark gray

**System Colors**:
- Oracle Red: `#C74634` - Brand accent
- Brand Yellow: `#EECC44` - Secondary accent

**Usage**:
- Professional, neutral aesthetic
- Maximum cross-template compatibility
- Use for multi-product presentations

---

### OCI / Database
**Primary Colors**:
- Pine 80: `#4DAA87` - Light green
- Pine 120: `#1E9773` - Standard green
- Pine 140: `#088560` - Medium green
- Pine 160: `#00734E` - Deep green

**System Colors**:
- Neutral 30: `#E1E1E1`
- Brand Dark 170: `#EECC44`
- Oracle Red: `#C74634`

**Usage**:
- Technical, infrastructure-focused
- Green = growth, stability, cloud
- Pairs well with dark blue backgrounds

---

### ERP / EPM
**Primary Colors**:
- Teal 90: `#4FB5C0` - Light teal
- Teal 110: `#26A3B1` - Standard teal
- Teal 130: `#0F93A3` - Medium teal
- Teal 150: `#008496` - Deeper teal
- Teal 170: `#007689` - Deepest teal

**Supporting**:
- Pine 90: `#3FA67D` - Green accent

**System Colors**:
- Neutral 30: `#E1E1E1`
- Brand Dark 170: `#EECC44`
- Oracle Red: `#C74634`

**Usage**:
- Enterprise, process-focused
- Teal = efficiency, clarity
- Good for data visualization

---

### SCM (Supply Chain Management)
**Primary Colors**:
- Teal 90: `#4FB5C0`
- Teal 110: `#26A3B1`
- Teal 130: `#0F93A3`
- Teal 150: `#008496`
- Teal 170: `#007689`

**System Colors**:
- Neutral 30: `#E1E1E1`
- Brand Dark 170: `#EECC44`
- Oracle Red: `#C74634`

**Usage**:
- Same as ERP/EPM
- Consistency across enterprise apps

---

### HCM (Human Capital Management)
**Primary Colors**:
- Rose 90: `#DB8E9E` - Light rose
- Rose 110: `#D1798C` - Standard rose
- Rose 130: `#C8667C` - Medium rose
- Rose 160: `#B64D67` - Deep rose

**Supporting**:
- Ocean 90: `#5F9CC7` - Blue accent

**System Colors**:
- Neutral 30: `#E1E1E1`
- Brand Dark 170: `#EECC44`
- Oracle Red: `#C74634`

**Usage**:
- Human-focused, approachable
- Rose = warmth, engagement
- Ocean blue for trust, stability

---

### CX (Customer Experience)
**Primary Colors**:
- Plum 80: `#AB8CC4` - Light plum
- Plum 110: `#9874B8` - Standard plum
- Plum 130: `#885FAD` - Medium plum
- Plum 160: `#6D3E99` - Deep plum

**Supporting**:
- Ocean 90: `#5F9CC7` - Blue accent

**System Colors**:
- Neutral 30: `#E1E1E1`
- Brand Dark 170: `#EECC44`
- Oracle Red: `#C74634`

**Usage**:
- Customer-centric, innovative
- Plum = creativity, differentiation
- Ocean for reliability

---

## Hyperlink Color Rules

### On Dark Backgrounds
**Use**: Brand Dark 170 (Custom color 2)
- Hex: `#EECC44` (yellow/gold)
- High contrast on dark blue/black
- Accessible, attention-grabbing

**Available custom colors**: 2, 3, 5, 7, 10, 14, 24, 30

### On Light Backgrounds
**Use**: Sky 120 - Default (Custom color 27)
- Hex: `#2684A8` (medium blue)
- Professional, accessible
- WCAG AA compliant

**Available custom colors**: 1, 8, 10, 16, 23, 25, 26, 27, 28, 29, 31-49

---

## Contrast Validation

**Minimum Requirements**:
- Text on background: 4.5:1 (WCAG AA)
- Large text (18pt+): 3:1 acceptable
- Icons on background: 4.5:1

**Pre-validated Combinations**:

| Background | Text Color | Ratio | Status |
|------------|------------|-------|--------|
| `#0B2540` (dark blue) | `#FFFFFF` (white) | 12.6:1 | ✅ Excellent |
| `#0B2540` (dark blue) | `#EECC44` (yellow) | 8.2:1 | ✅ Excellent |
| `#FFFFFF` (white) | `#545454` (Slate 150) | 7.5:1 | ✅ Excellent |
| `#FFFFFF` (white) | `#2684A8` (Sky 120) | 4.6:1 | ✅ Pass |
| `#F5F5F5` (off-white) | `#414141` (Neutral 140) | 9.1:1 | ✅ Excellent |

**Tools for custom combinations**:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Command: Test before using non-standard combinations

---

## Color Psychology & Selection Strategy

### Pillar Selection Decision Tree

```
Is this a multi-product presentation?
├─ YES → Use Corporate/GIU (Slate + Neutral)
└─ NO → Match to primary product area:
    ├─ Cloud infrastructure? → OCI/Database (Pine greens)
    ├─ Financial/business apps? → ERP/EPM or SCM (Teal)
    ├─ HR/people systems? → HCM (Rose + Ocean)
    ├─ Customer-facing apps? → CX (Plum + Ocean)
    └─ Healthcare? → Health (Sky blues + Emerald)
```

### Color Dominance Rule

**60-70% Rule**: One color should dominate visual weight
- Primary color: 60-70% of slide area
- Supporting color: 20-30%
- Accent color: 5-10% (high impact moments)

**Example for OCI presentation**:
- 65% Pine 120 (primary green) - backgrounds, large shapes
- 25% Neutral 30 (light gray) - text boxes, subtle elements
- 10% Brand Yellow (accent) - callouts, key metrics

---

## Anti-Patterns (Color)

🚫 **Generic blue defaults** - Don't use arbitrary blues; use pillar-specific
🚫 **Purple gradients on white** - AI-generated aesthetic cliche
🚫 **Equal color weight** - All colors fighting for attention = no visual hierarchy
🚫 **Low-contrast pastels** - Light colors on light backgrounds fail accessibility
🚫 **Color-only communication** - Never convey meaning through color alone (accessibility)
🚫 **Off-brand hex codes** - Use exact Oracle hex values, not approximations

---

## Quick Reference: Hex Codes by Pillar

```javascript
// Copy-paste ready color objects

const HEALTH = {
  sky80: '5DA5C5', sky100: '3E93B6', sky120: '2684A8',
  sky140: '0F7699', sky160: '006B8B',
  emerald90: '1EB398',
  neutral30: 'E1E1E1', brandYellow: 'EECC44', oracleRed: 'C74634'
};

const OCI = {
  pine80: '4DAA87', pine120: '1E9773', pine140: '088560', pine160: '00734E',
  neutral30: 'E1E1E1', brandYellow: 'EECC44', oracleRed: 'C74634'
};

const ERP_EPM_SCM = {
  teal90: '4FB5C0', teal110: '26A3B1', teal130: '0F93A3',
  teal150: '008496', teal170: '007689',
  pine90: '3FA67D',
  neutral30: 'E1E1E1', brandYellow: 'EECC44', oracleRed: 'C74634'
};

const HCM = {
  rose90: 'DB8E9E', rose110: 'D1798C', rose130: 'C8667C', rose160: 'B64D67',
  ocean90: '5F9CC7',
  neutral30: 'E1E1E1', brandYellow: 'EECC44', oracleRed: 'C74634'
};

const CX = {
  plum80: 'AB8CC4', plum110: '9874B8', plum130: '885FAD', plum160: '6D3E99',
  ocean90: '5F9CC7',
  neutral30: 'E1E1E1', brandYellow: 'EECC44', oracleRed: 'C74634'
};

const CORPORATE = {
  slate50: 'DADADA', slate100: '8A8A8A', slate150: '545454',
  neutral30: 'E1E1E1',
  oracleRed: 'C74634', brandYellow: 'EECC44'
};
```
