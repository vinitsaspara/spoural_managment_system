import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllSchedual from '@/hooks/useGetAllSchedual'


function FeaturedEvents() {
  
  const { allSchedules } = useSelector((store) => store.admin);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useGetAllSchedual();
  
  useEffect(() => {
    const now = new Date();
    const filteredEvents = allSchedules
      .filter((schedule) => {
        const eventDate = new Date(schedule.matchDate);
        return eventDate >= now;
      })
      .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
      .slice(0, 3); // Get only 3 upcoming events

    // Transform the data to match the required format
    const formattedEvents = filteredEvents.map((schedule) => ({
      title: schedule.gameName,
      description: `Watch ${schedule.teams[0]} vs ${schedule.teams[1]} in an exciting match`,
      date: new Date(schedule.matchDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: schedule.matchTime,
      location: schedule.venue,
      image: getEventImage(schedule.gameName), // Helper function to get appropriate image
    }));

    setUpcomingEvents(formattedEvents);
  }, [allSchedules]);

  // Helper function to get appropriate image based on game name
  const getEventImage = (gameName) => {
    const gameImages = {
      Football:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      Swimming:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      Athletics:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      Cricket:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      Basketball:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      default:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    };

    const gameType = Object.keys(gameImages).find((key) =>
      gameName.toLowerCase().includes(key.toLowerCase())
    );
    return gameImages[gameType] || gameImages.default;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-tl from-purple-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black relative inline-block">
            Upcoming Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-white/80 h-96 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Image container with enhanced hover effect */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Image overlay for better text contrast */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content with enhanced hover effects */}
                <div className="relative">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-white transition-all duration-500 transform group-hover:translate-y-[-4px]">
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-white/90 transition-all duration-500">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 group-hover:text-white/90 transition-all duration-500 transform group-hover:translate-y-[-2px]">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 group-hover:text-white/80 transition-all duration-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;
