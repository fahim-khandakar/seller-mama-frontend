import { FilterX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoProductsFoundProps {
  onResetFilters: () => void;
}

export default function NoProductsFound({
  onResetFilters,
}: NoProductsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-md mx-auto animate-in fade-in duration-500">
      {/* Icon Box with Sleek Shadow */}
      <div className="h-20 w-20 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 shadow-xl mb-6">
        <FilterX className="w-10 h-10 stroke-[1.5]" />
      </div>

      {/* Main Bold Text */}
      <h3 className="text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white mb-2">
        No Products Found
      </h3>

      {/* Short Subtitle description */}
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
        We couldn&apos;t find any jerseys matching your current combination of
        filters. Try updating your price range or category choice.
      </p>

      {/* Premium Call-to-action Button to Clear Filters */}
      <Button
        onClick={onResetFilters}
        className="h-12 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-600/20 gap-2 px-6 active:scale-95 transition-all"
      >
        <RotateCcw className="w-4 h-4" /> Reset Filters
      </Button>
    </div>
  );
}
