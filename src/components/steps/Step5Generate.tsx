import React, { useState } from 'react';
import { StepProps } from '../../types';
import { generateAllCertificates } from '../../utils/certificateGenerator';
import { ArrowLeft, Download, CheckCircle } from 'lucide-react';

const Step5Generate: React.FC<StepProps> = ({ data, onPrev, onGoHome }) => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [completed, setCompleted] = useState(false);

  const handleGenerate = async () => {
    if (!data.template) return;

    setGenerating(true);
    setCompleted(false);
    setProgress({ current: 0, total: data.recipients.length });
    
    try {
      await generateAllCertificates(
        data.template,
        data.recipients,
        data.fields,
        (current, total) => {
          setProgress({ current, total });
        },
        data.layoutDisplayWidth,
        data.layoutDisplayHeight
      );
      setCompleted(true);
    } catch (error) {
      console.error('Failed to generate certificates:', error);
    } finally {
      setGenerating(false);
    }
  };

  const progressPercentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Generate Certificates</h2>
        <p className="text-lg text-gray-600">
          Ready to create {data.recipients.length} personalized certificates
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {!generating && !completed && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate</h3>
              <p className="text-gray-600">
                Click the button below to generate all {data.recipients.length} certificates.
                They will be packaged into a ZIP file for easy download.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Generation Summary:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-2xl text-blue-600">{data.recipients.length}</div>
                  <div className="text-gray-600">Recipients</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-2xl text-green-600">{data.fields.length}</div>
                  <div className="text-gray-600">Data Fields</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-2xl text-purple-600">PNG</div>
                  <div className="text-gray-600">Output Format</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Generate All Certificates
            </button>
          </div>
        )}

        {generating && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Certificates</h3>
              <p className="text-gray-600">
                Processing certificate {progress.current} of {progress.total}...
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-gray-600">
              {progressPercentage.toFixed(1)}% Complete
            </div>
          </div>
        )}

        {completed && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificates Generated!</h3>
              <p className="text-gray-600">
                All {data.recipients.length} certificates have been successfully generated and downloaded as a ZIP file.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <p className="text-green-800">
                <strong>Success!</strong> Your certificates.zip file should now be in your Downloads folder.
                Each certificate is saved as a high-quality PNG image.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Generate Again
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          disabled={generating}
          className="flex items-center px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Preview
        </button>
        {onGoHome && (
          <button
            onClick={onGoHome}
            disabled={generating}
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50"
          >
            New crafter
          </button>
        )}
      </div>
    </div>
  );
};

export default Step5Generate;