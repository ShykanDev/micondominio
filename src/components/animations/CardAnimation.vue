<style scoped>
  .card {
    --gray: rgba(229, 231, 235, 1);
    width: 350px;
    height: 13rem;
    display: flex;
    grid-gap: 1.25rem;
    gap: 1.25rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 1);
    padding: 1.5rem;
  }

  .card-1 {
    width: 40%;
    border-radius: 0.75rem;
    background-color: var(--gray);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) alternate-reverse infinite;
  }

  .right {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    grid-gap: 1.25rem;
    gap: 1.25rem;
  }

  .card-2 {
    height: 3.5rem;
    width: 100%;
    border-radius: 1rem;
    background-color: var(--gray);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) alternate-reverse infinite;
  }

  .card-3 {
    height: 0.75rem;
    width: 100%;
    border-radius: 1rem;
    background-color: var(--gray);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) alternate-reverse infinite;
  }

  .bottom {
    margin-top: auto;
    display: flex;
    grid-gap: 0.75rem;
    gap: 0.75rem;
  }

  .card-4 {
    height: 2rem;
    width: 33%;
    border-radius: 9999px;
    background-color: var(--gray);
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) alternate-reverse infinite;
  }

  @keyframes pulse {
    to {
      opacity: .2;
    }
  }
</style>

<template>
  <div class="card">
      <div class="card-1">
      </div>
      <div class="right">
              <div class="card-2">
              </div>
              <div class="card-3">
              </div>
              <div class="card-3">
              </div>
              <div class="card-3">
              </div>
              <div class="card-3">
          </div>
          <div class="bottom">
              <div class="card-4">
              </div>
              <div class="card-4">
              </div>
              <div class="card-4">
              </div>
          </div>
      </div>
  </div>
</template>
