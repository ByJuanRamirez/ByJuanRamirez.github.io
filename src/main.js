import './style.css';
import { profile, about, skills, experience, blogPosts } from './data/portfolio.js';

// ── Icons SVG (reutilizables) ──────────────────────────────
const ICONS = {
  home:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.69l-9 7.6V21h6v-7h6v7h6V9.29l-9-7.6zm0-1.69l10 8.45V22h-8v-7h-4v7H2V9.45L12 1z"/></svg>`,
  search:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  bell:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22.75c1.24 0 2.25-1.01 2.25-2.25h-4.5c0 1.24 1.01 2.25 2.25 2.25zm7.5-4.5v-6.75c0-3.63-2.6-6.65-6-7.36V3c0-.83-.67-1.5-1.5-1.5S10.5 2.17 10.5 3v1.14c-3.4.71-6 3.73-6 7.36v6.75l-1.5 1.5v.75h18v-.75l-1.5-1.5z"/></svg>`,
  mail:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  user:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 11.75c3.04 0 5.5-2.46 5.5-5.5S15.04.75 12 .75 6.5 3.21 6.5 6.25s2.46 5.5 5.5 5.5zm0 2c-3.67 0-11 1.84-11 5.5v2.5h22v-2.5c0-3.66-7.33-5.5-11-5.5z"/></svg>`,
  code:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  bookmark:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`,
  more:    `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
  location:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  link:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  calendar:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  comment:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  retweet:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>`,
  heart:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  share:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  chart:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  sun:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  verified: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg>`,
  deploy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  ai:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><circle cx="18" cy="6" r="3"/></svg>`,
};

// Skill icons (brand logos)
const SKILL_ICONS = {
  js:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>`,
  ts:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`,
  react:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.45-.572.905-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.09 2.964-.45 1.024-.815 2.02-1.086 2.18-.484-.15-.944-.318-1.37-.5-1.732-.74-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.366-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.37.48-.756.705-1.148.225-.39.435-.788.635-1.19zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.704 1.143-.693-.102-1.367-.23-2.006-.386.18-.63.406-1.282.662-1.932zm8.687 2.826c.554.685 1.077 1.35 1.517 1.955-1.595 1.48-3.09 2.295-4.105 2.295l-.006-.001c-.225 0-.406-.044-.559-.127-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.44.963.237 2.006.417 3.107.534.66.904 1.345 1.727 2.036 2.447zm-7.26.02c-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.298 3.113-.538.112.49.195.963.254 1.42.23 1.868-.054 3.32-.714 3.707-.19.09-.399.128-.563.132z"/></svg>`,
  node: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68C2.99 6.729 2.936 6.825 2.936 6.921v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.275-.924 1.604l-8.794 5.078C12.643 23.916 12.324 24 11.998 24z"/></svg>`,
  css:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>`,
  docker:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.085-.051-1.83-1.233-2.765-1.33-2.948l-.143-.14-.171.135c-.357.305-.635.668-.817 1.08-.322.682-.486 1.91.016 2.949-.23.136-.48.237-.75.321-.713.218-1.473.232-2.194.04V9.536a.186.186 0 00-.186-.186H13.1a.185.185 0 00-.185.186v1.888c0 .102.083.185.186.185h2.118a.186.186 0 00.136-.06 9.79 9.79 0 01-.023.527c-.739.512-1.639.755-2.545.686-1.095-.079-2.033-.58-2.896-1.523A8.7 8.7 0 018 9.17L7.9 9l-.186.118C6.555 9.8 6 11.1 6 12.5c0 3.6 2.9 6.5 6.5 6.5 3.3 0 5.8-2.2 6.5-5.2h.1c.2 0 2.4-.1 3.2-2.4l.1-.3-.637-.213z"/></svg>`,
  git:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.608-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.67.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>`,
  claude:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.032-.048-2.102-.483-1.936-.483-.016-.016c-.56-.08-.88-.432-.848-.88.032-.464.4-.784.88-.784.096 0 .193.016.29.048l.015.016 1.92.56 2.086.624.08-.128-.128-.144L7.2 9.7l-1.648-2.343-.016-.015c-.128-.175-.192-.383-.192-.592 0-.512.384-.895.895-.895.303 0 .575.128.767.367l.016.016 1.535 2.103 1.583 2.135.145-.08v-.16L10.127 8.2 9.7 5.549v-.016c-.016-.08-.016-.16-.016-.255 0-.512.384-.895.895-.895.464 0 .847.335.895.8v.016l.4 2.735.4 2.734.128.048.08-.112.815-2.654.847-2.623v-.016c.128-.383.48-.623.88-.623.512 0 .896.383.896.895 0 .112-.016.224-.064.336v.016l-.815 2.558-.848 2.527.144.112.112-.064 2.023-1.695 1.983-1.695.016-.016c.16-.128.368-.208.575-.208.512 0 .896.383.896.895 0 .272-.112.528-.32.704l-.015.016-1.984 1.647-2.023 1.647.016.144.128.016 2.687-.544 2.687-.544h.016c.08-.016.16-.016.24-.016.512 0 .895.384.895.896 0 .43-.303.799-.735.879l-.016.016-2.67.496-2.688.496-.016.128.112.096 1.952.975 1.952.975.016.016c.304.16.48.463.48.783 0 .512-.384.896-.895.896-.176 0-.336-.048-.48-.128l-.016-.016-1.887-.975-1.952-.975-.144.128.048.128.927 2.495.959 2.463.016.016c.048.128.08.256.08.384 0 .512-.384.895-.896.895-.383 0-.735-.239-.863-.607l-.016-.016-.911-2.447-.943-2.43-.16.031-.048.16-.4 2.703-.447 2.703v.016c-.08.463-.48.783-.943.783-.512 0-.896-.383-.896-.895 0-.08.016-.16.016-.224v-.031l.4-2.688.4-2.703-.144-.08-.112.08-1.615 2.175-1.583 2.15-.016.016c-.192.24-.464.368-.767.368-.512 0-.896-.384-.896-.896 0-.224.08-.432.224-.592l.016-.016 1.615-2.118 1.615-2.15-.08-.144h-.16l-2.119.576-2.15.576h-.016c-.095.031-.191.047-.287.047-.512 0-.896-.383-.896-.895.016-.448.336-.8.784-.88z"/></svg>`,
};

