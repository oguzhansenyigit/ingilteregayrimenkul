import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { projects } from "../data/projects.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://ingilteregayrimenkul.com";
const BRAND = "Thamesbridge Gayrimenkul";
const UPDATED = "2026-11-15";

const PHONES = [
  ["Londra", "+44 773 337 0729", "+447733370729"],
  ["Londra", "+44 787 940 5584", "+447879405584"],
  ["İstanbul", "+90 532 764 8452", "+905327648452"],
  ["İstanbul", "+90 544 347 0729", "+905443470729"]
];

const NAV = [
  ["/projeler/", "Projeler"],
  ["/ingiltere-gayrimenkul-yatirimi/", "Yatırım"],
  ["/ingiltere-kira-geliri/", "Kira geliri"],
  ["/bolgeler/", "Bölgeler"],
  ["/rehber/", "Rehber"],
  ["/iletisim/", "İletişim"]
];

const LOCAL = {
  Fulham: "Fulham, Thames kıyısında ve District hattına yakın konumuyla hem oturan hem kiralayan talebi gören bir batı Londra çevresidir.",
  Marylebone: "Marylebone, West End’e yürüyüş mesafesindedir. Merkezi dairelerde brüt kira oranı çoğu zaman dış bölgelere göre daha ölçülüdür; talep ise süreklidir.",
  Oval: "Oval, Northern hattı ve Kennington–Vauxhall aksı üzerindedir. Zone 2 konumu, merkez ile güney Londra arasındaki kira piyasasına hitap eder.",
  Westminster: "Westminster, parlamento ve Whitehall çevresinde sınırlı yeni konut arzı olan bir merkez ilçedir.",
  Chelsea: "Chelsea, King’s Road ve Thames arasındaki yerleşik konut piyasasıyla bilinir. Bilet büyüklüğü yüksektir.",
  Battersea: "Battersea, elektrik santrali dönüşümü ve Nine Elms ile birlikte güney kıyıda yeni konut yoğunluğu kazanmıştır.",
  "Nine Elms": "Nine Elms, Batı Yakası’ndan Battersea’ye uzanan yeniden gelişim koridorudur. Yeni bina stoğu kira piyasasına düzenli arz sağlar.",
  Wapping: "Wapping, eski liman depolarının konuta dönüştüğü, Tower Bridge’e yakın bir doğu-merkez çevresidir.",
  "Canary Wharf": "Canary Wharf, finans merkezi ve Elizabeth hattı sayesinde yüksek kiralık daire talebi üretir.",
  Woolwich: "Woolwich, Elizabeth hattı sonrası Greenwich yarımadasına bağlanan, görece erişilebilir fiyatlı güneydoğu Londra noktalarındandır.",
  Wembley: "Wembley, stadyum, perakende ve istasyon çevresinde yeni daire stoğunun toplandığı kuzeybatı Londra’dır.",
  Birmingham: "Birmingham, İngiltere’nin Londra dışındaki en derin bölgesel piyasalarından biridir. Şehir merkezi dairelerinde kira talebi üniversite, hastane ve ofis istihdamına dayanır.",
  Camden: "Camden, kuzey Londra’nın istasyon ve pazar çevresinde sürekli kiracı sirkülasyonu olan bir bölgesidir.",
  Ealing: "Ealing, Elizabeth hattı ile merkeze bağlanan batı Londra banliyölerindendir.",
  Wandsworth: "Wandsworth, ortak alanları ve güneybatı Londra aile talebiyle hem daire hem ev arayanlara hitap eder.",
  Bow: "Bow, Olympic Park ve Elizabeth hattının etkisiyle doğu Londra’da kira piyasası izlenen noktalardandır.",
  "South Bank": "South Bank, kültür kurumları ve Waterloo–London Bridge bağlantılarıyla kısa dönem ve kurumsal kira talebi görür.",
  Kidbrooke: "Kidbrooke, güneydoğu Londra’da geniş masterplan ölçeğinde konut üreten bir yeniden gelişim alanıdır.",
  Enfield: "Enfield, kuzey Londra sınırında park ve aile evi arayan alıcıların baktığı bir ilçedir.",
  Croydon: "Croydon, güney Londra’nın ulaşım düğümlerinden biridir. Overground, tren ve tramvay aynı merkezde birleşir.",
  Kingston: "Kingston, Thames üzerinde, alışveriş ve üniversite çevresiyle kiralık daire talebi üretir.",
  Wimbledon: "Wimbledon, District hattı ve köy merkeziyle güneybatı Londra’da yerleşik bir konut piyasasıdır.",
  Twickenham: "Twickenham, rugby stadyumu ve Thames kıyısıyla bilinen, Londra sınırındaki bir konut çevresidir.",
  "White City": "White City, BBC ve Westfield çevresinde yeni konutların toplandığı batı Londra gelişim alanıdır.",
  "West Ham": "West Ham, District, Hammersmith & City, Jubilee hatları ve Elizabeth bağlantısıyla doğu Londra’da çok hatlı bir düğümdür.",
  Colindale: "Colindale, Northern hattı üzerinde, büyük konut masterplanlarının bulunduğu kuzey Londra’dır.",
  Hendon: "Hendon, Brent Reservoir ve Thameslink çevresinde daire ile townhouse seçeneklerinin bir arada izlendiği bir bölgedir.",
  Bermondsey: "Bermondsey, London Bridge’e yakın güney kıyıda, depo dönüşümleri ve yeni apartmanların iç içe olduğu bir çevredir.",
  "Finsbury Park": "Finsbury Park, Victoria, Piccadilly ve tren hatlarının kesiştiği kuzey Londra düğümüdür.",
  "Clapham Junction": "Clapham Junction, Britanya’nın en işlek demiryolu kavşaklarından biridir. İstasyona yürüme mesafesi kira ilanlarında öne çıkar.",
  Slough: "Slough, Elizabeth hattı ile Paddington’a bağlanır. Londra dışında oturup merkezde çalışan kiracı profili burada sık görülür.",
  Maidenhead: "Maidenhead, Elizabeth hattı üzerindeki Thames Valley kasabalarındandır. Aile evi talebi daire talebinden baskındır.",
  Reading: "Reading, Londra’ya trenle bağlanan büyük bir bölgesel merkezdir. İstasyon çevresi daireleri kira piyasasının omurgasını oluşturur.",
  Bath: "Bath, spa kenti kimliği ve üniversitesiyle turizm ile öğrenci kiracılığını bir arada barındırır.",
  Winchester: "Winchester, Londra’ya demiryolu bağlantısı olan tarihi bir Hampshire kentidir.",
  Watford: "Watford, Londra’nın kuzeybatı sınırında Metropolitan hattı ve hızlı tren bağlantısı sunar.",
  "Milton Keynes": "Milton Keynes, planlı kent yapısı ve iş merkezi istihdamıyla Londra dışı aile evi piyasasının güçlü örneklerindendir.",
  Ascot: "Ascot, Berkshire’da düşük yoğunluklu ve yüksek biletli konut çevresidir.",
  Guildford: "Guildford, Surrey’nin ticaret ve üniversite kentidir. Londra’ya tren bağlantısı banliyö talebini destekler.",
  Fleet: "Fleet, Hampshire’da Londra’ya giden demiryolu hattı üzerinde, aile evi ağırlıklı bir yerleşimdir.",
  Horsham: "Horsham, West Sussex’te Londra’ya trenle bağlanan, yeni mahalle ölçeğinde konut üreten bir kasabadır.",
  "High Wycombe": "High Wycombe, Chiltern hattı ile Marylebone istasyonuna bağlanan Buckinghamshire kentidir."
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function abs(urlPath) {
  return SITE + urlPath;
}

function projectBySlug(slug) {
  return projects.find((item) => item.slug === slug);
}

function localImage(project) {
  const extMatch = project.image.split("?")[0].match(/\.(jpe?g|png|webp)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
  const rel = `img/projeler/${project.slug}.${ext}`;
  return fs.existsSync(path.join(root, rel)) ? `/${rel}` : project.image;
}

function card(project) {
  const region = project.city === "Londra" ? "Londra" : "Diger";
  return `<article class="project-card" data-project="${esc(project.name + " " + project.area + " " + project.city + " " + project.type)}" data-region="${region}" data-ready="${project.ready ? "1" : "0"}">
    <a href="/projeler/${project.slug}/">
      <img src="${esc(localImage(project))}" alt="${esc(project.name)}, ${esc(project.area)} — İngiltere gayrimenkul projesi" width="900" height="560" loading="lazy">
      <div class="body">
        <div class="meta"><span class="chip">${esc(project.area)}</span><span class="chip">${esc(project.beds)}</span></div>
        <h3>${esc(project.name)}</h3>
        <p>${esc(project.type)} · ${esc(project.delivery)}</p>
        <p class="price">${project.price ? esc(project.price) : "Güncel fiyat için görüşün"}</p>
      </div>
    </a>
  </article>`;
}

function crumbs(items) {
  const html = items.map((item, index) => {
    if (index === items.length - 1) return `<span>${esc(item.name)}</span>`;
    return `<a href="${item.path}">${esc(item.name)}</a> / `;
  }).join("");
  return `<nav class="crumbs" aria-label="Sayfa yolu">${html}</nav>`;
}

function crumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path)
    }))
  };
}

