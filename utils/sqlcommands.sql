-- Create scores table for the game
CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  names VARCHAR(15) NOT NULL,
  scores BIGINT NOT NULL,
  time BIGINT NOT NULL,
  tentativas INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS scores_scores_idx ON scores(scores);
CREATE INDEX IF NOT EXISTS scores_time_idx ON scores(time);
CREATE INDEX IF NOT EXISTS scores_created_at_idx ON scores(created_at);

-- Create Row Level Security (RLS) policies
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to view scores (but not modify)
CREATE POLICY "Anyone can view scores" 
  ON scores FOR SELECT 
  USING (true);

-- Policy for score insertion (anyone can add their score)
CREATE POLICY "Anyone can insert their own score" 
  ON scores FOR INSERT 
  WITH CHECK (true);

-- Prevent users from updating or deleting scores
CREATE POLICY "No one can update scores" 
  ON scores FOR UPDATE 
  USING (false);

CREATE POLICY "No one can delete scores" 
  ON scores FOR DELETE 
  USING (false);

-- Add a comment to the table
COMMENT ON TABLE scores IS 'Stores game scores for number guessing game';

-- Function to clean up old scores (optional, keeps only top 1000)
CREATE OR REPLACE FUNCTION cleanup_old_scores()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM scores
  WHERE id IN (
    SELECT id FROM scores
    ORDER BY scores ASC
    OFFSET 1000
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run cleanup after insert
CREATE TRIGGER cleanup_scores_trigger
AFTER INSERT ON scores
EXECUTE PROCEDURE cleanup_old_scores();