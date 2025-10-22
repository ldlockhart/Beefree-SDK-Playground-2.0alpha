
// A simplified type for the Beefree template JSON structure
export interface Template {
  page: {
    // Add more specific template properties if needed
    [key: string]: any;
  };
}

// Type for the Beefree SDK configuration object
export interface BeeConfig {
  uid: string;
  container: string;
  language: string;
  onSave: (jsonFile: string, htmlFile: string) => void;
  onChange: () => void;
  fileManager: {
    enabled: boolean;
    stockPhotos: {
      enabled: boolean;
      provider: string;
    };
    upload: (file: File, handler: { done: (error: string | null, url: string) => void }) => void;
  };
  rows: {
    enabled: boolean;
  };
  permissions: {
    showDefaultAddons: boolean;
    showRowActions: boolean;
    allowContentEdit: boolean;
    allowStyleEdit: boolean;
    allowStructureEdit: boolean;
    allowAdd: boolean;
    allowMove: boolean;
    allowDelete: boolean;
    allowChangeView: boolean;
    allowSave: boolean;
    allowPreview: boolean;
    allowSend: boolean;
    allowViewHistory: boolean;
    allowChangeHistory: boolean;
  };
  content: {
    [key: string]: { enabled: boolean };
  };
}
