/*  
  script.js — Demo front-end logic for the Caperone prototype  
  - Handles routing between pages (client-side)  
  - Populates demo data for partners, shipments, consolidations, bookings, documents, invoices  
  - Simple modal handling, role switch (RBAC demo), and search filter  
  - NOTE: This is front-end only. Integrate real APIs in production.  
*/  

(function () {  
  // Demo state  
  const state = {  
    role: 'Admin',  
    partners: [  
      { id: 'P-001', name: 'Ayulu Consolidators', type: 'Partner', contact: 'ayulu@partners.co', liaison: 'Olivia', kpis: 'On-time 88%' },  
      { id: 'P-002', name: 'Mombasa Freight Co', type: 'Carrier', contact: 'ops@mombasa.co', liaison: 'James', kpis: 'SLA 95%' },  
      { id: 'P-003', name: 'Keflox Imports', type: 'Customer', contact: 'trade@keflox.com', liaison: 'Aisha', kpis: 'MTTR 2d' },  
    ],  
    shipments: [  
      { ref: 'SHP-0001', origin: 'Nairobi', dest: 'Kisumu', hs: '4202', status: 'Delivered' },  
      { ref: 'SHP-0012', origin: 'Mombasa', dest: 'Nairobi', hs: '8421, 4202', status: 'Loading' },  
      { ref: 'SHP-0043', origin: 'Guangzhou', dest: 'Mombasa', hs: '8471', status: 'Loading' },  
      { ref: 'SHP-0056', origin: 'Shanghai', dest: 'Mombasa', hs: '8542', status: 'In Transit' },  
      { ref: 'SHP-0022', origin: 'Djibouti', dest: 'Nairobi', hs: '3004', status: 'Customs' },  
    ],  
    consolidations: [  
      { id: 'C-100', window: '2025-10-18 → 2025-10-22', count: 6, status: 'Open' },  
      { id: 'C-101', window: '2025-09-10 → 2025-09-15', count: 12, status: 'Closed' },  
    ],  
    bookings: [  
      { id: 'BKG-101', carrier: 'Ayulu Liners', voyage: 'VY-2201', etd: '2025-10-18', eta: '2025-10-24', cost: 'KES 120,000' },  
      { id: 'BKG-102', carrier: 'Mombasa Freight Co', voyage: 'MF-3303', etd: '2025-10-20', eta: '2025-10-28', cost: 'KES 98,400' },  
    ],  
    documents: [  
      { name: 'Bill of Lading - SHP-0012', type: 'BOL', linked: 'SHP-0012', uploaded: '2025-09-18' },  
      { name: 'Commercial Invoice - SHP-0056', type: 'Invoice', linked: 'SHP-0056', uploaded: '2025-09-20' },  
    ],  
    invoices: [  
      { id: 'INV-220', amount: 'KES 420,000', linked: 'C-100', status: 'Open' },  
      { id: 'INV-221', amount: 'KES 834,320', linked: 'SHP-0001', status: 'Paid' },  
    ]  
  };  

  // DOM refs  
  const pages = document.querySelectorAll('.page');  
  const navLinks = document.querySelectorAll('.nav-link');  
  const roleSelect = document.getElementById('roleSelect');  
  const currentRoleBadge = document.getElementById('currentRoleBadge');  
  const partnersTbody = document.getElementById('partnersTbody');  
  const shipmentsTbody = document.getElementById('shipments