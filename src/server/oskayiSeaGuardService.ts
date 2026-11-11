export interface MaritimeVessel {
  mmsi: string;
  imo: string;
  name: string;
  flag_country: string;
  flag_iso: string;
  vessel_type: 'Crude Oil Tanker' | 'Bulk Carrier' | 'Pelagic Trawler' | 'Container Ship' | 'Naval Patrol Cutter' | 'Chemical Tanker';
  lat: number;
  lng: number;
  speed_knots: number;
  heading_deg: number;
  destination: string;
  eta: string;
  status: 'underway' | 'anchored' | 'moored' | 'loitering' | 'dark_signal_reacquired';
  anomaly_flag: 'none' | 'dark_ship_6h' | 'protected_zone_fishing' | 'loitering_no_dest' | 'piracy_risk';
  dark_gap_hours?: number;
  last_ais_ping: string;
  satellite_radar_reflectivity_db?: number;
  oil_slick_detected?: boolean;
}

export interface MaritimeAnomalyEvent {
  id: string;
  vessel_mmsi: string;
  vessel_name: string;
  vessel_type: string;
  flag_country: string;
  anomaly_type: 'dark_ship_6h' | 'protected_zone_fishing' | 'loitering_no_dest' | 'piracy_risk';
  severity: 'critical' | 'high' | 'medium';
  zone_name: string;
  coordinates: { lat: number; lng: number };
  detected_at: string;
  evidence_summary: string;
  sentinel2_optical_match: boolean;
  alert_dispatched_to_port: boolean;
}

export interface SatelliteLayerData {
  layer_id: string;
  name: string;
  satellite: 'Copernicus Sentinel-2' | 'Sentinel-1 SAR Radar' | 'Landsat-9';
  resolution_meters: number;
  spectral_bands: string[];
  last_pass_time: string;
  active_oil_spills_count: number;
  suspected_illegal_trawlers_count: number;
}

export class OskayiSeaGuardService {
  private vessels: MaritimeVessel[] = [
    {
      mmsi: '636019842',
      imo: '9481234',
      name: 'OCEAN STARLIGHT',
      flag_country: 'Liberia',
      flag_iso: 'LR',
      vessel_type: 'Crude Oil Tanker',
      lat: 5.4120,
      lng: -0.0450,
      speed_knots: 1.2,
      heading_deg: 184,
      destination: 'TEMA OFFSHORE ANCHORAGE',
      eta: '2026-11-10T04:00:00Z',
      status: 'loitering',
      anomaly_flag: 'loitering_no_dest',
      last_ais_ping: new Date(Date.now() - 140000).toISOString(),
      satellite_radar_reflectivity_db: -14.2,
      oil_slick_detected: false
    },
    {
      mmsi: '412890123',
      imo: '8792011',
      name: 'HAI YANG 68',
      flag_country: 'China',
      flag_iso: 'CN',
      vessel_type: 'Pelagic Trawler',
      lat: 4.8820,
      lng: -1.7250,
      speed_knots: 3.4,
      heading_deg: 92,
      destination: 'FISHING GROUNDS',
      eta: '2026-11-12T12:00:00Z',
      status: 'underway',
      anomaly_flag: 'protected_zone_fishing',
      last_ais_ping: new Date(Date.now() - 40000).toISOString(),
      satellite_radar_reflectivity_db: -18.5,
      oil_slick_detected: false
    },
    {
      mmsi: '354891002',
      imo: '9654129',
      name: 'BALTIC SEAHORSE',
      flag_country: 'Panama',
      flag_iso: 'PA',
      vessel_type: 'Chemical Tanker',
      lat: 4.5210,
      lng: 1.2540,
      speed_knots: 12.8,
      heading_deg: 270,
      destination: 'ABIDJAN',
      eta: '2026-11-11T18:00:00Z',
      status: 'dark_signal_reacquired',
      anomaly_flag: 'dark_ship_6h',
      dark_gap_hours: 8.4,
      last_ais_ping: new Date().toISOString(),
      satellite_radar_reflectivity_db: -12.1,
      oil_slick_detected: true
    },
    {
      mmsi: '627004551',
      imo: '9789045',
      name: 'GNS YAA ASANTEWAA (P31)',
      flag_country: 'Ghana',
      flag_iso: 'GH',
      vessel_type: 'Naval Patrol Cutter',
      lat: 5.3400,
      lng: -0.1200,
      speed_knots: 21.5,
      heading_deg: 135,
      destination: 'EXCLUSIVE ECONOMIC ZONE PATROL',
      eta: '2026-11-10T16:00:00Z',
      status: 'underway',
      anomaly_flag: 'none',
      last_ais_ping: new Date().toISOString(),
      satellite_radar_reflectivity_db: -9.8,
      oil_slick_detected: false
    },
    {
      mmsi: '538008912',
      imo: '9845112',
      name: 'MSC ACCRA EXPRESS',
      flag_country: 'Marshall Islands',
      flag_iso: 'MH',
      vessel_type: 'Container Ship',
      lat: 5.6120,
      lng: 0.0120,
      speed_knots: 15.6,
      heading_deg: 312,
      destination: 'TEMA CONTAINER TERMINAL MPS-3',
      eta: '2026-11-10T02:00:00Z',
      status: 'underway',
      anomaly_flag: 'none',
      last_ais_ping: new Date(Date.now() - 30000).toISOString(),
      satellite_radar_reflectivity_db: -8.2,
      oil_slick_detected: false
    },
    {
      mmsi: '636091244',
      imo: '9312890',
      name: 'GULF CORAL',
      flag_country: 'Liberia',
      flag_iso: 'LR',
      vessel_type: 'Crude Oil Tanker',
      lat: 3.9800,
      lng: 6.8400,
      speed_knots: 9.4,
      heading_deg: 245,
      destination: 'ESCRAVOS TERMINAL',
      eta: '2026-11-10T22:00:00Z',
      status: 'underway',
      anomaly_flag: 'piracy_risk',
      last_ais_ping: new Date(Date.now() - 110000).toISOString(),
      satellite_radar_reflectivity_db: -13.0,
      oil_slick_detected: false
    }
  ];

