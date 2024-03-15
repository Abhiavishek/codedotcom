import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Code } from "react-bootstrap-icons";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AudioRecorder } from "react-audio-voice-recorder";
import EnglishPic from "./Images/Navbar Images/english.png";
import HindiPIc from "./Images/Navbar Images/Hindi.png";
import { useLanguage } from "./LanguageContext";
const NavComp = () => {
  const { language, updateLanguage } = useLanguage();

 

  return (
    <Navbar className="navbar navbar-light bg-light relative z-6">
      <Link to="/" className="fw-bold text-primary text-2xl my-2 mr-4 flex items-center">
        <Code size={35} className="mr-1 ml-4" />
        <strong className="font-extrabold">{language === "ENG" ? "CODE" : "कोड"}</strong>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-dark text-base">
            {language === "ENG" ? "Home" : "होम"}
          </Link>
          <Link to="/editor" className="text-dark text-base">
            {language === "ENG" ? "Editor" : "कोङिग"}
          </Link>
          <Link to="/courses" className="text-dark text-base">
            {language === "ENG" ? "Courses" : "कोर्स"}
          </Link>
          <Link to="/preparation" className="text-dark text-base">
            {language === "ENG" ? "Preparation" : "अभ्यास"}
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="audioElm">
            <AudioRecorder />
          </div>
          <div className="toggleBtns">
          <ToggleButtonGroup color="primary" exclusive value={language} onChange={(event, newLanguage) => updateLanguage(newLanguage)}>
              <ToggleButton value="ENG">
                <img src={EnglishPic} alt="Switch to English" width="25" />
              </ToggleButton>
              <ToggleButton value="HI">
                <img src={HindiPIc} alt="Switch to Hindi" width="25" />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Link to="/login" className="btn btn-primary text-white" style={{ marginRight: "1rem" }}>
            Sign Up
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComp;
