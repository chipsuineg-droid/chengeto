const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

// ── 1. Replace BOT_KNOWLEDGE with full clinical scenario engine ───────────────
const BOT_FIND = `const BOT_KNOWLEDGE = {
  prep: "Daily Oral PrEP is a highly effective pill (99% prevention rate) to protect against HIV before exposure. It is 100% FREE at UZ Health Centre, Parirenyatwa, and public clinics. Common side effects are mild nausea which fades in 2 weeks.",
  pep: "PEP (Post-Exposure Prophylaxis) is emergency HIV medication. You MUST start it within 72 hours of possible exposure. It is a 28-day course of pills. Go to Parirenyatwa A&E or Harare Hospital A&E immediately : it is free and available 24/7.",
  condom: "Condoms (male & female) are the ONLY dual-protection method, meaning they prevent BOTH HIV and pregnancy at the same time. You can pick up free packs anonymously using our commodity simulator at student clinics.",
  cost: "Most HIV and pregnancy prevention methods (like condoms, PrEP, implants, and injections) are 100% FREE at government clinics and university student health clinics in Zimbabwe.",
  side_effects: "Most methods have minor side effects. Oral pills/PrEP might cause mild nausea for the first 2 weeks. Implants and injections might cause irregular bleeding or spotting. Speak to a doctor if side effects persist.",
  shona: "Mhoro! Chengeto ndiyo nzira yako yekudzivirira HIV pamwe nekudzivisa kubata pamuviri pasina kurongeka. Kuti uzive zvakawanda, nyora mazwi akadai sekuti: 'prep', 'pep', 'condom', kana 'clinic'.",
  pamuviri: "Kudzivirira kubata pamuviri (contraception) kune nzira dzakawanda dzemahara: short-term (pill, condoms), medium-term (injectable Depo every 3 months), and long-term (implants kwemakore 3, Copper IUD kwemakore 10). Mhanya muende ku clinic yepedyo kunoziva yakakukwanirai.",
  dziviriro: "Chengeto inokubatsira kudzivirira HIV. Pane nzira dzinoti PrEP (kudzivirira usati wasangana nehutachiwana), PEP (kudzivirira kana uchinge wasangana nehutachiwana usingafungiri mukati memaawa 72), nema condoms (anodzivirira HIV nemimba panguva imwe chete).",
  clinic: "Unogona kuwana rubatsiro rwakazara pa UZ Student Health Centre, NUST Student Clinic, MSU Health Services, kana Parirenyatwa Hospital. Tarisa tab yedu inoti '📍 Services' kutiona dziri pedyo newe."
};`;

const BOT_REPLACE = `// ── CHENGETO BOT: Clinical Scenario Engine ─────────────────────────────────
// Scores each response by how many keywords/patterns it matches.
// Handles real sentences like "I slept with a sex worker yesterday."

const BOT_RESPONSES = [
  // ── PEP / Exposure emergencies (HIGHEST priority) ──────────────────────────
  {
    id: "pep_emergency",
    triggers: [
      /slept with (a |my |his |her )?(sex worker|prostitute|stranger|someone i don|one night)/i,
      /had (unprotected )?(sex|intercourse) (with|yesterday|last night|today)/i,
      /condom (broke|burst|slipped|came off)/i,
      /exposed to hiv/i,
      /possible hiv exposure/i,
      /i think i (got|have) hiv/i,
      /raped|sexual assault|assaulted/i,
      /pep|post.?exposure/i,
      /needle.?stick|needlestick/i,
      /shared (a )?needle/i,
      /blood contact/i,
    ],
    score: 0,
    response: (name) => `⚠️ ${name ? name + ', t' : 'T'}his sounds like a situation where you may need **PEP (Post-Exposure Prophylaxis)** urgently.

**PEP is emergency HIV prevention medication. Here's what to do RIGHT NOW:**

🕐 **Time is critical — you have a 72-hour window (3 days)**
→ The sooner you start PEP, the more effective it is. Do NOT wait.

🏥 **Go immediately to:**
- Parirenyatwa Hospital A&E (24/7, free)
- Harare Hospital A&E (24/7, free)
- Any government clinic during opening hours
- UZ/NUST/MSU Student Health Centre

