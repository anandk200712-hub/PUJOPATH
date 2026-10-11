import React, { useState } from 'react';
import { BookOpen, Sparkles, HelpCircle, Heart, Check, ChevronDown, ChevronUp } from 'lucide-react';

export const VisitorGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const guides = [
    {
      title: 'What are Dhak beats and Dhunuchi Naach?',
      content: 'The Dhak is a large, traditional barrel-shaped drum draped with white egret feathers. Its resonant rhythm announces the presence of the Goddess. In the evening after Aarti, devotees dance balancing earthen incense burners (Dhunuchi) filled with burning coconut husk and camphor in their hands, mouth, or forehead.',
    },
    {
      title: 'How to participate in Mahashtami Pushpanjali?',
      content: 'On Maha Ashtami morning (approx 8:30 AM – 11:30 AM), devotees fast and gather at pandals holding fresh bel leaves and marigold blossoms. The priest chants the sacred mantra: "Om Jayanti Mangala Kali Bhadrakali Kapalini..." and flowers are offered at the deity’s lotus feet in three solemn rounds.',
    },
    {
      title: 'What is the tradition of Bhog Prasad?',
      content: 'Bhog is sacred community food offered to the goddess and distributed to all visitors, traditionally featuring Khichuri, Labra (mixed seasonal vegetable medley), Beguni (crisp eggplant fritters), Payesh (rice pudding), and Tomato-dates chutney.',
    },
    {
      title: 'What happens during Sindoor Khela on Dashami?',
      content: 'On the final day (Vijayadashami), married women bid farewell to the Goddess by touching sweets to her lips, wiping her tears with betel leaves, and adorning her and each other with bright red vermilion powder (Sindoor) to celebrate fertility and long life.',
    },
    {
      title: 'What should I wear during pandal hopping?',
      content: 'Light breathable cottons or ethnic attire (Kurtas, Sarees). Wear comfortable, slip-on walking shoes because most pandals require walking 5-10 km per day and removing footwear before entering the sanctum sanctorum.',
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-sm">
        
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cultural Companion</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            First-Time Visitor’s Cultural Guide
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Essential festival traditions, ritual etiquette, and culinary customs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-stone-100">
          {guides.map((g, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="font-serif font-bold text-stone-900 group-hover:text-red-700 transition-colors text-sm sm:text-base">
                    {g.title}
                  </span>
                  <span className="text-stone-400 group-hover:text-stone-600">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-red-600" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50">
                    {g.content}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
