import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { MoodsGroupProps } from "@/types/CreateContainer.types"
import type { Mood } from "@/types/dtos"
import {
  Smile,
  Waves,
  Frown,
  Angry,
  ZapOff,
  PartyPopper,
  BatteryLow,
  Meh,
} from "lucide-react"

export const MOOD_ICONS: Record<Mood, React.ElementType> = {
  HAPPY: Smile,
  CALM: Waves,
  SAD: Frown,
  ANGRY: Angry,
  ANXIOUS: ZapOff,
  EXCITED: PartyPopper,
  TIRED: BatteryLow,
  NEUTRAL: Meh,
}
function isMood(value: string): value is Mood {
  return value in MOOD_ICONS
}

export function MoodsGroups({ moods, onChange }: MoodsGroupProps) {
  return (
    <ToggleGroup
      variant="outline"
      value={moods}
      onValueChange={(groupValue) => onChange(groupValue.filter(isMood))}
      multiple
    >
      {Object.entries(MOOD_ICONS).map(([mood, Icon]) => (
        <ToggleGroupItem key={mood} value={mood}>
          <Icon className="h-4 w-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
