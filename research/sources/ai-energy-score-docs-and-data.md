# Source: AI Energy Score (Hugging Face)

- Docs URL: https://huggingface.co/AIEnergyScore/ai-energy-score/blob/main/docs/index.md
- Text data URL: https://huggingface.co/spaces/AIEnergyScore/Leaderboard/commit/665600a03f4e18fce88ba1dad1f80267c2f4ef19
- Image data URL: https://huggingface.co/spaces/AIEnergyScore/Leaderboard/blob/main/data/energy/image_generation.csv
- Accessed: 2026-02-13
- Type: Public benchmark docs + leaderboard dataset

## Extracted metrics used
- Text model GPU energy rows (examples): Llama-3.1-8B, Qwen2.5-72B, GLM-4.5, Qwen3-235B-A22B
- Image model GPU energy rows (examples): Sana-1600M, sd-turbo, SDXL base 1.0, HiDream-I1-Dev

## Notes
- Docs describe the primary metric as Wh per 1,000 queries.
- Magnitudes in CSV suggest possible kWh-per-1,000 interpretation for practical use; this must be verified with benchmark maintainers before public claims.
