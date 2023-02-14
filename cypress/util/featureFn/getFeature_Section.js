/* FIXTURE SECTION STRUCTURE
  {
  "sectionName": "Women's Size",
  "liObj": {
    "type": "name",
    "value": "4"
  },
  "expectedBreadcrumbs": "4"
  },
  If liObj.type = "index" the expectedBreadcrumbs should be updated after adding the filter (***)
*/

export function getArgs_for_verifySection(section){
  let answer = section;
  return Promise.resolve(answer);
}