📋 **Tell them:** "I had a possible HIV exposure and need PEP."

💊 **What PEP involves:**
- A 28-day course of antiretroviral pills
- Must be taken consistently — do not skip doses
- It is completely FREE at government facilities
- It works — but ONLY if started within 72 hours

🔒 Your visit is confidential. No one will judge you.

After your PEP course, you should get an HIV test at 6 weeks and 3 months. Is there anything else you need help with?`,
  },

  // ── HIV Testing ─────────────────────────────────────────────────────────────
  {
    id: "hiv_test",
    triggers: [
      /should i (get |take a )?test/i,
      /want to (get |take a )?test/i,
      /hiv test/i,
      /self.?test/i,
      /how (do i|can i) (know|find out) (if i have|my status)/i,
      /my (hiv )?status/i,
      /worried (i have|about having) hiv/i,
      /tested for hiv/i,
      /scared i (have|might have) hiv/i,
    ],
    score: 0,
    response: (name) => `🔬 ${name ? name + ', k' : 'K'}nowing your HIV status is one of the most important things you can do for your health.

**Ways to test in Zimbabwe:**

🧪 **HIV Self-Test Kit (most private)**
- Free at UZ, NUST, and MSU student health centres
- Results in just 20 minutes
- Done privately at home — no one else needs to know
- One line = Negative. Two lines = Reactive (go for confirmatory test)

🏥 **At a clinic or hospital**
- Free, confidential, and fast
- Available at Parirenyatwa, Harare Hospital, all government clinics
- You can also ask for couples testing with a partner

⏰ **When should you test?**
- If you've had unprotected sex — especially with a new or unknown partner
- If a condom broke or was not used correctly
- Every 3–6 months if you are sexually active with multiple partners
- 6 weeks and 3 months after a possible HIV exposure

🔒 Your result is completely private. A positive result is NOT a death sentence — HIV treatment (ART) is free and works extremely well.

Would you like to know where to find a testing site near you?`,
  },

  // ── PrEP (Prevention before exposure) ──────────────────────────────────────
  {
    id: "prep",
    triggers: [
      /prep|pre.?exposure|before exposure/i,
      /how (can|do) i prevent hiv/i,
      /protect (myself|me) from hiv/i,
      /prevent hiv/i,
      /at risk (of|for) hiv/i,
      /high risk/i,
      /i (have|am having) (many|multiple) (partners|sexual partners)/i,
    ],
    score: 0,
    response: (name) => `🛡️ ${name ? name + ', ' : ''}PrEP (Pre-Exposure Prophylaxis) is one of the most powerful HIV prevention tools available today.

**What is PrEP?**
A daily pill that prevents HIV from taking hold in your body if you are exposed.
→ **99% effective** when taken consistently.

**Who should consider PrEP?**
- People with HIV-positive partners
- Anyone who has multiple sexual partners
- People who don't always use condoms
- Sex workers or people in high-exposure situations
- Anyone who feels they are at ongoing risk

**How to get PrEP in Zimbabwe (FREE):**
🏥 UZ Student Health Centre
🏥 NUST Student Clinic
🏥 Parirenyatwa Hospital
🏥 Any government clinic — just ask for "PrEP"

💊 **Side effects?** Mild nausea in the first 1–2 weeks, then usually nothing.

You do NOT need to be HIV-positive to take PrEP. It is for HIV-negative people who want to stay that way.

Would you like to know more about how PrEP works or where exactly to get it?`,
  },

  // ── Condoms ─────────────────────────────────────────────────────────────────
  {
    id: "condoms",
    triggers: [
      /condom/i,
      /protection during sex/i,
      /safe sex/i,
      /safer sex/i,
      /dual protection/i,
      /free condoms/i,
    ],
    score: 0,
    response: (name) => `🛡️ ${name ? name + ', ' : ''}condoms are the **only method that protects against BOTH HIV and pregnancy at the same time.**

**Male Condoms:**
→ 98% effective when used correctly every time
→ Free at all student health centres and government clinics
→ Easy to carry and use

**Female Condoms:**
→ Can be inserted up to 8 hours before sex — giving you control
→ Also protects against HIV and STIs
→ Free at clinics across Zimbabwe

