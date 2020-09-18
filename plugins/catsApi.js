import CatsQuery from "~/api/cats";
export default (ctx, inject) => {
    const ressource = CatsQuery(ctx.$axios);
    inject("catsApiImageSearch", ressource('/images/search'));
};