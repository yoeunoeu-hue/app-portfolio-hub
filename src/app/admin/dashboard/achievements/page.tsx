"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Achievement {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingAchievement, setEditingAchievement] =
    useState<Achievement | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data, error } = await supabase.from("achievements").select("*");
    if (error) console.error("Error fetching achievements:", error);
    else setAchievements(data);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAchievement) {
      const { error } = await supabase
        .from("achievements")
        .update({ title, slug, description, content, date })
        .eq("id", editingAchievement.id);
      if (error) console.error("Error updating achievement:", error);
      else {
        setEditingAchievement(null);
        setTitle("");
        setSlug("");
        setDescription("");
        setContent("");
        setDate("");
        fetchAchievements();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("achievements").insert({
          title,
          slug,
          description,
          content,
          date,
          user_id: user.id,
        });
        if (error) console.error("Error adding achievement:", error);
        else {
          setTitle("");
          setSlug("");
          setDescription("");
          setContent("");
          setDate("");
          fetchAchievements();
        }
      }
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setTitle(achievement.title);
    setSlug(achievement.slug);
    setDescription(achievement.description);
    setContent(achievement.content);
    setDate(achievement.date);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("achievements")
      .delete()
      .eq("id", id);
    if (error) console.error("Error deleting achievement:", error);
    else fetchAchievements();
  };

  return (
    <Section id="admin-achievements">
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Achievements
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingAchievement ? "Edit Achievement" : "Add New Achievement"}
            </CardTitle>
            <CardDescription>
              {editingAchievement
                ? `Editing achievement: ${editingAchievement.title}`
                : "Fill in the details to add a new achievement."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1">
                  Slug
                </label>
                <Input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  readOnly
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingAchievement ? "Update Achievement" : "Add Achievement"}
              </Button>
              {editingAchievement && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingAchievement(null);
                    setTitle("");
                    setSlug("");
                    setDescription("");
                    setContent("");
                    setDate("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Achievements */}
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader>
                <CardTitle>{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
                <p className="text-sm text-muted-foreground pt-2">
                  {new Date(achievement.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(achievement)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(achievement.id)}
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
