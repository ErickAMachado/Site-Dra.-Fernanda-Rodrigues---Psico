const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/lib/analytics.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function setup() {
  const scripts = [], storage = new Map(), removed = [];
  class Element { closest() { return this; } }
  class HTMLAnchorElement extends Element { constructor(href) { super(); this.href = href; } }
  const window = { location: { origin: 'https://example.com', pathname: '/', hostname: 'example.com' } };
  const document = { referrer: 'https://google.com/search?q=private', cookie: '_ga=123; _ga_TEST=456', createElement: () => ({}), head: { appendChild: s => scripts.push(s) }, getElementById: id => ({ remove: () => removed.push(id) }) };
  const context = { exports: {}, window, document, URL, Element, HTMLAnchorElement, localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) } };
  vm.runInNewContext(code, context);
  return { ...context, api: context.exports, scripts, storage, removed, commands: () => (window.dataLayer ?? []).map(x => Array.from(x)) };
}
test('No tracking before initialization; stored refusal blocks automatic start', () => {
  const s = setup();
  assert.equal(s.api.readConsent(), null);
  s.api.trackWhatsAppClick({ target: new s.HTMLAnchorElement('https://wa.me/123?text=private'), type: 'click' });
  assert.equal(s.scripts.length, 0); assert.equal(s.commands().length, 0);
  s.api.saveConsent('rejected'); assert.equal(s.api.readConsent(), 'rejected'); s.api.startAnalytics(); assert.equal(s.scripts.length, 0);
});
test('Automatic initialization runs once with all consent denied and sanitized metadata', () => {
  const s=setup(); s.api.startAnalytics(); s.api.startAnalytics();
  assert.equal(s.api.readConsent(), null); assert.equal(s.scripts.length, 1);
  assert.equal(s.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-LDG98SWNGY');
  const commands=s.commands();
  assert.equal(commands[0][2].ad_user_data, 'denied');
  assert.equal(commands[0][2].analytics_storage, 'denied'); assert(!JSON.stringify(commands).includes('granted'));
  const config=commands.find(c=>c[0]==='config')[2];
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.page_referrer,'https://google.com');
});
test('Tracks WhatsApp exactly once per click without URL, phone, message or service', () => {
  const s=setup(); s.api.startAnalytics();
  const link=new s.HTMLAnchorElement('https://wa.me/5519123456789?text=private');
  s.api.trackWhatsAppClick({target:link,type:'click',button:0});
  s.api.trackWhatsAppClick({target:new s.HTMLAnchorElement('https://example.com'),type:'click'});
  s.api.trackWhatsAppClick({target:link,type:'auxclick',button:2});
  const events=s.commands().filter(c=>c[0]==='event');
  assert.equal(events.length,1); assert.equal(events[0][1],'whatsapp_click');
  assert.deepEqual(Object.keys(events[0][2]).sort(), ['send_to','transport_type']);
  s.api.stopAnalytics();
  s.api.trackWhatsAppClick({target:link,type:'click'});
  assert.equal(s.commands().filter(c=>c[0]==='event').length,1);
  assert.equal(s.window['ga-disable-G-LDG98SWNGY'],true);
  assert.equal(s.removed.length,1);
});
test('Expired, malformed and unavailable consent storage defaults to no consent', () => {
  const s=setup();
  s.storage.set(s.api.CONSENT_KEY,JSON.stringify({choice:'accepted',date:0}));
  assert.equal(s.api.readConsent(),null);
  s.storage.set(s.api.CONSENT_KEY,'invalid'); assert.equal(s.api.readConsent(),null);
  s.localStorage.getItem=()=>{throw Error('blocked');}; assert.equal(s.api.readConsent(),null);
});
