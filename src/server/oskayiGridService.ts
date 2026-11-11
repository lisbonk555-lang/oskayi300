export interface GridNodeTelemetry {
  region: string;
  name: string;
  frequency_hz: number;
  frequency_status: "optimal" | "warning" | "critical";
  spot_price_usd_mwh: number;
  spot_price_local: string;
  carbon_intensity_g_co2_kwh: number;
  total_demand_mw: number;
  renewable_share_pct: number;
  curtailment_mw: number;
  market_operator: string;
  last_updated: string;
}

export interface ConnectedBatteryAsset {
  id: string;
  asset_name: string;
  owner_name: string;
  location: string;
  capacity_kwh: number;
  max_power_kw: number;
  current_soc_pct: number; // State of Charge (0-100)
  current_status: "charging" | "discharging" | "standby";
  autonomous_balancing_active: boolean;
  total_arbitrage_earnings_ghs: number;
  total_mwh_dispatched: number;
  grid_node: string;
  connected_at: string;
}

export interface GridBalanceDecision {
  timestamp: string;
  node: string;
  action: "CHARGE_SURPLUS" | "DISCHARGE_PEAK" | "IDLE_STABLE";
  price_trigger_usd: number;
  estimated_profit_ghs: number;
  reason: string;
}

export class OskayiGridService {
  private assets: ConnectedBatteryAsset[] = [];
  private balanceLogs: GridBalanceDecision[] = [];

  constructor() {
    this.seedInitialAssets();
  }

  private seedInitialAssets() {
    this.assets = [
      {
        id: "vpp-accra-01",
        asset_name: "Oskayi Tema Industrial Megapack VPP",
        owner_name: "Oskayi Consult Heavy Assets",
        location: "Tema Industrial Area, Greater Accra, Ghana",
        capacity_kwh: 5000,
        max_power_kw: 2500,
        current_soc_pct: 78,
        current_status: "standby",
        autonomous_balancing_active: true,
        total_arbitrage_earnings_ghs: 48250.00,
        total_mwh_dispatched: 142.6,
        grid_node: "Ghana GRIDCo NITS (Accra-Tema)",
        connected_at: new Date(Date.now() - 30 * 86400000).toISOString()
      },
      {
        id: "vpp-sunyani-02",
        asset_name: "Bono Agribusiness Solar-Battery Microgrid",
        owner_name: "Sunyani Commercial Agro Consortium",
        location: "Sunyani, Bono Region, Ghana",
        capacity_kwh: 1200,
        max_power_kw: 600,
        current_soc_pct: 92,
        current_status: "charging",
        autonomous_balancing_active: true,
        total_arbitrage_earnings_ghs: 14680.00,
        total_mwh_dispatched: 38.4,
        grid_node: "Ghana GRIDCo NITS (Middle Belt)",
        connected_at: new Date(Date.now() - 14 * 86400000).toISOString()
      },
      {
        id: "vpp-uk-03",
        asset_name: "London Commercial Energy Reserve Megapack",
        owner_name: "Oskayi Global Infrastructure UK",
        location: "Greater London, United Kingdom",
        capacity_kwh: 10000,
        max_power_kw: 5000,
        current_soc_pct: 45,
        current_status: "discharging",
        autonomous_balancing_active: true,
        total_arbitrage_earnings_ghs: 92400.00,
        total_mwh_dispatched: 310.2,
        grid_node: "Elexon BMRS National Grid ESO (UK)",
        connected_at: new Date(Date.now() - 60 * 86400000).toISOString()
      }
    ];

    this.balanceLogs = [
      {
        timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
        node: "Ghana GRIDCo NITS (Accra-Tema)",
        action: "CHARGE_SURPLUS",
        price_trigger_usd: 32.50,
        estimated_profit_ghs: 1850.00,
        reason: "Midday rooftop solar surge in Southern Ghana created local generation surplus. VPP auto-charged at off-peak rates."
      },
      {
        timestamp: new Date(Date.now() - 48 * 60000).toISOString(),
        node: "Elexon BMRS (UK)",
        action: "DISCHARGE_PEAK",
        price_trigger_usd: 148.00,
        estimated_profit_ghs: 4200.00,
        reason: "Wind lulls in North Sea triggered evening peak pricing. VPP discharged 4.2 MWh to national grid."
      }
    ];
  }

