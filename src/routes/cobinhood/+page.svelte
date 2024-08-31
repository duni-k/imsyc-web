<script>
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"
  import Overview from "$lib/Overview.svelte"
</script>

<WorkTitleLanding
  year="2018"
  company="cobinhood"
  subtitle="Unleashing the imagination of personal finance"
  image="/images/cobinhood/cobinhood-showcase.png"
/>

<div class="workpage-container extended-palette">
  <Overview
    content={{
      domains: ["Experience design", "Service design"],
      bread: [
        "In 2018, COBINHOOD exchange was once ranked global top 8 and profited from its ICO service. However, bitcoin's value suddenly dropped and brought the entire market into depression.",
        "The company needed a new profitable business strategy to get through the bear market."
      ]
    }}
  />

  <div class="dual">
    <img
      src="/images/cobinhood/cobinhood-dual--left.png"
      style="grid-area: left;"
      alt="work sample"
    />
    <img
      src="/images/cobinhood/cobinhood-dual--right.png"
      style="grid-area: right;"
      alt="work sample"
    />
  </div>

  <h1 class="headline-left" style="margin:auto">know before you jump</h1>
  <div class="overview-container-left" style="margin: auto;">
    <p class="overview" style="padding-bottom: 16px;">
      Through data analysis, I made three significant findings about user
      behaviour. These findings shed light on user engagement with our platform
      and provide insights into potential strategies for improving retention
      rates:
    </p>
    <ol class="overview list">
      <li>
        Deposit behaviour is strongly correlated with retention rates. This
        indicates that users who trust the platform enough to deposit money are
        more likely to remain active and engaged with the services.
      </li>
      <li>
        A staggering 75% of registered users had not completed a deposit. This
        suggests that there were possible obstacles preventing users from
        completing the deposit process, which could be addressed through
        targeted activation and encouragement campaigns.
      </li>
      <li>
        Only 10% of users had completed an order, which suggested that even
        users who had deposited money on the platform may still have been
        uncertain about how to use it effectively.
      </li>
    </ol>
    <p class="overview" style="padding-bottom: 32px;">
      Based on these findings, it is clear that there is significant interest in
      cryptocurrency among the user base, as evidenced by the high volume of web
      traffic and registered users. However, it is also clear that users are
      facing barriers that prevent them from engaging fully with our platform.
      By identifying and addressing these barriers, we can improve user
      engagement, increase retention rates, and unlock the full potential of the
      platform.
    </p>
  </div>

  <img src="/images/cobinhood/cobinhood-personas.png" />

  <div class="overview-container-left">
    <p class="overview">
      After identifying key user behaviours, I sought to gain a deeper
      understanding of the underlying motivations and pain points behind these
      behaviours. To this end, I conducted a series of 35 customer interviews to
      identify six distinct personas: "technology pro," "technology enthusiast,"
      "future expert," "investment follower," and "lazy newbie."
      <br /><br />Through these interviews, I discovered that investment
      followers and lazy newbies represented a significant portion of the 75% of
      registered users who had not completed a deposit. These users were
      deterred by low risk tolerance and a lack of domain knowledge, which left
      them unsure about how to make informed decisions.
      <br /><br />To address these concerns, our new business model will focus
      on activating and engaging these two personas through targeted education
      and support. By providing them with the knowledge and tools they need to
      make informed decisions, we can help them overcome their fears and become
      active participants in the exciting world of cryptocurrency trading.
    </p>
  </div>

  <img src="/images/cobinhood/cobinhood-personas2.png" />

  <h1 class="headline-left">the result</h1>

  <p class="summary">
    By tailoring our recommendations to the unique needs and preferences of each
    user, we can help them overcome their fear of risk and lack of domain
    knowledge, and provide them with the confidence and support they need to
    make informed investment decisions. Through this test project, we aim to
    create a user-friendly and engaging platform that not only provides users
    with valuable investment insights but also makes them feel empowered and
    motivated to take action. By putting our users' needs and preferences at the
    centre of our platform, we can build a loyal and engaged community of
    cryptocurrency traders who are passionate about our brand and services.
  </p>
  <p class="summary">
    To address the key pain points identified in our user interviews, I have
    initiated a test project aimed at helping users identify their trading
    preferences and providing them with a customised investment strategy. This
    strategy takes into account not only what users should do, but also how
    these investment suggestions are presented to them in a tone that is
    comfortable and engaging.
  </p>

  <img src="/images/cobinhood/cobinhood-tail.png" />
</div>
