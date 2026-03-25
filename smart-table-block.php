<?php
/**
 * Plugin Name: Smart Table Block
 * Description: Registers Smart Table Gutenberg blocks with table, row, and cell composition.
 * Version: 1.0.0
 * Author: Smartlogix
 * License: GPL-2.0-or-later
 * Text Domain: smart-table-block
 *
 * @package SmartTableBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( defined( 'SMART_TABLE_BLOCK_VERSION' ) ) {
	return;
}

define( 'SMART_TABLE_BLOCK_VERSION', '1.0.0' );
define( 'SMART_TABLE_BLOCK_DIR', __DIR__ . '/' );

/**
 * Register the plugin blocks from their built assets.
 */
function smart_table_block_init() {
	$blocks = array(
		'smart-table',
		'smart-table-row',
		'smart-table-cell',
	);

	foreach ( $blocks as $block_name ) {
		$block_dir = SMART_TABLE_BLOCK_DIR . 'build/' . $block_name;

		if ( file_exists( $block_dir . '/block.json' ) ) {
			register_block_type( $block_dir );
		}
	}
}
add_action( 'init', 'smart_table_block_init' );