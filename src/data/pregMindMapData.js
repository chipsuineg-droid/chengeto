export const pregMindMapData = {
  id: "root",
  label: "Pregnancy & Contraception",
  children: [
    {
      id: "what-is-pregnancy",
      label: "Pregnancy Basics",
      children: [
        { id: "fertilization", label: "Fertilization (Sperm meets egg)" },
        { id: "implantation", label: "Implantation in Uterus" },
        { id: "early-signs", label: "Early Signs (Missed period, nausea)" }
      ]
    },
    {
      id: "contraception",
      label: "Contraception Methods",
      children: [
        {
          id: "barrier",
          label: "Barrier Methods",
          children: [
            { id: "male-condom", label: "Male Condom" },
            { id: "female-condom", label: "Female Condom" }
          ]
        },
        {
          id: "hormonal",
          label: "Hormonal Methods",
          children: [
            { id: "pills", label: "Oral Contraceptive Pills" },
            { id: "implants", label: "Implants (Jadelle, Implanon)" },
            { id: "injectables", label: "Injectables (Depo-Provera)" }
          ]
        },
        {
          id: "emergency",
          label: "Emergency Contraception",
          children: [
            { id: "plan-b", label: "Morning After Pill (Plan B)" },
            { id: "copper-iud-ec", label: "Copper IUD (Up to 5 days after)" }
          ]
        }
      ]
    },
    {
      id: "stages",
      label: "Stages of Pregnancy",
      children: [
        { id: "trimester-1", label: "1st Trimester (Weeks 1-12)" },
        { id: "trimester-2", label: "2nd Trimester (Weeks 13-28)" },
        { id: "trimester-3", label: "3rd Trimester (Weeks 29-40)" }
      ]
    },
    {
      id: "care",
      label: "Prenatal Care",
      children: [
        { id: "diet", label: "Healthy Diet & Supplements (Folic Acid)" },
        { id: "visits", label: "Regular Clinic Visits" },
        { id: "avoid", label: "Things to Avoid (Alcohol, Smoking)" }
      ]
    }
  ]
};
