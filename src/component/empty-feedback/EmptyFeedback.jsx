import { memo } from "react";
import classes from "./EmptyFeedback.module.scss";

const EmptyFeedback = memo(({ message }) => {
	return (
		<>
			<div className={classes.container}>
				<p>We Found No Matches!</p>
				<div className={classes.emptyBackground}></div>
				{message ? <p className={classes.customMessage}>{message}</p> : undefined}
			</div>
		</>
	)
});

export default EmptyFeedback