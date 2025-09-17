(function(){
  const storageKey = 'tb_setup';

  function saveSetup(data){
    localStorage.setItem(storageKey, JSON.stringify(data));
  }
  function loadSetup(){
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch(e){ return {}; }
  }

  // Form wiring
  const form = document.getElementById('setup-form');
  if (form){
    // Pre-fill with any stored values
    const stored = loadSetup();
    ['name','instructions','collection','shop','language','products'].forEach(id => {
      const el = document.getElementById(id);
      if (el && stored[id] != null) el.value = stored[id];
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = {
        name: document.getElementById('name').value.trim() || 'Techbuddy',
        instructions: document.getElementById('instructions').value.trim() || 'Provide instant technical support for my store',
        collection: document.getElementById('collection').value,
        shop: document.getElementById('shop').value.trim() || 'https://example-shop.com',
        language: document.getElementById('language').value.trim() || 'English',
        products: parseInt(document.getElementById('products').value || '100', 10)
      };
      saveSetup(data);
      window.location.href = 'chat.html';
    });
  }

  // Chat wiring
  const chatBox = document.getElementById('chat-box');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const title = document.getElementById('chat-title');

  if (chatBox && input && sendBtn){
    const conf = loadSetup();
    if (title && conf.name){ title.textContent = conf.name; }

    function addMessage(role, text){
      const row = document.createElement('div');
      row.className = 'msg ' + (role === 'user' ? 'user' : 'bot');
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = text;
      row.appendChild(bubbl e);
      chatBox.appendChild(row);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Intro message
    addMessage('bot', `${conf.name || 'Techbuddy'} ready to help with ${conf.shop || 'your store'} (${conf.language || 'English'}). Ask me anything!`);

    function botReply(userText){
      const canned = [
        `I can analyze product data via ${conf.collection || 'CSV'} to enhance support.`,
        `For performance: enable caching, compress images, and lazy‑load assets.`,
        `Need help with ${conf.products || 100} products? I can bulk troubleshoot listings.`,
        conf.instructions || 'Provide instant technical support for my store'
      ];
      const idx = Math.floor(Math.random() * canned.length);
      setTimeout(() => addMessage('bot', canned[idx]), 500);
    }

    function send(){
      const text = input.value.trim();
      if (!text) return;
      addMessage('user', text);
      input.value = '';
      botReply(text);
    }
    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  }
})();


