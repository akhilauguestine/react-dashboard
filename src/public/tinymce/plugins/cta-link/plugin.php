<?php
namespace SC\Tiny_MCE;

add_shortcode( 'cta', __NAMESPACE__ . '\\cta_shortcode' );
add_filter( 'the_content', __NAMESPACE__ . '\\set_cta_href', 8 );

/**
 * Handle [cta] shortcode
 *
 * @param array $atts all attributes passed to the shortcode
 */
function cta_shortcode( $atts ) {
	if ( empty( $atts['href'] ) ) {
		return;
	}
	$post_id = url_to_postid( $atts['href'] );
	if ( empty( $post_id ) ) {
		return;
	}

	/*
	 * Instead of outputing all content immediately, add $post_id via filter
	 * then all shortcodes will be output once to avoid duplication.
	 */
	add_filter( 'sc_cta_shortcode_pages', function( $page_ids ) use ( $post_id ) {
		$page_ids[] = $post_id;
		return $page_ids;
	});
	return '<span data-cta-link-id="' . $post_id . '" ></span>';
}

/**
 * Set all cta links' (a tag with data-cta-link attribute) href to '#null'
 * This precent unneccessary href to be output as well as prevent event on the link tag.
 *
 * @param string $content content to be processed. Normally, content from wysiwyg.
 * @param string processed content.
 */
function set_cta_href( $content ) {
	$content = preg_replace( '/(<[^>]+)(href="[^"]*")([^>]*)data-cta-link="true"/smi', '$1$3 href="#null" data-cta-link="true"', $content );
	$content = preg_replace( '/(<[^>]+)data-cta-link="true"([^>]*)(href="[^"]*")/smi', '$1$2 href="#null" data-cta-link="true"', $content );
	return $content;
}
