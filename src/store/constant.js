export const domain = "http://localhost:3003";
export const pages = {
	home: { route: "/", title: "Home" },
	about: { route: "/about", title: "About" },
	search: { route: "/search", title: "Search" },
	screener: { route: "/screener", title: "Screener" }
}
export const paginationItemsPerPage = [20, 50, 100];
export const frontendMonsters = ["gravelclaw", "snarlfang", "mudgnasher", "burrowbeast", "howlhorn", "stonepelt", "rusthide", "cragtusk", "furback", "stalkmaw", "stormjaw", "thundrak", "voltmaw", "cracklash", "skystormer", "electroclaw", "zephyron", "shockhorn", "boltgore", "tempestrix", "pyroscourge", "glaciator", "volcrag", "emberfang", "frostmaul", "terraxyl", "droughtfiend", "thornbrood", "miremaw", "aeroslither", "abysskraken", "kelpyrix", "brinefiend", "morathuun", "drownspawn", "tidal reaver", "salthorror", "deepfang", "charynth", "leviacrest", "ironmaw", "wargrith", "titanox", "cragthul", "ragehorn", "blightcrush", "gravemarch", "brutalisk", "mightclad", "smashgul", "spellmaw", "arcansoul", "mysthorn", "chronoghul", "glyphshade", "hexlurker", "manafiend", "runeborn", "sorcarok", "voidchant", "xelvharn", "ygnoth", "dreadwail", "whisperspine", "skinharrow", "oozorath", "hollowone", "facelessgrin", "nyxmaw", "grimveil", "bonehowler", "corpsemire", "skuldrith", "necroth", "wraithclaw", "gravecinder", "cryptgnaw", "ghoulmantle", "mournshade", "rotknight", "drakzul", "volgarax", "cindervyre", "frostwyrm", "thal'zuur", "stormdrake", "ashglide", "embercoil", "darkwynn", "zephyrosk", "fadewalker", "mirrormaw", "veilshard", "phantaziel", "whisperveil", "gloomscreech", "mindflicker", "shimmerskin", "obscureon", "dreamsplit"];
export const frontendMonsterTypes = ["normal", "thunder", "elemental", "aquatic", "power", "magic", "horror", "undead", "dragon", "illusion"];
export const frontendCardGrades = [0, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const frontendCardYears = ["-2000", "2000-2010", "2010-2020", "2020+"];
export const frontendCardPrices = ["<$20", "$20-$50", "$50-$100", "$100-$200", ">$200"];
export const frontendSearchableFields = ["monster", "type", "grade", "year", "card"];
export const frontendSortableFields = ["monster", "type", "grade", "year", "price"];
export const screenerTableHeaders = ["monster", "card", "price", "grade", "type", "year"];