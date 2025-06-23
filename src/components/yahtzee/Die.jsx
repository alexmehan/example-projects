import React from "react";
import { ReactDOM } from "react";

export default function Die() {

    function roll() {
        return(Math.ceil(Math.random() * 6));
    }

    return (
        <div class="die">
            {roll()}
        </div>
    )
}