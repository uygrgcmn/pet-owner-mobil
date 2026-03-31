import { useState } from "react";

import { TabId } from "../types";

export function useAppTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return { activeTab, setActiveTab };
}
