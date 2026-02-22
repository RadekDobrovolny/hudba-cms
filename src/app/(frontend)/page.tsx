import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    sort: '-publishedAt',
  })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const getAuthorName = (author: unknown): string => {
    if (!author || typeof author !== 'object') return 'Unknown author'

    const candidate = author as { displayName?: null | string }

    if (candidate.displayName && candidate.displayName.trim()) {
      return candidate.displayName.trim()
    }

    return 'Unknown author'
  }

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
        <section className="posts">
          <h2>Posts</h2>
          {posts.length === 0 && <p>No posts yet.</p>}
          {posts.length > 0 && (
            <ul className="postsList">
              {posts.map((post) => (
                <li className="postItem" key={post.id}>
                  <h3>{post.title}</h3>
                  <p>
                    Author: <strong>{getAuthorName(post.author)}</strong>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
