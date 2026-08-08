
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ===== Lightweight site assistant (no API / no monthly cost) =====
const assistantLauncher = document.getElementById('assistant-launcher');
const assistantPanel = document.getElementById('site-assistant');
const assistantClose = document.getElementById('assistant-close');
const assistantForm = document.getElementById('assistant-form');
const assistantInput = document.getElementById('assistant-input');
const assistantMessages = document.getElementById('assistant-messages');
const assistantSuggestions = document.getElementById('assistant-suggestions');

function setAssistantOpen(open) {
  if (!assistantPanel || !assistantLauncher) return;
  assistantPanel.classList.toggle('open', open);
  assistantPanel.setAttribute('aria-hidden', String(!open));
  assistantLauncher.setAttribute('aria-expanded', String(open));
  if (open && assistantInput) setTimeout(() => assistantInput.focus(), 50);
}

assistantLauncher?.addEventListener('click', () => {
  setAssistantOpen(!assistantPanel.classList.contains('open'));
});
assistantClose?.addEventListener('click', () => setAssistantOpen(false));

function addAssistantMessage(text, type='bot', allowHtml=false) {
  const wrap = document.createElement('div');
  wrap.className = `assistant-message ${type}`;
  const p = document.createElement('p');
  if (allowHtml) p.innerHTML = text;
  else p.textContent = text;
  wrap.appendChild(p);

  if (type === 'bot') {
    const small = document.createElement('small');
    small.textContent = 'Automated website assistant';
    wrap.appendChild(small);
  }

  assistantMessages.appendChild(wrap);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function answerMarcusQuestion(raw) {
  const q = raw.toLowerCase().trim();

  if (/(priority|priorities|platform|issues|stand for|vision)/.test(q)) {
    return `Marcus’s four main themes on this mocksite are protecting liberty and privacy, restoring public safety, building Rochester through jobs and homeownership, and strengthening education and youth opportunity. <a href="#priorities">See the priorities</a>.`;
  }

  if (/(privacy|biometric|surveillance|face|facial|cash|sovereignty|data)/.test(q)) {
    return `The featured proposal is the Rochester Sovereignty, Biometric Privacy & Cash Access Act. It focuses on biometric safeguards, limits on unchecked data collection, public transparency, and preserving practical access to cash. <a href="#legislation">View the proposal section</a>.`;
  }

  if (/(crime|criminal|safety|police|public safety|safe)/.test(q)) {
    return `Marcus’s public-safety message emphasizes safer neighborhoods, visible and accountable enforcement, community policing, lighting, youth prevention, and practical anti-theft measures. <a href="#safety">See public safety</a>.`;
  }

  if (/(job|business|economy|entrepreneur|housing|home|ownership|zoning)/.test(q)) {
    return `The economic agenda focuses on reducing barriers for small businesses, encouraging local investment and jobs, modernizing housing and building processes, and expanding pathways to homeownership. <a href="#economy">See the economic agenda</a>.`;
  }

  if (/(school|education|youth|vocational|apprentice|training)/.test(q)) {
    return `Marcus supports vocational pathways, apprenticeships, tutoring, employer partnerships, civic education, and stronger opportunities for Rochester youth. <a href="#future">See education priorities</a>.`;
  }

  if (/(who is|about marcus|background|bio|marcus williams)/.test(q)) {
    return `Marcus C. Williams is presented here as a Rochester civic voice, entrepreneur, business consultant, and community advocate focused on public accountability, financial literacy, neighborhood opportunity, and local institutions. <a href="#about">Meet Marcus</a>.`;
  }

  if (/(involve|volunteer|join|support|contact|email|help)/.test(q)) {
    return `You can use the Get Involved section to join the contact list, and the Media section links to Marcus’s Facebook, YouTube, and X accounts. <a href="#involved">Get involved</a>.`;
  }

  if (/(facebook|youtube|twitter| x |social|media|video)/.test(` ${q} `)) {
    return `You can find Marcus on Facebook, YouTube, and X from the Media section. <a href="#media">Open Media</a>.`;
  }

  if (/(unity|division|slogan|tagline)/.test(q)) {
    return `“UNITY NOT DIVISION” is the central message of this mocksite. The supporting line is “Rochester First. People First. Liberty Always.”`;
  }

  if (/(donate|contribution|money)/.test(q)) {
    return `This mockup does not currently include a donation system. A production site should only enable donations after the campaign or committee confirms the correct legal payment and disclosure setup.`;
  }

  return `I can help with Marcus’s priorities, privacy and biometric policy, public safety, jobs and housing, education, media, or how to get involved. Try asking “What are Marcus’s priorities?”`;
}

function submitAssistantQuestion(question) {
  const q = question.trim();
  if (!q) return;
  addAssistantMessage(q, 'user');
  if (assistantInput) assistantInput.value = '';

  setTimeout(() => {
    addAssistantMessage(answerMarcusQuestion(q), 'bot', true);
  }, 220);
}

assistantForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  submitAssistantQuestion(assistantInput.value);
});

assistantSuggestions?.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => submitAssistantQuestion(btn.dataset.question || btn.textContent));
});
