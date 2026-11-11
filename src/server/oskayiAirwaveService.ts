export interface PttChannel {
  id: string;
  name: string;
  category: 'emergency' | 'police' | 'fire' | 'ems' | 'maritime' | 'direct';
  active_users_count: number;
  priority_level: 1 | 2 | 3;
  is_locked_for_sos: boolean;
  e2ee_key_fingerprint: string;
}

export interface EmergencyUnit {
  id: string;
  callsign: string;
  role: 'Officer' | 'Dispatcher' | 'Admin';
  agency: 'Police' | 'Fire & Rescue' | 'Ambulance / EMS' | 'Maritime Coast Guard';
  current_channel: string;
  status: 'available' | 'transmitting' | 'sos' | 'en_route' | 'offline_direct';
  battery_pct: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    speed_kmh: number;
  };
  last_heard_at: string;
  direct_wifi_mesh: boolean;
}

export interface PttCallRecord {
  id: string;
  channel_id: string;
  channel_name: string;
  sender_callsign: string;
  sender_agency: string;
  duration_sec: number;
  is_sos_emergency: boolean;
  timestamp: string;
  audio_waveform: number[];
  transcript: string;
  gps_fix: { lat: number; lng: number };
}

export class OskayiAirwaveService {
  private channels: PttChannel[] = [
    {
      id: 'ch-sos-priority',
      name: 'NATIONAL SOS PRIORITY OVERRIDE',
      category: 'emergency',
      active_users_count: 42,
      priority_level: 1,
      is_locked_for_sos: false,
      e2ee_key_fingerprint: 'AES-256-GCM::4F8A-99B2-C1D3'
    },
    {
      id: 'ch-police-alpha',
      name: 'Police Alpha Tactical (TG-101)',
      category: 'police',
      active_users_count: 18,
      priority_level: 2,
      is_locked_for_sos: false,
      e2ee_key_fingerprint: 'AES-256-GCM::81A4-F092-7E11'
    },
    {
      id: 'ch-fire-rescue',
      name: 'Fire & Heavy Rescue Ops (TG-201)',
      category: 'fire',
      active_users_count: 14,
      priority_level: 2,
      is_locked_for_sos: false,
      e2ee_key_fingerprint: 'AES-256-GCM::33B1-88DE-55F4'
    },
    {
      id: 'ch-ems-trauma',
      name: 'Emergency Medical Dispatch (TG-301)',
      category: 'ems',
      active_users_count: 12,
      priority_level: 2,
      is_locked_for_sos: false,
      e2ee_key_fingerprint: 'AES-256-GCM::98E2-441A-B702'
    },
    {
      id: 'ch-maritime-coastal',
      name: 'Maritime Coastal Sector (TG-401)',
      category: 'maritime',
      active_users_count: 8,
      priority_level: 3,
      is_locked_for_sos: false,
      e2ee_key_fingerprint: 'AES-256-GCM::12C9-AA50-D831'
    },
    {
      id: 'ch-direct-p2p',
      name: 'Direct Mode WiFi/Mesh (Off-Grid)',
      category: 'direct',
      active_users_count: 6,
      priority_level: 3,
      is_locked_for_sos: false,
      e2ee_key_fingerprint: 'NOISE-PROTOCOL::ED25519-P2P'
    }
  ];

