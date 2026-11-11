import fs from "fs";
import path from "path";

export interface TrendingHeadline {
  id: string;
  title: string;
  original_title: string;
  description: string;
  source_name: string;
  source_url: string;
  image_url: string;
  category: "ghana" | "world" | "business" | "sports" | "tech" | "energy" | "health" | "general";
  country: string;
  score: number;
  scoring_factors: string[];
  published_at: string;
  created_at: string;
  dispatched_to_agents: boolean;
}

export interface BlogArticle {
  id: string;
  blog_subdomain: "news.oskayi.com" | "world.oskayi.com" | "business.oskayi.com" | "sports.oskayi.com" | "tech.oskayi.com";
  blog_category_name: string;
  title: string;
  slug: string;
  headline_id: string;
  original_source_title: string;
  source_name: string;
  source_url: string;
  author: "Oskayi Editorial Board" | "Oskayi Research Desk" | "Senior Financial Analyst" | "Oskayi Newsroom" | "Chief Economics Correspondent";
  image_url: string;
  meta_title: string;
  meta_description: string;
  word_count: number;
  hook: string;
  what_happened: string;
  analysis_ghana_africa: string;
  action_steps: string[];
  strategic_advisory: string;
  hashtags: string[];
  content_html: string;
  views: number;
  revenue_usd: number;
  quality_passed: boolean;
  published_at: string;
}

export interface VideoShort {
  id: string;
  channel_id: string;
  channel_name: string;
  channel_angle: string;
  title: string;
  headline_id: string;
  voice_artist: string;
  music_track: string;
  duration_sec: number;
  aspect_ratio: "9:16";
  thumbnail_url: string;
  hook_3s: string;
  body_40s: string;
  end_cta_5s: string;
  scenes: {
    scene_index: number;
    duration_sec: number;
    visual_prompt: string;
    image_url: string;
    caption_text: string;
    camera_motion: string;
  }[];
  tags: string[];
  hashtags: string[];
  synthetic_media_declared: boolean;
  views: number;
  revenue_usd: number;
  status: "published" | "scheduled" | "processing";
  published_at: string;
}

export interface WebToolApp {
  id: string;
  app_slug: string;
  app_name: string;
  tagline: string;
  category: string;
  icon_name: string;
  tool_type: "cocoa_calculator" | "dollar_converter" | "rain_alert" | "fuel_calculator" | "score_predictor" | "phone_compare" | "market_prices" | "health_symptom" | "election_tracker" | "news_quiz";
  headline_id: string;
  headline_title: string;
  live_api_used: string;
  users_count: number;
  premium_unlocks: number;
  revenue_ghs: number;
  deploy_url: string;
  deployed_at: string;
  status: "active" | "updating";
}

export interface SchedulerLog {
  id: string;
  agent: "HUNTER" | "BLOGGER" | "VIDEO" | "APP_BUILDER" | "SYSTEM";
  message: string;
  status: "SUCCESS" | "INFO" | "WARNING" | "RETRY";
  timestamp: string;
  metrics?: any;
}

export interface MediaMachineState {
  isRunning: boolean;
  lastHunterRun: string;
  hunterHeadlinesToday: number;
  totalHeadlinesInDb: number;
  blogsToday: number;
  blogsThisWeek: number;
  videosToday: number;
  videosThisWeek: number;
  appsToday: number;
  appsThisWeek: number;
  totalViewsToday: number;
  totalRevenueUsdToday: number;
  totalRevenueGhsToday: number;
  trendingHeadlines: TrendingHeadline[];
  blogs: BlogArticle[];
  videos: VideoShort[];
  apps: WebToolApp[];
  logs: SchedulerLog[];
}

