import React, { useState } from 'react';
import { CertificateData } from './types';
import LandingPage from './components/LandingPage';
import ProgressBar from './components/common/ProgressBar';
import Step1DataUpload from './components/steps/Step1DataUpload';
import Step2TemplateUpload from './components/steps/Step2TemplateUpload';
import Step3LayoutDesign from './components/steps/Step3LayoutDesign';
import Step4Preview from './components/steps/Step4Preview';
import Step5Generate from './components/steps/Step5Generate';
import { Award } from 'lucide-react';

const initialData: CertificateData = {
  recipients: [],
  columns: [],
  template: null,
  templateWidth: null,
  templateHeight: null,
  layoutDisplayWidth: null,
  layoutDisplayHeight: null,
  fields: [],
  selectedPreviewRow: 0,
};

function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CertificateData>(initialData);

  const handleDataChange = (updates: Partial<CertificateData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStartCreating = () => {
    setData(initialData);
    setCurrentStep(1);
    setView('app');
  };

  const handleGoHome = () => {
    setData(initialData);
    setCurrentStep(1);
    setView('landing');
  };

  const stepProps = {
    data,
    onDataChange: handleDataChange,
    onNext: handleNext,
    onPrev: handlePrev,
    onGoHome: handleGoHome,
  };

  if (view === 'landing') {
    return (
      <LandingPage onStartCreating={handleStartCreating} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Certificate Crafter</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressBar currentStep={currentStep} totalSteps={5} />

          <div className="mt-8">
            {currentStep === 1 && <Step1DataUpload {...stepProps} />}
            {currentStep === 2 && <Step2TemplateUpload {...stepProps} />}
            {currentStep === 3 && <Step3LayoutDesign {...stepProps} />}
            {currentStep === 4 && <Step4Preview {...stepProps} />}
            {currentStep === 5 && <Step5Generate {...stepProps} />}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2026 Certificate Crafter.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;