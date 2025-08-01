import { memo } from "react";
import classes from "./ErrorMessage.module.scss";

const ErrorMessage = memo(({ message }) => {
	return (
		<>
			<div className={classes.container}>
				<p>Oops! Something Went Wrong!</p>
				<div className={classes.errorBackground}></div>
				{message ? <p className={classes.customMessage}>{message}</p> : undefined}
			</div>
		</>
	)
});

export default ErrorMessage