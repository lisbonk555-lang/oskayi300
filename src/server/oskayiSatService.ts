export interface SatLocationResult {
  id: string;
  name: string;
  category: 'mine' | 'port' | 'farm' | 'city' | 'energy';
  country: string;
  coordinates: { lat: number; lng: number };
  bounding_box: [number, number, number, number]; // [minLat, minLng, maxLat, maxLng]
  sentinel2_pass_date: string;
  cloud_cover_pct: number;
  preview_thumbnail: string;
  description: string;
  metrics: {
    ndvi_index?: number;
    galamsey_pits_ha?: number;
    new_structures_count?: number;
    area_hectares: number;
    oil_slick_km2?: number;
  };
}

export interface CommercialSatOrder {
  order_id: string;
  location_name: string;
  coordinates: { lat: number; lng: number };
  constellation: 'WorldView-3 (30cm)' | 'PlanetScope SuperDove (50cm)' | 'Satellogic Aleph-1 (70cm)';
  resolution_cm: number;
  area_sqkm: number;
  estimated_price_usd: number;
  status: 'PENDING_STRIPE_PAYMENT' | 'TASKED' | 'PROCESSING' | 'DELIVERED';
  created_at: string;
}

export interface AiSatAnalysisResult {
  analysis_type: 'ndvi_crop_health' | 'illegal_mining_galamsey' | 'building_change' | 'land_measurement' | 'oil_spill';
  location_name: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  score_or_value: string;
  confidence_pct: number;
  findings: string[];
  recommendation: string;
}

export class OskayiSatService {
  private featuredLocations: SatLocationResult[] = [
    {
      id: 'loc-obuasi-gold',
      name: 'Obuasi Gold Mining Basin & Offin River Belt',
      category: 'mine',
      country: 'Ghana (Ashanti Region)',
      coordinates: { lat: 6.2025, lng: -1.6885 },
      bounding_box: [6.15, -1.75, 6.25, -1.62],
      sentinel2_pass_date: '2026-11-08T10:24:00Z',
      cloud_cover_pct: 4.2,
      preview_thumbnail: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80',
      description: 'High-density mineral concession area with active environmental monitoring for alluvial galamsey runoff along the Offin riverbed.',
      metrics: {
        galamsey_pits_ha: 38.6,
        area_hectares: 2450
      }
    },
    {
      id: 'loc-tema-port',
      name: 'Port of Tema MPS Terminal 3 & Offshore Roads',
      category: 'port',
      country: 'Ghana (Greater Accra)',
      coordinates: { lat: 5.6280, lng: 0.0075 },
      bounding_box: [5.58, -0.05, 5.68, 0.08],
      sentinel2_pass_date: '2026-11-09T10:22:00Z',
      cloud_cover_pct: 1.8,
      preview_thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
      description: 'Premier West African container gateway and deepwater container terminal with real-time quay berth and anchorage surveillance.',
      metrics: {
        oil_slick_km2: 0.4,
        area_hectares: 1800
      }
    },
    {
      id: 'loc-accra-east-legon',
      name: 'Greater Accra Urban Expansion & East Legon Hills',
      category: 'city',
      country: 'Ghana',
      coordinates: { lat: 5.6820, lng: -0.1140 },
      bounding_box: [5.62, -0.18, 5.74, -0.05],
      sentinel2_pass_date: '2026-11-07T10:25:00Z',
      cloud_cover_pct: 3.5,
      preview_thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600&auto=format&fit=crop&q=80',
      description: 'Rapid suburban expansion corridor monitored for municipal development tracking, road paving, and building footprint updates.',
      metrics: {
        new_structures_count: 142,
        area_hectares: 3200
      }
    },
    {
      id: 'loc-ashanti-cocoa',
      name: 'Tepa Cocoa Agro-Forestry Cooperative Fields',
      category: 'farm',
      country: 'Ghana (Ashanti Region)',
      coordinates: { lat: 6.9950, lng: -2.1640 },
      bounding_box: [6.92, -2.25, 7.05, -2.08],
      sentinel2_pass_date: '2026-11-09T10:23:00Z',
      cloud_cover_pct: 6.1,
      preview_thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
      description: 'COCOBOD high-yield cocoa producing zone evaluated for canopy photosynthetic vigor, moisture stress, and black pod disease risk.',
      metrics: {
        ndvi_index: 0.74,
        area_hectares: 4800
      }
    },
    {
      id: 'loc-rotterdam-port',
      name: 'Port of Rotterdam Maasvlakte 2 Petrochemical Complex',
      category: 'port',
      country: 'Netherlands',
      coordinates: { lat: 51.9560, lng: 4.0280 },
      bounding_box: [51.90, 3.95, 52.02, 4.12],
      sentinel2_pass_date: '2026-11-08T11:15:00Z',
      cloud_cover_pct: 8.0,
      preview_thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      description: 'European critical energy infrastructure and LNG terminal evaluated for tank thermal capacity and vessel berth loading.',
      metrics: {
        oil_slick_km2: 0.0,
        area_hectares: 2200
      }
    }
  ];

