
import type { Template } from './types';

// Default "Welcome" template to be loaded on initial start
export const WelcomeTemplate: Template = {
  "page": {
    "description": "This is what you can do with Beefree SDK",
    "template": {
      "name": "template-base",
      "version": "0.0.1",
      "type": "basic"
    },
    "body": {
      "rows": [
        {
          "content": {
            "columns": [
              {
                "modules": [
                  {
                    "type": "heading-one",
                    "descriptor": {
                      "text": "This is what you can do with Beefree SDK"
                    }
                  },
                  {
                    "type": "paragraph",
                    "descriptor": {
                      "text": "Use the controls on the left to load a pre-built template or import your own HTML."
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
};


// Public URLs for different template styles
export const TEMPLATES = [
  { 
    name: 'E-commerce Promotion', 
    url: 'https://templates.beefree.io/6305a467-2c5e-4283-936d-55615d86d628/raw' 
  },
  { 
    name: 'Newsletter Update', 
    url: 'https://templates.beefree.io/bf27e089-f30c-4033-875f-22877a11ab02/raw'
  },
  { 
    name: 'Product Announcement', 
    url: 'https://templates.beefree.io/5929a008-8a8c-4a39-a9a3-f08a54129b13/raw'
  },
  { 
    name: 'Holiday Special', 
    url: 'https://templates.beefree.io/263595ea-7963-42e6-9464-0318536f9a46/raw'
  },
  { 
    name: 'Simple Welcome Email', 
    url: 'https://templates.beefree.io/852d4334-023a-48a5-9730-67c4e5e40733/raw'
  },
];
