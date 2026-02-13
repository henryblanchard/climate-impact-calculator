const el = {
  includeTraining: document.getElementById('includeTraining'),
  trainingToggleText: document.getElementById('trainingToggleText'),
  textPerDay: document.getElementById('textPerDay'),
  imagesPerWeek: document.getElementById('imagesPerWeek'),
  videosPerMonth: document.getElementById('videosPerMonth'),
  textModel: document.getElementById('textModel'),
  imageModel: document.getElementById('imageModel'),
  videoModel: document.getElementById('videoModel'),
  trainingScenario: document.getElementById('trainingScenario'),
  energyRange: document.getElementById('energyRange'),
  energyMid: document.getElementById('energyMid'),
  waterRange: document.getElementById('waterRange'),
  waterMid: document.getElementById('waterMid'),
  confidenceSummary: document.getElementById('confidenceSummary'),
  equivalents: document.getElementById('equivalents'),
  sourceList: document.getElementById('sourceList')
};

const formatWh = (v) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)} MWh`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(2)} kWh`;
  return `${v.toFixed(2)} Wh`;
};

const formatMl = (v) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)} m3`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(2)} L`;
  return `${v.toFixed(2)} mL`;
};

const parseCsv = (csv) => {
  const [header, ...rows] = csv.trim().split('\n');
  const cols = header.split(',');
  return rows.map((line) => {
    const parts = [];
    let value = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        parts.push(value);
        value = '';
      } else {
        value += char;
      }
    }
    parts.push(value);

    const item = {};
    cols.forEach((col, idx) => {
      item[col] = (parts[idx] ?? '').trim();
    });
    return item;
  });
};

const byId = (rows) => Object.fromEntries(rows.map((r) => [r.item_id, r]));

const state = {
  estimates: [],
  comparators: [],
  cmp: {}
};

const populateModelSelect = (selectEl, models, defaultId) => {
  selectEl.innerHTML = '';
  models.forEach((m) => {
    const option = document.createElement('option');
    option.value = m.item_id;
    option.textContent = `${m.unit_action} (${m.confidence})`;
    if (m.item_id === defaultId) option.selected = true;
    selectEl.appendChild(option);
  });
};

const getModel = (id) => state.estimates.find((e) => e.item_id === id);

const chips = (pairs) => pairs
  .filter((x) => Number.isFinite(x.value) && x.value >= 0)
  .map((x) => `<span class="chip">${x.label}: <strong>${x.display(x.value)}</strong></span>`)
  .join('');

