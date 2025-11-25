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

interface Testimonial {
  id: number;
  author_name: string;
  author_photo_url?: string;
  quote: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [authorPhotoUrl, setAuthorPhotoUrl] = useState("");
  const [quote, setQuote] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error) console.error("Error fetching testimonials:", error);
    else setTestimonials(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTestimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update({ author_name: authorName, author_photo_url: authorPhotoUrl, quote })
        .eq("id", editingTestimonial.id);
      if (error) console.error("Error updating testimonial:", error);
      else {
        setEditingTestimonial(null);
        setAuthorName("");
        setAuthorPhotoUrl("");
        setQuote("");
        fetchTestimonials();
      }
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("testimonials").insert({
          author_name: authorName,
          author_photo_url: authorPhotoUrl,
          quote,
          user_id: user.id,
        });
        if (error) console.error("Error adding testimonial:", error);
        else {
          setAuthorName("");
          setAuthorPhotoUrl("");
          setQuote("");
          fetchTestimonials();
        }
      }
    }
  };

  const handleEdit = (test: Testimonial) => {
    setEditingTestimonial(test);
    setAuthorName(test.author_name);
    setAuthorPhotoUrl(test.author_photo_url || "");
    setQuote(test.quote);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) console.error("Error deleting testimonial:", error);
    else fetchTestimonials();
  };

  return (
    <Section id="admin-testimonials">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Testimonials</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Form for Adding/Editing Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </CardTitle>
            <CardDescription>
              {editingTestimonial
                ? `Editing testimonial from: ${editingTestimonial.author_name}`
                : "Fill in the details to add a new testimonial."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="authorName"
                  className="block text-sm font-medium mb-1"
                >
                  Author Name
                </label>
                <Input
                  id="authorName"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="authorPhotoUrl"
                  className="block text-sm font-medium mb-1"
                >
                  Author Photo URL
                </label>
                <Input
                  id="authorPhotoUrl"
                  type="url"
                  value={authorPhotoUrl}
                  onChange={(e) => setAuthorPhotoUrl(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="quote" className="block text-sm font-medium mb-1">
                  Quote
                </label>
                <Textarea
                  id="quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
              </Button>
              {editingTestimonial && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setAuthorName("");
                    setAuthorPhotoUrl("");
                    setQuote("");
                  }}
                  className="w-full mt-2"
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Existing Testimonials */}
        <div className="space-y-4">
          {testimonials.map((test) => (
            <Card key={test.id}>
              <CardHeader>
                {test.author_photo_url && (
                  <Image
                    src={test.author_photo_url}
                    alt={test.author_name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover mb-2"
                  />
                )}
                <CardTitle>{test.author_name}</CardTitle>
                <CardDescription>"{test.quote}"</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end space-x-2 pt-0">
                <Button variant="outline" onClick={() => handleEdit(test)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(test.id)}
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
