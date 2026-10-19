export interface PrayerCity {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  qiblaAngle: number; // degrees from North
}

export const PRAYER_CITIES: PrayerCity[] = [
  { name: 'Accra', country: 'Ghana', latitude: 5.6037, longitude: -0.1870, timezone: 'Africa/Accra', qiblaAngle: 64.9 },
  { name: 'Apam', country: 'Ghana', latitude: 5.2833, longitude: -0.7333, timezone: 'Africa/Accra', qiblaAngle: 65.2 },
  { name: 'Kumasi', country: 'Ghana', latitude: 6.6885, longitude: -1.6244, timezone: 'Africa/Accra', qiblaAngle: 66.1 },
  { name: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai', qiblaAngle: 259.8 },
  { name: 'Mecca', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262, timezone: 'Asia/Riyadh', qiblaAngle: 0.0 },
  { name: 'Medina', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6111, timezone: 'Asia/Riyadh', qiblaAngle: 175.3 },
  { name: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo', qiblaAngle: 136.2 },
  { name: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784, timezone: 'Europe/Istanbul', qiblaAngle: 151.7 },
  { name: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', qiblaAngle: 118.9 },
  { name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York', qiblaAngle: 58.5 },
  { name: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur', qiblaAngle: 292.8 },
  { name: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456, timezone: 'Asia/Jakarta', qiblaAngle: 295.1 },
  { name: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto', qiblaAngle: 55.2 },
  { name: 'Johannesburg', country: 'South Africa', latitude: -26.2041, longitude: 28.0473, timezone: 'Africa/Johannesburg', qiblaAngle: 11.2 }
];

export interface Muezzin {
  id: string;
  name: string;
  location: string;
  audioUrl: string;
}

export const MUEZZINS: Muezzin[] = [
  {
    id: 'makkah',
    name: 'Sheikh Ali Ahmad Mullah',
    location: 'Masjid Al-Haram, Mecca',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a1.mp3'
  },
  {
    id: 'madinah',
    name: 'Sheikh Abdul Majeed Al-Suraihi',
    location: 'Masjid An-Nabawi, Medina',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a2.mp3'
  },
  {
    id: 'alaqsa',
    name: 'Sheikh Naji Qazzaz',
    location: 'Al-Aqsa Mosque, Jerusalem',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a3.mp3'
  },
  {
    id: 'istanbul',
    name: 'Hafiz Mustafa Özcan',
    location: 'Sultan Ahmed Blue Mosque, Istanbul',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a4.mp3'
  },
  {
    id: 'cairo',
    name: 'Sheikh Muhammad Rifat',
    location: 'Al-Azhar Mosque, Cairo',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a5.mp3'
  }
];

export interface Khutbah {
  id: string;
  title: string;
  arabicTitle: string;
  speaker: string;
  date: string;
  duration: string;
  audioUrl: string;
  summary: string;
  keyVerses: string[];
  keyHadiths: string[];
  tags: string[];
  transcripts: {
    en: { time: string; text: string }[];
    ar: { time: string; text: string }[];
    fr: { time: string; text: string }[];
    tw: { time: string; text: string }[];
  };
}

export const KHUTBAH_LIBRARY: Khutbah[] = [
  {
    id: 'khutbah-1',
    title: 'Nature as the Sacred Benchmark: Economic Equilibrium and Islamic Trusteeship',
    arabicTitle: 'الطبيعة كمعيار مقدس: التوازن الاقتصادي والاستخلاف الإسلامي',
    speaker: 'Abdul-Bari (Al-Bari) & Scholars of IGPD',
    date: 'Friday, Jumada al-Ula 1448 AH',
    duration: '24:18',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a1.mp3',
    summary: 'A landmark sermon on how Islamic finance and the Quranic mandate of Istikhlaf (stewardship) position the natural ecosystem as the supreme backing for global currency and wealth creation, condemning artificial interest and resource hoarding.',
    keyVerses: ["Surah Ar-Rahman (55:10)", "Surah Al-A'raf (7:31)", "Surah Al-Baqarah (2:275)"],
    keyHadiths: ['"The world is sweet and green, and verily Allah has installed you as trustees therein." (Sahih Muslim)'],
    tags: ['Nature Benchmark', 'Islamic Finance', 'Stewardship', 'Zero Usury', 'Global Peace'],
    transcripts: {
      en: [
        { time: '00:00', text: 'All praise belongs to Allah, the Creator of the heavens and the earth, who established the cosmic balance (Mizan).' },
        { time: '01:15', text: 'Brothers, sisters, and all seekers of truth: today we reflect upon the sacred trust placed upon humanity.' },
        { time: '03:40', text: 'Nature will be the benchmark, the backbone of global financial systems — not artificial paper debt or interest.' },
        { time: '07:20', text: 'When Allah says in Surah Ar-Rahman: "And the earth He laid out for all living creatures," it is an egalitarian charter.' },
        { time: '12:05', text: 'Provision of basic needs for billions must be free — housing, clean water, wholesome food, energy, and internet.' },
        { time: '18:30', text: 'Investors will profit through real productivity, regenerative assets, and ethical partnership, not exploitation.' },
        { time: '22:10', text: 'May Allah grant peace to all nations, heal the earth, and unite our hearts in compassion. Ameen.' }
      ],
      ar: [
        { time: '00:00', text: 'الحمد لله رب العالمين، خالق السماوات والأرض، الذي وضع الميزان بالقسط.' },
        { time: '01:15', text: 'أيها الإخوة والأخوات وطلاب الحق والسلام: نتأمل اليوم في الأمانة الكبرى التي حمّلها الله للإنسان.' },
        { time: '03:40', text: 'الطبيعة ستكون هي المعيار والعمود الفقري للنظام المالي العالمي — وليس الديون الربوية المصطنعة.' },
        { time: '07:20', text: 'قال تعالى في سورة الرحمن: "والأرض وضعها للأنام" — هذا ميثاق رباني شامل لكل الخلق.' },
        { time: '12:05', text: 'توفير الاحتياجات الأساسية لمليارات البشر يجب أن يكون متاحاً مجاناً: المسكن، الغذاء، الصحة، والكهرباء.' },
        { time: '18:30', text: 'المستثمرون سيربحون من خلال الاقتصاد الحقيقي والإنتاج التشاركي العادل.' },
        { time: '22:10', text: 'نسأل الله تعالى أن يملأ قلوبنا بالرحمة وينشر السلام في أرجاء المعمورة. آمين.' }
      ],
      fr: [
        { time: '00:00', text: 'Louange à Allah, Créateur des cieux et de la terre, qui a instauré la balance cosmique (Al-Mizan).' },
        { time: '01:15', text: 'Chers frères, sœurs et chercheurs de paix : nous méditons aujourd’hui sur la sainte confiance confiée à l’humanité.' },
        { time: '03:40', text: 'La nature sera la référence absolue des systèmes financiers mondiaux, et non la dette fictive.' },
        { time: '07:20', text: 'Dans la sourate Ar-Rahman : "Et la terre, Il l’a établie pour toutes les créatures vivantes".' },
        { time: '12:05', text: 'La fourniture des besoins vitaux pour des milliards d’êtres humains doit être universelle et équitable.' },
        { time: '18:30', text: 'Les investisseurs prospéreront dans des projets éthiques régénérateurs réels.' },
        { time: '22:10', text: 'Qu’Allah unisse les peuples dans la bienveillance et la fraternité universelle. Amin.' }
      ],
      tw: [
        { time: '00:00', text: 'Nhyira nka Nyankopɔn a ɔbɔɔ soro ne asaase, na ɔde pɛpɛɛyɛ toom ma adasamma nyinaa.' },
        { time: '01:15', text: 'Anuanom ne asomdwoe ahwehwɛfo nyinaa: ɛnnɛ yɛresusu asɛde kɛse a Onyame de ahyɛ yɛn nsa ho.' },
        { time: '03:40', text: 'Abɔde nyinaa ne sika kwan pa a ɛbɛma amanaman nyinaa anya asomdwoe ne ahonya pa.' },
        { time: '07:20', text: 'Koran kasa sɛ: "Na asaase deɛ, Ɔhyehyɛ maa abɔde nyinaa" — obiara wɔ ho kwan.' },
        { time: '12:05', text: 'Ɛsɛ sɛ aduane, fie, apɔmuden ne nsu pa ba obiara nkyɛn a ɛnyɛ adesoa.' },
        { time: '18:30', text: 'Sikasɛm a ɛfa nkurɔfo bɔne ho remma nkɔso; pɛpɛɛyɛ ne nokware na ɛbɛma amanaman agyina.' },
        { time: '22:10', text: 'Nyame nhyira yɛn nyinaa, na ɔmma asomdwoe ntena wiase nyinaa. Ameen.' }
      ]
    }
  },
  {
    id: 'khutbah-2',
    title: 'Universal Compassion: Building Bridges Across All Faiths and Peoples',
    arabicTitle: 'الرحمة العالمية: بناء جسور السلام بين جميع الأديان والشعوب',
    speaker: 'Sheikh Dr. Mustafa Al-Azhari (DIFC Islamic Forum)',
    date: 'Friday, Shawwal 1448 AH',
    duration: '21:05',
    audioUrl: 'https://cdn.aladhan.com/audio/adhans/a2.mp3',
    summary: 'Focuses on the Hadith Qudsi "My Mercy prevails over My wrath" and how true Islamic practice manifests through unshakeable hospitality and aid to non-Muslim neighbors and global allies.',
    keyVerses: ['Surah Al-Hujurat (49:13)', 'Surah Al-Mumtahanah (60:8)'],
    keyHadiths: ['"None of you truly believes until he loves for his brother what he loves for himself."'],
    tags: ['Universal Compassion', 'Interfaith', 'Human Dignity', 'Peace'],
    transcripts: {
      en: [
        { time: '00:00', text: 'In the name of Allah, who created humanity from a single soul and made us into nations and tribes.' },
        { time: '03:10', text: 'True piety is not inward isolation; it is serving widows, orphans, and seekers of peace of every background.' },
        { time: '08:45', text: 'The Prophet (PBUH) stood in solemn respect for the funeral of a Jewish neighbor in Medina.' },
        { time: '15:20', text: 'Masjid Al-Noor is open 24/7 to every human soul wishing to reflect, learn, or receive sanctuary.' }
      ],
      ar: [
        { time: '00:00', text: 'بسم الله الذي خلق الإنسان من نفس واحدة وجعلنا شعوباً وقبائل لنتعارف.' },
        { time: '03:10', text: 'البر ليس الانعزال، بل هو إطعام الجائع ونصرة المظلوم ومحبة الخير للناس جميعاً.' },
        { time: '08:45', text: 'قام النبي صلى الله عليه وسلم احتراماً لجنازة جاره اليهودي في المدينة المنورة.' },
        { time: '15:20', text: 'مسجد النور العالمي مفتوح على مدار الساعة لكل إنسان يطلب السكينة والرحمة.' }
      ],
      fr: [
        { time: '00:00', text: 'Au nom d’Allah, qui a créé l’humanité d’une seule âme et a fait de nous des nations.' },
        { time: '03:10', text: 'La vraie piété réside dans le service désintéressé envers autrui et le respect mutuel.' },
        { time: '08:45', text: 'Le Prophète (saw) s’est levé avec déférence devant le cortège funèbre d’un concitoyen juif.' },
        { time: '15:20', text: 'Masjid Al-Noor demeure un havre de paix 24h/24 pour tous les chercheurs de sérénité.' }
      ],
      tw: [
        { time: '00:00', text: 'Onyame din mu, ɔno a ɔbɔɔ nnipa nyinaa baakofo na ɔyɛɛ yɛn aman horow sɛnea yɛbɛhu yɛn ho yɛn ho.' },
        { time: '03:10', text: 'Gyidi pa ne sɛ wobɛboa ahiafo, ayisaa, ne nea ɔhwehwɛ asomdwoe.' },
        { time: '08:45', text: 'Ɔnkɔmhyɛni no buu ne yɔnko biara a ɔbɛn no no animuonyam.' },
        { time: '15:20', text: 'Masjid Al-Noor ano bue bere nyinaa ma obiara a ɔpɛ nkuranhyɛ ne nyansa.' }
      ]
    }
  }
];

export interface GlobalMosque {
  id: string;
  name: string;
  arabicName: string;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  imageUrl: string;
  distanceKm?: number;
  features: {
    isOpen24h: boolean;
    hasJumuah: boolean;
    hasWheelchair: boolean;
    hasWomenSection: boolean;
  };
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  description: string;
}

export const GLOBAL_MOSQUES: GlobalMosque[] = [
  {
    id: 'mosque-1',
    name: 'Ghana National Central Mosque',
    arabicName: 'مسجد غانا الوطني الكبير',
    city: 'Accra',
    country: 'Ghana',
    address: 'Kanda Highway, Kawukudi, Accra, Ghana',
    lat: 5.5865,
    lng: -0.1912,
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '04:52', dhuhr: '12:02', asr: '15:19', maghrib: '18:05', isha: '19:15' },
    description: 'The second largest mosque in West Africa, featuring grand Ottoman architecture, library, medical center, and educational academy.'
  },
  {
    id: 'mosque-2',
    name: 'Apam Coastal Juma Masjid',
    arabicName: 'مسجد أبام الساحلي الجامع',
    city: 'Apam',
    country: 'Ghana',
    address: 'Main Beach Road, Central Region, Apam, Ghana',
    lat: 5.2833,
    lng: -0.7333,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: false, hasWomenSection: true },
    prayerTimes: { fajr: '04:54', dhuhr: '12:04', asr: '15:21', maghrib: '18:07', isha: '19:17' },
    description: 'Historic seaside sanctuary serving the local fishing and merchant community with daily prayers and humanitarian food distributions.'
  },
  {
    id: 'mosque-3',
    name: 'DIFC Grand Mosque',
    arabicName: 'جامع مركز دبي المالي العالمي',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Gate Avenue, DIFC, Dubai, UAE',
    lat: 25.2078,
    lng: 55.2798,
    imageUrl: 'https://images.unsplash.com/photo-1512632570417-a6096acb1735?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '05:03', dhuhr: '12:15', asr: '15:35', maghrib: '17:52', isha: '19:07' },
    description: 'A contemporary architectural masterpiece wrapped in an intricate Islamic Mashrabiya geometric screen overlooking Dubai skyline.'
  },
  {
    id: 'mosque-4',
    name: 'Sheikh Zayed Grand Mosque',
    arabicName: 'جامع الشيخ زايد الكبير',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    address: 'Sheikh Rashid Bin Saeed St, Abu Dhabi, UAE',
    lat: 24.4128,
    lng: 54.4750,
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '05:07', dhuhr: '12:18', asr: '15:39', maghrib: '17:55', isha: '19:10' },
    description: 'One of the largest mosques in the world, renowned for 82 white marble domes, 24k gold chandeliers, and reflective water pools.'
  },
  {
    id: 'mosque-5',
    name: 'Masjid Al-Haram (The Sacred Mosque)',
    arabicName: 'المسجد الحرام بمكة المكرمة',
    city: 'Mecca',
    country: 'Saudi Arabia',
    address: 'Al Haram, Makkah 24231, Saudi Arabia',
    lat: 21.4225,
    lng: 39.8262,
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '05:05', dhuhr: '12:14', asr: '15:34', maghrib: '17:54', isha: '19:09' },
    description: 'The holiest site in Islam surrounding the Holy Kaaba, with non-stop 24/7 circumambulation (Tawaf) and congregational prayers.'
  },
  {
    id: 'mosque-6',
    name: "Al-Masjid An-Nabawi (The Prophet's Mosque)",
    arabicName: 'المسجد النبوي الشريف',
    city: 'Medina',
    country: 'Saudi Arabia',
    address: 'Al Haram, Medina 42311, Saudi Arabia',
    lat: 24.4672,
    lng: 39.6111,
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '05:08', dhuhr: '12:15', asr: '15:35', maghrib: '17:53', isha: '19:08' },
    description: 'The city of light, famous for the iconic Green Dome, retractable automated umbrellas, and sacred Rawdah ash-Sharifah.'
  },
  {
    id: 'mosque-7',
    name: 'East London Mosque & London Muslim Centre',
    arabicName: 'مسجد شرق لندن والمركز الإسلامي',
    city: 'London',
    country: 'United Kingdom',
    address: '82-92 Whitechapel Rd, London E1 1JQ, UK',
    lat: 51.5186,
    lng: -0.0655,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: true, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '05:42', dhuhr: '12:51', asr: '15:39', maghrib: '17:58', isha: '19:35' },
    description: 'One of the oldest and largest mosques in Europe, pioneer of interfaith food banks and neighborhood mediation initiatives.'
  },
  {
    id: 'mosque-8',
    name: 'Islamic Cultural Center of New York',
    arabicName: 'المركز الثقافي الإسلامي بنيويورك',
    city: 'New York',
    country: 'United States',
    address: '1711 3rd Ave, New York, NY 10029, USA',
    lat: 40.7850,
    lng: -73.9515,
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    features: { isOpen24h: false, hasJumuah: true, hasWheelchair: true, hasWomenSection: true },
    prayerTimes: { fajr: '05:46', dhuhr: '12:44', asr: '15:45', maghrib: '18:10', isha: '19:36' },
    description: 'Prominent Manhattan landmark combining traditional Islamic geometric tilework with Manhattan modernist architectural grid.'
  }
];

