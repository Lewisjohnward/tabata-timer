'use client'
import { useState } from 'react'
import AddWorkout from './components/addWorkout'
import Home from './components/home'


export default function Page() {
    const [view, setView] = useState("addworkout") 

    return (
        <main className="relative min-h-screen">
            { 
                view == "home" ?
                    <Home setView={setView}/> :
                    <AddWorkout setView={setView}/>
            }
        </main>
    )
}
