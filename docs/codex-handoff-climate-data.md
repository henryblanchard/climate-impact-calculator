# Climate Calculator Data Handoff (No SDXL)

## Snapshot
- Generated at: 2026-02-13T02:47:58Z
- Git commit: `cf47e34`
- Workspace: `/Users/henryblanchard/Documents/New project`
- Request constraints applied: exclude SDXL image rows; keep text benchmarks unchanged; include popular image model mappings (FLUX, ChatGPT Images, DALL·E 3) as proxy rows only where direct per-image energy/water is missing.

## What This File Contains
- Export-ready datasets for another Codex instance
- All conversion formulas and modeling assumptions currently used
- Verifiable source links with confidence notes
- Explicit gaps and next actions

## Key Findings to Carry Forward
- OpenAI public estimate (Sam Altman, 2025-06-10): average ChatGPT query `~0.34 Wh`, `~0.322 mL` water.
- Google public estimate (2025-09-08): median Gemini prompt `~0.24 Wh`, `~0.26 mL` water.
- Google efficiency progression (2024 to 2025): Gemini query energy down `~33x`, water down `~10x` (Gemini 1.0 Ultra -> Gemini 2.5).
- Mistral disclosure (2025-07-23): 400-token Le Chat response reports `45 mL` freshwater and `1.14 gCO2e`.
- Open-model measured inference benchmarks are from AI Energy Score (unit: `kWh per 1,000 requests`).

## Source Links (Primary/Official where available)
- OpenAI (Sam Altman): https://blog.samaltman.com/the-gentle-singularity
- Google Cloud sustainability post: https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability
- Google paper (Myth vs Fact PDF): https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf
- Google data center efficiency page: https://datacenters.google/energy/
- Google Environmental Report 2025 PDF: https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2F2025_Environmental_Report.pdf
- Mistral sustainability note: https://mistral.ai/fr/news/a-sustainable-path
- AI Energy Score docs: https://huggingface.co/AIEnergyScore/ai-energy-score/blob/main/docs/index.md
- AI Energy Score text generation CSV: https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/text_generation.csv
- AI Energy Score reasoning CSV: https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/reasoning.csv
- AI Energy Score image generation CSV: https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/image_generation.csv
- Video generation energy paper: https://arxiv.org/abs/2509.19222
- DeepSeek-V3 technical report: https://arxiv.org/abs/2412.19437
- Qwen3 technical report: https://arxiv.org/abs/2505.09388
- MiniMax-01 technical report: https://arxiv.org/abs/2501.08313
- GPT-5 release page: https://openai.com/index/introducing-gpt-5/
- Gemini 3 announcement: https://blog.google/products/gemini/google-gemini-3/
- FLUX model page: https://bfl.ai/models/flux-kontext
- OpenAI Help: ChatGPT Images/DALL·E usage: https://help.openai.com/en/articles/8932459
- OpenAI Help: DALL·E API: https://help.openai.com/en/articles/8555480-dall-e-3-api

## Critical Caveat (Popular Image Models)
Direct per-image energy/water metrics were **not found** in reviewed official FLUX / ChatGPT Images / DALL·E 3 product docs. For those, this handoff exports clearly-labeled **proxy** rows using Google’s high-end image envelope (low confidence).

## Unit Conventions and Formulas
- Energy unit in calculator: `Wh per action`
- Water unit in calculator: `mL per action`
- AI Energy Score conversion: `kWh per 1,000 requests` -> numeric value equals `Wh per request`
  - Example: `0.27667 kWh/1,000` -> `0.27667 Wh/request`
- BTU conversion for transport comparators: `1 BTU = 0.293071 Wh`
- DeepSeek training energy derivation used:
  - `Energy (Wh) = 2,788,000 GPU-hours * 700 W * PUE`
  - Low (PUE 1.1): `2,146,760,000 Wh`
  - Mid (PUE 1.25): `2,439,500,000 Wh`
  - High (PUE 1.5): `2,927,400,000 Wh`