export interface MadrasahCurriculum {
  ayahOfTheDay: {
    surahNumber: number;
    ayahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    arabicText: string;
    englishTranslation: string;
    tafsirIbnKathir: string;
    audioUrl: string;
  };
  hadithOfTheDay: {
    source: string;
    hadithNumber: string;
    narrator: string;
    arabicText: string;
    englishText: string;
    practicalLesson: string;
  };
  nameOfAllah: {
    number: number;
    arabic: string;
    transliteration: string;
    meaning: string;
    explanation: string;
    duaSuggestion: string;
  };
  seerahStory: {
    episode: number;
    title: string;
    period: string;
    narrative: string;
    moralTakeaway: string;
  };
  fiqhTip: {
    category: string;
    question: string;
    ruling: string;
    dalil: string;
  };
  dailyQuiz: {
    questions: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
  };
}

export const DAILY_MADRASAH: MadrasahCurriculum = {
  ayahOfTheDay: {
    surahNumber: 59,
    ayahNumber: 24,
    surahNameArabic: 'سورة الحشر',
    surahNameEnglish: 'Surah Al-Hashr',
    arabicText: 'هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ يُسَبِّحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ',
    englishTranslation: 'He is Allah, the Creator, the Evolver (Al-Bari), the Fashioner of forms; to Him belong the most beautiful names. All that is in the heavens and the earth glorifies Him, and He is the Exalted in Might, the Wise.',
    tafsirIbnKathir: 'Al-Bari denotes the One who executes what He creates and brings it into physical manifestation without prior defect. He creates out of sheer Nothingness, evolving every creation toward its divine purpose with precision and grace.',
    audioUrl: 'https://verses.quran.com/AbdulBaset/Murattal/mp3/059024.mp3'
  },
  hadithOfTheDay: {
    source: 'Sahih Al-Bukhari & Sahih Muslim',
    hadithNumber: 'Book 1, Hadith 43',
    narrator: 'Narrated by Abu Hurairah (RA)',
    arabicText: 'إِنَّ اللَّهَ كَتَبَ كِتَابًا قَبْلَ أَنْ يَخْلُقَ الْخَلْقَ: إِنَّ رَحْمَتِي سَبَقَتْ غَضَبِي',
    englishText: 'The Messenger of Allah (PBUH) said: "When Allah completed the creation, He inscribed in His Book which is with Him above the Throne: Verily, My mercy prevails over My wrath."',
    practicalLesson: 'Let compassion precede judgment in every dispute. Whenever dealing with neighbors, business partners, or family, lead with patience and benevolence.'
  },
  nameOfAllah: {
    number: 5,
    arabic: 'الْبَارِئُ',
    transliteration: 'Al-Bāri’',
    meaning: 'The Evolver, The Maker, The Harmonizer of Creation',
    explanation: 'Al-Bari brings into existence beings with distinct physical faculties, aligning each creature with its natural ecosystem so that all life coexists in regenerative equilibrium.',
    duaSuggestion: 'Ya Bari, evolve our understanding, heal our broken systems, and mold our actions into mirrors of Your divine compassion.'
  },
  seerahStory: {
    episode: 48,
    title: 'The Constitution of Medina: History’s First Egalitarian Social Contract',
    period: 'Year 1 AH (Post-Hijrah)',
    narrative: 'Upon arriving in Yathrib (Medina), the Prophet Muhammad (PBUH) drafted a revolutionary legal compact between the Muslim Emigrants (Muhajirun), the Medina Helpers (Ansar), and the indigenous Jewish tribes. The covenant recognized all signatories as "one single Ummah (community) distinct from other people," ensuring absolute freedom of religious practice, mutual defense obligations, and equal judicial protection.',
    moralTakeaway: 'Civil harmony requires formal legal protections for religious and ethnic minorities, where diversity strengthens rather than fractures the commonwealth.'
  },
  fiqhTip: {
    category: 'Ethical Trade & Muamalat',
    question: 'How does Islamic jurisprudence treat predatory interest (Riba) vs profit-and-loss partnership (Mudarabah)?',
    ruling: 'Guaranteed fixed returns charged on money without productive asset backing are strictly forbidden. In contrast, sharing real profits and absorbing fair risks through tangible, nature-backed enterprise is strongly encouraged.',
    dalil: 'Quran 2:275 "Allah has permitted trade and forbidden usury."'
  },
  dailyQuiz: {
    questions: [
      {
        question: 'What is the precise meaning of the divine attribute "Al-Bari" (البارئ) in Quran 59:24?',
        options: [
          'The Evolver / The Maker who manifests creation with purpose',
          'The Silent Observer',
          'The Strict Punisher',
          'The Sovereign of Gold'
        ],
        correctIndex: 0,
        explanation: 'Al-Bari means The Evolver and Maker who produces creation and brings it from non-existence into physical form.'
      },
      {
        question: 'Which constitutional document drafted by the Prophet (PBUH) established equal civil rights for all citizens regardless of faith?',
        options: [
          'The Treaty of Hudaybiyyah',
          'The Constitution of Medina (Sahifat al-Madinah)',
          'The Farewell Sermon',
          'The Pact of Umar'
        ],
        correctIndex: 1,
        explanation: 'The Constitution of Medina (1 AH) united Muslims, Jews, and other tribes into one civic commonwealth with full freedom of worship.'
      },
      {
        question: 'According to the Hadith Qudsi, what divine characteristic prevails over wrath?',
        options: [
          'Divine Severity',
          'Divine Mercy',
          'Divine Wealth',
          'Divine Seclusion'
        ],
        correctIndex: 1,
        explanation: '"Verily, My mercy prevails over My wrath" — inscribed above the Throne.'
      }
    ]
  }
};

