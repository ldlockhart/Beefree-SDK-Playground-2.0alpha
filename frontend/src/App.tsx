
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import BeefreeEditor from './components/BeefreeEditor';
import { WelcomeTemplate } from './constants';
import type { Template } from './types';


function App() {
  const [template, setTemplate] = useState<Template>(WelcomeTemplate);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const forceRemount = () => setEditorKey(prevKey => prevKey + 1);

  const handleLoadTemplate = useCallback(async (templateUrl: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Template>(templateUrl);
      setTemplate(response.data);
      forceRemount();
    } catch (err) {
      console.error("Failed to load template:", err);
      setError("Failed to load the selected template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleImportHtml = useCallback(async (html: string) => {
    if (!html.trim()) {
      setError("HTML content cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<Template>('/api/import-html', { html });
      setTemplate(response.data);
      forceRemount();
    } catch (err) {
      console.error("Failed to import HTML:", err);
      setError("Failed to import HTML. Please check the console for more details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <Sidebar 
        onLoadTemplate={handleLoadTemplate}
        onImportHtml={handleImportHtml}
      />
      <main className="flex-1 flex flex-col relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
            <div className="text-lg font-semibold text-gray-700">Loading Editor...</div>
          </div>
        )}
        {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md z-30" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
        )}
        <BeefreeEditor key={editorKey} template={template} />
      </main>
    </div>
  );
}

export default App;
