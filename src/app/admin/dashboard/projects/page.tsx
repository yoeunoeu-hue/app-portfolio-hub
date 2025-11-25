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
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  project_url?: string;
  github_url?: string;
  image_url?: string; // To store the URL of the main project image
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data);
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
    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update({
          title,
          slug,
          description,
          content,
          project_url: projectUrl,
          github_url: githubUrl,
          image_url: imageUrl,
        })
        .eq("id", editingProject.id);
      if (error) console.error("Error updating project:", error);
      else {
        setEditingProject(null);
        setTitle("");
        setSlug("");
        setDescription("");
        setContent("");
        setProjectUrl("");
        setGithubUrl("");
        setImageUrl("");
        fetchProjects();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("projects").insert({
          title,
          slug,
          description,
          content,
          project_url: projectUrl,
          github_url: githubUrl,
          image_url: imageUrl,
          user_id: user.id,
        });
        if (error) console.error("Error adding project:", error);
        else {
          setTitle("");
          setSlug("");
          setDescription("");
          setContent("");
          setProjectUrl("");
          setGithubUrl("");
          setImageUrl("");
          fetchProjects();
        }
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setSlug(project.slug);
    setDescription(project.description);
    setContent(project.content);
    setProjectUrl(project.project_url || "");
    setGithubUrl(project.github_url || "");
    setImageUrl(project.image_url || "");
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) console.error("Error deleting project:", error);
    else fetchProjects();
  };

  return (
    <Section id="admin-projects">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Projects</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Projects */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </CardTitle>
            <CardDescription>
              {editingProject
                ? `Editing project: ${editingProject.title}`
                : "Fill in the details to add a new project."}
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
                  readOnly // Slug is auto-generated but can be edited if needed
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
                <label
                  htmlFor="projectUrl"
                  className="block text-sm font-medium mb-1"
                >
                  Project URL
                </label>
                <Input
                  id="projectUrl"
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-sm font-medium mb-1"
                >
                  GitHub URL
                </label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium mb-1"
                >
                  Image URL (Main project image)
                </label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
              {editingProject && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingProject(null);
                    setTitle("");
                    setSlug("");
                    setDescription("");
                    setContent("");
                    setProjectUrl("");
                    setGithubUrl("");
                    setImageUrl("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Projects */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              {project.image_url && (
                <CardContent className="pt-0">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    width={200}
                    height={150}
                    className="object-cover rounded-md"
                  />
                </CardContent>
              )}
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button variant="outline" onClick={() => handleEdit(project)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(project.id)}
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