const CATEGORY_COLORS = {
  Frontend:   '#1d9bf0',
  Backend:    '#00ba7c',
  DevOps:     '#ff7a00',
  'AI Tools': '#794bc4',
  VCS:        '#1d9bf0',
};

const LEVEL_LABELS = ['', 'Básico', 'Familiar', 'Competente', 'Avanzado', 'Experto'];

// ── Avatar helper ──────────────────────────────────────────
function avatarHTML(size = 40, extraClass = '') {
  if (profile.avatar) {
    return `<div class="${extraClass}" style="width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;flex-shrink:0;"><img src="${profile.avatar}" alt="${profile.name}" style="width:100%;height:100%;object-fit:cover;"></div>`;
  }
  return `<div class="${extraClass}" style="width:${size}px;height:${size}px;border-radius:50%;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.35)}px;font-weight:800;color:var(--blue);flex-shrink:0;">${profile.initials}</div>`;
}

// ── Sidebar izquierda ──────────────────────────────────────
function createSidebar() {
  const nav = document.createElement('nav');
  nav.className = 'x-sidebar';

  const savedTheme = localStorage.getItem('theme') || 'dark';
  const isDark = savedTheme === 'dark';

  const NAV_LINKS = [
    { id: 'inicio',    icon: ICONS.home,     label: 'Inicio',     tab: '' },
    { id: 'proyectos', icon: ICONS.code,     label: 'Proyectos',  tab: 'posts' },
    { id: 'skills',    icon: ICONS.chart,    label: 'Skills',     tab: 'skills' },
    { id: 'blog',      icon: ICONS.bookmark, label: 'Blog',       tab: 'blog' },
    { id: 'contacto',  icon: ICONS.mail,     label: 'Contacto',   tab: 'contact' },
  ];

  const navItemsHTML = NAV_LINKS.map(l => `
    <a class="nav-item${l.tab === 'posts' ? ' active' : ''}" data-tab="${l.tab}" href="#" role="button" aria-label="${l.label}">
      <span class="nav-item__icon">${l.icon}</span>
      <span class="nav-item__label">${l.label}</span>
    </a>
  `).join('');

  const profileAvatarHTML = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}">`
    : profile.initials;

  nav.innerHTML = `
    <div class="nav-logo" title="JDC Portfolio">
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </div>

    <div class="nav-items">
      ${navItemsHTML}
      <button class="nav-theme-toggle" id="themeToggle" aria-label="Cambiar tema">
        <span class="nav-theme-toggle__icon">${isDark ? ICONS.sun : ICONS.moon}</span>
        <span class="nav-theme-toggle__label">${isDark ? 'Modo claro' : 'Modo oscuro'}</span>
      </button>
    </div>

    <a href="#contact" class="nav-post-btn">Contratar</a>

    <div class="nav-profile" title="${profile.name}">
      <div class="nav-profile__avatar">${profileAvatarHTML}</div>
      <div class="nav-profile__info">
        <span class="nav-profile__name">${profile.name.split(' ').slice(0,2).join(' ')}</span>
        <span class="nav-profile__handle">@juandiegocr</span>
      </div>
      <span class="nav-profile__dots">${ICONS.more}</span>
    </div>
  `;

  return nav;
}

// ── Columna central: header del perfil ────────────────────
function createProfileHeader() {
  const wrap = document.createElement('div');

  const avatarContent = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}" style="width:100%;height:100%;object-fit:cover;">`
    : profile.initials;

  wrap.innerHTML = `
    <!-- Sticky header -->
    <div class="profile-sticky-header">
      <div class="profile-sticky-header__back" title="Inicio">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </div>
      <div class="profile-sticky-header__info">
        <div class="profile-sticky-header__name">${profile.name}</div>
        <div class="profile-sticky-header__count">${experience.length} proyectos</div>
      </div>
    </div>

    <!-- Banner -->
    <div class="profile-banner"></div>

    <!-- Info del perfil -->
    <div class="profile-info">
      <div class="profile-avatar-wrap">
        <div class="profile-avatar">${avatarContent}</div>
        <div class="profile-actions">
          <button class="profile-icon-btn" title="Más opciones" aria-label="Más opciones">
            ${ICONS.more}
          </button>
          <button class="profile-icon-btn" title="Mensaje directo" aria-label="Enviar mensaje">
            ${ICONS.mail}
          </button>
          <a href="mailto:${profile.email}" class="profile-follow-btn">Contratar</a>
        </div>
      </div>

      <!-- Nombre -->
      <div class="profile-name-wrapper">
        <span class="profile-name">${profile.name}</span>
        <span class="profile-verified" title="Developer verificado">${ICONS.verified}</span>
      </div>
      <div class="profile-handle">@juandiegocr · <span style="color:var(--blue)">JavaScript Developer</span></div>

      <!-- Bio -->
      <p class="profile-bio">${about.bio[0]}</p>
      <p class="profile-bio" style="margin-top:6px;font-size:0.9rem;color:var(--text-muted);">${about.bio[1]}</p>

      <!-- Meta -->
      <div class="profile-meta">
        <span class="profile-meta-item">
          ${ICONS.location}
          ${profile.location}
        </span>
        <a href="${profile.github}" target="_blank" rel="noopener" class="profile-meta-item">
          ${ICONS.github}
          GitHub
        </a>
        <a href="${profile.linkedin}" target="_blank" rel="noopener" class="profile-meta-item">
          ${ICONS.linkedin}
          LinkedIn
        </a>
        <span class="profile-meta-item">
          ${ICONS.calendar}
          Disponible ahora
        </span>
      </div>

      <!-- Stats -->
      <div class="profile-stats">
        <div class="profile-stat">
          <span class="profile-stat__num">${skills.length}</span>
          <span class="profile-stat__label">tecnologías</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat__num">${experience.length}</span>
          <span class="profile-stat__label">proyectos</span>
        </div>
        <div class="profile-stat">
          <span class="profile-stat__num">3+</span>
          <span class="profile-stat__label">años de experiencia</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="profile-tabs" role="tablist">
      <button class="profile-tab active" data-tab="posts" role="tab">Proyectos</button>
      <button class="profile-tab" data-tab="skills" role="tab">Skills</button>
      <button class="profile-tab" data-tab="blog" role="tab">Blog</button>
      <button class="profile-tab" data-tab="contact" role="tab">Contacto</button>
    </div>
  `;

  return wrap;
}

