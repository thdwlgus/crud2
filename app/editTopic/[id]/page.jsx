import EditTopicForm from '@/components/EditTopicForm'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

const getTopicById = async (id) => {
  const apiUrl = process.env.API_URL
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Failed to fetch topic.')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function EditTopic({ params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signIn')
  }

  const { id } = params
  const { topic } = await getTopicById(id)
  const { title, description } = topic

  return <EditTopicForm id={id} title={title} description={description} />
}
