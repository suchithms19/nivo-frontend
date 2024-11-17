import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import BACKEND_URL from "../config"
import logo from '../assets/logo.png';

export function Auth({endpoint}) {
    const [postInputs, setpostInputs] = useState({
        email: "",
        password: "",
        businessName: ""
    })
     
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${endpoint === "signup" ? "signup" : "login"}`, postInputs)
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate('/waitlist');
            
        } catch (e) {
            console.error("Failed to send request:", e);
            alert("Something went wrong. Please try again.");
        }
    }

    return <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="w-72 space-y-2">
                        <div className="flex justify-center mb-4">
                            <img className="h-16" src={logo} alt="Logo of Nivo company"/>
                        </div>
                        <div className="text-center text-lg font-semibold pb-10">{endpoint === "signup" ? "Sign up" : "Log in" }</div>
                        <LabelledInput label={"Email"} type={"email"}placeholder={"example@gmail.com"} onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                        }}></LabelledInput>

                        <LabelledInput label={"Password"} type={"password"} placeholder={"••••••••"} onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                        }}></LabelledInput>
                        
                        {endpoint === "signup" && (
                            <LabelledInput 
                                label={"Business Name"} 
                                type={"text"} 
                                placeholder={"Enter your business name"} 
                                onChange={(e) => {
                                    setpostInputs({
                                        ...postInputs,
                                        businessName: e.target.value
                                    })
                                }}
                            />
                        )}
                         
                        <div className="text-xs py-2">{endpoint === "signup" ? "By creating an account you agree to the terms of use and our privacy policy." : "" }</div>

                        <button onClick={sendRequest} type="button"  style={{ backgroundColor: "#605BFF"}} className="w-full focus:outline-none text-white hover:scale-105 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">{endpoint === "signup" ? "Create account" : "Log in" }</button>
                        <div className="text-xs text-center">
                            {endpoint === "signup" ? (
                                <div>
                                Already have an account? <Link style={{color: "#605BFF"}} to="/login">Login</Link>
                                </div>
                            ) : (
                                <div>
                                Don't have an account yet? <Link style={{color: "#605BFF"}} to="/signup">New Account</Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

}

export function LabelledInput({ label, placeholder, onChange, type }) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 text-base">{label}</label>
        <input onChange={onChange} type={type} id="first_name" className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 block w-full py-1.5 px-1" placeholder={placeholder} required />
    </div>
}

