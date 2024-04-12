<script lang="ts">
 type Project = {
   name: string;
   description: string;
 }
  export let project: Project;
</script>

// TODO: basic card for Project, modify later on
<div class="">
  <h2>{project.name}</h2>
  <p>{project.description}</p>
</div>