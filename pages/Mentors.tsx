import React, { useState, useMemo } from 'react';
import { MENTORS, FILTERS } from '../constants';
import { Mentor } from '../types';
import { CheckCircle2, MapPin, GraduationCap, Building, Star, Search, ArrowRight, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  
  // Helper to determine tag color
  const getTagColor = (tag: string) => {
    const lower = tag.toLowerCase();
    if (lower.includes('banking') || lower.includes('equity')) return 'bg-blue-700 text-white';
    if (lower.includes('consulting') || lower.includes('strategy')) return 'bg-green-600 text-white';
    if (lower.includes('quant') || lower.includes('trading') || lower.includes('venture')) return 'bg-orange-500 text-white'; 
    if (lower.includes('venture')) return 'bg-yellow-400 text-black';
    if (lower.includes('restructuring')) return 'bg-orange-500 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  // Override specific tags based on screenshot visual cues
  const getCustomTagStyle = (tag: string) => {
      const t = tag.toUpperCase();
      if (t === 'INVESTMENT BANKING') return 'bg-blue-700 text-white border-blue-700';
      if (t === 'MANAGEMENT CONSULTING') return 'bg-green-600 text-white border-green-600';
      if (t === 'PRIVATE EQUITY') return 'bg-yellow-400 text-black border-yellow-400';
      if (t === 'QUANT / TRADING') return 'bg-orange-500 text-white border-orange-500';
      if (t === 'VENTURE CAPITAL') return 'bg-yellow-400 text-black border-yellow-400';
      if (t === 'RESTRUCTURING') return 'bg-orange-500 text-white border-orange-500';
      if (t === 'REAL ESTATE / REPE') return 'bg-yellow-400 text-black border-yellow-400';
      
      return 'bg-gray-100 text-gray-600 border-transparent';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <img src={mentor.imageUrl} alt={mentor.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                {mentor.verified && <CheckCircle2 className="h-4 w-4 text-blue-500 fill-current" stroke="white" />}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3 w-3 text-black fill-black" />
                <span className="font-medium text-black">{mentor.rating}</span>
                <span>({mentor.reviews})</span>
              </div>
            </div>
          </div>
          <div className="font-bold text-lg">${mentor.price.toFixed(2)}</div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">{mentor.role}</p>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Building className="h-4 w-4 text-gray-400" />
            <span>{mentor.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <GraduationCap className="h-4 w-4 text-gray-400" />
            <span>{mentor.school}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{mentor.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {mentor.tags.map((tag, idx) => (
            <span 
                key={idx} 
                className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border ${getCustomTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Skills Section */}
        {mentor.skills && mentor.skills.length > 0 && (
          <div className="mb-4">
             <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                <Sparkles className="h-3 w-3" /> Can help with:
             </div>
             <div className="text-xs text-gray-700 leading-relaxed">
                {mentor.skills.join(' • ')}
             </div>
          </div>
        )}

        <p className="text-gray-500 text-sm leading-snug line-clamp-3">
          {mentor.description}
        </p>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          Connect <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Mentors: React.FC = () => {
  // Use a map of category -> Set of options for correct AND/OR logic
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({});
  // Intentionally initializing empty so all categories start collapsed (rolled up)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  // Main filters toggle state, defaulted to false so it's "rolled up" at first
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  // Search terms for each filter category
  const [filterSearchTerms, setFilterSearchTerms] = useState<Record<string, string>>({});

  const toggleFilter = (category: string, option: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = new Set();
      }
      
      const newCategorySet = new Set(newFilters[category]);
      if (newCategorySet.has(option)) {
        newCategorySet.delete(option);
      } else {
        newCategorySet.add(option);
      }
      
      if (newCategorySet.size === 0) {
        delete newFilters[category];
      } else {
        newFilters[category] = newCategorySet;
      }
      
      return newFilters;
    });
  };

  const toggleCategory = (title: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedCategories(newExpanded);
  }

  const handleFilterSearchChange = (categoryTitle: string, value: string) => {
    setFilterSearchTerms(prev => ({ ...prev, [categoryTitle]: value }));
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setFilterSearchTerms({});
  };

  const activeFilterCount = (Object.values(activeFilters) as Set<string>[]).reduce((acc, set) => acc + set.size, 0);

  // Filter Logic:
  const filteredMentors = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return MENTORS;

    return MENTORS.filter(mentor => {
      return Object.entries(activeFilters).every(([category, selectedOptions]) => {
        const options = selectedOptions as Set<string>;
        if (options.size === 0) return true;

        // Map filter categories to mentor properties
        switch (category) {
          case 'ROLE':
            return Array.from(options).some((opt: string) => 
               mentor.role.includes(opt) || mentor.tags.includes(opt)
            );
          case 'CITY':
            return Array.from(options).some((opt: string) => mentor.location === opt);
          case 'COMPANY':
            return Array.from(options).some((opt: string) => mentor.company === opt);
          case 'SCHOOL':
            return Array.from(options).some((opt: string) => mentor.school.includes(opt));
          case 'IDENTITY':
            return Array.from(options).some((opt: string) => mentor.tags.includes(opt));
          case 'SKILLS':
            return Array.from(options).some((opt: string) => mentor.skills?.includes(opt));
          default:
            return true;
        }
      });
    });
  }, [activeFilters]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
           <h2 className="text-2xl font-bold mb-6">Find a Mentor</h2>
           
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
             {/* Main Toggle Header */}
             <div 
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
             >
               <h3 className="font-bold text-gray-900">Filters</h3>
               <div className="flex items-center gap-3">
                 {activeFilterCount > 0 && (
                   <button 
                     onClick={(e) => {
                         e.stopPropagation();
                         clearAllFilters();
                     }}
                     className="text-xs font-medium text-orange-500 hover:text-orange-600"
                   >
                     Clear all
                   </button>
                 )}
                 {isFiltersOpen ? (
                     <ChevronUp className="h-4 w-4 text-gray-400" />
                 ) : (
                     <ChevronDown className="h-4 w-4 text-gray-400" />
                 )}
               </div>
             </div>

             {/* Collapsible List */}
             {isFiltersOpen && (
                 <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="space-y-1 pt-2">
                    {FILTERS.map((category) => (
                        <div key={category.title} className="border-b border-gray-100 last:border-0">
                        <button 
                            className="flex items-center justify-between w-full text-left py-3 group"
                            onClick={() => toggleCategory(category.title)}
                        >
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-900 transition-colors">
                            {category.title}
                            </span>
                            {expandedCategories.has(category.title) ? (
                                <ChevronUp className="h-3 w-3 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-3 w-3 text-gray-400" />
                            )}
                        </button>
                        
                        {expandedCategories.has(category.title) && (
                            <div className="space-y-2 pb-3 pl-1 animate-fadeIn max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            
                            {/* Filter Search Input */}
                            {(['SCHOOL', 'COMPANY', 'CITY', 'ROLE'].includes(category.title)) && (
                                <div className="mb-2 relative sticky top-0 bg-white z-10 pb-1">
                                    <input
                                        type="text"
                                        placeholder={`Search ${category.title.toLowerCase()}...`}
                                        value={filterSearchTerms[category.title] || ''}
                                        onChange={(e) => handleFilterSearchChange(category.title, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-gray-50"
                                    />
                                </div>
                            )}

                            {category.options
                                .filter(option => option.toLowerCase().includes((filterSearchTerms[category.title] || '').toLowerCase()))
                                .map((option) => {
                                const isChecked = activeFilters[category.title]?.has(option) || false;
                                return (
                                    <label key={option} className="flex items-center gap-3 cursor-pointer group py-1">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${isChecked ? 'bg-black border-black' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                                        {isChecked && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="hidden" 
                                        checked={isChecked}
                                        onChange={() => toggleFilter(category.title, option)}
                                        />
                                    <span className={`text-sm leading-tight ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{option}</span>
                                    </label>
                                );
                            })}
                            {category.options.filter(option => option.toLowerCase().includes((filterSearchTerms[category.title] || '').toLowerCase())).length === 0 && (
                                <div className="text-xs text-gray-400 py-1">No options found.</div>
                            )}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                 </div>
             )}
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {filteredMentors.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-200 border-dashed">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900">No mentors found</h3>
                <p className="text-gray-500 max-w-sm">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-6 text-orange-500 font-medium hover:text-orange-600"
                >
                    Clear all filters
                </button>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Mentors;