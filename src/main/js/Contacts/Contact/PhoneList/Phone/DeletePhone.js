import React from "react";

export default ({gridSize, deletePhoneFn}) => {
    return <div onClick={deletePhoneFn} className={"col-" + gridSize + " btn-link text-center cursor-link"} >
                Удалить номер
            </div>

}