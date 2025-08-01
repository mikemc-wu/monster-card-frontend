import { useMemo } from "react";
import { useSelector } from "react-redux";
import { pages } from "../../store/constant.js";
import LoadingSpinner from "../../component/loading-spinner/LoadingSpinner.jsx";
import ErrorMessage from "../../component/error-message/ErrorMessage.jsx";
import EmptyFeedback from "../../component/empty-feedback/EmptyFeedback.jsx";
import SearchInput from "../../component/search-input/SearchInput.jsx";
import Card from "../../component/card/Card.jsx";
import classes from "./SearchCard.module.scss";


const [page] = Object.entries(pages)[2];

function SearchCard() {
	const isLoading = useSelector(state => state.searchCard.isLoading);
	const isError = useSelector(state => state.searchCard.isError);
	const cards = useSelector(state => state.searchCard.cards);
	const isEmpty = useMemo(() => !isLoading && !isError && !cards.length, [isLoading, isError, cards]);

	return (
		<>
			<div className={classes.container}>
				<SearchInput></SearchInput>
				{isLoading && <div className={classes.loadingSpinner}><LoadingSpinner page={page}></LoadingSpinner></div>}
				{isError && <div className={classes.errorMessage}><ErrorMessage></ErrorMessage></div>}
				{isEmpty && <div className={classes.emptyMessage}><EmptyFeedback></EmptyFeedback></div>}
				{!isLoading && !isError && !isEmpty && <div className={classes.cardWrapper}>{cards.map(card => <Card key={card.image} card={card}></Card>)}</div>}
			</div>
		</>
	)
}

export default SearchCard