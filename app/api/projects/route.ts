import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface Project {
  id: string;
  name: string;
  color: string;
}

interface Database {
  projects: Project[];
  [key: string]: unknown;
}

function readDB(): Database {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as Database;
  return data;
}

function writeDB(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Project>;
  const db = readDB();

  const newProject: Project = {
    id: String(Date.now()),
    name: body.name || 'Nouveau projet',
    color: body.color || '#3498db',
  };

  db.projects.push(newProject);
  writeDB(db);

  return NextResponse.json(newProject, { status: 201 });
}