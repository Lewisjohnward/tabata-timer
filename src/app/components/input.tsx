import {ReactNode} from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

type InputProps = {
    inputType: string,
    icon: ReactNode,
    label: string,
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({inputType, icon, label, placeholder, value, setValue} : InputProps) => {
    return (
        <div className="flex">
            <div className="flex justify-center items-center text-6xl pl-2">
                {icon}
            </div>
            <div className="flex-grow ml-4 space-y-2 text-center border-b-[1px] border-black pb-2">
                <label className="block font-bold">{label}</label>
                {inputType == "number" && 
                <div className="flex justify-between items-center">
                    <button>
                        <AiFillMinusCircle className="text-5xl" />
                    </button>
                    <input 
                        className="w-[150px] text-center bg-transparent focus:outline-none text-3xl" type="number" 
                        placeholder={placeholder}
                        value={value}
                        onChange={e =>  setValue(e.target.value)}
                    />

                    {inputType == "number" && 
                    <button>
                        <AiFillPlusCircle className="text-5xl"/>
                    </button>
                    }
                </div>
                }

            </div>
        </div>
    )
}

export default Input
