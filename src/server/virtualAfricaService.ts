export interface VirtualCitizen {
  id: string;
  name: string;
  email: string;
  country_of_origin: string;
  citizen_number: string;
  status: 'ACTIVE_CITIZEN' | 'MINISTER' | 'PRESIDENT' | 'BUSINESS_OWNER';
  balance_rd: number;
  balance_usd_equiv: number;
  land_plots_owned: number;
  passport_active: boolean;
  registered_at: string;
  reputation_score: number;
}

export interface LandPlot {
  id: string;
  plot_number: string;
  country: string;
  region: string;
  zone_type: 'RESIDENTIAL' | 'COMMERCIAL_TOWER' | 'AGRICULTURAL_FARM' | 'MINING_TECH';
  coordinates: string;
  price_usd: number;
  owner_id: string | null;
  owner_name: string | null;
  status: 'AVAILABLE' | 'OCCUPIED_TITLE_DEED_ISSUED';
}

export interface MinistryItem {
  id: string;
  code: string;
  name: string;
  minister_name: string;
  badge: string;
  description: string;
  active_citizens_served: number;
  service_fee_usd: number;
  key_action_label: string;
}

export interface CyberPoliceAlert {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'RESOLVED';
  event_type: 'SYBIL_ID_ATTEMPT' | 'UNAUTHORIZED_ESCROW_DRAIN' | 'OFFSHORE_SPOOFING' | 'RESERVE_ARBITRAGE';
  description: string;
  action_taken: string;
  status: 'NEUTRALIZED' | 'INVESTIGATING' | 'RESOLVED';
}

export class VirtualAfricaService {
  private reserveFundUsd: number = 7248500.00;
  private totalSupplyRd: number = 1000000000; // 1 Billion RD fixed
  private circulatingSupplyRd: number = 5662890; // ~5.66M circulating
  private citizensCount: number = 125430;
  private landSoldPlots: number = 45180;
  private totalLandPlots: number = 100000000; // 100M plots

  private citizens: VirtualCitizen[] = [
    {
      id: 'cit-001',
      name: 'His Excellency Dr. Kwame Mensah',
      email: 'president@virtualafrica.org',
      country_of_origin: 'Ghana',
      citizen_number: 'VA-GH-000001-GOLD',
      status: 'PRESIDENT',
      balance_rd: 250000,
      balance_usd_equiv: 320000,
      land_plots_owned: 12,
      passport_active: true,
      registered_at: '2025-01-01T00:00:00Z',
      reputation_score: 99
    },
    {
      id: 'cit-002',
      name: 'Amara Diop',
      email: 'amara.diop@dakarfintech.sn',
      country_of_origin: 'Senegal',
      citizen_number: 'VA-SN-004819-CIT',
      status: 'MINISTER',
      balance_rd: 8500,
      balance_usd_equiv: 10880,
      land_plots_owned: 3,
      passport_active: true,
      registered_at: '2025-08-15T10:00:00Z',
      reputation_score: 95
    },
    {
      id: 'cit-003',
      name: 'Tariq Al-Mansoor',
      email: 'tariq.cairo@cairologistics.eg',
      country_of_origin: 'Egypt',
      citizen_number: 'VA-EG-019342-BIZ',
      status: 'BUSINESS_OWNER',
      balance_rd: 14200,
      balance_usd_equiv: 18176,
      land_plots_owned: 5,
      passport_active: true,
      registered_at: '2025-11-20T14:30:00Z',
      reputation_score: 92
    }
  ];

