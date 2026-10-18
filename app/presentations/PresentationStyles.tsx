// Shared styles for all presentation pages
export const presentationStyles = `
  .reveal-viewport {
    background: #060503;
  }
  .reveal {
    font-family: ui-sans-serif, system-ui, sans-serif;
    color: #f4efe6;
  }
  .reveal h1, .reveal h2, .reveal h3 {
    color: #f4efe6;
    font-weight: bold;
    text-transform: none;
  }
  .reveal h1 { font-size: 2.5em; }
  .reveal h2 { font-size: 1.8em; }
  .reveal h3 { font-size: 1.4em; }
  .reveal p, .reveal li {
    color: #d8c9b0;
  }
  .reveal .slides section {
    text-align: left;
    padding: 40px;
  }
  .reveal .slides section.center-slide {
    text-align: center;
  }
  .reveal code {
    background: #1a1a1a;
    color: #22c55e;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }
  .reveal pre {
    background: #1a1a1a;
    border: 1px solid #2e2e2e;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    font-size: 0.7em;
  }
  .reveal pre code {
    background: transparent;
    padding: 0;
    color: #22c55e;
  }
  .section-label {
    font-family: 'Courier New', monospace;
    font-size: 0.5em;
    color: #f97316;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 10px;
  }
  .accent-line {
    height: 3px;
    width: 60px;
    background: linear-gradient(to right, #f97316, transparent);
    margin-bottom: 20px;
  }
  .card {
    background: rgba(255,255,255,0.05);
    border: 1px solid #2e2e2e;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
  }
  .card-green {
    border-color: #22c55e;
    background: rgba(34, 197, 94, 0.1);
  }
  .card-orange {
    border-color: #f97316;
    background: rgba(249, 115, 22, 0.1);
  }
  .card-blue {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
  .card-purple {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.1);
  }
  .text-green { color: #22c55e; }
  .text-orange { color: #f97316; }
  .text-blue { color: #3b82f6; }
  .text-purple { color: #a855f7; }
  .text-muted { color: #94a3b8; }
  .emoji { font-size: 3em; margin-bottom: 10px; }
  .emoji-large { font-size: 4em; }
  .emoji-xl { font-size: 5em; }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #f97316;
    color: #000;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2em;
  }
  .step-number-green {
    background: #22c55e;
  }
  .step-number-blue {
    background: #3b82f6;
  }
  .reveal .controls {
    color: #f97316;
  }
  .reveal .progress {
    color: #f97316;
    height: 4px;
  }
  .reveal .slide-number {
    color: #94a3b8;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    background: transparent;
  }
  .mono {
    font-family: 'Courier New', monospace;
  }
  .flow-arrow {
    font-size: 2em;
    color: #f97316;
  }
  .highlight-box {
    background: rgba(34, 197, 94, 0.15);
    border: 2px solid #22c55e;
    border-radius: 12px;
    padding: 20px;
  }
  .warning-box {
    background: rgba(249, 115, 22, 0.15);
    border: 2px solid #f97316;
    border-radius: 12px;
    padding: 20px;
  }
  .info-box {
    background: rgba(59, 130, 246, 0.15);
    border: 2px solid #3b82f6;
    border-radius: 12px;
    padding: 20px;
  }
  ul.custom-list {
    list-style: none;
    padding: 0;
  }
  ul.custom-list li {
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  ul.custom-list li::before {
    content: none;
  }
  .back-button {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 100;
    background: rgba(255,255,255,0.1);
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    color: #f4efe6;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;
    text-decoration: none;
  }
  .back-button:hover {
    background: rgba(255,255,255,0.2);
  }
  .download-button {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    background: #22c55e;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    color: #000;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;
    text-decoration: none;
  }
  .download-button:hover {
    background: #16a34a;
  }
  .topic-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid #2e2e2e;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
  }
  .agenda-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid #2e2e2e;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .code-block {
    background: #1a1a1a;
    border: 1px solid #2e2e2e;
    border-radius: 8px;
    padding: 16px;
    font-family: 'Courier New', monospace;
    color: #22c55e;
    font-size: 0.9em;
    overflow-x: auto;
  }
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
  }
  .comparison-table th,
  .comparison-table td {
    padding: 12px;
    border: 1px solid #2e2e2e;
    text-align: left;
  }
  .comparison-table th {
    background: rgba(249, 115, 22, 0.2);
    color: #f97316;
  }
  .comparison-table td {
    background: rgba(255,255,255,0.03);
  }
  .takeaway-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .phase-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.7em;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .phase-1 { background: #22c55e; color: #000; }
  .phase-2 { background: #3b82f6; color: #fff; }
  .phase-3 { background: #a855f7; color: #fff; }
`;

export default presentationStyles;