// ── Tab: Proyectos (Posts) ─────────────────────────────────
function createPostsTab() {
  const div = document.createElement('div');
  div.className = 'tab-content active';
  div.setAttribute('data-tab-content', 'posts');

  const STATUS_MAP = { 'Producción': 'prod', 'En desarrollo': 'dev', 'Mantenimiento': 'maint' };

  const postsHTML = experience.map((item, i) => {
    const techHashtags = item.tech.map(t => `<span class="tweet-hashtag">#${t.replace(/[^a-zA-Z0-9]/g,'')}</span>`).join(' ');
    const statusCls = STATUS_MAP[item.status] || 'prod';
    const avatarContent = profile.avatar
      ? `<img src="${profile.avatar}" alt="${profile.name}">`
      : profile.initials;

    const githubLink = item.links?.github && item.links.github !== '#'
      ? `<a href="${item.links.github}" target="_blank" rel="noopener" class="tweet-action" title="Ver en GitHub">${ICONS.github} GitHub</a>`
      : '';

    const liveLink = item.links?.live && item.links.live !== '#'
      ? `<a href="${item.links.live}" target="_blank" rel="noopener" class="tweet-action" title="Ver en vivo">${ICONS.link} Live</a>`
      : '';

    return `
      <article class="tweet reveal reveal-delay-${(i % 3) + 1}">
        <div class="tweet__left">
          <div class="tweet__avatar">${avatarContent}</div>
        </div>
        <div class="tweet__body">
          <div class="tweet__header">
            <span class="tweet__name">${profile.name.split(' ').slice(0,2).join(' ')}</span>
            <span class="tweet__handle">@juandiegocr</span>
            <span class="tweet__dot">·</span>
            <span class="tweet__time">${item.date} · ${item.duration}</span>
          </div>
          <span class="tweet-badge tweet-badge--${statusCls}">${item.status}</span>
          <div class="tweet__title">${item.title}</div>
          <div class="tweet__text">${item.description}</div>
          <div class="tweet__hashtags">${techHashtags}</div>
          <div class="tweet__actions">
            <button class="tweet-action" title="Comentar">${ICONS.comment} <span>0</span></button>
            <button class="tweet-action tweet-action--share" title="Compartir">${ICONS.retweet} <span>0</span></button>
            <button class="tweet-action tweet-action--like" title="Me gusta">${ICONS.heart} <span>0</span></button>
            ${githubLink}
            ${liveLink}
          </div>
        </div>
      </article>
    `;
  }).join('');

  div.innerHTML = postsHTML;
  return div;
}

// ── Tab: Skills (Media grid) ───────────────────────────────
function createSkillsTab() {
  const div = document.createElement('div');
  div.className = 'tab-content';
  div.setAttribute('data-tab-content', 'skills');

  const tilesHTML = skills.map(skill => {
    const icon = SKILL_ICONS[skill.id] || SKILL_ICONS.js;
    const color = CATEGORY_COLORS[skill.category] || '#1d9bf0';
    const dots = Array.from({length: 5}, (_, i) =>
      `<span class="skill-dot${i < skill.level ? ' skill-dot--on' : ''}"></span>`
    ).join('');

    return `
      <div class="skill-tile" style="--cell-color:${color};" title="${skill.description}">
        <div class="skill-tile__icon">${icon}</div>
        <span class="skill-tile__name">${skill.name}</span>
        <div class="skill-tile__level">${dots}</div>
      </div>
    `;
  }).join('');

  div.innerHTML = `<div class="skills-grid">${tilesHTML}</div>`;
  return div;
}

