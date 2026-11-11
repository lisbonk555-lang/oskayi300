import React, { useState, useEffect } from 'react';
import { OskayiMediaNavbar, NavigationTab } from './components/media/OskayiMediaNavbar';
import { OskayiSearch } from './components/search/OskayiSearch';
import { OskayiGrid } from './components/grid/OskayiGrid';
import { OskayiChat } from './components/chat/OskayiChat';
import { OskayiAirwave } from './components/airwave/OskayiAirwave';
import { OskayiSeaGuard } from './components/seaguard/OskayiSeaGuard';
import { OskayiSat } from './components/sat/OskayiSat';
import { OskayiPeace } from './components/peace/OskayiPeace';
import { OskayiDebtClock } from './components/debtclock/OskayiDebtClock';
import { OskayiWealth } from './components/wealth/OskayiWealth';
import { OskayiTrade } from './components/trade/OskayiTrade';
import { OskayiSovereign } from './components/sovereign/OskayiSovereign';
import { OskayiDebtRestructure } from './components/restructure/OskayiDebtRestructure';
import { VirtualAfricaApp } from './components/virtualafrica/VirtualAfricaApp';
import { OskayiIndex } from './components/indexbuilder/OskayiIndex';
import { OskayiDebtCollector } from './components/collector/OskayiDebtCollector';
import { OskayiCentralBank } from './components/centralbank/OskayiCentralBank';
import { OskayiPayroll } from './components/payroll/OskayiPayroll';
import { MasterDashboardPortal } from './components/media/MasterDashboardPortal';
import { HunterAgentConsole } from './components/media/HunterAgentConsole';
import { BloggerAgentHub } from './components/media/BloggerAgentHub';
import { VideoAgentStudio } from './components/media/VideoAgentStudio';
import { AppsHub } from './components/media/AppsHub';
import { AutomationSchedulerConsole } from './components/media/AutomationSchedulerConsole';
import { RedevelopmentPage } from './components/RedevelopmentPage';
import { CorporateKycFooter } from './components/common/CorporateKycFooter';
import { MediaMachineState, BlogArticle } from './server/mediaMachineService';
import { Building2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('virtualafrica');
  const [mediaState, setMediaState] = useState<MediaMachineState | null>(null);
  const [isHunting, setIsHunting] = useState<boolean>(false);
  const [isGeneratingBlog, setIsGeneratingBlog] = useState<boolean>(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);

  // Load state from backend API
  const fetchMediaStatus = async () => {
    try {
      const resp = await fetch('/api/media/status');
      if (resp.ok) {
        const data = await resp.json();
        setMediaState(data);
      }
    } catch (e) {
      console.error('Failed to load media state:', e);
    }
  };

  useEffect(() => {
    fetchMediaStatus();
    const interval = setInterval(fetchMediaStatus, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleRunHunter = async () => {
    try {
      setIsHunting(true);
      const resp = await fetch('/api/media/hunter/run', { method: 'POST' });
      if (resp.ok) {
        await fetchMediaStatus();
      }
    } catch (e) {
      console.error('Failed to run hunter agent:', e);
    } finally {
      setIsHunting(false);
    }
  };

  const handleToggleRunning = async () => {
    try {
      const resp = await fetch('/api/media/scheduler/toggle', { method: 'POST' });
      if (resp.ok) {
        const data = await resp.json();
        if (mediaState) {
          setMediaState({ ...mediaState, isRunning: data.isRunning });
        }
      }
    } catch (e) {
      console.error('Failed to toggle scheduler:', e);
    }
  };

  const handleGenerateBlog = async (headlineId: string, subdomain?: BlogArticle['blog_subdomain']) => {
    try {
      setIsGeneratingBlog(true);
      const resp = await fetch('/api/media/blogger/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headlineId, subdomain })
      });
      if (resp.ok) {
        await fetchMediaStatus();
      }
    } catch (e) {
      console.error('Failed to generate blog:', e);
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  const handleGenerateVideo = async (headlineId: string, channelId: string) => {
    try {
      setIsGeneratingVideo(true);
      const resp = await fetch('/api/media/videos/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headlineId, channelId })
      });
      if (resp.ok) {
        await fetchMediaStatus();
      }
    } catch (e) {
      console.error('Failed to generate video:', e);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleExportCsv = () => {
    window.open('/api/media/export-csv', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#FFD700]/30 selection:text-[#FFD700]">
      {/* Top Navbar */}
      <OskayiMediaNavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isRunning={mediaState?.isRunning ?? true}
        onToggleRunning={handleToggleRunning}
        onRunHunter={handleRunHunter}
        isHunting={isHunting}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <OskayiSearch />
        )}

        {activeTab === 'grid' && (
          <OskayiGrid />
        )}

        {activeTab === 'chat' && (
          <OskayiChat />
        )}

        {activeTab === 'airwave' && (
          <OskayiAirwave />
        )}

        {activeTab === 'seaguard' && (
          <OskayiSeaGuard />
        )}

        {activeTab === 'sat' && (
          <OskayiSat />
        )}

        {activeTab === 'peace' && (
          <OskayiPeace />
        )}

        {activeTab === 'debtclock' && (
          <OskayiDebtClock />
        )}

        {activeTab === 'wealth' && (
          <OskayiWealth />
        )}

        {activeTab === 'trade' && (
          <OskayiTrade />
        )}

        {activeTab === 'sovereign' && (
          <OskayiSovereign />
        )}

        {activeTab === 'virtualafrica' && (
          <VirtualAfricaApp />
        )}

        {activeTab === 'indexfund' && (
          <OskayiIndex />
        )}

        {activeTab === 'debtcollector' && (
          <OskayiDebtCollector />
        )}

        {activeTab === 'centralbank' && (
          <OskayiCentralBank />
        )}

        {activeTab === 'payroll' && (
          <OskayiPayroll />
        )}

        {activeTab === 'restructure' && (
          <OskayiDebtRestructure />
        )}

        {activeTab === 'corporate' && (
          <div>
            <div className="bg-[#0A1F44] border-b border-[#FFD700] px-4 py-3 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
                <span>Statutory Corporate Registry & Official Documentation • OSKAYI CONSULT (BN248851025)</span>
              </div>
              <button
                onClick={() => setActiveTab('search')}
                className="px-3.5 py-1.5 rounded-xl bg-[#FFD700] hover:bg-amber-400 text-[#0A1F44] font-black text-xs uppercase tracking-wider transition-all shadow-md"
              >
                ← Return to Oskayi Search
              </button>
            </div>
            <RedevelopmentPage />
          </div>
        )}

        {['dashboard', 'hunter', 'blogger', 'video', 'apps', 'automation'].includes(activeTab) && (
          mediaState ? (
            <>
              {activeTab === 'dashboard' && (
                <MasterDashboardPortal
                  state={mediaState}
                  onRunHunter={handleRunHunter}
                  isHunting={isHunting}
                  onToggleAutomation={handleToggleRunning}
                  onExportCsv={handleExportCsv}
                  onSelectTab={setActiveTab}
                />
              )}

              {activeTab === 'hunter' && (
                <HunterAgentConsole
                  headlines={mediaState.trendingHeadlines}
                  lastHunterRun={mediaState.lastHunterRun}
                  onRunHunter={handleRunHunter}
                  isHunting={isHunting}
                  onSendToBlogger={(hlId) => {
                    handleGenerateBlog(hlId);
                    setActiveTab('blogger');
                  }}
                  onSendToVideo={(hlId) => {
                    handleGenerateVideo(hlId, 'ch-1');
                    setActiveTab('video');
                  }}
                  onSendToApp={(hlId) => {
                    setActiveTab('apps');
                  }}
                />
              )}

              {activeTab === 'blogger' && (
                <BloggerAgentHub
                  blogs={mediaState.blogs}
                  headlines={mediaState.trendingHeadlines}
                  onGenerateBlog={handleGenerateBlog}
                  isGenerating={isGeneratingBlog}
                />
              )}

              {activeTab === 'video' && (
                <VideoAgentStudio
                  videos={mediaState.videos}
                  headlines={mediaState.trendingHeadlines}
                  onGenerateVideo={handleGenerateVideo}
                  isGenerating={isGeneratingVideo}
                />
              )}

              {activeTab === 'apps' && (
                <AppsHub apps={mediaState.apps} />
              )}

              {activeTab === 'automation' && (
                <AutomationSchedulerConsole
                  logs={mediaState.logs}
                  isRunning={mediaState.isRunning}
                  onToggleRunning={handleToggleRunning}
                  onRunNow={handleRunHunter}
                />
              )}
            </>
          ) : (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A1F44] border border-[#FFD700] flex items-center justify-center text-[#FFD700] animate-pulse">
                <Building2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#FFD700] tracking-wide">
                Loading Oskayi Consult Media & Analytics Platform...
              </p>
            </div>
          )
        )}
      </main>

      {/* Mandatory Official Company KYC & Statutory Compliance Footer at Bottom of All Pages */}
      <CorporateKycFooter />
    </div>
  );
}
