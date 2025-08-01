import { useEffect, useRef } from "react";
import { pages } from "../../store/constant.js";
import NavButton from "../nav-button/NavButton.jsx";
import classes from "./NavBar.module.scss";

const navTitles = Object.entries(pages);

function NavBar({ currentBgClass, newBgClass }) {
	const activeBg = useRef(0);
	const { bg0, bg1 } = activeBg.current ? {
		bg0: `${classes[newBgClass]} fade-in`,
		bg1: `${classes[currentBgClass]} fade-out`
	} : {
		bg0: `${classes[currentBgClass]} fade-out`,
		bg1: `${classes[newBgClass]} fade-in`
	};
	useEffect(() => {
		activeBg.current = activeBg.current ? 0 : 1;
	}, [newBgClass]);

	return (
		<>
			<div className={classes.container}>
				<div className={`${classes.navBar} ${bg0}`}></div>
				<div className={`${classes.navBar} ${bg1}`}></div>
				<nav className={classes.navBar}>
					<ul>
						{navTitles.map(([page, { route, title }]) => <NavButton key={page} page={page} route={route} title={title}/>)}
					</ul>
				</nav>
			</div>
		</>
	)
}

export default NavBar