<?php
/**
 * Alma e Imagen · The Academy — DISEÑO DE CLASE (estilo app) sobre Tutor LMS 4.
 * Snippet "Diseño de clase" (Code Snippets #15).
 *
 * Tutor 4 cambió la página de clase: el "spotlight" de Tutor 3 pasó a ser el área de
 * aprendizaje .tutor-learning-area, con:
 *   - menú lateral .tutor-learning-sidebar → módulos .tutor-learning-nav-topic
 *     (título .tutor-learning-nav-header-title) → clases a.tutor-learning-nav-item
 *     (.active = la actual; completada = ícono con círculo verde #0BB01B);
 *   - video .tutor-lesson-video-wrapper (Plyr);
 *   - botón .tutor-mark-as-complete-button dentro de un form POST (tutor_complete_lesson).
 *
 * Se arma #aei-clase (hero del módulo + progreso + video + "Clase 0X" + botones + lista de
 * clases del módulo + tarjeta de felicitación con el siguiente módulo) y se oculta la UI
 * nativa SOLO cuando todo salió bien (body.aei-clase-ready). Si algo falla, se ve Tutor
 * tal cual. "Clase con contenido propio" (#26) y "Clase Movil" (#18) se apoyan en los
 * mismos ids/clases: #aei-clase, #aei-vcard, .linfo, .ldesc, .actions, .grid.
 */
