export function console_log(dbg){
  let _arr = [];
  for (let i = 0; i<arguments.length; i++){
    _arr.push(arguments[i]);
  }
  console.log(_arr);
  if (dbg) console.log(arguments);
  // if (dbg) console.log(_arr.shift());
}