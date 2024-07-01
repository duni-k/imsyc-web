<script>
  import Carousel from "$lib/Carousel.svelte"
  import Overview from "$lib/Overview.svelte"
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"

  let firstCarousel = [
    { src: "/images/thsr/thsr-carousel1-1.png", alt: "placeholder" },
    { src: "/images/thsr/thsr-carousel1-2.png", alt: "placeholder" },
    { src: "/images/thsr/thsr-carousel1-3.png", alt: "placeholder" }
  ]
  let secondCarousel = [
    { src: "/images/thsr/thsr-carousel2-1.png", alt: "placeholder" },
    { src: "/images/thsr/thsr-carousel2-2.png", alt: "placeholder" },
    { src: "/images/thsr/thsr-carousel2-3.png", alt: "placeholder" },
    { src: "/images/thsr/thsr-carousel2-4.png", alt: "placeholder" }
  ]
</script>

<div class="workpage-container">
  <WorkTitleLanding
    year="2020"
    company="thsrail"
    subtitle="Increasing time table accessibility"
    image="/images/thsr/thsr-showcase.png"
  />
  <Overview
    content={{
      domains: ["Accessibility assessment", "Experience design", "Research"],
      bread: [
        "The Taiwan High Speed Rail (THSR) embarked on an initiative to replace all their Passenger Information Display Systems (PIDS) with digital display devices, a new passenger interface, and an operational system in eight stations. The objective of the project was to enhance accessibility and reduce confusion.",
        "As a member of the team responsible for the project, my role was to assess accessibility,  conduct research to understand the passenger journey and provide suggestions on where to place the displayers and prioritize the information. I began by studying the interactions of passengers at the stations, and approached passengers who seemed to be confused to have a conversation or walk with them for a while.",
        "The goal of the research was to identify all the touchpoints that passengers required to access train information. For instance, before the barrier, passengers needed to check the north-south direction to approach the right platform. Based on my research findings, I created three different personas that represented the majority of the passengers."
      ]
    }}
  />

  <div class="dual">
    <img src="/images/thsr/thsr-dual--left.png" />
    <img src="/images/thsr/thsr-dual--right.png" />
  </div>

  <h1 class="headline-left">persona & journey</h1>
  <div class="overview-container-left">
    <p class="overview">
      Three major personas were defined after the research. I used the awareness
      of PIDS and problem-solving ability as two dimensions to organize
      different personalities.
    </p>
    <p class="overview">
      The first persona was Mr. Lee, who had low awareness of the PIDS but had a
      high problem-solving ability. He was a frequent THSR user who believed
      that he could get to his destination at the right time. However, his lack
      of attention could result in him hopping on the wrong train.
    </p>
    <p class="overview">
      The second persona was Miss Wang, who had low awareness of the PIDS and a
      medium problem-solving ability. She spent most of her time on her mobile
      phone, which led to her missing out on some crucial information.
      Sometimes, she even walked with her eyes on her mobile phone, which could
      make her get stuck in front of the barrier, as she had to stop her mobile
      phone behaviour and switch to ticket processing.
    </p>
    <p class="overview">
      The third persona was Mr. Chuang, who had a high awareness "intention" of
      PIDS but low problem-solving ability. He was concerned about all the
      information, such as time, platform, and train number. However, the
      current PIDS might be hung up too high to see or had too much information
      displayed simultaneously, which made him feel bewildered. He tended to ask
      a THSR staff member or a passenger for help to process the information he
      needed.
    </p>
    <p class="overview">
      For him, trying to process the information he needed may be costly, as a
      result, he tended to ask a THSR staff or even a passenger.
    </p>
  </div>

  <Carousel
    title="personas"
    color="var(--highlight-secondary)"
    backgroundColor="#729BA1"
    images={firstCarousel}
    duration={10}
  />

  <h1 class="headline-right">the result</h1>
  <p class="summary">
    In summary, I played an integral role in the THSR project by conducting
    research and developing personas that represent the majority of passengers.
    I provided valuable insights that guided the THSR team in determining design
    priorities and providing suggestions to enhance the passenger experience. I
    am confident that my contributions will help to reduce confusion and
    increase accessibility for THSR passengers.
    <br /><br />
    After defining the target personas, I generated all user needs into one passenger's
    journey, which contains WHEN a passenger will need WHAT kind of information.
    With this journey, we could easily determine WHERE to place the different types
    of PIDS to fit the user scenario and needs. We also held several workshops with
    THSR staff and related stakeholders to define the design priorities based on
    the research findings. Additionally, we provided some design suggestions and
    guidelines to assist the THSR team. The project is still ongoing, and DELTA ELECTRONICS,
    INC is working on both software and hardware design.
  </p>

  <Carousel
    title="PIDS Mockup"
    color="var(--highlight-secondary)"
    backgroundColor="#729BA1"
    images={secondCarousel}
    duration={11}
  />
</div>
