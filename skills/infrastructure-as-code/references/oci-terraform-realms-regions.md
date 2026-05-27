# OCI Terraform Realms, Regions, and Government Guardrails

Use this reference when Terraform targets OCI regions beyond the default commercial assumptions.

## Official Sources

- OCI regions and availability domains: https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm
- OCI provider configuration and dedicated endpoints: https://docs.oracle.com/en-us/iaas/Content/terraform/configuring.htm
- Terraform provider home: https://docs.oracle.com/en-us/iaas/Content/terraform/home.htm
- Resource Manager overview and FIPS note: https://docs.oracle.com/en-us/iaas/Content/ResourceManager/Concepts/resourcemanager.htm

## Guardrails

- Verify the region identifier, realm, and availability-domain names from the target tenancy. AD names are tenancy-specific.
- Do not hardcode `oraclecloud.com` endpoint assumptions. Dedicated, government, and sovereign-style environments may need realm-specific endpoints.
- For Object Storage dedicated endpoints, check `realm_specific_service_endpoint_template_enabled` or the matching environment variable in current provider docs.
- For US Government Cloud or US Defense Cloud, verify whether the FIPS-compatible OCI Terraform provider is required.
- Confirm the target service is available in the target region before writing resources.
- Confirm Resource Manager is available in the target region/realm before choosing it as the execution control plane.
- Avoid copying commercial-region examples into government or dedicated environments without endpoint, service, and provider checks.

## Region Review Checklist

1. Region identifier and realm.
2. Tenancy Object Storage namespace.
3. Service availability for every resource type.
4. Provider endpoint or dedicated endpoint settings.
5. FIPS/provider requirement.
6. Resource Manager availability and supported Terraform/provider versions.
7. Quotas and service limits in the exact region and compartment.
8. Data residency, logging, and replication constraints.

## Pressure Scenario

User asks: "Write Terraform for OCI government cloud."

Passing answer: pause to verify realm, region, service availability, FIPS-compatible provider guidance, dedicated endpoint settings, and Resource Manager availability before writing commercial-region HCL.
