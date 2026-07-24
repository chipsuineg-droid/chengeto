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
      "📞 Call 08080038 (Musasa Project - Toll Free)",
      "📞 Call 08080472 (Adult Rape Clinic)",
      "📞 Go immediately to the nearest hospital casualty/emergency department",
      "• Your local Clinic or Health Centre (during opening hours)",
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
      "• Free at most government clinics and health centres",
      "• Available at private pharmacies with a prescription",
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
      "• Before a new relationship without condoms",
      "• Every 3–6 months if you have multiple partners",
      "• If you are planning a pregnancy",
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
      "Having multiple partners increases the risk of HIV and STIs.",
      "**Important steps to protect yourself:**",
      "• Use condoms consistently and correctly",
      "• Consider PrEP for extra HIV protection",
      "• Get tested for HIV and STIs regularly (every 3-6 months)",
      "• Encourage your partners to get tested",
      "",
      "**Who is PrEP recommended for?**",
      "• Anyone with multiple partners",
      "• People who don't always use condoms",
      "• Anyone who feels they are at ongoing risk",
      "",
      "**Where to test for free:**",
      "• Your local clinic",
      "• Government health facility",
      "• Any government hospital or polyclinic",
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
      "**Where to get PEP:**",
      "• Go to the nearest hospital emergency room IMMEDIATELY",
      "• Free at all government clinics and health centres",
      "• Time is critical - do not wait to see if you get symptoms",
      "",
      "**Male Condoms:**",
      "→ 98% effective when used correctly every time",
      "→ Free at all health centres and government clinics",
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
      "• Only use water-based lubricants (like KY Jelly)",
      "• Available FREE at government clinics and health centres",
      "• Never use oil-based lubricants (Vaseline, lotions, cooking oil) as they break the condom",
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
      "**What to do:**",
      "• Visit a clinic IMMEDIATELY. Do not try to treat this yourself.",
      "• The symptoms you're describing could be signs of an STI. Please don't ignore them.",
      "• Avoid intimate contact until you have been treated and cleared",
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
      "• Clinics in Zimbabwe are confidential",
      "• Most health situations are treatable when addressed early",
      "• You deserve care, support, and accurate information",
      "",
      "**Where to find help:**",
      "• Your local counselling service",
      "• Call 08080002 (Friendship Bench toll-free)",
      "• Zimbabwe National AIDS Helpline: +263 4 700 822 (free, confidential)",
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
      "→ People with an undetectable viral load live long, healthy lives.",
      "→ If someone on ART has an undetectable viral load, they cannot pass HIV to a partner. This is scientifically proven.",
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
      "Treatment as Prevention: For people living with HIV, taking medication daily makes the virus undetectable and untransmittable (U=U).",
      "",
      "All of the above are FREE at government clinics in Zimbabwe.",
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
      "**For everyone:**",
      "• Local Clinics - HIV testing, PrEP, PEP, contraception (free)",
      "• District Hospitals - same services, free",
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
  
  // ── Cholera & Waterborne Diseases ───────────────────────────────────────────
  {
    id: "cholera",
    triggers: [
      /cholera/i,
      /waterborne/i,
      /watery diarrhea|diarrhoea/i,
      /vomiting (and|severe)/i,
    ],
    reply: [
      "💧 **Cholera & Waterborne Diseases**",
      "",
      "Cholera is a severe bacterial infection causing rapid dehydration through watery diarrhea and vomiting.",
      "",
      "**What to do:**",
      "1. Drink ORS (Oral Rehydration Salts) immediately. If unavailable, mix 6 level teaspoons of sugar and 1/2 teaspoon of salt in 1 litre of clean water.",
      "2. Go to the nearest clinic or cholera treatment centre immediately.",
      "",
      "**Prevention:**",
      "• Boil all drinking water or treat it with water guard/aqua tablets.",
      "• Wash hands with soap under running water before eating and after using the toilet.",
      "• Eat food while it is hot."
    ]
  },

  // ── Malaria ──────────────────────────────────────────────────────────────────
  {
    id: "malaria",
    triggers: [
      /malaria/i,
      /mosquito/i,
      /fever and chills/i,
      /sweating and headache/i,
    ],
    reply: [
      "🦟 **Malaria Information**",
      "",
      "Malaria is caused by mosquito bites and can be fatal if not treated quickly.",
      "",
      "**Symptoms:**",
      "High fever, chills, severe headaches, muscle aches, and fatigue.",
      "",
      "**What to do:**",
      "• Visit a clinic immediately for a rapid malaria test. Do not self-medicate with painkillers if malaria is suspected in an endemic area.",
      "",
      "**Prevention:**",
      "• Sleep under a treated mosquito net.",
      "• Clear stagnant water around your home."
    ]
  },

  // ── Mental Health ────────────────────────────────────────────────────────────
  {
    id: "mental_health",
    triggers: [
      /depressed|depression/i,
      /anxiety|anxious/i,
      /suicide|kill myself/i,
      /stressed/i,
      /mental/i,
    ],
    reply: [
      "🧠 **Mental Health Support**",
      "",
      "It takes courage to speak about mental health. You are not alone.",
      "",
      "**If you are in a crisis:**",
      "🚨 Please call the **Suicide/Crisis hotline immediately: +263 4 700 822** or the Friendship Bench toll-free at **08080002**.",
      "",
      "**General Advice:**",
      "• Depression and anxiety are medical conditions, not signs of weakness.",
      "• Talk to a trusted friend or family member.",
      "• Visit a clinic or use the Online Doctor tab to speak to a Mental Health Counsellor."
    ]
  },

  // ── Maternal & Pregnancy Care ────────────────────────────────────────────────
  {
    id: "maternal_care",
    triggers: [
      /pregnant|pregnancy/i,
      /antenatal/i,
      /having a baby/i,
      /morning sickness/i,
    ],
    reply: [
      "🤰 **Maternal & Pregnancy Care**",
      "",
      "**Antenatal Care (ANC):**",
      "You should register at a local clinic as soon as you know you are pregnant (ideally before 12 weeks). ANC visits are free at government clinics.",
      "",
      "**Warning Signs during Pregnancy:**",
      "Seek emergency help if you experience:",
      "• Vaginal bleeding",
      "• Severe headaches or blurred vision",
      "• Reduced baby movements",
      "• Water breaking prematurely",
      "",
      "Eat a balanced diet, take prescribed iron/folic acid supplements, and rest often."
    ]
  },

  // ── Nutrition & Diet ─────────────────────────────────────────────────────────
  {
    id: "nutrition",
    triggers: [
      /diet/i,
      /nutrition/i,
      /lose weight|gain weight/i,
      /healthy eating/i,
    ],
    reply: [
      "🥗 **Nutrition & Healthy Eating**",
      "",
      "A balanced diet is crucial for a strong immune system.",
      "",
      "**Key Guidelines:**",
      "• Eat plenty of vegetables and fruits daily.",
      "• Choose whole grains (like brown rice, sorghum, or millet) over refined carbs.",
      "• Drink at least 8 glasses of water a day.",
      "• Reduce sugar, salt, and processed foods.",
      "",
      "Use our **Health Tracker** to log your meals or speak to the Nutrition Counsellor in the Online Doctor tab."
    ]
  },
  
  // ── First Aid ────────────────────────────────────────────────────────────────
  {
    id: "first_aid",
    triggers: [
      /first aid/i,
      /burn|burned|burnt/i,
      /cut|bleeding/i,
      /choking/i,
      /cpr/i,
      /fainted|passed out/i,
      /poison|swallowed something/i,
    ],
    reply: [
      "🚑 **First Aid Basics**",
      "",
      "**🩸 Bleeding:**",
      "Apply firm, direct pressure to the wound with a clean cloth. If it's a limb, elevate it above the heart. Do not remove the cloth if blood soaks through; add another on top.",
      "",
      "**🔥 Burns:**",
      "Cool the burn under cool (not ice cold) running water for at least 10-20 minutes. Do not pop blisters. Do not apply butter, oil, or toothpaste. Cover loosely with cling film or a clean plastic bag.",
      "",
      "**😶 Choking:**",
      "Encourage them to cough. If that fails, give 5 sharp back blows between the shoulder blades. If still choking, give 5 abdominal thrusts (Heimlich maneuver).",
      "",
      "**⚠️ CPR (Unresponsive & Not Breathing):**",
      "Call an ambulance immediately. Push hard and fast in the center of the chest (100-120 pushes a minute).",
      "",
      "🚨 *If this is a severe emergency, please go to the nearest hospital or call for help immediately.*"
    ]
  },

  // ── Emergency Numbers ────────────────────────────────────────────────────────
  {
    id: "emergency_numbers",
    triggers: [
      /emergency numbers/i,
      /ambulance/i,
      /police/i,
      /fire brigade/i,
      /hotline/i,
      /call for help/i,
    ],
    reply: [
      "🚨 **Important Emergency Numbers in Zimbabwe**",
      "",
      "🚑 **Ambulance (MARS/EMRAS/City):**",
      "• 993 (Toll-free, national)",
      "• +263 242 753 959 (Harare EMRAS)",
      "• +263 292 62301 (Bulawayo EMRAS)",
      "",
      "🚓 **Police:**",
      "• 995 (Toll-free)",
      "• +263 242 748836 (Harare Central)",
      "",
      "🚒 **Fire Brigade:**",
      "• 993 or 994 (Toll-free)",
      "",
      "📞 **Mental Health & Support Hotlines:**",
      "• Musasa Project (GBV): 08080038 (Toll-free)",
      "• Childline: 116 (Toll-free)",
      "• Suicide/Crisis: +263 4 700 822",
      "",
      "Please stay on the line and speak clearly when calling emergency services."
    ]
  },

  // ── General Medical & Symptoms ───────────────────────────────────────────────
  {
    id: "general_health",
    triggers: [
      /general health|symptoms/i,
      /headache|migraine/i,
      /fever|high temperature/i,
      /stomach|tummy ache|diarrhea/i,
      /fatigue|tired/i,
      /flu|cold|cough/i,
    ],
    reply: [
      "🩺 **General Health & Symptoms Guidance**",
      "",
      "**🤒 Fever & Headaches:**",
      "Ensure you are drinking plenty of fluids. Rest in a cool, quiet place. Paracetamol can help reduce fever and pain. *Warning:* If a fever is very high, lasts more than 3 days, or is accompanied by a stiff neck, seek medical help immediately (could be malaria or meningitis).",
      "",
      "**🤢 Stomach Ache / Diarrhoea:**",
      "Stay hydrated! Drink ORS (Oral Rehydration Salts) or a mix of clean water, a pinch of salt, and a teaspoon of sugar. Avoid greasy or spicy foods.",
      "",
      "**🤧 Coughs & Colds:**",
      "Rest and warm fluids (like lemon and honey) can soothe the throat. If you have shortness of breath or a cough lasting more than 2-3 weeks, please visit a clinic to rule out TB or pneumonia.",
      "",
      "💡 *I am an AI assistant. For proper medical diagnosis or persistent symptoms, please use the 'Online Doctor' tab to speak with a professional or visit your local clinic.*"
    ]
  },

  // ── Chronic Conditions ───────────────────────────────────────────────────────
  {
    id: "chronic_conditions",
    triggers: [
      /chronic/i,
      /diabetes|sugar/i,
      /blood pressure|hypertension|bp/i,
      /asthma/i,
    ],
    reply: [
      "💊 **Chronic Conditions Management**",
      "",
      "**🩸 Diabetes (High Blood Sugar):**",
      "Take your medication/insulin exactly as prescribed. Eat regular, balanced meals high in fibre and low in refined sugars. If you feel dizzy, confused, or sweaty (low sugar), eat something sweet immediately.",
      "",
      "**❤️ Hypertension (High BP):**",
      "Take your BP pills daily, even if you feel fine! Reduce salt intake, exercise regularly, and avoid stress. High BP is a 'silent killer' and often has no symptoms.",
      "",
      "**🫁 Asthma:**",
      "Always carry your rescue inhaler. Avoid known triggers (smoke, strong smells, dust, cold air). If your inhaler isn't working during an attack, seek emergency care.",
      "",
      "Track your vitals using our **Health Tracker** tab!"
    ]
  },
];

