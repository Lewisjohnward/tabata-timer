"use client";
import {SetStateAction, useState} from "react";
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
import Input, {TextInput} from "../components/input";
import Modal from "../components/modal";
import useCreateWorkout from "../hooks/useWorkout";
import {Workout} from "../types/Workout";
import convertTime from "../helpers/convertTime";

type Props = {
    setView: React.Dispatch<SetStateAction<string>>;
    setWorkouts: React.Dispatch<SetStateAction<Workout[]>>;
};

const AddWorkout = ({setView, setWorkouts}: Props) => {
    const {
        id,
        title,
        setTitle,
        prepare,
        setPrepare,
        work,
        setWork,
        rest,
        setRest,
        cycles,
        setCycles,
        sets,
        setSets,
        restBetweenSets,
        setRestBetweenSets,
        cooldown,
        setCooldown,
        intervals,
        totalTime,
    } = useCreateWorkout();

    const [summaryVisible, setSummaryVisible] = useState(false);
    const [paletteVisible, setPaletteVisible] = useState(false);

    const handleCreateWorkout = () => {
        const workoutObj = {
            id,
            title,
            color: "#f58142",
            totalTime: totalTime == undefined ? 0 : totalTime,
            intervals,
            prepare,
            work,
            rest,
            cycles,
            sets,
            restBetweenSets,
            cooldown,
        };
        setWorkouts((prev) => [...prev, workoutObj]);
        setView("home");
    };

    const cancelAddWorkout = () => {
        setView("home");
    };
    //{`${formatTime(totalTime)}. ${intervals} intervals`}

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
                                <button onClick={handleCreateWorkout}>
                                    <TiTick />
                                </button>
                            </div>
                        </div>
                        <p className="text-center text-2xl">
                            {`${convertTime(totalTime)}. ${intervals} intervals`}
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
