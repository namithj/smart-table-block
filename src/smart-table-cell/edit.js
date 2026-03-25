import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __( 'Add cell content', 'smart-table-block' ),
		},
	],
];

export default function Edit( { attributes, setAttributes, context, clientId } ) {
	const { colSpan, rowSpan, width, verticalAlign, scope } = attributes;
	const rowKind = context[ 'smartlogix/smart-table/rowKind' ] || 'body';
	const TagName = 'header' === rowKind ? 'th' : 'td';
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const { allCellIds, isFirstRow } = useSelect(
		( select ) => {
			const blockEditor = select( 'core/block-editor' );
			const rowClientId = blockEditor.getBlockRootClientId( clientId );
			const tableClientId = rowClientId
				? blockEditor.getBlockRootClientId( rowClientId )
				: null;
			const rowIds = tableClientId
				? blockEditor.getBlockOrder( tableClientId ) || []
				: [];
			const firstRowClientId = rowIds[ 0 ] || rowClientId || null;

			if ( ! tableClientId ) {
				return {
					allCellIds: rowClientId
						? blockEditor.getBlockOrder( rowClientId ) || []
						: [],
					isFirstRow: !! rowClientId,
				};
			}

			return {
				allCellIds: rowIds.flatMap(
					( currentRowClientId ) =>
						blockEditor.getBlockOrder( currentRowClientId ) || []
				),
				isFirstRow: rowClientId === firstRowClientId,
			};
		},
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: `smart-table-cell smart-table-cell--${ rowKind }`,
		colSpan,
		rowSpan,
		scope: 'header' === rowKind ? scope || 'col' : undefined,
		style: {
			width: width || undefined,
			verticalAlign: verticalAlign || undefined,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		renderAppender: false,
	} );

	const applyCellStylesToAllCells = () => {
		updateBlockAttributes( allCellIds, {
			backgroundColor: attributes.backgroundColor,
			borderColor: attributes.borderColor,
			fontSize: attributes.fontSize,
			gradient: attributes.gradient,
			style: attributes.style,
			textColor: attributes.textColor,
			verticalAlign,
			width,
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Cell Settings', 'smart-table-block' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Column Span', 'smart-table-block' ) }
						value={ colSpan }
						onChange={ ( value ) =>
							setAttributes( {
								colSpan: Math.max( 1, value || 1 ),
							} )
						}
						min={ 1 }
						max={ 12 }
					/>
					<RangeControl
						label={ __( 'Row Span', 'smart-table-block' ) }
						value={ rowSpan }
						onChange={ ( value ) =>
							setAttributes( {
								rowSpan: Math.max( 1, value || 1 ),
							} )
						}
						min={ 1 }
						max={ 12 }
					/>
					<TextControl
						label={ __( 'Width', 'smart-table-block' ) }
						value={ width }
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
						placeholder="e.g. 240px, 20%, 12rem"
						help={
							isFirstRow
								? __(
									'Widths set on first-row cells define the table columns.',
									'smart-table-block'
								)
								: __(
									'Use first-row cells to define column widths for the whole table.',
									'smart-table-block'
								)
						}
					/>
					<SelectControl
						label={ __( 'Vertical Align', 'smart-table-block' ) }
						value={ verticalAlign }
						options={ [
							{
								label: __( 'Default', 'smart-table-block' ),
								value: '',
							},
							{
								label: __( 'Top', 'smart-table-block' ),
								value: 'top',
							},
							{
								label: __( 'Middle', 'smart-table-block' ),
								value: 'middle',
							},
							{
								label: __( 'Bottom', 'smart-table-block' ),
								value: 'bottom',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { verticalAlign: value } )
						}
					/>
					{ 'header' === rowKind && (
						<SelectControl
							label={ __( 'Header Scope', 'smart-table-block' ) }
							value={ scope }
							options={ [
								{
									label: __( 'Column', 'smart-table-block' ),
									value: 'col',
								},
								{
									label: __( 'Row', 'smart-table-block' ),
									value: 'row',
								},
								{
									label: __(
										'Column Group',
										'smart-table-block'
									),
									value: 'colgroup',
								},
								{
									label: __(
										'Row Group',
										'smart-table-block'
									),
									value: 'rowgroup',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { scope: value } )
							}
						/>
					) }
					<Button
						variant="secondary"
						onClick={ applyCellStylesToAllCells }
					>
						{ __( 'Apply This Cell Style To All Cells', 'smart-table-block' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<TagName { ...innerBlocksProps } />
		</>
	);
}
