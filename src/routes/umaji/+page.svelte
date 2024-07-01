<script>
  import Carousel from "$lib/Carousel.svelte"
  import Overview from "$lib/Overview.svelte"
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"

  let carouselImages = [
    { src: "/images/umaji/umaji-carousel1-1.png", alt: "placeholder" },
    { src: "/images/umaji/umaji-carousel1-2.png", alt: "placeholder" },
    { src: "/images/umaji/umaji-carousel1-3.png", alt: "placeholder" },
    { src: "/images/umaji/umaji-carousel1-4.png", alt: "placeholder" },
    { src: "/images/umaji/umaji-carousel1-5.png", alt: "placeholder" }
  ]
</script>

<div class="workpage-container">
  <WorkTitleLanding
    year="2020"
    company="umaji"
    subtitle="UI&UX design / design system / interaction design"
    image="/images/umaji/umaji-showcase.png"
  />
  <Overview
    content={{
      domains: ["Experience design", "Research", "Service design"],
      bread: [
        "The Ministry of Transportation and Communications (MOTC) is a cabinet-level governmental body in Taiwan. In 2020, MOTC launched a project to integrate the online services of Taiwan's public transit systems, including Taiwan High Speed Rail, Taiwan Railways Administration, and Taiwan Bus. Previously, each transportation system operated its own website, but this initiative aimed to consolidate them into a single platform, offering users a seamless experience for their daily commutes.",
        "Despite the integration efforts, a gap persisted between users' needs and the existing solutions. As a UX researcher, I conducted a series of studies to uncover users' pain points and improve the overall experience of scheduling trips in Taiwan."
      ]
    }}
  />

  <img src="/images/umaji/umaji-interface.png" />

  <div class="overview-container-left">
    <h2 class="overview-headline">
      Focus Group Study: Sharing Experiences to Improve Public Transit Services
    </h2>
    <p class="overview">
      Public transportation is a common topic among citizens, and I sought to
      leverage that by conducting a focus group study. I invited people to share
      their information, opinions, and suggestions, and even have debates.
      Through this method, we simulated different situations, such as scheduling
      a group trip, to better understand the user's journey. A total of 214
      people joined this research, both online and offline, and the gender
      distribution was controlled at 50:50. I was able to identify six distinct
      user personas, including Family Organiser, City Shuttler, Cross-City
      Commuter, Weekend Homecomer, Travel Expert, and Transportation Lover. Each
      of these personas had different needs and experiences while travelling.
    </p>
  </div>

  <Carousel
    images={carouselImages}
    backgroundColor="#fff"
    color="var(--text-extended)"
    title="persona overview"
  />

  <div class="overview-container-right">
    <h2 class="overview-headline">Define the user, define the problem</h2>
    <p class="overview">
      To better understand the pain points that passengers face, I conducted a
      focus group study. The study involved 214 participants, with a gender
      distribution of 50:50. I grouped Taiwanese passengers into six types of
      personas based on their unique experiences and needs while travelling:
    </p>
    <ol class="overview list">
      <li>
        Family Organiser: This persona is responsible for scheduling and
        organising trips for the family, including children and elderly family
        members.
      </li>
      <li>
        City Shuttler: This persona travels frequently within a city for work or
        personal reasons and needs to optimise their travel time and costs.
      </li>
      <li>
        Cross-City Commuter: This persona travels between different cities for
        work or personal reasons and needs to coordinate travel between multiple
        modes of transportation.
      </li>
      <li>
        Weekend Homecomer: This persona travels back to their hometown during
        weekends or holidays and needs to find the most convenient and
        affordable transportation options.
      </li>
      <li>
        Travel Expert: This persona is an experienced traveller who enjoys
        exploring new destinations and needs to plan and book transportation in
        advance.
      </li>
      <li>
        Transportation Lover: This persona is passionate about public
        transportation and enjoys discovering new routes and experiences.
      </li>
    </ol>
  </div>

  <img src="/images/umaji/umaji-interface2.png" />

  <div class="overview-container-left">
    <p class="overview">
      All six personas face a common problem when scheduling a trip:
      uncertainty. This uncertainty can be related to the destination,
      transportation, or emergency events or delay issues. From the start of the
      trip, passengers must deal with uncertainty until they reach their
      destination. My goal was to ease their anxiety when facing uncertainty.
    </p>
  </div>
  <div class="overview-container-right">
    <p class="overview">
      After conducting thorough research and meticulously analysing the data,
      the subsequent step involves drawing sound conclusions and transforming
      the findings into actionable insights. This entails converting the raw
      data into practical recommendations that can inform business decisions and
      drive positive outcomes. I have consolidated all our research findings
      into customer journeys, which allow us to delve deep into a particular
      persona's needs, behaviours, experiences, and interactions with the
      current solutions. By doing so, we can identify areas where we can provide
      a better solution and optimize their experience. This approach empowers us
      to develop a more comprehensive understanding of our users, which
      ultimately helps us deliver exceptional service and generate significant
      value for our business.
    </p>
  </div>

  <img src="/images/umaji/umaji-objective.png" />

  <div class="overview-container-left" style="margin: auto;">
    <p class="overview">
      Ultimately, our research findings led us to develop a service that
      addresses multiple pain points for users. Specifically, our service aims
      to guide users to their desired destinations, even when they only have an
      ambiguous keyword to work with, while also reducing the anxiety and
      pressure associated with uncertainty and being late. Moreover, our service
      ensures that every suggested route is the best possible option for the
      user, streamlining the entire process by allowing users to complete all
      necessary tasks through a single platform rather than navigating multiple
      service providers.
    </p>
  </div>
  <div id="tail">
    <img src="/images/umaji/umaji-tail.png" />
    <img src="/images/umaji/umaji-tail2.png" />
  </div>
</div>