  private ministries: MinistryItem[] = [
    { id: 'min-01', code: 'FINANCE', name: 'Ministry of Finance & Economy', minister_name: 'Dr. Adeyemi Olatunji', badge: '🏦', description: 'Central bank management, RD liquidity reserves, 2% algorithmic inflation stabilization, and Continental Treasury.', active_citizens_served: 48900, service_fee_usd: 10, key_action_label: 'Audit Reserve Vault' },
    { id: 'min-02', code: 'HEALTH', name: 'Ministry of Health & AI Medicine', minister_name: 'Dr. Amina Touré', badge: '🩺', description: '24/7 AI Doctor consultations, telemedicine diagnostics across 54 nations, and pharmaceutical drone dispatch network.', active_citizens_served: 62400, service_fee_usd: 5, key_action_label: 'Start AI Health Consult' },
    { id: 'min-03', code: 'EDUCATION', name: 'Ministry of Education & Virtual Africa University', minister_name: 'Prof. Kofi Boakye', badge: '🎓', description: 'Accredited continental STEM, Pan-African history, and AI programming masterclasses with on-chain diploma credentials.', active_citizens_served: 34100, service_fee_usd: 100, key_action_label: 'Enroll in Degree Program' },
    { id: 'min-04', code: 'AGRICULTURE', name: 'Ministry of Agriculture & Food Security', minister_name: 'Madame Fatou Camara', badge: '🌾', description: 'Satellite precipitation AI forecast, smart irrigation IoT telemetry, and direct farmer-to-market commodity clearing.', active_citizens_served: 28700, service_fee_usd: 8, key_action_label: 'Consult Rain Forecaster' },
    { id: 'min-05', code: 'TRADE', name: 'Ministry of Trade & AfCFTA Digital Clearing', minister_name: 'Hon. Chinedu Eze', badge: '🚢', description: 'Pan-African trade corridors, zero-tariff digital clearance, multi-party smart contract escrow, and e-bill of lading registry.', active_citizens_served: 71200, service_fee_usd: 15, key_action_label: 'Open Trade Escrow' },
    { id: 'min-06', code: 'JUSTICE', name: 'Ministry of Justice & Virtual High Court', minister_name: 'Chief Justice Fatima Al-Hassan', badge: '⚖️', description: 'AI-assisted dispute resolution with 3 peer-elected citizen jurors. Legally binding commercial arbitration under Pan-African treaties.', active_citizens_served: 12400, service_fee_usd: 20, key_action_label: 'File Commercial Claim' },
    { id: 'min-07', code: 'FOREIGN_AFFAIRS', name: 'Ministry of Foreign Affairs & Continental Embassies', minister_name: 'Ambassador Jean-Paul Ndaye', badge: '🌐', description: 'Bilateral embassies in 100 virtual nations, consular assistance, and visa-free diplomatic travel corridors.', active_citizens_served: 19800, service_fee_usd: 25, key_action_label: 'Verify Embassy Credential' },
    { id: 'min-08', code: 'ENERGY', name: 'Ministry of Energy & The Great African Grid', minister_name: 'Eng. Tendai Moyo', badge: '⚡', description: 'Inga Hydro & Sahara Solar interconnection balancing, virtual clean energy credits, and battery storage balancing.', active_citizens_served: 15600, service_fee_usd: 12, key_action_label: 'Inspect Grid Load' },
    { id: 'min-09', code: 'TRANSPORT', name: 'Ministry of Transportation & Hyper-Logistics', minister_name: 'Capt. Ibrahim Traoré', badge: '✈️', description: 'Continental freight routing, High-Speed Rail virtual simulation, and automated drone cargo corridors.', active_citizens_served: 22100, service_fee_usd: 10, key_action_label: 'Track Transit Corridor' },
    { id: 'min-10', code: 'SCIENCE_TECH', name: 'Ministry of Science, Quantum & AI Lab', minister_name: 'Dr. Zanele Khumalo', badge: '🔬', description: 'Pan-African supercomputing grid, open-source LLM research, satellite constellation tasking, and patent registry.', active_citizens_served: 18400, service_fee_usd: 30, key_action_label: 'Submit Invention Patent' },
    { id: 'min-11', code: 'TOURISM', name: 'Ministry of Tourism & Cultural Safaris', minister_name: 'Laila Benali', badge: '🦁', description: '360° photorealistic spatial tours of Serengeti, Victoria Falls, Giza Pyramids, and Cape of Good Hope.', active_citizens_served: 41900, service_fee_usd: 5, key_action_label: 'Start 360° Virtual Safari' },
    { id: 'min-12', code: 'CULTURE_ARTS', name: 'Ministry of Culture, Music & Royal Arts', minister_name: 'Maestro Femi Sowande', badge: '🎨', description: 'Continental digital art galleries, Afrobeats & Amapiano royalty monetization, and Royal Pan-African festival broadcasts.', active_citizens_served: 56700, service_fee_usd: 4, key_action_label: 'Stream Royal Festival' },
    { id: 'min-13', code: 'DEFENSE_CYBER', name: 'Ministry of Defense & Cyber Sovereign Command', minister_name: 'Brigadier General Musa Bello', badge: '🛡️', description: '24/7 autonomous fraud mitigation, anti-phishing biometric defenses, and institutional security monitoring for citizen assets.', active_citizens_served: 98000, service_fee_usd: 2, key_action_label: 'Review Security Perimeter' },
    { id: 'min-14', code: 'HOUSING_LAND', name: 'Ministry of Housing, Lands & Urban Planning', minister_name: 'Architect Nia Ababio', badge: '🏛️', description: '100,000,000 immutable virtual plots across 54 sovereign territories. GPS-anchored title deeds with cryptographic QR seals.', active_citizens_served: 45180, service_fee_usd: 50, key_action_label: 'Purchase Land Plot' },
    { id: 'min-15', code: 'YOUTH_SPORTS', name: 'Ministry of Youth, Esports & Continental Cup', minister_name: 'Samuel Eto’o Touré', badge: '⚽', description: 'Virtual African Cup of Nations e-tournament, continental youth leadership bootcamps, and robotics tournaments.', active_citizens_served: 37500, service_fee_usd: 5, key_action_label: 'Join e-AFCON Tournament' },
    { id: 'min-16', code: 'ENVIRONMENT', name: 'Ministry of Environment & Great Green Wall', minister_name: 'Dr. Mariam Coulibaly', badge: '🌳', description: 'The Great Green Wall virtual reforestation, verified carbon credit tokenization, and satellite deforestation audits.', active_citizens_served: 29300, service_fee_usd: 8, key_action_label: 'Plant 10 Virtual Baobabs' }
  ];

