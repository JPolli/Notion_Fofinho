/**
 * moon.js
 * Calcula e renderiza as fases da lua.
 */

const MOON = (() => {
  const INK    = '#3a5c35';
  const STROKE = '#5a7f55';
  const SW     = 1;

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

  const KNOWN_NEW_MOON = new Date(2000, 0, 6); // 6 jan 2000
  const CYCLE = 29.53058867;

  /**
   * Retorna o objeto de fase { key, name } para uma data.
   */
  function getPhase(year, month, day) {
    const diff = (new Date(year, month, day) - KNOWN_NEW_MOON) / 864e5;
    const phase = ((diff % CYCLE) + CYCLE) % CYCLE;
    return PHASES.find(p => phase < p.max) || PHASES[PHASES.length - 1];
  }

  /**
   * Retorna true se a fase mudou em relação ao dia anterior.
   */
  function isPhaseChange(year, month, day) {
    return getPhase(year, month, day).key !== getPhase(year, month, day - 1).key;
  }

  /**
   * Gera o SVG minimalista da fase lunar (estilo referência: círculo c/ parte iluminada sólida).
   */
  function svg(phase, size) {
    const s = size || 13;
    const r = s / 2;
    const R = r - SW / 2 - 0.3;

    if (phase === 'new') {
      return `<svg class="moon-svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">
        <circle cx="${r}" cy="${r}" r="${R}" fill="${INK}"/>
      </svg>`;
    }

    if (phase === 'full') {
      return `<svg class="moon-svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">
        <circle cx="${r}" cy="${r}" r="${R}" fill="none" stroke="${STROKE}" stroke-width="${SW}"/>
      </svg>`;
    }

    const map = {
      waxing_crescent: { ill: 0.25, wax: true  },
      waxing_quarter:  { ill: 0.50, wax: true  },
      waxing_gibbous:  { ill: 0.75, wax: true  },
      waning_gibbous:  { ill: 0.75, wax: false },
      waning_quarter:  { ill: 0.50, wax: false },
      waning_crescent: { ill: 0.25, wax: false },
    };

    const { ill, wax } = map[phase];
    const ex   = R * (1 - 2 * ill);
    const aex  = Math.abs(ex);
    const sArc = wax ? 0 : 1;
    const sEll = wax ? 1 : 0;
    const top  = `${r} ${r - R}`;
    const bot  = `${r} ${r + R}`;
    const path = `M ${top} A ${R} ${R} 0 0 ${sArc} ${bot} A ${aex} ${R} 0 0 ${sEll} ${top} Z`;

    return `<svg class="moon-svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" aria-hidden="true">
      <circle cx="${r}" cy="${r}" r="${R}" fill="none" stroke="${STROKE}" stroke-width="${SW}"/>
      <path d="${path}" fill="${INK}"/>
    </svg>`;
  }

  return { getPhase, isPhaseChange, svg };
})();