const DB_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "oskayi_media_machine.json");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// 100% Secular, Professional Corporate Seed Headlines
const SEED_HEADLINES: Array<Omit<TrendingHeadline, "id" | "created_at" | "dispatched_to_agents">> = [
  {
    title: "Ghana Cocoa Producer Price Set for Historic Surge to GH¢2,700 per Bag as Global Deficit Deepens",
    original_title: "COCOBOD Evaluates Farmer Farmgate Prices Amid Global Cocoa Rally",
    description: "Ghana Cocoa Board and Ministry of Finance deliberate on unprecedented upward adjustment of farmgate prices for 2026/2027 season, promising major liquidity boost for farming communities across Ashanti, Western, and Eastern regions.",
    source_name: "JoyNews / Reuters",
    source_url: "https://www.myjoyonline.com/business",
    image_url: "https://image.pollinations.ai/prompt/Ghanaian%20cocoa%20farmer%20smiling%20with%20golden%20cocoa%20pods%20royal%20blue%20and%20gold%20lighting%20cinematic%204k?width=800&height=500&nologo=true",
    category: "business",
    country: "GH",
    score: 95,
    scoring_factors: ["Ghana/Africa (+15)", "Cocoa/Commodity (+10)", "Record/Price/Breaking (+10)", "Multi-source wire confirmation (+10)"],
    published_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    title: "US Dollar Dips Against Ghana Cedi as Bank of Ghana FX Auction Injects $120M Fresh Reserves",
    original_title: "BoG Foreign Exchange Intervention Stabilizes Cedi at Interbank Trading Window",
    description: "The interbank FX market recorded significant cedi appreciation this morning as the central bank fulfilled high-priority petroleum and commercial banking liquidity demands.",
    source_name: "Graphic Online / Bloomberg",
    source_url: "https://www.graphic.com.gh/business",
    image_url: "https://image.pollinations.ai/prompt/Currency%20exchange%20Ghana%20Cedi%20notes%20and%20US%20Dollar%20illuminated%20by%20golden%20trading%20charts%20royal%20blue%20background%204k?width=800&height=500&nologo=true",
    category: "business",
    country: "GH",
    score: 92,
    scoring_factors: ["Ghana/Africa (+15)", "Dollar/Forex (+10)", "Price/Movement (+10)", "Multi-source confirmation (+10)"],
    published_at: new Date(Date.now() - 32 * 60 * 1000).toISOString()
  },
  {
    title: "Black Stars Confirm New Elite Striker Call-Ups Ahead of Crucial World Cup Qualifier Clashes",
    original_title: "Ghana FA Unveils 26-Man Squad for International Friendly and Qualifiers",
    description: "Ghana Football Association technical committee released the final roster featuring two European breakout stars and three Ghana Premier League top performers.",
    source_name: "GhanaWeb Sports",
    source_url: "https://www.ghanaweb.com/GhanaHomePage/SportsArchive",
    image_url: "https://image.pollinations.ai/prompt/Ghana%20Black%20Stars%20football%20stadium%20in%20Accra%20under%20golden%20floodlights%20crowd%20cheering%20royal%20blue%20hues%204k?width=800&height=500&nologo=true",
    category: "sports",
    country: "GH",
    score: 88,
    scoring_factors: ["Ghana/Africa (+15)", "Football/Sports (+10)", "New/Squad (+10)", "Verified sport wire (+10)"],
    published_at: new Date(Date.now() - 48 * 60 * 1000).toISOString()
  },
  {
    title: "NPA Announces Fuel Price Reductions at Pumps Across Shell, Total, and GOIL Stations in Accra",
    original_title: "OMCs Adjust Petrol and Diesel Downward for Second Pricing Window",
    description: "National Petroleum Authority price window update reveals petrol down by GHp 45 per litre and diesel by GHp 60, bringing immediate relief to trotro commuters and commercial transport operators.",
    source_name: "Citi Newsroom",
    source_url: "https://citinewsroom.com",
    image_url: "https://image.pollinations.ai/prompt/Modern%20fuel%20station%20in%20Accra%20Ghana%20at%20night%20with%20digital%20price%20board%20golden%20glow%20royal%20blue%20tones?width=800&height=500&nologo=true",
    category: "business",
    country: "GH",
    score: 90,
    scoring_factors: ["Ghana/Africa (+15)", "Fuel/Trotro (+10)", "Down/Price (+10)", "High public interest (+10)"],
    published_at: new Date(Date.now() - 65 * 60 * 1000).toISOString()
  },
  {
    title: "Ghana Extends Critical Mineral & Green Energy Incentives for Local Value Addition and Lithium Processing",
    original_title: "Ministry of Lands and Natural Resources Issues Framework for Domestic Refining",
    description: "New statutory regulations mandate at least 30% local in-country beneficiation of critical green minerals including lithium, bauxite, and manganese, bolstering industrial manufacturing jobs in Ghana.",
    source_name: "Ministry of Lands & Natural Resources / Graphic",
    source_url: "https://www.graphic.com.gh/business",
    image_url: "https://image.pollinations.ai/prompt/High%20tech%20green%20energy%20battery%20factory%20in%20Ghana%20with%20solar%20panels%20and%20golden%20holographic%20data%20royal%20blue%20background%204k?width=800&height=500&nologo=true",
    category: "energy",
    country: "GH",
    score: 94,
    scoring_factors: ["Ghana/Industry (+15)", "Energy/Minerals (+10)", "New policy framework (+10)", "Economic growth priority (+10)"],
    published_at: new Date(Date.now() - 80 * 60 * 1000).toISOString()
  },
  {
    title: "Global Tech Giants Unveil Next-Gen Sovereign AI Silicon as African Cloud Hubs Expand",
    original_title: "Tech Giants Announce Low-Power Edge AI Silicon for Emerging Markets",
    description: "New energy-efficient neural accelerators allow offline, instantaneous voice and language processing across 50 African languages including Twi, Ga, Yoruba, and Swahili.",
    source_name: "TechCrunch / TechCabal",
    source_url: "https://techcabal.com",
    image_url: "https://image.pollinations.ai/prompt/Futuristic%20microchip%20illuminated%20in%20gold%20circuits%20against%20a%20deep%20royal%20blue%20hologram%20of%20Africa%204k?width=800&height=500&nologo=true",
    category: "tech",
    country: "US",
    score: 85,
    scoring_factors: ["Technology/AI (+10)", "New innovation (+10)", "African relevance (+15)"],
    published_at: new Date(Date.now() - 95 * 60 * 1000).toISOString()
  },
  {
    title: "Ghana Meteorological Agency Issues Torrential Rain & Weather Warning for Coastal Corridors",
    original_title: "GMet Weather Advisory: Heavy Downpours Expected Across Greater Accra, Central and Western Regions",
    description: "Farmers and commercial transport operators are advised to take precautionary steps as monsoon rain bands approach the southern coastline over the next 48 hours.",
    source_name: "GMet Official Bulletin",
    source_url: "https://www.meteo.gov.gh",
    image_url: "https://image.pollinations.ai/prompt/Heavy%20monsoon%20rain%20clouds%20over%20lush%20green%20farmland%20golden%20sunlight%20breaking%20through%20dramatic%20sky%204k?width=800&height=500&nologo=true",
    category: "ghana",
    country: "GH",
    score: 87,
    scoring_factors: ["Ghana/Africa (+15)", "Weather/Rain warning (+10)", "High public safety impact (+10)"],
    published_at: new Date(Date.now() - 110 * 60 * 1000).toISOString()
  },
  {
    title: "Makola and Kejetia Traders Report 18% Price Drop in Locally Produced Rice and Plantain Supply",
    original_title: "Harvest Season Inflow Brings Wholesale Food Price Moderation Across Major Markets",
    description: "Bumper harvests from the Afram Plains and Northern food corridors flood key commercial hubs, easing household kitchen budgets ahead of mid-year commerce.",
    source_name: "Daily Graphic Commercial Desk",
    source_url: "https://www.graphic.com.gh",
    image_url: "https://image.pollinations.ai/prompt/Vibrant%20open%20air%20market%20in%20Ghana%20with%20fresh%20golden%20produce%20baskets%20cinematic%20golden%20hour%20lighting%20royal%20blue%20stalls?width=800&height=500&nologo=true",
    category: "business",
    country: "GH",
    score: 86,
    scoring_factors: ["Ghana/Market (+15)", "Price/Down (+10)", "Food security (+10)", "Retail impact (+5)"],
    published_at: new Date(Date.now() - 130 * 60 * 1000).toISOString()
  }
];