- Text-model water-from-energy envelope used for some open-model rows:
  - OpenAI ratio: `0.322 / 0.34 = 0.947 mL/Wh`
  - Google ratio: `0.26 / 0.24 = 1.083 mL/Wh`
  - Applied as low/central/high envelope where direct water was missing.

## Export 1: Raw Inference Sources (Filtered, No SDXL)
Rows: 28 data rows (plus header).

```csv
item_id,model_or_activity,category,raw_metric,raw_value,raw_unit,source_url,source_date,notes
google_gemini_prompt_energy_2025,Gemini,text_inference,energy_per_prompt_median,0.24,Wh/prompt,https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability,2025-09-08,"Google median estimate for one Gemini prompt."
google_gemini_prompt_water_2025,Gemini,text_inference,water_per_prompt_median,0.26,mL/prompt,https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability,2025-09-08,"Google median estimate for one Gemini prompt."
google_query_energy_reduction_gemini_2025,Gemini,text_inference,query_energy_reduction_factor_vs_gemini_1_ultra,33,x,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Google reports 33x lower query energy between Gemini 1.0 Ultra (Feb 2024) and Gemini 2.5 (Nov 2025)."
google_query_water_reduction_gemini_2025,Gemini,text_inference,query_water_reduction_factor_vs_gemini_1_ultra,10,x,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Google reports 10x lower query water use between Gemini 1.0 Ultra (Feb 2024) and Gemini 2.5 (Nov 2025)."
google_datacenter_compute_per_electricity_gain_2026,Google infrastructure,text_inference,compute_per_electricity_gain_5y,6,x,https://datacenters.google/energy/,2026-01-01,"Google states it now delivers over 6x more computing power per unit electricity than 5 years ago."
google_24x7_cfe_2024,Google infrastructure,text_inference,annual_24x7_cfe,83,percent,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2F2025_Environmental_Report.pdf,2025-07-17,"Google annual 24/7 CFE score in 2024, up 6 percentage points from 2023."
openai_chatgpt_query_energy_2025,ChatGPT,text_inference,energy_per_query,0.34,Wh/query,https://blog.samaltman.com/the-gentle-singularity,2025-06-10,"OpenAI CEO estimate for an average ChatGPT query."
openai_chatgpt_query_water_2025,ChatGPT,text_inference,water_per_query,0.322,mL/query,https://blog.samaltman.com/the-gentle-singularity,2025-06-10,"Reported as 0.000085 gallons per query (~0.322 mL)."
mistral_le_chat_water_400_tokens_2025,Le Chat,text_inference,water_per_400_token_response,45,mL/response,https://mistral.ai/fr/news/a-sustainable-path,2025-07-23,"Mistral environmental accounting for a 400-token response."
mistral_le_chat_co2_400_tokens_2025,Le Chat,text_inference,co2_per_400_token_response,1.14,gCO2e/response,https://mistral.ai/fr/news/a-sustainable-path,2025-07-23,"Mistral environmental accounting for a 400-token response."
aie_units_2026,AI Energy Score,text_inference,primary_metric,1,kWh_per_1000_requests,https://huggingface.co/AIEnergyScore/ai-energy-score/blob/main/docs/index.md,2026-01-10,"AI Energy Score docs define total GPU energy as kWh per 1,000 requests."
aie_qwen3_next_80b_thinking_2025,Qwen3-Next-80B-A3B-Thinking,text_inference,total_gpu_energy,0.27667,kWh_per_1000_requests,https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/reasoning.csv,2025-12-01,"Measured benchmark row from AI Energy Score reasoning dataset."
aie_glm45_2025,GLM-4.5,text_inference,total_gpu_energy,1.22542,kWh_per_1000_requests,https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/text_generation.csv,2025-02-01,"Measured benchmark row from AI Energy Score text generation dataset."
aie_deepseek_r1_distill_qwen32b_2025,DeepSeek-R1-Distill-Qwen-32B,text_inference,total_gpu_energy,4.78983,kWh_per_1000_requests,https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/reasoning.csv,2025-12-01,"Measured benchmark row from AI Energy Score reasoning dataset."
aie_sd_turbo_2025,sd-turbo,image_inference,total_gpu_energy,0.189864946,kWh_per_1000_images,https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/image_generation.csv,2025-02-01,"Measured benchmark row from AI Energy Score image generation dataset."
google_high_end_image_energy_2025,High-end image generation,image_inference,energy_per_image_up_to,2.9,Wh/image,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Google literature synthesis reports high-end image generation may require up to 2.9 Wh per image."
google_high_end_image_water_2025,High-end image generation,image_inference,water_per_image_up_to,2500,mL/image,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Google literature synthesis reports high-end image generation may require up to 2.5 L water per image."
video_paper_animdiff_energy_2025,AnimateDiff,video_inference,energy_per_video,0.14,Wh/video,https://arxiv.org/abs/2509.19222,2025-09-24,"Direct statement from arXiv paper: 0.14 Wh for optimized small models."
video_paper_wan21_1_3b_energy_2025,WAN2.1-T2V-1.3B,video_inference,energy_per_video,90,Wh/video,https://arxiv.org/abs/2509.19222,2025-09-24,"Direct statement from arXiv paper."
video_paper_wan21_14b_energy_2025,WAN2.1-T2V-14B,video_inference,energy_per_video,415,Wh/video,https://arxiv.org/abs/2509.19222,2025-09-24,"Direct statement from arXiv paper."
deepseek_v3_training_gpu_hours_2024,DeepSeek-V3,training,training_gpu_hours,2788000,H800_GPU_hours,https://arxiv.org/abs/2412.19437,2024-12-26,"DeepSeek-V3 report states full training consumed 2.788M H800 GPU hours."
qwen3_pretraining_tokens_2025,Qwen3,training,pretraining_tokens,36000000000000,tokens,https://arxiv.org/abs/2505.09388,2025-04-29,"Qwen3 report: approximately 36T tokens used for pretraining."
minimax01_continued_training_tokens_2025,MiniMax-01,training,continued_training_tokens,512000000000,vision_language_tokens,https://arxiv.org/abs/2501.08313,2025-01-14,"MiniMax-01 report: continued training with over 512B tokens."
openai_gpt5_release_2025,GPT-5,text_inference,public_release_date,20250807,yyyymmdd,https://openai.com/index/introducing-gpt-5/,2025-08-07,"Model release coverage row. No public per-query energy/water metric disclosed in source."
google_gemini3_release_2025,Gemini 3,text_inference,public_release_date,20251118,yyyymmdd,https://blog.google/products/gemini/google-gemini-3/,2025-11-18,"Model release coverage row. No public per-query energy/water metric disclosed in source."
flux_kontext_proxy_google_2025,FLUX.1 Kontext,image_inference,proxy_high_end_image_envelope,2.9,Wh/image,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Proxy only. No direct FLUX per-image energy disclosure found in reviewed sources. Model page: https://bfl.ai/models/flux-kontext"
chatgpt_images_proxy_google_2025,ChatGPT Images,image_inference,proxy_high_end_image_envelope,2.9,Wh/image,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Proxy only. No direct ChatGPT images per-image energy disclosure found in reviewed sources. Product docs: https://help.openai.com/en/articles/8932459"
dalle3_proxy_google_2025,DALL·E 3,image_inference,proxy_high_end_image_envelope,2.9,Wh/image,https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf,2025-09-08,"Proxy only. No direct DALL·E 3 per-image energy disclosure found in reviewed sources. API docs: https://help.openai.com/en/articles/8555480-dall-e-3-api"
```

