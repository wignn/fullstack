

const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-center text-surface bg-black dark:text-white mt-auto">
      <div className="container pt-5">
        {/* Social media icons container */}
        <div className="mb-2 flex justify-center space-x-2">
          {/* GitHub Icon */}
          <a
            href="https://github.com/wignn"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            aria-label="GitHub"
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M224 8C100.3 8 0 108.3 0 232c0 103.7 66.6 191.9 157.7 223.6 11.5 2.1 15.7-5 15.7-11.1 0-5.5-.2-20.1-.3-39.4-64.5 14.1-78.3-31.1-78.3-31.1-10.6-27-25.9-34.2-25.9-34.2-21.2-14.5 1.6-14.2 1.6-14.2 23.4 1.6 35.7 24 35.7 24 20.8 35.5 54.5 25.3 67.9 19.4 2.1-15 8.1-25.3 14.7-31.1-51.7-5.9-106.5-25.8-106.5-114.7 0-25.4 9.1-46.2 24.1-62.5-2.4-5.9-10.5-29.9 2.3-62.3 0 0 19.5-6.2 63.8 23.6 18.5-5.2 38.5-7.8 58.3-7.9 19.8 .1 39.8 2.7 58.3 7.9 44.3-29.9 63.8-23.6 63.8-23.6 12.8 32.4 4.8 56.4 2.3 62.3 15.1 16.3 24.1 37.1 24.1 62.5 0 88.9-54.8 108.7-106.6 114.6 8.3 7.2 15.7 21.4 15.7 43.1 0 31.2-.3 56.2-.3 63.8 0 6.2 4.1 13.3 15.7 11.1C381.4 423.9 448 335.7 448 232 448 108.3 347.7 8 224 8z" />
              </svg>
            </span>
          </a>

          {/* Twitter Icon */}
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            aria-label="Twitter"
          >
            <span className="[&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            aria-label="LinkedIn"
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </span>
          </a>

          {/* Instagram Icon */}
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
            aria-label="Instagram"
          >
            <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 488 512"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Copyright section */}
      <div className="w-full bg-black/5 p-4 text-sm text-center">
        © 2023 Copyright:
        <a href=""> Othinus</a>
      </div>
    </footer>
  );
};

export default Footer;
