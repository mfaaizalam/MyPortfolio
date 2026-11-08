import {useEffect, useState} from 'react'; import {profile} from '../config/content'
type R = {id:number;name:string;html_url:string;description:string|null;language:string|null;stargazers_count:number}
export default function Repos() {
  const [r, setR] = useState<R[]|null>(null), [err, setErr] = useState(false)
  useEffect(() => { fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=6`).then(x => x.ok ? x.json() : Promise.reject()).then(setR).catch(() => setErr(true)) }, [])
  if (err) return <p className="text-muted">Could not load repositories right now. <a className="underline" href={profile.github}>View them on GitHub</a>.</p>
  if (!r) return <p className="text-muted" role="status">Loading repositories...</p>
  if (!r.length) return <p className="text-muted">No public repositories yet.</p>
  return <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{r.map(x => <li key={x.id}>
    <a href={x.html_url} target="_blank" rel="noopener noreferrer" className="block h-full rounded-card border border-line bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <p className="font-bold">{x.name}</p><p className="mt-1 line-clamp-2 text-sm text-muted">{x.description || 'No description'}</p>
      <p className="mt-3 text-xs font-semibold text-muted">{x.language || 'n/a'} • {x.stargazers_count} stars</p></a></li>)}</ul>
}
