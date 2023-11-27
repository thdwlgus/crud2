'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const router = useRouter()

  const handlesubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error('Failed to update topic')
      }
      router.pust('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handlesubmit} className="flex flex-col gap-3">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          placeholder="Topic title"
          className="border border-slate-500 p-3"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          type="text"
          placeholder="Topic description"
          className="border border-slate-500 p-3 h-32"
        />
        <butto className="bg-green-800 text-white font-bold w-fit px-6 py-3 rounded-md">
          Update Topic
        </butto>
      </form>
    </div>
  )
}