## Export 2: Processed Estimates (No SDXL + Popular Image Proxies)
Rows: 14 JSON objects.

```json
[
  {
    "item_id": "chatgpt_query_openai_2025",
    "category": "text_inference",
    "unit_action": "one ChatGPT query",
    "low_wh": 0.17,
    "mid_wh": 0.34,
    "high_wh": 0.68,
    "water_low_ml": 0.161,
    "water_mid_ml": 0.322,
    "water_high_ml": 0.644,
    "source_url": "https://blog.samaltman.com/the-gentle-singularity",
    "source_date": "2025-06-10",
    "confidence": "medium",
    "notes": "Midpoint from OpenAI leadership estimate. Range is provisional until independent replication is added."
  },
  {
    "item_id": "gemini_prompt_google_2025",
    "category": "text_inference",
    "unit_action": "one Gemini prompt",
    "low_wh": 0.12,
    "mid_wh": 0.24,
    "high_wh": 0.48,
    "water_low_ml": 0.13,
    "water_mid_ml": 0.26,
    "water_high_ml": 0.52,
    "source_url": "https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability",
    "source_date": "2025-09-08",
    "confidence": "medium",
    "notes": "Provider median estimate. Range is provisional for prompt/model variability."
  },
  {
    "item_id": "qwen3_next_80b_thinking_aie_2025",
    "category": "text_inference",
    "unit_action": "one Qwen3-Next-80B-A3B-Thinking response",
    "low_wh": 0.22,
    "mid_wh": 0.27667,
    "high_wh": 0.35,
    "water_low_ml": 0.21,
    "water_mid_ml": 0.28,
    "water_high_ml": 0.39,
    "source_url": "https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/reasoning.csv",
    "source_date": "2025-12-01",
    "confidence": "medium",
    "notes": "AI Energy Score metric is kWh per 1,000 requests. Per-request Wh equals the numeric benchmark value. Water is derived from OpenAI+Google text ratio envelope."
  },
  {
    "item_id": "glm45_aie_2025",
    "category": "text_inference",
    "unit_action": "one GLM-4.5 response",
    "low_wh": 0.98,
    "mid_wh": 1.22542,
    "high_wh": 1.53,
    "water_low_ml": 0.93,
    "water_mid_ml": 1.25,
    "water_high_ml": 1.68,
    "source_url": "https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/text_generation.csv",
    "source_date": "2025-02-01",
    "confidence": "medium",
    "notes": "AI Energy Score metric is kWh per 1,000 requests. Water is derived from OpenAI+Google text ratio envelope."
  },
  {
    "item_id": "deepseek_r1_distill_qwen32b_aie_2025",
    "category": "text_inference",
    "unit_action": "one DeepSeek-R1-Distill-Qwen-32B response",
    "low_wh": 3.83,
    "mid_wh": 4.78983,
    "high_wh": 5.99,
    "water_low_ml": 3.64,
    "water_mid_ml": 4.89,
    "water_high_ml": 6.59,
    "source_url": "https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/reasoning.csv",
    "source_date": "2025-12-01",
    "confidence": "medium",
    "notes": "AI Energy Score metric is kWh per 1,000 requests. Water is derived from OpenAI+Google text ratio envelope."
  },
  {
    "item_id": "sd_turbo_aie_2025",
    "category": "image_inference",
    "unit_action": "one sd-turbo image",
    "low_wh": 0.15,
    "mid_wh": 0.18986,
    "high_wh": 0.24,
    "water_low_ml": 0,
    "water_mid_ml": 0,
    "water_high_ml": 0,
    "source_url": "https://huggingface.co/spaces/AIEnergyScore/Leaderboard/resolve/main/data/energy/image_generation.csv",
    "source_date": "2025-02-01",
    "confidence": "medium",
    "notes": "Energy is measured by AI Energy Score (kWh per 1,000 images). Water is not directly disclosed for this benchmark row."
  },
  {
    "item_id": "high_end_image_google_2025",
    "category": "image_inference",
    "unit_action": "one high-end generated image",
    "low_wh": 1.9,
    "mid_wh": 2.9,
    "high_wh": 3.4,
    "water_low_ml": 500,
    "water_mid_ml": 1500,
    "water_high_ml": 2500,
    "source_url": "https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf",
    "source_date": "2025-09-08",
    "confidence": "low",
    "notes": "Google literature synthesis references values in this range and reports up to 2.5 L water for high-end image generation."
  },
  {
    "item_id": "animdiff_video_paper_2025",
    "category": "video_inference",
    "unit_action": "one short AnimateDiff video",
    "low_wh": 0.1,
    "mid_wh": 0.14,
    "high_wh": 0.2,
    "water_low_ml": 0,
    "water_mid_ml": 0,
    "water_high_ml": 0,
    "source_url": "https://arxiv.org/abs/2509.19222",
    "source_date": "2025-09-24",
    "confidence": "medium",
    "notes": "Direct value from arXiv paper narrative. Water is not directly reported."
  },
  {
    "item_id": "wan21_1_3b_video_paper_2025",
    "category": "video_inference",
    "unit_action": "one short WAN2.1-T2V-1.3B video",
    "low_wh": 70,
    "mid_wh": 90,
    "high_wh": 120,
    "water_low_ml": 0,
    "water_mid_ml": 0,
    "water_high_ml": 0,
    "source_url": "https://arxiv.org/abs/2509.19222",
    "source_date": "2025-09-24",
    "confidence": "medium",
    "notes": "Direct value from arXiv paper narrative. Water is not directly reported."
  },
  {
    "item_id": "wan21_14b_video_paper_2025",
    "category": "video_inference",
    "unit_action": "one short WAN2.1-T2V-14B video",
    "low_wh": 300,
    "mid_wh": 415,
    "high_wh": 520,
    "water_low_ml": 0,
    "water_mid_ml": 0,
    "water_high_ml": 0,
    "source_url": "https://arxiv.org/abs/2509.19222",
    "source_date": "2025-09-24",
    "confidence": "medium",
    "notes": "Direct value from arXiv paper narrative. Water is not directly reported."
  },
  {
    "item_id": "deepseek_v3_training_run_2024",
    "category": "training",
    "unit_action": "one DeepSeek-V3 full training run",
    "low_wh": 2146760000,
    "mid_wh": 2439500000,
    "high_wh": 2927400000,
    "water_low_ml": 2049420000,
    "water_mid_ml": 2488290000,
    "water_high_ml": 3210000000,
    "source_url": "https://arxiv.org/abs/2412.19437",
    "source_date": "2024-12-26",
    "confidence": "low",
    "notes": "Energy from reported 2.788M H800 GPU-hours and 700W TDP assumption, with PUE range 1.1-1.5. Water is a provisional derivation using provider-reported text query water-per-Wh ratios."
  },
  {
    "item_id": "flux_kontext_proxy_google_2025",
    "category": "image_inference",
    "unit_action": "one FLUX Kontext image (proxy)",
    "low_wh": 1.9,
    "mid_wh": 2.9,
    "high_wh": 3.4,
    "water_low_ml": 500,
    "water_mid_ml": 1500,
    "water_high_ml": 2500,
    "source_url": "https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf",
    "source_date": "2025-09-08",
    "confidence": "low",
    "notes": "No direct FLUX per-image energy/water disclosure found in public docs reviewed. Proxy uses Google high-end image generation envelope. Model availability reference: https://bfl.ai/models/flux-kontext."
  },
  {
    "item_id": "chatgpt_images_proxy_google_2025",
    "category": "image_inference",
    "unit_action": "one ChatGPT image generation (proxy)",
    "low_wh": 1.9,
    "mid_wh": 2.9,
    "high_wh": 3.4,
    "water_low_ml": 500,
    "water_mid_ml": 1500,
    "water_high_ml": 2500,
    "source_url": "https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf",
    "source_date": "2025-09-08",
    "confidence": "low",
    "notes": "No direct ChatGPT-images per-image energy/water metric found. Proxy uses Google high-end image generation envelope. Product availability references: https://help.openai.com/en/articles/8932459 and https://help.openai.com/en/articles/6825453-how-can-i-generate-images-with-dall-e."
  },
  {
    "item_id": "dalle3_proxy_google_2025",
    "category": "image_inference",
    "unit_action": "one DALL·E 3 image generation (proxy)",
    "low_wh": 1.9,
    "mid_wh": 2.9,
    "high_wh": 3.4,
    "water_low_ml": 500,
    "water_mid_ml": 1500,
    "water_high_ml": 2500,
    "source_url": "https://storage.googleapis.com/gweb-sustainability.appspot.com/assets%2Fpdf%2FSustainability_of_Generative_AI_Myth_vs_Fact.pdf",
    "source_date": "2025-09-08",
    "confidence": "low",
    "notes": "No direct DALL·E 3 per-image energy/water metric found. Proxy uses Google high-end image generation envelope. Availability references: https://help.openai.com/en/articles/8555480-dall-e-3-api and https://help.openai.com/en/articles/8932459."
  }
]
```