add_action('wp_footer', function () {
    if (!function_exists('is_singular') || !is_singular('lesson')) return;
    ?>
    <style id="aei-clase-vercel-css">
      :root{--aei-ink:#2A1622;--aei-ink-soft:#5C4150;--aei-ink-muted:#8A7280;--aei-blush:#FFF6FA;--aei-cream:#FDD7E9;--aei-brand600:#D6207E;--aei-brand700:#AE1565;--aei-plum:#B5179E;--aei-dark:#5E0935;}
      body.aei-clase-ready .tutor-learning-area{ display:none !important; }
      body.aei-clase-ready .tutor-learning-page{ background:var(--aei-blush); }
      #aei-clase{ font-family:'Montserrat',sans-serif; color:var(--aei-ink); background:var(--aei-blush); }
      #aei-clase .cx{ max-width:1120px; margin:0 auto; padding:0 24px; }
      #aei-clase .hero{ position:relative; overflow:hidden; color:#fff; padding:52px 0 56px; }
      #aei-clase .hero .glow{ position:absolute; right:-60px; top:-60px; width:280px; height:280px; border-radius:50%; background:rgba(255,255,255,.15); filter:blur(60px); }
      #aei-clase .back{ display:inline-flex; align-items:center; gap:8px; color:rgba(255,255,255,.85); text-decoration:none; font-size:14px; font-weight:500; }
      #aei-clase .back:hover{ color:#fff; }
      #aei-clase .kick{ display:block; margin-top:22px; font-size:12px; font-weight:600; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,255,255,.85); }
      #aei-clase .htitle{ margin:8px 0 0; font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:600; line-height:1.1; max-width:760px; color:#fff; }
      #aei-clase .hdesc{ margin:16px 0 0; max-width:640px; color:rgba(255,255,255,.88); line-height:1.6; }
      #aei-clase .goal{ display:inline-flex; align-items:flex-start; gap:12px; margin-top:24px; border-radius:16px; background:rgba(255,255,255,.15); padding:12px 20px; font-size:14px; color:rgba(255,255,255,.92); line-height:1.5; }
      #aei-clase .body{ padding:44px 0 64px; }
      #aei-clase .label{ font-size:11px; font-weight:600; letter-spacing:.34em; text-transform:uppercase; color:var(--aei-brand700); }
      #aei-clase .prog{ margin-bottom:28px; }
      #aei-clase .prog-top{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
      #aei-clase .prog-num{ font-size:14px; font-weight:600; }
      #aei-clase .prog-bar{ height:8px; width:100%; border-radius:999px; background:var(--aei-cream); overflow:hidden; }
      #aei-clase .prog-fill{ height:100%; border-radius:999px; transition:width .7s; }
      #aei-clase .grid{ display:grid; gap:28px; grid-template-columns:1.55fr 1fr; align-items:start; }
      #aei-clase .grid > *{ min-width:0; }
      #aei-clase .vcard{ position:relative; aspect-ratio:16/9; border-radius:24px; overflow:hidden; box-shadow:0 24px 60px -28px rgba(237,42,140,.45); display:flex; align-items:center; justify-content:center; color:#fff; }
      #aei-clase .vcard .play{ display:flex; flex-direction:column; align-items:center; }
      #aei-clase .vcard .pbtn{ display:flex; height:80px; width:80px; align-items:center; justify-content:center; border-radius:50%; background:rgba(255,255,255,.2); font-size:26px; border:1px solid rgba(255,255,255,.4); }
      #aei-clase .vcard .vtitle{ margin-top:16px; font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-style:italic; padding:0 16px; text-align:center; }
      #aei-clase .vcard .vsub{ display:block; margin-top:4px; font-size:12px; letter-spacing:.3em; text-transform:uppercase; color:rgba(255,246,250,.75); text-align:center; }
      #aei-clase .vcard.has-video{ display:block; aspect-ratio:auto; background:#000 !important; }
      #aei-clase .vcard.has-video .tutor-lesson-video-wrapper{ margin:0 !important; max-width:none !important; width:100% !important; }
      #aei-clase .vcard.has-video .tutor-video-player,
      #aei-clase .vcard.has-video .plyr{ border-radius:0 !important; }
      #aei-clase .linfo{ margin-top:24px; }
      #aei-clase .ltitle{ margin:8px 0 0; font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:600; color:var(--aei-ink); }
      #aei-clase .ldesc{ margin-top:12px; color:var(--aei-ink-soft); line-height:1.7; }
      #aei-clase .actions{ margin-top:24px; display:flex; flex-wrap:wrap; align-items:center; gap:12px; }
      #aei-clase .btn{ display:inline-flex; align-items:center; gap:8px; border-radius:999px; padding:14px 28px; font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all .25s; text-decoration:none; }
      #aei-clase .btn-primary{ background:var(--aei-brand600); color:#fff; box-shadow:0 16px 40px -16px rgba(237,42,140,.6); }
      #aei-clase .btn-primary:hover{ background:var(--aei-brand700); transform:translateY(-2px); }
      #aei-clase .btn-primary[disabled]{ opacity:.7; cursor:wait; transform:none; }
      #aei-clase .btn-ghost{ background:#fff; color:var(--aei-ink); border:1px solid var(--aei-cream); }
      #aei-clase .done-pill{ display:inline-flex; align-items:center; gap:8px; border-radius:999px; background:#ecfdf3; color:#16a34a; padding:14px 24px; font-size:14px; font-weight:600; border:1px solid #bbf7d0; }
      #aei-clase .lcard{ border-radius:24px; border:1px solid var(--aei-cream); background:#fff; box-shadow:0 26px 60px -34px rgba(42,22,34,.22); overflow:hidden; }
      #aei-clase .lcard-head{ border-bottom:1px solid var(--aei-cream); padding:18px 22px; }
      #aei-clase .litem{ display:flex; align-items:center; gap:12px; width:100%; padding:16px 22px; background:#fff; border:none; text-decoration:none; transition:background .2s; }
      #aei-clase a.litem:hover{ background:var(--aei-blush); }
      #aei-clase .litem.active{ background:#FFE1F0; }
      #aei-clase .litem.locked{ opacity:.55; }
      #aei-clase .lnum{ flex:0 0 auto; display:flex; height:32px; width:32px; align-items:center; justify-content:center; border-radius:50%; font-size:13px; font-weight:700; background:#FFE1F0; color:var(--aei-brand700); }
      #aei-clase .litem.active .lnum{ background:var(--aei-brand700); color:#fff; }
      #aei-clase .litem.done .lnum{ background:#dcfce7; color:#16a34a; }
      #aei-clase .lname{ display:block; font-size:14px; font-weight:600; color:var(--aei-ink); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      #aei-clase .litem.active .lname{ color:var(--aei-brand700); }
      #aei-clase .ldur{ display:flex; align-items:center; gap:5px; margin-top:3px; font-size:12px; color:var(--aei-ink-muted); }
      #aei-clase .complete{ margin-top:20px; border-radius:24px; background:linear-gradient(125deg,#ED2A8C,#B5179E 55%,#7E125A); color:#fff; padding:26px; box-shadow:0 24px 60px -28px rgba(237,42,140,.5); }
      #aei-clase .complete .cf{ font-size:12px; font-weight:600; letter-spacing:.28em; text-transform:uppercase; color:rgba(255,246,250,.85); }
      #aei-clase .complete h4{ margin:8px 0 0; font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:600; color:#fff; }
      #aei-clase .complete p{ margin:6px 0 0; font-size:14px; color:rgba(255,246,250,.9); }
      #aei-clase .complete .cbtn{ display:inline-flex; align-items:center; gap:8px; margin-top:16px; border-radius:999px; background:#fff; color:var(--aei-ink); padding:12px 24px; font-size:14px; font-weight:600; text-decoration:none; }
      @media(max-width:900px){ #aei-clase .grid{ grid-template-columns:1fr; } #aei-clase .htitle{ font-size:2.2rem; } #aei-clase .hero{ padding:40px 0 44px; } #aei-clase .cx{ padding:0 16px; } }
    </style>
    <script>
    (function(){
      var UNITS=<?php echo wp_json_encode(array(
        array('title'=>'Bienvenida','tagline'=>'Bienvenida · Empieza aquí','anchor'=>'Tu transformación comienza en el momento en que decides volver a ti.','goal'=>'Darte la bienvenida, agradecer tu llegada a la academia, explicar el método y despertar el deseo de vivir todo el proceso.','accent'=>'#ED2A8C'),
        array('title'=>'Mapa de Ruta','tagline'=>'Módulo 0 · Preparación','anchor'=>'No puedes transformar lo que no entiendes, ni sostener lo que no has preparado dentro de ti.','goal'=>'Preparar tu sistema nervioso y tu autoconocimiento antes de iniciar la sanación profunda.','accent'=>'#D6207E'),
        array('title'=>'Raíces','tagline'=>'Módulo 1 · Sanación del origen','anchor'=>'Sanar el origen no cambia tu historia, pero libera el diseño original de tu destino.','goal'=>'Identificar con compasión y honestidad las heridas primarias de la infancia y comprender cómo han moldeado tu personalidad.','accent'=>'#B5179E'),
        array('title'=>'Reconciliación','tagline'=>'Módulo 2 · Perdón y gratitud','anchor'=>'El perdón limpia el espejo y la gratitud ilumina el reflejo.','goal'=>'Transformar el dolor identificado en Raíces en una plataforma de paz a través del perdón consciente y la gratitud.','accent'=>'#E2348F'),
        array('title'=>'Construcción del Ser','tagline'=>'Módulo 3 · Amor propio e inteligencia emocional','anchor'=>'El amor propio no es un destino, es la casa donde vuelves a habitarte.','goal'=>'Fortalecer tu amor propio, regular tus emociones y reprogramar las creencias que te limitan.','accent'=>'#C71585'),
        array('title'=>'Mi Reflejo','tagline'=>'Módulo 4 · Asesoría de imagen','anchor'=>'Cuando sanas por dentro, el espejo deja de mentirte.','goal'=>'Reconocer tu imagen personal —rostro, cuerpo y colorimetría— con criterio profesional.','accent'=>'#DD2486'),
        array('title'=>'Proyección','tagline'=>'Módulo 5 · Tu nuevo estilo','anchor'=>'Proyectas con naturalidad la mujer que por fin reconoces en ti.','goal'=>'Proyectar seguridad, elegancia y autenticidad con un estilo que comunica quién eres.','accent'=>'#AE1565'),
      )); ?>;
      var DARK='#5E0935', PLUM='#B5179E', COURSE='https://almaeimagen.com/courses/alma-e-imagen-the-academy/';
      var DONE_GREEN='#0BB01B';
      function esc(s){var d=document.createElement('div');d.textContent=s||'';return d.innerHTML;}
      function txt(el){return el?(el.textContent||'').replace(/\s+/g,' ').trim():'';}
      function build(){
        if(document.getElementById('aei-clase')) return true;
        var area=document.querySelector('.tutor-learning-area');
        var sb=document.querySelector('.tutor-learning-sidebar');
        if(!area||!sb) return false;
        var actLesson=sb.querySelector('a.tutor-learning-nav-item.active');
        var modItem=actLesson?actLesson.closest('.tutor-learning-nav-topic'):null;
        if(!modItem) return false;
        var modName=txt(modItem.querySelector('.tutor-learning-nav-header-title'));
        var mod=null;
        for(var i=0;i<UNITS.length;i++){ if(UNITS[i].title && modName.indexOf(UNITS[i].title)>-1){ mod=UNITS[i]; break; } }
        if(!mod){ mod={tagline:modName,title:modName,anchor:'',goal:'',accent:'#D6207E'}; }
        // Clases reales del módulo, tal como las lista Tutor (completada = check verde)
        var lessons=[].map.call(modItem.querySelectorAll('a.tutor-learning-nav-item'),function(a){
          var href=a.getAttribute('href')||'';
          var meta=txt(a.querySelector('.tutor-text-subdued'));
          return {title:(a.getAttribute('title')||txt(a)).trim(),href:(href&&href!=='#')?href:'',dur:(meta.match(/(\d{1,2}:\d{2})/)||[])[1]||'',active:a.classList.contains('active'),locked:/lock|disabled/i.test(a.className||'')||!!a.querySelector('[class*="lock"]'),done:!!a.querySelector('svg circle[fill="'+DONE_GREEN+'"]')};
        });
        var lessonIdx=lessons.findIndex(function(l){return l.active;}); if(lessonIdx<0)lessonIdx=0;
        var markBtn=document.querySelector('.tutor-mark-as-complete-button');
        var markTxt=txt(markBtn);
        if(lessons[lessonIdx] && markBtn && /completad/i.test(markTxt) && !/marcar/i.test(markTxt)){ lessons[lessonIdx].done=true; }
        var curTitle=(lessons[lessonIdx]&&lessons[lessonIdx].title)||(document.title||'').split(/[–-]/)[0].trim();
        var doneCount=lessons.filter(function(l){return l.done;}).length;
        var pct=lessons.length?Math.round(doneCount/lessons.length*100):0;
        var nextIdx=lessonIdx+1<lessons.length?lessonIdx+1:-1;
        // Siguiente MÓDULO y su 1ª clase
        var topics=[].slice.call(sb.querySelectorAll('.tutor-learning-nav-topic'));
        var nextTopic=topics[topics.indexOf(modItem)+1]||null;
        var nextTitle=nextTopic?txt(nextTopic.querySelector('.tutor-learning-nav-header-title')):'';
        var nextLink=nextTopic?nextTopic.querySelector('a.tutor-learning-nav-item'):null;
        var nextHref=nextLink?(nextLink.getAttribute('href')||''):'';
        var vwrap=document.querySelector('.tutor-lesson-video-wrapper');
        var hasVideo=!!(vwrap && vwrap.querySelector('video,iframe,.plyr'));
        var root=document.createElement('div'); root.id='aei-clase';
        var liHtml=lessons.map(function(l,i){
          var on=i===lessonIdx, dn=l.done, lk=l.locked&&!on&&!dn;
          var inner='<span class="lnum">'+(dn?'&#10003;':(i+1))+'</span><span style="min-width:0;flex:1;"><span class="lname">'+esc(l.title)+'</span><span class="ldur">'+(l.dur?('&#9201; '+esc(l.dur)):'')+'</span></span>';
          if(lk||!l.href) return '<div class="litem locked'+(dn?' done':'')+'">'+inner+'</div>';
          return '<a class="litem'+(on?' active':'')+(dn?' done':'')+'" href="'+esc(l.href)+'">'+inner+'</a>';
        }).join('');
        var compHtml=(lessons.length&&doneCount===lessons.length)?('<div class="complete"><span class="cf">¡Felicidades!</span><h4>Completaste este módulo.</h4>'+((nextTopic&&nextHref)?('<p>El siguiente módulo ya está desbloqueado.</p><a class="cbtn" href="'+esc(nextHref)+'">Ir a '+esc(nextTitle)+' &rarr;</a>'):('<p>Has completado el método Alma e Imagen.</p><a class="cbtn" href="'+COURSE+'">Volver a mi curso &rarr;</a>'))+'</div>'):'';
        var done=lessons[lessonIdx]&&lessons[lessonIdx].done;
        var num=lessonIdx+1;
        root.innerHTML=
        '<section class="hero" style="background:linear-gradient(130deg,'+mod.accent+' 0%,'+DARK+' 100%)"><div class="glow"></div><div class="cx"><a class="back" href="'+COURSE+'">&larr; Volver a mi curso</a><span class="kick">'+esc(mod.tagline)+'</span><h1 class="htitle">'+esc(mod.title)+'</h1>'+(mod.anchor?'<p class="hdesc">'+esc(mod.anchor)+'</p>':'')+(mod.goal?'<div class="goal">&#9670; <span><b>Objetivo:</b> '+esc(mod.goal)+'</span></div>':'')+'</div></section>'+
        '<section class="body"><div class="cx"><div class="prog"><div class="prog-top"><span class="label">Progreso del módulo</span><span class="prog-num">'+doneCount+'/'+lessons.length+' clases &middot; '+pct+'%</span></div><div class="prog-bar"><div class="prog-fill" style="width:'+pct+'%;background:linear-gradient(90deg,'+mod.accent+','+PLUM+')"></div></div></div>'+
        '<div class="grid"><div class="left"><div class="vcard'+(hasVideo?' has-video':'')+'" id="aei-vcard"'+(hasVideo?'':(' style="background:linear-gradient(135deg,'+mod.accent+' 0%,'+DARK+' 100%)"'))+'>'+(hasVideo?'':('<div class="play"><span class="pbtn">&#9658;</span><span class="vtitle">'+esc(curTitle)+'</span><span class="vsub">Video de la clase'+((lessons[lessonIdx]&&lessons[lessonIdx].dur)?(' &middot; '+esc(lessons[lessonIdx].dur)):'')+'</span></div>'))+'</div>'+
        '<div class="linfo"><span class="label">Clase '+(num<10?'0':'')+num+'</span><h3 class="ltitle">'+esc(curTitle)+'</h3><p class="ldesc">En esta clase trabajamos &ldquo;'+esc(curTitle)+'&rdquo;, una pieza clave de '+esc(mod.title)+'.</p><div class="actions">'+(done?'<span class="done-pill">&#10003; Clase completada</span>':'<button type="button" class="btn btn-primary" id="aei-mark">Marcar clase como vista &#10003;</button>')+(nextIdx>-1&&lessons[nextIdx]&&lessons[nextIdx].href?('<a class="btn btn-ghost" href="'+esc(lessons[nextIdx].href)+'">Siguiente clase &rarr;</a>'):'')+'</div></div></div>'+
        '<div class="right"><div class="lcard"><div class="lcard-head"><span class="label">Clases del módulo</span></div>'+liHtml+'</div>'+compHtml+'</div></div></div></section>';
        area.parentNode.insertBefore(root, area);
        if(hasVideo){ document.getElementById('aei-vcard').appendChild(vwrap); }
        var mk=document.getElementById('aei-mark');
        if(mk){
          mk.addEventListener('click',function(){
            mk.textContent='Guardando…'; mk.disabled=true;
            // El botón de Tutor envía su formulario (recarga la página). Si Tutor lo
            // resolviera sin recargar, se recarga a mano para reconstruir el progreso.
            var leaving=false; window.addEventListener('pagehide',function(){leaving=true;});
            if(markBtn){ markBtn.click(); }
            setTimeout(function(){ if(!leaving) location.reload(); }, 4000);
          });
        }
        document.body.classList.add('aei-clase-ready');
        return true;
      }
      var n=0,iv=setInterval(function(){ if(build()||++n>30) clearInterval(iv); },400);
      if(document.readyState!=='loading')build(); else document.addEventListener('DOMContentLoaded',build);
    })();
    </script>
    <?php
});
