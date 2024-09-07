import React from "react";

const features = [
  { title: "Post", href: "/post", description: "Create and share posts with ease." },
  { title: "Dashboard", href: "/dashboard", description: "Monitor your activity and statistics." },
  { title: "Profile", href: "/profile", description: "Manage and customize your profile." },
  { title: "Message", href: "/GlobalMsg", description: "Connect with others through messages." },
  { title: "Feature 5", href: "#", description: "Explore additional features." },
  { title: "Feature 6", href: "#", description: "Discover more about our services." },
];

const FeatureList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Features</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <a
            key={idx}
            href={feature.href}
            className="p-6 bg-zinc-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
