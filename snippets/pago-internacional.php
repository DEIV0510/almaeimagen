<?php
/*
 * Snippet "Pago internacional: región y código postal opcionales" (Code Snippets, global).
 *
 * Tienda digital: Región/Provincia y Código postal opcionales en todos los países.
 * Apple Pay, Google Pay y Link no envían esos datos en países que no los usan (p. ej. Aruba),
 * y WooCommerce rechazaba el pago con "Región / Provincia es obligatorio, Código postal / ZIP es obligatorio".
 * Los productos son digitales (guías PDF y el curso): la dirección no hace falta para entregar.
 */
add_filter( 'woocommerce_default_address_fields', function ( $fields ) {
	foreach ( array( 'state', 'postcode' ) as $key ) {
		if ( isset( $fields[ $key ] ) ) {
			$fields[ $key ]['required'] = false;
		}
	}
	return $fields;
}, 99 );

// Cada país con su propia regla: los que no traen configuración (Aruba, Trinidad, México...)
// usaban los campos por defecto, que el checkout de bloques sigue marcando como obligatorios.
add_filter( 'woocommerce_get_country_locale', function ( $locale ) {
	$countries = array_unique( array_merge( array_keys( $locale ), array_keys( WC()->countries->get_countries() ) ) );
	foreach ( $countries as $country ) {
		foreach ( array( 'state', 'postcode' ) as $key ) {
			$locale[ $country ][ $key ]['required'] = false;
		}
	}
	return $locale;
}, 99 );
