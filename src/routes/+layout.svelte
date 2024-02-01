<script>
  import "../app.css";

  import NavBar from "$lib/NavBar.svelte"

  let workExpRoutes = [
    { text: "H&M GROUP", href: "/hmgroup" },
    { text: "FANTASY", href: "/fantasy" },
    { text: "COBINHOOD", href: "/cobinhood" },
    { text: "THSR", href: "/thsr" },
    { text: "MOTC x UMAJI", href: "/motcxu" },
    { text: "RAKUTEN", href: "/rakuten" },
  ]
</script>

<NavBar {workExpRoutes}/>

<slot />
