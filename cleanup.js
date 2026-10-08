let canvas, ctx, imageObj, startX, startY, drawing=false;
let rects=[];
window.startCleanup=function(src){
  canvas=document.getElementById("canvas");
  ctx=canvas.getContext("2d");
  imageObj=new Image();
  imageObj.onload=()=>{
    const max=900; const scale=Math.min(1,max/imageObj.width);
    canvas.width=imageObj.width*scale; canvas.height=imageObj.height*scale;
    rects=[]; draw();
  };
  imageObj.src=src+"?t="+Date.now();
};
function point(e){const r=canvas.getBoundingClientRect();return{x:Math.max(0,Math.min(canvas.width,e.clientX-r.left)),y:Math.max(0,Math.min(canvas.height,e.clientY-r.top))};}
function draw(temp=null){
  if(!ctx||!imageObj)return;
  ctx.drawImage(imageObj,0,0,canvas.width,canvas.height);
  ctx.strokeStyle="#22c55e"; ctx.lineWidth=3;
  rects.forEach((q,i)=>{ctx.strokeRect(q.x,q.y,q.w,q.h);ctx.fillStyle="rgba(34,197,94,.12)";ctx.fillRect(q.x,q.y,q.w,q.h);ctx.fillStyle="#22c55e";ctx.font="bold 16px Arial";ctx.fillText(String(i+1),q.x+5,q.y+18);});
  if(temp){ctx.strokeStyle="#111827";ctx.setLineDash([6,5]);ctx.strokeRect(temp.x,temp.y,temp.w,temp.h);ctx.setLineDash([]);}
}
canvas?.addEventListener("mousedown",()=>{});
document.addEventListener("mousedown",e=>{if(!canvas||e.target!==canvas)return;const p=point(e);startX=p.x;startY=p.y;drawing=true;});
document.addEventListener("mousemove",e=>{if(!drawing||!canvas||e.target!==canvas)return;const p=point(e);const x=Math.min(startX,p.x),y=Math.min(startY,p.y),w=Math.abs(p.x-startX),h=Math.abs(p.y-startY);draw({x,y,w,h});});
document.addEventListener("mouseup",e=>{if(!drawing||!canvas)return;drawing=false;if(e.target!==canvas)return;const p=point(e);const x=Math.min(startX,p.x),y=Math.min(startY,p.y),w=Math.abs(p.x-startX),h=Math.abs(p.y-startY);if(w>8&&h>8)rects.push({x,y,w,h});draw();});
window.getCleanupRects=function(){return rects.map(r=>({x:r.x/canvas.width*100,y:r.y/canvas.height*100,w:r.w/canvas.width*100,h:r.h/canvas.height*100}));};
window.clearCleanupSelections=function(){rects=[];draw();};
