const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const state = { route:'casino', filter:'all', provider:'all', favorites:new Set(), sound:true, mines:null, wheelTurns:0 };

const routes = {
  casino:{label:'Casino',icon:'◉'}, wheel:{label:'Wheel',icon:'◐'}, mines:{label:'Mines',icon:'✣'}, classic:{label:'Classic',icon:'◇'}, duels:{label:'Duels',icon:'⚡'},
  tournaments:{label:'Турниры',icon:'✦'}, trains:{label:'The Trains!',icon:'➤'}, promo:{label:'Промокод',icon:'%'}, history:{label:'История',icon:'↺'}, help:{label:'Вопросы и ответы',icon:'?'}
};

const games = [
  {id:'crazy-time',name:'Crazy Time',provider:'Evolution Gaming',type:'live',tag:'LIVE',symbol:'CT',g1:'#ff5b69',g2:'#59325b'},
  {id:'dream-catcher',name:'Dream Catcher',provider:'Evolution Gaming',type:'live',tag:'LIVE',symbol:'DC',g1:'#9b75ff',g2:'#252555'},
  {id:'sweet-bonanza-1000',name:'Sweet Bonanza 1000',provider:'Pragmatic Play',type:'hot',tag:'HOT',symbol:'99',g1:'#ff7cac',g2:'#5f2b88'},
  {id:'mega-wheel',name:'Mega Wheel',provider:'Pragmatic Live',type:'live',tag:'LIVE',symbol:'MW',g1:'#5ce8ff',g2:'#253363'},
  {id:'dog-house',name:'The Dog House',provider:'Pragmatic Play',type:'hot',tag:'HOT',symbol:'DH',g1:'#ff9b5c',g2:'#643d22'},
  {id:'gates-olympus',name:'Gates of Olympus',provider:'Pragmatic Play',type:'hot',tag:'',symbol:'Ω',g1:'#9b75ff',g2:'#30265b'},
  {id:'le-bandit',name:'Le Bandit',provider:'Hacksaw',type:'hot',tag:'HOT',symbol:'₿',g1:'#c8ff3d',g2:'#234c31'},
  {id:'wanted',name:'Wanted Dead or a Wild',provider:'Hacksaw',type:'hot',tag:'HOT',symbol:'W',g1:'#ff9b5c',g2:'#5d291a'},
  {id:'money-train-4',name:'Money Train 4',provider:'Relax Gaming',type:'new',tag:'NEW',symbol:'M4',g1:'#5ce8ff',g2:'#183e57'},
  {id:'san-quentin',name:'San Quentin xWays',provider:'No Limit City',type:'new',tag:'NEW',symbol:'SQ',g1:'#b7a9ff',g2:'#2b2857'},
  {id:'chaos-crew-2',name:'Chaos Crew II',provider:'Hacksaw',type:'hot',tag:'HOT',symbol:'CC',g1:'#ff79ae',g2:'#612c46'},
  {id:'fire-hole-3',name:'Fire in the Hole 3',provider:'No Limit City',type:'new',tag:'NEW',symbol:'F3',g1:'#ffc65c',g2:'#613b1f'},
  {id:'blackjack-vip',name:'Blackjack VIP',provider:'Pragmatic Live',type:'live',tag:'LIVE',symbol:'21',g1:'#c8ff3d',g2:'#254c31'},
  {id:'lightning-roulette',name:'Lightning Roulette',provider:'Evolution Gaming',type:'live',tag:'LIVE',symbol:'⚡',g1:'#5ce8ff',g2:'#282f68'},
  {id:'big-bass',name:'Big Bass Splash',provider:'Pragmatic Play',type:'all',tag:'',symbol:'BB',g1:'#55eeb5',g2:'#144246'},
  {id:'sugar-rush',name:'Sugar Rush 1000',provider:'Pragmatic Play',type:'new',tag:'NEW',symbol:'SR',g1:'#ff7cac',g2:'#514173'},
  {id:'royal-potato',name:'Royal Potato 2',provider:'Hacksaw',type:'new',tag:'NEW',symbol:'RP',g1:'#ffc65c',g2:'#623522'},
  {id:'iron-bank',name:'Iron Bank',provider:'Relax Gaming',type:'all',tag:'',symbol:'IB',g1:'#adb7c9',g2:'#263340'},
  {id:'minotaurus',name:'Minotaurus',provider:'PlayNGo',type:'all',tag:'',symbol:'M',g1:'#ff9b5c',g2:'#4c2d24'},
  {id:'voodoo',name:'Voodoo',provider:'Hacksaw',type:'all',tag:'',symbol:'V',g1:'#9b75ff',g2:'#392554'},
  {id:'cleocatra',name:'Cleocatra',provider:'Pragmatic Play',type:'all',tag:'',symbol:'C',g1:'#ffc65c',g2:'#5b4223'},
  {id:'crazy-pachinko',name:'Crazy Pachinko',provider:'Evolution Gaming',type:'live',tag:'LIVE',symbol:'CP',g1:'#ff5b69',g2:'#503056'},
  {id:'funky-time',name:'Funky Time',provider:'Evolution Gaming',type:'live',tag:'LIVE',symbol:'FT',g1:'#5ce8ff',g2:'#4f2f6a'},
  {id:'hex',name:'Hex',provider:'Relax Gaming',type:'all',tag:'',symbol:'HX',g1:'#c8ff3d',g2:'#30442d'}
];

