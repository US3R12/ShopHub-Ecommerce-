import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ProductListingProps {
  products: Product[];
  selectedCategory?: string;
  onProductClick: (product: Product) => void;
  showFilters?: boolean;
  maxProducts?: number;
}

export function ProductListing({ 
  products, 
  selectedCategory, 
  onProductClick, 
  showFilters = true,
  maxProducts
}: ProductListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(selectedCategory ? [selectedCategory] : []);
  const [minRating, setMinRating] = useState(0);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Get unique brands and categories
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);
  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesPrice && matchesBrand && matchesCategory && matchesRating;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming products are already in newest order
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    // Limit products if maxProducts is specified
    if (maxProducts) {
      filtered = filtered.slice(0, maxProducts);
    }

    return filtered;
  }, [products, searchQuery, sortBy, priceRange, selectedBrands, selectedCategories, minRating, maxProducts]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => 
      checked ? [...prev, brand] : prev.filter(b => b !== brand)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedCategories(selectedCategory ? [selectedCategory] : []);
    setMinRating(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </h2>
          <p className="text-muted-foreground">
            {maxProducts ? `Showing ${Math.min(filteredProducts.length, maxProducts)} of ${filteredProducts.length}` : `${filteredProducts.length} products found`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          {showFilters && (
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Filter Toggle */}
          {showFilters && (
            <Button
              variant="outline"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <motion.div
            initial={false}
            animate={{ width: showFiltersPanel || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'auto' : 0 }}
            className={`${showFiltersPanel || 'hidden lg:block'} lg:w-64 flex-shrink-0`}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <label className="font-medium">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="font-medium">Categories</CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-3">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Brands */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="font-medium">Brands</CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 mt-3">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                        />
                        <label htmlFor={brand} className="text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Rating */}
                <div className="space-y-3">
                  <label className="font-medium">Minimum Rating</label>
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground">
                    {minRating}+ stars
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={product}
                    onProductClick={onProductClick}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}