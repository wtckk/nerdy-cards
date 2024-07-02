<template>
  <footer>
    <div class="footer-block">
      <div class="block-btns">
        <RouterLink to="/about"><UButton>О компании</UButton></RouterLink>
        <RouterLink to="/advertising"><UButton>Реклама</UButton></RouterLink>
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
  background-color: var(--dark-purple);
}

.footer-block {
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  padding: 12px 0;
  font-size: 14px;
}
</style>
