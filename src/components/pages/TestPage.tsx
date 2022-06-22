import React from 'react';
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import style from "../common/c2-SuperButton/SuperButton.module.css"

const TestPage = () => {
    return (
        <>
        <div><SuperInputText/></div>
        <div><SuperCheckbox/></div>
        <div>
            <SuperButton className={style.button}>Button</SuperButton>
        </div>
</>
)
    ;
};

export default TestPage;