  public getGridTelemetry(): GridNodeTelemetry[] {
    const now = new Date().toISOString();
    return [
      {
        region: "GHANA",
        name: "Ghana GRIDCo NITS (VRA / Bui Interconnected System)",
        frequency_hz: 50.04,
        frequency_status: "optimal",
        spot_price_usd_mwh: 68.50,
        spot_price_local: "GH¢ 1.05 / kWh",
        carbon_intensity_g_co2_kwh: 210,
        total_demand_mw: 3645,
        renewable_share_pct: 42.8, // Akosombo, Kpong, Bui hydro & solar
        curtailment_mw: 45,
        market_operator: "Ghana GRIDCo & Wholesale Electricity Market (WEM)",
        last_updated: now
      },
      {
        region: "EUROPE",
        name: "ENTSO-E Central Western European Synchronous Grid",
        frequency_hz: 50.01,
        frequency_status: "optimal",
        spot_price_usd_mwh: 74.20,
        spot_price_local: "€ 68.40 / MWh",
        carbon_intensity_g_co2_kwh: 145,
        total_demand_mw: 382400,
        renewable_share_pct: 54.2,
        curtailment_mw: 2400,
        market_operator: "ENTSO-E Trans-European Coordination System",
        last_updated: now
      },
      {
        region: "UNITED KINGDOM",
        name: "Elexon BMRS National Grid ESO Balancing Mechanism",
        frequency_hz: 49.98,
        frequency_status: "optimal",
        spot_price_usd_mwh: 89.10,
        spot_price_local: "£ 71.30 / MWh",
        carbon_intensity_g_co2_kwh: 128,
        total_demand_mw: 32600,
        renewable_share_pct: 61.5,
        curtailment_mw: 820,
        market_operator: "Elexon BMRS / National Grid ESO",
        last_updated: now
      },
      {
        region: "UNITED STATES",
        name: "US EIA Multi-Interconnect (ERCOT / CAISO / PJM)",
        frequency_hz: 60.01,
        frequency_status: "optimal",
        spot_price_usd_mwh: 42.80,
        spot_price_local: "$ 42.80 / MWh",
        carbon_intensity_g_co2_kwh: 285,
        total_demand_mw: 495000,
        renewable_share_pct: 38.4,
        curtailment_mw: 5400,
        market_operator: "U.S. Energy Information Administration (EIA) Open Data",
        last_updated: now
      }
    ];
  }

  public getConnectedAssets(): ConnectedBatteryAsset[] {
    return this.assets;
  }

  public getBalanceLogs(): GridBalanceDecision[] {
    return this.balanceLogs;
  }

  public connectNewAsset(assetData: {
    asset_name: string;
    owner_name: string;
    location: string;
    capacity_kwh: number;
    max_power_kw: number;
    grid_node: string;
  }): ConnectedBatteryAsset {
    const newAsset: ConnectedBatteryAsset = {
      id: `vpp-${Date.now().toString(36)}`,
      asset_name: assetData.asset_name,
      owner_name: assetData.owner_name,
      location: assetData.location,
      capacity_kwh: Number(assetData.capacity_kwh),
      max_power_kw: Number(assetData.max_power_kw),
      current_soc_pct: 65,
      current_status: "standby",
      autonomous_balancing_active: true,
      total_arbitrage_earnings_ghs: 0,
      total_mwh_dispatched: 0,
      grid_node: assetData.grid_node || "Ghana GRIDCo NITS (Accra-Tema)",
      connected_at: new Date().toISOString()
    };

    this.assets.unshift(newAsset);

    this.balanceLogs.unshift({
      timestamp: new Date().toISOString(),
      node: newAsset.grid_node,
      action: "IDLE_STABLE",
      price_trigger_usd: 68.50,
      estimated_profit_ghs: 0,
      reason: `Asset '${newAsset.asset_name}' onboarded to Oskayi Virtual Power Plant network. AI telemetry connection verified.`
    });

    return newAsset;
  }

  public toggleAssetAutonomous(assetId: string): boolean {
    const asset = this.assets.find(a => a.id === assetId);
    if (!asset) return false;
    asset.autonomous_balancing_active = !asset.autonomous_balancing_active;
    return asset.autonomous_balancing_active;
  }
}

export const oskayiGridService = new OskayiGridService();
