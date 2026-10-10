(() => {
  'use strict';
  const canvas = document.querySelector('#globe');
  const toggle = document.querySelector('#motion-toggle');
  const ctx = canvas.getContext('2d');
  if (!ctx) { toggle.hidden = true; return; }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches, visible = true, angle = .35, frame = 0, last = 0;
  let width = 0, height = 0;
  const nodes = [];
  // Deterministic abstract network points. No geographic or telemetry claims.
  for (let i = 0; i < 105; i++) {
    const y = 1 - (i / 104) * 2;
    const radius = Math.sqrt(1 - y * y);
    const phase = i * Math.PI * (3 - Math.sqrt(5));
    nodes.push([Math.cos(phase) * radius, y, Math.sin(phase) * radius]);
  }
  function project(x, y, z) {
    const rx = x * Math.cos(angle) + z * Math.sin(angle);
    const rz = z * Math.cos(angle) - x * Math.sin(angle);
    const tilt = -.18;
    const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
    const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
    const r = Math.min(width * .375, height * .365);
    return [width / 2 + rx * r, height / 2 + ry * r, depth];
  }
  function path(points, color, lineWidth = .6) {
    ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const r = Math.min(width * .375, height * .365);
    const glow = ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,r*1.25);
    glow.addColorStop(0,'rgba(70,40,115,.18)');glow.addColorStop(1,'rgba(70,40,115,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    ctx.beginPath();ctx.ellipse(width/2,height/2,r*1.17,r*.37,-.4,0,Math.PI*2);ctx.strokeStyle='rgba(140,106,205,.24)';ctx.lineWidth=.8;ctx.stroke();
    for (let latitude = -60; latitude <= 60; latitude += 20) {
      const a=latitude*Math.PI/180, points=[];
      for(let j=0;j<=100;j++){const t=j/100*Math.PI*2;points.push(project(Math.cos(a)*Math.cos(t),Math.sin(a),Math.cos(a)*Math.sin(t)));}
      path(points,'rgba(134,105,193,.21)');
    }
    for(let longitude=0;longitude<180;longitude+=20){const a=longitude*Math.PI/180, points=[];
      for(let j=0;j<=100;j++){const t=j/100*Math.PI*2;points.push(project(Math.cos(t)*Math.cos(a),Math.sin(t),Math.cos(t)*Math.sin(a)));}
      path(points,'rgba(134,105,193,.21)');
    }
    const projected=nodes.map(n=>project(...n));
    for(let i=0;i<nodes.length;i++){
      if(projected[i][2]<0)continue;
      for(let j=i+1;j<nodes.length;j++){
        if(projected[j][2]<0)continue;
        const d=nodes[i].reduce((s,v,k)=>s+(v-nodes[j][k])**2,0);
        if(d<.17)path([projected[i],projected[j]],'rgba(167,139,250,.25)',.65);
      }
      const [x,y,z]=projected[i];ctx.beginPath();ctx.arc(x,y,i%13===0?2.5:1.2,0,Math.PI*2);ctx.fillStyle=`rgba(194,172,255,${.35+z*.6})`;ctx.fill();
      if(i%13===0){ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.strokeStyle='rgba(167,139,250,.23)';ctx.stroke();}
    }
  }
  function animate(now){frame=0;if(paused||!visible||document.hidden)return;if(last)angle+=Math.min(now-last,50)*.000075;last=now;draw();frame=requestAnimationFrame(animate);}
  function sync(){cancelAnimationFrame(frame);frame=0;last=0;toggle.textContent=paused?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));draw();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(animate);}
  function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  toggle.addEventListener('click',()=>{paused=!paused;sync();});
  preference.addEventListener('change',()=>{paused=preference.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  resize();sync();
})();
