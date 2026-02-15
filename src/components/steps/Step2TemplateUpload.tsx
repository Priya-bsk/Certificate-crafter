import React, { useState } from 'react';
import { StepProps } from '../../types';
import { readImageFile } from '../../utils/fileHandlers';
import FileUpload from '../common/FileUpload';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const Step2TemplateUpload: React.FC<StepProps> = ({
  data,
  onDataChange,
  onNext,
  onPrev,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // 🔹 File type validation
    if (!allowedTypes.includes(file.type)) {
      setError('Only PNG and JPG images are allowed.');
      return;
    }

    // 🔹 File size validation
    if (file.size > MAX_FILE_SIZE) {
      setError('Image too large. Maximum size is 5MB.');
      return;
    }

    setLoading(true);
    setFileName(file.name);

    try {
      const imageData = await readImageFile(file);

      const img = new Image();

      img.onload = () => {
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        // Optional: Basic dimension validation
        if (naturalWidth < 800 || naturalHeight < 600) {
          setError('Image resolution too low. Use at least 800x600.');
          setLoading(false);
          return;
        }

        onDataChange({
          template: imageData,
          templateWidth: naturalWidth,
          templateHeight: naturalHeight,
          layoutDisplayWidth: null,
          layoutDisplayHeight: null,
          fields: [], // Reset fields if re-upload
        });

        setLoading(false);
      };

      img.onerror = () => {
        setError('Failed to load image. Please try another file.');
        setLoading(false);
      };

      img.src = imageData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image.');
      setLoading(false);
    }
  };

  const hasTemplate = Boolean(data.template);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Upload Certificate Template
        </h2>
        <p className="text-gray-600">
          Upload a PNG or JPG image to use as your certificate background.
        </p>
      </div>

      {/* Upload Component */}
      <FileUpload
        onFileSelect={handleFileSelect}
        acceptedTypes=".png,.jpg,.jpeg"
        label={hasTemplate ? 'Replace Template Image' : 'Upload Template Image'}
        description="Drag & drop your image here or click to browse"
        icon="image"
        className="mb-6"
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-6">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-3 text-gray-600">Processing image...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Success + Preview */}
      {hasTemplate && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">
              Template uploaded successfully!
            </span>
          </div>

          {fileName && (
            <p className="text-sm text-gray-600 mb-4">
              File: <span className="font-medium">{fileName}</span>
            </p>
          )}

          <div className="text-center">
            <img
              src={data.template ?? ''}
              alt="Certificate Template"
              className="max-w-full mx-auto rounded-xl shadow-lg"
              style={{ maxHeight: '600px' }}
            />
          </div>

          {/* Display Dimensions (Important for Debugging Layout Scaling) */}
          {data.templateWidth && data.templateHeight && (
            <p className="text-sm text-gray-600 mt-4 text-center">
              Resolution: {data.templateWidth} × {data.templateHeight}px
            </p>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
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
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Continue to Layout Design →
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2TemplateUpload;