export interface AlMizanArticle {
  id: string;
  headline: string;
  category: 'World' | 'Ghana' | 'Dubai' | 'Business' | 'Technology' | 'Health' | 'Environment' | 'Conflict';
  country: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  trendingScore: number;
  imageUrl: string;
  summary: string;
  islamicMapping: {
    quranVerse: {
      surah: string;
      ayah: string;
      arabic: string;
      english: string;
    };
    advice: string;
    whyThisAdvice: string;
  };
}

export const AL_MIZAN_ARTICLES: AlMizanArticle[] = [
  {
    id: 'mizan-1',
    headline: 'Global Sovereign Debt Crisis Reaches $97 Trillion as Developing Nations Struggle with Interest Payments',
    category: 'Business',
    country: 'Global',
    source: 'Financial Times / World Bank Report',
    sourceUrl: 'https://worldbank.org',
    publishedAt: '2 hours ago',
    trendingScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    summary: 'Dozens of sovereign nations now expend more than 35% of their total tax revenues purely on servicing foreign currency debt interest, starving schools, hospitals, and basic infrastructure.',
    islamicMapping: {
      quranVerse: {
        surah: 'Surah Al-Baqarah',
        ayah: '2:275-276',
        arabic: 'الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ الَّذِي يَتَخَبَّطُهُ الشَّيْطَانُ مِنَ الْمَسِّ ۚ ذَٰلِكَ بِأَنَّهُمْ قَالُوا إِنَّمَا الْبَيْعُ مِثْلُ الرِّبَا ۗ وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
        english: 'Those who consume interest cannot stand except as one stands who is being beaten by Satan into insanity... Allah has permitted trade and forbidden interest.'
      },
      advice: 'The global community must transition from compound-interest debt servitude to asset-backed, equity-sharing partnership financing. Creditor institutions should forgive distressed sovereign debts to liberate developing populations from systemic poverty.',
      whyThisAdvice: 'Usury creates unearned wealth without production, siphoning resources from the poor to capital hoarders. Islam demands that finance serve real human dignity, where investors share real operational risk instead of trapping entire nations in perpetual compound interest.'
    }
  },
  {
    id: 'mizan-2',
    headline: 'COP Climate Summit Discloses Record Ocean Temperature Anomaly and Amazon Deforestation Rate',
    category: 'Environment',
    country: 'Global',
    source: 'UN Environment Programme',
    sourceUrl: 'https://unep.org',
    publishedAt: '3 hours ago',
    trendingScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80',
    summary: 'Global environmental monitors report unprecedented coral bleaching and land degradation, warning that commercial short-term exploitation threatens biological tipping points.',
    islamicMapping: {
      quranVerse: {
        surah: 'Surah Ar-Rum',
        ayah: '30:41',
        arabic: 'ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ لِيُذِيقَهُم بَعْضَ الَّذِي عَمِلُوا لَعَلَّهُمْ يَرْجِعُونَ',
        english: 'Corruption has appeared throughout the land and sea by reason of what the hands of people have earned, that He may let them taste part of [the consequence of] what they have done that perhaps they will return [to righteousness].'
      },
      advice: 'Governments and multi-national corporations must view the natural biosphere as a sacred trust (Amanah). Nature must be treated as the foundational benchmark of all industry, banning destructive extractivism in favor of regenerative conservation.',
      whyThisAdvice: 'Allah created the Earth in delicate cosmic equilibrium (Mizan). Whenever human greed violates this balance, systemic ecological collapse ensues. Healing the planet requires moral repentance and immediate policy overhaul.'
    }
  },
  {
    id: 'mizan-3',
    headline: 'Autonomous Artificial Intelligence Superclusters Accelerate While Tech Layoffs Surge Globally',
    category: 'Technology',
    country: 'United States & Dubai',
    source: 'TechCrunch / Reuters',
    sourceUrl: 'https://reuters.com',
    publishedAt: '4 hours ago',
    trendingScore: 91,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    summary: 'Rapid adoption of frontier generative models and robotics is boosting corporate capital valuations while displacing hundreds of thousands of knowledge workers without safety nets.',
    islamicMapping: {
      quranVerse: {
        surah: 'Surah Al-Hashr',
        ayah: '59:7',
        arabic: 'كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ',
        english: '...so that it may not be a circuit merely between the wealthy among you.'
      },
      advice: 'Technological automation should enrich and liberate all human beings, not concentrate wealth in the hands of a dozen tech oligarchs. Productivity dividends from AI must fund free universal basic needs: food, housing, healthcare, electricity, and connectivity.',
      whyThisAdvice: 'Knowledge in Islam is a universal gift to uplift creation. When technology is privatized solely to eliminate laborers for shareholder margin, it violates the Islamic principle of preventing capital from circulating exclusively among the rich.'
    }
  },
  {
    id: 'mizan-4',
    headline: 'Ghana Inaugurates National Infrastructure and Clean Water Grid in Central Region',
    category: 'Ghana',
    country: 'Ghana',
    source: 'Ghana News Agency',
    sourceUrl: 'https://gna.org.gh',
    publishedAt: '5 hours ago',
    trendingScore: 89,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    summary: 'Community stakeholders in Apam and Winneba celebrate new solar desalination and clean aquifer pipe network delivering free potable water to 80,000 residents.',
    islamicMapping: {
      quranVerse: {
        surah: 'Surah Al-Anbiya',
        ayah: '21:30',
        arabic: 'وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ ۖ أَفَلَا يُؤْمِنُونَ',
        english: 'And We made from water every living thing. Then will they not believe?'
      },
      advice: 'The provision of clean water is the greatest ongoing charity (Sadaqah Jariyah). Community leadership should protect these aquifers with zero commercial tolling, ensuring equitable access for all regardless of tribal or economic status.',
      whyThisAdvice: 'Prophet Muhammad (PBUH) was asked: "Which charity is best?" He replied: "Providing water." Free water is the bedrock of civilization, health, and peace.'
    }
  },
  {
    id: 'mizan-5',
    headline: 'Dubai DIFC Announces Expansion of Global Islamic Philanthropy and Sovereign Green Sukuk Rails',
    category: 'Dubai',
    country: 'United Arab Emirates',
    source: 'Emirates News Agency (WAM)',
    sourceUrl: 'https://wam.ae',
    publishedAt: '6 hours ago',
    trendingScore: 87,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    summary: 'Dubai International Financial Centre establishes multi-billion dollar green finance framework dedicated to cross-border African and Asian renewable power grids.',
    islamicMapping: {
      quranVerse: {
        surah: 'Surah Al-Baqarah',
        ayah: '2:261',
        arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
        english: 'The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears; in each ear is a hundred grains.'
      },
      advice: 'Deploying institutional capital toward green, life-sustaining infrastructure multiplies wealth for both the investor and the earth. Sovereign capital must continuously prioritize vulnerable communities over speculative paper derivatives.',
      whyThisAdvice: 'Sukuk represents real ownership of productive assets rather than mere IOUs. Directing Islamic capital to African energy transition aligns financial reward with Quranic environmental justice.'
    }
  }
];

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: 'Muslim' | 'Friend of Peace (Non-Muslim)' | 'Student of Knowledge';
  location: string;
  category: 'Peace Project' | 'Question & Inquiry' | 'Du’a Request' | 'Halal Business & Ethical Tech';
  title: string;
  content: string;
  timeAgo: string;
  amenCount: number;
  commentsCount: number;
  isVerified: boolean;
}

