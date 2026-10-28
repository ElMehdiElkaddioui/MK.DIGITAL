import { relationLabel, type Relation } from '../data/projects'

const dot: Record<Relation, string> = {
  client: 'bg-white',
  demo: 'bg-white/60',
  concept: 'border border-white/70 bg-transparent',
}

export function RelationBadge({ relation, className = '' }: { relation: Relation; className?: string }) {
  return (
    <span className={`chip ${className}`}>
      <i aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot[relation]}`} />
      {relationLabel[relation]}
    </span>
  )
}
