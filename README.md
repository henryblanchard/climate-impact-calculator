# Climate Impact Calculator

This repository supports the `goodwithai.org/climate` experience.

## Goal
Build a transparent, layperson-friendly calculator for AI climate impact that:
- Estimates inference energy and water use for text, image, and video generation
- Optionally includes training impacts (amortized)
- Compares AI impact to familiar activities (Netflix, driving, flights, etc.)
- Shows ranges and uncertainty so results are honest and interpretable

## Project Structure
- `app/` - calculator UI and interaction logic
- `data/raw/` - unmodified source extracts
- `data/processed/` - normalized datasets used by the calculator
- `data/reference/` - context comparison datasets (non-AI activities)
- `research/sources/` - source notes and citations
- `docs/` - methodology, assumptions, and roadmap

## Workflow
1. Add source-backed estimates into `data/raw/` and `research/sources/`
2. Normalize into `data/processed/`
3. Build calculator logic against processed data
4. Validate outputs against known benchmarks and sensitivity ranges
