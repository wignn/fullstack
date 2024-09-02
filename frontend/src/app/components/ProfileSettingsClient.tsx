import { formatDate } from "@/lib/utils";
import { data, profileUser } from "../../lib/dataProfile";
import imgDefault from "../../../public/backimg.jpg";
import { IoBuildOutline } from "react-icons/io5";
import Link from "next/link";

export default async function Profile({ id }: any) {
  const fetchedData = await data(id);
  const profileData = await profileUser(id);
  const bio = profileData?.bio;
  const profileImage = profileData?.image || imgDefault.src;

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-tr from-gray-900 to-slate-700">
      <div className="w-full max-w-md my-10 bg-gray-800 bg-opacity-80 shadow-lg  border-0 rounded-xl p-10">
        {fetchedData && (
          <>
            <h2 className="text-center mb-4 text-3xl font-semibold text-gray-100">
              {fetchedData.name}
            </h2>
          </>
        )}
        <form className="flex flex-col items-center">
          <div className="mt-4 w-40 h-40 rounded-full border-4 border-gray-600 overflow-hidden shadow-lg">
            <img
              src={profileImage}
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-left mt-8 text-gray-200">
            <h2 className="text-xl mb-2">ID: {fetchedData?.id}</h2>
            <h2 className="text-xl">Email: {fetchedData?.email}</h2>
            <h2 className="text-xl">Role: {fetchedData?.role}</h2>
            <h2 className="text-xl">
              Joined: {formatDate(fetchedData?.createdAt.toString())}
            </h2>

            <h2 className="text-xl flex items-center mt-4">
              Bio: {bio}
              <Link href={"/profile/setting"}>
                <IoBuildOutline className="ml-2 text-gray-400 hover:text-purple-400 cursor-pointer transition-transform transform hover:scale-110" size={24} />
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}
