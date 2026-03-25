import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

const CELL_BLOCK = 'smartlogix/smart-table-cell';
const ROW_BLOCK = 'smartlogix/smart-table-row';

const createCellBlock = ( content = '' ) =>
	createBlock( CELL_BLOCK, {}, [
		createBlock( 'core/paragraph', {
			content,
			placeholder: __( 'Add cell content', 'smart-table-block' ),
		} ),
	] );

const createRowBlock = ( rowKind = 'body', cells = [] ) =>
	createBlock(
		ROW_BLOCK,
		{ rowKind },
		cells.length
			? cells.map( ( content ) => createCellBlock( content ) )
			: [ createCellBlock(), createCellBlock(), createCellBlock() ]
	);

const TEMPLATE = [
	[
		ROW_BLOCK,
		{ rowKind: 'header' },
		[
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{ content: __( 'Heading 1', 'smart-table-block' ) },
					],
				],
			],
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{ content: __( 'Heading 2', 'smart-table-block' ) },
					],
				],
			],
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{ content: __( 'Heading 3', 'smart-table-block' ) },
					],
				],
			],
		],
	],
	[
		ROW_BLOCK,
		{ rowKind: 'body' },
		[
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Row 1, cell 1',
								'smart-table-block'
							),
						},
					],
				],
			],
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Row 1, cell 2',
								'smart-table-block'
							),
						},
					],
				],
			],
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Row 1, cell 3',
								'smart-table-block'
							),
						},
					],
				],
			],
		],
	],
	[
		ROW_BLOCK,
		{ rowKind: 'body' },
		[
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Row 2, cell 1',
								'smart-table-block'
							),
						},
					],
				],
			],
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Row 2, cell 2',
								'smart-table-block'
							),
						},
					],
				],
			],
			[
				CELL_BLOCK,
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Row 2, cell 3',
								'smart-table-block'
							),
						},
					],
				],
			],
		],
	],
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		caption,
		tableLayout,
		borderCollapse,
		stripedRows,
		stickyHeader,
		responsiveScroll,
	} = attributes;

	const { insertBlock } = useDispatch( 'core/block-editor' );
	const rowCount = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockCount( clientId ),
		[ clientId ]
	);

	const addRow = ( rowKind ) => {
		insertBlock( createRowBlock( rowKind ), rowCount, clientId );
	};

	const blockProps = useBlockProps( {
		className: 'smart-table-editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smart-table-editor__body',
		},
		{
			allowedBlocks: [ ROW_BLOCK ],
			template: TEMPLATE,
			renderAppender: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Table Settings', 'smart-table-block' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Caption', 'smart-table-block' ) }
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
					/>
					<SelectControl
						label={ __( 'Table Layout', 'smart-table-block' ) }
						value={ tableLayout }
						options={ [
							{
								label: __( 'Auto', 'smart-table-block' ),
								value: 'auto',
							},
							{
								label: __( 'Fixed', 'smart-table-block' ),
								value: 'fixed',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { tableLayout: value } )
						}
					/>
					<SelectControl
						label={ __( 'Border Collapse', 'smart-table-block' ) }
						value={ borderCollapse }
						options={ [
							{
								label: __( 'Collapse', 'smart-table-block' ),
								value: 'collapse',
							},
							{
								label: __( 'Separate', 'smart-table-block' ),
								value: 'separate',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { borderCollapse: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Enable striped body rows',
							'smart-table-block'
						) }
						checked={ stripedRows }
						onChange={ ( value ) =>
							setAttributes( { stripedRows: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Sticky header rows',
							'smart-table-block'
						) }
						checked={ stickyHeader }
						onChange={ ( value ) =>
							setAttributes( { stickyHeader: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Responsive horizontal scroll',
							'smart-table-block'
						) }
						checked={ responsiveScroll }
						onChange={ ( value ) =>
							setAttributes( { responsiveScroll: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="table-row-before"
						label={ __( 'Add header row', 'smart-table-block' ) }
						onClick={ () => addRow( 'header' ) }
					/>
					<ToolbarButton
						icon="table-row-after"
						label={ __( 'Add body row', 'smart-table-block' ) }
						onClick={ () => addRow( 'body' ) }
					/>
					<ToolbarButton
						icon="table-row-after"
						label={ __( 'Add footer row', 'smart-table-block' ) }
						onClick={ () => addRow( 'footer' ) }
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<div
					className={ `smart-table-editor__scroller ${
						responsiveScroll ? 'is-scroll-enabled' : ''
					}`.trim() }
				>
					<table
						className={ `smart-table-editor__table ${
							stripedRows ? 'has-striped-rows' : ''
						} ${ stickyHeader ? 'has-sticky-header' : '' }`.trim() }
						style={ {
							tableLayout,
							borderCollapse,
						} }
					>
						{ caption && <caption>{ caption }</caption> }
						<tbody { ...innerBlocksProps } />
					</table>
				</div>
				<div className="smart-table-editor__actions">
					<Button
						variant="primary"
						onClick={ () => addRow( 'body' ) }
					>
						{ __( 'Add Body Row', 'smart-table-block' ) }
					</Button>
					<Button
						variant="secondary"
						onClick={ () => addRow( 'header' ) }
					>
						{ __( 'Add Header Row', 'smart-table-block' ) }
					</Button>
					<Button
						variant="secondary"
						onClick={ () => addRow( 'footer' ) }
					>
						{ __( 'Add Footer Row', 'smart-table-block' ) }
					</Button>
				</div>
			</div>
		</>
	);
}
