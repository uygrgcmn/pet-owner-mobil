import { CommunityListingType, ListingCategory, ListingFormValues } from "../types";

type ListingLike = Pick<
  ListingFormValues,
  | "category"
  | "communityType"
  | "petType"
  | "serviceType"
  | "location"
  | "availabilityOrSchedule"
  | "priceOrBudget"
>;

export function getListingCategoryLabel(category: ListingCategory) {
  if (category === "owner_request") {
    return "Bakici Ariyorum";
  }

  if (category === "caregiver_offer") {
    return "Bakiciyim";
  }

  return "Topluluk Ilani";
}

export function getCommunityListingTypeLabel(type: CommunityListingType | "") {
  if (type === "food_support") {
    return "Mama Destegi";
  }

  if (type === "adoption") {
    return "Sahiplendirme";
  }

  if (type === "general") {
    return "Diger Topluluk";
  }

  return "Topluluk";
}

export function getListingBadge(category: ListingCategory, communityType: CommunityListingType | "") {
  if (category === "owner_request") {
    return "BAKICI ARIYORUM";
  }

  if (category === "caregiver_offer") {
    return "BAKICIYIM";
  }

  if (communityType === "food_support") {
    return "MAMA DESTEGI";
  }

  if (communityType === "adoption") {
    return "SAHIPLENDIRME";
  }

  return "TOPLULUK";
}

export function buildListingMeta(listing: ListingLike) {
  if (listing.category === "owner_request") {
    const first = listing.petType || "Hayvan";
    const second = listing.location || "Konum";
    const third = listing.availabilityOrSchedule || listing.priceOrBudget || "Takvim";

    return [first, second, third].join(" / ");
  }

  if (listing.category === "caregiver_offer") {
    const first = listing.serviceType || "Hizmet";
    const second = listing.location || "Konum";
    const third = listing.priceOrBudget || "Ucret";

    return [first, second, third].join(" / ");
  }

  const first = getCommunityListingTypeLabel(listing.communityType);
  const second = listing.location || "Konum";
  const third = listing.availabilityOrSchedule || listing.serviceType || "Detay";

  return [first, second, third].join(" / ");
}
