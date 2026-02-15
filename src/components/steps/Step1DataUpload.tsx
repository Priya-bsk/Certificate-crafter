import React, { useState } from 'react';
import { StepProps } from '../../types';
import { parseDataFile } from '../../utils/fileHandlers';
import FileUpload from '../common/FileUpload';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Step1DataUpload: React.FC<StepProps> = ({ data, onDataChange, onNext }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const result = await parseDataFile(file);
      onDataChange({
        recipients: result.data,
        columns: result.columns,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setLoading(false);
    }
  };

  const hasData = data.recipients.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Recipient Data</h2>
        <p className="text-lg text-gray-600">
          Upload a CSV or Excel file containing recipient information for your certificates
        </p>
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        acceptedTypes=".csv,.xlsx,.xls"
        label={hasData ? 'Re-upload Data File' : 'Upload Data File'}
        description={hasData ? 'Choose a different CSV or Excel file to replace' : 'Drag and drop your CSV or Excel file here, or click to browse'}
        icon="file"
        className="mb-6"
      />

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Processing file...</p>
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

      {hasData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">
              File uploaded successfully! Found {data.recipients.length} recipients
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Columns detected:</h3>
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

          <div className="overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-2">Data preview (first 3 rows):</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {data.columns.map((column) => (
                    <th key={column} className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recipients.slice(0, 3).map((recipient, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    {data.columns.map((column) => (
                      <td key={column} className="px-4 py-2 text-sm text-gray-700">
                        {String(recipient[column] || '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {hasData && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Continue to Template Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1DataUpload;