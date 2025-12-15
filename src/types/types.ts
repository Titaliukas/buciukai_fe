export type UserOption = {
  id: string;        // UUID
  username: string;
  email: string;
};

export type CreateAnnouncementRequest = {
  type: 'NEWS' | 'INBOX';
  title: string;
  message: string;
  visibleUntil: string; // yyyy-mm-dd
  recipients: string[];   // UUID strings
};
