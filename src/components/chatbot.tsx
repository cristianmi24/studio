'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Import useTranslations

// Define FAQ data structure (keys for translation)
interface FAQItemKeys {
  questionKey: string;
  answerKey: string;
}

// Use keys for FAQ data, map to translated strings later
const faqKeys: FAQItemKeys[] = [
  { questionKey: "faq_q1", answerKey: "faq_a1" },
  { questionKey: "faq_q2", answerKey: "faq_a2" },
  { questionKey: "faq_q3", answerKey: "faq_a3" },
  { questionKey: "faq_q4", answerKey: "faq_a4" },
  { questionKey: "faq_q5", answerKey: "faq_a5" },
];

interface ChatMessage {
    id: number;
    text: string; // Will hold the translated text
    sender: 'user' | 'bot';
}

const Chatbot = () => {
  const t = useTranslations('Chatbot'); // Initialize translations for Chatbot
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showFAQs, setShowFAQs] = useState(true);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
        setShowFAQs(true);
    }
  };

  // Translate FAQ data using the keys
  const faqs = faqKeys.map(keyItem => ({
    question: t(keyItem.questionKey),
    answer: t(keyItem.answerKey)
  }));

  const handleFAQClick = (faq: { question: string; answer: string }) => {
     // Use the translated text directly
     const userMessage: ChatMessage = { id: Date.now(), text: faq.question, sender: 'user'};
     const botMessage: ChatMessage = { id: Date.now() + 1, text: faq.answer, sender: 'bot'};
     setMessages(prev => [...prev, userMessage, botMessage]);
     setShowFAQs(false);
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <Button
        variant="default"
        size="icon"
        className="chatbot-fab rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
        onClick={toggleChat}
         // Translate aria-label based on state
        aria-label={isOpen ? t("fab_close") : t("fab_open")}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
           {/* Translate header */}
          <span>{t('header_title')}</span>
           <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:bg-primary/80 h-7 w-7">
               <X className="h-5 w-5" />
               {/* Translate screen reader text */}
               <span className="sr-only">{t('close_button_sr')}</span>
           </Button>
        </div>
        <div className="chatbot-body" ref={chatBodyRef}>
           {/* Initial FAQ List */}
           {showFAQs && (
                <div className="chatbot-faq-list">
                     {/* Translate prompt */}
                     <p className="text-sm text-muted-foreground mb-2">{t('faq_prompt')}</p>
                     {/* Map over translated faqs */}
                    {faqs.map((faq, index) => (
                        <button key={index} onClick={() => handleFAQClick(faq)}>
                        {faq.question} {/* Display translated question */}
                        </button>
                    ))}
                </div>
           )}

            {/* Chat Messages */}
            {!showFAQs && messages.map((msg) => (
                <div key={msg.id} className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                   {msg.text} {/* Display message text (already translated) */}
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Chatbot;
