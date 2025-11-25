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

interface Experience {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
}

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [editingExperience, setEditingExperience] =
    useState<Experience | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsibilities, setResponsibilities] = useState(""); // Comma separated for input
  const supabase = createClient();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const { data, error } = await supabase.from("experience").select("*");
    if (error) console.error("Error fetching experience:", error);
    else setExperience(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const responsibilitiesArray = responsibilities
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    if (editingExperience) {
      const { error } = await supabase
        .from("experience")
        .update({
          company_name: companyName,
          role,
          start_date: startDate,
          end_date: endDate,
          responsibilities: responsibilitiesArray,
        })
        .eq("id", editingExperience.id);
      if (error) console.error("Error updating experience:", error);
      else {
        setEditingExperience(null);
        setCompanyName("");
        setRole("");
        setStartDate("");
        setEndDate("");
        setResponsibilities("");
        fetchExperience();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("experience").insert({
          company_name: companyName,
          role,
          start_date: startDate,
          end_date: endDate,
          responsibilities: responsibilitiesArray,
          user_id: user.id,
        });
        if (error) console.error("Error adding experience:", error);
        else {
          setCompanyName("");
          setRole("");
          setStartDate("");
          setEndDate("");
          setResponsibilities("");
          fetchExperience();
        }
      }
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setCompanyName(exp.company_name);
    setRole(exp.role);
    setStartDate(exp.start_date);
    setEndDate(exp.end_date);
    setResponsibilities(exp.responsibilities.join(", "));
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("experience").delete().eq("id", id);
    if (error) console.error("Error deleting experience:", error);
    else fetchExperience();
  };

  return (
    <Section id="admin-experience">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Experience</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Experience */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingExperience ? "Edit Experience" : "Add New Experience"}
            </CardTitle>
            <CardDescription>
              {editingExperience
                ? `Editing experience: ${editingExperience.company_name}`
                : "Fill in the details to add a new experience entry."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium mb-1"
                >
                  Company Name
                </label>
                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Role
                </label>
                <Input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-1"
                >
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-1"
                >
                  End Date (or leave blank for present)
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="responsibilities"
                  className="block text-sm font-medium mb-1"
                >
                  Responsibilities (comma-separated)
                </label>
                <Textarea
                  id="responsibilities"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  placeholder="e.g., Led team, Developed features, Managed projects"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingExperience ? "Update Experience" : "Add Experience"}
              </Button>
              {editingExperience && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingExperience(null);
                    setCompanyName("");
                    setRole("");
                    setStartDate("");
                    setEndDate("");
                    setResponsibilities("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Experience */}
        <div className="space-y-4">
          {experience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <CardTitle>{exp.role}</CardTitle>
                <CardDescription>
                  {exp.company_name} | {exp.start_date} - {exp.end_date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button variant="outline" onClick={() => handleEdit(exp)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(exp.id)}
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
