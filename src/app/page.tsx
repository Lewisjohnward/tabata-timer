'use client'
import { useState } from 'react'
import AddWorkout from './components/addWorkout'
import Home from './components/home'


export default function Page() {
    const [view, setView] = useState("home") 

    return (
        <main className="relative min-h-[100vh]">
            { 
                view == "home" ? <Home setView={setView}/> :
                view == "addworkout" ? <AddWorkout setView={setView}/> :
                null
            }
        </main>
    )
}
