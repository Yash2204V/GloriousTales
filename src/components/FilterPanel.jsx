import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Filter, X, Info } from 'lucide-react';
import { heroTypes, conditions, eras, regions } from '@/data/stories';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const [openSections, setOpenSections] = useState({
    heroType: true,
    era: true,
    region: false,
    gender: false,
    conditions: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const handleConditionChange = (conditionId, checked) => {
    const currentConditions = filters.conditions || [];
    const newConditions = checked
      ? [...currentConditions, conditionId]
      : currentConditions.filter(id => id !== conditionId);
    
    handleFilterChange('conditions', newConditions);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.heroType) count++;
    if (filters.era) count++;
    if (filters.region) count++;
    if (filters.gender) count++;
    if (filters.conditions && filters.conditions.length > 0) count += filters.conditions.length;
    return count;
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Hero Type Filter */}
        <Collapsible open={openSections.heroType} onOpenChange={() => toggleSection('heroType')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <Label className="font-medium">Hero Type</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.heroType ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <RadioGroup
              value={filters.heroType || ''}
              onValueChange={(value) => handleFilterChange('heroType', value || null)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-types" />
                <Label htmlFor="all-types" className="text-sm">All Types</Label>
              </div>
              {heroTypes.map(type => (
                <div key={type.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.id} id={type.id} />
                  <Label htmlFor={type.id} className="text-sm">
                    {type.icon} {type.label}
                  </Label>
                  {type.description && (
                    <div className="group relative">
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                      <div className="absolute left-0 top-5 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10 dark:bg-gray-700">
                        {type.description}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        {/* Era Filter */}
        <Collapsible open={openSections.era} onOpenChange={() => toggleSection('era')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <Label className="font-medium">Era</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.era ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <RadioGroup
              value={filters.era || ''}
              onValueChange={(value) => handleFilterChange('era', value || null)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-eras" />
                <Label htmlFor="all-eras" className="text-sm">All Eras</Label>
              </div>
              {eras.map(era => (
                <div key={era.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={era.id} id={era.id} />
                  <Label htmlFor={era.id} className="text-sm">
                    {era.label}
                  </Label>
                  {era.description && (
                    <div className="group relative">
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                      <div className="absolute left-0 top-5 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10 dark:bg-gray-700">
                        {era.description}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        {/* Region Filter */}
        <Collapsible open={openSections.region} onOpenChange={() => toggleSection('region')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <Label className="font-medium">Region</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.region ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <RadioGroup
              value={filters.region || ''}
              onValueChange={(value) => handleFilterChange('region', value || null)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-regions" />
                <Label htmlFor="all-regions" className="text-sm">All Regions</Label>
              </div>
              {regions.map(region => (
                <div key={region.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={region.id} id={region.id} />
                  <Label htmlFor={region.id} className="text-sm">
                    {region.label}
                  </Label>
                  {region.description && (
                    <div className="group relative">
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                      <div className="absolute left-0 top-5 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10 dark:bg-gray-700">
                        {region.description}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        {/* Gender Filter */}
        <Collapsible open={openSections.gender} onOpenChange={() => toggleSection('gender')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <Label className="font-medium">Gender</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.gender ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <RadioGroup
              value={filters.gender || ''}
              onValueChange={(value) => handleFilterChange('gender', value || null)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-genders" />
                <Label htmlFor="all-genders" className="text-sm">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="text-sm">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="text-sm">Female</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        {/* Conditions Filter */}
        <Collapsible open={openSections.conditions} onOpenChange={() => toggleSection('conditions')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <Label className="font-medium">Life Conditions</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.conditions ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="text-xs text-gray-500 mb-2 italic dark:text-gray-400">
              Raw visibility to their hidden struggles
            </div>
            {conditions.map(condition => (
              <div key={condition.id} className="flex items-center space-x-2">
                <Checkbox
                  id={condition.id}
                  checked={(filters.conditions || []).includes(condition.id)}
                  onCheckedChange={(checked) => handleConditionChange(condition.id, checked)}
                />
                <Label htmlFor={condition.id} className="text-sm flex items-center space-x-1">
                  <span>{condition.icon} {condition.label}</span>
                  {condition.description && (
                    <div className="group relative">
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                      <div className="absolute left-0 top-5 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10 dark:bg-gray-700">
                        {condition.description}
                      </div>
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;