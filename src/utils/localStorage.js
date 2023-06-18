export const saveLocalStorageWingh = (item) =>{
    localStorage.setItem("storageCodWing", item);
    return true;
};

export const getLocalStorageWingh = () =>{
    const token = localStorage.getItem("storageCodWing");
    return token;
}
