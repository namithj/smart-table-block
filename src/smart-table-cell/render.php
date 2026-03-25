<?php
/**
 * Smart Table Cell block server-side render.
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

$row_kind = $block->context['smartlogix/smart-table/rowKind'] ?? 'body';
$tag_name = 'header' === $row_kind ? 'th' : 'td';
$col_span = max( 1, (int) ( $attributes['colSpan'] ?? 1 ) );
$row_span = max( 1, (int) ( $attributes['rowSpan'] ?? 1 ) );
$width    = isset( $attributes['width'] ) ? trim( (string) $attributes['width'] ) : '';

$vertical_align = $attributes['verticalAlign'] ?? '';

if ( ! in_array( $vertical_align, array( '', 'top', 'middle', 'bottom' ), true ) ) {
	$vertical_align = '';
}

$style_parts = array();

if ( '' !== $width ) {
	$style_parts[] = 'width:' . $width;
}

if ( '' !== $vertical_align ) {
	$style_parts[] = 'vertical-align:' . $vertical_align;
}

$extra_attributes = array(
	'class' => 'smart-table-cell smart-table-cell--' . $row_kind,
);

if ( ! empty( $style_parts ) ) {
	$extra_attributes['style'] = implode( ';', $style_parts );
}

$wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );
$scope              = $attributes['scope'] ?? '';

if ( 'th' === $tag_name && ! in_array( $scope, array( '', 'col', 'row', 'colgroup', 'rowgroup' ), true ) ) {
	$scope = 'col';
}
?>

<<?php echo esc_html( $tag_name ); ?>
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	colspan="<?php echo esc_attr( $col_span ); ?>"
	rowspan="<?php echo esc_attr( $row_span ); ?>"
	<?php if ( 'th' === $tag_name ) : ?>scope="<?php echo esc_attr( $scope ? $scope : 'col' ); ?>"<?php endif; ?>
>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</<?php echo esc_html( $tag_name ); ?>>