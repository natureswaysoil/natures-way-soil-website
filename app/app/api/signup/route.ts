
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Simple in-memory user store for development
const users: Array<{
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
}> = [
  {
    id: '1',
    email: 'john@doe.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeC4B8N5qoRQckG6.',
    firstName: 'John',
    lastName: 'Doe'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName
    }

    users.push(newUser)

    return NextResponse.json(
      { message: 'User created successfully', userId: newUser.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
