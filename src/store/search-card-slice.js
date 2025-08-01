import { createSlice } from "@reduxjs/toolkit";
import { domain } from "./constant.js";
import { updateBackground } from "./common-slice.js";

export const searchCardSlice = createSlice({
	name: "searchCard",
	initialState: {
		isLoading: false,
		isError: false,
		cards: [],
		total: 0
	},
	reducers: {
		updateLoadingState(state, { payload }) {
			state.isLoading = payload;
		},
		updateErrorState(state, { payload }) {
			state.isError = payload;
		},
		updateCardSearch(state, { payload }) {
			const { data, total } = payload;
			state.cards = data;
			state.total = total;
		}
	}
});
export const fetchSearchCard = ({ field, value }) => {
	const {
		updateLoadingState,
		updateErrorState,
		updateCardSearch
	} = searchCardSlice.actions;

	return async dispatch => {
		const getSearchCard = async () => {
			const url = `${domain}/v1/search-card?${field}=${encodeURIComponent(value)}`;
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Search Card Failed!");
			}

			return response.json();
		}
		dispatch(updateLoadingState(true));
		dispatch(updateErrorState(false));

		try {
			const jsonResult = await getSearchCard();
			dispatch(updateCardSearch(jsonResult));

			if (jsonResult.data.length) {
				dispatch(updateBackground(jsonResult.data[0].type));
			}
		} catch (e) {
			dispatch(updateErrorState(true));
		}

		dispatch(updateLoadingState(false));
	}
}

// error handling is please try again later, do not show a button to try again since we did not keep track of the previous input before fetching