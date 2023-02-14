/*
  {
    "menuName": {
      "title": "Shoes",
      "expectedBreadcrumbs": "Shoes"
    }
  },
*/

export function getArgs_for_checkAllLinksOfMenuByName(menu){
  let answer = {};
  console.log( "getMenu_checkAllLinksOfMenuByName_Args() menu: ", menu);
  answer.menuName = menu["menuName"]["title"];
  return Promise.resolve(answer);
}
