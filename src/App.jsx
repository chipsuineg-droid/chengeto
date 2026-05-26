import { useState, useEffect, useRef } from "react";
import MindMap from './components/MindMap';
import { HIV_INFO_SECTIONS } from './data/hivInfo';
import { PREG_INFO_SECTIONS } from './data/pregInfo';
import { hivMindMapData } from './data/hivMindMapData';
import { pregMindMapData } from './data/pregMindMapData';
import { HIV_PREVENTION_METHODS, HIV_PREVENTION_CATEGORIES } from './data/hivPreventionMethods';
import { PREG_PREVENTION_METHODS, PREG_PREVENTION_CATEGORIES } from './data/pregPreventionMethods';

// ── LANGUAGES ──
const LANG_LABELS = {
  en: { label: "EN", flag: "🇬🇧", name: "English" },
  sn: { label: "SN", flag: "🇿🇼", name: "Shona" },
  nd: { label: "ND", flag: "🇿🇼", name: "Ndebele" },
};
const LANG_CYCLE = ["en", "sn", "nd"];

// ── UNIVERSITIES ──
const UNIVERSITIES = [
  { id: "uz",    name: "University of Zimbabwe",                 short: "UZ",    idFormat: "R######X" },
  { id: "nust",  name: "National University of Science & Technology", short: "NUST",  idFormat: "N#######X" },
  { id: "msu",   name: "Midlands State University",             short: "MSU",   idFormat: "R######X" },
  { id: "bindura", name: "Bindura University of Science Education", short: "BUSE",  idFormat: "B######X" },
  { id: "cut",   name: "Chinhoyi University of Technology",     short: "CUT",   idFormat: "C######X" },
  { id: "wua",   name: "Women's University in Africa",          short: "WUA",   idFormat: "W######X" },
  { id: "muz",   name: "Midlands State University Zvishavane",  short: "MSUZ",  idFormat: "R######X" },
  { id: "gzu",   name: "Great Zimbabwe University",             short: "GZU",   idFormat: "G######X" },
];

// ── AUTH UTILITIES ──
const AUTH_DEMO_ACCOUNTS = [
  { studentId: "R190001X", university: "uz",   name: "Rudo Moyo",       password: "chengeto2024", year: 2, programme: "Medicine" },
  { studentId: "N2230045X", university: "nust", name: "Tatenda Khumalo",  password: "health123",   year: 3, programme: "Civil Engineering" },
  { studentId: "R200067X", university: "msu",  name: "Thembi Ncube",     password: "protect123",  year: 1, programme: "Social Work" },
];

const getStoredUsers = () => {
  try { return JSON.parse(localStorage.getItem("chengeto_users") || "[]"); } catch(e) { return []; }
};
const saveUsers = (users) => localStorage.setItem("chengeto_users", JSON.stringify(users));
const getSession = () => {
  try { return JSON.parse(localStorage.getItem("chengeto_session") || "null"); } catch(e) { return null; }
};
const saveSession = (user) => localStorage.setItem("chengeto_session", JSON.stringify(user));
const clearSession = () => localStorage.removeItem("chengeto_session");

const validateLogin = (studentId, password) => {
  const id = studentId.trim().toUpperCase();
  // Check demo accounts first
  const demo = AUTH_DEMO_ACCOUNTS.find(a => a.studentId === id && a.password === password);
  if (demo) return { ...demo, studentId: id };
  // Check registered users
  const stored = getStoredUsers();
  const user = stored.find(u => u.studentId === id && u.password === password);
  return user || null;
};

const registerUser = (studentId, password, name, university, year, programme) => {
  const id = studentId.trim().toUpperCase();
  const all = [...AUTH_DEMO_ACCOUNTS, ...getStoredUsers()];
  if (all.find(u => u.studentId === id)) return { error: "This Student ID is already registered." };
  if (id.length < 5) return { error: "Student ID seems too short. Please check it." };
  if (password.length < 6) return { error: "Password must be at least 6 characters." };
  if (!name.trim()) return { error: "Please enter your full name." };
  const newUser = { studentId: id, password, name: name.trim(), university, year: parseInt(year), programme: programme.trim(), nickname: name.trim().split(' ')[0], avatarColor: '#059669', bio: '' };
  const users = getStoredUsers();
  saveUsers([...users, newUser]);
  return { user: newUser };
};

const updateUserProfile = (studentId, updates) => {
  // update demo accounts in session only (they do not live in localStorage)
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.studentId === studentId);
  let updatedUser;
  if (idx >= 0) {
    updatedUser = { ...users[idx], ...updates };
    users[idx] = updatedUser;
    saveUsers(users);
  } else {
    // demo account : patch session only
    updatedUser = { ...getSession(), ...updates };
  }
  saveSession(updatedUser);
  return updatedUser;
};

const AVATAR_COLORS = [
  { color: '#059669', label: 'Emerald' }, { color: '#7C3AED', label: 'Violet' },
  { color: '#DC2626', label: 'Red' },     { color: '#D97706', label: 'Amber' },
  { color: '#0891B2', label: 'Cyan' },    { color: '#DB2777', label: 'Pink' },
  { color: '#1D4ED8', label: 'Blue' },    { color: '#374151', label: 'Slate' },
];

// ── UI TRANSLATIONS ──
const UI = {
  en: {
    hivTitle: "🛡️ HIV Education",
    hivSub: "Your comprehensive hub for HIV knowledge, interactive learning, and prevention strategies.",
    hivWhat: "🧬 What is HIV?",
    hivWhatBody: "HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system, specifically CD4 cells. If untreated, it can lead to AIDS. First identified in the early 1980s, it is believed to have crossed from chimpanzees to humans in Central Africa decades earlier.",
    hivWhatMore: "▼ Learn more about transmission, signs, & facts",
    hivSpread: "How it spreads: Mainly through unprotected sex, sharing needles, or from mother to child during birth/breastfeeding. It CANNOT be spread by hugging, closed-mouth kissing, mosquito bites, or sharing food.",
    hivSigns: "Signs and Symptoms: Early signs (within 2-4 weeks) can feel like a severe flu (fever, chills, rash, night sweats, muscle aches, sore throat). Some people have absolutely no symptoms for years, making testing crucial.",
    hivFacts: "Quick Facts: Did you know? You cannot get HIV from a toilet seat! Also, with modern medicine (ART), someone with HIV can reach an 'undetectable' viral load, meaning they cannot transmit the virus to partners (U=U: Undetectable = Untransmittable).",
    hivVsAids: "HIV vs AIDS: AIDS is the most severe stage. However, with modern treatment (ART), people with HIV in Zimbabwe live full, healthy lives and will not progress to AIDS.",
    hivStatus: "Knowing your status: Regular testing (every 3–6 months if sexually active) is the only way to know. Kits are free at student and government clinics.",
    hivEmergencyTitle: "Urgent possible HIV exposure in the last 72 hours?",
    hivEmergencyBody: "PEP tablets can prevent infection, but they must be started within 72 hours. Proceed to the nearest Hospital A&E department immediately.",
    pregTitle: "🌸 Pregnancy Prevention / Contraception",
    pregSub: "Select tabs to filter options by protection duration. Tap any card for instructions.",
    pregWhat: "👶 How Pregnancy Occurs",
    pregWhatBody: "Pregnancy occurs when a male's sperm fertilizes a female's egg. This usually happens during unprotected vaginal intercourse. The fertilized egg implants in the uterus, where it grows over approximately 9 months.",
    pregWhatMore: "Learn more about the fertile window & cycle",
    pregFertile: "The Fertile Window: Each month, an egg is released (ovulation) and survives for 24 hours. Since sperm can live up to 5 days inside the body, the fertile window is about 6 days long. Unprotected sex during this window has a high chance of causing pregnancy.",
    pregContra: "Prevention (Contraception): Prevents ovulation, blocks sperm, or prevents implantation. It gives you control over your reproductive health, helping you plan your future and complete your education.",
    pregNote: "💡 Note: Only condoms (male & female) offer protection from both pregnancy and HIV. All other hormonal/device methods do not block STIs/HIV.",
    howItWorks: "How it works", frequency: "Frequency", sideEffects: "Side Effects", cost: "Cost", availableAt: "Available at",
    learnMore: "▼ Learn More", showLess: "▲ Show Less", compare: "+ Compare",
  },
  sn: {
    hivTitle: "🛡️ Nzira Dzekudzivirira HIV",
    hivSub: "Dzvanya kadi ripi neripi kuona zvinodiwa nezveMitengo, Maitiro, uye Nzvimbo dzeClinics muZimbabwe.",
    hivWhat: "🧬 HIV Chii?",
    hivWhatBody: "HIV (Human Immunodeficiency Virus) hutachiwana hunorwisa system yemuviri wako inorwisa zvirwere, kunyanya masero CD4 (T cells) anobatsira kurwa zvirwere. Kana usina kurashiwa, inogona kutungamirira kuAIDS (Acquired Immunodeficiency Syndrome).",
    hivWhatMore: "Dzidza zvakawanda nezvekupararira & mamiriro",
    hivSpread: "Kupararira kwayo: Kunyanya kuburikidza nezvakavata pasina mudziviriro (pasina condom kana mishonga yePrEP/PEP), kushiyana minjine, kana kubva kumai kuenda kumwana panguva yemimba, kuzvarwa, kana kuyamwisa.",
    hivVsAids: "HIV vs AIDS: AIDS ndiyo nhanho yakakomba kwazvo yehutachiwana hwakabatwa HIV. Asi, nekurwara kwemazuva ano kweantireti (ART), vanhu vane HIV muZimbabwe vanogona kurarama upenyu hwakakwana, usina kupinda muAIDS.",
    hivStatus: "Kuziva mamiriro ako: Kuedza nguva nenguva (makore 3–6 kana uri mutendi) ndiyo nzira yega yekuziva. Makiti emahara anowanikwa kuzvikoro uye kumahohoro ehurumende.",
    hivEmergencyTitle: "Warangarirwa neHIV mumashure memakore 72?",
    hivEmergencyBody: "Mishonga yePEP inogona kudzivirira hutachiwana, asi inofanira kutangwa mumashure memamidzi 72. Enda nechikurubhembe kumapurisa ekurongedza.",
    pregTitle: "🌸 Kudzivirira Mimba / Contraceptives",
    pregSub: "Sarudza mashandiro akawanda emhando yekudzivirira. Dzvanya kadi kuona zvese.",
    pregWhat: "👶 Sei Mimba Inobata?",
    pregWhatBody: "Mimba inobata kana mbeu yemurume inosangana nemago yemukadzi. Izvi zvinowanzofika panguva yezvekunorara pasina mudziviriro. Mazai anosangana anopinda muchibereko, apo anokura kwemwedzi uchimira mipanda 9.",
    pregWhatMore: "Dzidza zvakawanda nezvenguva yekubata mimba",
    pregFertile: "Nguva Yekubata Mimba: Mwedzi mumwemumwe, mazai anobuda (ovulation) uye anorarama mazuva 24. Sezvo mbeu inogona kurarama mazuva mashanu mukati meweti, nguva yekubata mimba inenge mazuva 6. Kurarirana pasina mudziviriro panguva iyi kunegore rakakura rekubata mimba.",
    pregContra: "Kudzivirira (Contraception): Inodhibidhiza kukuda kwemago, inomisa mbeu, kana kudzivirira kupinda. Inokupa simba pahupenyu hwako hwekubereka, kukubatsira kuronga ramangwana rako uye kupedza dzidzo yako.",
    pregNote: "💡 Cherechedza: Condoms (dzevarume nevakadzi) chete ndicho chidziviriro kubva pamimba uye HIV panguva imwe chete. Mamwe ma hormonal/device haadhibidhiza STIs/HIV.",
    howItWorks: "Inoshanda sei", frequency: "Nguva Yekushandisa", sideEffects: "Zvinokonzera", cost: "Mutengo", availableAt: "Inowanikwa",
    learnMore: "▼ Dzidza Zvakawanda", showLess: "▲ Dzokera", compare: "+ Enzanisa",
  },
  nd: {
    hivTitle: "🛡️ Izindlela Zokugwema I-HIV",
    hivSub: "Chofoza ikhadi loba yiliphi ukubona imininingwane mayelana nezimpawu ezibuhlungu, izindleko, kanye nezindawo zezibhedlela eZimbabwe.",
    hivWhat: "🧬 Yini i-HIV?",
    hivWhatBody: "I-HIV (Human Immunodeficiency Virus) igciwane elihlasela uhlelo lomzimba wesikhwama, ikakhulukazi amaseli e-CD4 (amaseli e-T) asiza ukulwa nezifo. Uma lingaxilongwa, lingaholela ku-AIDS (Acquired Immunodeficiency Syndrome).",
    hivWhatMore: "Funda okwengeziwe mayelana nokusabalalisa & isimo",
    hivSpread: "Indlela esabalalisa ngayo: Ikakhulukazi ngocansi olungaphephile (ngaphandle kwekhondomu noma umuthi we-PrEP/PEP), ukwabelana ngemizula, noma kusukela kunina kuya emsaneni ngesikhathi sokukhulelwa, ukuzalwa, noma ukondlela ngobisi.",
    hivVsAids: "I-HIV vs I-AIDS: I-AIDS yisigaba esibaluleke kakhulu sokusulelwa yi-HIV. Kodwa-ke, ngokwelashwa kwe-antiretroviral (ART) esimanje, abantu be-HIV eZimbabwe baphila impilo ephelele, abangafinyeleli ku-AIDS.",
    hivStatus: "Ukwazi isimo sakho: Ukuhlolwa njalo (izinyanga ezingu-3–6 uma usebenza) yindlela eyodwa yokwazi. Amakit mahhala aphethwe ezikoleni kanye nasemitholampilo kahulumeni.",
    hivEmergencyTitle: "Kukhona ukusulelwa okukhulu kwi-HIV emahora angu-72 edlule?",
    hivEmergencyBody: "Amaphilisi we-PEP angavikela ukusulelwa, kodwa kumele aqalwe phakathi kwamahora angu-72. Iya esibhedlela esiseduze se-A&E ngokushesha.",
    pregTitle: "🌸 Ukugwema Ukukhulelwa / Izinhlelo Zokugwema",
    pregSub: "Khetha amathebhu ukuhlunga izinketho ngesikhathi sokuvikeleka. Thepha ikhadi loba yiliphi imininingwane.",
    pregWhat: "👶 Indlela Ukukhulelwa Okwenzeka Ngayo",
    pregWhatBody: "Ukukhulelwa kwenzeka lapho imbewu yowesilisa ihlangana ne-ovum (iqanda) lowesifazane. Lokhu kuphela kwenzeka ngesikhathi socansi olungaphephile. I-ovum ehlangene izibek'esibunjini, lapho ikhula khona izinyanga ezingu-9.",
    pregWhatMore: "Funda okwengeziwe mayelana nesikhathi esikhethekile sokukhulelwa",
    pregFertile: "Isikhathi Esikhethekile: Njalo ngenyanga, iqanda likhishwa (ukuvuleka) futhi lihlala amahora angu-24. Njengoba imbewu ingahlala izinsuku ezingu-5 ngaphakathi komzimba, isikhathi esikhethekile simayelana nezinsuku ezingu-6. Ucansi olungaphephile ngalesi sikhathi sinethuba eliphezulu lokukhulelwa.",
    pregContra: "Ukugwema (I-Contraception): Igwema ukukhiqizwa kwama-ovum, ivimba imbewu, noma igwema ukuzibeka. Ikunika amandla phezu kwempilo yakho yokuzala, ikusiza ukuhlelela ikusasa lakho futhi uphethe imfundo yakho.",
    pregNote: "💡 Qaphela: Amakondomu (abo wesilisa nabesifazane) kuphela avikela kokubili ukukhulelwa ne-HIV ngasikhathi sinye. Ezinye izindlela ze-hormonal/device azivimbi ama-STI/HIV.",
    howItWorks: "Isebenza kanjani", frequency: "Isikhathi Sokunakekela", sideEffects: "Izinhlungu Ezidalekayo", cost: "Intengo", availableAt: "Itholakala Lapho",
    learnMore: "▼ Funda Okwengeziwe", showLess: "▲ Buyela Emuva", compare: "+ Qhathanisa",
  },
};

