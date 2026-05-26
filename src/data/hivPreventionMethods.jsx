// ── HIV PREVENTION METHODS DATA (MASCOT Document) ──
// Full detailed information for all HIV prevention methods

export const HIV_PREVENTION_METHODS = [
  // ════════════════════════════════════════════════════
  // CATEGORY 1: PRE-EXPOSURE PROPHYLAXIS (PrEP)
  // ════════════════════════════════════════════════════
  {
    id: "prep-oral",
    category: "PrEP",
    categoryLabel: "Pre-Exposure Prophylaxis (PrEP)",
    icon: "💊",
    name: "Daily Oral PrEP",
    tagline: "A pill taken every day to prevent HIV before possible exposure.",
    effectiveness: 99,
    dual: false,
    cat: "Before Exposure",
    detail: {
      description: "Daily oral PrEP is a pill taken every day by HIV-negative individuals to reduce the risk of getting HIV. It is designed for people who may be at ongoing risk of HIV exposure.",
      formOfUse: "A pill taken by mouth every day.",
      howItWorks: [
        "Daily oral PrEP works by using HIV prevention medicines that stop HIV from establishing infection in the body if exposure occurs.",
        "The medicines provide protection when taken consistently every day."
      ],
      howToUse: [
        "One pill is taken every day.",
        "The pill should be taken consistently as prescribed for maximum protection.",
        "Users should continue taking the pills daily while they remain at risk of HIV exposure."
      ],
      frequency: [
        "Protection depends on consistent daily use.",
        "Protection for anal sex starts after about 7 days of daily use.",
        "Protection for vaginal sex and injecting drug use starts after about 21 days of daily use.",
        "Users should continue taking the medication for at least 7 days after the last possible HIV exposure."
      ],
      effectiveness: "Daily oral PrEP can reduce the risk of HIV infection by up to 99% when taken consistently and correctly.",
      sideEffects: [
        "Nausea",
        "Headaches",
        "Weight changes",
        "Fatigue",
        "Mild stomach discomfort"
      ],
      access: [
        "Daily oral PrEP is available in selected public and private health facilities in Zimbabwe.",
        "HIV testing is required before starting PrEP."
      ],
      cost: "PrEP may be provided free in public sector facilities. Costs may vary in private facilities.",
      stiProtection: [
        "Daily oral PrEP protects against HIV only.",
        "It does not protect against other sexually transmitted infections.",
        "Condoms are still recommended for protection against STIs and pregnancy."
      ],
      misunderstandings: [
        "Does not cure HIV.",
        "Does not replace condoms for STI prevention.",
        "Does not mean a person has HIV.",
        "Must be taken consistently to work effectively."
      ]
    }
  },

  {
    id: "cab-la",
    category: "PrEP",
    categoryLabel: "Pre-Exposure Prophylaxis (PrEP)",
    icon: "💉",
    name: "Cabotegravir Long Acting Injection (CAB-LA)",
    tagline: "A long-acting injectable HIV prevention medicine given every two months.",
    effectiveness: 99,
    dual: false,
    cat: "Before Exposure",
    detail: {
      description: "Cabotegravir Long Acting Injection (CAB-LA) is a long-acting injectable HIV prevention medicine used by HIV-negative individuals to reduce the risk of HIV infection.",
      formOfUse: "An injection administered into the muscle by a healthcare provider.",
      howItWorks: [
        "CAB-LA slowly releases HIV prevention medicine into the body over time.",
        "The medicine prevents HIV from establishing infection if exposure occurs."
      ],
      howToUse: [
        "Two starting injections are given one month apart.",
        "After that, injections are given every two months by a healthcare provider."
      ],
      frequency: [
        "Each injection provides protection for approximately two months.",
        "Maximum protection is expected about 7 days after the first injection."
      ],
      effectiveness: "CAB-LA is highly effective when injections are received on schedule. Can reduce HIV risk by more than 99% when used correctly.",
      sideEffects: [
        "Injection site pain",
        "Headaches",
        "Fever",
        "Fatigue",
        "Muscle pain"
      ],
      access: [
        "Available in selected health facilities.",
        "HIV testing is required before initiation."
      ],
      cost: "Availability and cost depend on the health facility. Inquire at your nearest public hospital HIV clinic.",
      stiProtection: [
        "Protects against HIV only.",
        "Does not protect against other STIs or pregnancy."
      ],
      misunderstandings: [
        "Does not cure HIV.",
        "Is not a vaccine.",
        "Requires repeat injections to maintain protection."
      ]
    }
  },

  {
    id: "lenacapavir",
    category: "PrEP",
    categoryLabel: "Pre-Exposure Prophylaxis (PrEP)",
    icon: "🔬",
    name: "Long-Acting Injectable PrEP (Lenacapavir – LEN)",
    tagline: "An injectable HIV prevention medicine providing protection for six months per dose.",
    effectiveness: 99,
    dual: false,
    cat: "Before Exposure",
    detail: {
      description: "Lenacapavir (LEN) is a long-acting injectable HIV prevention medicine used to reduce the risk of HIV infection in HIV-negative individuals.",
      formOfUse: "An injection administered by a healthcare provider.",
      howItWorks: [
        "Lenacapavir releases HIV prevention medicine slowly over time to maintain HIV protection."
      ],
      howToUse: [
        "The injection is administered every six months after HIV testing confirms the person is HIV-negative."
      ],
      frequency: [
        "Each injection provides HIV protection for approximately six months."
      ],
      effectiveness: "More than 99% effective when injections are received on schedule.",
      sideEffects: [
        "Injection site reactions",
        "Headache",
        "Fatigue",
        "Nausea"
      ],
      access: [
        "Available in selected health facilities where provided."
      ],
      cost: "Inquire at your nearest health facility regarding availability and costs.",
      stiProtection: [
        "Protects against HIV only.",
        "Does not protect against pregnancy or other STIs."
      ],
      misunderstandings: []
    }
  },

  {
    id: "dapivirine",
    category: "PrEP",
    categoryLabel: "Pre-Exposure Prophylaxis (PrEP)",
    icon: "💍",
    name: "Dapivirine Vaginal Ring",
    tagline: "A flexible silicone ring worn inside the vagina to help reduce the risk of HIV in women.",
    effectiveness: 72,
    dual: false,
    cat: "Before Exposure",
    detail: {
      description: "The dapivirine vaginal ring is a flexible silicone ring worn inside the vagina to help reduce the risk of HIV infection in women.",
      formOfUse: "A vaginal ring inserted inside the vagina.",
      howItWorks: [
        "The ring slowly releases dapivirine medicine inside the vagina to help prevent HIV infection."
      ],
      howToUse: [
        "The ring is inserted into the vagina.",
        "It should remain inside continuously for 28 days.",
        "After 28 days, it is removed and replaced with a new ring."
      ],
      frequency: [
        "One ring lasts for 28 days.",
        "The ring should be replaced monthly."
      ],
      effectiveness: "Real-world use lowers HIV risk by approximately 60% to 85%. Consistent and correct use provides higher protection.",
      sideEffects: [
        "Vaginal discomfort",
        "Vaginal itching",
        "Pelvic pain",
        "Headaches"
      ],
      access: [
        "Available in selected health facilities."
      ],
      cost: "Inquire at your nearest reproductive health clinic regarding availability.",
      stiProtection: [
        "Protects against HIV only.",
        "Does not protect against pregnancy or other STIs."
      ],
      misunderstandings: []
    }
  },

  // ════════════════════════════════════════════════════
  // CATEGORY 2: BARRIER METHODS
  // ════════════════════════════════════════════════════
  {
    id: "condom-male",
    category: "Barrier",
    categoryLabel: "Barrier Methods",
    icon: "🛡️",
    name: "Male Condom",
    tagline: "A thin sheath worn over the penis during sex to reduce HIV, STI and pregnancy risk.",
    effectiveness: 98,
    dual: true,
    cat: "Before Exposure",
    detail: {
      description: "The male condom is a thin latex or polyurethane sheath worn over the penis during sex to reduce the risk of HIV, STIs, and pregnancy.",
      formOfUse: "Worn over the penis before sexual contact.",
      howItWorks: [
        "Creates a physical barrier preventing semen from entering the vagina, anus, or mouth.",
        "Helps reduce HIV and STI transmission."
      ],
      howToUse: [
        "Place on the erect penis before sexual contact.",
        "Roll down fully.",
        "Hold the base during withdrawal after ejaculation.",
        "Dispose properly after use."
      ],
      frequency: [
        "Used once during each sexual act."
      ],
      effectiveness: "Up to 98% effective when used correctly and consistently.",
      sideEffects: [
        "Latex allergy or irritation in some users.",
        "Reduced sensation for some users."
      ],
      access: [
        "Available free in many public health facilities.",
        "Also sold in pharmacies and supermarkets."
      ],
      cost: "Free at government clinics and student health centres. Also available at pharmacies.",
      stiProtection: [
        "Helps reduce HIV and STI transmission.",
        "The ONLY method that protects against both HIV and pregnancy at the same time."
      ],
      misunderstandings: [
        "Do not contain HIV.",
        "Do not cause infertility.",
        "Do not weaken men.",
        "Cannot disappear inside the body."
      ]
    }
  },

  {
    id: "condom-female",
    category: "Barrier",
    categoryLabel: "Barrier Methods",
    icon: "💜",
    name: "Female Condom",
    tagline: "A pouch inserted inside the vagina that helps prevent HIV, STIs, and pregnancy.",
    effectiveness: 95,
    dual: true,
    cat: "Before Exposure",
    detail: {
      description: "The female condom is a pouch inserted inside the vagina that helps prevent HIV, STIs, and pregnancy.",
      formOfUse: "Inserted into the vagina before sex.",
      howItWorks: [
        "Creates a barrier preventing semen from entering the vagina."
      ],
      howToUse: [
        "Insert into the vagina before sexual activity.",
        "Remove after use and dispose safely."
      ],
      frequency: [
        "Single use for each act of sex."
      ],
      effectiveness: "Approximately 95% effective when used correctly.",
      sideEffects: [
        "Vaginal irritation",
        "Reduced sensation during sex"
      ],
      access: [
        "Available in selected public and private facilities."
      ],
      cost: "Free at government clinics and student health centres.",
      stiProtection: [
        "Reduces HIV and STI transmission risk.",
        "Also protects against pregnancy."
      ],
      misunderstandings: []
    }
  },

  // ════════════════════════════════════════════════════
  // CATEGORY 3: POST-EXPOSURE PROPHYLAXIS (PEP)
  // ════════════════════════════════════════════════════
  {
    id: "pep",
    category: "PEP",
    categoryLabel: "Post-Exposure Prophylaxis (PEP)",
    icon: "🚨",
    name: "Post-Exposure Prophylaxis (PEP)",
    tagline: "Emergency HIV medication taken after possible exposure to HIV to prevent infection.",
    effectiveness: 99,
    dual: false,
    cat: "After Exposure / Testing",
    urgent: true,
    detail: {
      description: "PEP is emergency HIV medication taken after possible exposure to HIV to prevent infection.",
      formOfUse: "HIV prevention pills taken daily for 28 days.",
      howItWorks: [
        "Prevents HIV from establishing infection after exposure."
      ],
      howToUse: [
        "Must be started as soon as possible after exposure.",
        "Must begin within 72 hours.",
        "Pills are taken daily for 28 days."
      ],
      frequency: [
        "Must be started within 72 hours (3 days) of possible HIV exposure.",
        "Pills are taken every day for a full 28-day course.",
        "The sooner PEP is started, the more effective it is."
      ],
      effectiveness: "More than 99% effective when started quickly and taken correctly.",
      sideEffects: [
        "Nausea",
        "Fatigue",
        "Headaches",
        "Diarrhea"
      ],
      access: [
        "Available free at government hospitals and emergency departments.",
        "Go to Parirenyatwa A&E, Harare Hospital, or Sally Mugabe A&E — available 24/7.",
        "HIV testing is done at the clinic before prescribing PEP."
      ],
      cost: "Free at government hospitals and emergency departments.",
      stiProtection: [
        "Protects against HIV only.",
        "Does not prevent pregnancy or other STIs."
      ],
      misunderstandings: [
        "PEP is not a substitute for regular HIV prevention methods like condoms or PrEP.",
        "PEP must be completed for the full 28 days to work properly.",
        "PEP is not 100% guaranteed if started late or not taken consistently."
      ]
    }
  },

  // ════════════════════════════════════════════════════
  // CATEGORY 4: VOLUNTARY MEDICAL MALE CIRCUMCISION
  // ════════════════════════════════════════════════════
  {
    id: "vmmc",
    category: "VMMC",
    categoryLabel: "Voluntary Medical Male Circumcision (VMMC)",
    icon: "⚕️",
    name: "Voluntary Medical Male Circumcision (VMMC)",
    tagline: "A one-time surgical procedure that reduces HIV risk by approximately 60% for men.",
    effectiveness: 60,
    dual: false,
    cat: "Before Exposure",
    detail: {
      description: "A surgical procedure that removes the foreskin from the penis to reduce the risk of HIV infection in men.",
      formOfUse: "One-time surgical procedure.",
      howItWorks: [
        "Reduces the amount of tissue vulnerable to HIV infection."
      ],
      howToUse: [
        "The procedure is performed by trained medical personnel in a clinical setting.",
        "Wound care instructions must be followed after the procedure.",
        "Sexual activity should be avoided for at least 6 weeks after the procedure to allow full healing."
      ],
      frequency: [
        "Permanent procedure.",
        "Protection is lifelong once the procedure is completed and healed."
      ],
      effectiveness: "Reduces female-to-male HIV transmission risk by approximately 60%.",
      sideEffects: [
        "Pain",
        "Swelling",
        "Bleeding",
        "Infection if wound care is poor"
      ],
      access: [
        "Free at government hospitals and district hospitals.",
        "Available at Parirenyatwa, Harare Hospital, Sally Mugabe Hospital, and district hospitals."
      ],
      cost: "Free at government hospitals.",
      stiProtection: [
        "Partial protection against some STIs.",
        "Does not provide complete HIV protection.",
        "Condoms should still be used for full protection."
      ],
      misunderstandings: [
        "VMMC does not eliminate HIV risk completely.",
        "Condoms are still needed after VMMC for full HIV and STI protection.",
        "VMMC does not protect female partners from HIV — they still need their own prevention method."
      ]
    }
  },

  // ════════════════════════════════════════════════════
  // CATEGORY 5: TREATMENT AS PREVENTION (TasP)
  // ════════════════════════════════════════════════════
  {
    id: "tasp",
    category: "TasP",
    categoryLabel: "Treatment as Prevention (TasP)",
    icon: "💊",
    name: "Treatment as Prevention (TasP)",
    tagline: "People living with HIV take ART consistently to suppress the virus and prevent transmission.",
    effectiveness: 99,
    dual: false,
    cat: "After Exposure / Testing",
    detail: {
      description: "Treatment as Prevention means people living with HIV take antiretroviral therapy (ART) consistently to suppress the virus and prevent HIV transmission.",
      formOfUse: "Antiretroviral therapy (ART) tablets taken consistently as prescribed by a healthcare provider.",
      howItWorks: [
        "ART reduces HIV in the body to undetectable levels.",
        "When HIV is undetectable, it cannot be sexually transmitted."
      ],
      howToUse: [
        "ART must be taken consistently every day as prescribed.",
        "Regular viral load monitoring is done by a healthcare provider to confirm undetectable status.",
        "Missing doses can allow the virus to rebound to detectable levels."
      ],
      frequency: [
        "ART is taken daily for life.",
        "Regular clinic follow-ups are required to monitor treatment success."
      ],
      effectiveness: "Can reduce HIV transmission risk by up to 99% when viral load is consistently undetectable.",
      sideEffects: [
        "Side effects vary depending on the ART regimen.",
        "Common effects include nausea, fatigue, and headaches — these often improve over time.",
        "A healthcare provider can adjust the regimen if side effects are persistent."
      ],
      access: [
        "ART is available free at all government health facilities in Zimbabwe.",
        "People living with HIV can access ART at public hospitals, clinics, and student health facilities."
      ],
      cost: "ART is free at all government health facilities in Zimbabwe.",
      stiProtection: [
        "TasP protects HIV-negative partners from acquiring HIV when the positive partner is undetectable.",
        "Does not protect against other STIs.",
        "Condoms are still recommended for full protection."
      ],
      misunderstandings: [
        "Does not cure HIV.",
        "Requires consistent ART adherence — missing doses can allow the virus to become detectable again.",
        "Supports the principle of U=U (Undetectable = Untransmittable).",
        "U=U does not apply when viral load is detectable — consistent adherence is essential."
      ]
    }
  },

  // ════════════════════════════════════════════════════
  // CATEGORY 6: HARM REDUCTION
  // ════════════════════════════════════════════════════
  {
    id: "harm-reduction",
    category: "HarmReduction",
    categoryLabel: "Harm Reduction (For People Who Inject Drugs)",
    icon: "🩺",
    name: "Harm Reduction (For People Who Inject Drugs)",
    tagline: "Services and strategies that reduce HIV transmission among people who inject drugs.",
    effectiveness: 80,
    dual: false,
    cat: "Before Exposure",
    detail: {
      description: "Harm reduction includes services and strategies that reduce HIV transmission among people who inject drugs.",
      formOfUse: "A set of practices and services, including use of sterile needles and syringes, designed to reduce HIV risk.",
      howItWorks: [
        "Reduces HIV risk through sterile injecting equipment and safer practices."
      ],
      howToUse: [
        "Use sterile needles and syringes every time.",
        "Avoid sharing injecting equipment."
      ],
      frequency: [
        "Sterile equipment should be used every single time injecting drugs.",
        "Access needle and syringe programmes (NSP) regularly to obtain clean equipment."
      ],
      effectiveness: "Consistent use of sterile equipment significantly lowers HIV transmission risk.",
      sideEffects: [
        "No side effects from harm reduction strategies themselves.",
        "Note: drug use carries its own significant health risks — seek support if needed."
      ],
      access: [
        "Needle and syringe programmes and harm reduction services are available at selected health facilities.",
        "Contact a local health facility or NGO for information on services near you."
      ],
      cost: "Sterile equipment through harm reduction programmes is generally free or low-cost.",
      stiProtection: [
        "Focuses mainly on reducing HIV and blood-borne infection transmission.",
        "Use of condoms alongside harm reduction further reduces STI risk."
      ],
      misunderstandings: [
        "Harm reduction services are available without judgement.",
        "Accessing harm reduction services does not mean a person cannot also seek help to stop drug use."
      ]
    }
  }
];

// ── CATEGORY METADATA ──
export const HIV_PREVENTION_CATEGORIES = [
  { id: "all",             label: "All Methods",     icon: "📋" },
  { id: "Before Exposure", label: "Before Exposure", icon: "🛡️" },
  { id: "After Exposure",  label: "After Exposure",  icon: "🚨" },
];

