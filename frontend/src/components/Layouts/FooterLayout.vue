<template>
  <footer>
    <div class="footer-block">
      <div class="block-btns">
        <button class="btn">О компании</button>
        <button class="btn">Реклама</button>
        <button class="btn">Поддержка</button>
      </div>
      <div class="block-social">
        <img src="/social/telegram.svg" alt="telegram" />

        <img src="/social/VK.svg" alt="VK" />
      </div>
    </div>
    <div class="footer-tag">
      <span>@Nerdy cards</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  color: var(--text-purple);
}

.footer-block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--dark-purple);
  padding: 36px 50px;
}

.block-social,
.block-btns {
  display: flex;
  align-items: center;
  gap: 12px;
}

.block-btns button {
  color: var(--dark-purple);
}

.block-social img {
  background-color: var(--basic-purple);
  border-radius: 12px;
  padding: 6px;
  cursor: pointer;
}

.footer-tag {
  text-align: center;
  padding: 24px 0;
  font-size: 24px;
}
</style>
