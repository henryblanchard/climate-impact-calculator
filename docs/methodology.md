# Methodology (Draft)

## Scope
- Include: inference for text, image, and video models
- Optional toggle: include/exclude amortized training impact
- Exclude by default: embodied hardware lifecycle unless explicitly modeled later

## Core Outputs
- Energy: Wh per action (and kWh for larger periods)
- Water: mL or L per action
- Context equivalents: e.g., seconds of Netflix, miles driven, Google searches

## Data Model
Each estimate should include:
- `item_id`
- `category` (text_inference, image_inference, video_inference, training, comparator)
- `unit_action` (one prompt, one image, one minute of video generation, etc.)
- `low_wh`, `mid_wh`, `high_wh`
- `water_low_ml`, `water_mid_ml`, `water_high_ml`
- `source_url`
- `source_date`
- `confidence` (low/medium/high)
- `notes`

## Training Toggle Design
When enabled, training should be added as:
- `amortized_training_wh_per_action`
- `amortized_training_water_ml_per_action`

Amortization inputs (explicit and user-visible):
- Total training compute/energy estimate
- Estimated lifetime inference volume
- Refresh cadence/model replacement assumptions

## Honesty Requirements
- Always show ranges, not single-point certainty
- Label assumptions directly in UI
- Provide linkable source list
- Distinguish measured values vs inferred estimates
