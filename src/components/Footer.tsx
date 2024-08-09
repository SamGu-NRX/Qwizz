// const Footer = () => {
//     const currentYear = new Date().getFullYear();
  
//     return (
//       <footer className="bg-gray-800 text-white text-center p-3 mt-8 text-sm transition-opacity duration-500 opacity-0"
//       style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}>
//         <p>&copy; {currentYear} StudyBuddy. All rights reserved. </p>
//       </footer>
//     );
//   };
  
//   export default Footer;
  

import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "@/components/ui/magic-button";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
        />
      </div>

      <div className="flex flex-col items-center px-4">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:focus.sgu@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
            &copy; {currentYear} StudyBuddy. All rights reserved.
        </p>

        <div className="flex items-center md:gap-3 gap-6 p-2 mt-2">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              onClick={() => window.open(info.link)}
              className="w-14 h-12 cursor-pointer group flex justify-center items-center backdrop-filter backdrop-blur-lg bg-black-200/[0.95] rounded-lg border border-black-300 transition-all duration-200 transform hover:scale-110 hover:bg-opacity-90"
            >
              <div
                className={`h-6 w-6 transition-colors duration-200 ${
                  info.name === 'GitHub'
                    ? 'text-neutral-400 group-hover:text-white'
                    : info.name === 'Twitter'
                    ? 'text-neutral-400 group-hover:text-twitter'
                    : info.name === 'LinkedIn'
                    ? 'text-neutral-400 group-hover:text-linkedin'
                    : info.name === 'Discord'
                    ? 'text-neutral-400 group-hover:text-discord'
                    : ''
                }`}
              >
                {info.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;