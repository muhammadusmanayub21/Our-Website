'use client'

import React, { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How quickly can your team start a new project?',
    answer: 'We typically kick off within 1-2 weeks – sometimes even sooner if you\'re really and irresponsive, we move fast!'
  },
  {
    id: '2',
    question: 'Do I need a detailed project brief to begin?',
    answer: 'Not at all! We can start with just your vision and goals. Our discovery phase helps define the project scope, requirements, and roadmap together.'
  },
  {
    id: '3',
    question: 'Do you work on long-term design and development projects?',
    answer: 'Absolutely! We love long-term partnerships. Whether it\'s ongoing product development, maintenance, or scaling your platform, we\'re here for the journey.'
  },
  {
    id: '4',
    question: 'Do you offer fixed pricing or monthly retainer options?',
    answer: 'We offer both! Fixed pricing for defined projects and monthly retainers for ongoing work. We\'ll recommend the best approach based on your needs.'
  },
  {
    id: '5',
    question: 'Can we hire just a designer or developer from your team?',
    answer: 'Yes, we can provide dedicated specialists! Whether you need a UI/UX designer, frontend developer, or backend engineer, we can scale our team to match your requirements.'
  },
  {
    id: '6',
    question: 'I\'m not sure what I need yet. Can you still help?',
    answer: 'Of course! That\'s what our discovery phase is for. We\'ll help you define your requirements, identify opportunities, and create a clear roadmap for success.'
  },
  {
    id: '7',
    question: 'Do you work with international clients?',
    answer: 'Yes! We work with clients worldwide. Our team is experienced in collaborating across time zones and we use modern tools to ensure smooth communication.'
  }
]

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    const newExpandedItems = new Set(expandedItems)
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id)
    } else {
      newExpandedItems.add(id)
    }
    setExpandedItems(newExpandedItems)
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8">
            Ask us <em className="italic">anything</em>
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {faqData.slice(0, Math.ceil(faqData.length / 2)).map((faq) => (
              <div
                key={faq.id}
                className={`
                  relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2
                  ${expandedItems.has(faq.id) 
                    ? 'border-devsphere-green bg-devsphere-green/10 shadow-lg' 
                    : 'border-transparent hover:border-gray-200 hover:shadow-md'
                  }
                `}
                onClick={() => toggleExpanded(faq.id)}
                onMouseEnter={() => setHoveredItem(faq.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Question */}
                <div className="flex items-start justify-between">
                  <h3 className={`
                    text-lg md:text-xl font-medium leading-relaxed pr-4 transition-colors duration-300
                    ${expandedItems.has(faq.id) ? 'text-black' : 'text-gray-800'}
                  `}>
                    {faq.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div className={`
                    flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${expandedItems.has(faq.id) 
                      ? 'border-black bg-black text-white rotate-45' 
                      : 'border-gray-400 text-gray-400 hover:border-gray-600'
                    }
                  `}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>

                {/* Answer */}
                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${expandedItems.has(faq.id) 
                    ? 'max-h-96 opacity-100 mt-4' 
                    : 'max-h-0 opacity-0 mt-0'
                  }
                `}>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Green highlight effect when expanded */}
                {expandedItems.has(faq.id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-devsphere-green/5 to-transparent rounded-2xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqData.slice(Math.ceil(faqData.length / 2)).map((faq) => (
              <div
                key={faq.id}
                className={`
                  relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2
                  ${expandedItems.has(faq.id) 
                    ? 'border-devsphere-green bg-devsphere-green/10 shadow-lg' 
                    : 'border-transparent hover:border-gray-200 hover:shadow-md'
                  }
                `}
                onClick={() => toggleExpanded(faq.id)}
                onMouseEnter={() => setHoveredItem(faq.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Question */}
                <div className="flex items-start justify-between">
                  <h3 className={`
                    text-lg md:text-xl font-medium leading-relaxed pr-4 transition-colors duration-300
                    ${expandedItems.has(faq.id) ? 'text-black' : 'text-gray-800'}
                  `}>
                    {faq.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div className={`
                    flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${expandedItems.has(faq.id) 
                      ? 'border-black bg-black text-white rotate-45' 
                      : 'border-gray-400 text-gray-400 hover:border-gray-600'
                    }
                  `}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>

                {/* Answer */}
                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${expandedItems.has(faq.id) 
                    ? 'max-h-96 opacity-100 mt-4' 
                    : 'max-h-0 opacity-0 mt-0'
                  }
                `}>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Green highlight effect when expanded */}
                {expandedItems.has(faq.id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-devsphere-green/5 to-transparent rounded-2xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 mb-6">
            Still have questions? We'd love to hear from you.
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQSection