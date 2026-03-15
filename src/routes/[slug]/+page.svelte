<script lang="ts">
  import ProjectList from "$lib/ProjectList.svelte"

  let { data } = $props()
</script>

<ProjectList initialSlug={data.slug} />
