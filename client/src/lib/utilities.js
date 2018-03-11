/*
 * 
 */
export const getShopifyParams = () => {
  const paramObj = new URLSearchParams(window.location.search.slice(1));
  const params = {};
  for(var value of paramObj.keys()) {
    params[value] = paramObj.get(value);
  }
  return params;
}