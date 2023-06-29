const handleNums = (e) =>{
    let res = 0;
    if (parseFloat(e) >= 0){
        res = "+" + parseFloat(e).toFixed(2);
    }
    else{
        res = parseFloat(e).toFixed(2);
    }
    return res;
}

export default handleNums;