/* global tinymce */

( function ( tinymce, $ ) {

	// Override wpLink.getAttrs function to return empty href if it's equal to #null
	var getAttrs           = window.wpLink.getAttrs;
	window.wpLink.getAttrs = function () {
		var attrs = getAttrs();
		if ( attrs.href === '#null' ) {
			attrs.href = '';
		}
		return attrs;
	};

	// Override wpLink.update to add shortcode to the node when it's updated.
	var update           = window.wpLink.update;
	window.wpLink.update = function () {
		var attrs = window.wpLink.getAttrs();
		var node  = getSelectedCtaLink();
		if ( node && attrs.href ) {
			$( '.cta-short-code', node ).html( '[cta href="' + attrs.href + '"]' );
		}
		update();
	};

	/**
	 * Get select link if any. Select link is any a tag
	 */
	function getSelectedLink() {
		var editor = tinymce.activeEditor;
		var href, html,
			node   = editor.selection.getNode(),
			link   = editor.dom.getParent( node, 'a[href]' );

		if ( ! link ) {
			html = editor.selection.getContent( { format: 'raw' } );

			if ( html && html.indexOf( '</a>' ) !== -1 ) {
				href = html.match( /href="([^">]+)"/ );

				if ( href && href[1] ) {
					link = editor.$( 'a[href="' + href[1] + '"]', node )[0];
				}

				if ( link ) {
					editor.selection.select( link );
				}
			}
		}

		return link;
	}

	/**
	 * Get selected CTA link if any. CTA link is a tag with data-cta-link attribute
	 */
	function getSelectedCtaLink() {
		var editor = tinymce.activeEditor;
		if ( ! editor || ! editor.selection ) {
			return null;
		}
		var ctaLink, html,
			node = editor.selection.getNode(),
			link = editor.dom.getParent( node, 'a[data-cta-link]' );
		if ( ! link ) {
			html = editor.selection.getContent( { format: 'raw' } );
			if ( html && html.indexOf( '</a>' ) !== -1 ) {
				ctaLink = html.match( /data-cta-link="([^">]+)"/ );

				if ( ctaLink ) {
					link = editor.$( 'a[data-cta-link]', node )[0];
				}

				if ( link ) {
					editor.selection.select( link );
				}
			}
		}

		return link;
	}

	$( document ).on( 'wplink-open', function ( event, wrap ) {
		var node = getSelectedCtaLink();
		if ( node ) {

			// Do not display external url for cta
			$( '.link-target', wrap ).hide();
			$( '#wplink-link-existing-content', wrap ).hide();
			$( '.howto', wrap ).hide();
		} else {
			$( '.link-target', wrap ).show();
			$( '#wplink-link-existing-content', wrap ).show();
			$( '.howto', wrap ).show();
		}
	} );

	tinymce.PluginManager.add( 'sc_cta_link', function ( editor ) {

		if ( editor.buttons.link ) {
			editor.buttons.link.stateSelector = 'a[href]:not([data-cta-link])';
		}

		editor.addCommand( 'sc_cta_link', function () {
			var linkNode = getSelectedLink();
			if ( linkNode ) {
				editor.dom.setAttribs( linkNode, { 'data-cta-link': true } );
			} else {
				editor.execCommand( 'mceInsertLink', false, {
					href: '#null',
					'data-cta-link': true,
				} );
				linkNode = editor.$( 'a[href]' )[0];
				tinymce.activeEditor.selection.select( linkNode );
				editor.nodeChanged();
			}
			var url = $( linkNode ).attr( 'href' );
			if ( $( '.cta-short-code', linkNode ).length === 0 ) {
				$( linkNode ).append( '<span class="cta-short-code" style="display:none">[cta href="' + url + '"]</span>' );
			}
			var html = editor.selection.getContent( { format: 'text' } );
			setTimeout( function () {
				window.wpLink.open( editor.id, url, html, linkNode );
			}, 10 );
		} );

		// Hook into wp_link_cancel to unlink the node if href is empty or #null.
		// Cannot use ExecCommand since we need to execute this before the command is executed.
		editor.onBeforeExecCommand.add( function ( ed, cmd ) {
			if ( cmd === 'wp_link_cancel' ) {
				var node = getSelectedCtaLink();
				if ( node ) {
					var href = $( node ).attr( 'href' );
					if ( ! href || href === '#null' ) {
						$( '.cta-short-code', node ).remove();
						ed.execCommand( 'unlink' );
					}
				}
			}
		} );

		// Add a button that opens a window
		editor.addButton( 'sc_cta_link', {
			icon: 'dashicon dashicons-admin-generic',
			text: 'CTA',
			tooltip: 'Insert/edit CTA',
			cmd: 'sc_cta_link',
			stateSelector: 'a[data-cta-link]',
			onPostRender: function () {
			},
		} );

		editor.addButton( 'sc_cta_unlink', {
			icon: 'dashicon dashicons-editor-unlink',
			text: 'Remove CTA',
			tooltip: 'Remove CTA',
		} );

		// Do not open preview/edit link toolbar if cta link is focused.
		editor.on( 'wptoolbar', function ( event ) {
			var node = getSelectedCtaLink();
			if ( node ) {
				event.toolbar = null;
			}
		} );
	} );
} )( tinymce, jQuery );
