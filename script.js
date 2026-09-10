(() => {
  const page = document.querySelector('#editor-content');
  const login = document.querySelector('.admin-login');
  if (!page || !login) return;
  const key = 'spl-event-content-v1';
  const saved = localStorage.getItem(key);
  if (saved) page.innerHTML = saved;
  const bar = document.querySelector('.editor-bar');
  bar.style.cssText = 'max-width:1160px;margin:14px auto 0;padding:10px 14px;background:#263545;color:#fff;font:12px Arial;display:flex;gap:10px;align-items:center;flex-wrap:wrap';
  [...bar.querySelectorAll('button')].forEach(button => button.style.cssText = 'border:0;padding:7px 10px;background:#ef9029;color:#263545;font-weight:bold;cursor:pointer');
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
