import { useMemo } from "react";
import { useSelector } from "react-redux";
import Criteria from "../../component/criteria/Criteria.jsx";
import ScreenerTable from "../../component/screener-table/ScreenerTable.jsx";
import classes from "./CardScreener.module.scss";
import LoadingSpinner from "../../component/loading-spinner/LoadingSpinner.jsx";
import ErrorMessage from "../../component/error-message/ErrorMessage.jsx";
import EmptyFeedback from "../../component/empty-feedback/EmptyFeedback.jsx";
import { pages } from "../../store/constant.js";

const [page] = Object.entries(pages)[3];

function CardScreener() {
	const cards = useSelector(state => state.screenCard.cards);
	const isLoading = useSelector(state => state.screenCard.isLoading);
	const isError = useSelector(state => state.screenCard.isError);
	const isEmpty = useMemo(() => !isLoading && !isError && !cards.length, [isLoading, isError, cards]);

	return (
		<>
			<div className={classes.container}>
				<Criteria></Criteria>
				<div className={classes.statusContainer}>
					{(isLoading || isError || isEmpty) && <div className={classes.statusOverlay}>
						{isLoading && <LoadingSpinner page={page}></LoadingSpinner>}
						{isError && <ErrorMessage></ErrorMessage>}
						{isEmpty && <EmptyFeedback></EmptyFeedback>}
					</div>}
					<ScreenerTable></ScreenerTable>
				</div>
			</div>
		</>
	)
}

export default CardScreener