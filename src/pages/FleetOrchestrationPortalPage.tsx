import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Lock, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Radio, 
  Terminal, 
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  FileText,
  Sliders,
  DollarSign
} from 'lucide-react';
import { FleetLandingSection } from '../components/fleet/FleetLandingSection';
import { FleetOnboardingWizard } from '../components/fleet/FleetOnboardingWizard';
import { FleetAdminConsole } from '../components/fleet/FleetAdminConsole';
import { FleetUserDashboard } from '../components/fleet/FleetUserDashboard';

interface FleetOrchestrationPortalPageProps {
  onNavigateHome: () => void;
  onOpenVerification?: () => void;
}

export const FleetOrchestrationPortalPage: React.FC<FleetOrchestrationPortalPageProps> = ({
  onNavigateHome,
  onOpenVerification
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'onboarding' | 'admin' | 'workspace'>('overview');
  const [selectedOnboardingModules, setSelectedOnboardingModules] = useState<string[]>(['sme-treasury', 'marketplace-payouts']);
  const [activeTenantId, setActiveTenantId] = useState<string>('tenant-savanna-001');

  // Handle URL hash or path parameters
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const handleStartOnboarding = (modules: string[]) => {
    setSelectedOnboardingModules(modules);
    setActiveView('onboarding');
  };

  const handleApplicationSubmitted = (application: any) => {
    // When submitted, user can either stay or view in admin
  };

  const handleTenantApproved = (tenantId: string) => {
    setActiveTenantId(tenantId);
  };

  const handleOpenTenantWorkspace = (tenantId: string) => {
    setActiveTenantId(tenantId);
    setActiveView('workspace');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 selection:bg-amber-400 selection:text-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Lifecycle Switcher Bar */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Return to Main Corporate Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                <span>OSKAYI GLOBAL ARCHITECTURE</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400">FLEET PORTAL V1</span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-white">
                Global Financial Orchestration Fleet (10 Engines)
              </h1>
            </div>
          </div>

          {/* Quick Lifecycle View Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeView === 'overview'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. 10 Engines Overview</span>
            </button>

            <button
              onClick={() => setActiveView('onboarding')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeView === 'onboarding'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>2. Guided Onboarding</span>
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeView === 'admin'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3. Admin Review Desk</span>
            </button>

            <button
              onClick={() => setActiveView('workspace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeView === 'workspace'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>4. Tenant Workspace</span>
            </button>
          </div>
        </div>

        {/* View Routing */}
        {activeView === 'overview' && (
          <FleetLandingSection
            onStartOnboarding={handleStartOnboarding}
            onOpenAdminConsole={() => setActiveView('admin')}
            onOpenUserDashboard={() => setActiveView('workspace')}
          />
        )}

        {activeView === 'onboarding' && (
          <FleetOnboardingWizard
            initialSelectedModules={selectedOnboardingModules}
            onApplicationSubmitted={handleApplicationSubmitted}
            onCancel={() => setActiveView('overview')}
            onOpenAdminDirectly={() => setActiveView('admin')}
          />
        )}

        {activeView === 'admin' && (
          <FleetAdminConsole
            onTenantApproved={handleTenantApproved}
            onOpenTenantWorkspace={handleOpenTenantWorkspace}
          />
        )}

        {activeView === 'workspace' && (
          <FleetUserDashboard
            initialTenantId={activeTenantId}
            onOpenAdminConsole={() => setActiveView('admin')}
            onStartNewApplication={() => setActiveView('onboarding')}
          />
        )}

      </div>
    </div>
  );
};
