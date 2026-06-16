/**
 * holidays.js
 * Feriados nacionais do Brasil — fixos e móveis (via Páscoa).
 */

const HOLIDAYS = (() => {

  /** Algoritmo de Computus — retorna a Páscoa de um dado ano. */
  function easter(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day   = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
  }

  /** Formata Date → "MM-DD". */
  function fmt(date) {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${m}-${d}`;
  }

  /** Adiciona N dias a uma Date e retorna "MM-DD". */
  function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return fmt(d);
  }

  /**
   * Retorna um objeto { "MM-DD": "Nome do feriado" } para o ano dado.
   */
  function getYear(year) {
    const e = easter(year);
    return {
      '01-01': 'Ano Novo',
      [addDays(e, -48)]: 'Carnaval',
      [addDays(e, -47)]: 'Carnaval',
      [addDays(e,  -2)]: 'Sexta-feira Santa',
      [fmt(e)]:          'Páscoa',
      [addDays(e,  60)]: 'Corpus Christi',
      '04-21': 'Tiradentes',
      '05-01': 'Dia do Trabalho',
      '09-07': 'Independência',
      '10-12': 'N. Sra. Aparecida',
      '11-02': 'Finados',
      '11-15': 'Proclamação da República',
      '11-20': 'Consciência Negra',
      '12-25': 'Natal',
    };
  }

  /**
   * Retorna o nome do feriado para um dia específico, ou null.
   * @param {number} year
   * @param {number} month  — 0-indexed
   * @param {number} day
   */
  function get(year, month, day) {
    const key = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getYear(year)[key] || null;
  }

  /**
   * Conta feriados de um mês (0-indexed).
   */
  function countInMonth(year, month) {
    const prefix = String(month + 1).padStart(2, '0') + '-';
    return Object.keys(getYear(year)).filter(k => k.startsWith(prefix)).length;
  }

  return { get, countInMonth };
})();
