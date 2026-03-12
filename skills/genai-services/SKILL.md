---
name: genai-services
description: "Use when implementing OCI GenAI inference APIs, debugging rate limit (429) or token limit (400) errors, selecting between command-r vs command-r-plus, handling PHI/PII in prompts, or optimizing GenAI costs. Covers model cost trade-offs, token management, rate limit backoff, PHI redaction patterns, and response validation for healthcare."
---

# OCI Generative AI Services

## NEVER Do This

❌ **NEVER send PHI/PII identifiers to GenAI APIs**
```python
# WRONG - patient identifiers in external service logs
prompt = f"Transcribe note for patient {patient_name}, MRN {mrn}, SSN {ssn}: {note}"

# RIGHT - redact first, keep mapping in secure DB
prompt = f"Transcribe this medical note: {redacted_note}"
# phi_mapping stored locally: temp_id → real_id
```
GenAI service logs may retain data. Sending PHI violates HIPAA/GDPR regardless of Oracle BAA status.

❌ **NEVER trust GenAI output without validation in critical systems**
- Hallucination rate: 5-15% for factual queries, higher for medical/legal
- Always route AI-suggested content to human review queue before acting on it

❌ **NEVER exceed token limits silently**
- `command-r-plus`: 128k context (input + output combined)
- `command-r`: 4k context
- Exceeding limit: request truncated silently OR fails with 400 error

❌ **NEVER call GenAI without rate limit handling** — 429s are common and predictable; see backoff pattern below

❌ **NEVER use GenAI for deterministic tasks**
- Wrong: "Extract invoice total from OCR text" → use regex/structured parsing
- Wrong: "Validate email format" → use validation library
- Right: "Summarize patient history", "Generate narrative report"

## Model Selection

| Model | Context | Input Cost/1M | Output Cost/1M | Use For |
|-------|---------|---------------|----------------|---------|
| command-r-plus | 128k | ~$15 | ~$75 | Complex reasoning, long docs, RAG |
| command-r | 4k | ~$1.50 | ~$7.50 | Chat, short prompts, high volume |
| embed-english-v3 | 512 | ~$0.10 | N/A | Semantic search (1000x cheaper than generation) |
| llama-2-70b | 4k | ~$2 | ~$10 | Cost-effective, open weights |

**Decision rule**: Start with command-r for everything. Upgrade to command-r-plus only when reasoning quality is demonstrably insufficient.

**Cost optimization**: Use embeddings for retrieval/search before invoking generation — same semantic result at 1000x lower cost.

## OCI GenAI Rate Limits (Per Compartment)

| Model | Requests/Min | Requests/Day |
|-------|-------------|--------------|
| command-r-plus | 20 | 1,000 |
| command-r | 60 | 3,000 |
| Embeddings | 100 | 10,000 |

## Rate Limit Backoff Pattern

```python
import time, random
from oci.exceptions import ServiceError

def generate_with_backoff(genai_client, request, max_retries=5):
    for attempt in range(max_retries):
        try:
            response = genai_client.chat(request)
            return response.data.chat_response.text
        except ServiceError as e:
            if e.status == 429 and attempt < max_retries - 1:
                wait = (2 ** attempt) + random.uniform(0, 1)  # 1s, 2s, 4s, 8s, 16s
                time.sleep(wait)
            elif e.status == 400:
                if "token" in e.message.lower():
                    raise ValueError("Token limit exceeded — truncate input")
                raise
            else:
                raise
```

## Token Truncation

```python
def truncate_for_model(text: str, model: str = "command-r-plus", max_output: int = 2000) -> str:
    limits = {"command-r-plus": 128000, "command-r": 4000}
    max_input_tokens = limits.get(model, 2000) - max_output
    max_chars = max_input_tokens * 4  # ~4 chars per token

    if len(text) <= max_chars:
        return text
    return "...[earlier content truncated]...\n" + text[-max_chars:]
```

**Prompt token savings**: Verbose system prompts waste tokens at scale. "Summarize: diagnoses, meds, allergies, treatment plan." vs a 50-word instruction saves 50 tokens × 1000 req/day = $68/month at command-r-plus rates.

## PHI Redaction Pattern

```python
import re

def redact_phi(text: str) -> tuple[str, dict]:
    """Remove PHI, return (redacted_text, mapping_to_restore)"""
    mapping = {}
    redacted = text

    # MRNs
    mrn_pattern = r'\b(MRN|Medical Record):?\s*([A-Z0-9]{6,10})\b'
    redacted = re.sub(mrn_pattern, r'\1: [REDACTED]', redacted)

    # SSNs
    redacted = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[SSN_REDACTED]', redacted)

    # Names: use NER library (spacy or similar) for accuracy
    # names = extract_names(text)
    # for i, name in enumerate(names):
    #     placeholder = f"[PATIENT_{i}]"
    #     mapping[placeholder] = name
    #     redacted = redacted.replace(name, placeholder)

    return redacted, mapping
```

## Response Validation (Healthcare)

```python
def validate_medical_response(response: str) -> tuple[bool, list[str]]:
    issues = []

    if not response or len(response.strip()) < 10:
        issues.append("Response too short or empty")

    # Hallucination markers
    for marker in ["I don't have access", "I cannot", "As an AI", "[INSERT", "TODO"]:
        if marker.lower() in response.lower():
            issues.append(f"Hallucination marker: {marker}")

    # Expected structure (customize per use case)
    for section in ["Chief Complaint", "Assessment", "Plan"]:
        if section.lower() not in response.lower():
            issues.append(f"Missing section: {section}")

    # PII leak detection (if input was redacted)
    for pattern in [r'\b\d{3}-\d{2}-\d{4}\b', r'\b[A-Z]{2}\d{6,8}\b']:
        if re.search(pattern, response):
            issues.append(f"Potential PII in response: {pattern}")

    return len(issues) == 0, issues
```

## HIPAA Compliance Checklist

Before going live with PHI-adjacent GenAI:
- Business Associate Agreement (BAA) signed with Oracle — **verify explicitly; don't assume**
- PHI redacted before every API call
- Audit logging of all GenAI calls (who called, when, which model)
- Data retention policy for prompts/responses defined

## Reference Files

**Load** [`references/oci-genai-reference.md`](references/oci-genai-reference.md) when you need:
- Comprehensive GenAI API and SDK documentation
- RAG implementation with OCI
- GenAI Agents setup
- Fine-tuning and custom model deployment
