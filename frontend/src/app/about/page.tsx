import Image from "next/image";
import Link from "next/link";
import Img from "../../../public/1.jpg";
import Navbar from "../components/NavbarComponents";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-center items-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md w-full">
          <div className="mb-6">
            <Image
              src={Img}
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">Othinus</h1>
          <p className="text-lg text-gray-400 mb-6">
            Hello! My name is Othinus, and I am a student. I have a passion for
            programming. In my spare time, I enjoy playing games. Feel free to
            connect with me through social media.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="https://facebook.com" target="_blank">
              <div className="text-blue-500 hover:text-blue-400 transition">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24H12v-9.294H9.294v-3.618H12V8.305c0-2.675 1.633-4.131 4.016-4.131 1.142 0 2.119.084 2.4.122v2.781h-1.649c-1.293 0-1.544.617-1.544 1.52v1.998h3.088l-.402 3.618H15.223V24h4.452c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
                </svg>
              </div>
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <div className="text-blue-400 hover:text-blue-300 transition">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.556c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.566-2.005.977-3.127 1.197-.896-.955-2.173-1.55-3.586-1.55-2.713 0-4.914 2.201-4.914 4.917 0 .385.045.76.127 1.119-4.083-.205-7.7-2.16-10.125-5.134-.422.724-.664 1.561-.664 2.456 0 1.694.861 3.191 2.173 4.067-.799-.025-1.554-.245-2.212-.612v.061c0 2.366 1.684 4.342 3.918 4.791-.41.112-.843.171-1.289.171-.314 0-.615-.03-.915-.086.631 1.953 2.446 3.374 4.6 3.414-1.684 1.32-3.808 2.107-6.107 2.107-.395 0-.79-.023-1.17-.067 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.01-7.5 14.01-14.01 0-.214-.005-.425-.014-.636.962-.694 1.797-1.561 2.457-2.549z" />
                </svg>
              </div>
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <div className="text-blue-700 hover:text-blue-600 transition">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.23 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.459C23.206 24 24 23.227 24 22.271V1.729C24 .774 23.206 0 22.23 0zM7.059 20.452H3.56V9h3.499v11.452zM5.31 7.579c-1.106 0-2.001-.898-2.001-2.004 0-1.106.895-2.001 2.001-2.001s2.002.895 2.002 2.001c0 1.106-.896 2.004-2.002 2.004zM20.452 20.452h-3.497V14.67c0-1.383-.027-3.163-1.93-3.163-1.932 0-2.229 1.51-2.229 3.067v5.878h-3.497V9h3.36v1.561h.048c.469-.888 1.609-1.826 3.312-1.826 3.542 0 4.194 2.33 4.194 5.359v6.358z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
