import React from "react";
import { TimelineItems } from "../VideoEditor";

interface TimelineProps {
  timelineItems: TimelineItems[];
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Timeline: React.FC<TimelineProps> = ({ timelineItems, handleDragOver, handleDrop }) => {
  return (
    <div className="h-16 md:h-32 p-4 flex gap-4 overflow-x-auto bg-gray-700" onDragOver={handleDragOver} onDrop={handleDrop}>
      {
        timelineItems && timelineItems.length !== 0 &&
        timelineItems.map((item, index) => {
          return <img className="max-h-full" key={index} src={item.location} alt={item.name} />;
        })
      }
    </div>
  )
}

export default Timeline;