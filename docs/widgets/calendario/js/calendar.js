/**
 * calendar.js — Renderização e interação do calendário.
 */
const CALENDAR = (() => {
  const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const DAY_NAMES = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

  const today = new Date();
  let cY = today.getFullYear(), cM = today.getMonth(), sel = today.getDate();

  const grid     = document.getElementById('days-grid');
  const titleEl  = document.getElementById('cal-title');
  const subEl    = document.getElementById('cal-subtitle');
  const infoLeft = document.getElementById('info-left');
  const infoRight= document.getElementById('info-right');

  function updateBar(d) {
    const phase = MOON.getPhase(cY, cM, d);
    const hol   = HOLIDAYS.get(cY, cM, d);
    const dow   = new Date(cY, cM, d).getDay();
    let left = MOON.svg(phase.key, 10) + `<span>${phase.name}</span>`;
    if (hol) left += `<span class="hbadge"><span class="hbadge-dot"></span><span class="hbadge-label">${hol}</span></span>`;
    infoLeft.innerHTML   = left;
    infoRight.textContent = `${DAY_NAMES[dow]}, ${d} de ${MONTHS[cM]}`;
  }

  function render() {
    const first = new Date(cY, cM, 1).getDay();
    const dim   = new Date(cY, cM+1, 0).getDate();
    const isTM  = cY === today.getFullYear() && cM === today.getMonth();

    titleEl.textContent = `${MONTHS[cM]} ${cY}`;
    const hc = HOLIDAYS.countInMonth(cY, cM);
    subEl.textContent = hc ? `${hc} feriado${hc>1?'s':''} este mês` : 'Sem feriados este mês';

    sel = isTM ? today.getDate() : 1;
    grid.innerHTML = '';

    for (let i = 0; i < first; i++) {
      const e = document.createElement('div'); e.className = 'day-cell empty'; grid.appendChild(e);
    }

    for (let d = 1; d <= dim; d++) {
      const cell = document.createElement('div');
      const dow  = (first + d - 1) % 7;
      const cls  = ['day-cell'];
      if (isTM && d === today.getDate()) cls.push('today');
      if (dow === 0 || dow === 6)        cls.push('weekend');
      if (d === sel)                     cls.push('selected');
      cell.className = cls.join(' ');

      const n = document.createElement('div'); n.className = 'day-num'; n.textContent = d; cell.appendChild(n);

      if (MOON.isPhaseChange(cY, cM, d)) {
        cell.insertAdjacentHTML('beforeend', MOON.svg(MOON.getPhase(cY, cM, d).key, 10));
      }

      if (HOLIDAYS.get(cY, cM, d)) {
        const dot = document.createElement('div'); dot.className = 'holiday-dot'; cell.appendChild(dot);
      }

      cell.addEventListener('click', () => {
        document.querySelectorAll('.day-cell.selected').forEach(e => e.classList.remove('selected'));
        cell.classList.add('selected'); sel = d; updateBar(d);
      });

      grid.appendChild(cell);
    }
    updateBar(sel);
  }

  document.getElementById('prev-btn').addEventListener('click', () => { cM--; if(cM<0){cM=11;cY--;} render(); });
  document.getElementById('next-btn').addEventListener('click', () => { cM++; if(cM>11){cM=0;cY++;} render(); });
  render();
})();