// ── DATA ──


const GAME_SCENARIOS = [
  {
    id: 1,
    title: "Scenario 1: The Heat of the Moment",
    story: "You and your partner have been dating for a few months. You are alone in the room, making out on the couch. Things are getting heavy, and clothes are starting to come off. However, you haven't discussed HIV status or protection yet.",
    options: [
      { text: "Stop and say, 'I really like you, but we need to use a condom.'", result: "Great choice! Communication is key. Using a condom protects both of you from HIV and other STIs.", correct: true },
      { text: "Keep going but try to 'pull out' before it is too late.", result: "Risky move! Pre-seminal fluid can carry HIV and cause pregnancy. Pulling out does not protect against HIV.", correct: false },
      { text: "Ask them about their status right then and there.", result: "Good initiative, but relying purely on verbal confirmation without a test or condom is still very risky. People might not know their true status.", correct: false }
    ]
  },
  {
    id: 2,
    title: "Scenario 2: The Morning After",
    story: "Last night, you had a passionate encounter at a party but you realize the condom broke, and you do not know the person's HIV status.",
    options: [
      { text: "Wait a few weeks to see if you get any symptoms.", result: "Dangerous choice. HIV often shows no symptoms for years. By waiting, you lose the chance for emergency prevention.", correct: false },
      { text: "Rush to the clinic or hospital immediately to get PEP.", result: "Excellent! PEP (Post-Exposure Prophylaxis) must be taken within 72 hours of exposure to prevent HIV infection.", correct: true },
      { text: "Take some antibiotics you have left over at home.", result: "Incorrect. Antibiotics treat bacterial infections, not viruses like HIV. They will not protect you.", correct: false }
    ]
  }
];

const HIV_MYTHS = [
  { myth: "You can get HIV from mosquito bites.", fact: "False. HIV cannot survive in insects, and mosquitoes do not inject blood from previous victims." },
  { myth: "I can tell if someone has HIV by looking at them.", fact: "False. Many people with HIV look completely healthy and have no symptoms for years." },
  { myth: "If I am on PrEP, I do not need to use condoms.", fact: "False. PrEP protects against HIV, but it does NOT protect against other STIs (like syphilis or gonorrhea) or pregnancy." },
  { myth: "HIV is a death sentence.", fact: "False. With modern ART medication, people with HIV live long, healthy lives and can reach an undetectable viral load (U=U)." }
];


const ALL_OPTIONS = [...HIV_PREVENTION_METHODS.map(o => ({ ...o, type: "HIV" })), ...PREG_PREVENTION_METHODS.map(o => ({ ...o, type: "Pregnancy" }))];

const SERVICES = [
  { name: "UZ Student Health Centre", institution: "University of Zimbabwe", services: ["HIVST", "PrEP", "Condoms", "Contraception", "PEP referral"], contact: "+263 242 303211", hours: "Mon-Fri 8am-4pm", city: "Harare", lat: -17.7831, lng: 31.0530 },
  { name: "NUST Student Clinic", institution: "National University of Science & Technology", services: ["HIVST", "Condoms", "Contraception", "Referral"], contact: "+263 292 282842", hours: "Mon-Fri 8am-4:30pm", city: "Bulawayo", lat: -20.1802, lng: 28.6148 },
  { name: "MSU Health Services", institution: "Midlands State University", services: ["HIVST", "Condoms", "Contraception"], contact: "+263 54 2260331", hours: "Mon-Fri 8am-4pm", city: "Gweru", lat: -19.4975, lng: 29.8378 },
  { name: "BUSE Student Clinic", institution: "Bindura University of Science Education", services: ["HIVST", "Condoms", "Contraception", "Referral"], contact: "+263 712 607 339", hours: "Mon-Fri 8am-4pm", city: "Bindura", lat: -17.3115, lng: 31.3307 },
  { name: "CUT Health Centre", institution: "Chinhoyi University of Technology", services: ["HIVST", "Condoms", "Contraception"], contact: "+263 67 22203", hours: "Mon-Fri 8am-4pm", city: "Chinhoyi", lat: -17.3773, lng: 30.1983 },
  { name: "WUA Clinic", institution: "Women's University in Africa", services: ["HIVST", "Condoms", "Contraception", "Referral"], contact: "+263 242 459601", hours: "Mon-Fri 8am-4pm", city: "Harare", lat: -17.8175, lng: 31.0911 },
  { name: "GZU Student Clinic", institution: "Great Zimbabwe University", services: ["HIVST", "Condoms", "Contraception"], contact: "+263 39 2266648", hours: "Mon-Fri 8am-4pm", city: "Masvingo", lat: -20.0768, lng: 30.8242 },
  { name: "Africa University Clinic", institution: "Africa University", services: ["HIVST", "Condoms", "Contraception", "PrEP"], contact: "+263 20 60026", hours: "Mon-Fri 8am-4pm", city: "Mutare", lat: -18.8878, lng: 32.5516 },
  { name: "LSU Health Services", institution: "Lupane State University", services: ["HIVST", "Condoms", "Contraception", "Referral"], contact: "+263 289 253 226", hours: "Mon-Fri 8am-4pm", city: "Lupane", lat: -18.9315, lng: 27.8070 },
  { name: "HIT Campus Clinic", institution: "Harare Institute of Technology", services: ["HIVST", "Condoms", "Contraception"], contact: "+263 242 741422", hours: "Mon-Fri 8am-4pm", city: "Harare", lat: -17.8306, lng: 31.0250 },
  { name: "CUZ Clinic", institution: "Catholic University of Zimbabwe", services: ["Condoms", "Contraception", "Referral"], contact: "+263 242 570176", hours: "Mon-Fri 8am-4pm", city: "Harare", lat: -17.8488, lng: 31.0658 },
  { name: "Solusi Student Clinic", institution: "Solusi University", services: ["Condoms", "Contraception"], contact: "+263 292 288921", hours: "Mon-Fri 8am-4pm", city: "Bulawayo", lat: -20.3013, lng: 27.9150 },
  { name: "Parirenyatwa Hospitals", institution: "Government Hospital", services: ["HIVST", "PrEP", "PEP", "Condoms", "Contraception", "VMMC"], contact: "+263 242 701000", hours: "24/7 Emergency", city: "Harare", lat: -17.8157, lng: 31.0423 },
  { name: "Sally Mugabe Hospital", institution: "Government Hospital", services: ["HIVST", "PrEP", "PEP", "Condoms", "Contraception"], contact: "+263 242 621000", hours: "24/7 Emergency", city: "Harare", lat: -17.8687, lng: 31.0286 }
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
};

const BOT_KNOWLEDGE = {
  prep: "Daily Oral PrEP is a highly effective pill (99% prevention rate) to protect against HIV before exposure. It is 100% FREE at UZ Health Centre, Parirenyatwa, and public clinics. Common side effects are mild nausea which fades in 2 weeks.",
  pep: "PEP (Post-Exposure Prophylaxis) is emergency HIV medication. You MUST start it within 72 hours of possible exposure. It is a 28-day course of pills. Go to Parirenyatwa A&E or Harare Hospital A&E immediately : it is free and available 24/7.",
  condom: "Condoms (male & female) are the ONLY dual-protection method, meaning they prevent BOTH HIV and pregnancy at the same time. You can pick up free packs anonymously using our commodity simulator at student clinics.",
  cost: "Most HIV and pregnancy prevention methods (like condoms, PrEP, implants, and injections) are 100% FREE at government clinics and university student health clinics in Zimbabwe.",
  side_effects: "Most methods have minor side effects. Oral pills/PrEP might cause mild nausea for the first 2 weeks. Implants and injections might cause irregular bleeding or spotting. Speak to a doctor if side effects persist.",
  shona: "Mhoro! Chengeto ndiyo nzira yako yekudzivirira HIV pamwe nekudzivisa kubata pamuviri pasina kurongeka. Kuti uzive zvakawanda, nyora mazwi akadai sekuti: 'prep', 'pep', 'condom', kana 'clinic'.",
  pamuviri: "Kudzivirira kubata pamuviri (contraception) kune nzira dzakawanda dzemahara: short-term (pill, condoms), medium-term (injectable Depo every 3 months), and long-term (implants kwemakore 3, Copper IUD kwemakore 10). Mhanya muende ku clinic yepedyo kunoziva yakakukwanirai.",
  dziviriro: "Chengeto inokubatsira kudzivirira HIV. Pane nzira dzinoti PrEP (kudzivirira usati wasangana nehutachiwana), PEP (kudzivirira kana uchinge wasangana nehutachiwana usingafungiri mukati memaawa 72), nema condoms (anodzivirira HIV nemimba panguva imwe chete).",
  clinic: "Unogona kuwana rubatsiro rwakazara pa UZ Student Health Centre, NUST Student Clinic, MSU Health Services, kana Parirenyatwa Hospital. Tarisa tab yedu inoti '📍 Services' kutiona dziri pedyo newe."
};

// ── ABCDE OF HIV PREVENTION ──
const ABCDE = [
  {
    letter: "A",
    word: "Abstain",
    color: "#7C3AED",
    lightColor: "#EDE9FE",
    icon: "🤝",
    body: "Abstaining from sex is the only 100% guaranteed way to prevent HIV and unintended pregnancy. If you choose to be sexually inactive, you are making a powerful health decision.",
    zimbabweContext: "Many young Zimbabweans choose abstinence until they feel emotionally and physically ready. This is a respected and valid choice.",
  },
  {
    letter: "B",
    word: "Be Faithful",
    color: "#DC2626",
    lightColor: "#FEE2E2",
    icon: "💑",
    body: "Staying in a mutually faithful relationship with a partner who has tested HIV-negative significantly reduces your risk. Both partners should test regularly together.",
    zimbabweContext: "Couples testing is available free at all government clinics. Knowing your partner's status is an act of love and respect.",
  },
  {
    letter: "C",
    word: "Condom Use",
    color: "#059669",
    lightColor: "#D1FAE5",
    icon: "🛡️",
    body: "Using a condom correctly every time you have sex is highly effective (98%). Condoms are the ONLY method that protects against BOTH HIV AND pregnancy simultaneously.",
    zimbabweContext: "Free male and female condoms are available at all university student clinics and government health centres nationwide. No prescription needed.",
  },
  {
    letter: "D",
    word: "Do not Share Needles",
    color: "#D97706",
    lightColor: "#FEF3C7",
    icon: "💉",
    body: "HIV can be transmitted through shared needles, syringes, or any sharp instruments that pierce the skin. Always use sterile equipment and never share with others.",
    zimbabweContext: "If you receive injections at a clinic, ensure a new needle is used each time. You have the right to request a fresh needle.",
  },
  {
    letter: "E",
    word: "Expose Your Status",
    color: "#0891B2",
    lightColor: "#E0F2FE",
    icon: "🧪",
    body: "Regular HIV testing is the gateway to prevention and treatment. Knowing your status lets you protect yourself and your partners. If positive, ART treatment starts immediately and is FREE.",
    zimbabweContext: "HIV self-test kits are FREE at UZ, NUST, and MSU student health centres. Results in 20 minutes, done privately at home.",
  },
];

