import { CommunityPost, Conversation, PetSitter } from "../types";

export const petSitters: PetSitter[] = [
  {
    id: "1",
    name: "Zeynep Arslan",
    city: "Istanbul",
    rating: 4.9,
    price: "Saatlik 350 TL",
    tags: ["Kedi", "Kopek", "Ilac takibi"]
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
    badge: "Ucretsiz"
  },
  {
    id: "2",
    author: "Can Dostlar",
    category: "Sahiplendirme",
    title: "3 aylik oyuncu terrier sicak bir yuva ariyor",
    description: "Asilari yapildi. Cocuklarla ve diger kopeklerle cok iyi anlasiyor.",
    badge: "Oncelikli"
  },
  {
    id: "3",
    author: "Gulce",
    category: "Topluluk",
    title: "Hafta sonu sahil yuruyus grubu olusturuyoruz",
    description: "Bakicilar ve hayvan sahipleriyle tanisma etkinligi planliyoruz.",
    badge: "Etkinlik"
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
