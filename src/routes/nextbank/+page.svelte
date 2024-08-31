<script>
  import { Accordion, Carousel, Overview, WorkTitleLanding} from "$lib/index.js"

  const firstCarousel = [
    { src: "/images/nextbank/nextbank-carousel1-1.png", alt: "competitor review" },
    { src: "/images/nextbank/nextbank-carousel1-2.png", alt: "competitor review" },
    { src: "/images/nextbank/nextbank-carousel1-3.png", alt: "competitor review" },
    { src: "/images/nextbank/nextbank-carousel1-4.png", alt: "competitor review" },
    { src: "/images/nextbank/nextbank-carousel1-5.png", alt: "competitor review" }
  ]

  const secondCarousel = [
    { src: "/images/nextbank/nextbank-carousel2-1.png", alt: "iterations" },
    { src: "/images/nextbank/nextbank-carousel2-2.png", alt: "iterations" },
    { src: "/images/nextbank/nextbank-carousel2-3.png", alt: "iterations" },
    { src: "/images/nextbank/nextbank-carousel2-4.png", alt: "iterations" },
    { src: "/images/nextbank/nextbank-carousel2-5.png", alt: "iterations" }
  ]

  const accordionData = [
        {
          header: "challenge",
          details: `Designing this project came with three major challenges. First, <b>managing stakeholders</b> was a significant hurdle—convincing a management team deeply rooted in traditional banking to embrace
                    the innovative concept of a neobank required a fundamental mindset shift.
                    Second, the project was plagued by <b>vague requirements</b>, with only a
                    directive for a \"futuristic\" design in yellow and grey, leaving the
                    team to interpret and visualise an undefined concept. Finally, the
                    <b>tight three-month deadline</b> added immense pressure, demanding a flawless
                    execution while ensuring the project's momentum continued even after my
                    planned departure for higher education.`
        },
        {
          header: "strategy",
          details: `Full engagement was my key to establishing effective feedback loops across
                    the company. I aimed to create a culture where every member had a voice in
                    advocating for the customer, driving a collaborative effort towards a user-
                    centric solution.<br/><br/>
                    To navigate the challenge of a newly formed design team, we embraced design 
                    sprints to run in a fast, transparent, and user-focused way.<br/><br/>
                    With my departure looming in three months, I proposed a plan focused on
                    clarity: tackle a challenging yet achievable project by refreshing the
                    interaction experience and visual design system.`
        }
  ]
</script>

<WorkTitleLanding
  year="2020"
  company="nextbank"
  subtitle="Pioneering mobile banking for Gen Z"
  image="/images/nextbank/nextbank-showcase.png"
/>

<div class="workpage-container secondary-palette">
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
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay loop playsinline webkit-playsinline>
      <source src="/media/nextbank.webm" type="video/mp4" />
    </video>
  </div>

  <div class="section-container">
    <div class="accordion-container">
      <Accordion items={accordionData} />
    </div>
  </div>

  <Carousel
    title="competitor review"
    images={firstCarousel}
  />

  <Carousel
    title="iterations"
    images={secondCarousel}
  />

  <div class="dual">
    <img src="/images/nextbank/nextbank-dual-left.png" alt="result showcase"/>
    <img src="/images/nextbank/nextbank-dual-right.png" alt="result showcase"/>
  </div>

  <h1 class="headline-right" style="text-align: center;">the result</h1>
  <p class="summary">
    The design principles of the app focus on four core values.
    Reliability is emphasized by the selective use of yellow, the brand's energetic color, to highlight crucial elements without creating an overly playful look.
    Innovation and intrigue are achieved through a frameless, seamless interaction design, with services readily accessible via drag-and-drop without page transitions or loading times.
    To ensure customers feel in control of their finances, the app prominently displays personal assets, income, outcomes, and recent transactions on the homepage, with user-friendly infographics for asset management.
    Lastly, empathy and companionship are prioritized by providing easy access to customer service through an AI chatbot or help desk, ensuring a supportive user experience throughout the app.
  </p>
  <p class="summary">
    Overall, my experience at NEXTBANK was very rewarding.
    It was my first time leading a design team and doing a design sprint, and I also had to act as a 'kind-of' product manager.
    I wrote all the specifications, communicated with the engineers, controlled the schedule, and did stakeholder management.
    I learned a lot from this project and am grateful for the opportunity to be involved in product development for a cool brand.
  </p>
  <p class="summary">
    If you are interested in NEXTBANK, check here: https://www.nextbank.com.tw/
  </p>

  <img src="/images/nextbank/nextbank-tail.png" alt="result showcase" />
</div>

<style>
  .accordion-container {
    grid-column: 4 / 8;
  }

  #showcase-video {
    position: relative;
    width: 100%;
    height: 1028px;
    & > video {
      width: 100%;
      height: 100%;
      background-color: var(--background-secondary);
    }
  }

  @media only screen and (max-width: 767px) {
    #showcase-video {
      height: 175px;
    }
  }
</style>
