<script>
  import Carousel from "$lib/Carousel.svelte"
  import Overview from "$lib/Overview.svelte"
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"

  let firstCarousel = [
    { src: "/images/rakuten/rakuten-carousel1-1.png?enhanced", alt: "placeholder" },
    { src: "/images/rakuten/rakuten-carousel1-2.png?enhanced", alt: "placeholder" },
    { src: "/images/rakuten/rakuten-carousel1-3.png?enhanced", alt: "placeholder" }
  ]
  let secondCarousel = [
    { src: "/images/rakuten/rakuten-carousel2-1.png?enhanced", alt: "placeholder" },
    { src: "/images/rakuten/rakuten-carousel2-2.png?enhanced", alt: "placeholder" },
    { src: "/images/rakuten/rakuten-carousel2-3.png?enhanced", alt: "placeholder" }
  ]
  let thirdCarousel = [
    { src: "/images/rakuten/rakuten-carousel3-1.png?enhanced", alt: "placeholder" },
    { src: "/images/rakuten/rakuten-carousel3-2.png?enhanced", alt: "placeholder" },
    { src: "/images/rakuten/rakuten-carousel3-3.png?enhanced", alt: "placeholder" }
  ]
</script>

<div class="workpage-container">
  <WorkTitleLanding
    year="2017"
    company="Rakuten"
    subtitle="The No.1 Japanese online marketplace in Taiwan"
    image="/images/rakuten/rakuten-showcase.png?enhanced"
  />

  <Overview
    content={{
      domains: ["Design thinking implementation", "Idea lab"],
      bread: [
        "Rakuten is a renowned Japanese company specializing in electronic commerce and online retailing. It operates in over 20 countries and regions, and one of its crucial operation hubs is Rakuten Taiwan. The company's operations in Taiwan extend beyond the local market to encompass international system design, underscoring its significant role in the global e-commerce landscape. "
      ]
    }}
  />

  <h1 class="headline-right">the challenge</h1>
  <div class="overview-container-right">
    <p class="overview">
      Rakuten has built its reputation on its popular membership reward system.
      However, as competitors have introduced similar programs offering larger
      discounts and more types of rewards, Rakuten's market position has been
      under threat. Consumers have become increasingly difficult to please and
      retain their loyalty.
      <br /><br />During my time as a researcher at Rakuten from 2017 to 2018, I
      conducted over 20 studies to improve various business metrics such as
      conversion rates and web/app usability. In addition, I had the opportunity
      to redesign the membership system, resulting in a significant increase in
      profits.
    </p>
  </div>

  <h1 class="headline-left">my approach</h1>
  <div class="overview-container-left">
    <p class="overview">
      In my role as the inaugural researcher in the User Experience department,
      I was tasked with spearheading optimisation projects using both
      quantitative and qualitative research methods. In a global organisation
      such as Rakuten, decision-making is a deliberate and meticulous process.
      <br /><br />
      To begin my projects, I utilised Adobe SiteCatalyst to conduct data analysis
      and gather relevant information. I then transformed the collected data points
      into actionable insights regarding customer behaviour.
      <br /><br />
      While data analysis is a valuable tool for gaining insights into customer behaviour,
      it cannot provide a complete picture of our customers. The true intentions,
      needs, and emotions of our customers are often absent from numerical data.
      <br /><br />
      To delve deeper into understanding our customers, I supplemented quantitative
      research with qualitative research methods such as interviews, journaling,
      field studies, focus groups, and usability testing. These methods allowed me
      to gain a more comprehensive understanding of our customers' experiences and
      uncover insights that may have been missed through data analysis alone.
    </p>
  </div>

  <h1 class="headline-right">cases</h1>
  <div class="overview-container-right">
    <h2 class="overview-headline">usability testing</h2>
    <p class="overview">
      As part of my research, I conducted a usability testing study to examine
      how people shop online. To introduce an environmental variable,
      participants were asked to utilise their most common posture in various
      settings, including at home, during a commute, and in a public space such
      as school or the office. This approach allowed us to gain a better
      understanding of how customers interact with our platform in different
      contexts and environments.
      <br /><br />
      Through this study, I was able to identify the most common use scenario for
      online shopping and discovered that the System Usability Score (SUS) varied
      depending on the scenario represented. To ensure a seamless shopping experience
      for our customers, it was essential to consider all these scenarios and provide
      tailored designs to meet their needs.
      <br /><br />
      Consequently, I developed a design guideline that incorporated the identified
      scenarios. This guideline was widely adopted across teams to improve our mobile
      experience and ensure that we provided our customers with the best possible
      online shopping experience.
    </p>
  </div>

  <Carousel title="usability testing" images={firstCarousel} duration={10} />

  <div class="overview-container-left">
    <h2 class="overview-title">cognition experiment</h2>
    <p class="overview">
      In today's fast-paced world, people are bombarded with a wealth of
      information daily. For e-commerce platforms, effectively communicating
      with target customers is crucial for success.
      <br /><br />
      To tackle this challenge, I conducted a study in which I compared various copies
      used by some of our competitors. I aimed to evaluate how general consumers
      interpreted these words and how they felt about the sentences used in the copy.
      By doing so, I gained insights into how we could communicate more effectively
      with our target audience and better meet their needs.
      <br /><br />
      Based on my findings, I developed a UX writing strategy that could be implemented
      into Rakuten's marketing campaigns and product information pages. The implementation
      of this strategy resulted in a significant increase in the average order value,
      indicating that the revised copy resonated more effectively with our target
      audience.
      <br /><br />
      ​By carefully considering the language and tone used in our communication,
      we were able to more effectively connect with our customers and provide them
      with a more positive and engaging experience on our platform.
    </p>
  </div>

  <Carousel
    title="cognition experiment"
    images={secondCarousel}
    duration={10}
  />

  <div class="overview-container-right">
    <h2 class="overview-title">marketing campaign enhancement</h2>
    <p class="overview">
      During my time at Rakuten, I recognized that our routine marketing
      campaigns were the primary driver of profit share each year, and
      increasing year-over-year (YOY) profit was a top priority for the company.
      <br /><br />
      ​To this end, I introduced a model that measured customers' attitudes towards
      different types of marketing campaigns, such as discounts of 30%, coupons,
      or Rakuten's super points. Through this study, we gained insights into how
      customers perceived different types of discounts and which discounts were most
      effective in driving checkout behaviour.
      <br /><br />
      By leveraging these insights, we were able to optimise our marketing campaigns
      and create more effective offers that resonated with our customers, resulting
      in increased profit and a stronger market position for Rakuten.
    </p>
  </div>

  <Carousel title="kano model" images={thirdCarousel} duration={10} />

  <p class="summary">
    By leveraging data-driven insights and refining our approach over time, we
    were able to create more impactful and engaging product that helped drive
    increased sales and revenue for Rakuten. By continually measuring and
    optimising our product, we were able to remain competitive in an
    ever-changing market and continue to grow our business over the long term.
  </p>
  <p class="summary" style="padding-bottom: 128px;">
    Through the development of a series of research methods for measuring the
    user experience, we were able to compare results across different seasons
    and collaborate more effectively with the marketing team to create campaigns
    that resonated more strongly with our customers.
  </p>
</div>
