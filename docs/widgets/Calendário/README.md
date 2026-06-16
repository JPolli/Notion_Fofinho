# 🌿 Calendário Lunar

Calendário estático com feriados nacionais do Brasil e fases da lua — pronto para embedar no Notion.

## Funcionalidades

- Navegação dinâmica por mês e ano
- Feriados nacionais brasileiros (fixos e móveis via algoritmo de Páscoa)
- Fases da lua calculadas astronomicamente — ícones SVG minimalistas
- Ícones lunares aparecem apenas nos dias de mudança de fase
- Barra de informações atualiza ao passar o mouse sobre qualquer dia
- Tema em verde sage `#ACBDA1`

## Estrutura

```
calendario-lunar/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── moon.js       # Cálculo e SVG das fases lunares
│   ├── holidays.js   # Feriados nacionais do Brasil
│   └── calendar.js   # Renderização e interação
└── README.md
```

## Como usar

### Localmente
Abra `index.html` direto no navegador — nenhuma dependência externa.

### GitHub Pages
1. Suba a pasta no repositório
2. Vá em **Settings → Pages → Source: main / root**
3. Copie a URL gerada (ex: `https://seu-user.github.io/calendario-lunar/`)

### Embedar no Notion
1. Publique via GitHub Pages (passo acima)
2. No Notion, digite `/embed`
3. Cole a URL do GitHub Pages
4. Redimensione o bloco conforme preferir

## Feriados incluídos

| Data | Feriado |
|------|---------|
| 1 jan | Ano Novo |
| Móvel | Carnaval (2 dias) |
| Móvel | Sexta-feira Santa |
| Móvel | Páscoa |
| 21 abr | Tiradentes |
| 1 mai | Dia do Trabalho |
| Móvel | Corpus Christi |
| 7 set | Independência |
| 12 out | N. Sra. Aparecida |
| 2 nov | Finados |
| 15 nov | Proclamação da República |
| 20 nov | Consciência Negra |
| 25 dez | Natal |
