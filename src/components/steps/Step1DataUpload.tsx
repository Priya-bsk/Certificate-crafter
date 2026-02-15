import React, { useState, useEffect } from 'react';
import { StepProps } from '../../types';
import { parseDataFile } from '../../utils/fileHandlers';
import FileUpload from '../common/FileUpload';
import { CheckCircle, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const allowedTypes = [
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

const Step1DataUpload: React.FC<StepProps> = ({
  data,
  onDataChange,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Persist data to localStorage (optional but professional)
  useEffect(() => {
    if (data.recipients.length > 0) {
      localStorage.setItem('certificate-step1', JSON.stringify(data));
    }
  }, [data]);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // 🔹 Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload CSV or Excel file.');
      return;
    }

    // 🔹 Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Maximum allowed size is 5MB.');
      return;
    }

    setLoading(true);
    setFileName(file.name);

    try {
      const result = await parseDataFile(file);

      // 🔹 Remove empty rows
      const filteredRecipients = result.data.filter((row: any) =>
        Object.values(row).some((value) => String(value).trim() !== '')
      );

      if (filteredRecipients.length === 0) {
        throw new Error('File contains no valid recipient data.');
      }

      onDataChange({
        recipients: filteredRecipients,
        columns: result.columns.map((col: string) => col.trim()),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file.');
    } finally {
      setLoading(false);
    }
  };

  const hasData = data.recipients.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Upload Recipient Data
        </h2>
        <p className="text-gray-600">
          Upload a CSV or Excel file containing recipient details.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        acceptedTypes=".csv,.xlsx,.xls"
        label={hasData ? 'Replace Data File' : 'Upload Data File'}
        description="Drag & drop your file here, or click to browse"
        icon="file"
        className="mb-6"
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-6">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-3 text-gray-600">Processing file...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Success + Preview */}
      {hasData && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">
              File uploaded successfully!
            </span>
          </div>

          {fileName && (
            <p className="text-sm text-gray-600 mb-4">
              File: <span className="font-medium">{fileName}</span>
            </p>
          )}

          <p className="text-gray-700 mb-4">
            Found <strong>{data.recipients.length}</strong> recipients.
          </p>

          {/* Column Tags */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Columns detected:
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.columns.map((column) => (
                <span
                  key={column}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {column}
                </span>
              ))}
            </div>
          </div>

          {/* Preview Table */}
          <div className="overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-2">
              Preview (First 3 Rows)
            </h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {data.columns.map((column) => (
                    <th
                      key={column}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recipients.slice(0, 3).map((recipient, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    {data.columns.map((column) => (
                      <td
                        key={column}
                        className="px-4 py-2 text-sm text-gray-700"
                      >
                        {String(recipient[column] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {hasData && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Continue to Template Upload →
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1DataUpload;
