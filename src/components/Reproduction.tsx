import { FaBackward, FaForward, FaPlay } from "react-icons/fa";

const Reproduction = () => {
  return (
    <div className="grow flex items-center justify-center gap-4 bg-gray-800">
      <FaBackward />
      <FaPlay />
      <FaForward />
    </div>
  )
}

export default Reproduction;