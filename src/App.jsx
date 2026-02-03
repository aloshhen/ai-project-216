import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as Icons from 'lucide-react'

// SafeIcon Component - Proper implementation for Vite
const SafeIcon = ({ name, size = 24, className, color }) => {
  // Map kebab-case names to PascalCase component names
  const iconNameMap = {
    'sword': 'Sword',
    'shield': 'Shield',
    'shield-check': 'ShieldCheck',
    'zap': 'Zap',
    'trophy': 'Trophy',
    'users': 'Users',
    'user': 'User',
    'trending-up': 'TrendingUp',
    'trending-down': 'TrendingDown',
    'activity': 'Activity',
    'radio': 'Radio',
    'message-square': 'MessageSquare',
    'message-circle': 'MessageCircle',
    'calculator': 'Calculator',
    'menu': 'Menu',
    'x': 'X',
    'chevron-right': 'ChevronRight',
    'chevron-down': 'ChevronDown',
    'chevron-left': 'ChevronLeft',
    'chevron-up': 'ChevronUp',
    'search': 'Search',
    'filter': 'Filter',
    'eye': 'Eye',
    'heart': 'Heart',
    'share-2': 'Share2',
    'send': 'Send',
    'check-circle': 'CheckCircle',
    'alert-circle': 'AlertCircle',
    'clock': 'Clock',
    'calendar': 'Calendar',
    'external-link': 'ExternalLink',
    'play': 'Play',
    'pause': 'Pause',
    'plus': 'Plus',
    'minus': 'Minus',
    'refresh-cw': 'RefreshCw',
    'target': 'Target',
    'crosshair': 'Crosshair',
    'flame': 'Flame',
    'skull': 'Skull',
    'crown': 'Crown',
    'star': 'Star',
    'award': 'Award',
    'gamepad-2': 'Gamepad2',
    'monitor': 'Monitor',
    'video': 'Video',
    'thumbs-up': 'ThumbsUp',
    'thumbs-down': 'ThumbsDown',
    'more-horizontal': 'MoreHorizontal',
    'settings': 'Settings',
    'log-in': 'LogIn',
    'log-out': 'LogOut',
    'bot': 'Bot',
    'help-circle': 'HelpCircle',
    'arrow-right': 'ArrowRight',
    'arrow-left': 'ArrowLeft',
    'arrow-up': 'ArrowUp',
    'arrow-down': 'ArrowDown',
    'check': 'Check',
    'copy': 'Copy',
    'download': 'Download',
    'edit': 'Edit',
    'file': 'File',
    'folder': 'Folder',
    'globe': 'Globe',
    'home': 'Home',
    'image': 'Image',
    'link': 'Link',
    'lock': 'Lock',
    'mail': 'Mail',
    'map-pin': 'MapPin',
    'phone': 'Phone',
    'save': 'Save',
    'sun': 'Sun',
    'moon': 'Moon',
    'trash': 'Trash',
    'upload': 'Upload',
    'wifi': 'Wifi',
    'bell': 'Bell'
  }
  
  const pascalName = iconNameMap[name] || 'HelpCircle'
  const IconComponent = Icons[pascalName] || Icons.HelpCircle
  
  return <IconComponent size={size} className={className} color={color} />
}

