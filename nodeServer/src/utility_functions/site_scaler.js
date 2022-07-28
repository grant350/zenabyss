var Scaler = function(){
  var window_width = window.innerWidth;
//inside fn change state of size of components
  Object.keys(arguments).forEach( k=>{
    var arg = arguments[k]
    var range = arg.range
      if (window_width > range[0] && window_width <= range[1]){
        arg.fn()
      }
  })

}
export default Scaler