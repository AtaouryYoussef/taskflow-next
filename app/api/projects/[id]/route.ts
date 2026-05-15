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
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as Database;
}

function writeDB(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const db = readDB();
  const project = db.projects.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ message: 'Projet non trouve' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = (await request.json()) as Partial<Project>;
  const db = readDB();
  const index = db.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Projet non trouve' }, { status: 404 });
  }

  db.projects[index] = {
    ...db.projects[index],
    name: body.name ?? db.projects[index].name,
    color: body.color ?? db.projects[index].color,
  };

  writeDB(db);
  return NextResponse.json(db.projects[index]);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const db = readDB();
  const index = db.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Projet non trouve' }, { status: 404 });
  }

  const [deleted] = db.projects.splice(index, 1);
  writeDB(db);

  return NextResponse.json(deleted);
}