import type { SignupInput } from "@aiden31x/medium-app1-common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  });

  async function sendRequest(){
    try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs);
        const jwt=response.data;
        localStorage.setItem("token",jwt);
        navigate('/blogs');
    
    }catch(e){
        console.error(e);
        //alert user
        }
  }

  return (
    <div className="h-screen flex flex-col justify-center">

      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">Create Account</div>
          <div className="text-slate-400">
            {type==="signin" ? "Don't have an account" : "Already have an Account?"}
            <Link className="pl-2 underline" to={type==='signin' ? '/signup':'/signin'}>
                {type==='signin' ? "Sign up" : "Sign in"}
            </Link>
          </div>
          <div>
            {type==='signup' ? <LabelledInput
              label="Name"
              placeholder="Johnny"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                });
              }}
            /> : null }
            <LabelledInput
              label="Email"
              placeholder="johnny@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value
                });
              }}
            /><div className="flex -col justify-center pt-2 ">
            <button onClick={sendRequest}type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
            {type=== "signup" ? "Sign Up": "Sign In"}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  const id = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="mb-2">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-semibold text-black"
      >
        {label}
      </label>
      <input
        id={id}
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
