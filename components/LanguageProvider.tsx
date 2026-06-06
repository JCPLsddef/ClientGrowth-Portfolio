"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, LANG_COOKIE, type Lang } from "@/content/dictionary";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Current language dictionary. */
  t: (typeof dictionary)[Lang];
};

const LangContext = createContext<LangContextValue | null>(null);

// Persist the choice in a year-long cookie so the server can render the right
// language on the next request (no flash of the wrong language on reload).
function persist(lang: Lang) {
  try {
    document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
  } catch {
    // Ignore: the choice still applies for this session via React state.
  }
}

// Holds the active language for the whole site. The initial value is resolved on
// the server (from the cookie or the Accept-Language header) and passed in, so
// SSR and the first client render agree and there is no hydration mismatch.
export default function LanguageProvider({
  initialLang = "en",
  children,
}: {
  initialLang?: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((cur) => {
      const next: Lang = cur === "en" ? "fr" : "en";
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, toggle, t: dictionary[lang] }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
