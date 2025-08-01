import { createSlice } from "@reduxjs/toolkit";
import { alphabetizeMonsters } from "./utility.js";
import {
	frontendMonsters,
	frontendMonsterTypes,
	frontendCardGrades,
	frontendCardYears,
	frontendCardPrices,
	domain,
	frontendSearchableFields,
	frontendSortableFields
} from "./constant.js";

export const commonSlice = createSlice({
	name: "common",
	initialState: {
		background: frontendMonsterTypes[0],
		backendMonsters: frontendMonsters,
		backendMonsterTypes: frontendMonsterTypes,
		backendCardGrades: frontendCardGrades,
		backendCardYears: frontendCardYears,
		backendCardPrices: frontendCardPrices,
		backendSearchableFields: frontendSearchableFields,
		backendSortableFields: frontendSortableFields,
		backendAlphabetizedMonsters: alphabetizeMonsters(frontendMonsters),
		hintAndCriteriaInSyncWithBackend: false
	},
	reducers: {
		updateBackground(state, { payload }) {
			state.background = payload;
		},
		updateHintAndCriteriaInSync(state, { payload }) {
			state.hintAndCriteriaInSyncWithBackend = payload;
		},
		updateHintAndCriteria(state, { payload }) {
			const { monsters, monsterTypes, cardGrades, cardYears, cardPrices, searchableFields, sortableFields } = payload.data;
			state.backendMonsters = monsters;
			state.backendMonsterTypes = monsterTypes;
			state.backendCardGrades = cardGrades;
			state.backendCardYears = cardYears;
			state.backendCardPrices = cardPrices;
			state.backendSearchableFields = searchableFields;
			state.backendSortableFields = sortableFields;
			state.backendAlphabetizedMonsters = alphabetizeMonsters(monsters);
		}
	}
});
export const fetchHintAndCriteria = () => { // use router to check inSync and trigger this action!
	const {
		updateHintAndCriteria,
		updateHintAndCriteriaInSync
	} = commonSlice.actions;

	return async dispatch => {
		try {
			const url = `${domain}/v1/hint-and-criteria`;
			const response = await fetch(url);

			if (response.ok) {
				const jsonResult = await response.json();
				dispatch(updateHintAndCriteria(jsonResult));
				dispatch(updateHintAndCriteriaInSync(true));
			}
		} catch (e) {
			// Do nothing and fail gracefully since these data does not strictly affect site functionality!
		}
	}
}
export const { updateBackground } = commonSlice.actions;