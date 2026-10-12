// Вся графика сайта — SVG, генерируемый кодом: ничего не нужно скачивать, ничего не весит.
let uid = 0;

function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stars(seed, n, x0, y0, w, h) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = (x0 + r() * w).toFixed(1), y = (y0 + r() * h).toFixed(1);
    out += `<circle cx="${x}" cy="${y}" r="${(0.5 + r() * 1.1).toFixed(2)}" opacity="${(0.35 + r() * 0.6).toFixed(2)}"/>`;
  }
  return `<g fill="#fff">${out}</g>`;
}

// Логотип-знак: арка-портал со светом внутри.
export function logoMark() {
  return `<svg class="logo__mark" viewBox="0 0 24 28" width="22" height="26" aria-hidden="true" focusable="false">
<defs><linearGradient id="lm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F5D49B"/><stop offset="1" stop-color="#D8AA60"/></linearGradient></defs>
<path d="M3 27V9.5C3 5 7 1.5 12 1.5s9 3.5 9 8V27" fill="none" stroke="url(#lm)" stroke-width="2.2" stroke-linecap="round"/>
<path d="M8 27V11.5c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8V27z" fill="url(#lm)" opacity=".28"/></svg>`;
}

// Дверь-портал для главного экрана.
export function portal() {
  const id = `p${++uid}`;
  return `<svg class="portal" viewBox="0 0 520 660" role="img" aria-label="Светящаяся золотая дверь, за которой ночная дорога под звёздным небом">
<defs>
<linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F5D49B"/><stop offset=".55" stop-color="#E4B66F"/><stop offset="1" stop-color="#B98744"/></linearGradient>
<linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030610"/><stop offset=".6" stop-color="#101c36"/><stop offset="1" stop-color="#27385a"/></linearGradient>
<linearGradient id="${id}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3550"/><stop offset="1" stop-color="#0a101d"/></linearGradient>
<linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F5D49B" stop-opacity=".9"/><stop offset="1" stop-color="#D8AA60" stop-opacity="0"/></linearGradient>
<radialGradient id="${id}h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd9a0"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>
<clipPath id="${id}c"><polygon points="118,128 330,92 330,518 118,528"/></clipPath>
<filter id="${id}g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>
</defs>
<polygon points="92,104 352,60 352,540 92,552" fill="#D8AA60" opacity=".55" filter="url(#${id}g)"/>
<polygon points="118,528 330,518 520,650 360,660" fill="url(#${id}b)" opacity=".35" filter="url(#${id}g)"/>
<g clip-path="url(#${id}c)">
<rect x="100" y="80" width="250" height="470" fill="url(#${id}s)"/>
${stars('portal', 46, 118, 92, 212, 250)}
<path d="M118 372 Q170 346 220 366 T330 352 V528 H118Z" fill="#0a1020"/>
<path d="M118 404 Q190 380 250 396 T330 388 V528 H118Z" fill="#070b16"/>
<polygon points="214,396 232,396 330,522 118,528" fill="url(#${id}r)"/>
<g stroke="#8d93a8" stroke-width="2" opacity=".7"><line x1="223" y1="402" x2="224" y2="414"/><line x1="224" y1="426" x2="226" y2="446"/><line x1="226" y1="462" x2="229" y2="492"/></g>
<circle cx="271" cy="394" r="16" fill="url(#${id}h)"/><circle cx="271" cy="394" r="2.4" fill="#fff2d6"/>
</g>
<polygon points="92,104 352,60 352,540 92,552 92,104 118,128 118,528 330,518 330,92 118,128" fill="url(#${id}f)" fill-rule="evenodd"/>
<polygon points="92,104 352,60 330,92 118,128" fill="#fff" opacity=".28"/>
<polyline points="118,528 330,518 520,650" fill="none" stroke="#F5D49B" stroke-width="2" opacity=".85"/>
</svg>`;
}

const PALETTE = {
  road: ['#050a1c', '#1d2b49', '#F5D49B'],
  door: ['#0a0f20', '#2d2142', '#D8AA60'],
  train: ['#04101a', '#12303f', '#9fd8e8'],
  city: ['#0b0b1e', '#2c2250', '#f2a7c3'],
  island: ['#06142a', '#0f4a5e', '#bfe9d6'],
  letter: ['#0b0a1f', '#22254a', '#c9b8ff'],
};

