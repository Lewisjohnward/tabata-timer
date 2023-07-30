"use client";
import {useEffect, useState} from "react";
import {AiOutlineClose, AiFillEye} from "react-icons/ai";
import {
    BsFillPaletteFill,
    BsArrowRepeat,
    BsFillStopwatchFill,
    BsSnow,
} from "react-icons/bs";
import {FaWalking} from "react-icons/fa";
import {GiWeightLiftingUp, GiSofa} from "react-icons/gi";
import {RxSpaceBetweenHorizontally} from "react-icons/rx";
import {MdTitle} from "react-icons/md";
import {TiTick} from "react-icons/ti";
import {HomeProps} from "./types";
import Input, {TextInput} from "./input";
import Modal from "./modal";


//const _calculateIntervals = (prepare: number, work: number, rest: number, cooldown: number, cycles: number, sets: number, restBetweenSets: number): number => {
//    let total = 1
//    if (rest > 0) total++
//    total = (total * cycles)
//    if (cycles > 1) total--
//
//    if (prepare > 0) total++
//    if (cooldown > 0) total++
//
//    /* sets */
//    /* rest between sets */
//
//
//    return total
//}




const AddWorkout = ({setView}: HomeProps) => {
    const [title, setTitle] = useState("Bicep curls");
    const [prepare, setPrepare] = useState(10);
    const [work, setWork] = useState(25);
    const [rest, setRest] = useState(0);
    const [cycles, setCycles] = useState(2);
    const [sets, setSets] = useState(1);
    const [restBetweenSets, setRestBetweenSets] = useState(0);
    const [cooldown, setCooldown] = useState(0);
    //const [totalTime, setTotalTime] = useState(0)
    const [intervals, setIntervals] = useState(0);
    const [summaryVisible, setSummaryVisible] = useState(false);
    const [paletteVisible, setPaletteVisible] = useState(false);
    //const [summary, setSummary] = [
    //    {
    //        prepare: 10,
    //        work: 25,
    //        rest: 10
    //    },
    //    {
    //        work: 25,
    //        rest: 10
    //    },
    //    {
    //        work: 25
    //    }

    //]

    //const formatTime = (time : number) => {

    //}
    //
    const handleCreateWorkout = () => {
        /* Need to add logic to add workout to global state */
        setView("home")
    }

    const cancelAddWorkout = () => {
        setView("home");
    };
    //{`${formatTime(totalTime)}. ${intervals} intervals`}

    const calculateIntervalCount = () => {
        /* work cannot be 0 */
        return 69//_calculateIntervals(prepare, work, rest, cooldown, cycles, sets, restBetweenSets)
    };

    useEffect(() => {
        const totalIntervals = calculateIntervalCount();
        setIntervals(totalIntervals);
    }, [prepare, work, rest, cycles, sets, rest, cooldown]);

    return (
        <>
            <div className="relative text-sky-900 pb-4">
                <div className="bg-orange-600 px-6 py-4 text-white font-bold">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-4">
                                <button onClick={cancelAddWorkout}>
                                    <AiOutlineClose className="text-4xl" />
                                </button>
                                <h1 className="text-2xl">Add workout</h1>
                            </div>
                            <div className="flex items-center gap-6 text-3xl">
                                <button onClick={() => setSummaryVisible(true)}>
                                    <AiFillEye />
                                </button>
                                <button onClick={() => setPaletteVisible(true)}>
                                    <BsFillPaletteFill />
                                </button>
                                <button
                                    onClick={handleCreateWorkout}
                                >
                                    <TiTick />
                                </button>
                            </div>
                        </div>
                        <p className="text-center text-2xl">
                            {`3:0. ${intervals} intervals`}
                        </p>
                    </div>
                </div>

                <div className="pr-4 pt-4 space-y-4 text-2xl">
                    <TextInput
                        inputType={"text"}
                        icon={<MdTitle />}
                        label={"Title"}
                        value={title}
                        setValue={setTitle}
                    />
                    <Input
                        inputType={"number"}
                        icon={<FaWalking />}
                        label={"Prepare"}
                        value={prepare}
                        setValue={setPrepare}
                    />
                    <Input
                        inputType={"number"}
                        icon={<GiWeightLiftingUp />}
                        label={"Work"}
                        value={work}
                        setValue={setWork}
                    />
                    <Input
                        inputType={"number"}
                        icon={<GiSofa />}
                        label={"Rest"}
                        value={rest}
                        setValue={setRest}
                    />
                    <Input
                        inputType={"number"}
                        icon={<BsArrowRepeat />}
                        label={"Cycles"}
                        value={cycles}
                        setValue={setCycles}
                    />
                    <Input
                        inputType={"number"}
                        icon={<BsFillStopwatchFill />}
                        label={"Sets"}
                        value={sets}
                        setValue={setSets}
                    />
                    <Input
                        inputType={"number"}
                        icon={<RxSpaceBetweenHorizontally />}
                        label={"Rest between sets"}
                        value={restBetweenSets}
                        setValue={setRestBetweenSets}
                    />
                    <Input
                        inputType={"number"}
                        icon={<BsSnow />}
                        label={"Cool down"}
                        value={cooldown}
                        setValue={setCooldown}
                    />
                </div>
            </div>
            {summaryVisible && <Summary setSummaryVisible={setSummaryVisible} />}
            {paletteVisible && <Palette setPaletteVisible={setPaletteVisible} />}
        </>
    );
};

export default AddWorkout;

type SummaryProps = {
    setSummaryVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Summary = ({setSummaryVisible}: SummaryProps) => {
    return (
        <Modal closePortal={() => setSummaryVisible(false)}>
            <div className="bg-white h-[500px] w-[800px] rounded shadow">
                summary here
            </div>
        </Modal>
    );
};

type PaletteProps = {
    setPaletteVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Palette = ({setPaletteVisible}: PaletteProps) => {
    return (
        <Modal closePortal={() => setPaletteVisible(false)}>
            <div className="bg-white h-[500px] w-[800px] rounded shadow">
                palette here
            </div>
        </Modal>
    );
};
