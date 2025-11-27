/*
  # Add Demo Portfolio Data
  
  Adds demonstration data to populate the portfolio pages.
  Includes sample projects, skills, experience, education, achievements, testimonials, and updates.
*/

-- Add sample projects
INSERT INTO projects (title, slug, description, content, image_url) VALUES
  ('AI Chat Application', 'ai-chat-app', 'A real-time chat application powered by AI', 'Built a full-stack chat application with real-time messaging and AI-powered responses using Next.js and Supabase.', '/project-1.jpg'),
  ('E-commerce Platform', 'ecommerce-platform', 'Modern e-commerce platform with payment integration', 'Developed a complete e-commerce solution with product catalog, shopping cart, and Stripe payment integration.', '/project-2.jpg'),
  ('Portfolio Website', 'portfolio-website', 'Personal portfolio showcasing projects and skills', 'Created a dynamic portfolio website with admin dashboard for managing portfolio content.', '/project-3.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Add sample skills
INSERT INTO skills (name, description, icon) VALUES
  ('TypeScript', 'Building scalable and type-safe applications', 'Code'),
  ('Next.js', 'Creating fast and modern server-rendered React apps', 'Layout'),
  ('TailwindCSS', 'Rapidly building custom user interfaces', 'Wind'),
  ('Supabase', 'Handling database, authentication, and storage with ease', 'Database')
ON CONFLICT DO NOTHING;

-- Add sample experience
INSERT INTO experience (company_name, role, start_date, end_date, responsibilities) VALUES
  ('Tech Company Inc', 'Senior Full Stack Developer', '2022-01-01', NULL, ARRAY['Led development of multiple full-stack applications', 'Mentored junior developers', 'Designed system architecture']),
  ('Digital Solutions Ltd', 'Full Stack Developer', '2020-06-01', '2021-12-31', ARRAY['Developed and maintained web applications', 'Fixed critical bugs', 'Implemented new features']),
  ('Web Development Co', 'Junior Developer', '2019-01-01', '2020-05-31', ARRAY['Assisted in development', 'Bug fixing', 'Code review participation'])
ON CONFLICT DO NOTHING;

-- Add sample education
INSERT INTO education (institution_name, degree, field_of_study, start_date, end_date) VALUES
  ('University of Technology', 'Bachelor of Science', 'Computer Science', '2015-09-01', '2019-05-15'),
  ('Online Academy', 'Bootcamp Certificate', 'Full Stack Development', '2018-08-01', '2018-12-20')
ON CONFLICT DO NOTHING;

-- Add sample achievements
INSERT INTO achievements (title, slug, description, date) VALUES
  ('Best Project Award', 'best-project-award', 'Awarded for outstanding project delivery and innovation', '2023-06-15'),
  ('Tech Leadership Recognition', 'tech-leadership', 'Recognized for leading successful team initiatives', '2023-03-20'),
  ('Innovation Excellence', 'innovation-excellence', 'Selected as innovation leader for the year', '2022-12-01')
ON CONFLICT (slug) DO NOTHING;

-- Add sample testimonials
INSERT INTO testimonials (author_name, author_photo_url, quote) VALUES
  ('John Smith - CEO at Tech Company', '/john-smith.jpg', 'Excellent developer with strong problem-solving skills and great communication.'),
  ('Jane Doe - Project Manager', '/jane-doe.jpg', 'Reliable and dedicated professional who consistently delivers high-quality work.')
ON CONFLICT DO NOTHING;

-- Add sample updates
INSERT INTO updates (content) VALUES
  ('Launched a new AI-powered application for the team'),
  ('Shared insights on modern web development practices'),
  ('Speaking at Tech Conference on full-stack development best practices')
ON CONFLICT DO NOTHING;
