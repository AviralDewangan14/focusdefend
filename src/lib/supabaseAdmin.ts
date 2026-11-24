/**
 * FocusDefend Secure Admin Portal API Client
 * Connects directly to Supabase Auth & PostgREST RPCs with strict role validation.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zhppslsdwxshgwkrixlq.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_AiWJYKWmYp7BSOwmlal03Q_JYYWtZEa';

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: "student" | "parent" | "admin";
  grade?: string;
  inviteCode?: string;
  joinedAt: string;
  studyHours: number;
  restrictionsCount: number;
}

export interface AdminAnalyticsData {
  totalUsers: number;
  studentCount: number;
  parentCount: number;
  adminCount: number;
  totalStudyHours: number;
  totalRestrictions: number;
  totalSessions: number;
}

export interface AdminSession {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin";
  };
}

/**
 * Authenticates an administrator via Supabase Auth and verifies their administrative role in the database.
 */
export async function authenticateAdmin(email: string, password: string): Promise<AdminSession> {
  const cleanEmail = email.trim();
  if (!cleanEmail || !password) {
    throw new Error("Email and password are required.");
  }

  // 1. Supabase Auth Password Grant
  const authRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: cleanEmail, password }),
  });

  const authData = await authRes.json();
  if (!authRes.ok) {
    throw new Error(authData.error_description || authData.msg || "Invalid email or password.");
  }

  const token = authData.access_token;
  const authUser = authData.user;

  if (!token || !authUser) {
    throw new Error("Authentication failed: No session token received.");
  }

  // 2. Verify admin role on profiles table
  const profileRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${authUser.id}&select=id,name,role,email`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!profileRes.ok) {
    throw new Error("Failed to verify user profile.");
  }

  const profileRows = await profileRes.json();
  if (!Array.isArray(profileRows) || profileRows.length === 0) {
    throw new Error("Profile not found for this account.");
  }

  const profile = profileRows[0];
  if (profile.role !== 'admin') {
    throw new Error("Access Denied: Only accounts with the administrator role can access this portal.");
  }

  return {
    token,
    user: {
      id: profile.id,
      email: profile.email || authUser.email,
      name: profile.name || "Administrator",
      role: "admin",
    },
  };
}

/**
 * Fetches all user profiles from Supabase using an authenticated admin token.
 */
export async function fetchAdminUsers(token: string): Promise<AdminUserRecord[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,name,email,role,invite_code,created_at&order=created_at.desc`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user directory: ${res.statusText}`);
  }

  const rows = await res.json();
  if (!Array.isArray(rows)) return [];

  return rows.map((r: any) => ({
    id: r.id,
    name: r.name || "User",
    email: r.email || `${r.id.substring(0, 8)}@focusdefend.app`,
    role: r.role || "student",
    inviteCode: r.invite_code || undefined,
    joinedAt: r.created_at ? r.created_at.split('T')[0] : "2026-11-01",
    studyHours: 0,
    restrictionsCount: 0,
  }));
}

/**
 * Fetches live aggregated analytics from the admin RPC.
 */
export async function fetchAdminAnalytics(token: string): Promise<AdminAnalyticsData | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_get_system_analytics`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        totalUsers: Number(data.total_users || 0),
        studentCount: Number(data.total_students || 0),
        parentCount: Number(data.total_parents || 0),
        adminCount: Number(data.total_admins || 0),
        totalStudyHours: Math.round(Number(data.total_study_minutes || 0) / 60),
        totalRestrictions: Number(data.total_restrictions || 0),
        totalSessions: Number(data.total_study_sessions || 0),
      };
    }
  } catch (_) {}
  return null;
}

/**
 * Executes server-side user deletion via the admin RPC.
 */
export async function deleteUserByAdmin(token: string, userId: string): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_delete_user`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_user_id: userId }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    return { success: false, error: errData.message || res.statusText };
  }

  const result = await res.json();
  return { success: result.success === true, error: result.error };
}
