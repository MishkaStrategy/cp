(() => {
  const app = document.getElementById('app');
  const files = ['fragments/1.html', 'fragments/2.html', 'fragments/3.html', 'fragments/4.html'];
  Promise.all(files.map((url) => fetch(url).then((r) => { if (!r.ok) throw new Error(`fragment ${url}: ${r.status}`); return r.text(); })))
    .then((chunks) => {
      app.outerHTML = chunks.join('');
      const script = document.createElement('script');
      script.src = 'script.js';
      document.body.appendChild(script);
    })
    .catch((error) => {
      console.error(error);
      app.innerHTML = '<main style="padding:10vh 7vw;color:#f4f2ef"><h1>ДУША V3</h1><p>Не удалось загрузить концепцию. Обновите страницу.</p></main>';
    });
})();