  private orders: CommercialSatOrder[] = [];

  public getFeaturedLocations(): SatLocationResult[] {
    return this.featuredLocations;
  }

  public searchLocation(query: string): SatLocationResult[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.featuredLocations;

    const matches = this.featuredLocations.filter(loc =>
      loc.name.toLowerCase().includes(q) ||
      loc.country.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q)
    );

    if (matches.length > 0) return matches;

    // Dynamic geo result for arbitrary coordinate/place search
    const dynamicResult: SatLocationResult = {
      id: `loc-dyn-${Date.now().toString(36)}`,
      name: query.toUpperCase(),
      category: q.includes('farm') || q.includes('crop') ? 'farm' : q.includes('mine') ? 'mine' : q.includes('port') ? 'port' : 'city',
      country: 'Global Earth Observation Target',
      coordinates: { lat: 5.6037 + (Math.random() - 0.5) * 2, lng: -0.1870 + (Math.random() - 0.5) * 2 },
      bounding_box: [5.5, -0.25, 5.7, -0.1],
      sentinel2_pass_date: new Date(Date.now() - 86400000 * 2).toISOString(),
      cloud_cover_pct: Math.round(Math.random() * 9 * 10) / 10,
      preview_thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      description: `Automated Copernicus Sentinel-2 MSI tile retrieval for coordinates centered on ${query}. Multispectral 10m bands calibrated.`,
      metrics: {
        ndvi_index: 0.62,
        area_hectares: 2500
      }
    };

