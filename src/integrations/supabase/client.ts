// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://daeyfzjkwyxtvjvmppcl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZXlmemprd3l4dHZqdm1wcGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNjU3NTAsImV4cCI6MjA2Mzc0MTc1MH0.TczKC7srm3oatG9Mz63BbaHf9EjTq4lPphCBcvHUY2E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);