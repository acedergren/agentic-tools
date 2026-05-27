---
name: genai-services
description: "Use when the user asks to \"call OCI Generative AI\", \"choose an OCI GenAI model\", \"debug GenAI 429\", \"plan OCI RAG\", or \"compare Command A, Llama, Gemini, or gpt-oss\"."
version: 2.0.0
keywords:
  - "OCI Generative AI"
  - "GenAI"
  - "model catalog"
  - "Command A"
  - "Command R"
  - "Llama"
  - "Gemini"
  - "gpt-oss"
  - "RAG"
  - "rate limit"
aliases:
  - "oci-genai"
  - "generative-ai"
domains:
  - "oci"
  - "ai"
---
# OCI Generative AI Services

## Do NOT load this skill when

Do not load this skill for unrelated general programming, non-Oracle cloud work, or questions covered by a narrower sibling skill.
When the request is only asking to find or install skills, use `find-skills` instead.

## When to Use

Load this skill for: the user asks to "call OCI Generative AI", "choose an OCI GenAI model", "debug GenAI 429", "plan OCI RAG", or "compare Command A, Llama, Gemini, or gpt-oss".

Prefer this skill only for its named domain. For broader OCI architecture triage, start with `best-practices` as the router.

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

❌ **NEVER hardcode stale model context windows, pricing, or quotas in app logic**
- Oracle's OCI Generative AI catalog changes frequently.
- Current hot words include Command A, Command R/R+, Llama, Gemini, Grok, Mistral, gpt-oss, embeddings, rerank, and model catalog.
- Check the live model catalog, service limits, and price list before quoting exact numbers.
- Exceeding model limits can truncate input, fail with 400, or degrade output quality depending on the API path.

❌ **NEVER call GenAI without rate limit handling** — 429s are common and predictable; see backoff pattern below

❌ **NEVER use GenAI for deterministic tasks**
- Wrong: "Extract invoice total from OCR text" → use regex/structured parsing
- Wrong: "Validate email format" → use validation library
- Right: "Summarize patient history", "Generate narrative report"

## Model Selection

1. Check whether the workload is chat, summarization, tool use, RAG, embedding, reranking, multimodal, or agent orchestration.
2. Open the current Oracle model catalog before selecting a model family. Do not assume Command R/R+ or Llama 2 are the only viable choices.
3. Prefer embeddings/reranking for retrieval and classification-like search before using a generation model.
4. Validate output quality on representative examples before changing model family, context size, or decoding parameters.
5. Record the model OCID/name, region, date checked, and service-limit assumptions in the implementation notes.

## OCI GenAI Limits

Treat rate limits, quotas, context windows, and prices as live service data. Check OCI service limits and the current model catalog for the target compartment and region before sizing retries, queues, or budgets.

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
def truncate_for_model(text: str, model_context_tokens: int, max_output: int = 2000) -> str:
    max_input_tokens = model_context_tokens - max_output
    max_chars = max_input_tokens * 4  # ~4 chars per token

    if len(text) <= max_chars:
        return text
    return "...[earlier content truncated]...\n" + text[-max_chars:]
```

**Prompt token savings**: Verbose system prompts waste tokens at scale. Measure current token usage and model pricing before claiming a dollar savings number.

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

**Load** [`references/oci-genai-reference.md`](references/oci-genai-reference.md) when you need current Oracle documentation anchors for the model catalog, SDK/API usage, RAG, GenAI Agents, embeddings, reranking, or custom model workflows. Use search inside the reference instead of loading it end to end.

## Arguments

$ARGUMENTS: Optional user-provided target, path, environment, symptom, or constraint. When empty, infer the narrowest safe scope from the current repository context and ask only if multiple high-impact choices remain.
