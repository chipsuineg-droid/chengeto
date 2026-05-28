// ── CHENGETO BOT: Clinical Scenario Engine ─────────────────────────────────
// Pattern-based clinical understanding — handles real sentences like
// "I slept with a sex worker yesterday" or "my condom broke last night"

export const BOT_RESPONSES = [
  // ── PEP / Exposure emergencies ─────────────────────────────────────────────
  {
    id: "pep_emergency",
    triggers: [
      /slept with (a |my |his |her )?(sex worker|prostitute|stranger|someone i don|one night)/i,
      /had (unprotected )?(sex|intercourse) (with|yesterday|last night|today)/i,
      /condom (broke|burst|slipped|came off)/i,
      /exposed to hiv/i,
      /possible hiv exposure/i,
      /i think i (got|have|caught) hiv/i,
      /raped|sexual assault|assaulted/i,
      /pep|post.?exposure/i,
      /needle.?stick|needlestick/i,
      /shared (a )?needle/i,
      /blood contact/i,
      /without (a )?condom (last night|yesterday|today)/i,
    ],
    reply: [
      "⚠️ This sounds like a situation where you may urgently need **PEP (Post-Exposure Prophylaxis).**",
      "",
      "**PEP is emergency HIV prevention medication. Here's what to do RIGHT NOW:**",
      "",
      "🕐 **Time is critical — you have a 72-hour window (3 days)**",
      "→ The sooner you start, the more effective it is. Do NOT wait.",
      "",
      "🏥 **Go immediately to:**",
      "• Parirenyatwa Hospital A&E (open 24/7, completely free)",
      "• Harare Hospital A&E (open 24/7, completely free)",
      "• UZ / NUST / MSU Student Health Centre (during opening hours)",
      "• Any government clinic",
      "",
      "📋 **Tell them:** \"I had a possible HIV exposure and need PEP.\"",
      "",
      "💊 **What PEP involves:**",
      "• A 28-day course of antiretroviral pills — completely FREE",
      "• Must be taken consistently — do not skip doses",
      "• Works, but ONLY if started within 72 hours",
      "",
      "🔒 Your visit is confidential. No one will judge you.",
      "",
      "After your PEP course, test for HIV at 6 weeks and 3 months.",
      "Is there anything else you need help with?"
    ]
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
    reply: [
      "🔬 Knowing your HIV status is one of the most important things you can do for your health.",
      "",
      "**Ways to test in Zimbabwe:**",
      "",
      "🧪 **HIV Self-Test Kit (most private)**",
      "• Free at UZ, NUST, and MSU student health centres",
      "• Results in just 20 minutes, done at home — completely private",
      "• One line = Negative. Two lines = Reactive (go for confirmatory test)",
      "",
      "🏥 **At a clinic or hospital**",
      "• Free, confidential, and fast",
      "• Parirenyatwa, Harare Hospital, all government clinics",
      "• Couples testing also available",
      "",
      "⏰ **When to test:**",
      "• After unprotected sex — especially with a new or unknown partner",
      "• If a condom broke or wasn't used correctly",
      "• Every 3–6 months if sexually active with multiple partners",
      "• 6 weeks and 3 months after a possible HIV exposure",
      "",
      "🔒 A positive result is NOT a death sentence. HIV treatment (ART) is free in Zimbabwe and works extremely well.",
      "",
      "Would you like to know where to find a testing site near you?"
    ]
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
      /multiple (partners|sexual partners)/i,
    ],
    reply: [
      "🛡️ PrEP (Pre-Exposure Prophylaxis) is one of the most powerful HIV prevention tools available today.",
      "",
      "**What is PrEP?**",
      "A daily pill that prevents HIV from taking hold in your body if you are exposed.",
      "→ 99% effective when taken consistently.",
      "",
      "**Who should consider PrEP?**",
      "• People with HIV-positive partners",
      "• Anyone with multiple sexual partners",
      "• People who don't always use condoms",
      "• Sex workers or anyone in high-exposure situations",
      "• Anyone who feels they are at ongoing risk",
      "",
      "**How to get PrEP in Zimbabwe (FREE):**",
      "🏥 UZ Student Health Centre",
      "🏥 NUST Student Clinic",
      "🏥 Parirenyatwa Hospital",
      "🏥 Any government clinic — just ask for \"PrEP\"",
      "",
      "💊 Side effects? Mild nausea for the first 1–2 weeks, then usually nothing.",
      "",
      "You do NOT need to be HIV-positive to take PrEP. It is for HIV-negative people who want to stay that way.",
      "",
      "Would you like to know more about how PrEP works?"
    ]
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
    reply: [
      "🛡️ Condoms are the **only method that protects against BOTH HIV and pregnancy at the same time.**",
      "",
      "**Male Condoms:**",
      "→ 98% effective when used correctly every time",
      "→ Free at all student health centres and government clinics",
      "",
      "**Female Condoms:**",
      "→ Can be inserted up to 8 hours before sex — giving you control",
      "→ Also protects against HIV and STIs",
      "→ Free at clinics across Zimbabwe",
      "",
      "**How to use one correctly:**",
      "1. Check the expiry date",
      "2. Open carefully — no teeth or scissors",
      "3. Pinch the tip, roll all the way down",
      "4. Hold the base when withdrawing after sex",
      "5. Dispose in a bin — never flush",
      "",
      "💡 You can get free condoms anonymously using the Commodity Pickup tool in this app.",
      "",
      "Need a step-by-step guide for male or female condoms?"
    ]
  },

  // ── Emergency Contraception ─────────────────────────────────────────────────
  {
    id: "emergency_contraception",
    triggers: [
      /morning after/i,
      /emergency contraception/i,
      /plan b|postinor|ec pill/i,
      /unprotected sex (last night|yesterday|today)/i,
      /might (be|get) pregnant/i,
      /scared (i'm|im|i am) pregnant/i,
      /prevent pregnancy/i,
      /too late (for|to use) contraception/i,
    ],
    reply: [
      "⏰ If you've had unprotected sex, emergency contraception (EC) can help prevent pregnancy.",
      "",
      "**The Morning-After Pill (Postinor-2 or similar):**",
      "→ Take within **72 hours (3 days)** of unprotected sex",
      "→ The sooner the better — don't wait",
      "→ Available FREE at government clinics and student health centres",
      "→ Also at pharmacies without a prescription",
      "",
      "**Copper IUD (most effective EC option):**",
      "→ Can be inserted within **5 days** of unprotected sex",
      "→ More than 99% effective",
      "→ Can stay in place as long-term contraception for up to 10 years",
      "",
      "⚠️ **Important to know:**",
      "• EC does NOT cause an abortion — it prevents pregnancy from starting",
      "• EC does NOT protect against HIV or STIs",
      "• Should not be used as regular contraception",
      "",
      "If you're also worried about HIV exposure from the same encounter, you may need PEP as well.",
      "Just say \"I need PEP\" and I'll explain.",
      "",
      "Is there anything else you'd like to know?"
    ]
  },

  // ── Am I pregnant ────────────────────────────────────────────────────────────
  {
    id: "am_i_pregnant",
    triggers: [
      /am i pregnant/i,
      /think i('m| am) pregnant/i,
      /missed (my )?period/i,
      /late period/i,
      /pregnancy (test|symptoms|signs)/i,
      /signs of pregnancy/i,
    ],
    reply: [
      "🤰 I understand this can feel scary. Here's what you should know:",
      "",
      "**Common early signs of pregnancy:**",
      "🔴 Missed or late period — the most common sign",
      "🤢 Nausea — can happen any time of day, not just morning",
      "😴 Unusual tiredness or fatigue",
      "🩺 Tender or swollen breasts",
      "🚽 Needing to urinate more often",
      "",
      "**The only way to know for sure is to test:**",
      "",
      "🧪 Home pregnancy test — available at any pharmacy",
      "→ Test with your first morning urine for best accuracy",
      "→ A faint line still counts as positive",
      "",
      "🏥 At a clinic — free urine or blood test, fast and confidential",
      "",
      "Most tests are accurate from the first day of a missed period.",
      "",
      "Whatever the result, you have options and support available.",
      "Would you like information on what to do next?"
    ]
  },

  // ── STIs ─────────────────────────────────────────────────────────────────────
  {
    id: "sti",
    triggers: [
      /sti|std|sexually transmitted/i,
      /discharge|burning (when|while) (i )?urinate/i,
      /sore(s)? on (my )?(penis|vagina|genitals)/i,
      /rash (on|near) (my )?(genitals|groin)/i,
      /chlamydia|gonorrh|syphilis|herpes|warts/i,
      /unusual discharge/i,
      /itching (down there|genitals)/i,
    ],
    reply: [
      "🩺 The symptoms you're describing could be signs of an STI (sexually transmitted infection). Please don't ignore them.",
      "",
      "**Common STIs and symptoms:**",
      "🔴 Chlamydia / Gonorrhoea: Unusual discharge, burning when urinating",
      "🔴 Syphilis: Painless sore (chancre), then rash on hands and feet",
      "🔴 Herpes: Blisters or sores on genitals or mouth",
      "🔴 HPV / Warts: Bumps or warts in the genital area",
      "",
      "**What to do:**",
      "✅ Visit a clinic as soon as possible — do not wait",
      "✅ Most STIs are completely treatable with antibiotics",
      "✅ Free STI testing and treatment at all government clinics in Zimbabwe",
      "✅ Avoid sexual contact until you have been treated and cleared",
      "",
      "🔒 Your clinic visit is completely confidential.",
      "",
      "Is there a specific symptom you'd like to ask more about?"
    ]
  },

  // ── Worried / scared ─────────────────────────────────────────────────────────
  {
    id: "worried_scared",
    triggers: [
      /i('m| am) (scared|worried|anxious|terrified|panicking|stressed)/i,
      /i don't know what to do/i,
      /please help/i,
      /i feel (ashamed|embarrassed|dirty|stupid)/i,
      /can't tell anyone/i,
    ],
    reply: [
      "💚 I hear you. It takes courage to reach out, and you did the right thing.",
      "",
      "Whatever has happened, you are not alone and there is no judgment here.",
      "",
      "A few things I want you to know:",
      "• Whatever you're going through, there is always something that can help",
      "• Clinics in Zimbabwe are confidential — your family and friends will not be told",
      "• Most health situations are treatable when addressed early",
      "• You deserve care, support, and accurate information",
      "",
      "**If you need to talk to someone:**",
      "📞 Zimbabwe National AIDS Helpline: +263 4 700 822 (free, confidential)",
      "🏥 Parirenyatwa Social Work Department",
      "🏫 Your university student counselling service",
      "",
      "Please tell me what happened or what you're worried about.",
      "I'm here, and I'll help you figure out what to do next. 💚"
    ]
  },

  // ── HIV basics ────────────────────────────────────────────────────────────────
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
    reply: [
      "🧬 Here's what you need to know about HIV:",
      "",
      "**What is HIV?**",
      "HIV (Human Immunodeficiency Virus) attacks the immune system.",
      "Without treatment, it can weaken the body's ability to fight infections.",
      "",
      "**How HIV spreads:**",
      "✅ Unprotected sex (vaginal, anal, or oral)",
      "✅ Sharing needles or syringes",
      "✅ From mother to baby (pregnancy, birth, breastfeeding)",
      "✅ Blood transfusions with infected blood (rare in screened healthcare)",
      "",
      "**HIV does NOT spread through:**",
      "❌ Hugging, kissing, or touching",
      "❌ Sharing food, drinks, or toilets",
      "❌ Mosquito or insect bites",
      "❌ Coughing or sneezing",
      "",
      "**HIV vs AIDS:**",
      "→ HIV is the virus. AIDS is the advanced stage.",
      "→ With modern ART treatment, most people with HIV NEVER develop AIDS.",
      "",
      "**U=U (Undetectable = Untransmittable):**",
      "→ If someone on ART has an undetectable viral load, they cannot pass HIV to a sexual partner. This is scientifically proven.",
      "",
      "HIV treatment (ART) is FREE in Zimbabwe at all government clinics.",
      "",
      "What else would you like to know?"
    ]
  },

  // ── Contraception general ─────────────────────────────────────────────────────
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
    reply: [
      "🌸 There are many effective contraception options available FREE in Zimbabwe:",
      "",
      "**Short-term:**",
      "🛡️ Condoms — also protect against HIV & STIs. Free at clinics.",
      "💊 Daily Pill — 99% effective with perfect use. Same time every day.",
      "",
      "**Medium-term:**",
      "💉 Injectable (Depo-Provera) — one injection every 3 months. 99% effective.",
      "",
      "**Long-term:**",
      "🔩 Implant (Jadelle/Implanon) — tiny rod in your arm. Lasts 3–5 years. 99%+ effective.",
      "🔷 IUD (Copper or hormonal) — placed by a nurse/doctor. Lasts up to 10 years.",
      "",
      "**What's right for you?**",
      "The best method depends on your health and lifestyle.",
      "A nurse at any clinic will help you choose — no judgment, completely confidential.",
      "",
      "All of the above are FREE at government clinics and student health centres in Zimbabwe.",
      "",
      "Would you like more detail on any specific method?"
    ]
  },

  // ── Clinic / services ─────────────────────────────────────────────────────────
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
    reply: [
      "📍 Here are places you can get help in Zimbabwe:",
      "",
      "**For students:**",
      "🏫 UZ Student Health Centre — HIV testing, PrEP, PEP, contraception (free)",
      "🏫 NUST Student Clinic — same services, free",
      "🏫 MSU Health Services — confidential, free",
      "",
      "**Government hospitals (open 24/7 for emergencies):**",
      "🏥 Parirenyatwa Hospital A&E — PEP, emergency care",
      "🏥 Harare Hospital A&E — PEP, emergency care",
      "",
      "**All government clinics** across Zimbabwe provide:",
      "Free HIV testing, PrEP, condoms, contraception, and STI treatment.",
      "",
      "→ Use the 📍 Services tab in this app to find clinics near your specific location.",
      "",
      "🔒 All visits are confidential — no one outside the clinic will be informed.",
      "",
      "Is there a specific service you're looking for?"
    ]
  },

  // ── Shona ─────────────────────────────────────────────────────────────────────
  {
    id: "shona",
    triggers: [
      /mhoro|ndiri|ndinoda|ndinofunga|pamuviri|musoro/i,
      /shona|speak shona|ndishone/i,
      /kudzivirira|hutachiwana/i,
    ],
    reply: [
      "Mhoro! 🇿🇼 Chengeto inofara kukubatsira panyaya dzehutano.",
      "",
      "**Mibvunzo inonyanya kubvunzwa:**",
      "🛡️ PrEP — mushonga wekudzivirira HIV usati wasangana nechirwere. Mahara ku clinics dzose.",
      "⚠️ PEP — kana wangosangana nehutachiwana, uende ku hospital mukati memaawa 72. Mahara.",
      "💊 Kudzivirira mimba — pill, injection, implant — mahara ku clinics dzehurumende.",
      "🔬 HIV test — self-test inowanikwa ku UZ, NUST, MSU. Maminitsi 20, pachako.",
      "",
      "Nyora chero mubvunzo wako muChiShona kana ChiRungu. Ndinokubatsira. 💚"
    ]
  },
];

// ── Smart bot matcher ────────────────────────────────────────────────────────
export function getBotResponse(userText, nickname) {
  const name = nickname ? nickname : null;

  const scored = BOT_RESPONSES.map(r => {
    let score = 0;
    for (const pattern of r.triggers) {
      if (pattern.test(userText)) score += 10;
    }
    return { ...r, score };
  }).filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);

  let lines;
  if (scored.length > 0) {
    lines = scored[0].reply;
  } else {
    lines = [
      `${name ? name + ', I' : 'I'} want to make sure you get accurate information.`,
      "",
      "You can ask me things like:",
      "• \"I slept with someone without a condom — what should I do?\"",
      "• \"How do I get PrEP?\"",
      "• \"How can I avoid getting pregnant?\"",
      "• \"Where can I get tested for HIV?\"",
      "• \"What is U=U?\"",
      "• \"I'm scared I might have an STI\"",
      "",
      "I'm here and everything is private. 🔒",
    ];
  }

  // Prefix with name on first line if applicable and not already handled
  const firstLine = lines[0];
  if (name && !firstLine.includes(name)) {
    lines = [name + ", " + firstLine.charAt(0).toLowerCase() + firstLine.slice(1), ...lines.slice(1)];
  }

  return lines.join("\n");
}
