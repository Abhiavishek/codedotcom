import React from "react";
import { Link } from "react-router-dom";
import Coding from "../assets/Coding.svg";
import { useLanguage } from "./LanguageContext";

const Home = () => {
  const { language } = useLanguage();

  return (
    <div>
      <section
        id="hero"
        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === "ENG"
              ? "Learn coding from the best without any barrier!"
              : "सर्वश्रेष्ठ से बिना किसी बाधा के कोडिंग सीखें!"}
          </h1>
          <p className="text-lg mb-6">
            {language === "ENG"
              ? "We are here with a solution for those students who always wanted to learn coding but can't because of language barrier"
              : "हम यहां उन छात्रों के लिए एक समाधान लेकर आए हैं जो हमेशा कोडिंग सीखना चाहते थे लेकिन भाषा की बाधा के कारण नहीं सीख पाते।"}
          </p>
          <div className="flex space-x-4">
            <Link
              to="/editor"
              className="bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300"
            >
              {language === "ENG" ? "Start Coding" : "कोडिंग प्रारंभ करें"}
            </Link>
            <Link
              to="/courses"
              className="border border-white text-white py-2 px-6 rounded-full hover:bg-white hover:text-blue-500 transition duration-300"
            >
              {language === "ENG" ? "View Courses" : "कोर्स देखें"}
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img src={Coding} alt="Coding" className="w-full h-auto" />
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">
            {language === "ENG" ? "Services" : "सेवाएं"}
          </h2>
          <div className="flex justify-center items-center">
            {" "}
            {/* Service 1 */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0 mx-3">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-emoji-laughing mb-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                </svg>
                <div className="font-bold">{"Offline Library"}</div>
                <p className="text-secondary">
                  {language === "ENG"
                    ? "We are teaching students offline also"
                    : "हम छात्रों को ऑफलाइन भी पढ़ा रहे हैं।"}
                </p>
              </div>
            </div>
            {/* Service 2 */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0 mx-3">
              {" "}
              <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-laptop mb-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                </svg>
                <div className="font-bold">{"Providing Laptop"}</div>
                <p className="text-secondary">
                  {language === "ENG"
                    ? "Join our course and we will provide a laptop to study"
                    : "हमारे पाठ्यक्रम में शामिल हों और हम अध्ययन करने के लिए लैपटॉप प्रदान करेंगे।"}
                </p>
              </div>
            </div>
            {/* Service 3 */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0 mx-3">
              {" "}
              <div className="bg-yellow-500 p-6 rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-translate mb-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                </svg>
                <div className="font-bold">{"Multilingual"}</div>
                <p className="text-secondary">
                  {language === "ENG"
                    ? "We are aiming to teach coding in multiple languages"
                    : "हमारा लक्ष्य बहु भाषाओं में कोडिंग सिखाने का है।"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=" mx-auto text-center py-8 bg-gray-100 rounded-lg shadow-lg p-6">
  <p className="text-lg font-semibold mb-4 text-gray-700">
    {language === "ENG"
      ? "Facing technical issues?"
      : "तकनीकी समस्याएँ हैं?"}
  </p>
  <a
    href="mailto:ankit@shuniyavigyan.com"
    className="text-blue-500 underline hover:text-blue-700 transition duration-300 ease-in-out"
  >
    {language === "ENG"
      ? "Mail us your query!"
      : "अपनी समस्या हमें मेल करें!"}
  </a>
</div>

    </div>
  );
};

export default Home;