// ── Tab: Blog ──────────────────────────────────────────────
function createBlogTab() {
  const div = document.createElement('div');
  div.className = 'tab-content';
  div.setAttribute('data-tab-content', 'blog');

  const avatarContent = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}">`
    : profile.initials;

  const postsHTML = blogPosts.map((post, i) => {
    const tagsHTML = post.tags.map(t => `<span class="tweet-hashtag">#${t}</span>`).join(' ');
    return `
      <article class="tweet reveal reveal-delay-${(i % 3) + 1}">
        <div class="tweet__left">
          <div class="tweet__avatar">${avatarContent}</div>
        </div>
        <div class="tweet__body">
          <div class="tweet__header">
            <span class="tweet__name">${profile.name.split(' ').slice(0,2).join(' ')}</span>
            <span class="tweet__handle">@juandiegocr</span>
            <span class="tweet__dot">·</span>
            <span class="tweet__time">${post.date}</span>
          </div>
          ${post.comingSoon ? '<span class="blog-coming-soon">Próximamente</span>' : ''}
          <div class="tweet__title">${post.title}</div>
          <div class="tweet__text">${post.excerpt}</div>
          <div class="tweet__hashtags">${tagsHTML}</div>
        </div>
      </article>
    `;
  }).join('');

  div.innerHTML = postsHTML;
  return div;
}

// ── Tab: Contacto ──────────────────────────────────────────
function createContactTab() {
  const div = document.createElement('div');
  div.className = 'tab-content';
  div.setAttribute('data-tab-content', 'contact');

  const avatarContent = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}">`
    : profile.initials;

  const LINKS = [
    { label: 'GitHub', value: profile.github.replace('https://',''), href: profile.github, icon: ICONS.github },
    { label: 'LinkedIn', value: profile.linkedin.replace('https://',''), href: profile.linkedin, icon: ICONS.linkedin },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: ICONS.mail },
  ];

  const linksHTML = LINKS.map((l, i) => `
    <article class="tweet reveal reveal-delay-${i+1}">
      <div class="tweet__left">
        <div class="tweet__avatar">${avatarContent}</div>
      </div>
      <div class="tweet__body">
        <div class="tweet__header">
          <span class="tweet__name">${profile.name.split(' ').slice(0,2).join(' ')}</span>
          <span class="tweet__handle">@juandiegocr</span>
        </div>
        <div class="tweet__text" style="display:flex;align-items:center;gap:10px;color:var(--text);">
          <span style="color:var(--blue);width:22px;height:22px;display:flex;align-items:center;">${l.icon}</span>
          <strong style="color:var(--text-muted);min-width:70px;">${l.label}</strong>
          <a href="${l.href}" target="${l.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener" style="color:var(--blue);">${l.value}</a>
        </div>
      </div>
    </article>
  `).join('');

  // Highlights como "posts" adicionales
  const highlightsHTML = `
    <article class="tweet reveal">
      <div class="tweet__left">
        <div class="tweet__avatar">${avatarContent}</div>
      </div>
      <div class="tweet__body">
        <div class="tweet__header">
          <span class="tweet__name">${profile.name.split(' ').slice(0,2).join(' ')}</span>
          <span class="tweet__handle">@juandiegocr</span>
        </div>
        <div class="tweet__title">Lo que me hace diferente</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
          ${about.highlights.map(h => `<span style="background:var(--blue-dim);color:var(--blue);border:1px solid var(--blue);border-radius:9999px;padding:4px 14px;font-size:0.875rem;font-weight:600;">${h.label}</span>`).join('')}
        </div>
      </div>
    </article>
  `;

  div.innerHTML = linksHTML + highlightsHTML;
  return div;
}

