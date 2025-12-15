export type UserOption = {
  id: string;        // UUID
  username: string;
  email: string;
};

export type CreateAnnouncementRequest = {
  type: 'NEWS' | 'INBOX';
  title: string;
  message: string;
  recipientUserIds: string[];
  visibleUntil: string; // yyyy-mm-dd
};
