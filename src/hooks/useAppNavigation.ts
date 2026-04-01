import { useMemo, useState } from "react";

import { AppRoute, TabId } from "../types";

export function useAppNavigation() {
  const [activeTab, setActiveTab] = useState<TabId>("explore");
  const [stack, setStack] = useState<AppRoute[]>([]);

  const currentRoute = useMemo(() => stack[stack.length - 1] ?? null, [stack]);

  function navigate(route: AppRoute) {
    setStack((current) => [...current, route]);
  }

  function goBack() {
    setStack((current) => current.slice(0, -1));
  }

  function switchTab(tab: TabId) {
    setActiveTab(tab);
    setStack([]);
  }

  return {
    activeTab,
    currentRoute,
    navigate,
    goBack,
    switchTab
  };
}
