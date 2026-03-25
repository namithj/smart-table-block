<?php
/**
 * Smart Table block server-side render.
 *
 * @package   SmartTableBlock
 * @author    Smartlogix
 * @license   GPL-2.0-or-later
 * @link      https://github.com/namithj/smart-table-block
 * @category  WordPress
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner-block HTML.
 * @var WP_Block $block      Block instance.
 */

if ( !defined( 'ABSPATH' ) ) {
	exit;
}

$caption = $attributes['caption'] ?? '';

$table_layout = in_array(
	$attributes['tableLayout'] ?? 'auto',
	array( 'auto', 'fixed' ),
	true
) ? $attributes['tableLayout'] : 'auto';

$border_collapse = in_array(
	$attributes['borderCollapse'] ?? 'collapse',
	array( 'collapse', 'separate' ),
	true
) ? $attributes['borderCollapse'] : 'collapse';

$striped_rows = ! empty( $attributes['stripedRows'] );
$sticky_header = ! empty( $attributes['stickyHeader'] );
$responsive_scroll = ! array_key_exists( 'responsiveScroll', $attributes ) ||
	! empty( $attributes['responsiveScroll'] );

if ( empty( $block->inner_blocks ) ) {
	return;
}

$section_rows = array(
	'header' => array(),
	'body'   => array(),
	'footer' => array(),
);

foreach ( $block->inner_blocks as $row_block ) {
	$row_kind = $row_block->attributes['rowKind'] ?? 'body';

	if ( ! isset( $section_rows[ $row_kind ] ) ) {
		$row_kind = 'body';
	}

	$section_rows[ $row_kind ][] = $row_block;
}

$wrapper_classes = array( 'smart-table-block' );

if ( $striped_rows ) {
	$wrapper_classes[] = 'has-striped-rows';
}

if ( $sticky_header ) {
	$wrapper_classes[] = 'has-sticky-header';
}

if ( $responsive_scroll ) {
	$wrapper_classes[] = 'has-responsive-scroll';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $wrapper_classes ),
	)
);

$table_attributes = sprintf(
	'class="smart-table-block__table smart-table-block__table--layout-%1$s smart-table-block__table--border-%2$s" style="table-layout:%1$s;border-collapse:%2$s;"',
	esc_attr( $table_layout ),
	esc_attr( $border_collapse )
);

$render_section = static function ( $tag_name, $rows ) {
	if ( empty( $rows ) ) {
		return '';
	}

	ob_start();
	?>
	<<?php echo esc_html( $tag_name ); ?>>
		<?php foreach ( $rows as $row ) : ?>
			<?php echo $row->render(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php endforeach; ?>
	</<?php echo esc_html( $tag_name ); ?>>
	<?php
	return ob_get_clean();
};
?>

<figure <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> >
	<div class="smart-table-block__scroller">
		<table <?php echo $table_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> >
			<?php if ( '' !== $caption ) : ?>
				<caption><?php echo wp_kses_post( $caption ); ?></caption>
			<?php endif; ?>
			<?php echo $render_section( 'thead', $section_rows['header'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo $render_section( 'tbody', $section_rows['body'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo $render_section( 'tfoot', $section_rows['footer'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</table>
	</div>
</figure>