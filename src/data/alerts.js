export const HEALTH_ALERTS = [
  {
    id: "malaria-alert",
    type: "seasonal",
    icon: "🦟",
    title: { en: "Malaria Season Alert", sn: "Yambiro: Malaria Mumwaka Uno", nd: "Isixwayiso Ngomkhuhlane Wemalariya" },
    message: { en: "Mosquito season is peaking. Use treated nets and clear standing water around your home.", sn: "Munguva yekunaya kwemvura umhutu hunowanda. Shandisai mambure akadirwa mushonga uye bvisai mvura yakamira.", nd: "Ngesikhathi sezulu omiyane bayanda. Sebenzisa amambule alemithi njalo chitha amanzi amileyo eduze lwekhaya." },
    article: {
      en: `MALARIA: A COMPREHENSIVE GUIDE

WHAT CAUSES IT?
Malaria is a life-threatening disease caused by Plasmodium parasites. These parasites are transmitted to humans exclusively through the bites of infected female Anopheles mosquitoes. During the rainy season, standing pools of water create the perfect breeding environment for these mosquitoes to multiply rapidly.

SIGNS & SYMPTOMS
Symptoms typically begin 10 to 15 days after being bitten. Because the initial symptoms can be mild, they are often confused with a common cold or flu.
• High, cyclical fevers
• Uncontrollable chills and shivering (rigors)
• Profuse sweating as the fever breaks
• Severe headaches and muscle aches
• Nausea, vomiting, and diarrhea

POTENTIAL COMPLICATIONS
If left untreated, particularly in vulnerable groups like children under 5 and pregnant women, malaria can quickly become severe and lead to:
• Cerebral malaria (parasites blocking blood vessels in the brain, leading to seizures or coma)
• Severe anemia (due to the destruction of red blood cells)
• Organ failure (kidneys, liver, or spleen rupture)
• Respiratory distress (fluid accumulation in the lungs)

HOW DO YOU PREVENT IT?
Prevention focuses on avoiding mosquito bites and eliminating breeding grounds:
1. Sleep under Insecticide-Treated Nets (ITNs) every single night.
2. Use indoor residual spraying (IRS) to kill mosquitoes that rest on walls.
3. Eliminate all stagnant water around your home—empty old tires, buckets, and clear blocked gutters.
4. Wear long-sleeved shirts and trousers during the evening and night when Anopheles mosquitoes are most active.

TREATMENT & MANAGEMENT
If you experience any symptoms, seek immediate testing at a local clinic using a Rapid Diagnostic Test (RDT). If positive, you will be prescribed Artemisinin-based Combination Therapy (ACT). Early and complete treatment cures malaria and prevents all severe complications.`
    },
    severity: "warning", bgColor: "rgba(234, 179, 8, 0.15)", borderColor: "#EAB308"
  },
  {
    id: "cholera-alert",
    type: "hazard",
    icon: "💧",
    title: { en: "Water Safety Notice (Cholera)", sn: "Yambiro: Kuchengetedzeka Kwemvura", nd: "Ukuphepha Kwamanzi" },
    message: { en: "Due to heavy rains, boil or treat all drinking water to prevent cholera and typhoid.", sn: "Nekuda kwemvura dziri kunaya, tapota fashaidzai mvura yekunwa kana kuisa mushonga kudzivirira korera.", nd: "Ngenxa yezulu ezinengi, siza ubilise kumbe ufake umuthi emanzini okunatha ukuvikela umkhuhlane we-cholera." },
    article: {
      en: `CHOLERA & TYPHOID: WATERBORNE DISEASES

WHAT CAUSES IT?
Cholera is an extremely virulent disease caused by the ingestion of food or water contaminated with the bacterium Vibrio cholerae. During heavy rainfalls and flooding, sewage can mix with drinking water sources (like unprotected shallow wells or burst municipal pipes), leading to rapid community outbreaks.

SIGNS & SYMPTOMS
While some infected people show no symptoms, they can still shed the bacteria back into the environment. When symptoms do occur, they strike suddenly:
• Copious, painless, watery diarrhea (often described as "rice-water stools")
• Severe nausea and vomiting
• Leg cramps caused by the rapid loss of salts and minerals

POTENTIAL COMPLICATIONS
The primary danger of cholera is the astonishing speed at which it causes dehydration.
• Severe Dehydration: A person can lose up to a liter of fluid an hour.
• Electrolyte Imbalance: Leads to severe muscle cramps and potentially fatal irregular heartbeats.
• Hypovolemic Shock: A life-threatening drop in blood pressure that can cause death within hours if untreated.

HOW DO YOU PREVENT IT?
Strict hygiene and water safety are your only defenses:
1. Treat All Drinking Water: Boil water for at least 1 minute, or treat it with chlorine tablets/liquid (e.g., WaterGuard).
2. Hand Hygiene: Wash hands thoroughly with soap and safe water after using the toilet, cleaning a child, and before handling food.
3. Food Safety: Eat food while it is still hot. Peel all raw fruits and vegetables yourself.
4. Sanitation: Use designated latrines or toilets; do not defecate in the open or near water sources.

TREATMENT & MANAGEMENT
Cholera is easily treatable if caught early. The immediate priority is replacing lost fluids using Oral Rehydration Solution (ORS). In severe cases, intravenous (IV) fluids and antibiotics are required at a local Cholera Treatment Center.`
    },
    severity: "critical", bgColor: "rgba(239, 68, 68, 0.15)", borderColor: "#EF4444"
  },
  {
    id: "flu-alert",
    type: "seasonal",
    icon: "🤧",
    title: { en: "Winter Flu Season", sn: "Mwaka weChikosoro", nd: "Isikhathi Somkhuhlane Wobandayo" },
    message: { en: "Cold temperatures are increasing flu cases. Wash hands frequently and stay warm.", sn: "Kutonhora kuri kuwedzera chikosoro. Gezai maoko nguva dzose uye mupfeke zvinodziya.", nd: "Amakhaza andisa imikhuhlane yomkhuhlane. Geza izandla kakhulu njalo ufudumale." },
    article: {
      en: `INFLUENZA (THE FLU): SEASONAL OUTBREAKS

WHAT CAUSES IT?
The flu is a highly contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs. It spreads primarily through tiny droplets made when people with the flu cough, sneeze, or talk. Winter weather forces people indoors, making transmission in crowded spaces much easier.

SIGNS & SYMPTOMS
Unlike a common cold which comes on gradually, the flu hits suddenly.
• Fever or feeling feverish/chills (though not everyone gets a fever)
• Dry, hacking cough and sore throat
• Runny or stuffy nose
• Severe muscle or body aches
• Headaches and extreme fatigue/tiredness

POTENTIAL COMPLICATIONS
While most people recover in a few days to less than two weeks, the flu can be dangerous for the elderly, young children, and those with underlying conditions (like asthma or diabetes).
• Pneumonia (the most serious and potentially deadly complication)
• Bronchitis and sinus infections
• Worsening of chronic medical conditions (e.g., triggering asthma attacks or worsening heart failure)

HOW DO YOU PREVENT IT?
1. Vaccination: The annual flu vaccine is the most effective way to prevent infection.
2. Hygiene: Wash hands frequently with soap and water or use an alcohol-based hand sanitizer.
3. Source Control: Cover your mouth and nose with a tissue or your elbow when coughing or sneezing.
4. Isolation: If you are sick, stay home from work or school to prevent infecting others.

TREATMENT & MANAGEMENT
Rest and plenty of fluids are key. Paracetamol or ibuprofen can reduce fever and alleviate body aches. In severe cases or for high-risk individuals, a doctor may prescribe antiviral drugs which can shorten the illness and prevent serious complications.`
    },
    severity: "info", bgColor: "rgba(59, 130, 246, 0.15)", borderColor: "#3B82F6"
  },
  {
    id: "asthma-dust-alert",
    type: "seasonal",
    icon: "💨",
    title: { en: "High Dust & Asthma Alert", sn: "Yambiro yeGuruva neAsthma", nd: "Isixwayiso Sothuli leAsthma" },
    message: { en: "Dry and windy conditions are increasing dust levels. Asthmatics should keep inhalers close.", sn: "Mhepo neguruva zviri kuwanda. Vane asthma vanofanira kugara nemainhaler avo padhuze.", nd: "Umoya lothuli sokwandile. Labo abale asthma kumele bahlale belezihlanganiso zabo eduze." },
    article: {
      en: `ASTHMA & ALLERGIES: MANAGING DUST TRIGGERS

WHAT CAUSES IT?
Asthma is a chronic respiratory condition where the airways become inflamed, narrow, and swell, producing extra mucus. During the dry, windy months (August to October), the air is filled with dust, pollen, and smoke from veld fires. When inhaled, these micro-particles act as aggressive triggers, causing the sensitive airways of an asthmatic to spasm and constrict.

SIGNS & SYMPTOMS (THE ASTHMA ATTACK)
• Shortness of breath or rapid breathing
• Chest tightness or pain
• Wheezing (a whistling sound when exhaling)
• Severe coughing fits, particularly at night or early morning

POTENTIAL COMPLICATIONS
Poorly managed asthma can severely disrupt daily life and become life-threatening.
• Status Asthmaticus: A severe, prolonged asthma attack that does not respond to standard inhaler treatments. This is a medical emergency that can lead to respiratory failure.
• Permanent airway narrowing (airway remodeling)
• Severe fatigue and sleep deprivation due to nighttime coughing

HOW DO YOU PREVENT IT?
1. Trigger Avoidance: On extremely windy or dusty days, stay indoors with windows closed.
2. Mask Up: Wearing a face mask when outdoors can filter out large dust and pollen particles.
3. Clean Environments: Wet-dust surfaces in your home instead of sweeping, which kicks dust into the air.
4. Medication Adherence: Take your daily "preventer" inhaler (corticosteroids) exactly as prescribed, even if you feel fine.

TREATMENT & MANAGEMENT
Always carry your "reliever" inhaler (usually Salbutamol/Albuterol). If an attack starts, take 1 to 2 puffs immediately. If symptoms do not improve within 10 minutes, take more puffs and seek emergency medical assistance.`
    },
    severity: "warning", bgColor: "rgba(107, 114, 128, 0.15)", borderColor: "#6B7280"
  },
  {
    id: "expo-alert",
    type: "event",
    icon: "🏥",
    title: { en: "Upcoming: National Health Expo", sn: "Iri Kuuya: Chiratidziro Chehutano Chenyika", nd: "Kuzayo: Umbukiso Wezempilakahle" },
    message: { en: "Join us this Friday at the HICC for free health screenings, BP checks, and interactive seminars with specialists.", sn: "Uyai neChishanu paHICC kuti muongororwe hutano pachena uye mukurukure nenyanzvi.", nd: "Wozani ngoLwesihlanu e-HICC lizohlolelwa impilakahle mahala njalo libonane labongoti." },
    article: {
      en: "The Ministry of Health and local NGOs are hosting the annual National Health Expo this Friday at the Harare International Conference Centre (HICC). \n\n**What to Expect:**\n- **Free Screenings:** Get your blood pressure, blood sugar, and BMI checked for free.\n- **Consultations:** Brief one-on-one consultations with general practitioners and specialists.\n- **Seminars:** Attend interactive sessions on managing chronic illnesses, youth reproductive health, and mental wellness.\n- **Exhibitions:** Explore the latest health tech, organic local foods, and wellness products from over 50 exhibitors.\n\nEntry is absolutely free. Bring your family and take a proactive step towards better health!"
    },
    severity: "info", bgColor: "rgba(16, 185, 129, 0.15)", borderColor: "#10B981"
  },
  {
    id: "seminar-alert",
    type: "seminar",
    icon: "💻",
    title: { en: "Online Seminar: Managing Diabetes", sn: "Chidzidzo paIndaneti: Kurarama neShuga", nd: "Isifundo Ku-inthanethi: Ukuphila le-Diabetes" },
    message: { en: "Tune in on Saturday at 10 AM for a free virtual seminar on managing diabetes with local diets. Link in Community tab.", sn: "Pindai muchidzidzo chepamhepo neMugovera na 10 AM pamusoro pekurarama neshuga. Link iri muCommunity.", nd: "Ngenani esifundweni saku-inthanethi ngoMgqibelo ngo-10 AM mayelana lokuphila le-diabetes. I-link ikuCommunity." },
    article: {
      en: "Diabetes management doesn't mean you have to give up your cultural foods. This Saturday at 10 AM, join our expert endocrinologists and dieticians for a highly requested virtual seminar.\n\n**Topics Covered:**\n- Understanding the glycemic index of traditional foods (e.g., sadza rezviyo vs. refined mealie meal).\n- Portion control and balancing your plate with local vegetables.\n- The importance of physical activity in regulating blood sugar.\n- Q&A session where you can ask doctors your personal questions.\n\nNavigate to the **Community** tab to find the Zoom link. The session will be recorded and available on our Podcast tab next week."
    },
    severity: "info", bgColor: "rgba(59, 130, 246, 0.15)", borderColor: "#3B82F6"
  },
  {
    id: "vaccine-alert",
    type: "event",
    icon: "💉",
    title: { en: "Free Polio Vaccination Campaign", sn: "Mushonga wePolio Wepachena", nd: "Umuthi We-Polio Omahala" },
    message: { en: "The Ministry of Health is offering free polio vaccines for children under 5 at all local clinics this month.", sn: "Bazi reHutano riri kupa nhomba yePolio pachena kuvana vari pasi pemakore mashanu mumakiriniki ose.", nd: "Igatsha leZempilakahle lipha umuthi wePolio omahala kubantwana abaleminyaka engaphansi kwemihlanu." },
    article: {
      en: `POLIO (POLIOMYELITIS): PROTECTING OUR CHILDREN

WHAT CAUSES IT?
Polio is a highly contagious, disabling, and life-threatening viral disease caused by the poliovirus. The virus spreads from person to person mainly through the fecal-oral route (e.g., contaminated water or food) and multiplies in the intestine, from where it can invade the nervous system.

SIGNS & SYMPTOMS
Most people who get infected will not have any visible symptoms. However, about 1 in 4 people will experience flu-like symptoms:
• Sore throat and fever
• Tiredness and nausea
• Headache and stomach pain

POTENTIAL COMPLICATIONS
A small proportion of people with polio infection will develop serious symptoms that affect the brain and spinal cord:
• Paresthesia (feeling of pins and needles in the legs)
• Meningitis (infection of the covering of the spinal cord and/or brain)
• Paralysis: Approximately 1 in 200 infections leads to irreversible paralysis (usually in the legs). Among those paralyzed, 5% to 10% die when their breathing muscles become immobilized.

HOW DO YOU PREVENT IT?
There is no cure for polio; it can only be prevented by immunization.
1. Vaccination: The Polio vaccine, given multiple times, can protect a child for life. The ongoing campaign offers Oral Polio Vaccines (OPV) directly into the mouth.
2. Sanitation: Maintaining high community hygiene and safe drinking water standards reduces the risk of transmission.

TREATMENT & MANAGEMENT
Because there is no cure for polio, treatment is strictly supportive. This includes bed rest, pain relievers, and physical therapy to prevent deformities and loss of muscle function. Prevention through vaccination is the only true defense.`
    },
    severity: "info", bgColor: "rgba(236, 72, 153, 0.15)", borderColor: "#EC4899"
  },
  {
    id: "lightning-alert",
    type: "seasonal",
    icon: "⚡",
    title: { en: "Seasonal Lightning Safety", sn: "Yambiro: Mheni Mumwaka Uno", nd: "Isixwayiso: Umbani" },
    message: { en: "Summer storms bring lightning risks. Stay indoors, avoid tall trees, and stay away from open water.", sn: "Zhizha rinounza njodzi dzemheni. Garai mudzimba, musande pasi pemiti mirefu, uye musava padhuze nemvura.", nd: "Isikhathi sehlobo siletha ingozi zombani. Hlala endlini, ungasondeli ezihlahleni ezinde, njalo udede emanzini." },
    article: {
      en: `LIGHTNING SAFETY & INJURY PREVENTION

WHAT CAUSES IT?
Lightning is a massive discharge of electrical energy in the atmosphere. During summer thunderstorms, the rapid upward movement of warm, moist air creates immense static electrical charges in clouds, which violently discharge to the ground. Zimbabwe experiences very high rates of lightning strikes during the rainy season.

TYPES OF LIGHTNING INJURIES
Direct strikes are rare but usually fatal. More common injuries include:
• Side Flash: Lightning strikes a taller object near the victim (like a tree) and a portion of the current jumps to the victim.
• Ground Current: Lightning strikes the ground and the current travels through the earth, electrocuting anyone standing nearby.
• Conduction: Touching metal surfaces (like wire fences or plumbing) that have been energized by a strike.

POTENTIAL COMPLICATIONS
Surviving a lightning strike can leave profound, lifelong complications:
• Cardiac arrest (the most immediate cause of death)
• Severe burns (both internal and external)
• Neurological damage (memory loss, chronic pain, seizures)
• Ruptured eardrums and permanent hearing loss

HOW DO YOU PREVENT IT?
"When thunder roars, go indoors!"
1. Safe Shelter: The safest place is inside a large, fully enclosed building with plumbing and wiring (which directs the charge to the ground). A hard-topped metal vehicle is also safe.
2. Avoid Tall Objects: NEVER shelter under an isolated tree or a small open-sided shed.
3. Stay Low but Don't Lie Flat: If caught in an open field, crouch low on the balls of your feet with your head tucked in, minimizing your contact with the ground.
4. Avoid Water & Metal: Step away from pools, rivers, wire fences, and metal tools immediately.

MANAGEMENT OF A STRIKE VICTIM
Lightning victims do NOT carry an electrical charge and are safe to touch. Call for emergency help immediately. If the victim is not breathing, begin CPR instantly. Swift medical intervention dramatically increases survival rates.`
    },
    severity: "warning", bgColor: "rgba(139, 92, 246, 0.15)", borderColor: "#8B5CF6"
  },
  {
    id: "mental-health-alert",
    type: "awareness",
    icon: "🧠",
    title: { en: "Mental Health Awareness Month", sn: "Mwedzi weHutano hwePfungwa", nd: "Inyanga Yezempilakahle Yengqondo" },
    message: { en: "Your mental health matters. Reach out to our Online Doc anonymously if you feel overwhelmed. We are here to listen.", sn: "Hutano hwepfungwa hwakakosha. Taura nachiremba wedu wepamhepo wakasununguka kana uchinzwa kuremerwa.", nd: "Impilakahle yengqondo yakho iqakathekile. Khuluma loDokotela wethu waku-inthanethi ungaziwa nxa usizwa usindwa." },
    article: {
      en: "Mental Health Awareness Month is a time to break the stigma surrounding mental illness and prioritize emotional well-being. It's okay to not be okay.\n\n**Signs You Might Need Support:**\n- Persistent feelings of sadness, anxiety, or emptiness.\n- Loss of interest in activities you usually enjoy.\n- Significant changes in sleep or appetite.\n- Difficulty concentrating or feeling constantly overwhelmed.\n\n**Resources Available:**\n- Use our **Online Doc** feature to chat anonymously with a qualified counselor or therapist.\n- Join our **Utano Community** forums to connect with peers who understand what you are going through.\n- Remember, seeking help is a sign of strength, not weakness."
    },
    severity: "info", bgColor: "rgba(14, 165, 233, 0.15)", borderColor: "#0EA5E9"
  },
  {
    id: "maternal-alert",
    type: "seminar",
    icon: "🤰",
    title: { en: "Maternal Health Workshop", sn: "Musangano weHutano hwaVanaamai", nd: "Umhlangano Wezempilakahle Yabomama" },
    message: { en: "Expecting mothers are invited to a virtual Q&A session with leading obstetricians this Sunday at 2 PM.", sn: "Madzimai akazvitakura anokokwa kumusangano wepamhepo nevana chiremba vemadzimai Svondo rino na 2 PM.", nd: "Omama abazithweleyo bayanxuswa emhlanganweni waku-inthanethi labodokotela abakhokhelayo ngoSonto ngo-2 PM." },
    article: {
      en: "Pregnancy is a beautiful journey, but it often comes with many questions and anxieties. Our Maternal Health Workshop is designed to provide expecting mothers with reliable, expert advice.\n\n**Workshop Highlights:**\n- **Nutrition during Pregnancy:** What to eat and what to avoid for optimal fetal development.\n- **Recognizing Danger Signs:** When to seek immediate medical attention during pregnancy.\n- **Birth Preparedness:** Creating a comprehensive birth plan and packing your hospital bag.\n- **Postpartum Care:** Understanding changes in your body and managing postpartum blues.\n\nRegister via the link in the Community tab to secure your spot for this informative session."
    },
    severity: "info", bgColor: "rgba(244, 63, 94, 0.15)", borderColor: "#F43F5E"
  },
  {
    id: "nutrition-alert",
    type: "awareness",
    icon: "🥑",
    title: { en: "Nutrition & Local Foods", sn: "Hutano Nezvekudya Zvemunharaunda", nd: "Ukudla Okwakha Umzimba Lakuleli" },
    message: { en: "Did you know local foods like Rapoko and Baobab are superfoods? Read our new article in the Health Tutor.", sn: "Waiziva here kuti zvekudya zvakaita serapoko nemawuyu zvine hutano hwepamusoro? Verenga chinyorwa chedu chitsva muHealth Tutor.", nd: "Ubusazi yini ukuthi ukudla okufana lamabele lomkhomo kukudla okwakha umzimba okukhulu? Bala ugwalo lwethu olutsha kuHealth Tutor." },
    article: {
      en: "We often look to expensive imported products for optimal nutrition, ignoring the powerful 'superfoods' grown right in our own backyards. Traditional grains and fruits offer incredible health benefits.\n\n**Rapoko (Finger Millet):**\n- Exceptionally high in calcium, making it excellent for bone health.\n- Rich in iron and dietary fiber.\n- Has a low glycemic index, making it ideal for diabetes management.\n\n**Baobab (Mawuyu):**\n- Contains significantly more Vitamin C than oranges.\n- High in antioxidants and prebiotics, which support a healthy gut microbiome.\n\nIncorporating these local, affordable foods into your daily diet can drastically improve your overall health and vitality."
    },
    severity: "info", bgColor: "rgba(132, 204, 22, 0.15)", borderColor: "#84CC16"
  }
];
