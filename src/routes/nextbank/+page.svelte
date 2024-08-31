<script>
  import { Accordion, Carousel, Overview, WorkTitleLanding} from "$lib/index.js"

  let firstCarousel = [
    { src: "/images/nextbank/nextbank-carousel1-1.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel1-2.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel1-3.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel1-4.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel1-5.png", alt: "worksample" }
  ]

  let secondCarousel = [
    { src: "/images/nextbank/nextbank-carousel2-1.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel2-2.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel2-3.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel2-4.png", alt: "worksample" },
    { src: "/images/nextbank/nextbank-carousel2-5.png", alt: "worksample" }
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
      <source src="/media/nextbank.webm" type="video/webm" />
    </video>
    <div class="video-bar--bot" />
  </div>

  <div class="section-container">
    <div class="accordion-container">
      <Accordion items={accordionData} />
    </div>
  </div>

  <Carousel
    title="competitor review"
    backgroundColor={"#222222"}
    images={firstCarousel}
  />

  <Carousel
    title="competitor review"
    backgroundColor={"#222222"}
    images={secondCarousel}
  />

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
