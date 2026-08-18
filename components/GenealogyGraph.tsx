import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GENEALOGY_DATA } from '../constants';
import { Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';

interface GenealogyGraphProps {
    allowFullScreen?: boolean;
}

const GenealogyGraph: React.FC<GenealogyGraphProps> = ({ allowFullScreen = true }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [timelineYear, setTimelineYear] = useState(2026);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [layoutMode, setLayoutMode] = useState<'force' | 'tree' | 'radial'>('force');
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const svgSelectionRef = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: React.ReactNode;
  }>({ visible: false, x: 0, y: 0, content: null });

  const handleZoomSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newK = parseFloat(e.target.value);
    if (svgSelectionRef.current && zoomBehaviorRef.current) {
        svgSelectionRef.current.call(zoomBehaviorRef.current.scaleTo, newK);
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous contents
    d3.select(svgRef.current).selectAll("*").remove();

    // Use SVG dimensions for accurate centering
    const { width, height } = svgRef.current.getBoundingClientRect();

    // Filter nodes based on timeline
    const activeNodes = GENEALOGY_DATA.nodes.filter(n => {
        return n.birthYear <= timelineYear;
    });

    const activeIds = new Set(activeNodes.map(n => n.id));
    const activeLinks = GENEALOGY_DATA.links.filter(l => activeIds.has(l.source) && activeIds.has(l.target));

    // Deep copy for simulation
    const nodes = JSON.parse(JSON.stringify(activeNodes));
    const links = JSON.parse(JSON.stringify(activeLinks));

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);
    
    svgSelectionRef.current = svg;

    // Create a container group for zooming
    const g = svg.append("g").attr("class", "zoom-container");

    // Setup Zoom Behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
            g.attr("transform", event.transform);
            setZoomLevel(event.transform.k);
        });
    
    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // Maintain zoom level
    if (zoomLevel !== 1) {
        svg.call(zoom.transform, d3.zoomIdentity.scale(zoomLevel));
    }

    // Fixed min/max years for stable scale mapping
    const minYear = 1500;
    const maxYear = 2026;

    // Initialize Simulation
    const simulation = d3.forceSimulation(nodes);

    if (layoutMode === 'force') {
      // 1. STANDARD ORGANIC FORCE (Current Layout)
      simulation
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(80))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(25));
        
    } else if (layoutMode === 'tree') {
      // 2. VERTICAL TREE TIMELINE (Y-axis based on birthYear)
      // Older generations at top, younger at bottom
      const yScale = d3.scaleLinear().domain([minYear, maxYear]).range([50, height - 50]);
      
      simulation
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(40).strength(0.5))
        .force("charge", d3.forceManyBody().strength(-150))
        .force("y", d3.forceY((d: any) => yScale(d.birthYear)).strength(1)) // Lock to Y timeline
        .force("x", d3.forceX(width / 2).strength(0.05)) // Gently pull to center X
        .force("collide", d3.forceCollide().radius(30)); // Spread horizontally
        
    } else if (layoutMode === 'radial') {
      // 3. CONCENTRIC CIRCULAR LAYOUT (Radius based on birthYear)
      // Modern nodes in center, older nodes radiating further out
      const radiusScale = d3.scaleLinear().domain([maxYear, minYear]).range([20, Math.min(width, height) / 2 - 40]);
      
      simulation
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(30).strength(0.5))
        .force("charge", d3.forceManyBody().strength(-150))
        .force("collide", d3.forceCollide().radius(25))
        .force("r", d3.forceRadial(
          (d: any) => radiusScale(d.birthYear), 
          width / 2, 
          height / 2
        ).strength(0.8));
    }

    // Render Links attached to 'g'
    const link = g.append("g")
      .attr("stroke", "#575B5F")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value) * 2 + 1)
      .attr("stroke-dasharray", (d: any) => d.type === 'adoptive' ? "4,4" : "none")
      .on("mouseover", (event, d: any) => {
        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          content: (
            <div className="space-y-1">
              <div className="font-bold text-xs uppercase text-tungsten border-b border-white/10 pb-1 mb-1">Connection</div>
              <div className="text-hud-cyan text-sm font-bold capitalize">{d.type}</div>
              <div className="text-[10px] text-gray-400 font-mono">
                From: <span className="text-white">{d.source.label || d.source.id}</span>
                <br/>
                To: <span className="text-white">{d.target.label || d.target.id}</span>
              </div>
            </div>
          )
        });
        d3.select(event.currentTarget).attr("stroke", "#12B5CB").attr("stroke-opacity", 1);
      })
      .on("mousemove", (event) => {
        setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
      })
      .on("mouseout", (event) => {
        setTooltip(prev => ({ ...prev, visible: false }));
        d3.select(event.currentTarget).attr("stroke", "#575B5F").attr("stroke-opacity", 0.6);
      });

    // Render Nodes attached to 'g'
    const node = g.append("g")
      .attr("stroke", "#050505")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.verifiedLevel ? d.verifiedLevel * 1.2 + 3 : 5)
      .attr("fill", (d: any) => {
          if (d.group === 1) return "#ffffff"; // Modern
          if (d.group === 2) return "#D93025"; // MacDonald
          if (d.group === 3) return "#12B5CB"; // Power
          if (d.group === 4) return "#8B5CF6"; // Huguenot
          return "#575B5F";
      })
      .on("mouseover", (event, d: any) => {
        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          content: (
            <div className="min-w-[180px]">
              <div className="flex justify-between items-start border-b border-white/10 pb-2 mb-2">
                <div>
                  <div className="font-bold text-sm text-white">{d.label || d.id}</div>
                  {d.title && <div className="text-[10px] text-hud-cyan uppercase tracking-wider mt-0.5">{d.title}</div>}
                </div>
                <div className={`w-2 h-2 rounded-full mt-1 ${d.verifiedLevel >= 9 ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : d.verifiedLevel >= 7 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Birth</span>
                    <span className="text-gray-300">{d.birthYear}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Death</span>
                    <span className="text-gray-300">{d.deathYear || 'N/A'}</span>
                  </div>
                </div>

                {d.group && (
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase mb-0.5">Lineage Group</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ${
                      d.group === 2 ? 'text-alert-red' : 
                      d.group === 3 ? 'text-hud-cyan' : 
                      d.group === 4 ? 'text-purple-400' : 'text-white'
                    }`}>
                      {d.group === 1 ? 'MODERN / SELF' : 
                       d.group === 2 ? 'MACDONALD / MCCOY' : 
                       d.group === 3 ? 'POWER / IRISH' : 'DUBOIS / HUGUENOT'}
                    </span>
                  </div>
                )}

                {d.verifiedLevel && (
                  <div>
                     <div className="flex justify-between text-[9px] uppercase text-gray-500 mb-1">
                        <span>Source Verification</span>
                        <span>{d.verifiedLevel}/10</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-hud-cyan" style={{ width: `${(d.verifiedLevel / 10) * 100}%` }}></div>
                     </div>
                  </div>
                )}
              </div>
            </div>
          )
        });
        d3.select(event.currentTarget).attr("stroke", "#fff").attr("stroke-width", 3);
      })
      .on("mousemove", (event) => {
        setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
      })
      .on("mouseout", (event) => {
        setTooltip(prev => ({ ...prev, visible: false }));
        d3.select(event.currentTarget).attr("stroke", "#050505").attr("stroke-width", 1.5);
      })
      .call(drag(simulation) as any);

    // Labels attached to 'g'
    const labels = g.append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text((d: any) => d.label || d.id)
        .attr("font-size", "8px")
        .attr("fill", "#bbb")
        .attr("dx", 10)
        .attr("dy", 3)
        .style("font-family", "JetBrains Mono")
        .style("pointer-events", "none");

    // Title Labels attached to 'g'
    const titles = g.append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .filter((d: any) => d.title)
        .append("text")
        .text((d: any) => d.title)
        .attr("font-size", "6px")
        .attr("fill", "#12B5CB")
        .attr("dx", 10)
        .attr("dy", 12)
        .style("font-family", "JetBrains Mono");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
      
      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);

      titles
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, [timelineYear, isFullScreen, layoutMode]);

  return (
    <div 
        ref={containerRef} 
        className={`${isFullScreen ? 'fixed inset-0 z-50 bg-military p-6' : 'relative w-full h-full'} flex flex-col transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-2 px-2 shrink-0 flex-wrap gap-2">
         <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-hud-cyan uppercase hidden md:inline">Temporal Filter</span>
            <div className="flex gap-2 text-[8px] font-mono">
                <span className="text-white">● Modern</span>
                <span className="text-alert-red">● Warlord</span>
                <span className="text-hud-cyan">● Noble</span>
                <span className="text-purple-500">● Huguenot</span>
            </div>
         </div>

         {/* LAYOUT CONTROLS */}
         <div className="flex bg-black/50 border border-white/10 rounded overflow-hidden">
             <button 
                onClick={(e) => { e.stopPropagation(); setLayoutMode('force'); }}
                className={`px-3 py-1 text-[9px] font-mono transition-colors ${layoutMode === 'force' ? 'bg-hud-cyan text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
                FORCE
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); setLayoutMode('tree'); }}
                className={`px-3 py-1 text-[9px] font-mono transition-colors border-l border-white/10 ${layoutMode === 'tree' ? 'bg-hud-cyan text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
                TREE
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); setLayoutMode('radial'); }}
                className={`px-3 py-1 text-[9px] font-mono transition-colors border-l border-white/10 ${layoutMode === 'radial' ? 'bg-hud-cyan text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
                RADIAL
             </button>
         </div>

         <div className="flex items-center gap-4">
             <span className="text-xs font-mono text-white w-8 text-right">{timelineYear}</span>
             {allowFullScreen && (
                 <button 
                    onClick={(e) => { e.stopPropagation(); setIsFullScreen(!isFullScreen); }}
                    className="text-hud-cyan hover:text-white p-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    title={isFullScreen ? "Minimize" : "Full Screen"}
                 >
                    {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                 </button>
             )}
         </div>
      </div>
      <div className={`flex-grow relative border border-white/10 bg-black/20 rounded-md overflow-hidden ${isFullScreen ? 'border-none' : ''}`}>
        <svg ref={svgRef} className="w-full h-full cursor-move"></svg>
        
        {/* Tooltip Overlay */}
        {tooltip.visible && (
          <div 
            className="fixed z-[60] pointer-events-none bg-black/90 border border-white/20 p-3 rounded-lg shadow-2xl backdrop-blur-md transition-opacity duration-150"
            style={{ 
                left: tooltip.x + 15, 
                top: tooltip.y + 15,
                maxWidth: '250px'
            }}
          >
              {tooltip.content}
          </div>
        )}
      </div>
      
      {/* Controls: Timeline & Zoom */}
      <div className="mt-2 px-2 shrink-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="text-[10px] font-mono text-gray-500 block mb-1">TIMELINE LIMIT: {timelineYear}</label>
              <input 
                type="range" 
                min="1500" 
                max="2026" 
                value={timelineYear} 
                onChange={(e) => setTimelineYear(Number(e.target.value))}
                className="w-full h-1 bg-tungsten rounded-lg appearance-none cursor-pointer accent-hud-cyan"
              />
          </div>
          <div className="flex items-center gap-3">
              <ZoomOut size={14} className="text-gray-500" />
              <div className="flex-grow">
                 <label className="text-[10px] font-mono text-gray-500 block mb-1 flex justify-between">
                     <span>ZOOM LEVEL</span>
                     <span>{zoomLevel.toFixed(1)}x</span>
                 </label>
                 <input 
                    type="range" 
                    min="0.1" 
                    max="4" 
                    step="0.1" 
                    value={zoomLevel} 
                    onChange={handleZoomSlider}
                    className="w-full h-1 bg-tungsten rounded-lg appearance-none cursor-pointer accent-hud-cyan"
                 />
              </div>
              <ZoomIn size={14} className="text-gray-500" />
          </div>
      </div>
    </div>
  );
};

export default GenealogyGraph;