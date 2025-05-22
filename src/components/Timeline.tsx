import React from "react";

interface TimelineItem{
  name: string;
  location: string;
}

interface TimelineProps {
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Timeline: React.FC<TimelineProps> = ({ timelineItems, setTimelineItems, handleDragOver, handleDrop }) => {
  return (
    <div className="h-16 md:h-32 p-4 flex gap-4 overflow-x-auto bg-gray-700" onDragOver={handleDragOver} onDrop={handleDrop}>
      {
        timelineItems && timelineItems.length !== 0 &&
        timelineItems.map((item, index) => {
          return <img
            className="max-h-full"
            key={index}
            onClick={() => setTimelineItems((prevItems: TimelineItem[]) => prevItems.filter((_, i) => i !== index))}
            src={item.location}
            alt={item.name}
          />;
        })
      }
    </div>
  )
}

export default Timeline;