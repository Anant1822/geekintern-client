import { useNavigate } from 'react-router-dom'
import { useInternshipStore } from '@/store/internship.store'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  count?: number
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Web Development', slug: 'web-dev', icon: '🌐', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '2', name: 'App Development', slug: 'app-dev', icon: '📱', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '3', name: 'VLSI Design', slug: 'vlsi', icon: '⚡', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '4', name: 'Embedded Systems', slug: 'embedded', icon: '🤖', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '5', name: 'Data Science', slug: 'data-science', icon: '📊', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '6', name: 'AI / ML', slug: 'ai-ml', icon: '🧠', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '7', name: 'IoT', slug: 'iot', icon: '📡', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
  { id: '8', name: 'UI/UX Design', slug: 'design', icon: '🎨', color: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524]', count: 0 },
]

interface CategoryGridProps {
  categories?: Category[]
  className?: string
}

export function CategoryGrid({ categories = DEFAULT_CATEGORIES, className }: CategoryGridProps) {
  const navigate = useNavigate()
  const { setFilters } = useInternshipStore()

  const handleCategoryClick = (category: Category) => {
    setFilters({ category_id: category.id })
    navigate('/browse')
  }

  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={cn(
            'group flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-200',
            'hover:shadow-sm hover:-translate-y-0.5 hover:border-[#181615]/40 dark:hover:border-[#E2DDD2]/40',
            category.color
          )}
        >
          <span className="text-3xl" role="img" aria-label={category.name}>
            {category.icon}
          </span>
          <div>
            <p className="font-semibold text-sm text-[#1A1715] dark:text-[#FAF7F2] group-hover:text-[#8C4325] transition-colors">
              {category.name}
            </p>
            {category.count !== undefined && (
              <p className="text-xs text-[#57534E] dark:text-[#A8A29E] mt-0.5">
                {category.count > 0 ? `${category.count} open` : 'Coming soon'}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}


export default CategoryGrid
