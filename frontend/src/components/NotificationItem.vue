<template>
  <div class="notification-item">
    <div class="logo_part">
        <div class="logo_circle"></div>
    </div>
    <div class="column_pos">
        <div class="main-info">
            <div class="info_block">
                <p class="nickname_field">Nickname</p>
                <p class="nickname_field_second">test1</p>
                <p class="nickname_field_third">test2</p>
            </div>
            <div class="state_read_dot"></div>
        </div>
    
        <div class="second_info">
            <p class="day">Today</p>
            <p class="time">10:00 am</p>
        </div>

        <div class="text_block">
            <p class="notification_text">Как говорится,один раз не пидарас,а вот уже второй раз...сомнительно,сомнительно все</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.notification-item {
  display: flex;
  gap: 16px;
  background-color: var(--bg-secondary);
  border-radius:30px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 12px;
  width: 40vw;
  height: 32vh;
}

.logo_part{
    height: 100%;
    width: 7vw;
}

.logo_circle{
    height: 70px;
    width: 70px;
    border-radius: 100%;
    background-color: aliceblue;
    margin-top: 20px;
    margin-left: 20px;
}

.column_pos{
    display: flex;
    width: 100%;
    flex-direction: column;
}

.main-info{
    height: 5vh;
    width: 100%;
    margin-top: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    
}

.info_block{
    display: flex;
    gap: 10px;
    flex-direction: row;
    
}

.nickname_field{
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-weight: bold;
    font-size: 23px
}

.nickname_field_second{
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-weight: bold;
    font-size: 23px
}

.nickname_field_third{
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-weight: bold;
    font-size: 23px
}

.state_read_dot{
    background-color: var(--primary-blue);   /*Если статья прочитана,то исчезает,просто замени на цвет на transparent */
    height: 20px;
    width: 20px;
    border-radius: 100%;
    margin-left: auto;
    margin-right: 40px;
}

.second_info{
    height: 2vh;
    gap: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.day{
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-weight: bold;
    font-size: 15px
}

.time{
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-weight: bold;
    font-size: 15px
}

.text_block{
    background-color: var(--btn-primary);
    border-radius: 20px;
    margin-top: 20px;
    height: 17vh;
    width: 29vw;
}

.notification_text{
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-weight: bold;
    margin-top: 15px;
    margin-left: 15px;
    font-size: 18px
}
</style>
