import { FaSpinner } from "react-icons/fa";
export default function Loading (){
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <FaSpinner className="animate-spin text-4xl text-gray-500" />
        </div>
      );
}
