import {
  CommunityPost,
  Conversation,
  ConversationMessage,
  ListingDraft,
  ListingFormValues,
  OwnerRequestAd,
  PetProfile,
  PetSitter,
  ProfileUser,
  UserAd
} from "../types";

export const petSitters: PetSitter[] = [
  {
    id: "1",
    name: "Zeynep Arslan",
    city: "Istanbul",
    rating: 4.9,
    price: "Saatlik 350 TL",
    tags: ["Kedi", "Kopek", "Ilac takibi"],
  },
  {
    id: "2",
    name: "Mert Demir",
    city: "Kadikoy",
    rating: 4.8,
    price: "Gunluk 900 TL",
    tags: ["Uzun yuruyus", "Ev ziyareti"]
  },
  {
    id: "3",
    name: "Elif Kose",
    city: "Besiktas",
    rating: 5.0,
    price: "Gecelik 1.200 TL",
    tags: ["Yavru bakimi", "Veteriner yakin"]
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "PatiDestek",
    category: "Mama Ilani",
    title: "Acil 12 kg kedi mamasini ucretsiz veriyorum",
    description: "Kullanmadigimiz kapali paket mamayi ihtiyaci olan bir aileye ulastirmak istiyoruz.",
    badge: "Ucretsiz",
    openedAt: "2026-03-31T19:20:00.000Z"
  },
  {
    id: "2",
    author: "Can Dostlar",
    category: "Sahiplendirme",
    title: "3 aylik oyuncu terrier sicak bir yuva ariyor",
    description: "Asilari yapildi. Cocuklarla ve diger kopeklerle cok iyi anlasiyor.",
    badge: "Oncelikli",
    openedAt: "2026-04-01T08:45:00.000Z"
  },
  {
    id: "3",
    author: "Gulce",
    category: "Topluluk",
    title: "Hafta sonu sahil yuruyus grubu olusturuyoruz",
    description: "Bakicilar ve hayvan sahipleriyle tanisma etkinligi planliyoruz.",
    badge: "Etkinlik",
    openedAt: "2026-04-01T10:30:00.000Z"
  }
];

export const ownerRequestAds: OwnerRequestAd[] = [
  {
    id: "1",
    ownerName: "Selin K.",
    title: "Kadikoy icin hafta sonu kopek bakicisi ariyorum",
    petType: "Golden Retriever",
    location: "Kadikoy",
    schedule: "Cumartesi - Pazar",
    budget: "Gunluk 1.000 TL",
    summary: "Evde bakim, uzun yuruyus ve gun icinde iki kez foto guncellemesi bekliyorum.",
    imageId: "1"
  },
  {
    id: "2",
    ownerName: "Mina T.",
    title: "Besiktas'ta ilac takibini bilen kedi bakicisi gerekiyor",
    petType: "British Shorthair",
    location: "Besiktas",
    schedule: "3 gun / ev ziyareti",
    budget: "Ziyaret basi 450 TL",
    summary: "Sabah ve aksam besleme ile birlikte ilac saatlerinin eksiksiz uygulanmasi onemli.",
    imageId: "2"
  },
  {
    id: "3",
    ownerName: "Ozan A.",
    title: "Yavru kopegim icin gun ici oyun ve bakim destegi",
    petType: "Poodle",
    location: "Moda",
    schedule: "Hafta ici 09.00 - 18.00",
    budget: "Saatlik 320 TL",
    summary: "Enerjik bir yavru, kisa egitim rutini ve gun sonu detayli kisa rapor bekliyorum.",
    imageId: "1"
  }
];

export const conversations: Conversation[] = [
  {
    id: "1",
    name: "Zeynep Arslan",
    lastMessage: "Yarin sabah 09.00 benim icin uygun.",
    time: "09:24",
    unread: 2
  },
  {
    id: "2",
    name: "Mert Demir",
    lastMessage: "Kopeginizin ilac saatlerini not ettim.",
    time: "Dun",
    unread: 0
  },
  {
    id: "3",
    name: "Topluluk Moderasyonu",
    lastMessage: "Sahiplendirme ilani onaya gonderildi.",
    time: "Pzt",
    unread: 1
  }
];

export const quickStats = [
  { id: "1", label: "Aktif bakici", value: "240+" },
  { id: "2", label: "Bugunku ilan", value: "68" },
  { id: "3", label: "Eslesen talep", value: "31" }
];

export const profilePets: PetProfile[] = [
  { id: "1", name: "Cooper", info: "4 yas / Erkek", tone: "#1E2533", tag: "GOLDEN" },
  { id: "2", name: "Luna", info: "2 yas / Disi", tone: "#3D4238", tag: "" }
];

