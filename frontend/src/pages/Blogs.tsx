import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import Loader from "../components/Loader";
import { useBlogs } from "../hooks"



export const Blogs= () => {
    const {loading,blogs} = useBlogs();

    if (loading){
        return<div >
        <Appbar />
        <div className="flex justify-center ">
        <Loader />
        </div>
    </div>
    }
      
    
    return <div >
        <Appbar />
        <div className="flex justify-center">
    <div className=" max-w-xl">
        {blogs.map(blog => <BlogCard 
        id={blog.id}
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        publishedDate={"23rd february"}
        />)}
        
         
    </div>
    </div>
    </div>
}