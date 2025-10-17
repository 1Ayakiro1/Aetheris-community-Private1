<template>
  <div class="legal-community-rules-container">
    <!-- Body -->
    <h2 class="page-title">Site Policy Page</h2>
    <div class="content-wrapper">
      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Legal block -->
        <div class="sidebar-block legal-block">
          <h3 class="block-title">Legal</h3>
          <div class="button-column">
            <router-link to="/legal/content-rules">
              <button class="sidebar-button">Content rules</button>
            </router-link>
            <router-link to="/legal/terms-of-use">
              <button class="sidebar-button">Terms of use</button>
            </router-link>
            <router-link to="/legal/copyright-policy">
              <button class="sidebar-button">Copyright policy</button>
            </router-link>
            <router-link to="/legal/another">
              <button class="sidebar-button">Another</button>
            </router-link>
          </div>
        </div>
        
        <!-- Community rules block -->
        <div class="sidebar-block community-block">
          <router-link to="/legal/community-rules">
            <button class="sidebar-button">Community rules</button>
          </router-link>
        </div>
        
        <!-- Security block -->
        <div class="sidebar-block security-block">
          <h3 class="block-title">Security</h3>
          <div class="button-column">
            <router-link to="/legal/privacy-policy">
              <button class="sidebar-button">Privacy Policy</button>
            </router-link>
            <router-link to="/legal/security">
              <button class="sidebar-button">Another</button>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <div class="content-block">
          <div class="legal-content">
            <h1 class="content-title">Правила сообщества Aetheris Community</h1>
            <p class="last-updated">Последнее обновление: {{ new Date().toLocaleDateString('ru-RU') }}</p>
            
            <section class="legal-section">
              <h2>1. Философия сообщества</h2>
              <p>Aetheris Community — это место для профессионального роста, обмена знаниями и конструктивного общения. Мы стремимся создать инклюзивную среду, где каждый может учиться, делиться опытом и развиваться вместе с сообществом.</p>
            </section>

            <section class="legal-section">
              <h2>2. Основные принципы</h2>
              <ul>
                <li><strong>Уважение:</strong> Относитесь к другим участникам с уважением и пониманием</li>
                <li><strong>Конструктивность:</strong> Ведите дискуссии в позитивном ключе</li>
                <li><strong>Профессионализм:</strong> Поддерживайте высокие стандарты общения</li>
                <li><strong>Открытость:</strong> Будьте готовы к обучению и обмену опытом</li>
                <li><strong>Толерантность:</strong> Принимайте различные точки зрения и подходы</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>3. Правила общения</h2>
              <h3>3.1 Разрешенное поведение:</h3>
              <ul>
                <li>Конструктивная критика с предложениями по улучшению</li>
                <li>Вопросы для уточнения и понимания</li>
                <li>Обмен опытом и знаниями</li>
                <li>Поддержка других участников</li>
                <li>Профессиональные дискуссии</li>
              </ul>
              
              <h3>3.2 Запрещенное поведение:</h3>
              <ul>
                <li>Оскорбления, угрозы или унижения</li>
                <li>Дискриминация по любым признакам</li>
                <li>Спам или нежелательная реклама</li>
                <li>Троллинг или провокации</li>
                <li>Распространение ложной информации</li>
                <li>Нарушение конфиденциальности</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>4. Модерация и управление</h2>
              <p>Наша команда модерации обеспечивает соблюдение правил:</p>
              <ul>
                <li>Активное наблюдение за обсуждениями</li>
                <li>Реагирование на жалобы пользователей</li>
                <li>Предупреждения о нарушениях</li>
                <li>Временные и постоянные ограничения</li>
                <li>Объяснение решений модерации</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>5. Система репутации</h2>
              <p>Мы используем систему репутации для поощрения качественного участия:</p>
              <ul>
                <li>Положительные оценки за полезный контент</li>
                <li>Бонусы за помощь другим участникам</li>
                <li>Признание экспертизы в определенных областях</li>
                <li>Дополнительные привилегии для активных участников</li>
                <li>Прозрачная система начисления очков</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>6. Разрешение конфликтов</h2>
              <p>При возникновении конфликтов:</p>
              <ul>
                <li>Попробуйте решить вопрос напрямую с участником</li>
                <li>Обратитесь к модераторам при необходимости</li>
                <li>Предоставьте конкретные примеры нарушений</li>
                <li>Будьте готовы к конструктивному диалогу</li>
                <li>Соблюдайте решения модерации</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>7. Конфиденциальность и безопасность</h2>
              <p>Защищайте конфиденциальность сообщества:</p>
              <ul>
                <li>Не делитесь личной информацией других участников</li>
                <li>Сообщайте о подозрительной активности</li>
                <li>Используйте надежные пароли</li>
                <li>Не передавайте доступ к своему аккаунту</li>
                <li>Соблюдайте правила обработки данных</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>8. Интеллектуальная собственность</h2>
              <p>Уважайте права интеллектуальной собственности:</p>
              <ul>
                <li>Не копируйте контент без разрешения</li>
                <li>Указывайте источники при цитировании</li>
                <li>Используйте открытые лицензии</li>
                <li>Сообщайте о нарушениях авторских прав</li>
                <li>Создавайте оригинальный контент</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>9. Специальные программы</h2>
              <p>Участвуйте в программах сообщества:</p>
              <ul>
                <li>Программа наставничества</li>
                <li>Технические воркшопы</li>
                <li>Конкурсы и челленджи</li>
                <li>Исследовательские проекты</li>
                <li>Волонтерские инициативы</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>10. Нарушения и санкции</h2>
              <p>При нарушении правил могут применяться:</p>
              <ul>
                <li>Предупреждение с объяснением нарушения</li>
                <li>Временное ограничение функций аккаунта</li>
                <li>Временная блокировка (1-30 дней)</li>
                <li>Постоянная блокировка при повторных нарушениях</li>
                <li>Удаление контента, нарушающего правила</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>11. Обжалование решений</h2>
              <p>Если вы не согласны с решением модерации:</p>
              <ul>
                <li>Подайте апелляцию в течение 7 дней</li>
                <li>Предоставьте доказательства своей правоты</li>
                <li>Обратитесь к старшему модератору</li>
                <li>Будьте готовы к дополнительному расследованию</li>
                <li>Примите окончательное решение</li>
              </ul>
            </section>

            <section class="legal-section">
              <h2>12. Контактная информация</h2>
              <p>По вопросам сообщества обращайтесь: community@aetheris-community.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.legal-community-rules-container {
  width: 100%; max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 370px;
  height: 655px; 
}