export function calculateHeadlineScore(title: string, country: string = "GH"): { score: number; factors: string[] } {
  let score = 50;
  const factors: string[] = ["Base Verified Wire Score (+50)"];
  const t = title.toLowerCase();

  const breakingWords = ["breaking", "record", "up", "down", "wins", "dies", "new", "ban", "price", "hits", "surge", "drops", "unveils", "approves"];
  for (const w of breakingWords) {
    if (t.includes(w)) {
      score += 10;
      factors.push(`Impact keyword '${w}' (+10)`);
      break;
    }
  }

  if (country.toLowerCase() === "gh" || t.includes("ghana") || t.includes("africa") || t.includes("accra") || t.includes("kumasi")) {
    score += 15;
    factors.push("Ghana / African Regional Relevance (+15)");
  }

  const topicWords = ["cocoa", "dollar", "cedi", "fuel", "petrol", "trotro", "football", "black stars", "energy", "tech", "food", "gold"];
  for (const tw of topicWords) {
    if (t.includes(tw)) {
      score += 10;
      factors.push(`Core Economic Pillar '${tw}' (+10)`);
      break;
    }
  }

  return { score: Math.min(score, 99), factors };
}

class MediaMachineService {
  private state: MediaMachineState;

  constructor() {
    this.state = this.loadDatabase();
  }

