# ADB Cost Reference

## ECPU Pricing

| ECPU Count | License-Included | BYOL (50% off) |
|-----------|-----------------|----------------|
| 2 ECPU | $526/month | $263/month |
| 4 ECPU | $1,052/month | $526/month |
| 8 ECPU | $2,104/month | $1,052/month |

Calculation: ECPU × hourly rate × 730 hours/month
- License-Included: $0.36/ECPU-hour
- BYOL: $0.18/ECPU-hour

## Storage Pricing

- All tiers (Standard, Archive): $0.025/GB/month
- Charged even when ADB is stopped

Examples:
- 1 TB: $25/month
- 5 TB: $125/month

## Auto-Scaling Cost Impact

Base 2 ECPU with auto-scaling (1-3×):
- Without auto-scaling: $526/month (fixed)
- With auto-scaling (spiky load example):
  - 50% of time at 2 ECPU: $263
  - 30% of time at 4 ECPU: $315
  - 20% of time at 6 ECPU: $315
  - Total: ~$893/month (70% increase over base)

Auto-scaling makes sense when:
- Load is spiky (not sustained high)
- Manual scaling lag is unacceptable
- 3× cost increase is acceptable at peak

Set Max ECPU cap in console to limit exposure (e.g., 4 ECPU cap = max $1,052/month).

## Manual Backup Cost Trap

Manual backups: $0.025/GB/month with FOREVER retention (until manually deleted).

Example: 10 manual backups × 1TB × $0.025 = $250/month ongoing.
Always set `--retention-days` when creating manual backups.
