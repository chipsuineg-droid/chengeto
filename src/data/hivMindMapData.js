export const hivMindMapData = {
  id: "root",
  label: "HIV Education & Prevention",
  children: [
    {
      id: "what-is-hiv",
      label: "What is HIV?",
      children: [
        { 
          id: "virus", 
          label: "Viral Infection",
          children: [
            { id: "virus-type", label: "Human Immunodeficiency Virus" },
            { id: "virus-origin", label: "Originated in Chimpanzees (SIV)" }
          ]
        },
        { 
          id: "cd4", 
          label: "Targets Immune System",
          children: [
            { id: "cd4-cells", label: "Destroys CD4 (T-Cells)" },
            { id: "cd4-count", label: "Healthy count: 500-1500" },
            { id: "cd4-danger", label: "Danger zone: < 200 (AIDS)" }
          ]
        },
        { 
          id: "aids", 
          label: "Progression to AIDS",
          children: [
            { id: "aids-def", label: "Acquired Immunodeficiency Syndrome" },
            { id: "aids-opp", label: "Opportunistic Infections occur" }
          ]
        }
      ]
    },
    {
      id: "transmission",
      label: "Transmission",
      children: [
        { 
          id: "sex", 
          label: "Unprotected Sex",
          children: [
            { id: "sex-vaginal", label: "Vaginal Sex" },
            { id: "sex-anal", label: "Anal Sex (Higher Risk)" },
            { id: "sex-oral", label: "Oral Sex (Very Low Risk)" }
          ]
        },
        { 
          id: "blood", 
          label: "Blood Contact",
          children: [
            { id: "blood-needles", label: "Sharing Needles/Syringes" },
            { id: "blood-transfusion", label: "Transfusions (Rare today)" }
          ]
        },
        { 
          id: "mtct", 
          label: "Mother to Child",
          children: [
            { id: "mtct-preg", label: "During Pregnancy" },
            { id: "mtct-birth", label: "During Childbirth" },
            { id: "mtct-breast", label: "Through Breast Milk" }
          ]
        }
      ]
    },
    {
      id: "prevention",
      label: "Prevention Methods",
      children: [
        {
          id: "prep",
          label: "PrEP (Pre-Exposure)",
          children: [
            { 
              id: "prep-daily", 
              label: "Daily Oral Pills",
              children: [
                { id: "prep-pills-truvada", label: "Truvada / Descovy" },
                { id: "prep-pills-eff", label: "99% effective when taken daily" }
              ]
            },
            { 
              id: "prep-inj", 
              label: "Injectable PrEP",
              children: [
                { id: "prep-inj-cab", label: "CAB-LA (Apretude)" },
                { id: "prep-inj-freq", label: "Taken every 2 months" }
              ]
            },
            { id: "prep-ring", label: "Dapivirine Vaginal Ring (Monthly)" }
          ]
        },
        {
          id: "pep",
          label: "PEP (Post-Exposure)",
          children: [
            { id: "pep-time", label: "Start within 72 hours of exposure" },
            { id: "pep-dur", label: "Must take for 28 consecutive days" },
            { id: "pep-use", label: "For emergencies (e.g., broken condom)" }
          ]
        },
        {
          id: "condoms",
          label: "Barrier Methods",
          children: [
            { 
              id: "male-condom", 
              label: "Male Condoms",
              children: [
                { id: "mc-eff", label: "98% effective with perfect use" },
                { id: "mc-lube", label: "Use water-based lubricants only" }
              ]
            },
            { 
              id: "female-condom", 
              label: "Internal Condoms",
              children: [
                { id: "fc-insert", label: "Can be inserted up to 8 hours before" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "status",
      label: "Testing & Treatment",
      children: [
        { 
          id: "testing", 
          label: "Testing Options",
          children: [
            { id: "test-self", label: "Self-Testing Kits (OraQuick)" },
            { id: "test-clinic", label: "Rapid Blood Tests at Clinics" },
            { id: "test-window", label: "Window Period (18-90 days)" }
          ]
        },
        { 
          id: "treatment", 
          label: "ART (Antiretroviral Therapy)",
          children: [
            { id: "art-viral", label: "Suppresses viral load" },
            { id: "art-life", label: "Allows normal lifespan" }
          ]
        }
      ]
    },
    {
      id: "myths-facts",
      label: "Myths & Facts",
      children: [
        { 
          id: "myth", 
          label: "Common Myths (FALSE)",
          children: [
            { id: "myth-toilet", label: "Toilet seats / Swimming pools" },
            { id: "myth-bugs", label: "Mosquito bites" },
            { id: "myth-hug", label: "Hugging or sharing food" }
          ]
        },
        { 
          id: "fact", 
          label: "Scientific Facts (TRUE)",
          children: [
            { id: "fact-uu", label: "U=U (Undetectable = Untransmittable)" },
            { id: "fact-cure", label: "No cure yet, but highly treatable" }
          ]
        }
      ]
    }
  ]
};
