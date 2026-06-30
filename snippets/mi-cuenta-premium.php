add_action('wp_footer', function () {
    if (!function_exists('is_account_page') || !is_account_page()) return;

    $user    = wp_get_current_user();
    $dname   = ($user && $user->display_name) ? $user->display_name : 'Bienvenida';
    $initial = function_exists('mb_substr') ? mb_strtoupper(mb_substr($dname, 0, 1)) : strtoupper(substr($dname, 0, 1));
    $course  = 'https://almaeimagen.com/courses/alma-e-imagen-the-academy';
    $orders  = function_exists('wc_get_account_endpoint_url') ? wc_get_account_endpoint_url('orders') : '#';
    $edit    = function_exists('wc_get_account_endpoint_url') ? wc_get_account_endpoint_url('edit-account') : '#';
    $logout  = function_exists('wc_logout_url') ? wc_logout_url() : wp_logout_url();

    $prog = -1;
    if (function_exists('tutor_utils') && is_object(tutor_utils()) && method_exists(tutor_utils(), 'get_course_completed_percent')) {
        try { $prog = (int) @tutor_utils()->get_course_completed_percent(58, get_current_user_id()); }
        catch (\Throwable $e) { $prog = -1; }
    }
    if ($prog < 0 || $prog > 100) $prog = -1;
    ?>
    <style id="aei-cuenta-css">
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Montserrat:wght@400;500;600;700&family=Sacramento&display=swap');
      :root{--aei-ink:#2A1622;--aei-soft:#5C4150;--aei-muted:#8A7280;--aei-blush:#FFF6FA;--aei-cream:#FDD7E9;--aei-b5:#ED2A8C;--aei-b6:#D6207E;--aei-b7:#AE1565;--aei-plum:#B5179E;--aei-dark:#7E125A;--aei-grad:linear-gradient(125deg,#D6207E 0%,#B5179E 55%,#7E125A 100%);}
      body.woocommerce-account{ background:radial-gradient(70% 50% at 50% 0%,#FFE1F0 0%,#FFF6FA 55%) #FFF6FA; }
      .woocommerce-account .woocommerce{ font-family:'Montserrat',sans-serif; color:var(--aei-ink); display:flex; flex-wrap:wrap; gap:24px; align-items:flex-start; max-width:1120px; margin-left:auto; margin-right:auto; }
      body.woocommerce-account .entry-hero-container-inner{ border-radius:0 !important; padding-top:34px !important; padding-bottom:42px !important; }
      body.woocommerce-account .entry-hero-container-inner .entry-title{ font-family:'Cormorant Garamond',serif !important; font-weight:600 !important; }
      #aei-acc-kick{ display:block; text-align:center; font-family:'Sacramento',cursive; font-size:30px; color:rgba(255,255,255,.92); line-height:1; }
      #aei-acc-sub{ display:block; text-align:center; color:rgba(255,255,255,.9); font-size:13px; letter-spacing:2px; text-transform:uppercase; margin:10px 0 0; font-weight:500; }
      .woocommerce-account .woocommerce-MyAccount-content{ order:1; flex:1 1 460px; background:#fff; border:1px solid var(--aei-cream); border-radius:26px; box-shadow:0 26px 60px -30px rgba(42,22,34,.28); padding:34px; margin:0; }
      .woocommerce-account .woocommerce-MyAccount-navigation{ order:2; flex:0 0 320px; max-width:320px; background:#fff; border:1px solid var(--aei-cream); border-radius:26px; box-shadow:0 26px 60px -30px rgba(42,22,34,.28); padding:16px; }
      @media(max-width:880px){ .woocommerce-account .woocommerce-MyAccount-navigation{ order:-1; flex-basis:100%; max-width:none; } .woocommerce-account .woocommerce-MyAccount-content{ flex-basis:100%; } }
      .woocommerce-account .woocommerce-MyAccount-content::before,.woocommerce-account .woocommerce-MyAccount-content::after{ display:none; }
      .woocommerce-account .woocommerce-MyAccount-navigation ul{ list-style:none; margin:0; padding:0; display:grid; gap:3px; }
      .woocommerce-account .woocommerce-MyAccount-navigation li{ margin:0; border:none !important; }
      .woocommerce-account .woocommerce-MyAccount-navigation li a{ display:flex; align-items:center; gap:12px; padding:13px 15px; border-radius:14px; color:var(--aei-ink); text-decoration:none; font-weight:600; font-size:14px; transition:background .2s,color .2s,transform .2s; }
      .woocommerce-account .woocommerce-MyAccount-navigation li a:hover{ background:var(--aei-blush); transform:translateX(3px); }
      .woocommerce-account .woocommerce-MyAccount-navigation li.is-active a{ background:var(--aei-grad); color:#fff; box-shadow:0 14px 30px -16px rgba(237,42,140,.7); }
      .woocommerce-account .woocommerce-MyAccount-navigation li.woocommerce-MyAccount-navigation-link--customer-logout a{ color:var(--aei-muted); }
      #aei-acc-me{ display:flex; align-items:center; gap:12px; padding:8px 10px 16px; margin-bottom:8px; border-bottom:1px solid var(--aei-cream); }
      #aei-acc-me .av{ width:50px; height:50px; border-radius:50%; background:var(--aei-grad); display:flex; align-items:center; justify-content:center; color:#fff; font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; flex:0 0 auto; }
      #aei-acc-me b{ font-size:15px; color:var(--aei-ink); }
      #aei-acc-me span{ display:block; font-size:11px; color:var(--aei-b6); font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-top:2px; }
      #aei-acc-greet .hi{ font-family:'Sacramento',cursive; font-size:26px; color:var(--aei-b6); line-height:1; margin:0; }
      #aei-acc-greet h2{ font-family:'Cormorant Garamond',serif; font-weight:600; font-size:2rem; line-height:1.1; margin:2px 0 0; color:var(--aei-ink); }
      #aei-acc-greet .lo{ font-size:12.5px; color:var(--aei-muted); margin:6px 0 0; }
      #aei-acc-greet .lo a{ color:var(--aei-b6); font-weight:600; text-decoration:none; }
      #aei-acc-hero{ position:relative; overflow:hidden; border-radius:22px; background:var(--aei-grad); color:#fff; padding:32px 34px; margin:22px 0 18px; box-shadow:0 24px 60px -30px rgba(237,42,140,.55); }
      #aei-acc-hero::after{ content:""; position:absolute; right:-40px; bottom:-70px; width:240px; height:240px; border-radius:50%; background:rgba(255,255,255,.14); }
      #aei-acc-hero .kick{ position:relative; font-size:11px; letter-spacing:3px; text-transform:uppercase; opacity:.9; font-weight:600; margin:0; }
      #aei-acc-hero .sc{ position:relative; font-family:'Sacramento',cursive; font-size:26px; opacity:.92; line-height:1; margin:6px 0 0; }
      #aei-acc-hero h3{ position:relative; font-family:'Cormorant Garamond',serif; font-weight:600; font-size:2.2rem; line-height:1.05; margin:2px 0 0; color:#fff; }
      #aei-acc-hero p.d{ position:relative; font-size:14px; opacity:.9; margin:8px 0 0; max-width:430px; line-height:1.55; }
      #aei-acc-hero .prog{ position:relative; margin-top:18px; max-width:420px; }
      #aei-acc-hero .prog .lab{ display:flex; justify-content:space-between; font-size:11px; opacity:.9; margin-bottom:6px; font-weight:600; letter-spacing:.5px; }
      #aei-acc-hero .prog .track{ height:7px; border-radius:999px; background:rgba(255,255,255,.25); overflow:hidden; }
      #aei-acc-hero .prog .fill{ height:100%; border-radius:999px; background:#fff; }
      #aei-acc-cta{ position:relative; display:inline-flex; align-items:center; gap:9px; background:#fff; color:var(--aei-b7); border-radius:999px; padding:14px 28px; font-weight:700; font-size:14px; text-decoration:none; margin-top:20px; transition:transform .2s,box-shadow .2s; }
      #aei-acc-cta:hover{ transform:translateY(-2px); box-shadow:0 16px 34px -16px rgba(0,0,0,.3); }
      #aei-acc-tiles{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
      .aei-acc-tile{ display:block; padding:20px; border-radius:18px; border:1px solid var(--aei-cream); background:linear-gradient(180deg,#fff,#FFF6FA); text-decoration:none; transition:transform .2s,box-shadow .2s,border-color .2s; }
      .aei-acc-tile:hover{ transform:translateY(-4px); box-shadow:0 18px 40px -22px rgba(214,32,126,.4); border-color:var(--aei-b5); }
      .aei-acc-tile .ic{ width:46px; height:46px; border-radius:14px; background:var(--aei-grad); display:flex; align-items:center; justify-content:center; color:#fff; }
      .aei-acc-tile .ic svg{ width:22px; height:22px; }
      .aei-acc-tile b{ display:block; margin-top:14px; font-size:15px; color:var(--aei-ink); }
      .aei-acc-tile span{ display:block; margin-top:2px; font-size:12px; color:var(--aei-muted); }
      @media(max-width:560px){ #aei-acc-tiles{ grid-template-columns:1fr; } }
    </style>
    <script>
    (function(){
      var COURSE=<?php echo json_encode($course); ?>, ORDERS=<?php echo json_encode($orders); ?>, EDIT=<?php echo json_encode($edit); ?>, LOGOUT=<?php echo json_encode($logout); ?>, NAME=<?php echo json_encode($dname); ?>, INITIAL=<?php echo json_encode($initial); ?>, PROG=<?php echo (int)$prog; ?>;
      function esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
      var bnr=document.querySelector('.entry-hero-container-inner');
      var bt=bnr?bnr.querySelector('h1,.entry-title'):null;
      if(bt && !document.getElementById('aei-acc-sub')){
        var k=document.createElement('span'); k.id='aei-acc-kick'; k.textContent='Tu espacio de transformación'; bt.parentNode.insertBefore(k,bt);
        var s=document.createElement('p'); s.id='aei-acc-sub'; s.textContent='Bienvenida a tu academia'; bt.parentNode.insertBefore(s, bt.nextSibling);
      }
      var nav=document.querySelector('.woocommerce-MyAccount-navigation');
      if(nav && !document.getElementById('aei-acc-me')){
        var me=document.createElement('div'); me.id='aei-acc-me';
        me.innerHTML='<div class="av">'+esc(INITIAL)+'</div><div><b>'+esc(NAME)+'</b><span>Miembro</span></div>';
        nav.insertBefore(me, nav.firstChild);
      }
      if(!document.body.classList.contains('woocommerce-dashboard')) return;
      var content=document.querySelector('.woocommerce-MyAccount-content');
      if(!content || document.getElementById('aei-acc-hero')) return;
      [].forEach.call(content.querySelectorAll('p'), function(p){ p.style.display='none'; });
      var PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l13 7-13 7V5z"/></svg>';
      var BAG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>';
      var USER='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>';
      var greet=document.createElement('div'); greet.id='aei-acc-greet';
      greet.innerHTML='<p class="hi">Bienvenida de vuelta,</p><h2>Hola, '+esc(NAME)+'</h2><p class="lo">¿No eres '+esc(NAME)+'? <a href="'+LOGOUT+'">Cerrar sesión</a></p>';
      var prog = (PROG>=0) ? '<div class="prog"><div class="lab"><span>Tu avance</span><span>'+PROG+'%</span></div><div class="track"><div class="fill" style="width:'+PROG+'%"></div></div></div>' : '';
      var hero=document.createElement('div'); hero.id='aei-acc-hero';
      hero.innerHTML='<p class="kick">Tu academia</p><p class="sc">Tu mejor versi&oacute;n te espera</p><h3>Contin&uacute;a tu transformaci&oacute;n</h3><p class="d">Retoma tu curso justo donde lo dejaste y sigue avanzando a tu ritmo, paso a paso.</p>'+prog+'<a id="aei-acc-cta" href="'+COURSE+'">Ir a mi curso &rarr;</a>';
      var tiles=document.createElement('div'); tiles.id='aei-acc-tiles';
      tiles.innerHTML='<a class="aei-acc-tile" href="'+COURSE+'"><span class="ic">'+PLAY+'</span><b>Mi curso</b><span>Ver m&oacute;dulos y clases</span></a>'+
        '<a class="aei-acc-tile" href="'+ORDERS+'"><span class="ic">'+BAG+'</span><b>Mis pedidos</b><span>Historial de compras</span></a>'+
        '<a class="aei-acc-tile" href="'+EDIT+'"><span class="ic">'+USER+'</span><b>Mis datos</b><span>Perfil y contrase&ntilde;a</span></a>';
      var anchor=content.querySelector('.woocommerce-notices-wrapper');
      if(anchor){ anchor.parentNode.insertBefore(greet, anchor.nextSibling); } else { content.insertBefore(greet, content.firstChild); }
      greet.parentNode.insertBefore(hero, greet.nextSibling);
      hero.parentNode.insertBefore(tiles, hero.nextSibling);
    })();
    </script>
    <?php
});
