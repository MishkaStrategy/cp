const games = [
  {name:'Le Bandit', provider:'Hacksaw', tag:'HOT', type:'hot', symbol:'₿', g1:'#c8ff3d', g2:'#214b2f'},
  {name:'Sweet Bonanza', provider:'Pragmatic Play', tag:'', type:'hot', symbol:'99', g1:'#ff7dac', g2:'#5a2b87'},
  {name:'Wanted Dead or a Wild', provider:'Hacksaw', tag:'HOT', type:'hot', symbol:'W', g1:'#ff9b5c', g2:'#5b2719'},
  {name:'Money Train 4', provider:'Relax Gaming', tag:'NEW', type:'new', symbol:'M4', g1:'#5ce8ff', g2:'#173b52'},
  {name:'Gates of Olympus', provider:'Pragmatic Play', tag:'', type:'hot', symbol:'Ω', g1:'#9a6cff', g2:'#2f2457'},
  {name:'Crazy Time', provider:'Evolution', tag:'LIVE', type:'live', symbol:'CT', g1:'#ff526a', g2:'#4c1f4b'},
  {name:'Big Bass Splash', provider:'Pragmatic Play', tag:'', type:'all', symbol:'BB', g1:'#55eeb5', g2:'#133e43'},
  {name:'San Quentin 2', provider:'NoLimit City', tag:'NEW', type:'new', symbol:'SQ', g1:'#b6acff', g2:'#282650'},
  {name:'Lightning Roulette', provider:'Evolution', tag:'LIVE', type:'live', symbol:'⚡', g1:'#5ce8ff', g2:'#252c61'},
  {name:'Chaos Crew 2', provider:'Hacksaw', tag:'HOT', type:'hot', symbol:'CC', g1:'#ff8fb8', g2:'#612943'},
  {name:'Fire in the Hole 3', provider:'NoLimit City', tag:'NEW', type:'new', symbol:'F3', g1:'#ffc45c', g2:'#61391e'},
  {name:'Blackjack VIP', provider:'Pragmatic Live', tag:'LIVE', type:'live', symbol:'21', g1:'#c8ff3d', g2:'#254b30'},
];
const providers = [
  ['Pragmatic Play','681'],['Hacksaw','253'],['Evolution','141'],['Spinomenal','730'],['Fazi','572'],['PlayNGo','366'],
  ['Red Tiger','378'],['Evoplay','349'],['BGaming','302'],['Pragmatic Live','295'],['NoLimit City','137'],['NetEnt','243']
];
const gameGrid = document.getElementById('gameGrid');
const toast = document.getElementById('toast');
function renderGames(filter='all'){
  const list = filter==='all' ? games : games.filter(g=>g.type===filter);
  gameGrid.innerHTML = list.map(g=>`<article class="game-card" style="--g1:${g.g1};--g2:${g.g2}" data-name="${g.name.toLowerCase()} ${g.provider.toLowerCase()}">
    <div class="art"></div>${g.tag?`<span class="game-tag">${g.tag}</span>`:''}<button class="favorite" aria-label="В избранное">♡</button>
    <div class="symbol">${g.symbol}</div><div class="meta"><b>${g.name}</b><small>${g.provider}</small></div></article>`).join('');
  document.querySelectorAll('.favorite').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();btn.classList.toggle('on');btn.textContent=btn.classList.contains('on')?'♥':'♡';showToast(btn.classList.contains('on')?'Добавлено в избранное':'Удалено из избранного')}));
}
function showToast(text){toast.textContent=text;toast.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove('show'),1500)}
renderGames();

document.querySelectorAll('.chip[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.chip[data-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderGames(btn.dataset.filter)}));

const providerChips=document.getElementById('providerChips');
function renderProviders(query=''){
  const q=query.toLowerCase();
  providerChips.innerHTML=providers.filter(p=>p[0].toLowerCase().includes(q)).map(p=>`<button class="provider-chip">${p[0]}<span>${p[1]}</span></button>`).join('') || '<div class="muted">Провайдер не найден</div>';
}
renderProviders();
document.getElementById('providerSearch').addEventListener('input',e=>renderProviders(e.target.value));
document.getElementById('providersAll').addEventListener('click',()=>showToast('Открыт полный каталог провайдеров'));

const search=document.getElementById('globalSearch'), results=document.getElementById('searchResults');
search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();
  if(!q){results.classList.remove('show');return}
  const found=[...games.map(g=>({title:g.name,sub:g.provider})),...providers.map(p=>({title:p[0],sub:'Провайдер'}))].filter(x=>(x.title+' '+x.sub).toLowerCase().includes(q)).slice(0,6);
  results.innerHTML=found.length?found.map(x=>`<div class="result"><span>${x.title}</span><small>${x.sub}</small></div>`).join(''):'<div class="result"><span>Ничего не найдено</span></div>';
  results.classList.add('show');
});
document.addEventListener('click',e=>{if(!e.target.closest('.top-search-wrap'))results.classList.remove('show')});
document.addEventListener('keydown',e=>{if(e.key==='/' && document.activeElement.tagName!=='INPUT'){e.preventDefault();search.focus()}});

const menuBtn=document.getElementById('menuBtn'), sidebar=document.getElementById('sidebar');
menuBtn?.addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));