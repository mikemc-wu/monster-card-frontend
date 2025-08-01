import { useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { fetchHintAndCriteria } from "../store/common-slice.js";
import NavBar from "../component/nav-bar/NavBar.jsx";
import classes from "./Background.module.scss";

function Background() {
	const dispatch = useDispatch();
	const hintAndCriteriaInSyncWithBackend = useSelector(state => state.common.hintAndCriteriaInSyncWithBackend);
	const background = useSelector(state => state.common.background);
	const currentBgClass = useRef(background);
	const activeBg = useRef(0);
	const { bg0, bg1 } = useMemo(() => {
		return activeBg.current ? {
			bg0: `${classes[background]} fade-in`,
			bg1: `${classes[currentBgClass.current]} fade-out`
		} : {
			bg0: `${classes[currentBgClass.current]} fade-out`,
			bg1: `${classes[background]} fade-in`
		};
	}, [background]);
	useEffect(() => {
		currentBgClass.current = background;
		activeBg.current = activeBg.current ? 0 : 1;
	}, [background]);

	if (!hintAndCriteriaInSyncWithBackend) {
		dispatch(fetchHintAndCriteria());
	}

	return (
		<>
			<div className={classes.blurFilter}></div>
			<div className={`${classes.bg} ${bg0}`}></div>
			<div className={`${classes.bg} ${bg1}`}></div>
			<NavBar currentBgClass={currentBgClass.current} newBgClass={background}/>
			<div className={classes.pageContainer}>
				<Outlet/>
			</div>
		</>
	)
}

export default Background