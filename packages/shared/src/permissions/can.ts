export type Role = 'ADMIN' | 'EDITOR' | 'PHOTOGRAPHER';

export type Action =
  | 'project:create'
  | 'project:update'
  | 'project:publish'
  | 'story:publish'
  | 'inquiry:read'
  | 'inquiry:update'
  | 'booking:read'
  | 'booking:update'
  | 'media:upload'
  | 'media:delete'
  | 'user:manage'
  | 'settings:update'
  | 'analytics:read';

export interface ResourceContext {
  assignedToIds?: string[];
  status?: string;
  isUsed?: boolean;
}

export interface UserContext {
  id: string;
  role: Role;
  isActive?: boolean;
}

/**
 * Evaluates whether a given user can perform an action on a target resource.
 * Enforcement is duplicated on the server; client invocation is purely cosmetic.
 */
export function can(
  user: UserContext | null | undefined,
  action: Action,
  res?: ResourceContext
): boolean {
  if (!user || user.isActive === false) return false;
  if (user.role === 'ADMIN') {
    if (action === 'media:delete' && res?.isUsed) {
      return false;
    }
    return true;
  }

  const assigned = Boolean(res?.assignedToIds?.includes(user.id));

  switch (action) {
    case 'user:manage':
    case 'settings:update':
      return false;

    case 'project:create':
      return true;

    case 'project:publish':
    case 'story:publish':
      return user.role === 'EDITOR';

    case 'project:update':
      return user.role === 'EDITOR' || (assigned && res?.status !== 'PUBLISHED');

    case 'inquiry:read':
    case 'inquiry:update':
      return user.role === 'EDITOR';

    case 'booking:read':
    case 'booking:update':
      return user.role === 'EDITOR' || assigned;

    case 'media:upload':
      return true;

    case 'media:delete':
      return user.role === 'EDITOR' && !res?.isUsed;

    case 'analytics:read':
      return user.role === 'EDITOR';

    default:
      return false;
  }
}

/**
 * Validates clearance mutation requests.
 * Prevents privilege escalation and blocking the atelier by demoting the last active administrator.
 */
export function validateRoleChange(
  actor: UserContext,
  targetUserId: string,
  targetNewRole: Role,
  activeAdminCount: number
): { allowed: boolean; error?: string } {
  if (actor.role !== 'ADMIN') {
    return { allowed: false, error: 'Only administrators may alter clearance roles.' };
  }

  if (actor.id === targetUserId && targetNewRole !== 'ADMIN') {
    if (activeAdminCount <= 1) {
      return {
        allowed: false,
        error: 'Cannot demote the sole active administrator of the atelier.',
      };
    }
  }

  return { allowed: true };
}
