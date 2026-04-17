const STORAGE_KEY = "pan-nanmaitter:v1";

const QUESTION_DEFS = [
  {
    id: "age",
    type: "age",
    title: "今、何歳ですか？",
    subtitle: "年齢は年単位で入力してください。",
  },
  {
    id: "current",
    type: "choice",
    title: "今の普段の食生活では、パンをどれくらい食べますか？",
    subtitle: "だいたいの感覚で選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べない", sub: "かなり控えめ", icon: "🍚" },
      { value: "light", label: "週1〜2回くらい", sub: "たまに食べる", icon: "🍞" },
      { value: "medium", label: "週3〜5回くらい", sub: "わりと身近", icon: "🥐" },
      { value: "heavy", label: "かなりよく食べる", sub: "パン高頻度", icon: "🥯" },
    ],
  },
  {
    id: "childhood",
    type: "choice",
    title: "小学生くらいのころ、パンはどれくらい食べていましたか？",
    subtitle: "朝食やおやつの感じで選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べなかった", sub: "ごはん寄り", icon: "🍚" },
      { value: "light", label: "週1〜2回くらい", sub: "たまに食べる", icon: "🍞" },
      { value: "medium", label: "週3〜5回くらい", sub: "わりと食べていた", icon: "🥐" },
      { value: "heavy", label: "かなりよく食べていた", sub: "しっかりパン期", icon: "🥪" },
    ],
  },
  {
    id: "teen",
    type: "choice",
    title: "中高生くらいのころ、パンはどれくらい食べていましたか？",
    subtitle: "購買や昼食もふくめた感じで選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べなかった", sub: "ごはん中心", icon: "🍚" },
      { value: "light", label: "週1〜2回くらい", sub: "たまに食べる", icon: "🍞" },
      { value: "medium", label: "週3〜5回くらい", sub: "多め寄り", icon: "🥐" },
      { value: "heavy", label: "かなりよく食べていた", sub: "パン強め", icon: "🥪" },
    ],
  },
  {
    id: "youngAdult",
    type: "choice",
    title: "19〜25歳くらいのころ、パンはどれくらい食べていましたか？",
    subtitle: "朝食や軽食込みの感覚で選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べなかった", sub: "かなり控えめ", icon: "🍚" },
      { value: "light", label: "週1〜2回くらい", sub: "たまに食べる", icon: "🍞" },
      { value: "medium", label: "週3〜5回くらい", sub: "生活に入っていた", icon: "🥐" },
      { value: "heavy", label: "かなりよく食べていた", sub: "しっかりパン派", icon: "🥯" },
    ],
  },
  {
    id: "adult",
    type: "choice",
    title: "26歳以降、今に近い食生活ではパンをどれくらい食べていますか？",
    subtitle: "26歳以降のだいたいの感じで選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べない", sub: "かなり控えめ", icon: "🍚" },
      { value: "light", label: "週1〜2回くらい", sub: "たまに食べる", icon: "🍞" },
      { value: "medium", label: "週3〜5回くらい", sub: "やや多め", icon: "🥐" },
      { value: "heavy", label: "かなりよく食べる", sub: "パン高頻度", icon: "🥯" },
    ],
  },
  {
    id: "sandwich",
    type: "choice",
    title: "最近、サンドイッチ・惣菜パン・菓子パンはどれくらい食べますか？",
    subtitle: "深く考えず、最近の感じで選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べない", sub: "補正なし", icon: "🍽️" },
      { value: "light", label: "たまに食べる", sub: "軽め補正", icon: "🥪" },
      { value: "heavy", label: "よく食べる", sub: "しっかり補正", icon: "🥐" },
    ],
  },
  {
    id: "burger",
    type: "choice",
    title: "最近、バーガー・ホットドッグ系はどれくらい食べますか？",
    subtitle: "たまに食べる分もふくめて選んでください。",
    options: [
      { value: "rare", label: "ほぼ食べない", sub: "補正なし", icon: "🥗" },
      { value: "light", label: "たまに食べる", sub: "軽め補正", icon: "🍔" },
      { value: "heavy", label: "わりと食べる", sub: "強め補正", icon: "🌭" },
    ],
  },
];

const PERIODS = [
  { id: "childhood", label: "小学生くらい", rangeLabel: "6〜12歳", from: 6, to: 12 },
  { id: "teen", label: "中高生くらい", rangeLabel: "13〜18歳", from: 13, to: 18 },
  { id: "youngAdult", label: "19〜25歳くらい", rangeLabel: "19〜25歳", from: 19, to: 25 },
  { id: "adult", label: "26歳以降", rangeLabel: "26歳〜現在", from: 26, to: null },
];

const WEEKLY_VALUES = {
  rare: 0.5,
  light: 2,
  medium: 5,
  heavy: 9,
};

const SANDWICH_BONUS = {
  rare: 0,
  light: 0.8,
  heavy: 2,
};

const BURGER_BONUS = {
  rare: 0,
  light: 0.4,
  heavy: 1,
};

const ADD_OPTIONS = [
  { id: "toast", label: "食パン1枚", sub: "今日の基本パン", delta: 1, icon: "🍞", primary: true },
  { id: "sandwich", label: "サンドイッチ", sub: "2枚換算", delta: 2, icon: "🥪" },
  { id: "burger", label: "バーガー", sub: "2枚換算", delta: 2, icon: "🍔" },
  { id: "sweet", label: "惣菜パン / 菓子パン", sub: "1.5枚換算", delta: 1.5, icon: "🥐" },
  { id: "other", label: "その他パン", sub: "ざっくり1枚", delta: 1, icon: "🥯" },
];

const DEFAULT_STATE = {
  currentScreen: "home",
  lastCompletedScreen: "home",
  questionIndex: 0,
  answers: {
    age: "",
    current: "",
    childhood: "",
    teen: "",
    youngAdult: "",
    adult: "",
    sandwich: "",
    burger: "",
  },
  visibleQuestionIds: ["age", "current", "sandwich", "burger"],
  estimate: null,
  futureCount: 0,
  history: [],
  updatedAt: null,
  hasSavedData: false,
  toasts: [],
  loadingEstimate: false,
  ui: {
    ageError: "",
    ageDraft: "",
    openAccordion: "",
  },
};

let autoAdvanceTimer = null;

const appState = typeof window !== "undefined" ? safeLoadState() : structuredClone(DEFAULT_STATE);

function safeLoadState() {
  const fallback = structuredClone(DEFAULT_STATE);
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    const storedAnswers = parsed.answers || {};
    const answers = {
      ...fallback.answers,
      ...storedAnswers,
      current: storedAnswers.current || storedAnswers.adult || storedAnswers.childhood || "",
    };

    const currentScreen = aliasScreen(parsed.currentScreen);
    const lastCompletedScreen = aliasScreen(parsed.lastCompletedScreen);
    const age = parseAge(answers.age) ?? 0;
    const visibleQuestionIds = getVisibleQuestionIds(age);

    return {
      ...fallback,
      ...parsed,
      currentScreen: sanitizeScreen(currentScreen, { ...fallback, estimate: parsed.estimate }),
      lastCompletedScreen: sanitizeScreen(lastCompletedScreen, { ...fallback, estimate: parsed.estimate }),
      answers,
      visibleQuestionIds,
      hasSavedData: Boolean(parsed.estimate || parsed.futureCount || parsed.history?.length || hasAnyAnswer(answers)),
      toasts: [],
      loadingEstimate: false,
      ui: {
        ...fallback.ui,
        ...(parsed.ui || {}),
        ageDraft: answers.age || "",
      },
    };
  } catch (_error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return fallback;
  }
}

function aliasScreen(screen) {
  return screen === "counter" ? "records" : screen;
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function sanitizeScreen(screen, state) {
  const available = new Set(["home", "questions", "loading"]);
  if (state.estimate) {
    available.add("result");
    available.add("records");
    available.add("settings");
  }
  return available.has(screen) ? screen : "home";
}

function persistState() {
  const data = {
    currentScreen: appState.currentScreen,
    lastCompletedScreen: appState.lastCompletedScreen,
    questionIndex: appState.questionIndex,
    answers: appState.answers,
    visibleQuestionIds: appState.visibleQuestionIds,
    estimate: appState.estimate,
    futureCount: appState.futureCount,
    history: appState.history,
    updatedAt: appState.updatedAt,
    hasSavedData: Boolean(appState.estimate || appState.futureCount || appState.history.length || hasAnyAnswer(appState.answers)),
    ui: {
      openAccordion: appState.ui.openAccordion,
    },
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_error) {
    showToast("保存できませんでした", "ストレージ");
  }
}

function hasAnyAnswer(answers) {
  return Object.values(answers).some(Boolean);
}

function parseAge(value) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Math.max(0, parsed);
}

function sanitizeAgeDraft(value) {
  return String(value ?? "").replace(/[^\d]/g, "").slice(0, 3);
}

function getVisibleQuestionIds(age) {
  const ids = ["age", "current"];
  if (age >= 7) {
    ids.push("childhood");
  }
  if (age >= 13) {
    ids.push("teen");
  }
  if (age >= 19) {
    ids.push("youngAdult");
  }
  if (age >= 26) {
    ids.push("adult");
  }
  ids.push("sandwich", "burger");
  return ids;
}

function getVisibleQuestions() {
  return appState.visibleQuestionIds
    .map((id) => QUESTION_DEFS.find((question) => question.id === id))
    .filter(Boolean);
}

function clampQuestionIndex() {
  const total = getVisibleQuestions().length;
  if (appState.questionIndex < 0) {
    appState.questionIndex = 0;
  }
  if (appState.questionIndex > total - 1) {
    appState.questionIndex = Math.max(0, total - 1);
  }
}

function setScreen(screen) {
  clearPendingAutoAdvance();
  appState.currentScreen = sanitizeScreen(aliasScreen(screen), appState);
  if (screen !== "loading") {
    appState.lastCompletedScreen = appState.currentScreen;
  }
  persistState();
  render();
}

function beginEstimateFlow() {
  clearPendingAutoAdvance();
  appState.currentScreen = "questions";
  appState.lastCompletedScreen = "questions";
  appState.questionIndex = 0;
  appState.ui.ageError = "";
  appState.ui.ageDraft = appState.answers.age || "";
  persistState();
  render();
  focusAgeInput();
}

function updateAgeDraft(value, input) {
  const digits = sanitizeAgeDraft(value);
  appState.ui.ageDraft = digits;
  appState.ui.ageError = "";

  if (input && input.value !== digits) {
    input.value = digits;
  }

  const error = document.querySelector("[data-role='age-error']");
  if (error) {
    error.textContent = "";
    error.hidden = true;
  }
}

function commitAgeDraft() {
  const digits = sanitizeAgeDraft(appState.ui.ageDraft);
  const age = parseAge(digits);
  if (age === null) {
    appState.ui.ageError = "年齢を入力してください";
    render();
    focusAgeInput();
    return null;
  }

  appState.answers.age = digits;
  appState.ui.ageDraft = digits;
  appState.visibleQuestionIds = getVisibleQuestionIds(age);
  clampQuestionIndex();
  appState.ui.ageError = "";
  appState.updatedAt = new Date().toISOString();
  persistState();
  return age;
}

function answerQuestion(questionId, value, { autoAdvance = false } = {}) {
  clearPendingAutoAdvance();
  appState.answers[questionId] = value;
  appState.updatedAt = new Date().toISOString();
  persistState();
  render();

  if (autoAdvance) {
    scheduleAutoAdvance(questionId, value);
  }
}

function scheduleAutoAdvance(questionId, value) {
  if (typeof window === "undefined") {
    return;
  }
  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null;
    const currentQuestion = getVisibleQuestions()[appState.questionIndex];
    if (
      appState.currentScreen !== "questions" ||
      !currentQuestion ||
      currentQuestion.id !== questionId ||
      appState.answers[questionId] !== value
    ) {
      return;
    }
    handleQuestionNext();
  }, 180);
}

function clearPendingAutoAdvance() {
  if (autoAdvanceTimer) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function handleQuestionNext() {
  clearPendingAutoAdvance();
  let visibleQuestions = getVisibleQuestions();
  const question = visibleQuestions[appState.questionIndex];
  if (!question) {
    return;
  }

  if (question.id === "age") {
    const committedAge = commitAgeDraft();
    if (committedAge === null) {
      return;
    }
    visibleQuestions = getVisibleQuestions();
  } else if (!appState.answers[question.id]) {
    showToast("選択肢を選んでください", "未回答");
    return;
  }

  const isLast = appState.questionIndex >= visibleQuestions.length - 1;
  if (isLast) {
    runEstimate();
    return;
  }

  appState.questionIndex += 1;
  appState.updatedAt = new Date().toISOString();
  persistState();
  render();
}

function handleQuestionBack() {
  clearPendingAutoAdvance();
  if (appState.questionIndex === 0) {
    setScreen("home");
    return;
  }
  appState.questionIndex -= 1;
  persistState();
  render();
  focusAgeInput();
}

function getPeriodYears(age, from, to) {
  if (!Number.isFinite(age) || age < from) {
    return 0;
  }
  const cappedEnd = to === null ? age : Math.min(age, to);
  if (cappedEnd < from) {
    return 0;
  }
  return cappedEnd - from + 1;
}

function getStabilityWeight(age) {
  if (age <= 6) {
    return 1;
  }
  if (age <= 12) {
    return 0.4;
  }
  if (age <= 18) {
    return 0.24;
  }
  if (age <= 25) {
    return 0.14;
  }
  return 0.08;
}

function blendWeekly(baseWeekly, currentWeekly, weight) {
  return baseWeekly * (1 - weight) + currentWeekly * weight;
}

function getRecentCorrectionYears(age) {
  if (age <= 0) {
    return 0;
  }
  if (age <= 6) {
    return age;
  }
  if (age <= 12) {
    return Math.max(2, age - 4);
  }
  if (age <= 18) {
    return 4;
  }
  if (age <= 25) {
    return 6;
  }
  return 8;
}

function calculateEstimate(answers) {
  const age = parseAge(answers.age);
  if (age === null) {
    return null;
  }

  const currentWeekly = WEEKLY_VALUES[answers.current] ?? 0;
  const stabilityWeight = getStabilityWeight(age);
  const breakdown = [];

  if (age <= 6) {
    breakdown.push({
      id: "currentBase",
      label: "今の生活ベース",
      rangeLabel: "0〜6歳",
      years: age,
      weekly: currentWeekly,
      rawWeekly: currentWeekly,
      subtotal: age * 52 * currentWeekly,
      source: "current",
    });
  }

  for (const period of PERIODS) {
    const years = getPeriodYears(age, period.from, period.to);
    if (!years) {
      continue;
    }
    const rawWeekly = WEEKLY_VALUES[answers[period.id]] ?? currentWeekly;
    const blendWeight = period.id === "adult" ? 0.32 : stabilityWeight;
    const weekly = blendWeekly(rawWeekly, currentWeekly, blendWeight);
    breakdown.push({
      id: period.id,
      label: period.label,
      rangeLabel: period.rangeLabel,
      years,
      weekly,
      rawWeekly,
      subtotal: years * 52 * weekly,
      source: "period",
    });
  }

  const correctionYears = getRecentCorrectionYears(age);
  const sandwichWeekly = SANDWICH_BONUS[answers.sandwich] ?? 0;
  const burgerWeekly = BURGER_BONUS[answers.burger] ?? 0;
  const sandwichTotal = correctionYears * 52 * sandwichWeekly;
  const burgerTotal = correctionYears * 52 * burgerWeekly;
  const baseTotal = breakdown.reduce((sum, item) => sum + item.subtotal, 0);
  const total = Math.max(0, Math.round(baseTotal + sandwichTotal + burgerTotal));
  const lower = Math.max(0, Math.round(total * 0.8));
  const upper = Math.max(lower, Math.round(total * 1.25));

  const result = {
    total,
    range: { lower, upper },
    breakdown: breakdown.map((item) => ({
      id: item.id,
      label: item.label,
      rangeLabel: item.rangeLabel,
      years: item.years,
      weekly: item.weekly,
      rawWeekly: item.rawWeekly,
      subtotal: Math.round(item.subtotal),
    })),
    corrections: {
      recentYears: correctionYears,
      sandwichWeekly,
      sandwichTotal: Math.round(sandwichTotal),
      burgerWeekly,
      burgerTotal: Math.round(burgerTotal),
    },
    currentReferenceWeekly: currentWeekly,
  };

  result.comment = getResultComment(result, age);
  result.shareText = buildShareText(result);
  return result;
}

function getResultComment(result, age) {
  const total = result.total;
  const sandwich = result.corrections.sandwichTotal;
  const burger = result.corrections.burgerTotal;

  if (age <= 12 && total > 0) {
    return "まだ序盤でも、もうちゃんとパンです。";
  }
  if (sandwich >= 380 && sandwich > burger) {
    return "軽食まで入れると、かなりパン寄りです。";
  }
  if (burger >= 220 && burger >= sandwich) {
    return "バーガー込みだと、想像以上にパンでした。";
  }
  if (total >= 7000) {
    return "かなり多いです。あなたの人生、だいぶパンです。";
  }
  if (total >= 4300) {
    return "思ったより多いです。気づけばかなりパンでした。";
  }
  if (total <= 1800) {
    return "控えめでも、ちゃんとパン歴あります。";
  }
  return "ほどよく見えて、しっかりパンです。";
}

function buildShareText(result) {
  const formattedTotal = formatNumber(result.total);
  const variants = [
    `今までに食べたパンを概算したら、${formattedTotal}枚でした。\n思ったよりかなりパン。\n#パン何枚ったー`,
    `自分のパン枚数を調べたら、${formattedTotal}枚でした。\nなんとなく食べてきたパン、ちゃんと多い。\n#パン何枚ったー`,
    `今までのパン、${formattedTotal}枚。\n数字にすると急に気になる。\n#パン何枚ったー`,
  ];
  return variants[result.total % variants.length];
}

function formatKin(kin) {
  if (kin < 100) {
    return `${kin.toFixed(1)}斤`;
  }
  return `${Math.round(kin).toLocaleString("ja-JP")}斤`;
}

function formatStackHeight(totalSlices) {
  const stackCm = totalSlices * 2;

  if (stackCm < 100) {
    return `${Math.round(stackCm).toLocaleString("ja-JP")}cm`;
  }

  const stackM = stackCm / 100;
  if (stackM < 100) {
    return `${stackM.toFixed(1)}m`;
  }
  return `${Math.round(stackM).toLocaleString("ja-JP")}m`;
}

function formatWheatStalks(totalSlices) {
  const stalks = totalSlices * 30;

  if (stalks < 10000) {
    return `${Math.round(stalks).toLocaleString("ja-JP")}本`;
  }

  const man = stalks / 10000;
  if (man < 100) {
    return `${man.toFixed(1)}万本`;
  }
  return `${Math.round(man).toLocaleString("ja-JP")}万本`;
}

function getResultExtras(totalSlices) {
  const safeSlices = Math.max(0, Number(totalSlices) || 0);
  const loafKinRaw = safeSlices / 6;
  const stackCmRaw = safeSlices * 2;
  const wheatStalksRaw = safeSlices * 30;

  return {
    loafKinRaw,
    stackCmRaw,
    wheatStalksRaw,
    loafKinLabel: formatKin(loafKinRaw),
    stackLabel: formatStackHeight(safeSlices),
    wheatLabel: formatWheatStalks(safeSlices),
  };
}

function getShareAppUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const current = new URL(window.location.href);
    return `${current.origin}${current.pathname}`;
  } catch (_error) {
    return window.location.href.split(/[?#]/)[0];
  }
}

function getSharePayload(result) {
  const text = result?.shareText ?? "";
  const url = getShareAppUrl();
  return {
    title: "パン何枚ったー",
    text,
    url,
    shareTextWithUrl: url ? `${text}\n\n${url}` : text,
  };
}

function isSameLocalDay(left, right) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getTodayHistoryEntries(history) {
  const today = new Date();
  return history.filter((item) => {
    const timestamp = new Date(item.timestamp);
    return Number.isFinite(timestamp.getTime()) && isSameLocalDay(timestamp, today);
  });
}

function getTodaySummary(history) {
  const todayEntries = getTodayHistoryEntries(history);
  const total = roundToHalf(todayEntries.reduce((sum, item) => sum + item.delta, 0));
  return {
    entries: todayEntries,
    total,
  };
}

function formatTodaySummary(entries) {
  const parts = entries.slice(0, 3).map((item) => `${item.label} +${formatMaybeDecimal(item.delta)}`);
  if (entries.length > 3) {
    parts.push(`ほか${entries.length - 3}件`);
  }
  return parts.join(" / ");
}

function formatHistoryTimestamp(iso) {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) {
    return "";
  }

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const time = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  if (isSameLocalDay(date, now)) {
    return `今日 ${time}`;
  }
  if (isSameLocalDay(date, yesterday)) {
    return `昨日 ${time}`;
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (date.getFullYear() === now.getFullYear()) {
    return `${month}/${day} ${time}`;
  }
  return `${date.getFullYear()}/${month}/${day} ${time}`;
}

function runEstimate() {
  const result = calculateEstimate(appState.answers);
  if (!result) {
    showToast("回答を確認してください", "未完了");
    return;
  }

  clearPendingAutoAdvance();
  appState.loadingEstimate = true;
  appState.currentScreen = "loading";
  persistState();
  render();

  window.setTimeout(() => {
    appState.estimate = result;
    appState.loadingEstimate = false;
    appState.currentScreen = "result";
    appState.lastCompletedScreen = "result";
    appState.updatedAt = new Date().toISOString();
    appState.hasSavedData = true;
    persistState();
    render();
  }, 760);
}

function addFutureCount(optionId) {
  const item = ADD_OPTIONS.find((option) => option.id === optionId);
  if (!item || !appState.estimate) {
    return;
  }

  appState.futureCount = roundToHalf(appState.futureCount + item.delta);
  appState.history = [
    {
      id: makeId(),
      itemId: item.id,
      label: item.label,
      icon: item.icon,
      delta: item.delta,
      timestamp: new Date().toISOString(),
    },
    ...appState.history,
  ].slice(0, 20);
  appState.updatedAt = new Date().toISOString();
  persistState();
  showToast(`${item.label} を記録`, `+${formatMaybeDecimal(item.delta)}枚`);
  render();
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function resetEstimateFlow() {
  clearPendingAutoAdvance();
  appState.currentScreen = "questions";
  appState.lastCompletedScreen = "questions";
  appState.questionIndex = 0;
  appState.answers = structuredClone(DEFAULT_STATE.answers);
  appState.visibleQuestionIds = structuredClone(DEFAULT_STATE.visibleQuestionIds);
  appState.estimate = null;
  appState.futureCount = 0;
  appState.history = [];
  appState.updatedAt = new Date().toISOString();
  appState.ui.ageError = "";
  appState.ui.ageDraft = "";
  persistState();
  render();
  focusAgeInput();
}

function resetFutureOnly() {
  appState.futureCount = 0;
  appState.history = [];
  appState.updatedAt = new Date().toISOString();
  persistState();
  showToast("記録分をリセットしました", "0枚");
  render();
}

function resetAllData() {
  clearPendingAutoAdvance();
  window.localStorage.removeItem(STORAGE_KEY);
  const fresh = structuredClone(DEFAULT_STATE);
  Object.assign(appState, fresh);
  render();
}

function toggleAccordion(id) {
  appState.ui.openAccordion = appState.ui.openAccordion === id ? "" : id;
  persistState();
  render();
}

function showToast(message, accent = "") {
  const toast = {
    id: makeId(),
    message,
    accent,
  };
  appState.toasts = [...appState.toasts, toast];
  render();
  window.setTimeout(() => {
    appState.toasts = appState.toasts.filter((item) => item.id !== toast.id);
    render();
  }, 2200);
}

async function copyShareText() {
  if (!appState.estimate) {
    return;
  }
  const sharePayload = getSharePayload(appState.estimate);
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(sharePayload.shareTextWithUrl);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = sharePayload.shareTextWithUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast("シェア文をコピーしました", "コピー完了");
  } catch (_error) {
    showToast("コピーできませんでした", "未対応");
  }
}

async function nativeShare() {
  if (!appState.estimate) {
    return;
  }
  const sharePayload = getSharePayload(appState.estimate);
  if (navigator.share) {
    try {
      await navigator.share({
        title: sharePayload.title,
        text: sharePayload.text,
        url: sharePayload.url,
      });
      showToast("共有シートを開きました", "share");
      return;
    } catch (_error) {
      return;
    }
  }
  copyShareText();
}

function openXShare() {
  if (!appState.estimate) {
    return;
  }
  const sharePayload = getSharePayload(appState.estimate);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharePayload.shareTextWithUrl)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

function formatDisplayNumber(value) {
  return new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value);
}

function formatMaybeDecimal(value) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function formatDateTime(iso) {
  if (!iso) {
    return "未保存";
  }
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch (_error) {
    return "未保存";
  }
}

function formatRecordDate(iso) {
  if (!iso) {
    return "";
  }
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(iso));
  } catch (_error) {
    return "";
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getCurrentTotal() {
  return roundToHalf((appState.estimate?.total ?? 0) + appState.futureCount);
}

function renderHeader() {
  const canNavigate = Boolean(appState.estimate);
  return `
    <header class="app-header">
      <div class="app-header__inner">
        <div class="brand-lockup">
          <span class="brand-dot" aria-hidden="true"></span>
          <div class="brand-title">パン何枚ったー</div>
        </div>
        <div class="header-actions">
          ${
            canNavigate
              ? `
                <button class="nav-button ${appState.currentScreen === "result" ? "is-active" : ""}" data-action="nav" data-screen="result">結果</button>
                <button class="nav-button ${appState.currentScreen === "records" ? "is-active" : ""}" data-action="nav" data-screen="records">記録</button>
                <button class="nav-button ${appState.currentScreen === "settings" ? "is-active" : ""}" data-action="nav" data-screen="settings">設定</button>
              `
              : `
                <button class="nav-button ${appState.currentScreen === "home" ? "is-active" : ""}" data-action="nav" data-screen="home">トップ</button>
                <button class="nav-button ${appState.currentScreen === "questions" ? "is-active" : ""}" data-action="nav" data-screen="questions">推定</button>
              `
          }
        </div>
      </div>
    </header>
  `;
}

function renderHomeScreen() {
  return `
    <main class="screen-container screen-container--wide">
      <section class="hero-grid">
        <article class="card hero-card">
          <div class="row">
            <span class="badge">食パン換算</span>
            <span class="pill">登録不要</span>
            <span class="pill">1〜2分</span>
          </div>
          <h1 class="hero-copy">
            <span class="hero-copy__sub">あなたの人生、</span>
            <span class="hero-copy__brand">パン</span>換算<br />
            してみよう。
          </h1>
          <p class="hero-desc">
            今まで食べてきたパン、だいたい何枚？<br />
            数問に答えるだけで、ざっくり食パン換算します。<br />
            思ったよりちゃんとパンです。
          </p>
          <div class="cta-row">
            <button class="button button--primary" data-action="start-estimate">🍞 推定スタート</button>
            <div class="inline-note">
              所要時間 約1〜2分<br />
              思ったよりかなりパンです
            </div>
          </div>
          ${
            appState.updatedAt
              ? `<div class="inline-note" style="margin-top: 12px;">最終更新 ${formatDateTime(appState.updatedAt)}</div>`
              : ""
          }
        </article>

        <aside class="card card--soft sample-card">
          <div>
            <div class="sample-card__label">推定パン摂取枚数</div>
            <div class="sample-number" data-counter="3420">3,420</div>
            <div class="sample-unit">枚（食パン換算）</div>
          </div>
          <div>
            <div class="bar-track" aria-hidden="true">
              <div class="bar-fill" style="width: 68%"></div>
            </div>
            <p class="body-text">
              これは30代・週3〜4回パンを食べる人の推定サンプルです。<br />
              あなたの数字は、もっといくかもしれません。
            </p>
            <span class="pill">サンプル値</span>
          </div>
        </aside>
      </section>

      <section class="sub-grid sub-grid--single">
        <article class="card sub-card share-preview-card">
          <div class="eyebrow">シェアするとこんな感じ</div>
          <p class="section-title" style="margin-top: 10px;">
            私のこれまでのパン枚数、<span style="color: var(--brand);">3,420枚</span>でした。
          </p>
          <p class="body-text" style="margin-top: 8px;">思ったよりかなりパンだった。 #パン何枚ったー</p>
          <div style="margin-top: 16px;">
            <button class="button button--dark" data-action="start-estimate">試してみる</button>
          </div>
        </article>
      </section>

      <div class="footer-note">© 2026 パン何枚ったー / 過去は推定、これからは記録</div>
    </main>
  `;
}

function renderQuestionScreen() {
  const visibleQuestions = getVisibleQuestions();
  clampQuestionIndex();
  const question = visibleQuestions[appState.questionIndex];
  if (!question) {
    return renderHomeScreen();
  }

  const currentStep = appState.questionIndex + 1;
  const progress = Math.round((currentStep / visibleQuestions.length) * 100);
  const isAgeQuestion = question.id === "age";
  const ageValue = appState.ui.ageDraft || appState.answers.age || "";

  const optionsMarkup = isAgeQuestion
    ? `
      <div class="age-input-block">
        <label for="ageInput" class="visually-hidden">年齢</label>
        <input
          id="ageInput"
          class="age-input"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          enterkeyhint="next"
          placeholder="例 29"
          maxlength="3"
          value="${escapeHtml(ageValue)}"
          data-role="age-input"
          aria-describedby="ageError"
        />
        <div id="ageError" class="form-error" data-role="age-error" ${appState.ui.ageError ? "" : "hidden"}>
          ${escapeHtml(appState.ui.ageError)}
        </div>
      </div>
    `
    : `
      <div class="option-list" role="radiogroup" aria-label="${escapeHtml(question.title)}">
        ${question.options
          .map((option) => {
            const selected = appState.answers[question.id] === option.value;
            return `
              <button
                class="option-card ${selected ? "is-selected" : ""}"
                type="button"
                data-action="pick-option"
                data-question="${question.id}"
                data-value="${option.value}"
                role="radio"
                aria-checked="${selected}"
              >
                <span class="option-icon" aria-hidden="true">${option.icon}</span>
                <span>
                  <span class="option-title">${option.label}</span>
                  <span class="option-sub">${option.sub}</span>
                </span>
                <span class="option-check" aria-hidden="true"></span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;

  return `
    <main class="screen-container">
      <section class="question-shell">
        <div class="progress-block">
          <div class="screen-topbar">
            <button class="icon-button" data-action="question-back">← もどる</button>
            <span class="pill">${currentStep} / ${visibleQuestions.length}</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>

        <article class="card question-stage">
          <div class="question-panel">
            <div class="question-meta">Q ${String(currentStep).padStart(2, "0")}</div>
            <h1 class="question-title">${question.title}</h1>
            <p class="question-sub">${question.subtitle}</p>
          </div>

          <div class="question-panel">${optionsMarkup}</div>

          ${
            isAgeQuestion
              ? `
                <div class="question-footer">
                  <button class="button button--primary" data-action="question-next">つぎへ進む</button>
                </div>
              `
              : ""
          }
        </article>
      </section>
    </main>
  `;
}

function renderLoadingScreen() {
  return `
    <main class="screen-container">
      <section class="card loading-card">
        <div class="loading-spinner" aria-hidden="true"></div>
        <div class="eyebrow" style="color: var(--brand);">Estimating</div>
        <h1 class="question-title" style="color: var(--text); font-size: clamp(1.8rem, 8vw, 2.4rem);">あなたのパン史を概算中です</h1>
        <p class="body-text">いい感じに食パン換算しています。</p>
      </section>
    </main>
  `;
}

function renderResultScreen() {
  if (!appState.estimate) {
    return renderHomeScreen();
  }

  const total = appState.estimate.total;
  const extras = getResultExtras(total);

  return `
    <main class="screen-container">
      <section class="result-layout">
        <article class="card result-card">
          <span class="badge">結果</span>
          <div class="result-heading">あなたのこれまでのパン枚数</div>
          <div class="result-number" data-counter="${total}">${formatNumber(total)}</div>
          <div class="result-unit">枚（食パン換算）</div>
          <p class="result-comment">${appState.estimate.comment}</p>

          <section class="result-reading">
            <div class="eyebrow" style="color: var(--text-soft);">数字を別の見方で見ると</div>
            <div class="stats-grid result-facts-grid">
              <article class="card card--soft stat-card result-fact-card">
                <div class="stat-label result-fact-label">ざっくり換算すると</div>
                <div class="stat-value result-fact-value">食パン ${extras.loafKinLabel} ぶん</div>
              </article>
              <article class="card card--soft stat-card result-fact-card">
                <div class="stat-label result-fact-label">積み重ねると</div>
                <div class="stat-value result-fact-value">約 ${extras.stackLabel}</div>
              </article>
              <article class="card card--soft stat-card result-fact-card">
                <div class="stat-label result-fact-label">原料にすると</div>
                <div class="stat-value result-fact-value">小麦 ${extras.wheatLabel} くらい</div>
              </article>
            </div>
          </section>

          <div class="result-actions">
            <button class="button button--primary" data-action="nav" data-screen="records">今日以降のパンを記録する</button>
          </div>

          <section class="share-section">
            <div class="eyebrow" style="color: var(--text-soft);">シェア</div>
            <div class="share-actions share-actions--compact" style="margin-top: 14px;">
              <button class="share-button" data-action="share-x">Xでシェア</button>
            <button class="share-button" data-action="share-copy">テキストをコピー</button>
              <button class="share-button" data-action="share-native">共有する</button>
            </div>
          </section>

          <div class="stack-row" style="margin-top: 14px;">
            <button class="button button--ghost" data-action="nav" data-screen="settings">設定 / リセット</button>
            <button class="button button--ghost" data-action="restart-estimate">最初からやり直す</button>
          </div>
        </article>
      </section>
    </main>
  `;
}

function renderRecordsScreen() {
  if (!appState.estimate) {
    return renderHomeScreen();
  }

  const total = getCurrentTotal();
  const todaySummary = getTodaySummary(appState.history);
  const recentHistory = appState.history.slice(0, 10);
  return `
    <main class="screen-container">
      <section class="records-stack">
        <article class="card today-log-card">
          <div class="eyebrow" style="color: var(--text-soft);">今日の記録</div>
          <h1 class="counter-heading" style="margin: 10px 0 4px;">今日のパン</h1>
          <div class="today-total" data-counter="${todaySummary.total}">${formatDisplayNumber(todaySummary.total)}</div>
          <div class="today-unit">枚</div>
          ${
            todaySummary.entries.length
              ? `
                <p class="body-text" style="margin-top: 12px;">${escapeHtml(formatTodaySummary(todaySummary.entries))}</p>
                <div class="today-tags">
                  ${todaySummary.entries
                    .slice(0, 4)
                    .map(
                      (item) =>
                        `<span class="today-tag">${escapeHtml(item.label)} +${formatMaybeDecimal(item.delta)}</span>`,
                    )
                    .join("")}
                  ${todaySummary.entries.length > 4 ? `<span class="today-tag">ほか${todaySummary.entries.length - 4}件</span>` : ""}
                </div>
              `
              : `<p class="body-text" style="margin-top: 12px;">今日はまだ記録していません。</p>`
          }
        </article>

        <div class="records-main-grid">
          <article class="card counter-card">
            <div class="eyebrow" style="color: var(--text-soft);">クイック記録</div>
            <h2 class="counter-heading" style="margin: 8px 0 6px;">今日食べたパンを足す</h2>
            <p class="screen-subcopy">食パン1枚を主ボタンにして、今日ぶんをすぐ記録できます。</p>

            <div class="add-grid" style="margin-top: 16px;">
              ${ADD_OPTIONS.map(
                (item) => `
                  <button class="add-button ${item.primary ? "add-button--primary" : ""}" data-action="add-count" data-item="${item.id}">
                    <span class="add-button__delta">+${formatMaybeDecimal(item.delta)}</span>
                    <span class="add-button__emoji" aria-hidden="true">${item.icon}</span>
                    <span class="add-button__title">${item.label}</span>
                    <span class="add-button__sub">${item.sub}</span>
                  </button>
                `,
              ).join("")}
            </div>
          </article>

          <article class="card counter-card history-card">
            <div class="eyebrow" style="color: var(--text-soft);">最近の記録</div>
            <h2 class="counter-heading" style="margin: 8px 0 6px;">直近の追加</h2>
            ${
              recentHistory.length
                ? `
                  <div class="history-list" style="margin-top: 12px;">
                    ${recentHistory
                      .map(
                        (item) => `
                          <div class="history-item">
                            <div class="history-info">
                              <div class="history-emoji">${item.icon}</div>
                              <div>
                                <div class="history-name">${item.label}</div>
                                <div class="history-date">${formatHistoryTimestamp(item.timestamp)}</div>
                              </div>
                            </div>
                            <div class="history-value">+${formatMaybeDecimal(item.delta)}</div>
                          </div>
                        `,
                      )
                      .join("")}
                  </div>
                `
                : `<p class="history-empty" style="margin-top: 12px;">まだ記録はありません。まずは今日のパンからどうぞ。</p>`
            }
          </article>
        </div>

        <article class="card counter-card summary-card">
          <div class="eyebrow" style="color: var(--text-soft);">累計サマリー</div>
          <h2 class="counter-heading" style="margin: 8px 0 6px;">いまの合計</h2>
          <div class="summary-grid" style="margin-top: 16px;">
            <div class="summary-stat">
              <div class="summary-stat__label">現在累計</div>
              <div class="summary-stat__value" data-counter="${total}">${formatDisplayNumber(total)}</div>
              <div class="summary-stat__unit">枚</div>
            </div>
            <div class="summary-stat">
              <div class="summary-stat__label">診断結果</div>
              <div class="summary-stat__value" data-counter="${appState.estimate.total}">${formatNumber(appState.estimate.total)}</div>
              <div class="summary-stat__unit">枚</div>
            </div>
            <div class="summary-stat">
              <div class="summary-stat__label">記録で増えたぶん</div>
              <div class="summary-stat__value" data-counter="${appState.futureCount}">${formatDisplayNumber(appState.futureCount)}</div>
              <div class="summary-stat__unit">枚</div>
            </div>
          </div>
        </article>
      </section>
    </main>
  `;
}

function renderSettingsScreen() {
  const hasEstimate = Boolean(appState.estimate);
  const answeredCount = Object.entries(appState.answers).filter(([, value]) => Boolean(value)).length;

  return `
    <main class="screen-container">
      <section class="settings-grid">
        <article class="card settings-card">
          <div class="eyebrow" style="color: var(--text-soft);">現在保存されているデータ</div>
          <h1 class="settings-heading" style="margin: 10px 0 4px;">保存状況</h1>
          <div class="storage-row">
            <div class="storage-key">回答済み状態</div>
            <div class="storage-value">${answeredCount} / ${QUESTION_DEFS.length}</div>
          </div>
          <div class="storage-row">
            <div class="storage-key">推定結果</div>
            <div class="storage-value ${hasEstimate ? "storage-value--accent" : ""}">${hasEstimate ? `${formatNumber(appState.estimate.total)}枚` : "未作成"}</div>
          </div>
          <div class="storage-row">
            <div class="storage-key">記録分</div>
            <div class="storage-value">${formatDisplayNumber(appState.futureCount)}枚</div>
          </div>
          <div class="storage-row">
            <div class="storage-key">記録件数</div>
            <div class="storage-value">${appState.history.length}件</div>
          </div>
          <div class="storage-row">
            <div class="storage-key">最終更新</div>
            <div class="storage-value">${formatDateTime(appState.updatedAt)}</div>
          </div>
        </article>

        <div class="accordion">
          ${renderAccordionItem({
            id: "restart",
            icon: "↩",
            title: "最初からやり直す",
            sub: "質問回答と推定結果を作り直します",
            body:
              "回答内容、推定値、記録履歴をまとめて初期化し、質問フローの先頭に戻ります。もう一度推定し直したい時の操作です。",
            buttonLabel: "最初からやり直す",
            buttonClass: "button button--primary",
            action: "confirm-restart",
          })}
          ${renderAccordionItem({
            id: "future-reset",
            icon: "🧾",
            title: "記録だけリセット",
            sub: "推定結果は残して、記録ぶんだけ消します",
            body:
              "過去の推定値はそのままにして、記録ページで追加したぶんだけ 0 に戻します。結果は残したい時に使います。",
            buttonLabel: "記録分をリセット",
            buttonClass: "button button--ghost",
            action: "confirm-future-reset",
          })}
          ${renderAccordionItem({
            id: "all-reset",
            icon: "⚠️",
            title: "全データ削除",
            sub: "localStorage に保存された内容を全削除します",
            body:
              "回答、推定結果、記録、履歴、最終更新、画面状態を含めて完全に削除します。再訪導線も消えます。",
            buttonLabel: "全データを削除",
            buttonClass: "button button--danger",
            action: "confirm-all-reset",
            danger: true,
          })}
        </div>
      </section>
    </main>
  `;
}

function renderAccordionItem({ id, icon, title, sub, body, buttonLabel, buttonClass, action, danger = false }) {
  const isOpen = appState.ui.openAccordion === id;
  return `
    <article class="accordion-item ${danger ? "is-danger" : ""} ${isOpen ? "is-open" : ""}">
      <button class="accordion__header" data-action="toggle-accordion" data-id="${id}">
        <span class="accordion__left">
          <span class="accordion__icon" aria-hidden="true">${icon}</span>
          <span>
            <span class="accordion__title">${title}</span>
            <span class="accordion__sub">${sub}</span>
          </span>
        </span>
        <span class="accordion__chevron">⌄</span>
      </button>
      <div class="accordion__panel">
        <div class="accordion__panel-inner">
          <div class="accordion__body">
            <p>${body}</p>
            <button class="${buttonClass}" style="margin-top: 12px;" data-action="${action}">${buttonLabel}</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderToasts() {
  if (!appState.toasts.length) {
    return "";
  }
  return `
    <div class="toast-stack" aria-live="polite" aria-atomic="true">
      ${appState.toasts
        .map(
          (toast) => `
            <div class="toast">
              <span>${escapeHtml(toast.message)}</span>
              ${toast.accent ? `<span class="toast__accent">${escapeHtml(toast.accent)}</span>` : ""}
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function render() {
  const app = document.querySelector("#app");
  let screenMarkup = "";

  switch (appState.currentScreen) {
    case "questions":
      screenMarkup = renderQuestionScreen();
      break;
    case "loading":
      screenMarkup = renderLoadingScreen();
      break;
    case "result":
      screenMarkup = renderResultScreen();
      break;
    case "records":
      screenMarkup = renderRecordsScreen();
      break;
    case "settings":
      screenMarkup = renderSettingsScreen();
      break;
    case "home":
    default:
      screenMarkup = renderHomeScreen();
      break;
  }

  app.innerHTML = `
    <div class="app-shell">
      ${renderHeader()}
      ${screenMarkup}
      ${renderToasts()}
    </div>
  `;

  attachEvents();
  animateCounters();
}

function attachEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = event.currentTarget.dataset.action;
      switch (action) {
        case "start-estimate":
          beginEstimateFlow();
          break;
        case "resume-result":
          setScreen("result");
          break;
        case "resume-records":
          setScreen("records");
          break;
        case "nav":
          setScreen(event.currentTarget.dataset.screen);
          break;
        case "question-next":
          handleQuestionNext();
          break;
        case "question-back":
          handleQuestionBack();
          break;
        case "pick-option":
          answerQuestion(event.currentTarget.dataset.question, event.currentTarget.dataset.value, { autoAdvance: true });
          break;
        case "share-copy":
          copyShareText();
          break;
        case "share-native":
          nativeShare();
          break;
        case "share-x":
          openXShare();
          break;
        case "add-count":
          addFutureCount(event.currentTarget.dataset.item);
          break;
        case "toggle-accordion":
          toggleAccordion(event.currentTarget.dataset.id);
          break;
        case "confirm-restart":
          if (window.confirm("質問回答と推定結果を初期化して、最初からやり直しますか？")) {
            resetEstimateFlow();
          }
          break;
        case "confirm-future-reset":
          if (window.confirm("記録ページで追加した内容と履歴だけをリセットしますか？")) {
            resetFutureOnly();
          }
          break;
        case "confirm-all-reset":
          if (window.confirm("保存されている全データを削除しますか？この操作は戻せません。")) {
            resetAllData();
          }
          break;
        case "restart-estimate":
          if (window.confirm("現在の回答と結果を消して、最初からやり直しますか？")) {
            resetEstimateFlow();
          }
          break;
        default:
          break;
      }
    });
  });

  const ageInput = document.querySelector("[data-role='age-input']");
  if (ageInput) {
    ageInput.addEventListener("input", (event) => {
      updateAgeDraft(event.currentTarget.value, event.currentTarget);
    });
    ageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleQuestionNext();
      }
    });
  }
}

function focusAgeInput() {
  const ageInput = document.querySelector("[data-role='age-input']");
  if (ageInput) {
    ageInput.focus();
    ageInput.setSelectionRange(ageInput.value.length, ageInput.value.length);
  }
}

function animateCounters() {
  document.querySelectorAll("[data-counter]").forEach((element) => {
    const target = Number(element.dataset.counter);
    if (!Number.isFinite(target)) {
      return;
    }

    const previous = Number(element.dataset.renderedCounter);
    if (previous === target) {
      return;
    }

    const start = Number.isFinite(previous) ? previous : 0;
    const duration = 700;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const rawValue = start + (target - start) * eased;
      const current = Number.isInteger(target) ? Math.round(rawValue) : roundToHalf(rawValue);
      element.textContent = formatDisplayNumber(current);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        element.textContent = formatDisplayNumber(target);
        element.dataset.renderedCounter = String(target);
      }
    };

    window.requestAnimationFrame(tick);
  });
}

if (typeof document !== "undefined") {
  render();
}

export {
  ADD_OPTIONS,
  BURGER_BONUS,
  PERIODS,
  QUESTION_DEFS,
  SANDWICH_BONUS,
  WEEKLY_VALUES,
  buildShareText,
  calculateEstimate,
  getPeriodYears,
  getResultExtras,
  getRecentCorrectionYears,
  getVisibleQuestionIds,
  roundToHalf,
};
