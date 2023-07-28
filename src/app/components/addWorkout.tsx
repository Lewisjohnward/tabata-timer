'use client'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiFillEye } from 'react-icons/ai'
import { BsFillPaletteFill, BsArrowRepeat, BsFillStopwatchFill, BsSnow } from 'react-icons/bs'
import { FaWalking } from 'react-icons/fa'
import { GiWeightLiftingUp, GiSofa } from 'react-icons/gi'
import { RxSpaceBetweenHorizontally } from 'react-icons/rx'
import { MdTitle } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { HomeProps } from './types'
import Input from './input'

const AddWorkout = ({setView} : HomeProps) => {
    const [title, setTitle] = useState("Bicep curls")
    const [prepare, setPrepare] = useState("10")
    const [work, setWork] = useState("25")
    const [rest, setRest] = useState("10")
    const [cycles, setCycles] = useState("1")
    const [sets, setSets] = useState("1")
    const [restBetweenSets, setRestBetweenSets] = useState("0")
    const [cooldown, setCooldown] = useState("")
    const [totalTime, setTotalTime] = useState()

    const handleReturnHome = () => {
        setView("home")
    }

    useEffect(() => {

    }, [prepare, work, rest, cycles, sets, rest, cooldown])



    return (
        <div className="relative text-sky-900 pb-4">
            <div className="bg-orange-600 px-6 py-4 text-white font-bold">
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex gap-4">
                            <button
                                onClick={handleReturnHome}
                            >
                                <AiOutlineClose className="text-4xl"/>
                            </button>
                            <h1 className="text-2xl">
                                Add workout
                            </h1>
                        </div>
                        <div className="flex items-center gap-6 text-3xl">
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

            <div className="pr-4 pt-4 space-y-4 text-2xl">
                <Input inputType={"text"} icon={<MdTitle />} label={"Title"} placeholder={"Bicep curls"} value={title} setValue={setTitle} />
                <Input inputType={"number"} icon={<FaWalking />} label={"Prepare"} placeholder={"10"} value={prepare} setValue={setPrepare} />
                <Input inputType={"number"} icon={<GiWeightLiftingUp />} label={"Work"} placeholder={"25"} value={work} setValue={setWork} />
                <Input inputType={"number"} icon={<GiSofa />} label={"Rest"} placeholder={"10"} value={rest} setValue={setRest} />
                <Input inputType={"number"} icon={<BsArrowRepeat />} label={"Cycles"} placeholder={"1"} value={cycles} setValue={setCycles} />
                <Input inputType={"number"} icon={<BsFillStopwatchFill />} label={"Sets"} placeholder={"1"} value={sets} setValue={setSets} />
                <Input inputType={"number"} icon={<RxSpaceBetweenHorizontally />} label={"Rest between sets"} placeholder={"0"} value={restBetweenSets} setValue={setRestBetweenSets} />
                <Input inputType={"number"} icon={<BsSnow />} label={"Cool down"} placeholder={"0"} value={cooldown} setValue={setCooldown} />
            </div>
        </div>
    )
}

export default AddWorkout

