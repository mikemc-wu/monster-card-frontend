import { createPortal } from "react-dom";
import classes from "./Modal.module.scss";

function Modal ({ children, modalRef, title, selectedOptions, clearModal }) {
	const selectionCount = selectedOptions.length;

	return createPortal(
		<dialog ref={modalRef} className={classes.container} >
			<div className={classes.header}>
				<h4 className={classes.title}>{title}</h4>
				<span className={classes.selectionCount}>{selectionCount}</span>
			</div>
			{children}
			<form method={"dialog"} className={classes.footer}>
				<button type={"reset"} onClick={clearModal}>Clear</button>
				<button type={"submit"} className={classes.btnDone}>Done</button>
			</form>
		</dialog>,
		document.querySelector("#modal")
	);
}

export default Modal;