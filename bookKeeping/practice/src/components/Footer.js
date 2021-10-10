import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <footer>
         <p>  Copright {currentYear} </p> 
            </footer>
        </div>
    )
}