function agentSchema() {
  return {
    "@type": "RealEstateAgent",
    "@id": SITE + "/#danisman",
    name: BRAND,
    url: SITE + "/",
    image: SITE + "/img/hero-london.jpg",
    telephone: "+447733370729",
    priceRange: "£££",
    currenciesAccepted: "GBP",
    description: "Londra merkezli Thamesbridge Gayrimenkul, Türkçe danışmanlıkla İngiltere gayrimenkul yatırımı, satın alma süreci ve kira geliri yönetimi sunar.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "England",
      addressCountry: "GB"
    },
    geo: { "@type": "GeoCoordinates", latitude: 51.5074, longitude: -0.1278 },
    areaServed: ["Londra", "Manchester", "Birmingham", "İngiltere"].map((name) => ({ "@type": "AdministrativeArea", name })),
    knowsLanguage: ["tr", "en"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" }
    ]
  };
}

function faqBlock(items) {
  const html = items.map((item) => `<details>
    <summary>${esc(item.q)}</summary>
    <p>${esc(item.a)}</p>
  </details>`).join("");
  const schema = {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
  return { html: `<div class="faq">${html}</div>`, schema };
}

function layout({ title, description, path: urlPath, body, schemas = [], crumbsHtml = "", robots = "index,follow,max-image-preview:large" }) {
  const depth = urlPath.split("/").filter(Boolean).length;
  const asset = "../".repeat(depth);
  const graph = [agentSchema(), ...schemas];
  const nav = NAV.map(([href, label]) => {
    const current = href === urlPath || (href !== "/" && urlPath.startsWith(href)) ? ' aria-current="page"' : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${abs(urlPath)}">
  <link rel="alternate" hreflang="tr" href="${abs(urlPath)}">
  <link rel="alternate" hreflang="x-default" href="${abs(urlPath)}">
  <meta name="robots" content="${robots}">
  <meta name="author" content="${BRAND}">
  <meta name="geo.region" content="GB-LND">
  <meta name="geo.placename" content="London">
  <meta name="geo.position" content="51.5074;-0.1278">
  <meta name="ICBM" content="51.5074, -0.1278">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${abs(urlPath)}">
  <meta property="og:image" content="${SITE}/img/hero-london.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}/img/hero-london.jpg">
  <link rel="icon" href="${asset}favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,550&family=Sora:wght@360;460;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${asset}css/styles.css">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>
<body>
  <a class="skip" href="#icerik">İçeriğe geç</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="logo" href="/"><strong>THAMESBRIDGE</strong><span>GAYRİMENKUL</span></a>
      <nav class="nav" data-nav aria-label="Ana menü">${nav}</nav>
      <div class="header-cta">
        <a class="phone" href="tel:+447733370729">+44 773 337 0729</a>
        <a class="btn btn-blood" href="/iletisim/">Görüşme</a>
        <button class="menu-btn" type="button" data-menu aria-expanded="false" aria-label="Menüyü aç">Menü</button>
      </div>
    </div>
  </header>
  <main id="icerik">
    ${crumbsHtml}
    ${body}
  </main>
  ${footer()}
  <a class="wa-float" href="https://wa.me/447733370729?text=${encodeURIComponent("Merhaba, İngiltere gayrimenkul yatırımı hakkında bilgi almak istiyorum.")}">WhatsApp</a>
  <script src="${asset}js/site.js" defer></script>
</body>
</html>`;
}

function footer() {
  const phones = PHONES.map(([city, label, tel]) => `<li><a href="tel:${tel}">${city}: ${label}</a></li>`).join("");
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <h2>Thamesbridge Gayrimenkul</h2>
        <p>Londra ofisi ve İstanbul irtibat hattıyla, İngiltere’de gayrimenkul yatırımı ve sterlin cinsinden kira geliri arayan alıcılara Türkçe danışmanlık.</p>
        <p>Çalışma saatleri (İngiltere saati): Pazartesi–Cuma 09:00–17:00, Cumartesi 09:00–14:00.</p>
      </div>
      <div>
        <h2>Yatırım</h2>
        <ul>
          <li><a href="/ingiltere-gayrimenkul-yatirimi/">İngiltere gayrimenkul yatırımı</a></li>
          <li><a href="/ingiltere-kira-geliri/">İngiltere’den kira geliri</a></li>
          <li><a href="/ingiltere-ev-almak/">İngiltere’den ev almak</a></li>
          <li><a href="/vergi-hesaplayici/">Stamp Duty hesaplayıcı</a></li>
          <li><a href="/projeler/">Satılık projeler</a></li>
        </ul>
      </div>
      <div>
        <h2>Bölgeler</h2>
        <ul>
          <li><a href="/londra-gayrimenkul/">Londra gayrimenkul</a></li>
          <li><a href="/manchester-gayrimenkul/">Manchester gayrimenkul</a></li>
          <li><a href="/birmingham-gayrimenkul/">Birmingham gayrimenkul</a></li>
          <li><a href="/bolgeler/">Tüm bölgeler</a></li>
          <li><a href="/rehber/">Yatırımcı rehberi</a></li>
        </ul>
      </div>
      <div>
        <h2>İletişim</h2>
        <ul>${phones}</ul>
        <p><a href="/gizlilik/">Gizlilik</a> · <a href="/hakkimizda/">Hakkımızda</a> · <a href="/sss/">SSS</a></p>
      </div>
    </div>
    <div class="wrap legal">
      <span>© 2026 Thamesbridge Gayrimenkul. Bilgiler yatırım tavsiyesi değildir.</span>
      <span>Son güncelleme: 15 Kasım 2026 · Londra, Birleşik Krallık</span>
    </div>
  </footer>`;
}

function formBlock(cityDefault = "") {
  return `<form class="form" data-whatsapp-form>
    <label>Ad soyad<input name="name" required autocomplete="name"></label>
    <label>Telefon<input name="phone" required autocomplete="tel" inputmode="tel"></label>
    <label>Bütçe aralığı
      <select name="budget">
        <option value="">Seçin</option>
        <option>£300.000 – £500.000</option>
        <option>£500.000 – £750.000</option>
        <option>£750.000 – £1.000.000</option>
        <option>£1.000.000 ve üzeri</option>
      </select>
    </label>
    <label>İlgilendiğiniz yer<input name="city" value="${esc(cityDefault)}" placeholder="Londra, Birmingham, Manchester"></label>
    <label>Not<textarea name="message" placeholder="Kira geliri mi, oturumluk ev mi arıyorsunuz?"></textarea></label>
    <button class="btn btn-blood" type="submit">WhatsApp’tan görüşme iste</button>
    <p class="form-note" data-form-note>Form bir hesap açmaz. Mesaj, seçtiğiniz bilgilerle WhatsApp yazışmasına taşınır.</p>
  </form>`;
}

function writePage(urlPath, html) {
  const rel = urlPath === "/" ? "index.html" : `${urlPath.replace(/^\//, "").replace(/\/$/, "")}/index.html`;
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function pageShell(meta, inner, extraSchema = [], robots) {
  const trail = [{ name: "Ana sayfa", path: "/" }, ...meta.trail];
  return layout({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    crumbsHtml: meta.trail.length ? `<div class="wrap page-hero">${crumbs(trail)}</div>` : "",
    body: inner,
    schemas: [crumbSchema(trail.length ? trail : [{ name: "Ana sayfa", path: "/" }]), ...extraSchema],
    robots
  });
}

const homeFaq = [
  { q: "İngiltere’de gayrimenkul yatırımı yabancılara açık mı?", a: "Evet. Birleşik Krallık’ta konut satın almak için oturum veya vatandaşlık şartı yoktur. Satın alma, oturma izni veya vize hakkı vermez." },
  { q: "İngiltere’den kira geliri nasıl tahsil edilir?", a: "Kira sterlin cinsinden kiracıdan veya yönetim şirketinden tahsil edilir. Yurt dışında yaşayan mal sahibi Non-Resident Landlord Scheme kapsamına girebilir. İngiltere kaynaklı kira geliri İngiltere’de vergiye tabi olabilir." },
  { q: "En çok hangi şehirler izleniyor?", a: "Portföyün ağırlığı Londra’dadır. Birmingham ve Thames Valley’de seçili projeler vardır. Manchester için kaynak taraması ayrıca yapılır; bu sitede Manchester’a ait hazır ilan gösterilmez." }
];

function buildHome() {
  const featured = ["kings-road-park", "trillium", "oval-village", "the-hilight", "westminster-tower", "london-dock", "chelsea-finery", "snow-hill-wharf"].map(projectBySlug);
  const faq = faqBlock(homeFaq);
  const body = `
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Londra · Birmingham · Thames Valley</p>
      <h1>İngiltere’de gayrimenkul yatırımı</h1>
      <p class="answer">İngiltere gayrimenkul yatırımı, sterlin cinsinden kira geliri ve uzun vadeli değer artışı arayan alıcılar için Londra başta olmak üzere İngiltere’deki konutları kapsar. Thamesbridge, proje seçimi, satın alma ve kira takibini Türkçe yürütür.</p>
      <div class="hero-actions">
        <a class="btn btn-solid" href="/projeler/">Projeleri incele</a>
        <a class="btn btn-line" href="/ingiltere-kira-geliri/">Kira gelirini öğren</a>
      </div>
      <div class="stat-row">
        <div><strong>${projects.length}</strong><span>seçili proje sayfası</span></div>
        <div><strong>GBP</strong><span>kira ve satış para birimi</span></div>
        <div><strong>TR / EN</strong><span>danışmanlık dili</span></div>
      </div>
    </div>
    <div class="hero-media">
      <img src="/img/hero-london.jpg" alt="Londra’da İngiltere gayrimenkul yatırımı için taş ve tuğla konut cephesi" width="1400" height="1600">
      <p class="hero-caption">Londra konut stoğu, merkezi dairelerden banliyö evlerine kadar farklı bilet büyüklükleri sunar.</p>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="kicker">Neden İngiltere</p>
          <h2>Şeffaf satın alma, derin kira piyasası</h2>
        </div>
        <p>Alım solicitor, arama raporları ve tapu kaydı üzerinden ilerler. Getiri vaadi yoktur; her dairenin boşluk oranı ve hizmet bedeli ayrıdır.</p>
      </div>
      <div class="grid-3">
        <article class="info-card"><p class="num">01</p><h3>Mülkiyet kaydı</h3><p>İngiltere ve Galler’de mülkiyet HM Land Registry kaydına işlenir. Alıcı, satış tamamlanmadan arama raporlarını görür.</p></article>
        <article class="info-card"><p class="num">02</p><h3>Kira sözleşmesi</h3><p>Assured shorthold tenancy, konut kiralarının yaygın sözleşmesidir. Süre, depozito ve tahliye kuralları yazılıdır.</p></article>
        <article class="info-card"><p class="num">03</p><h3>Sterlin geliri</h3><p>Kira GBP olarak doğar. Türkiye’deki yatırımcı için kur riski ve vergi, getirinin parçasıdır; ayrıca hesaplanır.</p></article>
      </div>
    </div>
  </section>
  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="kicker">Portföy</p>
          <h2>Seçili İngiltere gayrimenkul projeleri</h2>
        </div>
        <a class="btn btn-line" href="/projeler/">Tüm liste</a>
      </div>
      <div class="grid-4">${featured.map(card).join("")}</div>
    </div>
  </section>
  <section class="band">
    <div class="wrap section">
      <p class="kicker">Satın alma</p>
      <h2>İngiltere’den ev almak bu sırayla ilerler</h2>
      <div class="steps">
        <article class="step"><strong>Bütçe</strong><span>Satın alma bedeli, Stamp Duty, avukat ve eşya ayrılır.</span></article>
        <article class="step"><strong>Seçim</strong><span>Lokasyon, yatak sayısı ve teslim tarihi daraltılır.</span></article>
        <article class="step"><strong>Rezervasyon</strong><span>Yeni projede ünite tutulur, süre yazılı olur.</span></article>
        <article class="step"><strong>Hukuk</strong><span>Solicitor aramaları ve sözleşmeyi yürütür.</span></article>
        <article class="step"><strong>Exchange</strong><span>Taraflar bağlanır, kapora güçlenir.</span></article>
        <article class="step"><strong>Completion</strong><span>Bedel ödenir, anahtar ve tapu devri tamamlanır.</span></article>
        <article class="step"><strong>Kira</strong><span>Yönetim, kiracı ve Non-Resident Landlord kaydı kurulur.</span></article>
        <article class="step"><strong>Vergi</strong><span>Stamp Duty tamamlanmadan sonra 14 gün içinde beyan edilir.</span></article>
      </div>
      <p><a class="btn btn-light" href="/ingiltere-ev-almak/">Satın alma rehberi</a></p>
    </div>
  </section>
  <section class="split-photo">
    <img src="${esc(localImage(projectBySlug("london-dock")))}" alt="Wapping London Dock projesi, İngiltere’den kira geliri için konut" width="1200" height="900" loading="lazy">
    <div class="split-copy">
      <p class="kicker">Kira</p>
      <h2>İngiltere’den kira geliri</h2>
      <p class="answer">İngiltere’den kira geliri, ülkede sahip olunan konutun kiraya verilmesinden elde edilen GBP gelirdir. Brüt oran yıllık kiranın alış fiyatına bölünmesidir. Net gelir; hizmet bedeli, yönetim, boşluk, bakım ve vergi düşüldükten sonra kalır.</p>
      <p>Londra merkezinde brüt oran çoğu zaman daha düşüktür, doluluk ise daha sıkıdır. Bölgesel şehirlerde brüt oran yükselebilir, satış süresi uzayabilir. İkisini de tek cümleyle “yüksek getiri” diye anlatmayız.</p>
      <a class="btn btn-blood" href="/ingiltere-kira-geliri/">Kira geliri sayfası</a>
    </div>
  </section>
  <section class="section">
    <div class="wrap grid-2">
      <div>
        <p class="kicker">Sık sorulanlar</p>
        <h2>Kısa ve doğrulanabilir yanıtlar</h2>
        ${faq.html}
      </div>
      <div class="info-card">
        <h3>Özel görüşme</h3>
        <p>Bütçenizi, oturacağınızı mı yoksa kiraya mı vereceğinizi yazın. Uygun projeyi Londra veya İstanbul hattından açalım.</p>
        ${formBlock("Londra")}
      </div>
    </div>
  </section>`;
  writePage("/", layout({
    title: "İngiltere Gayrimenkul Yatırımı | Kira Geliri ve Londra Projeleri",
    description: "İngiltere’de gayrimenkul yatırımı ve İngiltere’den kira geliri için Londra, Birmingham ve Thames Valley projeleri. Türkçe satın alma ve kira danışmanlığı.",
    path: "/",
    body,
    schemas: [faq.schema, {
      "@type": "ItemList",
      name: "Seçili İngiltere gayrimenkul projeleri",
      itemListElement: featured.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: abs(`/projeler/${project.slug}/`)
      }))
    }]
  }));
}

function buildProjects() {
  const body = `<div class="wrap page-hero">
    <h1>İngiltere gayrimenkul projeleri</h1>
    <p class="lede">Londra ağırlıklı portföy. Fiyatı yazılan üç projede başlangıç bedeli ilan metninden alınmıştır. Diğer sayfalarda fiyat, güncel stok görüşmesinde paylaşılır.</p>
    <div class="filters">
      <button type="button" data-filter="hepsi" aria-pressed="true">Tümü</button>
      <button type="button" data-filter="londra" aria-pressed="false">Londra</button>
      <button type="button" data-filter="sehir" aria-pressed="false">Londra dışı</button>
      <button type="button" data-filter="hazir" aria-pressed="false">Taşınabilir stok</button>
      <input class="search" data-project-search placeholder="Proje, semt veya şehir ara" aria-label="Proje ara">
    </div>
    <div class="grid-3" data-project-grid>${projects.map(card).join("")}</div>
    <p class="empty" data-empty>Bu süzgeçte proje kalmadı. Aramayı temizleyin veya bize yazın.</p>
  </div>`;
  const meta = {
    title: "İngiltere Gayrimenkul Projeleri | Londra ve Şehir Dışı Konutlar",
    description: "İngiltere gayrimenkul projeleri: Londra daireleri, Birmingham, Slough, Reading ve Thames Valley konutları. Teslim tarihi ve yatak sayısıyla liste.",
    path: "/projeler/",
    trail: [{ name: "Projeler", path: "/projeler/" }]
  };
  writePage(meta.path, pageShell(meta, body, [{
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: abs(`/projeler/${project.slug}/`),
      name: project.name
    }))
  }]));
}

