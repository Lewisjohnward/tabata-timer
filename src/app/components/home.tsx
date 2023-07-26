import { useState } from 'react'
import { clsx } from 'clsx'
import { AiOutlineSearch, AiOutlineStar, AiOutlineOrderedList } from 'react-icons/ai'
import { CiSettings } from 'react-icons/ci'
import { BsFillPaletteFill, BsFillPlayFill } from 'react-icons/bs'
import { FaEllipsisV } from 'react-icons/fa'

const Home = ({setView}) => {
    return (
        <>
            <Header />
            <div className="py-2 space-y-2">
                <Workout />
            </div>
            <AddSequence setView={setView}/>
        </>
    )
}

const Workout = () => {
    const name = "Pigeon"
    const time = "05:59"
    const intervals = 8
    return (
        <div className="flex space-between p-4 bg-red-500 text-white shadow-[4px_2px_2px_0px_rgba(0,0,0,0.2)]">
            <div>
                <p className="font-bold">
                    {name}
                </p>
                <p>
                    {time} {intervals} intervals
                </p>
            </div>
            <div className="flex-grow flex justify-end gap-4 text-2xl">
                <button>
                    <BsFillPlayFill />
                </button>
                <button>
                    <FaEllipsisV />
                </button>
            </div>
        </div>
    )
}


const IconArr = [
    <BsFillPaletteFill />,
    <AiOutlineStar />,
    <AiOutlineSearch />,
    <CiSettings />,
]
const Header = () => {
    return (
        <div className="flex justify-between gap-4 bg-gray-400 p-4 text-white font-bold">
            <div className="space-y-4">
                <p>
                    Workouts: 52
                </p>
                <p>
                    all
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-2xl">
                {IconArr.map(d => (
                    <button>
                        {d}
                    </button>
                ))}
            </div>
        </div>

    )
}

const AddSequence = ({setView}) => {
    const [open, setOpen] = useState(false)
    return (
        <div 
            className={clsx("absolute right-0 bottom-0 h-full w-full text-white font-bold")}
        >
            {open &&
            <div 
                className={clsx("h-full bg-white/40")} 
                onClick={() => setOpen(false)}
            />
            }
            <div className="absolute right-0 bottom-2 space-y-2">
                { open &&
                <div className="flex justify-end items-center gap-4 pr-4 [&>*]:active:bg-white [&>*]:active:transition-colors [&>*]:active:duration-200">
                    <button className={clsx("py-1 px-4 bg-red-500 rounded-full shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)] animate-entrance")}>
                        New Sequence
                    </button>
                    <button 
                        className={clsx("flex justify-center items-center w-10 h-10 bg-red-500 rounded-full text-2xl shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)] animate-riseup")}
                    >
                        <AiOutlineOrderedList />
                    </button>
                </div>
                }
                <div className={clsx("flex justify-end items-center gap-4 [&>*]:active:bg-white [&>*]:active:transition-colors [&>*]:active:duration-200 pr-[10px]")}>
                    { open &&
                    <button 
                        className="py-1 px-4 bg-red-500 rounded-full shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)] animate-entrance"
                        onClick={() => setView("addworkout")}
                    >
                        New workout
                    </button>
                    }
                    <button 
                        className={clsx("flex justify-center items-center w-14 h-14 bg-red-500 rounded-full text-4xl shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)]")}
                        onClick={() => { open ? setView("addworkout") : setOpen(true) }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
