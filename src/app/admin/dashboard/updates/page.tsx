"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Update {
  id: number;
  content: string;
  created_at: string;
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [content, setContent] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    const { data, error } = await supabase
      .from("updates")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching updates:", error);
    else setUpdates(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUpdate) {
      const { error } = await supabase
        .from("updates")
        .update({ content })
        .eq("id", editingUpdate.id);
      if (error) console.error("Error updating update:", error);
      else {
        setEditingUpdate(null);
        setContent("");
        fetchUpdates();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("updates")
          .insert({ content, user_id: user.id });
        if (error) console.error("Error adding update:", error);
        else {
          setContent("");
          fetchUpdates();
        }
      }
    }
  };

  const handleEdit = (update: Update) => {
    setEditingUpdate(update);
    setContent(update.content);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("updates").delete().eq("id", id);
    if (error) console.error("Error deleting update:", error);
    else fetchUpdates();
  };

  return (
    <Section id="admin-updates">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Updates</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Updates */}
        <Card>
          <CardHeader>
            <CardTitle>{editingUpdate ? "Edit Update" : "Add New Update"}</CardTitle>
            <CardDescription>
              {editingUpdate
                ? `Editing update from: ${new Date(
                    editingUpdate.created_at
                  ).toLocaleDateString()}`
                : "Fill in the details to add a new update."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium mb-1"
                >
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingUpdate ? "Update Update" : "Add Update"}
              </Button>
              {editingUpdate && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingUpdate(null);
                    setContent("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Updates */}
        <div className="space-y-4">
          {updates.map((update) => (
            <Card key={update.id}>
              <CardHeader>
                <CardTitle>
                  {new Date(update.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
                <CardDescription>{update.content}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button variant="outline" onClick={() => handleEdit(update)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(update.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