// Utility for tailwind class merging
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Hero data
const HEROES = [
  { id: 1, name: 'Invoker', role: 'Mid', difficulty: 'Hard', winrate: 52.3, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', trending: 'up' },
  { id: 2, name: 'Pudge', role: 'Support', difficulty: 'Medium', winrate: 48.7, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80', trending: 'stable' },
  { id: 3, name: 'Anti-Mage', role: 'Carry', difficulty: 'Medium', winrate: 51.2, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80', trending: 'up' },
  { id: 4, name: 'Shadow Fiend', role: 'Mid', difficulty: 'Hard', winrate: 49.8, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=400&q=80', trending: 'down' },
  { id: 5, name: 'Rubick', role: 'Support', difficulty: 'Hard', winrate: 50.5, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&q=80', trending: 'up' },
  { id: 6, name: 'Faceless Void', role: 'Carry', difficulty: 'Hard', winrate: 53.1, image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&q=80', trending: 'up' },
]

// News data
const NEWS = [
  { id: 1, title: 'Патч 7.35c: Изменения баланса героев', category: 'Обновление', date: '2 часа назад', image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&q=80', excerpt: 'Valve выпустила новый патч с нерфом популярных героев меты...' },
  { id: 2, title: 'TI 2024: Расписание квалификаций', category: 'Турниры', date: '5 часов назад', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', excerpt: 'Объявлены даты региональных квалификаций на The International...' },
  { id: 3, title: 'Team Spirit побеждает на Riyadh Masters', category: 'Результаты', date: '1 день назад', image: 'https://images.unsplash.com/photo-1511882150382-421056ac890f?w=400&q=80', excerpt: 'Коллапс и Ятораро в очередной раз доказали своё превосходство...' },
]

// Live streams
const STREAMS = [
  { id: 1, streamer: 'Arteezy', viewers: 24500, title: 'Road to 12k MMR', platform: 'Twitch', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', live: true },
  { id: 2, streamer: 'Collapse', viewers: 18200, title: 'Offlane гайды', platform: 'Twitch', thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80', live: true },
  { id: 3, streamer: 'Gorgc', viewers: 32100, title: 'Ranked with viewers', platform: 'Twitch', thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80', live: true },
  { id: 4, streamer: 'Dendi', viewers: 8900, title: 'Old school Dota', platform: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0c?w=400&q=80', live: true },
]

// Stats data
const MATCH_STATS = [
  { id: 1, league: 'DPC Europe', team1: 'Team Spirit', team2: 'OG', score: '2-0', status: 'Live', duration: '42:15', viewers: '125K' },
  { id: 2, league: 'DPC China', team1: 'LGD Gaming', team2: 'Azure Ray', score: '1-1', status: 'Live', duration: '38:22', viewers: '89K' },
  { id: 3, league: 'DPC SEA', team1: 'Talons Esports', team2: 'Blacklist', score: '2-1', status: 'Finished', duration: '45:30', viewers: '45K' },
  { id: 4, league: 'DPC NA', team1: 'Shopify Rebellion', team2: 'TSM', score: '0-2', status: 'Finished', duration: '39:45', viewers: '32K' },
]

// Forum topics
const FORUM_TOPICS = [
  { id: 1, title: 'Мета 7.35c: Какие герои имба?', author: 'DotaMaster', replies: 156, views: 3420, lastReply: '10 мин назад', category: 'Обсуждение' },
  { id: 2, title: 'Гайд на Invoker 2024', author: 'QuasWexExort', replies: 89, views: 2150, lastReply: '1 час назад', category: 'Гайды' },
  { id: 3, title: 'Проблемы с пингом на EU серверах', author: 'LagKing', replies: 234, views: 5670, lastReply: '30 мин назад', category: 'Техподдержка' },
  { id: 4, title: 'Ищу команду на позицию 1, 8k MMR', author: 'CarryGod', replies: 45, views: 890, lastReply: '2 часа назад', category: 'Поиск игроков' },
]

// Items data for calculator
const ITEMS = [
  { id: 1, name: 'Black King Bar', cost: 4050, stats: { str: 10, damage: 24, magicResist: 10 }, icon: 'sword' },
  { id: 2, name: 'Butterfly', cost: 4975, stats: { agi: 30, damage: 25, evasion: 35 }, icon: 'zap' },
  { id: 3, name: 'Daedalus', cost: 5150, stats: { damage: 88, crit: 30 }, icon: 'target' },
  { id: 4, name: 'Heart of Tarrasque', cost: 5000, stats: { str: 40, hp: 250, regen: 1.6 }, icon: 'heart' },
  { id: 5, name: 'Satanic', cost: 5050, stats: { str: 25, damage: 25, lifesteal: 25 }, icon: 'skull' },
  { id: 6, name: 'Aghanim\'s Scepter', cost: 4200, stats: { all: 10, hp: 175, mana: 175 }, icon: 'crown' },
]

function App() {
  const [activeTab, setActiveTab] = useState('heroes')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedHero, setSelectedHero] = useState(null)
  const [buildItems, setBuildItems] = useState([])
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')

  // Scroll refs for sections
  const heroesRef = useRef(null)
  const newsRef = useRef(null)
  const statsRef = useRef(null)
  const calculatorRef = useRef(null)
  const streamsRef = useRef(null)
  const forumRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  // Build calculator logic
  const addItemToBuild = (item) => {
    if (buildItems.length < 6) {
      setBuildItems([...buildItems, item])
    }
  }

  const removeItemFromBuild = (index) => {
    setBuildItems(buildItems.filter((_, i) => i !== index))
  }

  const calculateTotalStats = () => {
    return buildItems.reduce((total, item) => ({
      damage: (total.damage || 0) + (item.stats.damage || 0),
      str: (total.str || 0) + (item.stats.str || 0),
      agi: (total.agi || 0) + (item.stats.agi || 0),
      all: (total.all || 0) + (item.stats.all || 0),
      hp: (total.hp || 0) + (item.stats.hp || 0),
      mana: (total.mana || 0) + (item.stats.mana || 0),
    }), {})
  }

  const totalCost = buildItems.reduce((sum, item) => sum + item.cost, 0)
  const totalStats = calculateTotalStats()

  // Chat widget logic
  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    
    const userMessage = { type: 'user', text: chatInput }
    setChatMessages([...chatMessages, userMessage])
    
    // Simple FAQ matching
    const lowerInput = chatInput.toLowerCase()
    let botResponse = 'Извините, я не понял вопрос. Попробуйте спросить о героях, предметах или патчах.'
    
    if (lowerInput.includes('патч') || lowerInput.includes('обновление')) {
      botResponse = 'Последний патч 7.35c вышел недавно. Основные изменения: нерф Invoker и Pudge, бафф кarry героев. Полный список изменений в разделе Новости.'
    } else if (lowerInput.includes('герой') || lowerInput.includes('персонаж')) {
      botResponse = 'У нас есть гайды на всех героев! Самые популярные сейчас: Invoker, Pudge, Anti-Mage. Загляните в раздел Гид по героям.'
    } else if (lowerInput.includes('сборка') || lowerInput.includes('билд')) {
      botResponse = 'Используйте наш Калькулятор сборок! Выберите героя и добавляйте предметы, чтобы увидеть итоговые статы.'
    } else if (lowerInput.includes('трансляция') || lowerInput.includes('стрим')) {
      botResponse = 'Сейчас в прямом эфире: Arteezy (24.5K зрителей), Collapse (18.2K), Gorgc (32.1K). Смотрите в разделе Трансляции!'
    }
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }])
    }, 500)
    
    setChatInput('')
  }

  // Section components
  const SectionTitle = ({ children, subtitle }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    
    return (
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-4">
          {children}
        </h2>
        {subtitle && <p className="text-gray-400 text-lg md:text-xl">{subtitle}</p>}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-dota-dark overflow-x-hidden mobile-safe-container">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-dota-dark/95 backdrop-blur-xl z-50 border-b border-dota-red/20">
        <nav className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-dota-red to-dota-accent rounded-lg flex items-center justify-center glow-red">
                <SafeIcon name="shield" size={24} className="text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black text-white tracking-tight">
                DOTA<span className="text-dota-red">2</span> PRO
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { id: 'heroes', label: 'Герои', ref: heroesRef },
                { id: 'news', label: 'Новости', ref: newsRef },
                { id: 'stats', label: 'Статистика', ref: statsRef },
                { id: 'calculator', label: 'Калькулятор', ref: calculatorRef },
                { id: 'streams', label: 'Трансляции', ref: streamsRef },
                { id: 'forum', label: 'Форум', ref: forumRef },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-dota-red",
                    activeTab === item.id ? "text-dota-red" : "text-gray-400"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <button className="bg-dota-gray hover:bg-dota-red/20 text-white px-4 py-2 rounded-lg font-semibold transition-all border border-dota-red/30 hover:border-dota-red flex items-center gap-2">
                <SafeIcon name="user" size={18} />
                Войти
              </button>
              <button className="bg-gradient-to-r from-dota-red to-dota-accent hover:opacity-90 text-white px-6 py-2 rounded-lg font-bold transition-all glow-red">
                Регистрация
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              <SafeIcon name={mobileMenuOpen ? "x" : "menu"} size={24} />
            </button>
          </div>
          
          {/* Mobile Nav */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pb-4 border-t border-dota-red/20 pt-4 space-y-3"
              >
                {[
                  { id: 'heroes', label: 'Герои', ref: heroesRef },
                  { id: 'news', label: 'Новости', ref: newsRef },
                  { id: 'stats', label: 'Статистика', ref: statsRef },
                  { id: 'calculator', label: 'Калькулятор', ref: calculatorRef },
                  { id: 'streams', label: 'Трансляции', ref: streamsRef },
                  { id: 'forum', label: 'Форум', ref: forumRef },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.ref)}
                    className="block w-full text-left text-gray-300 hover:text-dota-red font-semibold py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 space-y-3">
                  <button className="w-full bg-dota-gray text-white px-4 py-3 rounded-lg font-semibold border border-dota-red/30 flex items-center justify-center gap-2">
                    <SafeIcon name="log-in" size={18} />
                    Войти
                  </button>
                  <button className="w-full bg-gradient-to-r from-dota-red to-dota-accent text-white px-4 py-3 rounded-lg font-bold">
                    Регистрация
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-dota-red/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-dota-accent/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-dota-purple/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-dota-red/10 border border-dota-red/30 text-dota-red text-sm font-bold">
                <SafeIcon name="flame" size={16} className="mr-2" />
                Патч 7.35c уже доступен!
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
              МАСТЕРСТВО <br />
              <span className="gradient-text">БЕЗ ГРАНИЦ</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Профессиональные гайды, актуальная статистика, калькулятор сборок и живое сообщество для тех, кто стремится к вершинам рейтинга
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection(heroesRef)}
                className="group bg-gradient-to-r from-dota-red to-dota-accent hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 glow-red flex items-center justify-center gap-3"
              >
                <SafeIcon name="sword" size={20} />
                Изучить героев
                <SafeIcon name="chevron-right" size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection(streamsRef)}
                className="bg-dota-gray hover:bg-dota-gray/80 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all border border-white/20 hover:border-dota-red/50 flex items-center justify-center gap-3"
              >
                <SafeIcon name="radio" size={20} />
                Смотреть трансляции
              </button>
            </motion.div>
            
            {/* Stats bar */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {[
                { value: '124+', label: 'Героя', icon: 'users' },
                { value: '2.4M', label: 'Игроков', icon: 'trophy' },
                { value: '50K+', label: 'Сборок', icon: 'zap' },
                { value: '24/7', label: 'Поддержка', icon: 'message-circle' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm font-semibold flex items-center justify-center gap-2">
                    <SafeIcon name={stat.icon} size={14} className="text-dota-red" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Guides Section */}
      <section ref={heroesRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-dota-dark via-dota-gray/30 to-dota-dark">
        <div className="container mx-auto max-w-7xl">
          <SectionTitle subtitle="Детальные гайды с актуальными сборками и стратегиями">
            Гид по <span className="text-dota-red">Героям</span>
          </SectionTitle>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {['Все', 'Carry', 'Mid', 'Offlane', 'Support', 'Hard Support'].map((filter, i) => (
              <button
                key={filter}
                className={cn(
                  "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
                  i === 0 
                    ? "bg-dota-red text-white" 
                    : "bg-dota-gray text-gray-400 hover:text-white hover:bg-dota-gray/80 border border-white/10"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Hero Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {HEROES.map((hero) => (
              <motion.div
                key={hero.id}
                variants={fadeInUp}
                className="hero-card bg-gradient-to-br from-dota-gray to-dota-dark rounded-2xl overflow-hidden border border-white/10 hover:border-dota-red/50 group cursor-pointer"
                onClick={() => setSelectedHero(hero)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={hero.image} alt={hero.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dota-dark via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-bold flex items-center gap-1",
                      hero.trending === 'up' ? "bg-green-500/20 text-green-400" :
                      hero.trending === 'down' ? "bg-red-500/20 text-red-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    )}>
                      <SafeIcon name={hero.trending === 'up' ? 'trending-up' : hero.trending === 'down' ? 'trending-down' : 'minus'} size={12} />
                      {hero.winrate}%
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-dota-red/80 rounded-full text-xs font-bold text-white backdrop-blur-sm">
                      {hero.role}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-dota-red transition-colors">{hero.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Сложность: {hero.difficulty}</span>
                    <span className="flex items-center gap-1">
                      <SafeIcon name="eye" size={14} />
                      {Math.floor(Math.random() * 50 + 10)}K
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-10">
            <button className="inline-flex items-center gap-2 text-dota-red hover:text-dota-accent font-bold transition-colors">
              Смотреть всех героев
              <SafeIcon name="chevron-right" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section ref={newsRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <SectionTitle subtitle="Актуальные новости, патчноуты и анонсы турниров">
            Новости и <span className="text-dota-red">Обновления</span>
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {NEWS.map((news) => (
              <motion.article
                key={news.id}
                variants={fadeInUp}
                className="bg-dota-gray rounded-2xl overflow-hidden border border-white/10 hover:border-dota-red/50 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-dota-accent rounded-full text-xs font-bold text-white">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <SafeIcon name="clock" size={14} />
                    {news.date}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-dota-red transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {news.excerpt}
                  </p>
                  <button className="text-dota-red font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Читать далее
                    <SafeIcon name="chevron-right" size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Match Stats Section */}
      <section ref={statsRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-dota-dark via-dota-gray/20 to-dota-dark">
        <div className="container mx-auto max-w-7xl">
          <SectionTitle subtitle="Результаты матчей из профессиональных лиг в реальном времени">
            Статистика <span className="text-dota-red">Матчей</span>
          </SectionTitle>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-dota-gray rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Stats Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                {['Live', 'Завершённые', 'Предстоящие'].map((tab, i) => (
                  <button
                    key={tab}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2",
                      i === 0 
                        ? "bg-dota-red text-white" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {i === 0 && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <SafeIcon name="calendar" size={16} />
                Сегодня, 15 января 2025
              </div>
            </div>
            
            {/* Matches List */}
            <div className="divide-y divide-white/5">
              {MATCH_STATS.map((match) => (
                <div key={match.id} className="p-4 md:p-6 hover:bg-white/5 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-lg bg-dota-purple/20 text-dota-purple text-xs font-bold">
                        {match.league}
                      </span>
                      {match.status === 'Live' && (
                        <span className="flex items-center gap-1 text-red-500 text-xs font-bold live-pulse">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                          LIVE
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-center flex-1 gap-4 md:gap-8">
                      <div className="text-right">
                        <div className="text-white font-bold text-lg">{match.team1}</div>
                      </div>
                      <div className="px-4 py-2 bg-dota-dark rounded-lg font-black text-xl text-white min-w-[80px] text-center">
                        {match.score}
                      </div>
                      <div className="text-left">
                        <div className="text-white font-bold text-lg">{match.team2}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <SafeIcon name="clock" size={14} />
                        {match.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <SafeIcon name="eye" size={14} />
                        {match.viewers}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10 text-center">
              <button className="text-dota-red font-semibold hover:text-dota-accent transition-colors flex items-center justify-center gap-2 mx-auto">
                <SafeIcon name="external-link" size={16} />
                Все матчи на Dotabuff
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Build Calculator Section */}
      <section ref={calculatorRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <SectionTitle subtitle="Создавайте и анализируйте сборки для любых героев">
            Калькулятор <span className="text-dota-red">Сборок</span>
          </SectionTitle>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Item Selection */}
            <div className="lg:col-span-2 bg-dota-gray rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <SafeIcon name="search" size={20} className="text-dota-red" />
                Выберите предметы
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItemToBuild(item)}
                    disabled={buildItems.length >= 6}
                    className="p-4 bg-dota-dark rounded-xl border border-white/10 hover:border-dota-red/50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-dota-red/20 to-dota-accent/20 rounded-lg flex items-center justify-center mb-3 group-hover:from-dota-red/40 group-hover:to-dota-accent/40 transition-all">
                      <SafeIcon name={item.icon} size={24} className="text-dota-red" />
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{item.name}</div>
                    <div className="text-dota-gold font-bold text-sm">{item.cost} золота</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Build Result */}
            <div className="bg-gradient-to-b from-dota-gray to-dota-dark rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <SafeIcon name="calculator" size={20} className="text-dota-red" />
                Ваша сборка
              </h3>
              
              {/* Build Slots */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[0, 1, 2, 3, 4, 5].map((slot) => (
                  <div
                    key={slot}
                    onClick={() => buildItems[slot] && removeItemFromBuild(slot)}
                    className={cn(
                      "aspect-square rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all",
                      buildItems[slot] 
                        ? "bg-dota-dark border-dota-red hover:border-red-500" 
                        : "bg-dota-dark/50 border-dashed border-white/20"
                    )}
                  >
                    {buildItems[slot] ? (
                      <SafeIcon name={buildItems[slot].icon} size={24} className="text-dota-red" />
                    ) : (
                      <span className="text-gray-600 text-2xl font-bold">{slot + 1}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Total Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-400">Общая стоимость</span>
                  <span className="text-dota-gold font-bold text-xl">{totalCost.toLocaleString()} золота</span>
                </div>
                {Object.entries(totalStats).map(([stat, value]) => value > 0 && (
                  <div key={stat} className="flex justify-between items-center">
                    <span className="text-gray-400 capitalize">{stat === 'all' ? 'Все характеристики' : stat === 'str' ? 'Сила' : stat === 'agi' ? 'Ловкость' : stat === 'damage' ? 'Урон' : stat === 'hp' ? 'Здоровье' : stat === 'mana' ? 'Мана' : stat}</span>
                    <span className="text-white font-bold">+{value}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setBuildItems([])}
                className="w-full py-3 rounded-lg border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <SafeIcon name="refresh-cw" size={16} />
                Сбросить сборку
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Streams Section */}
      <section ref={streamsRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-dota-dark via-dota-gray/10 to-dota-dark">
        <div className="container mx-auto max-w-7xl">
          <SectionTitle subtitle="Следите за лучшими игроками мира в прямом эфире">
            Онлайн <span className="text-dota-red">Трансляции</span>
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {STREAMS.map((stream) => (
              <motion.div
                key={stream.id}
                variants={fadeInUp}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-dota-red/50 transition-all">
                  <div className="relative aspect-video">
                    <img src={stream.thumbnail} alt={stream.streamer} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dota-dark via-transparent to-transparent opacity-60" />
                    
                    {/* Live Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded text-xs font-bold text-white live-pulse">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        LIVE
                      </span>
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-semibold text-white">
                        {stream.platform}
                      </span>
                    </div>
                    
                    {/* Viewers */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-semibold text-white">
                      <SafeIcon name="eye" size={12} />
                      {(stream.viewers / 1000).toFixed(1)}K
                    </div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-dota-red/90 rounded-full flex items-center justify-center backdrop-blur-sm glow-red">
                        <SafeIcon name="play" size={28} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-dota-gray">
                    <h4 className="font-bold text-white mb-1 truncate group-hover:text-dota-red transition-colors">{stream.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-dota-accent font-semibold">{stream.streamer}</span>
                      <span className="text-gray-500">Dota 2</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Forum Section */}
      <section ref={forumRef} className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <SectionTitle subtitle="Обсуждайте стратегии, делитесь опытом и находите тиммейтов">
            Форум <span className="text-dota-red">Сообщества</span>
          </SectionTitle>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-dota-gray rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Forum Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {['Все темы', 'Обсуждение', 'Гайды', 'Техподдержка', 'Поиск игроков'].map((tab, i) => (
                  <button
                    key={tab}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
                      i === 0 
                        ? "bg-dota-red text-white" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="bg-dota-red hover:bg-dota-red/80 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
                <SafeIcon name="plus" size={16} />
                Новая тема
              </button>
            </div>
            
            {/* Topics List */}
            <div className="divide-y divide-white/5">
              {FORUM_TOPICS.map((topic) => (
                <div key={topic.id} className="p-4 md:p-6 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded bg-dota-blue/20 text-dota-blue text-xs font-bold">
                          {topic.category}
                        </span>
                        <h4 className="font-bold text-white hover:text-dota-red transition-colors">{topic.title}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <SafeIcon name="user" size={14} />
                          {topic.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <SafeIcon name="message-square" size={14} />
                          {topic.replies} ответов
                        </span>
                        <span className="flex items-center gap-1">
                          <SafeIcon name="eye" size={14} />
                          {topic.views} просмотров
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Последний ответ</div>
                        <div className="text-sm text-dota-accent font-semibold">{topic.lastReply}</div>
                      </div>
                      <SafeIcon name="chevron-right" size={20} className="text-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10 text-center">
              <button className="text-dota-red font-semibold hover:text-dota-accent transition-colors">
                Загрузить ещё темы
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dota-red/20 via-dota-purple/10 to-dota-accent/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-dota-red/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dota-accent/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Готовы поднять свой <span className="gradient-text">рейтинг?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам игроков, которые уже используют нашу платформу для достижения новых высот в Dota 2
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-dota-red to-dota-accent hover:opacity-90 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 glow-red flex items-center justify-center gap-2">
                <SafeIcon name="zap" size={20} />
                Начать бесплатно
              </button>
              <button className="bg-dota-gray hover:bg-dota-gray/80 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all border border-white/20 hover:border-dota-red/50 flex items-center justify-center gap-2">
                <SafeIcon name="help-circle" size={20} />
                Узнать больше
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dota-dark border-t border-white/10 py-12 px-4 md:px-6 lg:px-8 telegram-safe-bottom">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-dota-red to-dota-accent rounded-lg flex items-center justify-center">
                  <SafeIcon name="shield" size={24} className="text-white" />
                </div>
                <span className="text-xl font-black text-white">
                  DOTA<span className="text-dota-red">2</span> PRO
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Профессиональная платформа для опытных игроков Dota 2. Гайды, статистика, калькуляторы и живое сообщество.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => scrollToSection(heroesRef)} className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="sword" size={14} />Герои</button></li>
                <li><button onClick={() => scrollToSection(newsRef)} className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="calendar" size={14} />Новости</button></li>
                <li><button onClick={() => scrollToSection(statsRef)} className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="trophy" size={14} />Статистика</button></li>
                <li><button onClick={() => scrollToSection(calculatorRef)} className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="calculator" size={14} />Калькулятор</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Сообщество</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => scrollToSection(streamsRef)} className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="video" size={14} />Трансляции</button></li>
                <li><button onClick={() => scrollToSection(forumRef)} className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="message-square" size={14} />Форум</button></li>
                <li><a href="#" className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="message-circle" size={14} />Discord</a></li>
                <li><a href="#" className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="send" size={14} />Telegram</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="help-circle" size={14} />Помощь</a></li>
                <li><a href="#" className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="message-circle" size={14} />FAQ</a></li>
                <li><a href="#" className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="mail" size={14} />Контакты</a></li>
                <li><a href="#" className="hover:text-dota-red transition-colors flex items-center gap-2"><SafeIcon name="star" size={14} />Отзывы</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm flex items-center gap-2">
              <SafeIcon name="shield-check" size={16} />
              © 2025 Dota 2 Pro Hub. Все права защищены.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-dota-red transition-colors">
                <SafeIcon name="message-circle" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-dota-red transition-colors">
                <SafeIcon name="video" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-dota-red transition-colors">
                <SafeIcon name="share-2" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-80 md:w-96 bg-dota-gray rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-dota-red to-dota-accent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon name="bot" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Dota Assistant</div>
                    <div className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Онлайн
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <SafeIcon name="x" size={18} />
                </button>
              </div>
              
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <SafeIcon name="message-square" size={32} className="mx-auto mb-3 opacity-50" />
                    <p>Задайте вопрос о героях, сборках или патчах!</p>
                    <div className="mt-4 space-y-2">
                      {['Какой патч сейчас?', 'Лучшие герои для поднятия ММР', 'Гайд на Invoker'].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setChatInput(suggestion)
                            setTimeout(() => {
                              const fakeEvent = { preventDefault: () => {} }
                              handleChatSubmit(fakeEvent)
                            }, 100)
                          }}
                          className="block w-full px-3 py-2 bg-dota-dark rounded-lg text-left text-xs hover:bg-dota-red/20 hover:text-dota-red transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={cn("flex gap-3", msg.type === 'user' ? "flex-row-reverse" : "")}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      msg.type === 'user' ? "bg-dota-blue" : "bg-dota-red"
                    )}>
                      <SafeIcon name={msg.type === 'user' ? 'user' : 'bot'} size={14} className="text-white" />
                    </div>
                    <div className={cn(
                      "px-4 py-2 rounded-2xl max-w-[80%] text-sm",
                      msg.type === 'user' 
                        ? "bg-dota-blue/20 text-white rounded-br-sm" 
                        : "bg-dota-dark text-gray-300 rounded-bl-sm"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 bg-dota-dark rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-dota-red/50"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="w-10 h-10 bg-dota-red rounded-lg flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dota-red/80 transition-colors"
                >
                  <SafeIcon name="send" size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(!chatOpen)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all",
            chatOpen ? "bg-dota-gray text-white" : "bg-gradient-to-r from-dota-red to-dota-accent text-white glow-red"
          )}
        >
          <SafeIcon name={chatOpen ? "x" : "message-square"} size={24} />
        </motion.button>
      </div>
    </div>
  )
}

export default App