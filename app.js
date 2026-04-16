const STORAGE_KEY = "pan-nanmaitter:v1";

const QUESTION_DEFS = [
  {
    id: "age",
    type: "age",
    number: "Q1",
    title: "今、何歳ですか？",
    subtitle: "MVPでは 7歳以上を対象にしています。年齢は年単位で入力してください。",
  },
  {
    id: "childhood",
    type: "choice",
    number: "Q2",
    title: "小学生くらいのころ、パンはどれくらい食べていましたか？",
    subtitle: "6〜12歳ごろの朝食や給食以外の軽食も含めた感覚で大丈夫です。",
    minAge: 7,
    options: [
      { value: "rare", label: "ほぼ食べなかった", sub: "かなりごはん派", icon: "🍚" },
      { value: "light", label: "週1〜2回くらい", sub: "たまに食べる", icon: "🍞" },
      { value: "medium", label: "週3〜5回くらい", sub: "わりと身近だった", icon: "🥐" },
      { value: "heavy", label: "かなりよく食べていた", sub: "パン多めの時期", icon: "🥪" },
    ],
  },
  {
    id: "teen",
    type: "choice",
    number: "Q3",
    title: "中高生くらいのころ、パンはどれくらい食べていましたか？",
    subtitle: "購買のパンや昼食の軽食も含めて、週あたりの体感で選んでください。",
    minAge: 13,
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
    number: "Q4",
    title: "19〜25歳くらいのころ、パンはどれくらい食べていましたか？",
    subtitle: "朝食、ランチ、軽食をまとめたざっくりの感覚で大丈夫です。",
    minAge: 19,
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
    number: "Q5",
    title: "26歳以降、今に近い食生活ではパンをどれくらい食べていますか？",
    subtitle: "今の傾向にいちばん近いものを選んでください。",
    minAge: 26,
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
    number: "Q6",
    title: "最近、サンドイッチ・惣菜パン・菓子パンはどれくらい食べますか？",
    subtitle: "補正として扱います。最近の体感に近いものを選んでください。",
    minAge: 7,
    options: [
      { value: "rare", label: "ほぼ食べない", sub: "補正なし", icon: "🍽️" },
      { value: "light", label: "たまに食べる", sub: "軽め補正", icon: "🥪" },
      { value: "heavy", label: "よく食べる", sub: "しっかり補正", icon: "🥐" },
    ],
  },
  {
    id: "burger",
    type: "choice",
    number: "Q7",
    title: "最近、バーガー・ホットドッグ系はどれくらい食べますか？",
    subtitle: "たまのファストフードも含めた体感で選んでください。",
    minAge: 7,
    options: [
      { value: "rare", label: "ほぼ食べない", sub: "補正なし", icon: "🥗" },
      { value: "light", label: "たまに食べる", sub: "軽め補正", icon: "🍔" },
      { value: "heavy", label: "わりと食べる", sub: "強め補正", icon: "🌭" },
    ],
  },
];

const PERIODS = [
  { id: "childhood", label: "6〜12歳", from: 6, to: 12 },
  { id: "teen", label: "13〜18歳", from: 13, to: 18 },
  { id: "youngAdult", label: "19〜25歳", from: 19, to: 25 },
  { id: "adult", label: "26歳以降", from: 26, to: null },
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
    childhood: "",
    teen: "",
    youngAdult: "",
    adult: "",
    sandwich: "",
    burger: "",
  },
  visibleQuestionIds: ["age", "childhood", "sandwich", "burger"],
  estimate: null,
  futureCount: 0,
  history: [],
  updatedAt: null,
  hasSavedData: false,
  toasts: [],
  loadingEstimate: false,
  ui: {
    ageError: "",
    openAccordion: "",
  },
};

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
    const answers = { ...fallback.answers, ...(parsed.answers || {}) };
    const state = {
      ...fallback,
      ...parsed,
      answers,
      ui: { ...fallback.ui, ...(parsed.ui || {}) },
      toasts: [],
      loadingEstimate: false,
    };
    state.visibleQuestionIds = getVisibleQuestionIds(Number.parseInt(answers.age, 10) || 0);
    state.hasSavedData = Boolean(parsed.estimate || parsed.futureCount || hasAnyAnswer(answers));
    state.currentScreen = sanitizeScreen(state.currentScreen, state);
    state.lastCompletedScreen = sanitizeScreen(state.lastCompletedScreen, state);
    return state;
  } catch (_error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return fallback;
  }
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
    available.add("counter");
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
    hasSavedData: Boolean(appState.estimate || appState.futureCount || hasAnyAnswer(appState.answers)),
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

