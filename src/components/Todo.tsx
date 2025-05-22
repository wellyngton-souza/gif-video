import Tessoura from "../assets/icons8-tesoura-100.png";
import Lixeira from "../assets/icons8-lixeira-120.png";
import Duplicata from "../assets/icons8-duplicata-90.png";
import Fullscreen from "../assets/icons8-fullscreen-96.png";

const Todo = () => {
  return (
    <div className="h-16 px-4 flex flex-col bg-white">
      <div className="flex justify-between items-center">
        <div className="min-w-64 flex py-2 gap-4">
          <img src={Tessoura} className="w-6" alt="tessoura-icon" />
          <img src={Lixeira} className="w-6" alt="lixeira-icon" />
          <img src={Duplicata} className="w-6" alt="duplicata-icon" />
          <img src={Fullscreen} className="w-6" alt="fullscreen-icon" /> 
        </div>
        <div className="w-full flex justify-center">
          <p>0:00:00</p>
        </div>
      </div>
      <div className="grow bg-red-500">
        {

        }
      </div>
    </div>
  )
}

export default Todo