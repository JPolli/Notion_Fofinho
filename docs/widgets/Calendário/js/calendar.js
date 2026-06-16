/**
 * calendar.js
 * Renderiza o calendário dinâmico com fases lunares e feriados nacionais.
 * Depende de moon.js e holidays.js.
 */

const CALENDAR = (() => {
  const MONTHS = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
  ];
  const DAY_NAMES = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

  const today = new Date();
  let curYear  = today.getFullYear();
  let curMonth = today.getMonth();
  let selectedDay = today.getDate();

  /* ── DOM refs ─────────────────────────────────── */
  const grid      = document.getElementById('days-grid');
  const titleEl   = document.getElementById('cal-title');
  const subtitleEl= document.getElementById('cal-subtitle');
  const infoLeft  = document.getElementById('info-left');
  const infoRight = document.getElementById('info-right');

  /* ── Info bar ─────────────────────────────────── */
  function updateInfoBar(day) {
    const phase   = MOON.getPhase(curYear, curMonth, day);
    const holiday = HOLIDAYS.get(curYear, curMonth, day);
    const dow     = new Date(curYear, curMonth, day).getDay();

    let leftHTML = MOON.svg(phase.key, 14) + `<span>${phase.name}</span>`;

    if (holiday) {
      leftHTML += `
        <span class="holiday-badge">
          <span class="holiday-badge-dot"></span>
          <span class="holiday-badge-label">${holiday}</span>
        </span>`;
    }

    infoLeft.innerHTML  = leftHTML;
    infoRight.textContent = `${DAY_NAMES[dow]}, ${day} de ${MONTHS[curMonth]}`;
  }

  /* ── Render ───────────────────────────────────── */
  function render() {
    const firstDay    = new Date(curYear, curMonth, 1).getDay();
    const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
    const isThisMonth = curYear === today.getFullYear() && curMonth === today.getMonth();

    /* Header */
    titleEl.textContent = `${MONTHS[curMonth]} ${curYear}`;
    const hcount = HOLIDAYS.countInMonth(curYear, curMonth);
    subtitleEl.textContent = hcount
      ? `${hcount} feriado${hcount > 1 ? 's' : ''} este mês`
      : 'Sem feriados este mês';

    /* Reset selected day when navigating */
    selectedDay = isThisMonth ? today.getDate() : 1;

    grid.innerHTML = '';

    /* Empty cells before day 1 */
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      grid.appendChild(empty);
    }

    /* Day cells */
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      const dow  = (firstDay + d - 1) % 7;

      const classes = ['day-cell'];
      if (isThisMonth && d === today.getDate()) classes.push('today');
      if (dow === 0 || dow === 6)               classes.push('weekend');
      if (d === selectedDay)                    classes.push('selected');
      cell.className = classes.join(' ');

      /* Day number */
      const numEl = document.createElement('div');
      numEl.className   = 'day-num';
      numEl.textContent = d;
      cell.appendChild(numEl);

      /* Moon icon — only on phase-change days */
      if (MOON.isPhaseChange(curYear, curMonth, d)) {
        const phase = MOON.getPhase(curYear, curMonth, d);
        cell.insertAdjacentHTML('beforeend', MOON.svg(phase.key, 13));
      }

      /* Holiday marker */
      const holiday = HOLIDAYS.get(curYear, curMonth, d);
      if (holiday) {
        const dot = document.createElement('div');
        dot.className = 'holiday-dot';
        cell.appendChild(dot);

        const label = document.createElement('div');
        label.className   = 'holiday-name';
        label.textContent = holiday;
        cell.appendChild(label);
      }

      /* Hover → update info bar */
      cell.addEventListener('mouseenter', () => {
        document.querySelectorAll('.day-cell.selected')
          .forEach(el => el.classList.remove('selected'));
        cell.classList.add('selected');
        selectedDay = d;
        updateInfoBar(d);
      });

      grid.appendChild(cell);
    }

    /* Initial info bar state */
    updateInfoBar(selectedDay);
  }

  /* ── Navigation ───────────────────────────────── */
  document.getElementById('prev-btn').addEventListener('click', () => {
    curMonth--;
    if (curMonth < 0) { curMonth = 11; curYear--; }
    render();
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    curMonth++;
    if (curMonth > 11) { curMonth = 0; curYear++; }
    render();
  });

  /* ── Init ─────────────────────────────────────── */
  render();
})();
