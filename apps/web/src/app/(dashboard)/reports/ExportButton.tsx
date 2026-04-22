'use client'

import { ResponseData } from '@echobloom/ai'

interface ExportButtonProps {
  data: any[]
  promptMap: Record<string, string>
  filename: string
}

export function ExportButton({ data, promptMap, filename }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    // Define CSV headers
    const headers = ['ID', 'Prompt Name', 'Type', 'Value', 'Comment', 'Date']
    
    // Convert data to CSV rows
    const rows = data.map(r => {
      let type = 'text'
      let value = r.text_value || ''
      if (r.rating_value != null) {
        type = 'rating'
        value = `${r.rating_value}/5`
      } else if (r.emoji_value) {
        type = 'emoji'
        value = r.emoji_value
      }

      return [
        r.id,
        `"${promptMap[r.prompt_id] || 'Unknown'}"`,
        type,
        `"${value}"`,
        `"${(r.text_value || '').replace(/"/g, '""')}"`,
        new Date(r.created_at).toISOString()
      ]
    })

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
    >
      Export Responses to CSV
    </button>
  )
}
