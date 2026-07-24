// ── HEALTH TUTOR: Comprehensive Disease & Wellness Data ─────────────────────
// Each disease follows the same structure so HealthTutor.jsx can render them
// uniformly, mirroring the HIV / Pregnancy design pattern.

export const HEALTH_TUTOR_CATEGORIES = [
  { id: 'diabetes',        label: '🩸 Diabetes',          color: '#3B82F6' },
  { id: 'hypertension',    label: '🫀 Hypertension',      color: '#EF4444' },
  { id: 'malaria',         label: '🦟 Malaria',           color: '#10B981' },
  { id: 'tuberculosis',    label: '🫁 Tuberculosis',      color: '#F59E0B' },
  { id: 'cholera',         label: '💧 Cholera',           color: '#06B6D4' },
  { id: 'typhoid',         label: '🌡️ Typhoid',          color: '#8B5CF6' },
  { id: 'respiratory',     label: '😮‍💨 Respiratory',    color: '#64748B' },
  { id: 'mental_health',   label: '🧠 Mental Health',     color: '#A855F7' },
  { id: 'nutrition',       label: '🥗 Nutrition',         color: '#22C55E' },
  { id: 'maternal',        label: '🤰 Maternal Health',   color: '#EC4899' },
  { id: 'cancer',          label: '🎗️ Cancer Awareness',  color: '#F97316' },
  { id: 'first_aid',       label: '🩹 First Aid',         color: '#EF4444' },
];

export const HEALTH_TUTOR_DATA = {

  // ── DIABETES ─────────────────────────────────────────────────────────────
  diabetes: {
    id: 'diabetes',
    icon: '🩸',
    title: 'Diabetes (Sugar Disease)',
    subtitle: 'Understanding and managing blood sugar levels for a healthy life.',
    accentColor: '#3B82F6',
    what: {
      heading: 'What is Diabetes?',
      body: `Diabetes is a chronic condition where the body cannot properly regulate blood sugar (glucose) levels. 
Glucose is the body's main source of energy, and insulin — a hormone made by the pancreas — is needed to 
move glucose from the blood into cells. When insulin is absent or ineffective, glucose builds up in the bloodstream, 
damaging organs, nerves, and blood vessels over time.`,
      types: [
        { name: 'Type 1 Diabetes', desc: 'The immune system destroys the insulin-producing cells. Insulin injections are required daily. Usually diagnosed in children and young adults.' },
        { name: 'Type 2 Diabetes', desc: 'The body does not use insulin well. Most common type (90% of cases). Linked to diet, weight, and lifestyle. Can often be managed with medication and diet.' },
        { name: 'Gestational Diabetes', desc: 'Develops during pregnancy. Usually disappears after birth but increases the risk of Type 2 later in life.' },
      ]
    },
    symptoms: [
      { icon: '🚽', text: 'Frequent urination, especially at night' },
      { icon: '💧', text: 'Extreme thirst that won\'t go away' },
      { icon: '😴', text: 'Unusual fatigue or tiredness' },
      { icon: '👁️', text: 'Blurred vision' },
      { icon: '🩹', text: 'Wounds or cuts that heal very slowly' },
      { icon: '🫀', text: 'Tingling or numbness in hands and feet' },
      { icon: '⚖️', text: 'Unexplained weight loss (Type 1)' },
    ],
    prevention: [
      { title: 'Healthy Diet', desc: 'Reduce refined sugars, white bread, and fizzy drinks. Eat more vegetables, whole grains, and lean proteins.', icon: '🥗' },
      { title: 'Regular Exercise', desc: 'Aim for at least 30 minutes of moderate activity (walking, cycling) most days of the week.', icon: '🏃' },
      { title: 'Maintain Healthy Weight', desc: 'Even a 5–10% reduction in body weight significantly reduces Type 2 risk.', icon: '⚖️' },
      { title: 'Regular Blood Sugar Checks', desc: 'Test your blood sugar at least once a year, especially if overweight or over 45.', icon: '🩸' },
      { title: 'Quit Smoking', desc: 'Smoking dramatically worsens diabetes complications including heart and kidney damage.', icon: '🚭' },
    ],
    myths: [
      { myth: 'Eating too much sugar directly causes diabetes.', fact: 'Excess sugar contributes to obesity which increases Type 2 risk — but it\'s not the direct sole cause. Genetics and lifestyle together play a role.' },
      { myth: 'Diabetes is not a serious disease.', fact: 'Unmanaged diabetes can lead to blindness, kidney failure, amputations, heart attacks, and stroke.' },
      { myth: 'People with diabetes cannot eat any sugar ever.', fact: 'With careful portion control and planning, people with diabetes can still enjoy sweet foods in moderation as part of a balanced diet.' },
      { myth: 'Only overweight people get diabetes.', fact: 'Thin people can also develop Type 2, and Type 1 is not related to weight at all.' },
    ],
    emergency: { icon: '🚨', title: 'Diabetic Emergency Signs', body: 'If someone is shaking, sweating, confused, or unconscious — they may have dangerously low blood sugar (hypoglycemia). Give them a sugary drink or food immediately if conscious. Call for emergency help if unresponsive.' },
    localInfo: 'Free diabetes screening is available at all government clinics in Zimbabwe. Blood glucose meters and test strips are available at most pharmacies.',
  },

  // ── HYPERTENSION ─────────────────────────────────────────────────────────
  hypertension: {
    id: 'hypertension',
    icon: '🫀',
    title: 'Hypertension (High Blood Pressure)',
    subtitle: 'The "silent killer" — know your numbers before it\'s too late.',
    accentColor: '#EF4444',
    what: {
      heading: 'What is Hypertension?',
      body: `Blood pressure is the force of blood pushing against artery walls as the heart pumps. 
Hypertension (High Blood Pressure) means this force is consistently too high, quietly straining 
the heart and blood vessels. It is called the "silent killer" because it has no obvious symptoms 
until serious damage — like a stroke or heart attack — has occurred. Normal BP is below 120/80 mmHg.
Hypertension is diagnosed when readings consistently exceed 140/90 mmHg.`,
      types: [
        { name: 'Primary (Essential) Hypertension', desc: 'Develops gradually over many years with no identifiable cause. The most common type.' },
        { name: 'Secondary Hypertension', desc: 'Caused by an underlying condition such as kidney disease, thyroid problems, or certain medications.' },
      ]
    },
    symptoms: [
      { icon: '🤕', text: 'Severe headaches (often at the back of the head)' },
      { icon: '👁️', text: 'Blurred or changed vision' },
      { icon: '🫀', text: 'Chest pain or tightness' },
      { icon: '😮‍💨', text: 'Shortness of breath' },
      { icon: '👃', text: 'Nosebleeds (less common)' },
      { icon: '⚠️', text: 'Often NO symptoms at all — regular checks are essential' },
    ],
    prevention: [
      { title: 'Reduce Salt Intake', desc: 'Aim for less than 5g (one teaspoon) of salt per day. Avoid processed and canned foods.', icon: '🧂' },
      { title: 'DASH Diet', desc: 'Eat more fruits, vegetables, and low-fat dairy. Reduce saturated fat and red meat.', icon: '🥦' },
      { title: 'Physical Activity', desc: 'Regular aerobic exercise (30 min/day, 5 days/week) can lower BP by 5–8 mmHg.', icon: '🚴' },
      { title: 'Limit Alcohol', desc: 'Excessive drinking raises blood pressure. If you drink, do so moderately.', icon: '🍺' },
      { title: 'Manage Stress', desc: 'Chronic stress contributes to high BP. Practice relaxation — deep breathing, walking, prayer.', icon: '🧘' },
      { title: 'Take Medication as Prescribed', desc: 'Never stop BP medication suddenly. Even when you feel fine, continue as directed by your doctor.', icon: '💊' },
    ],
    myths: [
      { myth: 'You can feel when your blood pressure is high.', fact: 'Hypertension is usually completely asymptomatic. The only way to know is to measure it regularly.' },
      { myth: 'Once BP is normal, I can stop my medication.', fact: 'Stopping medication abruptly can cause a dangerous rebound spike. Always consult your doctor first.' },
      { myth: 'Hypertension only affects older people.', fact: 'Young adults and even teenagers can develop hypertension, especially if overweight or under chronic stress.' },
    ],
    emergency: { icon: '🚨', title: 'Hypertensive Crisis', body: 'If BP exceeds 180/120 mmHg with symptoms like severe headache, chest pain, or vision changes — this is a medical emergency. Go to the nearest hospital A&E immediately. Do NOT drive yourself.' },
    localInfo: 'Free blood pressure checks are available at all government clinics. Antihypertensive medications are available for free on Zimbabwe\'s Essential Medicines List at government facilities.',
  },

  // ── MALARIA ───────────────────────────────────────────────────────────────
  malaria: {
    id: 'malaria',
    icon: '🦟',
    title: 'Malaria',
    subtitle: 'A preventable and treatable disease that kills thousands in Zimbabwe each year.',
    accentColor: '#10B981',
    what: {
      heading: 'What is Malaria?',
      body: `Malaria is a life-threatening disease caused by Plasmodium parasites, transmitted to humans through the 
bites of infected female Anopheles mosquitoes. These mosquitoes are most active between dusk and dawn. 
Zimbabwe has high malaria transmission, especially in the Zambezi Valley, Eastern Highlands, and 
low-lying areas during and after the rainy season (November–April).`,
      types: [
        { name: 'Plasmodium falciparum', desc: 'Most dangerous and most common in Zimbabwe. Can rapidly progress to severe malaria affecting the brain (cerebral malaria), kidneys, and blood.' },
        { name: 'Plasmodium vivax / ovale', desc: 'Less severe but can relapse months or years later as the parasite can remain dormant in the liver.' },
      ]
    },
    symptoms: [
      { icon: '🌡️', text: 'High fever (often cyclical — every 48 or 72 hours)' },
      { icon: '🥶', text: 'Chills and rigors (uncontrollable shaking)' },
      { icon: '🤕', text: 'Severe headache' },
      { icon: '🤮', text: 'Nausea and vomiting' },
      { icon: '💪', text: 'Muscle aches and joint pain' },
      { icon: '😴', text: 'Extreme fatigue and weakness' },
      { icon: '🚨', text: 'Confusion, seizures (in severe malaria — go immediately to hospital)' },
    ],
    prevention: [
      { title: 'Sleep Under Treated Mosquito Nets (ITNs)', desc: 'Insecticide-treated nets are the single most effective barrier. Use them every night, tuck them under the mattress.', icon: '🛏️' },
      { title: 'Indoor Residual Spraying (IRS)', desc: 'Allow health workers to spray your home during national spraying campaigns. This kills resting mosquitoes.', icon: '🏠' },
      { title: 'Eliminate Stagnant Water', desc: 'Mosquitoes breed in standing water. Empty buckets, clear gutters, and cover water containers.', icon: '💧' },
      { title: 'Wear Protective Clothing', desc: 'At dusk and dawn, wear long sleeves and trousers. Apply insect repellent with DEET to exposed skin.', icon: '👕' },
      { title: 'Seek Rapid Diagnosis and Treatment', desc: 'If fever develops, get a malaria test within 24 hours. Early treatment prevents death.', icon: '🔬' },
    ],
    myths: [
      { myth: 'Malaria is caused by cold weather.', fact: 'Malaria is caused by a parasite transmitted by mosquitoes, not by cold or damp weather directly.' },
      { myth: 'If I had malaria before, I am now immune.', fact: 'Partial immunity develops over many exposures, but it can be lost and does not prevent reinfection.' },
      { myth: 'Malaria can be spread person-to-person.', fact: 'Malaria is not contagious. It can only be transmitted by an infected mosquito (or, rarely, blood transfusions).' },
    ],
    emergency: { icon: '🚨', title: 'Signs of Severe Malaria', body: 'High fever with confusion, seizures, inability to stand, or very rapid breathing in a child or adult requires IMMEDIATE hospital admission. Severe malaria is a medical emergency and can be fatal within hours.' },
    localInfo: 'Free malaria testing (RDTs) and treatment (Artemisinin-Combination Therapy, ACT) are available at all government clinics and hospitals in Zimbabwe. Do not buy malaria medication from street vendors.',
  },

  // ── TUBERCULOSIS ─────────────────────────────────────────────────────────
  tuberculosis: {
    id: 'tuberculosis',
    icon: '🫁',
    title: 'Tuberculosis (TB)',
    subtitle: 'Curable when caught early. Know the signs, get tested.',
    accentColor: '#F59E0B',
    what: {
      heading: 'What is TB?',
      body: `Tuberculosis (TB) is a bacterial infection caused by Mycobacterium tuberculosis. It mainly affects 
the lungs (pulmonary TB) but can spread to other parts of the body (extrapulmonary TB) including the 
brain, spine, and kidneys. TB spreads through the air — when a person with active TB coughs, sneezes, 
or spits. Close, prolonged contact increases risk. Zimbabwe has one of the highest TB burdens in Africa, 
and TB-HIV co-infection is a major challenge.`,
      types: [
        { name: 'Latent TB', desc: 'The bacteria are present but the immune system keeps them under control. No symptoms, not contagious — but can become active if immunity drops (e.g. in HIV).' },
        { name: 'Active TB', desc: 'The bacteria are multiplying and causing disease. Symptoms are present and the disease is contagious.' },
      ]
    },
    symptoms: [
      { icon: '😮‍💨', text: 'Persistent cough lasting more than 2 weeks' },
      { icon: '🩸', text: 'Coughing up blood or blood-stained sputum' },
      { icon: '🌙', text: 'Night sweats (drenching)' },
      { icon: '🌡️', text: 'Fever (especially in the evening)' },
      { icon: '⚖️', text: 'Unexplained weight loss' },
      { icon: '😴', text: 'Extreme fatigue and weakness' },
      { icon: '🤕', text: 'Chest pain when breathing or coughing' },
    ],
    prevention: [
      { title: 'BCG Vaccination', desc: 'The BCG vaccine given at birth protects children from severe forms of TB. Ensure your child is vaccinated.', icon: '💉' },
      { title: 'Ventilate Your Home', desc: 'Open windows and doors to allow fresh air circulation. TB bacteria spread in poorly ventilated, crowded spaces.', icon: '🪟' },
      { title: 'Complete Your TB Treatment Course', desc: 'TB treatment lasts 6 months. Stopping early creates drug-resistant TB (MDR-TB) which is much harder to treat.', icon: '💊' },
      { title: 'Know TB-HIV Link', desc: 'People living with HIV are 20x more likely to develop active TB. Get tested for both. Free treatment is available.', icon: '🔗' },
      { title: 'Cover Your Mouth', desc: 'If you have TB, cover your mouth with a cloth when coughing. This prevents infecting others.', icon: '😷' },
    ],
    myths: [
      { myth: 'TB is a disease only of the poor.', fact: 'TB can affect anyone regardless of wealth, but overcrowding, malnutrition, and poor ventilation increase risk.' },
      { myth: 'TB is incurable.', fact: 'TB is curable with a 6-month course of antibiotics. Drug-resistant TB requires longer treatment but is also treatable.' },
      { myth: 'You only get TB from hugging or touching someone.', fact: 'TB spreads through the air, not through skin contact. Sharing cups or utensils with a TB patient does not spread the disease.' },
    ],
    emergency: { icon: '🚨', title: 'When to Seek Urgent Care', body: 'If you are coughing blood, having difficulty breathing, or experience sudden confusion alongside a long-term cough — go to hospital immediately. TB can progress rapidly without treatment.' },
    localInfo: 'TB testing (sputum testing & chest X-rays) and the full 6-month treatment course are FREE at all government clinics and hospitals in Zimbabwe. TB is notifiable — clinics are experienced and confidential.',
  },

  // ── CHOLERA ───────────────────────────────────────────────────────────────
  cholera: {
    id: 'cholera',
    icon: '💧',
    title: 'Cholera',
    subtitle: 'An acute waterborne infection. Rapidly fatal but easily prevented.',
    accentColor: '#06B6D4',
    what: {
      heading: 'What is Cholera?',
      body: `Cholera is an acute diarrhoeal infection caused by ingesting food or water contaminated with the 
Vibrio cholerae bacterium. It causes profuse, watery diarrhoea (described as "rice-water stools") 
that can cause severe dehydration and death within hours if untreated. Cholera outbreaks occur most 
frequently in areas with poor sanitation, contaminated water sources, and overcrowding. Zimbabwe experienced 
a major cholera outbreak in 2008 and continues to face outbreaks in urban and peri-urban areas.`,
      types: [
        { name: 'Mild Cholera', desc: 'Watery diarrhoea with little to no vomiting. Can be managed at home with oral rehydration solution (ORS) but requires monitoring.' },
        { name: 'Severe Cholera', desc: 'Profuse watery diarrhoea and vomiting causing rapid, life-threatening dehydration. Requires urgent IV fluids at a hospital.' },
      ]
    },
    symptoms: [
      { icon: '💦', text: 'Sudden onset of profuse watery, pale diarrhoea ("rice-water" appearance)' },
      { icon: '🤮', text: 'Vomiting' },
      { icon: '😰', text: 'Rapid dehydration: dry mouth, sunken eyes, wrinkled skin' },
      { icon: '😵', text: 'Muscle cramps (legs)' },
      { icon: '💨', text: 'Restlessness, irritability' },
      { icon: '⚠️', text: 'In severe cases: shock, unconsciousness' },
    ],
    prevention: [
      { title: 'Drink Safe Water Only', desc: 'Boil water for 1 minute before drinking, or use treated water. Chlorinate household water storage.', icon: '💧' },
      { title: 'Wash Hands Thoroughly', desc: 'Wash with soap and clean water before eating, cooking, and after using the toilet.', icon: '🧼' },
      { title: 'Safe Food Handling', desc: 'Eat food that is freshly cooked and served hot. Avoid raw vegetables, unpeeled fruit, and street food in outbreak areas.', icon: '🍽️' },
      { title: 'Use Latrines / Proper Sanitation', desc: 'Never defecate in the open. Use a latrine and ensure sewage does not contaminate water sources.', icon: '🚽' },
      { title: 'Oral Cholera Vaccine (OCV)', desc: 'Zimbabwe has conducted oral cholera vaccine campaigns. Take the vaccine when offered by health authorities.', icon: '💉' },
    ],
    myths: [
      { myth: 'Cholera can be spread through handshakes or hugging.', fact: 'Cholera is spread only through contaminated food and water — not through casual physical contact.' },
      { myth: 'If you have cholera, you will definitely die.', fact: 'With prompt Oral Rehydration Solution (ORS) and medical care, cholera has a case fatality rate below 1%.' },
      { myth: 'Only dirty people get cholera.', fact: 'Cholera is about contaminated water and food systems, not personal hygiene alone. Anyone can be exposed.' },
    ],
    emergency: { icon: '🚨', title: 'Cholera Emergency', body: 'If someone passes large amounts of watery diarrhoea every 30 minutes and is becoming limp or losing consciousness — this is severe cholera. Give ORS immediately and rush to hospital. Do NOT wait.' },
    localInfo: 'Oral Rehydration Solution (ORS) sachets are available free at all government clinics. In a cholera outbreak, report to the nearest health facility immediately. Do not self-medicate with antibiotics.',
  },

  // ── TYPHOID ───────────────────────────────────────────────────────────────
  typhoid: {
    id: 'typhoid',
    icon: '🌡️',
    title: 'Typhoid Fever',
    subtitle: 'A systemic bacterial infection from contaminated food and water.',
    accentColor: '#8B5CF6',
    what: {
      heading: 'What is Typhoid?',
      body: `Typhoid fever is a serious bacterial infection caused by Salmonella typhi. Unlike cholera which causes 
explosive diarrhoea, typhoid causes a sustained fever that worsens over days to weeks. It is spread through 
the faecal-oral route — by eating food or drinking water contaminated with the faeces of an infected person. 
"Typhoid Mary" carriers (people who carry the bacteria without symptoms) can unknowingly spread it through food handling.`,
      types: [
        { name: 'Uncomplicated Typhoid', desc: 'Managed with antibiotics as an outpatient. Full recovery expected with correct treatment.' },
        { name: 'Complicated Typhoid', desc: 'Can lead to intestinal perforation (a surgical emergency), internal bleeding, or encephalitis. Requires hospitalisation.' },
      ]
    },
    symptoms: [
      { icon: '🌡️', text: 'Sustained high fever (38–40°C), rising steadily over 1–2 weeks' },
      { icon: '🤕', text: 'Headache' },
      { icon: '😰', text: 'Weakness and fatigue' },
      { icon: '🫃', text: 'Abdominal pain and discomfort' },
      { icon: '💩', text: 'Constipation (more common than diarrhoea in early stages)' },
      { icon: '🔴', text: '"Rose spots" — faint pinkish rash on trunk (seen in some cases)' },
    ],
    prevention: [
      { title: 'Safe Water and Food', desc: 'Same precautions as cholera — boil water, wash hands, eat freshly cooked hot food.', icon: '🧼' },
      { title: 'Typhoid Vaccine', desc: 'Two typhoid vaccines are available (injectable Vi polysaccharide and oral Ty21a). Recommended for high-risk areas.', icon: '💉' },
      { title: 'Report Typhoid Carriers', desc: 'Food handlers and healthcare workers who are carriers must be identified and treated to prevent spread.', icon: '📋' },
    ],
    myths: [
      { myth: 'Typhoid is the same as malaria.', fact: 'They have overlapping symptoms (fever, fatigue) but are completely different diseases with different causes and treatments. A blood or bone marrow test is needed to diagnose typhoid correctly.' },
      { myth: 'Typhoid goes away on its own.', fact: 'Untreated typhoid can be fatal. Antibiotic treatment is essential and should be prescribed by a doctor.' },
    ],
    emergency: { icon: '🚨', title: 'Typhoid Complications', body: 'Sudden severe abdominal pain with rigidity in a patient with known or suspected typhoid may indicate intestinal perforation — a life-threatening surgical emergency. Go to hospital IMMEDIATELY.' },
    localInfo: 'Typhoid is diagnosed by blood culture and Widal test at government hospitals. Antibiotics (fluoroquinolones or cephalosporins) are prescribed based on antibiotic sensitivity. Ask your doctor about typhoid vaccination.',
  },

  // ── RESPIRATORY DISEASES ─────────────────────────────────────────────────
  respiratory: {
    id: 'respiratory',
    icon: '😮‍💨',
    title: 'Respiratory Diseases',
    subtitle: 'From common colds to pneumonia — protecting your airways.',
    accentColor: '#64748B',
    what: {
      heading: 'What are Respiratory Diseases?',
      body: `Respiratory diseases affect the airways and lungs — from the nose and throat to the bronchi and alveoli. 
They range from mild (common cold, influenza) to severe and life-threatening (pneumonia, COPD, asthma). 
In Zimbabwe, acute respiratory infections are a leading cause of death in children under 5. Air pollution 
from indoor cooking fires, tobacco smoke, and dusty environments increases the burden of respiratory disease significantly.`,
      types: [
        { name: 'Upper Respiratory Infections (URIs)', desc: 'Common cold, influenza, sinusitis, tonsillitis — generally self-limiting but require rest and symptom management.' },
        { name: 'Lower Respiratory Infections', desc: 'Pneumonia, bronchitis, bronchiolitis — can be severe, especially in the very young, elderly, or immunocompromised.' },
        { name: 'Chronic Respiratory Disease', desc: 'Asthma, COPD, allergic rhinitis — long-term conditions requiring ongoing management.' },
      ]
    },
    symptoms: [
      { icon: '😮‍💨', text: 'Shortness of breath or difficulty breathing' },
      { icon: '🤧', text: 'Cough (dry or productive with mucus)' },
      { icon: '🌡️', text: 'Fever and chills' },
      { icon: '🤕', text: 'Chest pain when breathing or coughing' },
      { icon: '🔵', text: 'Bluish lips or fingertips (cyanosis — severe, seek immediate help)' },
      { icon: '😴', text: 'Fatigue and loss of appetite' },
    ],
    prevention: [
      { title: 'Annual Flu Vaccination', desc: 'Influenza vaccine significantly reduces the risk of flu and its complications. Available at clinics before flu season.', icon: '💉' },
      { title: 'Don\'t Smoke', desc: 'Smoking is the leading cause of COPD and lung cancer. Quitting at any age improves lung health.', icon: '🚭' },
      { title: 'Improve Indoor Ventilation', desc: 'Cook outdoors or use proper stoves with chimneys. Open windows daily to reduce indoor air pollution.', icon: '🪟' },
      { title: 'Hand Hygiene', desc: 'Most respiratory viruses spread through hands. Wash with soap for 20 seconds frequently.', icon: '🧼' },
      { title: 'Manage Asthma Properly', desc: 'Use preventer inhalers daily as prescribed, even when feeling well. Identify and avoid your triggers.', icon: '💊' },
    ],
    myths: [
      { myth: 'Antibiotics cure the common cold and flu.', fact: 'Colds and flu are caused by viruses — antibiotics have no effect on them. Misuse of antibiotics creates resistance.' },
      { myth: 'Cold weather causes respiratory infections.', fact: 'Respiratory infections are caused by viruses and bacteria — though spending more time indoors in winter increases transmission.' },
    ],
    emergency: { icon: '🚨', title: 'Respiratory Emergency', body: 'If someone cannot complete a sentence without stopping for breath, has blue lips, or is using neck and chest muscles to breathe — this is a respiratory emergency. Call for help or go to hospital immediately. For asthma attacks, use a blue reliever inhaler first.' },
    localInfo: 'Pneumonia treatment (antibiotics, oxygen) is available free at all government facilities. Asthma inhalers are on Zimbabwe\'s Essential Medicines List. Children\'s pneumonia vaccinations (PCV) are provided free through the EPI programme.',
  },

  // ── MENTAL HEALTH ─────────────────────────────────────────────────────────
  mental_health: {
    id: 'mental_health',
    icon: '🧠',
    title: 'Mental Health & Wellness',
    subtitle: 'Your mind matters as much as your body. You are not alone.',
    accentColor: '#A855F7',
    what: {
      heading: 'What is Mental Health?',
      body: `Mental health encompasses emotional, psychological, and social wellbeing. It affects how we think, feel, 
and behave — influencing how we handle stress, relate to others, and make choices. Mental health conditions 
are common, real medical conditions — not signs of weakness or spiritual failure. In Zimbabwe, stigma 
remains a major barrier to people seeking help. Depression and anxiety are the most common mental health 
conditions globally. Post-traumatic stress, substance use disorders, and psychosis also affect many people.`,
      types: [
        { name: 'Depression', desc: 'Persistent low mood, loss of interest, hopelessness, and fatigue lasting more than 2 weeks. Treatable with therapy and/or medication.' },
        { name: 'Anxiety Disorders', desc: 'Excessive fear, worry, or panic that interferes with daily life. Includes panic disorder, social anxiety, and generalised anxiety.' },
        { name: 'Post-Traumatic Stress Disorder (PTSD)', desc: 'Develops after traumatic events (violence, sexual assault, accidents). Includes flashbacks, nightmares, and emotional numbing.' },
        { name: 'Psychosis', desc: 'Loss of contact with reality, hearing voices, or seeing things that others don\'t. Requires urgent psychiatric care.' },
      ]
    },
    symptoms: [
      { icon: '😔', text: 'Persistent sadness, emptiness, or hopelessness' },
      { icon: '😤', text: 'Excessive worry, fear, or irritability' },
      { icon: '😴', text: 'Changes in sleep — too much or too little' },
      { icon: '🍽️', text: 'Significant changes in appetite or weight' },
      { icon: '💭', text: 'Difficulty concentrating or making decisions' },
      { icon: '🚫', text: 'Withdrawal from friends, family, and activities you used to enjoy' },
      { icon: '⚠️', text: 'Thoughts of self-harm or suicide — seek help immediately' },
    ],
    prevention: [
      { title: 'Stay Connected', desc: 'Strong social relationships are protective. Make time for friends, family, and community.', icon: '🤝' },
      { title: 'Physical Activity', desc: 'Exercise releases endorphins and reduces cortisol (stress hormone). Even a 20-min walk helps.', icon: '🚶' },
      { title: 'Limit Alcohol and Substances', desc: 'Alcohol and drugs worsen depression and anxiety. They provide short-term relief but long-term harm.', icon: '🚫' },
      { title: 'Seek Help Early', desc: 'Mental health conditions are treatable. Reaching out to a counsellor or doctor early leads to better outcomes.', icon: '💬' },
      { title: 'Practice Self-Care', desc: 'Adequate sleep, balanced meals, relaxation practices (deep breathing, prayer, journaling) build resilience.', icon: '💚' },
    ],
    myths: [
      { myth: 'Mental illness is a sign of spiritual weakness.', fact: 'Mental health conditions are medical conditions with biological, psychological, and social causes — not spiritual failure.' },
      { myth: 'People with mental illness are dangerous.', fact: 'People with mental illness are far more likely to be victims of violence than perpetrators. Most live safe, productive lives.' },
      { myth: 'You just need to pray harder / be stronger.', fact: 'While faith and community are valuable, mental health conditions often require professional treatment just like physical diseases.' },
    ],
    emergency: { icon: '🚨', title: 'Mental Health Crisis', body: 'If someone is talking about suicide, harming themselves, or seems completely detached from reality — do NOT leave them alone. Remove harmful objects if possible. Contact Zimbabwe National AIDS & Crisis Hotline: +263 4 700 822 or take them to the nearest hospital.' },
    localInfo: 'Mental health services are available at Parirenyatwa Hospital Psychiatry Unit, Ingutsheni Central Hospital (Bulawayo), all district hospitals, and through trained community health workers. Public counselling services are available for all citizens.',
  },

  // ── NUTRITION ─────────────────────────────────────────────────────────────
  nutrition: {
    id: 'nutrition',
    icon: '🥗',
    title: 'Nutrition & Healthy Eating',
    subtitle: 'Food is medicine. What you eat shapes every aspect of your health.',
    accentColor: '#22C55E',
    what: {
      heading: 'Why Nutrition Matters',
      body: `Good nutrition provides the body with essential nutrients — carbohydrates for energy, proteins for growth 
and repair, fats for brain function, vitamins and minerals for immune defence and organ function. 
Malnutrition in Zimbabwe exists in two forms: undernutrition (particularly stunting in children) and 
overnutrition (obesity, linked to processed food consumption). Both increase disease risk significantly. 
A balanced, diverse diet is the foundation of lifelong health.`,
      types: [
        { name: 'Macronutrients', desc: 'Carbohydrates (sadza, sweet potato, rice), Proteins (beans, fish, eggs, meat), Fats (avocado, nuts, small amounts of oil). Needed in large quantities.' },
        { name: 'Micronutrients', desc: 'Vitamins (A, B, C, D, E, K) and Minerals (iron, zinc, iodine, calcium). Needed in small quantities but critical for immune function, growth, and cognition.' },
      ]
    },
    symptoms: [
      { icon: '⚖️', text: 'Significant unexplained weight loss (undernutrition)' },
      { icon: '🦷', text: 'Bleeding gums, slow wound healing (Vitamin C deficiency)' },
      { icon: '👁️', text: 'Night blindness or dry eyes (Vitamin A deficiency)' },
      { icon: '🦴', text: 'Bone pain or fractures (Vitamin D / Calcium)' },
      { icon: '😴', text: 'Persistent fatigue and weakness (Iron deficiency anaemia)' },
      { icon: '🧠', text: 'Poor concentration or learning difficulties in children (protein/iron)' },
    ],
    prevention: [
      { title: 'Eat a Rainbow', desc: 'Include a variety of coloured vegetables and fruits daily — each colour provides different essential vitamins and antioxidants.', icon: '🌈' },
      { title: 'Increase Protein', desc: 'Include protein at every meal — beans, lentils, eggs, fish, or small amounts of meat. Ensures muscle health and immunity.', icon: '🥚' },
      { title: 'Choose Whole Grains', desc: 'Whole-grain bread, brown rice, and millet provide more fibre, vitamins, and sustained energy than refined products.', icon: '🌾' },
      { title: 'Reduce Ultra-Processed Foods', desc: 'Chips, sweets, fizzy drinks, and packaged snacks are high in sugar, salt, and unhealthy fats. Limit these sharply.', icon: '🚫' },
      { title: 'Breastfeed Exclusively for 6 Months', desc: 'Breast milk is the perfect nutrition for infants and provides critical immune protection.', icon: '🍼' },
    ],
    myths: [
      { myth: 'Eating fat makes you fat.', fact: 'Healthy fats (avocado, nuts, olive oil) are essential for brain and heart health. Excess calories from any source cause weight gain.' },
      { myth: 'Sadza/Ugali has no nutritional value.', fact: 'Sadza provides carbohydrates (energy). When paired with vegetables and protein (beans, fish), it forms a complete, balanced meal.' },
      { myth: 'Supplements can replace a poor diet.', fact: 'Supplements cannot replicate all the complex compounds in whole foods. A varied diet is always preferable.' },
    ],
    emergency: { icon: '⚠️', title: 'Severe Acute Malnutrition in Children', body: 'A child with severe wasting (ribs visible, skin hanging), oedema (swollen feet and face), or refusal to eat requires immediate medical attention. Go to the nearest clinic or hospital. Therapeutic feeding programmes are available free.' },
    localInfo: 'Growth monitoring and nutrition counselling are available free at all government clinics under the Under-5 Programme. Food fortification is mandatory for flour and cooking oil in Zimbabwe.',
  },

  // ── MATERNAL HEALTH ───────────────────────────────────────────────────────
  maternal: {
    id: 'maternal',
    icon: '🤰',
    title: 'Maternal Health',
    subtitle: 'Healthy mothers, healthy babies — know what to expect and when to seek help.',
    accentColor: '#EC4899',
    what: {
      heading: 'Why Maternal Health Matters',
      body: `Maternal health encompasses the health of women during pregnancy, childbirth, and the postpartum period 
(up to 42 days after delivery). Despite progress, Zimbabwe still faces significant maternal mortality from 
preventable causes — including haemorrhage (excessive bleeding), eclampsia (pregnancy-related high blood 
pressure with seizures), infections, and unsafe abortion. Regular antenatal care (ANC) is the single most 
effective intervention to ensure safe pregnancy and delivery.`,
      types: [
        { name: 'Antenatal Care (ANC)', desc: 'Recommended minimum of 8 contacts with a skilled health worker during pregnancy. Identifies and manages complications early.' },
        { name: 'Skilled Birth Attendance', desc: 'Delivering in a facility with a trained midwife or doctor dramatically reduces the risk of maternal and newborn death.' },
        { name: 'Postnatal Care', desc: 'Critical check-ups in the first 24 hours, 3 days, 7 days, and 42 days after birth. Detects postnatal depression, haemorrhage, and infection.' },
      ]
    },
    symptoms: [
      { icon: '🩸', text: 'Vaginal bleeding at any point during pregnancy (seek help immediately)' },
      { icon: '🤕', text: 'Severe headache with visual disturbances (eclampsia warning)' },
      { icon: '🦵', text: 'Swollen face, hands, or feet beyond mild ankle swelling' },
      { icon: '🤢', text: 'Excessive vomiting preventing eating or drinking' },
      { icon: '💧', text: 'Sudden gush of fluid from vagina before due date (preterm rupture of membranes)' },
      { icon: '🫀', text: 'Reduced or absent fetal movements after 28 weeks' },
    ],
    prevention: [
      { title: 'Start ANC Early', desc: 'Attend your first antenatal visit before 12 weeks of pregnancy. Early booking allows time to detect and manage problems.', icon: '🏥' },
      { title: 'Take Folic Acid', desc: 'Start folic acid supplementation before conception and during the first trimester to prevent neural tube defects.', icon: '💊' },
      { title: 'Deliver in a Health Facility', desc: 'Facility delivery with a skilled attendant is safest. Home deliveries are high risk, especially for first-time mothers.', icon: '🏨' },
      { title: 'Know the Danger Signs', desc: 'Every pregnant woman should know the warning signs that require immediate hospital attention (see symptoms above).', icon: '⚠️' },
      { title: 'Exclusive Breastfeeding', desc: 'Begin breastfeeding within the first hour of birth. It protects the baby and helps the uterus contract, reducing postpartum bleeding.', icon: '🍼' },
    ],
    myths: [
      { myth: 'Antenatal care is not necessary if you feel well.', fact: 'Many pregnancy complications (pre-eclampsia, anaemia, gestational diabetes) have no early symptoms. ANC detects them before they become dangerous.' },
      { myth: 'Delivering at home is safer because it\'s natural.', fact: 'Most maternal and newborn deaths occur during delivery. A skilled attendant and emergency backup in a facility save lives.' },
      { myth: 'A caesarean section means you can never deliver normally again.', fact: 'Vaginal birth after caesarean (VBAC) is possible and safe for many women — discuss with your health provider.' },
    ],
    emergency: { icon: '🚨', title: 'Obstetric Emergency', body: 'Heavy vaginal bleeding, seizures, severe headache with visual changes, or the baby not moving — these are obstetric emergencies. Go to the nearest hospital with a maternity unit IMMEDIATELY. Do not wait for labour to progress at home.' },
    localInfo: 'Antenatal care, delivery, and postnatal care are free at all government clinics and hospitals in Zimbabwe. The maternal health booklet ("Road to Health") is provided free at booking. Ask about free iron, folic acid, and malaria prevention tablets during pregnancy.',
  },

  // ── CANCER AWARENESS ─────────────────────────────────────────────────────
  cancer: {
    id: 'cancer',
    icon: '🎗️',
    title: 'Cancer Awareness',
    subtitle: 'Early detection saves lives. Know the signs, get screened.',
    accentColor: '#F97316',
    what: {
      heading: 'What is Cancer?',
      body: `Cancer is a group of diseases in which abnormal cells grow uncontrollably and can spread to other parts 
of the body (metastasize). There are over 100 types of cancer. In Zimbabwe, the most common cancers include 
cervical cancer, breast cancer, Kaposi's sarcoma (linked to HIV), prostate cancer, and oesophageal cancer. 
Cancer is increasingly common globally but early detection dramatically improves outcomes. Many cancers are 
preventable or detectable at a treatable stage.`,
      types: [
        { name: 'Cervical Cancer', desc: 'Most common cancer in Zimbabwean women. Caused by HPV infection. Preventable with the HPV vaccine and screened with a pap smear.' },
        { name: 'Breast Cancer', desc: 'Second most common. Monthly self-examination and mammography are key to early detection.' },
        { name: 'Prostate Cancer', desc: 'Most common in men over 50. PSA blood test and rectal examination can detect it early.' },
        { name: 'Kaposi\'s Sarcoma', desc: 'Linked to HIV and HHV-8 virus. Appears as purple/brown skin lesions. Responds well to ART.' },
      ]
    },
    symptoms: [
      { icon: '🏋️', text: 'Unexplained weight loss' },
      { icon: '🔴', text: 'Unusual lumps or swellings anywhere in the body' },
      { icon: '🩸', text: 'Unexplained bleeding (from any orifice)' },
      { icon: '😮‍💨', text: 'Persistent cough or hoarseness lasting more than 3 weeks' },
      { icon: '🍽️', text: 'Persistent difficulty swallowing or indigestion' },
      { icon: '🪦', text: 'Moles that change shape, size, or colour' },
      { icon: '😴', text: 'Extreme unexplained fatigue' },
    ],
    prevention: [
      { title: 'HPV Vaccination', desc: 'The HPV vaccine prevents cervical cancer. It is offered free to girls aged 10–14 through Zimbabwe\'s immunisation programme.', icon: '💉' },
      { title: 'Regular Cervical Screening (VIA/Pap Smear)', desc: 'Women should have cervical screening every 3–5 years. Available at most government clinics.', icon: '🔬' },
      { title: 'Monthly Breast Self-Examination', desc: 'Examine your breasts every month for lumps, skin changes, or nipple discharge. Report any changes immediately.', icon: '👋' },
      { title: 'Quit Tobacco', desc: 'Smoking causes cancers of the lung, throat, mouth, oesophagus, bladder, and many others.', icon: '🚭' },
      { title: 'Limit Alcohol', desc: 'Alcohol is a known carcinogen linked to breast, liver, bowel, and oesophageal cancers.', icon: '🍺' },
    ],
    myths: [
      { myth: 'Cancer is always a death sentence.', fact: 'Many cancers are curable, especially when detected early. Survival rates for early-stage cancers are often above 90%.' },
      { myth: 'Cancer is contagious.', fact: 'Cancer is not contagious. However, some viruses that can cause cancer (HPV, Hepatitis B) are infectious.' },
      { myth: 'Only smokers get lung cancer.', fact: 'While smoking is the main risk factor, non-smokers can also develop lung cancer due to radon, air pollution, or genetic factors.' },
    ],
    emergency: { icon: '🚨', title: 'When to Seek Urgent Referral', body: 'Any unexplained lump, persistent bleeding, or rapidly growing skin lesion should be evaluated promptly. Early referral to a specialist (oncologist) at Parirenyatwa or Mpilo Hospital gives the best chance of successful treatment.' },
    localInfo: 'Cancer treatment is available at Parirenyatwa (Harare) and Mpilo (Bulawayo) hospitals. The Zimbabwe Cancer Registry maintains statistics and supports awareness programmes. Cervical cancer screening (VIA) is free at most government clinics.',
  },

  // ── FIRST AID ─────────────────────────────────────────────────────────────
  first_aid: {
    id: 'first_aid',
    icon: '🩹',
    title: 'First Aid & Emergency Care',
    subtitle: 'The right action in the first minutes saves lives.',
    accentColor: '#EF4444',
    what: {
      heading: 'What is First Aid?',
      body: `First aid is the immediate assistance given to a person suffering from injury or illness before professional 
medical help arrives. Effective first aid can save lives, prevent conditions from worsening, and promote 
faster recovery. Everyone should know basic first aid — it is a life skill. In Zimbabwe, where emergency 
services may take time to respond in rural areas, community first aid knowledge is especially critical.`,
      types: [
        { name: 'Life-Saving First Aid (DRABC)', desc: 'Danger, Response, Airway, Breathing, Circulation — the systematic approach to any emergency.' },
        { name: 'Wound Care', desc: 'Cleaning, covering, and controlling bleeding from cuts and injuries.' },
        { name: 'Emergency Response', desc: 'CPR, managing choking, burns, fractures, snakebites, and drowning.' },
      ]
    },
    symptoms: [],
    prevention: [
      { title: 'DRABC — The Primary Survey', desc: 'Danger: Is it safe? Response: Is the patient conscious? Airway: Is it clear? Breathing: Are they breathing? Circulation: Do they have a pulse?', icon: '✅' },
      { title: 'Control Bleeding', desc: 'Apply firm direct pressure with a clean cloth. Elevate the limb. Do not remove the cloth — add more on top if soaked.', icon: '🩸' },
      { title: 'CPR (Cardiopulmonary Resuscitation)', desc: '30 chest compressions (hard and fast on the centre of the chest) then 2 rescue breaths. Repeat until help arrives or the patient recovers.', icon: '🫀' },
      { title: 'Burns', desc: 'Cool the burn immediately with cool (not ice cold) running water for 20 minutes. Cover with clean non-fluffy material. Do NOT apply butter or toothpaste.', icon: '🔥' },
      { title: 'Snakebite', desc: 'Immobilise the affected limb below heart level. Do NOT cut, suck, or apply tourniquets. Get to a hospital with antivenom immediately.', icon: '🐍' },
      { title: 'Choking (Heimlich Manoeuvre)', desc: 'Stand behind the person, place a fist above the navel, grasp with the other hand, and give sharp upward thrusts until the object is dislodged.', icon: '🫁' },
    ],
    myths: [
      { myth: 'Tilt the head back for a nosebleed.', fact: 'Tilt the head slightly FORWARD. Pinch the soft part of the nose for 10–15 minutes. Tilting back causes blood to flow down the throat.' },
      { myth: 'Apply butter or egg white to a burn.', fact: 'Never apply home remedies to burns. They introduce infection and retain heat. Only cool running water for 20 minutes.' },
      { myth: 'You can safely move someone with a neck injury.', fact: 'Do NOT move a person with a suspected neck or spinal injury unless they are in immediate danger. Incorrect movement can cause paralysis.' },
    ],
    emergency: { icon: '🚨', title: 'Zimbabwe Emergency Contacts', body: 'Police: 995 | Ambulance: 994 | Fire: 993 | Parirenyatwa A&E: +263 4 791 631 | Mpilo A&E: +263 9 414 7777. In rural areas, contact the nearest clinic for referral. STAY CALM.' },
    localInfo: 'St John Ambulance Zimbabwe offers first aid training courses across the country. Contact them for community training. Many government hospitals have trained first aid officers.',
  },
};
