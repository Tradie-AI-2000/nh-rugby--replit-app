-- Simple import script for Google Cloud SQL
-- Import one sample player first to test permissions

INSERT INTO players (id, personal_details, physical_attributes, game_stats, skills, created_at, updated_at) VALUES 
('james-mitchell-test', 
 '{"email":"james.mitchell@northharbour.rugby","phone":"+64 21 123 4567","lastName":"Mitchell","firstName":"James","dateOfBirth":"2001-03-15"}', 
 '[{"date":"2024-01-15","height":188,"weight":103,"bodyFat":9,"leanMass":93.7}]', 
 '[{"tries":4,"season":"2023","tackles":128,"penalties":8,"matchesPlayed":12}]', 
 '{"defense":8,"kicking":6,"passing":7,"ballHandling":8}', 
 NOW(), 
 NOW()
) ON CONFLICT (id) DO UPDATE SET updated_at = EXCLUDED.updated_at;

-- Verify the insert worked
SELECT personal_details->>'firstName' as first_name, personal_details->>'lastName' as last_name FROM players WHERE id = 'james-mitchell-test';