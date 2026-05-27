#!/usr/bin/env node

const steps = [
  'Verify Oracle adapter and auth tables exist before editing app wrappers.',
  'Configure OCI IDCS confidential app with the Better Auth callback URL.',
  'Include scopes: openid,email,profile,urn:opc:idm:__myscopes__.',
  'Seed mutable OAuth config from env for cold-start availability.',
  'Share Oracle adapter, cookie config, and IDCS profile mapping across apps.',
  'Keep nextCookies() last in the Next.js Better Auth plugin list.',
  'Bootstrap OCI_IAM_* env vars into Oracle provider tables without overwriting existing rows.',
  'Only then debug Fastify session resolution and org membership behavior.',
];

console.log('Oracle IDCS + Better Auth checklist');
console.log('');
steps.forEach((step, index) => console.log(`${index + 1}. ${step}`));
