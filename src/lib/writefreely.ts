const DEFAULT_WRITEFREELY_FEED_URL =
  'https://localpiserver.tail1ff89c.ts.net/feed'

export interface WriteFreelyPost {
  title: string
  link: string
  description: string
  pubDate: string
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function stripHtml(value: string) {
  return decodeXml(value).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function getTagValue(block: string, tagName: string) {
  const match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`))
  return match ? stripHtml(match[1]) : ''
}

function parseFeed(xml: string) {
  const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || []

  return itemMatches
    .map((item) => ({
      title: getTagValue(item, 'title'),
      link: getTagValue(item, 'link'),
      description: getTagValue(item, 'description'),
      pubDate: getTagValue(item, 'pubDate'),
    }))
    .filter((item) => item.title && item.link)
}

export function formatWriteFreelyDate(dateString: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

export async function getWriteFreelyPosts(limit?: number) {
  const feedUrl =
    process.env.WRITEFREELY_FEED_URL || DEFAULT_WRITEFREELY_FEED_URL

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 900 },
    })

    if (!response.ok) {
      return []
    }

    const xml = await response.text()
    const posts = parseFeed(xml)

    return typeof limit === 'number' ? posts.slice(0, limit) : posts
  } catch {
    return []
  }
}