function story(project) {
  const local = LOCAL[project.area] || LOCAL[project.city] || `${project.area}, İngiltere içinde ulaşım ve kira talebi birlikte okunan bir yerleşimdir.`;
  const stock = project.ready
    ? "Listede taşınmaya uygun veya tamamlanmış etap bulunur. Kalan daire sayısı her hafta değişebilir."
    : "Teslim, etap takvimine bağlıdır. Rezervasyondan önce tarih sözleşme taslağında görülür.";
  const price = project.price
    ? `Paylaşılan başlangıç seviyesi ${project.price} şeklindedir. Kat, cephe ve otopark bu seviyeyi değiştirir.`
    : "Bu sayfada sabit bir liste fiyatı yayınlanmaz. Güncel birim, görüşmede stok tablosundan açılır.";
  return `<p>${esc(project.name)}, ${esc(project.area)} / ${esc(project.city)} konumunda ${esc(project.type.toLowerCase())} olarak sunulan bir İngiltere gayrimenkul projesidir. Yatak odası seçenekleri: ${esc(project.beds)}. Teslim notu: ${esc(project.delivery)}.</p>
  <p>${esc(local)}</p>
  <p>${esc(stock)} ${esc(price)} Satın alma solicitor ile yürür. Yurt dışından ve ek konut alımında Stamp Duty artar. Konut almak vize vermez.</p>`;
}

