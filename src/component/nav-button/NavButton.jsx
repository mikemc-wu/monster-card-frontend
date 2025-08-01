import { memo } from "react";
import { Link, useMatch } from "react-router";
import classes from "./NavButton.module.scss";

const NavButton = memo(({ page, route, title }) => {
	const match = useMatch(route);

	return (
		<>
			<li className={`${classes.navBtn} ${classes[page]} ${match ? classes.active : undefined}`}>
				<Link to={route} end="true">{title}</Link>
			</li>
		</>
	)
});

export default NavButton