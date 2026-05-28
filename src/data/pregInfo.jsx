export const PREG_INFO_SECTIONS = [
  {
    id: "fertility",
    title: "Fertility & Cycle",
    emoji: "🌸",
    color: "#DB2777",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          Your menstrual cycle is your body's monthly process of preparing for a possible pregnancy. Understanding it helps you know your body better.
        </p>
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontWeight: 700, marginBottom: '8px' }}>How the cycle works:</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>A typical cycle lasts about <strong>21–35 days</strong> (28 days is the average)</li>
            <li><strong>Ovulation</strong> — when an egg is released — usually happens around the middle of your cycle</li>
            <li>Sperm can survive in the body for up to <strong>5 days</strong></li>
            <li>You are most likely to get pregnant in the <strong>5 days before ovulation</strong> and the day of ovulation</li>
          </ul>
        </div>
        <div style={{ padding: '12px 16px', background: 'rgba(219,39,119,0.07)', borderRadius: '12px' }}>
          <p style={{ fontWeight: 700, color: '#DB2777', marginBottom: '4px' }}>⚠️ Important</p>
          <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
            Cycle tracking alone is <strong>not a reliable contraception method.</strong> Cycles can be irregular, especially during stress, illness, or weight changes. Always use a proper contraceptive method to prevent unwanted pregnancy.
          </p>
        </div>
      </>
    )
  },
  {
    id: "contraception",
    title: "Contraception Basics",
    emoji: "🩺",
    color: "#7C3AED",
    content: (
      <>
        <p style={{ marginBottom: '14px', lineHeight: 1.7 }}>
          Contraception prevents pregnancy. There are many options — the best one depends on your health, lifestyle, and needs. All options below are available in Zimbabwe.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: '🛡️', label: 'Condoms (Male & Female)', desc: 'The only method that ALSO protects against STIs including HIV. Use every time.', eff: '98% effective when used correctly' },
            { icon: '💊', label: 'Daily Pill (Combined or POP)', desc: 'A pill taken every day to prevent ovulation. Must be taken consistently.', eff: '99% effective with perfect use' },
            { icon: '💉', label: 'Injectable (Depo-Provera)', desc: 'A hormone injection given every 1–3 months at a clinic. No daily effort needed.', eff: '99% effective' },
            { icon: '🔩', label: 'Implant', desc: 'A small rod inserted under the skin of your arm. Lasts up to 3–5 years.', eff: '99%+ effective' },
            { icon: '🔷', label: 'IUD (Copper or Hormonal)', desc: 'A small device placed inside the uterus by a healthcare provider. Lasts years.', eff: '99%+ effective' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '12px 14px', background: 'var(--color-bg-surface)', borderRadius: '12px', borderLeft: '3px solid #DB2777' }}>
              <p style={{ fontWeight: 700, marginBottom: '3px', fontSize: '14px' }}>{item.icon} {item.label}</p>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '3px' }}>{item.desc}</p>
              <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#059669' }}>✅ {item.eff}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
          💡 Talk to a nurse or doctor at your nearest clinic — contraception is free at government health facilities in Zimbabwe.
        </p>
      </>
    )
  },
  {
    id: "early-signs",
    title: "Early Signs",
    emoji: "🤰",
    color: "#D97706",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          Early pregnancy signs can feel like other things — stress, illness, or period changes. Here's what to look out for:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {[
            { icon: '❌', sign: 'Missed period', desc: 'The most common early sign. If your period is late, take a test.' },
            { icon: '🤢', sign: 'Nausea', desc: 'Often called "morning sickness" — but it can happen any time of day.' },
            { icon: '😴', sign: 'Unusual tiredness', desc: 'Feeling exhausted even without doing much. Caused by rising progesterone.' },
            { icon: '🩺', sign: 'Tender or swollen breasts', desc: 'Breasts may feel sore, heavy, or sensitive.' },
            { icon: '🚽', sign: 'Frequent urination', desc: 'Needing to pee more than usual.' },
            { icon: '🍋', sign: 'Food cravings or aversions', desc: 'Suddenly loving or hating certain foods or smells.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 14px', background: 'var(--color-bg-surface)', borderRadius: '10px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '2px', fontSize: '13.5px' }}>{item.sign}</p>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 16px', background: 'rgba(217,119,6,0.08)', borderRadius: '12px' }}>
          <p style={{ fontWeight: 700, color: '#D97706', marginBottom: '4px' }}>🔬 How to confirm</p>
          <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
            A home pregnancy test from any pharmacy is quick and accurate. A clinic can confirm with a urine or blood test. If you think you may be pregnant, test as early as possible.
          </p>
        </div>
      </>
    )
  },
  {
    id: "emergency",
    title: "Emergency Contraception",
    emoji: "⏰",
    color: "#d93838",
    content: (
      <>
        <p style={{ marginBottom: '14px', lineHeight: 1.7 }}>
          Emergency contraception (EC) helps prevent pregnancy <strong>after</strong> unprotected sex. It is not an abortion pill — it works by preventing a pregnancy from starting.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
          <div style={{ padding: '14px', background: 'rgba(220,38,38,0.06)', borderRadius: '12px', borderTop: '3px solid #d93838' }}>
            <p style={{ fontWeight: 800, color: '#d93838', marginBottom: '6px' }}>💊 The Morning-After Pill (e.g., Postinor-2)</p>
            <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0, fontSize: '13px' }}>
              <li>Take within <strong>72 hours (3 days)</strong> of unprotected sex</li>
              <li>The sooner you take it, the more effective it is</li>
              <li>Available at pharmacies and clinics without a prescription</li>
            </ul>
          </div>
          <div style={{ padding: '14px', background: 'rgba(5,150,105,0.06)', borderRadius: '12px', borderTop: '3px solid var(--color-primary)' }}>
            <p style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '6px' }}>🔷 Copper IUD</p>
            <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0, fontSize: '13px' }}>
              <li>Can be inserted within <strong>5 days</strong> of unprotected sex</li>
              <li>More than 99% effective as emergency contraception</li>
              <li>Can remain in place as ongoing contraception for up to 10 years</li>
            </ul>
          </div>
        </div>
        <div style={{ padding: '12px 16px', background: 'rgba(217,119,6,0.08)', borderRadius: '12px' }}>
          <p style={{ fontWeight: 700, marginBottom: '4px' }}>⚠️ Remember</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0, fontSize: '13px' }}>
            <li>EC does <strong>not</strong> protect against HIV or STIs</li>
            <li>EC is for emergencies — not for regular use</li>
            <li>It is not 100% effective, especially if taken late</li>
          </ul>
        </div>
      </>
    )
  },
  {
    id: "myths",
    title: "Myths vs Facts",
    emoji: "🤔",
    color: "#0891B2",
    content: (
      <>
        <p style={{ marginBottom: '14px', lineHeight: 1.7 }}>
          Misinformation about pregnancy is common. Here are the facts behind the most common myths:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              myth: "You can't get pregnant the first time you have sex.",
              fact: "You absolutely can. Pregnancy is possible any time unprotected sex occurs, including the very first time."
            },
            {
              myth: "Washing or douching after sex prevents pregnancy.",
              fact: "Sperm reach the uterus within minutes. Washing afterwards has no effect on preventing pregnancy."
            },
            {
              myth: "The pull-out method is safe and reliable.",
              fact: "Pre-ejaculate (pre-cum) can contain active sperm. The pull-out method has a high failure rate and is not reliable."
            },
            {
              myth: "You can't get pregnant while breastfeeding.",
              fact: "Breastfeeding reduces but does not eliminate the risk of pregnancy. Contraception is still needed."
            },
            {
              myth: "Contraception causes infertility.",
              fact: "Modern contraception is safe and does not affect future fertility. Fertility usually returns shortly after stopping most methods."
            },
            {
              myth: "You can tell if someone is pregnant by looking at them.",
              fact: "Pregnancy cannot be seen or felt by others in early stages. Only a test can confirm it."
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: '12px 14px', background: 'var(--color-bg-surface)', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', color: '#d93838', marginBottom: '6px' }}>❌ <em><strong>Myth:</strong> {item.myth}</em></p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>✅ <strong>Fact:</strong> {item.fact}</p>
            </div>
          ))}
        </div>
      </>
    )
  }
];
