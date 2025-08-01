import { configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./common-slice.js";
import { homepageCardSlice } from "./homepage-card-slice.js";
import { searchCardSlice } from "./search-card-slice.js";
import { screenCardSlice } from "./screen-card-slice.js";

const store = configureStore({
	reducer: {
		common: commonSlice.reducer,
		homepageCard: homepageCardSlice.reducer,
		searchCard: searchCardSlice.reducer,
		screenCard: screenCardSlice.reducer,
	}
});

export default store;