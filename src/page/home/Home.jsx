import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHomepageCard } from "../../store/homepage-card-slice.js";
import LoadingSpinner from "../../component/loading-spinner/LoadingSpinner.jsx";
import ErrorMessage from "../../component/error-message/ErrorMessage.jsx";
import Card from "../../component/card/Card.jsx";
import classes from "./Home.module.scss";
import { pages } from "../../store/constant.js";

const [page] = Object.entries(pages)[0];

function Home() {
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.homepageCard.isLoading);
	const isError = useSelector(state => state.homepageCard.isError);
	const cards = useSelector(state => state.homepageCard.cards);
	const monsterType = cards.length ? cards[0].type : "normal";

	useEffect(() => {
		dispatch(fetchHomepageCard());
	}, []);

	return (
		<>
			<div className={classes.container}>
				{isLoading && <div className={classes.loadingSpinner}><LoadingSpinner page={page}></LoadingSpinner></div>}
				{isError && <div className={classes.errorMessage}><ErrorMessage></ErrorMessage></div>}
				{!isLoading && !isError && <h1 className={`${classes.title} ${classes[monsterType]}`}>Check out these awesome Monster cards!</h1>}
				{!isLoading && !isError && <div className={classes.cardWrapper}>{cards.map(card => <Card key={card.image} card={card}></Card>)}</div>}
			</div>
		</>
	)
}

export default Home