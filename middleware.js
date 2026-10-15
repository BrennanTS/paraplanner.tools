// Site-wide password gate. The password lives in the SITE_PASSWORD env var on Vercel, never in the repo.
export const config = { matcher: "/:path*" };

const COOKIE = "g";

const PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>&#8203;</title><link rel="icon" href="data:,"><style>html,body{margin:0;height:100%;background:#000}body{display:flex;align-items:center;justify-content:center;cursor:text}form{margin:0}input{-webkit-appearance:none;appearance:none;border-radius:0;box-shadow:none;background:#000;color:#999;caret-color:#ccc;border:0;border-bottom:1px solid #3a3a3a;outline:0;font:16px Georgia,serif;width:200px;padding:8px 2px;text-align:center}input:focus{border-bottom-color:#666}</style></head><body><form method="post"><input type="password" name="p" autofocus autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go"></form><script>var i=document.querySelector("input");document.body.addEventListener("click",function(){i.focus()});i.focus()</script></body></html>`;

async function token(password) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`gate:${password}`));
  return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function gate() {
  return new Response(PAGE, {
    status: 401,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" }
  });
}

export default async function middleware(request) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return gate();
  const expected = await token(password);

  const cookies = request.headers.get("cookie") || "";
  if (cookies.split(/;\s*/).includes(`${COOKIE}=${expected}`)) return;

  if (request.method === "POST") {
    const form = await request.formData().catch(() => null);
    if (form && form.get("p") === password) {
      return new Response(null, {
        status: 303,
        headers: {
          location: new URL(request.url).pathname,
          "set-cookie": `${COOKIE}=${expected}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
          "cache-control": "no-store"
        }
      });
    }
  }
  return gate();
}
