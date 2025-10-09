import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Home page (start page)
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },

  // Articles pages
  { path: '/articles', name: 'Articles', component: () => import('@/views/Articles.vue') },
  { path: '/articles/interactive', name: 'ArticlesInteractive', component: () => import('@/views/ArticlesInteractive.vue') },
  { path: '/articles/companies', name: 'ArticlesCompanies', component: () => import('@/views/ArticlesCompanies.vue') },
  { path: '/article/:id', name: 'FullArticle', component: () => import('@/views/FullArticle.vue'), props: true },

  // FAQ
  { path: '/faq', name: 'FAQ', component: () => import('@/views/FAQ.vue') },
  { path: '/faq/help', name: 'FAQHelp', component: () => import('@/views/FAQHelp.vue') },
  { path: '/faq/changes', name: 'FAQChanges', component: () => import('@/views/FAQChanges.vue') },
  { path: '/faq/keywords', name: 'FAQKeywords', component: () => import('@/views/FAQKeywords.vue') },
  { path: '/faq/user-ranks', name: 'FAQUserRanks', component: () => import('@/views/FAQUserRanks.vue') },
  { path: '/faq/clan-ranks', name: 'FAQClanRanks', component: () => import('@/views/FAQClanRanks.vue') },

  // Legal pages
  { path: '/legal/community-rules', name: 'LegalCommunityRules', component: () => import('@/views/LegalCommunityRules.vue') },
  { path: '/legal/content-rules', name: 'LegalContentRules', component: () => import('@/views/LegalContentRules.vue') },
  { path: '/legal/privacy-policy', name: 'LegalPrivacyPolicy', component: () => import('@/views/LegalPrivacyPolicy.vue') },
  { path: '/legal/terms-of-use', name: 'LegalTermsOfUse', component: () => import('@/views/LegalTermsOfUse.vue') },
  { path: '/legal/copyright-policy', name: 'LegalCopyrightPolicy', component: () => import('@/views/LegalCopyrightPolicy.vue') },
  { path: '/legal/security', name: 'LegalSecurity', component: () => import('@/views/LegalSecurity.vue') },
  { path: '/legal/another', name: 'LegalAnother', component: () => import('@/views/LegalAnother.vue') },

  // User pages
  { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
  { path: '/signin', name: 'SignIn', component: () => import('@/views/SignIn.vue') },
  { path: '/create-article', name: 'CreateArticle', component: () => import('@/views/CreateArticle.vue') },
  { path: '/your-articles', name: 'YourArticles', component: () => import('@/views/YourArticles.vue') },
  { path: '/stared-articles', name: 'StaredArticles', component: () => import('@/views/StaredArticles.vue') },
  { path: '/draft-articles', name: 'DraftArticles', component: () => import('@/views/DraftArticles.vue') },

  // Settings pages
  { path: '/settings/profile', name: 'SettingsProfile', component: () => import('@/views/SettingsProfile.vue') },
  { path: '/settings/appearance', name: 'SettingsAppearance', component: () => import('@/views/SettingsAppearance.vue') },
  { path: '/settings/privacy', name: 'SettingsPrivacy', component: () => import('@/views/SettingsPrivacy.vue') },
  { path: '/settings/subscription', name: 'SettingsSubscription', component: () => import('@/views/SettingsSubscription.vue') },
  { path: '/settings/sessions', name: 'SettingsSessions', component: () => import('@/views/SettingsSessions.vue') },
  { path: '/settings/support', name: 'SettingsSupport', component: () => import('@/views/SettingsSupport.vue') },
  { path: '/settings/another', name: 'SettingsAnother', component: () => import('@/views/SettingsAnother.vue') },

  // Additional pages
  { path: '/notifications', name: 'Notifications', component: () => import('@/views/Notifications.vue') },
  { path: '/news', name: 'News', component: () => import('@/views/News.vue') },
  { path: '/shop', name: 'Shop', component: () => import('@/views/Shop.vue') },
  { path: '/analytics', name: 'Analytics', component: () => import('@/views/Analytics.vue') },
  { path: '/balance', name: 'Balance', component: () => import('@/views/Balance.vue') },

    //test view for articles
    { path: '/test-article', name: 'TestArticle', component: () => import('@/views/TestArticle.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