  private sampleLandPlots: LandPlot[] = [
    { id: 'plot-accra-01', plot_number: 'ACC-AIRPORT-RES-089', country: 'Ghana', region: 'Greater Accra Tech Corridor', zone_type: 'COMMERCIAL_TOWER', coordinates: '5.6037° N, 0.1870° W', price_usd: 50, owner_id: 'cit-001', owner_name: 'His Excellency Dr. Kwame Mensah', status: 'OCCUPIED_TITLE_DEED_ISSUED' },
    { id: 'plot-lagos-02', plot_number: 'LOS-EKO-ATLANTIC-404', country: 'Nigeria', region: 'Eko Financial Waterfront', zone_type: 'COMMERCIAL_TOWER', coordinates: '6.4281° N, 3.4219° E', price_usd: 50, owner_id: 'cit-003', owner_name: 'Tariq Al-Mansoor', status: 'OCCUPIED_TITLE_DEED_ISSUED' },
    { id: 'plot-nairobi-03', plot_number: 'NBO-SILICON-SAVANNAH-112', country: 'Kenya', region: 'Konza Technopolis Hub', zone_type: 'COMMERCIAL_TOWER', coordinates: '1.2921° S, 36.8219° E', price_usd: 50, owner_id: null, owner_name: null, status: 'AVAILABLE' },
    { id: 'plot-joburg-04', plot_number: 'JNB-SANDTON-ROYAL-771', country: 'South Africa', region: 'Sandton Financial Spire', zone_type: 'RESIDENTIAL', coordinates: '26.2041° S, 28.0473° E', price_usd: 50, owner_id: null, owner_name: null, status: 'AVAILABLE' },
    { id: 'plot-cairo-05', plot_number: 'CAI-NEW-CAPITAL-552', country: 'Egypt', region: 'Nile Innovation Axis', zone_type: 'COMMERCIAL_TOWER', coordinates: '30.0444° N, 31.2357° E', price_usd: 50, owner_id: null, owner_name: null, status: 'AVAILABLE' },
    { id: 'plot-kigali-06', plot_number: 'KGL-NORR-INNOVATION-019', country: 'Rwanda', region: 'Kigali Clean Innovation Park', zone_type: 'AGRICULTURAL_FARM', coordinates: '1.9706° S, 30.1044° E', price_usd: 50, owner_id: null, owner_name: null, status: 'AVAILABLE' }
  ];

  private cyberAlerts: CyberPoliceAlert[] = [
    { id: 'alert-01', timestamp: '2026-03-08 14:22 UTC', severity: 'CRITICAL', event_type: 'SYBIL_ID_ATTEMPT', description: 'Automated botfarm attempted to register 420 spoofed IDs from non-African proxy subnet.', action_taken: 'IP blocks enforced, biometric KYC challenged, 0 funds impacted.', status: 'NEUTRALIZED' },
    { id: 'alert-02', timestamp: '2026-03-08 11:05 UTC', severity: 'WARNING', event_type: 'UNAUTHORIZED_ESCROW_DRAIN', description: 'Early release attempt on $14,000 USD cocoa trade escrow without verified bill of lading signature.', action_taken: 'Escrow locked automatically by smart contract, reported to Ministry of Justice.', status: 'NEUTRALIZED' },
    { id: 'alert-03', timestamp: '2026-03-07 19:40 UTC', severity: 'WARNING', event_type: 'RESERVE_ARBITRAGE', description: 'Attempted rapid RD buy-and-burn beyond weekly 20% sell cap.', action_taken: 'Weekly liquidation cap of 20% strictly enforced via Paystack USD gateway.', status: 'RESOLVED' }
  ];

