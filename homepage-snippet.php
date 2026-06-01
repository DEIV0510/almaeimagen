<?php
/**
 * Hace que la PORTADA de almaeimagen.com muestre la landing (landing-wordpress.html).
 *
 * REQUISITO: subir el archivo "landing-wordpress.html" a la carpeta raíz de WordPress
 * (public_html) con el Administrador de archivos de Hostinger.
 *
 * CÓMO USAR: pega este código en "Fragmentos de código" (Code Snippets), tipo PHP,
 * SIN la primera línea "<?php", y dale "Guardar y activar".
 *
 * El resto del sitio (curso, /wp-admin, etc.) sigue funcionando normal: solo cambia la portada.
 */
add_action('template_redirect', function () {
    if (is_admin()) return;
    if (is_front_page() || is_home()) {
        $archivo = ABSPATH . 'landing-wordpress.html';
        if (file_exists($archivo)) {
            status_header(200);
            header('Content-Type: text/html; charset=UTF-8');
            readfile($archivo);
            exit;
        }
    }
});
