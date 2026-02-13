# Unit Conventions

## Core units
- Energy: `Wh` per user action
- Water: `mL` per user action

## AI Energy Score conversion
- Source metric: `kWh per 1,000 requests` (or per 1,000 images for image generation)
- Conversion to this project: numeric value is equal to `Wh per action`
- Example: `0.27667 kWh / 1,000 requests` => `0.27667 Wh / request`

## Transport conversion
- Source metric used in references: `BTU per passenger-mile`
- Conversion factor: `1 BTU = 0.293071 Wh`

## Network transfer conversion
- Derived from IEA 2022 ranges:
  - Electricity use: `260 to 360 TWh`
  - Global data traffic: `4.4 ZB`
- Conversion used:
  - Low: `59 Wh / GB`
  - Mid: `70 Wh / GB`
  - High: `82 Wh / GB`

## Water handling policy
- If water is directly disclosed by a source, use it directly.
- If water is not disclosed, current placeholder is `0` with a note, unless a specific derivation is documented in `notes`.
- Training water values in the starter model are provisional and explicitly labeled low confidence.
