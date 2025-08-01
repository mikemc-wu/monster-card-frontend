import { useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchCard } from "../../store/search-card-slice.js";
import { debounce } from "../../store/utility.js";
import { wrap } from "comlink";
import Select from "react-select";
import classes from "./SearchInput.module.scss";

const fuzzySearchWorker = new Worker(new URL("/src/web-worker/fuzzy-search.js", import.meta.url), { name: 'fuzzy-search', type: 'module' });
const fuzzy = wrap(fuzzySearchWorker);
const customSelectStyle = {
	control: styles => ({
		...styles,
		minWidth: "100px",
		maxWidth: "120px",
		height: "2.6rem",
		textAlign: "center",
		textTransform: "capitalize",
		border: "none",
		boxShadow: "none",
		borderRadius: "1rem 0 0 1rem",
	}),
	menu: styles => ({ ...styles, marginTop: "0.2rem" }),
	option: styles => ({ ...styles, textTransform: "capitalize" })
};

function SearchInput() {
	const dispatch = useDispatch();
	const monsters = useSelector(state => state.common.backendMonsters);
	const monsterTypes = useSelector(state => state.common.backendMonsterTypes);
	const cardGrades = useSelector(state => state.common.backendCardGrades);
	const searchableFields = useSelector(state => state.common.backendSearchableFields);
	const searchSelectOptions = useMemo(() => searchableFields.map(field => ({ value: field, label: field })), [searchableFields]);
	const fuzzySearchableFields = useMemo(() => searchableFields.slice(0, 2), [searchableFields]);
	const [searchField, setSearchField] = useState(searchSelectOptions[0].value);
	const [searchHints, setSearchHints] = useState([]);
	const searchInputTag = useRef();
	const buildSearchHints = event => {
		if (!fuzzySearchableFields.includes(searchField)) {
			return;
		}

		const searchInput = event.target.value;
		const searchItems = searchField === "monster" ? monsters : monsterTypes;
		debounce(async () => {
			const results = await fuzzy.searchItem({ searchInput, searchItems });
			setSearchHints(results);
		})();
	}
	const changeSelect = selectedValue => {
		setSearchField(selectedValue);
		setSearchHints([]);
		searchInputTag.current.value = "";
	}
	const validateAndSearch = () => {
		const searchInputValue = searchInputTag.current.value;

		if (searchField === "grade") {
			cardGrades.includes(parseInt(searchInputValue))
				? dispatch(fetchSearchCard({ field: searchField, value: searchInputValue }))
				: alert(`Each monster card is grade on a scale of ${cardGrades.join(", ")}, please input a valid card grade`);
			return;
		}

		if (searchField === "year") {
			const yearNow = (new Date()).getFullYear();
			const parsedYear = parseInt(searchInputValue);
			parsedYear >= 1990 && parsedYear <= yearNow
				? dispatch(fetchSearchCard({ field: searchField, value: searchInputValue }))
				: alert("The first monster card is first launched in the year 1990, please input a valid card year");
			return;
		}

		if (searchField === "type") {
			monsterTypes.includes(searchInputValue)
				? dispatch(fetchSearchCard({ field: searchField, value: searchInputValue }))
				: alert(`A monster must belong to one of these types: ${monsterTypes.join(", ")}, please input a valid monster type`);
			return;
		}

		dispatch(fetchSearchCard({ field: searchField, value: searchInputValue }))
	}
	const search = event => {
		event.preventDefault();
		validateAndSearch();
	}
	const setSearchInputValue = event => {
		searchInputTag.current.value = event.target.textContent;
		validateAndSearch();
	}

	return (
		<>
			<form onSubmit={search} className={classes.liquidGlassForm}>
				<div className={classes.selectContainer}>
					<Select
						defaultValue={searchSelectOptions[0]}
						options={searchSelectOptions}
						styles={customSelectStyle}
						className={classes.searchSelect}
						onChange={({ value }) => changeSelect(value)}
					/>
				</div>
				<div className={classes.searchInputContainer}>
					<label htmlFor="search-input"></label>
					<input
						id={"search-input"}
						type="text"
						name={"search-input"}
						placeholder={"Search"}
						onChange={buildSearchHints}
						ref={searchInputTag}
					/>
					{fuzzySearchableFields.includes(searchField) && <ul>
						{searchHints.map(hint => <li key={hint.item} onClick={setSearchInputValue}>{hint.item}</li>)}
					</ul>}
				</div>
				<div className={classes.searchButtonContainer}>
					<button type={"submit"}>
						<svg viewBox="0 0 24 24">
							<path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"/>
						</svg>
					</button>
				</div>
			</form>
		</>
	)
}

export default SearchInput