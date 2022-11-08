import React from 'react'
import Image from 'next/image'
import moment from 'moment'

function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
  return fn as (arg: T) => R
}

const getBlogs = async () => {
  const res = await fetch(`${process.env.POCKETBASE_API}/api/collections/blogs/records`, {
    cache: 'force-cache',
    next: {
      revalidate: 10
    }
  })
  return res.json()
}

const FeedGrid = asyncComponent(async () => {

  const blogs = await getBlogs()

  return (
    <div className="flex flex-col items-center w-full p-5 space-y-5">
      <div className="flex items-center justify-start w-full">
        <h1 className="font-bold text-3xl">NextJS 13 (Blogs)</h1>
      </div>
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-3 w-full">
        {blogs?.items?.map((blog: { id: number, image: string, title: string, slug: string, category: string, description: string, author: string, created: Date }) => (
          <div
            key={blog.id}
            className="flex flex-col w-full rounded-xl border border-neutral-400 p-3 space-y-3"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h2 className="font-bold text-lg">{ blog.title }</h2>
              <button className="outline-none text-sm text-red-500">Delete</button>
            </div>
            <div className="flex-auto w-full h-[10rem] overflow-hidden object-bottom rounded-xl">
              <Image
                className="flex w-full h-full object-cover"
                src={blog.image}
                blurDataURL={blog.image}
                width={300}
                height={300}
                quality={100}
                alt={blog.image}
              />
            </div>
            <div className="flex flex-col w-full space-y-5">
              <h3 className="font-bold text-base text-blue-500">{ blog.category }</h3>
              <p className="font-normal text-sm">{ blog.description }</p>
              <div className="flex flex-row items-center justify-between w-full">
                <span className="font-light text-xs">{ moment(blog.created).format('LL') }</span>
                <span className="font-light text-xs">{ blog.author }</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default FeedGrid