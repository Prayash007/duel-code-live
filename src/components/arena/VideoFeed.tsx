import React from 'react';

interface VideoFeedProps {
  participantId: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ participantId }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-2 flex flex-col items-center justify-center h-48">
      <div className="bg-gray-700 w-full h-32 rounded mb-2 flex items-center justify-center text-gray-400">
        Camera Feed for {participantId}
      </div>
      <div className="text-sm text-gray-300">User ID: {participantId}</div>
    </div>
  );
};

export default VideoFeed;
