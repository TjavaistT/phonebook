import React from 'react'

export default({delContFn, styles}) => {
    return  <div className={"col-2 btn-link cursor-link " + styles} onClick={delContFn}>
                Удалить контакт
            </div>

}