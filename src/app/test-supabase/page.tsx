'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button' // Import the Button component

export default function TestSupabase() {
  const [message, setMessage] = useState('')

  const testConnection = async () => {
    const response = await fetch('/api/test-supabase', {
      method: 'POST',
    })
    const { success, error } = await response.json()
    if (success) {
      setMessage('Successfully inserted a row into the test table.')
    } else {
      setMessage(`Error: ${error}`)
    }
  }

  return (
    <div>
      <h1>Test Supabase Connection</h1>
      <Button onClick={testConnection}>Test Supabase Connection</Button> {/* Use the Button component */}
      {message && <p>{message}</p>}
    </div>
  )
}