const providers = [
 ['4 The Player',15],['Amigo Gaming',149],['Amusnet',427],['Aviatrix',3],['Belatra Games',155],['Bet Radar',15],['Bet Solutions',5],['BetSoft',234],['BF Games',138],['BGaming',299],['Big Time Gaming',53],['Blueprint',246],['Booming Games',208],['Caleta',147],['Casino Technology',248],['Charismatic',10],['Concept Gaming',107],['CT Interactive',308],['Dlv',109],['ElBet',11],['Endorphina',228],['Espresso Games',108],['Eurasian Gaming',158],['Evolution Gaming',141],['Evoplay Entertainment',347],['Ezugi',134],['F*Bastards',44],['Fantasma',25],['Fazi',562],['Game Beat',71],['GameArt',161],['Gamzix',88],['Habanero',264],['Hacksaw',250],['IgroSoft',23],['Kagaming',1019],['Kalamba',245],['Macaw Gaming',13],['Mascot',168],['NetEnt',243],['NetGaming',152],['No Limit City',137],['Novomatic',154],['Nucleos Gaming',151],['One Touch',94],['PG Soft',166],['Platipus',195],['PlayNGo',366],['Playson',114],['Pragmatic Live',294],['Pragmatic Play',678],['Print Studios',28],['Quickspin',123],['Red Tiger',378],['RedRake',183],['Relax Gaming',115],['Retro Gaming',208],['Rtg Slots',150],['Slotmill',56],['Smart Soft',68],['Spade Gaming',132],['Spiffbet Games',5],['Spinmatic',108],['Spinomenal',725],['Super Spade Games',11],['Three Oaks',143],['Thunderkick',110],['Tom Horn',115],['Triple Cherry',171],['Triple Profit Games',87],['Vibra Gaming',62],['Vivo Gaming',7],['VoltEnt',369],['XPro Gaming',11],['Yggdrasil',184],['Zeus Play',97]
];

const chats = [
  ['AK','Akeemiii','USER','доброй ночи бро'],['WI','Woom I.','VIP','Всем удачи сегодня 👋'],['BW','Blue Witch','USER','кчаау ⚡'],['VI','Vladislav I.','Platinum','Хай 👋'],['BC','Bogdan C.','VIP','Добрый вечер'],['LO','Love','USER','вчера бонуски часто падали'],['SF','Sanya F.','USER','привет 👋'],['IZ','Izpod W.','VIP','Спасибо за дождь']
];

const tournaments = [
  {name:'SLOTS RACE #5',prize:'5 000 000 ₽',type:'Slots',players:'4 982',ends:'03:18:42',progress:72},
  {name:'Slots Tournament',prize:'500 000 ₽',type:'Slots',players:'1 306',ends:'11:42:09',progress:44},
  {name:'Wheel Day tournament',prize:'10 000 ₽',type:'Wheel',players:'476',ends:'00:58:13',progress:88},
  {name:'Classic Daily',prize:'3 000 ₽',type:'Classic',players:'124',ends:'06:04:21',progress:28}
];

