import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const featuredEvents = [
  { title: 'Football Finals', description: 'Watch the thrilling finale of our football tournament', date: 'June 15, 2023' },
  { title: 'Swimming Gala', description: 'Witness record-breaking performances in our state-of-the-art pool', date: 'June 18, 2023' },
  { title: 'Athletics Day', description: 'A day full of track and field events for all ages', date: 'June 20, 2023' },
]

function FeaturedEvents() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedEvents
