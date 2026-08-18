import React from 'react';
import { useGameStore } from './store/useGameStore';
import { Header } from './components/layout/Header';
import { WorkstationSidebar } from './components/layout/WorkstationSidebar';
import { CaseFileWorkstation } from './components/workstations/CaseFileWorkstation';
import { EvidenceWorkstation } from './components/workstations/EvidenceWorkstation';
import { AnalysisWorkstation } from './components/workstations/AnalysisWorkstation';
import { CalculationWorkstation } from './components/workstations/CalculationWorkstation';
import { ReportWorkstation } from './components/workstations/ReportWorkstation';
import { QuizWorkstation } from './components/workstations/QuizWorkstation';
import { CertificateWorkstation } from './components/workstations/CertificateWorkstation';
import { NotebookWorkstation } from './components/workstations/NotebookWorkstation';
import { UserManualPage } from './components/workstations/UserManualPage';

import { WelcomeRegistrationScreen } from './components/common/WelcomeRegistrationScreen';
import { AdaptiveHintModal } from './components/common/AdaptiveHintModal';
import { CaseBriefTransmissionModal } from './components/common/CaseBriefTransmissionModal';
import { CaseFileUpdatingOverlay } from './components/common/CaseFileUpdatingOverlay';

export function App() {
  const { 
    activeWorkstation, 
    isWelcomeComplete, 
    isStudentInfoSubmitted 
  } = useGameStore();

  // If first launch or welcome onboarding is not complete, show WelcomeRegistrationScreen
  if (!isWelcomeComplete || !isStudentInfoSubmitted) {
    return <WelcomeRegistrationScreen />;
  }

  // If User Manual is active, render Full-Page White-theme Manual View
  if (activeWorkstation === 'manual') {
    return (
      <div className="min-h-screen bg-slate-100 font-sans flex flex-col justify-between">
        <div>
          <Header />
          <UserManualPage />
        </div>
        <footer className="py-4 px-6 text-center border-t border-slate-300 bg-white/90 text-xs text-slate-600 font-sans">
          <p>
            พัฒนาระบบโดย <span className="text-slate-800 font-bold">นายธนพล สติแน่</span> และ <span className="text-slate-800 font-bold">นายโพธิศักดิ์ โพธิเสน</span> โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย พิษณุโลก
          </p>
        </footer>
      </div>
    );
  }

  const renderWorkstation = () => {
    switch (activeWorkstation) {
      case 'casefile':
        return <CaseFileWorkstation />;
      case 'evidence':
        return <EvidenceWorkstation />;
      case 'analysis':
        return <AnalysisWorkstation />;
      case 'calculation':
        return <CalculationWorkstation />;
      case 'report':
        return <ReportWorkstation />;
      case 'quiz':
        return <QuizWorkstation />;
      case 'certificate':
        return <CertificateWorkstation />;
      case 'notebook':
        return <NotebookWorkstation />;
      case 'manual':
        return <UserManualPage />;
      default:
        return <CaseFileWorkstation />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-sky-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* Chemical Ambient Glassmorphism Bubbles & Glow Orbs (60-30-10 Rule) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 no-print opacity-20">
        {/* Soft Cyan Chemistry Orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl" />
        {/* Soft Emerald Chemical Reaction Orb */}
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
        {/* Soft Indigo Base Solvent Orb */}
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl" />
      </div>

      <div>
        {/* Header */}
        <Header />

        {/* Main Container with Floating Left Sidebar + Workstation Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Floating Left Sidebar Navigation */}
            <WorkstationSidebar />

            {/* Active Workstation Stage */}
            <main className="flex-1 w-full min-w-0">
              {renderWorkstation()}
            </main>

          </div>
        </div>
      </div>

      {/* Global Credit Footer */}
      <footer className="relative z-10 py-4 px-6 text-center border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md text-xs text-slate-400 font-sans">
        <p>
          พัฒนาระบบโดย <span className="text-slate-200 font-semibold">นายธนพล สติแน่</span> และ <span className="text-slate-200 font-semibold">นายโพธิศักดิ์ โพธิเสน</span> โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย พิษณุโลก
        </p>
      </footer>

      {/* Modals & Overlays */}
      <CaseBriefTransmissionModal />
      <CaseFileUpdatingOverlay />
      <AdaptiveHintModal />
    </div>
  );
}

export default App;
