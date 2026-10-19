import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  MapPin, 
  Bell, 
  BellOff, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Calendar, 
  Check, 
  ChevronDown,
  Navigation,
  Globe2,
  Heart
} from 'lucide-react';
import { PRAYER_CITIES, MUEZZINS, PrayerCity, Muezzin } from '../../data/masjidData';

interface PrayerTimesState {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  hijriDate: string;
  gregorianDate: string;
}

export const AlMihrabPrayerCenter: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<PrayerCity>(PRAYER_CITIES[0]); // Accra default
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesState>({
    Fajr: '04:52',
    Sunrise: '05:58',
    Dhuhr: '12:02',
    Asr: '15:19',
    Maghrib: '18:05',
    Isha: '19:15',
    hijriDate: '15 Rabi’ al-Thani 1448 AH',
    gregorianDate: 'Today'
  });
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [selectedMuezzin, setSelectedMuezzin] = useState<Muezzin>(MUEZZINS[0]);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);
  const [adhanProgress, setAdhanProgress] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  
  // Next Prayer & Countdown
  const [nextPrayerName, setNextPrayerName] = useState<string>('Dhuhr');
  const [timeRemaining, setTimeRemaining] = useState<string>('02:44:18');

  // Qibla Compass
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [hasCompassSupport, setHasCompassSupport] = useState<boolean>(false);

  // Digital Tasbih
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<number>(33);
  const [tasbihDhikr, setTasbihDhikr] = useState<string>('SubhanAllah');
  const [tasbihHistory, setTasbihHistory] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch live prayer times from Aladhan API or graceful fallback
  useEffect(() => {
    let isMounted = true;
    async function fetchPrayerTimes() {
      setIsLoadingTimes(true);
      try {
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(selectedCity.name)}&country=${encodeURIComponent(selectedCity.country)}&method=3`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.timings && isMounted) {
            const timings = json.data.timings;
            const hijri = json.data.date?.hijri;
            const hijriStr = hijri 
              ? `${hijri.day} ${hijri.month.en} ${hijri.year} AH` 
              : '15 Rabi’ al-Thani 1448 AH';
            
            setPrayerTimes({
              Fajr: timings.Fajr?.slice(0, 5) || '04:52',
              Sunrise: timings.Sunrise?.slice(0, 5) || '05:58',
              Dhuhr: timings.Dhuhr?.slice(0, 5) || '12:02',
              Asr: timings.Asr?.slice(0, 5) || '15:19',
              Maghrib: timings.Maghrib?.slice(0, 5) || '18:05',
              Isha: timings.Isha?.slice(0, 5) || '19:15',
              hijriDate: hijriStr,
              gregorianDate: json.data.date?.readable || today.toDateString()
            });
          }
        }
      } catch (err) {
        // Fallback default times already set
      } finally {
        if (isMounted) setIsLoadingTimes(false);
      }
    }

    fetchPrayerTimes();
    return () => { isMounted = false; };
  }, [selectedCity]);

  // Next prayer calculation & countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const parseMinutes = (timeStr: string) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
      };

      const prayerOrder = [
        { name: 'Fajr', time: prayerTimes.Fajr },
        { name: 'Sunrise', time: prayerTimes.Sunrise },
        { name: 'Dhuhr', time: prayerTimes.Dhuhr },
        { name: 'Asr', time: prayerTimes.Asr },
        { name: 'Maghrib', time: prayerTimes.Maghrib },
        { name: 'Isha', time: prayerTimes.Isha }
      ];

      let next = prayerOrder[0];
      let diffMinutes = 0;

      const found = prayerOrder.find(p => parseMinutes(p.time) > currentMinutes);
      if (found) {
        next = found;
        diffMinutes = parseMinutes(found.time) - currentMinutes;
      } else {
        // Next is tomorrow's Fajr
        next = prayerOrder[0];
        diffMinutes = (24 * 60 - currentMinutes) + parseMinutes(prayerOrder[0].time);
      }

      setNextPrayerName(next.name);

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      const seconds = 59 - now.getSeconds();
      setTimeRemaining(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  // Geolocation detector
  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          
          // Find closest city
          let closest = PRAYER_CITIES[0];
          let minDistance = Infinity;

          PRAYER_CITIES.forEach(c => {
            const d = Math.hypot(c.latitude - lat, c.longitude - lng);
            if (d < minDistance) {
              minDistance = d;
              closest = c;
            }
          });

          setSelectedCity(closest);
          setNotificationMsg(`Detected your location near ${closest.name}, ${closest.country}`);
          setTimeout(() => setNotificationMsg(''), 4000);
        },
        () => {
          setNotificationMsg('Location access denied. Using Accra default.');
          setTimeout(() => setNotificationMsg(''), 4000);
        }
      );
    }
  };

  // Device Orientation for Qibla
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHasCompassSupport(true);
        setDeviceHeading(e.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Adhan Audio Toggle
  const toggleAdhan = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(selectedMuezzin.audioUrl);
      audioRef.current.onended = () => {
        setIsPlayingAdhan(false);
        setAdhanProgress(0);
      };
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current && audioRef.current.duration) {
          setAdhanProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };
    }

    if (isPlayingAdhan) {
      audioRef.current.pause();
      setIsPlayingAdhan(false);
    } else {
      audioRef.current.src = selectedMuezzin.audioUrl;
      audioRef.current.play().then(() => {
        setIsPlayingAdhan(true);
      }).catch(() => {
        // Audio playback fallback
        setIsPlayingAdhan(false);
      });
    }
  };

  // Web Push notification permission
  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          new Notification('Masjid Al-Noor Al-Alami', {
            body: `Prayer time alerts enabled for ${selectedCity.name}. May peace be upon you.`,
            icon: '/favicon.ico'
          });
        }
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  // Tasbih Increment
  const handleTasbihClick = () => {
    const nextVal = tasbihCount + 1;
    if (nextVal >= tasbihTarget) {
      setTasbihCount(0);
      setTasbihHistory(h => h + 1);
      // Optional sound/vibration
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      setTasbihCount(nextVal);
      if (navigator.vibrate) navigator.vibrate(15);
    }
  };

  const handleResetTasbih = () => {
    setTasbihCount(0);
    setTasbihHistory(0);
  };

  const qiblaTargetAngle = selectedCity.qiblaAngle;
  const compassNeedleAngle = deviceHeading !== null 
    ? (qiblaTargetAngle - deviceHeading) 
    : qiblaTargetAngle;

  const prayersList = [
    { key: 'Fajr', label: 'Fajr', arabic: 'الفجر', time: prayerTimes.Fajr, desc: 'Dawn Prayer' },
    { key: 'Sunrise', label: 'Sunrise', arabic: 'الشروق', time: prayerTimes.Sunrise, desc: 'Solar Rise' },
    { key: 'Dhuhr', label: 'Dhuhr', arabic: 'الظهر', time: prayerTimes.Dhuhr, desc: 'Noon Prayer' },
    { key: 'Asr', label: 'Asr', arabic: 'العصر', time: prayerTimes.Asr, desc: 'Afternoon Prayer' },
    { key: 'Maghrib', label: 'Maghrib', arabic: 'المغرب', time: prayerTimes.Maghrib, desc: 'Sunset Prayer' },
    { key: 'Isha', label: 'Isha', arabic: 'العشاء', time: prayerTimes.Isha, desc: 'Night Prayer' }
  ];

  return (
    <section id="mihrab" className="relative space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>SECTION 01 • AL-MIHRAB LIVE 24/7</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Global Automated Mihrab
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
          Al-Mihrab Live 24/7 & Prayer Center
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light">
          Real-time global prayer times powered by Aladhan API, automated Adhan broadcast from holy sanctuaries, digital Qibla orientation, and synchronized remembrance.
        </p>

        {notificationMsg && (
          <div className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs rounded-xl font-mono animate-fade-in">
            {notificationMsg}
          </div>
        )}
      </div>

      {/* Main Mihrab Display Card with Ornate Arch Motif */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0F274D] via-[#0A1931] to-[#071326] border-2 border-[#D4AF37] shadow-[0_15px_45px_rgba(212,175,55,0.2)] p-6 sm:p-10 space-y-8 overflow-hidden">
        
        {/* Background Islamic Arch Watermark */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none text-[#D4AF37]">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 10 C 60 10 20 50 20 100 L 20 190 L 180 190 L 180 100 C 180 50 140 10 100 10 Z" />
          </svg>
        </div>

        {/* Top Control Bar: City Selector + Geolocation + Hijri Date */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/30 flex-wrap">
          
          {/* City Selector */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-xs font-mono">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <select
                value={selectedCity.name}
                onChange={(e) => {
                  const city = PRAYER_CITIES.find(c => c.name === e.target.value);
                  if (city) setSelectedCity(city);
                }}
                className="bg-transparent text-white font-bold outline-none cursor-pointer pr-2"
              >
                {PRAYER_CITIES.map(c => (
                  <option key={c.name} value={c.name} className="bg-[#0A1931] text-white">
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleDetectLocation}
              className="px-3 py-2 rounded-xl bg-[#0A1931] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] flex items-center gap-1.5 transition-all shadow-sm"
              title="Detect my current location"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Detect My City</span>
            </button>

            <button
              onClick={toggleNotifications}
              className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm ${
                notificationsEnabled 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                  : 'bg-[#0A1931] text-slate-300 border-[#D4AF37]/40 hover:text-white'
              }`}
              title="Enable Prayer Time Push Notifications"
            >
              {notificationsEnabled ? <Bell className="w-3.5 h-3.5 text-emerald-400" /> : <BellOff className="w-3.5 h-3.5" />}
              <span>{notificationsEnabled ? 'Alerts ON' : 'Alerts OFF'}</span>
            </button>
          </div>

          {/* Hijri Calendar Display */}
          <div className="text-center sm:text-right font-mono space-y-0.5">
            <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-[#D4AF37] font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{prayerTimes.hijriDate}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {prayerTimes.gregorianDate} • {selectedCity.timezone}
            </div>
          </div>
        </div>

        {/* Live Countdown Banner to Next Prayer */}
        <div className="p-5 rounded-2xl bg-[#071326]/90 border border-[#D4AF37]/60 shadow-inner flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
              Next Prayer in {selectedCity.name}
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-black text-white flex items-center gap-2 justify-center md:justify-start">
              <span>{nextPrayerName}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0A1931] font-mono font-bold">
                Upcoming
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center font-mono">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FFF3B0] tracking-widest drop-shadow">
                {timeRemaining}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                Hours : Minutes : Seconds
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times Grid (6 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {prayersList.map((prayer) => {
            const isNext = prayer.label === nextPrayerName;
            return (
              <div
                key={prayer.key}
                className={`p-4 rounded-2xl border text-center transition-all space-y-2 relative group ${
                  isNext
                    ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#0A1931] border-[#D4AF37] ring-1 ring-[#D4AF37]/60 shadow-lg shadow-[#D4AF37]/15'
                    : 'bg-[#0A1931]/80 border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
                }`}
              >
                {isNext && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 bg-[#D4AF37] text-[#0A1931] text-[9px] font-mono font-black uppercase rounded-full">
                    Next
                  </span>
                )}

                <div className="text-xs font-mono font-bold text-slate-300 group-hover:text-white">
                  {prayer.label}
                </div>
                
                <div className="text-xs font-serif text-[#D4AF37]" dir="rtl">
                  {prayer.arabic}
                </div>

                <div className="text-xl sm:text-2xl font-mono font-black text-white group-hover:text-[#FFF3B0] transition-colors">
                  {prayer.time}
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  {prayer.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Deck: Adhan Player | Qibla Compass | Digital Tasbih */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#D4AF37]/30">
          
          {/* Card 1: 5-Muezzin Adhan Broadcast */}
          <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#D4AF37]">
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Live Holy Sanctuary Adhan</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Broadcast
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Listen to the sacred call to prayer chanted from Makkah, Madinah, Al-Aqsa, Istanbul, or Cairo.
            </p>

            {/* Muezzin Selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400">Select Muezzin:</label>
              <select
                value={selectedMuezzin.id}
                onChange={(e) => {
                  const m = MUEZZINS.find(item => item.id === e.target.value);
                  if (m) {
                    setSelectedMuezzin(m);
                    if (isPlayingAdhan && audioRef.current) {
                      audioRef.current.src = m.audioUrl;
                      audioRef.current.play();
                    }
                  }
                }}
                className="w-full p-2 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-xs font-mono text-white outline-none cursor-pointer"
              >
                {MUEZZINS.map(m => (
                  <option key={m.id} value={m.id} className="bg-[#0A1931] text-white">
                    {m.name} ({m.location})
                  </option>
                ))}
              </select>
            </div>

            {/* Audio Control Button & Progress */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={toggleAdhan}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] hover:from-[#FFF3B0] hover:to-[#D4AF37] text-[#0A1931] font-mono font-black text-xs flex items-center gap-2 transition-all shadow-md"
              >
                {isPlayingAdhan ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlayingAdhan ? 'Pause Adhan' : 'Play Adhan'}</span>
              </button>

              <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="bg-[#D4AF37] h-full transition-all duration-300"
                  style={{ width: `${adhanProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Qibla Compass */}
          <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/50 space-y-4 text-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#D4AF37]">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Qibla Direction Compass</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {selectedCity.name}: {selectedCity.qiblaAngle}°
              </span>
            </div>

            {/* Compass Visualization */}
            <div className="relative w-32 h-32 mx-auto rounded-full bg-[#071326] border-2 border-[#D4AF37]/70 flex items-center justify-center shadow-inner">
              
              {/* Cardinal Markers */}
              <span className="absolute top-1 text-[9px] font-mono text-slate-400 font-bold">N</span>
              <span className="absolute bottom-1 text-[9px] font-mono text-slate-400 font-bold">S</span>
              <span className="absolute left-1.5 text-[9px] font-mono text-slate-400 font-bold">W</span>
              <span className="absolute right-1.5 text-[9px] font-mono text-slate-400 font-bold">E</span>

              {/* Kaaba Golden Needle */}
              <div 
                className="w-1 h-20 bg-gradient-to-t from-transparent via-[#D4AF37] to-[#FFF3B0] transition-transform duration-500 rounded-full"
                style={{ transform: `rotate(${compassNeedleAngle}deg)` }}
              />

              {/* Center Pivot Stud */}
              <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#0A1931] shadow z-10 flex items-center justify-center text-[7px] text-[#0A1931] font-bold">
                🕋
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-300">
              Qibla Bearing: <strong className="text-[#D4AF37]">{selectedCity.qiblaAngle}° East of True North</strong>
              <div className="text-[9px] text-slate-400 mt-0.5">
                {hasCompassSupport ? 'Active device gyroscope detected' : 'Standard azimuth calculation for coordinates'}
              </div>
            </div>
          </div>

          {/* Card 3: Digital Tasbih Counter */}
          <div className="p-5 rounded-2xl bg-[#08152B] border border-[#D4AF37]/50 space-y-4 text-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#D4AF37]">
                <Heart className="w-4 h-4 text-[#D4AF37]" />
                <span>Digital Tasbih (Dhikr)</span>
              </div>
              <button
                onClick={handleResetTasbih}
                className="text-[10px] font-mono text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Reset counter"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Dhikr Selector */}
            <select
              value={tasbihDhikr}
              onChange={(e) => {
                setTasbihDhikr(e.target.value);
                setTasbihCount(0);
              }}
              className="w-full p-2 rounded-xl bg-[#071326] border border-[#D4AF37]/40 text-xs font-mono text-white outline-none cursor-pointer"
            >
              <option value="SubhanAllah">SubhanAllah (Glorified is Allah) — سبحان الله</option>
              <option value="Alhamdulillah">Alhamdulillah (All Praise is for Allah) — الحمد لله</option>
              <option value="Allahu Akbar">Allahu Akbar (Allah is the Greatest) — الله أكبر</option>
              <option value="Astaghfirullah">Astaghfirullah (I seek forgiveness) — أستغفر الله</option>
              <option value="La ilaha illallah">La ilaha illallah (There is no god but Allah) — لا إله إلا الله</option>
            </select>

            {/* Tap Button Counter */}
            <div className="space-y-2">
              <button
                onClick={handleTasbihClick}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#664D12] text-[#0A1931] shadow-[0_8px_25px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center active:scale-95 transition-transform border-2 border-[#FFF3B0]"
              >
                <span className="text-3xl font-mono font-black">{tasbihCount}</span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#071326]">
                  Tap (Tap)
                </span>
              </button>

              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
                <span>Target: <strong>{tasbihTarget}</strong></span>
                <span>•</span>
                <span>Cycles Completed: <strong className="text-emerald-400">{tasbihHistory}</strong></span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