## Export 3: Comparator Dataset
Rows: 12 comparator rows.

```csv
item_id,activity,unit_action,low_wh,mid_wh,high_wh,water_low_ml,water_mid_ml,water_high_ml,source_url,source_date,confidence,notes
google_search_query_2009,Google Search,one search query,0.2,0.3,0.5,0,0,0,https://googleblog.blogspot.com/2009/01/powering-google-search.html,2009-01-11,low,"Google's published estimate from 2009; retained as low-confidence historical benchmark."
tv_watch_9_seconds_2025,TV watching,9 seconds of TV watching,0.2,0.24,0.3,0,0,0,https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability,2025-09-08,medium,"Google states one Gemini prompt (~0.24 Wh) is equivalent to ~9 seconds of TV."
netflix_watch_1_hour_tv_equivalent_2025,Netflix,1 hour streaming on TV-equivalent baseline,80,96,120,0,0,0,https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability,2025-09-08,low,"Derived from Google's 9-second TV equivalence anchor; content delivery/network overhead not independently modeled."
youtube_watch_10_min_tv_equivalent_2025,YouTube,10 minutes streaming on TV-equivalent baseline,13.3,16,20,0,0,0,https://cloud.google.com/blog/products/infrastructure/optimizing-ai-and-ml-workloads-for-environmental-sustainability,2025-09-08,low,"Derived from Google's 9-second TV equivalence anchor; content delivery/network overhead not independently modeled."
microwave_1_minute_1000w_2024,Microwave cooking,1 minute at 1,000 W,13.3,16.7,20,0,0,0,https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety,2024-11-25,medium,"USDA guidance references microwave wattage ranges; energy is a direct power x time calculation."
car_passenger_mile_2019,Passenger car travel,1 passenger-mile by car,820,861,900,0,0,0,https://www.amtrak.com/content/dam/projects/dotcom/english/public/documents/corporate/planning/Amtrak-Service-Line-Plans-FY2020-2024.pdf,2020-01-01,medium,"Uses ORNL Transportation Energy Data Book values reported in Amtrak service plan: 2,939 BTU/passenger-mile for auto."
rail_passenger_mile_2019,Passenger rail travel,1 passenger-mile by rail,430,455,480,0,0,0,https://www.amtrak.com/content/dam/projects/dotcom/english/public/documents/corporate/planning/Amtrak-Service-Line-Plans-FY2020-2024.pdf,2020-01-01,medium,"Uses ORNL Transportation Energy Data Book values reported in Amtrak service plan: 1,551 BTU/passenger-mile for rail."
flight_passenger_mile_2019,Commercial flight travel,1 passenger-mile by air,650,680,710,0,0,0,https://www.amtrak.com/content/dam/projects/dotcom/english/public/documents/corporate/planning/Amtrak-Service-Line-Plans-FY2020-2024.pdf,2020-01-01,medium,"Uses ORNL Transportation Energy Data Book values reported in Amtrak service plan: 2,320 BTU/passenger-mile for domestic air."
internet_transfer_1gb_iea_2022,Internet data transfer,1 GB transferred over data networks,59,70,82,0,0,0,https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks,2024-01-01,medium,"Derived from IEA 2022 ranges: 260-360 TWh network electricity and ~4.4 ZB traffic."
bicycle_pedal_1_mile_2024,Bicycle riding,1 mile at moderate pace (~10 mph),28,34,41,0,0,0,https://www.cdc.gov/healthy-weight-growth/physical-activity/physical-activity-basics/measuring-physical-activity/intensity.html,2024-01-19,low,"Derived from CDC calories-burned table for bicycling under 10 mph and kcal-to-Wh conversion."
almond_one_nut_2021,Almond consumption,one almond,0,0,0,9000,12000,15000,https://www.mdpi.com/2071-1050/13/12/6697,2021-06-11,medium,"Paper estimates around 12 liters of water per almond in California under current conditions."
golf_course_irrigation_one_day_2020,Golf course irrigation,one golf course irrigation day,0,0,0,120000000,149369582,180000000,https://www.gcsaa.org/media/news-release/2024/04/08/new-data-available-on-water-use-and-conservation-practices-on-u.s.-golf-courses,2024-04-08,medium,"Derived from GCSAA estimate of 44.2 acre-feet annual water use per U.S. golf facility in 2020."
```

