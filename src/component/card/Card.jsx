import { memo, useState } from "react";
import classes from "./Card.module.scss";

const Card = memo(({ card }) => {
	const [isLoading, setIsLoading] = useState(true);
	// use your own domain and object store to serve images such as S3 or R2
	const imageUrl = `/src/assets/cards/${card.image}.jpg`;
	const grade = card.grade ? card.grade : "Autograph";
	const finishLoading = () => {
		setIsLoading(false);
	}

	return (
		<>
			<div className={classes.container}>
				<a target={"_blank"} href={card.auctionUrl}></a>
				{isLoading && <div className={classes.loadingOverlay}></div>}
				<img src={imageUrl} alt={card.monster} onLoad={finishLoading}/>
				<div className={classes.overlay}>
					<h2>{card.monster.toUpperCase()}</h2>
					<h4>{card.card}</h4>
					<p>Type: {card.type.toUpperCase()}</p>
					<p>Grade: {grade}</p>
					<p>Year: {card.year}</p>
					<p>Price: ${card.price.toFixed(2)}</p>
				</div>
			</div>
		</>
	)
});

export default Card