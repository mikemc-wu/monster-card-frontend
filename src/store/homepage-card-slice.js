import { createSlice } from "@reduxjs/toolkit";
import { updateBackground } from "./common-slice.js";
import { domain, frontendMonsters } from "./constant.js";

export const homepageCardSlice = createSlice({
	name: "homepageCard",
	initialState: {
		isLoading: true,
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
export const fetchHomepageCard = () => {
	const {
		updateLoadingState,
		updateErrorState,
		updateCardSearch
	} = homepageCardSlice.actions;

	return async dispatch => {
		const getMonsterCard = async () => {
			const randomIndex = Math.floor(Math.random() * frontendMonsters.length);
			const monster = frontendMonsters[randomIndex];
			const url = `${domain}/v1/search-card?monster=${encodeURIComponent(monster)}`;
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Get Homepage Card Failed!");
			}

			return response.json();
		}
		dispatch(updateLoadingState(true));
		dispatch(updateErrorState(false));

		try {
			const jsonResult = await getMonsterCard();
			dispatch(updateCardSearch(jsonResult))

			if (jsonResult.data.length) {
				dispatch(updateBackground(jsonResult.data[0].type));
			}
		} catch (e) {
			dispatch(updateErrorState(true));
		}

		dispatch(updateLoadingState(false));
	}
}

// error handling is please reload or press home navigation button, do not show a button to try again since we did not keep track of the previous input before fetching