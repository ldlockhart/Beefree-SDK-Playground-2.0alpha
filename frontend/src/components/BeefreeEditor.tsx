
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import type { Template, BeeConfig } from '../types';

// Declare BeePlugin on the window object for TypeScript
declare global {
    interface Window {
        BeePlugin: any;
    }
}

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
        // Fetch the access token from our secure backend
        const tokenResponse = await axios.get('/api/auth');
        const accessToken = tokenResponse.data.access_token;
        
        // Comprehensive Beefree SDK configuration object
        const beeConfig: BeeConfig = {
          uid: 'beefree-sdk-playground-user', // A unique identifier for the user
          container: editorContainerRef.current,
          language: 'en-US',
          onSave: (jsonFile: string, htmlFile: string) => {
            console.log('Message Saved!');
            console.log('JSON:', JSON.parse(jsonFile));
            console.log('HTML:', htmlFile);
          },
          onChange: () => {
            console.log('Content is changing...');
          },
          // Enable the File Manager with extensive features
          fileManager: {
            enabled: true,
            // Enable free stock photos from Unsplash
            stockPhotos: {
              enabled: true,
              provider: 'Unsplash',
            },
            // Handle file uploads
            upload: (file, handler) => {
              // This is a mock upload function for the demo.
              // In a real application, you would upload the file to your server/CDN
              // and then call handler.done() with the public URL.
              console.log('Simulating upload for file:', file.name);
              setTimeout(() => {
                const placeholderUrl = `https://picsum.photos/seed/${file.name}/400/300`;
                handler.done(null, placeholderUrl);
              }, 1500);
            },
          },
          // Enable Hosted Saved Rows
          rows: {
            enabled: true,
          },
          // Enable all available application and content permissions
          permissions: {
            // Application configuration
            showDefaultAddons: true,
            showRowActions: true,
            // User permissions
            allowContentEdit: true,
            allowStyleEdit: true,
            allowStructureEdit: true,
            allowAdd: true,
            allowMove: true,
            allowDelete: true,
            allowChangeView: true,
            allowSave: true,
            allowPreview: true,
            allowSend: false, // Typically false in an editor context
            allowViewHistory: true,
            allowChangeHistory: true,
          },
          // Ensure all standard content blocks are enabled
          content: {
            title: { enabled: true },
            text: { enabled: true },
            image: { enabled: true },
            button: { enabled: true },
            divider: { enabled: true },
            social: { enabled: true },
            html: { enabled: true },
            video: { enabled: true },
            menu: { enabled: true },
            icons: { enabled: true },
          },
        };

        // Initialize the BeePlugin
        const bee = new window.BeePlugin(accessToken);
        beeInstanceRef.current = bee;
        
        // Start the editor with the provided template
        bee.start(beeConfig, template);

      } catch (error) {
        console.error('Failed to initialize Beefree Editor:', error);
      }
    };

    initializeBee();

    // Cleanup function to destroy the instance when the component unmounts
    return () => {
      if (beeInstanceRef.current) {
        beeInstanceRef.current.destroy();
        beeInstanceRef.current = null;
      }
    };
    // The empty dependency array is correct here because this effect should only run once
    // when the component mounts. Re-initialization is handled by the `key` prop in App.tsx.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={editorContainerRef} className="w-full h-full"></div>;
};

export default BeefreeEditor;
