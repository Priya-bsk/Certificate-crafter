import React, { useState, useEffect } from 'react';
import { StepProps } from '../../types';
import { generateCertificateCanvas } from '../../utils/certificateGenerator';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const Step4Preview: React.FC<StepProps> = ({ data, onDataChange, onNext, onPrev }) => {
  const [previewCanvas, setPreviewCanvas] = useState<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePreview = async () => {
    if (!data.template || data.recipients.length === 0) return;

    setLoading(true);
    try {
      const recipient = data.recipients[data.selectedPreviewRow];
      const canvas = await generateCertificateCanvas(
        data.template,
        recipient,
        data.fields,
        data.layoutDisplayWidth,
        data.layoutDisplayHeight
      );
      setPreviewCanvas(canvas);
    } catch (error) {
      console.error('Failed to generate preview:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generatePreview();
  }, [data.template, data.fields, data.selectedPreviewRow, data.layoutDisplayWidth, data.layoutDisplayHeight]);

  const handleRecipientChange = (index: number) => {
    onDataChange({ selectedPreviewRow: index });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Preview Certificate</h2>
        <p className="text-lg text-gray-600">
          See how your certificate will look with real data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recipient Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Recipient</h3>
            
            <div className="mb-4">
              <select
                value={data.selectedPreviewRow}
                onChange={(e) => handleRecipientChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {data.recipients.map((recipient, index) => (
                  <option key={index} value={index}>
                    {recipient.Name || recipient.name || `Recipient ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generatePreview}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Preview
            </button>

            {/* Recipient Data */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Recipient Data:</h4>
              <div className="space-y-2">
                {data.columns.map((column) => (
                  <div key={column} className="text-sm">
                    <span className="font-medium text-gray-700">{column}:</span>
                    <span className="ml-2 text-gray-600">
                      {String(data.recipients[data.selectedPreviewRow][column] || '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Preview</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Generating preview...</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {previewCanvas && (
                  <>
                    <img
                      src={previewCanvas.toDataURL('image/png')}
                      alt="Certificate preview"
                      className="max-w-full rounded-lg shadow-lg mx-auto block"
                      style={{ maxHeight: '600px', objectFit: 'contain' }}
                    />
                    <div className="mt-4 text-sm text-gray-600">
                      Certificate size: {previewCanvas.width} × {previewCanvas.height} pixels (shown scaled to fit)
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="flex items-center px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Layout
        </button>

        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Continue to Generate
        </button>
      </div>
    </div>
  );
};

export default Step4Preview;