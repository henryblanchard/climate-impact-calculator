# Phase 1 Verifiable Findings

Date: 2026-02-13

## Verified now
- OpenAI public estimate (2025-06-10): average ChatGPT query ~0.34 Wh and ~0.322 mL water.
- Google public estimate (2025-09-08): median Gemini prompt ~0.24 Wh and ~0.26 mL water.
- Google-reported efficiency gain (2024-2025 model progression): Gemini 2.5 query energy is ~33x lower than Gemini 1.0 Ultra; query water ~10x lower.
- Google infrastructure update (2026): over 6x more compute per unit electricity vs five years earlier.
- Mistral disclosure (2025-07-23): 400-token Le Chat response reports 45 mL freshwater and 1.14 gCO2e.
- Chinese/open model training disclosures captured:
  - DeepSeek-V3: 2.788M H800 GPU-hours
  - Qwen3: ~36T pretraining tokens
  - MiniMax-01: >512B continued-training tokens
- Direct video-generation energy paper source added (arXiv:2509.19222), replacing secondary-link dependency.

## Coverage caveats
- GPT-5 and Gemini 3 release sources are captured, but no model-specific per-query energy/water disclosures were found in those release posts.
- Some water values remain unavailable for open-model image/video benchmarks and are currently set to 0 with explicit notes.
- Training water values are currently provisional.

## Immediate next verification targets
- Replace zero-water rows with region/provider-specific cooling-water assumptions.
- Add at least one independent benchmark source beyond provider/leaderboard data for proprietary frontier models.
