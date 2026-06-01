<?php
/**
 * Script para crear el curso completo "Alma e Imagen · The Academy" en Tutor LMS
 * (1 curso + 7 módulos/temas + 54 clases) de una sola vez.
 *
 * CÓMO USARLO (con el plugin gratuito "Code Snippets"):
 * 1. WordPress → Plugins → Añadir nuevo → busca "Code Snippets" → Instalar → Activar.
 * 2. Snippets → Add New (Añadir nuevo) → pega TODO el código de abajo
 *    (SIN la primera línea "<?php"). Ponle un título y "Save Changes and Activate".
 * 3. Estando logueado como administrador, visita esta dirección en el navegador:
 *       https://almaeimagen.com/wp-admin/?crear_alma_imagen=si
 * 4. Verás el mensaje: "Listo. Curso creado con 7 módulos y 54 clases".
 * 5. Borra/desactiva el snippet y borra los cursos de prueba/duplicados.
 */
add_action('admin_init', function () {
    if (!current_user_can('manage_options')) return;
    if (empty($_GET['crear_alma_imagen'])) return;

    // Evitar duplicados si se ejecuta dos veces
    $existe = get_posts([
        'post_type'   => 'courses',
        'meta_key'    => '_alma_imagen_seed',
        'meta_value'  => '1',
        'numberposts' => 1,
        'post_status' => 'any',
    ]);
    if ($existe) {
        wp_die('Ya existe el curso creado por este script. Si quieres recrearlo, borra primero ese curso. Recuerda borrar este snippet.');
    }

    $modulos = [
        ['Bienvenida', ['Bienvenida a la academia', 'Cómo está construido el método', 'Cómo aprovechar al máximo tu proceso']],
        ['Módulo 0 · Mapa de Ruta', ['Regulación del sistema nervioso', 'Autoconocimiento', 'Audio de regulación del sistema nervioso', 'Taller de sistema nervioso', 'Taller de autoconocimiento con 50 preguntas']],
        ['Módulo 1 · Raíces', ['Heridas de la infancia', 'Herida materna', 'Herida paterna', 'Niña interior', 'Carta a mamá', 'Carta a papá', 'Árbol genealógico', 'Imagen útero', 'Talleres y audios de sanación']],
        ['Módulo 2 · Reconciliación', ['Ruta del perdón', 'Taller del perdón', 'Ejercicio de culpa', 'Audio para trabajar el perdón', 'Gratitud como ciencia', 'Taller de gratitud', 'Audio de gratitud', 'Reto de 21 días de gratitud']],
        ['Módulo 3 · Construcción del Ser', ['Amor propio', 'Taller de amor propio', 'Reto de amor propio de 60 días', 'Método 30 6/A', 'Inteligencia emocional', 'Taller de manejo de emociones', 'Arteterapia', 'Límites', 'Reprogramación de creencias']],
        ['Módulo 4 · Mi Reflejo', ['Qué es una asesoría de imagen', 'Taller de asesoría de imagen', 'Visagismo', 'Instructivo tipo de rostro con fotos', 'Composición corporal', 'Instructivo tipo de cuerpo con fotos', 'Colorimetría', 'Rueda de color', 'Instructivo para usar la rueda de color']],
        ['Módulo 5 · Proyección', ['Estilos universales', 'Edición de armario', 'Ruta de compras', 'Imagen que comunica', 'Lenguaje corporal', 'Comportamiento', 'Etiqueta', 'Guía de salud y nutrición', 'Guía de automaquillaje', 'Tu nuevo estilo', 'Video de cierre, despedida y agradecimientos']],
    ];

    $course_id = wp_insert_post([
        'post_title'   => 'Alma e Imagen · The Academy',
        'post_content' => 'Una experiencia de formación emocional, espiritual y de imagen personal para mujeres que desean sanar, reconciliarse con su historia y proyectar su mejor versión.',
        'post_status'  => 'publish',
        'post_type'    => 'courses',
        'post_author'  => get_current_user_id(),
    ]);
    if (is_wp_error($course_id) || !$course_id) {
        wp_die('Error: no se pudo crear el curso.');
    }
    update_post_meta($course_id, '_alma_imagen_seed', '1');

    $total = 0;
    foreach ($modulos as $mi => $mod) {
        $topic_id = wp_insert_post([
            'post_title'  => $mod[0],
            'post_status' => 'publish',
            'post_type'   => 'topics',
            'post_parent' => $course_id,
            'menu_order'  => $mi,
            'post_author' => get_current_user_id(),
        ]);
        foreach ($mod[1] as $li => $lesson) {
            wp_insert_post([
                'post_title'  => $lesson,
                'post_status' => 'publish',
                'post_type'   => 'lesson',
                'post_parent' => $topic_id,
                'menu_order'  => $li,
                'post_author' => get_current_user_id(),
            ]);
            $total++;
        }
    }

    wp_die('✅ Listo. Curso "Alma e Imagen · The Academy" creado (ID ' . $course_id . ') con 7 módulos y ' . $total . ' clases. Ahora: 1) borra este snippet, 2) abre el curso en Tutor LMS para revisar y activar el desbloqueo secuencial (Content Drip).');
});
