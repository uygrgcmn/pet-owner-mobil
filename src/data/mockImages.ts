import { ImageSourcePropType } from "react-native";

function remote(uri: string): ImageSourcePropType {
  return { uri };
}

export const sitterImages: Record<string, ImageSourcePropType> = {
  "1": remote("https://images.pexels.com/photos/32160900/pexels-photo-32160900.jpeg?auto=compress&cs=tinysrgb&w=1200"),
  "2": remote("https://images.pexels.com/photos/12666104/pexels-photo-12666104.jpeg?auto=compress&cs=tinysrgb&w=1200"),
  "3": remote("https://images.pexels.com/photos/5426974/pexels-photo-5426974.jpeg?auto=compress&cs=tinysrgb&w=1200")
};

export const postImages: Record<string, ImageSourcePropType> = {
  "1": remote("https://images.pexels.com/photos/8473516/pexels-photo-8473516.jpeg?auto=compress&cs=tinysrgb&w=1200"),
  "2": remote("https://images.pexels.com/photos/16465591/pexels-photo-16465591.jpeg?auto=compress&cs=tinysrgb&w=1200"),
  "3": remote("https://images.pexels.com/photos/12265349/pexels-photo-12265349.jpeg?auto=compress&cs=tinysrgb&w=1200")
};

export const petImages: Record<string, ImageSourcePropType> = {
  "1": remote("https://images.pexels.com/photos/16621754/pexels-photo-16621754.jpeg?auto=compress&cs=tinysrgb&w=1200"),
  "2": remote("https://images.pexels.com/photos/24181507/pexels-photo-24181507.jpeg?auto=compress&cs=tinysrgb&w=1200")
};

const defaultPostImage = postImages["1"];
const defaultPetImage = petImages["1"];

export const ownerProfileImage = remote(
  "https://images.pexels.com/photos/4928651/pexels-photo-4928651.jpeg?auto=compress&cs=tinysrgb&w=1200"
);

export function getSitterImage(id: string) {
  return sitterImages[id] ?? ownerProfileImage;
}

export function getPostImage(id: string) {
  return postImages[id] ?? defaultPostImage;
}

export function getPetImage(id: string) {
  return petImages[id] ?? defaultPetImage;
}

export function getConversationImage(id: string) {
  if (id === "3") {
    return defaultPostImage;
  }

  return getSitterImage(id);
}
