import { BrandIcon } from "./BrandIcon";

interface SkillChipProps {
  name: string;
  icon?: string;
  className?: string;
}

export function SkillChip({ name, icon, className = "" }: SkillChipProps) {
  return (
    <div
      className={`px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-200 flex items-center gap-2 hover:border-red-600 transition-colors ${className}`}
    >
      <BrandIcon name={icon || name.toLowerCase()} className="w-4 h-4" />
      <span>{name}</span>
    </div>
  );
}