## Export 4: AI Energy Score Image Snapshot (Filtered, No SDXL)
Rows: 10 model rows (plus header).

```csv
model,total_gpu_energy,energy_score
Mitsua/mitsua-diffusion-one,0.186811914,5
gsdf/Counterfeit-V2.5,0.187366386,5
stabilityai/sd-turbo,0.189864946,5
stabilityai/stable-cascade,1.214355539,2
stabilityai/stable-diffusion-2-1,0.534466733,4
dreamlike-art/dreamlike-photoreal-2.0,0.581331892,4
prompthero/openjourney-v4,0.203367331,5
prompthero/openjourney,0.196880224,5
SimianLuo/LCM_Dreamshaper_v7,0.322044411,5
Yntec/epiCPhotoGasm,0.586574491,4
```

## Modeling Decisions Log (Workings)
1. Prioritized direct provider disclosures and primary technical reports.
2. Used AI Energy Score as measured open-model inference backbone for text/image energy.
3. Replaced video placeholders with direct values from arXiv 2509.19222 narrative.
4. Marked all non-direct water values and proxy model mappings as low confidence.
5. Added model-coverage rows for GPT-5 and Gemini 3 release presence, while explicitly noting missing per-query impact disclosures.
6. Excluded SDXL rows per request from this handoff export.

