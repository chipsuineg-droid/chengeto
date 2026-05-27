import React from 'react';

export const PREG_PREVENTION_CATEGORIES = [
  { id: 'All', label: 'All', icon: '📋' },
  { id: 'short-acting', label: 'Short-Acting', icon: '⏱️' },
  { id: 'long-acting', label: 'Long-Acting Reversible', icon: '⏳' },
  { id: 'permanent', label: 'Permanent', icon: '🛑' },
  { id: 'natural', label: 'Natural', icon: '🌿' }
];

export const PREG_PREVENTION_METHODS = [
  // ── SHORT-ACTING METHODS ──
  {
    id: "pop",
    bannerImg: "/banners/preg-pop-pill.png",
    name: "Progestin-only Birth Control Pill",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "💊",
    urgent: false,
    tagline: "An estrogen-free daily pill that prevents pregnancy primarily by thickening cervical mucus.",
    effectiveness: 99,
    detail: {
      description: "It is an estrogen-free birth control pill. It contains a single hormone, progestin, that prevents pregnancy primarily by thickening cervical mucus, making it harder for the sperm and egg to meet. Progestin-only pills need to be taken at the same time every day to be effective at preventing pregnancy.",
      formOfUse: "One pill must be taken by mouth each day at the same time, to make it work.",
      howItWorks: [
        "Progestin-only birth control pill prevent pregnancy primarily by thickening cervical mucus, making it harder for the sperm and egg to meet.",
        "It also works by disrupting the menstrual cycle, including preventing the release of eggs from the ovaries (ovulation)."
      ],
      howToUse: [
        "Taking the progestin-only birth control pill is simple — a user takes one pill every day at the same time."
      ],
      frequency: [
        "The progestin-only birth control pill is taken daily and works as long as it is taken consistently."
      ],
      effectiveness: "When pills are taken every day at the same time, less than 1 pregnancy per 100 women using progestin-only birth control pills over the first year. With perfect use, progestin-only birth control pills are over 99% effective. As commonly used, about 7 pregnancies per 100 women using progestin-only birth control pills over the first year. Missing pills or taking them late increases the chance of pregnancy.",
      sideEffects: [
        "Changes in bleeding patterns",
        "Frequent bleeding",
        "Irregular bleeding",
        "Infrequent bleeding",
        "Prolonged bleeding",
        "No monthly bleeding",
        "Headaches",
        "Dizziness",
        "Mood changes",
        "Breast tenderness",
        "Abdominal pain",
        "Nausea"
      ],
      access: [
        "Progestin-only birth control pill is available in public and private health facilities and pharmacies across Zimbabwe."
      ],
      cost: "Provided for free in public health facilities. Costs between $1 and $1.50 in private sector.",
      returnToFertility: [
        "Does not affect ability to get pregnant after stopping using it.",
        "Users return to fertility quickly after going off the pill.",
        "It is possible to get pregnant within a day of stopping the pill."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Do not cause a breastfeeding woman’s milk to dry up.",
        "Do not make women infertile.",
        "Do not cause diarrhea in breastfeeding babies.",
        "Reduce the risk of ectopic pregnancy."
      ]
    }
  },
  {
    id: "combined-pill",
    bannerImg: "/banners/preg-combined-pill.png",
    name: "The Combined Pill",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "💊",
    urgent: false,
    tagline: "A daily oral contraception containing estrogen and progestin that prevents ovulation.",
    effectiveness: 99,
    detail: {
      description: "The combination birth control pill is a type of oral contraception that contains two hormones estrogen and progestin, which work together to prevent pregnancy.",
      formOfUse: "Pill taken every day.",
      howItWorks: [
        "The combined pill works by preventing the ovaries from releasing an egg each month (ovulation)."
      ],
      howToUse: [
        "One pill is taken a day to prevent pregnancy.",
        "Most combination birth control pills come in packs of 28 pills, with 21 consecutive pills containing hormones, followed by seven pills which do not contain hormones."
      ],
      frequency: [
        "Taken daily and works as long as it is taken consistently."
      ],
      effectiveness: "As commonly used, 4 to 7 pregnancies per 100 women using the combined pill over the first year. When no pill-taking mistakes are made, less than 1 pregnancy per 100 women using the combined pill over the first year. With perfect use, effectiveness is over 99%.",
      sideEffects: [
        "Changes in bleeding patterns",
        "Missed menstrual bleeding",
        "Changes in strength of menstrual bleeding",
        "Painful menstrual bleeding",
        "Vaginal inflammation",
        "Dizziness",
        "Nausea",
        "Vomiting",
        "Breast tenderness",
        "Breast pain",
        "Breast discharge",
        "Weight changes",
        "Mood changes",
        "Acne"
      ],
      access: [
        "Available in public and private health facilities and pharmacies across Zimbabwe."
      ],
      cost: "Provided free in public health facilities. Costs between $1 and $1.50 in private sector.",
      returnToFertility: [
        "Fertility generally returns quickly after stopping the pill.",
        "Possible to get pregnant within a day of stopping the pill."
      ],
      stiProtection: [
        "No protection against STIs."
      ],
      misunderstandings: [
        "Do not build up hormones in a woman’s body.",
        "Do not make women infertile.",
        "Do not cause birth defects or multiple births.",
        "Do not change women’s sexual behaviour.",
        "Do not collect in the stomach.",
        "Do not disrupt an existing pregnancy."
      ]
    }
  },
  {
    id: "depo-provera",
    bannerImg: "/banners/preg-injectable.png",
    name: "Injectable – Depo Provera",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "💉",
    urgent: false,
    tagline: "A provider-administered birth control shot given every three months.",
    effectiveness: 99,
    detail: {
      description: "The health provider administered birth control shot is an injection in the arm, belly, thigh, or butt that keeps one from getting pregnant. Commonly known as Depo Provera or “Depo”.",
      formOfUse: "Injection administered by a health provider.",
      howItWorks: [
        "Contains progestin which prevents pregnancy by stopping ovulation."
      ],
      howToUse: [
        "A health provider injects the shot at a health facility every three months."
      ],
      frequency: [
        "Lasts three months."
      ],
      effectiveness: "About 4 pregnancies per 100 women using injectables over the first year. When injections are received on time, less than 1 pregnancy per 100 women. Over 99% effective when used perfectly.",
      sideEffects: [
        "Nervousness",
        "Headache",
        "Weight increase or decrease",
        "Stomach pain",
        "Change in sex drive",
        "Depression",
        "Hair loss",
        "More hair on face or body",
        "Dizziness",
        "Breast tenderness"
      ],
      access: [
        "Available in some public and private health facilities in Zimbabwe."
      ],
      cost: "Free in public facilities. $12 to $15 every three months in private sector.",
      returnToFertility: [
        "Possible to get pregnant as soon as 15 weeks after last injection.",
        "For some users it can take up to a year."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Blood does not build up inside the body when periods stop.",
        "Does not disrupt an existing pregnancy.",
        "Does not make women infertile."
      ]
    }
  },
  {
    id: "sayana-press",
    bannerImg: "/banners/preg-injectable.png",
    name: "Injectable – Sayana Press",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "💉",
    urgent: false,
    tagline: "A self-administered birth control shot injected every three months.",
    effectiveness: 99,
    detail: {
      description: "A self-administered birth control shot injected under the skin into the upper thigh or abdomen to prevent pregnancy.",
      formOfUse: "Self-administered injection.",
      howItWorks: [
        "Contains progestin that prevents ovulation."
      ],
      howToUse: [
        "Self-inject every three months."
      ],
      frequency: [
        "Lasts three months."
      ],
      effectiveness: "About 4 pregnancies per 100 women over the first year. Over 99% effective with perfect use.",
      sideEffects: [
        "Nervousness",
        "Headache",
        "Weight changes",
        "Stomach discomfort",
        "Change in sex drive",
        "Depression",
        "Hair loss",
        "Dizziness",
        "Breast tenderness"
      ],
      access: [
        "Available in some public and private facilities in Zimbabwe."
      ],
      cost: "Free in public facilities. $2 to $3 every three months in private sector.",
      returnToFertility: [
        "Possible to get pregnant as soon as 15 weeks after last injection.",
        "May take up to a year for some users."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Blood does not build up inside the body.",
        "Does not disrupt pregnancy.",
        "Does not cause infertility."
      ]
    }
  },
  {
    id: "male-condom",
    bannerImg: "/banners/preg-male-condom.png",
    name: "Male Condom",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "🩲",
    urgent: false,
    dual: true,
    tagline: "A barrier contraception method for preventing pregnancy and sexually transmitted infections.",
    effectiveness: 98,
    detail: {
      description: "The male condom is a barrier contraception method for preventing pregnancy and sexually transmitted infections including HIV.",
      formOfUse: "Worn over the penis.",
      howItWorks: [
        "Creates a physical barrier that prevents sperm from fertilizing an egg.",
        "Reduces risk of STI transmission."
      ],
      howToUse: [
        "Place condom at tip of erect penis.",
        "Pinch the tip to leave space for semen.",
        "Roll down to base before sexual contact.",
        "Hold base after ejaculation while pulling out.",
        "Dispose properly."
      ],
      frequency: [
        "Use every time before sexual activity."
      ],
      effectiveness: "About 13 pregnancies per 100 women with common use. About 2 pregnancies per 100 women with correct use. 98% effective when used correctly.",
      sideEffects: [
        "Latex allergies",
        "Slight irritation",
        "Reduced sensation"
      ],
      access: [
        "Available freely in hospitals and clinics.",
        "Sold in supermarkets and pharmacies."
      ],
      cost: "Free in many facilities. $0.80 to $3.50 for pack of three.",
      returnToFertility: [
        "Fertility returns immediately after stopping use."
      ],
      stiProtection: [
        "Protects against HIV and STIs."
      ],
      misunderstandings: [
        "Do not make men sterile.",
        "Do not weaken men.",
        "Cannot get lost in the body.",
        "Do not contain HIV.",
        "Do not cause cancer."
      ]
    }
  },
  {
    id: "female-condom",
    bannerImg: "/banners/preg-female-condom.png",
    name: "Female Condom",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "🌸",
    urgent: false,
    dual: true,
    tagline: "A pouch worn inside the vagina that physically blocks sperm from getting to eggs.",
    effectiveness: 95,
    detail: {
      description: "The female condom is a pouch that works like a male condom and prevents pregnancy by physically blocking sperm from getting to eggs.",
      formOfUse: "Barrier method worn inside the vagina.",
      howItWorks: [
        "Prevents sperm from entering the vagina.",
        "Helps reduce STI and HIV risk."
      ],
      howToUse: [
        "Insert into vagina before sex.",
        "Semen stays inside condom and outside vagina."
      ],
      frequency: [
        "Use every time during sex."
      ],
      effectiveness: "About 21 pregnancies per 100 women with common use. About 5 pregnancies per 100 women with correct use. 95% effective with correct use.",
      sideEffects: [
        "Slight irritation",
        "Reduced sensation"
      ],
      access: [
        "Available free in clinics and hospitals.",
        "Sold in supermarkets and pharmacies."
      ],
      cost: "Free in many facilities. Around $0.50 each depending on location.",
      returnToFertility: [
        "Fertility returns immediately after stopping use."
      ],
      stiProtection: [
        "Reduces risk of HIV and STIs."
      ],
      misunderstandings: [
        "Cannot get lost in the body.",
        "Do not contain holes HIV can pass through.",
        "Used by married couples too.",
        "Do not cause illness in women."
      ]
    }
  },
  {
    id: "ec-pill",
    bannerImg: "/banners/preg-emergency.png",
    name: "Emergency Contraception",
    category: "short-acting",
    categoryLabel: "Short-Acting Method",
    icon: "⏰",
    urgent: true,
    tagline: "Helps stop pregnancy before it starts by delaying ovulation. Must be taken within 72 hours.",
    effectiveness: 99,
    detail: {
      description: "Emergency contraception helps stop pregnancy before it starts by delaying ovulation. It should be taken within 72 hours after unprotected sex.",
      formOfUse: "Pills taken within 72 hours after unprotected sex.",
      howItWorks: [
        "Prevents ovulation during the current menstrual cycle."
      ],
      howToUse: [
        "One or two pills taken at once."
      ],
      frequency: [
        "Used only during emergency situations and not for long-term contraception."
      ],
      effectiveness: "If 100 women used progestin-only emergency contraception pills, 1 would likely become pregnant. If 100 women used combined emergency contraception pills, 2 would likely become pregnant.",
      sideEffects: [
        "Irregular bleeding",
        "Nausea",
        "Fatigue",
        "Lower abdominal pain",
        "Headache",
        "Tender breasts",
        "Dizziness",
        "Vomiting",
        "Acne",
        "Mood changes"
      ],
      access: [
        "Available over the counter in pharmacies across Zimbabwe."
      ],
      cost: "Between $1 and $2.",
      returnToFertility: [
        "Fertility returns immediately after use."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: []
    }
  },

  // ── LONG-ACTING REVERSIBLE METHODS ──
  {
    id: "implant",
    bannerImg: "/banners/preg-implant.png",
    name: "Implant",
    category: "long-acting",
    categoryLabel: "Long-Acting Reversible Method",
    icon: "🩹",
    urgent: false,
    tagline: "A small rod inserted under the skin of the upper arm preventing pregnancy for 3 to 5 years.",
    effectiveness: 99,
    detail: {
      description: "The implant is a small rod, about the size of a matchstick, that is inserted under the skin of upper arm (after getting numbing medication), preventing pregnancy for 3 to 5 years. Once it is inserted, it is not visible in most cases. Once in place users do not need to think about them until they need replacing. Implant brand names in Zimbabwe include Jadelle (two rod implant) and Implanon (one rod implant).",
      formOfUse: "A small rod that is inserted under the skin of upper arm.",
      howItWorks: [
        "The implant slowly releases a single hormone, progestin, that prevents pregnancy primarily by thickening cervical mucus, making it harder for sperm and egg to meet."
      ],
      howToUse: [
        "A small rod, about the size of a matchstick, is inserted under the skin of upper arm by a trained health care provider to prevent pregnancy."
      ],
      frequency: [
        "Prevents pregnancy for 3 to 5 years.",
        "Jadelle prevents pregnancy up to 5 years.",
        "Implanon prevents pregnancy up to 3 years."
      ],
      effectiveness: "Over 99% effective. Far less than 1 pregnancy would be expected per 100 women using implants over the first year. Specifically, just 1 pregnancy would be expected per 1,000 women using implants over the first year.",
      sideEffects: [
        "Changes in bleeding patterns",
        "Headaches",
        "Abdominal pain",
        "Acne",
        "Weight change",
        "Breast tenderness",
        "Dizziness",
        "Mood changes",
        "Nausea",
        "Insertion site pain"
      ],
      access: [
        "Implants can be inserted in some private and public health facilities in Zimbabwe."
      ],
      cost: "Provided for free in public health facilities. Typically costs between $15 to $20 in the private sector.",
      returnToFertility: [
        "Fertility returns immediately within a few days to a week after removal."
      ],
      stiProtection: [
        "Implants do not protect against STIs."
      ],
      misunderstandings: [
        "Do not work once removed.",
        "Hormones do not remain in a woman’s body after removal.",
        "Do not cause harm if periods stop.",
        "Blood does not build up inside the body.",
        "Do not make women infertile.",
        "Do not increase the risk of ectopic pregnancy."
      ]
    }
  },
  {
    id: "copper-iud",
    bannerImg: "/banners/preg-hormonal-iud.png",
    name: "Non-Hormonal or Copper IUD",
    category: "long-acting",
    categoryLabel: "Long-Acting Reversible Method",
    icon: "⚕️",
    urgent: false,
    tagline: "A small, T-shaped piece of plastic wrapped in copper wire inserted in the uterus lasting up to 12 years.",
    effectiveness: 99,
    detail: {
      description: "The non-hormonal or copper IUD is a small, T-shaped piece of plastic wrapped in copper wire inserted in the uterus. It is a long-lasting and reversible contraceptive method.",
      formOfUse: "A T-shaped piece of plastic wrapped in copper wire inserted in the uterus by a health care provider.",
      howItWorks: [
        "The copper component damages the sperm and prevents it from meeting the egg."
      ],
      howToUse: [
        "The non-hormonal IUD is inserted in the uterus by a health care provider."
      ],
      frequency: [
        "Lasts up to 12 years and is one of the longest lasting birth control methods."
      ],
      effectiveness: "Over 99% effective at preventing pregnancy. Less than 1 pregnancy per 100 women using an IUD over the first year.",
      sideEffects: [
        "Heavier periods",
        "Longer periods",
        "Spotting between periods",
        "Cramps",
        "Backaches",
        "Dizziness during and after insertion",
        "IUD slipping out",
        "IUD pushing through the wall of the uterus",
        "Some partners may feel the strings",
        "Ectopic pregnancy"
      ],
      access: [
        "Can be inserted in some public and private health facilities in Zimbabwe."
      ],
      cost: "Provided free in public health facilities. Typically costs between $15 to $25 in the private sector including device and user fees.",
      returnToFertility: [
        "Stops working immediately after removal.",
        "Normal fertility returns immediately.",
        "It is possible to get pregnant the same day it is removed."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Do not increase risk of STIs including HIV.",
        "Do not increase risk of miscarriage after removal.",
        "Do not make women infertile.",
        "Do not cause birth defects.",
        "Do not cause cancer.",
        "Do not move to the heart or brain.",
        "Do not cause discomfort or pain during sex."
      ]
    }
  },
  {
    id: "hormonal-iud",
    bannerImg: "/banners/preg-hormonal-iud.png",
    name: "Hormonal IUD",
    category: "long-acting",
    categoryLabel: "Long-Acting Reversible Method",
    icon: "⚕️",
    urgent: false,
    tagline: "A T-shaped piece of plastic that releases progestin inside the uterus, lasting 3 to 8 years.",
    effectiveness: 99,
    detail: {
      description: "The hormonal IUD is a small, T-shaped piece of plastic that a health care provider inserts into the uterus to prevent pregnancy. Contains a hormone progestin, preventing pregnancy mainly by thickening cervical mucus to keep sperm from reaching the uterus. It is a long-lasting and reversible method of contraception.",
      formOfUse: "Inserted into the uterus by a health care provider.",
      howItWorks: [
        "Releases a small amount of progestin.",
        "Prevents pregnancy mainly by thickening cervical mucus to keep sperm from reaching the uterus."
      ],
      howToUse: [
        "A small T-shaped piece of plastic inserted into the uterus by a health care provider."
      ],
      frequency: [
        "Lasts between 3 and 8 years."
      ],
      effectiveness: "One of the most effective birth control methods. Over 99% effective. Less than 1 pregnancy per 100 women over the first year.",
      sideEffects: [
        "Spotting between periods",
        "Cramps",
        "Backaches",
        "Lighter periods",
        "Irregular periods",
        "Periods stopping altogether",
        "Breast pain",
        "Headaches"
      ],
      access: [
        "Can be inserted in some public and private health facilities in Zimbabwe."
      ],
      cost: "Provided free in public health facilities. Typically ranges between $15 to $25 in the private sector.",
      returnToFertility: [
        "Fertility returns quickly after removal."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Does not cause infertility.",
        "Does not cause cancer.",
        "Does not move around the body.",
        "Does not interfere with sex.",
        "Blood does not build up inside the body when periods stop."
      ]
    }
  },

  // ── PERMANENT METHODS ──
  {
    id: "tubal-ligation",
    bannerImg: "/banners/preg-tubal-ligation.png",
    name: "Tubal Ligation (Female Sterilization)",
    category: "permanent",
    categoryLabel: "Permanent Method",
    icon: "✂️",
    urgent: false,
    tagline: "A permanent method of contraception where the fallopian tubes are blocked or cut.",
    effectiveness: 99,
    detail: {
      description: "Tubal ligation is a permanent method of contraception for women. The fallopian tubes are blocked or cut so that sperm and egg cannot meet.",
      formOfUse: "Surgical procedure performed by a trained provider.",
      howItWorks: [
        "Prevents sperm from reaching the egg by blocking or cutting the fallopian tubes."
      ],
      howToUse: [
        "A trained healthcare provider performs the surgical procedure."
      ],
      frequency: [
        "Permanent method."
      ],
      effectiveness: "Over 99% effective.",
      sideEffects: [
        "Pain after surgery",
        "Bleeding",
        "Infection risks associated with surgery"
      ],
      access: [
        "Available in selected health facilities in Zimbabwe."
      ],
      cost: "Costs vary depending on facility and procedure.",
      returnToFertility: [
        "Intended to be permanent and not reversible in most cases."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Does not remove a woman’s organs.",
        "Does not affect sexual pleasure.",
        "Does not make women weak.",
        "Does not immediately cause menopause."
      ]
    }
  },
  {
    id: "vasectomy",
    bannerImg: "/banners/preg-vasectomy.png",
    name: "Vasectomy",
    category: "permanent",
    categoryLabel: "Permanent Method",
    icon: "✂️",
    urgent: false,
    tagline: "A permanent surgical contraception method for men where tubes carrying sperm are cut or blocked.",
    effectiveness: 99,
    detail: {
      description: "Vasectomy is a permanent surgical contraception method for men. The tubes that carry sperm are cut or blocked to prevent sperm from entering semen.",
      formOfUse: "Minor surgical procedure for men.",
      howItWorks: [
        "Prevents sperm from mixing with semen."
      ],
      howToUse: [
        "A trained healthcare provider performs the procedure."
      ],
      frequency: [
        "Permanent method."
      ],
      effectiveness: "Over 99% effective.",
      sideEffects: [
        "Mild pain",
        "Swelling",
        "Bruising",
        "Infection risks associated with surgery"
      ],
      access: [
        "Available in selected health facilities."
      ],
      cost: "Costs vary depending on facility and provider.",
      returnToFertility: [
        "Intended to be permanent."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Does not affect masculinity.",
        "Does not reduce sexual performance.",
        "Does not remove the testicles.",
        "Does not cause weakness."
      ]
    }
  },

  // ── NATURAL METHODS ──
  {
    id: "withdrawal",
    bannerImg: "/banners/preg-male-condom.png",
    name: "Withdrawal / Pull Out Method",
    category: "natural",
    categoryLabel: "Natural Method",
    icon: "⏱️",
    urgent: false,
    tagline: "The penis is removed from the vagina before ejaculation to reduce the chance of pregnancy.",
    effectiveness: 78,
    detail: {
      description: "Withdrawal or pull out is a method where the penis is removed from the vagina before ejaculation to reduce the chance of pregnancy.",
      formOfUse: "Penis withdrawn before ejaculation.",
      howItWorks: [
        "Prevents semen from entering the vagina."
      ],
      howToUse: [
        "The penis must be pulled out before ejaculation every time during sex."
      ],
      frequency: [
        "Used every time during sexual intercourse."
      ],
      effectiveness: "Less effective than many modern contraceptive methods. Pregnancy can still occur if semen enters the vagina.",
      sideEffects: [
        "No physical side effects."
      ],
      access: [
        "Does not require a health facility or medical product."
      ],
      cost: "No cost.",
      returnToFertility: [
        "Fertility is unaffected."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Withdrawal requires correct timing every time.",
        "Pregnancy can still happen even if withdrawal is attempted."
      ]
    }
  },
  {
    id: "lam",
    bannerImg: "/banners/preg-pop-pill.png",
    name: "Lactational Amenorrhea Method (LAM)",
    category: "natural",
    categoryLabel: "Natural Method",
    icon: "🤱",
    urgent: false,
    tagline: "A temporary method of contraception used by breastfeeding mothers after childbirth.",
    effectiveness: 98,
    detail: {
      description: "The Lactational Amenorrhea Method (LAM) is a temporary method of contraception used by breastfeeding mothers after childbirth.",
      formOfUse: "Exclusive breastfeeding.",
      howItWorks: [
        "Frequent breastfeeding suppresses ovulation."
      ],
      howToUse: [
        "The baby must be less than 6 months old.",
        "Monthly periods must not have returned.",
        "The baby must be exclusively breastfed day and night."
      ],
      frequency: [
        "Works for up to 6 months after childbirth if all LAM conditions are met."
      ],
      effectiveness: "Highly effective when used correctly and all conditions are met.",
      sideEffects: [
        "No medical side effects."
      ],
      access: [
        "Information and support available through maternal healthcare services."
      ],
      cost: "No direct cost.",
      returnToFertility: [
        "Fertility returns once breastfeeding reduces or menstruation returns."
      ],
      stiProtection: [
        "Does not protect against STIs."
      ],
      misunderstandings: [
        "Works only when all three conditions are met.",
        "Pregnancy can occur if breastfeeding decreases or periods return."
      ]
    }
  }
];
