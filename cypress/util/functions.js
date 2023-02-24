import * as CONSTS from "./consts";

export function console_log(dbg){
  let _arr = [];
  for (let i = 0; i<arguments.length; i++){
    _arr.push(arguments[i]);
  }
  console.log(_arr);
  if (dbg) console.log(arguments);
}

/**
 * Map array with async functions and return promise when all items are finished
 * @param {any[]} arr - array of any elements
 * @param {function} func - async function with args: item, index
 * @return {Promise}
 */
export const promiseChaining = (arr, func) => {
  return arr.reduce(function(prev, current, i) {
    return prev.then(function(result) {
      return func(current, i, result);
    });
  }, Promise.resolve());
};

export function cy_wait({
  timeout = 1500,
} = {}){
  return cy.wait(timeout);
}

export function getAttribute({
  $elm,
  attrName = CONSTS.HTML.PROP.HREF,
  msg = ''
}={}) {
  return cy.wrap($elm).invoke(CONSTS.HTML.STR.ATTR, attrName).then((answer)=>{
    console.log(`getAttribute("${attrName}") : `, answer, msg);
    return Promise.resolve(answer);
  });
}

export function getText({
  $elm,
  msg = '',
}={}) {
  return cy.wrap($elm).invoke(CONSTS.HTML.PROP.TEXT).then((answer)=>{
    console.log(`getText() : `, answer, msg);
    return Promise.resolve(answer);
  });
}

export function getLinkResponse({
  url: url,
  METHOD = 'GET',
}={}){
  console.log("verifyLinkResponse() strLink:", url);
  return cy.request(METHOD, url).then((response)=>{
    console.log(" - response:", response);
    return Promise.resolve(response);
  })
}

export function isVisibleCSS({_css}={}){
  const $el = Cypress.$(_css)
  let is_el_length_gt_0 = !!$el.length;
  console.log(`isVisibleCSS() is_el_length_gt_0:`, is_el_length_gt_0);
  let answer = is_el_length_gt_0 ? isTrulyVisible({$elm: $el[0]}): false;
  console.log(`isVisibleCSS("${_css}") answer:`, answer);
  return Promise.resolve(answer);
}

function _isTrulyVisible($element) {
  //https://coderoad.ru/704758/%D0%9A%D0%B0%D0%BA-%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%B8%D1%82%D1%8C-%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE-%D0%BB%D0%B8-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BD-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-JavaScript
  if ($element.offsetWidth === 0 || $element.offsetHeight === 0) return false;
  var height = document.documentElement.clientHeight,
    rects = $element.getClientRects(),
    on_top = function(r) {
      var x = (r.left + r.right)/2, y = (r.top + r.bottom)/2;
      return document.elementFromPoint(x, y) === $element;
    };
  for (var i = 0, l = rects.length; i < l; i++) {
    var r = rects[i],
        in_viewport = r.top > 0 ? r.top <= height : (r.bottom > 0 && r.bottom <= height);
    if (in_viewport && on_top(r)) return true;
    }
    return false;
  }

  export function isTrulyVisible({$elm}={}) {
    const isTrulyVisible = _isTrulyVisible($elm);
    console.log(` - isTrulyVisible`, isTrulyVisible);
    return Promise.resolve(isTrulyVisible);
  }
  