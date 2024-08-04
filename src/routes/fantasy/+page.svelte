<script>
  import Overview from "$lib/Overview.svelte"
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"
  import Carousel from "$lib/Carousel.svelte"

  let carouselImages = [
    { src: "/images/fantasy/fantasy-carousel1-1.png", alt: "worksample" },
    { src: "/images/fantasy/fantasy-carousel1-2.png", alt: "worksample" },
    { src: "/images/fantasy/fantasy-carousel1-3.png", alt: "worksample" },
    { src: "/images/fantasy/fantasy-carousel1-4.png", alt: "worksample" },
    { src: "/images/fantasy/fantasy-carousel1-5.png", alt: "worksample" }
  ]
</script>

<div class="workpage-container extended-palette">
  <WorkTitleLanding
    year="2021"
    company="fantasy"
    subtitle="Creating a premium digital experience"
    image="/images/fantasy/fantasy-showcase.png"
  />

  <Overview
    content={{
      domains: [
        "Landscape analysis",
        "Experience design",
        "Design principle",
        "Branding"
      ],
      bread: [
        "During my service at Fantasy, I held the position of lead experience expert on a brand revamp project with Honor, a Huawei-owned portfolio brand. In this role, I oversaw critical aspects of the project, such as user research, market research, design trend analysis, strategic roadmapping, and user experience design, with a particular focus on the operating system.",
        "To ensure the success of the project, I led a team of UX experts from across the US and UK, collaborating with the local team in China to develop the new operating system we were planning. I also conducted workshops to support our Chinese client in understanding and adopting our approach."
      ]
    }}
  />

  <h1 class="headline-right">the client</h1>
  <div class="overview-container-right">
    <h2 class="overview-headline">Honor</h2>
    <p class="overview">
      Honor" used to be a sub-brand of Huawei but due to the US trade ban, it
      had to be sold off to a new company. As a result, the brand was facing the
      challenge of rebuilding its recognition and reputation in the market as an
      independent brand. With many established players in the smartphone market,
      Honor needed to find a unique value proposition that can differentiate it
      from its competitors and establish a strong market position.
      <br /><br /> As a consulting agency, our objective was not only to provide
      a design solution but also to aid the brand in fostering a sustainable culture
      that can facilitate Honor's long-term brand development.
    </p>
  </div>

  <img src="/images/fantasy/fantasy-strategy.png" alt="strategy concept" />

  <h1 class="headline-left">the method</h1>

  <p class="summary">
    At Fantasy, we utilized a three-diamond structure to break down challenges
    into manageable checkpoints, ensuring close collaboration and feedback from
    our clients. Leading the UX team for the Honor brand revamp, I focused on
    gathering critical insights through a landscape review and user research. We
    analyzed seven key competitors by evaluating their user experiences and
    brand values, identifying market trends and positioning Honor strategically
    for future challenges.
    <br /><br />
    Our dual approach revealed each competitor's strengths and weaknesses, helping
    us predict future trends and define Honor's unique value proposition. These insights
    were instrumental in guiding the project's direction, enabling us to make informed
    design decisions that aligned with our client's goals and user needs.
  </p>

  <div class="dual">
    <img
      src="/images/fantasy/fantasy-dual--left.png"
      style="grid-area: left;"
      alt="work sample"
    />
    <img
      src="/images/fantasy/fantasy-dual--right.png"
      style="grid-area: right;"
      alt="work sample"
    />
  </div>

  <p class="summary">
    In the second phase of the project, we aimed to gather user insights and
    assess brand awareness through a comprehensive user research study. This
    included 36 user interviews, a mobile diary study where participants
    recorded their screens over four days, and an online survey with 400
    participants to prioritize needs within a statistically recognized sample
    size. We identified three key mindsets—Technophile, Utilitarian, and
    Loyalist—and assessed their needs in 12 areas, including overall experience,
    default apps, device interactions, and voice assistants. We also pinpointed
    10 scenarios and 15 visual hero apps to deliver Honor's new brand identity.
    <br /><br />
    Additionally, we evaluated brand awareness for Honor and its competitors, examining
    communication strategies, tone of voice, visual assets, and corporate social
    responsibility across various media. An online survey with over 1,200 respondents
    measured customer perceptions of brand values. Using these insights, we conducted
    three workshops with Honor's stakeholders, involving management, marketing, design,
    and development teams, to craft a brand that resonated with both customers and
    stakeholders. I was responsible for constructing research methods, defining goals,
    consolidating data, facilitating workshops, and client communication. Ultimately,
    we delivered over 500 slides and held more than 10 workshops, providing valuable
    insights that guided the project's direction and ensured alignment with client
    and user needs.
  </p>

  <img src="/images/fantasy/fantasy-brandvalue.png" alt="brandvalue"/>

  <p class="overview" style="margin: auto;">
    In our second phase, ideation, I led a series of workshops to develop and
    prototype new concepts that aligned with Honor's vision and the needs of the
    target audience. We employed various techniques, including design thinking,
    rapid prototyping, and user testing, to explore different ideas and validate
    them with real users. We began by defining design principles that would
    guide our process, focusing on simplicity, personalization, and consistency.
    These principles ensured we stayed focused on creating a cohesive,
    user-friendly experience across all devices.
  </p>

  <div class="dual">
    <img
      src="/images/fantasy/fantasy-dual2--left.png"
      style="grid-area: left;"
      alt="work sample"
    />
    <img
      src="/images/fantasy/fantasy-dual2--right.png"
      style="grid-area: right;"
      alt="work sample"
    />
  </div>

  <p class="overview" style="margin: auto; padding: 0 var(--padding) 0 var(--padding);">
    We then generated a wide range of ideas for features and interactions
    through brainstorming, sketching, and other ideation techniques. Rapid
    prototyping allowed us to test these ideas with real users, iteratively
    refining them based on feedback. Throughout this phase, we worked closely
    with the Honor team to ensure our concepts aligned with their strategic
    goals and brand vision. Regular check-ins and reviews kept everyone on the
    same page and ensured our ideas were feasible and aligned with the project
    timeline.
    <br/>
    <br/>
    By the end of this phase, we had high-fidelity prototypes
    showcasing key features of the new Honor operating system, along with
    detailed design specifications and guidelines for a consistent,
    user-friendly final product. As the lead experience expert, I facilitated
    the ideation workshops, user testing sessions, and client communications,
    ensuring our prototypes were both visually appealing and easy to use.
  </p>

  <div class="dual">
    <img
      src="/images/fantasy/fantasy-dual3--left.png"
      style="grid-area: left;"
      alt="work sample"
    />
    <img
      src="/images/fantasy/fantasy-dual3--right.png"
      style="grid-area: right;"
      alt="work sample"
    />
  </div>

  <h1 class="headline-left">the result</h1>
  <div class="overview-container-left">
    <p class="overview">
      Towards the end of my tenure at Fantasy, we successfully delivered various
      use scenarios and apps, including widgets for the lock screen, home screen
      interactions, multi-device connections, albums, and cameras. Leading a
      team of professionals who collaborated effectively across different parts
      of the world was a rewarding experience, despite the challenges.
      <br /><br />Our team's diverse cultures and experiences significantly
      enriched the solutions we developed. Working together, we created
      innovative and user-friendly features that met the needs of our global
      audience.
    </p>
  </div>

  <Carousel
    title="concept design"
    backgroundColor={"#222222"}
    images={carouselImages}
  />
</div>

<style>
</style>
