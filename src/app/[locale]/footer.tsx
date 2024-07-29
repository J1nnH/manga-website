"use client";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="grid place-items-center p-4 bg-slate-800 text-white text-sm">
      <p>{t("footer")}</p>
      <p>Copyright &copy;{new Date().getFullYear()} Lovat</p>
    </div>
  );
}
