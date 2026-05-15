'use server';

import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

interface Project {
  id: string;
  name: string;
  color: string;
}

export async function addProject(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const color = (formData.get('color') as string) || '#3498db';

  if (!name) {
    return;
  }

  await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
    cache: 'no-store',
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = (formData.get('newName') as string)?.trim();

  if (!id || !newName) {
    return;
  }

  const currentRes = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    cache: 'no-store',
  });

  if (!currentRes.ok) {
    return;
  }

  const currentProject = (await currentRes.json()) as Project;

  await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color: currentProject.color }),
    cache: 'no-store',
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  });

  revalidatePath('/dashboard');
}