// ── HOW-TO VISUAL GUIDES ──
const HOW_TO_GUIDES = [
  {
    id: "male-condom",
    title: "How to Use a Male Condom",
    icon: "🛡️",
    accentColor: "#059669",
    lightColor: "#D1FAE5",
    youtubeUrl: "https://www.youtube.com/results?search_query=how+to+use+male+condom+health+education",
    tip: "Check the expiry date and look for the BSI kitemark before use. Never use oil-based lubricants : they damage latex.",
    steps: [
      { num: 1, icon: "📦", title: "Check the Pack", desc: "Check expiry date. The condom should not be brittle, sticky, or discoloured. Do not use teeth or scissors to open." },
      { num: 2, icon: "👆", title: "Pinch the Tip", desc: "Pinch the tip of the condom to leave a small space (reservoir) for semen. This prevents the condom from bursting." },
      { num: 3, icon: "🔽", title: "Roll Down", desc: "With the penis erect, place the condom on the head and roll it all the way down to the base. Do this BEFORE any contact." },
      { num: 4, icon: "✅", title: "During Sex", desc: "Hold the condom at the base if needed. The condom should stay in place. Stop if it slips or breaks and replace it." },
      { num: 5, icon: "↩️", title: "After Sex", desc: "Hold the rim while withdrawing : do this before the erection is fully lost to prevent spillage." },
      { num: 6, icon: "🗑️", title: "Dispose Safely", desc: "Wrap in tissue and put in a bin. Never flush condoms down the toilet. Use a new condom for each new act of sex." },
    ],
  },
  {
    id: "female-condom",
    title: "How to Use a Female Condom",
    icon: "💜",
    accentColor: "#7C3AED",
    lightColor: "#EDE9FE",
    youtubeUrl: "https://www.youtube.com/results?search_query=how+to+use+female+condom+health+education",
    tip: "Female condoms can be inserted up to 8 hours before sex, giving you more control and privacy.",
    steps: [
      { num: 1, icon: "📦", title: "Check the Pack", desc: "Check expiry and packaging integrity. The female condom is a soft, pouch-like sheath with two rings : inner and outer." },
      { num: 2, icon: "🤸", title: "Get Comfortable", desc: "Find a comfortable position : squatting, lying down, or one leg raised on a chair. You can insert it before sex begins." },
      { num: 3, icon: "🔄", title: "Squeeze Inner Ring", desc: "Squeeze the inner ring (smaller ring) between your thumb and middle finger to make it narrow for insertion." },
      { num: 4, icon: "⬆️", title: "Insert Fully", desc: "Push the inner ring as far into the vagina as possible, up to the cervix. The outer ring remains outside the vagina." },
      { num: 5, icon: "🔁", title: "Guide During Sex", desc: "Guide the penis inside the female condom : not between the condom and the vaginal wall. The outer ring stays outside." },
    ],
  },
  {
    id: "hivst",
    title: "How to Do an HIV Self-Test",
    icon: "🧪",
    accentColor: "#DC2626",
    lightColor: "#FEE2E2",
    youtubeUrl: "https://www.youtube.com/results?search_query=HIV+oral+self+test+how+to",
    tip: "Test in privacy. If you test positive, this does NOT mean you have AIDS. Book a confirmatory test at a clinic : HIV treatment is free in Zimbabwe.",
    steps: [
      { num: 1, icon: "📦", title: "Open the Kit", desc: "Remove the test device, developer solution vial, and swab from the packet. Check the expiry date." },
      { num: 2, icon: "👄", title: "Collect Oral Sample", desc: "Swipe the swab gently along your upper AND lower gums once each. This collects oral fluid : do not eat or drink 15 min before." },
      { num: 3, icon: "🧴", title: "Add Developer", desc: "Place the swab into the developer solution vial. Swirl gently. The solution activates the test." },
      { num: 4, icon: "⏱️", title: "Wait 20 Minutes", desc: "Do not read results before 20 minutes. Set a timer and do not disturb the test device while waiting." },
      { num: 5, icon: "🔍", title: "Read Results", desc: "ONE line = Negative (not detected). TWO lines = Reactive (go for confirmatory test at clinic). Both lines, even faint, count." },
    ],
  },
  {
    id: "emergency-contraception",
    title: "How to Use Emergency Contraception",
    icon: "⏰",
    accentColor: "#D97706",
    lightColor: "#FEF3C7",
    youtubeUrl: "https://www.youtube.com/results?search_query=emergency+contraception+morning+after+pill+how",
    tip: "Emergency contraception is NOT an abortion pill. It prevents pregnancy from starting. It does NOT work if you are already pregnant.",
    steps: [
      { num: 1, icon: "⚡", title: "Act Quickly", desc: "Emergency contraception must be taken as soon as possible after unprotected sex : within 72 hours (3 days). Earlier = more effective." },
      { num: 2, icon: "🏥", title: "Get the Pill", desc: "Available free at government clinics and student health centres. Also at pharmacies (small fee). No prescription required." },
      { num: 3, icon: "💊", title: "Take the Tablet", desc: "Swallow the Levonorgestrel tablet (1.5mg) with water. You can take it with food to reduce nausea. It is a single tablet." },
      { num: 4, icon: "🔔", title: "Know What to Expect", desc: "You may feel nauseous, have spotting, or your next period may come early or late. This is normal." },
      { num: 5, icon: "📅", title: "Follow Up", desc: "If your period is more than 1 week late after taking EC, do a pregnancy test. Visit a clinic to discuss ongoing contraception." },
    ],
  },
];

// ── PODCAST EPISODES ──
const PODCAST_EPISODES = [
  {
    id: "ep1",
    episode: "EP 01",
    duration: "28:14",
    title: "I Found Out at 19",
    guest: "Rudo M.",
    guestRole: "HIV+ Young Woman, Harare",
    coverEmoji: "💚",
    coverColor: "#059669",
    coverLight: "#D1FAE5",
    tags: ["HIV", "ART", "Stigma", "Hope"],
    summary: "Rudo was diagnosed with HIV at 19 while studying at the University of Zimbabwe. In this raw and powerful episode, she shares the fear of her first positive result, how she told her family, navigating relationships, and how she now advocates for young people to know their status. She has been on ART for 3 years and describes herself as 'undetectable and unstoppable.'",
    chapters: [
      { time: "00:00", title: "Introduction" },
      { time: "03:22", title: "The day I found out" },
      { time: "08:45", title: "Telling my mother" },
      { time: "14:10", title: "Navigating university life HIV+" },
      { time: "21:00", title: "Dating and disclosure" },
      { time: "25:30", title: "My message to young people" },
    ],
    quote: "\"The test result wasn't a death sentence. It was the beginning of me taking my life seriously.\"",
  },
  {
    id: "ep2",
    episode: "EP 02",
    duration: "31:07",
    title: "She Chose to Keep Going",
    guest: "Thembi N.",
    guestRole: "Young Mother, Bulawayo",
    coverEmoji: "🌸",
    coverColor: "#DB2777",
    coverLight: "#FCE7F3",
    tags: ["Unplanned Pregnancy", "Motherhood", "Support"],
    summary: "At 20, Thembi discovered she was pregnant during her first year at NUST. She thought her life was over. This episode follows her journey through fear, the support she found at a campus health centre, and how she completed her degree while raising her son. She now runs a peer support group for young mothers at NUST.",
    chapters: [
      { time: "00:00", title: "Introduction" },
      { time: "04:15", title: "Finding out and the fear" },
      { time: "10:00", title: "The campus nurse who saved me" },
      { time: "16:40", title: "Telling him and being left" },
      { time: "22:55", title: "Completing my degree" },
      { time: "28:00", title: "Building a peer support group" },
    ],
    quote: "\"I walked into the clinic thinking I had no options. I walked out knowing I had all of them.\"",
  },
  {
    id: "ep3",
    episode: "EP 03",
    duration: "24:50",
    title: "My Brother's Keeper",
    guest: "Tatenda K.",
    guestRole: "Male HIV Advocate, Gweru",
    coverEmoji: "💪",
    coverColor: "#7C3AED",
    coverLight: "#EDE9FE",
    tags: ["Male Perspective", "HIV Disclosure", "Masculinity"],
    summary: "Tatenda is HIV-positive and decided to go public at MSU to challenge the silence around men and HIV. He speaks candidly about toxic masculinity in Zimbabwe's sexual culture, why men avoid testing, and how he learned to protect his partners. He now speaks in secondary schools across Midlands Province.",
    chapters: [
      { time: "00:00", title: "Introduction" },
      { time: "03:10", title: "Why men do not test" },
      { time: "09:30", title: "My diagnosis at 22" },
      { time: "15:20", title: "Telling my girlfriend" },
      { time: "19:00", title: "Speaking in schools" },
      { time: "22:40", title: "What I wish I'd known" },
    ],
    quote: "\"Being a real man means protecting the people you love : and that starts with testing.\"",
  },
  {
    id: "ep4",
    episode: "EP 04",
    duration: "35:22",
    title: "The Nurse Who Changed Everything",
    guest: "Sr. Grace C.",
    guestRole: "Registered Nurse, Parirenyatwa Hospital",
    coverEmoji: "🏥",
    coverColor: "#0891B2",
    coverLight: "#E0F2FE",
    tags: ["Healthcare", "Prevention", "Education"],
    summary: "Sister Grace has worked at Parirenyatwa's HIV clinic for 14 years. She has seen thousands of young patients and shares what she wishes every university student knew: the moment you walk through those doors, there is no judgement. She discusses PEP, PrEP, misconceptions she hears daily, and the power of showing up for your own health.",
    chapters: [
      { time: "00:00", title: "Introduction" },
      { time: "05:00", title: "What I see every day" },
      { time: "11:40", title: "The biggest misconceptions" },
      { time: "18:15", title: "PEP and PrEP: what students miss" },
      { time: "26:30", title: "When young people do not come in time" },
      { time: "31:00", title: "My message to Zimbabwe's youth" },
    ],
    quote: "\"Your health is not shameful. Come in. We have seen everything. We will never judge you.\"",
  },
];

// ── SUB-COMPONENTS ──

