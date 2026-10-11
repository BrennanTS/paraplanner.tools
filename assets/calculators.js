const $ = id => document.getElementById(id);
const num = id => parseFloat($(id).value) || 0;
const usd = n => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// IRS Uniform Lifetime Table (effective 2022+), ages 72–120.
const ULT = {
  72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
  80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4,
  88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
  96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0, 102: 5.6, 103: 5.2,
  104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4,
  112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5, 119: 2.3, 120: 2.0
};

function rmd() {
  const bal = num("rmd-bal");
  const age = Math.round(num("rmd-age"));
  if (age < 73) {
    $("rmd-out").innerHTML = `<span class="big">$0</span><span class="note">No RMD yet. RMDs start at 73 (75 for those born 1960 or later).</span>`;
    return;
  }
  const factor = ULT[Math.min(age, 120)];
  $("rmd-out").innerHTML = `<span class="big">${usd(bal / factor)}</span>
    <span class="note">Divisor ${factor} at age ${age} · ${(100 / factor).toFixed(2)}% of balance</span>`;
}

function projection() {
  const pv = num("fv-pv"), pmt = num("fv-pmt"), n = num("fv-n");
  const r = num("fv-r") / 100, inf = num("fv-i") / 100;
  const growth = Math.pow(1 + r, n);
  const fv = pv * growth + (r === 0 ? pmt * n : pmt * (growth - 1) / r);
  const real = fv / Math.pow(1 + inf, n);
  const contributed = pv + pmt * n;
  $("fv-out").innerHTML = `<span class="big">${usd(fv)}</span>
    <span class="note">${usd(real)} in today's dollars · ${usd(contributed)} contributed · ${usd(fv - contributed)} growth</span>`;
}

// 2026 federal ordinary income brackets (Rev. Proc. 2025-32). Upper bound of each bracket.
const BRACKETS = {
  single: [[12400, .10], [50400, .12], [105700, .22], [201775, .24], [256225, .32], [640600, .35], [Infinity, .37]],
  mfj: [[24800, .10], [100800, .12], [211400, .22], [403550, .24], [512450, .32], [768700, .35], [Infinity, .37]]
};

function bracket() {
  const table = BRACKETS[$("tx-status").value];
  const inc = num("tx-inc");
  let tax = 0, lower = 0, current = null;
  for (const [upper, rate] of table) {
    tax += Math.max(0, Math.min(inc, upper) - lower) * rate;
    if (!current && inc < upper) current = { upper, rate };
    lower = upper;
  }
  const room = current.upper - inc;
  $("tx-out").innerHTML = `<span class="big">${room === Infinity ? "Top bracket" : usd(room)}</span>
    <span class="note">${room === Infinity ? "Already in the 37% bracket" : `of room left in the ${current.rate * 100}% bracket`}
    · est. federal tax ${usd(tax)} · effective ${inc ? (tax / inc * 100).toFixed(1) : "0.0"}%</span>`;

  let lo = 0;
  $("tx-table").innerHTML = `<tr><th>Rate</th><th class="num">From</th><th class="num">To</th></tr>` +
    table.map(([upper, rate]) => {
      const active = rate === current.rate ? ' style="color:var(--cyan)"' : "";
      const row = `<tr${active}><td>${rate * 100}%</td><td class="num">${usd(lo)}</td><td class="num">${upper === Infinity ? "—" : usd(upper)}</td></tr>`;
      lo = upper;
      return row;
    }).join("");
}

document.querySelectorAll("input, select").forEach(el => el.addEventListener("input", () => { rmd(); projection(); bracket(); }));
rmd(); projection(); bracket();
