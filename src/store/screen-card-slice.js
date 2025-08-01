import { createSlice } from "@reduxjs/toolkit";
import { buildScreenerQueryString, buildPagination } from "./utility.js";
import { domain, paginationItemsPerPage } from "./constant.js";

const initialCriteria = {
	monster: [],
	type: [],
	grade: [],
	year: [],
	price: []
};
export const screenCardSlice = createSlice({
	name: "screenCard",
	initialState: {
		isLoading: false,
		isError: false,
		cards: [],
		start: 0,
		count: paginationItemsPerPage[0],
		sort: "monster",
		order: "1",
		total: 0,
		// screening criteria uses the criteria to fetch
		criteria: initialCriteria,
		// sorting and pagination uses the previousCriteria to fetch, since user could have cleared out the criteria selections. Criteria is copied into previousCriteria after each fetch
		previousCriteria: initialCriteria,
		pagination: {
			currentPage: 1,
			totalPages: 1,
			itemsPerPage: paginationItemsPerPage[0]
		}
	},
	reducers: {
		updateLoadingState(state, { payload }) {
			state.isLoading = payload;
		},
		updateErrorState(state, { payload }) {
			state.isError = payload;
		},
		updateCardScreener(state, { payload }) {
			const { data, total } = payload;
			state.cards = data;
			state.total = total;
		},
		updateMiscellaneous(state, { payload }) {
			const { start, count, sort, order } = payload;
			state.start = start;
			state.count = count;
			state.sort = sort;
			state.order = order;
		},
		updatePagination(state, { payload }) {
			state.pagination = payload;
		},
		updateSingleCriteria(state, { payload }) {
			const [key, value] = Object.entries(payload)[0];

			// can be used as bulk update or resetting a single criteria
			if (Array.isArray(value)) {
				state.criteria[key] = value;
				return;
			}

			const indexFound = state.criteria[key].findIndex(item => item === value);
			indexFound === -1 ? state.criteria[key].push(value) : state.criteria[key].splice(indexFound, 1);
		},
		resetCriteria(state) {
			state.criteria = initialCriteria;
		},
		updatePreviousCriteria(state) {
			state.previousCriteria = state.criteria;
		}
	}
});
// screener criteria is updated before fetch because we have a screen button for user to press before firing fetch, but sorting, change itemsPerPage, change page and totalPages are updated after fetch since the results depends on the fetch result

// components are responsible to calculate the start, count, sort and order before calling screenCardFetch because the calculation of these parameters depends on which button the user has pressed:
// start =
// when pressing change page: (go to page - 1) * itemsPerPage
// when pressing itemsPerPage: start is unchanged, count changes
// when pressing sort: start is unchanged, count is also unchanged
// count always = itemsPerPage
export const screenCardFetch = ({ criteria, start, count, sort, order, gotoPage, itemsPerPage, copyCriteria }) => {
	const {
		updateLoadingState,
		updateErrorState,
		updateCardScreener,
		updateMiscellaneous,
		updatePagination,
		updatePreviousCriteria
	} = screenCardSlice.actions;

	return async dispatch => {
		const getScreenCard = async () => {
			const queryString = buildScreenerQueryString({ criteria, start, count, sort, order });
			const url = `${domain}/v1/screen-card?${queryString}`;
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Screen Card Failed!");
			}

			return response.json();
		}
		dispatch(updateLoadingState(true));
		dispatch(updateErrorState(false));

		try {
			const jsonResult = await getScreenCard();
			const pagination = buildPagination({ gotoPage, itemsPerPage, total: jsonResult.total });
			dispatch(updateCardScreener(jsonResult));
			dispatch(updateMiscellaneous({ start, count, sort, order }));
			dispatch(updatePagination(pagination));

			if (copyCriteria) {
				dispatch(updatePreviousCriteria());
			}
		} catch (e) {
			// do NOT update start, count, sort and pagination when fetch fail, because we want the UI to stay as is!
			// error handling is please try again later, do not show a button to try again since we did not keep track of the previous input before fetching
			dispatch(updateErrorState(true));
		}

		dispatch(updateLoadingState(false));
	}
}
export const { updateSingleCriteria, resetCriteria } = screenCardSlice.actions;