export type Locale = "ar" | "en";

export type CompanyCategory = "steel" | "realestate" | "lifestyle" | "trade" | "social";

export interface Company {
  id: string;
  stake: string;
  logo?: string;
  wideLogo?: boolean;
  monogram: string;
  category: CompanyCategory;
  name: Record<Locale, string>;
  text: Record<Locale, string>;
  form: Record<Locale, string>;
  place?: Record<Locale, string>;
}

export const companies: Company[] = [
  {
    id: "wehda",
    stake: "100%",
    logo: "/img/brands/elgarhy-steel.webp",
    monogram: "EG",
    category: "steel",
    name: {
      ar: "مجموعة الجارحي للاستثمار والتنمية (الوحدة للتنمية الصناعية)",
      en: "El Garhy Investment & Development (Al-Wehda Industrial Development)",
    },
    text: {
      ar: "شركة رائدة في الحديد والصلب بخبرة تقارب ثلاثة عقود. حديدها دخل أغلب المشروعات القومية الكبرى.",
      en: "A leading steelmaker with nearly three decades of experience. Its rebar is in most of Egypt’s national megaprojects.",
    },
    form: { ar: "ش.ذ.م.م", en: "LLC" },
    place: { ar: "السويس", en: "Suez" },
  },
  {
    id: "misr-national",
    stake: "90%",
    logo: "/img/brands/misr-national-steel.webp",
    monogram: "NS",
    category: "steel",
    name: { ar: "مصر الوطنية للصلب", en: "Misr National Steel" },
    text: {
      ar: "صلب وحديد تسليح بمختلف الأقطار وفق المواصفات المحلية والدولية.",
      en: "Steel and rebar in every diameter, to local and international standards.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
    place: { ar: "العبور", en: "Obour City" },
  },
  {
    id: "egyptian-iron-steel",
    stake: "99%",
    logo: "/img/brands/egyptian-iron-steel.webp",
    monogram: "ES",
    category: "steel",
    name: { ar: "الشركة المصرية لمنتجات الحديد والصلب", en: "The Egyptian Co. for Iron & Steel Products" },
    text: {
      ar: "إنشاء وتملّك وتشغيل مصانع الحديد والصلب.",
      en: "Builds, acquires and operates iron and steel plants.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "al-masria",
    stake: "100%",
    logo: "/img/brands/al-masria-steel.webp",
    monogram: "GS",
    category: "steel",
    name: { ar: "المصرية للصلب", en: "Al Masria Steel" },
    text: {
      ar: "مصانع إنتاج الحديد والصلب، واستيراد المعدات وقطع الغيار، وتصدير المنتجات.",
      en: "Steel production plants, equipment imports and product exports.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
    place: { ar: "السويس", en: "Suez" },
  },
  {
    id: "national-glass",
    stake: "89%",
    logo: "/img/brands/national-glass.webp",
    monogram: "NG",
    category: "steel",
    name: { ar: "الشركة الوطنية للزجاج والبلور", en: "The National Company for Glass & Crystal" },
    text: {
      ar: "زجاج وبلور عالي الجودة بأحدث التقنيات وطاقة إنتاج يومية ضخمة. منذ 1984.",
      en: "High-quality glass and crystal on the latest machinery, with massive daily capacity. Since 1984.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "arab-developers",
    stake: "6%",
    logo: "/img/brands/arab-developers.webp",
    wideLogo: true,
    monogram: "AD",
    category: "realestate",
    name: { ar: "العربية للتطوير العقاري القابضة", en: "Arab Developers Holding" },
    text: {
      ar: "من أكبر المطورين العقاريين في مصر، بمشروعات سكنية وترفيهية داخل مصر وخارجها.",
      en: "One of Egypt’s top developers, with residential and leisure projects at home and abroad.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "garhy-realestate",
    stake: "100%",
    monogram: "GR",
    category: "realestate",
    name: { ar: "الجارحي للتطوير العقاري", en: "El Garhy Real Estate Development" },
    text: {
      ar: "كمبوندات سكنية ومشروعات تجارية متكاملة.",
      en: "Residential compounds and integrated commercial developments.",
    },
    form: { ar: "ش.ذ.م.م", en: "LLC" },
  },
  {
    id: "west-village",
    stake: "60%",
    monogram: "WV",
    category: "realestate",
    name: { ar: "ويست فيلدج للاستصلاح الزراعي", en: "West Village Agricultural Reclamation" },
    text: {
      ar: "استصلاح أراضٍ وتنمية زراعية على مساحات واسعة.",
      en: "Large-scale land reclamation and agricultural development.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "haven",
    stake: "75%",
    logo: "/img/brands/haven.webp",
    wideLogo: true,
    monogram: "HV",
    category: "lifestyle",
    name: { ar: "جلوبال للمدارس والجامعات — حضانة Haven", en: "Global Schools & Universities — Haven Nursery" },
    text: {
      ar: "تعليم منتسوري آمن وممتع بالتعاون مع هيرتفوردشير، المملكة المتحدة.",
      en: "Safe, joyful Montessori education, affiliated with Hertfordshire, UK.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "sun-beach",
    stake: "—",
    logo: "/img/brands/sun-beach.webp",
    monogram: "SB",
    category: "lifestyle",
    name: { ar: "منتجع صن بيتش — الغردقة", en: "Sun Beach Resort — Hurghada" },
    text: {
      ar: "حيث الراحة تلتقي بالأناقة، على شاطئ البحر الأحمر.",
      en: "Where comfort meets elegance, on the Red Sea.",
    },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
    place: { ar: "الغردقة", en: "Hurghada" },
  },
  {
    id: "omega",
    stake: "80%",
    monogram: "Ω",
    category: "trade",
    name: { ar: "أوميجا لتجارة الحديد", en: "Omega for Iron Trading" },
    text: { ar: "تجارة الحديد وإدارة سلاسل الإمداد.", en: "Iron trading and supply-chain management." },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "haramain",
    stake: "100%",
    monogram: "AH",
    category: "trade",
    name: { ar: "الحرمين لتجارة حديد التسليح", en: "Al-Haramain for Rebar Trading" },
    text: { ar: "توزيع وتجارة حديد التسليح.", en: "Rebar trading and distribution." },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "import-export",
    stake: "100%",
    monogram: "IE",
    category: "trade",
    name: { ar: "شركة الاستيراد والتصدير — تجارة عامة", en: "Import & Export Co. — General Trading" },
    text: { ar: "الاستيراد والتصدير والتجارة العامة.", en: "Import, export and general trading." },
    form: { ar: "شركة مساهمة مصرية", en: "Egyptian JSC" },
  },
  {
    id: "misr-marketing",
    stake: "100%",
    monogram: "MM",
    category: "trade",
    name: { ar: "مصر للتسويق", en: "Misr for Marketing" },
    text: { ar: "خدمات تسويق متكاملة وإدارة العلامات التجارية.", en: "Integrated marketing and brand communication." },
    form: { ar: "منشأة فردية", en: "Sole proprietorship" },
  },
  {
    id: "foundation",
    stake: "♥",
    logo: "/img/brands/garhy-foundation.webp",
    monogram: "GF",
    category: "social",
    name: { ar: "مؤسسة جمال الجارحي للتنمية المجتمعية", en: "Gamal El Garhy Community Development Foundation" },
    text: {
      ar: "دعم وخدمات للأسر الأكثر احتياجًا في التعليم والصحة.",
      en: "Support for families most in need, in education and healthcare.",
    },
    form: { ar: "مؤسسة", en: "Foundation" },
  },
];

export const brandLogos = [
  { src: "/img/brands/elgarhy-steel.webp", alt: { ar: "حديد الجارحي", en: "Elgarhy Steel" } },
  { src: "/img/brands/misr-national-steel.webp", alt: { ar: "مصر الوطنية للصلب", en: "Misr National Steel" } },
  { src: "/img/brands/egyptian-iron-steel.webp", alt: { ar: "المصرية لمنتجات الحديد والصلب", en: "Egyptian Iron & Steel" } },
  { src: "/img/brands/al-masria-steel.webp", alt: { ar: "المصرية للصلب", en: "Al Masria Steel" } },
  { src: "/img/brands/national-glass.webp", alt: { ar: "الوطنية للزجاج والبلور", en: "National Glass & Crystal" } },
  { src: "/img/brands/arab-developers.webp", alt: { ar: "العربية للتطوير القابضة", en: "Arab Developers Holding" } },
  { src: "/img/brands/haven.webp", alt: { ar: "حضانة Haven", en: "Haven Nursery" } },
  { src: "/img/brands/sun-beach.webp", alt: { ar: "صن بيتش الغردقة", en: "Sun Beach Hurghada" } },
  { src: "/img/brands/garhy-foundation.webp", alt: { ar: "مؤسسة جمال الجارحي", en: "Gamal El Garhy Foundation" } },
];

export const certificates = [
  { src: "/img/certs/iso-9001.webp", code: "ISO 9001:2015", text: { ar: "نظام إدارة الجودة", en: "Quality management" }, body: "TÜV NORD" },
  { src: "/img/certs/iso-14001.webp", code: "ISO 14001:2015", text: { ar: "نظام الإدارة البيئية", en: "Environmental management" }, body: "TÜV NORD" },
  { src: "/img/certs/iso-45001.webp", code: "ISO 45001:2018", text: { ar: "السلامة والصحة المهنية", en: "Occupational health & safety" }, body: "TÜV NORD" },
  { src: "/img/certs/iso-9001-misr-national.webp", code: "ISO 9001", text: { ar: "مصر الوطنية للصلب · عتاقة", en: "Misr National Steel · Ataka" }, body: "DAkkS" },
];

export const board = [
  { initials: "GE", lead: true, name: { ar: "جمال الجارحي", en: "Gamal Elgarhy" }, role: { ar: "رئيس مجلس الإدارة والعضو المنتدب", en: "Chairman & Managing Director" } },
  { initials: "MG", name: { ar: "محمد جمال الجارحي", en: "Mohamed Gamal Elgarhy" }, role: { ar: "نائب رئيس مجلس الإدارة", en: "Deputy Chairman" } },
  { initials: "AE", name: { ar: "أشرف الجارحي", en: "Ashraf Elgarhy" }, role: { ar: "نائب رئيس مجلس الإدارة", en: "Deputy Chairman" } },
  { initials: "DG", name: { ar: "داليا جمال الجارحي", en: "Dalia Gamal Elgarhy" }, role: { ar: "عضو مجلس الإدارة", en: "Board Member" } },
  { initials: "ML", name: { ar: "محمد مسعد لطفي", en: "Mohamed Mosaad Lotfy" }, role: { ar: "عضو مجلس الإدارة", en: "Board Member" } },
  { initials: "AM", name: { ar: "أحمد ماهر أمين", en: "Ahmed Maher Amin" }, role: { ar: "عضو مجلس الإدارة", en: "Board Member" } },
  { initials: "MA", name: { ar: "منى عطية محمد", en: "Mona Attiea Mohamed" }, role: { ar: "عضو مجلس الإدارة", en: "Board Member" } },
];

export const contact = {
  email: "info@elgarhysteel.com",
  // The old site listed "38/36/37627935"; read as 02 3762 7935 / 36 / 38 — confirm with the client.
  phone: "+20 2 3762 7935",
  phoneHref: "tel:+20237627935",
  mapHref: "https://maps.google.com/?q=34+Damascus+St+Mohandessin+Giza",
};

const ar = {
  meta: {
    title: "مجموعة الجارحي | حديد يبني مصر",
    description:
      "مجموعة الجارحي للاستثمار والتنمية: قرابة ثلاثين عامًا في صناعة حديد التسليح، والتطوير العقاري، والتعليم، والسياحة، والتنمية المجتمعية في مصر.",
  },
  nav: {
    links: [
      { href: "#story", label: "القصة" },
      { href: "#sectors", label: "القطاعات" },
      { href: "#steel", label: "الحديد" },
      { href: "#companies", label: "الشركات" },
      { href: "#leadership", label: "القيادة" },
    ],
    contact: "تواصل معنا",
    menu: "القائمة",
    close: "إغلاق",
    switchLabel: "English",
    switchHref: "/en",
    switchLang: "en",
  },
  preloader: "مجموعة الجارحي",
  hero: {
    eyebrow: "مجموعة الجارحي للاستثمار والتنمية · منذ قرابة 30 عامًا",
    line1: "من قلب النار،",
    line2: "نبني مصر.",
    sub: "حديد التسليح الذي يحمل المشروعات القومية. ومدارس ومنتجعات ومجتمعات تحمل المستقبل.",
    cta: "اكتشف المجموعة",
    cta2: "اطلب عرض سعر",
    scroll: "مرّر لأسفل",
  },
  manifesto: {
    eyebrow: "القصة",
    text: "بدأنا بالحديد، لأن كل شيء عظيم يحتاج أساسًا لا ينكسر. واليوم، تمتد مجموعة الجارحي من مصانع الصلب في السويس والعبور إلى المدن والمدارس والمنتجعات والعمل المجتمعي. قصة واحدة، تُكتب بالجودة والثقة.",
  },
  stats: [
    { value: 30, suffix: "", label: "عامًا من الخبرة الصناعية تقريبًا" },
    { value: 15, suffix: "", label: "شركة ومؤسسة تحت مظلة واحدة" },
    { value: 2, suffix: "", label: "مصنعان في السويس والعبور" },
    { value: 3, suffix: "", label: "شهادات ISO دولية" },
  ],
  sectors: {
    eyebrow: "القطاعات",
    title: "ست قطاعات. رؤية واحدة.",
    hint: "مرّر لاستكشاف القطاعات",
    items: [
      { key: "steel", title: "الحديد والصلب", text: "حديد تسليح ومنتجات إنشائية بمواصفات مصرية ودولية، من خطوط إنتاج حديثة.", tag: "السويس · العبور" },
      { key: "realestate", title: "التطوير العقاري", text: "كمبوندات ومشروعات تجارية وترفيهية كبرى، في مصر وخارجها.", tag: "سكني · تجاري" },
      { key: "education", title: "التعليم", text: "من حضانات منتسوري إلى برامج جامعية معتمدة بريطانيًا.", tag: "Haven · هيرتفوردشير" },
      { key: "hospitality", title: "السياحة والضيافة", text: "صن بيتش الغردقة، حيث الراحة تلتقي بالأناقة على البحر الأحمر.", tag: "الغردقة" },
      { key: "investment", title: "الاستثمار", text: "حصص في شركات مصرية رائدة، لنمو مالي مستدام عبر القطاعات.", tag: "حصص استراتيجية" },
      { key: "social", title: "التنمية المجتمعية", text: "مؤسسة جمال الجارحي، فرق حقيقي في التعليم والصحة ودعم الأسر.", tag: "مؤسسة خيرية" },
    ],
  },
  steel: {
    eyebrow: "حديد الجارحي",
    title: "خلّي قلبك حديد.",
    sub: "حديد تسليح استُخدم في أغلب المشروعات القومية الكبرى. مصنوع بمعايير عالمية، لسوق يستحق الأفضل.",
    imageAlt: "لقطات لحديد التسليح في مصنع الجارحي",
    film: "شاهد الفيلم",
    filmTitle: "حديد الجارحي — خلّي قلبك حديد",
    close: "إغلاق",
    plants: [
      { city: "السويس", name: "الوحدة للتنمية الصناعية · المصرية للصلب", text: "القاعدة الصناعية الرئيسية لإنتاج حديد التسليح في منطقة عتاقة." },
      { city: "العبور", name: "مصر الوطنية للصلب", text: "حديد تسليح بكل الأقطار، وفق المواصفات المحلية والدولية." },
    ],
    iso: [
      { code: "ISO 9001", label: "الجودة" },
      { code: "ISO 14001", label: "البيئة" },
      { code: "ISO 45001", label: "السلامة" },
    ],
  },
  companies: {
    eyebrow: "شركات المجموعة",
    title: "عائلة واحدة. خمس عشرة شركة.",
    filters: [
      { key: "all", label: "الكل" },
      { key: "steel", label: "الحديد والصناعة" },
      { key: "realestate", label: "العقار والزراعة" },
      { key: "lifestyle", label: "التعليم والسياحة" },
      { key: "trade", label: "التجارة والخدمات" },
      { key: "social", label: "العمل المجتمعي" },
    ],
    stake: "نسبة الملكية",
  },
  values: {
    eyebrow: "ما نؤمن به",
    mission: { label: "الرسالة", text: "منتجات حديد تسليح عالية الجودة وفق المواصفات المصرية والدولية، تلبي تطلعات عملائنا واحتياجات السوق المصري." },
    vision: { label: "الرؤية", text: "أن نبقى من كبار منتجي حديد التسليح في مصر والمنطقة العربية، وأن نضيف إنتاج البيليت خلال السنوات الخمس المقبلة." },
    title: "خمس قيم. لا تنكسر.",
    items: [
      { title: "السلامة", text: "لكل العاملين وللبيئة المحيطة. أولًا ودائمًا." },
      { title: "التعاون", text: "شراكة مثمرة مع العاملين والموردين والعملاء." },
      { title: "الإتقان", text: "التميز في كل نشاط وكل عملية." },
      { title: "القيادة", text: "قيادة تبني الثقة لدى العاملين والعملاء." },
      { title: "الإبداع", text: "أفكار جديدة ترفع الأداء باستمرار." },
    ],
  },
  certs: {
    eyebrow: "الاعتمادات",
    title: "معتمدون. عالميًا.",
    sub: "أنظمة الجودة والبيئة والسلامة لدينا معتمدة من TÜV NORD وجهات اعتماد دولية.",
    view: "عرض الشهادة",
  },
  board: {
    eyebrow: "مجلس الإدارة",
    title: "قيادة تصنع الثقة.",
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "لنبنِ معًا.",
    sub: "أخبرنا باحتياجك من حديد التسليح أو أي من خدماتنا، وسيتواصل معك فريقنا في أقرب وقت.",
    address: "34 شارع دمشق، متفرع من شارع سوريا، المهندسين، الجيزة",
    addressLabel: "المقر الرئيسي",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف",
    form: {
      name: "الاسم",
      company: "الشركة",
      phone: "رقم الهاتف",
      topic: "الموضوع",
      topics: ["طلب عرض سعر حديد تسليح", "التطوير العقاري", "شراكات واستثمار", "التوظيف", "استفسار عام"],
      message: "رسالتك",
      submit: "أرسل الرسالة",
      note: "سيفتح تطبيق البريد لديك لإرسال رسالتك إلى info@elgarhysteel.com.",
    },
  },
  footer: {
    rights: "مجموعة الجارحي للاستثمار والتنمية. جميع الحقوق محفوظة.",
    place: "المهندسين، الجيزة، مصر",
    top: "العودة للأعلى",
  },
};

export type Dict = typeof ar;

const en: Dict = {
  meta: {
    title: "El Garhy Group | Steel that builds Egypt",
    description:
      "El Garhy Group for Investment & Development: nearly 30 years in reinforcing steel, real estate, education, hospitality and community development in Egypt.",
  },
  nav: {
    links: [
      { href: "#story", label: "Story" },
      { href: "#sectors", label: "Sectors" },
      { href: "#steel", label: "Steel" },
      { href: "#companies", label: "Companies" },
      { href: "#leadership", label: "Leadership" },
    ],
    contact: "Contact us",
    menu: "Menu",
    close: "Close",
    switchLabel: "العربية",
    switchHref: "/",
    switchLang: "ar",
  },
  preloader: "El Garhy Group",
  hero: {
    eyebrow: "El Garhy Group for Investment & Development · Nearly 30 years",
    line1: "Forged in fire.",
    line2: "Building Egypt.",
    sub: "The rebar beneath the nation’s megaprojects. And the schools, resorts and communities that carry its future.",
    cta: "Explore the group",
    cta2: "Request a quote",
    scroll: "Scroll",
  },
  manifesto: {
    eyebrow: "The story",
    text: "We started with steel, because everything great needs a foundation that never breaks. Today, El Garhy Group reaches from steel plants in Suez and Obour to cities, schools, resorts and community work. One story, written in quality and trust.",
  },
  stats: [
    { value: 30, suffix: "", label: "Years of industrial experience" },
    { value: 15, suffix: "", label: "Companies under one roof" },
    { value: 2, suffix: "", label: "Plants in Suez and Obour" },
    { value: 3, suffix: "", label: "International ISO certifications" },
  ],
  sectors: {
    eyebrow: "Sectors",
    title: "Six sectors. One vision.",
    hint: "Scroll to explore",
    items: [
      { key: "steel", title: "Steel", text: "Reinforcing steel and structural products to Egyptian and international standards, from modern lines.", tag: "Suez · Obour" },
      { key: "realestate", title: "Real estate", text: "Compounds and large commercial and leisure developments, in Egypt and beyond.", tag: "Residential · Commercial" },
      { key: "education", title: "Education", text: "From Montessori nurseries to British-accredited university programmes.", tag: "Haven · Hertfordshire" },
      { key: "hospitality", title: "Hospitality", text: "Sun Beach Hurghada — where comfort meets elegance on the Red Sea.", tag: "Hurghada" },
      { key: "investment", title: "Investment", text: "Equity in leading Egyptian companies, for long-term growth across sectors.", tag: "Strategic stakes" },
      { key: "social", title: "Community", text: "The Gamal El Garhy Foundation — real change in education, health and family support.", tag: "Foundation" },
    ],
  },
  steel: {
    eyebrow: "Elgarhy Steel",
    title: "A heart of steel.",
    sub: "Rebar trusted in most of Egypt’s national megaprojects. Made to global standards, for a market that deserves the best.",
    imageAlt: "Footage of reinforcing steel at the Elgarhy plant",
    film: "Watch the film",
    filmTitle: "Elgarhy Steel — A heart of steel",
    close: "Close",
    plants: [
      { city: "Suez", name: "Al-Wehda Industrial Development · Al Masria Steel", text: "The group’s main rebar production base, in the Ataka industrial zone." },
      { city: "Obour", name: "Misr National Steel", text: "Rebar in every diameter, to local and international standards." },
    ],
    iso: [
      { code: "ISO 9001", label: "Quality" },
      { code: "ISO 14001", label: "Environment" },
      { code: "ISO 45001", label: "Safety" },
    ],
  },
  companies: {
    eyebrow: "Group companies",
    title: "One family. Fifteen companies.",
    filters: [
      { key: "all", label: "All" },
      { key: "steel", label: "Steel & industry" },
      { key: "realestate", label: "Real estate & land" },
      { key: "lifestyle", label: "Education & tourism" },
      { key: "trade", label: "Trade & services" },
      { key: "social", label: "Social impact" },
    ],
    stake: "Ownership",
  },
  values: {
    eyebrow: "What we believe",
    mission: { label: "Mission", text: "High-quality reinforcing steel to Egyptian and international specifications, meeting our customers’ expectations and the market’s needs." },
    vision: { label: "Vision", text: "To remain one of the top rebar producers in Egypt and the Arab region — and add billet production within the next five years." },
    title: "Five values. Unbreakable.",
    items: [
      { title: "Safety", text: "For every employee and the environment around us. First, always." },
      { title: "Cooperation", text: "Fruitful partnership with employees, suppliers and customers." },
      { title: "Proficiency", text: "Excellence in every activity and every process." },
      { title: "Leadership", text: "Leadership that builds confidence in our people and clients." },
      { title: "Creativity", text: "New ideas that keep raising our performance." },
    ],
  },
  certs: {
    eyebrow: "Certifications",
    title: "Certified. Worldwide.",
    sub: "Our quality, environmental and safety systems are certified by TÜV NORD and international accreditation bodies.",
    view: "View certificate",
  },
  board: {
    eyebrow: "Board of directors",
    title: "Leadership that earns trust.",
  },
  contact: {
    eyebrow: "Contact us",
    title: "Let’s build together.",
    sub: "Tell us what you need — rebar or any of our services — and our team will get back to you shortly.",
    address: "34 Damascus St., off Syria St., Mohandessin, Giza",
    addressLabel: "Head office",
    emailLabel: "Email",
    phoneLabel: "Phone",
    form: {
      name: "Name",
      company: "Company",
      phone: "Phone number",
      topic: "Topic",
      topics: ["Rebar quotation", "Real estate", "Partnerships & investment", "Careers", "General enquiry"],
      message: "Your message",
      submit: "Send message",
      note: "Your email app will open to send your message to info@elgarhysteel.com.",
    },
  },
  footer: {
    rights: "El Garhy Group for Investment & Development. All rights reserved.",
    place: "Mohandessin, Giza, Egypt",
    top: "Back to top",
  },
};

export const dictionaries: Record<Locale, Dict> = { ar, en };