function showToast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),1800)}
function money(n){return new Intl.NumberFormat('ru-RU').format(n)}
function escapeHtml(s=''){return s.replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','\"':'&quot;'}[c]))}

function setRoute(route,push=false){
  if(!routes[route]) route='casino';
  state.route=route;
  if(push && location.hash!==`#${route}`) history.pushState(null,'',`#${route}`);
  $$('.route-link').forEach(a=>a.classList.toggle('active',a.dataset.route===route));
  $$('.primary-nav .nav-item,.secondary-nav .nav-item').forEach(a=>a.classList.toggle('active',a.dataset.route===route));
  $('#breadcrumb').innerHTML=`<span class="crumb-muted">ZOOMA</span><span>/</span><strong>${routes[route].label}</strong>`;
  $('#sidebar').classList.remove('open');
  $('#mobileGamesSheet').classList.remove('open');
  renderRoute(route);
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderRoute(route){
  const view=$('#pageView');
  const fn={casino:renderCasino,wheel:renderWheel,mines:renderMines,classic:renderClassic,duels:renderDuels,tournaments:renderTournaments,trains:renderTrains,promo:renderPromo,history:renderHistory,help:renderHelp}[route] || renderCasino;
  view.innerHTML=fn();
  view.classList.remove('page-enter'); void view.offsetWidth; view.classList.add('page-enter');
  bindPageEvents(route);
}

function sectionHead(eyebrow,title,actions=''){return `<div class="section-title"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${actions}</div>`}
function pageHead(eyebrow,title,desc,actions=''){return `<div class="page-head"><div><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`}

function gameCard(g){
  const fav=state.favorites.has(g.id);
  return `<article class="game-card" data-game="${g.id}" style="--g1:${g.g1};--g2:${g.g2}"><div class="game-art"></div>${g.tag?`<span class="game-tag tag ${g.tag==='LIVE'?'cyan':g.tag==='NEW'?'':'red'}">${g.tag}</span>`:''}<button class="favorite ${fav?'on':''}" data-fav="${g.id}" aria-label="Избранное">${fav?'♥':'♡'}</button><div class="game-symbol">${g.symbol}</div><div class="game-meta"><b>${g.name}</b><small>${g.provider}</small></div></article>`
}

function filteredGames(){return games.filter(g=>(state.filter==='all'||g.type===state.filter||state.filter==='favorites'&&state.favorites.has(g.id))&&(state.provider==='all'||g.provider===state.provider))}

function casinoGameSection(){
  const list=filteredGames();
  return `${sectionHead('ДЛЯ ТЕБЯ','Играть сейчас',`<div class="game-toolbar"><button class="chip ${state.filter==='all'?'active':''}" data-filter="all">Все</button><button class="chip ${state.filter==='hot'?'active':''}" data-filter="hot">Популярные</button><button class="chip ${state.filter==='new'?'active':''}" data-filter="new">Новые</button><button class="chip ${state.filter==='live'?'active':''}" data-filter="live">Live</button><button class="chip ${state.filter==='favorites'?'active':''}" data-filter="favorites">♡ Избранное</button></div>`)}<div class="game-grid" id="gameGrid">${list.length?list.map(gameCard).join(''):`<div class="empty-state" style="grid-column:1/-1"><div><div class="empty-icon">⌕</div><h3>Игр не найдено</h3><p>Сбросьте фильтр или выберите другого провайдера.</p><button class="btn soft" data-reset-games>Сбросить фильтры</button></div></div>`}</div>`
}

function providerSection(){return `<section class="provider-section"><div class="provider-head"><div><span class="eyebrow">КАТАЛОГ</span><h2 style="margin:6px 0 0">Провайдеры</h2><p style="font-size:9px;color:#697570;margin:5px 0 0">Вся структура каталога перенесена в компактный поиск.</p></div><label class="provider-search"><span>⌕</span><input id="providerSearch" placeholder="Найти провайдера"></label></div><div class="provider-chips" id="providerChips">${providers.map(([n,c])=>`<button class="provider-chip ${state.provider===n?'active':''}" data-provider="${escapeHtml(n)}">${n}<span>${c}</span></button>`).join('')}</div></section>`}

function renderCasino(){return `
  <section class="hero-layout">
    <article class="hero-card hero-main"><div class="hero-copy"><span class="eyebrow">ZOOMA CASINO · REDESIGN</span><h1>Всё казино.<br><span>Без лишнего шума.</span></h1><p>Слоты, live-игры, собственные режимы, турниры, поезда и бонусы теперь собраны в одной понятной системе.</p><div class="hero-actions"><button class="btn primary" data-scroll-games>Играть сейчас ↗</button><a class="btn soft route-link" style="display:inline-flex;align-items:center;text-decoration:none" href="#tournaments" data-route="tournaments">Смотреть события</a></div></div><div class="hero-visual" aria-hidden="true"><div class="orbit a"></div><div class="orbit b"></div><div class="orbit c"></div><div class="z-core">Z</div><div class="float-pill p1">x25</div><div class="float-pill p2">LIVE</div><div class="float-pill p3">+7.42</div></div></article>
    <article class="promo-card tournament" data-route-card="tournaments"><div style="display:flex;justify-content:space-between"><span class="eyebrow">SLOTS RACE #5</span><span class="live-badge">LIVE</span></div><div class="big-number">5 000 000 ₽</div><p>Главный турнир недели. Соревнуйтесь по multiplier score.</p><div class="small-row"><span>До финиша</span><strong>03:18:42</strong></div><div class="progress"><i style="width:72%"></i></div><button class="text-link">Открыть турнир <span>↗</span></button></article>
    <article class="promo-card cashback" data-route-card="promo"><div class="cash-ring"><b>12%</b></div><div><span class="eyebrow">CASHBACK & FREESPINS</span><h3>Награды<br>без отыгрыша</h3><p>До 12% cashback и 200 фриспинов в профиле.</p><button class="text-link">Мои награды <span>↗</span></button></div></article>
  </section>
  <div class="quick-grid">
    <a class="quick-card q-wheel route-link" href="#wheel" data-route="wheel"><span class="q-icon">◐</span><span><b>Wheel</b><small>Моментальная игра</small></span><i>↗</i></a>
    <a class="quick-card q-mines route-link" href="#mines" data-route="mines"><span class="q-icon">✣</span><span><b>Mines</b><small>Новая версия</small></span><i>↗</i></a>
    <a class="quick-card q-classic route-link" href="#classic" data-route="classic"><span class="q-icon">◇</span><span><b>Classic</b><small>3 комнаты</small></span><i>↗</i></a>
    <a class="quick-card q-duels route-link" href="#duels" data-route="duels"><span class="q-icon">⚡</span><span><b>Duels</b><small>Игрок против игрока</small></span><i>↗</i></a>
    <a class="quick-card q-trains route-link" href="#trains" data-route="trains"><span class="q-icon">➤</span><span><b>The Trains!</b><small>Розыгрыши стримеров</small></span><i>↗</i></a>
  </div>
  <div id="casinoGames">${casinoGameSection()}</div>
  ${sectionHead('ZOOMA NOW','Активности сегодня','<a class="text-link route-link" href="#tournaments" data-route="tournaments">Все активности <span>↗</span></a>')}
  <div class="promo-grid"><article class="promo-tile telegram" data-external="telegram"><span class="tag cyan">TELEGRAM</span><h3>Наш Telegram канал</h3><p>Ежедневные промо, анонсы и денежные поезда.</p></article><article class="promo-tile train" data-route-card="trains"><span class="tag red">HOT</span><h3>Денежный Train</h3><p>Получайте билет до закрытия дверей и занимайте место в рейсе.</p></article><article class="promo-tile rain" data-chat-open><span class="tag">CHAT</span><h3>Дожди каждый день</h3><p>Общайтесь в чате и участвуйте в ежедневных денежных дождях.</p></article></div>
  ${providerSection()}`}

function renderWheel(){return `${pageHead('ZOOMA ORIGINAL','Wheel','Выберите ставку и запустите колесо. Демонстрационная механика работает прямо в прототипе.',`<button class="btn soft" data-modal="history">История</button><button class="btn primary" data-modal="deposit">Пополнить</button>`)}<div class="game-page-grid"><section class="game-stage"><div class="balance-strip"><span>Демо-баланс</span><b>10 000.00 ₽</b></div><div class="wheel-wrap"><div class="wheel-pointer"></div><div class="wheel" id="wheel"></div></div><div class="control-row"><div class="bet-input"><input id="wheelBet" inputmode="decimal" value="100" aria-label="Ставка"></div><button class="bet-preset" data-bet="100">100</button><button class="bet-preset" data-bet="500">500</button><button class="bet-preset" data-bet="1000">1000</button><button class="btn primary" id="spinWheel">КРУТИТЬ</button></div><p class="mine-status" id="wheelStatus">Выберите ставку и нажмите «Крутить».</p></section><aside class="game-side"><div class="side-card"><span class="eyebrow">МНОЖИТЕЛИ</span><h3>Сектора Wheel</h3><p>Демо-версия показывает механику перехода и взаимодействия. Реальные ставки не совершаются.</p><div class="small-row"><span>Частый сектор</span><strong>x2</strong></div><div class="small-row"><span>Средний сектор</span><strong>x5</strong></div><div class="small-row"><span>Редкий сектор</span><strong>x30</strong></div></div><div class="side-card"><span class="eyebrow">ПОСЛЕДНИЕ</span><h3>История раундов</h3><div class="history-list" id="wheelHistory">${['x2','x5','x2','x10','x3'].map((x,i)=>`<div class="history-row"><span>#${9312-i}</span><b>${x}</b></div>`).join('')}</div></div></aside></div>`}

function newMines(){const bombs=new Set();while(bombs.size<3) bombs.add(Math.floor(Math.random()*25));state.mines={bombs,revealed:new Set(),ended:false,multiplier:1};return state.mines}
function renderMines(){if(!state.mines||state.mines.ended)newMines();return `${pageHead('ZOOMA ORIGINAL','Mines','Открывайте клетки, избегайте мин и фиксируйте множитель. В прототипе доступен настоящий интерактивный раунд.',`<button class="btn soft" id="newMines">Новая игра</button><button class="btn primary" id="cashoutMines">Забрать</button>`)}<div class="game-page-grid"><section class="game-stage"><div class="balance-strip"><span>Демо-ставка</span><b>100.00 ₽ · 3 мины</b></div><div class="mines-board" id="minesBoard">${[...Array(25).keys()].map(i=>`<button class="mine-cell" data-cell="${i}"></button>`).join('')}</div><p class="mine-status" id="minesStatus">Откройте первую клетку. Текущий множитель ×1.00</p></section><aside class="game-side"><div class="side-card"><span class="eyebrow">НАСТРОЙКИ</span><h3>Параметры раунда</h3><div class="field"><label>Ставка</label><div class="bet-input"><input value="100"></div></div><div class="small-row"><span>Мины</span><strong>3</strong></div><div class="small-row"><span>Безопасные клетки</span><strong>22</strong></div></div><div class="side-card"><span class="eyebrow">РАУНД</span><h3>Potential win</h3><div class="reward-value" id="minePotential">100 ₽</div><p>Каждая безопасная клетка увеличивает текущий множитель.</p></div></aside></div>`}

function renderClassic(){const rooms=[['LOW','3 480 ₽','143','100 ₽','#5ce8ff'],['MID','24 600 ₽','91','500 ₽','#9b75ff'],['HIGH','118 400 ₽','46','2 500 ₽','#c8ff3d']];return `${pageHead('ZOOMA ORIGINAL','Classic','Выберите комнату и присоединитесь к общему розыгрышу. Шанс зависит от доли ваших билетов в банке.',`<button class="btn primary" data-modal="deposit">Пополнить баланс</button>`)}<div class="classic-rooms">${rooms.map(([name,pot,players,min,accent],i)=>`<article class="room-card" style="--accent:${accent}"><span class="tag ${i===0?'cyan':''}">${name}</span><h3>${name} ROOM</h3><small>Минимальный билет · ${min}</small><div class="pot">${pot}</div><small>текущий банк</small><div class="players"><span>${players} игроков</span><span>раунд #${6428+i}</span></div><button class="btn primary full" data-join-room="${name}">Войти в комнату</button></article>`).join('')}</div>${sectionHead('LIVE FEED','Последние победители')}<div class="leaderboard"><div class="table-head"><span>#</span><span>Игрок</span><span>Банк</span><span>Выигрыш</span></div>${[['1','Maxwinoff','87 400 ₽','63 200 ₽'],['2','Akeemiii','21 300 ₽','14 600 ₽'],['3','Blue Witch','8 900 ₽','6 340 ₽'],['4','Nikitaaa','4 100 ₽','3 020 ₽']].map(r=>`<div class="table-row"><span class="rank">${r[0]}</span><strong>${r[1]}</strong><span>${r[2]}</span><span>${r[3]}</span></div>`).join('')}</div>`}

function renderDuels(){const ds=[['Maxwinoff','Akeemiii','500 ₽','Wheel','00:18'],['Blue Witch','Nikitaaa','1 000 ₽','Mines','00:42'],['Oleg S.','Love','2 500 ₽','Classic','01:04'],['Danila S.','Igor V.','250 ₽','Wheel','00:07']];return `${pageHead('PLAYER VS PLAYER','Duels','Создавайте дуэли или присоединяйтесь к открытым матчам — без выхода из основного интерфейса.',`<button class="btn primary" data-modal="duel">Создать дуэль</button>`)}<div class="duel-list">${ds.map((d,i)=>`<article class="duel-card"><div class="duel-head"><span class="tag ${i%2?'cyan':''}">${d[3]}</span><span class="eyebrow">START ${d[4]}</span></div><div class="duel-users"><div class="duel-user"><div class="avatar">${d[0].slice(0,2).toUpperCase()}</div><b>${d[0]}</b><small>создатель</small></div><span class="versus">VS</span><div class="duel-user"><div class="avatar">${d[1].slice(0,2).toUpperCase()}</div><b>${d[1]}</b><small>соперник</small></div></div><div class="duel-bet"><span>Ставка на игрока</span><strong>${d[2]}</strong></div><button class="btn soft full" style="margin-top:12px" data-duel-watch="${i}">Открыть дуэль</button></article>`).join('')}</div>`}

function renderTournaments(){return `${pageHead('BRANDED TOURNAMENTS','Турниры','Отдельный центр событий с понятным призовым фондом, таймером, прогрессом и лидербордом.',`<button class="btn soft" data-modal="login">Мои турниры</button>`)}<div class="tournament-grid">${tournaments.map((t,i)=>`<article class="tournament-card" data-tournament="${i}"><div style="display:flex;justify-content:space-between"><span class="tag ${i===1?'cyan':i===2?'red':''}">${t.type}</span><span class="live-badge">LIVE</span></div><h3>${t.name}</h3><div class="tournament-prize">${t.prize}</div><div class="tournament-meta"><span>${t.players} игроков</span><strong>${t.ends}</strong></div><div class="progress"><i style="width:${t.progress}%"></i></div></article>`).join('')}</div>${sectionHead('LEADERBOARD','Топ игроков')}<div class="leaderboard"><div class="table-head"><span>#</span><span>Игрок</span><span>Score</span><span>Приз</span></div>${[['1','Maxima_Culpa 2','1 482 334','750 000 ₽'],['2','Alexander Y.','1 211 840','500 000 ₽'],['3','Ksenia K.','982 440','300 000 ₽'],['4','No G. G.','901 112','200 000 ₽'],['5','Nikitaaa','842 901','150 000 ₽']].map(r=>`<div class="table-row"><span class="rank">${r[0]}</span><strong>${r[1]}</strong><span>${r[2]}</span><span>${r[3]}</span></div>`).join('')}</div>`}

function renderTrains(){const archive=[['#4206','ЕВГЕНИЙ','55 555 ₽','30.07'],['#7158','ЕВГЕНИЙ','77 777 ₽','30.07'],['#8821','ЕВГЕНИЙ','155 555 ₽','30.07'],['#1308','ЕВГЕНИЙ','222 222 ₽','30.07'],['#5553','ЕВГЕНИЙ','200 000 ₽','30.07'],['#6149','DANILYCH','3 000 ₽','30.07'],['#9072','BLACK AZAR','1 200 ₽','30.07'],['#3304','ANSLOY','3 000 ₽','30.07']];return `${pageHead('ZOOMA RAILWAYS','The Trains!','Каждый розыгрыш — отдельный поезд призов от стримеров. Получите билет до того, как двери закроются.',`<button class="btn primary" data-modal="login">Мои билеты</button>`)}<section class="train-hero"><div style="display:flex;gap:7px;flex-wrap:wrap"><span class="tag red">0 СЕЙЧАС В ПУТИ</span><span class="tag">1 АКТИВНЫЙ</span><span class="tag cyan">42 ПАССАЖИРА</span></div><div class="departure-board"><div class="departure-head"><span>TRAIN</span><span>FROM</span><span>PRIZE</span><span>TIME</span></div><div class="departure-row"><strong>#3189</strong><span>@ SUBO</span><b>5 000 ₽</b><span>01:04:33</span></div></div><div class="train-ticket"><div class="ticket-main"><span class="eyebrow">ПОСАДКА ОТКРЫТА · 5 МЕСТ</span><div class="ticket-route"><div class="station"><small>FROM</small><b>@ SUBO</b></div><div class="route-line"></div><div class="station" style="text-align:right"><small>TO</small><b>YERBA BUENA</b></div></div><p style="font-size:10px;color:#7b8782">Бортпроводник: <b style="color:#fff">Subo</b> · только рефералам · депозит от 25 000 ₽</p><button class="btn primary" data-train-ticket>Получить билет</button></div><div class="ticket-side"><span class="eyebrow">PRIZE POOL</span><div class="train-prize">5 000 ₽</div><p style="font-size:9px;color:#6e7975">5 мест · 42 пассажира</p><div class="progress"><i style="width:74%"></i></div><div class="small-row"><span>отправление через</span><strong>01:04:33</strong></div></div></div></section>${sectionHead('DEPARTED · ARCHIVED','Архив рейсов')}<div class="surface" style="padding:0 18px">${archive.map(a=>`<div class="archive-row"><span class="tag">${a[0]}</span><strong>@ ${a[1]}</strong><span>${a[2]}</span><span>${a[3]}</span></div>`).join('')}</div>`}

function renderPromo(){return `${pageHead('BONUSES','Промокоды и бонусы','Активируйте промокоды, получайте cashback, фриспины и персональные награды в одном разделе.',`<button class="btn soft" data-modal="login">Мои бонусы</button>`)}<section class="promo-code-box"><span class="eyebrow">АКТИВАЦИЯ ПРОМОКОДА</span><h2 style="font-size:29px;margin:8px 0 0">Есть код? Активируйте его.</h2><p style="font-size:10px;color:#71807a;line-height:1.5">Код будет проверен в демо-режиме. Для реальной активации потребуется авторизация.</p><div class="promo-code-row"><input id="promoInput" maxlength="20" placeholder="ZOOMA2026"><button class="btn primary" id="activatePromo">Активировать</button></div></section>${sectionHead('ZOOMA CLUB','Доступные награды')}<div class="reward-grid"><article class="reward-card"><span class="tag">MONTHLY</span><h3>Cashback</h3><p>Возврат части проигранных средств по итогам месяца.</p><div class="reward-value">до 12%</div><button class="text-link" data-modal="login">Открыть <span>↗</span></button></article><article class="reward-card"><span class="tag cyan">FREESPINS</span><h3>Free spins</h3><p>Персональный пакет вращений без дополнительного отыгрыша.</p><div class="reward-value">до 200</div><button class="text-link" data-modal="login">Открыть <span>↗</span></button></article><article class="reward-card"><span class="tag red">CHAT</span><h3>Денежные дожди</h3><p>Периодические раздачи прямо внутри общего чата.</p><div class="reward-value">каждый день</div><button class="text-link" data-chat-open>Открыть чат <span>↗</span></button></article></div>`}

function renderHistory(){return `${pageHead('ACCOUNT','История','Игровые события, Classic, пополнения, выводы и денежные дожди — в едином журнале.',`<button class="btn primary" data-modal="login">Войти</button>`)}<div class="history-tabs"><button class="chip active" data-history-tab="games">Игры</button><button class="chip" data-history-tab="classic">Classic</button><button class="chip" data-history-tab="deposits">Пополнения</button><button class="chip" data-history-tab="withdraws">Выводы</button><button class="chip" data-history-tab="rains">Дожди</button></div><div id="historyContent">${historyEmpty('Игровая история','Войдите, чтобы увидеть последние игровые сессии, ставки и результаты.')}</div>`}
function historyEmpty(title,text){return `<div class="empty-state"><div><div class="empty-icon">↺</div><h3>${title}</h3><p>${text}</p><button class="btn primary" data-modal="login">ВОЙТИ</button></div></div>`}

function renderHelp(){return `${pageHead('SUPPORT CENTER','Вопросы и ответы','Быстрые ответы по аккаунту, депозитам, выводу средств, бонусам, играм и ответственному гемблингу.',`<button class="btn primary" data-modal="support">Написать в поддержку</button>`)}<div class="faq-layout"><aside class="faq-nav"><button class="active">Популярное</button><button>Аккаунт</button><button>Платежи</button><button>Бонусы</button><button>Игры</button><button>Безопасность</button></aside><section class="faq-list">${[
['Как зарегистрироваться?','Нажмите «Создать аккаунт» в верхней панели, укажите e-mail и пароль. В этом redesign-прототипе форма работает как демонстрационный сценарий.'],
['Как пополнить баланс?','Нажмите «Пополнить» в левом меню или центральную кнопку Deposit на мобильном. Откроется выбор метода и суммы.'],
['Где посмотреть историю операций?','Раздел «История» объединяет игры, Classic, пополнения, выводы и денежные дожди.'],
['Как активировать промокод?','Откройте «Промокод», введите код в поле и нажмите «Активировать». Для реального начисления требуется авторизация.'],
['Где находятся турниры?','В разделе «Турниры» доступны текущие события, таймеры, призовые фонды и общий лидерборд.'],
['Что такое The Trains!?','Это отдельный раздел розыгрышей: стримеры запускают «поезда», пользователи получают билеты до закрытия посадки.'],
['Как связаться с поддержкой?','Откройте «Поддержка» в меню или используйте кнопку на этой странице — появится форма обращения.'],
['Как работает ответственная игра?','Используйте лимиты, контролируйте расходы и время в игре. Если азарт начинает причинять вред, прекратите игру и обратитесь за профессиональной помощью.']
].map(([q,a],i)=>`<article class="faq-item ${i===0?'open':''}"><button class="faq-question">${q}<span>+</span></button><div class="faq-answer">${a}</div></article>`).join('')}</section></div>`}

function bindPageEvents(route){
  $$('.route-link').forEach(a=>a.onclick=e=>{const r=a.dataset.route;if(r){e.preventDefault();setRoute(r,true)}});
  $$('[data-route-card]').forEach(el=>el.onclick=()=>setRoute(el.dataset.routeCard,true));
  $$('[data-modal]').forEach(el=>el.onclick=()=>openModal(el.dataset.modal));
  $$('[data-chat-open]').forEach(el=>el.onclick=openChat);
  if(route==='casino') bindCasino();
  if(route==='wheel') bindWheel();
  if(route==='mines') bindMines();
  if(route==='classic') $$('[data-join-room]').forEach(b=>b.onclick=()=>openModal('login',{note:`Для входа в ${b.dataset.joinRoom} ROOM нужна авторизация.`}));
  if(route==='duels') $$('[data-duel-watch]').forEach(b=>b.onclick=()=>openModal('duelview',{index:+b.dataset.duelWatch}));
  if(route==='tournaments') $$('[data-tournament]').forEach(c=>c.onclick=()=>openModal('tournament',{index:+c.dataset.tournament}));
  if(route==='trains') $('[data-train-ticket]')?.addEventListener('click',()=>openModal('login',{note:'Войдите, чтобы получить билет на поезд.'}));
  if(route==='promo') $('#activatePromo')?.addEventListener('click',()=>{const v=$('#promoInput').value.trim();showToast(v?`Код ${v.toUpperCase()} проверен · требуется вход`:'Введите промокод')});
  if(route==='history') bindHistory();
  if(route==='help') $$('.faq-question').forEach(q=>q.onclick=()=>q.parentElement.classList.toggle('open'));
}

function bindCasino(){
  $('[data-scroll-games]')?.addEventListener('click',()=>$('#casinoGames').scrollIntoView({behavior:'smooth',block:'start'}));
  $$('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;refreshCasinoGames()});
  $$('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFavorite(b.dataset.fav);refreshCasinoGames()});
  $$('[data-game]').forEach(c=>c.onclick=()=>openGame(c.dataset.game));
  $('[data-reset-games]')?.addEventListener('click',()=>{state.filter='all';state.provider='all';refreshCasinoGames()});
  $('#providerSearch')?.addEventListener('input',e=>filterProviderChips(e.target.value));
  $$('.provider-chip').forEach(b=>b.onclick=()=>{state.provider=state.provider===b.dataset.provider?'all':b.dataset.provider;refreshCasinoGames();showToast(state.provider==='all'?'Фильтр провайдера сброшен':`Провайдер: ${state.provider}`)});
  $('[data-external="telegram"]')?.addEventListener('click',()=>window.open('https://t.me/','_blank','noopener'));
}
function refreshCasinoGames(){const wrap=$('#casinoGames');if(!wrap)return;wrap.innerHTML=casinoGameSection();bindCasino()}
function filterProviderChips(q){const s=q.toLowerCase();$$('.provider-chip').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(s)?'':'none')}
function toggleFavorite(id){state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);showToast(state.favorites.has(id)?'Добавлено в избранное':'Удалено из избранного')}
function openGame(id){const g=games.find(x=>x.id===id);if(g)openModal('game',{game:g})}

function bindWheel(){
  $$('[data-bet]').forEach(b=>b.onclick=()=>$('#wheelBet').value=b.dataset.bet);
  $('#spinWheel')?.addEventListener('click',()=>{
    const wheel=$('#wheel'),status=$('#wheelStatus'),btn=$('#spinWheel'); if(wheel.classList.contains('spinning'))return;
    const outcomes=['x2','x2','x3','x5','x2','x10','x2','x5','x30']; const result=outcomes[Math.floor(Math.random()*outcomes.length)];
    state.wheelTurns+=1440+Math.floor(Math.random()*720); wheel.classList.add('spinning'); wheel.style.transform=`rotate(${state.wheelTurns}deg)`; btn.disabled=true;status.textContent='Колесо вращается…';
    setTimeout(()=>{wheel.classList.remove('spinning');btn.disabled=false;status.textContent=`Результат демо-раунда: ${result}`; const h=$('#wheelHistory');h.insertAdjacentHTML('afterbegin',`<div class="history-row"><span>#${9313+state.wheelTurns}</span><b>${result}</b></div>`);showToast(`Wheel: ${result}`)},3250)
  })
}

function bindMines(){
  $('#newMines')?.addEventListener('click',()=>{newMines();renderRoute('mines')});
  $('#cashoutMines')?.addEventListener('click',()=>{if(state.mines.revealed.size===0)return showToast('Сначала откройте клетку');state.mines.ended=true;showToast(`Забрано ×${state.mines.multiplier.toFixed(2)} · демо`);setTimeout(()=>{newMines();renderRoute('mines')},700)});
  $$('.mine-cell').forEach(c=>c.onclick=()=>{
    const i=+c.dataset.cell,m=state.mines;if(m.ended||m.revealed.has(i))return;m.revealed.add(i);
    if(m.bombs.has(i)){c.classList.add('boom');c.textContent='✹';m.ended=true;$('#minesStatus').textContent='Мина. Демо-раунд завершён.';m.bombs.forEach(b=>{const cell=$(`[data-cell="${b}"]`);cell.classList.add('boom');cell.textContent='✹'});showToast('BOOM · демо-раунд завершён');return}
    c.classList.add('revealed');c.textContent='◆';m.multiplier=1+(.19*m.revealed.size)+(.03*m.revealed.size*m.revealed.size);$('#minesStatus').textContent=`Безопасно. Текущий множитель ×${m.multiplier.toFixed(2)}`;$('#minePotential').textContent=`${money(Math.round(100*m.multiplier))} ₽`;
  })
}

function bindHistory(){
  $$('[data-history-tab]').forEach(b=>b.onclick=()=>{$$('[data-history-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const map={games:['Игровая история','Войдите, чтобы увидеть последние игровые сессии, ставки и результаты.'],classic:['История Classic','Здесь появятся билеты, комнаты и результаты Classic.'],deposits:['История пополнений','Здесь будут отображаться входящие транзакции.'],withdraws:['История выводов','Здесь будут отображаться заявки и статусы вывода средств.'],rains:['История дождей','Здесь будут собраны полученные денежные дожди из чата.']};$('#historyContent').innerHTML=historyEmpty(...map[b.dataset.historyTab]);$$('[data-modal]').forEach(el=>el.onclick=()=>openModal(el.dataset.modal))})
}

function openModal(type,data={}){
  const layer=$('#modalLayer'),modal=$('#modalContent');
  const close=`<button class="modal-close" data-close-modal>×</button>`;
  if(type==='login') modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">ACCOUNT</span><h2>Войти в ZOOMA</h2></div>${close}</div>${data.note?`<p class="form-note" style="margin-top:-8px;margin-bottom:14px;color:#aab3b0">${data.note}</p>`:''}<div class="form-grid"><div class="field"><label>E-mail / Login</label><input placeholder="you@example.com"></div><div class="field"><label>Пароль</label><input type="password" placeholder="••••••••"></div></div><div class="modal-actions"><button class="btn primary full" data-demo-submit="Вход в demo выполнен">ВОЙТИ</button></div><p class="form-note">Это frontend-прототип: реальные учетные данные не отправляются.</p>`;
  else if(type==='register') modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">NEW PLAYER</span><h2>Создать аккаунт</h2></div>${close}</div><div class="form-grid"><div class="field"><label>E-mail</label><input type="email" placeholder="you@example.com"></div><div class="field"><label>Пароль</label><input type="password" placeholder="Минимум 8 символов"></div><div class="field"><label>Промокод</label><input placeholder="необязательно"></div></div><div class="modal-actions"><button class="btn primary full" data-demo-submit="Demo-аккаунт создан">ЗАРЕГИСТРИРОВАТЬСЯ</button></div><p class="form-note">18+. Играйте ответственно. Это демонстрационная форма без отправки данных.</p>`;
  else if(type==='deposit'||type==='withdraw') modal.innerHTML=paymentModal(type,close);
  else if(type==='support') modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">SUPPORT</span><h2>Связаться с поддержкой</h2></div>${close}</div><div class="form-grid"><div class="field"><label>Тема</label><input placeholder="Опишите вопрос кратко"></div><div class="field"><label>Сообщение</label><textarea placeholder="Расскажите подробнее…"></textarea></div></div><div class="modal-actions"><button class="btn primary full" data-demo-submit="Обращение сохранено в demo">ОТПРАВИТЬ</button></div><p class="form-note">В production эта форма подключается к реальному support API.</p>`;
  else if(type==='duel') modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">DUELS</span><h2>Создать дуэль</h2></div>${close}</div><div class="form-grid"><div class="field"><label>Игра</label><select><option>Wheel</option><option>Mines</option><option>Classic</option></select></div><div class="field"><label>Ставка</label><input value="500"></div><div class="field"><label>Соперник</label><input placeholder="Открытая дуэль"></div></div><div class="modal-actions"><button class="btn primary full" data-demo-submit="Дуэль создана в demo">СОЗДАТЬ</button></div>`;
  else if(type==='duelview') modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">LIVE DUEL</span><h2>Дуэль #${8400+(data.index||0)}</h2></div>${close}</div><div class="empty-state" style="min-height:260px"><div><div class="empty-icon">⚡</div><h3>Матч готов</h3><p>В production здесь открывается live-состояние выбранной дуэли.</p><button class="btn primary" data-demo-submit="Вы присоединились к demo-дуэли">Присоединиться</button></div></div>`;
  else if(type==='tournament'){const t=tournaments[data.index||0];modal.classList.add('large');modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">${t.type} · LIVE</span><h2>${t.name}</h2></div>${close}</div><div class="reward-value">${t.prize}</div><p class="form-note">Призовой фонд · ${t.players} игроков · до завершения ${t.ends}</p><div class="progress" style="margin:16px 0 22px"><i style="width:${t.progress}%"></i></div><div class="leaderboard"><div class="table-head"><span>#</span><span>Игрок</span><span>Score</span><span>Приз</span></div>${[['1','Maxima_Culpa 2','1 482 334','—'],['2','Alexander Y.','1 211 840','—'],['3','Ksenia K.','982 440','—']].map(r=>`<div class="table-row"><span class="rank">${r[0]}</span><strong>${r[1]}</strong><span>${r[2]}</span><span>${r[3]}</span></div>`).join('')}</div><div class="modal-actions"><button class="btn primary full" data-demo-submit="Турнир открыт в demo">УЧАСТВОВАТЬ</button></div>`}
  else if(type==='game'){const g=data.game;modal.classList.add('large');modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">${g.provider}</span><h2>${g.name}</h2></div>${close}</div><div class="game-preview" style="--g1:${g.g1};--g2:${g.g2}"><b>${g.symbol}</b></div><div class="game-info-grid"><div class="info-box"><small>Provider</small><b>${g.provider}</b></div><div class="info-box"><small>Mode</small><b>${g.type==='live'?'Live':'Slots'}</b></div></div><div class="modal-actions"><button class="btn soft" data-close-modal>Назад</button><button class="btn primary" data-demo-submit="Игра запущена в demo">ИГРАТЬ DEMO</button></div>`}
  else if(type==='history'){modal.innerHTML=`<div class="modal-head"><div><span class="eyebrow">WHEEL</span><h2>История раундов</h2></div>${close}</div><div class="history-list">${['x2','x5','x2','x10','x3','x2','x30'].map((x,i)=>`<div class="history-row"><span>#${9312-i}</span><b>${x}</b></div>`).join('')}</div>`}
  else return;
  layer.classList.add('open');layer.setAttribute('aria-hidden','false');
  bindModal();
}
function paymentModal(type,close){const dep=type==='deposit';return `<div class="modal-head"><div><span class="eyebrow">CASHIER</span><h2>${dep?'Пополнить баланс':'Вывести средства'}</h2></div>${close}</div><div class="method-grid"><button class="method active">BANK CARD</button><button class="method">SBP</button><button class="method">CRYPTO</button></div><div class="form-grid" style="margin-top:15px"><div class="field"><label>Сумма, ₽</label><input inputmode="decimal" value="${dep?'5000':'10000'}"></div>${dep?'':'<div class="field"><label>Реквизиты</label><input placeholder="Карта / кошелек"></div>'}</div><div class="modal-actions"><button class="btn primary full" data-demo-submit="${dep?'Пополнение':'Вывод'} подготовлено в demo">ПРОДОЛЖИТЬ</button></div><p class="form-note">Платежи не выполняются. Это демонстрация пользовательского сценария.</p>`}
function bindModal(){
  $$('[data-close-modal]').forEach(b=>b.onclick=closeModal);$$('.method').forEach(b=>b.onclick=()=>{$$('.method').forEach(x=>x.classList.remove('active'));b.classList.add('active')});$$('[data-demo-submit]').forEach(b=>b.onclick=()=>{showToast(b.dataset.demoSubmit);closeModal()})
}
function closeModal(){$('#modalLayer').classList.remove('open');$('#modalLayer').setAttribute('aria-hidden','true');$('#modalContent').classList.remove('large')}

function openChat(){$('#chatDrawer').classList.add('open')}
function closeChat(){$('#chatDrawer').classList.remove('open')}
function renderChat(){$('#chatMessages').innerHTML=chats.map(([av,n,role,msg])=>`<div class="chat-message"><div class="chat-avatar">${av}</div><div class="chat-text"><div><b>${n}</b><em>${role}</em></div><p>${msg}</p></div></div>`).join('')}

function bindGlobal(){
  $('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open');
  $('#chatToggle').onclick=openChat;$('#chatClose').onclick=closeChat;
  $('#mobileGames').onclick=()=>$('#mobileGamesSheet').classList.add('open');$('#mobileGamesClose').onclick=()=>$('#mobileGamesSheet').classList.remove('open');
  $('#mobileGamesSheet').addEventListener('click',e=>{if(e.target.id==='mobileGamesSheet')$('#mobileGamesSheet').classList.remove('open')});
  $('#soundToggle').onclick=()=>{state.sound=!state.sound;$('#soundState').textContent=state.sound?'ON':'OFF';showToast(`Звук ${state.sound?'включён':'выключен'}`)};
  $$('[data-modal]').forEach(el=>el.onclick=()=>openModal(el.dataset.modal));
  $$('.route-link').forEach(a=>a.onclick=e=>{if(a.dataset.route){e.preventDefault();setRoute(a.dataset.route,true)}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeChat();$('#sidebar').classList.remove('open');$('#mobileGamesSheet').classList.remove('open')}if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&innerWidth>820){e.preventDefault();$('#globalSearch').focus()}});
  const search=$('#globalSearch'),results=$('#searchResults');
  search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();if(!q)return results.classList.remove('show');const routeResults=Object.entries(routes).filter(([,v])=>v.label.toLowerCase().includes(q)).map(([id,v])=>({kind:'route',id,title:v.label,sub:'Раздел',icon:v.icon}));const gameResults=games.filter(g=>(g.name+' '+g.provider).toLowerCase().includes(q)).slice(0,5).map(g=>({kind:'game',id:g.id,title:g.name,sub:g.provider,icon:g.symbol}));const found=[...routeResults,...gameResults].slice(0,7);results.innerHTML=found.length?found.map(x=>`<button class="search-result" data-search-kind="${x.kind}" data-search-id="${x.id}"><i>${x.icon}</i><span>${x.title}<small>${x.sub}</small></span></button>`).join(''):`<button class="search-result"><i>⌕</i><span>Ничего не найдено<small>Попробуйте другой запрос</small></span></button>`;results.classList.add('show');$$('[data-search-kind]').forEach(b=>b.onclick=()=>{results.classList.remove('show');search.value='';b.dataset.searchKind==='route'?setRoute(b.dataset.searchId,true):openGame(b.dataset.searchId)})});
  document.addEventListener('click',e=>{if(!e.target.closest('.global-search-wrap'))results.classList.remove('show')});
}

window.addEventListener('hashchange',()=>setRoute(location.hash.slice(1)||'casino'));
renderChat();bindGlobal();setRoute(location.hash.slice(1)||'casino');
