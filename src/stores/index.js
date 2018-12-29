const context = require.context('./', true, /\w+\.js$/);
const stores = { global };

function createStores(){
  context.keys().forEach(function(key){
    if(key !== './indexxcj.js'){
      let k = '';
      if(/\.[/\w+]+\.js/.test(key)){
        k = key.replace('.js','').split(/\.{0,1}\//g).filter(k => k).reduce((result, key, index) => {
          let K = key[0].toUpperCase();
          if(index === 0){
            K = key[0].toLowerCase();
          }
          return `${result}${K}${key.substr(1, key.length - 1)}`;
        }, '');
        stores[k] = context(key);
      }
    }
  });
  return stores;
}
export default createStores;