function buildProjectPages() {
  projects.forEach((project) => {
    const urlPath = `/projeler/${project.slug}/`;
    const sameArea = projects.filter((item) => item.slug !== project.slug && item.area === project.area);
    const sameCity = projects.filter((item) => item.slug !== project.slug && item.city === project.city && item.area !== project.area);
    const fallback = [...sameArea, ...sameCity].slice(0, 3);
    const related = fallback.length ? fallback : projects.filter((item) => item.slug !== project.slug).slice(0, 3);
    const schema = {
      "@type": "Residence",
      name: project.name,
      url: abs(urlPath),
      image: abs(localImage(project)),
      address: {
        "@type": "PostalAddress",
        addressLocality: project.city,
        addressRegion: "England",
        addressCountry: "GB"
      },
      description: `${project.name}, ${project.area} bölgesinde ${project.beds} yatak odası seçenekli ${project.type.toLowerCase()} projesidir.`
    };
    if (project.price) {
      schema.offers = {
        "@type": "Offer",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
        url: abs(urlPath),
        description: project.price
      };
    }
    const body = `<div class="wrap page-hero">
      <div class="project-hero">
        <img src="${esc(localImage(project))}" alt="${esc(project.name)} dış veya yaşam alanı, ${esc(project.area)}" width="1400" height="900">
        <aside class="side-card">
          <p class="kicker">${esc(project.city)}</p>
          <h1>${esc(project.name)}</h1>
          <dl>
            <dt>Konum</dt><dd>${esc(project.area)}</dd>
            <dt>Tür</dt><dd>${esc(project.type)}</dd>
            <dt>Yatak</dt><dd>${esc(project.beds)}</dd>
            <dt>Teslim</dt><dd>${esc(project.delivery)}</dd>
            <dt>Fiyat</dt><dd>${project.price ? esc(project.price) : "Görüşmede"}</dd>
          </dl>
          <a class="btn btn-blood" href="/iletisim/">Bu proje için randevu</a>
          <p class="form-note">Görseller tanıtım amaçlıdır. Sözleşme, güncel plan ve fiyat listesinin önündedir.</p>
        </aside>
      </div>
      <article class="prose" style="margin-top:28px">
        ${story(project)}
        <h2>Bu proje kira için mi uygun?</h2>
        <p>${esc(project.area)} için karar, brüt kira oranından önce üç soruyla verilir: kiracı profili kim, hizmet bedeli ne kadar, boşluk süresi kaç hafta. İngiltere’den kira geliri hedefleyen alıcı, net akışı bu üç kalemden sonra görür. Ayrıntı <a href="/ingiltere-kira-geliri/">kira geliri</a> sayfasındadır.</p>
        <h2>Alım sırasında sorulacaklar</h2>
        <ul>
          <li>Freehold mı, leasehold mu? Leasehold ise kalan süre ve ground rent.</li>
          <li>Hizmet bedeli yıllık ne, son iki yıl artmış mı?</li>
          <li>Yard, balkon ve otopark tapuya dahil mi?</li>
          <li>Tamamlanma tarihi gecikirse sözleşme ne diyor?</li>
        </ul>
        <p><a href="/vergi-hesaplayici/">Stamp Duty hesaplayıcı</a> ek konut ve yurt dışı yerleşik seçeneklerini ayırır. Sonuç gösterge niteliğindedir.</p>
      </article>
      <h2>Yakın seçenekler</h2>
      <div class="grid-3">${related.map(card).join("")}</div>
    </div>`;
    const meta = {
      title: `${project.name} | ${project.area} İngiltere Gayrimenkul`,
      description: `${project.name}, ${project.area} / ${project.city}. ${project.beds} yatak odası, ${project.type.toLowerCase()}, teslim: ${project.delivery}. İngiltere gayrimenkul yatırımı için Türkçe danışmanlık.`,
      path: urlPath,
      trail: [
        { name: "Projeler", path: "/projeler/" },
        { name: project.name, path: urlPath }
      ]
    };
    writePage(urlPath, pageShell(meta, body, [schema]));
  });
}

const investFaq = [
  { q: "İngiltere’de gayrimenkul yatırımına nereden başlanır?", a: "Önce amaç ayrılır: oturum, kira veya ikisi. Sonra nakit bütçe, Stamp Duty ve altı aylık boşluk payı birlikte yazılır. Ardından şehir ve yatak sayısı daraltılır." },
  { q: "Minimum bütçe var mı?", a: "Yasal bir alt sınır yoktur. Londra’da yeni proje başlangıçları çoğu zaman birkaç yüz bin sterlin seviyesindedir. Bölgesel evlerde bilet daha düşük olabilir. Güncel stok görüşmede açılır." },
  { q: "Şirketle mi, şahısla mı alınır?", a: "İkisi de mümkündür. Şirket alımında vergi ve mortgage kuralları şahıstan farklıdır. Karar, İngiltere vergi danışmanı ve Türkiye’deki mali müşavir birlikte bakmadan verilmemelidir." }
];

function buildInvest() {
  const faq = faqBlock(investFaq);
  const body = `<div class="wrap page-hero prose">
    <h1>İngiltere’de gayrimenkul yatırımı</h1>
    <p class="answer">İngiltere’de gayrimenkul yatırımı, İngiltere veya Galler’de konut satın alıp onu elde tutmak, kiralamak ya da yıllar sonra satmaktır. Yabancı uyruklular alım yapabilir. Mülk, oturma hakkı doğurmaz.</p>
    <p>Thamesbridge bu süreci Türkçe yürütür: şehir seçimi, proje karşılaştırması, solicitor koordinasyonu ve kira yönetimine devir. Getiri garantisi vermeyiz. Her binanın ground rent, hizmet bedeli ve boşluk riski ayrıdır.</p>
    <h2>Yatırımcının baktığı dört sonuç</h2>
    <div class="grid-2">
      <article class="info-card"><h3>Kira akışı</h3><p>Aylık net kira, kredisi olmayan bir alımda nakit getirisidir. Kredili alımda faiz bu akıştan düşer.</p></article>
      <article class="info-card"><h3>Değer</h3><p>Satış fiyatının alışın üzerine çıkması sermaye kazancıdır. Bu kazanç vergiye tabi olabilir ve yıllara yayılır.</p></article>
    </div>
    <h2>Londra mı, şehir dışı mı?</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Ölçüt</th><th>Londra</th><th>Birmingham ve kasabalar</th></tr></thead>
      <tbody>
        <tr><td>Bilet</td><td>Daha yüksek giriş</td><td>Aynı yatak sayısında çoğu zaman daha düşük</td></tr>
        <tr><td>Brüt kira oranı</td><td>Merkezde genellikle daha ölçülü</td><td>Bazı lokasyonlarda daha yüksek görünebilir</td></tr>
        <tr><td>Likidite</td><td>Alıcı havuzu daha derin</td><td>Satış süresi uzayabilir</td></tr>
        <tr><td>Kim kiralar</td><td>Finans, eğitim, sağlık, kısa görev</td><td>Yerel istihdam ve üniversite</td></tr>
      </tbody>
    </table></div>
    <p>Rakamlar bina bina değişir. Piyasa yorumlarında Londra merkezi için daha düşük, bazı bölgesel daireler için daha yüksek brüt bantlar konuşulur. Biz bu bantları ilan metnine “beklenen getiri” diye yazmayız.</p>
    <h2>Maliyet kalemleri</h2>
    <ul>
      <li>Satın alma bedeli</li>
      <li>Stamp Duty Land Tax, İngiltere ve Kuzey İrlanda’da</li>
      <li>Solicitor ve arama ücretleri</li>
      <li>Yeni dairede eşya paketi, isteğe bağlı</li>
      <li>Yıllık hizmet bedeli ve olası ground rent</li>
      <li>Yönetim komisyonu ve boşluk haftaları</li>
    </ul>
    <p>İskoçya’da LBTT, Galler’de LTT uygulanır. Bu sitedeki projeler İngiltere’dedir ve SDLT konuşulur. <a href="/vergi-hesaplayici/">Hesaplayıcı</a> ek konut ve yerleşik olmama sürprimlerini ayırır.</p>
    <h2>Sık sorulanlar</h2>
    ${faq.html}
    <p><a class="btn btn-solid" href="/projeler/">Projeleri aç</a> <a class="btn btn-line" href="/ingiltere-ev-almak/">Ev alma süreci</a></p>
  </div>`;
  const meta = {
    title: "İngiltere’de Gayrimenkul Yatırımı | Süreç, Maliyet ve Şehir Seçimi",
    description: "İngiltere’de gayrimenkul yatırımı nasıl kurulur? Londra ve şehir dışı farkı, maliyet kalemleri, yabancının alım hakkı ve kira hedefi. Türkçe danışmanlık.",
    path: "/ingiltere-gayrimenkul-yatirimi/",
    trail: [{ name: "Gayrimenkul yatırımı", path: "/ingiltere-gayrimenkul-yatirimi/" }]
  };
  writePage(meta.path, pageShell(meta, body, [faq.schema]));
}

const rentFaq = [
  { q: "İngiltere’den kira geliri Türkiye’de de vergiye girer mi?", a: "İngiltere kaynaklı kira, önce İngiltere kurallarına göre değerlendirilir. Türkiye’de yerleşik bir kişi için ayrıca beyan yükümlülüğü doğabilir. Çifte vergilendirmeyi önleme anlaşması mahsup imkânı sağlayabilir. Kesin işlem mali müşavirlik işidir." },
  { q: "Kirayı kim toplar?", a: "Mal sahibi, kiracı veya bir yönetim şirketi tahsil edebilir. Yurt dışındaki mal sahibinde, HMRC onayı yoksa yönetici kiradan vergi kesintisi yapmak zorunda kalabilir. Buna Non-Resident Landlord Scheme denir." },
  { q: "Brüt yüzde neden net gelir değildir?", a: "Brüt oran, yıllık kira bölü alış fiyatıdır. İçinden hizmet bedeli, sigorta, bakım, boşluk, yönetim ve vergi çıkar. Kalan tutar net akıştır." }
];

function buildRent() {
  const faq = faqBlock(rentFaq);
  const sample = ["oval-village", "fulton-and-fifth", "bow-green", "croydon", "snow-hill-wharf", "horlicks-quarter"].map(projectBySlug);
  const body = `<div class="wrap page-hero prose">
    <h1>İngiltere’den kira geliri</h1>
    <p class="answer">İngiltere’den kira geliri, İngiltere’deki konutun kiraya verilmesinden doğan sterlin geliridir. Yurt dışında yaşayan mal sahibi bu gelir için İngiltere’de vergi mükellefi olabilir. Tahsilat, Non-Resident Landlord Scheme ile düzenlenir.</p>
    <h2>Gelir nasıl kurulur?</h2>
    <ol>
      <li>Daire veya ev tamamlanır, güvenlik sertifikaları (gaz, elektrik, duman alarmı) hazır olur.</li>
      <li>Kira değeri, aynı sokaktaki ilanlarla karşılaştırılır. İlk ay boş geçebilir.</li>
      <li>Kiracı referans ve hak kontrolünden geçer. Depozito koruma hesabına yatırılır.</li>
      <li>Sözleşme çoğunlukla assured shorthold tenancy olur.</li>
      <li>Yönetici aylık ekstre gönderir. Boşluk ve tamirat bu ekstrede görünür.</li>
    </ol>
    <h2>Hangi şehirde kira daha “kolay” görünür?</h2>
    <p>Londra’da kiracı bulmak genellikle daha kısadır; alış fiyatı yüksek olduğu için brüt oran sıkışır. Birmingham, Reading veya Slough gibi merkezlerde bilet düşer, brüt oran yükselebilir, fakat alıcının satış günü daha sabır isteyebilir. İngiltere gayrimenkul yatırımı bu dengeyi seçmektir.</p>
    <div class="table-wrap"><table>
      <thead><tr><th>Kalem</th><th>Brüt kiraya etkisi</th></tr></thead>
      <tbody>
        <tr><td>Hizmet bedeli</td><td>Yeni rezidanslarda yıllık binlerce sterlin olabilir</td></tr>
        <tr><td>Yönetim</td><td>Kiranın bir yüzdesi artı yenileme ücreti</td></tr>
        <tr><td>Boşluk</td><td>Yılda iki boş hafta, brüt oranı gözle görülür düşürür</td></tr>
        <tr><td>Vergi</td><td>İngiltere gelir vergisi dilimine ve kesinti rejimine bağlıdır</td></tr>
      </tbody>
    </table></div>
    <h2>Uzaktan yönetim</h2>
    <p>Mal sahibinin Londra’da oturması gerekmez. Anahtar, envanter, tamir onayı ve ekstre uzaktan yürür. Thamesbridge, kiracı bulma ve aylık raporu Türkiye saatiyle takip edilecek şekilde kurar. Kira sigortası her binada yoktur; poliçe ayrıca sorulur.</p>
    <h2>Sık sorulanlar</h2>
    ${faq.html}
    <p><a class="btn btn-solid" href="/iletisim/">Kira planı konuşalım</a></p>
  </div>
  <div class="wrap" style="padding-bottom:64px">
    <h2>Kiraya uygun bakılan örnekler</h2>
    <div class="grid-3">${sample.map(card).join("")}</div>
  </div>`;
  const meta = {
    title: "İngiltere’den Kira Geliri | Tahsilat, Vergi ve Yönetim",
    description: "İngiltere’den kira geliri nasıl alınır? Brüt ve net farkı, Non-Resident Landlord Scheme, uzaktan yönetim ve şehir seçimi. Sterlin cinsinden kira danışmanlığı.",
    path: "/ingiltere-kira-geliri/",
    trail: [{ name: "Kira geliri", path: "/ingiltere-kira-geliri/" }]
  };
  writePage(meta.path, pageShell(meta, body, [faq.schema]));
}

function buildBuying() {
  const body = `<div class="wrap page-hero prose">
    <h1>İngiltere’den ev almak</h1>
    <p class="answer">İngiltere’den ev almak, rezervasyonla başlayıp solicitor’ın exchange ve completion adımlarıyla biter. Yabancılar satın alabilir. Ödeme kaynağı banka sürecinde gösterilir. Mülk, vize üretmez.</p>
    <h2>Süreç</h2>
    <ol>
      <li><strong>Kimlik ve kaynak.</strong> Pasaport ve satın alma bedelinin kaynağı, avukatın kara para kontrolünde istenir.</li>
      <li><strong>Teklif veya rezervasyon.</strong> İkinci elde teklif pazarlığa açıktır. Yeni projede geliştirici fiyat listesi ve süre vardır.</li>
      <li><strong>Aramalar.</strong> Tapu, yerel idare, su, çevre ve bina yönetimi soruları solicitor tarafından toplanır.</li>
      <li><strong>Exchange.</strong> Sözleşme bağlanır. Bu noktadan sonra cayma maliyeti yüksektir.</li>
      <li><strong>Completion.</strong> Kalan bedel geçer, anahtar teslim edilir.</li>
      <li><strong>Stamp Duty.</strong> İngiltere’de tamamlanmadan itibaren 14 gün içinde beyan ve ödeme yapılır.</li>
    </ol>
    <h2>Leasehold ve freehold</h2>
    <p>Freehold, binanın ve arsanın mülkiyetidir; müstakil evlerde yaygındır. Leasehold, belirli yıl için daire hakkıdır; Londra apartmanlarında sık görülür. Kısa lease, değeri ve mortgage’ı zorlaştırır. 90 yılın altı ayrıca konuşulur. Ortak alan masrafı leasehold’da hizmet bedeli olarak gelir.</p>
    <h2>İkinci el ve yeni proje</h2>
    <p>Yeni projede teşvik, ödeme planı ve garanti paketleri olabilir. İkinci elde bina yönetimi geçmişi ve gerçek kira kontratı görülür. İkisi de İngiltere gayrimenkul başlığı altında değerlendirilir; biri diğerinden otomatik olarak daha kârlı değildir.</p>
    <p><a class="btn btn-solid" href="/projeler/">Güncel projeler</a> <a class="btn btn-line" href="/rehber/leasehold-ve-freehold/">Leasehold rehberi</a></p>
  </div>`;
  const meta = {
    title: "İngiltere’den Ev Almak | Süreç, Leasehold ve Stamp Duty",
    description: "İngiltere’den ev almak isteyenler için rezervasyon, solicitor, exchange, completion ve Stamp Duty adımları. Yabancılar için Türkçe anlatım.",
    path: "/ingiltere-ev-almak/",
    trail: [{ name: "Ev almak", path: "/ingiltere-ev-almak/" }]
  };
  writePage(meta.path, pageShell(meta, body));
}

function cityPage({ path: urlPath, name, title, description, h1, answer, prose, list }) {
  const body = `<div class="wrap page-hero">
    <div class="prose">
      <h1>${h1}</h1>
      <p class="answer">${answer}</p>
      ${prose}
    </div>
    ${list.length ? `<h2 style="margin-top:28px">Bu şehirdeki seçili projeler</h2><div class="grid-3">${list.map(card).join("")}</div>` : `<p class="info-card">Bu sayfada hazır ilan göstermiyoruz. Arama talebini görüşmede açıyoruz.</p>`}
  </div>`;
  const meta = {
    title, description, path: urlPath,
    trail: [{ name, path: urlPath }]
  };
  const place = {
    "@type": "Place",
    name,
    address: { "@type": "PostalAddress", addressCountry: "GB", addressLocality: name }
  };
  writePage(urlPath, pageShell(meta, body, [place]));
}

function buildCities() {
  const london = projects.filter((item) => item.city === "Londra").slice(0, 9);
  const birmingham = projects.filter((item) => item.city === "Birmingham");
  cityPage({
    path: "/londra-gayrimenkul/",
    name: "Londra",
    title: "Londra Gayrimenkul | İngiltere Yatırımı için Semt Semt Projeler",
    description: "Londra gayrimenkul yatırımı: Fulham, Marylebone, Canary Wharf, Battersea, Woolwich ve Wembley projeleri. Kira ve satın alma notlarıyla.",
    h1: "Londra gayrimenkul",
    answer: "Londra gayrimenkul piyasası, Zone 1 merkezinden Elizabeth hattı koridoruna kadar farklı bilet ve kira dengeleri taşır. Thamesbridge listesinin büyük bölümü Londra semtlerindedir.",
    prose: `<h2>Semt nasıl seçilir?</h2>
    <p>Merkez (Westminster, Chelsea, Marylebone) yüksek bilet ve ölçülü brüt kira sunar. Zone 2 ve 3 (Oval, Battersea, Bow, Woolwich, Wembley) yeni stok ve istasyon yakınlığıyla kira hedefleyen alıcıların daha sık baktığı halkadır. Karar, tek bir “en iyi semt” ile değil, yatak sayısı ve hizmet bedeliyle verilir.</p>
    <p>Ayrıntılı yatırım çerçevesi <a href="/ingiltere-gayrimenkul-yatirimi/">İngiltere gayrimenkul yatırımı</a> sayfasında, tahsilat ise <a href="/ingiltere-kira-geliri/">kira geliri</a> sayfasındadır.</p>`,
    list: london
  });
  cityPage({
    path: "/birmingham-gayrimenkul/",
    name: "Birmingham",
    title: "Birmingham Gayrimenkul | Şehir Merkezi Kira Projeleri",
    description: "Birmingham gayrimenkul: Snow Hill Wharf ve Glasswater Locks. Londra dışı İngiltere kira geliri arayanlar için şehir merkezi daireleri.",
    h1: "Birmingham gayrimenkul",
    answer: "Birmingham, Londra dışındaki en derin bölgesel konut piyasalarından biridir. Şehir merkezi dairelerinde kiracı, ofis, üniversite ve hastane istihdamından gelir.",
    prose: `<p>Brüt kira oranı Londra merkezine göre daha yüksek konuşulabilir. Satış derinliği Londra kadar değildir. İki projeyi de “taşınmaya hazır” notuyla listeliyoruz; kalan ünite görüşmede teyit edilir.</p>`,
    list: birmingham
  });
  cityPage({
    path: "/manchester-gayrimenkul/",
    name: "Manchester",
    title: "Manchester Gayrimenkul | İngiltere Kira Piyasası Notu",
    description: "Manchester gayrimenkul piyasası: şehir merkezi kira talebi, Londra ile farkı ve neden bu sitede hazır Manchester ilanı göstermediğimiz.",
    h1: "Manchester gayrimenkul",
    answer: "Manchester, İngiltere’nin kuzeyinde güçlü kira talebi olan bir şehir merkezi piyasasıdır. Bu sitede Manchester’a ait ilanlı proje yoktur. Talep üzerine kaynak taraması yapılır; uydurma liste yayınlamayız.",
    prose: `<h2>Piyasa neden izlenir?</h2>
    <p>Şehir merkezi ve Salford sınırı, genç profesyonel ve öğrenci kiracılığında derin bir havuzdur. Yeni kule arzı bazı yıllarda boşluk süresini uzatır. Bu yüzden Manchester’da “yüksek brüt oran” cümlesi, doluluk olmadan eksiktir.</p>
    <p>Hazır stok arayanlar bugün <a href="/birmingham-gayrimenkul/">Birmingham</a> ve <a href="/londra-gayrimenkul/">Londra</a> sayfalarındaki projelere bakabilir. Manchester için bütçe ve yatak sayısı bırakılırsa uygun geliştirici stoku ayrıca aranır.</p>`,
    list: []
  });

  const regions = [
    ["Londra", "/londra-gayrimenkul/", "Portföyün merkezi. Semt semt daire ve penthouse."],
    ["Birmingham", "/birmingham-gayrimenkul/", "Şehir merkezi, teslime hazır iki proje."],
    ["Manchester", "/manchester-gayrimenkul/", "Piyasa notu. Hazır ilan yok, kaynak taraması var."],
    ["Slough ve Maidenhead", "/projeler/", "Elizabeth hattı. Horlicks Quarter, Spring Hill."],
    ["Reading ve Bath", "/projeler/", "Tren kentleri. RiverWorks ve One Waterside."],
    ["Winchester, Fleet, Horsham", "/projeler/", "Güney İngiltere aile evleri ve karma mahalleler."]
  ];
  const body = `<div class="wrap page-hero">
    <h1>İngiltere gayrimenkul bölgeleri</h1>
    <p class="lede">Coğrafi hedef Londra’dır. Birmingham ve Thames Valley ikinci halkadır. Her bağlantı, o yerde gerçekten anlattığımız içeriğe gider.</p>
    <div class="related">${regions.map(([name, href, text]) => `<a href="${href}"><strong>${esc(name)}</strong><span>${esc(text)}</span></a>`).join("")}</div>
  </div>`;
  const meta = {
    title: "İngiltere Gayrimenkul Bölgeleri | Londra, Birmingham, Manchester",
    description: "İngiltere gayrimenkul bölgelerine göre sayfalar: Londra, Birmingham, Manchester notu, Slough, Reading ve güney İngiltere.",
    path: "/bolgeler/",
    trail: [{ name: "Bölgeler", path: "/bolgeler/" }]
  };
  writePage(meta.path, pageShell(meta, body));
}

function buildGuides() {
  const guides = [
    {
      slug: "ingiltere-gayrimenkul-yatirimi-rehberi",
      title: "İngiltere gayrimenkul yatırımı rehberi",
      description: "İlk alım için şehir, bütçe, leasehold ve kira hedefi. İngiltere gayrimenkul yatırımı rehberi.",
      html: `<p class="answer">Bu rehber, ilk kez İngiltere’de konut alacak kişi için sırayı verir: amaç, nakit, şehir, bina tipi, hukuk ve kira. Satış sayfalarındaki çağrı burada tekrar edilmez.</p>
      <h2>Amaç cümlesi</h2>
      <p>Tek cümle yazın: “Beş yıl elde tutup kiraya vereceğim” veya “yılda iki ay oturacağım”. İkisi farklı daire seçtirir. Kısa oturum, mobilya ve yönetim ister. Tam kira, boşluk payı ister.</p>
      <h2>Nakit yığını</h2>
      <p>Alış bedelinin üzerine İngiltere’de ek konut ve yerleşik olmama sürprimi binebilir. Avukat, eşya ve ilk boş ay bu yığının içindedir. Hesabı <a href="/vergi-hesaplayici/">Stamp Duty aracı</a> ile deneyin, solicitor teyit etsin.</p>
      <h2>Şehir eleği</h2>
      <p>Londra likidite içindir. Birmingham ve Elizabeth hattı kasabaları bilet içindir. Manchester bu sitede ilansız bir izleme alanıdır. Üçünü de aynı getiri cümlesine sokmayın.</p>`
    },
    {
      slug: "kira-geliri-nasil-alinir",
      title: "İngiltere’den kira geliri nasıl alınır?",
      description: "Kira sözleşmesi, depozito, Non-Resident Landlord Scheme ve aylık ekstre. İngiltere’den kira geliri rehberi.",
      html: `<p class="answer">Kira, tamamlanma gününde değil kiracının taşındığı günde başlar. Yurt dışı mal sahibi önce HMRC’deki Non-Resident Landlord rejimini, sonra tahsilat hesabını kurar.</p>
      <h2>İlk 30 gün</h2>
      <ul>
        <li>Gaz güvenliği ve elektrik raporu</li>
        <li>Enerji performans sertifikası</li>
        <li>Duman ve karbonmonoksit alarmı</li>
        <li>Envanter ve fotoğraf</li>
        <li>Depozitonun koruma şemasına girmesi</li>
      </ul>
      <h2>Para nereye yatar?</h2>
      <p>Sterlin hesap, İngiltere bankasında mal sahibi veya yönetim şirketi adına açılabilir. Uluslararası transferin masrafı net kiradan düşer. Bunu brüt orana dahil etmek hatadır.</p>`
    },
    {
      slug: "stamp-duty-rehberi",
      title: "Stamp Duty rehberi: ek konut ve yurt dışı alıcı",
      description: "İngiltere Stamp Duty dilimleri, ek konut yüzde 5 sürprimi ve yerleşik olmayan alıcıya yüzde 2. 2026 tarifesi.",
      html: `<p class="answer">İngiltere ve Kuzey İrlanda’da konut alımında Stamp Duty Land Tax, dilimli hesaplanır. Ek konutta her dilime 5 puan, Birleşik Krallık’ta yerleşik olmayan alıcıya ayrıca 2 puan eklenir. Tarife 1 Nisan 2025’ten beri bu şekildedir ve 15 Kasım 2026 itibarıyla aynıdır.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Dilim</th><th>Standart</th><th>Ek konut</th><th>Ek konut + yerleşik değil</th></tr></thead>
        <tbody>
          <tr><td>£125.000’e kadar</td><td>%0</td><td>%5</td><td>%7</td></tr>
          <tr><td>£125.001 – £250.000</td><td>%2</td><td>%7</td><td>%9</td></tr>
          <tr><td>£250.001 – £925.000</td><td>%5</td><td>%10</td><td>%12</td></tr>
          <tr><td>£925.001 – £1.500.000</td><td>%10</td><td>%15</td><td>%17</td></tr>
          <tr><td>£1.500.000 üzeri</td><td>%12</td><td>%17</td><td>%19</td></tr>
        </tbody>
      </table></div>
      <p>Kaynak çerçeve: GOV.UK ek konut oranları ve yerleşik olmayan alıcı sürprimi. Şirket alımı, altı daire ve üzeri çoklu alım ile ilk ev indirimi bu tabloya sığmaz. <a href="/vergi-hesaplayici/">Hesaplayıcıyı açın</a>.</p>`
    },
    {
      slug: "leasehold-ve-freehold",
      title: "Leasehold ve freehold farkı",
      description: "İngiltere’de leasehold ve freehold nedir, süre ve hizmet bedeli alıcı için ne değiştirir?",
      html: `<p class="answer">Freehold arsa ve binanın mülkiyetidir. Leasehold, daireyi uzun yıllığına kullanma hakkıdır. Londra apartmanlarının çoğu leasehold satılır.</p>
      <h2>Alıcının okuması gereken üç satır</h2>
      <ul>
        <li>Kalan lease süresi. Kısa süre, yeniden satışta alıcı ve bankayı uzaklaştırır.</li>
        <li>Ground rent artıyor mu, sabit mi?</li>
        <li>Hizmet bedeli son yıllarda neden yükselmiş?</li>
      </ul>
      <p>Yeni projede geliştirici bir süre yönetim şirketini de kurmuş olabilir. Devir koşulları rezervasyon formunun ekinde aranır.</p>`
    }
  ];

  const indexBody = `<div class="wrap page-hero">
    <h1>İngiltere gayrimenkul rehberi</h1>
    <p class="lede">Satış listesinden ayrı, tanımları ve sırayı anlatan yazılar. Her yazı tek bir soruya cevap verir.</p>
    <div class="related">${guides.map((guide) => `<a href="/rehber/${guide.slug}/"><strong>${esc(guide.title)}</strong><span>${esc(guide.description)}</span></a>`).join("")}</div>
  </div>`;
  writePage("/rehber/", pageShell({
    title: "İngiltere Gayrimenkul Rehberi | Kira, Stamp Duty, Leasehold",
    description: "İngiltere gayrimenkul rehberi: yatırım sırası, kira tahsilatı, Stamp Duty dilimleri ve leasehold. Türkçe, kaynaklı anlatım.",
    path: "/rehber/",
    trail: [{ name: "Rehber", path: "/rehber/" }]
  }, indexBody));

  guides.forEach((guide) => {
    const urlPath = `/rehber/${guide.slug}/`;
    const body = `<div class="wrap page-hero prose">
      <p class="kicker">Rehber · 15 Kasım 2026</p>
      <h1>${esc(guide.title)}</h1>
      ${guide.html}
      <p>İlgili satış sayfaları: <a href="/ingiltere-gayrimenkul-yatirimi/">yatırım</a>, <a href="/ingiltere-kira-geliri/">kira geliri</a>, <a href="/projeler/">projeler</a>.</p>
    </div>`;
    writePage(urlPath, pageShell({
      title: `${guide.title} | Thamesbridge`,
      description: guide.description,
      path: urlPath,
      trail: [
        { name: "Rehber", path: "/rehber/" },
        { name: guide.title, path: urlPath }
      ]
    }, body, [{
      "@type": "Article",
      headline: guide.title,
      datePublished: UPDATED,
      dateModified: UPDATED,
      inLanguage: "tr",
      author: { "@type": "Organization", name: BRAND },
      publisher: { "@type": "Organization", name: BRAND },
      mainEntityOfPage: abs(urlPath),
      description: guide.description
    }]));
  });
}

function buildCalc() {
  const body = `<div class="wrap page-hero grid-2">
    <div class="prose">
      <h1>Stamp Duty hesaplayıcı</h1>
      <p class="answer">Araç, İngiltere ve Kuzey İrlanda konut tarifesini dilimli uygular. Ek konut tüm dilimlere 5 puan, yerleşik olmayan alıcı ayrıca 2 puan ekler. 15 Kasım 2026 itibarıyla tarife 1 Nisan 2025 düzeniyle aynıdır.</p>
      <form class="form" onsubmit="return false">
        <label>Satın alma bedeli (£)<input data-price inputmode="numeric" value="450000"></label>
        <label class="check"><input type="checkbox" data-extra checked> Bu alım ek konut (dünyada başka bir konutum var)</label>
        <label class="check"><input type="checkbox" data-nonres checked> Alıcı Birleşik Krallık’ta yerleşik değil</label>
      </form>
      <p class="form-note">İskoçya LBTT, Galler LTT kullanır. Şirket, çoklu alım ve ilk ev indirimi bu araca dahil değildir. GOV.UK hesaplayıcısı ve solicitor nihai belgedir.</p>
    </div>
    <div class="calc-result">
      <p>Gösterge Stamp Duty</p>
      <strong data-sdlt>£0</strong>
      <p>Tamamlanmadan sonra 14 gün içinde beyan edilir. Rakam yuvarlanır, sözleşme bedeli esastır.</p>
      <a class="btn btn-light" href="/rehber/stamp-duty-rehberi/">Dilimleri oku</a>
    </div>
  </div>`;
  const meta = {
    title: "İngiltere Stamp Duty Hesaplayıcı | Ek Konut ve Yurt Dışı Alıcı",
    description: "İngiltere Stamp Duty hesaplayıcı. Ek konut yüzde 5 ve yerleşik olmayan alıcı yüzde 2 sürprimleriyle 2026 dilimli gösterge.",
    path: "/vergi-hesaplayici/",
    trail: [{ name: "Stamp Duty", path: "/vergi-hesaplayici/" }]
  };
  writePage(meta.path, pageShell(meta, body));
}

