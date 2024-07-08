<script lang="ts">
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"
  import Overview from "$lib/Overview.svelte"
  import Carousel from "$lib/Carousel.svelte"

  let firstCarousel = [
    { src: "/images/nextbank/nextbank-carousel1-1.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel1-2.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel1-3.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel1-4.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel1-5.png", alt: "placeholder" }
  ]

  let secondCarousel = [
    { src: "/images/nextbank/nextbank-carousel2-1.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel2-2.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel2-3.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel2-4.png", alt: "placeholder" },
    { src: "/images/nextbank/nextbank-carousel2-5.png", alt: "placeholder" }
  ]
</script>

<div class="workpage-container extended-palette">
  <WorkTitleLanding
    year="2020"
    company="nextbank"
    subtitle="Pioneering mobile banking for Gen Z"
    image="/images/nextbank/nextbank-showcase.png"
  />

  <Overview
    content={{
      domains: ["Design principle", "Design system", "UI/UX", "Branding"],
      bread: [
        "NEXTBANK is a Taiwanese neobank that sought to create a novel financial service experience. As the sole UX designer on the team in 2020, I was responsible for designing the user experience, interaction design, motion design, and developing the design system in collaboration with UI designers, visual designers, and the corporate identity team. Our goal was to provide a fresh in-app experience that conveyed NEXTBANK's innovative and futuristic vision.",
        "To achieve this, the design team worked closely together to create an innovative and user-friendly design that would set NEXTBANK apart from other financial services. We aimed to provide an exceptional in-app experience that was both intuitive and engaging. With the help of a strong design system, we were able to maintain consistency across different screens and improve the overall user experience."
      ]
    }}
  />

  <div id="showcase-video">
    <div class="video-bar--top" />
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay loop playsinline webkit-playsinline>
      <source src="/media/nextbank.mp4" type="video/mp4" />
    </video>
    <div class="video-bar--bot" />
  </div>

  <h1 class="headline-right">the challenge</h1>
  <div class="overview-container-left">
    <h2 class="overview-headline">vague requirements</h2>
    <p class="overview">
      The project had vague requirements, with management only specifying a
      “futuristic” design with yellow and grey as the desired colours. This lack
      of specificity made it challenging to design a product that met their
      expectations, while also ensuring our customers have a similar perception.
      How to define “futuristic” and make it visually receivable?
    </p>
    <h2 class="overview-headline">Stakeholders</h2>
    <p class="overview">
      Managing stakeholders was another significant challenge. Most of the
      management team came from traditional banking backgrounds, which meant
      that they were accustomed to the traditional way of banking. This made it
      challenging to sell the concept of a neobank, which required a fundamental
      shift in how banking services were offered. What are the strategies to
      build internal buy-in and create a highly adaptable and user-friendly
      product?
    </p>
    <h2 class="overview-headline">unknown competition</h2>
    <p class="overview">
      We had to contend with two other neobanks (LINE bank & Rakuten bank)
      preparing to launch at a similar time, creating intense competition and
      uncertainty about the market landscape. This made it challenging to design
      a unique product that would stand out in the crowded market. How can we
      create a unique neobank product that attracts customers in a crowded and
      uncertain market?
    </p>
    <h2 class="overview-headline">urgent deadline</h2>
    <p class="overview">
      The project had a tight timeline of only three months, which put immense
      pressure on the team to deliver a top-notch product. Adding to the
      challenge was the fact that I planned to pursue higher education, leaving
      limited time to design and implement the project. How to ensure the
      project was completed on time and maintain the team's development momentum
      even after my departure?
    </p>
  </div>

  <Carousel
    title="competitor review"
    backgroundColor={"#222222"}
    images={firstCarousel}
  />

  <h1 class="headline-left">the strategy</h1>
  <div class="overview-container-right">
    <h2 class="overview-headline">Total transparency</h2>
    <p class="overview">
      It's essential to foster transparency within the team, especially at the
      management level, in terms of product development and user feedback. This
      approach ensures that everyone, including managers, is on the same page,
      understands the user's needs, and is committed to delivering a
      high-quality product that meets those needs.
    </p>
    <h2 class="overview-headline">Fully engaged</h2>
    <p class="overview">
      Engagement enables the entire company to establish effective feedback
      loops, and ensure that everyone has a voice in championing the customer's
      needs. My goal was to cultivate a culture of user-centric problem-solving,
      where every member could contribute and collaborate towards delivering a
      desired user experience.
    </p>
  </div>

  <Carousel
    title="competitor review"
    backgroundColor={"#222222"}
    images={secondCarousel}
  />

  <div class="overview-container-left">
    <h2 class="overview-headline">Simple process</h2>
    <p class="overview">
      As the design team was both new to the company and new to each other, we
      sought an efficient process that required minimal training and reduced the
      potential for misunderstandings. After some consideration, I suggested
      implementing a series of design sprints to address our needs. This
      approach proved to be swift, transparent, and consistently prioritised the
      user experience.
    </p>
    <h2 class="overview-headline">Clarity</h2>
    <p class="overview">
      Given my impending departure in three months, I proposed focusing on a
      challenging but achievable project within that timeframe. We chose to
      refresh the interaction experience and visual design system to enhance the
      company's brand perception, while leaving secondary service processes
      untouched, such as a process for applying loans, terminating an account,
      etc.
    </p>
  </div>

  <img src="/images/nextbank/nextbank-tail.png" alt="result showcase" />
</div>

<style>
  #showcase-video {
    position: relative;
    width: 100%;
    height: 1028px;
    & > video {
      width: 100%;
      height: 100%;
      background-color: #222222;
    }
  }
  .video-bar--top,
  .video-bar--bot {
    width: 100%;
    position: absolute;
    height: 55px;
    background-color: #222222;
  }
  .video-bar--bot {
    bottom: 0px;
  }

  @media only screen and (max-width: 767px) {
    #showcase-video {
      height: 175px;
    }
    .video-bar--top,
    .video-bar--bot {
      width: 100%;
      position: absolute;
      height: 12px;
    }
  }
</style>
