
import React from 'react';
import HtmlImporter from './HtmlImporter';
import { TEMPLATES } from '../constants';

interface SidebarProps {
  onLoadTemplate: (url: string) => void;
  onImportHtml: (html: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLoadTemplate, onImportHtml }) => {
  return (
    <aside className="w-80 bg-gray-800 text-white p-6 flex flex-col space-y-8 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold mb-1">Beefree SDK</h1>
        <h2 className="text-xl font-light text-gray-300">Advanced Playground</h2>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-2">Template Catalog</h3>
        <div className="flex flex-col space-y-2">
          {TEMPLATES.map((template) => (
            <button
              key={template.name}
              onClick={() => onLoadTemplate(template.url)}
              className="w-full text-left bg-gray-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <HtmlImporter onImportHtml={onImportHtml} />

    </aside>
  );
};

export default Sidebar;
