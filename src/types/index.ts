export type TabId = "home" | "community" | "create" | "messages" | "profile";

export type PetSitter = {
  id: string;
  name: string;
  city: string;
  rating: number;
  price: string;
  tags: string[];
};

export type CommunityPost = {
  id: string;
  author: string;
  category: string;
  title: string;
  description: string;
  badge: string;
};

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
};
