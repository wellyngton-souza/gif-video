import { useEffect, useRef, useState } from "react";

const CanvasVideo = () => {
 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]); // Array de Blob
  
  useEffect(() => {
    const canv = canvasRef.current;

    if (canv) {
      const ctx = canv.getContext('2d');
      if (ctx) {
        canv.width = 640;
        canv.height = 480;

        const stream = canv.captureStream();
        const video = new MediaRecorder(stream, { mimeType: 'video/webm' });

        video.start();

        video.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              setRecordedBlobs((e) => [...e, event.data]);
            }
        };

        setTimeout(() => {
          video.stop();
        }, 5000);
      }
    }
  }, []);

  return (
    <div className="w-full bg-gray-950 aspect-video">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasVideo;
