<?php
/*
 * Snippet "Marca en el sitio: logo, pie y reproductor" (Code Snippets #38, front-end).
 * Quita lo genérico del tema en las páginas de WordPress (curso, clases, mi cuenta, pago):
 * logo oficial rosa en el encabezado, pie propio en ciruela y reproductor de video en el rosa de la marca.
 * La portada (landing-wordpress.html) no usa el tema y no le afecta.
 */
add_filter( 'theme_mod_footer_html_content', function () {
	return '<span class="aei-pie"><img src="https://cdn.jsdelivr.net/gh/DEIV0510/almaeimagen@d55d79a6f9ce98e7b9734b579bb9d344963c9d4b/assets/marca/logo-rosa.webp" alt="Alma e Imagen · The Academy · by Leidy Sepúlveda" width="140" height="64" loading="lazy" /><span class="aei-pie-txt">&copy; ' . gmdate( 'Y' ) . ' Alma e Imagen · The Academy · by Leidy Sepúlveda</span></span>';
}, 99 );
add_action( 'wp_head', function () {
	?>
	<style id="aei-marca-sitio">
	  body .site-branding .site-title{font-size:0 !important;line-height:0 !important;width:150px;height:68px;margin:0;background:url("https://cdn.jsdelivr.net/gh/DEIV0510/almaeimagen@d55d79a6f9ce98e7b9734b579bb9d344963c9d4b/assets/marca/logo-rosa.webp") left center/contain no-repeat}
	  body .site-branding .site-title::before,body .site-branding .site-title::after{content:none !important;display:none !important}
	  @media (max-width:767px){ body .site-branding .site-title{width:124px;height:56px} }
	  .site-footer,.site-footer .site-top-footer-wrap,.site-footer .site-middle-footer-wrap,.site-footer .site-bottom-footer-wrap,.site-footer .site-footer-row-container-inner{background:#2A1622 !important;border:0 !important}
	  .site-footer .footer-html{width:100%;margin:0}
	  .aei-pie{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 0;text-align:center}
	  .aei-pie img{display:block;height:58px;width:auto;filter:brightness(1.45) saturate(1.1)}
	  .aei-pie-txt{font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:.04em;color:rgba(255,246,250,.62)}
	  .plyr{--plyr-color-main:#D6207E}
	  .plyr--video .plyr__control--overlaid{background:#D6207E;box-shadow:0 14px 34px -10px rgba(214,32,126,.6)}
	  .plyr--video .plyr__control--overlaid:hover,.plyr--video .plyr__control--overlaid:focus-visible{background:#AE1565}
	</style>
	<?php
}, 200 );
