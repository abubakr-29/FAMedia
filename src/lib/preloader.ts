export const PRELOADER_STORAGE_KEY = "fa-preloader-seen";

/**
 * Runs before first paint (inlined in <head>): if the intro was already seen
 * this session, or the visitor prefers reduced motion, hide it immediately so
 * there is no flash of the overlay before React hydrates.
 */
export const preloaderBootScript = `try{if(sessionStorage.getItem("${PRELOADER_STORAGE_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.skipPreloader="1"}catch(e){}`;
