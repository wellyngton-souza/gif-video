import { FaBackward, FaForward, FaPlay } from "react-icons/fa";

interface ReprodutorProps{
  generateVideo: () => void;
}

const Reproduction: React.FC<ReprodutorProps> = ({ generateVideo }) => {
  return (
    <div className="grow min-h-12 flex items-center justify-center gap-4 bg-gray-800">
      <FaBackward />
      <FaPlay onClick={generateVideo} />
      <FaForward />
    </div>
  )
}

export default Reproduction;