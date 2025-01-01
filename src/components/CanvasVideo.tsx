import { useEffect, useRef, useState } from "react";

interface CanvasProps {
  video: MediaRecorder | null;
  setCanv: (canv: HTMLCanvasElement | null) => void;
  setVideo: React.Dispatch<React.SetStateAction<MediaRecorder | null>>;
}

const CanvasVideo: React.FC<CanvasProps> = ({ setCanv, video, setVideo }) => {
 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canv = canvasRef.current;

    if (canv) {
      const ctx = canv.getContext('2d');
      if (ctx) {
        //canv.width = 640;
        //canv.height = 480;

        const stream = canv.captureStream();
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

        setVideo(mediaRecorder);
        setCanv(canv);
      }
    }
  }, []);

  return (
    <div className="w-full bg-black aspect-video">
      <canvas className="w-full" width={1920} height={1080} ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasVideo;
