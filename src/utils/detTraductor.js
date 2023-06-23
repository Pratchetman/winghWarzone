
const detailsTrad = (e)=>{
    let ret = "";
    if (e === "Bocacha" || e === "Cañón" || e === "Acople" || e === "Culata"){
      ret = "Duración";
    } else if (e === "Mira"){
      ret = "Posición del ojo";
    } else if (e === "Munición"){
      ret = "Cargar";
    } else if (e === "Láser"){
      ret = "Distancia a cero";
    } else if (e === "Empuñadura trasera"){
      ret = "Ancho";
    }
    return ret;

}
export default detailsTrad;