**How to use one correctly:**
1. Check the expiry date
2. Open carefully — no teeth or scissors
3. Pinch the tip to leave space, roll all the way down
4. Hold the base when withdrawing
5. Dispose in a bin — never flush

💡 You can get **free condoms anonymously** using our Commodity Pickup tool in the app.

Do you need help on how to use a male or female condom step by step?`,
  },

  // ── Pregnancy / Emergency Contraception ─────────────────────────────────────
  {
    id: "emergency_contraception",
    triggers: [
      /morning after/i,
      /emergency contraception/i,
      /plan b|postinor|ec pill/i,
      /unprotected sex (last night|yesterday|today|and (i'm|im) worried)/i,
      /might (be|get) pregnant/i,
      /scared (i'm|im|i am) pregnant/i,
      /prevent pregnancy/i,
      /too late (for|to use) contraception/i,
    ],
    score: 0,
    response: (name) => `⏰ ${name ? name + ', ' : ''}if you've had unprotected sex, emergency contraception (EC) can help prevent pregnancy.

**The Morning-After Pill (Postinor-2 or similar):**
→ Take within **72 hours (3 days)** of unprotected sex
→ The sooner, the better — don't wait
→ Available FREE at government clinics and student health centres
→ Also at pharmacies without a prescription

**Copper IUD (most effective EC option):**
→ Can be inserted within **5 days** of unprotected sex
→ More than 99% effective
→ Can stay in place as long-term contraception for up to 10 years

⚠️ **Important to know:**
- Emergency contraception does NOT cause an abortion
- It prevents a pregnancy from starting
- It does NOT protect against HIV or STIs
- It should not be used as regular contraception

If you are also worried about HIV exposure from the same encounter, please consider PEP as well — tell me "I need PEP" and I'll explain.

