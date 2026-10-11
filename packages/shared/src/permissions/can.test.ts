import { can, validateRoleChange, UserContext, ResourceContext } from './can';

describe('Authorization Engine — can() Policy Function', () => {
  const adminUser: UserContext = { id: 'usr_admin_1', role: 'ADMIN', isActive: true };
  const editorUser: UserContext = { id: 'usr_editor_1', role: 'EDITOR', isActive: true };
  const photographerUser: UserContext = { id: 'usr_photo_1', role: 'PHOTOGRAPHER', isActive: true };
  const inactiveAdmin: UserContext = { id: 'usr_admin_inact', role: 'ADMIN', isActive: false };

  test('Inactive users have no access across all operations', () => {
    expect(can(inactiveAdmin, 'project:create')).toBe(false);
    expect(can(inactiveAdmin, 'user:manage')).toBe(false);
    expect(can(null, 'inquiry:read')).toBe(false);
  });

  describe('ADMIN Role', () => {
    test('Admin has access to users and system settings', () => {
      expect(can(adminUser, 'user:manage')).toBe(true);
      expect(can(adminUser, 'settings:update')).toBe(true);
    });

    test('Admin can publish and manage all projects and inquiries', () => {
      expect(can(adminUser, 'project:create')).toBe(true);
      expect(can(adminUser, 'project:publish')).toBe(true);
      expect(can(adminUser, 'inquiry:update')).toBe(true);
    });

    test('Admin cannot delete media if actively referenced', () => {
      expect(can(adminUser, 'media:delete', { isUsed: true })).toBe(false);
      expect(can(adminUser, 'media:delete', { isUsed: false })).toBe(true);
    });
  });

  describe('EDITOR Role', () => {
    test('Editor cannot manage users or settings', () => {
      expect(can(editorUser, 'user:manage')).toBe(false);
      expect(can(editorUser, 'settings:update')).toBe(false);
    });

    test('Editor can create, edit, and publish projects and stories', () => {
      expect(can(editorUser, 'project:create')).toBe(true);
      expect(can(editorUser, 'project:update')).toBe(true);
      expect(can(editorUser, 'project:publish')).toBe(true);
      expect(can(editorUser, 'story:publish')).toBe(true);
    });

    test('Editor can manage inquiries and bookings', () => {
      expect(can(editorUser, 'inquiry:read')).toBe(true);
      expect(can(editorUser, 'inquiry:update')).toBe(true);
      expect(can(editorUser, 'booking:read')).toBe(true);
      expect(can(editorUser, 'booking:update')).toBe(true);
    });

    test('Editor can delete media only when unused', () => {
      expect(can(editorUser, 'media:delete', { isUsed: true })).toBe(false);
      expect(can(editorUser, 'media:delete', { isUsed: false })).toBe(true);
    });
  });

  describe('PHOTOGRAPHER Role', () => {
    test('Photographer cannot access users, settings, or inquiries', () => {
      expect(can(photographerUser, 'user:manage')).toBe(false);
      expect(can(photographerUser, 'settings:update')).toBe(false);
      expect(can(photographerUser, 'inquiry:read')).toBe(false);
      expect(can(photographerUser, 'inquiry:update')).toBe(false);
    });

    test('Photographer can only edit assigned projects not in PUBLISHED status', () => {
      const assignedDraft: ResourceContext = {
        assignedToIds: [photographerUser.id],
        status: 'DRAFT',
      };
      const assignedPublished: ResourceContext = {
        assignedToIds: [photographerUser.id],
        status: 'PUBLISHED',
      };
      const unassignedDraft: ResourceContext = {
        assignedToIds: ['other_user'],
        status: 'DRAFT',
      };

      expect(can(photographerUser, 'project:update', assignedDraft)).toBe(true);
      expect(can(photographerUser, 'project:update', assignedPublished)).toBe(false);
      expect(can(photographerUser, 'project:update', unassignedDraft)).toBe(false);
    });

    test('Photographer cannot directly publish projects', () => {
      const assignedDraft: ResourceContext = {
        assignedToIds: [photographerUser.id],
        status: 'DRAFT',
      };
      expect(can(photographerUser, 'project:publish', assignedDraft)).toBe(false);
    });

    test('Photographer can only view assigned bookings', () => {
      const assignedBooking: ResourceContext = {
        assignedToIds: [photographerUser.id],
      };
      const unassignedBooking: ResourceContext = {
        assignedToIds: ['other_user'],
      };
      expect(can(photographerUser, 'booking:read', assignedBooking)).toBe(true);
      expect(can(photographerUser, 'booking:read', unassignedBooking)).toBe(false);
    });

    test('Photographer cannot delete media under any condition', () => {
      expect(can(photographerUser, 'media:delete', { isUsed: false })).toBe(false);
    });
  });

  describe('Clearance Role Alteration & Demotion Guard', () => {
    test('Non-admins cannot alter roles', () => {
      const result = validateRoleChange(editorUser, 'usr_editor_2', 'ADMIN', 2);
      expect(result.allowed).toBe(false);
    });

    test('Sole active administrator cannot be demoted', () => {
      const result = validateRoleChange(adminUser, adminUser.id, 'EDITOR', 1);
      expect(result.allowed).toBe(false);
      expect(result.error).toMatch(/sole active administrator/i);
    });

    test('Administrator can be demoted if other active administrators exist', () => {
      const result = validateRoleChange(adminUser, adminUser.id, 'EDITOR', 2);
      expect(result.allowed).toBe(true);
    });
  });
});