function getVisibleQuestionIds(age) {
  const ids = ["age"];
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
  if (age >= 7) {
    ids.push("sandwich", "burger");
  }
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
  appState.currentScreen = sanitizeScreen(screen, appState);
  if (screen !== "loading") {
    appState.lastCompletedScreen = appState.currentScreen;
  }
  persistState();
  render();
}

function updateAge(value) {
  const digits = value.replace(/[^\d]/g, "").slice(0, 3);
  appState.answers.age = digits;
  const age = Number.parseInt(digits, 10) || 0;
  appState.visibleQuestionIds = getVisibleQuestionIds(age);
  clampQuestionIndex();
  appState.ui.ageError = "";
  appState.updatedAt = new Date().toISOString();
  persistState();
  render();
}

function answerQuestion(questionId, value) {
  appState.answers[questionId] = value;
  appState.updatedAt = new Date().toISOString();
  persistState();
  render();
}

function goToQuestion(index) {
  appState.questionIndex = index;
  clampQuestionIndex();
  appState.currentScreen = "questions";
  persistState();
  render();
}

function handleQuestionNext() {
  const visibleQuestions = getVisibleQuestions();
  const question = visibleQuestions[appState.questionIndex];
  if (!question) {
    return;
  }
  if (question.id === "age") {
    const age = Number.parseInt(appState.answers.age, 10);
    if (!Number.isFinite(age)) {
      appState.ui.ageError = "年齢を入力してください";
      render();
      return;
    }
    if (age < 7) {
      appState.ui.ageError = "現在のMVPは7歳以上向けです。7歳以上に修正してください。";
      render();
      return;
    }
    appState.visibleQuestionIds = getVisibleQuestionIds(age);
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
  if (appState.questionIndex === 0) {
    setScreen("home");
    return;
  }
  appState.questionIndex -= 1;
  persistState();
  render();
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

function calculateEstimate(answers) {
  const age = Number.parseInt(answers.age, 10);
  if (!Number.isFinite(age) || age < 7) {
    return null;
  }

  const breakdown = PERIODS.map((period) => {
    const years = getPeriodYears(age, period.from, period.to);
    const weekly = WEEKLY_VALUES[answers[period.id]] ?? 0;
    const subtotal = years * 52 * weekly;
    return {
      ...period,
      years,
      weekly,
      subtotal,
    };
  });

  const postTeenYears = breakdown
    .filter((period) => period.id !== "childhood")
    .reduce((sum, period) => sum + period.years, 0);

  const sandwichBonusWeekly = SANDWICH_BONUS[answers.sandwich] ?? 0;
  const burgerBonusWeekly = BURGER_BONUS[answers.burger] ?? 0;
  const sandwichBonus = postTeenYears * 52 * sandwichBonusWeekly;
  const burgerBonus = postTeenYears * 52 * burgerBonusWeekly;

  const baseTotal = breakdown.reduce((sum, period) => sum + period.subtotal, 0);
  const total = Math.max(0, Math.round(baseTotal + sandwichBonus + burgerBonus));
  const lower = Math.max(0, Math.round(total * 0.8));
  const upper = Math.max(lower, Math.round(total * 1.25));

  const result = {
    total,
    range: { lower, upper },
    breakdown: breakdown.map((period) => ({
      id: period.id,
      label: period.label,
      years: period.years,
      weekly: period.weekly,
      subtotal: Math.round(period.subtotal),
    })),
    corrections: {
      sandwichWeekly: sandwichBonusWeekly,
      sandwichTotal: Math.round(sandwichBonus),
      burgerWeekly: burgerBonusWeekly,
      burgerTotal: Math.round(burgerBonus),
      postTeenYears,
    },
  };

  result.comment = getResultComment(result);
  result.shareText = buildShareText(result);
  return result;
}

function getResultComment(result) {
  const total = result.total;
  const sandwich = result.corrections.sandwichTotal;
  const burger = result.corrections.burgerTotal;
  if (sandwich >= 450 && sandwich > burger) {
    return "サンド系を含めるとしっかり増えます。軽食の積み重ね、あなどれません。";
  }
  if (burger >= 220 && burger >= sandwich) {
    return "バーガー系の寄与が効いています。自覚より小麦寄りの人生でした。";
  }
  if (total >= 7000) {
    return "思ったよりかなりパンです。人生をパン換算すると、かなりの厚みがあります。";
  }
  if (total <= 1800) {
    return "ごはん派でも意外と積み上がっています。控えめでも、ちゃんとパン史があります。";
  }
  if (total >= 4200) {
    return "軽食の積み重ね、あなどれません。気づかないうちにかなり増えています。";
  }
  return "多いのか少ないのか少し迷う、ちょうどパン的な人生です。";
}

function buildShareText(result) {
  const formattedTotal = formatNumber(result.total);
  const variants = [
    `私のこれまでのパン枚数、${formattedTotal}枚でした。\n${result.comment.replace(/。/g, "。")}\n#パン何枚ったー`,
    `今までに食べたパンを概算したら ${formattedTotal}枚 でした。\n多いのか少ないのかもう分からない。\n#パン何枚ったー`,
  ];
  return result.total >= 5000 ? variants[0] : variants[1];
}

function runEstimate() {
  const result = calculateEstimate(appState.answers);
  if (!result) {
    showToast("回答を確認してください", "未完了");
    return;
  }
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
  }, 850);
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
  ].slice(0, 12);
  appState.updatedAt = new Date().toISOString();
  persistState();
  showToast(`${item.label} を追加`, `+${formatMaybeDecimal(item.delta)}枚`);
  render();
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function resetEstimateFlow() {
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
  persistState();
  render();
}

function resetFutureOnly() {
  appState.futureCount = 0;
  appState.history = [];
  appState.updatedAt = new Date().toISOString();
  persistState();
  showToast("未来追加分をリセットしました", "0枚");
  render();
}

function resetAllData() {
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
  try {
    await navigator.clipboard.writeText(appState.estimate.shareText);
    showToast("シェア文をコピーしました", "コピー完了");
  } catch (_error) {
    showToast("コピーできませんでした", "未対応");
  }
}

async function nativeShare() {
  if (!appState.estimate) {
    return;
  }
  if (navigator.share) {
    try {
      await navigator.share({
        title: "パン何枚ったー",
        text: appState.estimate.shareText,
        url: window.location.href,
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
  const text = `${appState.estimate.shareText}\n${window.location.href}`;
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP").format(value);
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
          <div>
            <div class="brand-title">パン何枚ったー</div>
            <div class="brand-sub">フェルミ推定で、あなたの小麦史を可視化</div>
          </div>
        </div>
        <div class="header-actions">
          <span class="pill">🍞 フェルミ推定</span>
          ${
            canNavigate
              ? `
                <button class="nav-button ${appState.currentScreen === "result" ? "is-active" : ""}" data-action="nav" data-screen="result">結果</button>
                <button class="nav-button ${appState.currentScreen === "counter" ? "is-active" : ""}" data-action="nav" data-screen="counter">追加</button>
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
  const hasResult = Boolean(appState.estimate);
  return `
    <main class="screen-container screen-container--wide">
      <section class="hero-grid">
        <article class="card hero-card">
          <div class="row">
            <span class="badge">フェルミ推定</span>
            <span class="pill">登録不要</span>
            <span class="pill">localStorage保存</span>
          </div>
          <h1 class="hero-copy">
            <span class="hero-copy__sub">あなたの人生、</span>
            <span class="hero-copy__brand">パン</span>換算<br />
            してみよう。
          </h1>
          <p class="hero-desc">
            今まで食べてきたパン、だいたい何枚？<br />
            数問に答えるだけで、フェルミ推定で概算します。<br />
            過去は推定、未来は自分で追加カウント。
          </p>
          <div class="cta-row">
            <button class="button button--primary" data-action="start-estimate">🍞 推定スタート</button>
            ${
              hasResult
                ? `<button class="button button--ghost" data-action="resume-result">${
                    appState.futureCount > 0 ? "つづきから見る" : "前回の結果を見る"
                  }</button>`
                : ""
            }
            <div class="inline-note">
              所要時間 約1〜2分<br />
              思ったよりかなりパンです
            </div>
          </div>
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
              あなたの数字はもっと大きいかもしれません。
            </p>
            <span class="pill">サンプル値</span>
          </div>
        </aside>
      </section>

      <section class="feature-grid">
        <article class="card feature-card">
          <div class="feature-icon">💬</div>
          <div class="feature-title">数問に答えるだけ</div>
          <p class="feature-desc">読むより選ぶ体験を優先。年齢と食習慣を軽く答えるだけです。</p>
        </article>
        <article class="card feature-card">
          <div class="feature-icon">📐</div>
          <div class="feature-title">過去分をフェルミ推定</div>
          <p class="feature-desc">年代ごとにざっくり換算して、今までのパン枚数を一気に概算します。</p>
        </article>
        <article class="card feature-card">
          <div class="feature-icon">➕</div>
          <div class="feature-title">ここから先は実測</div>
          <p class="feature-desc">未来ぶんはワンタップ追加。あなたの小麦史はまだ伸びます。</p>
        </article>
      </section>

      <section class="sub-grid">
        <article class="card sub-card">
          <div class="section-title">どうでもいいことを、やたら本気で可視化する</div>
          <p class="sub-text">
            ただの診断でも、家計簿でもなく、数字を主役にした軽いプロダクトとしてまとめています。
            黒背景に生成りカード、オレンジ強調で全画面のトーンをそろえています。
          </p>
        </article>
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

      <div class="footer-note">© 2026 パン何枚ったー / 過去は推定、未来は実測</div>
    </main>
  `;
}

function renderQuestionScreen() {
  const visibleQuestions = getVisibleQuestions();
  clampQuestionIndex();
  const question = visibleQuestions[appState.questionIndex];
  const currentStep = appState.questionIndex + 1;
  const progress = Math.round((currentStep / visibleQuestions.length) * 100);
  if (!question) {
    return renderHomeScreen();
  }

  const optionsMarkup =
    question.type === "age"
      ? `
        <div class="age-input-block">
          <label for="ageInput" class="visually-hidden">年齢</label>
          <input
            id="ageInput"
            class="age-input"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="例 28"
            maxlength="3"
            value="${escapeHtml(appState.answers.age)}"
            data-role="age-input"
            aria-describedby="ageHelp ageError"
          />
          <div id="ageHelp" class="inline-note">7歳以上で入力してください。空欄のままは進めません。</div>
          ${
            appState.ui.ageError
              ? `<div id="ageError" class="form-error">${escapeHtml(appState.ui.ageError)}</div>`
              : ""
          }
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
          <div class="progress-meta">
            <span>表示対象の質問だけで進みます</span>
            <span>${progress}%</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="dots" style="margin-top: 12px;" aria-hidden="true">
            ${visibleQuestions
              .map((item, index) => {
                const classes =
                  index < appState.questionIndex
                    ? "dot is-done"
                    : index === appState.questionIndex
                      ? "dot is-current"
                      : "dot";
                return `<span class="${classes}"></span>`;
              })
              .join("")}
          </div>
        </div>

        <article class="card question-stage">
          <div class="question-panel">
            <div class="question-meta">${question.number}</div>
            <h1 class="question-title">${question.title}</h1>
            <p class="question-sub">${question.subtitle}</p>
          </div>

          <div class="question-panel">${optionsMarkup}</div>

          <div class="question-footer">
            <div class="inline-note">
              回答は保持されます。戻ると前の選択もそのまま見えます。
            </div>
            <button class="button button--primary" data-action="question-next">
              ${appState.questionIndex === visibleQuestions.length - 1 ? "推定を実行する" : "つぎへ進む"}
            </button>
          </div>
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
        <p class="body-text">年代ごとの食習慣と最近の補正をまとめて、食パン換算にしています。</p>
      </section>
    </main>
  `;
}

function renderResultScreen() {
  if (!appState.estimate) {
    return renderHomeScreen();
  }
  const total = appState.estimate.total;
  const breadLoaves = Math.max(1, Math.round(total / 20));
  const biggestPeriod = [...appState.estimate.breakdown].sort((a, b) => b.subtotal - a.subtotal)[0];

  return `
    <main class="screen-container">
      <section class="result-layout">
        <article class="card result-card">
          <span class="badge">推定完了</span>
          <div class="result-heading">あなたのこれまでのパン枚数</div>
          <div class="eyebrow" style="margin-top: 18px; color: var(--text-soft);">推定パン摂取枚数</div>
          <div class="result-number" data-counter="${total}">${formatNumber(total)}</div>
          <div class="result-unit">枚（食パン換算）</div>
          <div class="result-range">
            誤差レンジ: ${formatNumber(appState.estimate.range.lower)}〜${formatNumber(appState.estimate.range.upper)}枚くらい
          </div>
          <p class="result-comment">${appState.estimate.comment}</p>

          <div class="stats-grid">
            <article class="card card--soft stat-card">
              <div class="stat-icon">🥐</div>
              <div class="stat-value">${biggestPeriod ? formatNumber(biggestPeriod.subtotal) : "0"}</div>
              <div class="stat-label">いちばん厚かった時期<br />${biggestPeriod ? biggestPeriod.label : "データなし"}</div>
            </article>
            <article class="card card--soft stat-card">
              <div class="stat-icon">🍞</div>
              <div class="stat-value">${formatNumber(breadLoaves)}</div>
              <div class="stat-label">食パン1斤換算の目安<br />ざっくり ${breadLoaves} 斤</div>
            </article>
            <article class="card card--soft stat-card">
              <div class="stat-icon">➕</div>
              <div class="stat-value">${formatNumber(appState.estimate.corrections.sandwichTotal + appState.estimate.corrections.burgerTotal)}</div>
              <div class="stat-label">最近の補正由来<br />サンド系とバーガー系</div>
            </article>
          </div>

          <div class="result-actions">
            <button class="button button--primary" data-action="nav" data-screen="counter">➕ これからのパンを追加する</button>

            <div class="share-actions">
              <button class="share-button" data-action="share-x">𝕏 でシェア</button>
              <button class="share-button" data-action="share-copy">テキストをコピー</button>
              <button class="share-button" data-action="share-native">共有シート</button>
            </div>

            <article class="card card--soft share-preview-card" style="text-align:left;">
              <div class="eyebrow" style="color: var(--text-soft);">シェアプレビュー</div>
              <p class="body-text" style="white-space: pre-line; margin-top: 10px;">${escapeHtml(appState.estimate.shareText)}</p>
            </article>

            <div class="tab-row">
              <button class="tab-button" data-action="nav" data-screen="counter">未来追加</button>
              <button class="tab-button" data-action="nav" data-screen="settings">設定 / リセット</button>
              <button class="tab-button" data-action="restart-estimate">最初からやり直す</button>
            </div>
          </div>
        </article>

        <section class="sub-grid">
          ${appState.estimate.breakdown
            .filter((item) => item.years > 0)
            .map(
              (item) => `
                <article class="card sub-card">
                  <div class="eyebrow" style="color: var(--text-soft);">${item.label}</div>
                  <div class="section-title" style="margin-top: 8px;">${formatNumber(item.subtotal)}枚</div>
                  <p class="body-text" style="margin-top: 6px;">${item.years}年 × 52週 × 週${formatMaybeDecimal(item.weekly)}枚</p>
                </article>
              `,
            )
            .join("")}
        </section>
      </section>
    </main>
  `;
}

function renderCounterScreen() {
  if (!appState.estimate) {
    return renderHomeScreen();
  }
  const total = getCurrentTotal();
  return `
    <main class="screen-container">
      <section class="counter-grid">
        <div class="card summary-banner">
          <div class="counter-total__meta">ここから先は実測です</div>
          <div class="counter-total__value" data-counter="${total}">${formatNumber(total)}</div>
          <div class="counter-total__unit">枚（現在累計）</div>
          <p class="body-text">あなたの小麦史はまだ伸びます。今日のパンを足しておきましょう。</p>
          <div class="counter-breakdown">
            <div class="counter-breakdown__item">
              <div class="counter-breakdown__value">${formatNumber(appState.estimate.total)}</div>
              <div class="counter-breakdown__label">推定値</div>
            </div>
            <div class="counter-breakdown__divider" aria-hidden="true"></div>
            <div class="counter-breakdown__item">
              <div class="counter-breakdown__value">${formatMaybeDecimal(appState.futureCount)}</div>
              <div class="counter-breakdown__label">未来追加分</div>
            </div>
          </div>
        </div>

        <div class="counter-grid" style="grid-template-columns: 1fr;">
          <article class="card counter-card">
            <div class="eyebrow" style="color: var(--text-soft);">ワンタップ追加</div>
            <h2 class="counter-heading" style="margin: 8px 0 6px;">食べたぶんだけ足す</h2>
            <p class="screen-subcopy">毎日使わせる圧は出さず、たまに押したくなる軽さにしています。</p>

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
            <div class="eyebrow" style="color: var(--text-soft);">直近の追加</div>
            <h2 class="counter-heading" style="margin: 8px 0 6px;">最低限の履歴</h2>
            ${
              appState.history.length
                ? `
                  <div class="history-list" style="margin-top: 12px;">
                    ${appState.history
                      .map(
                        (item) => `
                          <div class="history-item">
                            <div class="history-info">
                              <div class="history-emoji">${item.icon}</div>
                              <div>
                                <div class="history-name">${item.label}</div>
                                <div class="history-date">${formatDateTime(item.timestamp)}</div>
                              </div>
                            </div>
                            <div class="history-value">+${formatMaybeDecimal(item.delta)}</div>
                          </div>
                        `,
                      )
                      .join("")}
                  </div>
                `
                : `<p class="history-empty" style="margin-top: 12px;">まだ追加はありません。まずは今日のパンからどうぞ。</p>`
            }
          </article>
        </div>
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
            <div class="storage-key">未来追加分</div>
            <div class="storage-value">${formatMaybeDecimal(appState.futureCount)}枚</div>
          </div>
          <div class="storage-row">
            <div class="storage-key">表示対象質問</div>
            <div class="storage-value">${appState.visibleQuestionIds.length}問</div>
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
              "回答内容、推定値、未来追加履歴をまとめて初期化し、質問フローの先頭に戻ります。もう一度推定し直したい時の操作です。",
            buttonLabel: "最初からやり直す",
            buttonClass: "button button--primary",
            action: "confirm-restart",
          })}
          ${renderAccordionItem({
            id: "future-reset",
            icon: "🧾",
            title: "未来追加カウントだけリセット",
            sub: "推定結果は残して、追加ぶんだけ消します",
            body:
              "過去の推定値はそのままにして、ここから先の実測ぶんだけ 0 に戻します。結果画面は維持したい時に使います。",
            buttonLabel: "未来追加分をリセット",
            buttonClass: "button button--ghost",
            action: "confirm-future-reset",
          })}
          ${renderAccordionItem({
            id: "all-reset",
            icon: "⚠️",
            title: "全データ削除",
            sub: "localStorage に保存された内容を全削除します",
            body:
              "回答、推定結果、未来追加、履歴、最終更新、画面状態を含めて完全に削除します。再訪導線も消えます。",
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
    case "counter":
      screenMarkup = renderCounterScreen();
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
          appState.currentScreen = "questions";
          appState.lastCompletedScreen = "questions";
          appState.questionIndex = 0;
          persistState();
          render();
          focusAgeInput();
          break;
        case "resume-result":
          setScreen(appState.futureCount > 0 ? "counter" : "result");
          break;
        case "nav":
          setScreen(event.currentTarget.dataset.screen);
          break;
        case "question-next":
          handleQuestionNext();
          if (appState.currentScreen === "questions") {
            focusAgeInput();
          }
          break;
        case "question-back":
          handleQuestionBack();
          focusAgeInput();
          break;
        case "pick-option":
          answerQuestion(event.currentTarget.dataset.question, event.currentTarget.dataset.value);
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
          if (window.confirm("未来追加カウントと履歴だけをリセットしますか？")) {
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
      updateAge(event.currentTarget.value);
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
      const current = Math.round(start + (target - start) * eased);
      element.textContent = formatNumber(current);
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        element.textContent = formatNumber(target);
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
  getVisibleQuestionIds,
  roundToHalf,
};
