export const PREG_INFO_SECTIONS = [
  {
    id: "fertility",
    title: "Fertility & Cycle",
    content: (
      <>
        <p><strong>Fertility and the Menstrual Cycle</strong> are closely linked. A typical menstrual cycle lasts about 28 days, though it varies. Ovulation usually occurs midway through the cycle, releasing an egg.</p>
        <p>A woman is most fertile during the <strong>"fertile window"</strong>—the few days leading up to and including the day of ovulation. Tracking your cycle can help you understand your body, but it is not a foolproof method for preventing pregnancy.</p>
        <p>Sperm can survive inside the female reproductive tract for up to 5 days, meaning unprotected sex before ovulation can still lead to pregnancy.</p>
      </>
    )
  },
  {
    id: "contraception",
    title: "Contraception Basics",
    content: (
      <>
        <p><strong>Contraception (Birth Control)</strong> helps prevent unintended pregnancies. There are many options available, allowing you to choose what fits your lifestyle and health needs best.</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li><strong>Barrier Methods:</strong> Condoms prevent sperm from reaching the egg and protect against STIs.</li>
          <li><strong>Hormonal Methods:</strong> Pills, implants, and injections stop ovulation or thicken cervical mucus.</li>
          <li><strong>Long-Acting Reversible Contraceptives (LARC):</strong> IUDs and implants provide years of protection and are highly effective.</li>
        </ul>
      </>
    )
  },
  {
    id: "early-signs",
    title: "Early Signs",
    content: (
      <>
        <p><strong>Early signs of pregnancy</strong> can vary from person to person, but common symptoms include:</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li><strong>Missed Period:</strong> The most common early indicator.</li>
          <li><strong>Nausea:</strong> Often called "morning sickness," though it can happen anytime.</li>
          <li><strong>Tender Breasts:</strong> Hormonal changes can make breasts feel sore or heavy.</li>
          <li><strong>Fatigue:</strong> Feeling unusually tired due to rising progesterone levels.</li>
        </ul>
        <p style={{ marginTop: '10px' }}>The only definitive way to confirm pregnancy is through a pregnancy test or a visit to a healthcare clinic.</p>
      </>
    )
  },
  {
    id: "emergency",
    title: "Emergency Contraception",
    content: (
      <>
        <p><strong>Emergency Contraception (EC)</strong> can be used to prevent pregnancy after unprotected sex, or if a primary method fails (like a broken condom).</p>
        <p>The "Morning After Pill" (e.g., Plan B) is most effective when taken as soon as possible, ideally within 72 hours (3 days). A Copper IUD can also be inserted within 5 days as highly effective emergency contraception.</p>
        <p style={{ color: 'var(--color-rose)', fontWeight: 'bold' }}>Note: Emergency contraception does not cause an abortion; it prevents a pregnancy from starting. It does not protect against STIs.</p>
      </>
    )
  },
  {
    id: "myths",
    title: "Myths vs Facts",
    content: (
      <>
        <p><strong>Common Pregnancy Myths:</strong></p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>❌ <em>Myth: You can't get pregnant the first time you have sex.</em><br/>✅ <strong>Fact:</strong> You can get pregnant any time you have unprotected sex, even the first time.</li>
          <li>❌ <em>Myth: Douching or washing after sex prevents pregnancy.</em><br/>✅ <strong>Fact:</strong> Sperm moves very quickly. Washing will not stop sperm from reaching the egg.</li>
          <li>❌ <em>Myth: Pulling out is a reliable method.</em><br/>✅ <strong>Fact:</strong> Pre-ejaculate (pre-cum) can contain active sperm.</li>
        </ul>
      </>
    )
  }
];