  public getContinentStats() {
    // Current price formula: RD Price = Reserve Fund USD / (Circulating Supply RD) * stabilization factor
    const basePrice = this.reserveFundUsd / (this.circulatingSupplyRd || 1);
    const rdPriceUsd = Math.max(1.00, Math.min(2.50, parseFloat(basePrice.toFixed(2))));

    return {
      app_name: 'VIRTUAL AFRICA',
      sub_title: 'The Complete Virtual Continent',
      tagline: 'One Continent. One Government. One Currency. One People.',
      design_theme: 'Gold (#FFD700) + Black (#0A0F1D) + Royal Green (#10B981)',
      currency: {
        symbol: 'RD',
        name: 'Royal Dollar',
        total_supply: this.totalSupplyRd,
        circulating_supply: this.circulatingSupplyRd,
        price_usd: rdPriceUsd,
        reserve_fund_usd: this.reserveFundUsd,
        annual_staking_yield_pct: 8.0,
        central_bank_savings_rate_pct: 5.0,
        tx_burn_rate_pct: 1.0,
        max_weekly_sell_cap_pct: 20.0
      },
      citizens_count: this.citizensCount,
      land_sold_plots: this.landSoldPlots,
      total_land_plots: this.totalLandPlots,
      countries_represented: 54,
      ministries_count: this.ministries.length,
      paystack_pricing_usd: {
        citizenship_usd: 10.00,
        land_plot_usd: 50.00,
        business_license_yearly_usd: 100.00,
        passport_usd: 20.00,
        university_course_usd: 100.00,
        court_case_filing_usd: 20.00,
        ministry_service_range_usd: '$2 - $50'
      }
    };
  }

  public getMinistries(): MinistryItem[] {
    return this.ministries;
  }

  public getLandPlots(): LandPlot[] {
    return this.sampleLandPlots;
  }

  public getCyberAlerts(): CyberPoliceAlert[] {
    return this.cyberAlerts;
  }

  public registerCitizen(params: {
    name: string;
    email: string;
    country_of_origin: string;
    payment_reference?: string;
  }): VirtualCitizen {
    const id = `cit-${Date.now().toString().slice(-6)}`;
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const countryPrefix = params.country_of_origin.slice(0, 2).toUpperCase();
    const citizenNumber = `VA-${countryPrefix}-${randomCode}-CIT`;

    const newCitizen: VirtualCitizen = {
      id,
      name: params.name,
      email: params.email,
      country_of_origin: params.country_of_origin,
      citizen_number: citizenNumber,
      status: 'ACTIVE_CITIZEN',
      balance_rd: 50, // Welcome 50 RD dividend
      balance_usd_equiv: 64.00,
      land_plots_owned: 0,
      passport_active: false,
      registered_at: new Date().toISOString(),
      reputation_score: 80
    };

    this.citizens.push(newCitizen);
    this.citizensCount += 1;
    this.reserveFundUsd += 10.00; // Add citizenship fee to reserve
    this.circulatingSupplyRd += 50;

    return newCitizen;
  }

  public purchaseLandPlot(params: {
    plot_id: string;
    citizen_name: string;
    payment_reference?: string;
  }): LandPlot {
    const plot = this.sampleLandPlots.find(p => p.id === params.plot_id) || this.sampleLandPlots[2];
    plot.status = 'OCCUPIED_TITLE_DEED_ISSUED';
    plot.owner_name = params.citizen_name;
    plot.owner_id = `cit-${Date.now().toString().slice(-4)}`;

    this.landSoldPlots += 1;
    this.reserveFundUsd += 50.00; // $50 Paystack USD to reserve

    return plot;
  }

  public buyRoyalDollars(usdAmount: number): { rdPurchased: number; newReserveUsd: number; newPriceUsd: number } {
    const price = this.getContinentStats().currency.price_usd;
    const rdPurchased = parseFloat((usdAmount / price).toFixed(2));
    this.reserveFundUsd += usdAmount;
    this.circulatingSupplyRd += rdPurchased;
    const newPrice = this.getContinentStats().currency.price_usd;
    return {
      rdPurchased,
      newReserveUsd: this.reserveFundUsd,
      newPriceUsd: newPrice
    };
  }
}

export const virtualAfricaService = new VirtualAfricaService();
