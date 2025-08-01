import { memo } from "react";
import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = memo(({ page }) => {
	return (
		<>
			<div className={classes.container}>
				<svg width="100%" height="100%" className={`${classes.spinner} ${classes[page]}`}>
					<circle cx="50%" cy="50%" r="45%"/>
				</svg>
				<div className={classes.animatedBackground}></div>
			</div>
		</>
	)
});

export default LoadingSpinner