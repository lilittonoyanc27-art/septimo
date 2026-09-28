import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Volume2,
  Table as TableIcon,
  HelpCircle,
  FileText,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Shuffle,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';
import {
  FULL_TEXT_PARAGRAPHS,
  MAIN_FUNCTIONS,
  MEMORY_TABLE,
  QUESTIONS_AND_ANSWERS,
  SHORT_TEXT,
} from './data';
import { QuestionAnswer } from './types';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'full' | 'functions' | 'table' | 'questions' | 'short'>('full');

  // Global toggle to force show all Armenian translations or keep click-to-reveal
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  // Individual revealed translations by item ID
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Audio playing state
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Question tab state: 'list' or 'flashcards'
  const [questionMode, setQuestionMode] = useState<'list' | 'flashcards'>('list');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [cardAnswerRevealed, setCardAnswerRevealed] = useState<boolean>(false);
  const [cardArmenianRevealed, setCardArmenianRevealed] = useState<boolean>(false);
  const [masteredQuestionIds, setMasteredQuestionIds] = useState<Set<number>>(new Set());

  // Memory table quiz mode
  const [tableQuizMode, setTableQuizMode] = useState<'all' | 'hideHy' | 'hidePurpose'>('all');
  const [revealedTableCells, setRevealedTableCells] = useState<Record<string, boolean>>({});

  // Helper to toggle single item translation
  const toggleItem = (id: string) => {
    setRevealedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to check if item is revealed
  const isRevealed = (id: string): boolean => {
    if (showAllTranslations) return true;
    return !!revealedItems[id];
  };

  // Speech synthesis for Spanish
  const speakSpanish = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setPlayingId(id);

    const cleanText = text.replace(/[“”!¡¿?«»]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;

    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return QUESTIONS_AND_ANSWERS;
    const q = searchQuery.toLowerCase();
    return QUESTIONS_AND_ANSWERS.filter(
      (item) =>
        item.esQuestion.toLowerCase().includes(q) ||
        item.hyQuestion.toLowerCase().includes(q) ||
        item.esAnswer.toLowerCase().includes(q) ||
        item.hyAnswer.toLowerCase().includes(q) ||
        item.id.toString() === q
    );
  }, [searchQuery]);

  // Filtered Functions
  const filteredFunctions = useMemo(() => {
    if (!searchQuery.trim()) return MAIN_FUNCTIONS;
    const q = searchQuery.toLowerCase();
    return MAIN_FUNCTIONS.filter(
      (fn) =>
        fn.esName.toLowerCase().includes(q) ||
        fn.hyName.toLowerCase().includes(q) ||
        fn.esPurpose.toLowerCase().includes(q) ||
        fn.hyPurpose.toLowerCase().includes(q) ||
        fn.examples.some((ex) => ex.es.toLowerCase().includes(q) || ex.hy.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Flashcard controls
  const handleNextCard = () => {
    setCardAnswerRevealed(false);
    setCardArmenianRevealed(false);
    setCurrentCardIndex((prev) => (prev + 1) % QUESTIONS_AND_ANSWERS.length);
  };

  const handlePrevCard = () => {
    setCardAnswerRevealed(false);
    setCardArmenianRevealed(false);
    setCurrentCardIndex((prev) => (prev - 1 + QUESTIONS_AND_ANSWERS.length) % QUESTIONS_AND_ANSWERS.length);
  };

  const handleRandomCard = () => {
    setCardAnswerRevealed(false);
    setCardArmenianRevealed(false);
    const randomIndex = Math.floor(Math.random() * QUESTIONS_AND_ANSWERS.length);
    setCurrentCardIndex(randomIndex);
  };

  const toggleMastered = (id: number) => {
    setMasteredQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand zone: Single line */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              LC
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-stone-900 text-base block truncate">
                Lengua Castellana
              </span>
              <span className="text-xs text-stone-500 block truncate font-medium">
                1. Funciones del Lenguaje · Լեզվի գործառույթները
              </span>
            </div>
          </div>

          {/* Curriculum indicator context */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-md">
            <span>The Geosphere</span>
            <span className="text-stone-400">→</span>
            <span>The Atmosphere</span>
            <span className="text-stone-400">→</span>
            <span className="font-semibold text-amber-700">Lengua Castellana</span>
          </div>

          {/* Global action: Show/hide all Armenian */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAllTranslations(!showAllTranslations)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                showAllTranslations
                  ? 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
              title="Переключить показ всех переводов на армянский"
            >
              {showAllTranslations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Скрыть переводы</span>
                  <span className="sm:hidden">Скрыть</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Показать все переводы (🇦🇲)</span>
                  <span className="sm:hidden">🇦🇲 Все</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs sm:text-sm font-medium border-t border-stone-100">
            <button
              onClick={() => setActiveTab('full')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'full'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Texto completo</span>
            </button>

            <button
              onClick={() => setActiveTab('functions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'functions'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>6 Funciones principales</span>
            </button>

            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'table'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Tabla para memorizar</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'questions'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas y respuestas (15)</span>
            </button>

            <button
              onClick={() => setActiveTab('short')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'short'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Texto corto (Resumen)</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Banner with Instructions */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-stone-800">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">
                Интерактивный учебный материал: Испанский 🇪🇸 ↔ Армянский 🇦🇲
              </p>
              <p className="text-xs text-stone-600 mt-0.5">
                Нажимайте на любой блок или предложение на испанском, чтобы открыть армянский перевод (կտտացրեք հայերեն թարգմանությունը տեսնելու համար).
              </p>
            </div>
          </div>
          <div className="text-xs font-medium text-amber-900 bg-amber-100/90 px-2.5 py-1 rounded-md shrink-0">
            Кликните на текст для перевода
          </div>
        </div>

        {/* 1. TEXTO COMPLETO TAB */}
        {activeTab === 'full' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                1. Funciones del Lenguaje
              </h1>
              <h2 className="text-lg font-medium text-stone-600 mt-1">
                Լեզվի գործառույթները · Texto completo / Լիարժեք տեքստ
              </h2>
              <p className="text-xs text-stone-500 mt-2">
                Каждый абзац интерактивен. Нажмите на текст, чтобы мгновенно увидеть перевод на армянском.
              </p>
            </div>

            <div className="space-y-4">
              {FULL_TEXT_PARAGRAPHS.map((item, index) => {
                const revealed = isRevealed(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`group cursor-pointer rounded-xl p-4 sm:p-5 border transition-all duration-200 ${
                      revealed
                        ? 'bg-white border-amber-300 shadow-sm'
                        : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        {/* Spanish (Primary) */}
                        <div className="flex items-start gap-3">
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded shrink-0 mt-0.5">
                            🇪🇸 #{index + 1}
                          </span>
                          <p className="text-base sm:text-lg font-medium text-stone-900 leading-relaxed">
                            {item.es}
                          </p>
                        </div>

                        {/* Armenian (Revealed on click) */}
                        {revealed ? (
                          <div className="mt-3 pt-3 border-t border-amber-100/80 flex items-start gap-3 bg-amber-50/40 p-3 rounded-lg animate-fadeIn">
                            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0 mt-0.5">
                              🇦🇲 Հայերեն
                            </span>
                            <p className="text-base font-normal text-stone-800 leading-relaxed font-armenian">
                              {item.hy}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-amber-700 transition-colors pt-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Нажмите, чтобы показать армянский перевод (Սեղմեք հայերենի համար)</span>
                          </div>
                        )}
                      </div>

                      {/* Spanish Pronunciation Audio */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakSpanish(item.es, item.id);
                        }}
                        className={`p-2 rounded-lg border transition-colors shrink-0 ${
                          playingId === item.id
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                        title="Прослушать произношение на испанском"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. FUNCIONES PRINCIPALES TAB */}
        {activeTab === 'functions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                Funciones Principales
              </h1>
              <h2 className="text-lg font-medium text-stone-600 mt-1">
                Հիմնական գործառույթները (6 funciones)
              </h2>
              <p className="text-xs text-stone-500 mt-2">
                Подробный разбор 6 функций языка с примерами и правилами для запоминания. Нажмите на любой блок, чтобы открыть армянский перевод.
              </p>
            </div>

            {/* Quick Search inside functions */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Поиск по функции, примеру или правилу (Referencial, orden, Madrid...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-5">
              {filteredFunctions.map((fn) => {
                const fnRevealed = isRevealed(`fn-${fn.id}`);

                return (
                  <div
                    key={fn.id}
                    className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs hover:border-stone-300 transition-all space-y-4"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0">
                            {fn.id}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                            {fn.esName}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-stone-600 mt-1 ml-9">
                          🇦🇲 {fn.hyName}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakSpanish(`${fn.esName}. ${fn.esPurpose}`, `fn-audio-${fn.id}`)}
                        className={`p-2 rounded-lg border transition-colors shrink-0 ${
                          playingId === `fn-audio-${fn.id}`
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                        title="Прослушать определение"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Purpose / ¿Para qué sirve? */}
                    <div
                      onClick={() => toggleItem(`fn-purpose-${fn.id}`)}
                      className="cursor-pointer bg-stone-50 hover:bg-amber-50/40 p-4 rounded-xl border border-stone-200 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mt-0.5">
                          🇪🇸 Sirve para:
                        </span>
                        <p className="text-base font-medium text-stone-900">
                          {fn.esPurpose}
                        </p>
                      </div>

                      {isRevealed(`fn-purpose-${fn.id}`) ? (
                        <div className="mt-2.5 pt-2.5 border-t border-stone-200 flex items-start gap-2.5 text-stone-700 text-sm animate-fadeIn">
                          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider shrink-0 mt-0.5">
                            🇦🇲 Հայերեն:
                          </span>
                          <p className="font-normal font-armenian">{fn.hyPurpose}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 mt-2 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>Нажмите, чтобы увидеть перевод на армянский</span>
                        </p>
                      )}
                    </div>

                    {/* Special types if function 3 (orden, petición, pregunta) */}
                    {fn.types && (
                      <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5 space-y-2">
                        <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                          Puede ser / Կարող է լինել:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {fn.types.map((type, tIdx) => (
                            <div
                              key={tIdx}
                              onClick={() => toggleItem(`fn-type-${fn.id}-${tIdx}`)}
                              className="cursor-pointer bg-white p-2.5 rounded-lg border border-amber-200/80 hover:border-amber-400 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-stone-900">
                                  🇪🇸 {type.es}
                                </span>
                                <Volume2
                                  className="w-3.5 h-3.5 text-stone-400 hover:text-amber-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakSpanish(type.es, `type-${tIdx}`);
                                  }}
                                />
                              </div>
                              {isRevealed(`fn-type-${fn.id}-${tIdx}`) ? (
                                <p className="text-xs text-blue-700 font-medium font-armenian mt-1 pt-1 border-t border-stone-100">
                                  🇦🇲 {type.hy}
                                </p>
                              ) : (
                                <span className="text-[10px] text-stone-400 mt-0.5 block">
                                  Клик = армянский
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Examples */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Ejemplo / Օրինակ:
                      </p>
                      {fn.examples.map((ex, exIdx) => {
                        const exKey = `fn-ex-${fn.id}-${exIdx}`;
                        const exRevealed = isRevealed(exKey);

                        return (
                          <div
                            key={exIdx}
                            onClick={() => toggleItem(exKey)}
                            className="cursor-pointer p-3.5 rounded-xl border border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5">
                                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                                  Ejemplo
                                </span>
                                <span className="text-base font-semibold text-stone-900">
                                  “{ex.es}”
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakSpanish(ex.es, exKey);
                                }}
                                className="text-stone-400 hover:text-amber-700 p-1"
                                title="Прослушать пример"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            {exRevealed ? (
                              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-start gap-2 text-stone-700 text-sm animate-fadeIn">
                                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                                  Օրինակ
                                </span>
                                <span className="font-armenian font-medium text-stone-800">
                                  «{ex.hy}»
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-stone-400 mt-1 block">
                                Нажмите, чтобы увидеть армянский перевод
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Para recordar (Mnemonic key takeaway) */}
                    {fn.toRemember && (
                      <div
                        onClick={() => toggleItem(`remember-${fn.id}`)}
                        className="cursor-pointer bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3.5 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                            <BookmarkCheck className="w-4 h-4" />
                            <span>Para recordar / Հիշելու համար:</span>
                          </div>
                          <p className="text-sm sm:text-base font-bold text-stone-900">
                            🇪🇸 {fn.toRemember.es}
                          </p>
                          {isRevealed(`remember-${fn.id}`) ? (
                            <p className="text-sm font-semibold text-blue-800 font-armenian pt-1">
                              🇦🇲 {fn.toRemember.hy}
                            </p>
                          ) : (
                            <span className="text-xs text-amber-700/80">
                              (Нажмите для армянского перевода)
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. TABLA PARA MEMORIZAR TAB */}
        {activeTab === 'table' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                Tabla para Memorizar
              </h1>
              <h2 className="text-lg font-medium text-stone-600 mt-1">
                Աղյուսակ՝ հիշելու համար
              </h2>
              <p className="text-xs text-stone-500 mt-2">
                Главная таблица для подготовки к устному и письменному ответу. Кликайте по ячейкам, чтобы проверить свою память!
              </p>
            </div>

            {/* Table practice mode filter buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-500">Режим:</span>
                <button
                  onClick={() => setTableQuizMode('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    tableQuizMode === 'all'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Все видно
                </button>
                <button
                  onClick={() => {
                    setTableQuizMode('hideHy');
                    setRevealedTableCells({});
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    tableQuizMode === 'hideHy'
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Скрыть армянский (Самопроверка)
                </button>
                <button
                  onClick={() => {
                    setTableQuizMode('hidePurpose');
                    setRevealedTableCells({});
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    tableQuizMode === 'hidePurpose'
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Скрыть ¿Para qué sirve?
                </button>
              </div>

              <span className="text-xs text-stone-500">
                Всего 6 функций
              </span>
            </div>

            {/* The Table */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100/80 border-b border-stone-200 text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">Función (Испанский)</th>
                      <th className="py-3.5 px-4 sm:px-6">¿Para qué sirve?</th>
                      <th className="py-3.5 px-4 sm:px-6">Հայերեն (Армянский)</th>
                      <th className="py-3.5 px-3 text-right">Звук</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-sm">
                    {MEMORY_TABLE.map((row) => {
                      const hyCellKey = `cell-hy-${row.id}`;
                      const purposeCellKey = `cell-purpose-${row.id}`;
                      const isHyCellRevealed =
                        tableQuizMode !== 'hideHy' || showAllTranslations || revealedTableCells[hyCellKey];
                      const isPurposeCellRevealed =
                        tableQuizMode !== 'hidePurpose' || revealedTableCells[purposeCellKey];

                      return (
                        <tr
                          key={row.id}
                          className="hover:bg-amber-50/30 transition-colors"
                        >
                          {/* Función */}
                          <td className="py-4 px-4 sm:px-6 font-semibold text-stone-900 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-xs flex items-center justify-center font-bold">
                                {row.id}
                              </span>
                              <span>{row.función}</span>
                            </div>
                          </td>

                          {/* ¿Para qué sirve? */}
                          <td
                            onClick={() => {
                              if (tableQuizMode === 'hidePurpose') {
                                setRevealedTableCells((prev) => ({
                                  ...prev,
                                  [purposeCellKey]: !prev[purposeCellKey],
                                }));
                              }
                            }}
                            className={`py-4 px-4 sm:px-6 text-stone-800 ${
                              tableQuizMode === 'hidePurpose' ? 'cursor-pointer' : ''
                            }`}
                          >
                            {isPurposeCellRevealed ? (
                              <span className="font-medium">{row.paraQueSirve}</span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 text-stone-500 rounded text-xs font-medium border border-stone-200">
                                <Eye className="w-3 h-3" /> Нажмите, чтобы открыть
                              </span>
                            )}
                          </td>

                          {/* Հայերեն */}
                          <td
                            onClick={() => {
                              setRevealedTableCells((prev) => ({
                                ...prev,
                                [hyCellKey]: !prev[hyCellKey],
                              }));
                            }}
                            className="py-4 px-4 sm:px-6 text-stone-800 cursor-pointer"
                          >
                            {isHyCellRevealed ? (
                              <span className="font-armenian font-semibold text-blue-900 bg-blue-50/70 px-2 py-1 rounded inline-block">
                                {row.hyText}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-xs font-medium border border-amber-200">
                                <Eye className="w-3 h-3" /> Кликните для перевода
                              </span>
                            )}
                          </td>

                          {/* Audio button */}
                          <td className="py-4 px-3 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                speakSpanish(
                                  `Función ${row.función}: sirve para ${row.paraQueSirve}`,
                                  `table-${row.id}`
                                )
                              }
                              className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-100 rounded-md transition-colors"
                              title="Прослушать"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. PREGUNTAS Y RESPUESTAS TAB */}
        {activeTab === 'questions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  Preguntas y Respuestas (15)
                </h1>
                <h2 className="text-lg font-medium text-stone-600 mt-1">
                  Հարցեր և պատասխաններ
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Все 15 вопросов для школьного опроса и экзамена с мгновенным переводом.
                </p>
              </div>

              {/* Toggle Mode: List view vs Flashcard interactive mode */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setQuestionMode('list')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    questionMode === 'list'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Все вопросы (15)
                </button>
                <button
                  onClick={() => setQuestionMode('flashcards')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    questionMode === 'flashcards'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Режим экзамена (Флешкарты)</span>
                </button>
              </div>
            </div>

            {/* FLASHCARDS INTERACTIVE MODE */}
            {questionMode === 'flashcards' ? (
              <div className="space-y-4">
                {/* Progress bar and counter */}
                <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-500">
                      Вопрос {currentCardIndex + 1} из {QUESTIONS_AND_ANSWERS.length}
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                      Усвоено: {masteredQuestionIds.size}/{QUESTIONS_AND_ANSWERS.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRandomCard}
                      className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                      title="Случайный вопрос"
                    >
                      <Shuffle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setMasteredQuestionIds(new Set());
                      }}
                      className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                      title="Сбросить прогресс"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* The Flashcard itself */}
                {(() => {
                  const card = QUESTIONS_AND_ANSWERS[currentCardIndex];
                  const isMastered = masteredQuestionIds.has(card.id);

                  return (
                    <div className="bg-white border-2 border-stone-200 hover:border-amber-400 rounded-2xl p-6 sm:p-8 shadow-sm transition-all space-y-6">
                      {/* Question header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                            Pregunta #{card.id}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                            {card.esQuestion}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => speakSpanish(card.esQuestion, `card-q-${card.id}`)}
                          className="p-2.5 bg-stone-100 hover:bg-amber-50 text-stone-700 hover:text-amber-700 rounded-xl transition-colors shrink-0"
                          title="Озвучить вопрос"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Question Armenian Translation */}
                      <div
                        onClick={() => setCardArmenianRevealed(!cardArmenianRevealed)}
                        className="cursor-pointer bg-stone-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-stone-200 transition-colors"
                      >
                        {cardArmenianRevealed || showAllTranslations ? (
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                              🇦🇲 Հայերեն
                            </span>
                            <p className="text-base font-semibold text-stone-800 font-armenian">
                              {card.hyQuestion}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-stone-500 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-amber-600" />
                            <span>Нажмите, чтобы увидеть вопрос на армянском (Հարցը հայերեն)</span>
                          </p>
                        )}
                      </div>

                      {/* Reveal Answer Zone */}
                      <div className="pt-2">
                        {cardAnswerRevealed ? (
                          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-4 animate-fadeIn">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-2">
                                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                  Respuesta / Պատասխան:
                                </span>
                                <p className="text-lg font-bold text-stone-900">
                                  🇪🇸 {card.esAnswer}
                                </p>
                                <p className="text-base font-medium text-stone-800 font-armenian pt-2 border-t border-amber-200">
                                  🇦🇲 {card.hyAnswer}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => speakSpanish(card.esAnswer, `card-a-${card.id}`)}
                                className="p-2 bg-white hover:bg-amber-100 text-stone-700 hover:text-amber-800 rounded-lg border border-stone-200 transition-colors shrink-0"
                                title="Озвучить ответ"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCardAnswerRevealed(true)}
                            className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-base"
                          >
                            <span>Показать ответ (Ցուցադրել պատասխանը)</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Card Action Controls: Next, Prev, Mark as mastered */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrevCard}
                            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors"
                          >
                            ← Предыдущий
                          </button>
                          <button
                            onClick={handleNextCard}
                            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors"
                          >
                            Следующий →
                          </button>
                        </div>

                        <button
                          onClick={() => toggleMastered(card.id)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors border ${
                            isMastered
                              ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isMastered ? 'Выучено ✓' : 'Отметить как выученное'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* LIST VIEW OF ALL 15 QUESTIONS */
              <div className="space-y-4">
                {/* Search query box */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Поиск по вопросам или ответам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredQuestions.map((item) => {
                    const qRevealed = isRevealed(`q-${item.id}`);
                    const aRevealed = isRevealed(`a-${item.id}`);
                    const isMastered = masteredQuestionIds.has(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`bg-white border rounded-xl p-5 transition-all shadow-xs space-y-3.5 ${
                          isMastered ? 'border-emerald-300 bg-emerald-50/20' : 'border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {/* Question row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="w-7 h-7 rounded-lg bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {item.id}
                            </span>
                            <div className="space-y-1 flex-1">
                              {/* Spanish Question (clickable to toggle Armenian) */}
                              <div
                                onClick={() => toggleItem(`q-${item.id}`)}
                                className="cursor-pointer group flex items-start gap-2"
                              >
                                <span className="text-xs font-semibold text-stone-500 shrink-0 mt-0.5">
                                  🇪🇸
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                                  {item.esQuestion}
                                </h3>
                              </div>

                              {/* Armenian Question */}
                              {qRevealed ? (
                                <div className="flex items-start gap-2 pt-1 animate-fadeIn">
                                  <span className="text-xs font-semibold text-blue-700 shrink-0 mt-0.5">
                                    🇦🇲
                                  </span>
                                  <p className="text-sm sm:text-base font-semibold text-stone-800 font-armenian">
                                    {item.hyQuestion}
                                  </p>
                                </div>
                              ) : (
                                <p
                                  onClick={() => toggleItem(`q-${item.id}`)}
                                  className="text-xs text-stone-400 hover:text-amber-700 cursor-pointer pt-0.5"
                                >
                                  (Нажмите на вопрос для армянского перевода)
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Sound button for Question */}
                          <button
                            type="button"
                            onClick={() => speakSpanish(item.esQuestion, `sound-q-${item.id}`)}
                            className="p-1.5 text-stone-400 hover:text-amber-700 hover:bg-stone-100 rounded-md transition-colors shrink-0"
                            title="Озвучить вопрос"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Answer row */}
                        <div
                          onClick={() => toggleItem(`a-${item.id}`)}
                          className="cursor-pointer bg-stone-50/80 hover:bg-amber-50/50 p-3.5 rounded-xl border border-stone-200 transition-colors space-y-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mt-0.5">
                                🇪🇸 Respuesta:
                              </span>
                              <p className="text-sm sm:text-base font-semibold text-stone-900">
                                {item.esAnswer}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSpanish(item.esAnswer, `sound-a-${item.id}`);
                              }}
                              className="text-stone-400 hover:text-amber-700 p-1"
                              title="Озвучить ответ"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Armenian Answer */}
                          {aRevealed ? (
                            <div className="pt-2 border-t border-stone-200 flex items-start gap-2 text-stone-800 animate-fadeIn">
                              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider shrink-0 mt-0.5">
                                🇦🇲 Պատասխան:
                              </span>
                              <p className="text-sm sm:text-base font-medium font-armenian">
                                {item.hyAnswer}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs text-stone-400 pt-1 flex items-center gap-1">
                              <Eye className="w-3 h-3 text-amber-600" />
                              <span>Нажмите на ответ, чтобы открыть армянский перевод</span>
                            </p>
                          )}
                        </div>

                        {/* Footer action to mark mastered */}
                        <div className="flex items-center justify-end pt-1">
                          <button
                            onClick={() => toggleMastered(item.id)}
                            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                              isMastered
                                ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isMastered ? 'Выучено ✓' : 'Отметить'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. TEXTO CORTO TAB */}
        {activeTab === 'short' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                Texto Corto (Resumen)
              </h1>
              <h2 className="text-lg font-medium text-stone-600 mt-1">
                Կարճ տեքստ · Идеально для устного ответа у доски
              </h2>
              <p className="text-xs text-stone-500 mt-2">
                Короткий и емкий вариант ответа на уроке. Нажмите на предложения, чтобы увидеть армянский перевод и прослушать аудио.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded uppercase tracking-wider">
                  Resumen Oficial / Կարճ տարբերակ
                </span>

                <button
                  type="button"
                  onClick={() =>
                    speakSpanish(
                      SHORT_TEXT.esParagraphs.join(' '),
                      'short-text-full'
                    )
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    playingId === 'short-text-full'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-amber-50 hover:text-amber-800'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Прослушать весь текст</span>
                </button>
              </div>

              {/* Paragraphs */}
              <div className="space-y-6">
                {SHORT_TEXT.esParagraphs.map((esP, idx) => {
                  const hyP = SHORT_TEXT.hyParagraphs[idx];
                  const pKey = `short-p-${idx}`;
                  const pRevealed = isRevealed(pKey);

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleItem(pKey)}
                      className="cursor-pointer bg-stone-50/70 hover:bg-amber-50/50 p-5 rounded-xl border border-stone-200 transition-colors space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-2.5">
                          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded shrink-0 mt-0.5">
                            🇪🇸 #{idx + 1}
                          </span>
                          <p className="text-base sm:text-lg font-medium text-stone-900 leading-relaxed">
                            {esP}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(esP, `short-p-audio-${idx}`);
                          }}
                          className="p-1.5 text-stone-400 hover:text-amber-700 rounded-md transition-colors shrink-0"
                          title="Озвучить абзац"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {pRevealed ? (
                        <div className="pt-3 border-t border-stone-200 flex items-start gap-2.5 text-stone-800 animate-fadeIn">
                          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0 mt-0.5">
                            🇦🇲 Հայերեն
                          </span>
                          <p className="text-base font-normal font-armenian leading-relaxed text-stone-800">
                            {hyP}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-stone-400 flex items-center gap-1.5 pt-1">
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                          <span>Нажмите, чтобы увидеть перевод на армянском (Սեղմեք հայերենի համար)</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            Lengua Castellana · 1. Funciones del lenguaje (Լեզվի գործառույթները)
          </p>
          <div className="flex items-center gap-4">
            <span>🇪🇸 Español</span>
            <span>·</span>
            <span>🇦🇲 Հայերեն</span>
            <span>·</span>
            <span className="text-stone-400">После The Geosphere и The Atmosphere</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
