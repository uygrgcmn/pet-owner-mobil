import { ReactNode, createContext, useContext, useMemo, useState } from "react";

import {
  communityPosts,
  communityQuote,
  conversations as seedConversations,
  initialConversationMessages,
  initialDraftListings,
  initialListingForm,
  listingTips,
  ownerRequestAds,
  petSitters,
  profilePets,
  profileUser,
  userAds
} from "../data/mockData";
import { Conversation, ConversationMessage, ListingDraft, ListingFormValues, PetSitter } from "../types";
import { buildListingMeta, getListingBadge } from "../utils/listing";

type MockAppContextValue = {
  communityPosts: typeof communityPosts;
  communityQuote: typeof communityQuote;
  conversations: Conversation[];
  conversationMessages: Record<string, ConversationMessage[]>;
  listingDrafts: ListingDraft[];
  listingForm: ListingFormValues;
  listingPreview: ListingDraft | null;
  listingTips: string[];
  ownerRequestAds: typeof ownerRequestAds;
  petSitters: typeof petSitters;
  profilePets: typeof profilePets;
  profileUser: typeof profileUser;
  userAds: typeof userAds;
  updateListingField: (field: keyof ListingFormValues, value: string) => void;
  prepareListingPreview: () => ListingDraft;
  saveDraft: () => ListingDraft;
  clearListingForm: () => void;
  ensureConversationForSitter: (sitterId: string) => string;
  openConversation: (conversationId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
};

const MockAppContext = createContext<MockAppContextValue | null>(null);

function createListingDraft(form: ListingFormValues, status: ListingDraft["status"], id?: string): ListingDraft {
  const category = form.category || "owner_request";
  const communityType = category === "community" ? form.communityType || "general" : "";

  return {
    id: id ?? `draft-${Date.now()}`,
    category,
    communityType,
    title: form.title.trim() || "Baslik eklenmemis ilan",
    petType: form.petType.trim(),
    serviceType: form.serviceType.trim(),
    location: form.location.trim(),
    availabilityOrSchedule: form.availabilityOrSchedule.trim(),
    priceOrBudget: form.priceOrBudget.trim(),
    description: form.description.trim() || "Aciklama eklenmedi.",
    imageId: form.imageId || "1",
    badge: getListingBadge(category, communityType),
    meta: buildListingMeta({
      category,
      communityType,
      petType: form.petType.trim(),
      serviceType: form.serviceType.trim(),
      location: form.location.trim(),
      availabilityOrSchedule: form.availabilityOrSchedule.trim(),
      priceOrBudget: form.priceOrBudget.trim()
    }),
    status,
    updatedAt: "Bugun"
  };
}

export function MockAppProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState(seedConversations);
  const [conversationMessages, setConversationMessages] = useState(initialConversationMessages);
  const [listingForm, setListingForm] = useState(initialListingForm);
  const [listingPreview, setListingPreview] = useState<ListingDraft | null>(null);
  const [listingDrafts, setListingDrafts] = useState(initialDraftListings);

  function updateListingField(field: keyof ListingFormValues, value: string) {
    setListingForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "category" && value !== "community" ? { communityType: "" } : {})
    }));
  }

  function prepareListingPreview() {
    const preview = createListingDraft(listingForm, "preview", "preview-current");
    setListingPreview(preview);

    return preview;
  }

  function saveDraft() {
    const draft = createListingDraft(listingForm, "draft");
    setListingDrafts((current) => [draft, ...current]);

    return draft;
  }

  function clearListingForm() {
    setListingForm(initialListingForm);
  }

  function ensureConversationForSitter(sitterId: string) {
    const existing = conversations.find((conversation) => conversation.id === sitterId);

    if (existing) {
      return existing.id;
    }

    const sitter = petSitters.find((item) => item.id === sitterId);
    const newConversationId = sitterId;
    const newConversation: Conversation = {
      id: newConversationId,
      name: sitter?.name ?? "Yeni konusma",
      lastMessage: "Merhaba, detaylari burada konusabiliriz.",
      time: "Simdi",
      unread: 0
    };

    setConversations((current) => [newConversation, ...current]);
    setConversationMessages((current) => ({
      ...current,
      [newConversationId]: [
        {
          id: `m-${Date.now()}`,
          text: "Merhaba, detaylari burada konusabiliriz.",
          sender: "other",
          time: "Simdi"
        }
      ]
    }));

    return newConversationId;
  }

  function openConversation(conversationId: string) {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              unread: 0
            }
          : conversation
      )
    );
  }

  function sendMessage(conversationId: string, text: string) {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const newMessage: ConversationMessage = {
      id: `m-${Date.now()}`,
      text: trimmedText,
      sender: "self",
      time: "Simdi"
    };

    setConversationMessages((current) => ({
      ...current,
      [conversationId]: [...(current[conversationId] ?? []), newMessage]
    }));

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              lastMessage: trimmedText,
              time: "Simdi",
              unread: 0
            }
          : conversation
      )
    );
  }

  const value = useMemo(
    () => ({
      communityPosts,
      communityQuote,
      conversations,
      conversationMessages,
      listingDrafts,
      listingForm,
      listingPreview,
      listingTips,
      ownerRequestAds,
      petSitters,
      profilePets,
      profileUser,
      userAds,
      updateListingField,
      prepareListingPreview,
      saveDraft,
      clearListingForm,
      ensureConversationForSitter,
      openConversation,
      sendMessage
    }),
    [conversationMessages, conversations, listingDrafts, listingForm, listingPreview]
  );

  return <MockAppContext.Provider value={value}>{children}</MockAppContext.Provider>;
}

export function useMockApp() {
  const context = useContext(MockAppContext);

  if (!context) {
    throw new Error("useMockApp must be used within MockAppProvider");
  }

  return context;
}
