import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zuyghxrpsxhmkgwbuupo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1eWdoeHJwc3hobWtnd2J1dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTQ1NDEsImV4cCI6MjA4MDU3MDU0MX0.siHy0kqtVwtSNiLyVuW7qF-h1TJHSz4_kqaE2gEYqoM';

export const supabase = createClient(supabaseUrl, supabaseKey);