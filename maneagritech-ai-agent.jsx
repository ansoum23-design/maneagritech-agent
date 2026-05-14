import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar, CheckCircle2, Loader2 } from 'lucide-react';

const ManeagritechAIAgent = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour et bienvenue chez **Maneagritech IA**. Je suis votre assistant virtuel intelligent.\n\nNous aidons les entreprises B2B et cabinets de conseil à automatiser leur génération de leads et leur relation client grâce à l\'intelligence artificielle.\n\nComment puis-je vous accompagner aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `Tu es l'assistant IA de Maneagritech IA, une entreprise sénégalaise spécialisée dans la création d'agents IA et d'automatisation pour les entreprises B2B et cabinets de conseil.

INFORMATIONS ENTREPRISE:
- Nom: Maneagritech IA
- Contact: ansoum78@gmail.com / +221 76 693 43 13
- Localisation: Dakar, Sénégal

TON RÔLE:
1. Qualifier les prospects (budget minimum 1000-3000€)
2. Répondre aux questions sur nos services
3. Collecter les informations pour prise de rendez-vous

NOS SERVICES (PACKAGES):

**PACKAGE STARTER** (1 500 - 2 500€)
- Chatbot de qualification de leads sur site web
- Réponses automatiques aux FAQ
- Intégration email pour demandes qualifiées
- Formation 2h pour l'équipe

**PACKAGE PRO** (3 000 - 5 000€)
- Chatbot multi-canal (site + WhatsApp + Facebook)
- Base de connaissances enrichie
- Intégration CRM (HubSpot, Pipedrive)
- Scénarios de relance automatique
- Support 3 mois

**PACKAGE PREMIUM** (6 000 - 10 000€)
- Agent IA complet vente/marketing
- Automatisations avancées
- Analytics personnalisés
- Formation équipe complète
- Support 6 mois

MAINTENANCE: 200-500€/mois
OPTIMISATIONS: 300-800€/mois

STYLE DE COMMUNICATION:
- Professionnel et formel
- Clair et structuré
- Orienté résultats business
- Posez des questions qualifiantes: taille entreprise, volume de leads, budget disponible

OBJECTIF:
Qualifier le prospect puis proposer un rendez-vous de découverte (30 min) pour analyser leurs besoins spécifiques.

IMPORTANT:
- Ne jamais donner de fausses informations
- Si tu ne sais pas, propose de mettre en contact avec l'équipe
- Reste factuel sur les délais et résultats
- Mets en avant le ROI: un commercial coûte 3000-4000€/mois, notre solution est bien plus rentable`;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.filter(m => m.role !== 'system').map(m => ({
              role: m.role,
              content: m.content
            })),
            { role: 'user', content: input }
          ]
        })
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Je rencontre un problème technique. Vous pouvez nous contacter directement à ansoum78@gmail.com ou au +221 76 693 43 13.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Voir les packages', query: 'Quels sont vos packages et tarifs ?' },
    { label: 'Prendre rendez-vous', query: 'Je souhaite prendre rendez-vous pour discuter de mon projet' },
    { label: 'ROI & Bénéfices', query: 'Quel retour sur investissement puis-je espérer ?' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #1a2740 100%)',
      fontFamily: '"Cabinet Grotesk", -apple-system, system-ui, sans-serif',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 15s ease-in-out infinite reverse'
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.5rem 1.25rem',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '50px',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
          <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.05em' }}>
            IA EN LIGNE
          </span>
        </div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em'
        }}>
          Maneagritech IA
        </h1>
        
        <p style={{
          color: '#94a3b8',
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Votre partenaire en automatisation intelligente pour entreprises B2B
        </p>
      </div>

      {/* Chat Container */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Messages Area */}
        <div style={{
          height: '500px',
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                animation: 'slideIn 0.3s ease-out',
                animationFillMode: 'both',
                animationDelay: `${index * 0.05}s`
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: message.role === 'assistant' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: message.role === 'assistant'
                  ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                  : '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                {message.role === 'assistant' ? (
                  <Bot size={20} color="white" />
                ) : (
                  <User size={20} color="white" />
                )}
              </div>

              {/* Message Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  background: message.role === 'assistant'
                    ? 'rgba(30, 41, 59, 0.6)'
                    : 'rgba(51, 65, 85, 0.6)',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  color: '#e2e8f0',
                  fontSize: '0.9375rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {message.content.split('**').map((part, i) => 
                    i % 2 === 0 ? part : <strong key={i} style={{ color: '#10b981', fontWeight: '600' }}>{part}</strong>
                  )}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  marginTop: '0.5rem',
                  paddingLeft: '0.25rem'
                }}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Loader2 size={20} color="white" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
              <div style={{
                background: 'rgba(30, 41, 59, 0.6)',
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                color: '#94a3b8'
              }}>
                Réflexion en cours...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div style={{
            padding: '0 2rem 1rem',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(action.query);
                  setTimeout(() => handleSend(), 100);
                }}
                style={{
                  padding: '0.625rem 1rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px',
                  color: '#60a5fa',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          background: 'rgba(15, 23, 42, 0.4)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-end'
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question sur nos services IA..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                color: '#e2e8f0',
                fontSize: '0.9375rem',
                resize: 'none',
                outline: 'none',
                minHeight: '56px',
                maxHeight: '120px',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.4)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
            />
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: input.trim() && !isLoading
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'rgba(71, 85, 105, 0.4)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: input.trim() && !isLoading ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = input.trim() && !isLoading ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none';
              }}
            >
              <Send size={20} color="white" />
            </button>
          </div>

          <div style={{
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: '#64748b',
            textAlign: 'center'
          }}>
            <Calendar size={12} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
            Disponible 24/7 • Contact direct: ansoum78@gmail.com • +221 76 693 43 13
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: '900px',
        margin: '2rem auto 0',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.875rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <CheckCircle2 size={16} color="#10b981" />
          <span>Propulsé par Claude AI • Réponses en temps réel</span>
        </div>
        <p>© 2026 Maneagritech IA • Dakar, Sénégal</p>
      </div>
    </div>
  );
};

export default ManeagritechAIAgent;