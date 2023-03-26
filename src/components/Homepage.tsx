import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigation = useNavigate()

    const navigate = () => {
        navigation('/greet')
    }
    
    return (
        <div style={{textAlign: 'center'}}>
            <p>Homepage</p>
            <button onClick={navigate}>Greetings</button>
        </div>
    )
}