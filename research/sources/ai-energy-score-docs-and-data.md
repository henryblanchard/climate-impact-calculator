# Source: AI Energy Score (Docs + Leaderboard Data)

- Docs URL: https://huggingface.co/AIEnergyScore/ai-energy-score/blob/main/docs/index.md
- Data URLs:
  - https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/text_generation.csv
  - https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/reasoning.csv
  - https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/image_generation.csv
- Accessed: 2026-02-13

## Metric used
- `total_gpu_energy` is documented as `kWh per 1,000 requests`.

## Conversion used
- `Wh per action` = numeric `total_gpu_energy` value.

## Notes
- This source provides benchmarked open-model inference energy.
- It currently does not provide water-use values for each benchmark row.
