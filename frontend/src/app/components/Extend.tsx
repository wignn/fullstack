"use client";
import React from "react";
import { useSession } from "next-auth/react";

const features = [
  { title: "Post", href: "/post", description: "Create and share posts with ease." },
  { title: "Dashboard", href: "/dashboard", description: "Monitor your activity and statistics." },
  { title: "Profile", href: "/profile", description: "Manage and customize your profile." },
  { title: "Message", href: "/GlobalMsg", description: "Connect with others through messages." },
  { title: "Admin Dasboard", href: "/admin", description: "Only admin" },
];

const FeatureList = () => {
  const { data: session } = useSession();
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <h2 className="md:text-3xl text-base font-bold text-center mb-6 text-gray-200">
        Our Features
      </h2>
      
      <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
        {features.slice(0, 4).map((feature, idx) => (
          <a
            key={idx}
            href={feature.href}
            className="p-6 bg-zinc-900 md:w-auto w-40 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-xl text-sm font-semibold mb-2 text-gray-400">
              {feature.title}
            </h3>
            <p className="text-gray-600 md:text-base text-sm">
              {feature.description}
            </p>
          </a>
        ))}
      </div>

      {/* Fitur ke-5 ditampilkan hanya jika user adalah admin */}
      {session?.user?.name === "Admin" && (
        <div className="flex justify-center mt-8">
          <a
            href={features[4].href}
            className="p-6 bg-zinc-900 md:w-auto w-40 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="md:text-xl text-sm font-semibold mb-2 text-gray-400">
              {features[4].title}
            </h3>
            <p className="text-gray-600 md:text-base text-sm">
              {features[4].description}
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

export default FeatureList;
