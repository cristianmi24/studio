'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';

// Define FAQ data structure
interface FAQItem {
  question: string;
  answer: string;
}

// Sample FAQ Data (Replace with actual FAQs)
const faqs: FAQItem[] = [
  {
    question: "¿Qué es la arquitectura de datos?",
    answer: "La arquitectura de datos describe cómo se recopilan, almacenan, transforman, distribuyen y consumen los datos en una organización. Es el plano maestro para la gestión de datos.",
  },
  {
    question: "¿Cuál es la diferencia entre Data Warehouse y Data Lake?",
    answer: "Un Data Warehouse almacena datos estructurados y procesados para análisis específicos (BI). Un Data Lake almacena datos crudos en cualquier formato (estructurado, semiestructurado, no estructurado) para exploración y análisis más flexibles.",
  },
  {
    question: "¿Necesito saber programar para este curso?",
    answer: "No es estrictamente necesario para entender los conceptos fundamentales. Sin embargo, tener conocimientos básicos de SQL o Python puede ser útil para algunos ejemplos prácticos.",
  },
  {
      question: "¿Cómo puedo navegar por los módulos?",
      answer: "Puedes usar la barra de navegación en la parte superior o hacer clic en los títulos de las secciones en la página principal para ir directamente a cada módulo o sección."
  },
   {
      question: "¿Los ejercicios son calificados?",
      answer: "Los ejercicios interactivos y las pruebas rápidas son principalmente para autoevaluación y práctica. No forman parte de una calificación formal."
  }
];

interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showFAQs, setShowFAQs] = useState(true);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
        // Reset to show FAQs when opening an empty chat
        setShowFAQs(true);
    }
  };

  const handleFAQClick = (faq: FAQItem) => {
     const userMessage: ChatMessage = { id: Date.now(), text: faq.question, sender: 'user'};
     const botMessage: ChatMessage = { id: Date.now() + 1, text: faq.answer, sender: 'bot'};
     setMessages(prev => [...prev, userMessage, botMessage]);
     setShowFAQs(false); // Hide FAQs after selection
  }

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <Button
        variant="default" // Use primary color
        size="icon"
        className="chatbot-fab rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
        onClick={toggleChat}
        aria-label={isOpen ? "Cerrar Chat" : "Abrir Chat de Ayuda"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <span>Asistente de Ayuda</span>
           <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:bg-primary/80 h-7 w-7">
               <X className="h-5 w-5" />
               <span className="sr-only">Cerrar</span>
           </Button>
        </div>
        <div className="chatbot-body" ref={chatBodyRef}>
            {/* Initial FAQ List */}
           {showFAQs && (
                <div className="chatbot-faq-list">
                     <p className="text-sm text-muted-foreground mb-2">Selecciona una pregunta frecuente:</p>
                    {faqs.map((faq, index) => (
                        <button key={index} onClick={() => handleFAQClick(faq)}>
                        {faq.question}
                        </button>
                    ))}
                </div>
           )}

            {/* Chat Messages */}
            {!showFAQs && messages.map((msg) => (
                <div key={msg.id} className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                   {msg.text}
                </div>
            ))}
        </div>
         {/* Optional: Input field for user typing - Not implemented as per request */}
         {/* <div className="chatbot-footer p-2 border-t border-border">
             <Input placeholder="Escribe tu pregunta..." disabled/>
         </div> */}
      </div>
    </>
  );
};

export default Chatbot;
