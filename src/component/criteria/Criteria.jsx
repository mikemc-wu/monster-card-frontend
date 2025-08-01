import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef } from "react";
import { updateSingleCriteria, resetCriteria, screenCardFetch } from "../../store/screen-card-slice.js";
import Accordion from "../accordion/Accordion.jsx";
import Modal from "../modal/Modal.jsx";
import classes from "./Criteria.module.scss";

function Criteria () {
	const dispatch = useDispatch();
	const modalRef = useRef();
	const alphabetizedMonsters = useSelector(state => state.common.backendAlphabetizedMonsters);
	const monsterTypes = useSelector(state => state.common.backendMonsterTypes);
	const cardGrades = useSelector(state => state.common.backendCardGrades);
	const cardYears = useSelector(state => state.common.backendCardYears);
	const cardPrices = useSelector(state => state.common.backendCardPrices);
	const isLoading = useSelector(state => state.screenCard.isLoading);
	const criteria = useSelector(state => state.screenCard.criteria);
	const sort = useSelector(state => state.screenCard.sort);
	const order = useSelector(state => state.screenCard.order);
	const pagination = useSelector(state => state.screenCard.pagination);
	const canScreenOrClear = useMemo(() => !!(criteria.monster.length || criteria.type.length || criteria.grade.length || criteria.year.length || criteria.price.length), [criteria]);
	const updateCriteria = payload => {
		dispatch(updateSingleCriteria(payload));
	}
	const clearForm = () => {
		dispatch(resetCriteria());
	}
	const clearModal = () => {
		dispatch(updateSingleCriteria({ monster: [] }));
	}
	const screen = event => {
		event.preventDefault();
		dispatch(screenCardFetch({
			criteria,
			start: 0,
			count: pagination.itemsPerPage,
			sort,
			order,
			gotoPage: 1,
			itemsPerPage: pagination.itemsPerPage,
			copyCriteria: true
		}));
	}

	return (
		<>
			<Modal modalRef={modalRef} title={"Select Monsters"} selectedOptions={criteria.monster} clearModal={clearModal}>
				<form className={classes.modalContents}>
					{
						Object.entries(alphabetizedMonsters).map(([alphabet, monsters]) =>
							<div key={alphabet} className={classes.alphabetGroup}>
								<h5 className={classes.alphabetTitle}>{alphabet}</h5>
								{
									monsters.map(monster =>
										<div key={`${monster}-div`} className={classes.selections}>
											<input id={monster} name={monster} value={monster} type="checkbox" checked={criteria.monster.includes(monster)} onChange={e => updateCriteria({ monster: e.target.value })}/>
											<label htmlFor={monster}>{monster}</label>
										</div>
									)
								}
							</div>
						)
					}
				</form>
			</Modal>
			<form onSubmit={screen} className={classes.container}>
				<Accordion title={"Monster"} modalRef={modalRef} selectedOptions={criteria.monster}></Accordion>
				<Accordion title={"Type"} selectedOptions={criteria.type}>
					{
						monsterTypes.map(monsterType =>
							<div key={`${monsterType}-div`} className={classes.selections}>
								<input id={monsterType} name={monsterType} value={monsterType} type="checkbox" checked={criteria.type.includes(monsterType)} onChange={e => updateCriteria({ type: e.target.value })}/>
								<label htmlFor={monsterType}>{monsterType}</label>
							</div>)
					}
				</Accordion>
				<Accordion title={"Grade"} selectedOptions={criteria.grade}>
					{
						cardGrades.map(cardGrade =>
							<div key={`${cardGrade}-div`} className={classes.selections}>
								<input id={cardGrade} name={cardGrade} value={cardGrade} type="checkbox" checked={criteria.grade.includes(cardGrade.toString())} onChange={e => updateCriteria({ grade: e.target.value })}/>
								<label htmlFor={cardGrade}>{cardGrade}</label>
							</div>)
					}
				</Accordion>
				<Accordion title={"Year"} selectedOptions={criteria.year}>
					{
						cardYears.map(cardYear =>
							<div key={`${cardYear}-div`} className={classes.selections}>
								<input id={cardYear} name={cardYear} value={cardYear} type="checkbox" checked={criteria.year.includes(cardYear)} onChange={e => updateCriteria({ year: e.target.value })}/>
								<label htmlFor={cardYear}>{cardYear}</label>
							</div>)
					}
				</Accordion>
				<Accordion title={"Price"} selectedOptions={criteria.price}>
					{
						cardPrices.map(cardPrice =>
							<div key={`${cardPrice}-div`} className={classes.selections}>
								<input id={cardPrice} name={cardPrice} value={cardPrice} type="checkbox" checked={criteria.price.includes(cardPrice)} onChange={e => updateCriteria({ price: e.target.value })}/>
								<label htmlFor={cardPrice}>{cardPrice}</label>
							</div>)
					}
				</Accordion>
				<div className={classes.btnContainer}>
					<button type={"submit"} className={classes.btnScreen} disabled={isLoading || !canScreenOrClear}>Screen</button>
					<button type={"reset"} className={classes.btnClear} onClick={clearForm}>Clear</button>
				</div>
			</form>
		</>
	)
}

export default Criteria