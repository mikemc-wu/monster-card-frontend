import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { screenCardFetch } from "../../store/screen-card-slice.js";
import { screenerTableHeaders } from "../../store/constant.js";
import { paginationItemsPerPage } from "../../store/constant.js";
import classes from "./ScreenerTable.module.scss";

function ScreenerTable () {
	const dispatch = useDispatch();
	const sortableHeaders = useSelector(state => state.common.backendSortableFields);
	const cards = useSelector(state => state.screenCard.cards);
	const sort = useSelector(state => state.screenCard.sort);
	const order = useSelector(state => state.screenCard.order);
	const previousCriteria = useSelector(state => state.screenCard.previousCriteria);
	const pagination = useSelector(state => state.screenCard.pagination);
	const pageOptions = useMemo(() => {
		const pages = [];

		for (let i = 1; i <= pagination.totalPages; i++) {
			pages.push(i);
		}

		return pages;
	}, [pagination]);
	const sortedClasses = header => {
		const visibleIcon = sort === header ? classes.sort : undefined;
		const sortedOrder = order === "1" ? classes.ascending : undefined;
		return visibleIcon ? `${visibleIcon} ${sortedOrder}` : undefined;
	}
	// use your own object store domain such as S3 or R2
	const buildImageUrl = imageUrl => `/src/assets/cards/${imageUrl}.jpg`;
	const sortCards = header => {
		if (!sortableHeaders.includes(header)) {
			return;
		}

		let newOrder = "1";

		if (header === sort && order === "1") {
			newOrder = "-1";
		}

		dispatch(screenCardFetch({
			criteria: previousCriteria,
			start: 0,
			count: pagination.itemsPerPage,
			sort: header,
			order: newOrder,
			gotoPage: 1,
			itemsPerPage: pagination.itemsPerPage,
			copyCriteria: false
		}));
	}
	const paginateCards = pageNumber => {
		const gotoPage = parseInt(pageNumber);

		dispatch(screenCardFetch({
			criteria: previousCriteria,
			start: (gotoPage - 1) * pagination.itemsPerPage,
			count: pagination.itemsPerPage,
			sort,
			order,
			gotoPage,
			itemsPerPage: pagination.itemsPerPage,
			copyCriteria: false
		}));
	}
	const changeItemsPerPage = itemsPerPage => {
		dispatch(screenCardFetch({
			criteria: previousCriteria,
			start: 0,
			count: itemsPerPage,
			sort,
			order,
			gotoPage: 1,
			itemsPerPage,
			copyCriteria: false
		}));
	}

	return (
		<>
			<div className={classes.tableContainer}>
				<table className={classes.screenerTable}>
					<thead>
						<tr>
							{
								screenerTableHeaders.map(header =>
									<th
										key={header}
										scope={"col"}
										className={`${classes[header]} ${sortableHeaders.includes(header) ? classes.sortable : undefined}`}
										onClick={() => sortCards(header)}
									>
										<span>{header}</span>
										{
											sortableHeaders.includes(header)
												? <svg viewBox="0 0 24 24" stroke="currentColor" className={`${classes.sortIcon} ${sortedClasses(header)}`}>
													<path d="m3 16 4 4 4-4"/>
													<path d="M7 20V4"/>
													<path d="M11 4h10"/>
													<path d="M11 8h7"/>
													<path d="M11 12h4"/>
												</svg> : undefined
										}
									</th>)
							}
						</tr>
					</thead>
					<tbody>
					{
						cards.length ? cards.map(card =>
						<tr key={card.image}>
							{
								screenerTableHeaders.map(header =>
									<td key={header}>
										{header === "price" && `$${card[header].toFixed(2)}`}
										{
											header === "card" &&
											<a href={card.auctionUrl} target={"_blank"}>{card[header]}
												<img src={buildImageUrl(card.image)} alt=""/>
											</a>
										}
										{header !== "price" && header !== "card" && card[header]}
									</td>
								)
							}
						</tr>) : <tr></tr>
					}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={screenerTableHeaders.length}>
								{
									paginationItemsPerPage.map(item =>
										<button
											className={classes.itemsPerPage}
											key={item}
											disabled={pagination.itemsPerPage === item}
											onClick={() => changeItemsPerPage(item)}
										>
											{item}
										</button>)
								}
								<button
									className={classes.previousPage}
									disabled={pagination.currentPage === 1}
									onClick={() => paginateCards(pagination.currentPage - 1)}
								>
									<svg viewBox="0 0 24 24" >
										<circle cx="12" cy="12" r="10"/>
										<path d="m14 16-4-4 4-4"/>
									</svg>
								</button>
								<label htmlFor="select-page"></label>
								<select
									name="select-page"
									id="select-page"
									value={pagination.currentPage}
									onChange={event => paginateCards(event.target.value)}
								>
									{
										pageOptions.map(option => <option key={option} value={option}>{option}</option>)
									}
								</select>
								<button
									disabled={pagination.currentPage === pagination.totalPages}
									onClick={() => paginateCards(pagination.currentPage + 1)}
								>
									<svg viewBox="0 0 24 24">
										<circle cx="12" cy="12" r="10"/>
										<path d="m10 8 4 4-4 4"/>
									</svg>
								</button>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	)
}

export default ScreenerTable