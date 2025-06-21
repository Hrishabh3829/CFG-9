import React from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Back to School Campaign Launched",
      description: "CRY kickstarts its annual drive to help underprivileged children return to classrooms with dignity and support.",
      image: img1,
      date: "June 15, 2025"
    },
    {
      id: 2,
      title: "Nutrition Drive in Rural Maharashtra",
      description: "Volunteers distribute balanced meals and raise awareness about childhood malnutrition in remote districts.",
      image: img2,
      date: "June 10, 2025"
    },
    {
      id: 3,
      title: "Street Theatre for Child Rights",
      description: "An engaging community-led performance in Hyderabad reaches hundreds with stories of hope and resilience.",
      image: img3,
      date: "June 5, 2025"
    }
  ];

  return (
    <section id="news" className="py-20 bg-black text-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Latest from the Field</h2>
          <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
            Real stories of progress, powered by your support and CRY’s dedication to every child’s right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-yellow-50 text-black rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-2">{item.date}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-800 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;