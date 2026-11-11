import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Video, 
  Volume2, 
  VolumeX, 
  Download, 
  Send, 
  Share2, 
  Check, 
  Clock, 
  Eye, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Radio,
  Sliders,
  Maximize2
} from 'lucide-react';
import { VideoShort, TrendingHeadline } from '../../server/mediaMachineService';

interface VideoAgentStudioProps {
  videos: VideoShort[];
  headlines: TrendingHeadline[];
  onGenerateVideo: (headlineId: string, channelId: string) => void;
  isGenerating?: boolean;
}

export const VideoAgentStudio: React.FC<VideoAgentStudioProps> = ({
  videos,
  headlines,
  onGenerateVideo,
  isGenerating = false
}) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoShort>(videos[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [playbackSec, setPlaybackSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [selectedHeadlineForGen, setSelectedHeadlineForGen] = useState<string>(headlines[0]?.id || '');

  // 10 Secular Corporate Channels List
  const channelsList = [
    { id: 'all', name: 'All 10 Channels' },
    { id: 'ch-1', name: 'Oskayi News Ghana' },
    { id: 'ch-2', name: 'Oskayi World News' },
    { id: 'ch-3', name: 'Oskayi Business' },
    { id: 'ch-4', name: 'Oskayi Sports' },
    { id: 'ch-5', name: 'Oskayi Tech' },
    { id: 'ch-6', name: 'Oskayi Health' },
    { id: 'ch-7', name: 'Oskayi Energy & Resources' },
    { id: 'ch-8', name: 'Oskayi Music' },
    { id: 'ch-9', name: 'Oskayi Food' },
    { id: 'ch-10', name: 'Oskayi Viral' }
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying && activeVideo) {
      timer = setInterval(() => {
        setPlaybackSec((prev) => {
          const next = prev + 1;
          if (next >= activeVideo.duration_sec) {
            return 0;
          }
          if (next < 4) setCurrentSceneIdx(0);
          else if (next < 22) setCurrentSceneIdx(1);
          else if (next < 44) setCurrentSceneIdx(2);
          else setCurrentSceneIdx(3);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeVideo]);

  const filteredVideos = selectedChannelId === 'all'
    ? videos
    : videos.filter(v => v.channel_id === selectedChannelId);

  const currentScene = activeVideo?.scenes[currentSceneIdx] || activeVideo?.scenes[0];

  const handleCopyScript = () => {
    if (!activeVideo) return;
    const fullScript = `TITLE: ${activeVideo.title}\n\nHOOK (3s): ${activeVideo.hook_3s}\n\nBODY (40s): ${activeVideo.body_40s}\n\nCTA (5s): ${activeVideo.end_cta_5s}\n\nTAGS: ${activeVideo.tags.join(', ')}`;
    navigator.clipboard.writeText(fullScript);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Studio Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0A1F44] via-slate-900 to-[#0A1F44] border border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Video Agent • 100 YouTube Shorts / Day
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Oskayi <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#FFD700] bg-clip-text text-transparent">Video Studio</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Automated 9:16 vertical video production engine. Edge TTS studio voices, dynamic Pollinations.ai scenes, burned-in gold captions, and multi-platform publishing to YouTube Shorts, TikTok, and Reels.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Daily Production</span>
              <span className="text-2xl font-black text-[#FFD700] font-mono">100 / 100</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Channels</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">10 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 10 Channel Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {channelsList.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setSelectedChannelId(ch.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedChannelId === ch.id
                ? 'bg-[#FFD700] text-[#0A1F44] shadow-md shadow-[#FFD700]/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {ch.name}
          </button>
        ))}
      </div>

      {/* Main Studio Grid: Interactive 9:16 Smartphone Player + Script & Timeline Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 9:16 Vertical Video Preview Player */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[320px] sm:w-[360px] h-[640px] sm:h-[680px] rounded-[40px] bg-black border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 selection:bg-none">
            {/* Background Visual Scene with Ken Burns Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={currentScene?.image_url || activeVideo?.thumbnail_url}
                alt="Scene visual"
                className="w-full h-full object-cover transition-all duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70 opacity-90" />
            </div>

            {/* Top Bar: Brand Watermark & Synthetic Media Disclosure */}
            <div className="relative z-10 flex items-center justify-between text-xs pt-2 px-2">
              <div className="flex items-center gap-1.5 bg-[#0A1F44]/90 px-2.5 py-1 rounded-full border border-[#FFD700]/60">
                <span className="font-black text-[#FFD700] text-xs font-serif tracking-wider">OSKAYI</span>
                <span className="text-[10px] text-white">#Shorts</span>
              </div>

              <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300 border border-amber-500/40">
                AI Voice Synthesis Disclosed
              </div>
            </div>

            {/* Center Dynamic Burned-in Subtitle Captions */}
            <div className="relative z-10 px-4 py-8 text-center my-auto">
              <div className="inline-block p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-[#FFD700]/50 shadow-2xl">
                <span className="text-base sm:text-lg font-black text-[#FFD700] leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {currentScene?.caption_text || activeVideo?.hook_3s}
                </span>
              </div>
            </div>

            {/* Bottom Controls & Channel Badge */}
            <div className="relative z-10 space-y-3 pb-2 px-2">
              <div className="flex items-center justify-between text-xs text-white">
                <div>
                  <span className="font-bold text-[#FFD700] block text-xs">{activeVideo?.channel_name}</span>
                  <span className="text-[10px] text-slate-300 line-clamp-1">{activeVideo?.title}</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/60 text-white hover:text-[#FFD700]"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#FFD700] h-full transition-all duration-300"
                  style={{ width: `${(playbackSec / (activeVideo?.duration_sec || 60)) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>00:{playbackSec < 10 ? `0${playbackSec}` : playbackSec} / 01:00</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setPlaybackSec(0);
                      setCurrentSceneIdx(0);
                    }}
                    className="hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded-full bg-[#FFD700] text-[#0A1F44] font-bold"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scene Timeline, Script Breakdown & Auto-Generator */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Generator Box */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                Video Production Pipeline
              </span>
              <span className="text-[11px] text-emerald-400">Edge TTS + FFmpeg Ready</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8">
                <select
                  value={selectedHeadlineForGen}
                  onChange={(e) => setSelectedHeadlineForGen(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                >
                  {headlines.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.title.slice(0, 70)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4">
                <button
                  onClick={() => onGenerateVideo(selectedHeadlineForGen, selectedChannelId === 'all' ? 'ch-1' : selectedChannelId)}
                  disabled={isGenerating}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#FFD700]/20 disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Rendering...' : 'Render Video Short'}
                </button>
              </div>
            </div>
          </div>

          {/* Active Video Script & Specs */}
          {activeVideo && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {activeVideo.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Voice: <strong className="text-slate-200">{activeVideo.voice_artist}</strong></span>
                    <span>•</span>
                    <span>Music: <strong className="text-amber-300">{activeVideo.music_track}</strong></span>
                  </div>
                </div>

                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copySuccess ? 'Script Copied' : 'Copy Script'}
                </button>
              </div>

              {/* 4 Scene Timeline Cards */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  4-Scene Production Breakdown (60 Seconds)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {activeVideo.scenes.map((scene, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentSceneIdx(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        currentSceneIdx === idx
                          ? 'bg-[#0A1F44] border-[#FFD700] shadow-md shadow-[#FFD700]/10'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-bold text-white">Scene {scene.scene_index} ({scene.duration_sec}s)</span>
                        <span className="text-[#FFD700]">{scene.camera_motion}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] line-clamp-2 italic">
                        "{scene.caption_text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Platform Upload Queues */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-white uppercase tracking-wider block">
                  Automated Multi-Platform Dispatch Targets
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-red-400 font-bold block">YouTube Shorts</span>
                    <span className="text-emerald-400">Scheduled 6AM</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-pink-400 font-bold block">TikTok</span>
                    <span className="text-emerald-400">Scheduled 12PM</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-blue-400 font-bold block">Facebook Reels</span>
                    <span className="text-emerald-400">Scheduled 6PM</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-purple-400 font-bold block">Instagram Reels</span>
                    <span className="text-emerald-400">Scheduled 8PM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Videos Grid for Selected Channel */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Recent Video Render Queue ({filteredVideos.length})
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredVideos.map((v) => {
                const isSelected = activeVideo?.id === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => {
                      setActiveVideo(v);
                      setPlaybackSec(0);
                      setCurrentSceneIdx(0);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[#0A1F44] border-[#FFD700] shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={v.thumbnail_url}
                      alt="Thumbnail"
                      className="w-14 h-20 rounded-xl object-cover shrink-0 border border-slate-700"
                    />
                    <div className="overflow-hidden space-y-1">
                      <span className="text-[10px] font-bold text-[#FFD700] block uppercase">{v.channel_name}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {v.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-slate-400" /> {v.views.toLocaleString()}</span>
                        <span>•</span>
                        <span className="text-emerald-400">${v.revenue_usd}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
