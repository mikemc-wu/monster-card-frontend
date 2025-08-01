import Fuse from "fuse.js";
import { expose } from "comlink";

const fuzzy = {
	searchItem({ searchInput, searchItems }) {
		const fuse = new Fuse(searchItems, {
			isCaseSensitive: false,
			shouldSort: true,
			minMatchCharLength: 2,
			threshold: 0.6,
			ignoreLocation: true
		});

		return fuse.search(searchInput).slice(0, 8);
	}
};

expose(fuzzy);