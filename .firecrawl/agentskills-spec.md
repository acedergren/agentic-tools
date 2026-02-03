[Skip to main content](https://agentskills.io/specification#content-area)

[Agent Skills home page\\
Agent Skills](https://agentskills.io/)

Search...

Ctrl KAsk AI

Search...

Navigation

Specification

On this page

- [Directory structure](https://agentskills.io/specification#directory-structure)
- [SKILL.md format](https://agentskills.io/specification#skill-md-format)
- [Frontmatter (required)](https://agentskills.io/specification#frontmatter-required)
- [name field](https://agentskills.io/specification#name-field)
- [description field](https://agentskills.io/specification#description-field)
- [license field](https://agentskills.io/specification#license-field)
- [compatibility field](https://agentskills.io/specification#compatibility-field)
- [metadata field](https://agentskills.io/specification#metadata-field)
- [allowed-tools field](https://agentskills.io/specification#allowed-tools-field)
- [Body content](https://agentskills.io/specification#body-content)
- [Optional directories](https://agentskills.io/specification#optional-directories)
- [scripts/](https://agentskills.io/specification#scripts%2F)
- [references/](https://agentskills.io/specification#references%2F)
- [assets/](https://agentskills.io/specification#assets%2F)
- [Progressive disclosure](https://agentskills.io/specification#progressive-disclosure)
- [File references](https://agentskills.io/specification#file-references)
- [Validation](https://agentskills.io/specification#validation)

This document defines the Agent Skills format.

## [​](https://agentskills.io/specification\#directory-structure)  Directory structure

A skill is a directory containing at minimum a `SKILL.md` file:

Report incorrect code

Copy

Ask AI

```
skill-name/
└── SKILL.md          # Required
```

You can optionally include [additional directories](https://agentskills.io/specification#optional-directories) such as `scripts/`, `references/`, and `assets/` to support your skill.

## [​](https://agentskills.io/specification\#skill-md-format)  SKILL.md format

The `SKILL.md` file must contain YAML frontmatter followed by Markdown content.

### [​](https://agentskills.io/specification\#frontmatter-required)  Frontmatter (required)

Report incorrect code

Copy

Ask AI

```
---
name: skill-name
description: A description of what this skill does and when to use it.
---
```

With optional fields:

Report incorrect code

Copy

Ask AI

```
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents.
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---
```

| Field | Required | Constraints |
| --- | --- | --- |
| `name` | Yes | Max 64 characters. Lowercase letters, numbers, and hyphens only. Must not start or end with a hyphen. |
| `description` | Yes | Max 1024 characters. Non-empty. Describes what the skill does and when to use it. |
| `license` | No | License name or reference to a bundled license file. |
| `compatibility` | No | Max 500 characters. Indicates environment requirements (intended product, system packages, network access, etc.). |
| `metadata` | No | Arbitrary key-value mapping for additional metadata. |
| `allowed-tools` | No | Space-delimited list of pre-approved tools the skill may use. (Experimental) |

#### [​](https://agentskills.io/specification\#name-field)  `name` field

The required `name` field:

- Must be 1-64 characters
- May only contain unicode lowercase alphanumeric characters and hyphens (`a-z` and `-`)
- Must not start or end with `-`
- Must not contain consecutive hyphens (`--`)
- Must match the parent directory name

Valid examples:

Report incorrect code

Copy

Ask AI

```
name: pdf-processing
```

Report incorrect code

Copy

Ask AI

```
name: data-analysis
```

Report incorrect code

Copy

Ask AI

```
name: code-review
```

Invalid examples:

Report incorrect code

Copy

Ask AI

```
name: PDF-Processing  # uppercase not allowed
```

Report incorrect code

Copy

Ask AI

```
name: -pdf  # cannot start with hyphen
```

Report incorrect code

Copy

Ask AI

```
name: pdf--processing  # consecutive hyphens not allowed
```

#### [​](https://agentskills.io/specification\#description-field)  `description` field

The required `description` field:

- Must be 1-1024 characters
- Should describe both what the skill does and when to use it
- Should include specific keywords that help agents identify relevant tasks

Good example:

Report incorrect code

Copy

Ask AI

```
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

Poor example:

Report incorrect code

Copy

Ask AI

```
description: Helps with PDFs.
```

#### [​](https://agentskills.io/specification\#license-field)  `license` field

The optional `license` field:

- Specifies the license applied to the skill
- We recommend keeping it short (either the name of a license or the name of a bundled license file)

Example:

Report incorrect code

Copy

Ask AI

```
license: Proprietary. LICENSE.txt has complete terms
```

#### [​](https://agentskills.io/specification\#compatibility-field)  `compatibility` field

The optional `compatibility` field:

- Must be 1-500 characters if provided
- Should only be included if your skill has specific environment requirements
- Can indicate intended product, required system packages, network access needs, etc.

Examples:

Report incorrect code

Copy

Ask AI

```
compatibility: Designed for Claude Code (or similar products)
```

Report incorrect code

Copy

Ask AI

```
compatibility: Requires git, docker, jq, and access to the internet
```

Most skills do not need the `compatibility` field.

#### [​](https://agentskills.io/specification\#metadata-field)  `metadata` field

The optional `metadata` field:

- A map from string keys to string values
- Clients can use this to store additional properties not defined by the Agent Skills spec
- We recommend making your key names reasonably unique to avoid accidental conflicts

Example:

Report incorrect code

Copy

Ask AI

```
metadata:
  author: example-org
  version: "1.0"
```

#### [​](https://agentskills.io/specification\#allowed-tools-field)  `allowed-tools` field

The optional `allowed-tools` field:

- A space-delimited list of tools that are pre-approved to run
- Experimental. Support for this field may vary between agent implementations

Example:

Report incorrect code

Copy

Ask AI

```
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

### [​](https://agentskills.io/specification\#body-content)  Body content

The Markdown body after the frontmatter contains the skill instructions. There are no format restrictions. Write whatever helps agents perform the task effectively.Recommended sections:

- Step-by-step instructions
- Examples of inputs and outputs
- Common edge cases

Note that the agent will load this entire file once it’s decided to activate a skill. Consider splitting longer `SKILL.md` content into referenced files.

## [​](https://agentskills.io/specification\#optional-directories)  Optional directories

### [​](https://agentskills.io/specification\#scripts/)  scripts/

Contains executable code that agents can run. Scripts should:

- Be self-contained or clearly document dependencies
- Include helpful error messages
- Handle edge cases gracefully

Supported languages depend on the agent implementation. Common options include Python, Bash, and JavaScript.

### [​](https://agentskills.io/specification\#references/)  references/

Contains additional documentation that agents can read when needed:

- `REFERENCE.md` \- Detailed technical reference
- `FORMS.md` \- Form templates or structured data formats
- Domain-specific files (`finance.md`, `legal.md`, etc.)

Keep individual [reference files](https://agentskills.io/specification#file-references) focused. Agents load these on demand, so smaller files mean less use of context.

### [​](https://agentskills.io/specification\#assets/)  assets/

Contains static resources:

- Templates (document templates, configuration templates)
- Images (diagrams, examples)
- Data files (lookup tables, schemas)

## [​](https://agentskills.io/specification\#progressive-disclosure)  Progressive disclosure

Skills should be structured for efficient use of context:

1. **Metadata** (~100 tokens): The `name` and `description` fields are loaded at startup for all skills
2. **Instructions** (< 5000 tokens recommended): The full `SKILL.md` body is loaded when the skill is activated
3. **Resources** (as needed): Files (e.g. those in `scripts/`, `references/`, or `assets/`) are loaded only when required

Keep your main `SKILL.md` under 500 lines. Move detailed reference material to separate files.

## [​](https://agentskills.io/specification\#file-references)  File references

When referencing other files in your skill, use relative paths from the skill root:

Report incorrect code

Copy

Ask AI

```
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

Keep file references one level deep from `SKILL.md`. Avoid deeply nested reference chains.

## [​](https://agentskills.io/specification\#validation)  Validation

Use the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) reference library to validate your skills:

Report incorrect code

Copy

Ask AI

```
skills-ref validate ./my-skill
```

This checks that your `SKILL.md` frontmatter is valid and follows all naming conventions.

[What are skills?](https://agentskills.io/what-are-skills) [Integrate skills](https://agentskills.io/integrate-skills)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.