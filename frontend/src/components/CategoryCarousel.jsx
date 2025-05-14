import React from 'react'

const categories = [
  {
    name: 'Football',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    color: 'text-green-500'
  },
  {
    name: 'Basketball',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-orange-500'
  },
  {
    name: 'Tennis',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-yellow-500'
  },
  {
    name: 'Swimming',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-blue-500'
  },
  {
    name: 'Athletics',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-red-500'
  },
  {
    name: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-purple-500'
  },
  {
    name: 'Chess',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-gray-700'
  },
  {
    name: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-green-600'
  },
  {
    name: 'Badminton',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2WzU6jUshazqaMjrnGF4b6rqWeGDyY3GbKg&s',
    color: 'text-blue-600'
  },
  {
    name: 'Table Tennis',
    image: 'https://s.ndtvimg.com/images/content/2014/jul/806/indian-table-tennis-commonwealth-games.jpg',
    color: 'text-red-600'
  },
  {
    name: 'E-Sports',
    image: 'https://thesportanic.com/wp-content/uploads/2023/04/Top-5-e-Sports-1366x720.webp',
    color: 'text-indigo-500'
  },
  {
    name: 'Cultural',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'text-pink-500'
  }
];

function CategoryCarousel() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-tl from-purple-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
       

        {/* First row - Right to Left */}
        <div className="relative overflow-hidden mb-12">
          <div className="flex animate-scroll-left">
            {[...categories, ...categories].map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group"
              >
                <div className="w-48 h-48 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-32 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className={`font-semibold transition-colors duration-300 group-hover:${category.color} text-gray-600`}>
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - Left to Right */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right">
            {[...categories, ...categories].reverse().map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group"
              >
                <div className="w-48 h-48 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-32 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className={`font-semibold transition-colors duration-300 group-hover:${category.color} text-gray-600`}>
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default CategoryCarousel;
