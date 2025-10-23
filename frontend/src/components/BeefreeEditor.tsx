import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import BeefreeSDK from '@beefree.io/sdk';
import type { Template } from '../types'; // Assuming you have a types file in frontend/src/types/index.ts

interface BeefreeEditorProps {
  template: Template;
}

const BeefreeEditor: React.FC<BeefreeEditorProps> = ({ template }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const beeInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initializeBee = async () => {
      if (!editorContainerRef.current) return;

      try {
        // 1. Fetch token from the correct backend endpoint
        console.log("Requesting auth token from backend...");
        const tokenResponse = await axios.post(
          '/proxy/bee-auth', // <-- THE ONLY CHANGE IS HERE
          { uid: 'beefree-sdk-playground-user' }
        );
        const token = tokenResponse.data;

        // 2. Add the v2 flag to the token object
        const v2Token = { ...token, v2: true };
        console.log("Auth token received successfully.");

        // 3. Define the comprehensive Beefree SDK configuration
        const beeConfig = {
          uid: 'beefree-sdk-playground-user',
          container: 'bee-editor-container', // Use the string ID
          language: 'en-US',
          onSave: (jsonFile: string, htmlFile: string) => {
            console.log('✅ onSave triggered!');
            console.log(JSON.parse(jsonFile));
          },
          onChange: () => {
            console.log('Content is changing...');
          },
          fileManager: {
            enabled: true,
            stockPhotos: { enabled: true, provider: 'Unsplash' },
            upload: (file: File, handler: any) => {
              console.log('Simulating upload for file:', file.name);
              setTimeout(() => {
                const placeholderUrl = `https://picsum.photos/seed/${file.name}/400/300`;
                handler.done(null, placeholderUrl);
              }, 1500);
            },
          },
          rows: { enabled: true },
          permissions: {
            showDefaultAddons: true,
            showRowActions: true,
            allowContentEdit: true,
            allowStyleEdit: true,
            allowStructureEdit: true,
            allowAdd: true,
            allowMove: true,
            allowDelete: true,
            allowChangeView: true,
            allowSave: true,
            allowPreview: true,
            allowSend: false,
            allowViewHistory: true,
            allowChangeHistory: true,
          },
        };

        // 4. Initialize the BeefreeSDK instance with the v2 token
        console.log("Initializing Beefree SDK instance...");
        const bee = new BeefreeSDK(v2Token);
        beeInstanceRef.current = bee;

        // 5. Start the editor
        console.log("Starting editor...");
        await bee.start(beeConfig, template);
        console.log("✅ Beefree Editor started successfully!");

      } catch (error) {
        console.error('🔴 Failed to initialize Beefree Editor:', error);
      }
    };

    initializeBee();

    // Cleanup function
    return () => {
      if (beeInstanceRef.current) {
        beeInstanceRef.current.destroy();
      }
    };
  }, [template]);

  return <div id="bee-editor-container" ref={editorContainerRef} style={{height: '100vh', width: '100%'}}></div>;
};

export default BeefreeEditor; 
