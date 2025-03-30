import React, { useState, useMemo } from 'react'
import Navbar from './shared/Navbar'
import GameCards from './GameCards'
import { useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { 
  Search, 
  MapPin,
  Filter,
  X,
  SlidersHorizontal,
} from 'lucide-react'
import { Badge } from './ui/badge'

function Browse() {
  const { allGames } = useSelector(state => state.game)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    skills: []
  })

  // Get unique values for filters
  const filters = useMemo(() => ({
    locations: [...new Set(allGames.map(game => game.location))],
    skills: [...new Set(allGames.flatMap(game => game.skills))]
  }), [allGames])

  // Filter games based on criteria
  const filteredGames = useMemo(() => {
    return allGames.filter(game => {
      const matchesSearch = game.gameName.toLowerCase().includes(searchTerm.toLowerCase()) || game.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLocation = !selectedFilters.location || game.location === selectedFilters.location
      const matchesSkills = selectedFilters.skills.length === 0 || 
                          selectedFilters.skills.some(skill => game.skills.includes(skill))

      return matchesSearch && matchesLocation && matchesSkills
    })
  }, [allGames, searchTerm, selectedFilters])

  const clearFilters = () => {
    setSelectedFilters({
      location: '',
      skills: []
    })
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 border border-gray-100 mt-14">
              {/* Search Input */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-600" />
                  Search Games
                </h3>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-hover:text-blue-600 transition-colors duration-200" />
                  <Input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Locations Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Locations
                </h3>
                <div className="space-y-2">
                  {filters.locations.map((location) => (
                    <div
                      key={location}
                      className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-200 hover:bg-blue-50 hover:translate-x-1 ${
                        selectedFilters.location === location
                          ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                          : 'hover:text-blue-600 text-gray-600'
                      }`}
                      onClick={() => setSelectedFilters(prev => ({
                        ...prev,
                        location: prev.location === location ? '' : location
                      }))}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedFilters.skills.includes(skill)
                          ? 'bg-blue-100 text-blue-800 shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedFilters(prev => ({
                        ...prev,
                        skills: prev.skills.includes(skill)
                          ? prev.skills.filter(s => s !== skill)
                          : [...prev.skills, skill]
                      }))}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              {(selectedFilters.location || selectedFilters.skills.length > 0 || searchTerm) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Games
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {filteredGames.length} found
                </span>
              </div>
              
              {/* Active Filters */}
              {(selectedFilters.location || selectedFilters.skills.length > 0) && (
                <div className="flex items-center gap-2">
                  {selectedFilters.location && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200">
                      {selectedFilters.location}
                    </Badge>
                  )}
                  {selectedFilters.skills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Games Grid */}
            {filteredGames.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No games found</h3>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCards key={game._id} game={game} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse
