/* KBCODE — i18n: EN (default), PL, UK
   The English source lives in index.html. PL and UK translations
   below replace innerHTML/attribute values when the user picks a
   different language. Choice persists in localStorage. */
(() => {
  const SUPPORTED = ['en', 'pl', 'uk'];
  const STORAGE_KEY = 'kbcode-lang';

  const I18N = {
    en: {}, // populated from initial DOM on first run

    pl: {
      'meta.title': 'KBCODE Poland — Kartografowie Obecności',
      'meta.description': 'KBCODE Poland to studio software z Krakowa, tworzące Avatar Platform — sieć telepresence w czasie rzeczywistym, która zamienia każdą ulicę, szczyt i wybrzeże w miejsce, do którego można zajrzeć z dowolnego punktu świata.',

      'masthead.locale': 'Kraków · 50,0647°N&nbsp;19,9450°E',
      'masthead.tick': '— OKÓLNIK TERENOWY № 001 / MMXXVI / DO DYSTRYBUCJI MIĘDZYNARODOWEJ —',
      'nav.studio': 'Studio',
      'nav.instrument': 'Instrument',
      'nav.apparatus': 'Aparat',
      'nav.dispatch': 'Wyślij depeszę',

      'hero.eyebrow': 'Sporządzono w Krakowie, Polska — Wydanie Pierwsze',
      'hero.h1': 'Stwórz własną<br>niezapomnianą<br>wirtualną <em>odyseję</em>.',
      'hero.lede': '<span class="drop">K</span>BCODE Poland to studio software, które buduje <strong>Avatar Platform</strong> — sieć telepresence w czasie rzeczywistym, która zamienia każdą ulicę, szczyt i wybrzeże w miejsce dostępne z dowolnego punktu Ziemi.',
      'hero.cta.primary': 'Otwórz atlas',
      'hero.cta.ghost': 'Wyślij depeszę',
      'hero.m1.label': 'Założono',
      'hero.m1.value': 'Kraków · 2025',
      'hero.m2.label': 'Dziedzina',
      'hero.m2.value': 'Telepresence · obraz na żywo',
      'hero.m3.label': 'Pierwszy projekt',
      'hero.m3.value': 'Avatar Platform',
      'hero.figcaption': '<span class="fig-no">Rys. I.</span> Mappa Mundi.',

      'globe.north': 'N',

      'studio.no': 'Notatka Terenowa № 01',
      'studio.h2': 'Małe studio<br>z odległym horyzontem.',
      'studio.pullquote': '<span class="quote-mark" aria-hidden="true">„</span> Jesteśmy <em>KBCODE Poland</em> — zespołem specjalistów IT, który tworzy produkt zmieniający świat. <cite>— Manifest studia, 2025</cite>',
      'studio.prose1': 'Założone w Krakowie, KBCODE działa na styku telepresence, kartografii i gry — tworzymy oprogramowanie, które pozwala jednej osobie być w miejscu drugiej, gdziekolwiek na mapie. Specjalizujemy się w systemach rozproszonych, wideo o niskich opóźnieniach i interfejsach człowiek‑maszyna, które łączą jedno z drugim.',
      'studio.l1.label': 'Nazwa prawna',
      'studio.l2.label': 'Założono',
      'studio.l3.label': 'Biuro',
      'studio.l3.value': 'Kraków, Polska',
      'studio.l4.label': 'Pierwszy projekt',
      'studio.l5.label': 'Status',
      'studio.l5.value': 'W trakcie tworzenia',

      'instrument.no': 'Notatka Terenowa № 02 — Instrument',
      'instrument.h2': 'Avatar Platform.',
      'instrument.kicker': 'Odkryj świat jak nigdy dotąd.',
      'instrument.prose1': 'Avatar Platform to marketplace i sieć transmisji na żywo, która łączy w jednej, wspólnej chwili dwie osoby oddalone o tysiące kilometrów. Operator otwiera atlas świata, rezerwuje Awatara — żywego człowieka w terenie — i oto już idzie zaułkiem Tokio, fiordem Patagonii albo holem muzeum po godzinach, w czasie rzeczywistym, przez ekran telefonu.',
      'instrument.prose2': 'To podróż bez granic, wiz, śladu węglowego ani wielkiego budżetu. To sposób, by być w miejscach, do których własne ciało nie dotrze.',
      'instrument.role1.title': 'Operator',
      'instrument.role1.body': 'Prowadzi podróż. Widzi to, co Awatar. Słyszy to, co Awatar. Prawym kciukiem steruje spojrzeniem, lewym — ruchem.',
      'instrument.role2.title': 'Awatar',
      'instrument.role2.body': 'Ciało w terenie — wyposażone, zweryfikowane, opłacane przez platformę. Odbiera polecenia Operatora, przekazuje obraz, dźwięk, znaki.',
      'instrument.role3.title': 'Platforma',
      'instrument.role3.body': 'Bezpieczny dwukierunkowy portfel. Niewidoczna konstrukcja spinająca obie strony.',

      'apparatus.no': 'Notatka Terenowa № 03 — Aparat',
      'apparatus.h2': 'Co jest w plecaku.',
      'apparatus.kicker': 'Sześć przyrządów, jedna wyprawa.',
      'apparatus.f1.title': 'Interaktywny atlas świata',
      'apparatus.f1.body': 'Filtrowalny globus awatarów — według języka, specjalizacji, ocen i bieżącej dostępności. Zarezerwuj przewodnika z tygodniowym wyprzedzeniem albo zamów go w ciągu kwadransa.',
      'apparatus.f2.title': 'Strumień HD w czasie rzeczywistym',
      'apparatus.f2.body': 'Zmysły Awatara stają się Twoimi — z opóźnieniem, którego przestajesz zauważać.',
      'apparatus.f3.title': 'Sterowanie dwoma kciukami',
      'apparatus.f3.body': 'Język sterowania zapożyczony z gier. Lewy kciuk prowadzi, prawy patrzy — biegłość w kilka minut, ekspresja na godziny.',
      'apparatus.f4.title': 'Specjalizacje Awatarów',
      'apparatus.f4.body': 'Każdy Awatar przychodzi z własnym rzemiosłem — biegacz parkour, sommelier, kustosz muzeum po godzinach. Wybierz specjalistę, którego ręce zmieniają punkt na mapie w doświadczenie, jakiego nikt inny nie zaoferuje.',
      'apparatus.f5.title': 'Zweryfikowany rejestr',
      'apparatus.f5.body': 'Szyfrowany dwukierunkowy portfel, oceniani awatarzy, rozjemstwo, prowizje stopniowane premiujące długoterminową jakość po stronie podaży.',
      'apparatus.f6.title': 'Wyposażenie terenowe',
      'apparatus.f6.body': 'Stabilizowane kamery, drony, kajaki, rowery na trudniejsze mapy — udostępniane przez platformę, gdy wymaga tego geografia.',

      'dispatch.no': 'Notatka Terenowa № 04 — Współrzędne łączności',
      'dispatch.h2': 'Wyślij depeszę.',
      'dispatch.kicker': 'Pisz w sprawach partnerstw, współpracy R&D, kariery lub wsparcia — przez email lub telefon. Odpowiadamy na wszystko.',
      'dispatch.card.label': 'Triangulacja',
      'dispatch.card.sub': 'Kraków, Rzeczpospolita Polska',
      'dispatch.ch1.label': 'Spółka operacyjna',
      'dispatch.ch2.label': 'Kanał — wsparcie',
      'dispatch.ch3.label': 'Kanał — kariera',
      'dispatch.ch4.label': 'Kanał — R&D',
      'dispatch.ch5.label': 'Telefon',

      'colophon.line': 'Mapujemy obecność od MMXXV.',
      'colophon.setIn': 'Skład',
      'colophon.drawnIn': 'Wykonano w',
      'colophon.drawnInValue': 'Kraków, Polska — 50,0647°N&nbsp;19,9450°E',
      'colophon.edition': 'Wydanie',
      'colophon.endOfDoc': '— KONIEC DOKUMENTU —',
    },

    uk: {
      'meta.title': 'KBCODE Poland — Картографи Присутності',
      'meta.description': 'KBCODE Poland — софтверна студія з Кракова, що створює Avatar Platform — мережу людської телеприсутності в реальному часі: будь‑яка вулиця, вершина чи узбережжя стають місцем, куди можна зайти з будь‑якої точки світу.',

      'masthead.locale': 'Краків · 50,0647°пн.&nbsp;19,9450°сх.',
      'masthead.tick': '— ПОЛЬОВИЙ ЦИРКУЛЯР № 001 / MMXXVI / ДЛЯ МІЖНАРОДНОГО ПОШИРЕННЯ —',
      'nav.studio': 'Студія',
      'nav.instrument': 'Інструмент',
      'nav.apparatus': 'Апарат',
      'nav.dispatch': 'Надіслати депешу',

      'hero.eyebrow': 'Укладено в Кракові, Польща — Перше Видання',
      'hero.h1': 'Створи власну<br>незабутню<br>віртуальну <em>одіссею</em>.',
      'hero.lede': '<span class="drop">К</span>BCODE Poland — софтверна студія, що створює <strong>Avatar Platform</strong>: мережу людської телеприсутності в реальному часі, яка перетворює будь‑яку вулицю, вершину чи узбережжя на місце, куди можна потрапити з будь‑якої точки Землі.',
      'hero.cta.primary': 'Відкрити атлас',
      'hero.cta.ghost': 'Надіслати депешу',
      'hero.m1.label': 'Засновано',
      'hero.m1.value': 'Краків · 2025',
      'hero.m2.label': 'Напрям',
      'hero.m2.value': 'Телеприсутність · живе відео',
      'hero.m3.label': 'Перший проєкт',
      'hero.m3.value': 'Avatar Platform',
      'hero.figcaption': '<span class="fig-no">Рис. I.</span> Mappa Mundi.',

      'globe.north': 'Пн',

      'studio.no': 'Польова Нотатка № 01',
      'studio.h2': 'Маленька студія<br>з далеким горизонтом.',
      'studio.pullquote': '<span class="quote-mark" aria-hidden="true">„</span> Ми — <em>KBCODE Poland</em>, команда IT‑професіоналів, що створює продукт, який змінить світ. <cite>— Маніфест студії, 2025</cite>',
      'studio.prose1': 'Заснована у Кракові, KBCODE працює на перетині телеприсутності, картографії та гри — будуємо софт, що дозволяє одній людині бути замість іншої будь‑де на мапі. Наші спеціалізації — розподілені системи, відео з низькою затримкою та інтерфейси «людина–машина», що тримають це разом.',
      'studio.l1.label': 'Юридична назва',
      'studio.l2.label': 'Засновано',
      'studio.l3.label': 'Бюро',
      'studio.l3.value': 'Краків, Польща',
      'studio.l4.label': 'Перший проєкт',
      'studio.l5.label': 'Статус',
      'studio.l5.value': 'У розробці',

      'instrument.no': 'Польова Нотатка № 02 — Інструмент',
      'instrument.h2': 'Avatar Platform.',
      'instrument.kicker': 'Пізнавай світ як ніколи раніше.',
      'instrument.prose1': 'Avatar Platform — це маркетплейс і мережа живих трансляцій, що зводить в одну спільну мить двох людей, розділених тисячами кілометрів. Оператор відкриває атлас світу, бронює Аватара — справжню людину на місці — і ось він уже йде провулком Токіо, фіордом Патагонії чи фойє музею після його закриття, у реальному часі, через свій телефон.',
      'instrument.prose2': 'Це подорож без кордонів, віз, вуглецю чи великого бюджету. Це спосіб бути присутнім там, куди не дістане власне тіло.',
      'instrument.role1.title': 'Оператор',
      'instrument.role1.body': 'Веде подорож. Бачить те, що бачить Аватар. Чує те, що чує Аватар. Правим великим пальцем спрямовує погляд, лівим — рух.',
      'instrument.role2.title': 'Аватар',
      'instrument.role2.body': 'Тіло на місці — споряджене, перевірене, оплачене платформою. Отримує підказки Оператора, передає сцену, звук і знаки.',
      'instrument.role3.title': 'Платформа',
      'instrument.role3.body': 'Захищений двосторонній гаманець. Невидимий апарат, що тримає пару разом.',

      'apparatus.no': 'Польова Нотатка № 03 — Апарат',
      'apparatus.h2': 'Що в наборі.',
      'apparatus.kicker': 'Шість приладів, одна експедиція.',
      'apparatus.f1.title': 'Інтерактивний атлас світу',
      'apparatus.f1.body': 'Фільтрований глобус аватарів — за мовою, спеціалізацією, рейтингом і поточною доступністю. Заброньовуй провідника за тижні наперед або наймай у наступну чверть години.',
      'apparatus.f2.title': 'HD‑потік у реальному часі',
      'apparatus.f2.body': 'Чуття Аватара стають твоїми — із затримкою, яку перестаєш помічати.',
      'apparatus.f3.title': 'Керування великими пальцями',
      'apparatus.f3.body': 'Мова керування, запозичена з ігрових кімнат. Лівий великий палець керує рухом, правий — поглядом: вільне володіння за хвилини, виразність на години.',
      'apparatus.f4.title': 'Спеціалізації Аватарів',
      'apparatus.f4.body': 'Кожен Аватар приходить зі своєю майстерністю — паркурник, сомельє, екскурсовод музею після закриття. Обери фахівця, чиї руки перетворюють точку на мапі в досвід, який ніхто інший не зможе дати.',
      'apparatus.f5.title': 'Перевірений реєстр',
      'apparatus.f5.body': 'Шифрований двосторонній гаманець, оцінювані аватари, арбітраж, ступінчасті комісії, що винагороджують стійку якість на стороні пропозиції.',
      'apparatus.f6.title': 'Польове спорядження',
      'apparatus.f6.body': 'Стабілізовані камери, дрони, каяки, велосипеди для складніших мап — постачаються платформою, коли цього вимагає географія.',

      'dispatch.no': 'Польова Нотатка № 04 — Координати Зв’язку',
      'dispatch.h2': 'Надішли депешу.',
      'dispatch.kicker': 'Пиши про партнерства, співпрацю R&D, вакансії чи підтримку — електронною поштою або телефоном. Відповідаємо всім.',
      'dispatch.card.label': 'Тріангуляція',
      'dispatch.card.sub': 'Краків, Республіка Польща',
      'dispatch.ch1.label': 'Операційна компанія',
      'dispatch.ch2.label': 'Канал — підтримка',
      'dispatch.ch3.label': 'Канал — вакансії',
      'dispatch.ch4.label': 'Канал — R&D',
      'dispatch.ch5.label': 'Телефон',

      'colophon.line': 'Картуємо присутність із MMXXV.',
      'colophon.setIn': 'Набрано',
      'colophon.drawnIn': 'Накреслено в',
      'colophon.drawnInValue': 'Краків, Польща — 50,0647°пн.&nbsp;19,9450°сх.',
      'colophon.edition': 'Видання',
      'colophon.endOfDoc': '— КІНЕЦЬ ДОКУМЕНТА —',
    },
  };

  function captureEN() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      I18N.en[el.dataset.i18n] = el.innerHTML.trim();
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      I18N.en[key] = el.getAttribute(attr);
    });
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = I18N[lang]?.[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      const value = I18N[lang]?.[key];
      if (value !== undefined) el.setAttribute(attr, value);
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function detectLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (_) {}
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(browser)) return browser;
    return 'en';
  }

  document.addEventListener('DOMContentLoaded', () => {
    captureEN();
    applyLang(detectLang());

    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  });
})();
