/**
 * Home page scroll story: the gate opens and we walk the rooms (light, air, green, flow), pull back
 * out to the sky, the villa rises for holistic design, then the featured project. Driven by GSAP
 * ScrollTrigger with Lenis smooth scroll.
 *
 * initHomeStory() runs when the home page mounts and returns a cleanup function that removes every
 * animation, listener and inline style, so navigating to another page and back is safe.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

let introPlayed = false; // the logo loader plays once per visit

export function initHomeStory() {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Touch screens skip the costliest effects (animated blur and colour filters, blurred SVG shadows) so scrolling stays smooth */
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var story = !reduce;
  var alive = true;
  var cleanups = [];
  function listen(target, type, fn, opts) { target.addEventListener(type, fn, opts); cleanups.push(function(){ target.removeEventListener(type, fn, opts); }); }
  var $ = function(s){ return document.querySelector(s); };
  var lenis = null, rafId = 0, mm = null;
  if (story) root.classList.add('story');
  /* Only writes when the tone changes: a custom property set on <html> restyles the whole page, and this runs every scroll frame */
  var toneNow = null;
  function tone(light){
    if (light === toneNow) return;
    toneNow = light;
    root.style.setProperty('--hfg', light ? '#F4EEEA' : '#5C4A32'); root.style.setProperty('--ll', light ? '1' : '0');
  }
  /* .gone also releases the header, which app/globals.css keeps hidden while the loader is up */
  function hideLoader(){ var ld = $('#loader'); if (ld){ ld.style.display = 'none'; ld.classList.add('gone'); } }

  var ctx = gsap.context(function(){
  /* ---------- Arch geometry: one shape drives every window ---------- */
  function archPath(r, open){
    var rad = (r.x1 - r.x0)/2, yc = Math.min(r.top + rad, r.y1);
    var d = 'M'+r.x0+','+r.y1+'L'+r.x0+','+yc+'A'+rad+','+rad+' 0 0 1 '+r.x1+','+yc+'L'+r.x1+','+r.y1;
    return open ? d : d + 'Z';
  }
  function arch(cx, w, h, bottom){ return {x0:cx-w/2, x1:cx+w/2, top:bottom-h, y1:bottom}; }
  function lerp(a,b,t){ return a+(b-a)*t; }
  function lerpR(A,B,t){ return {x0:lerp(A.x0,B.x0,t), x1:lerp(A.x1,B.x1,t), top:lerp(A.top,B.top,t), y1:lerp(A.y1,B.y1,t)}; }
  function scaleR(R, k, px, py){ return {x0:px+(R.x0-px)*k, x1:px+(R.x1-px)*k, top:py+(R.top-py)*k, y1:py+(R.y1-py)*k}; }
  function covers(r, vw, vh){
    if (r.x0 > -2 || r.x1 < vw+2 || r.y1 < vh+2) return false;
    var rad = (r.x1-r.x0)/2, cx = (r.x0+r.x1)/2, yc = r.top + rad;
    if (yc <= -2) return true;
    return Math.hypot(cx, yc) <= rad - 2 && Math.hypot(vw-cx, yc) <= rad - 2;
  }
  function fullR(vw,vh){ var rad=(vw+24)/2; return {x0:-12, x1:vw+12, top:-12-rad, y1:vh+12}; }
  function geo(){
    var vp = $('#vp'), vw = vp.clientWidth, vh = Math.max(560, vp.clientHeight), mob = vw <= 1100, feat, w, h;
    var logoH = (mob ? 84 : Math.max(96, Math.min(vw*.084, 128))) * 542/801;
    var fsH = Math.max(34, Math.min(vw*.086, 56)), hhTop = 18 + logoH + (mob ? 26 : 30);
    $('#stage').style.setProperty('--hhTop', hhTop + 'px');
    var IW = 4000, IH = 1800, DX0 = 1772, DX1 = 2225, DT = 487.5, DB = 1422, sc, tx, ty;
    if (mob){
      sc = Math.max(vh/IH, vw/IW); ty = (vh - IH*sc)/2;
    } else {
      sc = Math.max(vh/IH, vw/IW); ty = vh*.27 - DT*sc;
    }
    ty = Math.min(0, Math.max(vh - IH*sc, ty));
    tx = vw/2 - (DX0 + DX1)/2*sc;
    var ei = $('#entryImg'); ei.style.width = IW*sc + 'px'; ei.style.height = IH*sc + 'px'; ei.style.left = tx + 'px'; ei.style.top = ty + 'px';
    var door = {x0:tx + DX0*sc, x1:tx + DX1*sc, top:ty + DT*sc, y1:ty + DB*sc}, B = 0, Bb = 0;
    $('#stage').style.setProperty('--cueTop', (door.y1 + 16) + 'px');
    if (mob){
      $('#stage').style.setProperty('--doorLeft', door.x0 + 'px');
      $('#stage').style.setProperty('--doorRight', (vw - door.x1) + 'px');
      $('#stage').style.setProperty('--hhATop', (door.top + (door.y1 - door.top)*.08) + 'px');
      /* "Built around better living." stays clear of the right wall lamp (x 2408-2437, y 778-866 in the phone photo,
         entry-wide-v5, padded for its glow): where the lamp falls under the text, as on shorter phones, the text sits just above it */
      var hB = $('#hhB'), bTop = door.top + (door.y1 - door.top)*.20, bL = hB.offsetLeft, bR = bL + hB.offsetWidth, bH = hB.offsetHeight;
      var lamp = {x0:tx + 2398*sc, x1:tx + 2447*sc, top:ty + 740*sc, y1:ty + 885*sc};
      if (lamp.x1 > bL - 6 && lamp.x0 < bR + 6 && lamp.y1 > bTop - 6 && lamp.top < bTop + bH + 6) bTop = Math.max(hhTop, lamp.top - bH - 10);
      $('#stage').style.setProperty('--hhBTop', bTop + 'px');
      /* on short phones the cue (pill + line, about 54px tall) stays clear of the bottom edge */
      $('#stage').style.setProperty('--doorCueTop', Math.min(door.y1 + 16, vh - 96) + 'px');
    }
    var px = vw/2, py = door.top + (door.y1 - door.top)*.56, sMax = 1;
    while (!covers(scaleR(door, sMax, px, py), vw, vh) && sMax < 80) sMax *= 1.04;
    sMax *= 1.06;
    if (mob){
      w = Math.min(vw*.5, vh*.27); h = w*1.36; feat = arch(vw/2, w, h, 100 + h);
    } else {
      w = Math.min(vw*.29, 470); h = Math.min(w*1.42, vh*.72); feat = arch(vw*.72, w, h, vh*.5 + h/2 + 26);
    }
    var pm = vw <= 820, side = Math.max(16, Math.min(vw*.06, 96)), pw, ph, pane;
    if (pm){ pw = Math.min(vw - 32, vh*.52); ph = Math.min(vh*.4, pw*1.12); pane = arch(vw/2, pw, ph, 92 + ph); $('#stage').style.setProperty('--pt', (92 + ph + 22) + 'px'); }
    else { pw = Math.min(vw*.42, 640); ph = Math.min(vh - 150, pw*1.32); pane = arch(vw - side - pw/2, pw, ph, vh - 46); }
    return {vw:vw, vh:vh, u:$('#hsLy').offsetWidth, hero:door, B:B, Bb:Bb, px:px, py:py, sMax:sMax, full:fullR(vw,vh), feat:feat};
  }
  var G = geo();
  var S = {a:0, d:0, x:0};
  var reel = $('#reel'), clips = Array.prototype.slice.call(document.querySelectorAll('#reel video')), vH = clips[1];
  /* Phones and portrait tablets get the portrait cut of each room film; the walk-in loads straight away, the rest on approach.
     Posters are kept in data attributes and attached in wake(), so a phone only fetches its own poster, and only for films it reaches */
  var portrait = window.matchMedia('(orientation: portrait) and (max-width: 1100px)').matches;
  clips.forEach(function(v){
    if (portrait && v.dataset.msrc){ v.dataset.src = v.dataset.msrc; if (v.dataset.mposter) v.dataset.poster = v.dataset.mposter; }
  });
  setPoster(vH);
  wake(vH, true);
  if (coarse) document.querySelectorAll('.inshade').forEach(function(el){ el.style.display = 'none'; });
  /* Every film in the hero moves only with the scroll, never on its own.
     The walk-in tour (clips[1]) is a 40s film, so the hero timeline gives it a stretch of its own: TOUR extra units of timeline
     (scroll) are inserted at TOUR_AT, and everything after is pushed back by that much (see A() and the shiftChildren call
     after the timeline is built). TOUR_AT is just after "What you feel the moment you walk in" has come and gone, so the gate,
     the doors and that line play exactly as they always did; the extra walk comes before the first room chapter. The tour's playhead runs from the gate opening until the light film
     starts to cover it. ROOM is the stretch of the hero timeline over which
     each room film (light, air, green/materials, flow) runs from its first frame to its last: from the moment it starts to
     dissolve in until the next room has fully covered it (see XF below); the flow film finishes as the camera tilts up to the sky */
  /* the green/materials film is short (2.8s), so it runs over a shorter stretch and finishes just before the flow film comes in */
  var ROOM = [null, null, [2.55,4.05], [3.55,5.05], [4.55,5.3], [5.55,6.95]];
  var STARTS = [2.7,3.7,4.7,5.7];
  var TOUR = 5, TOUR_AT = 2.3;
  /* a time on the original hero timeline, moved past the tour's stretch (ROOM and STARTS are shifted in place once tl is built) */
  function A(x){ return x < TOUR_AT ? x : x + TOUR; }
  var WALK = [.3, A(2.55)], walkP = 0, walkS = 0;
  var SCRUB = [];
  /* Every scrubbed film is 24fps. The playhead is snapped to whole frames and only moved when the frame changes, so the gliding
     playhead below never asks the decoder for the same picture twice (each seek is a decode, and that was the lag) */
  var FPS = 24;
  function seekTo(v, p){
    if (!v.duration || v.readyState < 1) return;
    /* the silent play that primes a film for iOS must never leave it running: these films only move with the scroll */
    if (!v.paused && !v._on){ v.pause(); v._f = null; }
    if (v.seeking) return;
    var last = Math.max(0, Math.floor(v.duration * FPS) - 1);
    var n = Math.min(last, Math.round(Math.max(0, p) * last));
    if (n === v._f) return;
    v._f = n;
    v.currentTime = (n + .5) / FPS;
  }
  /* Each playhead glides toward the scroll position instead of jumping to it, so a flick of the wheel or
     a swipe plays as a short run of frames rather than a skip */
  var rooms = [];
  clips.forEach(function(v,i){ if (ROOM[i]) rooms.push({v:v, r:ROOM[i], p:0, s:0}); });
  function seekRooms(){
    rooms.forEach(function(o){
      var d = o.p - o.s;
      o.s = Math.abs(d) < .002 ? o.p : o.s + d*.16;
      seekTo(o.v, o.s);
    });
  }
  function seekWalk(){
    var d = walkP - walkS;
    walkS = Math.abs(d) < .002 ? walkP : walkS + d*.16;
    seekTo(vH, walkS);
  }
  /* Holistic diagram (desktop; phones show the card row instead): every frame it is on screen, each label is placed clear of
     the text and a leader line is drawn from it to its marker on the house, so the lines follow the house as the scene leans */
  var hdg = $('#holDiag'), hdgPts = hdg ? [].slice.call(hdg.querySelectorAll('.hdg-pt')) : [];
  var hdgLines = hdg ? hdg.querySelectorAll('line') : [], hdgDots = hdg ? hdg.querySelectorAll('circle') : [];
  function layoutDiag(){
    if (!hdg || hdg.style.visibility === 'hidden') return;
    var R = hdg.getBoundingClientRect();
    if (!R.width || R.bottom < 0 || R.top > window.innerHeight) return;
    var k = R.width / hdg.offsetWidth;
    function loc(r){ return {x:(r.left - R.left)/k, y:(r.top - R.top)/k, w:r.width/k, h:r.height/k}; }
    var textBottom = loc($('#holText').getBoundingClientRect()).y + $('#holText').offsetHeight + 18;
    var anchors = hdgPts.map(function(li){ return loc(document.querySelector('#hsLy .hmk i[data-k="' + li.dataset.k + '"]').getBoundingClientRect()); });
    var textEl = $('#holText'), textTop = loc(textEl.getBoundingClientRect()).y;
    var heads = [textEl.querySelector('.h2'), textEl.querySelector('.body')].map(function(el){ return loc(el.getBoundingClientRect()); });
    /* two columns beside the house, kept apart and clear of the olives: the lowest label sits at the foot of its tree, the rest
       stack above the canopy, level with their points where they can be, and may rise beside the text but never into it */
    ['l','r'].forEach(function(side){
      var col = hdgPts.map(function(li, i){ return {li:li, a:anchors[i]}; }).filter(function(o){ return o.li.classList.contains(side); });
      col.sort(function(p, q){ return p.a.y - q.a.y; });
      var tree = loc(document.querySelector('#land .olive.' + side).getBoundingClientRect());
      var foot = col.pop(), limit = tree.y - 12, b = loc(foot.li.getBoundingClientRect());
      var clear = heads.every(function(t){ return side === 'l' ? b.x + b.w + 16 < t.x : b.x > t.x + t.w + 16; });
      for (var i = col.length - 1; i >= 0; i--){ col[i].top = Math.min(col[i].a.y - col[i].li.offsetHeight/2, limit - col[i].li.offsetHeight); limit = col[i].top - 12; }
      var next = clear ? textTop : textBottom;
      col.forEach(function(o){ var top = Math.max(next, o.top); o.li.style.top = top + 'px'; next = top + o.li.offsetHeight + 12; });
      var fh = foot.li.offsetHeight;
      foot.li.style.top = Math.min(R.height/k - fh - 8, Math.max(next, tree.y + tree.h + 4, foot.a.y - fh/2)) + 'px';
    });
    hdgPts.forEach(function(li, i){
      var b = loc(li.getBoundingClientRect()), a = anchors[i];
      var x = li.classList.contains('l') ? b.x + b.w : b.x, y = b.y + b.h/2;
      var L = hdgLines[i], C = hdgDots[i];
      L.setAttribute('x1', x.toFixed(1)); L.setAttribute('y1', y.toFixed(1)); L.setAttribute('x2', a.x.toFixed(1)); L.setAttribute('y2', a.y.toFixed(1));
      C.setAttribute('cx', a.x.toFixed(1)); C.setAttribute('cy', a.y.toFixed(1));
    });
  }
  /* The diagram is only laid out while it can be seen: from the moment it comes in (diagOn, set by the hero timeline) until the
     pinned hero has scrolled away. Laying it out reads positions, so doing it on every frame of the page forced extra layout work */
  var diagOn = !story;
  function diagLive(){ return !story || (diagOn && tl && tl.scrollTrigger && window.scrollY < tl.scrollTrigger.end + G.vh); }
  (function scrubLoop(){ if (!alive) return; if (!document.hidden){ seekWalk(); seekRooms(); SCRUB.forEach(function(o){ seekTo(o.v, o.p); }); if (diagLive()) layoutDiag(); } rafId = requestAnimationFrame(scrubLoop); })();
  function setPoster(v){ if (v.dataset.poster && !v.getAttribute('poster')) v.poster = v.dataset.poster; }
  /* The room and featured films are downloaded whole and played from memory. A streamed film can only show a frame once that
     part of the file has arrived, so scrolling ahead of the download froze the picture and then jumped. On a slow connection
     a film that has not arrived within 8s falls back to streaming, so it never stays stuck on its poster.
     The walk-in tour (stream = true) is the first thing seen through the gate, so it streams straight away instead.
     The loading flag is cleared if this run is torn down before the film is in (React runs effects twice in development,
     and leaving it set made the next run skip the film, so nothing showed through the gate). */
  var filmUrls = [];
  cleanups.push(function(){ filmUrls.forEach(function(u){ URL.revokeObjectURL(u); }); });
  function wake(v, stream){
    setPoster(v);
    if (!v.dataset.src || v.getAttribute('src') || v._loading) return;
    v._loading = true;
    var url = v.dataset.src, done = false;
    function use(src){
      if (done || !alive) return;
      done = true;
      v.muted = true; v.src = src; v.preload = 'auto'; v.load();
      /* iOS Safari only shows frames once a film has played: a silent play + pause, then the next seek lands on the right frame */
      var p = v.play(); if (p && p.then) p.then(function(){ if (!v._on) v.pause(); v._f = null; }).catch(function(){});
    }
    if (stream || !window.fetch || !window.URL || !URL.createObjectURL){ use(url); return; }
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function(){ if (ctrl) ctrl.abort(); use(url); }, 8000);
    cleanups.push(function(){ clearTimeout(timer); if (!done){ v._loading = false; if (ctrl) ctrl.abort(); } });
    fetch(url, ctrl ? {signal:ctrl.signal} : undefined)
      .then(function(r){ if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then(function(b){ clearTimeout(timer); if (done || !alive) return; var u = URL.createObjectURL(b); filmUrls.push(u); use(u); })
      .catch(function(){ clearTimeout(timer); use(url); });
  }
  /* iOS Safari ignores preload and only fetches frames once a video has played, so scrubbed films get a silent play + pause */
  function prime(v){ v.muted = true; var p = v.play(); if (p && p.then) p.then(function(){ if (!v._on) v.pause(); }).catch(function(){}); }
  /* While the camera tilts up to the sky the room film's top edge melts into it; the mask is only applied during the tilt */
  var reelclip = $('#reelclip'), tiltMask = '';
  function updTilt(t){
    var m = t > A(6.92) && t < A(8.02) ? 'linear-gradient(180deg,transparent 0%,#000 ' + Math.round(Math.min(1, (t - A(6.92))/.3)*42) + '%)' : '';
    if (m === tiltMask) return;
    tiltMask = m;
    reelclip.style.webkitMaskImage = reelclip.style.maskImage = m;
  }
  function updClips(t){
    updTilt(t);
    /* the room films load as the scroll approaches them (primed for iOS, which only fetches frames after a play) */
    rooms.forEach(function(o){ if (!o.woke && t > o.r[0] - 1.6){ o.woke = true; wake(o.v); prime(o.v); } });
    /* an even pace through the tour; the glide in seekWalk smooths the start and any flick of the wheel */
    walkP = Math.max(0, Math.min(1, (t - WALK[0]) / (WALK[1] - WALK[0])));
    rooms.forEach(function(o){ o.p = Math.max(0, Math.min(1, (t - o.r[0]) / (o.r[1] - o.r[0]))); });
  }
  function wakeFeat(){ wake(vFeat); prime(vFeat); }
  function wakeLand(){ document.querySelectorAll('#land img[data-src]').forEach(function(im){ im.src = im.dataset.src; im.removeAttribute('data-src'); }); }
  var view = $('#view'), vFeat = $('#vFeat'), fvid = $('#fvid'), wall = $('#wall'), portal = $('#portal'), leafL = $('#leafL'), leafR = $('#leafR');
  var shPath = $('#shPath'), dglow = $('#dglow'), scene = $('#scene'), drawn = null;
  function f1(n){ return Math.round(n*10)/10; }
  /* The bezel: the logo's marble arch, padded and lit like an aircraft window surround */
  function buildPortal(){
    var I = G.hero, B = G.B, Bb = G.Bb, O = {x0:I.x0-B, x1:I.x1+B, top:I.top-B, y1:I.y1+Bb};
    $('#bez').innerHTML = '';   /* the photo's own arched frame surrounds the doors */
    var dr = $('#doors'), w = I.x1-I.x0, h = I.y1-I.top;
    dr.style.left = I.x0+'px'; dr.style.top = I.top+'px'; dr.style.width = w+'px'; dr.style.height = h+'px';
    var local = archPath({x0:0, x1:w, top:0, y1:h});
    dr.style.clipPath = dr.style.webkitClipPath = 'path("'+local+'")';
    var svg = doorSVG(w/2, h);
    leafL.innerHTML = svg.replace(/__ID__/g,'L').replace('__FLIP__','');
    leafR.innerHTML = svg.replace(/__ID__/g,'R').replace('__FLIP__','transform="translate('+f1(w/2)+' 0) scale(-1 1)"');
  }
  /* One leaf of a bronze mashrabiya door: frame, a ring of circles, star lattice, gold quatrefoils */
  function doorSVG(lw, h){
    var r = lw, f = Math.max(5, lw*.055), rr = Math.max(3.4, lw*.042), ic = f + rr + 2, sh = f*.75;
    var T = Math.max(20, lw/5.2), a = T*.5, sw = Math.max(1.4, T*.075);
    function shape(i){
      var R = r - i, ye = r - Math.sqrt(Math.max(0, R*R - sh*sh));
      return 'M'+f1(i)+','+f1(h-i)+'L'+f1(i)+','+f1(r)+'A'+f1(R)+','+f1(R)+' 0 0 1 '+f1(r-sh)+','+f1(ye)+'L'+f1(r-sh)+','+f1(h-i)+'Z';
    }
    var outline = 'M0,'+f1(h)+'L0,'+f1(r)+'A'+f1(r)+','+f1(r)+' 0 0 1 '+f1(r)+',0L'+f1(r)+','+f1(h)+'Z';
    var circles = '', step = rr*2.1, y, R = r - ic, th, th0 = Math.acos(-sh/R), x;
    for (y = h - ic; y > r; y -= step) circles += '<circle cx="'+f1(ic)+'" cy="'+f1(y)+'" r="'+f1(rr)+'"/>';
    for (th = Math.PI; th > th0; th -= step/R) circles += '<circle cx="'+f1(r + R*Math.cos(th))+'" cy="'+f1(r - R*Math.sin(th))+'" r="'+f1(rr)+'"/>';
    for (x = ic + step; x < r - sh - rr; x += step) circles += '<circle cx="'+f1(x)+'" cy="'+f1(h-ic)+'" r="'+f1(rr)+'"/>';
    var c = T/2, q = a*.7071, tip = a*.7071*1.0;
    var star = '<rect x="'+f1(c-a/2)+'" y="'+f1(c-a/2)+'" width="'+f1(a)+'" height="'+f1(a)+'"/>'+
               '<rect x="'+f1(c-a/2)+'" y="'+f1(c-a/2)+'" width="'+f1(a)+'" height="'+f1(a)+'" transform="rotate(45 '+f1(c)+' '+f1(c)+')"/>'+
               '<path d="M'+f1(c)+','+f1(c-tip)+'V0M'+f1(c)+','+f1(c+tip)+'V'+f1(T)+'M'+f1(c-tip)+','+f1(c)+'H0M'+f1(c+tip)+','+f1(c)+'H'+f1(T)+'"/>';
    var qr = T*.085, quat = '';
    [[0,0],[T,0],[0,T],[T,T]].forEach(function(p){ quat += '<g transform="translate('+f1(p[0])+' '+f1(p[1])+') rotate(45)"><ellipse rx="'+f1(qr*1.6)+'" ry="'+f1(qr*.7)+'"/><ellipse rx="'+f1(qr*.7)+'" ry="'+f1(qr*1.6)+'"/></g>'; });
    var fi = ic + rr + f*.5;
    return '<svg viewBox="0 0 '+f1(lw)+' '+f1(h)+'" preserveAspectRatio="none"><defs>'+
      '<linearGradient id="br__ID__" x1="0" y1="0" x2="1" y2=".35" spreadMethod="reflect"><stop offset="0" stop-color="#7B6243"/><stop offset=".45" stop-color="#4A3926"/><stop offset=".7" stop-color="#8A6E4A"/><stop offset="1" stop-color="#3E2F20"/></linearGradient>'+
      '<pattern id="st__ID__" patternUnits="userSpaceOnUse" width="'+f1(T)+'" height="'+f1(T)+'"><g fill="none" stroke="#7E6545" stroke-width="'+f1(sw)+'">'+star+'</g><g fill="#C29E62">'+quat+'</g></pattern>'+
      '<clipPath id="cl__ID__"><path d="'+outline+'"/></clipPath>'+
      '<clipPath id="fc__ID__"><path d="'+shape(fi)+'"/></clipPath>'+
      '<linearGradient id="gl__ID__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(255,240,220,.16)"/><stop offset="1" stop-color="rgba(20,14,8,.34)"/></linearGradient>'+
      '</defs><g __FLIP__><g clip-path="url(#cl__ID__)">'+
      '<path d="'+outline+'" fill="url(#gl__ID__)"/>'+
      '<rect width="'+f1(lw)+'" height="'+f1(h)+'" fill="url(#st__ID__)" clip-path="url(#fc__ID__)"/>'+
      '<path d="'+shape(fi)+'" fill="none" stroke="url(#br__ID__)" stroke-width="'+f1(f*.55)+'"/>'+
      '<g fill="none" stroke="url(#br__ID__)" stroke-width="'+f1(Math.max(1.6, rr*.42))+'">'+circles+'</g>'+
      '<path d="'+outline+'" fill="none" stroke="url(#br__ID__)" stroke-width="'+f1(f*2)+'"/>'+
      '<rect x="'+f1(r-sh)+'" y="0" width="'+f1(sh+1)+'" height="'+f1(h)+'" fill="url(#br__ID__)"/>'+
      '<rect x="'+f1(r-sh-f*1.5)+'" y="'+f1(h*.5)+'" width="'+f1(Math.max(3,f*.55))+'" height="'+f1(h*.13)+'" rx="'+f1(f*.3)+'" fill="#C9A66A" stroke="#6B5236" stroke-width=".8"/>'+
      '</g></g></svg>';
  }
  function box(el, r, vw, vh){
    var t = Math.max(r.top, -12), b = Math.min(r.y1, vh+12), l = Math.max(r.x0, -12), rr = Math.min(r.x1, vw+12);
    el.style.left = l+'px'; el.style.top = t+'px'; el.style.width = (rr-l)+'px'; el.style.height = (b-t)+'px';
  }
  /* Draws the gate from S. Runs once per frame after GSAP has rendered, and skips frames where nothing moved;
     force after a geometry change. Reading S here, not in tween callbacks, keeps the doors in step with the
     timeline even when GSAP renders silently (refresh, revert), so a fast scroll back always closes them. */
  function renderStage(force){
    if (!force && drawn && drawn.a === S.a && drawn.d === S.d && drawn.x === S.x) return;
    if (force || !drawn){
      wall.style.transformOrigin = portal.style.transformOrigin = G.px+'px '+G.py+'px';
      /* the rooms fill the screen until the camera tilts up to the sky (S.x) */
      box(reel, G.full, G.vw, G.vh);
    }
    drawn = {a:S.a, d:S.d, x:S.x};
    var k = Math.pow(G.sMax, S.a), r = scaleR(G.hero, k, G.px, G.py);
    view.style.clipPath = view.style.webkitClipPath = 'path("'+archPath(r)+'")';
    if (S.a < .03){ shPath.style.display = ''; shPath.setAttribute('d', archPath(r, true)); } else shPath.style.display = 'none';
    wall.style.transform = portal.style.transform = 'scale('+k+')';
    dglow.style.opacity = Math.max(0, 1 - S.d*1.6);
    leafL.style.transform = 'rotateY('+(S.d*84)+'deg)';
    leafR.style.transform = 'rotateY('+(-S.d*84)+'deg)';
    scene.style.visibility = S.x > 0 || !story ? 'visible' : 'hidden';
  }

  /* ---------- Featured project stage: she stands by the sea, it dissolves into her bedroom, she sits down at home ---------- */
  /* On desktop the film eases right as the project text comes in beside her: a slight zoom lets it move without ever
     uncovering the background, so the text sits on the film itself with no edge between them.
     FEAT_SHIFT is at most (FEAT_ZOOM - 1) / 2 * 100, or the left edge of the film would show. */
  var FEAT_ZOOM = 1.15, FEAT_SHIFT = 7;
  /* Phones and tablets get a lighter cut of the featured film */
  if (window.matchMedia('(max-width: 1100px)').matches && vFeat.dataset.msrc) vFeat.dataset.src = vFeat.dataset.msrc;
  function regeo(){ G = geo(); buildPortal(); renderStage(true); }

  buildPortal();
  if (story) prime(vH);

  /* ---------- Static mode (reduced motion): every chapter reads as a normal page ---------- */
  if (!story){
    hideLoader();
    regeo();
    $('#fshade').style.opacity = 1;
    if (window.innerWidth > 1100) vFeat.style.transform = 'translateX(' + FEAT_SHIFT + '%) scale(' + FEAT_ZOOM + ')';
    listen(vFeat, 'loadedmetadata', function(){ vFeat.currentTime = vFeat.duration - .05; });
    wakeFeat(); wakeLand();
    tone(false);
    listen(window, 'resize', regeo);
    return;
  }

  /* ---------- Story mode ---------- */
  /* The story always opens at the closed gate: no restored scroll from a reload, and no leftover scroll from the
     page we came from (this runs before Next scrolls a new route to the top) */
  ScrollTrigger.clearScrollMemory('manual');
  window.scrollTo(0, 0);
  cleanups.push(function(){ ScrollTrigger.clearScrollMemory('auto'); });
  var drawTick = function(){ renderStage(); };
  gsap.ticker.add(drawTick);
  cleanups.push(function(){ gsap.ticker.remove(drawTick); });
  gsap.set(root, {'--bg':'#ECE3E2', '--fg':'#5C4A32', '--rule':'rgba(92,74,50,.28)'});
  try {
    if (!window.matchMedia('(pointer: coarse)').matches){
      /* Lenis follows the wheel's own direction (and so the system's natural-scrolling setting); lerp .1 settles quickly */
      lenis = new Lenis({lerp:.1, wheelMultiplier:1});
      lenis.on('scroll', ScrollTrigger.update);
      var lenisRaf = function(t){ lenis.raf(t*1000); };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(function(){ gsap.ticker.remove(lenisRaf); gsap.ticker.lagSmoothing(500, 33); });
    }
  } catch(e){ lenis = null; }

  /* Scrubbed text fades and drifts; no animated blur, which re-paints large blocks every frame and makes scrolling lag */
  var blurIn = {autoAlpha:1, y:0, duration:.35, ease:'power2.out'};
  var blurOut = {autoAlpha:0, y:-24, duration:.3, ease:'power2.in'};
  gsap.set(['#sayH','#sayA','#sayB','#feat','#featQ'], {autoAlpha:0, y:26});
  gsap.set('#feat > *', {autoAlpha:0, y:18});

  renderStage(true);

  var panes = gsap.utils.toArray('.pane'), idx = gsap.utils.toArray('#hlIndex li');
  gsap.set(panes, {autoAlpha:0, y:30});
  gsap.set(['#hlIndex','#holText','#holDiag'], {autoAlpha:0});
  gsap.set('#reelclip', {opacity:1});
  var tl = gsap.timeline({defaults:{ease:'none'},
    onUpdate:function(){ var t = tl.time(), k = 0; diagOn = t > A(10.6); if (t > A(4.5)) wakeLand(); STARTS.forEach(function(st,i){ if (t + .2 >= st) k = i; }); idx.forEach(function(li,i){ li.classList.toggle('on', i===k); }); updClips(t); updTone(); },
    /* touch scrolling has no Lenis smoothing, so the scrub itself trails a little further behind the finger. With Lenis the
       scroll is already smoothed, so a shorter scrub keeps the scene from lagging behind the wheel */
    scrollTrigger:{trigger:'#stage', start:'top top', end:'+=' + Math.round(1480 * (12.5 + TOUR) / 12.5) + '%', scrub:lenis ? .5 : 1.1, pin:true, invalidateOnRefresh:true}});
  /* The doors swing open softly, and the walk through starts while they are still moving so the two read as one
     motion; a gentle ease-in on the zoom keeps it from lurching at the end (the scale is already exponential) */
  tl.to('#cue', {autoAlpha:0, y:12, duration:.15, ease:'power1.in'}, 0)
    .to(S, {d:1, duration:.6, ease:'sine.inOut'}, 0)
    .to('#hhA', {autoAlpha:0, x:-90, duration:.4}, 0)
    .to('#hhB', {autoAlpha:0, x:90, duration:.4}, 0)
    .to(['#hb','#hv'], {autoAlpha:0, duration:.22}, 0)
    .to(S, {a:1, duration:1, ease:'power1.in'}, .3)
    .to(['#portal','#wall'], {autoAlpha:0, duration:.16}, 1.12)
    /* through the gate: walk in, then light, air, green and flow */
    .to('#sayH', blurIn, 1.45)
    .to('#sayH', blurOut, 2.15)
    .to('#dim', {autoAlpha:1, duration:.3}, 2.30)
    .to('#hlIndex', {autoAlpha:1, duration:.2}, 2.40);
  /* Each room dissolves into the next: the incoming film fades up over the outgoing one while settling from a slight zoom,
     and the outgoing one drifts a touch closer as it goes, so the change reads as one soft camera move rather than a cut.
     The outgoing film is hidden once it is fully covered (ROOM above runs its playhead to the end by then) */
  var XF = .5;
  [2,3,4,5].forEach(function(i){
    var at = i + .55;
    tl.fromTo(clips[i], {opacity:0, scale:1.06}, {opacity:1, scale:1, duration:XF, ease:'sine.inOut'}, at)
      .to(clips[i-1], {scale:1.04, duration:XF, ease:'sine.inOut'}, at)
      .set(clips[i-1], {opacity:0}, at + XF);
  });
  panes.forEach(function(p,i){
    var at = STARTS[i];
    tl.to(p, {autoAlpha:1, y:0, duration:.3, ease:'power2.out'}, at);
    tl.to(p, {autoAlpha:0, y:-30, duration:.25, ease:'power2.in'}, at + (i < panes.length-1 ? .72 : 1.15));
  });
  /* out to the sky: the camera tilts up, the room drops away below and the sunset sky comes down */
  tl.to(['#dim','#hlIndex'], {autoAlpha:0, duration:.3}, 6.85)
    .to(S, {x:1, duration:.05}, 6.92)
    .to('#reelclip', {yPercent:100, duration:1.05, ease:'power2.inOut'}, 6.95)
    /* the films overhang the screen by 12px, so once the room has dropped away hide it, or its top edge shows under the garden */
    .set('#reelclip', {autoAlpha:0}, 8.0)
    .fromTo('#scene', {yPercent:-35}, {yPercent:0, duration:1.05, ease:'power2.inOut'}, 6.95)
    .fromTo('#skybg', {scale:1.22, yPercent:5}, {scale:1.04, yPercent:0, duration:2.4}, 6.95)
    /* the garden: the camera cranes down out of the sky and dollies in, so the near planting rises faster than the house behind it */
    .fromTo('#rig', {x:function(){ return G.u*.12; }, y:function(){ return G.vh*1.1; }, z:function(){ return -G.u*1.2; }}, {x:0, y:0, z:0, duration:2.3, ease:'power2.out'}, 8.15)
    .fromTo('#hsLy img', coarse ? {autoAlpha:0, yPercent:30} : {autoAlpha:0, yPercent:30, filter:'brightness(.7) saturate(.8)'}, {autoAlpha:1, yPercent:0, duration:.8, ease:'power2.out'}, 8.55)
    .fromTo('#land .palm img', {autoAlpha:0, yPercent:22, scaleX:.8, scaleY:.6}, {autoAlpha:1, yPercent:0, scaleX:1, scaleY:1, duration:.75, stagger:.1, ease:'back.out(1.3)'}, 8.75)
    .fromTo('#land .bed img', {autoAlpha:0, yPercent:45, scaleY:.5}, {autoAlpha:1, yPercent:0, scaleY:1, duration:.6, stagger:.1, ease:'power3.out'}, 9.10)
    .fromTo('#land .pot img', {autoAlpha:0, yPercent:10}, {autoAlpha:1, yPercent:0, duration:.5, stagger:.08, ease:'power3.out'}, 9.25)
    /* dusk settles and the house lights come up, softly */
    .fromTo('#dusk', {autoAlpha:0}, {autoAlpha:.6, duration:1.2}, 9.30)
    .to('#hsLy img', coarse ? {duration:.6} : {filter:'brightness(.93) saturate(.95)', duration:.6}, 9.75)
    .fromTo(['#land .glow span','#land .pod b.lt'], {autoAlpha:0}, {autoAlpha:.55, duration:.6}, 9.80)
    .to('#holText', blurIn, 10.45)
    .fromTo('#land .hcard', {rotationX:-80, y:30, autoAlpha:0}, {rotationX:16, y:0, autoAlpha:1, duration:.45, stagger:.08, ease:'back.out(1.7)'}, 10.70)
    .to('#holDiag', {autoAlpha:1, duration:.01}, 10.65)
    .fromTo('#holDiag .hdg-pt', {autoAlpha:0, y:14}, {autoAlpha:1, y:0, duration:.45, stagger:.08, ease:'power3.out'}, 10.70)
    .fromTo('#holDiag line', {strokeDashoffset:1}, {strokeDashoffset:0, duration:.5, stagger:.08, ease:'power2.out'}, 10.80)
    .fromTo('#holDiag circle', {autoAlpha:0}, {autoAlpha:1, duration:.3, stagger:.08}, 10.80)
    .to({}, {duration:.1}, 12.40);
  /* make room for the walk-in tour: everything from the end of the gate on moves back by TOUR, and so do the film ranges */
  tl.shiftChildren(TOUR, false, TOUR_AT);
  ROOM.forEach(function(r){ if (r){ r[0] += TOUR; r[1] += TOUR; } });
  STARTS.forEach(function(v, i){ STARTS[i] = v + TOUR; });

  /* Lean into the garden with the pointer */
  if (window.matchMedia('(pointer: fine)').matches){
    var leanX = gsap.quickTo('#lean', 'x', {duration:1.2, ease:'power3.out'}), leanY = gsap.quickTo('#lean', 'y', {duration:1.2, ease:'power3.out'});
    listen(window, 'pointermove', function(e){ leanX((.5 - e.clientX/G.vw) * G.u * .06); leanY((.5 - e.clientY/G.vh) * G.u * .025); });
  }

  /* Featured project: one film, full screen throughout. She stands at the edge of the sea (0-3s), the sea dissolves into
     her sunlit bedroom (3-4s), she walks to the bed and sits (seated by about 7.3s). The linen shade comes up on the left
     for the project text as she sits, and on desktop the film eases right so she stays clear of the text. The playhead
     follows the scroll: sea 0-1.6, the dissolve and her first steps 1.6-2.4, sitting down 2.4-4.0 (timeline time); the
     project text merges in at 2.95, film about 6.2s. */
  var FD = 8.25;
  function featTime(t){
    if (t < 1.6) return t/1.6 * 3.0;
    if (t < 2.4) return 3.0 + (t - 1.6)/.8 * 2.2;
    return Math.min(FD - .05, 5.2 + (t - 2.4)/1.6 * (FD - .05 - 5.2));
  }
  SCRUB = [{v:vFeat, p:0}];
  var t2 = gsap.timeline({defaults:{ease:'none'}, onUpdate:function(){ SCRUB[0].p = featTime(t2.time())/FD; updTone(); }, scrollTrigger:{trigger:'#fstage', start:'top top', end:'+=700%', scrub:lenis ? .4 : .6, pin:true, invalidateOnRefresh:true}});
  t2.to('#sayA', blurIn, .45)
    .to('#sayA', blurOut, 1.2)
    .to('#sayB', blurIn, 1.45)
    .to('#sayB', blurOut, 2.0)
    /* she is home: the shade comes up for the project text beside her */
    .to('#fshade', {opacity:1, duration:.6}, 2.45)
    .to('#vFeat', {xPercent:function(){ return window.innerWidth > 1100 ? FEAT_SHIFT : 0; }, scale:function(){ return window.innerWidth > 1100 ? FEAT_ZOOM : 1; }, duration:.75, ease:'power2.inOut'}, 2.45)
    .to('#feat', {autoAlpha:1, y:0, duration:.3}, 2.95)
    .to('#feat > *', {autoAlpha:1, y:0, duration:.35, stagger:.07, ease:'power2.out'}, 2.95)
    .to('#featQ', blurIn, 3.3)
    .to({}, {duration:.5}, 4.3);
  ScrollTrigger.create({trigger:'#fstage', start:'top bottom+=150%', once:true, onEnter:wakeFeat});

  /* The same arch passes into the founder section as Roula's portrait appears. Her portrait shares the arch's column
     and size, so from the moment the process pin releases until the portrait settles mid-screen the arch glides in screen
     space from where it was held to where the portrait comes to rest (on desktop it simply stays put). Both ends are read
     live, so the hand-off is exact. Used by both the desktop and the phone process. */
  function handOff(pin){
    var processVisual = $('.process-visual');
    var processSlot = $('.process-media');
    var founderPhoto = $('#fdTeaser .ph');
    var glideEase = gsap.parseEase('power2.inOut');
    var phone = window.innerWidth <= 820;
    var glideProgress = {p:0};
    gsap.set(processVisual, {zIndex:2});
    gsap.set(founderPhoto, {autoAlpha:0});
    gsap.set('.process-founder', {autoAlpha:0});
    function glide(self){
      if (!alive || !self) return;
      var p = phone ? glideProgress.p : self.progress, y = self.scroll();
      var landed = p >= 1;
      gsap.set(founderPhoto, {autoAlpha:landed ? 1 : 0});
      gsap.set(processVisual, {autoAlpha:landed ? 0 : 1});
      gsap.set('.process-founder', {autoAlpha:gsap.utils.clamp(0, 1, p / .3)});
      if (p <= 0) { gsap.set(processVisual, {x:0, y:0, clearProps:'width,height'}); return; }
      var slot = processSlot.getBoundingClientRect(), to = founderPhoto.getBoundingClientRect();
      var pastEnd = Math.max(0, y - self.end);
      var fromTop = slot.top + (y - self.start) - pastEnd, toTop = to.top - Math.max(0, self.end - y);
      var e = glideEase(p);
      gsap.set(processVisual, {
        x:(to.left - slot.left) * e,
        y:toTop * e + fromTop * (1 - e) - slot.top,
        width:to.width * e + slot.width * (1 - e),
        height:to.height * e + slot.height * (1 - e)
      });
    }
    if (phone){
      var glideTween = gsap.to(glideProgress, {
        p:1, ease:'none',
        onUpdate:function(){ if (glideTween) glide(glideTween.scrollTrigger); },
        scrollTrigger:{
          trigger:founderPhoto, start:function(){ return pin.end; }, end:'center center',
          scrub:.65, invalidateOnRefresh:true,
          onRefresh:function(self){ glideProgress.p = self.progress; glide(self); }
        }
      });
    } else {
      ScrollTrigger.create({
        trigger:founderPhoto, start:function(){ return pin.end; }, end:'center center',
        invalidateOnRefresh:true, onUpdate:glide, onRefresh:glide, onLeave:glide, onLeaveBack:glide
      });
    }
  }

  /* Process: the image and timeline share one continuous scroll. */
  var processMedia = gsap.matchMedia();
  cleanups.push(function(){ processMedia.revert(); });
  processMedia.add('(min-width: 821px)', function(){
    var frames = gsap.utils.toArray('.process-frame');
    var steps = gsap.utils.toArray('.process-steps li');
    var activeStep = -1;
    function focusStep(index){
      if (index === activeStep) return;
      activeStep = index;
      gsap.to(frames, {autoAlpha:function(i){ return i === index ? 1 : 0; }, duration:.45, overwrite:true});
      gsap.to(steps, {opacity:function(i){ return i === index ? 1 : .42; }, duration:.35, overwrite:true});
    }
    focusStep(0);
    var processPin = gsap.to('.process-steps', {
      y:function(){ return -Math.max(0, $('.process-steps').scrollHeight - $('.process-window').clientHeight + 48); },
      ease:'none',
      scrollTrigger:{trigger:'#homeProcess', start:'top top', end:'+=160%', pin:true, scrub:lenis ? .45 : .7, invalidateOnRefresh:true,
        onUpdate:function(self){ focusStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))); }}
    }).scrollTrigger;

    handOff(processPin);
    return function(){ gsap.killTweensOf(frames); gsap.killTweensOf(steps); };
  });
  /* Phones: the section is held while the steps take turns in one slot, each sliding out to the left as the next comes in
     from the right, with its image changing above */
  processMedia.add('(max-width: 820px)', function(){
    var frames = gsap.utils.toArray('.process-frame');
    var steps = gsap.utils.toArray('.process-steps li');
    gsap.set(steps, {autoAlpha:function(i){ return i ? 0 : 1; }, x:function(i){ return i ? 70 : 0; }});
    gsap.set(frames, {autoAlpha:function(i){ return i ? 0 : 1; }});
    var swap = gsap.timeline({defaults:{ease:'power2.inOut'}, scrollTrigger:{
      trigger:'#homeProcess', start:'top top', end:function(){ return '+=' + window.innerHeight * .8 * (steps.length - 1); },
      pin:true, scrub:.5, anticipatePin:1, invalidateOnRefresh:true
    }});
    steps.forEach(function(step, i){
      if (!i) return;
      swap.to(steps[i-1], {x:-70, autoAlpha:0, duration:.45}, i - 1)
        .fromTo(step, {x:70, autoAlpha:0}, {x:0, autoAlpha:1, duration:.45, immediateRender:false}, i - .8)
        .to(frames[i], {autoAlpha:1, duration:.4}, i - .9)
        .to(frames[i-1], {autoAlpha:0, duration:.4}, i - .7);
    });
    swap.to({}, {duration:.3});
    handOff(swap.scrollTrigger);
  });

  /* Headings come into focus like clouds clearing. Opacity rather than autoAlpha: visibility:hidden would take the
     headings out of the accessibility tree until scrolled to, so screen readers could not find them */
  gsap.utils.toArray('.hl-intro > *, .process-heading > *, .dt-head > *, .fd .tx > *, .close .a > *, .close .b > *').forEach(function(el){
    gsap.from(el, Object.assign({opacity:0, y:28, duration:1.1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 88%', toggleActions:'play none none reverse'}}, coarse ? {} : {filter:'blur(12px)'}));
  });

  /* Quieter details: the cards pass sideways while the section is pinned, on every screen size */
  mm = gsap.matchMedia();
  mm.add('all', function(){
    var cards = $('#cards');
    var details = $('#dt');
    function cardTravel(){ return Math.max(0, cards.scrollWidth - details.clientWidth); }
    gsap.timeline({scrollTrigger:{
      trigger:details, start:'top top',
      end:function(){ return '+=' + (cardTravel() + window.innerHeight * .35); },
      /* anticipatePin only helps native (touch) scrolling; with Lenis it nudges the section a few pixels as the pin starts */
      scrub:lenis ? .4 : .6, pin:true, anticipatePin:lenis ? 0 : 1, invalidateOnRefresh:true
    }})
      .fromTo(cards, {x:0}, {x:function(){ return -cardTravel(); }, duration:1, ease:'none'})
      .to({}, {duration:.2}); // Keep the final arch fully in view before the section releases.
  });

  ScrollTrigger.sort();

  /* Founder photo drifts inside its arch */
  gsap.fromTo('.fd .ph img, .process-founder-portrait', {yPercent:-6}, {yPercent:4, ease:'none', scrollTrigger:{trigger:'.fd', start:'top bottom', end:'bottom top', scrub:true}});

  /* The studio name between the founder and the close: its tracking opens out as it scrolls in, and it drifts slower than the page */
  gsap.fromTo('.wordmark', {'--ls':.02}, {'--ls':.14, ease:'none',
    scrollTrigger:{trigger:'#wordmark', start:'top bottom', end:'top 40%', scrub:true}});
  gsap.fromTo('.wordmark', {yPercent:-25}, {yPercent:25, ease:'none',
    scrollTrigger:{trigger:'#wordmark', start:'top bottom', end:'bottom top', scrub:true}});
  /* On phones the close and footer fill the screen at the foot of the page, which would leave the studio name under the
     header: it fades away as the close rises, and returns on the way back */
  var markMedia = gsap.matchMedia();
  cleanups.push(function(){ markMedia.revert(); });
  markMedia.add('(max-width: 820px)', function(){
    gsap.fromTo('#wordmark', {autoAlpha:1}, {autoAlpha:0, ease:'none', immediateRender:false,
      scrollTrigger:{trigger:'#closeSec', start:'clamp(top 40%)', end:'clamp(top 10%)', scrub:true}});
  });
  /* On tall screens the end of the founder section stays in view above the close: it fades away as the close rises (and returns on the way back), so only the close and footer remain at the foot of the page */
  gsap.fromTo('#fdTeaser .tx', {autoAlpha:1}, {autoAlpha:0, ease:'none', immediateRender:false,
    scrollTrigger:{trigger:'#closeSec', start:'clamp(top 50%)', end:'max', scrub:true}});

  /* One backdrop: linen → olive → walnut */
  gsap.timeline({scrollTrigger:{trigger:'#fdTeaser', start:'top 75%', end:'top 25%', scrub:true}})
    .to(root, {'--bg':'#6B6A3F', '--fg':'#F4EEEA', '--rule':'rgba(244,238,234,.3)', ease:'none'});
  gsap.timeline({scrollTrigger:{trigger:'#closeSec', start:'top 80%', end:'top 35%', scrub:true}})
    .to(root, {'--bg':'#5C4A32', ease:'none'});

  /* Header tone: cream over the dark hero and the olive/walnut close; walnut over the villa, the light featured film and linen */
  var fdST = ScrollTrigger.create({trigger:'#fdTeaser', start:'top 45%'});
  function updTone(){
    if (!alive || !tl || !tl.scrollTrigger) return;
    var y = window.scrollY;
    var inHero = y < tl.scrollTrigger.end - 2 && tl.time() > 1.0 && tl.time() < A(7.3);   /* the sunset sky is light: walnut header there */
    tone(inHero || (fdST && y >= fdST.start));
  }
  ScrollTrigger.create({start:0, end:'max', onUpdate:updTone});

  /* The header stays in view for the whole page (it used to tuck away while scrolling down); only its tone changes, above */

  listen(window, 'resize', regeo);
  var onRefreshInit = function(){ if (alive){ G = geo(); buildPortal(); } };
  var onRefresh = function(){ if (alive){ renderStage(true); } };
  ScrollTrigger.addEventListener('refreshInit', onRefreshInit);
  ScrollTrigger.addEventListener('refresh', onRefresh);
  cleanups.push(function(){ ScrollTrigger.removeEventListener('refreshInit', onRefreshInit); ScrollTrigger.removeEventListener('refresh', onRefresh); });
  tone(false);
  requestAnimationFrame(function(){ if (!alive) return; regeo(); ScrollTrigger.refresh(); regeo(); });

  /* ---------- Loader: the logo comes into focus, then the entrance behind it ---------- */
  var ld = $('#loader'), pct = $('#ldPct');
  if (introPlayed){ hideLoader(); }
  else {
    /* Hold the page at the closed gate until the intro has finished, so a scroll under the loader can't open it unseen */
    var holdKeys = [' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    var hold = function(e){ if (e.type !== 'keydown' || holdKeys.indexOf(e.key) > -1) e.preventDefault(); };
    var held = ['wheel', 'touchmove', 'keydown'];
    held.forEach(function(t){ window.addEventListener(t, hold, {passive:false}); });
    if (lenis) lenis.stop();
    var release = function(){
      held.forEach(function(t){ window.removeEventListener(t, hold, {passive:false}); });
      held = [];
      if (lenis && alive) lenis.start();
    };
    cleanups.push(release);
    gsap.set('#ldLogo', {autoAlpha:0, scale:.94, filter:'blur(14px)'});
    var prog = {v:0}, ready = false, minDone = false;
    var markReady = function(){ ready = true; };
    listen(vH, 'loadeddata', markReady, {once:true});
    listen(vH, 'error', markReady, {once:true});
    if (vH.readyState >= 2) ready = true;
    var safety = setTimeout(markReady, 3800);
    cleanups.push(function(){ clearTimeout(safety); });
    var intro = gsap.timeline();
    intro.to('#ldLogo', {autoAlpha:1, scale:1, filter:'blur(0px)', duration:1.6, ease:'power3.out'}, .1)
         .to(prog, {v:86, duration:1.5, ease:'power1.out', onUpdate:function(){ pct.textContent = String(Math.round(prog.v)).padStart(3,'0'); }}, 0)
         .add(function(){ minDone = true; });
    (function wait(){
      if (!alive) return;
      if (!(ready && minDone)){ var t = setTimeout(wait, 80); cleanups.push(function(){ clearTimeout(t); }); return; }
      ctx.add(function(){
        gsap.timeline({onComplete:function(){ hideLoader(); introPlayed = true; ScrollTrigger.refresh(); release(); }})
          .to(prog, {v:100, duration:.35, onUpdate:function(){ pct.textContent = String(Math.round(prog.v)).padStart(3,'0'); }})
          .to('.loader .meta', {autoAlpha:0, duration:.4}, '+=.15')
          .to('#ldLogo', {autoAlpha:0, scale:1.06, filter:'blur(10px)', duration:.8, ease:'power2.in'}, '<')
          .to(ld, {backgroundColor:'rgba(239,231,220,0)', duration:1, ease:'power2.inOut'}, '-=.3')
          .from('#portal', {autoAlpha:0, duration:1.1, ease:'power2.out'}, '-=.8')
          /* the header comes in with the gate, once the loader logo has gone (an explicit 0 to 1: app/globals.css hides it while the loader is up) */
          .fromTo('#hdr', {autoAlpha:0}, {autoAlpha:1, duration:.8, ease:'power3.out'}, '<')
          .from(['#hhA','#hhB','#hb','#hv'], Object.assign({autoAlpha:0, y:24, duration:1.1, stagger:.1, ease:'power3.out'}, coarse ? {} : {filter:'blur(12px)'}), '-=.6')
          .from('#cue', {autoAlpha:0, y:-8, duration:.9, ease:'power2.out'}, '-=.3');
      });
    })();
  }
  /* regeo again once the web fonts are in, since the phone layout measures the hero text */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ if (alive){ regeo(); ScrollTrigger.refresh(); } });
  });

  return function cleanup(){
    alive = false;
    cancelAnimationFrame(rafId);
    cleanups.forEach(function(f){ f(); });
    if (mm) mm.revert();
    ctx.revert();
    if (lenis) lenis.destroy();
    document.querySelectorAll('#reel video, #vFeat').forEach(function(v){ v.pause(); });
    root.classList.remove('story');
    ['--bg','--fg','--rule','--hfg','--ll'].forEach(function(p){ root.style.removeProperty(p); });
  };
}
