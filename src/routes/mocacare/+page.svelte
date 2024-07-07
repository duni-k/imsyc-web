<script>
  import "@fortawesome/fontawesome-free/css/all.min.css"

  import Overview from "$lib/Overview.svelte"
  import WorkTitleLanding from "$lib/WorkTitleLanding.svelte"
  import { onMount } from "svelte"

  let muted = true
</script>

<div class="workpage-container">
  <WorkTitleLanding
    year="2017"
    company="MOCACARE"
    subtitle="Next generation hypertension care"
    image="/images/mocacare/mocacare-showcase.png"
  />

  <Overview
    content={{
      domains: [
        "Service design",
        "Experience design",
        "Workshopping",
        "Research"
      ],
      bread: [
        "MOCACARE was aimed to improve the experience when treating hypertension. Our product was a new type of blood pressure monitor, however, since we hadn't received an FDA license, that constrained us from showing blood pressure and claimed as a medical device.",
        "This project co-operated with doctors, nurses, and nutritionists. Our goal was to find out how can we assist hypertension patients to control their blood pressure without telling them their blood pressure."
      ]
    }}
  />

  <div id="showcase-video">
    <div>
      <video autoplay loop muted>
        <source src="/media/mocacare.mp4" type="video/mp4" />
      </video>
      <button
        class="mute-button"
        on:click={() => {
          muted = !muted
          document.querySelector("video").muted =
            !document.querySelector("video").muted
        }}
      >
        <i class="fas {muted ? 'fa-volume-xmark' : 'fa-volume-high'}" />
      </button>
    </div>
  </div>

  <h1 class="headline-left">painpoints</h1>
  <div class="overview-container-left">
    <h2 class="overview-headline">negligence</h2>
    <p class="overview">
      Negligence in the management of hypertension can be a significant issue,
      often stemming from a lack of awareness or understanding of the
      condition's severity. Many patients underestimate the long-term risks
      associated with untreated or poorly managed high blood pressure, such as
      heart disease, stroke, and kidney failure. This can lead to inconsistent
      medication adherence, infrequent monitoring, and neglect of follow-up
      appointments. Additionally, some patients might dismiss hypertension as a
      non-urgent issue because it is often asymptomatic, further exacerbating
      the problem. This negligence can be particularly prevalent among those who
      are asymptomatic or have not yet experienced any serious health events
      related to their hypertension, leading to delayed or insufficient
      treatment.
    </p>
    <h2 class="overview-headline">Lifestyle Modification</h2>
    <p class="overview">
      Implementing and maintaining lifestyle modifications is a major challenge
      for many individuals with hypertension. Recommended changes often include
      adopting a low-sodium diet, increasing physical activity, reducing alcohol
      consumption, and quitting smoking. These modifications require substantial
      and sustained effort, often involving significant alterations to
      long-standing habits and preferences. For example, switching to a diet
      rich in fruits, vegetables, and whole grains can be difficult for those
      accustomed to high-salt, high-fat, or processed foods. Similarly,
      integrating regular exercise into a daily routine can be daunting for
      individuals with busy schedules, physical limitations, or a lack of
      motivation. The perceived difficulty and inconvenience of these lifestyle
      changes can lead to poor adherence, thereby undermining the overall
      effectiveness of hypertension management.
    </p>
  </div>
  <div class="dual">
    <img src="/images/mocacare/mocacare-dual--left.png" />
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      autoplay
      loop
      src="https://www.mocacare.com/mocaheart/assets/video/mocaheart_measure_video_demo.webm"
    />
  </div>
  <div class="overview-container-left">
    <h2 class="overview-headline">Data management</h2>
    <p class="overview">
      Effective data management is crucial for monitoring hypertension but can
      pose significant challenges for patients. Many blood pressure monitors
      require manual logging of readings, which can lead to errors, omissions,
      and incomplete data. This manual process can be burdensome, especially for
      those who need to track their blood pressure multiple times a day.
      Furthermore, interpreting the collected data can be difficult without
      professional guidance, as patients might not fully understand the
      implications of their readings or how to respond to them. Poor data
      management can hinder a healthcare provider's ability to make informed
      decisions about treatment adjustments, potentially leading to suboptimal
      care. Additionally, the lack of integrated digital solutions that
      automatically sync and analyze data exacerbates these issues, leaving
      patients reliant on cumbersome and error-prone manual methods.
    </p>
    <h2 class="overview-headline">Inconvenience</h2>
    <p class="overview">
      The inconvenience associated with regular blood pressure monitoring and
      hypertension management can be a significant deterrent for many patients.
      Frequent visits to a healthcare facility for blood pressure checks are
      time-consuming and may not be feasible for individuals with busy schedules
      or limited access to transportation. Even home monitoring can be seen as a
      hassle, requiring patients to remember to take readings at specific times,
      maintain proper posture, and use the device correctly. The need for
      consistent monitoring can disrupt daily routines and add stress to an
      already challenging health management regimen. This inconvenience often
      leads to irregular monitoring practices, which can result in gaps in data
      and inadequate management of the condition.
    </p>
    <h2 class="overview-headline">Discomfort</h2>
    <p class="overview">
      The physical discomfort and pain associated with using a blood pressure
      monitor cuff can be a significant barrier to regular monitoring. The
      process of inflating the cuff, which is necessary to obtain accurate
      readings, can cause discomfort or even pain, particularly in individuals
      with sensitive skin or underlying conditions such as arthritis. The
      tension from the cuff can also leave temporary marks or bruises,
      discouraging patients from frequent use. For those who need to measure
      their blood pressure multiple times a day, this discomfort can become a
      persistent issue, leading to reluctance in maintaining the necessary
      monitoring schedule. The physical pain and discomfort from the cuff can
      thus contribute to overall non-compliance and inadequate management of
      hypertension.
    </p>
  </div>

  <img src="/images/mocacare/mocacare-personas.png" />

  <h1 class="headline-right">the solution</h1>
  <p class="summary">
    We also recognised the importance of pulse wave velocity (PWV) as a crucial
    indicator of cardiovascular health, linked to arterial stiffness and high
    blood pressure. By monitoring PWV, users can identify potential risks and
    take proactive steps, such as adopting healthier lifestyle habits, to
    improve their heart health, which we offer in our associated app. This
    supports users in making necessary lifestyle modifications by providing
    tangible data that demonstrates the impact of changes like diet and exercise
    on their cardiovascular health. Moreover, the new monitor design relieve the
    common issue of physical pain from the cuff of traditional blood pressure
    monitors. By using thumb sensors instead of an arm cuff, the device ensures
    a more comfortable and user-friendly experience, eliminating the discomfort
    and bruising often caused by cuff inflation. This innovation encourages
    regular use without the physical pain, making heart health monitoring more
    accessible and less daunting.
    <br /><br />
    As a designer on the MOCACARE product team, our design thinking approach focused
    on creating an intuitive and comprehensive heart health monitoring solution that
    addresses key pain points in hypertension management. Our goal was to offer a
    holistic view of heart health in just 25 seconds, empowering users to monitor
    their cardiovascular status and observe improvements over time with regular use.
    This feature helps tackle the inconvenience of traditional monitoring methods
    by providing quick and hassle-free measurements that seamlessly fit into daily
    routines.
  </p>
  <div id="tail">
    <img src="/images/mocacare/mocacare-tail.png" />
    <img src="/images/mocacare/mocacare-tail2.png" />
    <img src="/images/mocacare/mocacare-tail3.png" />
    <img src="/images/mocacare/mocacare-tail4.png" />
  </div>
</div>

<style>
  #showcase-video {
    height: 1028px;
    width: 100%;
    background-color: #f58c7d;
    & > div {
      margin: auto;
      padding: 64px 150px 64px 150px;
      position: relative;
      width: 1600px;
      height: 900px;
      & > video {
        height: 100%;
        width: 100%;
      }
    }
  }

  .mute-button {
    position: absolute;
    top: 64px;
    right: 150px;
    background: transparent;
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .mute-button:hover {
    transform: scale(1.2);
  }

  .dual {
    height: 918px;
  }
</style>