.sidebar-block {
  background-color: var(--bg-secondary);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  width: 370px;
    
  &.legal-block {
    height: 330px;
  }
  
  &.community-block {
    align-items: center;
    height: 84px;
  }
  
  &.security-block {
    padding: 16px;
    height: 221px;
  }
}

.block-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  margin-top: 16px;
  margin-left: 48px;
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin-top: 8px;
  
  .security-block & {
    gap: 10px;
    margin-top: 16px;
  }
}

.sidebar-button {
  width: 300px;
  height: 56px;
  background-color: rgba(67, 73, 86, 0);
  border: none;
  border-radius: 15px;
  color: var(--text-primary);
  font-size: 23px;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(67, 73, 86, 1);
  }
  
  .community-block & {
    margin-top: 16px;
  }
}

.content {
  display: flex;
  justify-content: center;
}

.content-block {
  width: 1000px;
  height: 655px;
  background-color: var(--bg-secondary);
  border-radius: 20px;
  padding: 30px;
  overflow-y: auto;
}

.legal-content {
  color: var(--text-primary);
  line-height: 1.6;
  font-family: var(--font-sans-serif);
}

.content-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-family: var(--font-sans-serif);
}

.last-updated {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-style: italic;
  font-family: var(--font-sans-serif);
}

.legal-section {
  margin-bottom: 25px;
}

.legal-section h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-family: var(--font-sans-serif);
}

.legal-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0 8px 0;
  color: var(--text-primary);
  font-family: var(--font-sans-serif);
}

.legal-section p {
  margin-bottom: 10px;
  color: var(--text-primary);
  font-family: var(--font-sans-serif);
}

.legal-section ul {
  margin: 10px 0;
  padding-left: 20px;
}

.legal-section li {
  margin-bottom: 5px;
  color: var(--text-primary);
  font-family: var(--font-sans-serif);
}

.legal-section strong {
  font-weight: bold;
  color: var(--text-primary);
  font-family: var(--font-sans-serif);
}
</style>