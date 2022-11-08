'use client'

import React from 'react'
import PocketBase from 'pocketbase'
import { useRouter } from 'next/navigation'

const SideBar = () => {

  // next router
  const router = useRouter()

  // pocketbase api orm
  const client = new PocketBase(`${process.env.POCKETBASE_API}`)

  const [menuHidden, setMenuHidden] = React.useState<boolean>(true)

  // form state
  const [image, setImage] = React.useState<string>('')
  const [title, setTitle] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [author, setAuthor] = React.useState<string>('')

  // form error state
  const [imageError, setImageError] = React.useState<string>('')
  const [titleError, setTitleError] = React.useState<string>('')
  const [categoryError, setCategoryError] = React.useState<string>('')
  const [descriptionError, setDescriptionError] = React.useState<string>('')
  const [authorError, setAuthorError] = React.useState<string>('')

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const clearFormState = () => {
    setImage('')
    setTitle('')
    setCategory('')
    setDescription('')
    setAuthor('')

    setImageError('')
    setTitleError('')
    setCategoryError('')
    setDescriptionError('')
    setAuthorError('')
  }

  const onCreatePost = async (e: any) => {
    try {
      e.preventDefault()

      setIsLoading(true)

      const imageDomain = image && (new URL(image)).hostname.replace('www.','')
      const slug = title.toLocaleLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

      if (image === '') {
        setImageError('Image is required')
        setIsLoading(false)
      } else if (imageDomain !== 'pbs.twimg.com') {
        setImageError('Only twitter images url')
        setIsLoading(false)
      } else if (title.length <= 5) {
        setTitleError('Must be at least 5 characters')
        setIsLoading(false)
      } else if (title === '') {
        setTitleError('Title is required')
        setIsLoading(false)
      } else if (category === '') {
        setCategoryError('Category is required')
        setIsLoading(false)
      } else if (description === '') {
        setDescriptionError('Description is required')
        setIsLoading(false)
      } else if (author === '') {
        setAuthorError('Author is required')
        setIsLoading(false)
      } else {
        await client.records.create('blogs', {
          image,
          title,
          slug,
          category,
          description,
          author
        })
        clearFormState()
        setIsLoading(false)
        router.refresh()
      }

    } catch (error) {
      setIsLoading(false)
      console.error('Create Post Error', error)
    }
  }

  return (
    <React.Fragment>
      {menuHidden && (
        <div className="fixed bottom-10 right-10">
          <button
            className="font-normal text-lg p-2 rounded-full bg-blue-600 bg-opacity-60 transition ease-in-out duration-200 transform hover:scale-95"
            onClick={() => setMenuHidden(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      )}
      <div className={`sticky top-0 ${menuHidden ? 'hidden' : 'flex'} flex-col items-center w-full max-w-sm h-full overflow-y-auto border-r border-neutral-200`}>
        <div className="flex flex-row items-center justify-between w-full px-5 py-3">
          <h3 className="font-bold text-2xl">Create Post</h3>
          <button
            className="font-normal text-lg transition ease-in-out duration-200 transform hover:scale-95"
            onClick={() => setMenuHidden(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form
          className="flex flex-col w-full px-5 py-3 space-y-5"
          onSubmit={onCreatePost}
        >
          <div className="flex flex-col items-start w-full space-y-3">
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="image" className="font-light text-sm">Image</label>
              <input
                id="image"
                type="text"
                className="w-full outline-none p-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 focus:border-blue-400"
                disabled={isLoading}
                value={image}
                onChange={e => {
                  setImage(e.target.value)
                  setImageError('')
                }}
              />
              {imageError && (<span className="font-light text-xs text-red-600">{ imageError }</span>)}
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="title" className="font-light text-sm">Title</label>
              <input
                id="title"
                type="text"
                className="w-full outline-none p-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 focus:border-blue-400"
                disabled={isLoading}
                value={title}
                onChange={e => {
                  setTitle(e.target.value)
                  setTitleError('')
                }}
              />
              {titleError && (<span className="font-light text-xs text-red-600">{ titleError }</span>)}
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="slug" className="font-light text-sm">Slug</label>
              <input
                id="slug"
                type="text"
                disabled
                className="w-full outline-none p-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 focus:border-blue-400"
                value={title.toLocaleLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="category" className="font-light text-sm">Category</label>
              <input
                id="category"
                type="text"
                className="w-full outline-none p-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 focus:border-blue-400"
                disabled={isLoading}
                value={category}
                onChange={e => {
                  setCategory(e.target.value)
                  setCategoryError('')
                }}
              />
              {categoryError && (<span className="font-light text-xs text-red-600">{ categoryError }</span>)}
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="description" className="font-light text-sm">Description</label>
              <textarea
                id="description"
                className="w-full outline-none p-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 focus:border-blue-400"
                disabled={isLoading}
                cols={30}
                rows={5}
                value={description}
                onChange={e => {
                  setDescription(e.target.value)
                  setDescriptionError('')
                }}
              />
              {descriptionError && (<span className="font-light text-xs text-red-600">{ descriptionError }</span>)}
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label htmlFor="author" className="font-light text-sm">Author</label>
              <input
                id="author"
                type="text"
                className="w-full outline-none p-3 text-sm text-neutral-600 rounded-xl border border-neutral-200 focus:border-blue-400"
                disabled={isLoading}
                value={author}
                onChange={e => {
                  setAuthor(e.target.value)
                  setAuthorError('')
                }}
              />
              {authorError && (<span className="font-light text-xs text-red-600">{ authorError }</span>)}
            </div>
            <div className="flex flex-col w-full space-y-1">
              {isLoading
                ? <p className="w-full outline-none p-3 text-sm text-white rounded-xl border border-blue-500 bg-blue-500 bg-opacity-80">
                    Posting...
                  </p>
                : <button
                    type="submit"
                    className="w-full outline-none p-3 text-sm text-white rounded-xl border border-blue-500 bg-blue-500 transition ease-in-out hover:bg-opacity-80"
                  >
                    Post
                  </button>
              }
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default SideBar