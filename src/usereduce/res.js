import React, {useEffect} from "react";

export let Res = ({modelContent, closeModel}) => {

    useEffect(() => {

        setTimeout(() => {

            closeModel();
            
        }, 4000);
    })

    return(
        <>
        <p>{modelContent}</p>
        </>
    );
}