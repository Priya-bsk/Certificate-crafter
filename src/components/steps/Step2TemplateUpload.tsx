import React, { useState } from 'react';
import { StepProps } from '../../types';
import { readImageFile } from '../../utils/fileHandlers';
import FileUpload from '../common/FileUpload';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const Step2TemplateUpload: React.FC<StepProps> = ({ data, onDataChange, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const imageData = await readImageFile(file);
      // Load image to read natural dimensions so layout/generation preserve aspect and size
      const img = new Image();
      img.onload = () => {
        onDataChange({
          template: imageData,
          templateWidth: img.naturalWidth,
          templateHeight: img.naturalHeight,
          layoutDisplayWidth: null,
          layoutDisplayHeight: null,
          fields: [],
        });
      };
      img.onerror = () => onDataChange({ template: imageData, layoutDisplayWidth: null, layoutDisplayHeight: null, fields: [] });
      img.src = imageData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setLoading(false);
    }
  };

  const hasTemplate = data.template !== null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Certificate Template</h2>
        <p className="text-lg text-gray-600">
          Upload an image file that will serve as your certificate template
        </p>
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        acceptedTypes=".png,.jpg,.jpeg"
        label={hasTemplate ? 'Re-upload Template Image' : 'Upload Template Image'}
        description={hasTemplate ? 'Choose a different image to replace the template' : 'Drag and drop your PNG or JPG template here, or click to browse'}
        icon="image"
        className="mb-6"
      />

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading image...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {hasTemplate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">Template uploaded successfully!</span>
          </div>
          
          <div className="text-center">
            <img
              src={data.template ?? ''}
              alt="Certificate Template"
              className="max-w-full mx-auto rounded-lg shadow-lg"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Data Upload
        </button>

        {hasTemplate && (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Continue to Layout Design
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2TemplateUpload;