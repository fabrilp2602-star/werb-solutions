import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AdminUser } from '@/types/admin';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'users.json');

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    name: 'Pablo García',
    email: 'admin@werbsolutions.com',
    role: 'Master Admin',
    status: 'active',
    lastLogin: 'Ahora mismo',
  },
  {
    id: 'usr_2',
    name: 'John Doe',
    email: 'expediter@werbsolutions.com',
    role: 'DOB Expediter',
    status: 'active',
    lastLogin: 'Ayer, 16:40',
  },
];

function getUsers(): AdminUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_USERS, null, 2), 'utf-8');
      return INITIAL_USERS;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users:', err);
    return INITIAL_USERS;
  }
}

function saveUsers(users: AdminUser[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving users:', err);
  }
}

// GET /api/users
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const users = getUsers();
  return NextResponse.json({ success: true, count: users.length, users });
}

// POST /api/users - Create new administrative user
export async function POST(req: Request) {
  try {
    if (!(await requireAdmin())) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { name, email, role, status = 'active' } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const users = getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const newUser: AdminUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role || 'Field Master Electrician',
      status: status === 'suspended' ? 'suspended' : 'active',
      lastLogin: 'Nunca',
    };

    users.unshift(newUser);
    saveUsers(users);

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users?id=...
export async function DELETE(req: Request) {
  try {
    if (!(await requireAdmin())) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const users = getUsers();
    const filtered = users.filter((u) => u.id !== id);
    saveUsers(filtered);

    return NextResponse.json({ success: true, remainingCount: filtered.length });
  } catch (err) {
    console.error('Error deleting user:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/users - Update user status or role
export async function PATCH(req: Request) {
  try {
    if (!(await requireAdmin())) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { id, status, role } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const users = getUsers();
    let updated = false;

    const newUsers = users.map((u) => {
      if (u.id === id) {
        updated = true;
        return {
          ...u,
          ...(status ? { status } : {}),
          ...(role ? { role } : {}),
        };
      }
      return u;
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    saveUsers(newUsers);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating user:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
