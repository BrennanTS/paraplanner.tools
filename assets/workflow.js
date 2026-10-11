const $ = id => document.getElementById(id);
const usd = n => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// 2026 limits (IRS Notice 2025-67).
const LIMITS = [
  { name: "401(k) / 403(b) / 457(b) / TSP", base: 24500, catch50: 8000, catch60: 11250 },
  { name: "Traditional / Roth IRA", base: 7500, catch50: 1100, catch60: 1100 },
  { name: "Total DC additions (415(c))", base: 72000, catch50: 8000, catch60: 11250, note: "catch-ups sit on top" }
];

function limits() {
  const age = parseInt($("lim-age").value, 10) || 0;
  const band = age >= 60 && age <= 63 ? "catch60" : age >= 50 ? "catch50" : null;
  $("lim-table").innerHTML =
    `<tr><th>Account</th><th class="num">Base</th><th class="num">Catch-up</th><th class="num">Max at ${age}</th></tr>` +
    LIMITS.map(l => {
      const c = band ? l[band] : 0;
      return `<tr><td>${l.name}${l.note ? ` <span style="color:var(--muted)">(${l.note})</span>` : ""}</td>
        <td class="num">${usd(l.base)}</td><td class="num">${c ? usd(c) : "—"}</td>
        <td class="num" style="color:var(--green)">${usd(l.base + c)}</td></tr>`;
    }).join("");
}

const PREP = [
  "Update account balances and confirm custodian feeds are current",
  "Pull last meeting notes and open action items",
  "Check RMD status and year-to-date distributions",
  "Review beneficiary designations on all accounts",
  "Confirm contributions are on pace for annual limits",
  "Flag Roth conversion or tax-loss harvesting opportunities",
  "Check upcoming insurance renewals or policy reviews",
  "Rerun the plan with updated assumptions",
  "Prepare agenda and send to advisor for sign-off",
  "Send meeting confirmation and document request to client"
];
const KEY = "pt-prep";

function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} }

function renderPrep() {
  const done = load();
  $("prep").innerHTML = PREP.map((t, i) =>
    `<li><label><input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""}><span>${t}</span></label></li>`).join("");
  $("prep-bar").style.width = `${done.length / PREP.length * 100}%`;
}

$("prep").addEventListener("change", e => {
  const done = [...document.querySelectorAll("#prep input:checked")].map(el => +el.dataset.i);
  save(done);
  $("prep-bar").style.width = `${done.length / PREP.length * 100}%`;
});
$("prep-reset").addEventListener("click", () => { save([]); renderPrep(); });

function notes() {
  const client = $("nt-client").value || "[Client]";
  const date = $("nt-date").value || "[Date]";
  $("nt-out").value =
`${$("nt-type").value}: ${client}
Date: ${date}
Attendees:

CHANGES SINCE LAST MEETING
- Life events:
- Income / employment:
- Goals:

DISCUSSION
- Portfolio:
- Tax:
- Retirement / cash flow:
- Insurance / estate:

DECISIONS

ACTION ITEMS
- [ ] Advisor:
- [ ] Paraplanner:
- [ ] Client:

NEXT MEETING
`;
}
["nt-client", "nt-date", "nt-type"].forEach(id => $(id).addEventListener("input", notes));
$("nt-copy").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText($("nt-out").value); $("nt-status").textContent = "Copied"; }
  catch { $("nt-out").select(); $("nt-status").textContent = "Press Cmd/Ctrl+C to copy"; }
  setTimeout(() => $("nt-status").textContent = "", 2000);
});

$("lim-age").addEventListener("input", limits);
$("nt-date").valueAsDate = new Date();
limits(); renderPrep(); notes();
