import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {  verify } from 'hono/jwt';
import { Hono } from 'hono';
import { createBlogInput, updateBlogInput } from '@aiden31x/medium-app1-common';
import { tr } from 'zod/v4/locales';
export const blogRouter=new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      },
      Variables: {
        userId: string;
      }
}>();
//middleware
//1.auth check
//2.extract user id and pass down to respectiv ehandler
blogRouter.use('/*',async (c,next)=>{
    const authHeader=c.req.header("Authorization") || "";
    try {
        const user=await verify(authHeader,c.env.JWT_SECRET);
        if(user){
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    }catch(e){
        c.status(403);
            return c.json({
                message: "You are not logged in"
            })
    }
})

//post blog route
blogRouter.post('/', async (c) => {

    const body=await c.req.json();
     const {success}= createBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
    const authorId=c.get("userId");
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.create({
        data: {
            title: body.title,
            content:body.content,
            authorId: Number(authorId)
        }
    })

	return c.json({
        id:blog.id
    })
})

//update blog route
blogRouter.put('/',async (c)=>{

    const body=await c.req.json();
     const {success}= updateBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content:body.content,
        }
    })
	return c.json({
        id:blog.id
    })
})
//get all blogs route
blogRouter.get ('/bulk', async (c)=>{
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
      const blogs= await prisma.blog.findMany({
        select: {
            content:true,
            title:true,
            id:true,
            author: {
                select: {
                    name:true
                }
            }
        }
      });
      return c.json({
        blogs
      })
})
//display blog route
blogRouter.get ('/:id', async (c) => {
    const id= c.req.param("id");
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog=await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                   
                }
            }
        })
        return c.json({
            blog
        })
        }catch(e){
            c.status(411);
            return c.json({
                message: "Error while fetching blog post"
            })
    }
})