export const userAds: UserAd[] = [
  {
    id: "1",
    category: "caregiver_offer",
    communityType: "",
    title: "Profesyonel kopek gezdirme",
    meta: "Yuruyus / Moda / Saatlik 350 TL",
    badge: "BAKICIYIM",
    description: "Moda ve cevresinde duzenli yuruyus, enerji atma ve kisa egitim destegi sunuyorum.",
    imageId: "1"
  },
  {
    id: "2",
    category: "owner_request",
    communityType: "",
    title: "Hafta sonu icin evde kedi bakicisi ariyorum",
    meta: "Kedi / Besiktas / Cumartesi - Pazar",
    badge: "BAKICI ARIYORUM",
    description: "Iki gun boyunca ilac takibi, kum temizligi ve gun ici iki kez fotograf guncellemesi bekliyorum.",
    imageId: "2"
  },
  {
    id: "3",
    category: "community",
    communityType: "adoption",
    title: "Yavru terrier icin sahiplendirme ilani",
    meta: "Sahiplendirme / Kadikoy / Yeni yuva araniyor",
    badge: "SAHIPLENDIRME",
    description: "Asilari tamam, oyuncu ve sosyal. Uygun aileyle tanistirma sureci planli ilerletilecek.",
    imageId: "1"
  }
];

export const profileUser: ProfileUser = {
  name: "Deren Aydin",
  bio: "Evcil dostlarin gunluk rutinlerini duzenli takip eden, hafta sonlari uzun yuruyusleri seven ve 2018'den beri aktif bakicilik yapan bir hayvan sever.",
  rating: "4.9",
  reviews: "128",
  years: "7"
};

export const listingTips = [
  "Kategoriye uygun net bir baslik secmek, ilanin dogru kisilere ulasmasini hizlandirir.",
  "Konum, takvim ve ucret gibi temel bilgileri ilk bakista gorulecek kadar acik yaz.",
  "Kapak gorseli ve aciklama birlikte guven olusturur; cok genel metinlerden kacinin."
];

export const communityQuote = {
  text: "\"PetOwner uzerinden buldugum bakici sayesinde tatilde bile aklim evde kalmadi.\"",
  author: "Ece ve Maya"
};

export const initialListingForm: ListingFormValues = {
  category: "",
  communityType: "",
  title: "",
  petType: "",
  serviceType: "",
  location: "",
  availabilityOrSchedule: "",
  priceOrBudget: "",
  description: "",
  imageId: "1"
};

export const initialDraftListings: ListingDraft[] = [
  {
    id: "draft-1",
    category: "owner_request",
    communityType: "",
    title: "Hafta sonu icin deneyimli kedi bakicisi ariyorum",
    petType: "Kedi",
    serviceType: "Evde bakim",
    location: "Kadikoy",
    availabilityOrSchedule: "Cumartesi - Pazar",
    priceOrBudget: "Gunluk 900 TL",
    description: "2 gunluk bakim, ilac takibi ve gun ici foto raporu beklentisi.",
    imageId: "1",
    badge: "BAKICI ARIYORUM",
    meta: "Kedi / Kadikoy / Cumartesi - Pazar",
    status: "draft",
    updatedAt: "Bugun"
  },
  {
    id: "draft-2",
    category: "community",
    communityType: "food_support",
    title: "Kapali paket kopek mamasi destegi veriyorum",
    petType: "",
    serviceType: "Teslim",
    location: "Besiktas",
    availabilityOrSchedule: "Aksam teslim edebilirim",
    priceOrBudget: "Ucretsiz",
    description: "Ihtiyaci olan bir aile ya da gecici yuva icin teslim etmeye hazirim.",
    imageId: "2",
    badge: "MAMA DESTEGI",
    meta: "Mama Destegi / Besiktas / Aksam teslim edebilirim",
    status: "draft",
    updatedAt: "Dun"
  }
];

export const initialConversationMessages: Record<string, ConversationMessage[]> = {
  "1": [
    {
      id: "m-1",
      text: "Merhaba, yarin sabah 09.00 benim icin uygun.",
      sender: "other",
      time: "09.24"
    },
    {
      id: "m-2",
      text: "Harika, Cooper'in ilac saatlerini birazdan gonderecegim.",
      sender: "self",
      time: "09.28"
    }
  ],
  "2": [
    {
      id: "m-3",
      text: "Kopeginizin ilac saatlerini not ettim, yarin giriste tekrar teyit ederiz.",
      sender: "other",
      time: "Dun"
    }
  ],
  "3": [
    {
      id: "m-4",
      text: "Sahiplendirme ilaniniz incelemeye alindi, en kisa surede sonuc paylasilacak.",
      sender: "other",
      time: "Pzt"
    }
  ]
};
