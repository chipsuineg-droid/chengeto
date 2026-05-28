export const HIV_INFO_SECTIONS = [
  {
    id: "transmission",
    title: "Transmission",
    emoji: "🔄",
    color: "#059669",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          HIV spreads through certain body fluids from a person who has HIV and has not achieved an undetectable viral load.
        </p>
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--color-primary)' }}>✅ HIV CAN spread through:</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>Unprotected sex (vaginal, anal, or oral)</li>
            <li>Sharing needles, syringes, or drug equipment</li>
            <li>Blood transfusions with infected blood</li>
            <li>From mother to baby during pregnancy, birth, or breastfeeding</li>
          </ul>
        </div>
        <div>
          <p style={{ fontWeight: 700, marginBottom: '6px', color: '#d93838' }}>❌ HIV CANNOT spread through:</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>Hugging, kissing, or shaking hands</li>
            <li>Sharing food, drinks, or toilets</li>
            <li>Coughing, sneezing, or saliva</li>
            <li>Mosquito or insect bites</li>
          </ul>
        </div>
      </>
    )
  },
  {
    id: "symptoms",
    title: "Signs & Symptoms",
    emoji: "🩺",
    color: "#0891B2",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          Many people feel no symptoms for years after getting HIV. This is why testing is so important — you cannot tell by looking at someone, or by how you feel.
        </p>
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontWeight: 700, marginBottom: '6px' }}>Early stage (2–4 weeks after infection):</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>Fever and chills</li>
            <li>Sore throat and skin rash</li>
            <li>Muscle aches and fatigue</li>
            <li>Night sweats and swollen lymph nodes</li>
          </ul>
        </div>
        <div>
          <p style={{ fontWeight: 700, marginBottom: '6px' }}>Later stage (without treatment):</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>Frequent infections that won't go away</li>
            <li>Significant weight loss</li>
            <li>Prolonged diarrhea and fatigue</li>
          </ul>
        </div>
        <p style={{ marginTop: '12px', fontStyle: 'italic', color: 'var(--color-text-muted)', fontSize: '13px' }}>
          💡 These symptoms look like many other illnesses. Only a test can confirm HIV.
        </p>
      </>
    )
  },
  {
    id: "effects",
    title: "Effects on the Body",
    emoji: "🧬",
    color: "#7C3AED",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          HIV attacks CD4 cells — the white blood cells that fight infections. Over time, without treatment, the immune system gets weaker and weaker.
        </p>
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontWeight: 700, marginBottom: '6px' }}>Without treatment, HIV can cause:</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>Repeated infections (chest, skin, gut)</li>
            <li>Tuberculosis (TB) — a common complication in Zimbabwe</li>
            <li>Certain cancers like Kaposi's sarcoma</li>
            <li>Severe weight loss and exhaustion</li>
          </ul>
        </div>
        <p style={{ lineHeight: 1.7, padding: '12px', background: 'rgba(5,150,105,0.08)', borderRadius: '10px', borderLeft: '3px solid var(--color-primary)' }}>
          <strong>With treatment (ART),</strong> most people living with HIV lead long, healthy lives and their immune system stays strong. Starting treatment early makes a huge difference.
        </p>
      </>
    )
  },
  {
    id: "hiv-vs-aids",
    title: "HIV vs AIDS",
    emoji: "⚡",
    color: "#D97706",
    content: (
      <>
        <p style={{ marginBottom: '14px', lineHeight: 1.7 }}>
          HIV and AIDS are not the same thing. HIV is the virus. AIDS is an advanced stage that only happens when HIV goes untreated for a long time.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
          <div style={{ padding: '14px', background: 'rgba(5,150,105,0.08)', borderRadius: '12px', borderTop: '3px solid var(--color-primary)' }}>
            <p style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '8px' }}>🦠 HIV</p>
            <ul style={{ paddingLeft: '16px', lineHeight: 1.8, margin: 0, fontSize: '13px' }}>
              <li>A virus</li>
              <li>Manageable with treatment</li>
              <li>You can live fully with HIV</li>
            </ul>
          </div>
          <div style={{ padding: '14px', background: 'rgba(220,38,38,0.06)', borderRadius: '12px', borderTop: '3px solid #d93838' }}>
            <p style={{ fontWeight: 800, color: '#d93838', marginBottom: '8px' }}>⚠️ AIDS</p>
            <ul style={{ paddingLeft: '16px', lineHeight: 1.8, margin: 0, fontSize: '13px' }}>
              <li>Advanced HIV stage</li>
              <li>Immune system badly damaged</li>
              <li>Preventable with early ART</li>
            </ul>
          </div>
        </div>
        <p style={{ lineHeight: 1.7, fontSize: '13px', color: 'var(--color-text-muted)' }}>
          💡 With modern HIV treatment, most people with HIV will <strong>never</strong> develop AIDS.
        </p>
      </>
    )
  },
  {
    id: "prevention",
    title: "Prevention",
    emoji: "🛡️",
    color: "#059669",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          HIV is 100% preventable. There are simple, proven ways to protect yourself and the people you care about.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: '🩹', label: 'Use condoms', desc: 'Male or female condoms, every time, used correctly.' },
            { icon: '💊', label: 'Take PrEP', desc: 'A daily pill that stops HIV from taking hold in your body if exposed.' },
            { icon: '⏰', label: 'Use PEP', desc: 'Take within 72 hours after possible exposure. Available at most clinics.' },
            { icon: '🔬', label: 'Test regularly', desc: 'Know your status. Testing is the gateway to treatment and protection.' },
            { icon: '💉', label: 'Don\'t share needles', desc: 'Never share needles, syringes, or any sharp equipment.' },
            { icon: '❤️', label: 'U=U', desc: 'On treatment with an undetectable viral load, you cannot pass HIV to a partner.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 12px', background: 'var(--color-bg-surface)', borderRadius: '10px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '2px', fontSize: '14px' }}>{item.label}</p>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
  {
    id: "u-equals-u",
    title: "U=U",
    emoji: "♾️",
    color: "#059669",
    content: (
      <>
        <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>♾️</div>
          <p style={{ fontWeight: 900, fontSize: '22px', color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
            Undetectable = Untransmittable
          </p>
        </div>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          When a person with HIV takes their treatment consistently and achieves an <strong>undetectable viral load</strong>, they <strong>cannot pass HIV</strong> to a sexual partner. This is proven by science.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            '🧪 Undetectable means the virus level in blood is too low to detect',
            '💊 This happens with consistent ART (antiretroviral therapy)',
            '❤️ Zero risk of sexual transmission when undetectable',
            '🌍 U=U is accepted by WHO, UNAIDS, and global health organisations',
          ].map((point, i) => (
            <p key={i} style={{ padding: '10px 14px', background: 'rgba(5,150,105,0.08)', borderRadius: '10px', fontSize: '13.5px', lineHeight: 1.6 }}>{point}</p>
          ))}
        </div>
        <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
          U=U is a message of hope. It means HIV treatment works — for your health and for the people you love.
        </p>
      </>
    )
  },
  {
    id: "testing",
    title: "Testing & Status",
    emoji: "🔬",
    color: "#0891B2",
    content: (
      <>
        <p style={{ marginBottom: '12px', lineHeight: 1.7 }}>
          The only way to know your HIV status is to get tested. Testing is free, confidential, and widely available in Zimbabwe.
        </p>
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontWeight: 700, marginBottom: '8px' }}>Why testing matters:</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0 }}>
            <li>Early diagnosis = early treatment = longer, healthier life</li>
            <li>Knowing your status protects your partners</li>
            <li>A negative result gives you peace of mind</li>
            <li>A positive result connects you to life-saving care</li>
          </ul>
        </div>
        <div style={{ padding: '12px 16px', background: 'rgba(8,145,178,0.08)', borderRadius: '12px', marginBottom: '12px' }}>
          <p style={{ fontWeight: 700, marginBottom: '6px', color: '#0891B2' }}>📍 Where to test in Zimbabwe:</p>
          <ul style={{ paddingLeft: '18px', lineHeight: 1.8, margin: 0, fontSize: '13px' }}>
            <li>Government clinics and hospitals</li>
            <li>University and college health facilities</li>
            <li>Community health campaigns</li>
            <li>Private clinics and pharmacies</li>
          </ul>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
          💡 If you've had unprotected sex or shared needles, test every 3–6 months. There is no shame in knowing your status.
        </p>
      </>
    )
  },
  {
    id: "facts",
    title: "Key Facts",
    emoji: "💡",
    color: "#7C3AED",
    content: (
      <>
        <p style={{ marginBottom: '14px', lineHeight: 1.7 }}>
          Here are the most important things to know about HIV:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { icon: '🌍', text: 'HIV can affect anyone — regardless of gender, age, or sexual orientation.' },
            { icon: '💊', text: 'ART (Antiretroviral Therapy) is the treatment for HIV. It keeps the virus under control.' },
            { icon: '❤️', text: 'People on treatment live long, full, healthy lives — just like anyone else.' },
            { icon: '🔬', text: 'There is no cure yet, but HIV is 100% manageable and 100% preventable.' },
            { icon: '🗣️', text: 'Stigma and misinformation are still major problems. Education is the antidote.' },
            { icon: '🇿🇼', text: 'Zimbabwe has made huge progress in HIV treatment. Most clinics offer free ART.' },
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '11px 14px', background: 'var(--color-bg-surface)', borderRadius: '10px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{fact.icon}</span>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, margin: 0 }}>{fact.text}</p>
            </div>
          ))}
        </div>
      </>
    )
  }
];
