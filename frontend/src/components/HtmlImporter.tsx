
import React, { useState } from 'react';

interface HtmlImporterProps {
  onImportHtml: (html: string) => void;
}

const HtmlImporter: React.FC<HtmlImporterProps> = ({ onImportHtml }) => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleImport = () => {
    onImportHtml(htmlContent);
  };

  return (
    <div className="border-t border-gray-600 pt-6">
      <h3 className="text-lg font-semibold mb-3">HTML Importer</h3>
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        placeholder="Paste your HTML code here..."
        className="w-full h-40 p-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
      />
      <button
        onClick={handleImport}
        className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Load HTML
      </button>
    </div>
  );
};

export default HtmlImporter;
