<?php
/*
 * Snippet "Clase: audios y material descargable" (Code Snippets, front-end).
 * Estilos del bloque .aei-contenido-clase de cada clase del curso: el audio de la clase
 * (episodio de Spotify mientras llegan los MP3) y la lista de PDF para descargar.
 * El snippet "Clase con contenido propio" (#26) pone el bloque dentro del diseño de clase.
 */
add_action( 'wp_footer', function () {
	if ( ! is_singular( 'lesson' ) ) {
		return;
	}
	?>
	<style id="aei-clase-recursos-css">
	  .aei-contenido-clase .aei-rec-titulo{margin:0 0 10px;font-family:'Montserrat',sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#AE1565}
	  .aei-contenido-clase .aei-audio{margin:0 0 22px}
	  .aei-contenido-clase .aei-audio iframe{display:block;width:100%;height:152px;border:0;border-radius:14px}
	  .aei-contenido-clase .aei-recursos{display:grid;gap:10px;margin:0 0 18px}
	  .aei-rec-item{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:14px;background:#fff;border:1px solid #F3D3E3;text-decoration:none !important;color:#2A1622;transition:border-color .2s,box-shadow .2s}
	  .aei-rec-item:hover{border-color:#E7A3C4;box-shadow:0 14px 30px -18px rgba(214,32,126,.45)}
	  .aei-rec-item:focus-visible{outline:2px solid #D6207E;outline-offset:3px}
	  .aei-rec-ico{flex:none;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:#FDE7F1;color:#AE1565;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:.04em}
	  .aei-rec-nombre{flex:1;min-width:0;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:600;line-height:1.35}
	  .aei-rec-btn{flex:none;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:600;color:#D6207E}
	  .aei-contenido-clase .aei-pendiente{margin:0 0 18px;padding:12px 14px;border-left:3px solid #E7A3C4;background:#FFF6FA;border-radius:0 12px 12px 0;font-size:14px;line-height:1.55;color:#5C4150}
	  @media (max-width:480px){ .aei-rec-btn{display:none} }
	  @media (prefers-reduced-motion:reduce){ .aei-rec-item{transition:none} }
	</style>
	<?php
}, 119 );
