import {bubbleSort} from "./mergesort"
export function djikstra(map,start,finish){
  // return map;
  let v = {
    "y" : "",
    "list_variable" : []
  };
  
  let result = [];
  let l = [];
  for (let variable of map) {
    if(variable.city_name == start){
      v.y = {
        "variable_name" : variable.city_name,
        "value" : 0,
        "route" : [variable.city_name],
        "neighbor_cities": variable.neighbor_cities
      }
      l.push(
        variable.city_name
      )
    }
    else{
      v.list_variable.push(
        {
          "variable_name" : variable.city_name,
          "value" : 91919191919,
          "route" : [],
          "neighbor_cities": variable.neighbor_cities
        }
      )
    }
  }

  // var index = 1;
  while(!l.includes(finish)) {
  // for (let index = 0; index < 3; index++) {
    // console.log("iterasi " +index  )
    // index++;
    for (let variable of v.list_variable) {
      if( !l.includes(variable.variable_name) && !v.y.route.includes(variable.variable_name)){
        let w = 91919191919;
        for(let city of v.y.neighbor_cities){
          if(city.city_name == variable.variable_name && city.is_active == true){
            w = city.distance;
            break;
          }
        }
        console.log("city = "+v.y.variable_name+"->"+variable.variable_name+" value : "+(variable.value))

        // variable.value = Math.min(variable.value,( v.y.value +  w))
        if( variable.value == 91919191919 && w == 91919191919){
          
        }
        else if(variable.value >=  ( v.y.value +  w)){
          variable.value = ( v.y.value +  w)
          variable.route = []
          for (let node of v.y.route) {
            variable.route.push(node)
          }
          variable.route.push(variable.variable_name)
          if(variable.route[variable.route.length -1 ]  == finish){
            let route = "";
            for (let node of variable.route) {
              route += node+"-";
            }
            result.push({
              "route" : route.slice(0,-1),
              "distance" : variable.value
            });
          
          }
        }
      }
    }
    v.list_variable = bubbleSort(v.list_variable)

    v.y = v.list_variable[0]
    l.push(v.list_variable[0].variable_name)
    v.list_variable.shift()
    // console.log(v)

    
  }
  // return v;
  result = result.reverse()
  return result;
  // return [result[0]];

  
}