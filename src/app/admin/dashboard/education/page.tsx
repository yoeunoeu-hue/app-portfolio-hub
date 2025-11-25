"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Education {
  id: number;
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
}

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingEducation, setEditingEducation] =
    useState<Education | null>(null);
  const [institutionName, setInstitutionName] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const { data, error } = await supabase.from("education").select("*");
    if (error) console.error("Error fetching education:", error);
    else setEducation(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEducation) {
      const { error } = await supabase
        .from("education")
        .update({
          institution_name: institutionName,
          degree,
          field_of_study: fieldOfStudy,
          start_date: startDate,
          end_date: endDate,
        })
        .eq("id", editingEducation.id);
      if (error) console.error("Error updating education:", error);
      else {
        setEditingEducation(null);
        setInstitutionName("");
        setDegree("");
        setFieldOfStudy("");
        setStartDate("");
        setEndDate("");
        fetchEducation();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("education").insert({
          institution_name: institutionName,
          degree,
          field_of_study: fieldOfStudy,
          start_date: startDate,
          end_date: endDate,
          user_id: user.id,
        });
        if (error) console.error("Error adding education:", error);
        else {
          setInstitutionName("");
          setDegree("");
          setFieldOfStudy("");
          setStartDate("");
          setEndDate("");
          fetchEducation();
        }
      }
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setInstitutionName(edu.institution_name);
    setDegree(edu.degree);
    setFieldOfStudy(edu.field_of_study);
    setStartDate(edu.start_date);
    setEndDate(edu.end_date);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) console.error("Error deleting education:", error);
    else fetchEducation();
  };

  return (
    <Section id="admin-education">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Education</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Education */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingEducation ? "Edit Education" : "Add New Education"}
            </CardTitle>
            <CardDescription>
              {editingEducation
                ? `Editing education: ${editingEducation.institution_name}`
                : "Fill in the details to add a new education entry."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="institutionName"
                  className="block text-sm font-medium mb-1"
                >
                  Institution Name
                </label>
                <Input
                  id="institutionName"
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="degree" className="block text-sm font-medium mb-1">
                  Degree
                </label>
                <Input
                  id="degree"
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="fieldOfStudy"
                  className="block text-sm font-medium mb-1"
                >
                  Field of Study
                </label>
                <Input
                  id="fieldOfStudy"
                  type="text"
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
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
              <Button type="submit" className="w-full">
                {editingEducation ? "Update Education" : "Add Education"}
              </Button>
              {editingEducation && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingEducation(null);
                    setInstitutionName("");
                    setDegree("");
                    setFieldOfStudy("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Education */}
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader>
                <CardTitle>{edu.institution_name}</CardTitle>
                <CardDescription>
                  {edu.degree} in {edu.field_of_study}
                </CardDescription>
                <p className="text-sm text-muted-foreground pt-2">
                  {edu.start_date} - {edu.end_date}
                </p>
              </CardHeader>
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button variant="outline" onClick={() => handleEdit(edu)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(edu.id)}
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
