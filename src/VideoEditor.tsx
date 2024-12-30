import { useState } from "react";
import Timeline from "./components/Timeline";
import Todo from "./components/Todo";
import LibraryArchives from "./components/LibraryArchives";
import CanvasVideo from "./components/CanvasVideo";
import Reproduction from "./components/Reproduction";

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow flex">
        <LibraryArchives files={items} handleArchives={handleArchives} handleAddArchives={handleAddArchives} handleDragStart={handleDragStart} />
        <div className="w-1/2 flex flex-col">
          <div>
            <CanvasVideo />
          </div>
          <Reproduction />
        </div>
      </div>
      {
        items.map((element, index) => {
          return <Todo key={index} lists={element} handleNick={handleNick} />
        })
      }
      <Timeline timelineItems={timelineItems} handleDragOver={handleDragOver} handleDrop={handleDrop} />
    </div>
  )
}

export default VideoEditor;