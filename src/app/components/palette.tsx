import { colors } from "../misc/colors";
import Modal from "./modal";
import { TiTick } from "react-icons/ti";

type PaletteProps = {
  setPaletteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
};

const Palette = ({
  setPaletteVisible,
  setColor,
  selectedColor,
}: PaletteProps) => {
  const handleColorSelect = (
    event: React.MouseEvent<HTMLElement>,
    color: string
  ) => {
    event.stopPropagation();
    setColor(color);
  };

  return (
    <Modal closePortal={() => setPaletteVisible(false)}>
      <div className="-mt-14 md:mt-0 bg-white rounded shadow p-4 space-y-10 md:p-8">
        <h2 className="text-xl font-bold">Select a color</h2>
        <div className="grid grid-cols-4 md:grid-cols-5 justify-items-center gap-4">
          {colors.map((color) => (
            <button
              key={color}
              className="w-20 h-20 rounded-full md:w-28 md:h-28"
              style={{ backgroundColor: color }}
              onClick={(e) => handleColorSelect(e, color)}
            >
              {selectedColor == color && (
                <TiTick className="m-auto text-4xl md:text-6xl text-white bg-black/10 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default Palette;
