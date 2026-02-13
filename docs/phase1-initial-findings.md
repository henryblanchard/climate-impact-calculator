# Phase 1 - Initial Findings (Draft)

Date: 2026-02-13

## What is now grounded by sources
- OpenAI public estimate: one average ChatGPT query is around 0.34 Wh and ~0.322 mL water.
- Google public estimate: one median Gemini prompt is around 0.24 Wh and ~0.26 mL water.
- Literature ranges are much wider when assumptions vary (roughly 0.3 Wh up to several Wh per prompt in cited studies).
- Mistral reports 45 mL water for a 400-token Le Chat response in its environmental accounting.
- AI Energy Score leaderboard exposes model-level inference energy rows for text and image generation (currently used as raw benchmark inputs).

## Key uncertainty to resolve next
- AI Energy Score unit interpretation in energy CSVs needs direct confirmation (docs wording vs observed magnitudes).
- Video generation values are currently from a secondary summary and must be replaced with direct extraction from the cited paper PDF.
- Water conversion factors for models that only expose energy are provisional and need provider-specific WUE/PUE assumptions.
- Per-model estimates for Claude, Gemini variants, and GPT variants still need scenario-specific treatment by prompt length and output length.

## Immediate next steps
- Pull direct paper values for video generation energy and replace provisional rows.
- Lock a single conversion framework for water from energy (region-aware and provider-aware options).
- Add comparator dataset rows (Netflix, car driving, flights, microwave, internet/video/search) with source links.
- Build first calculator UI in `app/` using these rows with visible confidence labels.
