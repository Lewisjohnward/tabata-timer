'use client'
import { useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineClose, AiFillEye } from 'react-icons/ai'
import { BsFillPaletteFill } from 'react-icons/bs'
import { TiTick } from 'react-icons/ti'
import { HomeProps } from './types'

const AddWorkout = ({setView} : HomeProps) => {
    const [title, setTitle] = useState("")
    const [prepare, setPrepare] = useState("")
    const [work, setWork] = useState("")

    const handleReturnHome = () => {
        setView("home")
    }

    return (
        <div>

            <div className="bg-orange-600 py-4 text-white font-bold">
                <div className="space-y-4 drop-shadow-lg">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex gap-4">
                            <button
                                onClick={handleReturnHome}
                            >
                                <AiOutlineClose className="text-2xl"/>
                            </button>
                            <h1 className="text-3xl">
                                Add workout
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 text-2xl">
                            <button>
                                <AiFillEye />
                            </button>
                            <button>
                                <BsFillPaletteFill />
                            </button>
                            <button>
                                <TiTick />
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-2xl">
                        {"04:00"} . {`${"16"} intervals`}
                    </p>
                </div>
            </div>

            <div className="px-8 pt-4 space-y-4 text-2xl">

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Title</label>
                    <input 
                        className="w-1/2 bg-transparent text-center placeholder-gray-600/40 text-3xl focus:outline-none" 
                        type="text" 
                        value={title}
                        placeholder="Bicep curls"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Prepare</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle 
                                className="text-5xl"
                            />
                        </button>
                        <input 
                            className="w-[250px] text-center bg-transparent focus:outline-none text-3xl" type="number" 
                            placeholder="10"
                            value={prepare}
                            onChange={e =>  setPrepare(e.target.value)}
                        />

                        <button>
                            <AiFillPlusCircle className="text-5xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Work</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-5xl"/>
                        </button>
                        <input 
                            className="w-[250px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="number" 
                            placeholder="25"
                            value={work}
                            onChange={e => setWork(e.target.value)}
                        />
                        <button>
                            <AiFillPlusCircle className="text-5xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Rest</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-5xl"/>
                        </button>
                        <input 
                            className="w-[250px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" 
                            placeholder=""
                        />
                        <button>
                            <AiFillPlusCircle className="text-5xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Rest</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-5xl"/>
                        </button>
                        <input className="w-[250px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-5xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Cycles</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-5xl"/>
                        </button>
                        <input className="w-[250px] text-center focus:outline-none placeholder:text-3xl" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-5xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block font-bold">Cycles</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-5xl"/>
                        </button>
                        <input className="w-[250px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-5xl"/>
                        </button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AddWorkout
