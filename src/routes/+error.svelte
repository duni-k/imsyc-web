<script>
  import "../app.css"
  import { page } from "$app/state"
</script>

<div class="container primary-palette">
  <div class="error-msg">
    <h1>Looks like something went wrong handling your request :(</h1>
    <p>Error message: {page.status} {page.error.message}</p>
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .error-msg {
    margin: auto var(--padding);
  }
</style>
