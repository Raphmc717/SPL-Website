(() => {
  const page = document.querySelector('#editor-content');
  const login = document.querySelector('.admin-login');
  if (!page || !login) return;
  document.querySelectorAll('a[href="#bracket"]').forEach(link => link.remove());
  const bracket = document.querySelector('#bracket');
  if (bracket) bracket.remove();
  const key = 'spl-event-content-v1';
  const saved = localStorage.getItem(key);
  if (saved) page.innerHTML = saved;
  page.querySelector('#bracket')?.remove();
  const bar = document.querySelector('.editor-bar');
  bar.style.cssText = 'max-width:1160px;margin:14px auto 0;padding:10px 14px;background:#263545;color:#fff;font:12px Arial;display:flex;gap:10px;align-items:center;flex-wrap:wrap';
  [...bar.querySelectorAll('button')].forEach(button => button.style.cssText = 'border:0;padding:7px 10px;background:#ef9029;color:#263545;font-weight:bold;cursor:pointer');
  const fileButton = document.createElement('button');
  fileButton.textContent = 'Save to file…';
  fileButton.style.cssText = 'border:0;padding:7px 10px;background:#ef9029;color:#263545;font-weight:bold;cursor:pointer';
  bar.insertBefore(fileButton, bar.querySelector('.logout'));
  const original = page.innerHTML;
  const showLogin = () => {
    const username = prompt('Admin username');
    const password = prompt('Admin password');
    if (username === 'spl-admin' && password === 'Sentinel2026!') {
      page.contentEditable = 'true'; page.spellcheck = false;
      page.style.outline = '3px solid #ef9029';
      document.body.classList.add('editing'); bar.hidden = false; login.hidden = true;
    } else if (username !== null) alert('Incorrect username or password.');
  };
  login.addEventListener('click', showLogin);
  document.querySelector('.save-edits').addEventListener('click', () => {
    localStorage.setItem(key, page.innerHTML); page.contentEditable = 'false'; page.style.outline = '';
    document.body.classList.remove('editing'); bar.hidden = true; login.hidden = false;
    alert('Your SPL event changes were saved in this browser.');
  });
  document.querySelector('.discard-edits').addEventListener('click', () => {
    page.innerHTML = localStorage.getItem(key) || original;
  });
  fileButton.addEventListener('click', async () => {
    const copy = document.documentElement.cloneNode(true);
    const copyPage = copy.querySelector('#editor-content');
    const copyBar = copy.querySelector('.editor-bar');
    const copyLogin = copy.querySelector('.admin-login');
    copyPage.removeAttribute('contenteditable'); copyPage.removeAttribute('spellcheck'); copyPage.style.outline = '';
    copyBar.hidden = true; copyLogin.hidden = false;
    const html = '<!doctype html>\n' + copy.outerHTML;
    try {
      if (!window.showSaveFilePicker) throw new Error('File picker unavailable');
      const handle = await window.showSaveFilePicker({ suggestedName: 'event.html', types: [{ description: 'HTML file', accept: { 'text/html': ['.html'] } }] });
      const writable = await handle.createWritable();
      await writable.write(html); await writable.close();
      alert('Saved to the file you selected.');
    } catch (error) {
      if (error.name === 'AbortError') return;
      const file = new Blob([html], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file); link.download = 'event.html'; link.click();
      URL.revokeObjectURL(link.href);
      alert('Your edited event.html was downloaded. Move it into your website folder and replace the old event.html file.');
    }
  });
  document.querySelector('.logout').addEventListener('click', () => {
    page.contentEditable = 'false'; page.style.outline = ''; document.body.classList.remove('editing'); bar.hidden = true; login.hidden = false;
  });
  page.addEventListener('click', event => {
    if (document.body.classList.contains('editing')) return;
    const team = event.target.closest('.team');
    if (team) {
      event.preventDefault();
      const label = team.parentElement.textContent.replace(team.textContent, '').trim() || team.textContent.trim();
      location.href = 'team.html?team=' + encodeURIComponent(label); return;
    }
    if (event.target.closest('.event-match')) location.href = 'match.html';
  });
})();
