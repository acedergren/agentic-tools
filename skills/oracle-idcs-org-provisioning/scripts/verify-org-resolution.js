#!/usr/bin/env node

const args = process.argv.slice(2);
const get = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const tenant = get('--tenant');
const mapping = get('--map') || process.env.OCI_IAM_TENANT_ORG_MAP || '';
const defaultOrg = get('--default-org') || process.env.OCI_IAM_DEFAULT_ORG_ID;

let resolved;
if (tenant && mapping) {
  for (const pair of mapping.split(',')) {
    const [left, right] = pair.split(':').map((item) => item && item.trim());
    if (left === tenant && right) {
      resolved = right;
      break;
    }
  }
}

console.log(`Tenant: ${tenant || '(none)'}`);
console.log(`Tenant map: ${mapping || '(none)'}`);
console.log(`Default org: ${defaultOrg || '(none)'}`);
console.log(`Resolved org: ${resolved || defaultOrg || '(none)'}`);
console.log(`Resolution path: ${resolved ? 'tenant-map' : defaultOrg ? 'default-org' : 'unresolved'}`);