// ── Smart bot matcher ────────────────────────────────────────────────────────
export function getBotResponse(userText, nickname, mode = 'general') {
  const name = nickname ? nickname : null;

  // Score responses based on triggers
  const scored = BOT_RESPONSES.map(r => {
    let score = 0;
    for (const pattern of r.triggers) {
      if (pattern.test(userText)) score += 10;
    }
    // Boost score if the response category matches the current active mode
    if (mode === 'first_aid' && r.id === 'first_aid') score += 5;
    if (mode === 'emergency' && r.id === 'emergency_numbers') score += 5;
    if (mode === 'chronic' && r.id === 'chronic_conditions') score += 5;
    
    return { ...r, score };
  }).filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);

  let lines;
  if (scored.length > 0) {
    lines = scored[0].reply;
  } else {
    // Mode-specific fallbacks when the bot doesn't understand the query
    if (mode === 'first_aid') {
      lines = [
        "🚑 **First Aid Mode**",
        "I specialize in providing quick guidance for burns, cuts, bleeding, choking, and CPR.",
        "Since I don't fully understand your query, and this could be an emergency, please consider calling an ambulance or rushing to the nearest clinic.",
      ];
    } else if (mode === 'emergency') {
      lines = [
        "🚨 **Emergency Mode**",
        "I can provide national emergency numbers for the Ambulance, Police, Fire Brigade, and crisis hotlines.",
        "If you are in immediate danger, please dial 993 for Ambulance or 995 for Police toll-free.",
      ];
    } else if (mode === 'chronic') {
      lines = [
        "💊 **Chronic Care Mode**",
        "I can provide foundational advice for managing Diabetes, Hypertension, Asthma, and HIV.",
        "For specific medication dosages or complex symptoms, please consult the Online Doctor or your local clinic.",
      ];
    } else {
      lines = [
        `${name ? name + ', I' : 'I'} am your general health assistant. I am equipped with a vast medical library!`,
        "",
        "You can ask me things like:",
        "• 🚑 \"What is the first aid for a burn?\"",
        "• 🚨 \"What are the emergency ambulance numbers?\"",
        "• 🩺 \"How do I treat a fever or stomach ache?\"",
        "• 💊 \"Tips for managing high blood pressure or diabetes?\"",
        "• 🦟 \"What are the symptoms of Malaria or Cholera?\"",
        "• 🧠 \"I am feeling very anxious or depressed.\"",
        "• 🤰 \"What are the warning signs during pregnancy?\"",
        "",
        "If you have a complex medical issue, please visit the **Online Doctor** tab or your local clinic. I'm here and everything is private. 🔒",
      ];
    }
  }

  // Prefix with name on first line if applicable and not already handled
  const firstLine = lines[0];
  if (name && !firstLine.includes(name) && !firstLine.includes('**')) {
    lines = [name + ", " + firstLine.charAt(0).toLowerCase() + firstLine.slice(1), ...lines.slice(1)];
  }

  return lines.join("\n");
}
