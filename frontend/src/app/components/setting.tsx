"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import { profileUser } from "@/lib/dataProfile";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";

export default function ProfileSettingsClient() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session?.id) {
        try {
          setLoading(true);
          const profileData = await profileUser(session.id);
          setBio(profileData?.bio || "");
          setProfileImage(profileData?.image || null);
        } catch (err) {
          console.error("Error fetching profile data", err);
          setError("Failed to load profile data.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfileData();
  }, [session]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    if (!session) {
      setError("You need to be logged in to update your profile.");
      setSending(false);
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("userId", session.id);

    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels);
      formData.append("image", croppedImage);
    } else if (!image && profileImage) {
      formData.append("image", profileImage);
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
        setError(null);
        setTimeout(() => {
          window.location.href = "/profile";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setError("An unexpected error occurred.");
      setSuccessMessage(null);
    } 
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Only image files are allowed.");
        setImage(null);
        setPreview(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full py-16 flex items-center justify-center bg-gray-900 to-slate-700 bg-gradient-to-tr text-white">
      <div className="w-full max-w-md mx-auto bg-gray-800 shadow-lg border-2 border-gray-700 rounded-lg">
        {session && (
          <>
            <h3 className="text-center m-4 text-2xl font-bold text-gray-200">
              {session.user?.name}
            </h3>
          </>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="relative mb-2 flex flex-col items-center">
            {preview ? (
              <div className="mt-3 relative w-64 h-64">
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            ) : (
              profileImage && (
                <div className="mt-3 w-36 h-36 rounded-full border-4 border-gray-700 overflow-hidden">
                  <Image
                  width={150}
                  height={300}
                    src={profileImage}
                    alt="Profile Picture"
                    className="object-cover w-full h-full "
                  />
                </div>
              )
            )}
          </div>

          <label
            htmlFor="image"
            className="cursor-pointer rounded-full w-16 h-16 flex items-center justify-center bg-purple-600 text-white hover:bg-purple-700"
          >
            <FaCamera size={24} />
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </label>
          <div className="text-left mb-2 w-full px-4">
            <div className="mb-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Write your bio..."
                required
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            disabled={sending}
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none mb-3"
          >
            {sending ? "Submitting..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
