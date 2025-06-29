import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-400 pb-2">
        <div className="flex">
            <Avatar name={authorName}/>
            <div className="font-extralight pl-2 flex justify-center flex-col">
            {authorName} 
            </div>
            <div className="pl-2 font-thin flex justify-center flex-col">
            {publishedDate}
            </div>

        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0.100) + "..."}
        </div>
        <div className="text-slate-500 text-sm pt-4">
            {`${Math.ceil(content.length / 100)} minutes`}
        </div>

    </div>
    </Link>
}

export function Avatar({name}: {name: string}){
    return <div className ="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0] }
    </span>
</div>
}