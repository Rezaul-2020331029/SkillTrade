"use client"

import { useEffect, useState } from "react"
import client from "../../../../api/client"
import { useParams } from "next/navigation"

interface User {
  fullName: string
  profilePicture: string
  email: string
  occupation: string
  description: string
  gender: string
  availability: string[]
  sessionsTaught: number
  avgRating: number
  isPremium: boolean
  is5Star: boolean
  isExperiencedTeacher: boolean
}

export default function UserProfile() {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await (client({ req: {} }) as any).get(`/api/users/${params.id}`)
        setUser(data)
      } catch (err) {
        setError("Failed to load user data")
        console.error("Error fetching user data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>{user.fullName}</h1>
      <div>
        <img src={user.profilePicture} alt={user.fullName} />
      </div>
      <div>
        <p>Email: {user.email}</p>
        <p>Occupation: {user.occupation}</p>
        <p>Description: {user.description}</p>
        <p>Gender: {user.gender}</p>
        <p>Availability: {user.availability.join(", ")}</p>
        <p>Sessions Taught: {user.sessionsTaught}</p>
        <p>Average Rating: {user.avgRating.toFixed(1)}</p>
        <p>Is Premium: {user.isPremium ? "Yes" : "No"}</p>
        <p>Is 5 Star Teacher: {user.is5Star ? "Yes" : "No"}</p>
        <p>Is Experienced Teacher: {user.isExperiencedTeacher ? "Yes" : "No"}</p>
      </div>
    </div>
  )
}
