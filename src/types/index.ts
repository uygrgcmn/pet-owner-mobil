export type TabId = "explore" | "create" | "messages" | "profile";

export type ListingCategory = "owner_request" | "caregiver_offer" | "community";

export type CommunityListingType = "food_support" | "adoption" | "general";

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
  openedAt: string;
};

export type OwnerRequestAd = {
  id: string;
  ownerName: string;
  title: string;
  petType: string;
  location: string;
  schedule: string;
  budget: string;
  summary: string;
  imageId: string;
};

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export type PetProfile = {
  id: string;
  name: string;
  info: string;
  tone: string;
  tag: string;
};

export type UserAd = {
  id: string;
  category: ListingCategory;
  communityType: CommunityListingType | "";
  title: string;
  meta: string;
  badge: string;
  description: string;
  imageId: string;
};

export type ProfileUser = {
  name: string;
  bio: string;
  rating: string;
  reviews: string;
  years: string;
};

export type ListingFormValues = {
  category: ListingCategory | "";
  communityType: CommunityListingType | "";
  title: string;
  petType: string;
  serviceType: string;
  location: string;
  availabilityOrSchedule: string;
  priceOrBudget: string;
  description: string;
  imageId: string;
};

export type ListingDraft = {
  id: string;
  category: ListingCategory;
  communityType: CommunityListingType | "";
  title: string;
  petType: string;
  serviceType: string;
  location: string;
  availabilityOrSchedule: string;
  priceOrBudget: string;
  description: string;
  imageId: string;
  badge: string;
  meta: string;
  status: "draft" | "preview";
  updatedAt: string;
};

export type ConversationMessage = {
  id: string;
  text: string;
  sender: "self" | "other";
  time: string;
};

export type AppScreen =
  | "sitter-directory"
  | "sitter-detail"
  | "discovery-map"
  | "sitter-application"
  | "community-post-detail"
  | "conversation-detail"
  | "listing-preview"
  | "drafts"
  | "pet-detail"
  | "ad-detail"
  | "profile-settings";

export type AppRoute =
  | { screen: "sitter-directory" }
  | { screen: "sitter-detail"; sitterId: string }
  | { screen: "discovery-map" }
  | { screen: "sitter-application" }
  | { screen: "community-post-detail"; postId: string }
  | { screen: "conversation-detail"; conversationId: string }
  | { screen: "listing-preview" }
  | { screen: "drafts" }
  | { screen: "pet-detail"; petId: string }
  | { screen: "ad-detail"; adId: string }
  | { screen: "profile-settings" };

export type ScreenActions = {
  navigate: (route: AppRoute) => void;
  switchTab: (tab: TabId) => void;
};
