<?php
/*
 * Clase con contenido propio (p. ej. "Conoce aquí nuestros productos y servicios", Módulo 4).
 * Snippet "Clase con contenido propio" (Code Snippets #26, alcance front-end).
 * El snippet "Diseño de clase" oculta el cuerpo nativo de Tutor y muestra un recuadro de video.
 * Si la clase trae un bloque .aei-contenido-clase, ese bloque reemplaza el recuadro de video
 * (cuando no hay video) y la descripción genérica. Si el diseño no carga, el bloque se ve igual
 * dentro del cuerpo nativo, porque los estilos no dependen de #aei-clase.
 */
add_action('wp_footer', function () {
	if (!is_singular('lesson')) return;
	?>
	<style id="aei-contenido-clase-css">
	  .aei-contenido-clase{margin:14px 0 6px}
	  .aei-contenido-clase p{margin:0}
	  .aei-contenido-clase .aei-cc-intro{margin:0 0 16px;color:#5C4150;line-height:1.7}
	  .aei-cc-grid{display:grid;gap:16px}
	  .aei-cc-card{display:flex;align-items:center;gap:22px;padding:22px 24px;border-radius:24px;background:#fff;border:1px solid #FDD7E9;box-shadow:0 26px 60px -30px rgba(42,22,34,.2);text-decoration:none !important;color:inherit;transition:transform .3s,box-shadow .3s,border-color .3s}
	  .aei-cc-card:hover{transform:translateY(-3px);border-color:#F5A3CB;box-shadow:0 30px 70px -30px rgba(214,32,126,.35)}
	  .aei-cc-card:focus-visible{outline:2px solid #D6207E;outline-offset:4px}
	  .aei-cc-wheel{position:relative;flex:none;width:92px;height:92px;border-radius:50%;background:conic-gradient(from -90deg,#1F9D63 0 10%,#22B5D3 10% 20%,#1E78B4 20% 30%,#F7F2EE 30% 40%,#231A20 40% 50%,#5A2BD2 50% 60%,#E2CF22 60% 70%,#B79AA6 70% 80%,#8FA99B 80% 90%,#D6207E 90% 100%);box-shadow:0 0 0 5px #fff,0 14px 34px -14px rgba(42,22,34,.45)}
	  .aei-cc-wheel::after{content:"";position:absolute;inset:27%;border-radius:50%;background:#FFF6FA;box-shadow:inset 0 0 0 1px #FDD7E9}
	  .aei-cc-body{display:flex;flex-direction:column;gap:6px;min-width:0}
	  .aei-cc-type{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#AE1565}
	  .aei-cc-name{font-family:'Cormorant Garamond',serif;font-size:24px;line-height:1.15;font-weight:600;color:#2A1622}
	  .aei-cc-desc{font-size:14px;line-height:1.6;color:#5C4150}
	  .aei-cc-cta{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;margin-top:6px;min-height:44px;padding:0 20px;border-radius:999px;background:#D6207E;color:#fff;font-size:14px;font-weight:600;letter-spacing:.02em;box-shadow:0 20px 55px -20px rgba(237,42,140,.4);transition:background-color .3s}
	  .aei-cc-card:hover .aei-cc-cta{background:#AE1565}
	  @media (max-width:640px){
	    .aei-cc-card{flex-direction:column;text-align:center;padding:24px 20px}
	    .aei-cc-body{align-items:center}
	    .aei-cc-cta{align-self:center}
	  }
	  @media (prefers-reduced-motion:reduce){ .aei-cc-card{transition:none} .aei-cc-card:hover{transform:none} }
	</style>
	<script>
	(function(){
	  function place(){
	    var block=document.querySelector('.aei-contenido-clase');
	    if(!block) return true;
	    var root=document.getElementById('aei-clase');
	    if(!root) return false;
	    if(root.contains(block)) return true;
	    var vcard=document.getElementById('aei-vcard');
	    if(vcard && !vcard.classList.contains('has-video')) vcard.remove();
	    var ld=root.querySelector('.ldesc'), linfo=root.querySelector('.linfo');
	    if(ld){ ld.replaceWith(block); }
	    else if(linfo){ linfo.insertBefore(block, linfo.querySelector('.actions')); }
	    else { root.appendChild(block); }
	    return true;
	  }
	  var n=0, iv=setInterval(function(){ if(place()||++n>40) clearInterval(iv); },300);
	})();
	</script>
	<?php
}, 120);
