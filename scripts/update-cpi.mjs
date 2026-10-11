// Recomputes 30-year annualized CPI-U inflation from the BLS API and writes it into assets/assumptions.js.
import { readFileSync, writeFileSync } from "node:fs";

const SERIES = "CUUR0000SA0";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const now = new Date().getFullYear();
const values = new Map();

// The keyless BLS API allows 10 years per request.
for (let start = now - 31; start <= now; start += 10) {
  const res = await fetch("https://api.bls.gov/publicAPI/v2/timeseries/data/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seriesid: [SERIES], startyear: String(start), endyear: String(Math.min(start + 9, now)) })
  });
  const json = await res.json();
  if (json.status !== "REQUEST_SUCCEEDED") throw new Error(json.message?.join(" ") || json.status);
  for (const row of json.Results.series[0].data) {
    const v = parseFloat(row.value);
    if (/^M(0[1-9]|1[0-2])$/.test(row.period) && !isNaN(v)) values.set(`${row.year}-${row.period.slice(1)}`, v);
  }
}

const latest = [...values.keys()].sort().at(-1);
const [y, m] = latest.split("-");
const base = `${+y - 30}-${m}`;
if (!values.has(base)) throw new Error(`Missing base month ${base}`);
const rate = (Math.pow(values.get(latest) / values.get(base), 1 / 30) - 1) * 100;
const label = yr => `${MONTHS[+m - 1]} ${yr}`;

const file = "assets/assumptions.js";
const src = readFileSync(file, "utf8")
  .replace(/rate: [\d.]+/, `rate: ${rate.toFixed(2)}`)
  .replace(/from: "[^"]*"/, `from: "${label(+y - 30)}"`)
  .replace(/to: "[^"]*"/, `to: "${label(y)}"`);
writeFileSync(file, src);
console.log(`30-year CPI-U: ${rate.toFixed(2)}% (${label(+y - 30)} – ${label(y)})`);
