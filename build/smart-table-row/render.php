<?php
/**
 * Smart Table Row block server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner-block HTML.
 * @var WP_Block $block      Block instance.
 *
 * @package SmartTableBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( empty( $block->inner_blocks ) ) {
	return;
}

$row_kind = $attributes['rowKind'] ?? 'body';

if ( ! in_array( $row_kind, array( 'header', 'body', 'footer' ), true ) ) {
	$row_kind = 'body';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'smart-table-row smart-table-row--' . $row_kind,
	)
);
?>

<tr <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> >
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</tr>