import axios from "axios"
import { Appbar } from "./Appbar"
import { BACKEND_URL } from "../config"
import { useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title,setTitle]= useState("");
    const [description,setDescription]= useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar />
     <div className="flex justify-center w-full">
     <div className="max-w-screen-lg w-full pt-8">
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Your Title"  />
            <TextEditor onChange={(e)=>{
                setDescription(e.target.value)
            }} />
            <button onClick={async ()=> {
                 const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content: description
                 }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                 });
                 navigate(`/blog/${response.data.id }`)
                        }} type="submit" className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg  ">
                    Publish post
            </button>
    </div>
    </div>
    
    </div>
}



function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>)=> void}){
    return <div>

<form>
   <div className="w-full mb-4  ">
       <div className="flex items-center justify-between  border mt-2">
          
       <div className="px-4 py-2 bg-white rounded-b-lg w-full">
           <label className="sr-only">Publish post</label>
           <textarea  onChange={onChange}id="editor" rows={8} className="block bg-gray-50 w-full px-0 text-sm text-gray-800 bg-white border-0  
           " placeholder="Write an article..." required />
       </div>
   </div>
   
   </div>
</form>

    </div>

}