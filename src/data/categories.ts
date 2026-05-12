import { CinemaIcon } from "@/icons/categories/CinemaIcon";
import { ClimateIcon } from "@/icons/categories/ClimateIcon";
import { CurtainsIcon } from "@/icons/categories/CurtainsIcon";
import { LightingIcon } from "@/icons/categories/LightingIcon";
import { MultimediaIcon } from "@/icons/categories/MultimediaIcon";
import { SafetyIcon } from "@/icons/categories/SafetyIcon";
import type { Category } from "@/types/case";

export const categories: Category[] = [
	{ icon: LightingIcon, label: "Освещение" },
	{ icon: ClimateIcon, label: "Климат" },
	{ icon: MultimediaIcon, label: "Мультимедиа" },
	{ icon: SafetyIcon, label: "Безопасность" },
	{ icon: CurtainsIcon, label: "Шторы" },
	{ icon: CinemaIcon, label: "Кинотеатр" },
]