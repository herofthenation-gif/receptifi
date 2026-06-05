// Receptifi Tweaks app — loaded after tweaks-panel.jsx so useTweaks/TweaksPanel
// are on window before this script runs.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3b82f6",
  "headline": "Your front desk, upgraded.",
  "highlightPlan": "bilingual"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  '#3b82f6': { name: 'Electric Blue', glow: 'rgba(59,130,246,.45)', light: '#60a5fa' },
  '#7c3aed': { name: 'Violet',        glow: 'rgba(124,58,237,.45)', light: '#a78bfa' },
  '#06b6d4': { name: 'Cyan',          glow: 'rgba(6,182,212,.45)',  light: '#22d3ee' },
  '#10b981': { name: 'Emerald',       glow: 'rgba(16,185,129,.45)', light: '#34d399' },
};

function applyAccent(hex){
  const cfg = ACCENT_PRESETS[hex] || ACCENT_PRESETS['#3b82f6'];
  const r = document.documentElement.style;
  r.setProperty('--accent', hex);
  r.setProperty('--accent-2', cfg.light);
  r.setProperty('--accent-glow', cfg.glow);
}

function applyHeadline(text){
  const h = document.querySelector('.hero h1');
  if (!h) return;
  if (text.toLowerCase().includes('upgraded')){
    const idx = text.toLowerCase().indexOf('upgraded');
    const a = text.slice(0, idx);
    const b = text.slice(idx + 'upgraded'.length);
    h.innerHTML = `${a}<span class="grad">upgraded${b}</span>`;
  } else {
    const parts = text.split(',');
    if (parts.length > 1){
      h.innerHTML = `${parts[0]},<br/><span class="grad">${parts.slice(1).join(',').trim()}</span>`;
    } else {
      h.innerHTML = `<span class="grad">${text}</span>`;
    }
  }
}

function applyVoiceBar(show){
  const bar = document.getElementById('voicebar');
  if (bar) bar.style.display = show ? '' : 'none';
}

function applyHighlight(which){
  const plans = document.querySelectorAll('#pricing .plan');
  if (plans.length < 2) return;
  const [standard, bilingual] = plans;
  const target = which === 'standard' ? standard : bilingual;
  const other  = which === 'standard' ? bilingual : standard;
  target.classList.add('pro');
  other.classList.remove('pro');
  // single badge on the highlighted plan
  const otherBadge = other.querySelector('.plan-badge');
  if (otherBadge) otherBadge.remove();
  let badge = target.querySelector('.plan-badge');
  if (!badge){
    badge = document.createElement('div');
    badge.className = 'plan-badge';
    badge.textContent = 'Most popular';
    target.prepend(badge);
  }
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(()=>{ applyAccent(t.accent); }, [t.accent]);
  React.useEffect(()=>{ applyHeadline(t.headline); }, [t.headline]);
  React.useEffect(()=>{ applyHighlight(t.highlightPlan); }, [t.highlightPlan]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand">
        <TweakColor label="Accent" value={t.accent}
          options={['#3b82f6','#7c3aed','#06b6d4','#10b981']}
          onChange={(v)=>setTweak('accent', v)} />
      </TweakSection>
      <TweakSection label="Hero">
        <TweakText label="Headline" value={t.headline}
          onChange={(v)=>setTweak('headline', v)} />
      </TweakSection>
      <TweakSection label="Pricing">
        <TweakRadio label="Highlight plan" value={t.highlightPlan}
          options={['standard','bilingual']}
          onChange={(v)=>setTweak('highlightPlan', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
