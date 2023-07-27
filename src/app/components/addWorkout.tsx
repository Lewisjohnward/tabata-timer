'use client'
import { useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'
import { HomeProps } from './types'

const AddWorkout = ({setView} : HomeProps) => {
    const [title, setTitle] = useState("")
    const [prepare, setPrepare] = useState<number|null>(null)

    const handleReturnHome = () => {
        setView("home")
    }

    return (
        <div>

            <div className="bg-orange-600 p-4 text-white font-bold">
                <div className="space-y-4 drop-shadow-lg">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleReturnHome}
                        >
                            <AiOutlineClose className="text-4xl"/>
                        </button>
                        <h1 className="text-4xl">
                            Add workout
                        </h1>
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
                            className="w-[80px] text-center bg-transparent focus:outline-none text-3xl" type="number" 
                            placeholder="10"
                            value={prepare == null ? "" : prepare}
                            onChange={e => setPrepare(Number(e.target.value))}
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
                            className="w-[80px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" 
                            placeholder="25"
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
                            className="w-[80px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" 
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
                        <input className="w-[80px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" />
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
                        <input className="w-[80px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" />
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
                        <input className="w-[80px] text-center bg-transparent focus:outline-none placeholder:text-3xl" type="text" />
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
