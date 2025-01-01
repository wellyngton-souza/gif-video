import React from "react";
import { FaFile } from "react-icons/fa";

interface Files {
    name: string;
    location: string;
}

interface LibraryArchivesProps extends React.InputHTMLAttributes<HTMLInputElement> {
    handleArchives: (files: FileList | null) => void;
    handleAddArchives: (files: FileList | null) => void;
    handleDragStart: (e: React.DragEvent<HTMLImageElement>, location: string) => void;
    exportVideo: string;
    files: Files[];
}

const LibraryArchives: React.FC<LibraryArchivesProps> = ({ files, handleArchives, exportVideo, handleAddArchives, handleDragStart }) => {
  return (
    <div className="grow flex flex-col">
        {
            (!files || files.length === 0) ? (
                <div className="grow h-full flex items-center justify-center bg-gray-900">
                    <input className="hidden" type="file" id="img_file" accept="image/*" onChange={(e) => handleArchives(e.target.files)} multiple />
                    <label className="grow h-full cursor-pointer p-4 relative flex flex-wrap gap-2 items-center justify-center hover:bg-blue-950" id="filesPng" htmlFor="img_file">
                        <div className="flex flex-col gap-4 items-center justify-center" id="filetext">
                            <FaFile />
                            <p>send file</p>
                        </div>
                        <div className="absolute top-0 left-0 aspect-video w-full h-full flex flex-wrap gap-2 overflow-y-auto" id="fileimages"></div>
                    </label>
                </div>
            ) : 
            <div>
                <input className="hidden" type="file" id="img_file" accept="image/*" onChange={(e) => handleAddArchives(e.target.files)} multiple />
                <label className="flex justify-between" id="filesPng" htmlFor="img_file">
                    <p className="p-2">Open</p>
                    {
                        exportVideo && (
                            <a href={exportVideo} download="video.webm">
                               <button className="p-2">Download Video</button>
                            </a>
                        )
                    }
                </label>
            </div>
        }
        <div className="grow p-4 flex items-start flex-wrap overflow-y-auto bg-gray-900">
            {
                files && files.length !== 0 &&
                files.map((e) => {
                    if (!e.location) return null;
                    return <img
                        className="w-32"
                        key={e.location}
                        src={e.location}
                        draggable
                        onDragStart={(j) => handleDragStart(j, e.location)}
                        alt={e.name}
                    />;
                })
            }
        </div>
    </div>
  );
};

export default LibraryArchives;
