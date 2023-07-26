import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'

const AddWorkout = ({setView}) => {
    const handleReturnHome = () => {
        setView("home")
    }

    return (
        <div>
            <div className="bg-orange-600 p-4 text-white font-bold">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleReturnHome}
                        >
                            <AiOutlineClose className="text-2xl"/>
                        </button>
                        <p>
                            Add workout
                        </p>
                    </div>
                    <p className="text-center">
                        {"04:00"} . {`${"16"} intervals`}
                    </p>
                </div>
            </div>
            <div className="px-16 pt-4 space-y-4">

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block">Title</label>
                    <input 
                        className="bg-transparent text-center placeholder-gray-600 focus:outline-none" 
                        type="text" 
                        placeholder="Workout" 
                    />
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block">Prepare</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-2xl"/>
                        </button>
                        <input className="w-[80px] text-center bg-transparent focus:outline-none" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-2xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block">Work</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-2xl"/>
                        </button>
                        <input className="w-[80px] text-center bg-transparent focus:outline-none" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-2xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block">Rest</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-2xl"/>
                        </button>
                        <input className="w-[80px] text-center bg-transparent focus:outline-none" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-2xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block">Rest</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-2xl"/>
                        </button>
                        <input className="w-[80px] text-center bg-transparent focus:outline-none" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-2xl"/>
                        </button>
                    </div>
                </div>

                <div className="space-y-2 text-center border-b-[1px] border-black pb-2">
                    <label className="block">Cycles</label>
                    <div className="flex justify-between items-center">
                        <button>
                            <AiFillMinusCircle className="text-2xl"/>
                        </button>
                        <input className="w-[80px] text-center bg-transparent focus:outline-none" type="text" />
                        <button>
                            <AiFillPlusCircle className="text-2xl"/>
                        </button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AddWorkout
