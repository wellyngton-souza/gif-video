import { useState, useEffect, useRef } from "react";
import Timeline from "./components/Timeline";
import Todo from "./components/Todo";
import LibraryArchives from "./components/LibraryArchives";
import CanvasVideo from "./components/CanvasVideo";
import Reproduction from "./components/Reproduction";
import { BackgroundColorContent } from "./class/backgroundColorContent";
import { ImageContent } from "./class/imageContent";

interface TodoItem {
  name: string;
  location: string;
}

export interface TimelineItems{
  name: string;
  position: null | 0;
  duration: null | 0;
  location: string;
}

const VideoEditor = () =>{
  const [archives, setArchives] = useState<File[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItems[]>([]);

  const [video, setVideo] = useState<MediaRecorder | null>(null);
  const [exportVideo, setExportVideo] = useState("");

  const [frameIndex, setFrameIndex] = useState(0);
  const frameIndexRef = useRef(frameIndex);  // Use useRef para armazenar o valor atual de frameIndex

  const [canv, setCanv] = useState<HTMLCanvasElement | null>(document.createElement('canvas'));

  const [items, setItems] = useState<TodoItem[]>(
    [
      //{
        //name: "wellyngton",
        //location: ""
      //}
    ]
  );

  const handleNick = () =>{
    setItems([...items, { name: "felipe", location: "ldwad" }]);
  }

  const handleArchives = (files: FileList | null) => {
    if (!files) return;
    let tmpFilesArray = Array.from(files);
    setItems([]);

    setItems(prevItems => [...prevItems, ...tmpFilesArray.map(file => ({ name: file.name, location: URL.createObjectURL(file) }))]);
  };

  const handleAddArchives = (files: FileList | null) => {
    if (!files) return;
    let tmpFilesArray = Array.from(files);

    setItems(prevItems => {
      const newItems = tmpFilesArray
        .map(file => ({
          name: file.name,
          location: URL.createObjectURL(file),
        }))
        .filter(newItem => !prevItems.find(existingItem => existingItem.name === newItem.name));
  
      return [...prevItems, ...newItems];
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>, imageUrl: string) =>{
    e.dataTransfer.setData("imageUrl", imageUrl);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData("imageUrl");

    setTimelineItems(prevItems => {
      let newItem;
      for(let i = 0; i < items.length; i++){
        if(items[i].location === imageUrl){
          newItem = items[i];
          break;
        }
      }
      return newItem ? [...prevItems, { ...newItem, position: 0, duration: 0 }] : prevItems;
    });
  };

  const generateVideo = () =>{
    if(!video) return;
    console.log(timelineItems);

    video.start();
    setFrameIndex(0);

    let mblob: any = [];

    video.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        mblob.push(event.data);
        setExportVideo("");
        //setRecordedBlobs((e) => [...e, event.data]);
      }
    };

    video.onstop = () => {
      const blob = new Blob(mblob, { type: 'video/webm' });
      const url = window.URL.createObjectURL(blob);
      setExportVideo(url);
    };

    drawFrame();
  }

  // Atualiza o valor da ref sempre que frameIndex mudar
  useEffect(() => {
    frameIndexRef.current = frameIndex;
  }, [frameIndex]);

  const drawFrame = () =>{
    if(!video || !canv) return;
    if (frameIndexRef.current >= timelineItems.length) {
      video.stop();
      return;
    }

    const img = new Image();
    img.onload = () => {

      const ctx = canv.getContext("2d"); // Obtenha o contexto 2D do canvas
      if (ctx) {
        ctx.clearRect(0, 0, canv.width, canv.height);
        let backgroundInstance = new BackgroundColorContent({ ctx, canvas: canv });
        backgroundInstance.createBackground();

        let imageInstance = new ImageContent({ctx, canvas: canv, zoomFactor: 1, alpha: 1 }, img);
        imageInstance.createImage();
      }

      // let textInstance = new textContent();
      // textContent.increaseTextSize();
      // textInstance.createText(this.canvas, this.ctx);

      video.requestData();
      setFrameIndex((e) => e + 1);
      setTimeout(drawFrame, 1000); // Tempo entre cada frame (em milissegundos)
    };

    img.src = timelineItems[frameIndexRef.current].location;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow flex">
        <LibraryArchives files={items} exportVideo={exportVideo} handleArchives={handleArchives} handleAddArchives={handleAddArchives} handleDragStart={handleDragStart} />
        <div className="w-1/2 flex flex-col">
          <div>
            <CanvasVideo video={video} setCanv={setCanv} setVideo={setVideo} />
          </div>
          <Reproduction generateVideo={generateVideo} />
        </div>
      </div>
      <Todo />
      <Timeline timelineItems={timelineItems} setTimelineItems={setTimelineItems} handleDragOver={handleDragOver} handleDrop={handleDrop} />
    </div>
  )
}

export default VideoEditor;