import _ from 'lodash';

/*
  "products": [
    {
      "menuName": {
        "title": "Shoes",
        "expectedBreadcrumbs": "Shoes"
      },
      "columnName": {
        "title": "Women's",
        "expectedBreadcrumbs": "Women"
      },
      "productType": {
        "title": "Sneakers",
        "expectedBreadcrumbs": "Sneakers"
      }
    },
    ...
*/

const cProductProperties = {
  title: "title",
  expectedBreadcrumbs: "expectedBreadcrumbs",
};

function _getProduct_Property({
  product = {},
  property = "menuName",
  subProperty = "title",
}={}){
  return Promise.resolve(_.has(product, property)).then((isHas)=>{
    if (!isHas) return expect(isHas).to.be.true;
    return Promise.resolve(_.has(product[property], subProperty)).then((isHasSub)=>{
      if (!isHasSub) return expect(isHasSub).to.be.true;
      return Promise.resolve(product[property][subProperty]);
    })
  })
}

function _getProduct_MenuName({
  product = {},
  property = cProductProperties.title,
}={}){
  return _getProduct_Property({
    product: product,
    property: "menuName",
    subProperty: property,
  }).then((_prop)=>{
    console.log("_getMenuName, _prop", _prop);
    return Promise.resolve(_prop)
  });
}

function _getProduct_ColumnName({
  product = {},
  property = cProductProperties.title,
}={}){
  return _getProduct_Property({
    product: product,
    property: "columnName",
    subProperty: property,
  }).then((_prop)=>{
    console.log("_getColumnName, _prop", _prop);
    return Promise.resolve(_prop)
  });
}

function _getProduct_ItemName({
  product = {},
  property = cProductProperties.title,
}={}){
  return _getProduct_Property({
    product: product,
    property: "productType",
    subProperty: property,
  }).then((_prop)=>{
    return Promise.resolve(_prop)
  });
}

export function getProduct_verifyMenu_Args(product){
  let answer = {};
  console.log( "getProduct_verifyMenu_Args() product: ", product);
  return _getProduct_MenuName({product: product, property: cProductProperties.title}
  ).then((_prop)=>{
    answer.menuName = _prop;
    return _getProduct_ColumnName({product: product, property: cProductProperties.title});
  }).then((_prop)=>{
    answer.columnName = _prop;
    return _getProduct_ItemName({product: product, property: cProductProperties.title});
  }).then((_prop)=>{
    answer.itemName = _prop;
    return _getProduct_ColumnName({product: product, property: cProductProperties.expectedBreadcrumbs});
  }).then((_prop)=>{
    answer.expColumnInHeader = _prop;
    return _getProduct_ItemName({product: product, property: cProductProperties.expectedBreadcrumbs});
  }).then((_prop)=>{
    answer.expItemInHeader = _prop;
    return answer;
  });
}

export function getProduct_verifyAllBreadCrumbsTitles_Args(product){
  let answer = {};
  console.log( "getProduct_verifyAllBreadCrumbsTitles_Args() product: ", product);
  return _getProduct_MenuName({product: product, property: cProductProperties.expectedBreadcrumbs}
  ).then((_prop)=>{
    answer.menuName = _prop;
    return _getProduct_ColumnName({product: product, property: cProductProperties.expectedBreadcrumbs});
  }).then((_prop)=>{
    answer.columnName = _prop;
    return _getProduct_ItemName({product: product, property: cProductProperties.expectedBreadcrumbs});
  }).then((_prop)=>{
    answer.itemName = _prop;
    return answer;
  });
}