Is there anything else you'd like to know?`,
  },

  // ── Pregnancy symptoms / am I pregnant ────────────────────────────────────
  {
    id: "am_i_pregnant",
    triggers: [
      /am i pregnant/i,
      /think i('m| am) pregnant/i,
      /missed (my )?period/i,
      /late period/i,
      /pregnancy (test|symptoms|signs)/i,
      /signs of pregnancy/i,
      /nausea (and|,) (missed|late)/i,
    ],
    score: 0,
    response: (name) => `🤰 ${name ? name + ', ' : ''}I understand this can feel scary. Here's what you should know:

**Common early signs of pregnancy:**
- 🔴 Missed or late period — the most common sign
- 🤢 Nausea ("morning sickness") — can happen any time of day
- 😴 Unusual tiredness or fatigue
- 🩺 Tender or swollen breasts
- 🚽 Needing to pee more often

**The only way to know for sure is to test:**

🧪 **Home pregnancy test** — available at any pharmacy, very affordable
→ Test with your first morning urine for the most accurate result
→ A faint line still counts as positive

🏥 **At a clinic** — free urine or blood test, fast and confidential

⏰ **Timing matters:**
Most tests are accurate from the first day of a missed period (about 2 weeks after possible conception).

Whatever the result, you have options and support. Clinics in Zimbabwe offer confidential counselling.

Would you like information on what to do next, or about contraception options going forward?`,
  },

  // ── STIs ────────────────────────────────────────────────────────────────────
  {
    id: "sti",
    triggers: [
      /sti|std|sexually transmitted/i,
      /discharge|burning (when|while) (i )?urinate|painful urination/i,
      /sore(s)? on (my )?(penis|vagina|genitals)/i,
      /rash (on|near) (my )?(genitals|groin)/i,
      /chlamydia|gonorrh|syphilis|herpes|warts/i,
      /unusual discharge/i,
      /itching (down there|genitals)/i,
    ],
    score: 0,
    response: (name) => `🩺 ${name ? name + ', ' : ''}the symptoms you're describing could be signs of an STI (sexually transmitted infection). Please don't ignore them.

**Common STIs and symptoms:**
- 🔴 **Chlamydia/Gonorrhoea:** Unusual discharge, burning when urinating, pain during sex
- 🔴 **Syphilis:** Painless sore (chancre), then rash on hands/feet
- 🔴 **Herpes:** Blisters or sores on genitals, mouth, or buttocks
- 🔴 **HPV/Warts:** Bumps or warts in the genital area

**What to do:**
✅ **Visit a clinic as soon as possible** — do not wait for symptoms to get worse
✅ Most STIs are **completely treatable** with antibiotics or antiviral medication
✅ Free STI testing and treatment is available at all government clinics in Zimbabwe
✅ Avoid sexual contact until you have been treated and cleared

**Use condoms** every time to prevent STIs — including HIV.

🔒 Your visit to a clinic is completely confidential.

Is there a specific symptom you'd like to ask more about?`,
  },

  // ── Mental health around sexual health ──────────────────────────────────────
  {
    id: "worried_scared",
    triggers: [
      /i('m| am) (scared|worried|anxious|terrified|panicking|stressed)/i,
      /i don't know what to do/i,
      /please help/i,
      /i feel (ashamed|embarrassed|dirty|stupid)/i,
      /told no one/i,
      /can't tell anyone/i,
    ],
    score: 0,
    response: (name) => `💚 ${name ? name + ', ' : ''}I hear you. It takes courage to reach out, and you did the right thing.

Whatever has happened, you are **not alone** and there is **no judgment here**.

A few things I want you to know:
- Whatever you're going through, **there is always something that can help**
- Clinics in Zimbabwe are **confidential** — your family, friends, and employers will not be told
- **Most health situations are treatable** when addressed early
- You deserve care, support, and accurate information

**If you're in crisis or need to talk to someone:**
📞 Zimbabwe National AIDS Helpline: **+263 4 700 822** (free, confidential)
🏥 Parirenyatwa Social Work Department
🏫 Your university student counselling service

Please tell me what happened or what you're worried about, and I'll help you figure out exactly what to do next. I'm here. 💚`,
  },

  // ── HIV basics / general education ──────────────────────────────────────────
  {
    id: "hiv_basics",
    triggers: [
      /what is hiv/i,
      /how (is|does) hiv (spread|transmitted|passed)/i,
      /can i get hiv from/i,
      /hiv (from|through) (kissing|saliva|toilet|sharing|food|mosquito)/i,
      /hiv vs aids/i,
      /living with hiv/i,
      /u=u|undetectable/i,
      /art|antiretroviral/i,
    ],
    score: 0,
    response: (name) => `🧬 ${name ? name + ', h' : 'H'}ere's what you need to know about HIV:

**What is HIV?**
HIV (Human Immunodeficiency Virus) is a virus that attacks the immune system. Without treatment, it can weaken the body's ability to fight infections.

**How HIV spreads:**
✅ Unprotected sex (vaginal, anal, or oral)
✅ Sharing needles or syringes
✅ From mother to baby (pregnancy, birth, breastfeeding)
✅ Blood transfusions with infected blood (rare in screened healthcare)

**HIV does NOT spread through:**
❌ Hugging, kissing, or touching
❌ Sharing food, drinks, or toilets
❌ Mosquito or insect bites
❌ Coughing or sneezing

**HIV vs AIDS:**
→ HIV is the virus. AIDS is the advanced stage — only happens without treatment.
→ With modern ART treatment, most people with HIV **never develop AIDS**.

**U=U (Undetectable = Untransmittable):**
→ If someone on ART has an undetectable viral load, they **cannot** pass HIV to a sexual partner. This is scientifically proven.

→ HIV treatment (ART) is **FREE in Zimbabwe** at all government clinics.

What else would you like to know?`,
  },

  // ── Contraception general ───────────────────────────────────────────────────
  {
    id: "contraception",
    triggers: [
      /contraception|birth control|family planning/i,
      /how (can i|do i) avoid (getting |being )?pregnant/i,
      /not (want|ready) (to be|for a) baby/i,
      /implant|injection|iud|pill/i,
      /depo|injectable/i,
      /what contraception/i,
    ],
    score: 0,
    response: (name) => `🌸 ${name ? name + ', ' : ''}there are many effective contraception options available FREE in Zimbabwe. Here's a quick guide:

**Short-term:**
🛡️ **Condoms** — also protect against HIV & STIs. Free at clinics.
💊 **Daily Pill** — 99% effective with perfect use. Must be taken at the same time every day.

**Medium-term:**
💉 **Injectable (Depo-Provera)** — one injection every 3 months at a clinic. 99% effective.

**Long-term:**
🔩 **Implant (Jadelle/Implanon)** — a tiny rod in your arm. Lasts 3–5 years. 99%+ effective.
🔷 **IUD (Copper or hormonal)** — placed inside the uterus by a nurse/doctor. Lasts up to 10 years.

**What's right for you?**
The best method depends on your health, lifestyle, and plans. A nurse at any clinic will help you choose — **no judgment, completely confidential.**

All of the above are **free at government clinics and student health centres** in Zimbabwe.

Would you like more detail on any specific method?`,
  },

  // ── Where to go / clinic ────────────────────────────────────────────────────
  {
    id: "clinic_info",
    triggers: [
      /clinic|hospital|health cent(re|er)/i,
      /where (can i|do i) go/i,
      /nearest (clinic|hospital|health)/i,
      /services near me/i,
      /where (to get|can i find)/i,
      /parirenyatwa|harare hospital|uz health|nust clinic|msu health/i,
    ],
    score: 0,
    response: (name) => `📍 ${name ? name + ', h' : 'H'}ere are places you can get help in Zimbabwe:

**For students:**
🏫 UZ Student Health Centre — free HIV testing, PrEP, PEP, contraception
🏫 NUST Student Clinic — same services, free
🏫 MSU Health Services — confidential, free

**Government hospitals (open 24/7 for emergencies):**
🏥 Parirenyatwa Hospital A&E — PEP, emergency care
🏥 Harare Hospital A&E — PEP, emergency care

**Community clinics:**
All government clinics across Zimbabwe provide free HIV testing, PrEP, condoms, contraception, and STI treatment.

→ Use the **📍 Services** tab in this app to find clinics near your specific location.

All visits are **confidential** — no one outside the clinic will be informed.

Is there a specific service you're looking for?`,
  },

  // ── Shona language ──────────────────────────────────────────────────────────
  {
    id: "shona",
    triggers: [
      /mhoro|ndiri|ndinoda|ndinofunga|pamuviri|musoro/i,
      /shona|speak shona|ndishone/i,
      /kudzivirira|hutachiwana/i,
    ],
    score: 0,
    response: (name) => `Mhoro${name ? ' ' + name : ''}! 🇿🇼

Chengeto inokufadzai nekukubatsira panyaya dzehutano.

**Zvinonyanya kubvunzwa:**
🛡️ **PrEP** — mushonga wekudzivirira HIV usati wasangana nechirwere. Mahara ku clinics dzose.
⚠️ **PEP** — kana wangosangana nehutachiwana, uende ku hospital mukati memaawa 72. Mahara.
💊 **Kudzivirira mimba** — pill, injection, implant — mahara ku clinics dzehurumende.
🔬 **HIV test** — self-test inowanikwa ku UZ, NUST, MSU — maminitsi 20, pachako.

Nyora chero mubvunzo wako muChiShona kana ChiRungu — ndinokubatsira. 💚`,
  },
];

// ── Smart bot matcher ──────────────────────────────────────────────────────────
function getBotResponse(userText, nickname) {
  const name = nickname || null;

  // Score each response
  const scored = BOT_RESPONSES.map(r => {
    let score = 0;
    for (const pattern of r.triggers) {
      if (pattern.test(userText)) score += 10;
    }
    return { ...r, score };
  }).filter(r => r.score > 0);

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    return scored[0].response(name);
  }

  // Fallback
  return \`\${name ? name + ", I " : "I "}\`
    + \`want to make sure you get accurate information. \`
    + \`You can ask me things like:\\n\\n\`
    + \`• "I slept with someone without a condom — what should I do?"\\n\`
    + \`• "How do I get PrEP?"\\n\`
    + \`• "How can I avoid getting pregnant?"\\n\`
    + \`• "Where can I get tested?"\\n\`
    + \`• "What is U=U?"\\n\\n\`
    + \`I am here and everything is private. 🔒\`;
}`;

if (!app.includes(BOT_FIND)) {
  console.error('BOT_FIND not found in App.jsx');
  process.exit(1);
}
app = app.replace(BOT_FIND, BOT_REPLACE);
console.log('✓ BOT_KNOWLEDGE replaced with clinical scenario engine');

// ── 2. Update initial chat greeting to use nickname ───────────────────────────
const GREETING_FIND = `  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Mhoro/Hello! I am Chengeto, your private AI assistant. Ask me anything about HIV, PEP, PrEP, condoms, or contraception in Zimbabwe. I work offline too!" }
  ]);`;

const GREETING_REPLACE = `  // Chat greeting initialised lazily so it can use currentUser nickname
  const [chatMessages, setChatMessages] = useState([]);
  const chatGreetingDoneRef = useRef(false);`;

if (!app.includes(GREETING_FIND)) {
  console.error('GREETING_FIND not found');
  process.exit(1);
}
app = app.replace(GREETING_FIND, GREETING_REPLACE);
console.log('✓ Initial greeting updated');

// ── 3. Replace handleSendMessage logic ────────────────────────────────────────
const SEND_FIND = `  // Chat bot logic
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const updatedMessages = [...chatMessages, { sender: "user", text: userText }];
    setChatMessages(updatedMessages);
    setChatInput("");

    // Bot response logic
    setTimeout(() => {
      const query = userText.toLowerCase();
      let answer = "I want to make sure you get accurate information. Please search for key terms like 'prep', 'pep', 'condom', 'cost', 'shona', 'pamuviri', or 'clinic' to learn more.";
      
      // Look for matches in BOT_KNOWLEDGE keys
      for (const key in BOT_KNOWLEDGE) {
        if (query.includes(key.replace('_', ' '))) {
          answer = BOT_KNOWLEDGE[key];
          break;
        }
      }
      
      setChatMessages(prev => [...prev, { sender: "bot", text: answer }]);
    }, 600);
  };`;

const SEND_REPLACE = `  // Chat bot logic
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    // Typing indicator
    setChatMessages(prev => [...prev, { sender: "bot", text: "typing...", isTyping: true }]);

    setTimeout(() => {
      const nickname = currentUser?.nickname || null;
      const answer = getBotResponse(userText, nickname);
      setChatMessages(prev => {
        // Remove typing indicator and add real response
        const withoutTyping = prev.filter(m => !m.isTyping);
        return [...withoutTyping, { sender: "bot", text: answer }];
      });
    }, 900);
  };`;

if (!app.includes(SEND_FIND)) {
  console.error('SEND_FIND not found');
  process.exit(1);
}
app = app.replace(SEND_FIND, SEND_REPLACE);
console.log('✓ handleSendMessage updated with scenario engine + typing indicator');

// ── 4. Add useEffect to set personalised greeting when chat page opens ─────────
// Inject after the chatScrollToBottom effect
const SCROLL_EFFECT_FIND = `  // Chat scroll to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);`;

const SCROLL_EFFECT_REPLACE = `  // Chat scroll to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Personalised greeting when chat page opens
  useEffect(() => {
    if (page === 'chat' && !chatGreetingDoneRef.current) {
      chatGreetingDoneRef.current = true;
      const name = currentUser?.nickname;
      const greeting = name
        ? \`Mhoro \${name}! 👋 I'm Chengeto, your private health assistant.\\n\\nYou can talk to me about anything — HIV prevention, testing, PEP, PrEP, pregnancy, contraception, or any situation you're worried about.\\n\\nEverything you share here stays on this device. I'm here to help, not to judge. What's on your mind?\`
        : \`Mhoro! 👋 I'm Chengeto, your private health assistant.\\n\\nYou can ask me anything — HIV, PEP, PrEP, testing, pregnancy prevention, or describe a situation you're worried about. I'll give you clear, honest guidance.\\n\\nEverything is private and stays on your device. What's on your mind?\`;
      setChatMessages([{ sender: 'bot', text: greeting }]);
    }
    // Reset greeting when navigating away so it re-greets next visit
    if (page !== 'chat') {
      chatGreetingDoneRef.current = false;
      setChatMessages([]);
    }
  }, [page, currentUser]);`;

if (!app.includes(SCROLL_EFFECT_FIND)) {
  console.error('SCROLL_EFFECT_FIND not found');
  process.exit(1);
}
app = app.replace(SCROLL_EFFECT_FIND, SCROLL_EFFECT_REPLACE);
console.log('✓ Personalised greeting useEffect added');

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log('✓ App.jsx written successfully');