function ExpandableCard({ option, onCompareSelect, isCompareBtnVisible, lang = "en" }) {
  const [open, setOpen] = useState(false);
  
  // Custom HSL styles for headers
  const isHIV = option.type === "HIV" || HIV_PREVENTION_METHODS.some(o => o.id === option.id);
  const accentColor = isHIV ? 'var(--color-primary)' : 'var(--color-rose)';
  const lightBgColor = isHIV ? 'var(--color-primary-light)' : 'var(--color-rose-light)';
  const effRatingColor = option.effectiveness >= 95 ? '#059669' : option.effectiveness >= 85 ? '#D97706' : '#DC2626';

  return (
    <div className="glass-card animate-fade-in" style={{ padding: 0 }}>
      {/* Card Header Banner */}
      <div style={{ background: lightBgColor, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--color-border)' }}>
        <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{option.icon}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '16px', color: accentColor, fontWeight: 800 }}>{option.name}</h3>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{option.cat}</span>
        </div>
        {isCompareBtnVisible && (
          <button 
            onClick={(e) => { e.stopPropagation(); onCompareSelect(option); }}
            className="nav-button" 
            style={{ padding: '6px 12px', fontSize: '11px', borderColor: accentColor, color: accentColor }}
          >
            + Compare
          </button>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px' }}>
        <p style={{ fontSize: '13px', color: 'var(--color-text-main)', marginBottom: '16px', minHeight: '40px', lineHeight: 1.5 }}>
          {typeof option.desc === 'object' ? option.desc[lang] : option.desc}
        </p>
        
        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, background: effRatingColor + '20', color: effRatingColor, padding: '4px 10px', borderRadius: '20px' }}>
            ⚡ {option.effectiveness}% Effective
          </span>
          {option.dual && (
            <span style={{ fontSize: '11px', fontWeight: 800, background: 'var(--color-accent-light)', color: 'var(--color-accent)', padding: '4px 10px', borderRadius: '20px' }}>
              🛡️ Dual Protection
            </span>
          )}
        </div>

        {/* Expand Area */}
        {open && (
          <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary-mid)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '3px' }}>{UI[lang].howItWorks}</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: 1.4 }}>{typeof option.how === 'object' ? option.how[lang] : option.how}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary-mid)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '3px' }}>{UI[lang].frequency}</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)' }}>{typeof option.frequency === 'object' ? option.frequency[lang] : option.frequency}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary-mid)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '3px' }}>{UI[lang].sideEffects}</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: 1.4 }}>{typeof option.sideEffects === 'object' ? option.sideEffects[lang] : option.sideEffects}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary-mid)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '3px' }}>{UI[lang].cost}</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', fontWeight: 600 }}>{option.cost}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary-mid)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '3px' }}>{UI[lang].availableAt}</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)' }}>{option.availability}</p>
            </div>
          </div>
        )}

        <button 
          onClick={() => setOpen(!open)}
          className="btn btn-secondary" 
          style={{ width: '100%', padding: '10px', fontSize: '12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'center', marginTop: '8px' }}
        >
          {open ? UI[lang].showLess : UI[lang].learnMore}
        </button>
        {open && (
          <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(option.name + ' HIV prevention')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '10px', fontSize: '12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'center', marginTop: '8px', textDecoration: 'none' }}
          >
            Find out more about {option.name}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Application() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const findNearestClinic = () => {
    setLocationLoading(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
      }, () => {
        setLocationError('Unable to retrieve your location. Please check your browser permissions.');
        setLocationLoading(false);
      });
    }
  };

  // ── AUTH STATE ──
  const [currentUser, setCurrentUser] = useState(() => getSession());
  const [authView, setAuthView] = useState("login"); // 'login' | 'register'
  // Login form
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginUni, setLoginUni] = useState("uz");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  // Register form
  const [regId, setRegId] = useState("");
  const [regPw, setRegPw] = useState("");
  const [regPw2, setRegPw2] = useState("");
  const [regName, setRegName] = useState("");
  const [regUni, setRegUni] = useState("uz");
  const [regYear, setRegYear] = useState("1");
  const [regProgramme, setRegProgramme] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    setTimeout(() => {
      const user = validateLogin(loginId, loginPw);
      if (user) {
        saveSession(user);
        setCurrentUser(user);
      } else {
        setLoginError("Incorrect Student ID or password. Please try again.");
      }
      setLoginLoading(false);
    }, 800);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError("");
    if (regPw !== regPw2) { setRegError("Passwords do not match."); return; }
    const result = registerUser(regId, regPw, regName, regUni, regYear, regProgramme);
    if (result.error) { setRegError(result.error); return; }
    saveSession(result.user);
    setCurrentUser(result.user);
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    setLoginId(""); setLoginPw(""); setLoginError("");
    setPage("home");
  };

  // ── PROFILE EDIT STATE ──
  const [profNickname, setProfNickname] = useState("");
  const [profName, setProfName] = useState("");
  const [profBio, setProfBio] = useState("");
  const [profColor, setProfColor] = useState("#059669");
  const [profYear, setProfYear] = useState("1");
  const [profProgramme, setProfProgramme] = useState("");
  const [profPwCurrent, setProfPwCurrent] = useState("");
  const [profPwNew, setProfPwNew] = useState("");
  const [profPwErr, setProfPwErr] = useState("");
  const [profSaved, setProfSaved] = useState(false);

  const openProfilePage = () => {
    if (currentUser) {
      setProfNickname(currentUser.nickname || currentUser.name?.split(' ')[0] || "");
      setProfName(currentUser.name || "");
      setProfBio(currentUser.bio || "");
      setProfColor(currentUser.avatarColor || '#059669');
      setProfYear(String(currentUser.year || "1"));
      setProfProgramme(currentUser.programme || "");
      setProfPwCurrent(""); setProfPwNew(""); setProfPwErr(""); setProfSaved(false);
    }
    setPage("profile");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfPwErr(""); setProfSaved(false);
    const updates = { nickname: profNickname.trim() || profName.split(' ')[0], name: profName.trim(), bio: profBio.trim(), avatarColor: profColor, year: parseInt(profYear), programme: profProgramme.trim() };
    if (profPwNew) {
      if (!profPwCurrent) { setProfPwErr("Enter your current password to change it."); return; }
      const valid = validateLogin(currentUser.studentId, profPwCurrent);
      if (!valid) { setProfPwErr("Current password is incorrect."); return; }
      if (profPwNew.length < 6) { setProfPwErr("New password must be at least 6 characters."); return; }
      updates.password = profPwNew;
    }
    const updated = updateUserProfile(currentUser.studentId, updates);
    setCurrentUser(updated);
    setProfSaved(true);
    setTimeout(() => setProfSaved(false), 3000);
  };

  const toggleLang = () => {
    setLang(prev => {
      const next = LANG_CYCLE[(LANG_CYCLE.indexOf(prev) + 1) % LANG_CYCLE.length];
      localStorage.setItem("lang", next);
      return next;
    });
  };
  
  // Tab states
  const [hivCat, setHivCat] = useState("All");
  const [pregCat, setPregCat] = useState("All");
  const [hivTab, setHivTab] = useState("main"); // 'main' | 'prevention' | 'game' | 'myths'
  const [preventionSubTab, setPreventionSubTab] = useState("methods"); // 'methods' | 'guides' | 'abcde'
  const [pregTab, setPregTab] = useState("main"); // 'main' | 'methods' | 'guides'
  
  // HIV Prevention Methods detail view state
  const [activeHivMethod, setActiveHivMethod] = useState(null); // null = grid, object = detail view
  const [hivPreventionCat, setHivPreventionCat] = useState("all"); // filter: all | Before Exposure | After Exposure

  // Preg Prevention Methods detail view state
  const [activePregMethod, setActivePregMethod] = useState(null);

  // HIV Game states
  const [gameScenarioIdx, setGameScenarioIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showMindMap, setShowMindMap] = useState(false);
  const [activeHivInfoTab, setActiveHivInfoTab] = useState("transmission");
  const [activePregInfoTab, setActivePregInfoTab] = useState("fertility");

  // ABCDE & Guide states
  const [expandedAbcde, setExpandedAbcde] = useState(null);
  const [expandedGuide, setExpandedGuide] = useState(null);

  // Podcast states
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(PODCAST_EPISODES[0]);
  const [podcastProgress, setPodcastProgress] = useState(0);
  const [expandedEpisode, setExpandedEpisode] = useState(null);
  const podcastTimerRef = useRef(null);

  // Podcast simulated playback
  const handlePodcastPlay = (ep) => {
    if (currentEpisode.id !== ep.id) {
      setCurrentEpisode(ep);
      setPodcastProgress(0);
    }
    setPodcastPlaying(prev => !prev);
  };
  useEffect(() => {
    if (podcastPlaying) {
      podcastTimerRef.current = setInterval(() => {
        setPodcastProgress(p => {
          if (p >= 100) { setPodcastPlaying(false); clearInterval(podcastTimerRef.current); return 100; }
          return p + 0.1;
        });
      }, 170);
    } else {
      clearInterval(podcastTimerRef.current);
    }
    return () => clearInterval(podcastTimerRef.current);
  }, [podcastPlaying]);
  
  // Compare states
  const [compareOpt1, setCompareOpt1] = useState("");
  const [compareOpt2, setCompareOpt2] = useState("");
  
  // Service filter states
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCity, setServiceCity] = useState("All");
  const [serviceType, setServiceType] = useState("All");

  // PWA Install state
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // Cycle tracker states
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDay, setPeriodDay] = useState(1);
  const [trackerNotes, setTrackerNotes] = useState("Tap days below to inspect fertile vs safe windows.");
  
  // Chatbot states
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Mhoro/Hello! I am Chengeto, your private AI assistant. Ask me anything about HIV, PEP, PrEP, condoms, or contraception in Zimbabwe. I work offline too!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatBottomRef = useRef(null);

  // Commodity request states
  const [selectedCommodity, setSelectedCommodity] = useState("male-condoms");
  const [commodityPickups, setCommodityPickups] = useState([]);
  const [currentPickupCode, setCurrentPickupCode] = useState(null);

  // Quiz wizard states
  const [quizStep, setQuizStep] = useState(0); // 0: start, 1-3: questions, 4: results
  const [quizAnswers, setQuizAnswers] = useState({ goal: "", duration: "", routine: "" });
  const [quizRecommendations, setQuizRecommendations] = useState([]);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // PWA Install prompt listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setInstallPromptEvent(null);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Chat scroll to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleInstallApp = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    }
    setInstallPromptEvent(null);
  };

  // Chat bot logic
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
  };

  // Commodity code generator
  const handleGenerateCommodityCode = () => {
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const randAlpha = Array.from({length: 2}, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const code = `CG-${randDigits}-${randAlpha}`;
    const descMap = {
      "male-condoms": "Pack of 10 Male Condoms",
      "female-condoms": "Pack of 5 Female Condoms",
      "hivst-kit": "1 Oral Fluid HIV Self-Test Kit",
      "oral-pills": "3-Month Supply Oral Contraceptive Pills"
    };
    
    const newRequest = {
      code,
      item: descMap[selectedCommodity],
      date: new Date().toLocaleDateString()
    };

    setCommodityPickups(prev => [newRequest, ...prev]);
    setCurrentPickupCode(newRequest);
  };

  // Cycle tracker helper functions
  const handleDayClick = (dayNum) => {
    // Basic cycle estimation logic based on 28 day cycle
    // Period: Days 1-5
    // Fertile window: Days 11-16 (ovulation around day 14)
    // Safe: Other days
    if (dayNum >= 1 && dayNum <= 5) {
      setTrackerNotes(`Day ${dayNum}: Active menstruation period. High safety against pregnancy, but use protection (condoms) to prevent STIs/HIV.`);
    } else if (dayNum >= 11 && dayNum <= 16) {
      setTrackerNotes(`Day ${dayNum}: Peak Fertile Window (Ovulation period). Extremely high risk of pregnancy if active without barriers.`);
    } else {
      setTrackerNotes(`Day ${dayNum}: Estimated safe phase. Risk of pregnancy is lower, but remember natural tracking is not 100% reliable. Condoms are still advised.`);
    }
    setPeriodDay(dayNum);
  };

  // Quiz calculations
  const handleQuizAnswer = (key, val) => {
    const updated = { ...quizAnswers, [key]: val };
    setQuizAnswers(updated);
    
    if (key === "routine") {
      // Final step, calculate recommendation
      let results = [];
      if (updated.goal === "hiv") {
        if (updated.duration === "emergency") {
          results = [HIV_PREVENTION_METHODS.find(o => o.id === "pep")];
        } else if (updated.routine === "daily") {
          results = [HIV_PREVENTION_METHODS.find(o => o.id === "prep-oral")];
        } else if (updated.routine === "occasional") {
          results = [HIV_PREVENTION_METHODS.find(o => o.id === "condom-male"), HIV_PREVENTION_METHODS.find(o => o.id === "condom-female")];
        } else {
          results = [HIV_PREVENTION_METHODS.find(o => o.id === "prep-inject"), HIV_PREVENTION_METHODS.find(o => o.id === "dapivirine")];
        }
      } else if (updated.goal === "pregnancy") {
        if (updated.duration === "emergency") {
          results = [PREG_PREVENTION_METHODS.find(o => o.id === "ec-pill")];
        } else if (updated.duration === "long") {
          results = [PREG_PREVENTION_METHODS.find(o => o.id === "implant"), PREG_PREVENTION_METHODS.find(o => o.id === "copper-iud")];
        } else if (updated.routine === "daily") {
          results = [PREG_PREVENTION_METHODS.find(o => o.id === "pop")];
        } else {
          results = [PREG_PREVENTION_METHODS.find(o => o.id === "depo-provera"), PREG_PREVENTION_METHODS.find(o => o.id === "female-condom")];
        }
      } else {
        // Both
        results = [ALL_OPTIONS.find(o => o.id === "condom-male"), ALL_OPTIONS.find(o => o.id === "condom-preg")];
      }
      setQuizRecommendations(results.filter(Boolean));
      setQuizStep(4);
    } else {
      setQuizStep(prev => prev + 1);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({ goal: "", duration: "", routine: "" });
    setQuizStep(0);
  };

  // Compare helpers
  const handleAddCompare1 = (opt) => {
    setCompareOpt1(opt.id);
    setPage("compare");
  };
  const handleAddCompare2 = (opt) => {
    setCompareOpt2(opt.id);
    setPage("compare");
  };

  const c1 = ALL_OPTIONS.find(o => o.id === compareOpt1);
  const c2 = ALL_OPTIONS.find(o => o.id === compareOpt2);

  const compareRows = [
    { label: "Prevention Target", get: o => o.type ? o.type : (HIV_PREVENTION_METHODS.some(x => x.id === o.id) ? "HIV" : "Pregnancy") },
    { label: "Method Type", get: o => o.cat },
    { label: "Effectiveness Rate", get: o => `${o.effectiveness}%` },
    { label: "Usage Cycle", get: o => typeof o.frequency === 'object' ? o.frequency[lang] : o.frequency },
    { label: "Key Side Effects", get: o => typeof o.sideEffects === 'object' ? o.sideEffects[lang] : o.sideEffects },
    { label: "Availability cost", get: o => o.cost },
    { label: "HIV Protection", get: o => (o.dual || o.type === "HIV" || HIV_PREVENTION_METHODS.some(x => x.id === o.id)) ? "✅ Yes" : "❌ No" },
    { label: "Pregnancy Protection", get: o => (o.dual || o.type === "Pregnancy" || PREG_PREVENTION_METHODS.some(x => x.id === o.id)) ? "✅ Yes" : "❌ No" },
  ];

  return (
    <div>

      {/* ══════════════════════════════════════════════
          AUTH GATE : shown when not logged in
      ══════════════════════════════════════════════ */}
      {!currentUser && (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, hsl(152,60%,8%) 0%, hsl(152,40%,14%) 50%, hsl(200,50%,10%) 100%)',
          padding: '20px', fontFamily: 'inherit',
        }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>

            {/* Brand */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '56px', marginBottom: '8px', filter: 'drop-shadow(0 4px 16px rgba(34,197,94,0.4))' }}>🛡️</div>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', margin: 0 }}>CHENGETO</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px', fontStyle: 'italic' }}>chengeto : Shona for protection</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '8px', lineHeight: 1.5, maxWidth: '320px', margin: '8px auto 0' }}>
                Zimbabwe's private university sexual health platform
              </p>
            </div>

            {/* Card */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)',
              borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)',
              padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}>
              {/* Tab switcher */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '4px', marginBottom: '28px', gap: '4px' }}>
                {[['login','🔐 Sign In'], ['register','✏️ Register']].map(([v,l]) => (
                  <button key={v} onClick={() => { setAuthView(v); setLoginError(''); setRegError(''); }}
                    style={{
                      flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer',
                      fontWeight: 700, fontSize: '13px', transition: 'all 0.2s',
                      background: authView === v ? 'hsl(152,60%,42%)' : 'transparent',
                      color: authView === v ? '#fff' : 'rgba(255,255,255,0.5)',
                      boxShadow: authView === v ? '0 4px 14px rgba(34,197,94,0.3)' : 'none',
                    }}
                  >{l}</button>
                ))}
              </div>

              {/* ── LOGIN FORM ── */}
              {authView === 'login' && (
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>University</label>
                    <select value={loginUni} onChange={e => setLoginUni(e.target.value)}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}>
                      {UNIVERSITIES.map(u => <option key={u.id} value={u.id} style={{ background: '#1a2a1a', color: '#fff' }}>{u.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Student ID Number</label>
                    <input
                      type="text" value={loginId} onChange={e => setLoginId(e.target.value)}
                      placeholder={`e.g. ${UNIVERSITIES.find(u=>u.id===loginUni)?.idFormat || 'R######X'}`}
                      required
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', letterSpacing: '0.5px', fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPw ? 'text' : 'password'} value={loginPw} onChange={e => setLoginPw(e.target.value)}
                        placeholder="Enter your password" required
                        style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                      />
                      <button type="button" onClick={() => setShowPw(p => !p)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '16px', padding: 0 }}>
                        {showPw ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#FCA5A5' }}>
                      ⚠️ {loginError}
                    </div>
                  )}

                  <button type="submit" disabled={loginLoading}
                    style={{ padding: '14px', borderRadius: '12px', border: 'none', background: loginLoading ? 'rgba(34,197,94,0.4)' : 'hsl(152,60%,42%)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: loginLoading ? 'default' : 'pointer', marginTop: '4px', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}>
                    {loginLoading ? '⏳ Signing in...' : '🔐 Sign In to Chengeto'}
                  </button>

                  {/* Demo credentials */}
                  <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', border: '1px dashed rgba(255,255,255,0.12)' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>🎯 Hackathon Demo Credentials</p>
                    {AUTH_DEMO_ACCOUNTS.map(a => (
                      <button key={a.studentId} type="button"
                        onClick={() => { setLoginId(a.studentId); setLoginPw(a.password); setLoginUni(a.university); }}
                        style={{ display: 'block', width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '7px 10px', marginBottom: '5px', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                        <strong style={{ color: 'hsl(152,60%,72%)' }}>{a.studentId}</strong> · pw: <code style={{ color: 'hsl(50,100%,72%)' }}>{a.password}</code> · {a.name}
                      </button>
                    ))}
                  </div>
                </form>
              )}

              {/* ── REGISTER FORM ── */}
              {authView === 'register' && (
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Full Name</label>
                      <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="Your full name" required
                        style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Student ID</label>
                      <input type="text" value={regId} onChange={e => setRegId(e.target.value)} placeholder="e.g. R190045X" required
                        style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', fontWeight: 700, outline: 'none', boxSizing: 'border-box', letterSpacing: '0.5px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>University</label>
                    <select value={regUni} onChange={e => setRegUni(e.target.value)}
                      style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}>
                      {UNIVERSITIES.map(u => <option key={u.id} value={u.id} style={{ background: '#1a2a1a' }}>{u.name}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Year</label>
                      <select value={regYear} onChange={e => setRegYear(e.target.value)}
                        style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}>
                        {['1','2','3','4','5','6'].map(y => <option key={y} value={y} style={{ background: '#1a2a1a' }}>Year {y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Programme</label>
                      <input type="text" value={regProgramme} onChange={e => setRegProgramme(e.target.value)} placeholder="e.g. Medicine, Law..." required
                        style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Password</label>
                    <input type={showPw ? 'text' : 'password'} value={regPw} onChange={e => setRegPw(e.target.value)} placeholder="Min 6 characters" required
                      style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                    <input type={showPw ? 'text' : 'password'} value={regPw2} onChange={e => setRegPw2(e.target.value)} placeholder="Re-enter password" required
                      style={{ width: '100%', padding: '11px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                    <input type="checkbox" checked={showPw} onChange={e => setShowPw(e.target.checked)} />
                    Show passwords
                  </label>

                  {regError && (
                    <div style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#FCA5A5' }}>
                      ⚠️ {regError}
                    </div>
                  )}

                  <button type="submit"
                    style={{ padding: '13px', borderRadius: '12px', border: 'none', background: 'hsl(152,60%,42%)', color: '#fff', fontWeight: 800, fontSize: '14px', cursor: 'pointer', marginTop: '2px', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}>
                    ✅ Create My Account
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                    Your data stays on this device. Chengeto does not share personal information.
                  </p>
                </form>
              )}
            </div>

            {/* Footer */}
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '20px' }}>
              🔒 Private & Secure · Works Offline · Made for Zimbabwe Students
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          MAIN APP : shown when logged in
      ══════════════════════════════════════════════ */}
      {currentUser && (
      <div>
      {/* ── HEADER ── */}
      <header className="nav-header">
        <div className="logo-group">
          <div className="logo-title">
            <span style={{ fontSize: '26px' }}>🛡️</span> CHENGETO
          </div>
          <div className="logo-sub">Zimbabwe Youth Health & Self-Care Platform</div>
        </div>
        <div className="nav-links">
          <button onClick={() => setPage("home")} className={`nav-button ${page === "home" ? "active" : ""}`}>
            🏠 <span>Home</span>
          </button>
          <button onClick={() => setPage("hiv")} className={`nav-button ${page === "hiv" ? "active" : ""}`}>
            🛡️ <span>HIV</span>
          </button>
          <button onClick={() => setPage("pregnancy")} className={`nav-button ${page === "pregnancy" ? "active" : ""}`}>
            🌸 <span>Pregnancy</span>
          </button>
          <button onClick={() => setPage("compare")} className={`nav-button ${page === "compare" ? "active" : ""}`}>
            ⚖️ <span>Compare</span>
          </button>
          <button onClick={() => setPage("directory")} className={`nav-button ${page === "directory" ? "active" : ""}`}>
            📍 <span>Services</span>
          </button>
          <button onClick={() => setPage("podcast")} className={`nav-button ${page === "podcast" ? "active" : ""}`}>
            🎙️ <span>Podcast</span>
          </button>
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={toggleLang}
            className="nav-button"
            aria-label="Switch language"
            title={`Switch language : current: ${LANG_LABELS[lang].name}`}
            style={{ fontWeight: 800, letterSpacing: '0.5px', minWidth: '52px', textAlign: 'center' }}
          >
            {LANG_LABELS[lang].flag} {LANG_LABELS[lang].label}
          </button>
          {/* User avatar + profile + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px', paddingLeft: '12px', borderLeft: '1px solid var(--color-border)' }}>
            <button
              onClick={openProfilePage}
              title="Edit your profile"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '5px 10px 5px 5px', cursor: 'pointer', transition: 'all 0.15s' }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: currentUser?.avatarColor || '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '13px', flexShrink: 0 }}>
                {(currentUser?.nickname || currentUser?.name || '?').charAt(0).toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {currentUser?.nickname || currentUser?.name?.split(' ')[0]}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {currentUser?.studentId}
                </span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              title="Sign out"
              style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '7px 9px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-muted)', transition: 'all 0.15s' }}
            >🚪</button>
          </div>
        </div>
      </header>

      {/* ── HOME VIEW ── */}
      {page === "home" && (
        <div className="animate-fade-in">
          {/* ── PERSONALISED GREETING ── */}
          {(() => {
            const hour = new Date().getHours();
            const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
            const name = currentUser?.nickname || currentUser?.name?.split(' ')[0] || 'there';
            return (
              <div style={{ background: `linear-gradient(135deg, ${currentUser?.avatarColor || '#059669'}18, ${currentUser?.avatarColor || '#059669'}08)`, borderBottom: '1px solid var(--color-border)', padding: '16px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {greeting}, <span style={{ color: currentUser?.avatarColor || 'var(--color-primary)' }}>{name}</span>! 👋
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    What can we learn today?
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Hero section */}
          <section className="hero-banner">
            <div style={{ fontSize: '56px', marginBottom: '16px', animation: 'fadeInUp 0.6s' }}>💚</div>
            <h1 className="hero-title">CHENGETO</h1>
            <div className="hero-shona">chengeto : Shona word for protection</div>
            <p className="hero-subtitle">
              Secure, private, and accurate sexual health information. Get details on prevention methods, locations, and request commodities anonymously.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setPage("quiz")} className="btn btn-primary">
                📝 Take Fit Quiz
              </button>
              {installPromptEvent && (
                <button onClick={handleInstallApp} className="btn btn-white" style={{ border: '2px solid var(--color-primary-mid)' }}>
                  📥 Install PWA
                </button>
              )}
            </div>
          </section>

          {/* Quick Information Trust Anchors */}
          <div style={{ background: 'var(--color-primary-light)', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '280px' }}>
                <span style={{ fontSize: '28px' }}>🔒</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-primary)' }}>100% Private</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>No sign-up or profile data required. Fully anonymous.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '280px' }}>
                <span style={{ fontSize: '28px' }}>🎓</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-primary)' }}>Expert Verified</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Content aligns with CeSHHAR Zimbabwe & MASCOT study standards.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '280px' }}>
                <span style={{ fontSize: '28px' }}>📶</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', color: 'var(--color-primary)' }}>Offline-First</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Loads instantly without internet. Works anywhere.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Menu Options Grid */}
          <div style={{ padding: '60px 0', backgroundColor: 'var(--color-bg-base)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '26px', color: 'var(--color-primary)' }}>Interact & Explore</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '40px' }}>Select any tool below to begin your self-care journey</p>
            
            <div className="grid-container">
              {/* Card 1 */}
              <div className="glass-card" onClick={() => setPage("portal")} style={{ cursor: 'pointer' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏥</div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>Commodity Code Portal</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Generate a private pickup code for HIV test kits or condoms, and claim them anonymously at campus health services.
                </p>
                <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--color-accent)' }}>Get Pickup Code →</span>
              </div>

              {/* Card 2 */}
              <div className="glass-card" onClick={() => setPage("chat")} style={{ cursor: 'pointer' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>🤖</div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>Chengeto Private Chatbot</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Get quick answers in English or Shona about costs, locations, and directions without any judgements.
                </p>
                <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--color-accent)' }}>Chat Now →</span>
              </div>

              {/* Card 3 */}
              <div className="glass-card" onClick={() => setPage("quiz")} style={{ cursor: 'pointer' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
                <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>Find My Fit Quiz</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Answer a few simple questions to find the protection methods that best fit your lifestyle and preferences.
                </p>
                <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--color-accent)' }}>Start Quiz →</span>
              </div>
            </div>
          </div>

          {/* Quick list section preview */}
          <div style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '24px', color: 'var(--color-primary)', marginBottom: '32px' }}>Prevention Resources</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--color-bg-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '30px' }}>🛡️</span>
                  <h3 style={{ color: 'var(--color-primary)' }}>HIV Prevention Guides</h3>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Explore oral/injectable options, self-testing guides, and urgent PEP directions.</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                  <button onClick={() => { setPage("hiv"); setHivTab("prevention"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11.5px' }}>🛡️ Prevention Methods</button>
                  <button onClick={() => { setPage("hiv"); setHivTab("game"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11.5px' }}>🎮 Interactive Scenarios</button>
                  <button onClick={() => { setPage("hiv"); setHivTab("myths"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11.5px' }}>🤔 Myths vs Facts</button>
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '30px' }}>🌸</span>
                  <h3 style={{ color: 'var(--color-rose)' }}>Pregnancy Prevention</h3>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Check pills, implants, patches, IUD devices, and emergency contraception availability.</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                  <button onClick={() => { setPage("pregnancy"); setPregTab("methods"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn" style={{ padding: '6px 12px', fontSize: '11.5px', background: 'transparent', border: '1px solid var(--color-rose)', color: 'var(--color-rose)' }}>🛡️ Contraception Methods</button>
                  <button onClick={() => { setPage("pregnancy"); setPregTab("guides"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn" style={{ padding: '6px 12px', fontSize: '11.5px', background: 'transparent', border: '1px solid var(--color-rose)', color: 'var(--color-rose)' }}>📖 How-To Guides</button>
                  <button onClick={() => { setPage("tracker"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn" style={{ padding: '6px 12px', fontSize: '11.5px', background: 'transparent', border: '1px solid var(--color-rose)', color: 'var(--color-rose)' }}>📅 Cycle Tracker</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HIV SECTION VIEW ── */}
      {page === "hiv" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>

          {/* ── HIV DASHBOARD OVERVIEW (only shown on main tab) ── */}
          {hivTab === 'main' && (
            <>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px' }}>{UI[lang].hivTitle}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            {UI[lang].hivSub}
          </p>

          {/* HIV Definition Card */}
          <div className="glass-card" style={{ marginBottom: '24px', border: '1px solid var(--color-primary)', borderLeft: '4px solid var(--color-primary)', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              🧬 What is HIV?
            </h3>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--color-text-main)', marginBottom: '16px', textAlign: 'justify' }}>
              HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system, specifically CD4 cells that help fight infections. If left untreated, HIV can weaken the immune system over time and lead to AIDS. It is spread through certain body fluids and can be prevented with the right knowledge, tools, and care.
            </p>

            
            <button 
              onClick={() => setShowMindMap(true)}
              className="animate-breathe"
              style={{ width: '100%', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '14px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            >
              📖 Explore Interactive HIV Mind Map
            </button>
            
            {/* Detailed Information Tabs */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ color: 'var(--color-primary-mid)', marginBottom: '12px', fontSize: '15px' }}>Comprehensive Guide</h4>
              
              {/* Tab Headers (Horizontal Scroll) */}
              <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }} className="hide-scrollbar">
                {HIV_INFO_SECTIONS.map(section => (
                  <button 
                    key={section.id}
                    onClick={() => setActiveHivInfoTab(section.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: activeHivInfoTab === section.id ? 'var(--color-primary)' : 'var(--color-border)',
                      background: activeHivInfoTab === section.id ? 'var(--color-primary)' : 'transparent',
                      color: activeHivInfoTab === section.id ? '#fff' : 'var(--color-text-main)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Banner */}
          <div style={{ background: '#ffecec', border: '1px solid #ffb3b3', borderRadius: '12px', padding: '20px 24px', marginBottom: '30px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '28px', marginTop: '-4px' }}>🚨</span>
            <div>
              <h4 style={{ color: '#d93838', fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>Urgent possible HIV exposure in the last 72 hours?</h4>
              <p style={{ fontSize: '13px', color: '#8e6363', lineHeight: 1.5 }}>
                For confidential guidance and care, visit any local or national clinic 24 hours. Proceed to the nearest hospital A&E department immediately.
              </p>
            </div>
          </div>
            </>
          )}

          {/* ── HIV DASHBOARD (MAIN) ── */}
          {hivTab === 'main' && (
            <div className="animate-fade-in">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                
                {/* Prevention Methods Card */}
                <div className="glass-card" onClick={() => { setHivTab('prevention'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-bg-surface)', border: 'none' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
                  <h3 style={{ fontSize: '17px', color: 'var(--color-primary)', marginBottom: '8px' }}>Prevention Methods</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Explore how-to guides, ABCDE framework, and practical steps to stay safe.</p>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-primary)', marginTop: 'auto' }}>Open Guides →</span>
                </div>

                {/* HIV Game Card */}
                <div className="glass-card" onClick={() => { setHivTab('game'); setGameScenarioIdx(0); setGameOver(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-bg-surface)', border: 'none' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
                  <h3 style={{ fontSize: '17px', color: 'var(--color-primary)', marginBottom: '8px' }}>Interactive Scenarios</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Play through real-life relationship and exposure scenarios to test your knowledge.</p>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-primary)', marginTop: 'auto' }}>Play Game →</span>
                </div>

                {/* Myths vs Facts Card */}
                <div className="glass-card" onClick={() => { setHivTab('myths'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-bg-surface)', border: 'none' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤔</div>
                  <h3 style={{ fontSize: '17px', color: 'var(--color-primary)', marginBottom: '8px' }}>Myths vs Facts</h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Debunk common rumors around HIV transmission and prevention.</p>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-primary)', marginTop: 'auto' }}>Learn the Truth →</span>
                </div>
              </div>

              {/* Bottom Chat Button */}
              <button className="btn" onClick={() => setPage('chat')} style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', background: 'var(--color-bg-surface)', border: 'none', color: 'var(--color-primary)', boxShadow: '0 4px 12px var(--color-card-shadow)' }}>
                Have More Questions? Talk to Chengeto
              </button>
            </div>
          )}

          {/* ── HIV GAME VIEW ── */}
          {hivTab === 'game' && (
            <div className="animate-fade-in">
              <button onClick={() => { setHivTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⬅ Back to HIV Dashboard
              </button>
              
              {!gameOver ? (
                <div className="glass-card">
                  <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '12px' }}>{GAME_SCENARIOS[gameScenarioIdx].title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-main)', marginBottom: '24px' }}>
                    {GAME_SCENARIOS[gameScenarioIdx].story}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {GAME_SCENARIOS[gameScenarioIdx].options.map((opt, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          alert(opt.result);
                          if (gameScenarioIdx < GAME_SCENARIOS.length - 1) {
                            setGameScenarioIdx(gameScenarioIdx + 1);
                          } else {
                            setGameOver(true);
                          }
                        }}
                        style={{ padding: '14px 20px', textAlign: 'left', background: 'var(--color-bg-base)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-main)' }}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
                  <h3 style={{ fontSize: '22px', color: 'var(--color-primary)', marginBottom: '12px' }}>Great Job!</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>You have completed all scenarios. You are well equipped to handle real-life situations!</p>
                  <button onClick={() => { setHivTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-primary">Return to Dashboard</button>
                </div>
              )}
            </div>
          )}

          {/* ── MYTHS VIEW ── */}
          {hivTab === 'myths' && (
            <div className="animate-fade-in">
              <button onClick={() => { setHivTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⬅ Back to HIV Dashboard
              </button>
              
              <h3 style={{ fontSize: '24px', color: 'var(--color-primary)', marginBottom: '24px' }}>Myths Around HIV Prevention</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {HIV_MYTHS.map((m, i) => (
                  <div key={i} className="glass-card" style={{ borderLeft: '4px solid var(--color-accent)' }}>
                    <h4 style={{ fontSize: '16px', color: 'var(--color-text-main)', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                      <span>❌</span> {m.myth}
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--color-primary-mid)', fontWeight: 600, marginLeft: '32px' }}>
                      ✅ {m.fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PREVENTION METHODS (NESTED TABS) ── */}
          {hivTab === 'prevention' && (
            <div className="animate-fade-in">
              <button onClick={() => { setHivTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⬅ Back to HIV Dashboard
              </button>

              <div className="tabs-container" style={{ marginBottom: '28px' }}>
                {[['methods', '🛡️ Methods'], ['guides', '📖 Guides'], ['abcde', '🔤 ABCDE']].map(([key, label]) => (
                  <button
                    key={key}
                    className={`tab-btn ${preventionSubTab === key ? 'active-hiv' : ''}`}
                    onClick={() => setPreventionSubTab(key)}
                    style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 700 }}
                  >{label}</button>
                ))}
              </div>

              {/* ── PREVENTION METHODS TAB ── */}
              {preventionSubTab === 'methods' && (
                <div className="animate-fade-in">
                  {activeHivMethod ? (
                    <div className="animate-fade-in">
                      <button onClick={() => setActiveHivMethod(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        ⬅ Back to Prevention Methods
                      </button>

                      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 8px 30px rgba(8, 145, 178, 0.12)' }}>
                        <div style={{ background: 'linear-gradient(135deg, var(--color-primary), #0369a1)', padding: '32px 24px', color: '#fff' }}>
                          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{activeHivMethod.icon}</div>
                          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                            {activeHivMethod.categoryLabel}
                          </div>
                          <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2 }}>{activeHivMethod.name}</h2>
                          <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.5, fontWeight: 500 }}>{activeHivMethod.tagline}</p>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Effectiveness</span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)' }}>{activeHivMethod.effectiveness}%</span>
                            </div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${activeHivMethod.effectiveness}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '4px' }}></div>
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div className="glass-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📝 Description</h4>
                            <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activeHivMethod.detail.description}</p>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#F59E0B', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💊 Form of Use</h4>
                            <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activeHivMethod.detail.formOfUse}</p>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #3B82F6' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚙️ How It Works</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.howItWorks.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #10B981' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#10B981', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛠️ How To Use</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.howToUse.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⏱️ Frequency</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.frequency.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #EF4444' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#EF4444', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚠️ Side Effects</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.sideEffects.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #0EA5E9' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0EA5E9', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📍 Where & How to Access</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.access.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #059669' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💰 Cost</h4>
                            <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7, fontWeight: 600 }}>{activeHivMethod.detail.cost}</p>
                          </div>

                          <div className="glass-card" style={{ borderLeft: '4px solid #6366F1' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6366F1', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛡️ STI Protection</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {activeHivMethod.detail.stiProtection.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                            </ul>
                          </div>

                          {activeHivMethod.detail.misunderstandings.length > 0 && (
                            <div className="glass-card" style={{ borderLeft: '4px solid #D97706' }}>
                              <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💡 Correcting Misunderstandings</h4>
                              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                {activeHivMethod.detail.misunderstandings.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>✅ {item}</li>)}
                              </ul>
                            </div>
                          )}

                          <button onClick={() => { setActiveHivMethod(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ width: '100%', marginTop: '8px' }}>
                            ⬅ Back to All Prevention Methods
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="tabs-container" style={{ marginBottom: '20px' }}>
                        {HIV_PREVENTION_CATEGORIES.map(c => (
                          <button key={c.id} className={`tab-btn ${hivPreventionCat === c.id ? 'active-hiv' : ''}`} onClick={() => setHivPreventionCat(c.id)}>{c.label}</button>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {HIV_PREVENTION_METHODS.filter(o => hivPreventionCat === 'all' || o.cat === hivPreventionCat).map(o => (
                          <div key={o.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderTop: o.urgent ? '4px solid var(--color-primary)' : 'none', position: 'relative' }}>
                            {o.urgent && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-primary)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Time Sensitive</div>}
                            <div style={{ fontSize: '42px', marginBottom: '16px' }}>{o.icon}</div>
                            <h3 style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px', fontWeight: 800, lineHeight: 1.3 }}>{o.name}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>{o.tagline}</p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                              <span style={{ fontSize: '11px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>{o.effectiveness}% Effective</span>
                              {o.dual && <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>+ STI Protection</span>}
                            </div>
                            <button onClick={() => { setActiveHivMethod(o); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 600 }}>Learn More →</button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── HOW-TO GUIDES TAB ── */}
              {preventionSubTab === 'guides' && (
                <div className="animate-fade-in">
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                    Step-by-step visual guides. Click a guide to expand. Optional YouTube links open in your browser.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {HOW_TO_GUIDES.filter(g => g.id !== 'emergency-contraception').map(guide => (
                      <div key={guide.id} className="glass-card" style={{ padding: 0, border: `2px solid ${guide.accentColor}30`, overflow: 'hidden' }}>
                        {/* Guide Header */}
                        <button
                          onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                          style={{ width: '100%', background: guide.lightColor, border: 'none', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}
                        >
                          <span style={{ fontSize: '36px' }}>{guide.icon}</span>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '18px', color: guide.accentColor, fontWeight: 800, marginBottom: '2px' }}>{guide.title}</h3>
                            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{guide.steps.length} steps · Tap to {expandedGuide === guide.id ? 'close' : 'view'}</p>
                          </div>
                          <span style={{ fontSize: '20px', color: guide.accentColor }}>{expandedGuide === guide.id ? '▲' : '▼'}</span>
                        </button>

                        {/* Guide Body */}
                        {expandedGuide === guide.id && (
                          <div style={{ padding: '20px' }} className="animate-fade-in">
                            {/* NEW CSS SCHEMATIC DIAGRAM FOR CONDOM */}
                            {guide.id === 'male-condom' && (
                              <div style={{ marginBottom: '24px', background: 'var(--color-bg-base)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
                                <h4 style={{ fontSize: '14px', color: 'var(--color-primary)', marginBottom: '12px', textAlign: 'center' }}>Visual Schematic</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>1. Check Expiry</div>
                                  </div>
                                  <div style={{ color: 'var(--color-primary-mid)' }}>→</div>
                                  <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>👐</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>2. Tear carefully</div>
                                  </div>
                                  <div style={{ color: 'var(--color-primary-mid)' }}>→</div>
                                  <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤏</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>3. Pinch tip</div>
                                  </div>
                                  <div style={{ color: 'var(--color-primary-mid)' }}>→</div>
                                  <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏬</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>4. Roll down</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Steps grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                              {guide.steps.map(step => (
                                <div key={step.num} style={{ background: 'var(--color-bg-surface)', border: `1px solid ${guide.accentColor}20`, borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                  <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: guide.accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', flexShrink: 0 }}>{step.num}</div>
                                  <div>
                                    <div style={{ fontSize: '14px', fontWeight: 800, color: guide.accentColor, marginBottom: '4px' }}>{step.icon} {step.title}</div>
                                    <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: 1.45 }}>{step.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Tip box */}
                            <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#92400E' }}>
                              <strong>💡 Tip:</strong> {guide.tip}
                            </div>
                            {/* YouTube link */}
                            <a href={guide.youtubeUrl} target="_blank" rel="noopener noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#DC2626', color: '#fff', borderRadius: 'var(--radius-md)', padding: '10px 18px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
                            >
                              ▶️ Watch on YouTube <span style={{ fontSize: '11px', opacity: 0.8 }}>(requires internet)</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── ABCDE FRAMEWORK TAB ── */}
              {preventionSubTab === 'abcde' && (
                <div className="animate-fade-in">
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                    The ABCDE framework is Zimbabwe's official HIV prevention approach. Click each letter to learn more.
                  </p>
                  {/* Big ABCDE letter row */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
                    {ABCDE.map(item => (
                      <button
                        key={item.letter}
                        onClick={() => setExpandedAbcde(expandedAbcde === item.letter ? null : item.letter)}
                        style={{
                          width: '68px', height: '68px', borderRadius: '16px',
                          background: expandedAbcde === item.letter ? item.color : item.lightColor,
                          color: expandedAbcde === item.letter ? '#fff' : item.color,
                          border: `2px solid ${item.color}`,
                          fontSize: '28px', fontWeight: 900, cursor: 'pointer',
                          boxShadow: expandedAbcde === item.letter ? `0 4px 18px ${item.color}50` : 'none',
                          transition: 'all 0.2s ease',
                        }}
                        aria-label={item.word}
                      >{item.letter}</button>
                    ))}
                  </div>
                  {/* Expanded ABCDE card */}
                  {ABCDE.map(item => expandedAbcde === item.letter && (
                    <div key={item.letter} className="glass-card animate-fade-in" style={{ borderLeft: `6px solid ${item.color}`, padding: '24px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: item.lightColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontSize: '28px', fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.letter}</div>
                          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-main)' }}>{item.word}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '14px' }}>{item.body}</p>
                      <div style={{ background: item.lightColor, borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: '13px', color: item.color, fontWeight: 600 }}>
                        🇿🇼 Zimbabwe Context: {item.zimbabweContext}
                      </div>
                    </div>
                  ))}
                  {!expandedAbcde && (
                    <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '14px', padding: '20px', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                      ⬆️ Click any letter above to explore that principle
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── PREGNANCY SECTION VIEW ── */}
      {page === "pregnancy" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>

          {/* ── PREGNANCY DASHBOARD OVERVIEW (only shown on main tab) ── */}
          {pregTab === 'main' && (
            <>
          <h2 style={{ fontSize: '28px', color: 'var(--color-rose)', marginBottom: '4px' }}>{UI[lang].pregTitle}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            {UI[lang].pregSub}
          </p>

          {/* Pregnancy Definition Card */}
          <div className="glass-card" style={{ marginBottom: '24px', border: '1px solid var(--color-rose)', borderLeft: '4px solid var(--color-rose)', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--color-rose)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              🌸 What is Pregnancy Care?
            </h3>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--color-text-main)', marginBottom: '16px', textAlign: 'justify' }}>
              Pregnancy occurs when a sperm fertilizes an egg, which then implants in the uterus. Navigating reproductive health means understanding your fertility cycle, choosing the right contraception, and accessing proper prenatal care if expecting. Staying informed empowers you to make the best decisions for your body and future.
            </p>

            <button 
              onClick={() => setShowMindMap('pregnancy')}
              className="animate-breathe"
              style={{ width: '100%', background: 'var(--color-rose)', color: '#fff', border: 'none', padding: '14px 16px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            >
              📖 Explore Interactive Pregnancy Mind Map
            </button>
            
            {/* Detailed Information Tabs */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ color: 'var(--color-rose)', marginBottom: '12px', fontSize: '15px' }}>Comprehensive Guide</h4>
              
              <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }} className="hide-scrollbar">
                {PREG_INFO_SECTIONS.map(section => (
                  <button 
                    key={section.id}
                    onClick={() => setActivePregInfoTab(section.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: activePregInfoTab === section.id ? 'var(--color-rose)' : 'var(--color-border)',
                      background: activePregInfoTab === section.id ? 'var(--color-rose)' : 'transparent',
                      color: activePregInfoTab === section.id ? '#fff' : 'var(--color-text-main)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
            </>
          )}

          {/* ── PREGNANCY MAIN DASHBOARD ── */}
          {pregTab === 'main' && (
            <div className="animate-fade-in">
              {/* Emergency Banner */}
          <div style={{ background: '#ffecec', border: '1px solid #ffb3b3', borderRadius: '12px', padding: '20px 24px', marginBottom: '30px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '28px', marginTop: '-4px' }}>🚨</span>
            <div>
              <h4 style={{ color: '#d93838', fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>Need Emergency Contraception in the next 72 hours?</h4>
              <p style={{ fontSize: '13px', color: '#8e6363', lineHeight: 1.5 }}>
                The "Morning After Pill" is most effective when taken as soon as possible. Visit your campus clinic or nearest pharmacy immediately.
              </p>
            </div>
          </div>

          {/* ── PREGNANCY DASHBOARD TABS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {/* Contraception Methods Card */}
            <div className="glass-card" onClick={() => { setPregTab('methods'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-bg-surface)', border: 'none' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ fontSize: '17px', color: 'var(--color-rose)', marginBottom: '8px' }}>Contraception Methods</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Explore pills, implants, condoms, and other safe options for you.</p>
              <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-rose)', marginTop: 'auto' }}>Open Methods →</span>
            </div>

            {/* How-To Guides Card */}
            <div className="glass-card" onClick={() => { setPregTab('guides'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-bg-surface)', border: 'none' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📖</div>
              <h3 style={{ fontSize: '17px', color: 'var(--color-rose)', marginBottom: '8px' }}>How-To Guides</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Step-by-step visual instructions on using contraception correctly.</p>
              <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-rose)', marginTop: 'auto' }}>View Guides →</span>
            </div>

            {/* Cycle Tracker Card */}
            <div className="glass-card" onClick={() => setPage('tracker')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-bg-surface)', border: 'none' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
              <h3 style={{ fontSize: '17px', color: 'var(--color-rose)', marginBottom: '8px' }}>Cycle Tracker</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>Understand your fertile window and estimate safe days.</p>
              <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-rose)', marginTop: 'auto' }}>Track Cycle →</span>
            </div>
            </div>

            {/* Bottom Chat Button */}
            <button className="btn" onClick={() => setPage('chat')} style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', background: 'var(--color-bg-surface)', border: 'none', color: 'var(--color-rose)', boxShadow: '0 4px 12px var(--color-card-shadow)', marginTop: '20px' }}>
              Have More Questions? Talk to Chengeto
            </button>
          </div>
          )}


          {/* ── PREVENTION METHODS TAB ── */}
          {pregTab === 'methods' && (
            <div className="animate-fade-in">
              {activePregMethod ? (
                <div className="animate-fade-in">
                  <button onClick={() => setActivePregMethod(null)} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⬅ Back to Prevention Methods
                  </button>

                  <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 8px 30px rgba(225, 29, 72, 0.12)' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--color-rose), #be123c)', padding: '32px 24px', color: '#fff' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{activePregMethod.icon}</div>
                      <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                        {activePregMethod.categoryLabel}
                      </div>
                      <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2 }}>{activePregMethod.name}</h2>
                      <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.5, fontWeight: 500 }}>{activePregMethod.tagline}</p>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>Effectiveness</span>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-rose)' }}>{activePregMethod.effectiveness}%</span>
                        </div>
                        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${activePregMethod.effectiveness}%`, height: '100%', background: 'var(--color-rose)', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div className="glass-card" style={{ borderLeft: '4px solid var(--color-rose)' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-rose)', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📝 Description</h4>
                        <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activePregMethod.detail.description}</p>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#F59E0B', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💊 Form of Use</h4>
                        <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activePregMethod.detail.formOfUse}</p>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #3B82F6' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚙️ How It Works</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.howItWorks.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #10B981' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#10B981', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛠️ How To Use</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.howToUse.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⏱️ Frequency</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.frequency.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #EC4899' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#EC4899', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>✅ Effectiveness Details</h4>
                        <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7 }}>{activePregMethod.detail.effectiveness}</p>
                      </div>

                      <div className="glass-card" style={{ borderLeft: '4px solid #EF4444' }}>
                        <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#EF4444', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>⚠️ Side Effects</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                          {activePregMethod.detail.sideEffects.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                        </ul>
                      </div>

                      {activePregMethod.detail.access && activePregMethod.detail.access.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #0EA5E9' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0EA5E9', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>📍 Where & How to Access</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.access.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                          </ul>
                        </div>
                      )}

                      {activePregMethod.detail.cost && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #059669' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💰 Cost</h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.7, fontWeight: 600 }}>{activePregMethod.detail.cost}</p>
                        </div>
                      )}

                      {activePregMethod.detail.returnToFertility && activePregMethod.detail.returnToFertility.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #14B8A6' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#14B8A6', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>👶 Return To Fertility</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.returnToFertility.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                          </ul>
                        </div>
                      )}

                      {activePregMethod.detail.stiProtection && activePregMethod.detail.stiProtection.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #6366F1' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6366F1', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>🛡️ STI Protection</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.stiProtection.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>{item}</li>)}
                          </ul>
                        </div>
                      )}

                      {activePregMethod.detail.misunderstandings && activePregMethod.detail.misunderstandings.length > 0 && (
                        <div className="glass-card" style={{ borderLeft: '4px solid #D97706' }}>
                          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '8px' }}>💡 Correcting Misunderstandings</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {activePregMethod.detail.misunderstandings.map((item, i) => <li key={i} style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '4px' }}>✅ {item}</li>)}
                          </ul>
                        </div>
                      )}

                      <button onClick={() => { setActivePregMethod(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn" style={{ width: '100%', marginTop: '8px', background: 'var(--color-rose)', color: '#fff', border: 'none' }}>
                        ⬅ Back to All Prevention Methods
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <button onClick={() => { setPregTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⬅ Back to Pregnancy Dashboard
                  </button>
                  
                  <div style={{ background: 'var(--color-rose-light)', border: '1px solid var(--color-rose)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: 'var(--color-rose)', fontWeight: 600 }}>
                    {UI[lang].pregNote}
                  </div>
                  
                  <div className="tabs-container" style={{ marginBottom: '20px' }}>
                    {PREG_PREVENTION_CATEGORIES.map(c => (
                      <button key={c.id} className={`tab-btn ${pregCat === c.id ? 'active-preg' : ''}`} onClick={() => setPregCat(c.id)}>{c.label}</button>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {PREG_PREVENTION_METHODS.filter(o => pregCat === 'All' || pregCat === 'all' || o.category === pregCat).map(o => (
                      <div key={o.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderTop: o.urgent ? '4px solid var(--color-rose)' : 'none', position: 'relative' }}>
                        {o.urgent && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-rose)', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Time Sensitive</div>}
                        <div style={{ fontSize: '42px', marginBottom: '16px' }}>{o.icon}</div>
                        <h3 style={{ fontSize: '18px', color: 'var(--color-rose)', marginBottom: '8px', fontWeight: 800, lineHeight: 1.3 }}>{o.name}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>{o.tagline}</p>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                          <span style={{ fontSize: '11px', background: 'var(--color-rose-light)', color: 'var(--color-rose)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
                            {o.effectiveness}% Effective
                          </span>
                          {o.dual && (
                            <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>
                              + STI Protection
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => { setActivePregMethod(o); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="btn" 
                          style={{ marginTop: 'auto', background: 'transparent', border: '1px solid var(--color-rose)', color: 'var(--color-rose)', width: '100%', padding: '10px', borderRadius: '8px', fontWeight: 600, transition: 'all 0.2s' }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-rose)'; e.currentTarget.style.color = '#fff'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-rose)'; }}
                        >
                          Learn More →
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── PREGNANCY HOW-TO GUIDES TAB ── */}
          {pregTab === 'guides' && (
            <div className="animate-fade-in">
              <button onClick={() => { setPregTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⬅ Back to Pregnancy Dashboard
              </button>

              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                Step-by-step visual guides for pregnancy prevention. Click a guide to expand.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {HOW_TO_GUIDES.filter(g => ['emergency-contraception', 'male-condom', 'female-condom'].includes(g.id)).map(guide => (
                  <div key={guide.id} className="glass-card" style={{ padding: 0, border: `2px solid ${guide.accentColor}30`, overflow: 'hidden' }}>
                    <button
                      onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                      style={{ width: '100%', background: guide.lightColor, border: 'none', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <span style={{ fontSize: '36px' }}>{guide.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '18px', color: guide.accentColor, fontWeight: 800, marginBottom: '2px' }}>{guide.title}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>{guide.steps.length} steps · Tap to {expandedGuide === guide.id ? 'close' : 'view'}</p>
                      </div>
                      <span style={{ fontSize: '20px', color: guide.accentColor }}>{expandedGuide === guide.id ? '▲' : '▼'}</span>
                    </button>
                    {expandedGuide === guide.id && (
                      <div style={{ padding: '20px' }} className="animate-fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                          {guide.steps.map(step => (
                            <div key={step.num} style={{ background: 'var(--color-bg-surface)', border: `1px solid ${guide.accentColor}20`, borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', background: guide.accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', flexShrink: 0 }}>{step.num}</div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: guide.accentColor, marginBottom: '4px' }}>{step.icon} {step.title}</div>
                                <p style={{ fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: 1.45 }}>{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#92400E' }}>
                          <strong>💡 Tip:</strong> {guide.tip}
                        </div>
                        <a href={guide.youtubeUrl} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#DC2626', color: '#fff', borderRadius: 'var(--radius-md)', padding: '10px 18px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
                        >
                          ▶️ Watch on YouTube <span style={{ fontSize: '11px', opacity: 0.8 }}>(requires internet)</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PODCAST VIEW ── */}
      {page === 'podcast' && (
        <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎧</div>
            <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px' }}>Chengeto Podcast</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Real survivor stories. Real health facts. Real Zimbabwe.</p>
          </div>

          {/* Now Playing Bar */}
          <div style={{
            background: `linear-gradient(135deg, ${currentEpisode.coverColor}, ${currentEpisode.coverColor}CC)`,
            borderRadius: 'var(--radius-xl)', padding: '20px 24px', marginBottom: '32px',
            color: '#fff', boxShadow: `0 8px 32px ${currentEpisode.coverColor}40`
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                {currentEpisode.coverEmoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{currentEpisode.episode} • {currentEpisode.duration}</div>
                <div style={{ fontSize: '17px', fontWeight: 800, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentEpisode.title}</div>
                <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>{currentEpisode.guest} • {currentEpisode.guestRole}</div>
              </div>
              <button
                onClick={() => handlePodcastPlay(currentEpisode)}
                style={{
                  width: '52px', height: '52px', borderRadius: '50%', border: 'none',
                  background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '22px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, backdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.2)', transition: 'all 0.15s'
                }}
              >
                {podcastPlaying && currentEpisode.id === currentEpisode.id ? '⏸️' : '▶️'}
              </button>
            </div>
            {/* Progress bar */}
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '4px', height: '5px', overflow: 'hidden' }}>
              <div style={{ background: '#fff', height: '100%', width: `${podcastProgress}%`, transition: 'width 0.15s linear', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
              <span>{(() => {
                const parts = currentEpisode.duration.split(':');
                const total = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                const elapsed = Math.floor(podcastProgress / 100 * total);
                const m = Math.floor(elapsed / 60);
                const s = String(elapsed % 60).padStart(2, '0');
                return `${m}:${s}`;
              })()}</span>
              <span>{currentEpisode.duration}</span>
            </div>
          </div>

          {/* Episode Cards */}
          <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>All Episodes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PODCAST_EPISODES.map(ep => (
              <div key={ep.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', border: currentEpisode.id === ep.id && podcastPlaying ? `2px solid ${ep.coverColor}` : '1px solid var(--color-border)' }}>
                {/* Episode Header */}
                <div style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}>
                  {/* Cover */}
                  <div style={{ width: '80px', minHeight: '80px', background: ep.coverLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', flexShrink: 0 }}>
                    {ep.coverEmoji}
                  </div>
                  {/* Information */}
                  <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: ep.coverColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{ep.episode} • {ep.duration}</span>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '2px' }}>{ep.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{ep.guest} • {ep.guestRole}</div>
                      </div>
                      <button
                        onClick={() => handlePodcastPlay(ep)}
                        style={{ background: ep.coverColor, border: 'none', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}
                        aria-label={`Play ${ep.title}`}
                      >
                        {currentEpisode.id === ep.id && podcastPlaying ? '⏸' : '▶'}
                      </button>
                    </div>
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {ep.tags.map(t => (
                        <span key={t} style={{ fontSize: '10px', fontWeight: 700, background: ep.coverLight, color: ep.coverColor, padding: '2px 8px', borderRadius: '20px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expand button */}
                <button
                  onClick={() => setExpandedEpisode(expandedEpisode === ep.id ? null : ep.id)}
                  style={{ width: '100%', background: 'var(--color-bg-surface)', border: 'none', borderTop: '1px solid var(--color-border)', padding: '8px 16px', fontSize: '12px', color: 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600, textAlign: 'center' }}
                >
                  {expandedEpisode === ep.id ? '▲ Hide episode details' : '▼ Show episode details'}
                </button>

                {/* Expanded content */}
                {expandedEpisode === ep.id && (
                  <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)' }} className="animate-fade-in">
                    {/* Quote */}
                    <blockquote style={{ borderLeft: `4px solid ${ep.coverColor}`, paddingLeft: '16px', margin: '0 0 16px', fontStyle: 'italic', fontSize: '14px', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                      {ep.quote}
                    </blockquote>
                    {/* Summary */}
                    <p style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '20px' }}>{ep.summary}</p>
                    {/* Chapter markers */}
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: ep.coverColor, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Chapter Markers</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {ep.chapters.map((ch, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-surface)' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: ep.coverColor, minWidth: '40px', fontFamily: 'monospace' }}>{ch.time}</span>
                          <span style={{ fontSize: '13px', color: 'var(--color-text-main)' }}>{ch.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: '32px', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', padding: '14px 18px', fontSize: '12.5px', color: 'var(--color-primary)', lineHeight: 1.5 }}>
            <strong>🔔 Note:</strong> The Chengeto Podcast features dramatised survivor stories based on real experiences shared with us at Zimbabwe university health clinics. Names have been changed to protect privacy. Stories are shared with full consent for educational purposes.
          </div>
        </div>
      )}

      {/* ── PROFILE VIEW ── */}
      {page === "profile" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '8px' }}>Your Profile</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Customize your Chengeto experience.</p>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Avatar & Colors */}
            <div className="glass-card">
              <h3 style={{ fontSize: '15px', color: 'var(--color-text-main)', marginBottom: '16px', fontWeight: 800 }}>Avatar Color</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: profColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '32px', flexShrink: 0, boxShadow: `0 8px 24px ${profColor}50`, transition: 'background 0.3s' }}>
                  {(profNickname || profName || '?').charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
                  {AVATAR_COLORS.map(c => (
                    <button key={c.color} type="button" onClick={() => setProfColor(c.color)} title={c.label}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', background: c.color, border: profColor === c.color ? '3px solid #fff' : 'none', cursor: 'pointer', outline: profColor === c.color ? `2px solid ${c.color}` : 'none', transition: 'all 0.15s' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--color-text-main)', marginBottom: '4px', fontWeight: 800 }}>Personal Information</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Nickname (Greeting)</label>
                  <input type="text" value={profNickname} onChange={e => setProfNickname(e.target.value)} placeholder="e.g. Genius"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" value={profName} onChange={e => setProfName(e.target.value)} placeholder="Your full name" required
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Bio / Status</label>
                <input type="text" value={profBio} onChange={e => setProfBio(e.target.value)} placeholder="e.g. Health advocate! 🩺"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* Academic Information */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--color-text-main)', marginBottom: '4px', fontWeight: 800 }}>Academic Information</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Year</label>
                  <select value={profYear} onChange={e => setProfYear(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}>
                    {['1','2','3','4','5','6'].map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Programme</label>
                  <input type="text" value={profProgramme} onChange={e => setProfProgramme(e.target.value)} required
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--color-text-main)', marginBottom: '4px', fontWeight: 800 }}>Change Password</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '-8px' }}>Leave blank to keep your current password.</p>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Current Password</label>
                <input type="password" value={profPwCurrent} onChange={e => setProfPwCurrent(e.target.value)} placeholder="Required to change password"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>New Password</label>
                <input type="password" value={profPwNew} onChange={e => setProfPwNew(e.target.value)} placeholder="Min 6 characters"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-bg-base)', color: 'var(--color-text-main)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            {profPwErr && (
              <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#DC2626' }}>
                ⚠️ {profPwErr}
              </div>
            )}

            {profSaved && (
              <div className="animate-fade-in" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#15803d', textAlign: 'center', fontWeight: 700 }}>
                ✅ Profile updated successfully!
              </div>
            )}

            <button type="submit"
              style={{ padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}>
              💾 Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {page === "compare" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '4px' }}>⚖️ Side-by-Side Comparison</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
            Select any two options below to compare their characteristics.
          </p>

          {/* Dropdown Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>Option 1</label>
              <select className="select-custom" value={compareOpt1} onChange={e => setCompareOpt1(e.target.value)}>
                <option value="" disabled>— Select your method here —</option>
                <optgroup label="HIV Prevention">
                  {HIV_PREVENTION_METHODS.map(o => <option key={o.id} value={o.id}>{o.icon} {o.name}</option>)}
                </optgroup>
                <optgroup label="Contraception">
                  {PREG_PREVENTION_METHODS.map(o => <option key={o.id} value={o.id}>{o.icon} {o.name}</option>)}
                </optgroup>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>Option 2</label>
              <select className="select-custom" value={compareOpt2} onChange={e => setCompareOpt2(e.target.value)}>
                <option value="" disabled>— Select your method here —</option>
                <optgroup label="HIV Prevention">
                  {HIV_PREVENTION_METHODS.map(o => <option key={o.id} value={o.id}>{o.icon} {o.name}</option>)}
                </optgroup>
                <optgroup label="Contraception">
                  {PREG_PREVENTION_METHODS.map(o => <option key={o.id} value={o.id}>{o.icon} {o.name}</option>)}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Comparison Table — only shown when both options are selected */}
          {compareOpt1 && compareOpt2 && c1 && c2 ? (
            <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 30px var(--color-card-shadow)', background: 'var(--color-bg-surface)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--color-primary)', color: 'var(--color-text-light)' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>Feature</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'center' }}>{c1.icon} {c1.name}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'center' }}>{c2.icon} {c2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, idx) => (
                    <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border)', background: idx % 2 === 0 ? 'var(--color-bg-base)' : 'var(--color-bg-surface)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--color-primary)' }}>{row.label}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', lineHeight: 1.4 }}>{row.get(c1)}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', lineHeight: 1.4 }}>{row.get(c2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Choose two options above to inspect the differences.</p>
          )}
        </div>
      )}

      {/* ── SERVICES VIEW ── */}
      {page === "directory" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px' }}>📍 Health Clinics & Distribution Services</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Find youth-friendly services and commodity pickup spots at your university or nearest public health station.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <button 
              onClick={findNearestClinic} 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              disabled={locationLoading}
            >
              {locationLoading ? 'Finding Location...' : '📍 Find Nearest Clinic'}
            </button>
            {locationError && <div style={{ color: 'var(--color-rose)', marginTop: '8px', fontSize: '14px', textAlign: 'center' }}>{locationError}</div>}
          </div>

          {/* Filters Box */}
          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', boxShadow: '0 8px 24px var(--color-card-shadow)' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '16px', fontSize: '18px', color: 'var(--color-text-muted)' }}>🔍</span>
              <input 
                type="text" 
                className="input-search" 
                placeholder="Search clinic or university name..." 
                value={serviceSearch}
                onChange={e => setServiceSearch(e.target.value)}
              />
            </div>

            {/* Selector Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Select Location/City</label>
                <select className="select-custom" value={serviceCity} onChange={e => setServiceCity(e.target.value)}>
                  <option value="All">All Cities / Sites</option>
                  <option value="Harare">Harare</option>
                  <option value="Bulawayo">Bulawayo</option>
                  <option value="Gweru">Gweru</option>
                  <option value="Bindura">Bindura</option>
                  <option value="Chinhoyi">Chinhoyi</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Select Service Offered</label>
                <select className="select-custom" value={serviceType} onChange={e => setServiceType(e.target.value)}>
                  <option value="All">All Services</option>
                  <option value="HIVST">HIV Self-Testing (HIVST)</option>
                  <option value="PrEP">Daily Oral PrEP</option>
                  <option value="PEP">PEP Emergency Care</option>
                  <option value="Condoms">Free Condoms</option>
                  <option value="Contraception">Contraception (Pill/Implants)</option>
                  <option value="VMMC">Male Circumcision (VMMC)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SERVICES.filter(s => {
              const matchSearch = s.name.toLowerCase().includes(serviceSearch.toLowerCase()) || s.institution.toLowerCase().includes(serviceSearch.toLowerCase());
              const matchCity = serviceCity === "All" || s.city === serviceCity;
              const matchType = serviceType === "All" || s.services.includes(serviceType);
              return matchSearch && matchCity && matchType;
            }).map(s => {
              // Calculate distance if userLocation is available
              const dist = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, s.lat, s.lng) : null;
              return { ...s, distance: dist };
            }).sort((a, b) => {
              if (a.distance !== null && b.distance !== null) {
                return a.distance - b.distance;
              }
              return 0;
            }).filter((s, idx) => {
              // Only bring those in the nearest location (top 3) if geolocation is used
              if (userLocation) return idx < 3;
              return true;
            }).map((s, idx) => (
              <div key={s.name} className="glass-card animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--color-primary)', marginBottom: '4px' }}>{s.name}</h3>
                  {s.distance !== null && (
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-rose)', background: 'var(--color-rose-light)', padding: '4px 8px', borderRadius: '10px' }}>
                      🚗 {s.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '12px' }}>
                  🏢 {s.institution} : {s.city}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {s.services.map(ser => (
                    <span key={ser} style={{ fontSize: '10.5px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: '10px', fontWeight: 700 }}>
                      {ser}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--color-text-main)', borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>📞</span> <span style={{ fontWeight: 550 }}>{s.contact}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                    <span>🕒</span> <span>{s.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FIND MY FIT QUIZ VIEW ── */}
      {page === "quiz" && (
        <div className="animate-fade-in" style={{ padding: '60px 24px' }}>
          <div className="quiz-wizard">
            {/* Step 0: Start */}
            {quizStep === 0 && (
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '50px' }}>📋</span>
                <h2 style={{ fontSize: '24px', color: 'var(--color-primary)', marginTop: '16px', marginBottom: '10px' }}>Find Your Prevention Match</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', marginBottom: '24px', lineHeight: 1.5 }}>
                  This brief quiz asks about your protection goals, routine choices, and timeline preferences, and matches you with options that support you. Safe, private, and offline.
                </p>
                <button onClick={() => setQuizStep(1)} className="btn btn-primary">Start Quiz</button>
              </div>
            )}

            {/* Step 1: Goal */}
            {quizStep === 1 && (
              <div>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: '25%' }}></div>
                </div>
                <h3 className="quiz-question">1. What is your primary protection goal?</h3>
                <div className="quiz-options">
                  <button className="quiz-option" onClick={() => handleQuizAnswer("goal", "hiv")}>
                    🛡️ Protect against HIV only
                  </button>
                  <button className="quiz-option" onClick={() => handleQuizAnswer("goal", "pregnancy")}>
                    🌸 Protect against pregnancy only
                  </button>
                  <button className="quiz-option" onClick={() => handleQuizAnswer("goal", "both")}>
                    🍀 Protect against BOTH HIV and pregnancy
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Duration */}
            {quizStep === 2 && (
              <div>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: '50%' }}></div>
                </div>
                <h3 className="quiz-question">2. How long do you need protection for?</h3>
                <div className="quiz-options">
                  <button className="quiz-option" onClick={() => handleQuizAnswer("duration", "emergency")}>
                    🚨 Emergency: Immediate protection needed (e.g. unprotected sex occurred recently)
                  </button>
                  <button className="quiz-option" onClick={() => handleQuizAnswer("duration", "short")}>
                    📅 Short-term: Days, weeks, or monthly options
                  </button>
                  <button className="quiz-option" onClick={() => handleQuizAnswer("duration", "long")}>
                    ⏳ Long-term: Protection for 3 to 10 years (reversible devices)
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Routine */}
            {quizStep === 3 && (
              <div>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: '75%' }}></div>
                </div>
                <h3 className="quiz-question">3. What best describes your daily routine capability?</h3>
                <div className="quiz-options">
                  <button className="quiz-option" onClick={() => handleQuizAnswer("routine", "daily")}>
                    💊 I am comfortable taking a pill at the same time every single day
                  </button>
                  <button className="quiz-option" onClick={() => handleQuizAnswer("routine", "injectable")}>
                    💉 I prefer injections/visits every few months to avoid daily pills
                  </button>
                  <button className="quiz-option" onClick={() => handleQuizAnswer("routine", "occasional")}>
                    🛡️ I only want protection at the exact moment of sexual activity
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {quizStep === 4 && (
              <div>
                <h2 style={{ fontSize: '22px', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '8px' }}>Your Recommendations</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '24px' }}>
                  Based on your goals (Goal: {quizAnswers.goal}, Duration: {quizAnswers.duration}), here are the recommended methods:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {quizRecommendations.map(rec => (
                    <div key={rec.id} style={{ display: 'flex', gap: '12px', background: 'var(--color-bg-base)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <span style={{ fontSize: '28px' }}>{rec.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14.5px', color: 'var(--color-primary)', fontWeight: 800 }}>{rec.name}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-main)', marginTop: '2px', lineHeight: 1.4 }}>{rec.desc}</p>
                        <span style={{ fontSize: '11px', display: 'inline-block', marginTop: '6px', background: '#D1FAE5', color: '#065F46', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                          ⚡ {rec.effectiveness}% effective
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button onClick={handleResetQuiz} className="btn btn-secondary">Retake Quiz</button>
                  <button onClick={() => setPage("directory")} className="btn btn-primary">Find Clinic</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PORTAL COMMODITY REQUEST VIEW ── */}
      {page === "portal" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '650px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '4px' }}>🏥 Commodity Request Portal</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', textAlign: 'center', marginBottom: '30px' }}>
            Request sexual health supplies privately. Simply select a commodity below to generate an offline pickup code. Present this code at your health clinic for immediate pickup.
          </p>

          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: '0 10px 30px var(--color-card-shadow)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>Select Commodity Pack</label>
              <select className="select-custom" value={selectedCommodity} onChange={e => setSelectedCommodity(e.target.value)}>
                <option value="male-condoms">🛡️ Male Condoms (Pack of 10)</option>
                <option value="female-condoms">🛡️ Female Condoms (Pack of 5)</option>
                <option value="hivst-kit">🧪 HIV Self-Testing Kit (Oral Swab)</option>
                <option value="oral-pills">💊 Contraceptive Pills (3-Month Pack)</option>
              </select>
            </div>

            <button onClick={handleGenerateCommodityCode} className="btn btn-primary" style={{ width: '100%' }}>
              🎟️ Generate Pickup Code
            </button>
          </div>

          {/* Current Ticket */}
          {currentPickupCode && (
            <div style={{ background: 'var(--color-primary-light)', border: '2px solid var(--color-primary-mid)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'center', marginBottom: '32px' }} className="animate-fade-in">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 800 }}>Your Confidential Pickup Receipt</span>
              <h3 style={{ margin: '8px 0', fontSize: '18px', color: 'var(--color-primary)' }}>{currentPickupCode.item}</h3>
              
              {/* Barcode representation */}
              <div className="barcode-box">
                <div className="barcode-lines"></div>
                <div className="barcode-text">{currentPickupCode.code}</div>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--color-text-main)', maxWidth: '420px', margin: '0 auto 10px', lineHeight: 1.5 }}>
                Show this barcode or write the code down. When you visit your student health clinic (e.g. UZ, NUST) or public hospital, show it to the receptionist. No explanations or names needed.
              </p>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Generated on: {currentPickupCode.date}</div>
            </div>
          )}

          {/* History list */}
          {commodityPickups.length > 0 && (
            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--color-primary)', marginBottom: '12px' }}>Your Saved Receipts (Offline)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {commodityPickups.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)' }}>{p.item}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Created {p.date}</div>
                    </div>
                    <code style={{ fontSize: '13px', background: 'var(--color-primary-light)', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {p.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CHATBOT VIEW ── */}
      {page === "chat" && (
        <div className="animate-fade-in" style={{ padding: '40px 24px' }}>
          <h2 style={{ fontSize: '26px', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '4px' }}>🤖 Chengeto Private Chat helper</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', textAlign: 'center', marginBottom: '24px' }}>
            Ask questions about HIV, PEP, pregnancy, or clinic services. Your chat history is fully local and deleted upon closing.
          </p>

          <div className="chat-container">
            <div className="chat-header">
              <span style={{ fontSize: '24px' }}>🟢</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', color: 'var(--color-text-light)' }}>Chengeto Bot</h3>
                <span className="chat-header-status">Fully Private • Offline-Ready</span>
              </div>
            </div>
            
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={chatBottomRef}></div>
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-area">
              <input 
                type="text" 
                className="chat-input"
                placeholder="Ask about prep, pep, condoms, side effects..." 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── CYCLE TRACKER VIEW ── */}
      {page === "tracker" && (
        <div id="cycle-tracker" className="animate-fade-in" style={{ padding: '40px 24px', maxWidth: '650px', margin: '0 auto' }}>
          <button onClick={() => setPage('pregnancy')} style={{ background: 'none', border: 'none', color: 'var(--color-rose)', fontWeight: 700, cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⬅ Back to Pregnancy Dashboard
          </button>
          <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '4px' }}>📅 Menstrual & Cycle Safety helper</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', textAlign: 'center', marginBottom: '30px' }}>
            Understand the biological cycle stages. Natural tracking assists in fertility estimation but does not protect against STIs or HIV.
          </p>

          <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: '0 10px 30px var(--color-card-shadow)', marginBottom: '32px' }}>
            
            {/* Length inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>Estimated Cycle Length: {cycleLength} days</label>
                <input 
                  type="range" 
                  min="21" 
                  max="35" 
                  value={cycleLength} 
                  onChange={e => setCycleLength(Number(e.target.value))}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
              </div>
            </div>

            {/* Visual Calendar */}
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-primary)', textAlign: 'center', marginBottom: '12px' }}>Cycle Day Simulation</h4>
            <div className="tracker-calendar">
              {/* Day Headers */}
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="calendar-day-header">{day}</div>
              ))}
              
              {/* Days Buttons */}
              {Array.from({ length: cycleLength }, (_, i) => {
                const dayNum = i + 1;
                let dayType = "normal";
                if (dayNum >= 1 && dayNum <= 5) dayType = "menstrual";
                else if (dayNum >= 11 && dayNum <= 16) dayType = "fertile";

                return (
                  <button 
                    key={dayNum} 
                    onClick={() => handleDayClick(dayNum)}
                    className={`calendar-day-btn ${dayType} ${periodDay === dayNum ? 'selected' : ''}`}
                    title={`Day ${dayNum}: ${dayType}`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: '20px 0', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-rose-light)', border: '1px solid var(--color-rose)' }}></span>
                <span>Period Days</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}></span>
                <span>Peak Fertile Days</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}></span>
                <span>Estimated Safe Days</span>
              </div>
            </div>

            {/* Explanation box */}
            <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', fontSize: '12.5px', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
              💡 <strong>Safety Window Details:</strong><br />
              {trackerNotes}
            </div>

          </div>

          {/* Bottom Chat Button */}
          <button className="btn" onClick={() => setPage('chat')} style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 700, borderRadius: '12px', background: 'var(--color-bg-surface)', border: 'none', color: 'var(--color-rose)', boxShadow: '0 4px 12px var(--color-card-shadow)', marginTop: '20px' }}>
            Have More Questions? Talk to Chengeto
          </button>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: 'hsl(142, 60%, 10%)', padding: '40px 24px', borderTop: '1px solid var(--color-border)', marginTop: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <h4 style={{ color: 'var(--color-text-light)', fontSize: '16px', letterSpacing: '1px', marginBottom: '12px', fontWeight: 800 }}>🛡️ CHENGETO</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5 }}>
              Chengeto is a Progressive Web Application (PWA) created to deliver private, accurate information on reproductive health and HIV prevention. Developed for students in Zimbabwe.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '60px' }}>
            <div>
              <h5 style={{ color: 'var(--color-text-light)', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Learn More</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <button onClick={() => setPage("hiv")} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer' }}>HIV Prevention</button>
                <button onClick={() => setPage("pregnancy")} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer' }}>Pregnancy Prevention</button>
                <button onClick={() => setPage("compare")} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer' }}>Option Comparison</button>
              </div>
            </div>

            <div>
              <h5 style={{ color: 'var(--color-text-light)', fontSize: '13px', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Campus Support</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <button onClick={() => setPage("directory")} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer' }}>Clinics Near Me</button>
                <button onClick={() => setPage("portal")} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer' }}>Confidential Pickup</button>
                <button onClick={() => setPage("chat")} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', textAlign: 'left', cursor: 'pointer' }}>AI Chatbot Support</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
            CHENGETO : Part of the MASCOT mHealth Tool | Developed by Team CHENGETO | University of Zimbabwe
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '4px' }}>
            Powered by CeSHHAR Zimbabwe & MASCOT Study | NIHR Funded
          </p>
        </div>
      </footer>
      </div>
      )}
      
      {/* MindMap Modal */}
      {showMindMap && (
        <MindMap 
          onClose={() => setShowMindMap(null)} 
          data={showMindMap === 'pregnancy' ? pregMindMapData : hivMindMapData}
          title={showMindMap === 'pregnancy' ? "Pregnancy Interactive Mind Map" : "HIV Interactive Mind Map"}
          subtitle={showMindMap === 'pregnancy' ? "Based on Pregnancy Care & Contraception Data" : "Based on HIV Prevention & Education Data"}
        />
      )}
    </div>
  );
}
