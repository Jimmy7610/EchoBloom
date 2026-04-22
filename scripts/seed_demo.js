const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for seeding
)

async function seedDemoData() {
  console.log('🌱 Seeding demo data...')

  // 1. Get a workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .limit(1)
    .single()

  if (!workspace) {
    console.error('❌ No workspace found. Please sign up first.')
    return
  }

  const workspaceId = workspace.id

  // 2. Create demo prompts
  const { data: prompts } = await supabase
    .from('prompts')
    .insert([
      {
        workspace_id: workspaceId,
        title: 'Onboarding Satisfaction',
        question_text: 'How easy was it to get started today?',
        type: 'rating',
        trigger_type: 'after_signup',
        status: 'active'
      },
      {
        workspace_id: workspaceId,
        title: 'Feature Discovery Pulse',
        question_text: 'Did you find the "Reports" feature useful?',
        type: 'emoji',
        trigger_type: 'step_completed',
        status: 'active'
      }
    ])
    .select()

  if (!prompts) return

  const promptId = prompts[0].id

  // 3. Create historical responses (last 7 days)
  const responses = []
  const now = new Date()

  for (let i = 0; i < 40; i++) {
    const dayOffset = Math.floor(Math.random() * 7)
    const date = new Date(now)
    date.setDate(date.getDate() - dayOffset)
    
    // Bias towards positive
    const rand = Math.random()
    let rating = 5
    let text = 'Great experience!'
    if (rand < 0.1) {
      rating = 2
      text = 'A bit confusing to find the settings.'
    } else if (rand < 0.3) {
      rating = 3
      text = 'Okay, but could be faster.'
    }

    responses.push({
      prompt_id: promptId,
      workspace_id: workspaceId,
      session_id: `demo_user_${i}`,
      rating_value: rating,
      text_value: text,
      created_at: date.toISOString()
    })
  }

  const { error } = await supabase.from('responses').insert(responses)

  if (error) {
    console.error('❌ Error seeding responses:', error)
  } else {
    console.log('✅ Successfully seeded 40 responses across the last 7 days.')
  }
}

seedDemoData()
