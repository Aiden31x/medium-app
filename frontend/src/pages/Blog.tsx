import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import Loader from "../components/Loader";
import { Appbar } from "../components/Appbar";

export const Blog=() => {
    const {id} = useParams(); 
    const {loading,blog}= useBlog({
        id: id || " "

    });
    if(loading || !blog){
        return <div >
            <Appbar />
            <div className="flex justify-center ">
            <Loader />
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog} /> 

    </div>

}