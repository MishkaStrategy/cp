const dynamicView=document.getElementById('view');

dynamicView.addEventListener('click',event=>{
  const routeLink=event.target.closest('.route-link[data-route]');
  if(routeLink){
    event.preventDefault();
    navigate(routeLink.dataset.route);
    return;
  }

  const reset=event.target.closest('[data-reset]');
  if(reset){
    state.filter='all';
    state.provider='all';
    renderRoute('casino');
    toast('Фильтры сброшены');
  }
});