  private anomalies: MaritimeAnomalyEvent[] = [
    {
      id: 'anomaly-001',
      vessel_mmsi: '354891002',
      vessel_name: 'BALTIC SEAHORSE',
      vessel_type: 'Chemical Tanker',
      flag_country: 'Panama',
      anomaly_type: 'dark_ship_6h',
      severity: 'critical',
      zone_name: 'Gulf of Guinea Maritime Corridor (Sector B)',
      coordinates: { lat: 4.5210, lng: 1.2540 },
      detected_at: new Date(Date.now() - 1800000).toISOString(),
      evidence_summary: 'Transponder went dark for 8.4 hours near offshore bunkering zone. Re-acquired with 3.8 km² surface sheen detected via Copernicus Sentinel-2 optical imagery.',
      sentinel2_optical_match: true,
      alert_dispatched_to_port: true
    },
    {
      id: 'anomaly-002',
      vessel_mmsi: '412890123',
      vessel_name: 'HAI YANG 68',
      vessel_type: 'Pelagic Trawler',
      flag_country: 'China',
      anomaly_type: 'protected_zone_fishing',
      severity: 'high',
      zone_name: 'Cape Three Points Marine Sanctuary / Inshore Exclusion Zone (IEZ)',
      coordinates: { lat: 4.8820, lng: -1.7250 },
      detected_at: new Date(Date.now() - 4200000).toISOString(),
      evidence_summary: 'Trawling pattern (3.4 knots zig-zag) confirmed inside 12 NM territorial breeding waters reserved for artisanal fishers under Ghana Fisheries Act (Act 625).',
      sentinel2_optical_match: true,
      alert_dispatched_to_port: true
    },
    {
      id: 'anomaly-003',
      vessel_mmsi: '636019842',
      vessel_name: 'OCEAN STARLIGHT',
      vessel_type: 'Crude Oil Tanker',
      flag_country: 'Liberia',
      anomaly_type: 'loitering_no_dest',
      severity: 'medium',
      zone_name: 'Tema Port Outer Anchorage Roadstead',
      coordinates: { lat: 5.4120, lng: -0.0450 },
      detected_at: new Date(Date.now() - 7200000).toISOString(),
      evidence_summary: 'Drifting at 1.2 knots with no confirmed berth assignment from Ghana Ports and Harbours Authority (GPHA) for 18 consecutive hours.',
      sentinel2_optical_match: false,
      alert_dispatched_to_port: false
    }
  ];

  private satelliteLayers: SatelliteLayerData[] = [
    {
      layer_id: 'copernicus-s2-optical',
      name: 'Copernicus Sentinel-2 Multispectral MSI',
      satellite: 'Copernicus Sentinel-2',
      resolution_meters: 10,
      spectral_bands: ['B02 (Blue)', 'B03 (Green)', 'B04 (Red)', 'B08 (NIR)', 'B11 (SWIR)'],
      last_pass_time: new Date(Date.now() - 14400000).toISOString(),
      active_oil_spills_count: 2,
      suspected_illegal_trawlers_count: 4
    },
    {
      layer_id: 'sentinel-1-sar-radar',
      name: 'Copernicus Sentinel-1 Synthetic Aperture Radar (SAR)',
      satellite: 'Sentinel-1 SAR Radar',
      resolution_meters: 20,
      spectral_bands: ['VV (Vertical Co-polar)', 'VH (Cross-polar)'],
      last_pass_time: new Date(Date.now() - 28800000).toISOString(),
      active_oil_spills_count: 1,
      suspected_illegal_trawlers_count: 7
    }
  ];

  public getVessels(): MaritimeVessel[] {
    return this.vessels;
  }

  public getAnomalies(): MaritimeAnomalyEvent[] {
    return this.anomalies;
  }

  public getSatelliteLayers(): SatelliteLayerData[] {
    return this.satelliteLayers;
  }

  public dispatchPortAlert(anomalyId: string, recipientEmail?: string): { success: boolean; message: string; alertRecord: MaritimeAnomalyEvent } {
    const anomaly = this.anomalies.find(a => a.id === anomalyId);
    if (!anomaly) {
      throw new Error(`Maritime anomaly ${anomalyId} not found`);
    }

    anomaly.alert_dispatched_to_port = true;
    const email = recipientEmail || 'operations@gpha.gov.gh';

    return {
      success: true,
      message: `PRIORITY MARITIME NOTICE: Automated dispatch transmitted to ${email} (Ghana Ports & Harbours Authority / Maritime Operations Center) for vessel ${anomaly.vessel_name} (MMSI: ${anomaly.vessel_mmsi}). Incident coordinates: ${anomaly.coordinates.lat.toFixed(4)}, ${anomaly.coordinates.lng.toFixed(4)}.`,
      alertRecord: anomaly
    };
  }

  public generateDossier(mmsi: string): any {
    const vessel = this.vessels.find(v => v.mmsi === mmsi) || this.vessels[0];
    const vesselAnomalies = this.anomalies.filter(a => a.vessel_mmsi === mmsi);

    return {
      dossier_id: `MOC-DOSSIER-${vessel.mmsi}-${Date.now().toString(36).toUpperCase()}`,
      issued_by: 'OSKAYI SEA GUARD GLOBAL • MARITIME SURVEILLANCE DESK',
      statutory_authority: 'Ghana Maritime Authority & International Maritime Organization (IMO) AIS Compliance Standards',
      timestamp: new Date().toISOString(),
      vessel_profile: {
        name: vessel.name,
        mmsi: vessel.mmsi,
        imo: vessel.imo,
        flag: vessel.flag_country,
        type: vessel.vessel_type,
        current_coordinates: { lat: vessel.lat, lng: vessel.lng },
        speed_knots: vessel.speed_knots,
        heading: vessel.heading_deg,
        destination: vessel.destination,
        eta: vessel.eta
      },
      anomalies_detected: vesselAnomalies,
      satellite_evidence: {
        copernicus_pass_match: true,
        radar_reflectivity: vessel.satellite_radar_reflectivity_db ? `${vessel.satellite_radar_reflectivity_db} dB` : 'Normal',
        oil_slick_observed: vessel.oil_slick_detected ? 'CONFIRMED (3.8 km² optical sheen)' : 'NEGATIVE',
        spectral_confidence_score: '96.4%'
      },
      recommended_action: vessel.anomaly_flag === 'dark_ship_6h'
        ? 'IMMEDIATE NAVAL BOARDING & HARBOUR DETENTION UNDER SOLAS CHAPTER V REGULATION 19'
        : vessel.anomaly_flag === 'protected_zone_fishing'
        ? 'INTERCEPTION BY NAVAL PATROL CUTTER & IMPOUNDING OF TRAWL GEAR (ACT 625)'
        : 'ROUTINE SURVEILLANCE & HARBOUR MASTER TRAFFIC DIRECTIVE'
    };
  }
}

export const oskayiSeaGuardService = new OskayiSeaGuardService();