export const COMMUNITY_FEED: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Abdul-Bari (Al-Bari) / Listowel Sarsah',
    authorRole: 'Muslim',
    location: 'Accra, Ghana & DIFC Dubai',
    category: 'Peace Project',
    title: 'The Blueprint: Free Housing, Clean Water & Power for Billions Grounded in Quranic Trusteeship',
    content: 'We are deploying the architecture of IGPD where nature is the benchmark of financial valuation. We invite engineers, institutional financiers, and thinkers of all faiths to collaborate with us. Investors will profit handsomely, yet basic survival will be unconditionally free for all humanity.',
    timeAgo: '1 hour ago',
    amenCount: 1420,
    commentsCount: 88,
    isVerified: true
  },
  {
    id: 'post-2',
    authorName: 'Sarah Jenkins',
    authorRole: 'Friend of Peace (Non-Muslim)',
    location: 'London, United Kingdom',
    category: 'Question & Inquiry',
    title: 'As a Christian environmentalist, how can our church collaborate with Masjid Al-Noor on solar grids?',
    content: 'I was deeply moved by the IGPD declaration quoting Genesis and the Quran together. Our community in East London wants to co-fund a localized neighborhood solar micro-grid with our neighboring mosque. Where can we submit our project brief?',
    timeAgo: '4 hours ago',
    amenCount: 890,
    commentsCount: 42,
    isVerified: false
  },
  {
    id: 'post-3',
    authorName: 'Ibrahim Al-Mansoor',
    authorRole: 'Student of Knowledge',
    location: 'Medina, Saudi Arabia',
    category: 'Du’a Request',
    title: 'Du’a for peace across Sudan, Palestine, and all afflicted regions of the world',
    content: 'O Allah, The Most Merciful, protect the innocent children, feed the hungry, clothe the displaced, and soften the hearts of political leaders. Replace war with dialogue and poverty with abundance. Ameen Ya Rabb al-Alameen.',
    timeAgo: '6 hours ago',
    amenCount: 3120,
    commentsCount: 114,
    isVerified: true
  },
  {
    id: 'post-4',
    authorName: 'Kwame Mensah & Alhaji Dawud',
    authorRole: 'Muslim',
    location: 'Apam, Central Region, Ghana',
    category: 'Halal Business & Ethical Tech',
    title: 'Fisheries Cold-Storage Co-Op Operating on Zero-Interest Mudarabah',
    content: 'Our inter-community coastal collective in Apam has eliminated middleman usury loans by pooling 12 solar refrigeration units. Fishmongers and fishermen now share proceeds equitably with zero debt default risk. Alhamdulillah!',
    timeAgo: '8 hours ago',
    amenCount: 975,
    commentsCount: 36,
    isVerified: false
  }
];
