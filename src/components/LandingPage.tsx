import React from 'react';
import { Award, FileSpreadsheet, Image, Layout, Eye, Download, Users } from 'lucide-react';

interface LandingPageProps {
  onStartCreating: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartCreating }) => {
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Create personalized certificates in bulk
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your data, design your template, and generate professional certificates for every recipient in minutes.
          </p>
          <button
            onClick={onStartCreating}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            Start creating
          </button>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What it does</h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Certificate Crafter lets you upload a list of recipients (from CSV or Excel), add a certificate template image,
            place name and other fields on the template with drag-and-drop, then generate one high-quality PNG certificate
            per recipient. All certificates are bundled into a single ZIP file for download.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload data</h4>
              <p className="text-sm text-gray-600">
                Import CSV or Excel with names and any columns you want on the certificate.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Add template</h4>
              <p className="text-sm text-gray-600">
                Upload your certificate design as a PNG or JPG; dimensions are preserved.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Layout className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Design layout</h4>
              <p className="text-sm text-gray-600">
                Drag fields onto the template, set fonts and colors, then preview and generate.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Who it’s for</h3>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Anyone who needs to issue many certificates with the same design but different names or details:
            courses, events, awards, memberships, or internal recognition. No design software required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">Course & training</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">Events & awards</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">Preview before export</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
              <Download className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">ZIP download</span>
            </span>
          </div>
        </section>

        <section className="text-center">
          <button
            onClick={onStartCreating}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            Start creating
          </button>
        </section>
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
};

export default LandingPage;
