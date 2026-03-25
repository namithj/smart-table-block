import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

const CELL_BLOCK = 'smartlogix/smart-table-cell';

const createCellBlock = () =>
	createBlock( CELL_BLOCK, {}, [
		createBlock( 'core/paragraph', {
			placeholder: __( 'Add cell content', 'smart-table-block' ),
		} ),
	] );

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { rowKind } = attributes;
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const cellCount = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockCount( clientId ),
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: `smart-table-row smart-table-row--${ rowKind }`,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ CELL_BLOCK ],
		renderAppender: false,
		orientation: 'horizontal',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Row Settings', 'smart-table-block' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Row Type', 'smart-table-block' ) }
						value={ rowKind }
						options={ [
							{
								label: __( 'Header Row', 'smart-table-block' ),
								value: 'header',
							},
							{
								label: __( 'Body Row', 'smart-table-block' ),
								value: 'body',
							},
							{
								label: __( 'Footer Row', 'smart-table-block' ),
								value: 'footer',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { rowKind: value } )
						}
						help={ __(
							'Header rows render cells as <th>. Body and footer rows render cells as <td>.',
							'smart-table-block'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="table-col-after"
						label={ __( 'Add cell', 'smart-table-block' ) }
						onClick={ () =>
							insertBlock(
								createCellBlock(),
								cellCount,
								clientId
							)
						}
					/>
				</ToolbarGroup>
			</BlockControls>

			<tr { ...innerBlocksProps } />
		</>
	);
}
