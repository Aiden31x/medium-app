import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog}) =>{
    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-2xl">
        <div className="col-span-8">
            <div className="text-3xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                Post on 3rd december
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4">
            <div className="text-xl font-slate-600">
            Author
            </div>
            <div className="flex">
                <div className="flex">
                <Avatar  name={blog.author.name || "Anonymous"} />
                </div>
                
                <div>
                <div className="text-xl font-bold pl-2" >
                        {blog.author.name || "Anonymous"} 
                    </div>
                    <div className="font-light pt-2">
                    Random catchprase about the Author who he fill catch the user's attention 
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    </div>
    </div>
}