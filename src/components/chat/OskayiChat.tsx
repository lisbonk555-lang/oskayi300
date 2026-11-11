import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Plus, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Brain, 
  Cpu, 
  Globe, 
  Paperclip, 
  Mic, 
  MicOff, 
  Copy, 
  Check, 
  X, 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Lock, 
  Search,
  Menu,
  ChevronDown
} from 'lucide-react';
import { ChatThread, ChatMessage } from '../../server/oskayiChatService';

export const OskayiChat: React.FC = () => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState<'oskayi-fast' | 'oskayi-smart' | 'oskayi-think'>('oskayi-smart');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'twi' | 'pidgin' | 'ga' | 'hausa' | 'fr'>('en');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchThreadQuery, setSearchThreadQuery] = useState('');
  const [attachments, setAttachments] = useState<{ name: string; type: string; size: string }[]>([]);
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const ghanaPrompts = [
    {
      title: "Provisions Shop in Madina",
      prompt: "Write a complete business plan for a retail provisions shop at Madina Zongo Junction in Accra.",
      category: "Commerce"
    },
    {
      title: "BECE Mathematics Equations",
      prompt: "Explain BECE maths quadratic equations step-by-step with simple examples for a junior high student.",
      category: "Education"
    },
    {
      title: "Ghana Tenancy Agreement",
      prompt: "Draft a standard Ghana residential tenancy agreement contract complying with the Rent Act, 1963.",
      category: "Legal"
    },
    {
      title: "Cocoa Pest Management",
      prompt: "Provide an agronomy schedule for controlling capsid bugs and black pod disease on a cocoa farm in Ashanti Region.",
      category: "Agriculture"
    },
    {
      title: "GRA Presumptive Tax Guide",
      prompt: "Explain how small businesses compute and pay the Ghana Revenue Authority (GRA) presumptive tax.",
      category: "Tax & Finance"
    }
  ];

  const fetchThreads = async () => {
    try {
      const resp = await fetch('/api/chat/threads');
      if (resp.ok) {
        const data: ChatThread[] = await resp.json();
        setThreads(data);
        if (data.length > 0 && !activeThreadId) {
          setActiveThreadId(data[0].id);
        }
      }
    } catch (e) {
      console.error("Failed to load chat threads:", e);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threads, activeThreadId, isSending]);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleNewChat = () => {
    const newThread: ChatThread = {
      id: `thread-${Date.now().toString(36)}`,
      title: "New Conversation",
      model: selectedModel,
      language: selectedLanguage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      messages: []
    };
    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() && attachments.length === 0) return;

    const currentAttachments = [...attachments];
    setInputMessage('');
    setAttachments([]);

    try {
      setIsSending(true);

      // Optimistic user message insertion
      const updatedThreads = threads.map(t => {
        if (t.id === (activeThread?.id || activeThreadId)) {
          return {
            ...t,
            title: t.messages.length === 0 ? text.slice(0, 32) : t.title,
            messages: [
              ...t.messages,
              {
                id: `opt-${Date.now()}`,
                role: 'user' as const,
                content: text,
                timestamp: new Date().toISOString(),
                attachments: currentAttachments
              }
            ]
          };
        }
        return t;
      });
      setThreads(updatedThreads);

      const resp = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: activeThread?.id || activeThreadId,
          message: text,
          model: selectedModel,
          language: selectedLanguage,
          attachments: currentAttachments
        })
      });

      if (resp.ok) {
        const assistantMsg: ChatMessage = await resp.json();
        setThreads(prev => prev.map(t => {
          if (t.id === (activeThread?.id || activeThreadId)) {
            return {
              ...t,
              messages: [...t.messages.filter(m => !m.id.startsWith('opt-')), {
                id: `usr-${Date.now()}`,
                role: 'user',
                content: text,
                timestamp: new Date().toISOString(),
                attachments: currentAttachments
              }, assistantMsg]
            };
          }
          return t;
        }));
      }
    } catch (e) {
      console.error("Chat send error:", e);
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'fr' ? 'fr-FR' : 'en-GH';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(prev => prev + (prev ? ' ' : '') + transcript);
        }
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newAtt = {
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF Document' : 'Image File',
      size: `${(file.size / 1024).toFixed(1)} KB`
    };
    setAttachments([...attachments, newAtt]);
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2500);
  };

  const filteredThreads = threads.filter(t => 
    t.title.toLowerCase().includes(searchThreadQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 h-[calc(100vh-130px)] flex flex-col font-sans">
      
      {/* ChatGPT Layout: Left Sidebar + Main Window */}
      <div className="flex-1 flex overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
        
        {/* Left Sidebar (Conversations & Templates) */}
        <aside className={`${isSidebarOpen ? 'w-72 sm:w-80' : 'w-0 hidden'} bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-200 z-10 shrink-0`}>
          <div className="p-4 space-y-4 flex-1 overflow-hidden flex flex-col">
            
            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FFD700]/10 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>

            {/* Thread Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchThreadQuery}
                onChange={(e) => setSearchThreadQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            {/* Threads History List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block">
                Your Chats
              </span>

              {filteredThreads.map((t) => {
                const isActive = t.id === activeThread?.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveThreadId(t.id)}
                    className={`p-2.5 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-[#0A1F44] text-white border border-[#FFD700]/40 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#FFD700]' : 'text-slate-500'}`} />
                    <span className="truncate flex-1">{t.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pro Upgrade / KYC Signet in Sidebar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/90 text-xs space-y-2">
            {!isProUnlocked ? (
              <button
                onClick={() => setIsPaystackOpen(true)}
                className="w-full p-2.5 rounded-xl bg-[#0A1F44] border border-[#FFD700]/40 hover:border-[#FFD700] text-left transition-colors"
              >
                <div className="flex items-center justify-between text-[#FFD700] font-bold text-xs mb-0.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Oskayi Pro Chat
                  </span>
                  <span>GH¢50/mo</span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Gemini 3.8 Flash • Unlimited Prompts • MoMo
                </span>
              </button>
            ) : (
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pro Membership Active</span>
              </div>
            )}
          </div>
        </aside>

        {/* Main Chat Workspace */}
        <main className="flex-1 flex flex-col bg-slate-900/60 overflow-hidden">
          
          {/* Top Control Bar: Sidebar Toggle, Model Selector & Language Switcher */}
          <div className="h-14 border-b border-slate-800 px-4 flex items-center justify-between gap-3 bg-slate-950/80">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                title="Toggle Sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>

              {/* Model Selector Tabs */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setSelectedModel('oskayi-fast')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    selectedModel === 'oskayi-fast' ? 'bg-[#FFD700] text-[#0A1F44]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  Fast
                </button>
                <button
                  onClick={() => setSelectedModel('oskayi-smart')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    selectedModel === 'oskayi-smart' ? 'bg-[#FFD700] text-[#0A1F44]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Brain className="w-3 h-3 text-blue-400" />
                  Smart
                </button>
                <button
                  onClick={() => setSelectedModel('oskayi-think')}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    selectedModel === 'oskayi-think' ? 'bg-[#FFD700] text-[#0A1F44]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3 h-3 text-purple-400" />
                  Think
                </button>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Globe className="w-3.5 h-3.5 text-[#FFD700]" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-white text-xs px-2.5 py-1 rounded-xl focus:outline-none focus:border-[#FFD700]"
                >
                  <option value="en">English (Ghana)</option>
                  <option value="twi">Akan / Twi</option>
                  <option value="pidgin">Ghanaian Pidgin</option>
                  <option value="ga">Ga (Accra)</option>
                  <option value="hausa">Hausa</option>
                  <option value="fr">French (CEDEAO)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
            {(!activeThread || activeThread.messages.length === 0) ? (
              <div className="max-w-2xl mx-auto py-10 space-y-8 text-center">
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A1F44] border border-[#FFD700]/50 flex items-center justify-center mx-auto text-[#FFD700] shadow-xl">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    What can I help you build today?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                    Oskayi Chat speaks English, Twi, Pidgin, Ga, and Hausa. Tailored for Ghanaian enterprise, contracts, maths, and code.
                  </p>
                </div>

                {/* Ghana Prompt Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {ghanaPrompts.map((gp, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(gp.prompt)}
                      className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-[#FFD700]/60 transition-all text-xs group"
                    >
                      <div className="text-[10px] uppercase font-bold text-[#FFD700] mb-1">
                        {gp.category}
                      </div>
                      <div className="font-bold text-white group-hover:text-amber-300 transition-colors">
                        {gp.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        "{gp.prompt}"
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              activeThread.messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto' : 'mr-auto'} text-xs sm:text-sm`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-[#0A1F44] border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}

                    <div className="space-y-2 max-w-2xl">
                      {/* Attachments chip if present */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pb-1">
                          {msg.attachments.map((att, aIdx) => (
                            <span key={aIdx} className="px-2 py-0.5 rounded-lg bg-slate-800 text-[11px] text-[#FFD700] flex items-center gap-1">
                              <Paperclip className="w-3 h-3" /> {att.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className={`p-4 rounded-3xl leading-relaxed ${
                          isUser
                            ? 'bg-[#0A1F44] border border-[#FFD700]/50 text-white rounded-br-none'
                            : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                        }`}
                      >
                        {/* Render code blocks and markdown styling */}
                        {msg.content.split('```').map((part, pIdx) => {
                          if (pIdx % 2 === 1) {
                            const lines = part.trim().split('\n');
                            const lang = lines[0] || 'code';
                            const codeBody = lines.slice(1).join('\n') || part;
                            return (
                              <div key={pIdx} className="my-3 rounded-2xl bg-black/90 border border-slate-800 overflow-hidden text-xs">
                                <div className="bg-slate-900/90 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800">
                                  <span className="font-mono uppercase font-bold text-[#FFD700]">{lang}</span>
                                  <button
                                    onClick={() => handleCopyCode(codeBody, `${msg.id}-${pIdx}`)}
                                    className="flex items-center gap-1 hover:text-white"
                                  >
                                    {copiedMsgId === `${msg.id}-${pIdx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                    <span>{copiedMsgId === `${msg.id}-${pIdx}` ? 'Copied' : 'Copy code'}</span>
                                  </button>
                                </div>
                                <pre className="p-3 overflow-x-auto font-mono text-slate-200 text-xs">
                                  {codeBody}
                                </pre>
                              </div>
                            );
                          }
                          return (
                            <div key={pIdx} className="space-y-2 whitespace-pre-wrap">
                              {part}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500 px-1">
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        {msg.model_used && <span>• {msg.model_used}</span>}
                        {msg.language && <span>• {msg.language.toUpperCase()}</span>}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isSending && (
              <div className="flex gap-3 max-w-xl text-xs text-slate-400 items-center">
                <div className="w-8 h-8 rounded-xl bg-[#0A1F44] border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] animate-spin shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Oskayi Chat is generating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Prompt Input Area */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
            
            {/* Attachment preview strip */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 px-1">
                {attachments.map((att, aIdx) => (
                  <div key={aIdx} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span className="truncate max-w-xs">{att.name}</span>
                    <button onClick={() => setAttachments(attachments.filter((_, i) => i !== aIdx))} className="text-slate-400 hover:text-rose-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-2xl bg-slate-900 border border-slate-700 focus-within:border-[#FFD700] p-2 flex items-end gap-2 shadow-inner">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-[#FFD700] transition-colors rounded-xl hover:bg-slate-800"
                title="Attach PDF or Image"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 transition-colors rounded-xl ${
                  isListening ? 'text-rose-400 bg-rose-500/20 animate-pulse' : 'text-slate-400 hover:text-[#FFD700] hover:bg-slate-800'
                }`}
                title="Voice Input (Speech-to-Text)"
              >
                <Mic className="w-4 h-4" />
              </button>

              <textarea
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Ask in ${selectedLanguage.toUpperCase()} or English...`}
                className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none resize-none max-h-32 py-1.5"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isSending || (!inputMessage.trim() && attachments.length === 0)}
                className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-400 hover:to-amber-300 text-[#0A1F44] font-bold transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 px-2">
              <span>Oskayi Chat • Model: {selectedModel.toUpperCase()} • Powered by Gemini & Local Ghanaian Knowledge</span>
              <span>BN248851025 • Act 151</span>
            </div>
          </div>

        </main>
      </div>

      {/* Paystack Pro Modal */}
      {isPaystackOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-[#FFD700] p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-sm">Oskayi Chat Pro</span>
              </div>
              <button onClick={() => setIsPaystackOpen(false)} className="text-slate-400 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center mx-auto text-[#FFD700]">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">Unlock Oskayi Chat Pro</h3>
              <p className="text-xs text-slate-300">
                Unlimited deep reasoning (Oskayi Think), high-speed context, full document PDF/Image analysis, and priority African language models.
              </p>
              <div className="text-3xl font-black text-[#FFD700] font-mono pt-2">
                GH¢ 50.00 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span>
              </div>
              <span className="text-[11px] text-emerald-400 block">Instant MoMo (MTN, Telecel, AT) Activation</span>
            </div>

            <button
              onClick={() => {
                setIsProUnlocked(true);
                setIsPaystackOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFD700] text-[#0A1F44] font-black text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              Pay GH¢50 via Paystack MoMo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