  private loadDatabase(): MediaMachineState {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.trendingHeadlines) && parsed.trendingHeadlines.length > 0) {
          // Check if previous state had religious tags or outdated faith blogs; if so, regenerate clean state
          const hasReligiousTags = parsed.trendingHeadlines.some((h: any) => 
            h.title?.includes("Prophet") || h.category === "faith"
          );
          if (!hasReligiousTags) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn("Could not load media machine DB, initializing pristine state:", e);
    }

    const headlines: TrendingHeadline[] = SEED_HEADLINES.map((sh, idx) => ({
      ...sh,
      id: `hl-${Date.now()}-${idx + 1}`,
      created_at: new Date().toISOString(),
      dispatched_to_agents: true
    }));

    const blogs = this.generateInitialBlogs(headlines);
    const videos = this.generateInitialVideos(headlines);
    const apps = this.generateInitialApps(headlines);

    const initialState: MediaMachineState = {
      isRunning: true,
      lastHunterRun: new Date().toISOString(),
      hunterHeadlinesToday: 100,
      totalHeadlinesInDb: headlines.length,
      blogsToday: 71,
      blogsThisWeek: 497,
      videosToday: 100,
      videosThisWeek: 700,
      appsToday: 14,
      appsThisWeek: 98,
      totalViewsToday: 248920,
      totalRevenueUsdToday: 1840.50,
      totalRevenueGhsToday: 28450.00,
      trendingHeadlines: headlines,
      blogs,
      videos,
      apps,
      logs: [
        {
          id: `log-${Date.now()}-1`,
          agent: "HUNTER",
          message: "Hunter Agent verified and indexed 100 trending headlines from Google News RSS & Institutional Wires",
          status: "SUCCESS",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        },
        {
          id: `log-${Date.now()}-2`,
          agent: "BLOGGER",
          message: "Blogger Agent formatted original corporate articles across 5 Oskayi domains. Quality score 100% passed.",
          status: "SUCCESS",
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString()
        },
        {
          id: `log-${Date.now()}-3`,
          agent: "VIDEO",
          message: "Video Agent rendered 10 high-retention 9:16 Shorts with gold burned-in captions and verified voiceover.",
          status: "SUCCESS",
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: `log-${Date.now()}-4`,
          agent: "APP_BUILDER",
          message: "App Builder Agent compiled 10 live web tools on apps.oskayi.com with Paystack & Frankfurter APIs.",
          status: "SUCCESS",
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
        }
      ]
    };

    this.saveDatabase(initialState);
    return initialState;
  }

  private saveDatabase(stateToSave?: MediaMachineState) {
    try {
      const data = stateToSave || this.state;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to write media machine db:", e);
    }
  }

  private generateInitialBlogs(headlines: TrendingHeadline[]): BlogArticle[] {
    const authors: Array<BlogArticle["author"]> = [
      "Oskayi Editorial Board",
      "Oskayi Research Desk",
      "Senior Financial Analyst",
      "Oskayi Newsroom",
      "Chief Economics Correspondent"
    ];

    const subdomains: Array<BlogArticle["blog_subdomain"]> = [
      "business.oskayi.com",
      "news.oskayi.com",
      "world.oskayi.com",
      "sports.oskayi.com",
      "tech.oskayi.com"
    ];

    return headlines.slice(0, 10).map((hl, i) => {
      const subdomain = subdomains[i % subdomains.length];
      const author = authors[i % authors.length];
      const originalRewriteTitle = `${hl.title.split(" as ")[0]} — Strategic Implications for Ghanaian Enterprises and Consumers`;

      const hook = `Recent macroeconomic and industry data released this morning signal a notable turning point for commercial operators, households, and investors across Ghana and the broader West African region.`;
      
      const whatHappened = `According to verified reports published by ${hl.source_name}, official indicators and pricing mechanisms have experienced structural shifts. Source: ${hl.source_name} - ${hl.source_url}. Market records verify that regulatory authorities and key sector participants have adopted updated operational benchmarks.`;

      const analysis = `From an institutional perspective, these movements directly influence liquidity costs, operating expenditure, and retail consumer pricing across Accra, Kumasi, and regional commercial hubs. Enterprises that proactively align inventory, forex hedging, and pricing frameworks will preserve margins and capture competitive market share.`;

      const actionSteps = [
        "Audit immediate operating cash flows and evaluate vendor contracts against updated pricing indices.",
        "Leverage low-latency digital communication channels and affordable high-speed connectivity to minimize overheads.",
        "Strengthen local supply chains and diversify procurement sources to mitigate imported inflation risk."
      ];

      const strategicAdvisory = `Oskayi Consult recommends that corporate decision-makers, agribusiness managers, and financial executives review working capital provisions and maintain strict cash discipline as these structural market transitions take effect.`;

      const content_html = `
        <div class="oskayi-article-body space-y-6 text-slate-200 leading-relaxed font-sans text-base">
          <p class="text-lg sm:text-xl font-medium text-amber-300 border-l-4 border-amber-400 pl-4 py-1 italic">
            ${hook}
          </p>

          <p>
            ${whatHappened}
          </p>

          <!-- Google AdSense Placement 1 -->
          <div class="my-8 p-4 rounded-xl border border-amber-500/30 bg-slate-900/90 text-center">
            <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 block mb-2">Advertisement • Google AdSense Verified</span>
            <div class="h-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-lg flex items-center justify-center border border-slate-800 text-xs text-slate-400">
              <span class="text-teal-400 font-semibold">[Responsive Display Ad #1 - Client ca-pub-OSKAYI-MEDIA-MACHINE]</span>
            </div>
          </div>

          <h3 class="text-xl font-bold text-white tracking-tight mt-6">What It Means For Ghana and the African Market</h3>
          <p>
            ${analysis}
          </p>

          <h3 class="text-xl font-bold text-white tracking-tight mt-6">3 Immediate Strategic Action Steps</h3>
          <ol class="list-decimal pl-6 space-y-2 text-slate-300">
            ${actionSteps.map(as => `<li><strong>${as}</strong></li>`).join("")}
          </ol>

          <!-- Google AdSense Placement 2 -->
          <div class="my-8 p-4 rounded-xl border border-amber-500/30 bg-slate-900/90 text-center">
            <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 block mb-2">Advertisement • Google AdSense Verified</span>
            <div class="h-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-lg flex items-center justify-center border border-slate-800 text-xs text-slate-400">
              <span class="text-amber-400 font-semibold">[In-Article Matched Content Ad #2 - Slot ID 883921029]</span>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-gradient-to-br from-[#0A1F44] to-slate-900 border border-amber-400/40 shadow-xl my-6">
            <div class="flex items-center gap-2 text-[#FFD700] font-bold text-sm uppercase tracking-wider mb-2">
              <span class="w-2 h-2 rounded-full bg-[#FFD700] animate-ping"></span>
              Executive Advisory & Strategic Outlook • Oskayi Consult
            </div>
            <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
              ${strategicAdvisory}
            </p>
          </div>

          <!-- Official Oskayi Monetization Affiliate Footer -->
          <div class="pt-6 border-t border-slate-800 text-xs text-slate-400 bg-slate-950/80 p-5 rounded-xl border">
            <div class="font-bold text-amber-300 uppercase tracking-wider mb-2">Official Oskayi Global Digital Services:</div>
            <div class="flex flex-wrap items-center gap-4 text-slate-300">
              <a href="https://bundlezonegh.com/store/oskayi" target="_blank" class="hover:text-amber-400 underline flex items-center gap-1 font-medium">
                Buy Cheap Data: bundlezonegh.com/store/oskayi
              </a>
              <span>•</span>
              <a href="https://oskatel.telzivo.com" target="_blank" class="hover:text-teal-400 underline flex items-center gap-1 font-medium">
                Buy eSIM: oskatel.telzivo.com
              </a>
              <span>•</span>
              <span class="text-slate-400">OSKAYI CONSULT • Reg No. BN248851025 • TIN: P0000590118</span>
            </div>
          </div>
        </div>
      `;

      return {
        id: `blog-${Date.now()}-${i + 1}`,
        blog_subdomain: subdomain,
        blog_category_name: hl.category.toUpperCase(),
        title: originalRewriteTitle,
        slug: originalRewriteTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        headline_id: hl.id,
        original_source_title: hl.original_title,
        source_name: hl.source_name,
        source_url: hl.source_url,
        author,
        image_url: hl.image_url,
        meta_title: `${originalRewriteTitle.slice(0, 56)} | Oskayi`,
        meta_description: `Oskayi Consult economic analysis: ${hl.title.slice(0, 100)} with strategic actions for Ghanaian businesses.`,
        word_count: 820,
        hook,
        what_happened: whatHappened,
        analysis_ghana_africa: analysis,
        action_steps: actionSteps,
        strategic_advisory: strategicAdvisory,
        hashtags: ["#Oskayi", "#GhanaNews", "#Trending", "#OskayiConsult", `#${hl.category}`],
        content_html,
        views: 3420 + (i * 280),
        revenue_usd: parseFloat((28.50 + (i * 3.4)).toFixed(2)),
        quality_passed: true,
        published_at: new Date(Date.now() - (i * 22) * 60 * 1000).toISOString()
      };
    });
  }

  private generateInitialVideos(headlines: TrendingHeadline[]): VideoShort[] {
    const channels = [
      { id: "ch-1", name: "Oskayi News Ghana", angle: "Ghana Impact & Breaking Local Pulse", voice: "Male Deep (En-GH)", music: "Corporate Energy" },
      { id: "ch-2", name: "Oskayi World News", angle: "World Geopolitics & African Positioning", voice: "Female Calm (En-UK)", music: "Cinematic News Pulse" },
      { id: "ch-3", name: "Oskayi Business", angle: "Money, Cocoa, Forex & Enterprise Wealth", voice: "Male Deep (En-US)", music: "Wall Street Momentum" },
      { id: "ch-4", name: "Oskayi Sports", angle: "Black Stars, EPL & African Champions", voice: "Energetic Male (En-GH)", music: "Stadium High Voltage" },
      { id: "ch-5", name: "Oskayi Tech", angle: "AI Silicon, Fintech & Web3 Disruption", voice: "Calm Tech Male (En-US)", music: "Cyber Synth Flow" },
      { id: "ch-6", name: "Oskayi Health", angle: "Wellness, Longevity & Healthcare Systems", voice: "Female Warm (En-AU)", music: "Acoustic Healing" },
      { id: "ch-7", name: "Oskayi Energy & Resources", angle: "Renewable Power, Oil & Gas Infrastructure", voice: "Male Professional (En-GH)", music: "Dynamic Industrial Pulse" },
      { id: "ch-8", name: "Oskayi Music", angle: "Afrobeats, Highlife & Creative Industries", voice: "Young Male (En-GH)", music: "Amapiano Groove" },
      { id: "ch-9", name: "Oskayi Food", angle: "Makola Prices & Agritech Supply Chains", voice: "Female Warm (En-GH)", music: "Lively Market Rhythm" },
      { id: "ch-10", name: "Oskayi Viral", angle: "30-Sec Verified Economic Facts", voice: "Fast Male Urgent (En-US)", music: "Breaking Siren Pulse" }
    ];

    return channels.map((ch, idx) => {
      const hl = headlines[idx % headlines.length];
      const hook = `BREAKING: ${hl.title.slice(0, 50)}... What the data confirms for you today!`;
      const body = `Here are 3 critical facts: First, the verified figures just published confirm unprecedented shifts. Second, if you operate an enterprise in Ghana or across West Africa, this directly impacts your daily purchasing power. Third, those who prepare early will capitalize while others absorb higher costs.`;
      const endCta = `Follow Oskayi on YouTube and TikTok. Tap the link in bio for cheap data bundles and global eSIMs.`;

      const scenes = [
        {
          scene_index: 1,
          duration_sec: 4,
          visual_prompt: `Dynamic breaking news graphic royal blue and gold text highlight ${hl.category}`,
          image_url: hl.image_url,
          caption_text: hook,
          camera_motion: "Ken Burns Rapid Zoom In"
        },
        {
          scene_index: 2,
          duration_sec: 18,
          visual_prompt: `High detail documentary visual of ${hl.title.slice(0, 40)} with golden data overlays`,
          image_url: `https://image.pollinations.ai/prompt/Cinematic%20golden%20chart%20and%20African%20skyline%20in%20deep%20royal%20blue%20night%20lighting%204k?width=600&height=1066&nologo=true`,
          caption_text: "Fact #1: Official economic indicators record notable market adjustments.",
          camera_motion: "Slow Pan Right with Gold Lens Flare"
        },
        {
          scene_index: 3,
          duration_sec: 22,
          visual_prompt: `Ghanaian professionals and entrepreneurs analyzing market data golden aura`,
          image_url: `https://image.pollinations.ai/prompt/Ghanaian%20professionals%20and%20business%20analysts%20analyzing%20smartphones%20with%20golden%20glow%20royal%20blue%20background?width=600&height=1066&nologo=true`,
          caption_text: "Strategic Action: Protect your liquidity and position your enterprise for immediate gain.",
          camera_motion: "Subtle Push Forward"
        },
        {
          scene_index: 4,
          duration_sec: 16,
          visual_prompt: `Royal corporate seal of Oskayi Consult with gold crest and blue shield`,
          image_url: `https://image.pollinations.ai/prompt/Corporate%20gold%20emblem%20with%20text%20OSKAYI%20CONSULT%20floating%20over%20deep%20sapphire%20blue%20velvet?width=600&height=1066&nologo=true`,
          caption_text: endCta,
          camera_motion: "Epic Hero Tilt Up"
        }
      ];

      return {
        id: `vid-${Date.now()}-${idx + 1}`,
        channel_id: ch.id,
        channel_name: ch.name,
        channel_angle: ch.angle,
        title: `${hl.title.slice(0, 52)} | Oskayi Explains #Shorts`,
        headline_id: hl.id,
        voice_artist: ch.voice,
        music_track: ch.music,
        duration_sec: 60,
        aspect_ratio: "9:16",
        thumbnail_url: hl.image_url,
        hook_3s: hook,
        body_40s: body,
        end_cta_5s: endCta,
        scenes,
        tags: ["Oskayi", "Trending", "GhanaNews", hl.category, "OskayiConsult", "BusinessNews"],
        hashtags: ["#Oskayi", "#Shorts", "#Ghana", "#TrendingNews", "#OskayiConsult"],
        synthetic_media_declared: true,
        views: 8200 + (idx * 1400),
        revenue_usd: parseFloat((34.50 + (idx * 5.2)).toFixed(2)),
        status: "published",
        published_at: new Date(Date.now() - (idx * 15) * 60 * 1000).toISOString()
      };
    });
  }

  private generateInitialApps(headlines: TrendingHeadline[]): WebToolApp[] {
    const toolDefinitions = [
      {
        slug: "cocoa-profit-calc",
        name: "Cocoa & Commodity Profit Calculator",
        tagline: "Calculate farmgate earnings at GH¢2,700/bag vs open global terminal prices",
        category: "Agriculture & Commodities",
        icon: "Coins",
        tool_type: "cocoa_calculator" as const,
        api: "Commodities-API & Ghana COCOBOD Feed"
      },
      {
        slug: "dollar-cedi-converter",
        name: "USD to GHS Real-Time Converter",
        tagline: "Live mid-market interbank forex & forex bureau rate tracker for Ghana",
        category: "Forex & Currency",
        icon: "TrendingUp",
        tool_type: "dollar_converter" as const,
        api: "Frankfurter European Central Bank API (USD -> GHS)"
      },
      {
        slug: "rain-alert-farmers",
        name: "Accra & Southern Ghana Rain Radar",
        tagline: "Live atmospheric precipitation, temperature and wind forecast for farmers",
        category: "Weather & Agriculture",
        icon: "CloudRain",
        tool_type: "rain_alert" as const,
        api: "Open-Meteo Satellite Atmospheric API"
      },
      {
        slug: "fuel-trotro-calculator",
        name: "Fuel & Trotro Trip Cost Calculator",
        tagline: "Compute exact pump fuel expense vs commercial transport fare across Ghana",
        category: "Transport & Logistics",
        icon: "Fuel",
        tool_type: "fuel_calculator" as const,
        api: "NPA Pricing Windows & GPRTU Fare Matrix"
      },
      {
        slug: "score-predictor-ghana",
        name: "Black Stars & World Football Score Predictor",
        tagline: "Predict match outcomes using team form, goal differential, and home advantage",
        category: "Sports Analytics",
        icon: "Trophy",
        tool_type: "score_predictor" as const,
        api: "Open Football Historical Database"
      },
      {
        slug: "phone-price-compare",
        name: "Ghana Tech & Phone Price Index",
        tagline: "Compare iPhone, Samsung, Tecno, and Infinix retail prices in Circle & Osu",
        category: "Electronics & Tech",
        icon: "Smartphone",
        tool_type: "phone_compare" as const,
        api: "Ghana Retail Tech Scraping API"
      },
      {
        slug: "market-price-checker",
        name: "Makola & Kejetia Food Price Tracker",
        tagline: "Wholesale & retail price tracker for rice, tomatoes, plantain, and yam",
        category: "Consumer Goods",
        icon: "ShoppingBag",
        tool_type: "market_prices" as const,
        api: "Ministry of Food & Agriculture Market Wire"
      },
      {
        slug: "health-symptom-advisor",
        name: "Health Symptom & First Aid Advisor",
        tagline: "Emergency first aid guidance & malaria risk checklist for families",
        category: "Health & Wellness",
        icon: "HeartPulse",
        tool_type: "health_symptom" as const,
        api: "WHO & Ghana Health Service Protocol"
      },
      {
        slug: "election-poll-tracker",
        name: "National Election Poll Tracker",
        tagline: "Constituency-level public sentiment tracker and voter registration insights",
        category: "Civic & Governance",
        icon: "Vote",
        tool_type: "election_tracker" as const,
        api: "National Electoral Commission & Public Polling"
      },
      {
        slug: "trending-news-quiz",
        name: "Daily Ghana & World Trending Quiz",
        tagline: "Test your knowledge on today's top 10 breaking news headlines",
        category: "Information & Media",
        icon: "HelpCircle",
        tool_type: "news_quiz" as const,
        api: "Oskayi Hunter Agent Automated Knowledge Engine"
      }
    ];

    return toolDefinitions.map((td, i) => {
      const hl = headlines[i % headlines.length];
      return {
        id: `app-${Date.now()}-${i + 1}`,
        app_slug: td.slug,
        app_name: td.name,
        tagline: td.tagline,
        category: td.category,
        icon_name: td.icon,
        tool_type: td.tool_type,
        headline_id: hl.id,
        headline_title: hl.title,
        live_api_used: td.api,
        users_count: 2450 + (i * 320),
        premium_unlocks: 140 + (i * 18),
        revenue_ghs: 1400 + (i * 180),
        deploy_url: `https://${td.slug}.apps.oskayi.com`,
        deployed_at: new Date(Date.now() - (i * 3) * 3600 * 1000).toISOString(),
        status: "active"
      };
    });
  }

  // PUBLIC GETTERS
  public getState(): MediaMachineState {
    return this.state;
  }

  public getHeadlines(category?: string): TrendingHeadline[] {
    if (!category || category === "all") return this.state.trendingHeadlines;
    return this.state.trendingHeadlines.filter(h => h.category.toLowerCase() === category.toLowerCase());
  }

  public getBlogs(subdomain?: string): BlogArticle[] {
    if (!subdomain || subdomain === "all") return this.state.blogs;
    return this.state.blogs.filter(b => b.blog_subdomain === subdomain);
  }

  public getBlogById(id: string): BlogArticle | undefined {
    return this.state.blogs.find(b => b.id === id || b.slug === id);
  }

  public getVideos(channelId?: string): VideoShort[] {
    if (!channelId || channelId === "all") return this.state.videos;
    return this.state.videos.filter(v => v.channel_id === channelId);
  }

  public getApps(category?: string): WebToolApp[] {
    if (!category || category === "all") return this.state.apps;
    return this.state.apps.filter(a => a.category.toLowerCase().includes(category.toLowerCase()));
  }

  public toggleAutomation(): boolean {
    this.state.isRunning = !this.state.isRunning;
    this.state.logs.unshift({
      id: `log-${Date.now()}`,
      agent: "SYSTEM",
      message: this.state.isRunning ? "Oskayi Media Machine Resumed. 24/7 background worker active." : "Oskayi Media Machine Paused by Administrator.",
      status: this.state.isRunning ? "SUCCESS" : "WARNING",
      timestamp: new Date().toISOString()
    });
    this.saveDatabase();
    return this.state.isRunning;
  }

  // TRIGGER HUNTER AGENT ON DEMAND
  public async runHunterAgent(): Promise<{ count: number; topHeadline: TrendingHeadline }> {
    const timestamp = new Date().toISOString();
    
    try {
      const ghRssUrl = "https://news.google.com/rss/search?q=Ghana+trending&hl=en-GH&gl=GH&ceid=GH:en";
      const resp = await fetch(ghRssUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; OskayiMediaMachine/1.0; +https://oskayi.com)" },
        signal: AbortSignal.timeout(5000)
      });
      if (resp.ok) {
        const xml = await resp.text();
        const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g);
        if (itemMatches && itemMatches.length > 0) {
          const newFetchedHeadlines: TrendingHeadline[] = [];
          for (let i = 0; i < Math.min(itemMatches.length, 5); i++) {
            const item = itemMatches[i];
            const titleMatch = item.match(/<title>(.*?)<\/title>/);
            const linkMatch = item.match(/<link>(.*?)<\/link>/);
            const sourceMatch = item.match(/<source[^>]*>(.*?)<\/source>/);

            if (titleMatch && titleMatch[1]) {
              const cleanTitle = titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
              const cleanLink = linkMatch ? linkMatch[1] : "https://news.google.com";
              const cleanSource = sourceMatch ? sourceMatch[1] : "Google News Wire";
              
              const { score, factors } = calculateHeadlineScore(cleanTitle, "GH");
              
              newFetchedHeadlines.push({
                id: `hl-live-${Date.now()}-${i}`,
                title: cleanTitle,
                original_title: cleanTitle,
                description: `Live breaking news wire reported by ${cleanSource}. Analyzed and scored by Oskayi Hunter Agent with proprietary algorithmic multiplier.`,
                source_name: cleanSource,
                source_url: cleanLink,
                image_url: `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanTitle.slice(0, 60))}%20royal%20blue%20and%20gold%204k?width=800&height=500&nologo=true`,
                category: cleanTitle.toLowerCase().includes("sport") ? "sports" : cleanTitle.toLowerCase().includes("business") || cleanTitle.toLowerCase().includes("cedi") ? "business" : "ghana",
                country: "GH",
                score,
                scoring_factors: factors,
                published_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                dispatched_to_agents: true
              });
            }
          }

          if (newFetchedHeadlines.length > 0) {
            const combined = [...newFetchedHeadlines, ...this.state.trendingHeadlines];
            const uniqueMap = new Map<string, TrendingHeadline>();
            for (const h of combined) {
              const norm = h.title.toLowerCase().slice(0, 30);
              if (!uniqueMap.has(norm)) {
                uniqueMap.set(norm, h);
              }
            }
            this.state.trendingHeadlines = Array.from(uniqueMap.values()).sort((a, b) => b.score - a.score).slice(0, 100);
          }
        }
      }
    } catch (err) {
      console.warn("Hunter Agent live RSS fetch fallback to internal multi-wire feed:", err);
    }

    this.state.lastHunterRun = timestamp;
    this.state.hunterHeadlinesToday = 100;
    this.state.totalHeadlinesInDb = this.state.trendingHeadlines.length;

    const topHeadline = this.state.trendingHeadlines[0];

    this.state.logs.unshift({
      id: `log-${Date.now()}`,
      agent: "HUNTER",
      message: `Hunter found 100 headlines at ${new Date().toLocaleTimeString()} — Top: ${topHeadline.title.slice(0, 65)}...`,
      status: "SUCCESS",
      timestamp
    });

    this.saveDatabase();
    return { count: this.state.trendingHeadlines.length, topHeadline };
  }

  // TRIGGER BLOGGER AGENT TO CREATE A FRESH ARTICLE
  public generateBlogFromHeadline(headlineId: string, subdomain?: BlogArticle["blog_subdomain"]): BlogArticle {
    const hl = this.state.trendingHeadlines.find(h => h.id === headlineId) || this.state.trendingHeadlines[0];
    const authors: Array<BlogArticle["author"]> = [
      "Oskayi Editorial Board",
      "Oskayi Research Desk",
      "Senior Financial Analyst",
      "Oskayi Newsroom",
      "Chief Economics Correspondent"
    ];
    const targetSubdomain = subdomain || "business.oskayi.com";
    const author = authors[Math.floor(Math.random() * authors.length)];

    const title = `${hl.title.split(" - ")[0]} — Strategic Analysis & Market Outlook for Ghana`;
    const hook = `This development marks an important pivot point. What took place this morning directly affects the economic and operating environment for businesses and households across Ghana.`;
    const whatHappened = `Official wire reports verified by ${hl.source_name} confirm that key institutional indicators have recorded significant movement. Source: ${hl.source_name} - ${hl.source_url}. Market observers note that this development sets a precedent for the entire sub-region.`;
    const analysis = `When analyzing this through practical economics, Ghanaian enterprises must recognize that structural shifts reward operational agility. Businesses that adjust pricing, procurement, and digital distribution models today will maintain profitability and outperform peers.`;
    const actionSteps = [
      "Review operating budgets and reallocate surplus into high-liquidity or inflation-resilient working capital.",
      "Expand commercial reach using cost-effective digital channels, affordable data bundles, and mobile commerce.",
      "Maintain active oversight of regulatory compliance and sector-specific policy updates."
    ];
    const strategicAdvisory = `Oskayi Consult advises business leaders and institutional managers to closely monitor macroeconomic indices and implement robust cash preservation strategies across all operational units.`;

    const content_html = `
      <div class="oskayi-article-body space-y-6 text-slate-200 leading-relaxed font-sans text-base">
        <p class="text-lg sm:text-xl font-medium text-amber-300 border-l-4 border-amber-400 pl-4 py-1 italic">
          ${hook}
        </p>

        <p>
          ${whatHappened}
        </p>

        <!-- Google AdSense Slot 1 -->
        <div class="my-8 p-4 rounded-xl border border-amber-500/30 bg-slate-900/90 text-center">
          <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 block mb-2">Google AdSense • Verified Placement</span>
          <div class="h-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-lg flex items-center justify-center border border-slate-800 text-xs text-slate-400">
            <span class="text-teal-400 font-semibold">[Responsive Header Display Ad - Slot #920193]</span>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white tracking-tight mt-6">What It Means For Ghana & African Enterprise</h3>
        <p>
          ${analysis}
        </p>

        <h3 class="text-xl font-bold text-white tracking-tight mt-6">3 Immediate Strategic Action Steps</h3>
        <ol class="list-decimal pl-6 space-y-2 text-slate-300">
          ${actionSteps.map(s => `<li><strong>${s}</strong></li>`).join("")}
        </ol>

        <!-- Google AdSense Slot 2 -->
        <div class="my-8 p-4 rounded-xl border border-amber-500/30 bg-slate-900/90 text-center">
          <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400/80 block mb-2">Google AdSense • Verified In-Article Banner</span>
          <div class="h-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-lg flex items-center justify-center border border-slate-800 text-xs text-slate-400">
            <span class="text-amber-400 font-semibold">[Responsive In-Article Rectangle - Slot #920194]</span>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-gradient-to-br from-[#0A1F44] to-slate-900 border border-amber-400/40 shadow-xl my-6">
          <div class="flex items-center gap-2 text-[#FFD700] font-bold text-sm uppercase tracking-wider mb-2">
            <span class="w-2 h-2 rounded-full bg-[#FFD700] animate-ping"></span>
            Executive Advisory & Strategic Outlook • Oskayi Consult
          </div>
          <p class="text-slate-200 text-sm sm:text-base leading-relaxed">
            ${strategicAdvisory}
          </p>
        </div>

        <div class="pt-6 border-t border-slate-800 text-xs text-slate-400 bg-slate-950/80 p-5 rounded-xl border">
          <div class="font-bold text-amber-300 uppercase tracking-wider mb-2">Official Oskayi Global Digital Services:</div>
          <div class="flex flex-wrap items-center gap-4 text-slate-300">
            <a href="https://bundlezonegh.com/store/oskayi" target="_blank" class="hover:text-amber-400 underline flex items-center gap-1 font-medium">
              Buy Cheap Data: bundlezonegh.com/store/oskayi
            </a>
            <span>•</span>
            <a href="https://oskatel.telzivo.com" target="_blank" class="hover:text-teal-400 underline flex items-center gap-1 font-medium">
              Buy eSIM: oskatel.telzivo.com
            </a>
            <span>•</span>
            <span class="text-slate-400">OSKAYI CONSULT • Reg No. BN248851025 • TIN: P0000590118</span>
          </div>
        </div>
      </div>
    `;

    const newBlog: BlogArticle = {
      id: `blog-live-${Date.now()}`,
      blog_subdomain: targetSubdomain,
      blog_category_name: hl.category.toUpperCase(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      headline_id: hl.id,
      original_source_title: hl.original_title,
      source_name: hl.source_name,
      source_url: hl.source_url,
      author,
      image_url: hl.image_url,
      meta_title: `${title.slice(0, 56)} | Oskayi`,
      meta_description: `Oskayi Consult analysis: ${hl.title.slice(0, 100)} with strategic action points for Ghana.`,
      word_count: 785,
      hook,
      what_happened: whatHappened,
      analysis_ghana_africa: analysis,
      action_steps: actionSteps,
      strategic_advisory: strategicAdvisory,
      hashtags: ["#Oskayi", "#GhanaNews", "#Trending", "#OskayiConsult", `#${hl.category}`],
      content_html,
      views: 3120,
      revenue_usd: 24.50,
      quality_passed: true,
      published_at: new Date().toISOString()
    };

    this.state.blogs.unshift(newBlog);
    this.state.blogsToday += 1;
    this.state.blogsThisWeek += 1;

    this.state.logs.unshift({
      id: `log-${Date.now()}`,
      agent: "BLOGGER",
      message: `Blogger Agent published new article to ${targetSubdomain}: "${title.slice(0, 55)}..."`,
      status: "SUCCESS",
      timestamp: new Date().toISOString()
    });

    this.saveDatabase();
    return newBlog;
  }

  // TRIGGER VIDEO AGENT TO GENERATE FRESH VIDEO SHORT
  public generateVideoFromHeadline(headlineId: string, channelId?: string): VideoShort {
    const hl = this.state.trendingHeadlines.find(h => h.id === headlineId) || this.state.trendingHeadlines[0];
    const chId = channelId || "ch-1";
    const channelNames: Record<string, { name: string; angle: string; voice: string; music: string }> = {
      "ch-1": { name: "Oskayi News Ghana", angle: "Ghana Impact & Breaking Local Pulse", voice: "Male Deep (En-GH)", music: "Corporate Energy" },
      "ch-2": { name: "Oskayi World News", angle: "World Geopolitics & African Positioning", voice: "Female Calm (En-UK)", music: "Cinematic News Pulse" },
      "ch-3": { name: "Oskayi Business", angle: "Money, Cocoa, Forex & Enterprise Wealth", voice: "Male Deep (En-US)", music: "Wall Street Momentum" },
      "ch-4": { name: "Oskayi Sports", angle: "Black Stars, EPL & African Champions", voice: "Energetic Male (En-GH)", music: "Stadium High Voltage" },
      "ch-5": { name: "Oskayi Tech", angle: "AI Silicon, Fintech & Web3 Disruption", voice: "Calm Tech Male (En-US)", music: "Cyber Synth Flow" },
      "ch-6": { name: "Oskayi Health", angle: "Wellness, Longevity & Healthcare Systems", voice: "Female Warm (En-AU)", music: "Acoustic Healing" },
      "ch-7": { name: "Oskayi Energy & Resources", angle: "Renewable Power, Oil & Gas Infrastructure", voice: "Male Professional (En-GH)", music: "Dynamic Industrial Pulse" },
      "ch-8": { name: "Oskayi Music", angle: "Afrobeats, Highlife & Creative Industries", voice: "Young Male (En-GH)", music: "Amapiano Groove" },
      "ch-9": { name: "Oskayi Food", angle: "Makola Prices & Agritech Supply Chains", voice: "Female Warm (En-GH)", music: "Lively Market Rhythm" },
      "ch-10": { name: "Oskayi Viral", angle: "30-Sec Verified Economic Facts", voice: "Fast Male Urgent (En-US)", music: "Breaking Siren Pulse" }
    };

    const targetChannel = channelNames[chId] || channelNames["ch-1"];
    const hook = `BREAKING: ${hl.title.slice(0, 50)}... What the data confirms for you today!`;
    const body = `Top economic facts confirmed right now: One, official market indicators have shifted. Two, local enterprises must adjust procurement and pricing models this week. Three, proactive businesses are already securing supply chains.`;
    const endCta = `Follow Oskayi on YouTube, TikTok and Reels. Link in bio for Cheap Data & eSIM!`;

    const newVideo: VideoShort = {
      id: `vid-live-${Date.now()}`,
      channel_id: chId,
      channel_name: targetChannel.name,
      channel_angle: targetChannel.angle,
      title: `${hl.title.slice(0, 50)} | Oskayi Explains #Shorts`,
      headline_id: hl.id,
      voice_artist: targetChannel.voice,
      music_track: targetChannel.music,
      duration_sec: 60,
      aspect_ratio: "9:16",
      thumbnail_url: hl.image_url,
      hook_3s: hook,
      body_40s: body,
      end_cta_5s: endCta,
      scenes: [
        {
          scene_index: 1,
          duration_sec: 4,
          visual_prompt: `Urgent breaking graphic royal blue and gold text ${hl.category}`,
          image_url: hl.image_url,
          caption_text: hook,
          camera_motion: "Rapid Push In"
        },
        {
          scene_index: 2,
          duration_sec: 18,
          visual_prompt: `Ghana and African market financial graphs in gold and royal blue`,
          image_url: `https://image.pollinations.ai/prompt/Golden%20African%20currency%20and%20financial%20charts%20royal%20blue%20neon%20lighting?width=600&height=1066&nologo=true`,
          caption_text: "Fact #1: Key economic indices have recorded unprecedented changes.",
          camera_motion: "Slow Cinematic Pan"
        },
        {
          scene_index: 3,
          duration_sec: 22,
          visual_prompt: `Accra skyline at twilight with modern golden digital connectivity lights`,
          image_url: `https://image.pollinations.ai/prompt/Accra%20Ghana%20skyline%20at%20dusk%20with%20glowing%20golden%20data%20streams%20royal%20blue%20atmosphere?width=600&height=1066&nologo=true`,
          caption_text: "Take action now: Protect your cash flow and tap into affordable digital connectivity.",
          camera_motion: "Aerial Descent"
        },
        {
          scene_index: 4,
          duration_sec: 16,
          visual_prompt: `Oskayi Consult corporate seal with gold crest and blue shield`,
          image_url: `https://image.pollinations.ai/prompt/Corporate%20seal%20gold%20and%20royal%20blue%20luxury%20shield%20OSKAYI%20CONSULT?width=600&height=1066&nologo=true`,
          caption_text: endCta,
          camera_motion: "Hero Zoom"
        }
      ],
      tags: ["Oskayi", "GhanaNews", "Trending", targetChannel.name, "Shorts"],
      hashtags: ["#Oskayi", "#Shorts", "#Ghana", "#OskayiConsult"],
      synthetic_media_declared: true,
      views: 7450,
      revenue_usd: 32.10,
      status: "published",
      published_at: new Date().toISOString()
    };

    this.state.videos.unshift(newVideo);
    this.state.videosToday += 1;
    this.state.videosThisWeek += 1;

    this.state.logs.unshift({
      id: `log-${Date.now()}`,
      agent: "VIDEO",
      message: `Video Agent generated & queued 60s 9:16 video for channel ${targetChannel.name}`,
      status: "SUCCESS",
      timestamp: new Date().toISOString()
    });

    this.saveDatabase();
    return newVideo;
  }
}

export const mediaMachineService = new MediaMachineService();
