import { motion } from 'framer-motion';

const A = ({ i = 0, children }) => (
  <motion.g initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i, duration: 0.5 }}>{children}</motion.g>
);
const draw = (d, i = 0, extra = {}) => (
  <motion.path d={d} fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1 * i, duration: 1.1 }} {...extra} />
);
const AC = '#1a7bff';

const visuals = {
  web: () => (<>
    <A><rect x="40" y="70" width="320" height="340" rx="16" fill="#0d0f14" stroke="#ffffff22" /><circle cx="64" cy="94" r="5" fill="#ff5f57" /><circle cx="82" cy="94" r="5" fill="#febc2e" /><circle cx="100" cy="94" r="5" fill="#28c840" /></A>
    <A i={1}><rect x="64" y="130" width="200" height="22" rx="6" fill="#fff" /><rect x="64" y="162" width="140" height="22" rx="6" fill={AC} /></A>
    <A i={2}><rect x="64" y="210" width="160" height="8" rx="4" fill="#ffffff30" /><rect x="64" y="228" width="120" height="8" rx="4" fill="#ffffff20" /><rect x="64" y="262" width="96" height="30" rx="15" fill={AC} /></A>
    <A i={3}><rect x="240" y="200" width="100" height="180" rx="10" fill="#151821" stroke="#ffffff18" /><circle cx="290" cy="260" r="26" fill={AC} opacity=".8" /></A>
    <A i={4}><path d="M300 320 l0 38 l11 -9 l9 20 l9 -4 l-9 -20 l14 -2 z" fill="#fff" /></A>
  </>),
  app: () => (<>
    <A><rect x="30" y="60" width="340" height="360" rx="16" fill="#0d0f14" stroke="#ffffff22" /><rect x="30" y="60" width="64" height="360" rx="16" fill="#12151c" /></A>
    {[0, 1, 2].map((k) => <A key={k} i={k + 1}><rect x={112 + k * 84} y="82" width="76" height="60" rx="10" fill="#151821" stroke="#ffffff14" /><rect x={122 + k * 84} y="96" width="30" height="8" rx="4" fill="#ffffff35" /><rect x={122 + k * 84} y="114" width="46" height="14" rx="4" fill={k === 0 ? AC : '#fff'} /></A>)}
    <A i={4}><rect x="112" y="160" width="244" height="150" rx="12" fill="#151821" stroke="#ffffff14" /></A>
    {draw('M126 290 L170 250 L210 268 L256 210 L300 232 L342 184', 5, { stroke: AC, strokeWidth: 4 })}
    <A i={6}><rect x="112" y="326" width="244" height="12" rx="6" fill="#ffffff18" /><rect x="112" y="350" width="190" height="12" rx="6" fill="#ffffff12" /><rect x="112" y="374" width="220" height="12" rx="6" fill="#ffffff12" /></A>
  </>),
  ux: () => (<>
    <A><rect x="30" y="60" width="340" height="360" rx="16" fill="#0d0f14" stroke="#ffffff22" /></A>
    {draw('M70 330 C 120 120, 240 400, 330 150', 1, { stroke: '#fff', strokeWidth: 3 })}
    {[[70, 330], [330, 150]].map(([x, y]) => <A key={x} i={3}><rect x={x - 7} y={y - 7} width="14" height="14" fill="#030304" stroke={AC} strokeWidth="2.5" /></A>)}
    <A i={4}><line x1="70" y1="330" x2="120" y2="120" stroke={AC} strokeDasharray="4 4" /><line x1="330" y1="150" x2="240" y2="400" stroke={AC} strokeDasharray="4 4" /><circle cx="120" cy="120" r="6" fill={AC} /><circle cx="240" cy="400" r="6" fill={AC} /></A>
    <A i={5}>{['#1a7bff', '#22d3ee', '#efece6', '#8b5cf6'].map((c, k) => <circle key={c} cx={64 + k * 34} cy="96" r="12" fill={c} />)}</A>
  </>),
  shop: () => (<>
    <A><rect x="70" y="60" width="260" height="360" rx="20" fill="#0d0f14" stroke="#ffffff22" /></A>
    <A i={1}><rect x="88" y="78" width="224" height="190" rx="14" fill="#151821" /><circle cx="200" cy="173" r="62" fill={AC} opacity=".85" /><circle cx="200" cy="173" r="28" fill="#fff" /></A>
    <A i={2}><rect x="88" y="288" width="140" height="12" rx="6" fill="#ffffff55" /><rect x="88" y="312" width="80" height="22" rx="6" fill="#fff" /></A>
    <A i={3}><rect x="88" y="354" width="224" height="46" rx="23" fill={AC} /><rect x="156" y="372" width="88" height="10" rx="5" fill="#fff" /></A>
    <A i={4}><circle cx="322" cy="82" r="20" fill="#fff" /><text x="322" y="88" textAnchor="middle" fontSize="18" fontWeight="800" fill="#030304">1</text></A>
  </>),
  ai: () => {
    const n = [[200, 90], [90, 190], [310, 190], [140, 320], [260, 320], [200, 210]];
    return (<>
      {n.flatMap(([x, y], i) => n.slice(i + 1).map(([x2, y2], j) => <motion.line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke={AC} strokeOpacity=".5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.05 * (i + j), duration: 0.8 }} />))}
      {n.map(([x, y], i) => <A key={i} i={i}><circle cx={x} cy={y} r="22" fill="#0d0f14" stroke={AC} strokeWidth="2.5" /><motion.circle cx={x} cy={y} r="8" fill={i === 5 ? '#fff' : '#22d3ee'} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} style={{ transformOrigin: `${x}px ${y}px` }} /></A>)}
    </>);
  },
  soft: () => (<>
    {[0, 1, 2].map((k) => <A key={k} i={k}><path d={`M200 ${300 - k * 70} l120 -60 l-120 -60 l-120 60 z`} fill={k === 2 ? AC : '#151821'} stroke="#ffffff30" /><path d={`M80 ${240 - k * 70} v32 l120 60 v-32 z`} fill="#0d0f14" stroke="#ffffff20" /><path d={`M320 ${240 - k * 70} v32 l-120 60 v-32 z`} fill="#10131a" stroke="#ffffff20" /></A>)}
    <A i={4}><rect x="40" y="380" width="320" height="40" rx="10" fill="#0d0f14" stroke="#ffffff22" /><text x="56" y="406" fontSize="15" fill="#22d3ee" fontFamily="monospace">$ deploy --production</text></A>
  </>),
};

export default function ServiceVisual({ id }) {
  const V = visuals[id] || visuals.web;
  return (
    <svg viewBox="0 0 400 480" role="img" aria-label="Illustration of the service" className="h-full w-full"><V /></svg>
  );
}