const MOTIFS = {
  road: (a, id, r) => `<circle cx="470" cy="104" r="62" fill="url(#${id}h)"/><circle cx="470" cy="104" r="26" fill="#f6ead0" opacity=".92"/>
<path d="M0 238 Q120 196 250 226 T460 214 T640 232 V400 H0Z" fill="#090e1c"/>
<polygon points="304,232 336,232 560,400 80,400" fill="#0e1527"/>
<g stroke="#9aa1b8" stroke-width="3" opacity=".6"><line x1="320" y1="240" x2="320" y2="252"/><line x1="320" y1="266" x2="320" y2="290"/><line x1="320" y1="312" x2="320" y2="352"/></g>
<circle cx="320" cy="232" r="22" fill="url(#${id}h)"/><circle cx="320" cy="232" r="3" fill="#fff4dc"/>`,
  door: (a, id) => `<polygon points="210,320 430,320 600,400 120,400" fill="url(#${id}h)" opacity=".5"/>
<rect x="246" y="86" width="148" height="238" rx="3" fill="url(#${id}h)" opacity=".55"/>
<path d="M240 324V84h160v240h-16V100H256v224z" fill="${a}"/>
<rect x="256" y="100" width="128" height="224" fill="${a}" opacity=".16"/>
<circle cx="366" cy="214" r="4" fill="${a}"/>`,
  train: (a, id) => `<circle cx="320" cy="196" r="70" fill="url(#${id}h)"/><circle cx="320" cy="196" r="5" fill="#fff"/>
<g stroke="${a}" stroke-width="3" opacity=".7"><line x1="320" y1="200" x2="170" y2="400"/><line x1="320" y1="200" x2="470" y2="400"/></g>
<g stroke="#8fb4c4" stroke-width="3" opacity=".45"><line x1="304" y1="226" x2="338" y2="226"/><line x1="290" y1="250" x2="352" y2="250"/><line x1="270" y1="282" x2="372" y2="282"/><line x1="242" y1="322" x2="400" y2="322"/><line x1="206" y1="370" x2="436" y2="370"/></g>
<rect x="0" y="212" width="640" height="3" fill="#0a1a24" opacity=".0"/>`,
  city: (a, id, r) => {
    let b = '', win = '', x = 0;
    while (x < 640) {
      const w = 40 + Math.floor(r() * 50), h = 90 + Math.floor(r() * 150);
      b += `<rect x="${x}" y="${400 - h}" width="${w - 3}" height="${h}" fill="#0b0a1c"/>`;
      for (let wy = 400 - h + 14; wy < 392; wy += 22) for (let wx = x + 8; wx < x + w - 14; wx += 16)
        if (r() > 0.62) win += `<rect x="${wx}" y="${wy}" width="6" height="9" fill="${a}" opacity="${(0.4 + r() * 0.5).toFixed(2)}"/>`;
      x += w;
    }
    let rain = '';
    for (let i = 0; i < 40; i++) { const rx = Math.floor(r() * 640), ry = Math.floor(r() * 360); rain += `<line x1="${rx}" y1="${ry}" x2="${rx - 8}" y2="${ry + 22}"/>`; }
    return `<circle cx="150" cy="110" r="70" fill="url(#${id}h)" opacity=".5"/>${b}${win}<g stroke="#b7c6ff" stroke-width="1" opacity=".28">${rain}</g>`;
  },
  island: (a, id) => `<circle cx="320" cy="130" r="86" fill="url(#${id}h)"/><circle cx="320" cy="130" r="42" fill="#f2f6e6" opacity=".92"/>
<rect x="0" y="262" width="640" height="138" fill="#06222f"/>
<ellipse cx="320" cy="264" rx="104" ry="24" fill="#05161d"/><polygon points="330,200 310,262 350,262" fill="#05161d"/>
<g stroke="${a}" stroke-width="2" fill="none" opacity=".35"><path d="M60 300q20-8 40 0t40 0"/><path d="M380 330q20-8 40 0t40 0"/><path d="M200 360q20-8 40 0t40 0"/><path d="M290 296q12-6 24 0t24 0"/></g>
<rect x="296" y="274" width="48" height="110" fill="url(#${id}h)" opacity=".35"/>`,
  letter: (a, id) => `<circle cx="320" cy="200" r="140" fill="url(#${id}h)" opacity=".7"/>
<rect x="232" y="152" width="176" height="116" rx="8" fill="#12122e" stroke="${a}" stroke-width="3"/>
<polyline points="232,158 320,224 408,158" fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="320" cy="232" r="9" fill="${a}"/>`,
};

export function cover(motif, { variant = 0, label = '', seed = motif } = {}) {
  const [top, bottom, accent] = PALETTE[motif] || PALETTE.door;
  const id = `a${++uid}`;
  const box = ['0 0 640 400', '70 44 500 312', '150 90 360 225'][variant] || '0 0 640 400';
  const hue = variant * 22;
  const r = rng(seed + variant);
  const draw = (MOTIFS[motif] || MOTIFS.door)(accent, id, r);
  return `<svg class="art" viewBox="${box}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" style="filter:hue-rotate(${hue}deg)">
<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>
<radialGradient id="${id}h"><stop offset="0" stop-color="${accent}" stop-opacity=".9"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient></defs>
<rect width="640" height="400" fill="url(#${id}s)"/>${stars(seed + variant, 40, 0, 0, 640, 220)}${draw}</svg>`;
}
