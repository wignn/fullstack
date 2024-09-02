import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const SocialMediaIcons = () => {
  return (
    <div className="flex space-x-6 mt-4 justify-center">
      <a
        href="https://github.com/wignn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faGithub}
            className="text-4xl h-10 text-gray-800 hover:text-gray-600"
          />
          <span className="mt-2 text-sm text-gray-800">GitHub</span>
        </div>
      </a>
      <a href="/" target="_blank" rel="noopener noreferrer">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faDiscord}
            className="text-4xl h-10 text-gray-800 hover:text-gray-600"
          />
          <span className="mt-2 text-sm text-gray-800">Discord</span>
        </div>
      </a>
      <a
        href="https://facebook.com/your-profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-4xl h-10 text-gray-800 hover:text-gray-600"
          />
          <span className="mt-2 text-sm text-gray-800">Facebook</span>
        </div>
      </a>
      <a
        href="https://instagram.com/your-profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-4xl h-10 text-gray-800 hover:text-gray-600"
          />
          <span className="mt-2 text-sm text-gray-800">Instagram</span>
        </div>
      </a>
    </div>
  );
};

export default SocialMediaIcons;
