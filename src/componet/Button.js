import React, { useState } from 'react'
import { Button } from 'react-bootstrap';





const WheaterButton = ({cities, setCity, handleCity, selectedCity}) => {
    console.log("cities",cities);
    return (
        <div>
            <Button id='btnStyle' variant={`${selectedCity==null ? "outline-warning" : "warning"}`} onClick={()=>handleCity("current")}>현재위치</Button>

            {cities.map((item, index)=>(
                <Button id='btnStyle' variant={`${selectedCity== item ? "outline-warning" : "warning"}`} key={index} onClick={()=>setCity(item)}>{item}</Button>
            ))}
        </div>
    )
    
}

export default WheaterButton
