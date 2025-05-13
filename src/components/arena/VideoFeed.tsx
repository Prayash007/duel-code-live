import React, { useEffect, useRef } from 'react';

interface VideoFeedProps {
  participantId: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ participantId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg p-2 flex flex-col items-center justify-center h-48">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="bg-black w-full h-32 rounded mb-2 object-cover"
      />
      <div className="text-sm text-gray-300">User ID: {participantId}</div>
    </div>
  );
};

export default VideoFeed;
