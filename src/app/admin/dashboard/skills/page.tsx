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

interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase.from("skills").select("*");
    if (error) console.error("Error fetching skills:", error);
    else setSkills(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill) {
      const { error } = await supabase
        .from("skills")
        .update({ name, description, icon })
        .eq("id", editingSkill.id);
      if (error) console.error("Error updating skill:", error);
      else {
        setEditingSkill(null);
        setName("");
        setDescription("");
        setIcon("");
        fetchSkills();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("skills")
          .insert({ name, description, icon, user_id: user.id });
        if (error) console.error("Error adding skill:", error);
        else {
          setName("");
          setDescription("");
          setIcon("");
          fetchSkills();
        }
      }
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setName(skill.name);
    setDescription(skill.description);
    setIcon(skill.icon);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) console.error("Error deleting skill:", error);
    else fetchSkills();
  };

  return (
    <Section id="admin-skills">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Skills</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Skills */}
        <Card>
          <CardHeader>
            <CardTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</CardTitle>
            <CardDescription>
              {editingSkill
                ? `Editing skill: ${editingSkill.name}`
                : "Fill in the details to add a new skill."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Skill Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                <label htmlFor="icon" className="block text-sm font-medium mb-1">
                  Icon (Lucide React name)
                </label>
                <Input
                  id="icon"
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="e.g., Code, Database"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingSkill ? "Update Skill" : "Add Skill"}
              </Button>
              {editingSkill && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingSkill(null);
                    setName("");
                    setDescription("");
                    setIcon("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Skills */}
        <div className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle>{skill.name}</CardTitle>
                <CardDescription>{skill.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button variant="outline" onClick={() => handleEdit(skill)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(skill.id)}>
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