const update = () => {
  const textModel = getModel(el.textModel.value);
  const imageModel = getModel(el.imageModel.value);
  const videoModel = getModel(el.videoModel.value);
  const trainingModel = state.estimates.find((e) => e.category === 'training');

  if (!textModel || !imageModel || !videoModel) return;

  const textActions = Math.max(0, Number(el.textPerDay.value) || 0) * 30;
  const imageActions = Math.max(0, Number(el.imagesPerWeek.value) || 0) * 4.345;
  const videoActions = Math.max(0, Number(el.videosPerMonth.value) || 0);
  const totalActions = textActions + imageActions + videoActions;

  const includeTraining = el.includeTraining.checked;
  el.trainingToggleText.textContent = includeTraining ? 'Included' : 'Excluded';

  const base = {
    lowWh: textActions * textModel.low_wh + imageActions * imageModel.low_wh + videoActions * videoModel.low_wh,
    midWh: textActions * textModel.mid_wh + imageActions * imageModel.mid_wh + videoActions * videoModel.mid_wh,
    highWh: textActions * textModel.high_wh + imageActions * imageModel.high_wh + videoActions * videoModel.high_wh,
    lowMl: textActions * textModel.water_low_ml + imageActions * imageModel.water_low_ml + videoActions * videoModel.water_low_ml,
    midMl: textActions * textModel.water_mid_ml + imageActions * imageModel.water_mid_ml + videoActions * videoModel.water_mid_ml,
    highMl: textActions * textModel.water_high_ml + imageActions * imageModel.water_high_ml + videoActions * videoModel.water_high_ml
  };

  if (includeTraining && trainingModel && totalActions > 0) {
    const lifetimeActions = Number(el.trainingScenario.value);
    base.lowWh += (trainingModel.low_wh / lifetimeActions) * totalActions;
    base.midWh += (trainingModel.mid_wh / lifetimeActions) * totalActions;
    base.highWh += (trainingModel.high_wh / lifetimeActions) * totalActions;
    base.lowMl += (trainingModel.water_low_ml / lifetimeActions) * totalActions;
    base.midMl += (trainingModel.water_mid_ml / lifetimeActions) * totalActions;
    base.highMl += (trainingModel.water_high_ml / lifetimeActions) * totalActions;
  }

  el.energyRange.textContent = `${formatWh(base.lowWh)} - ${formatWh(base.highWh)}`;
  el.energyMid.textContent = `Midpoint: ${formatWh(base.midWh)}`;
  el.waterRange.textContent = `${formatMl(base.lowMl)} - ${formatMl(base.highMl)}`;
  el.waterMid.textContent = `Midpoint: ${formatMl(base.midMl)}`;
  el.confidenceSummary.textContent = `Text: ${textModel.confidence} | Image: ${imageModel.confidence} | Video: ${videoModel.confidence}`;

  const c = state.cmp;
  const eq = [
    {
      label: 'Google searches',
      value: base.midWh / Number(c.google_search_query_2009?.mid_wh || 0.3),
      display: (n) => `${Math.round(n).toLocaleString()}`
    },
    {
      label: 'Netflix hours (TV-equivalent)',
      value: base.midWh / Number(c.netflix_watch_1_hour_tv_equivalent_2025?.mid_wh || 96),
      display: (n) => `${n.toFixed(2)} h`
    },
    {
      label: 'Microwave minutes',
      value: base.midWh / Number(c.microwave_1_minute_1000w_2024?.mid_wh || 16.7),
      display: (n) => `${n.toFixed(1)} min`
    },
    {
      label: 'Car passenger-miles',
      value: base.midWh / Number(c.car_passenger_mile_2019?.mid_wh || 861),
      display: (n) => `${n.toFixed(1)} mi`
    },
    {
      label: 'Flight passenger-miles',
      value: base.midWh / Number(c.flight_passenger_mile_2019?.mid_wh || 680),
      display: (n) => `${n.toFixed(1)} mi`
    },
    {
      label: '1 GB transfers',
      value: base.midWh / Number(c.internet_transfer_1gb_iea_2022?.mid_wh || 70),
      display: (n) => `${n.toFixed(1)} GB`
    },
    {
      label: 'Almonds (water-equivalent)',
      value: base.midMl / Number(c.almond_one_nut_2021?.water_mid_ml || 12000),
      display: (n) => `${n.toFixed(2)} almonds`
    }
  ];

  el.equivalents.innerHTML = chips(eq);

  const sourceModels = [textModel, imageModel, videoModel];
  if (includeTraining && trainingModel) sourceModels.push(trainingModel);
  const dedup = new Map(sourceModels.map((m) => [m.source_url, m]));
  el.sourceList.innerHTML = [...dedup.values()].map((m) => {
    const date = m.source_date;
    return `<li><a href="${m.source_url}" target="_blank" rel="noreferrer">${m.unit_action}</a> (${date}, confidence: ${m.confidence})</li>`;
  }).join('');
};

const bind = () => {
  [
    el.includeTraining,
    el.textPerDay,
    el.imagesPerWeek,
    el.videosPerMonth,
    el.textModel,
    el.imageModel,
    el.videoModel,
    el.trainingScenario
  ].forEach((node) => node.addEventListener('input', update));
};

const init = async () => {
  const [estimatesRes, comparatorsRes] = await Promise.all([
    fetch('/data/processed/estimates.json'),
    fetch('/data/reference/comparators.csv')
  ]);
  state.estimates = await estimatesRes.json();
  state.comparators = parseCsv(await comparatorsRes.text());
  state.cmp = byId(state.comparators);

  const textModels = state.estimates.filter((e) => e.category === 'text_inference');
  const imageModels = state.estimates.filter((e) => e.category === 'image_inference');
  const videoModels = state.estimates.filter((e) => e.category === 'video_inference');

  populateModelSelect(el.textModel, textModels, 'gemini_prompt_google_2025');
  populateModelSelect(el.imageModel, imageModels, 'sdxl_base_aie_2025');
  populateModelSelect(el.videoModel, videoModels, 'wan21_1_3b_video_paper_2025');

  bind();
  update();
};

init().catch((err) => {
  console.error(err);
  el.energyRange.textContent = 'Failed to load dataset';
});