  private units: EmergencyUnit[] = [
    {
      id: 'unit-accra-p402',
      callsign: 'PATROL-402',
      role: 'Officer',
      agency: 'Police',
      current_channel: 'ch-police-alpha',
      status: 'available',
      battery_pct: 88,
      location: {
        lat: 5.5560,
        lng: -0.1969,
        address: 'High Street, Central Business District, Accra',
        speed_kmh: 38
      },
      last_heard_at: new Date(Date.now() - 45000).toISOString(),
      direct_wifi_mesh: false
    },
    {
      id: 'unit-tema-fire7',
      callsign: 'ENGINE-7',
      role: 'Officer',
      agency: 'Fire & Rescue',
      current_channel: 'ch-fire-rescue',
      status: 'en_route',
      battery_pct: 94,
      location: {
        lat: 5.6720,
        lng: -0.0160,
        address: 'Harbour Roundabout, Industrial Area, Tema',
        speed_kmh: 52
      },
      last_heard_at: new Date(Date.now() - 120000).toISOString(),
      direct_wifi_mesh: false
    },
    {
      id: 'unit-kb-medic12',
      callsign: 'MEDIC-12',
      role: 'Officer',
      agency: 'Ambulance / EMS',
      current_channel: 'ch-ems-trauma',
      status: 'available',
      battery_pct: 79,
      location: {
        lat: 5.5385,
        lng: -0.2290,
        address: 'Korle Bu Emergency Corridor, Accra',
        speed_kmh: 0
      },
      last_heard_at: new Date(Date.now() - 18000).toISOString(),
      direct_wifi_mesh: false
    },
    {
      id: 'unit-coastal-bravo',
      callsign: 'CUTTER-BRAVO',
      role: 'Officer',
      agency: 'Maritime Coast Guard',
      current_channel: 'ch-maritime-coastal',
      status: 'available',
      battery_pct: 91,
      location: {
        lat: 5.5120,
        lng: -0.1820,
        address: 'Accra Anchorage - 3.2 NM Offshore',
        speed_kmh: 18
      },
      last_heard_at: new Date(Date.now() - 95000).toISOString(),
      direct_wifi_mesh: true
    },
    {
      id: 'unit-dispatch-central',
      callsign: 'DISPATCH-CONTROL-01',
      role: 'Dispatcher',
      agency: 'Police',
      current_channel: 'ch-sos-priority',
      status: 'available',
      battery_pct: 100,
      location: {
        lat: 5.5780,
        lng: -0.1890,
        address: 'National Police Headquarters Command Centre, Cantonments',
        speed_kmh: 0
      },
      last_heard_at: new Date().toISOString(),
      direct_wifi_mesh: false
    }
  ];

  private recordings: PttCallRecord[] = [
    {
      id: 'call-rec-001',
      channel_id: 'ch-police-alpha',
      channel_name: 'Police Alpha Tactical (TG-101)',
      sender_callsign: 'PATROL-402',
      sender_agency: 'Police',
      duration_sec: 7.4,
      is_sos_emergency: false,
      timestamp: new Date(Date.now() - 320000).toISOString(),
      audio_waveform: [15, 32, 68, 85, 92, 74, 60, 48, 88, 95, 62, 30, 12],
      transcript: 'Control, Patrol-402 on scene at High Street intersection. Vehicle cleared, traffic flowing normal.',
      gps_fix: { lat: 5.5560, lng: -0.1969 }
    },
    {
      id: 'call-rec-002',
      channel_id: 'ch-fire-rescue',
      channel_name: 'Fire & Heavy Rescue Ops (TG-201)',
      sender_callsign: 'ENGINE-7',
      sender_agency: 'Fire & Rescue',
      duration_sec: 11.2,
      is_sos_emergency: false,
      timestamp: new Date(Date.now() - 640000).toISOString(),
      audio_waveform: [20, 45, 78, 90, 84, 98, 92, 80, 65, 50, 40, 22, 10],
      transcript: 'Engine-7 responding to Tema Industrial warehouse. Water bowser 2 rolling behind us. ETA 4 minutes.',
      gps_fix: { lat: 5.6720, lng: -0.0160 }
    },
    {
      id: 'call-rec-003',
      channel_id: 'ch-ems-trauma',
      channel_name: 'Emergency Medical Dispatch (TG-301)',
      sender_callsign: 'MEDIC-12',
      sender_agency: 'Ambulance / EMS',
      duration_sec: 6.8,
      is_sos_emergency: false,
      timestamp: new Date(Date.now() - 950000).toISOString(),
      audio_waveform: [12, 28, 55, 70, 68, 52, 45, 60, 58, 35, 18],
      transcript: 'Medic-12 patient handed over to Korle Bu Trauma triage, unit restocked and ready for assignment.',
      gps_fix: { lat: 5.5385, lng: -0.2290 }
    }
  ];

