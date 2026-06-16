/**
 * holidays.js — Feriados nacionais do Brasil.
 */
const HOLIDAYS = (() => {
  function easter(y) {
    const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;
    return new Date(y, mo-1, da);
  }
  const fmt = d => `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const add = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return fmt(x); };

  function getYear(year) {
    const e = easter(year);
    return {
      '01-01':'Ano Novo', [add(e,-48)]:'Carnaval', [add(e,-47)]:'Carnaval',
      [add(e,-2)]:'Sexta-feira Santa', [fmt(e)]:'Páscoa', [add(e,60)]:'Corpus Christi',
      '04-21':'Tiradentes', '05-01':'Dia do Trabalho', '09-07':'Independência',
      '10-12':'N. Sra. Aparecida', '11-02':'Finados', '11-15':'Proclamação da República',
      '11-20':'Consciência Negra', '12-25':'Natal',
    };
  }

  function get(year, month, day) {
    const key = `${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return getYear(year)[key] || null;
  }

  function countInMonth(year, month) {
    const prefix = String(month+1).padStart(2,'0') + '-';
    return Object.keys(getYear(year)).filter(k => k.startsWith(prefix)).length;
  }

  return { get, countInMonth };
})();
