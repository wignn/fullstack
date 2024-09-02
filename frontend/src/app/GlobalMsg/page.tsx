"use client";
import CommunityMessages from "./Msg";
import CreateMessage from "./CreateMsg";

const CommunityPage = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">Community Page</h1>
        <CommunityMessages />
        <CreateMessage />
      </div>
    </div>
  );
};

export default CommunityPage;
