// ── AI Privacy Layer ──────────────────────────────────────────────────────────
// This module intercepts texts before they are sent to any external AI API.
// It removes/redacts Personally Identifiable Information (PII) to ensure
// privacy-by-design for Chengeto.

export function sanitizePrompt(text) {
  if (!text) return text;
  
  let sanitized = text;

  // 1. Phone Numbers (Zimbabwean and general international formats)
  // Matches +263..., 077..., 071..., 073... and general 10-14 digit strings
  const phoneRegex = /(?:\+?263|0)?(?:71|73|75|77|78|86)\d{7}\b|\b\+?\d{10,14}\b/g;
  sanitized = sanitized.replace(phoneRegex, '[REDACTED_PHONE]');

  // 2. National IDs (Zimbabwean format: 2 numbers - 6/7 numbers - 1 letter - 2 numbers)
  // Example: 12-345678X90
  const idRegex = /\b\d{2}[-.\s]?\d{6,7}[-.\s]?[a-zA-Z][-.\s]?\d{2}\b/gi;
  sanitized = sanitized.replace(idRegex, '[REDACTED_ID]');

  // 3. Email Addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  sanitized = sanitized.replace(emailRegex, '[REDACTED_EMAIL]');

  // 4. IP Addresses (IPv4)
  const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
  sanitized = sanitized.replace(ipRegex, '[REDACTED_IP]');

  // 5. Names (Basic heuristic for demonstration: 'my name is X' or 'I am X')
  // For a purely client-side system without NLP, this uses common intro phrases.
  const nameRegex1 = /(?:my name is|i am|i'm) ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\b/gi;
  sanitized = sanitized.replace(nameRegex1, (match, p1) => {
    return match.replace(p1, '[REDACTED_NAME]');
  });

  // 6. Hospital/Clinic Identifiers (e.g., patient numbers, booking IDs)
  // Looks for common patterns like "patient id", "file number" followed by alphanumeric
  const patientIdRegex = /(?:patient id|file number|hospital number|booking reference)[:\-]?\s*([A-Za-z0-9\-/]+)/gi;
  sanitized = sanitized.replace(patientIdRegex, (match, p1) => {
    return match.replace(p1, '[REDACTED_PATIENT_ID]');
  });

  return sanitized;
}
