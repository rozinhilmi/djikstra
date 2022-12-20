import "../css/Home.css";

export function Loading(){
  return(
    <div className="loading-component">
      <img src={require('../assets/loading.gif')} />
    </div>
  )
}