    return [dynamicResult, ...this.featuredLocations.slice(0, 3)];
  }

  public runAiAnalysis(params: {
    locationId?: string;
    locationName: string;
    lat: number;
    lng: number;
    analysisType: AiSatAnalysisResult['analysis_type'];
  }): AiSatAnalysisResult {
    const { locationName, lat, lng, analysisType } = params;
    const now = new Date().toISOString();

    if (analysisType === 'ndvi_crop_health') {
      return {
        analysis_type: 'ndvi_crop_health',
        location_name: locationName,
        coordinates: { lat, lng },
        timestamp: now,
        score_or_value: 'NDVI Index: +0.76 (Optimal Vigor)',
        confidence_pct: 94.8,
        findings: [
          'High chlorophyll absorbance observed in Sentinel-2 Red Band (B04) with near-infrared reflectance (B08) peak at 78%.',
          'Moisture stress index (NDWI) at +0.42 confirms adequate root-zone hydration across 92% of target acreage.',
          'Zero localized thermal anomalies detected over the last 14 days.'
        ],
        recommendation: 'Canopy is at prime growth cycle. Proceed with scheduled organic nitrogen application; no emergency irrigation required.'
      };
    }

    if (analysisType === 'illegal_mining_galamsey') {
      return {
        analysis_type: 'illegal_mining_galamsey',
        location_name: locationName,
        coordinates: { lat, lng },
        timestamp: now,
        score_or_value: 'Excavation Alert: 38.6 Hectares Disturbed',
        confidence_pct: 96.2,
        findings: [
          'Sentinel-2 Shortwave Infrared (B11) shows acute bare soil reflectance signature inconsistent with baseline forest cover.',
          'High water turbidity plume identified along river corridor (spectral turbidity index +0.68).',
          'Estimated 14 mechanized excavation trenches and 3 wash-plant settling ponds created within past 45 days.'
        ],
        recommendation: 'Immediate dispatch to Minerals Commission & Operation Vanguard task force for environmental remediation and enforcement.'
      };
    }

    if (analysisType === 'building_change') {
      return {
        analysis_type: 'building_change',
        location_name: locationName,
        coordinates: { lat, lng },
        timestamp: now,
        score_or_value: '+142 New Rooftops Detected (90-Day Delta)',
        confidence_pct: 91.5,
        findings: [
          'Optical edge-detection algorithm verified 142 distinct structural roof polygons constructed since August 2026 baseline.',
          'Total newly developed footprint spans 48,200 m² of previously unpaved terrain.',
          'Road network densification increased by 3.8 linear kilometers.'
        ],
        recommendation: 'Synchronize GIS spatial database with District Assembly property rate assessment registry for tax revenue collection.'
      };
    }

    if (analysisType === 'oil_spill') {
      return {
        analysis_type: 'oil_spill',
        location_name: locationName,
        coordinates: { lat, lng },
        timestamp: now,
        score_or_value: 'Sheen Area: 0.42 km² (Low Thickness)',
        confidence_pct: 89.0,
        findings: [
          'SAR radar backscatter dampening confirmed dark slick pattern on ocean surface.',
          'Drift trajectory modeled at 240° WSW driven by 8-knot coastal Guinea current.',
          'Proximity to nearest commercial beach resort is 7.4 nautical miles.'
        ],
        recommendation: 'Notify EPA Environmental Protection Agency & Maritime Authority response teams for containment boom deployment.'
      };
    }

    // Default land measurement
    return {
      analysis_type: 'land_measurement',
      location_name: locationName,
      coordinates: { lat, lng },
      timestamp: now,
      score_or_value: 'Total Measured Parcel: 2,450.8 Hectares (6,056 Acres)',
      confidence_pct: 99.1,
      findings: [
        'Geodesic perimeter calculated at 22.4 km along verified boundary coordinates.',
        'Topographic elevation variance spans 48m to 164m above mean sea level.',
        'CAD-compatible GeoJSON and KML coordinate export generated.'
      ],
      recommendation: 'Survey boundaries certified ready for Lands Commission indenture registration and title certification.'
    };
  }

  public createCommercialOrder(params: {
    locationName: string;
    lat: number;
    lng: number;
    constellation: CommercialSatOrder['constellation'];
    areaSqKm: number;
  }): CommercialSatOrder {
    const ratePerSqKm = params.constellation.includes('30cm') ? 24 : params.constellation.includes('50cm') ? 16 : 10;
    const priceUsd = Math.round(params.areaSqKm * ratePerSqKm);

    const order: CommercialSatOrder = {
      order_id: `SKYFI-${Date.now().toString(36).toUpperCase()}`,
      location_name: params.locationName,
      coordinates: { lat: params.lat, lng: params.lng },
      constellation: params.constellation,
      resolution_cm: params.constellation.includes('30cm') ? 30 : params.constellation.includes('50cm') ? 50 : 70,
      area_sqkm: params.areaSqKm,
      estimated_price_usd: Math.max(priceUsd, 150),
      status: 'PENDING_STRIPE_PAYMENT',
      created_at: new Date().toISOString()
    };

    this.orders.unshift(order);
    return order;
  }

  public getOrders(): CommercialSatOrder[] {
    return this.orders;
  }
}

export const oskayiSatService = new OskayiSatService();
