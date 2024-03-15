import React, { useState, useContext } from "react";
import { auth,app } from "./firebase";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import GoogleLogo from "../assets/GoogleLogo.png";
import Gitlogo from "../assets/Gitlogo.png";

import { UserScoreContext } from "../ContextAPI/userScoreContext";

const Login = () => {
  // Inputs
  const [username, setUsername] = useState("");
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const navigate = useNavigate(); 

  // getting user context
  const { setUser, userScore, setUserScore } = useContext(UserScoreContext);

  // backend data save code starts here####
  async function saveData(name, id, email, picURL) {
    console.log("Saving the data...");

    try {
      // getting the user with firebase id if user exist.
      const response = await fetch(
        "http://43.204.229.206:8000/api/v1/get-user-id/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("firebaseid" + id);
      const res = await response.json();
      console.log("get api response ", res);
      // console.log(typeof res.id);

      // if user does not exist we create new user
      if (res.id === "Not Found") {
        const rand = Math.floor(Math.random() * 1000);
        const data = {
          user_firebase_id: id,
          // first_name: name,
          // last_name: "",
          username: name,
          email: email,
          password: "password" + rand + rand + rand,
          // score: 0,
          questions_solved: [],
          // contact_no_1: "",
          // contact_no_2: "",
          // profilePic_url: picURL,
          // address: "",
        };
        console.log("Data to be saved", data);
        // Registering the new user into the DB
        const response = await fetch(
          "http://43.204.229.206:8000/api/v1/register",
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const res = await response.json();
        // console.log("Success:", result);
        // Setting the state var to data variable;
        setUser(res);
        localStorage.setItem("user_profile", JSON.stringify(res));
      } else {
        // if your already registered we get its data
        // alert("user found");
        // console.log("user data after login", res);
        setUser(res);
        localStorage.setItem("user_profile", JSON.stringify(res));
      }

      // getting score field from another collection

      const scoreFields = await fetch(
        "http://43.204.229.206:8000/api/v1/programmers-ranks/" + res.id + "/"
      );

      const output = await scoreFields.json();
      // console.log("Score fields output", output);
      setUserScore(output.points);
      localStorage.setItem("user_score", output.points);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // backend data save code ends here#####
  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber("+91".concat(mynumber), verify)
      .then((result) => {
        setfinal(result);
        // alert("Code sent on the given number!");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        // window.location.reload()
      });
  };
  const signInWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await auth.signInWithPopup(provider);
  
      console.log(result, "result");
      localStorage.setItem("user_id", result.user.uid);
      localStorage.setItem("username", result.user.displayName);
  
      await saveData(
        result.user.displayName,
        result.user.uid,
        result.user.email,
        result.user.photoURL
      );
  
      // Update state and local storage for user and user score
      setUser(result.user);
      const scoreFields = await fetch(
        "http://43.204.229.206:8000/api/v1/programmers-ranks/" + result.user.uid + "/"
      );
      const output = await scoreFields.json();
      setUserScore(output.points);
  
      // Wait for the state to update before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGithub = async () => {
    try {
      gitprovider.setCustomParameters({ prompt: "select_account" });
      const result = await auth.signInWithPopup(gitprovider);
  
      console.log(result, "result");
      localStorage.setItem("user_id", result.user.uid);
      localStorage.setItem("username", result.user.displayName);
  
      await saveData(
        result.user.displayName,
        result.user.uid,
        result.user.email,
        result.user.photoURL
      );
  
      // Update state and local storage for user and user score
      setUser(result.user);
      const scoreFields = await fetch(
        "http://43.204.229.206:8000/api/v1/programmers-ranks/" + result.user.uid + "/"
      );
      const output = await scoreFields.json();
      setUserScore(output.points);
  
      // Wait for the state to update before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };
  
  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        localStorage.setItem("user_id", result.user.uid);
        localStorage.setItem("username", username);
        console.log(result.user);
        saveData(username, result.user.uid, result.user.email, "");
        // Redirect to the user's account page\
        navigate('/user/profile');  // Use navigate instead of history.push
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect OTP!");
      });
  };

  return (
    <>
      <div className="py-5 px-2 my-5 container shadow-sm rounded">
        {/* Phone Number Section Starts*/}
        <center>
          <div style={{ display: !show ? "block" : "none" }} className="phone_section">
            <div className="input_box">
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter username "
                style={{ height: "fit-content" }}
              />
            </div>
            <div className="input_box d-flex flex-row justify-content-center align-items-center">
              <span>+91</span>
              <input
                value={mynumber}
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
                placeholder="phone number"
                style={{ height: "fit-content" }}
              />
            </div>
            <div id="recaptcha-container"></div>
            <button
              onClick={signin}
              className="btn btn-primary w-full px-auto my-3"
            >
              Send OTP
            </button>
          </div>
        </center>
        <div style={{ display: show ? "block" : "none" }} className="otp_section">
          <center>
            <div className="input_box">
              <input
                type="text"
                placeholder={"Enter your OTP"}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                style={{ height: "fit-content" }}
              ></input>
            </div>
            <button onClick={ValidateOtp} className="btn btn-primary">
              Verify
            </button>
          </center>
        </div>
        {/* Phone Number Section Ends */}

        {/* GOOGLE SIGNIN SECTION STARTS */}
        {!show && (
          <>
            <div className="or_text text-center my-2">Or?</div>

            <div className="google google_signin">
              <center>
                <button
                  className="border rounded px-3 py-2 shadow-sm mt-3 d-flex flex-row justify-content-center align-items-center"
                  style={{ backgroundColor: "white" }}
                  onClick={signInWithGoogle}
                >
                  <img src={GoogleLogo} style={{ width: "20px" }} alt="" />
                  <span className="m-1">Sign In with Google </span>
                </button>
              </center>
            </div>

            <div className="google google_signin">
              <center>
                <button
                  className="border rounded px-3 py-2 shadow-sm mt-3 d-flex flex-row justify-content-center align-items-center"
                  style={{ backgroundColor: "white" }}
                  onClick={signInWithGithub}
                >
                  <img src={Gitlogo} style={{ width: "20px" }} alt="" />
                  <span className="m-1">Sign In with Github </span>
                </button>
              </center>
            </div>
          </>
        )}
        {/* GOOGLE SIGNIN SECTION ENDS */}
      </div>
    </>
  );
};

export default Login;
