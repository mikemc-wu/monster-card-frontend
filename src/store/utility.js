export const buildScreenerQueryString = ({ criteria, start, count, sort, order }) => {
	const criteriaString = Object.entries(criteria).reduce((acc, [key, value]) => {
		if (!value.length) {
			return acc;
		}
		const valueString = encodeURIComponent(value.join(","));
		return acc + `${key}=${valueString}&`;
	}, "");
	const sortValueString = encodeURIComponent(`${sort},${order}`);
	return `${criteriaString}start=${start}&count=${count}&sort=${sortValueString}`;
};
export const buildPagination = ({ gotoPage, itemsPerPage, total }) => {
	const totalPages = Math.ceil(total / itemsPerPage);
	return {
		currentPage: gotoPage,
		totalPages,
		itemsPerPage
	};
}
export const debounce = (callback, delay = 300) => {
	let timer;

	return () => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback();
		}, delay);
	}
}
export const alphabetizeMonsters = monsters => {
	// do not need to sort monsters since backend should have returned a sorted monsters array
	const firstAlphabetCharCode = "a".charCodeAt(0);
	const lastAlphabetCharCode = "z".charCodeAt(0);
	const alphabetizedMonsters = {};

	monsters.forEach(monster => {
		const firstLetter = Array.from(monster.toLowerCase())[0];
		const firstLetterCharCode = firstLetter.charCodeAt(0);

		if (firstLetterCharCode >= firstAlphabetCharCode && firstLetterCharCode <= lastAlphabetCharCode) {
			alphabetizedMonsters[firstLetter] = (alphabetizedMonsters[firstLetter] || []).concat([monster]);
		} else {
			alphabetizedMonsters.others = (alphabetizedMonsters.others || []).concat([monster]);
		}
	});

	return alphabetizedMonsters;
}
