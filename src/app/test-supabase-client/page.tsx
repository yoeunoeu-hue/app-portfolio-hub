'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestSupabaseClient() {
  const [messages, setMessages] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('contact_messages').select('*')
      if (data) {
        setMessages(data)
      }
    }
    fetchMessages()
  }, [])

  return (
    <div>
      <h1>Test Supabase Client</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.name}</li>
        ))}
      </ul>
    </div>
  )
}
