import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

interface Project {
  id: string;
  name: string;
  color: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export default async function DashboardPage() {
  const res = await fetch(`${API_BASE_URL}/api/projects`, {
    cache: 'no-store',
  });
  const projects: Project[] = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      <p>{projects.length} projets</p>
      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
              }}
            />
            <a href={`/projects/${p.id}`}>{p.name}</a>

            <form action={renameProject} style={{ display: 'inline-flex', gap: 6, marginLeft: 8 }}>
              <input type="hidden" name="id" value={p.id} />
              <input
                name="newName"
                defaultValue={p.name}
                required
                style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <button
                type="submit"
                style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer' }}
              >
                Renommer
              </button>
            </form>

            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label={`Supprimer ${p.name}`}
              >
                X
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
