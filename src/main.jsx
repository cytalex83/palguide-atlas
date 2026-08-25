import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, ChevronRight, Compass, Egg, Grid2X2, MapPin, Search, Server, Sun, Swords, Wrench, X} from 'lucide-react';
import './styles.css';

const recentGuides = [
  {title:'Breeding Combos: Anubis & Kitsun — All Offspring', category:'Breeding', time:'2h ago', tone:'breed'},
  {title:'Best Base Locations for Every Biome', category:'Bases', time:'5h ago', tone:'base'},
  {title:'Palworld Dedicated Server Setup (SteamCMD Guide)', category:'Servers', time:'1d ago', tone:'server'},
  {title:'Alpha Boss Respawn Times and Locations', category:'Bosses', time:'1d ago', tone:'boss'},
  {title:'All Ore Nodes and Where to Farm Them', category:'Resources', time:'2d ago', tone:'ore'},
];

const tools = [
  {name:'Breeding Calculator', detail:'Predict offspring, passives, and combos.', icon:Egg},
  {name:'Interactive Map', detail:'Explore the world and track everything.', icon:MapPin},
  {name:'Base Planner', detail:'Plan layouts and optimize your base.', icon:Grid2X2},
  {name:'Damage Calculator', detail:'Calculate damage, multipliers, and more.', icon:Swords},
];

const routes = {
  Guides: {title:'Guides', intro:'Practical answers for every stage of your Palworld run.', rows:['How to breed in Palworld','Palworld server settings that feel right','Legendary Pals: where to start','Ore routes for the early game']},
  Tools: {title:'Tools', intro:'Small utilities that help you make better decisions in less time.', rows:['Breeding Calculator','Interactive Map','Base Planner','Damage Calculator']},
  Database: {title:'Database', intro:'Searchable reference pages for Pals, items, locations, and bosses.', rows:['Paldex','Breeding combos','Best Pals by role','Boss drops']},
  Updates: {title:'Updates', intro:'A clean log of the newest Palworld changes and what they mean.', rows:['Palworld 1.0: what changed','New Pals and where to find them','Server compatibility notes','Balance changes explained']},
};

function App(){
  const [query,setQuery]=useState('');
  const [active,setActive]=useState('Home');
  const [theme,setTheme]=useState('dark');
  const [toast,setToast]=useState('');
  const filtered = useMemo(()=>recentGuides.filter(x=>[x.title,x.category].join(' ').toLowerCase().includes(query.toLowerCase())),[query]);
  const notify=(msg)=>{setToast(msg); window.setTimeout(()=>setToast(''),2600)};
  const go=(name)=>{setActive(name); window.scrollTo({top:0,behavior:'smooth'})};
  const home = active==='Home';

  return <div className={`app ${theme==='light'?'light':''}`}>
    <header className="topbar">
      <button className="brand" onClick={()=>go('Home')} aria-label="Go home"><span className="brand-mark"><Compass size={27}/></span><span><strong>PALGUIDE</strong><em>ATLAS</em></span></button>
      <nav>{['Guides','Tools','Database','Updates'].map(item=><button className={active===item?'active':''} key={item} onClick={()=>go(item)}>{item}</button>)}</nav>
      <div className="top-actions"><button className="icon-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme"><Sun size={18}/></button><span className="rule"/><button className="icon-btn" onClick={()=>document.querySelector('.search-input')?.focus()} aria-label="Focus search"><Search size={21}/></button></div>
    </header>

    {home ? <main>
      <section className="hero">
        <div className="hero-copy">
          <h1>Build smarter.<br/>Explore farther.</h1>
          <p>The calm, complete hub for Palworld players.<br/>Guides, tools, and maps to help you thrive.</p>
          <div className="hero-actions">
            <label className="search-box"><Search size={20}/><input className="search-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Palworld guides"/></label>
            <button className="primary" onClick={()=>notify('Breeding Calculator is next — your search stays saved.') }><Egg size={19}/>Open the Breeding Calculator</button>
          </div>
        </div>
      </section>
      <section className="lanes">
        <Feature icon={Egg} title="Breeding Calculator" copy="Plan perfect pairs and predict offspring, passives, and combinations with confidence." action="Explore the tool" tone="breed" onClick={()=>notify('Opening Breeding Calculator…')}/>
        <Feature icon={Server} title="Server Setup" copy="Step-by-step guides to build, configure, and optimize your Palworld server." action="Set up your server" tone="server" onClick={()=>go('Guides')}/>
        <Feature icon={MapPin} title="Interactive Map" copy="Explore the world with our interactive map. Find Pals, resources, dungeons, and more." action="Open the map" tone="map" onClick={()=>notify('Interactive Map is ready for the next build.')}/>
      </section>
      <section className="content-grid">
        <div className="recent panel">
          <div className="section-head"><div><BookOpen size={24}/><div><h2>Start with a real answer</h2><p>Recent guides from the Atlas.</p></div></div><button className="text-btn" onClick={()=>go('Guides')}>View all <ChevronRight size={16}/></button></div>
          <div className="guide-list">{filtered.length?filtered.map((g,i)=><button className="guide-row" key={g.title} onClick={()=>notify('Guide opened — this prototype keeps the page state local.')}><span className={`thumb ${g.tone}`}></span><span className="guide-title">{g.title}</span><span className="guide-cat">{g.category}</span><span className="guide-time">{g.time}</span><ChevronRight size={17}/></button>):<div className="empty">No guides match “{query}”. Try “breeding”, “server”, or “ore”.</div>}</div>
        </div>
        <aside className="tools panel"><div className="section-head compact"><div><Wrench size={22}/><div><h2>Popular tools</h2></div></div></div>{tools.map(({name,detail,icon:Icon})=><button className="tool-row" key={name} onClick={()=>notify(`${name} selected`)}><span className="tool-icon"><Icon size={21}/></span><span><strong>{name}</strong><small>{detail}</small></span><ChevronRight size={17}/></button>)}</aside>
      </section>
    </main> : <main className="subpage"><div className="subhead"><div><div className="crumb">PALGUIDE ATLAS <span>/</span> {active}</div><h1>{routes[active].title}</h1><p>{routes[active].intro}</p></div><button className="primary small" onClick={()=>go('Home')}>Back to home</button></div><div className="route-grid">{routes[active].rows.map((row,i)=><button className="route-item" key={row} onClick={()=>notify(`${row} selected`)}><span className="route-num">0{i+1}</span><span><strong>{row}</strong><small>{active==='Tools'?'Open tool workspace':'Read the latest field notes and practical steps.'}</small></span><ChevronRight size={18}/></button>)}</div></main>}
    <footer><span>PALGUIDE ATLAS</span><span>Unofficial field notes for Palworld players.</span><span>Updated for 1.0 · {new Date().getFullYear()}</span></footer>
    {toast&&<div className="toast">{toast}<button onClick={()=>setToast('')}><X size={15}/></button></div>}
  </div>
}
function Feature({icon:Icon,title,copy,action,tone,onClick}){const crop=tone==='breed'?'72% 52%':tone==='server'?'58% 50%':'94% 56%';return <article className="feature"><div className={`feature-art ${tone}`} style={{backgroundPosition:crop}}></div><div className="feature-copy"><Icon size={26}/><h2>{title}</h2><p>{copy}</p><button className="link-btn" onClick={onClick}>{action}<ChevronRight size={15}/></button></div></article>}
createRoot(document.getElementById('root')).render(<App/>);
