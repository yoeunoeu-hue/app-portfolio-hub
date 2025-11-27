/*
  # Make User ID Nullable for Demo Data
  
  Allows demo data to be added without requiring a valid auth.users entry.
  This enables the portfolio to display sample content during development.
  
  Changes:
  - Projects: user_id made nullable
  - Skills: user_id made nullable
  - Experience: user_id made nullable
  - Education: user_id made nullable
  - Achievements: user_id made nullable
  - Testimonials: user_id made nullable
  - Updates: user_id made nullable
  - Media: user_id made nullable
  
  Note: In production, proper auth integration should be implemented.
*/

ALTER TABLE projects ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE skills ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE experience ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE education ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE achievements ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE testimonials ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE updates ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE media ALTER COLUMN user_id DROP NOT NULL;
