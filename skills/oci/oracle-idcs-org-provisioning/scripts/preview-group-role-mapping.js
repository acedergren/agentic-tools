#!/usr/bin/env node

const raw = process.argv[2] || '';
const groups = raw.split(',').map((item) => item.trim()).filter(Boolean);
const adminGroups = (process.env.OCI_IAM_ADMIN_GROUPS || 'PortalAdmins,OCI_Administrators,Administrators')
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
const input = new Set(groups.map((item) => item.toLowerCase()));
const role = adminGroups.some((group) => input.has(group)) ? 'admin' : 'user';

console.log(`Groups: ${groups.join(', ') || '(none)'}`);
console.log(`Admin groups: ${adminGroups.join(', ')}`);
console.log(`Resolved role: ${role}`);
