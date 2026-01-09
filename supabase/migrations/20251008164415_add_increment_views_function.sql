/*
  # Add increment views function

  1. New Functions
    - `increment_post_views` - Safely increments the view count for a blog post

  2. Purpose
    - Allows incrementing view counts without requiring full update permissions
    - Prevents race conditions when multiple users view simultaneously
*/

-- Create function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION increment_post_views(uuid) TO anon;
GRANT EXECUTE ON FUNCTION increment_post_views(uuid) TO authenticated;
