// Schema audit script - checks what tables exist in the live Supabase database
const SUPABASE_URL = 'https://qnsnuhtwvcvfpqexqici.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_iGmNvr65attsmYvKq9VJkQ_xGmJpLT5';

async function query(table, params = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${params}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Accept': 'application/json',
      'Prefer': 'count=exact'
    }
  });
  const count = res.headers.get('content-range');
  const data = await res.json();
  return { status: res.status, count, data: Array.isArray(data) ? data.slice(0, 3) : data };
}

async function checkTable(name) {
  try {
    const result = await query(name, 'select=*&limit=0');
    console.log(`✅ ${name}: status=${result.status}, range=${result.count}`);
    return true;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
    return false;
  }
}

async function getColumns(table) {
  // Try selecting all to see what columns come back
  const result = await query(table, 'select=*&limit=1');
  if (result.status === 200 && Array.isArray(result.data) && result.data.length > 0) {
    console.log(`  Columns for ${table}:`, Object.keys(result.data[0]).join(', '));
  } else if (result.status === 200) {
    console.log(`  ${table}: empty (no rows to infer columns)`);
  } else {
    console.log(`  ${table}: error - ${JSON.stringify(result.data)}`);
  }
}

async function main() {
  console.log('=== EchoBloom Schema Audit ===\n');
  
  const requiredTables = [
    'profiles', 'workspaces', 'memberships', 'prompts', 
    'responses', 'insights', 'reports', 'notifications'
  ];
  
  console.log('--- Table Existence Check ---');
  const results = {};
  for (const t of requiredTables) {
    results[t] = await checkTable(t);
  }
  
  console.log('\n--- Column Check (for existing tables) ---');
  for (const t of requiredTables) {
    if (results[t]) {
      await getColumns(t);
    }
  }
  
  console.log('\n--- Summary ---');
  const missing = requiredTables.filter(t => !results[t]);
  const present = requiredTables.filter(t => results[t]);
  console.log('Present:', present.join(', '));
  console.log('Missing:', missing.length > 0 ? missing.join(', ') : 'NONE');
}

main().catch(console.error);
