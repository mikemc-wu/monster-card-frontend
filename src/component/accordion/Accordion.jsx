import { useMemo, useState } from "react";
import classes from "./Accordion.module.scss";

function Accordion ({ children, selectedOptions, title, modalRef }) {
	const [expanded, setExpanded] = useState(false);
	const expandClass = useMemo(() => expanded ? "expand" : "", [expanded]);
	const selectionCount = selectedOptions.length;
	const expandCollapse = () => {
		if (modalRef) {
			modalRef.current.showModal();
			return;
		}

		setExpanded(oldBoo => !oldBoo);
	}

	return (
		<>
			<button type={"button"} className={classes.btnHeading} onClick={expandCollapse}>
				<span className={classes.titleContainer}>
					<span className={classes.title}>{title}</span>
					<span className={classes.selectionCount}>{selectionCount}</span>
				</span>
				<svg className={classes.expandIcon} viewBox="0 0 20 20">
					<path d="M1 10H19"/>
					<path className={classes[expandClass]} d="M10 1V19"/>
				</svg>
			</button>
			<div className={`${classes.contents} ${classes[expandClass]}`}>
				{children}
			</div>
		</>
	)
}

export default Accordion