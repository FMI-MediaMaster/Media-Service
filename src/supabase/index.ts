import { createClient } from '@supabase/supabase-js';
import config from '@media-master/load-dotenv';

export default createClient(
    config.SUPABASE_URL,
    config.SUPABASE_ANON_KEY
);