  public getChannels(): PttChannel[] {
    return this.channels;
  }

  public getUnits(): EmergencyUnit[] {
    return this.units;
  }

  public getRecordings(): PttCallRecord[] {
    return this.recordings;
  }

  public transmitPtt(params: {
    channelId: string;
    senderCallsign: string;
    audioDurationSec?: number;
    transcript?: string;
  }): PttCallRecord {
    const channel = this.channels.find(c => c.id === params.channelId) || this.channels[1];
    const unit = this.units.find(u => u.callsign === params.senderCallsign) || this.units[0];

    const waveform = Array.from({ length: 14 }, () => Math.floor(Math.random() * 75) + 20);
    const duration = params.audioDurationSec || Math.round((Math.random() * 6 + 3) * 10) / 10;

    const record: PttCallRecord = {
      id: `call-rec-${Date.now().toString(36)}`,
      channel_id: channel.id,
      channel_name: channel.name,
      sender_callsign: unit.callsign,
      sender_agency: unit.agency,
      duration_sec: duration,
      is_sos_emergency: false,
      timestamp: new Date().toISOString(),
      audio_waveform: waveform,
      transcript: params.transcript || `Radio check on ${channel.name} by ${unit.callsign}. Loud and clear.`,
      gps_fix: { lat: unit.location.lat, lng: unit.location.lng }
    };

    unit.last_heard_at = new Date().toISOString();
    this.recordings.unshift(record);
    if (this.recordings.length > 50) this.recordings.pop();

    return record;
  }

  public triggerEmergencySos(params: {
    senderCallsign: string;
    lat: number;
    lng: number;
    sosReason?: string;
  }): { sosRecord: PttCallRecord; channelLocked: PttChannel; affectedUnitsCount: number } {
    const sosChannel = this.channels.find(c => c.id === 'ch-sos-priority')!;
    sosChannel.is_locked_for_sos = true;

    let triggeringUnit = this.units.find(u => u.callsign === params.senderCallsign);
    if (triggeringUnit) {
      triggeringUnit.status = 'sos';
      triggeringUnit.current_channel = sosChannel.id;
      triggeringUnit.location.lat = params.lat;
      triggeringUnit.location.lng = params.lng;
      triggeringUnit.last_heard_at = new Date().toISOString();
    }

    const sosRecord: PttCallRecord = {
      id: `sos-${Date.now().toString(36)}`,
      channel_id: sosChannel.id,
      channel_name: sosChannel.name,
      sender_callsign: params.senderCallsign,
      sender_agency: triggeringUnit ? triggeringUnit.agency : 'Police',
      duration_sec: 14.8,
      is_sos_emergency: true,
      timestamp: new Date().toISOString(),
      audio_waveform: [95, 98, 92, 100, 96, 94, 99, 95, 97, 100, 92, 88],
      transcript: `MAYDAY / 10-33 EMERGENCY OVERRIDE: ${params.senderCallsign} officer distress beacon activated at [${params.lat.toFixed(4)}, ${params.lng.toFixed(4)}]. ${params.sosReason || 'Immediate tactical backup requested'}. All radio traffic priority suspended.`,
      gps_fix: { lat: params.lat, lng: params.lng }
    };

    this.recordings.unshift(sosRecord);

    return {
      sosRecord,
      channelLocked: sosChannel,
      affectedUnitsCount: this.units.length
    };
  }

  public resetSos(): void {
    const sosChannel = this.channels.find(c => c.id === 'ch-sos-priority');
    if (sosChannel) {
      sosChannel.is_locked_for_sos = false;
    }
    this.units.forEach(u => {
      if (u.status === 'sos') u.status = 'available';
    });
  }

  public updateUnitStatus(unitId: string, status: EmergencyUnit['status'], channelId?: string): EmergencyUnit | null {
    const unit = this.units.find(u => u.id === unitId);
    if (!unit) return null;
    unit.status = status;
    if (channelId) unit.current_channel = channelId;
    unit.last_heard_at = new Date().toISOString();
    return unit;
  }
}

export const oskayiAirwaveService = new OskayiAirwaveService();
