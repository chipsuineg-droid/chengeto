import React, { useState } from 'react';

export default function UtanoCommunity({ lang, currentUser, setPage }) {

  const [activePost, setActivePost] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Mock community posts — in production these would come from a real-time backend
  const POSTS = [
    {
      id: 1, icon: '🛡️', tag: 'HIV Prevention', tagColor: '#22C55E',
      author: 'Anonymouse_Harare',
      time: '2 hours ago',
      title: 'I just started PrEP — what should I know?',
      body: 'I finally went to the clinic and they gave me PrEP. I\'m feeling nervous about the side effects. Has anyone else started it recently?',
      replies: [
        { author: 'Taps_ZW', text: 'I had mild nausea for the first week but it went away completely. Drink water with it and eat something small before taking it. You\'re doing the right thing! 💪' },
        { author: 'Kim_Byo', text: 'Same experience here. After 2 weeks I forgot I was even taking it. Keep going!' },
      ],
      likes: 14,
    },
    {
      id: 2, icon: '🫀', tag: 'Hypertension', tagColor: '#EF4444',
      author: 'GraceM',
      time: '5 hours ago',
      title: 'My BP was 160/100 at the pharmacy — should I worry?',
      body: 'I checked my blood pressure at a pharmacy because I had a headache and the reading was 160/100. I am 28 years old and I never thought I could have high BP.',
      replies: [
        { author: 'HealthWorker_ZW', text: 'Yes, you should visit a clinic soon. A single high reading doesn\'t always confirm hypertension — it needs to be measured on different days. But 160/100 at your age warrants investigation. Go to any government clinic, it\'s free.' },
      ],
      likes: 8,
    },
    {
      id: 3, icon: '🩸', tag: 'Diabetes', tagColor: '#3B82F6',
      author: 'FutureDoc_NUST',
      time: '1 day ago',
      title: 'Sugar in urine — is this always diabetes?',
      body: 'My mum is saying she sometimes feels very tired and the traditional healer said her urine smells sweet. Is this definitely diabetes? She is refusing to go to the clinic.',
      replies: [
        { author: 'Noma_Byo', text: 'Sweet-smelling urine and fatigue are classic signs of high blood sugar. Please encourage her to go to the clinic — the urine test is simple and free. Early treatment prevents serious complications like kidney failure or blindness.' },
        { author: 'ChengMain', text: 'Utano Community can\'t diagnose — please help her get an actual blood glucose test. It\'s the only way to know for sure. 🙏' },
      ],
      likes: 22,
    },
    {
      id: 4, icon: '🦟', tag: 'Malaria', tagColor: '#10B981',
      author: 'Rural_Health_Advocate',
      time: '2 days ago',
      title: 'Malaria prevention during rainy season — tips that actually work',
      body: 'As rainy season approaches, here are the things that have genuinely helped our community in Binga: (1) Every family member under a treated net every night without exception. (2) We cleared all the drains and water containers. (3) We made sure everyone got the free malaria test within 24 hours of fever — no waiting. Zero deaths last season.',
      replies: [
        { author: 'Haru_Harare', text: 'This is gold. Sharing with my village WhatsApp group immediately. Thank you!' },
      ],
      likes: 41,
    },
  ];

  const [localPosts, setLocalPosts] = useState(POSTS);
  const [likedIds, setLikedIds] = useState([]);

  const handleLike = (postId) => {
    if (likedIds.includes(postId)) return;
    setLikedIds(prev => [...prev, postId]);
    setLocalPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleReply = (postId) => {
    if (!replyText.trim()) return;
    const author = currentUser?.nickname || 'Anonymous';
    setLocalPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, replies: [...p.replies, { author, text: replyText.trim() }] }
        : p
    ));
    setReplyText('');
  };

  const title = lang === 'sn' ? 'Nharaunda yeUtano' : lang === 'nd' ? 'Umphakathi weUtano' : 'Utano Community';
  const subtitle = lang === 'sn'
    ? 'Nzvimbo yakachengeteka yekugovana ruzivo uye mibvunzo yehutano. Mazita ese anabviswa.'
    : lang === 'nd'
    ? 'Indawo ephephile yokwabelana ngolwazi lwempilakahle. Amagama wonke asuswa.'
    : 'A safe, anonymous space to ask health questions, share experiences, and support each other.';

  return (
    <div className="animate-fade-in" style={{ padding: '32px 24px', maxWidth: '760px', margin: '0 auto', paddingBottom: '100px' }}>

      <h2 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px', fontWeight: 800 }}>
        🤝 {title}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '8px', lineHeight: 1.6 }}>
        {subtitle}
      </p>
      <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '20px', padding: '4px 14px', fontSize: '11px', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '32px' }}>
        🔒 All posts are anonymous · No personal data collected
      </div>

      {/* Post list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {localPosts.map(post => (
          <div key={post.id} className="glass-card" style={{ borderLeft: `4px solid ${post.tagColor}` }}>

            {/* Tag + meta */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '16px' }}>{post.icon}</span>
              <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: `${post.tagColor}20`, color: post.tagColor, fontWeight: 700 }}>{post.tag}</span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{post.author} · {post.time}</span>
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>{post.title}</h4>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '16px' }}>{post.body}</p>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {post.replies.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '11px', flexShrink: 0 }}>
                      {r.author[0].toUpperCase()}
                    </div>
                    <div style={{ background: 'var(--color-bg-surface)', borderRadius: '10px', padding: '10px 14px', flex: 1 }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)' }}>{r.author}</span>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: '4px 0 0 0', lineHeight: 1.55 }}>{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input + like */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <input
                type="text"
                placeholder="Reply anonymously..."
                value={activePost === post.id ? replyText : ''}
                onFocus={() => setActivePost(post.id)}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { handleReply(post.id); } }}
                className="chat-input"
                style={{ flex: 1, padding: '10px 14px', fontSize: '13px' }}
              />
              <button
                onClick={() => handleReply(post.id)}
                style={{ background: post.tagColor, color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}
              >
                Reply
              </button>
              <button
                onClick={() => handleLike(post.id)}
                style={{ background: 'none', border: `1px solid ${likedIds.includes(post.id) ? post.tagColor : 'var(--color-border)'}`, borderRadius: '10px', padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: likedIds.includes(post.id) ? post.tagColor : 'var(--color-text-muted)', fontWeight: 600 }}
              >
                ❤️ {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{ marginTop: '32px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '10px', padding: '14px 18px' }}>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
          ⚠️ <strong>Utano Community Disclaimer:</strong> Posts are community discussion only. This is not a substitute for professional medical advice. If you have a health emergency, visit your nearest clinic or call 994 (Ambulance).
        </p>
      </div>
    </div>
  );
}
