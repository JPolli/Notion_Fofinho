/**
 * moon.js — Cálculo e SVG das fases lunares.
 */
const MOON = (() => {
  const INK = '#3a5c35', STROKE = '#5a7f55', SW = 0.9;
  const CYCLE = 29.53058867;
  const KNOWN = new Date(2000, 0, 6);

  const PHASES = [
    { max: 1.85,  key: 'new',             name: 'Lua nova' },
    { max: 7.38,  key: 'waxing_crescent', name: 'Crescente' },
    { max: 9.22,  key: 'waxing_quarter',  name: 'Quarto crescente' },
    { max: 14.77, key: 'waxing_gibbous',  name: 'Gibosa crescente' },
    { max: 16.61, key: 'full',            name: 'Lua cheia' },
    { max: 22.15, key: 'waning_gibbous',  name: 'Gibosa minguante' },
    { max: 23.99, key: 'waning_quarter',  name: 'Quarto minguante' },
    { max: 29.53, key: 'waning_crescent', name: 'Minguante' },
  ];

  function getPhase(year, month, day) {
    const diff = (new Date(year, month, day) - KNOWN) / 864e5;
    const phase = ((diff % CYCLE) + CYCLE) % CYCLE;
    return PHASES.find(p => phase < p.max) || PHASES[PHASES.length - 1];
  }

  function isPhaseChange(year, month, day) {
    return getPhase(year, month, day).key !== getPhase(year, month, day - 1).key;
  }

  function svg(phase, size) {
    const s = size || 10, r = s / 2, R = r - SW / 2 - 0.2;
    if (phase === 'new')
      return `<svg class="moon-svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><circle cx="${r}" cy="${r}" r="${R}" fill="${INK}"/></svg>`;
    if (phase === 'full')
      return `<svg class="moon-svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><circle cx="${r}" cy="${r}" r="${R}" fill="none" stroke="${STROKE}" stroke-width="${SW}"/></svg>`;
    const map = {
      waxing_crescent:{ill:.25,wax:true}, waxing_quarter:{ill:.5,wax:true}, waxing_gibbous:{ill:.75,wax:true},
      waning_gibbous:{ill:.75,wax:false}, waning_quarter:{ill:.5,wax:false}, waning_crescent:{ill:.25,wax:false},
    };
    const { ill, wax } = map[phase];
    const ex = R * (1 - 2 * ill), aex = Math.abs(ex);
    const sA = wax ? 0 : 1, sE = wax ? 1 : 0;
    const t = `${r} ${r - R}`, b = `${r} ${r + R}`;
    return `<svg class="moon-svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <circle cx="${r}" cy="${r}" r="${R}" fill="none" stroke="${STROKE}" stroke-width="${SW}"/>
      <path d="M ${t} A ${R} ${R} 0 0 ${sA} ${b} A ${aex} ${R} 0 0 ${sE} ${t} Z" fill="${INK}"/>
    </svg>`;
  }

  return { getPhase, isPhaseChange, svg };
})();
