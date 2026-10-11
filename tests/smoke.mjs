// Smoke test: loads the page in Chromium and checks the main behaviours.
// Run: npm install && npx playwright install chromium && npm test
// Set CHROMIUM_PATH to use an existing Chromium binary.
import { chromium } from 'playwright';
import { serve } from './serve.mjs';

const server = await serve(0);
const URL = 'http://127.0.0.1:' + server.address().port + '/index.html';
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let failed = 0;
const ok = (cond, name, extra = '') => { console.log((cond ? 'PASS ' : 'FAIL ') + name + (cond ? '' : '  ' + extra)); if (!cond) failed++; };

async function open(viewport, scheme = 'light') {
  const ctx = await browser.newContext({ viewport, colorScheme: scheme });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_(TUNNEL|NAME|INTERNET|CONNECTION)/.test(m.text())) errors.push(m.text()); });
  await page.goto(URL);
  await page.waitForFunction(() => document.querySelector('#live') && document.querySelector('#live').textContent.length > 0);
  return { ctx, page, errors };
}
async function gotoScene(page, i) {
  await page.evaluate((i) => {
    const tall = document.getElementById('tall'), pin = document.getElementById('pin');
    const total = tall.offsetHeight - pin.offsetHeight, top = tall.getBoundingClientRect().top + scrollY - 52;
    scrollTo(0, top + ((i + 0.5) / 7) * total);
  }, i);
  await page.waitForFunction((i) => document.getElementById('live').textContent.startsWith((i + 1) + ' / 7'), i);
}

// 1. desktop: loads, scenes, exercises
{
  const { ctx, page, errors } = await open({ width: 1440, height: 900 });
  ok(errors.length === 0, 'desktop: no script errors', errors.join(' | '));
  for (let i = 0; i < 7; i++) {
    await gotoScene(page, i).then(() => ok(true, `scene ${i + 1} reachable`)).catch(() => ok(false, `scene ${i + 1} reachable`));
  }
  const painted = await page.evaluate(() => { const c = document.getElementById('cv'), x = c.getContext('2d'); const d = x.getImageData(0, 0, c.width, c.height).data; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) return true; return false; });
  ok(painted, 'canvas has painted squares');
  await page.click('.dotnav button:nth-child(5)');
  await page.waitForFunction(() => document.getElementById('live').textContent.startsWith('5 / 7'));
  ok(true, 'scene dot navigation');
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow (desktop)');

  await page.evaluate(() => document.getElementById('ex').scrollIntoView());
  const answers = ['bg', 'prob', 'gap', 'aim', 'value', 'road'];
  for (let i = 1; i < 6; i++) await page.selectOption('#pick' + i, answers[i]);
  await page.click('#check');
  ok((await page.textContent('#score')).startsWith('6 / 6'), 'exercise 1 scores 6 / 6');
  await page.click('#reset');
  ok((await page.textContent('#score')).trim() === '', 'exercise 1 resets');

  await page.click('#seg button:nth-child(2)');
  ok((await page.textContent('.verb')) === 'form', 'exercise 2 switches the verb');

  await page.check('#ck0'); await page.check('#ck3');
  ok((await page.textContent('#count')).startsWith('2 of 8'), 'exercise 3 counts ticks');
  await page.reload();
  ok(await page.isChecked('#ck0'), 'checklist ticks persist after reload');

  await page.click('#l-zh');
  ok((await page.textContent('.hero h1')).includes('论文'), 'language toggle switches to Chinese');
  await page.reload();
  ok((await page.textContent('.hero h1')).includes('论文'), 'language choice persists');
  await ctx.close();
}
// 2. phone and tablet portrait: stacked layout, no overflow
for (const [name, vp] of [['phone', { width: 390, height: 844 }], ['tablet portrait', { width: 820, height: 1100 }]]) {
  const { ctx, page, errors } = await open(vp);
  ok(errors.length === 0, `${name}: no script errors`, errors.join(' | '));
  ok(await page.evaluate(() => document.documentElement.classList.contains('stacked')), `${name}: stacked layout`);
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: no horizontal overflow`);
  await gotoScene(page, 5).then(() => ok(true, `${name}: last animated scene reachable`)).catch(() => ok(false, `${name}: scene 6 reachable`));
  await ctx.close();
}
// 3. dark theme
{
  const { ctx, page, errors } = await open({ width: 1440, height: 900 }, 'dark');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  ok(errors.length === 0 && bg === 'rgb(20, 19, 15)', 'dark theme applies', bg + ' ' + errors.join(' | '));
  await ctx.close();
}
await browser.close(); server.close();
console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