// ── Sidebar derecha ────────────────────────────────────────
function createAside() {
  const aside = document.createElement('aside');
  aside.className = 'x-aside';

  // Top skills para el widget
  const topSkills = skills.filter(s => s.level >= 4).slice(0, 6);

  const skillsListHTML = topSkills.map(s => {
    const icon = SKILL_ICONS[s.id] || SKILL_ICONS.js;
    const color = CATEGORY_COLORS[s.category] || '#1d9bf0';
    return `
      <div class="aside-skill-row">
        <div class="aside-skill-row__left">
          <div class="aside-skill-row__icon" style="background:${color}22;color:${color};">${icon}</div>
          <div>
            <div class="aside-skill-row__name">${s.name}</div>
            <div class="aside-skill-row__cat">${s.category}</div>
          </div>
        </div>
        <div class="aside-skill-row__level">${LEVEL_LABELS[s.level]}</div>
      </div>
    `;
  }).join('');

  const contactLinks = [
    { label: 'GitHub', value: 'Ver repositorios', href: profile.github, icon: ICONS.github },
    { label: 'LinkedIn', value: 'Conectar', href: profile.linkedin, icon: ICONS.linkedin },
    { label: 'Email directo', value: profile.email, href: `mailto:${profile.email}`, icon: ICONS.mail },
  ];

  const contactHTML = contactLinks.map(l => `
    <a href="${l.href}" target="${l.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener" class="aside-item">
      <div class="aside-item__icon">${l.icon}</div>
      <div class="aside-item__info">
        <span class="aside-item__label">${l.label}</span>
        <span class="aside-item__value">${l.value}</span>
      </div>
    </a>
  `).join('');

  aside.innerHTML = `
    <!-- Búsqueda decorativa -->
    <div class="aside-search">
      <svg class="aside-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      Buscar en el portafolio
    </div>

    <!-- Widget: Top Skills -->
    <div class="aside-widget">
      <div class="aside-widget__title">Stack principal</div>
      ${skillsListHTML}
    </div>

    <!-- Widget: Contacto -->
    <div class="aside-widget">
      <div class="aside-widget__title">Contacto</div>
      ${contactHTML}
    </div>

    <!-- Widget: Disponibilidad -->
    <div class="aside-widget" style="border-color:var(--green);background:var(--green-dim);">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <span style="width:10px;height:10px;border-radius:50%;background:var(--green);display:inline-block;flex-shrink:0;"></span>
        <span style="font-size:1rem;font-weight:700;color:var(--text);">Disponible para proyectos</span>
      </div>
      <p style="font-size:0.875rem;color:var(--text-muted);margin:0;">${about.bio[2]}</p>
    </div>

    <div class="aside-footer">
      <a href="${profile.github}" target="_blank">GitHub</a>
      <a href="${profile.linkedin}" target="_blank">LinkedIn</a>
      <a href="mailto:${profile.email}">Email</a>
      <span style="font-size:0.8125rem;color:var(--text-muted);">© ${new Date().getFullYear()} JDC</span>
    </div>
  `;

  return aside;
}

// ── Montar todo ────────────────────────────────────────────
const app = document.getElementById('app');
const layout = document.createElement('div');
layout.className = 'x-layout';

// Sidebar
const sidebar = createSidebar();

// Main column
const main = document.createElement('main');
main.className = 'x-main';

const profileHeader = createProfileHeader();
main.appendChild(profileHeader);

const postsTab    = createPostsTab();
const skillsTab   = createSkillsTab();
const blogTab     = createBlogTab();
const contactTab  = createContactTab();

main.appendChild(postsTab);
main.appendChild(skillsTab);
main.appendChild(blogTab);
main.appendChild(contactTab);

// Aside
const aside = createAside();

layout.appendChild(sidebar);
layout.appendChild(main);
layout.appendChild(aside);
app.appendChild(layout);

// ── Inicializar interactividad ─────────────────────────────
function init() {
  // Theme toggle
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const isDark = theme === 'dark';
    btn.querySelector('.nav-theme-toggle__icon').innerHTML = isDark ? ICONS.sun : ICONS.moon;
    btn.querySelector('.nav-theme-toggle__label').textContent = isDark ? 'Modo claro' : 'Modo oscuro';
    btn.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  }

  // Tabs — columna central
  function setActiveTab(tabId) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.dataset.tabContent === tabId));
    // Actualizar nav sidebar activo
    document.querySelectorAll('.nav-item[data-tab]').forEach(n => n.classList.toggle('active', n.dataset.tab === tabId));
  }

  document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab) setActiveTab(tab.dataset.tab);
    });
  });

  // Nav sidebar también controla tabs
  document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = item.dataset.tab;
      if (tab) {
        setActiveTab(tab);
        // Scroll al inicio de main
        main.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Botón "Contratar" en nav scrollea a contacto tab
  const contratarBtn = document.querySelector('.nav-post-btn');
  if (contratarBtn) {
    contratarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveTab('contact');
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