const serviceFaq = [
  { q: "Danışmanlık ücreti projeye dahil mi?", a: "Yeni proje satışında geliştirici komisyonu çoğu zaman satış fiyatının içindedir ve alıcıya ayrıca fatura çıkmaz. İkinci el ve ticari mülkte ücret baştan yazılır." },
  { q: "Avukatı siz mi tutuyorsunuz?", a: "Hayır. Solicitor bağımsızdır. Biz Türkçe konuşan bir ofisle eşleştirir, evrak takvimini izleriz. Hukuki görüş avukata aittir." }
];

function buildStaticPages() {
  const faq = faqBlock([
    ...homeFaq,
    ...investFaq,
    ...rentFaq,
    ...serviceFaq
  ]);
  const pages = [
    {
      path: "/hizmetler/",
      title: "Hizmetler | İngiltere Gayrimenkul Danışmanlığı",
      description: "Proje satışı, ikinci el, satın alma takibi ve kira yönetimi. Thamesbridge hizmetleri.",
      h1: "Hizmetler",
      body: `<p class="answer">Dört iş yaparız: yeni proje satışı, ikinci el tarama, satın alma takvimi ve kira yönetimi. Hukuki temsil ve vergi beyanı bu listenin dışındadır; ilgili meslek sahibine gider.</p>
      <div class="grid-2">
        <article class="info-card"><h3>Proje satışı</h3><p>Geliştirici listesinden ünite, ödeme planı ve teşvik karşılaştırılır.</p></article>
        <article class="info-card"><h3>İkinci el</h3><p>Yönetim geçmişi görülen daireler, yeni projeyle yan yana konur.</p></article>
        <article class="info-card"><h3>Süreç</h3><p>Rezervasyon, solicitor ve completion tarihleri tek takvimde tutulur.</p></article>
        <article class="info-card"><h3>Kira</h3><p>Kiracı, sözleşme, tamir onayı ve sterlin ekstre.</p></article>
      </div>`
    },
    {
      path: "/hakkimizda/",
      title: "Hakkımızda | Thamesbridge Gayrimenkul Londra",
      description: "Thamesbridge Gayrimenkul, Londra ve İstanbul irtibatıyla İngiltere konut danışmanlığı yapar.",
      h1: "Londra’dan Türkçe danışmanlık",
      body: `<p class="answer">Thamesbridge Gayrimenkul, İngiltere konut piyasasında alıcıya Türkçe eşlik eden bağımsız bir danışmanlık masasıdır. Ofis pratiği Londra’dadır. İstanbul hatları aynı ekibe ulaşır.</p>
      <p>Projeleri geliştiren firmalar ayrıdır. Biz geliştirici değiliz. Bu yüzden her binayı “kendi projemiz” diye anlatmayız. Listede yer alan görseller tanıtım fotoğrafıdır.</p>
      <p>Coğrafi odağımız Londra’dır. Birmingham, Slough, Reading ve güney İngiltere ikinci halkadır. Manchester için ilan uydurmayız.</p>`
    },
    {
      path: "/sss/",
      title: "Sık Sorulan Sorular | İngiltere Gayrimenkul ve Kira",
      description: "İngiltere gayrimenkul yatırımı, kira geliri, vize ve Stamp Duty hakkında kısa yanıtlar.",
      h1: "Sık sorulan sorular",
      body: faq.html,
      schema: faq.schema
    },
    {
      path: "/iletisim/",
      title: "İletişim | Londra ve İstanbul Hattı",
      description: "İngiltere gayrimenkul görüşmesi için Londra ve İstanbul telefonları. Randevu WhatsApp ile planlanır.",
      h1: "Görüşme planlayın",
      body: `<p class="answer">Londra ofis hattı ve İstanbul irtibat numaraları aynı danışmanlık masasına çıkar. Yazışma WhatsApp üzerinden yürür.</p>
      <div class="grid-2">
        <div>${formBlock("")}</div>
        <div class="info-card">
          <h3>Telefon</h3>
          <ul>${PHONES.map(([city, label, tel]) => `<li><a href="tel:${tel}">${city}: ${label}</a></li>`).join("")}</ul>
          <p>Pazartesi–Cuma 09:00–17:00, Cumartesi 09:00–14:00, İngiltere saati.</p>
          <p>Londra koordinatı: 51.5074, -0.1278. Ziyaret adresi randevuyla paylaşılır.</p>
        </div>
      </div>`
    },
    {
      path: "/gizlilik/",
      title: "Gizlilik | Thamesbridge Gayrimenkul",
      description: "İletişim formunun nasıl çalıştığı ve hangi verinin tutulduğu.",
      h1: "Gizlilik",
      body: `<p>Sitede reklam çerezi veya üyelik hesabı yoktur. Görüşme formu, yazdığınız bilgileri kendi sunucumuza kaydetmez. Gönder düğmesi WhatsApp sohbeti açar. Yazışmayı siz başlatırsınız.</p>
      <p>Telefonla ulaştığınızda ad, numara ve yatırım notu yalnızca randevuyu kurmak için kullanılır. Vergi veya kimlik belgesi solicitor’a gider, bu siteye yüklenmez.</p>`
    }
  ];

  pages.forEach((item) => {
    const body = `<div class="wrap page-hero prose"><h1>${item.h1}</h1>${item.body}</div>`;
    writePage(item.path, pageShell({
      title: item.title,
      description: item.description,
      path: item.path,
      trail: [{ name: item.h1, path: item.path }]
    }, body, item.schema ? [item.schema] : []));
  });
}

function buildSeoFiles(urls) {
  const body = urls.map((url) => `<url><loc>${abs(url)}</loc><lastmod>${UPDATED}</lastmod></url>`).join("");
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`);
  fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *
Allow: /
Disallow: /scripts/
Disallow: /data/

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
  const lines = [
    `# ${BRAND}`,
    `> Londra merkezli Türkçe İngiltere gayrimenkul danışmanlığı. Satın alma vize vermez. Getiri garantisi yoktur.`,
    ``,
    `Site: ${SITE}/`,
    `Güncelleme: ${UPDATED}`,
    `Telefon: +44 773 337 0729`,
    `Coğrafya: London, United Kingdom (51.5074, -0.1278)`,
    ``,
    `## Temel sayfalar`,
    `- [İngiltere gayrimenkul yatırımı](${SITE}/ingiltere-gayrimenkul-yatirimi/): amaç, maliyet, Londra ve şehir dışı farkı`,
    `- [İngiltere’den kira geliri](${SITE}/ingiltere-kira-geliri/): tahsilat, net/brüt, Non-Resident Landlord Scheme`,
    `- [İngiltere’den ev almak](${SITE}/ingiltere-ev-almak/): exchange, completion, leasehold`,
    `- [Stamp Duty](${SITE}/rehber/stamp-duty-rehberi/): ek konut +5 puan, yerleşik olmayan +2 puan`,
    `- [Projeler](${SITE}/projeler/): ${projects.length} konut sayfası`,
    `- [Manchester](${SITE}/manchester-gayrimenkul/): ilan yok, piyasa notu var`,
    ``,
    `## Alıntı notu`,
    `Vergi oranlarını GOV.UK ile doğrulayın. Fiyatı yazmayan projelerde liste fiyatı yoktur.`
  ];
  fs.writeFileSync(path.join(root, "llms.txt"), lines.join("\n"));
  writePage("/404.html".replace("/404.html", "/404/"), pageShell({
    title: "Sayfa bulunamadı | Thamesbridge",
    description: "Aradığınız sayfa yok. Projelere veya yatırım rehberine dönebilirsiniz.",
    path: "/404/",
    trail: [{ name: "Sayfa yok", path: "/404/" }]
  }, `<div class="wrap page-hero"><h1>Bu sayfa yok</h1><p><a href="/projeler/">Projelere dön</a></p></div>`, [], "noindex,follow"));
}

const urls = ["/"];
buildHome();
buildProjects();
buildProjectPages();
buildInvest();
buildRent();
buildBuying();
buildCities();
buildGuides();
buildCalc();
buildStaticPages();

function walk(dir, base = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["css", "js", "data", "scripts", "img", "node_modules"].includes(entry.name)) continue;
    const rel = path.posix.join(base, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, rel);
    else if (entry.name === "index.html") {
      const url = "/" + base.replaceAll("\\", "/");
      urls.push(url.endsWith("/") ? url : url + "/");
    }
  }
}
walk(root);
const unique = [...new Set(urls)].filter((url) => url !== "/404/");
buildSeoFiles(unique);
console.log(`pages ${unique.length}`);
