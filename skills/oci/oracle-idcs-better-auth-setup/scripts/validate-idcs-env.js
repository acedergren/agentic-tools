#!/usr/bin/env node

const required = [
  'BETTER_AUTH_SECRET',
  'BETTER_AUTH_URL',
  'OCI_IAM_CLIENT_ID',
  'OCI_IAM_CLIENT_SECRET',
  'OCI_IAM_DISCOVERY_URL',
];

const missing = required.filter((key) => !process.env[key]);

console.log('Oracle IDCS + Better Auth env validation');
console.log('');

for (const key of required) {
  console.log(`${process.env[key] ? '✓' : '✗'} ${key}`);
}

console.log('');

const callback = `${process.env.BETTER_AUTH_URL || '<BETTER_AUTH_URL>'}/api/auth/oauth2/callback/oci-iam`;
console.log(`Expected callback URL: ${callback}`);
console.log('Expected scopes: openid,email,profile,urn:opc:idm:__myscopes__');

if (missing.length > 0) {
  console.error('');
  console.error(`Missing required variables: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('');
console.log('Environment looks complete enough for first-pass setup.');
