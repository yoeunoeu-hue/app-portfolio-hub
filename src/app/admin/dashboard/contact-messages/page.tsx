"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching contact messages:", error);
    else setMessages(data);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) console.error("Error deleting message:", error);
    else fetchMessages();
  };

  return (
    <Section id="admin-contact-messages">
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Contact Messages
      </h1>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <CardTitle>{message.name}</CardTitle>
              <CardDescription>{message.email}</CardDescription>
              <p className="text-sm text-muted-foreground pt-2">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </CardHeader>
            <CardContent>
              <p>{message.message}</p>
            </CardContent>
            <CardContent className="flex justify-end space-x-2 pt-0">
              <Button
                variant="destructive"
                onClick={() => handleDelete(message.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