## Gaps the Next Codex Should Close
1. Obtain direct per-image energy/water for FLUX, ChatGPT Images, DALL·E 3 (or keep proxies but label prominently in UI).
2. Replace zero-water video/image rows with provider/region cooling assumptions or direct disclosures.
3. Add at least one independent benchmark for proprietary frontier model inference beyond provider disclosures.
4. Add uncertainty propagation in UI (error bars and assumption toggles, not single-point cards only).

## Files Already in Repo That Back This Handoff
- `/Users/henryblanchard/Documents/New project/data/raw/inference_sources.csv`
- `/Users/henryblanchard/Documents/New project/data/processed/estimates.json`
- `/Users/henryblanchard/Documents/New project/data/reference/comparators.csv`
- `/Users/henryblanchard/Documents/New project/data/raw/aie/text_generation.csv`
- `/Users/henryblanchard/Documents/New project/data/raw/aie/reasoning.csv`
- `/Users/henryblanchard/Documents/New project/data/raw/aie/image_generation.csv`
- `/Users/henryblanchard/Documents/New project/research/sources/*.md`
- `/Users/henryblanchard/Documents/New project/docs/unit-conventions.md`
- `/Users/henryblanchard/Documents/New project/docs/model-coverage.md`

## Confidence Summary
- Medium confidence: OpenAI query estimate, Google prompt estimate, AI Energy Score measured energy rows, video paper energy rows.
- Low confidence: water derivations where not directly reported, training water derivation, FLUX/ChatGPT Images/DALL·E 3 proxy image rows.
