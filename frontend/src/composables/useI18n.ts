import { ref, computed } from 'vue'

// Типы для переводов
interface Translations {
  [key: string]: string
}

interface LanguageData {
  flag: string
  name: string
  code: string
}

// Доступные языки
export const languages: Record<string, LanguageData> = {
  'en': { flag: '🇺🇸', name: 'English', code: 'en' },
  'ru': { flag: '🇷🇺', name: 'Русский', code: 'ru' },
  'es': { flag: '🇪🇸', name: 'Español', code: 'es' },
  'fr': { flag: '🇫🇷', name: 'Français', code: 'fr' }
}

// Файлы переводов
const translations: Record<string, Translations> = {
  en: {
    // Navigation
    'nav.home': 'Start page',
    'nav.articles': 'Articles',
    'nav.interactive': 'Interactive',
    'nav.companies': 'Companies',
    'nav.faq': 'FAQ',
    'nav.help': 'Help',
    'nav.changes': 'Site changes',
    'nav.rules': 'Forum rules',
    'nav.profile': 'Profile',
    'nav.notifications': 'Notifications',
    'nav.stared': 'Stared articles',
    'nav.settings': 'Settings',
    'nav.articles.yours': 'Your articles',
    'nav.draft': 'Draft',
    'nav.analytics': 'Analytics',
    'nav.balance': 'Balance',
    'nav.subscription': 'Subscription',
    'nav.shop': 'Shop',
    'nav.signout': 'Sign out',
    
    // Pages
    'page.home.title': 'Aetheris',
    'page.home.subtitle': 'A community of IT developers, neural network scientists and ML engineers',
    'page.home.cta': 'Join our community to create!',
    'page.home.register': 'Register',
    'page.articles.title': 'Articles',
    'page.articles.search': 'Search anything',
    'page.articles.info': 'Article info',
    'page.articles.similar': 'Similar articles',
    'page.articles.date': 'Date:',
    'page.articles.likes': 'Likes:',
    'page.articles.views': 'Views:',
    'page.articles.comments': 'Comments:',
    'page.articles.symbols': 'Symbols:',
    'page.your-articles.title': 'Your articles',
    'page.analytics.title': 'Analytics',
    'page.balance.title': 'Balance',
    'page.development': 'This page in development now',
    
    // Settings
    'settings.appearance.title': 'Appearance',
    'settings.appearance.theme': 'Color theme',
    'settings.appearance.theme.subtitle': 'Choose your favorite color theme for this web-site',
    'settings.appearance.theme.system': 'System theme',
    'settings.appearance.theme.white': 'White',
    'settings.appearance.theme.aquamarine': 'Aquamarine',
    'settings.appearance.theme.dark': 'Dark',
    'settings.appearance.language': 'Language',
    'settings.appearance.language.subtitle': 'Choose your preferred language for the interface',
    'settings.appearance.font': 'Article font',
    'settings.appearance.font.subtitle': 'Choose a font that is convenient for you, which will be used in the article as the main one',
    'settings.appearance.font.select': 'Select font',
    'settings.appearance.font.preview': 'Example of text article. Here exist more different words,which can use in any article and news,science facts and another places',
    
    // Forms
    'form.signin.title': 'Sign in',
    'form.signin.nickname': 'Nickname',
    'form.signin.nickname.placeholder': 'Enter your nickname',
    'form.signin.email': 'Mail',
    'form.signin.email.placeholder': 'Enter your mail',
    'form.signin.password': 'Password',
    'form.signin.password.placeholder': 'Enter your password',
    'form.signin.submit': 'Sign in',
    'form.signin.login.link': 'Or log in',
    
    // Validation
    'validation.nickname.required': 'Nickname is required',
    'validation.nickname.length': 'Nickname must be no more than 50 characters',
    'validation.nickname.invalid': 'Nickname can only contain Latin letters, Cyrillic letters and spaces',
    'validation.email.required': 'Email is required',
    'validation.email.invalid': 'Email must contain @',
    'validation.password.required': 'Password is required',
    'validation.password.length': 'Password must be at least 6 characters',
    'validation.password.invalid': 'Password is invalid (printable ASCII, max 48)',
    'validation.bio.length': 'Bio must be no more than 300 characters',
    
    // Common
    'common.unknown': 'unknown',
    'common.same.article': 'same article'
  },
  
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.articles': 'Статьи',
    'nav.interactive': 'Интерактив',
    'nav.companies': 'Компании',
    'nav.faq': 'FAQ',
    'nav.help': 'Помощь',
    'nav.changes': 'Изменения сайта',
    'nav.rules': 'Правила форума',
    'nav.profile': 'Профиль',
    'nav.notifications': 'Уведомления',
    'nav.stared': 'Избранные статьи',
    'nav.settings': 'Настройки',
    'nav.articles.yours': 'Ваши статьи',
    'nav.draft': 'Черновики',
    'nav.analytics': 'Аналитика',
    'nav.balance': 'Баланс',
    'nav.subscription': 'Подписка',
    'nav.shop': 'Магазин',
    'nav.signout': 'Выйти',
    
    // Pages
    'page.home.title': 'Aetheris',
    'page.home.subtitle': 'Сообщество IT-разработчиков, ученых нейронных сетей и ML-инженеров',
    'page.home.cta': 'Присоединяйтесь к нашему сообществу для создания!',
    'page.home.register': 'Регистрация',
    'page.articles.title': 'Статьи',
    'page.articles.search': 'Поиск по всему',
    'page.articles.info': 'Информация о статье',
    'page.articles.similar': 'Похожие статьи',
    'page.articles.date': 'Дата:',
    'page.articles.likes': 'Лайки:',
    'page.articles.views': 'Просмотры:',
    'page.articles.comments': 'Комментарии:',
    'page.articles.symbols': 'Символы:',
    'page.your-articles.title': 'Ваши статьи',
    'page.analytics.title': 'Аналитика',
    'page.balance.title': 'Баланс',
    'page.development': 'Эта страница в разработке',
    
    // Settings
    'settings.appearance.title': 'Внешний вид',
    'settings.appearance.theme': 'Цветовая тема',
    'settings.appearance.theme.subtitle': 'Выберите любимую цветовую тему для этого веб-сайта',
    'settings.appearance.theme.system': 'Системная тема',
    'settings.appearance.theme.white': 'Белая',
    'settings.appearance.theme.aquamarine': 'Аквамариновая',
    'settings.appearance.theme.dark': 'Темная',
    'settings.appearance.language': 'Язык',
    'settings.appearance.language.subtitle': 'Выберите предпочитаемый язык для интерфейса',
    'settings.appearance.font': 'Шрифт статей',
    'settings.appearance.font.subtitle': 'Выберите удобный для вас шрифт, который будет использоваться в статьях как основной',
    'settings.appearance.font.select': 'Выбрать шрифт',
    'settings.appearance.font.preview': 'Пример текста статьи. Здесь есть много разных слов, которые можно использовать в любой статье и новостях, научных фактах и других местах',
    
    // Forms
    'form.signin.title': 'Регистрация',
    'form.signin.nickname': 'Никнейм',
    'form.signin.nickname.placeholder': 'Введите ваш никнейм',
    'form.signin.email': 'Почта',
    'form.signin.email.placeholder': 'Введите вашу почту',
    'form.signin.password': 'Пароль',
    'form.signin.password.placeholder': 'Введите ваш пароль',
    'form.signin.submit': 'Зарегистрироваться',
    'form.signin.login.link': 'Или войти',
    
    // Validation
    'validation.nickname.required': 'Никнейм обязателен',
    'validation.nickname.length': 'Никнейм должен быть не более 50 символов',
    'validation.nickname.invalid': 'Никнейм может содержать только латинские буквы, кириллицу и пробелы',
    'validation.email.required': 'Почта обязательна',
    'validation.email.invalid': 'Почта должна содержать @',
    'validation.password.required': 'Пароль обязателен',
    'validation.password.length': 'Пароль должен быть не менее 6 символов',
    'validation.password.invalid': 'Пароль неверен (печатные ASCII, макс 48)',
    'validation.bio.length': 'Описание должно быть не более 300 символов',
    
    // Common
    'common.unknown': 'неизвестно',
    'common.same.article': 'та же статья'
  },
  
  es: {
    // Navigation
    'nav.home': 'Página de inicio',
    'nav.articles': 'Artículos',
    'nav.interactive': 'Interactivo',
    'nav.companies': 'Empresas',
    'nav.faq': 'FAQ',
    'nav.help': 'Ayuda',
    'nav.changes': 'Cambios del sitio',
    'nav.rules': 'Reglas del foro',
    'nav.profile': 'Perfil',
    'nav.notifications': 'Notificaciones',
    'nav.stared': 'Artículos favoritos',
    'nav.settings': 'Configuración',
    'nav.articles.yours': 'Tus artículos',
    'nav.draft': 'Borrador',
    'nav.analytics': 'Analíticas',
    'nav.balance': 'Saldo',
    'nav.subscription': 'Suscripción',
    'nav.shop': 'Tienda',
    'nav.signout': 'Cerrar sesión',
    
    // Pages
    'page.home.title': 'Aetheris',
    'page.home.subtitle': 'Una comunidad de desarrolladores de TI, científicos de redes neuronales e ingenieros de ML',
    'page.home.cta': '¡Únete a nuestra comunidad para crear!',
    'page.home.register': 'Registrarse',
    'page.articles.title': 'Artículos',
    'page.articles.search': 'Buscar cualquier cosa',
    'page.articles.info': 'Información del artículo',
    'page.articles.similar': 'Artículos similares',
    'page.articles.date': 'Fecha:',
    'page.articles.likes': 'Me gusta:',
    'page.articles.views': 'Vistas:',
    'page.articles.comments': 'Comentarios:',
    'page.articles.symbols': 'Símbolos:',
    'page.your-articles.title': 'Tus artículos',
    'page.analytics.title': 'Analíticas',
    'page.balance.title': 'Saldo',
    'page.development': 'Esta página está en desarrollo',
    
    // Settings
    'settings.appearance.title': 'Apariencia',
    'settings.appearance.theme': 'Tema de color',
    'settings.appearance.theme.subtitle': 'Elige tu tema de color favorito para este sitio web',
    'settings.appearance.theme.system': 'Tema del sistema',
    'settings.appearance.theme.white': 'Blanco',
    'settings.appearance.theme.aquamarine': 'Aguamarina',
    'settings.appearance.theme.dark': 'Oscuro',
    'settings.appearance.language': 'Idioma',
    'settings.appearance.language.subtitle': 'Elige tu idioma preferido para la interfaz',
    'settings.appearance.font': 'Fuente del artículo',
    'settings.appearance.font.subtitle': 'Elige una fuente que te sea conveniente, que se usará en el artículo como principal',
    'settings.appearance.font.select': 'Seleccionar fuente',
    'settings.appearance.font.preview': 'Ejemplo de texto de artículo. Aquí existen más palabras diferentes, que se pueden usar en cualquier artículo y noticias, hechos científicos y otros lugares',
    
    // Forms
    'form.signin.title': 'Registrarse',
    'form.signin.nickname': 'Apodo',
    'form.signin.nickname.placeholder': 'Ingresa tu apodo',
    'form.signin.email': 'Correo',
    'form.signin.email.placeholder': 'Ingresa tu correo',
    'form.signin.password': 'Contraseña',
    'form.signin.password.placeholder': 'Ingresa tu contraseña',
    'form.signin.submit': 'Registrarse',
    'form.signin.login.link': 'O iniciar sesión',
    
    // Validation
    'validation.nickname.required': 'El apodo es obligatorio',
    'validation.nickname.length': 'El apodo debe tener máximo 50 caracteres',
    'validation.nickname.invalid': 'El apodo solo puede contener letras latinas, cirílicas y espacios',
    'validation.email.required': 'El correo es obligatorio',
    'validation.email.invalid': 'El correo debe contener @',
    'validation.password.required': 'La contraseña es obligatoria',
    'validation.password.length': 'La contraseña debe tener al menos 6 caracteres',
    'validation.password.invalid': 'La contraseña es inválida (ASCII imprimible, máx 48)',
    'validation.bio.length': 'La biografía debe tener máximo 300 caracteres',
    
    // Common
    'common.unknown': 'desconocido',
    'common.same.article': 'mismo artículo'
  },
  
  fr: {
    // Navigation
    'nav.home': 'Page d\'accueil',
    'nav.articles': 'Articles',
    'nav.interactive': 'Interactif',
    'nav.companies': 'Entreprises',
    'nav.faq': 'FAQ',
    'nav.help': 'Aide',
    'nav.changes': 'Changements du site',
    'nav.rules': 'Règles du forum',
    'nav.profile': 'Profil',
    'nav.notifications': 'Notifications',
    'nav.stared': 'Articles favoris',
    'nav.settings': 'Paramètres',
    'nav.articles.yours': 'Vos articles',
    'nav.draft': 'Brouillon',
    'nav.analytics': 'Analytiques',
    'nav.balance': 'Solde',
    'nav.subscription': 'Abonnement',
    'nav.shop': 'Boutique',
    'nav.signout': 'Se déconnecter',
    
    // Pages
    'page.home.title': 'Aetheris',
    'page.home.subtitle': 'Une communauté de développeurs IT, de scientifiques en réseaux de neurones et d\'ingénieurs ML',
    'page.home.cta': 'Rejoignez notre communauté pour créer !',
    'page.home.register': 'S\'inscrire',
    'page.articles.title': 'Articles',
    'page.articles.search': 'Rechercher n\'importe quoi',
    'page.articles.info': 'Informations sur l\'article',
    'page.articles.similar': 'Articles similaires',
    'page.articles.date': 'Date :',
    'page.articles.likes': 'J\'aime :',
    'page.articles.views': 'Vues :',
    'page.articles.comments': 'Commentaires :',
    'page.articles.symbols': 'Symboles :',
    'page.your-articles.title': 'Vos articles',
    'page.analytics.title': 'Analytiques',
    'page.balance.title': 'Solde',
    'page.development': 'Cette page est en développement',
    
    // Settings
    'settings.appearance.title': 'Apparence',
    'settings.appearance.theme': 'Thème de couleur',
    'settings.appearance.theme.subtitle': 'Choisissez votre thème de couleur préféré pour ce site web',
    'settings.appearance.theme.system': 'Thème système',
    'settings.appearance.theme.white': 'Blanc',
    'settings.appearance.theme.aquamarine': 'Aigue-marine',
    'settings.appearance.theme.dark': 'Sombre',
    'settings.appearance.language': 'Langue',
    'settings.appearance.language.subtitle': 'Choisissez votre langue préférée pour l\'interface',
    'settings.appearance.font': 'Police d\'article',
    'settings.appearance.font.subtitle': 'Choisissez une police qui vous convient, qui sera utilisée dans l\'article comme principale',
    'settings.appearance.font.select': 'Sélectionner la police',
    'settings.appearance.font.preview': 'Exemple de texte d\'article. Ici existent plus de mots différents, qui peuvent être utilisés dans n\'importe quel article et actualités, faits scientifiques et autres endroits',
    
    // Forms
    'form.signin.title': 'S\'inscrire',
    'form.signin.nickname': 'Pseudonyme',
    'form.signin.nickname.placeholder': 'Entrez votre pseudonyme',
    'form.signin.email': 'Mail',
    'form.signin.email.placeholder': 'Entrez votre mail',
    'form.signin.password': 'Mot de passe',
    'form.signin.password.placeholder': 'Entrez votre mot de passe',
    'form.signin.submit': 'S\'inscrire',
    'form.signin.login.link': 'Ou se connecter',
    
    // Validation
    'validation.nickname.required': 'Le pseudonyme est obligatoire',
    'validation.nickname.length': 'Le pseudonyme doit faire maximum 50 caractères',
    'validation.nickname.invalid': 'Le pseudonyme ne peut contenir que des lettres latines, cyrilliques et des espaces',
    'validation.email.required': 'Le mail est obligatoire',
    'validation.email.invalid': 'Le mail doit contenir @',
    'validation.password.required': 'Le mot de passe est obligatoire',
    'validation.password.length': 'Le mot de passe doit faire au moins 6 caractères',
    'validation.password.invalid': 'Le mot de passe est invalide (ASCII imprimable, max 48)',
    'validation.bio.length': 'La biographie doit faire maximum 300 caractères',
    
    // Common
    'common.unknown': 'inconnu',
    'common.same.article': 'même article'
  }
}

// Состояние текущего языка
const currentLanguage = ref<string>('en')

// Composable для интернационализации
export function useI18n() {
  // Получение перевода
  const t = (key: string): string => {
    const lang = currentLanguage.value
    return translations[lang]?.[key] || translations['en']?.[key] || key
  }

  // Смена языка
  const setLanguage = (language: string) => {
    if (languages[language]) {
      currentLanguage.value = language
      localStorage.setItem('preferred-language', language)
      // Здесь можно добавить вызов API для сохранения предпочтений пользователя
      console.log('Language changed to:', language)
    }
  }

  // Получение текущего языка
  const getCurrentLanguage = computed(() => currentLanguage.value)

  // Получение данных текущего языка
  const getCurrentLanguageData = computed(() => languages[currentLanguage.value])

  // Инициализация языка из localStorage
  const initLanguage = () => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && languages[savedLanguage]) {
      currentLanguage.value = savedLanguage
    } else {
      // Определение языка браузера
      const browserLanguage = navigator.language.split('-')[0]
      if (languages[browserLanguage]) {
        currentLanguage.value = browserLanguage
      }
    }
  }

  return {
    t,
    setLanguage,
    getCurrentLanguage,
    getCurrentLanguageData,
    initLanguage,
    languages
  }
}
